const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
          console.error("Passport authentication error: Incorrect email.");
          return done(null, false, {
            message: "Incorrect email.",
          });
        }
        if (!user.validPassword(password)) {
          console.error("Passport authentication error: Incorrect password.");
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        console.log("Passport authentication success.");
        return done(null, user);
      } catch (err) {
        console.error("Passport authentication error:", err);
        return done(err);
      }
    }
  )
);

module.exports = passport;



// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose");
// const User = mongoose.model("user");

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     (username, password, done) => {
//       User.findOne({ email: username }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, {
//             message: "Incorrect username.",
//           });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, {
//             message: "Incorrect password.",
//           });
//         }
//         return done(null, user);
//       });
//     }
//   )
// );
