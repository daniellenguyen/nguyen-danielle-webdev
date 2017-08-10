var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/database'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds151232.mlab.com:51232/heroku_fl0s7c2d';
}

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString, { useMongoClient: true });
mongoose.Promise = q.Promise;
module.exports = db;