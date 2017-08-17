(function () {
  angular
    .module("PetWebsite")
    .factory("SearchService", SearchService);
  function SearchService($http) {
    var api = {
      "simpleSearch": simpleSearch,
      "getSinglePet": getSinglePet
    };
    return api;

    function simpleSearch(zipCode, petType) {
      return $http.get("/api/petfinder/" + zipCode + "/" + petType);
    }

    function getSinglePet(petId) {
      return $http.get("/api/petfinder/" + petId);
    }
  }
})();
