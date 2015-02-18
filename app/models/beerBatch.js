// load the things we need
var mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs');//,
//ObjectId = Schema.ObjectId,
// accessPermissionSchema = require('./accessPermission.js');

// define the schema for our user model
var beerBatch = mongoose.Schema({
		beerTitle				: String,
		batchNumber		 		: String,
		beerDetails 	 		: [{
			detailProperty 		: String,
			detailDescription 	: String,
		}],
		beerSurvey				: [{ type: mongoose.Schema.ObjectId, ref : 'beerSurvey'}],
		urlIdentifingKey		: String
});

// mehtods

// create the model for users and expose it to our app
module.exports = mongoose.model('beerBatch', beerBatch);