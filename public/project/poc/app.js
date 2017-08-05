(function () {
  angular
    .module("petPOC", ["ngRoute"])
    .config(configuration)
    .controller("searchController", searchController)
    .controller("detailsController", detailsController)
    .service("petService", petService);

  function configuration($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "search.html",
        controller: "searchController",
        controllerAs: "model"
      })
      .when("/details/:petId", {
        templateUrl: "details.html",
        controller: "detailsController",
        controllerAs: "model"
      })
  }

  function detailsController($routeParams, petService) {
    var model = this;
    model.petId = $routeParams["petId"];

    function init() {
      var promise = petService.getPet(model.petId);
      promise.then(function(response) {
        model.pet = response.data.petfinder.pet;
      })
    }

    init();

  }

  function searchController($location, petService) {
    var model = this;

    model.selectType = selectType;
    model.searchByZipAndType = searchByZipAndType;
    model.toDetails = toDetails;


    function init() {
      model.petTypes = [
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
      model.zipCode = null;
    }

    init();

    function selectType(petType) {
      model.petType = petType;
    }

    /**
     * Finds a list of pets based on zip code and type of pet
     */
    function searchByZipAndType() {
      var promise = petService.searchByZipAndType(model.zipCode, model.petType);

      promise.then(function (response) {
        model.pets = response.data.petfinder.pets.pet;
      });
    }

    function toDetails(petId) {
      $location.url("/details/" + petId);
    }

  }

  function petService($http) {
    return {
      "searchByZipAndType": searchByZipAndType,
      "getPet": getPet
    };

    function searchByZipAndType(zipCode, petType) {
      var key = 'e54c91a4f624f9e89f5547d99cdc651e';
      return $http.get("/api/petfinder/"+ key + "/" + zipCode + "/" + petType);
    }

    function getPet(petId) {
      var key = 'e54c91a4f624f9e89f5547d99cdc651e';
      return $http.get("/api/petfinder/"+ key + "/details/" + petId);
    }

  }
})();