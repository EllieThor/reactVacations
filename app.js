const express = require("express");
const app = express();
require("dotenv").config();
const { env } = require("process");

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
const http = require("http").createServer(app);
// const server = http.createServer(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
      });
      res.end();
    },
  },
});

// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
//   // transports: ["websocket"],
//   credentials: true,
// });

// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket"],
//   upgrade: false,
//   credentials: false,
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

// CONNECTIONS
VacationsModel.hasMany(FollowsModel);
UsersModel.hasMany(FollowsModel);

// ROUTING
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
// io.on("connection", (socket) => {
//   socket.on("add vacation", () => {
//     io.sockets.emit("after_add_vacation");
//   });

//   socket.on("delete vacation", () => {
//     io.sockets.emit("after_delete_vacation");
//   });

//   socket.on("edited vacation", (followsArr) => {
//     io.sockets.emit("after_edit_vacation", followsArr);
//   });
// });
// server.listen(process.env.PORT || 5003);
// io.listen(process.env.PORT || 5003);
http.listen(process.env.PORT || 5003, function () {
  socketIO.on("connection", (socket) => {
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
});
