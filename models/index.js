const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: process.env.DB_HOST || "localhost", // Update with the appropriate environment variable or use 'localhost' if not set
  port: process.env.DB_PORT || 3336, // Update with the appropriate environment variable or use 3336 if not set
  dialect: "mysql",
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connected");
  })
  .catch((err) => {
    console.log("Sequelize error : ", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./taskModel.js")(sequelize, DataTypes);

//added force false to not dropped table and recreated after each load of the api app
db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync done");
});

module.exports = db;
