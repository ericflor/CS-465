const mongoose = require("mongoose");
require("../models/travlr");
const Model = mongoose.model("trips");

// ALL THE COMMENTED OUT CODE DOESN'T WORK 

// GET ALL TRIPS
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();
    if (!trips) {
      return res.status(404).json({ message: "trips not found" });
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
    const trips = await Model.find({ code: req.params.tripCode }).exec();
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "trip not found" });
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

// ADD A TRIP
// const tripsAddTrip = async (req, res) => {
//   try {
//     Model.create(
//       {
//         code: req.body.code,
//         name: req.body.name,
//         length: req.body.length,
//         start: req.body.start,
//         resort: req.body.resort,
//         perPerson: req.body.perPerson,
//         image: req.body.image,
//         description: req.body.description,
//       },
//       (err, trip) => {
//         if (err) {
//           return res.status(404).json({ message: err });
//         } else {
//           return res.status(200).json(trip);
//         }
//       }
//     );
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// ADD A TRIP
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });

    return res.status(201).json(trip);
  } catch (err) {
    console.log(res.err)
    console.log(err)
    return res.status(500).json(err);
  }
};

// UPDATE A TRIP
const tripsUpdateTrip = async (req, res) => {
  console.log(req.body);
  Model.findOneAndUpdate({ 'code': req.params.tripCode },
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    },
    { new: true }
  )
    .then((trip) => {
      if (!trip) {
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode,
        });
      }
      // res.send(trip);
      res.status(200).json(trip)
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode,
        });
      }
      return res
        .status(500)
        .json(err);
    });
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
};
