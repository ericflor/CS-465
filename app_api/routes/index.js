const express = require('express');
const router = express.Router();
// const {
//   tripsList,
//   tripsFindByCode,
//   tripsAddTrip,
//   tripsUpdateTrip
// } = require('../controllers/trips');
const tripsController = require('../controllers/trips');

// // GET ALL TRIPS
// router.get('/trips', tripsList);

// // GET SINGLE TRIP
// router.get('/trips/:tripCode', tripsFindByCode);

// // ADD A TRIP
// router.post('/trips', tripsAddTrip);

// // UPDATE A TRIP
// router.put('/trips/:tripCo', tripsUpdateTrip);

router.route('/trips').get(tripsController.tripsList).post(tripsController.tripsAddTrip);
router.route('/trips/:tripCode').get(tripsController.tripsFindByCode).put(tripsController.tripsUpdateTrip);

module.exports = router;
