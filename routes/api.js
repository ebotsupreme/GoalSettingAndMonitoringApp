var
	express 	= require('express'),
	apiRouter  	= express.Router(),
	mongoose 	= require('mongoose'),
	Goal 		= require('../models/Goal.js'),
	User 		= require('../models/user.js'),
	jwt        	= require('jsonwebtoken'),
	superSecret	= 'frijoles'

apiRouter.get('/', function(req,res){
	res.json({message: "Api routes are working."})
})

//Read all and Create one (Also use this for cycling through all users)

apiRouter.route('/users/:user_id/goals')
	.get(function(req,res){
		Goal.find({}, function(err, goals){ //TBD change to find for given user
			res.json(goals)
		})
	})
	//TBD this might be a different route
	.post(function(req,res){  //TBD how to post sub-goals? 
		                      //(need to pass in parent goal id that it gets pushed into)
		var newGoal = new Goal
		newGoal.goal_or_task = req.body.goal_or_task
		newGoal.date_created = req.body.date_created
		newGoal.zen_level = req.body.zen_level
		newGoal.reminder = req.body.reminder
		newGoal.optional_due_date = req.body.optional_due_date
		newGoal.completed = req.body.completed
		newGoal.priority = req.body.priority

		//TBD attach to given user, then save user

		newGoal.save(function(err, goal){
			if(err) throw err
			res.json({message: "Goal Saved!", goal: goal})
		})
	})

//Read one, Update one and Delete one
//TBD is this also for updating the status?
// and what about chaining through one goal's sub goals?
//apiRouter.route('/users/:user_id/goals/:id')  //TBD don't need user here, correct?
apiRouter.route('/goals/:id')
	.get(function(req,res){
		Goal.findById(req.params.id, function(err,goal){
			if(err) throw err
			res.json(goal)
		})
	})
	.patch(function(req,res){
		Goal.findOneAndUpdate({_id: req.params.id}, req.body, function(err,goal){
			if(err) throw err
			Goal.findById(req.params.id, function(err,updatedGoal){
				res.json(updatedGoal)
			})
		})
	})
	.delete(function(req,res){
		Goal.findOneAndRemove({_id: req.params.id}, req.body, function(err,goal){
			if(err) throw err
			res.json({message:"goal deleted!"})
		})
	})

apiRouter.get('/users/:user_id/destroy-all-goals', function(req,res){
	Goal.remove({}, function(err){
		if(err) throw err
		res.json({message: 'All user\'s goals destroyed!'})
	})
})

// -----------------------------------api routes for a user -------------------------------------------------------------------------
// route to generate sample user
// ***Take out after dev & test
apiRouter.post('/sample', function(req, res) {

	// look for the user named test
	User.findOne({ 'username': 'test' }, function(err, user) {

		// if there is no test user, create one
		if (!user) {
			var sampleUser = new User();

			sampleUser.name = 'test';
			sampleUser.username = 'test';
			sampleUser.password = 'test';

			sampleUser.save();
		} else {
			console.log(user);

			// if there is a test user, update the password
			user.password = 'test';
			user.save();
		}
		res.send('done')
	});

});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRouter.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user) {

		if (err) throw err;

		// no user with that username was found
		if (!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		} else if (user) {

			// check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, superSecret, {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}

		}

	});
});

////**All routes above this do not require a token to get access**
//TBD all of the goals (or the ones that require user login) above should be moved below this
// route middleware to verify a token
apiRouter.use(function(req, res, next) {
	// do logging
	console.log('Somebody just came to our app!');

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, superSecret, function(err, decoded) {

			if (err) {
				res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
			});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;

				next(); // make sure we go to the next routes and don't stop here
			}
		});

	} else {

		// if there is no token
		// return an HTTP response of 403 (access forbidden) and an error message
		res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /users
// ----------------------------------------------------
apiRouter.route('/users')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {

		var user = new User();		// create a new instance of the User model
		user.name = req.body.name;  // set the users name (comes from the request)
		user.username = req.body.username;  // set the users username (comes from the request)
		user.password = req.body.password;  // set the users password (comes from the request)

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that username already exists. '});
				else
					return res.send(err);
			}

			// return a message
			res.json({ message: 'User created!' });
		});

	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {

		User.find({}, function(err, users) {
			if (err) res.send(err);

			// return the users
			res.json(users);
		});
	});

// on routes that end in /users/:user_id
// ----------------------------------------------------
apiRouter.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);

			// return that user
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err) res.send(err);

			// set the new user information if it exists in the request
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;

			// save the user
			user.save(function(err) {
				if (err) res.send(err);

				// return a message
				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// api endpoint to get user information
apiRouter.get('/me', function(req, res) {
	res.send(req.decoded);
});


module.exports = apiRouter
