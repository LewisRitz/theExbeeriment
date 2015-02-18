// load the things we need
var mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs');//,
//ObjectId = Schema.ObjectId,
// accessPermissionSchema = require('./accessPermission.js');

// define the schema for our user model

var beerSurvey = mongoose.Schema({
		activeStatus			: Boolean,
		surveyName				: String,
		surveyDescription		: String,			
		beerBatches				: [{ type: mongoose.Schema.ObjectId, ref : 'beerBatch'}],
		questions		 		: [ { questionId: String, questionNum: Number } ],
		urlIdentifingKey		: String
});

// mehtods

// create the model for users and expose it to our app
module.exports = mongoose.model('beerSurvey', beerSurvey);