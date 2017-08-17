(function() {
  angular
    .module("PetWebsite")
    .controller("PetDetailsController", PetDetailsController);

  function PetDetailsController($location, $routeParams, SearchService) {
    var vm = this;
    vm.petId = $routeParams["petId"];
    vm.carouselHelper = carouselHelper;

    function init() {
      var promise = SearchService.getSinglePet(vm.petId);

      promise.then(function (response) {
        vm.pet = response.data;
        vm.age = vm.pet.age;
        vm.breed = vm.pet.breeds.breed;
        vm.email = vm.pet.contact.email;
        vm.phone = vm.pet.contact.phone;
        vm.description = vm.pet.description;
        vm.id = vm.pet.id;
        vm.name = vm.pet.name;
        vm.size = vm.pet.size;
        vm.photos = vm.pet.media;
        prettifySex();
        prettifySize();
        prettifyStatus();
        prettifyDetails();
      });
    }

    init()

    function prettifyStatus() {
      if(vm.pet.status === 'A') {
        vm.status = 'ready to adopt!'
      }
      else if(vm.pet.status === 'X') {
        vm.status = 'that has already been adopted!'
      }
      else {
        vm.status = '';
      }
    }

    function prettifySize() {
      if(vm.pet.size === 'S') {
        vm.size = 'Small';
      }
      else if(vm.pet.size === 'M') {
        vm.size = 'Medium';
      }
      else if(vm.pet.size === 'L') {
        vm.size = 'Large';
      }
      else if(vm.pet.size === 'XL') {
        vm.size = 'Very Large';
      }
      else {
        vm.size = '';
      }
    }

    function prettifySex() {
      if(vm.pet.sex === 'M') {
        vm.sex = 'Male';
      }
      else if (vm.pet.sex === 'F') {
        vm.sex = 'Female';
      }
      else {
        vm.sex = '';
      }
    }

    function prettifyDetails() {
      var oldDetails = vm.pet.options.option;
      var newDetails = '';
      for(var i = 0; i < Object.keys(oldDetails).length; i++) {
        if (oldDetails[i] === "hasShots") {
          newDetails = newDetails + 'has shots, ';
        }
        else if (oldDetails[i] === "noDogs") {
          newDetails = newDetails + 'can\'t be around dogs, ';
        }
        else if (oldDetails[i] === "altered") {
          if(vm.sex === 'Male') {
            newDetails = newDetails + 'neutered, ';
          }
          else if (vm.sex === 'Female') {
            newDetails = newDetails + 'spayed, ';
          }
        }
        else {
          newDetails = newDetails + " " + oldDetails[i] + ', ';
        }
      }
      newDetails = newDetails.slice(0, -2);
      vm.details = newDetails;
    }

    function carouselHelper(index) {
      if(index === 0) {
        return "item active";
      }
      else {
        return "item";
      }
    }

  }

})();