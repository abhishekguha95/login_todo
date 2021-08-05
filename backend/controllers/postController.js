console.log("postctrl line 1");
//const express = require("express");
//const session = require("express-session");
const dbConn = require("../databases/sqlite.js");
console.log("postctrl line 3");
const User = dbConn.User;
const List = dbConn.List;

console.log("postctrl line 6");

function signup(req, res) {
  console.log("post signup invoked");
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.redirect("/signup");
    // , { msg: "Please enter all the required details",}
  } else {
    User.create({
      name,
      email,
      password,
    })
      .then((user) => {
        req.session.login = true;
        req.session.name = user.name;
        req.session.user_id = user.id;
        req.session.email = user.email;
        return res.redirect("/");
      })
      .catch((err) => console.log("error in signup: ", err));
  }
}

async function signin(req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    console.log("signin redirect fired because main signin error");
    return res.render("signin");
  } else {
    console.log("inside signin post");
    console.log("intial check for req.session: ", req.session);
    await User.findOne({
      where: { email: email, password: password },
    })
      .then((userdata) => {
        console.log("userdata: ", userdata);
        console.log(typeof userdata);
        if (userdata) {
          console.log("signin post inside then inside if");
          req.session.login = true;
          req.session.name = userdata.name;
          req.session.user_id = userdata.id;
          req.session.email = userdata.email;
          console.log("postctl sign in session assigned values");
          console.log(req.session);
          console.log("redirectig to profile with found user");
          return res.redirect("/");
        } else {
          console.log("signin post inside then inside else");
          return res.redirect("/signin");
        }
      })
      .catch((err) => {
        console.log("signin post then failed, inside catch");
        console.log("error in signin: ", err);
        console.log("redirectig to signin again");
        return res.redirect("/signin");
      });
  }
}
//}

function addTodo(req, res) {
  console.log("add todo invoked");
  const { todoText } = req.body;
  console.log("in addtodo, req.body: ");
  console.log(req.body);
  console.log("inside postctl addTodo, next line req.session :");

  console.log(req.session.name, req.session.email);
  console.log("****");
  console.log(req.session.user_id);

  List.create({
    item: todoText,
    edit: false,
    done: false,
    user_id: req.session.user_id,
  })
    .then((newtodo) => {
      res.redirect("/");
    })
    .catch((err) => console.log("error in addTodo: ", err));
}

function logout(req, res) {
  console.log("in logout before: ", req.session);
  req.session.destroy(function (err) {
    if (err) {
      console.log("error in logout: ", err);
    } else {
      console.log("in logout after: ", req.session);
      return res.redirect("/signin");
    }
  });
}

module.exports = {
  signup: signup,
  signin: signin,
  addTodo: addTodo,
  logout: logout,
};
