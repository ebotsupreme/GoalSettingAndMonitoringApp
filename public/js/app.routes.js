(function() {
  'use strict';

  angular.module('app.routes', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', goalRoutes])

    function goalRoutes($routeProvider, $locationProvider){
      $routeProvider
        //
        // Users:
        //
        // sign up page
        .when('/signup', {
          templateUrl : 'partials/sign-up.html',
          controller : 'userCreateController',
          controllerAs : 'userCreateCtrl'
        })
        // home page w/o logging in
        .when('/home', {
          templateUrl : 'partials/home.html',
          controller : 'userController',
          controllerAs : 'userCtrl'
        })
        // login page
        .when('/login', {
          templateUrl : 'partials/login.html',
          controller : 'mainController',
          controllerAs: 'login'
        })
        // show all users
        .when('/users', {
          templateUrl: 'partials/home.html',
          controller: 'userController',
          controllerAs: 'user'
        })

        //
        // Goals:
        //
        // profile page when logged in
        // goal and goal-monitoring display
        .when('/profile', {
          templateUrl : 'partials/profile.html',
          controller : 'goalsController',
          controllerAs : 'goalsCtrl'
        })
        // goal add form
        .when('/addgoal', {
        templateUrl: 'partials/goal-add.html',
        controller: 'goalsController',
        controllerAs: 'goalsCtrl'
        })
        // goal edit form
        .when('/editgoal', {
          templateUrl : 'partials/goal-edit.html',
          controller : 'goalDetailController',
          controllerAs : 'goalDetailCtrl'
        })
        // goal monitor form
        .when('/monitor', {
          templateUrl : 'partials/goal-monitor-form.html',
          controller : 'goalDetailController',
          controllerAs : 'goalDetailCtrl'
        })
        // home page w/o logging in
        .otherwise({
          redirectTo: '/home'
        })
    }
}());
