var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("heroku_0a172e6deb10439", "bcc6fed49c3d6d", "8c3e828c", {
  host: "eu-cdbr-west-01.cleardb.com",
  dialect: "mysql",
});

module.exports = sequelize;

// mysql://bcc6fed49c3d6d:8c3e828c@eu-cdbr-west-01.cleardb.com/heroku_0a172e6deb10439?reconnect=true
