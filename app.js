const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");

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

// socket.io plugins
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer();
// const io = socketIO(server);

const io = socketIO(server)(httpServer, {
  cors: {
    origin: ["https://vacations-stars.netlify.app"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// app.use(express.static(__dirname + "/node_modules"));
// app.get("/", function (req, res, next) {
//   res.sendFile(__dirname + "/index.html");
// });

// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     // origin: "https://vacations-stars.netlify.app",
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket"],
// });

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "https://vacations-stars.netlify.app/",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// });

// const io = socketIO(server, {
//   cors: {
//     origin: ["*"],

//     handlePreflightRequest: (req, res) => {
//       res.writeHead(200, {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,POST",
//         "Access-Control-Allow-Headers": "my-custom-header",
//         "Access-Control-Allow-Credentials": true,
//       });
//       res.end();
//     },
//   },
// });

const Sequelize = require("sequelize");
const sequelize = require("./utils/database");

const VacationsModel = require("./models/VacationsModel");
const UsersModel = require("./models/UsersModel");
const FollowsModel = require("./models/FollowsModel");

VacationsModel.hasMany(FollowsModel);
UsersModel.hasMany(FollowsModel);

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
// server.listen(process.env.PORT || 5003);
