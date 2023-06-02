const express = require('express');
const router = express.Router();
const {
  tripsList,
  tripsFindByCode
} = require('../controllers/trips');

// GET ALL TRIPS
router.get('/trips', tripsList);

// GET SINGLE TRIP
router.get('/trips/:tripCode', tripsFindByCode);

module.exports = router;
