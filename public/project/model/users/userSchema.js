var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  type: String,
  pets: [],
  dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;
