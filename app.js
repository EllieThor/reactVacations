const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");

// socket.io plugins
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket"],
//   upgrade: false,
// });
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
  upgrade: false,
  credentials: false,
});

// const io = socketIO(server, {
//   cors: {
//     origin: ["https://vacations-stars.netlify.app"],

//     handlePreflightRequest: (req, res) => {
//       res.writeHead(200, {
//         "Access-Control-Allow-Origin": "https://vacations-stars.netlify.app",
//         "Access-Control-Allow-Methods": "GET,POST",
//         "Access-Control-Allow-Headers": "my-custom-header",
//         "Access-Control-Allow-Credentials": true,
//       });
//       res.end();
//     },
//   },
//   transports: ["websocket"],
//   upgrade: false,
// });

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

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 5004);
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
// server.listen(process.env.PORT || 5003);
io.listen(process.env.PORT || 5003);
