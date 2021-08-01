const express = require("express");
const app = express();

// upload images plugins
var multer = require("multer");
var path = require("path");

// socket.io plugins
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

const cors = require("cors");
const bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const sequelize = require("./utils/database");

const VacationsModel = require("./models/VacationsModel");
const UsersModel = require("./models/UsersModel");
const FollowsModel = require("./models/FollowsModel");

VacationsModel.hasMany(FollowsModel);
UsersModel.hasMany(FollowsModel);

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

// IMAGE UPLOADING
// specify the folder
app.use(express.static(path.join(__dirname, "uploads")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let imgEnd = file.originalname.split(".");
    imgEnd = imgEnd[imgEnd.length - 1];
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  imgEnd = "";
  res.send(req.files);
});

sequelize
  .sync()
  .then((result) => {
    app.listen(5004);
    console.log("Connected DB !!");
  })
  .catch((err) => {
    console.log("Error connected DB !!", err);
  });

// This creates our socket using the instance of the server
io.on("connection", (socket) => {
  socket.on("add vacation", () => {
    io.sockets.emit("after_add_vacation");
  });

  socket.on("delete vacation", () => {
    io.sockets.emit("after_delete_vacation");
  });

  socket.on("edited vacation", (followsArr) => {
    io.sockets.emit("after_edit_vacation", followsArr);
  });
});
server.listen(5003);
