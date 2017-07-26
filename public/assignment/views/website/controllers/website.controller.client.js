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

      function init() {
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
      }

      init();

    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.toWebsiteList = toWebsiteList;
      vm.toProfile = toProfile;
      vm.updateWebsite = updateWebsite;
      vm.toPageList = toPageList;
      vm.toEditWebsite = toEditWebsite;

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

      function updateWebsite(website) {
        WebsiteService.updateWebsite(vm.websiteId, website);
        $location.url("/user/" + vm.userId + "/website");
      }

      function init() {
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        // model.website = jQuery.extend(true, {}, WebsiteService.findWebsiteById(model.websiteId));
      }

      init();

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

      function updateWebsite(website) {
        WebsiteService.updateWebsite(vm.websiteId, website);
        $location.url("/user/" + vm.userId + "/website");
      }

      function deleteWebsite() {
        WebsiteService.deleteWebsite(vm.websiteId);
        $location.url("/user/" + vm.userId + "/website");
      }

      function init() {
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        // model.website = jQuery.extend(true, {}, WebsiteService.findWebsiteById(model.websiteId));
      }

      init();

    }

})();
