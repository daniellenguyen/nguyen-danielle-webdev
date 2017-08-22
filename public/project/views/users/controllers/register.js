(function() {
  angular
    .module("PetWebsite")
    .controller("RegisterController", RegisterController);

  function RegisterController($location, $routeParams, UserService) {
    var vm = this;
    vm.toLogin = toLogin;
    vm.toProfile = toProfile;
    vm.toSearch = toSearch;
    vm.selectType = selectType;
    vm.username = '';
    vm.password = '';
    vm.firstName = '';
    vm.userType = '';
    vm.shelterId = '';
    vm.userTypes= [
      "Adopter",
      "Volunteer"
    ];

    function init() {
    }

    init();

    function selectType(userType) {
      vm.userType = userType;
      if (userType === 'Volunteer') {
        vm.showShelterInput = true;
      }
      else {
        vm.showShelterInput = false;
      }
    }

    function toLogin() {
      $location.url("/login");
    }

    function toProfile() {
      var user = {
        username: vm.username,
        password: vm.password,
        firstName: vm.firstName,
        type: vm.userType,
        pets: [],
        shelterId: vm.shelterId
      };
      if (user.username === 'admin' && user.password === 'admin') {
        $location.url("/admin");
      }
      else {
        var promise = UserService.createUser(user);
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

    function toSearch() {
      $location.url("/");
    }


  }

})();