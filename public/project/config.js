(function() {
  angular
    .module("PetWebsite", ["ngRoute"])
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/search/templates/search.html",
        controller: "SearchController",
        controllerAs: "model"
      })
      .when("/search", {
        templateUrl: "views/search/templates/search.html",
        controller: "SearchController",
        controllerAs: "model"
      })
      .when("/search/advanced", {
        templateUrl: "views/search/templates/advancedSearch.html",
        controller: "SearchController",
        controllerAs: "model"
      })
      .when("/search/pets/:zipCode/:petType", {
        templateUrl: "views/search/templates/petResults.html",
        controller: "PetResultsController",
        controllerAs: "model"
      })
      .when("/search/shelters", {
        templateUrl: "views/search/templates/shelterResults.html",
        controller: "ShelterResultsController",
        controllerAs: "model"
      })
      .when("/search/pets/:petId", {
        templateUrl: "views/search/templates/petDetails.html",
        controller: "PetDetailsController",
        controllerAs: "model"
      })
      .when("/search/shelters/:sid", {
        templateUrl: "views/search/templates/shelterDetails.html",
        controller: "ShelterDetailsController",
        controllerAs: "model"
      })
      .when("/admin", {
        templateUrl: "views/users/templates/admin.html",
        controller: "AdminController",
        controllerAs: "model"
      })
      .when("/adopter", {
        templateUrl: "views/users/templates/adopter.html",
        controller: "AdopterController",
        controllerAs: "model"
      })
      .when("/volunteer", {
        templateUrl: "views/users/templates/volunteer.html",
        controller: "VolunteerController",
        controllerAs: "model"
      })
      .when("/register", {
        templateUrl: "views/users/templates/register.html",
        controller: "RegisterController",
        controllerAs: "model"
      })
      .when("/login", {
        templateUrl: "views/users/templates/login.html",
        controller: "LoginController",
        controllerAs: "model"
      })
  }
})();
