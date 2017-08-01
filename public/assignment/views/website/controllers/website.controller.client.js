(function() {
  angular
    .module("WebAppMaker")
    .controller("WebsiteListController", WebsiteListController)
    .controller("NewWebsiteController", NewWebsiteController)
    .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($location, $routeParams, WebsiteService) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.toProfile = toProfile;
      vm.toPageList = toPageList;
      vm.toNewWebsite = toNewWebsite;
      vm.toEditWebsite = toEditWebsite;

      function init() {
        var promise = WebsiteService.findWebsitesByUser(vm.userId);

        promise.then(function(response) {
          vm.websites = response.data;
        });
      }

      init();

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function toPageList(websiteId) {
        $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
      }

      function toNewWebsite() {
        $location.url("/user/" + vm.userId + "/website/new");
      }

      function toEditWebsite(websiteId) {
        $location.url("/user/" + vm.userId + "/website/" + websiteId);
      }

    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.website =   {
        "_id": "0", //TODO generate actual id for these
        "name": "",
        "developerId": vm.userId,
        "description": ""
      };
      vm.toWebsiteList = toWebsiteList;
      vm.toProfile = toProfile;
      vm.createWebsite = createWebsite;
      vm.toPageList = toPageList;
      vm.toEditWebsite = toEditWebsite;

      function init() {
        var websitesPromise = WebsiteService.findWebsitesByUser(vm.userId);

        websitesPromise.then(function(response) {
          vm.websites = response.data;
        });
      }

      init();

      function toWebsiteList() {
        $location.url("/user/" + vm.userId + "/website");
      }

      function toPageList(websiteId) {
        console.log(websiteId);
        $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
      }

      function toEditWebsite(websiteId) {
        console.log(websiteId);
        $location.url("/user/" + vm.userId + "/website/" + websiteId);
      }

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function createWebsite() {
        var promise = WebsiteService.createWebsite(vm.userId, vm.website);
        promise.then(function(response) {
          $location.url("/user/" + vm.userId + "/website");
          vm.websites = response.data;
        });
      }

    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
      var vm = this;
      vm.websiteId = $routeParams["wid"];
      vm.userId = $routeParams["uid"];
      vm.toWebsiteList = toWebsiteList;
      vm.toProfile = toProfile;
      vm.updateWebsite = updateWebsite;
      vm.deleteWebsite = deleteWebsite;
      vm.toPageList = toPageList;
      vm.toEditWebsite = toEditWebsite;

      function init() {
        var websitePromise = WebsiteService.findWebsiteById(vm.websiteId);
        var websitesPromise = WebsiteService.findWebsitesByUser(vm.userId);

        websitePromise.then(function(response) {
          vm.website = response.data;
        });

        websitesPromise.then(function(response) {
          vm.websites = response.data;
        });
      }

      init();

      function toWebsiteList() {
        $location.url("/user/" + vm.userId + "/website");
      }

      function toPageList(websiteId) {
        $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
      }

      function toEditWebsite(websiteId) {
        $location.url("/user/" + vm.userId + "/website/" + websiteId);
      }

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function updateWebsite() {
        var promise = WebsiteService.updateWebsite(vm.websiteId, vm.website);
        promise.then(function(response) {
          $location.url("/user/" + vm.userId + "/website");
          vm.websites = response.data;
        });
      }

      function deleteWebsite() {
        var promise = WebsiteService.deleteWebsite(vm.websiteId);
        promise.then(function(response) {
          vm.websites = response.data;
          $location.url("/user/" + vm.userId + "/website");
        });
      }
    }

})();
