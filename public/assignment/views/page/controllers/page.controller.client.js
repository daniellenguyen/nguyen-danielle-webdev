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

      function init() {
        var promise = PageService.findPagesByWebsiteId(vm.websiteId);

        promise.then(function(response) {
          vm.pages = response.data;
        });
      }

      init();

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

    }

    function NewPageController($location, $routeParams, PageService) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.toPageList = toPageList;
      vm.toProfile = toProfile;
      vm.createPage = createPage;
      vm.toWidgetList = toWidgetList;
      vm.toEditPage = toEditPage;
      vm.page = {
        "_id": "0", //TODO generate actual id for these
        "name": "",
        "websiteId": vm.websiteId,
        "description": ""
      };

      function init() {
        var promise = PageService.findPagesByWebsiteId(vm.websiteId);

        promise.then(function(response) {
          vm.pages = response.data;
        })
      }

      init();

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function toPageList() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function toWidgetList(pageId) {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId + "/widget");
      }

      function toEditPage(pageId) {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId);
      }

      function createPage() {
        if (vm.page.name) {
          var promise = PageService.createPage(vm.websiteId, vm.page);
          promise.then(function (response) {
            vm.pages = response.data;
            this.toPageList();
          });
        }
        else {
          this.toPageList();
        }
      }

    }

    function EditPageController($location, $routeParams, PageService) {
      var vm = this;
      vm.pageId = $routeParams["pid"];
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.toPageList = toPageList;
      vm.toProfile = toProfile;
      vm.toEditPage = toEditPage;
      vm.toWidgetList = toWidgetList;
      vm.updatePage = updatePage;
      vm.deletePage = deletePage;

      function init() {
        var pagePromise = PageService.findPageById(vm.pageId);
        var pagesPromise = PageService.findPagesByWebsiteId(vm.websiteId);

        pagePromise.then(function(response) {
          vm.page = response.data;
        });

        pagesPromise.then(function(response) {
          vm.pages = response.data;
        });
      }

      init();

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function toPageList() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function toEditPage(pageId) {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId);
      }

      function toWidgetList(pageId) {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId + "/widget");
      }

      function updatePage(page) {
        var promise = PageService.updatePage(vm.pageId, vm.page);

        promise.then(function(response) {
          vm.pages = response.data;
          $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        });
      }

      function deletePage() {
        var promise = PageService.deletePage(vm.pageId);

        promise.then(function(response) {
          vm.pages = response.data;
          $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        });
      }

    }

})();
