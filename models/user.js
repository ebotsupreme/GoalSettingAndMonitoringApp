var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

//goal
var GoalsSchema = new Schema({
  goal_or_task: String, 
  //e.g. heirarchy: Learn Web, learn MEAN, learn Angular, read up on angular, read a particular tutorial
  //e.g. heirarchy: Learn Web, learn MEAN, make an app, do 1 task toward the making it
  //e.g. keep in shape, do cardio and weights, do a particular workout each day
  sub_goals_or_tasks: [{type: Schema.ObjectId, ref: 'GoalsSchema'}]  //OR: Schema.Types.ObjectId ?
  zen_level: Number, //zen type is single=1, recurring=2 or hours per week=3(due date null if 3)
  reminder: Boolean, //if a daily reminder is wanted
  optional_due_date: String, //only applies to zen type 1 or 2, but still optional
  completed: Boolean, //only applies to zen type 1 or 2
  priority: Number, //s/w will prevent duplicates at same nested-level for each parent, each level adds a parent.child (e.g. 1.3.2.1)
  is_public: Boolean, //non-MVP, true will display this goal and user's id to all users who are logged in or not
  is_archived: Boolean, //non-MVP
	monitoring: [{   //daily or whenever they choose to fill it in
		time_taken: String, 
		quality: Number,  //quality of study or intensity of workout, ...
		feeling_result: Number,  //how user feels about the effort
		percieved_result: Number,  //noticeable results so far
    comment: String
	}]
})
var Goals = mongoose.model('Goals', GoalsSchema)

// user schema
var UserSchema   = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
	goals: [Goals]  //OR is this: [{type: Schema.ObjectId, ref: 'GoalsSchema'}] ? //OR: Schema.Types.ObjectId ?
	//TBD later friends and collaboration (not MVP)
});
	//google nested schema mongo (many objects in records as well as many nested sub levels )
	// or embedded documents:
	//E.g.
	/*
	var RulerSchema = new Schema({
      units: String // inches or millimetres
    });
  var Ruler = mongoose.model('Ruler', RulerSchema);
  var MeasuringToolsSchema = new Schema({
    label: String,
    ruler: [Ruler]
  });
  var MeasuringTools = mongoose.model('MeasuringTools', MeasuringToolsSchema);
  //***But mainly:
  //use a DBRef:
  Person = new Schema
    mother: { type: Schema.ObjectId, ref: 'Person' }
    father: { type: Schema.ObjectId, ref: 'Person' }
*/


// hash the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;

	// hash the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();

	// generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
