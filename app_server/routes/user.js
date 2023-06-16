// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const authenticationController = require('../controllers/authentication');

// // Register route
// router.post('/register', authenticationController.register);

// // Login route
// router.post('/login', passport.authenticate('local'), authenticationController.login);

// module.exports = router;


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
