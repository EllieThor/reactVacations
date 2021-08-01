const Users = require("../models/UsersModel");
const FollowsModel = require("../models/FollowsModel");

//  `users`-`ID`, `FirstName`, `LastName`, `Email`, `Password`, `Role`, `createdAt`, `updatedAt`
// `follows`-`FollowID`, `createdAt`, `updatedAt`, `userID`, `vacationID`

// CREATE (users)
exports.insertUserToDb = async (req, res, next) => {
  let newUserOBJ = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
    Role: 0,
  };

  // await Users.create(req.body)
  await Users.create(newUserOBJ)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ (users)
exports.getUserFromDb = async (req, res, next) => {
  await Users.findAll({ where: { Email: req.body.Email, Password: req.body.Password } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// CREATE (follows)
exports.insertStar = async (req, res) => {
  await FollowsModel.create(req.body)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.send(err);
    });
};

// DELETE (follows)
exports.deleteStar = async (req, res) => {
  await FollowsModel.destroy({ where: { userID: req.body.userID, vacationID: req.body.vacationID } })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.send(err);
    });
};
