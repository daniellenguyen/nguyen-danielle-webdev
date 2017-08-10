var app = require('../../express.js');
var pageModel = require("../model/page/page.model.server.js");

module.exports = {
  0: createPage,
  1: findPagesByWebsiteId,
  2: findPageById,
  3: updatePage,
  4: deletePage
};

// http handlers
app.post("/api/website/:wid/page", createPage);
app.get("/api/website/:wid/page", findPagesByWebsiteId);
app.get("/api/page/:pid", findPageById);
app.put("/api/page/", updatePage);
app.delete("/api/page/:pid", deletePage);

function createPage(request, response) {
  var websiteId = request.params.wid;
  var page = request.body;
  pageModel
    .createPage(websiteId, page)
    .then(function (pages) {
      response.json(pages);
    });
}

function findPagesByWebsiteId(request, response) {
  var websiteId = request.params.wid;
  pageModel
    .findPagesByWebsiteId(websiteId)
    .then(function (pages) {
      response.json(pages);
    });
}

function findPageById(request, response) {
  var pageId = request.params.pid;
  pageModel
    .findPageById(pageId)
    .then(function (page) {
      response.json(page);
    });
}

function updatePage(request, response) {
  var page = request.body;
  pageModel
    .updatePage(page)
    .then(function(page) {
      response.json(page);
    });
}

function deletePage(request, response) {
  var websiteId = request.params.wid;
  var pageId = request.params.pid;
  pageModel
    .deletePage(websiteId, pageId)
    .then(function(pages) {
      response.json(pages);
    });
}

