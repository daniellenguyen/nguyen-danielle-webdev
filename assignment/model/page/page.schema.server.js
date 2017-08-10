var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
  _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
  website_id: String,
  name: String,
  title: String,
  description: String,
  widgets: [],
  dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports = pageSchema;