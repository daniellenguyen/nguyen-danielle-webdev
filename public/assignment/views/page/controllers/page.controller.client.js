(function() {
  angular
    .module("WebAppMaker")
    .controller("PageListController", PageListController)
    .controller("NewPageController", NewPageController)
    .controller("EditPageController", EditPageController);

    function PageListController($location, $routeParams, PageService) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.toProfile = toProfile;
      vm.toWebsiteList = toWebsiteList;
      vm.toWidgetList = toWidgetList;
      vm.toNewPage = toNewPage;
      vm.toEditPage = toEditPage;

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function toWebsiteList() {
        $location.url("/user/" + vm.userId + "/website");
      }

      function toNewPage() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
      }

      function toWidgetList(pageId) {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId + "/widget");
      }

      function toEditPage(pageId) {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId);
      }

      function init() {
        vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
      }

      init();

    }

    function NewPageController($location, $routeParams, PageService) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.toPageList = toPageList;
      vm.toProfile = toProfile;
      vm.updatePage = updatePage;

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function toPageList() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function updatePage(page) {
        PageService.updatePage(vm.pageId, page);
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function init() {
        vm.page = jQuery.extend(true, {}, PageService.findPageById(vm.pageId));
      }

    }

    function EditPageController($location, $routeParams, PageService) {
      var vm = this;
      vm.pageId = $routeParams["pid"];
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.toPageList = toPageList;
      vm.toProfile = toProfile;
      vm.updatePage = updatePage;
      vm.deletePage = deletePage;

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function toPageList() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function updatePage(page) {
        PageService.updatePage(vm.pageId, page);
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function deletePage() {
        PageService.deletePage(vm.pageId);
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function init() {
        vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        vm.page = jQuery.extend(true, {}, PageService.findPageById(vm.pageId));
      }

      init();

    }

})();
