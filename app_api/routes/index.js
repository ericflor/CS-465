const express = require("express");
const router = express.Router();
const {expressjwt} = require('express-jwt');
require('dotenv').config();

// const jwt = require("jsonwebtoken");


const auth = expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// ROUTING FOR AUTHENTICATION
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
