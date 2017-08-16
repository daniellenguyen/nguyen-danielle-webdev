(function() {
  angular
    .module("PetWebsite")
    .controller("PetResultsController", PetResultsController);

  function PetResultsController($location, $routeParams, SearchService) {
    var vm = this;
    vm.zipCode = $routeParams["zipCode"];
    vm.petType = $routeParams["petType"];
    vm.toPetDetails = toPetDetails;

    function init() {
      var promise = SearchService.simpleSearch(vm.zipCode, vm.petType);

      promise.then(function (response) {
        vm.pets = response.data; //flattenList(response.data.petfinder.pets.pet);
        console.log(vm.pets);
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
      console.log(vm.pets);
      return finalList;
    }

    function toPetDetails(petId) {

    }
  }

})();