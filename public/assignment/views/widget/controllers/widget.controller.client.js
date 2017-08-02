(function () {
  angular
    .module("WebAppMaker")
    .controller("WidgetListController", WidgetListController)
    .controller("NewWidgetController", NewWidgetController)
    .controller("EditWidgetController", EditWidgetController);

  function WidgetListController($location, $routeParams, $sce, WidgetService) {
    var vm = this;
    vm.userId = $routeParams["uid"];
    vm.websiteId = $routeParams["wid"];
    vm.pageId = $routeParams["pid"];
    vm.toPageList = toPageList;
    vm.toNewWidget = toNewWidget;
    vm.toProfile = toProfile;
    vm.toWidgetEdit = toWidgetEdit;

    function init() {
      var promise = WidgetService.findWidgetsByPageId(vm.pageId);

      promise.then(function (response) {
        vm.widgets = response.data;

        for (var i = 0; i < vm.widgets.length; i++) {
          var type = vm.widgets[i].widgetType;
          if (type === 'YOUTUBE') {
            vm.widgets[i].url = $sce.trustAsResourceUrl(vm.widgets[i].url);
          }
        }
      });
    }

    init();

    function toProfile() {
      $location.url("/user/" + vm.userId);
    }

    function toPageList() {
      $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
    }

    function toNewWidget() {
      $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
    }

    function toWidgetEdit(widget) {
      var type = widget.widgetType;
      if (type === 'HEADING') {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
          + "/page/" + vm.pageId + "/widget/heading/" + widget._id);
      }
      else if (type === 'IMAGE') {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
          + "/page/" + vm.pageId + "/widget/image/" + widget._id);
      }
      else if (type === 'YOUTUBE') {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
          + "/page/" + vm.pageId + "/widget/youtube/" + widget._id);
      }
    }


  }

  function NewWidgetController($location, $routeParams, WidgetService) {
    var vm = this;
    vm.userId = $routeParams["uid"];
    vm.websiteId = $routeParams["wid"];
    vm.pageId = $routeParams["pid"];
    vm.widget =
      vm.toWidgetList = toWidgetList;
    vm.toEditWidget = toEditWidget;
    vm.createWidget = createWidget;

    function toWidgetList() {
      $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
    }

    // function toEditWidget() {
    //   $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + );
    // }

    function createWidget() {
      if (vm.widget.widgetType) { //TODO come back and maybe rethink this param
        var promise = WidgetService.createWidget(vm.widgetId, vm.widget);
        promise.then(function (response) {
          vm.widgets = response.data;
          this.toWidgetList();
        });
      }
      else {
        this.toWidgetList();
      }
    }

  }

  function EditWidgetController($location, $routeParams, WidgetService) {
    var vm = this;
    vm.widgetId = $routeParams["wqid"];
    vm.userId = $routeParams["uid"];
    vm.websiteId = $routeParams["wid"];
    vm.pageId = $routeParams["pid"];
    vm.toWidgetList = toWidgetList;

    function init() {
      var promise = WidgetService.findWidgetById(vm.widgetId);

      promise.then(function(response) {
        vm.widget = response.data;
      });
    }

    init();

    function toWidgetList() {
      $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
    }

    function updateWidget(widget) {
      var promise = WidgetService.updateWidget(vm.widgetId, vm.widget);

      promise.then(function (response) {
        vm.widgets = response.data;
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
      });
    }

    function deleteWidget() {
      var promise = WidgetService.deleteWidget(vm.widgetId);

      promise.then(function (response) {
        vm.widgets = response.data;
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
      });
    }

  }

})();
