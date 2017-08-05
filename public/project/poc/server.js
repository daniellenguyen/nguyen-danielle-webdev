var app = require('../../../express');
var request = require('request');

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds151232.mlab.com:51232/heroku_fl0s7c2d';
  console.log(username);
  console.log(password);
}

module.exports = {
  0: searchByZipAndType,
  1: getPet
};

// http handlers
app.get("/api/petfinder/:key/details/:petId", getPet);
app.get("/api/petfinder/:key/:zipCode/:petType", searchByZipAndType);

function searchByZipAndType(req, res) {
  var key = req.params.key;
  var zipCode = req.params.zipCode;
  var petType = req.params.petType;
  var url = 'http://api.petfinder.com/pet.find?key=' + key + '&location='
    + zipCode + '&animal=' + petType + '&count=5&output=basic&format=json';
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
}

function getPet(req, res) {
  var key = req.params.key;
  var petId = req.params.petId;
  var url = 'http://api.petfinder.com/pet.get?key=' + key + '&id=' + petId +'&format=json';
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
}
