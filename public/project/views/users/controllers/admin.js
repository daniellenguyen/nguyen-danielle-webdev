(function() {
  angular
    .module("PetWebsite")
    .controller("AdminController", AdminController);

  function AdminController($location, $routeParams, UserService) {
    var vm = this;
    vm.toSearch = toSearch;
    vm.userList = [];

    function init() {
      var promise = UserService.getAllUsers();
      promise.then(function(response) {
        var users = response.data;
        console.log(users);
      });
    }

    init();

    function toSearch() {
      $location.url("/");
    }

  }

})();