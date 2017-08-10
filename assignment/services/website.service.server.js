var app = require('../../express.js');
var websiteModel = require("../model/website/website.model.server.js");

module.exports = {
  0: createWebsite,
  1: findWebsitesByUser,
  2: findWebsiteById,
  3: updateWebsite,
  4: deleteWebsite
};

// http handlers
app.post("/api/user/:uid/website", createWebsite);
app.get("/api/user/:uid/website", findWebsitesByUser);
app.get("/api/website/:wid", findWebsiteById);
app.put("/api/website/:uid", updateWebsite);
app.delete("/api/website/:uid/:wid", deleteWebsite);

function createWebsite(request, response) {
  var website = request.body;
  var userId = request.params.uid;
  websiteModel
    .createWebsite(userId, website)
    .then(function(websites) {
      response.json(websites);
    });
}

function findWebsitesByUser(request, response) {
  var userId = request.params.uid;
  websiteModel
    .findWebsitesByUser(userId)
    .then(function(websites) {
      response.json(websites);
    });
}

function findWebsiteById(request, response) {
  var websiteId = request.params.wid;
  websiteModel
    .findWebsiteById(websiteId)
    .then(function(website) {
      response.json(website);
    });
}

function updateWebsite(request, response) {
  var website = request.body;
  var userId = request.params.uid;
  websiteModel
    .updateWebsite(userId, website)
    .then(function(website) {
      response.json(website);
    });
}

function deleteWebsite(request, response) {
  var websiteId = request.params.wid;
  var userId = request.params.uid;
  websiteModel
    .deleteWebsite(userId, websiteId)
    .then(function(websites) {
      response.json(websites);
    });
}


