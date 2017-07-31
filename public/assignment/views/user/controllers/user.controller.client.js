(function() {
  angular
    .module("WebAppMaker")
    .controller("LoginController", LoginController)
    .controller("RegisterController", RegisterController)
    .controller("ProfileController", ProfileController);

  function LoginController($location, $routeParams, UserService) {
    var vm = this;
    vm.login = login;
    vm.toRegister = toRegister;

    function init() { }

    init();

    function login(user) {
      if(!user) {
        vm.errorMessage = "User not found";
        return;
      }
      var promise = UserService.findUserByCredentials(user.username, user.password);
      promise.then(function(response) {
        user = response.data;
        if (!user) {
          vm.errorMessage = "User not found";
        }
        else {
          $routeParams.user = user;
          $location.url("/user/" + user._id);
        }
      });
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
        _id: "000", //TODO fix this so that we can get unique ids
        username: username,
        password: password,
        firstName: "",
        lastName: ""
      };
      var promise = UserService.createUser(user);
      promise.then(function(response) {
        user = response.data;
        $location.url("/user/" + user._id);
      });
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

    function init() {
      var promise = UserService.findUserById(vm.userId);
      promise.then(function (response) {
        vm.user = response.data;
        console.log(vm.user);
      });
    }

    init();

    function toWebsites() {
      $location.url("/user/" + vm.userId + "/website");
    }

    function toLogin() {
      $location.url("/login");
    }

  }

})();
