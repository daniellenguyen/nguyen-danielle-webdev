(function () {
  angular
    .module("PetWebsite")
    .controller("SearchController", SearchController);

  function SearchController($location, $routeParams, SearchService) {
    var vm = this;
    vm.user = '';
    vm.getRandomFromList = getRandomFromList;
    vm.selectType = selectType;
    vm.simpleSearch = simpleSearch;
    vm.getRandomPet = getRandomPet;
    vm.toRegister = toRegister;
    vm.toLogin = toLogin;
    vm.toProfile = toProfile;
    vm.toLogout = toLogout;
    vm.isUserLoggedIn = false;
    vm.petTypes = [
      //"any",
      "dog",
      "cat",
      "rabbit",
      "smallfurry",
      "horse",
      "bird",
      "reptile",
      "barnyard"
    ];

    function init() {
      vm.zipCode = null;
    }

    init();

    function getRandomFromList() {
      var images = [
        "./views/search/controllers/petImages/corgi.gif"
      ];
      var random = Math.floor(Math.random() * images.length);
      return images[random];
    }

    function selectType(petType) {
      vm.petType = petType;
    }

    function simpleSearch() {
      if (vm.zipCode !== null && vm.petType) {
        $location.url("/search/pets/" + vm.zipCode + "/" + vm.petType);
      }
    }

    function getRandomPet() {
      var promise = SearchService.getRandomPet(vm.zipCode, vm.petType);

      promise.then(function (response) {
        vm.pets = response.data.petfinder.pets.pet;
      });
    }

    function toRegister() {
      $location.url("/register");
    }

    function toLogin() {
      $location.url("/login");
    }

    function toProfile() {
      if (vm.user.type === 'adopter') {
        $location.url("/adopter");
      }
      else if (vm.user.type === 'volunteer') {
        $location.url("/volunteer");
      }
      else {
        $location.url("/admin");
      }
    }

    function toLogout() {
      vm.isUserLoggedIn = false;
      $location.url("/");
    }

  }

})();