// load the things we need
var mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var question = mongoose.Schema({
		name			 	: String,
		title			 	: String,
		description		 	: String,
		required 			: Boolean,
		theType			 	: { id : Number, description : String },
		beerSurvey			: [{ type: mongoose.Schema.ObjectId, ref : 'beerSurvey'}],
		dropDownListWord 	: {
			questionType	: Number,
			theOptions 		: [{
				displayWord : String,
				theValue 	: String
			}]
		},
		dropDownListNumber 	: {
			questionType	: Number,
			theOptions		: [{
				displayWord	: String,
				theValue	: Number
			}]
		},
		textArea			: {
			questionType	: Number,
			textWrap		: String,
			rows			: Number,
			cols			: Number,
			placeholder		: String,
			maxLength		: Number
		},
		checkBoxGroup		: {
			questionType	: Number,
			groupName		: String,
			theOptions		: [{
				displayWord	: String,
				theValue	: String
			}]
		},
		radioButton			: {
			questionType	: Number,
			groupName		: String,
			theOptions			: [{
				displayWord	: String,
				theValue	: String
			}]
		},
		dataList			: {
			questionType	: Number,
			theOptions		: [{
				displayWord	: String,
				theValue	: String
			}]
		},
		textField			: {
			questionType	: Number,
			size			: Number,
			maxLength		: Number,
			placeholder		: String,
			defaultValue	: String
		},
		slideBar 			: {
			questionType	: Number,
			defaultValue 	: Number,
			minRange 		: Number,
			maxRange		: Number,
			stepAmount 		: Number,
			previewBox 		: Boolean,
			stepArrows 		: Boolean,
			editBox 		: Boolean,
			theUnits 		: String
		}
});

// mehtods

// create the model for users and expose it to our app
module.exports = mongoose.model('question', question);