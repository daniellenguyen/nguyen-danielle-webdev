(function() {
  angular
    .module("WebAppMaker")
    .factory("WebsiteService", WebsiteService);
  function WebsiteService($http) {
    var api = {
      "createWebsite"   : createWebsite,
      "findWebsitesByUser" : findWebsitesByUser,
      "findWebsiteById" : findWebsiteById,
      "updateWebsite" : updateWebsite,
      "deleteWebsite" : deleteWebsite
    };
    return api;

    function createWebsite(userId, website) {
      var url = "/api/user/" + userId + "/website";
      return $http.post(url, website);
    }

    function findWebsitesByUser(userId) {
      var url = "/api/user/" + userId + "/website";
      return $http.get(url);
    }

    function findWebsiteById(websiteId) {
      var url = "/api/website/" + websiteId;
      return $http.get(url);
    }

    function updateWebsite(userId, website) {
      var url = "/api/website/" + userId;
      return $http.put(url, website);
    }

    function deleteWebsite(userId, websiteId) {
      var url = "/api/website/" + userId + "/" + websiteId;
      return $http.delete(url);
    }
  }
})();
