var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var bcrypt 		= require('bcrypt-nodejs');

//goal
var GoalsSchema = new Schema({
  goal_or_task: String, //used as a dropdown for monitoring
  //e.g. heirarchy: Learn Web, learn MEAN, learn Angular, read up on angular, read a particular tutorial
  //e.g. heirarchy: Learn Web, learn MEAN, make an app, do 1 task toward the making it
  //e.g. keep in shape, do cardio and weights, do a particular workout each day
  date_created: String, //or ? { type: Date, default: Date.now },
  priority: Number, //s/w will prevent duplicates at same nested-level for each parent, each level adds a parent.child (e.g. 1.3.2.1)
  zen_level: Number, //zen type is do only once=3, repeat a few times=2 or indefinite time/maintenance(do a few hours per week)=1(due date null if 3)
  reminder: Boolean, //if a daily reminder is wanted
  optional_due_date: String, //only applies to zen type 1 or 2, but still optional
  completed: Boolean, //only applies to zen type 1 or 2
  //is_public: Boolean, //non-MVP, true will display this goal and user's id to all users who are logged in or not
  //is_archived: Boolean, //non-MVP
  sub_goals_or_tasks: [{type: Schema.ObjectId, ref: 'GoalsSchema'}],  //OR: Schema.Types.ObjectId ?
  monitoring: [{   //daily or whenever they choose to fill it in
    m_date: String, //or ? { type: Date, default: Date.now },
	  hours_devoted: Number, //since last monitoring
	  quality: Number,  //quality of activity(study, etc.) rating, etc. since last mon... 1-10, 10 best
	  percieved_result: Number,  //noticeable results rating since last monitoring 1-10, 10 best
    comment: String
  }]
})
var Goals = mongoose.model('Goals', GoalsSchema)

// user schema
var UserSchema   = new Schema({
  name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	goals: [Goals]  //OR is this: [{type: Schema.ObjectId, ref: 'GoalsSchema'}] ? //OR: Schema.Types.ObjectId ?
	// To add: user.goal.push({...})
  // To find:
  //   var goal = user.goal.id(id);
  //    or index: var goal1 = user.goal[0];
  // To delete:
  //   var doc = user.goal.id(id).remove();
  //afer each: user.save(function (err) {

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


***Also see:
http://mongoosejs.com/docs/populate.html

There are no joins in MongoDB but sometimes we still want references to documents in other collections. 
This is where population comes in.

Population is the process of automatically replacing the specified paths in the document with document(s) 
from other collection(s). We may populate a single document, multiple documents, plain object, multiple 
plain objects, or all objects returned from a query.
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
