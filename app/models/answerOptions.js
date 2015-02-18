// load the things we need
var mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs');//,

// define the schema for our user model
var answerOptions = mongoose.Schema({
	displayWord : String,
	value 		: String
});

// mehtods

// create the model for users and expose it to our app
module.exports = mongoose.model('answerOptions', answerOptions);