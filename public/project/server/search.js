var app = require('../../../express');
var request = require('request');

module.exports = {
  0: simpleSearch
};

var key = process.env.PETFINDER_API_KEY;

// http handlers
app.get("/api/petfinder/:zipCode/:petType", simpleSearch);

//var serverPetList = [];

function simpleSearch(req, res) {
  var zipCode = req.params.zipCode;
  var petType = req.params.petType;
  var url = 'http://api.petfinder.com/pet.find?key=' + key + '&location='
    + zipCode + '&animal=' + petType + '&output=basic&format=json'; //&count=5
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var cleanerData = flattenList(JSON.parse(body).petfinder.pets.pet);
      res.send(cleanerData);
    }
  });
}

function flattenList(objArray) {
  var finishedArray = [];
  for (var i = 0; i < objArray.length; i++) {
    finishedArray.push(flattenObj(objArray[i], ''));
  }
  return finishedArray;
}

function flattenObj(obj) {
  var flatObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // value: the value of $t, if it exists
      var value = obj[key]['$t'];
      if (typeof value === 'string') {
        flatObj[key] = value;
      }
      else if (key === 'media') {
        flatObj[key] = flattenPhotos(obj.media.photos.photo);
      }
      else {
        flatObj[key] = flattenObj(obj[key]);
      }
    }
  }
  return flatObj;
}

function flattenPhotos(photoArray) {
  var largePhotos = [];
  for (var i = 0; i < photoArray.length; i++) {
    if (photoArray[i]['@size'] === 'x') {
      largePhotos.push(photoArray[i]['$t']);
    }
  }
  return largePhotos;
}
