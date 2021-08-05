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
    let username = req.session.name;
    //console.log("id: ", req.session.user_id);

    List.findAll({
      where: { user_id: req.session.user_id },
      raw: true,
    })
      .then((todoList) => {
        console.log("with todo");
        console.log(todoList);
        return res.render("profile", { username, todoList });
      })
      .catch((err) => {
        console.log("error in profile after find todo: ", err);
        res.redirect("/signin");
      });
  } else {
    res.redirect("/signin");
  }
}

function deleteTodo(req, res) {
  // console.log("with req")
  // console.log(req)
  // const id = req.params.id
  let username = req.session.name;
  // for displaying hello username
  //Sequelize method 'destroy' used to delete an entry
  // querying the List database using where
  List.destroy({
    where: {
      user_id: req.session.user_id, // 2 parameters ensures an unique entry
      id: req.params.id,
    },
  })
    .then(() => {
      //now fetching the updated list
      List.findAll({
        where: { user_id: req.session.user_id },
        raw: true,
      })
        .then((todoList) => {
          console.log("with todo");
          console.log(todoList);
          return res.render("profile", { username, todoList });
        })
        .catch((err) => {
          console.log("error1 in profile after delete todo: ", err);
          res.redirect("/signin");
        });
    })
    .catch((err) => {
      console.log("error2 in profile after delete todo: ", err);
      res.redirect("/signin");
    });
}

function doneTodo(req, res) {
  let username = req.session.name;

  // List.update(                                   //this was only cutting text for done
  //   { done: true },                               // no reverse method for uncutting the done again
  //   {                                            // and making it not done
  //     where: {
  //       user_id: req.session.user_id,
  //       id: req.params.id,
  //     },
  //   }
  // )

  //fetching the unique entry and checking its done state
  // if true change to false and if false change to true
  List.findOne({
    where: { user_id: req.session.user_id, id: req.params.id },
  })

    .then((todo) => {
      if (todo.done == false) {
        todo.update({ done: true });
      } else {
        todo.update({ done: false });
      }
    })

    .then(() => {
      //fetching the updated list
      List.findAll({
        where: { user_id: req.session.user_id },
        raw: true,
      })
        .then((todoList) => {
          console.log("with updated todo");
          console.log(todoList);
          return res.render("profile", { username, todoList });
        })
        .catch((err) => {
          console.log("error1 in profile after done todo: ", err);
          res.redirect("/signin");
        });
    })
    .catch((err) => {
      console.log("error2 in profile after done todo: ", err);
      res.redirect("/signin");
    });
}

module.exports = {
  //home: home,
  signup: signup,
  signin: signin,
  profile: profile,
  deleteTodo: deleteTodo,
  doneTodo: doneTodo,
};
