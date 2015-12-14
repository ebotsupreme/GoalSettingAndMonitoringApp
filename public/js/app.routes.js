(function() {
  'use strict';

  angular.module('appRoutes', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', goalRoutes])

    function goalRoutes($routeProvider, $locationProvider){
      $routeProvider.
      // login page
        when('/login', {
          templateUrl : 'partials/login.html',
          controller : 'mainController',
          controllerAs: 'login'
        })
        .otherwise({
          redirectTo: '/'
        })
    }


}());
