(function() {
  angular
    .module("WebAppMaker")
    .factory("PageService", PageService);
  function PageService() {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
      ];
    var api = {
      "createPage"   : createPage,
      "findPagesByWebsiteId" : findPagesByWebsiteId,
      "findPageById" : findPageById,
      "updatePage" : updatePage,
      "deletePage" : deletePage
    };
    return api;

    function createPage(websiteId, page) {
      var newPage = page;
      newPage.websiteId = websiteId;
      pages.push(newPage);
    }

    function findPagesByWebsiteId(websiteId) {
      var pageList = [];
      for(var i = 0; i < pages.length; i++) {
        if (pages[i].websiteId === websiteId) {
          pageList.push(pages[i]);
        }
      }
      return pageList;
    }

    function findPageById(pageId) {
      for(var i = 0; i < pages.length; i++) {
        if(pages[i]._id === pageId) {
          return pages[i];
        }
      }
    }

    function updatePage(pageId, page) {
      for(var i = 0; i < pages.length; i++) {
        if(pages[i]._id === pageId) {
          pages[i] = page;
        }
      }
    }

    function deletePage(pageId) {
      for(var i = 0; i < pages.length; i++) {
        if(pages[i]._id === pageId) {
          pages.splice(i, 0);
        }
      }
    }
  }

})();
