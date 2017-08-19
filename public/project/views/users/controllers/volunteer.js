(function() {
  angular
    .module("PetWebsite")
    .controller("VolunteerController", VolunteerController);

  function VolunteerController($location, $routeParams, UserService) {
    var vm = this;
    vm.toSearch = toSearch;
    vm.userId = $routeParams["userId"];
    vm.messageList = [];

    function init() {
      var promise = UserService.findUserById(vm.userId);
      promise.then(function(response) {
        var user = response.data;
        vm.firstName = user.firstName;
        vm.username = user.username;
        vm.shelterId = user.shelterId;
      });
    }

    init();

    function toSearch() {
      $location.url("/");
    }

  }

})();