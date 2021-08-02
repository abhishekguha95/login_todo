console.log("app line 1");
const express = require("express");
const session = require("express-session");
//const cors = require("cors");

const app = express();
const mainRoutes = require("./backend/routes/mainRoutes");
//const compression = require("compression");
//const cookieParser = require("cookie-parser");

// setting path of view folder
app.set("views", __dirname + "/client/views");

// setting view-engine as ejs
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());

// app.use(
//   session({
//     key: "user_sid",
//     secret: "secret1",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       path: "/",
//       httpOnly: true,
//       secure: false,
//       maxAge: null,
//     },
//   })
// );

//app.use(cookieParser());

app.use(
  session({
    secret: "SessionSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    },
  })
);

console.log("in app before route call");
app.use("/", mainRoutes);
console.log("in app after route call");

app.listen(4000, () => {
  console.log("app listening on port 4000");
});

module.exports = app;
