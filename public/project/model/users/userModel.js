var mongoose = require("mongoose");
var userSchema = require("./userSchema.js");
var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findAllUsers = findAllUsers;
userModel.addPet = addPet;
userModel.removePet = removePet;
module.exports = userModel;

function createUser(user) {
  return userModel.create(user);
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
  return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
  return userModel.findOneAndUpdate({_id: userId},
    {$set: user});
}

function deleteUser(userId) {
  return userModel.findOneAndRemove({_id: userId});
}

function findAllUsers() {
  return userModel.find();
}

function addPet(userId, petId) {
  return userModel
    .findById(userId)
    .then(function (user) {
      user.websites.push(petId);
      return user.save();
    });
}

function removePet(userId, petId) {
  return userModel
    .findById(userId)
    .then(function (user) {
      var index = user.pets.indexOf(petId);
      user.websites.splice(index, 1);
      return user.save();
    });
}


