/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var profileSchema = new Schema({
  ID: {
    type: String, 
    required: true
  }, 
  name:{
    type:String,
    score:Number
  },
  ethnicity:{
    type:String,
    score:Number
  },
  gender: {
    type:String,
    score:Number
  },
  industry:{
    type:String,
    score:Number
  },
  bio:String,
  isMentor:Boolean,
  mentorStrengths:{
    type:String,
    score:Number
  },
  isMentee:Boolean,
  menteeGoals:{
    type:String,
    score:Number
  },
  language:{
    type:String,
    score:Number
  },
  location:{
    country:String,
    state:String,
    city:String,
    score:Number

  },

  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
profileSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Profile = mongoose.model('Profile', profileSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Profile;
