var mongoose = require("mongoose");
var db = require("../../../database.js");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;
module.exports = websiteModel;

function createWebsite(userId, website) {
  var websiteTmp = null;
  return websiteModel
    .create(website)
    .then(function (websiteDoc) {
      websiteTmp = websiteDoc;
      return userModel.addWebsite(userId, websiteDoc._id)
    })
    .then(function () {
      return websiteTmp;
    })
}

function findWebsitesByUser(userId) {
  return websiteModel
    .find({user_id: userId})
    .populate('developer', 'username')
    .exec();
}

function findWebsiteById(websiteId) {
  return websiteModel.findById(websiteId);
}

function updateWebsite(website) {
  return websiteModel
    .findOneAndUpdate({_id: website._id}, {$set: website});
}

function deleteWebsite(userId, websiteId) {
  return websiteModel
    .remove({_id: websiteId})
    .then(function () {
      return userModel.removeWebsite(userId, websiteId);
    });
}

function addPage(websiteId, pageId) {
  return websiteModel
    .findById(websiteId)
    .then(function (website) {
      website.pages.push(pageId);
      return website.save();
    });
}

function removePage(websiteId, pageId) {
  return websiteModel
    .findById(websiteId)
    .then(function (website) {
      var index = website.pages.indexOf(pageId);
      website.pages.splice(index, 1);
      return website.save();
    });
}
