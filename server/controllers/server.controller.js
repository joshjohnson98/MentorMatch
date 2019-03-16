
/* Dependencies */
var mongoose = require('mongoose'),
    Profile = require('../models/server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update persons.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the person(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a person */
exports.create = function(req, res) {

  /* Instantiate a Person */
  var profile = new Profile(req.body);


  /* Then save the person */
  profile.save(function(err) {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(profile);
    }
  });
};

/* Show the current person */
exports.read = function(req, res) {
  /* send back the person as json from the request */
  res.json(req.profile);
};

/* Update a person */
exports.update = function(req, res) {
  var profile = req.profile;
  profile.ID = req.body.ID;
  profile.name = req.body.name;

  profile.ethnicity = req.body.ethnicity;
  profile.ethnicity.score = req.body.ethnicity.score;

  profile.industry = req.body.industry;
  profile.industry.score = req.body.industry.score;

  profile.gender = req.body.gender;
  profile.gender.score = req.body.gender.score;

  profile.bio = req.body.bio;

  profile.isMentor = req.body.isMentor;
  profile.mentorStrengths = req.body.mentorStrengths;
  profile.mentorStrengths.score = req.body.mentorStrengths.score;

  profile.isMentee = req.body.isMentee;
  profile.menteeGoals = req.body.menteeGoals;
  profile.menteeGoals.score = req.body.menteeGoals.score;

  profile.language = req.body.language;
  profile.language.score = req.body.language.score;

  profile.location = req.body.location;
  profile.location.score = req.body.location.score;

  profile.save(function(err) {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(person);
    }
  });
};

/* Delete a person */
exports.delete = function(req, res) {
  var profile = req.profile;
  profile.remove(function(err) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      res.end();
    }
  })
};

/* Retreive all the directory persons, sorted alphabetically by person code */
exports.list = function(req, res) {
  Profile.find({}, null, {sort: {code: 1}}, function(err, obj){
    res.json(obj);
  });
};

/*
  Middleware: find a person by its ID, then pass it to the next request handler.

  Find the person using a mongoose query,
        bind it to the request object as the property 'person',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Profile.findById(id).exec(function(err, profile) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.profile = profile;
      next();
    }
  });
};
