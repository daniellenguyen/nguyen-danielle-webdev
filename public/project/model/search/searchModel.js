var mongoose = require("mongoose");
var searchSchema = require("./searchSchema.js");
var searchModel = mongoose.model("UserModel", searchSchema);
searchModel.createPet = createPet;

module.exports = searchModel;

function createPet(pet) {
  return searchModel.create(pet);
}