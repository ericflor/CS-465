require('./user');

const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');
// const Trip = mongoose.model('trips', require('../models/travlr'));

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// const connect = () => {
//   setTimeout(() => mongoose.connect(dbURI, {
//     useNewUrlParser: true,
//   }), 1000);
// };


const connect = () => {
  // mongoose.model('user', require('./user')); 
  setTimeout(() => mongoose.connect(dbURI, { useNewUrlParser: true }), 1000);
};



mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
  
 // Retrieve all trips
  const Trip = mongoose.model('trips');
  const User = mongoose.model('user');
  const query = Trip.find({});
  const query2 = User.find({});
  query.exec()
    .then(trips => {
      console.log('Retrieved Trips:', trips);
      // Close the MongoDB connection
    //   mongoose.connection.close(() => {
    //     console.log('Mongoose disconnected');
    //   });
    })
    
    .catch(err => {
      console.error(err);

      // Close the MongoDB connection
    //   mongoose.connection.close(() => {
    //     console.log('Mongoose disconnected');
    //   });
    });
  query2.exec()
  .then(user => {
    console.log('Retrieved Users', user);
  })
  .catch(err => {
    console.error(err);
  })
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

connect();

require('./travlr');
// require('./user');
