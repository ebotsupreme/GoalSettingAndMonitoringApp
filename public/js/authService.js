(function() {
  'use strict';
  // create angular module for auth service
  angular.module('authService', [])
  // create a function to export for your service
  .factory('auth', auth)
  .factory('authToken', authToken)
  .factory('authInterceptor', authInterceptor)

  // $q is for promises
  function auth($http, $q, authToken){
    var authFactory = {}
    authFactory.login = function(username, password){
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
      .success(function(data){
        authToken.setToken(data.token)
        return data
      })
    }
    authFactory.logout = function(){
      authToken.setToken()
    }
    authFactory.isLoggedIn = function(){
      if(authToken.getToken())
        return true
      else
        return false
    }
    authFactory.getUser = function(){
      if(authToken.getToken())
        return $http.get('/api/me')
      else
        return $q.reject({message: 'User has no token'})
    }

    return authFactory
  }
  function authInterceptor($q, authToken, $location){
    var authIntercept = {}

    authIntercept.request = function(config){
      var token = authToken.getToken()
      if(token){
        config.headers['x-access-token'] = token
      }
      return config
    }
    authIntercept.responseError = function(response){
      if(response.status == 403)
        $location.path('/home')

        return $q.reject(response)
    }

    return authIntercept
  }
  function authToken($window){
    var authTokenFactory = {}
    // get the token out of local storage
    authTokenFactory.getToken = function(){
      // checking local machine to see if there's a token variable saved
      return $window.localStorage.getItem('token')
    }
    // passing token into function and if it exists, it will set token to local variable
    authTokenFactory.setToken = function(token){
      if(token)
        $window.localStorage.setItem('token', token)
      else
        $window.localStorage.removeItem('token')
    }

    return authTokenFactory
  }
}());
