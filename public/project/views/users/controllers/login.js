(function() {
  angular
    .module("PetWebsite")
    .controller("LoginController", LoginController);

  function LoginController($location, $routeParams, UserService) {
    var vm = this;
    vm.toProfile = toProfile;
    vm.toRegister = toRegister;
    vm.toSearch = toSearch;

    function init() {

    }

    init();


    function toRegister() {
      $location.url("/register");
    }

    function toSearch() {
      $location.url("/");
    }

    function toProfile() {
      if (vm.username === 'admin'
      && vm.password === 'admin') {
        $location.url("/admin");
      }
    }
  }

})();