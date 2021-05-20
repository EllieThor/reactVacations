const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

//  `users`-`ID`, `FirstName`, `LastName`, `Email`, `Password`, `Role`, `createdAt`, `updatedAt`

router.post("/getUserFromDb", usersController.getUserFromDb);
router.post("/insertUserToDb", usersController.insertUserToDb);

// `follows`-`FollowID`, `createdAt`, `updatedAt`, `userID`, `vacationID`

router.post("/insertNewFallowToDb", usersController.insertNewFallowToDb);
router.post("/deleteUserFallowFromDb", usersController.deleteUserFallowFromDb);

module.exports = router;
