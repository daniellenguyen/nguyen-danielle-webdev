(function() {
  angular
    .module("WebAppMaker")
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "/views/user/login.view.client.html"
      })
      .when("/register", {
        templateUrl: "/views/user/register.view.client.html"
      })
      .when("/user/:uid", {
        templateUrl: "/views/user/profile.view.client.html"
      })
      .when("/user/:uid/website", {
        templateUrl: "/views/website/website-list.view.client.html"
      })
      .when("/user/:uid/website/new", {
        templateUrl: "/views/website/website-new.view.client.html"
      })
      .when("/user/:uid/website/:wid", {
        templateUrl: "/views/website/website-edit.view.client.html"
      })
      .when("/user/:uid/website/:wid/page", {
        templateUrl: "/views/page/page-list.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/new", {
        templateUrl: "/views/page/page-new.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/:pid", {
        templateUrl: "/views/page/page-edit.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/:pid/widget", {
        templateUrl: "/views/widget/widget-list.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/:pid/widget/new", {
        templateUrl: "/views/widget/widget-choose.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/:pid/widget/heading", {
        templateUrl: "/views/widget/widget-heading.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/:pid/widget/image", {
        templateUrl: "/views/widget/widget-image.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/:pid/widget/youtube", {
        templateUrl: "/views/widget/widget-youtube.view.client.html"
      })
      .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
        templateUrl: "/views/widget/widget-edit.view.client.html"
      })
  }
})();
