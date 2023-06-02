const mongoose = require('mongoose');
require('../models/travlr');
const Model = mongoose.model('trips');

// GET ALL TRIPS
const tripsList = async (req, res) => {
    try {
      const trips = await Model.find({}).exec();
      if (!trips) {
        return res.status(404).json({ "message": "trips not found" });
      } else {
        return res.status(200).json(trips);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
};
// const tripsList = async(req, res) => {
//     Model.find({})
//     .exec((err, trips) => {
//         if(!trips){
//             return res.status(404).json({"message": "trips not found"});
//         } else if(err){
//             return res.status(404).json(err);
//         }else {
//             return res.status(200).json(trips);
//         }
//     });
// };

// GET SINGLE TRIP
const tripsFindByCode = async (req, res) => {
    try {
      const trips = await Model.find({ 'code': req.params.tripCode }).exec();
      if (!trips || trips.length === 0) {
        return res.status(404).json({ "message": "trip not found" });
      } else {
        return res.status(200).json(trips);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
};
// const tripsFindByCode = async(req, res) => {
//     Model.find({'code': req.params.tripCode})
//     .exec((err, trips) => {
//         if(!trips){
//             return res.status(404).json({"message": "trip not found"});
//         } else if(err){
//             return res.status(404).json(err);
//         }else {
//             return res.status(200).json(trips);
//         }
//     });
// }

module.exports = {
    tripsList,
    tripsFindByCode
}