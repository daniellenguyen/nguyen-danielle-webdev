(function() {
  angular
    .module("PetWebsite")
    .controller("AdopterController", AdopterController);

  function AdopterController($location, $routeParams, UserService) {
    var vm = this;
    vm.toSearch = toSearch;
    vm.userId = $routeParams["userId"];
    vm.petList = [];
    vm.messageList = [];

    function init() {
      var promise = UserService.findUserById(vm.userId);
      promise.then(function(response) {
        var user = response.data;
        console.log(user);
      });
    }

    init();

    function toSearch() {
      $location.url("/");
    }

  }

})();