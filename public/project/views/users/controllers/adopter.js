(function() {
  angular
    .module("PetWebsite")
    .controller("AdopterController", AdopterController);

  function AdopterController($location, $routeParams, UserService) {
    var vm = this;
    vm.toSearch = toSearch;
    vm.toLogout = toLogout;
    vm.userId = $routeParams["userId"];
    vm.petList = [];
    vm.messageList = [];

    function init() {
      var promise = UserService.findUserById(vm.userId);
      promise.then(function(response) {
        var user = response.data;
        vm.username = user.username;
        vm.firstName = user.firstName;
        vm.pets = user.pets;
      });
    }

    init();

    function toSearch() {
      $location.url("/");
    }

    function toLogout() {
      $location.url("/");
    }

  }

})();