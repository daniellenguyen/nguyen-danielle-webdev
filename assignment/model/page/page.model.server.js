var mongoose = require("mongoose");
var db = require("../../../database.js");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;

function createPage(websiteId, page) {
  var pageTmp = null;
  return pageModel
    .create(page)
    .then(function (pageDoc) {
      pageTmp = pageDoc;
      return websiteModel.addPage(websiteId, pageDoc._id);
    })
    .then(function () {
      return pageTmp;
    })
}

function findPagesByWebsiteId(websiteId) {
  return pageModel
    .find({website_id: websiteId})
    .populate('_website')
    .exec();
}

function findPageById(pageId) {
  return pageModel.findById(pageId);
}

function updatePage(page) {
  return pageModel
    .findOneAndUpdate({_id: page._id}, {$set: page});
}

function deletePage(websiteId, pageId) {
  return pageModel
    .remove({_id: pageId})
    .then(function () {
      return websiteModel.removePage(websiteId, pageId);
    });
}