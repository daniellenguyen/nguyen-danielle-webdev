var app = require('../../../express');
var request = require('request');

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
