console.log("route file line 1");
const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const postController = require("../controllers/postController");

function checklogin(req, res, next) {
  if (req.session.login) {
    res.redirect("/");
  } else {
    next();
  }
}

router.route("/").get(mainController.profile); //Line1
router.route("/signup").get(checklogin, mainController.signup); //Line2
router.route("/signin").get(checklogin, mainController.signin);

console.log("before posrctrl invoked in route");

router.route("/signup").post(postController.signup);
router.route("/signin").post(postController.signin);
router.route("/addtodo").post(postController.addTodo);
router.route("/logout").post(postController.logout);

// router.route("/editTodo/:id").get(postController.editTodo);
router.route("/doneTodo/:id").get(mainController.doneTodo);
router.route("/deleteTodo/:id").get(mainController.deleteTodo);

// router.route("/profile").get(checklogin, mainController.profile);

console.log("after posrctrl invoked in route");

module.exports = router;
