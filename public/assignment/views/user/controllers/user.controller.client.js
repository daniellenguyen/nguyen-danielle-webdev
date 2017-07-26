(function() {
  angular
    .module("WebAppMaker")
    .controller("LoginController", LoginController)
    .controller("RegisterController", RegisterController)
    .controller("ProfileController", ProfileController);

  function LoginController($location, UserService) {
    var vm = this;
    vm.login = login;
    vm.toRegister = toRegister;

    function login(username, password) {
      user = UserService.findUserByCredentials(username, password);
      if(user) {
        $location.url("/user/" + user._id);
      } else {
        vm.alert = "Unable to login";
      }
    }

    function toRegister() {
      $location.url("/register");
    }

  }

  function RegisterController($location, UserService) {
    var vm = this;
    vm.register = register;
    vm.toLogin = toLogin;

    function register(username, password) {
      var user = {
        _id: "000",
        username: username,
        password: password,
        firstName: "",
        lastName: ""
      };
      UserService.createUser(user);
      $location.url("/user/" + user._id);
    }

    function toLogin() {
      $location.url("/login");
    }

  }

  function ProfileController($location, $routeParams, UserService) {
    var vm = this;
    vm.userId = $routeParams["uid"];
    vm.toWebsites = toWebsites;
    vm.toLogin = toLogin;

    function toWebsites() {
      $location.url("/user/" + vm.userId + "/website");
    }

    function toLogin() {
      $location.url("/login");
    }

    function init() {
      vm.user = UserService.findUserById(vm.userId);
    }

    init();

  }

})();
