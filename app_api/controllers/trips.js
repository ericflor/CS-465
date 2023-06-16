const mongoose = require("mongoose");
require("../models/travlr");
require("../models/user");
const Model = mongoose.model("trips");
const User = mongoose.model("user");

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

// ADD A TRIP
const tripsAddTrip = async (req, res) => {
  getUser(req, res, (req, res) => {
    Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    }, (err, trip) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(201).json(trip);
      }
    });
  });
};


// UPDATE A TRIP
const tripsUpdateTrip = async (req, res) => {
  getUser(req, res, (req, res) => {
    console.log(req.body);
    Model.findOneAndUpdate(
      { code: req.params.tripCode },
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
        res.status(200).json(trip);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Trip not found with code " + req.params.tripCode,
          });
        }
        return res.status(500).json(err);
      });
  });
};


// GET A USER
const getUser = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    User.findOne({ email: req.payload.email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      callback(req, res, user.name);
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  getUser,
};
