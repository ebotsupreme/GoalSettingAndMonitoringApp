//goals.js
(function() {
	'use strict';
	angular.module('goals', [])
		.directive('navBar', navBar)
		.directive('goalForm', goalForm)
		.filter('reverse', reverse)

	function reverse() {
		return function(items) {
			return items.slice().reverse();
		};
	}

	function goalForm(){
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/add-update-goal.html'
		}
		return directive
	}

	function navBar(){
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/nav.html',
			transclude: true
		}
		return directive
	}
}());