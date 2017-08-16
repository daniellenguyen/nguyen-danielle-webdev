(function () {
  angular
    .module("PetWebsite")
    .factory("SearchService", SearchService);
  function SearchService($http) {
    var api = {
      "simpleSearch": simpleSearch
    };
    return api;

    function simpleSearch(zipCode, petType) {
      return $http.get("/api/petfinder/" + zipCode + "/" + petType);
    }

  }
})();
