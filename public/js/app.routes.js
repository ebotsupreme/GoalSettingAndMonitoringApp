(function() {
  'use strict';

  angular.module('app.routes', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', goalRoutes])

    function goalRoutes($routeProvider, $locationProvider){
      $routeProvider
      // login page
        .when('/login', {
          templateUrl : 'partials/login.html',
          controller : 'mainController',
          controllerAs: 'login'
        })
      // sign up page
        .when('/signup', {
          templateUrl : 'partials/sign-up.html',
          controller : 'userController',
          controllerAs : 'userCtrlPlaceholder'
        })
        // home page w/o logging in
        .when('/home', {
          templateUrl : 'partials/home.html',
          controller : 'placeholderController',
          controllerAs : 'placeholder'
        })
        // profile page when logged in
        .when('/profile', {
          templateUrl : 'partials/profile.html',
          controller : 'placeholderController',
          controllerAs : 'placeholder'
        })
        // add a goal page
        .when('/addgoal', {
          templateUrl : 'partials/add-goal.html',
          controller : 'placeholderController',
          controllerAs : 'placeholder'
        })
        // goal monitor
        .when('/goalmonitor', {
          templateUrl : 'partials/goal-monitor.html',
          controller : 'placeholderController',
          controllerAs : 'placeholder'
        })

        .otherwise({
          redirectTo: '/home'
        })
    }


}());
