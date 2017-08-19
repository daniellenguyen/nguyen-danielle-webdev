(function() {
  angular
    .module("PetWebsite")
    .controller("LoginController", LoginController);

  function LoginController($location, $routeParams, UserService) {
    var vm = this;
    vm.toProfile = toProfile;
    vm.toRegister = toRegister;
    vm.toSearch = toSearch;
    vm.username = '';
    vm.password = '';

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
      if (username === 'admin' && password === 'admin') {
        $location.url("/admin");
      }
      else {
        var promise = UserService.findUserByCredentials(username, password);
        promise.then(function (response) {
          user = response.data;
          if (user.type === "Adopter") {
            $location.url("/adopter/" + user._id);
          }
          else {
            $location.url("/volunteer/" + user._id);
          }
        });
      }
    }
  }

})();