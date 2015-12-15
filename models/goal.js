var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var bcrypt    = require('bcrypt-nodejs');

//goal schema
var GoalsSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  parent_categories_heirachy: String, //used as a dropdown for monitoring
  //e.g. heirarchy: Learn Web, learn MEAN, learn Angular, read up on angular
  //e.g. heirarchy: Learn Web, learn MEAN, make an app
  //e.g. heirarchy: keep in shape, do cardio and weights

  goal_or_task: String, //used as a dropdown for monitoring
  //e.g. read a particular tutorial, do 1 task toward making an app, do a particular workout
  date_created: { type: Date, default: Date.now },
  priority: Number, //s/w will prevent duplicates at same nested-level for each parent, each level adds a parent.child (e.g. 1.3.2.1)
  zen_level: Number, //zen type is do only once=3, repeat a few times=2 or indefinite time/maintenance(do a few hours per week)=1(due date null if 3)
  reminder: Boolean, //if a daily reminder is wanted
  optional_due_date: Date, //only applies to zen type 1 or 2, but still optional
  completed: Boolean, //only applies to zen type 1 or 2
  //is_public: Boolean, //non-MVP, true will display this goal and user's id to all users who are logged in or not
  //is_archived: Boolean, //non-MVP
  //sub_goals_or_tasks: [{type: Schema.Types.ObjectId, ref: 'GoalsSchema'}], //***can only go 1 deep for now
  monitoring: [{   //daily or whenever they choose to fill it in
    m_date: { type: Date, default: Date.now },
	  hours_devoted: Number, //since last monitoring
	  quality: Number,  //quality of activity(study, etc.) rating, etc. since last mon... 1-10, 10 best
	  percieved_result: Number,  //noticeable results rating since last monitoring 1-10, 10 best
    comment: String
  }]
});
module.exports = mongoose.model('Goal', GoalsSchema);

/***see:
http://mongoosejs.com/docs/populate.html
There are no joins in MongoDB but sometimes we still want references to documents in other collections. 
This is where population comes in.
Population is the process of automatically replacing the specified paths in the document with document(s) 
from other collection(s). We may populate a single document, multiple documents, plain object, multiple 
plain objects, or all objects returned from a query.
*/
