
/* Dependencies */
var mongoose = require('mongoose'),
    Person = require('../models/server.model.js');

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
  var person = new Person(req.body);


  /* Then save the person */
  person.save(function(err) {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(person);
    }
  });
};

/* Show the current person */
exports.read = function(req, res) {
  /* send back the person as json from the request */
  res.json(req.person);
};

/* Update a person */
exports.update = function(req, res) {
  var person = req.person;
  person.name = req.body.name;
  person.code = req.body.code;
  person.address = req.body.address;

  person.save(function(err) {
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
  var person = req.person;
  person.remove(function(err) {
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
  Person.find({}, null, {sort: {code: 1}}, function(err, obj){
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
  Person.findById(id).exec(function(err, person) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.person = person;
      next();
    }
  });
};
