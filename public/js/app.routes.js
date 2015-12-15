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
      // show all users, TBD may get rid of thie route
      .when('/users', {
        templateUrl: 'partials/home.html',
        controller: 'userController',
        controllerAs: 'user'
      })
      // sign up page
     //   .when('/signup', {
     //     templateUrl : 'partials/sign-up.html',
     //     controller : 'userController',
     //     controllerAs : 'userCtrlPlaceholder'
     //   })
        // home page w/o logging in
        .when('/home', {
          templateUrl : 'partials/home.html',
          controller : 'userController',
          controllerAs : 'user'
        })
        // profile page when logged in
        .when('/profile', {
          templateUrl : 'partials/profile.html',
          controller : 'placeholderController',
          controllerAs : 'placeholder'
        })
        // get route
        .when('/goal', {
          templateUrl : 'partials/goal-monitor.html',
          controller : 'goalsController',
          controllerAs : 'goalsCtrl'
        })
        .when('/goals/:goalId', {
        templateUrl: 'partials/add-update-goal.html',
        controller: 'goalDetailController',
        controllerAs: 'goalDetailCtrl'
        })
        // goal monitor form
        .when('/goalmonitorform', {
          templateUrl : 'partials/goal-monitor-form.html',
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
