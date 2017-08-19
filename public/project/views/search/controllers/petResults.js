(function() {
  angular
    .module("PetWebsite")
    .controller("PetResultsController", PetResultsController);

  function PetResultsController($location, $routeParams, SearchService) {
    var vm = this;
    vm.zipCode = $routeParams["zipCode"];
    vm.petType = $routeParams["petType"];
    vm.toPetDetails = toPetDetails;
    vm.toRegister = toRegister;
    vm.toLogin = toLogin;
    vm.isUserLoggedIn = false;

    function init() {
      var promise = SearchService.simpleSearch(vm.zipCode, vm.petType);

      promise.then(function (response) {
        vm.pets = response.data;
        vm.concisePetList = makeConcisePetList();
      });
    }

    init();

    function makeConcisePetList() {
      var finalList = [];
      for (var i = 0; i < vm.pets.length; i++) {
        var pet = {
          name: vm.pets[i]["name"],
          photo: vm.pets[i]["media"][0],
          id: vm.pets[i]["id"]
        };
        finalList.push(pet);
      }
      console.log(finalList);
      return finalList;
    }

    function toPetDetails(petId) {
      $location.url("/search/pets/" + petId);
    }

    function toRegister() {
      $location.url("/register");
    }

    function toLogin() {
      $location.url("/login");
    }

  }

})();