const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const register = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Passport authentication error:", err);
      return res.status(400).json({ message: "Passport authentication error" });
    }
    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      console.error("Login failed:", info.message);
      res.status(401).json({ message: "Login failed: Invalid email or password" });
    }
  })(req, res);
};

// const login = (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     return res.status(400).json({ message: "All fields required" });
//   }
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res.status(400).json(err);
//     }
//     if (user) {
//       const token = user.generateJwt();
//       res.status(200).json({ token });
//     } else {
//       res.status(401).json(info);
//     }
//   })(req, res);
// };

module.exports = { register, login };



// const passport = require("passport");
// const mongoose = require("mongoose");
// const User = mongoose.model('user');

// const register = (req, res) => {
//   if (!req.body.name || !req.body.email || !req.body.password) {
//     return res.status(400).json({ message: "All fields required" });
//   }
//   const user = new User();
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.setPassword(req.body.password);
//   user.save((err) => {
//     if (err) {
//       res.status(400).json(err);
//     } else {
//       const token = user.generateJwt();
//       res.status(200).json({ token });
//     }
//   });
// };

// const login = (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     return res.status(400).json({ message: "All fields required" });
//   }
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res.status(404).json(err);
//     }
//     if (user) {
//       const token = user.generateJwt();
//       res.status(200).json({ token });
//     } else {
//       res.status(401).json(info);
//     }
//   })(req, res);
// };

// module.exports = { register, login };
