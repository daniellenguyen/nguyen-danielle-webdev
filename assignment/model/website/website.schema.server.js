var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
  developer: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
  user_id: String,
  name: String,
  description: String,
  pages: [],
  dateCreated: {type: Date, default: Date.now}
}, {collection: "website"});

module.exports = websiteSchema;