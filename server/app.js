const express = require("express");
const app = express();

// upload images plugin
var multer = require("multer");
var path = require("path");
var port = 5004;

const cors = require("cors");
const bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const sequelize = require("./utils/database");

const VacationsModel = require("./models/VacationsModel");
const UsersModel = require("./models/UsersModel");
const FollowsModel = require("./models/FollowsModel");
// UsersVacations = sequelize.define("UsersVacations", {
//   role: Sequelize.STRING,
// });

// const Vications = require("./models/VicationsModel");
// const Users = require("./models/UsersModel");

// UsersModel.belongsToMany(VacationsModel, { through: "UsersVacations" });

// UsersModel.belongsToMany(VacationsModel, { through: UsersVacations });
//FollowsModel.belongsTo(VacationsModel);

VacationsModel.hasMany(FollowsModel);
UsersModel.hasMany(FollowsModel);
// // FollowsModel.belongsTo(VacationsModel);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const UsersRoute = require("./routs/usersRoute");
app.use("/users", UsersRoute);

const VacationsRoute = require("./routs/vacationRoute");
app.use("/vacations", VacationsRoute);

//FIXME: אם זה פועל זה משבית
// app.use((req, res) => {
//   res.send("Page NotFound");
// });

// specify the folder
app.use(express.static(path.join(__dirname, "uploads")));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let imgEnd = file.originalname.split(".");
    imgEnd = imgEnd[imgEnd.length - 1];
    console.log("imgEnd$$: ", imgEnd);

    let now = Date.now();
    console.log("hi check: ", file.originalname);
    // cb(null, file.originalname[0] + now + "." + imgEnd);
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  console.log("aaaa upload : ", upload);
  imgEnd = "";
  console.log("files#@####", req.files);
  res.send(req.files);
  console.log("upload or not?? ", req.files);
});

// var server = app.listen(port, function () {
//   console.log("Listening on port %s...", port);
// });
// FIXME: with sequelize dont work
sequelize
  .sync()
  .then((result) => {
    app.listen(5004);
    console.log("Connected DB !!");
  })
  .catch((err) => {
    console.log("Error connected DB !!", err);
    // logger.log("error", "ERRR " + JSON.stringify(err))
  });
