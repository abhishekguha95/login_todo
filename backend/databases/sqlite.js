console.log("sqlite line 1");
const Sequelize = require("sequelize");
const path = require("path");
let dbpath = path.join(__dirname, "database.sqlite");

console.log("path of sqlite: ", dbpath);
console.log("sqlite line 4");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbpath,
});

console.log("sqlite line 10");
const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const List = sequelize.define("list", {
  item: {
    type: Sequelize.STRING,
    // allowNull: false
  },

  edit: {
    type: Sequelize.BOOLEAN,
    // allowNull: false
  },

  done: {
    type: Sequelize.BOOLEAN,
    // allowNull: false
  },

  user_id: {
    type: Sequelize.NUMBER,
    // allowNull: false
  },
});

sequelize
  .sync()
  .then(() =>
    console.log(
      "users and lists table has been successfully created, if one doesn't exist"
    )
  )
  .catch((error) => console.log(error));

module.exports = {
  User: User,
  List: List,
};
