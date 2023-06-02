
// var fs = require('fs'); 
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8')); 

// /* GET travel view */ 
// const travel = (req, res) => {
//   res.render('travel', { title: 'Travlr Getaways', trips: trips });
// };

const request = require('request');
const apiOptions = { server: 'http://localhost:3000' };

// GET TRAVEL LIST VIEW
const travelList = (req, res) => {
  const path = '/api/trips';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };
  console.log("TravelController.travelList calling => " + requestOptions.url);
  request(requestOptions, (err, {statusCode}, body) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    renderTravelList(req, res, body);
  });
};

// RENDER THE TRAVEL LIST
const renderTravelList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + ' - Travel';
  if (!(responseBody instanceof Array)) {
    message = 'API Lookup Error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No trips exist in our database!';
    }
  }
  res.render('travel', {
    title: pageTitle,
    trips: responseBody,
    message,
  });
};

module.exports = {
  travelList,
};

