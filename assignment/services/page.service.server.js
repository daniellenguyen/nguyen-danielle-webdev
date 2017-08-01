var app = require('../../express.js');

module.exports = {
  0: createPage,
  1: findPagesByWebsiteId,
  2: findPageById,
  3: updatePage,
  4: deletePage
};

var pages = [
  {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
  {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
  {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

// http handlers
app.post("/api/website/:wid/page", createPage);
app.get("/api/website/:wid/page", findPagesByWebsiteId);
app.get("/api/page/:pid", findPageById);
app.put("/api/page/:pid", updatePage);
app.delete("/api/page/:pid", deletePage);

function createPage(request, response) {
  var pageChanged = request.body;
  var newPages = pages;
  if(pageChanged) {
    newPages.push(pageChanged);
    pages = newPages;
    response.send(newPages);
  }
}

function findPagesByWebsiteId(request, response) {
  var websiteId = request.params.wid;
  var pageList = [];
  if (websiteId) {
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].websiteId === websiteId) {
        pageList.push(pages[i]);
      }
    }
    response.send(pageList);
  }
}

function findPageById(request, response) {
  var pageId = request.params.pid;
  if (pageId) {
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === pageId) {
        response.send(pages[i]);
      }
    }
  }
}

function updatePage(request, response) {
  var pageId = request.params.pid;
  var page = request.body;
  var newPages = pages;
  if (pageId && page) {
    for (var i = 0; i < pages.length; i++) {
      if (newPages[i]._id === pageId) {
        newPages[i] = page;
        response.send(newPages);
        return;
      }
    }
  }
}

function deletePage(request, response) {
  var pageId = request.params.pid;
  var newPages = pages;
  if (pageId) {
    for (var i = 0; i < pages.length; i++) {
      if (newPages[i]._id === pageId) {
        newPages.splice(i, 1);
        response.send(newPages);
      }
    }
  }
}

