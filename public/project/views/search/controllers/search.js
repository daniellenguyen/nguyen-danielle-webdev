(function () {
  angular
    .module("PetWebsite")
    .controller("SearchController", SearchController);

  function SearchController($location, $routeParams, SearchService) {
    var vm = this;
    vm.getRandomFromList = getRandomFromList;
    vm.selectType = selectType;
    vm.simpleSearch = simpleSearch;
    vm.toAdvancedSearch = toAdvancedSearch;
    vm.getRandomPet = getRandomPet;
    vm.petTypes = [
      "any",
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

    function toAdvancedSearch() {
      $location.url("/search/advanced");
      // shelter search will happen here
    }

    function simpleSearch() {
      $location.url("/search/pets/" + vm.zipCode + "/" + vm.petType);
    }

    function getRandomPet() {
      var promise = SearchService.getRandomPet(vm.zipCode, vm.petType);

      promise.then(function (response) {
        vm.pets = response.data.petfinder.pets.pet;
      });
    }

    /**
     * Methods needed for search:
     * breed.list
     * pet.getRandom
     * pet.find
     *
     * Pet search will go like this:
     * The main landing page will have 2 fields:
     * - zipcode
     * - type of animal
     * and three buttons:
     * - Just plain ol' search, which will search on zip code and type alone
     * - Can I be more specific?, which will take you to advanced search
     * - I'm feeling lucky, which will get pet.getRandom
     */

    /**
     * Search
     */

    // function login(user) {
    //   if(!user) {
    //     vm.errorMessage = "User not found";
    //     return;
    //   }
    //   var promise = SearchService.findUserByCredentials(user.username, user.password);
    //   promise.then(function(response) {
    //     user = response.data;
    //     if (!user) {
    //       vm.errorMessage = "User not found";
    //     }
    //     else {
    //       $routeParams.user = user;
    //       $location.url("/user/" + user._id);
    //     }
    //   });
    // }

  }

})();