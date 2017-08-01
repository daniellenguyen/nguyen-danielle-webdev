var app = require('../../express.js');

module.exports = {
  0: createWebsite,
  1: findWebsitesByUser,
  2: findWebsiteById,
  3: updateWebsite,
  4: deleteWebsite
};

var websites = [
  {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
  {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
  {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
  {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
  {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
  {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
  {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

// http handlers
app.post("/api/user/:uid/website", createWebsite);
app.get("/api/user/:uid/website", findWebsitesByUser);
app.get("/api/website/:wid", findWebsiteById);
app.put("/api/website/:wid", updateWebsite);
app.delete("/api/website/:wid", deleteWebsite);

function createWebsite(request, response) {
  var websiteChanged = request.body;
  var newWebsites = websites;
  if (websiteChanged) {
    newWebsites.push(websiteChanged);
    websites = newWebsites;
    response.send(newWebsites);
  }
}

function findWebsitesByUser(request, response) {
  var websiteList = [];
  var userId = request.params.uid;
  if (userId) {
    for (var i = 0; i < websites.length; i++) {
      if (websites[i].developerId === userId) {
        websiteList.push(websites[i]);
      }
    }
    response.send(websiteList);
  }
}

function findWebsiteById(request, response) {
  var websiteId = request.params.wid;
  if (websiteId) {
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id === websiteId) {
        //return angular.copy(websites[i]);
        response.send(websites[i]);
        return;
      }
    }
  }
}

function updateWebsite(request, response) {
  var websiteId = request.params.wid;
  var website = request.body;
  var newWebsites = websites;
  if (websiteId && website) {
    for (var i = 0; i < websites.length; i++) {
      if (newWebsites[i]._id === websiteId) {
        newWebsites[i] = website;
        response.send(newWebsites);
        return;
      }
    }
  }
}

function deleteWebsite(request, response) {
  var websiteId = request.params.wid;
  var newWebsites = websites;
  for (var i = 0; i < websites.length; i++) {
    if (newWebsites[i]._id === websiteId) {
      newWebsites.splice(i, 1);
      response.send(newWebsites);
    }
  }
}


