const { List } = require("../databases/sqlite.js");
const dbConn = require("../databases/sqlite.js"); //Line1
const User = dbConn.User; //Line2

// function home(req, res) {
//   return res.render("home");
// }

function signup(req, res) {
  console.log("main signup invoked");
  return res.render("signup");
}

function signin(req, res) {
  console.log("main signin invoked");
  if (req.session.name) {
    res.redirect("/");
  } else {
    return res.render("signin");
  }
}

function profile(req, res) {
  if (req.session.login) {
    let pro = req.session.name;
    //console.log("id: ", req.session.user_id);

    List.findAll({
      where: { user_id: req.session.user_id },
      raw: true,
    })
      .then((todoList) => {
        console.log("with todo");
        console.log(todoList);
        return res.render("profile", { pro, todoList });
      })
      .catch((err) => {
        console.log("error in profile after find todo: ", err);
        res.redirect("/signin");
      });
  } else {
    res.redirect("/signin");
  }
}

module.exports = {
  //home: home,
  signup: signup,
  signin: signin,
  profile: profile,
};
