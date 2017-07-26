(function() {
  angular
    .module("WebAppMaker")
    .controller("WidgetListController", WidgetListController)
    .controller("NewWidgetController", NewWidgetController)
    .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($location, $routeParams, WidgetService) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.pageId = $routeParams["pid"];
      vm.toPageList = toPageList;
      vm.toNewWidget = toNewWidget;
      vm.toProfile = toProfile;

      function toProfile() {
        $location.url("/user/" + vm.userId);
      }

      function toPageList() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      }

      function toNewWidget() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/"+ vm.pageId + "/widget/new");
      }

      function init() {
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
      }

      init();

    }

    function NewWidgetController($location, $routeParams) {
      var vm = this;
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.pageId = $routeParams["pid"];
      vm.toWidgetList = toWidgetList;
      vm.toEditWidget = toEditWidget;
      console.log($routeParams);

      function toWidgetList() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
      }

      function toEditWidget() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + ":wgid");
      }

    }

    function EditWidgetController($location, $routeParams, WidgetService) {
      var vm = this;
      vm.widgetId = $routeParams["widgetId"];
      vm.userId = $routeParams["uid"];
      vm.websiteId = $routeParams["wid"];
      vm.pageId = $routeParams["pid"];
      vm.toWidgetList = toWidgetList;

      function toWidgetList() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
      }

      function init() {
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
      }

      init();

    }

})();
