//goalController.js
(function(){

	// add 2 controllers 
	angular.module('goalsCtrl', [])
		.controller('goalsController', goalsController)
		.controller('goalDetailController', goalDetailController)

	// inject both controllers with goals factory 

  // these 2 both use the goals factory:
	goalsController.$inject = ['goals', '$window']
	goalDetailController.$inject = ['goals','$routeParams','$location'] //location is for rendering a new view

	function goalsController(goals, $window){
		var self = this
		self.name = 'Goal List'
		self.api = goals  //goals factory

		// for full list user's of goals from DB
		self.goals = []

		// for a new goal to POST 
		self.newGoal = {}

		//// get list of goals, and set this controller's 'goals' property to 
		//// the array we get back from our API
		//self.api.list().success(function(response){  //call factory function
		//	self.goals = response
		//})

		self.showGoals = function(user_id){
	      self.api.list(user_id).success(function(response){  //call factory function
		  	self.goals = response
		  })
		}

		// controller method for adding a new goal, invoked when user hits submit
		self.addGoal = function(parent_categories_heirachy, goal_or_task, date_created,
			zen_level, reminder, optional_due_date, completed, priority) {

			var data = {
				parent_categories_heirachy: parent_categories_heirachy, 
				goal_or_task:               goal_or_task, 
				date_created:               date_created,
				zen_level:                  zen_level,
				reminder:                   reminder,
				optional_due_date:          optional_due_date,
				completed:                  completed,
				priority:                   priority
			}

			// run the goal factory's addGoal method to send the POST request with the data object we just created
			self.api.addGoal(data).then(function success(response){
				// when we successfully finish the POST request, take the server's response (the new goal) and add 
				// it to this controller's goal list, which updates the front-end with the new goal
				self.goals.push(response.data.goal)
				// clear this controller's newGoal object, which clears the input fields on the front-end
				self.newGoal = {}
				// focus on the first input field for the user to add another goal (UI enhancement)
				$window.document.querySelectorAll('#new-goal-form input')[0].focus()
			})
		}

        
	}

	function goalDetailController(goals,$routeParams,$location){
		var self = this
		self.name = 'Goal Detail'
		self.api = goals  //goals factory

		// the goal being processed here
		self.goal = null

		// default boolean value, which we can toggle true/false for showing/hiding the goal edit form
		self.editing = false

		// retrieve a goal via the url parameter for goalId, then set this controller's goal property 
		// to the response in order to to show it on the front-end
		self.showGoal = function(goalId){
			self.api.show(goalId).success(function(response){ 
				self.goal = response
			})
		}
		self.showGoal($routeParams.goalId)

		// update the goal, on successful PATCH, set the goal object to the response from the server,
		// which updates the front-end, then turn the editing property to false, which toggles back to 
		// show the goal details without the edit form
		self.updateGoal = function(goalId, parent_categories_heirachy, goal_or_task, date_created,
			zen_level, reminder, optional_due_date, completed, priority) {

			var data = {
				parent_categories_heirachy: parent_categories_heirachy, 
				goal_or_task:               goal_or_task, 
				date_created:               date_created,
				zen_level:                  zen_level,
				reminder:                   reminder,
				optional_due_date:          optional_due_date,
				completed:                  completed,
				priority:                   priority
			}

			self.api.updateGoal(goalId, data).success(function(response){
				console.log(response)
				self.goal = response
				self.editing = false
			})
		}

		// delete the goal using this, then afterwards, redirect the user back to /goals 
		self.removeGoal = function(goalId){
			self.api.removeGoal(goalId).success(function(response){
				console.log(response)
				$location.path('/goals')
			})
		}
	}
}())

