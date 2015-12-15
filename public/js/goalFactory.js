//goalFactory.js
(function() {
	'use strict';

	angular.module('goalsFactory', [])
		.factory('goals', goals)  // a factory named goals

	goals.$inject = ['$http']

	// goals factory
	function goals($http){
		var goalsUrl = '/api/goals'
		var goals = {}

		goals.list = function() {
			return $http.get(goalsUrl)
		}

		goals.show = function(goalId) {
			return $http.get(goalsUrl + '/' + goalId)
		}

		goals.addGoal = function(userId, data) {      //TBD this is tied to a user route
			return $http.post(goalsUrl + '/users/' + userId, data)
		}

		goals.updateGoal = function(goalId, data) {
			return $http.patch(goalsUrl + '/' + goalId, data)
		}

		goals.removeGoal = function(goalId) {
			return $http.delete(goalsUrl + '/' + goalId)
		}

		return goals
	}
}());

