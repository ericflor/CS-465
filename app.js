require("dotenv").config();


const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

const indexRouter = require("./app_server/routes/index");
const apiRouter = require("./app_api/routes/index");
const travelRouter = require("./app_server/routes/travel");

const app = express();

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app_server", "views"));

// register handlebars partials (https://www.npmjs.com/package/hbs)
const hbs = require("hbs");
require("./app_api/models/db");
hbs.registerPartials(path.join(__dirname, "app_server", "views/partials"));

// PASSPORT AUTHENTICATION
require("./app_api/config/passport");
app.use(passport.initialize());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/travel", travelRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// CATCH UNAUTHORIZED ERROR AND CREATE 401
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  } else {
    next(err);
  }
});

module.exports = app;
