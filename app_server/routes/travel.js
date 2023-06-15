// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/travel");

// /* GET home page. */ 
// router.get("/", controller.travel);
// module.exports = router;

const express = require('express');
const router = express.Router();
const { travelList } = require('../controllers/travel');

// GET TRAVEL LIST
router.get('/', travelList);

module.exports = router;


