// dbCRUD.js
module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose');

	var BeerSurvey = require('../../app/models/beerSurvey');
	var Question = require('../../app/models/question');
	// var AnswerOption = require('../app/models/answerOptions');
	var BeerBatch = require('../../app/models/beerBatch');

	app.get('/deleteQuestionById/:questionId', function(req, res){
		questionId = req.params.questionId;
		Question.remove({'_id' : questionId}, function(err, removed) { console.log("removed: "+questionId); });
		Question.find(function(err, questions){ if (err) { console.log(err); } responseJSON = questions;  res.send(responseJSON); });
	});

	app.get('/deleteSurveyById/:surveyId', function(req, res){
		surveyId = req.params.surveyId;
		BeerSurvey.remove({'_id' : surveyId}, function(err, removed) { console.log("removed: "+surveyId); });
		BeerSurvey.find(function(err, surveys){ if (err) { console.log(err); } responseJSON = surveys;  res.send(responseJSON); });
	});

	app.get('/deleteAllSurveys', function(req, res) {
		BeerSurvey.remove({}, function(err, removed) {console.log("removed all surveys"); });
		BeerSurvey.find(function(err, surveys){ if (err) { console.log(err); } responseJSON = surveys;  res.send(responseJSON); });
	});

	app.get('/deleteAllData', function(req, res) {
		BeerSurvey.remove({}, function(err, removed) {console.log("removed all surveys"); });
		BeerBatch.remove({}, function(err, removed) {console.log("removed all beers"); });
		Question.remove({}, function(err, removed) {console.log("removed all questions"); });
		var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		console.log("all data deleted at "+date);
		res.send("All data deleted at "+date);
	});

	app.get('/deleteAllBeers', function(req, res) {
		BeerBatch.remove({}, function(err, removed) {console.log("removed all beers"); });
		BeerBatch.find(function(err, surveys){ if (err) { console.log(err); } responseJSON = surveys;  res.send(responseJSON); });
	});

	app.get('/deleteAllQuestions', function(req, res) {
		Question.remove({}, function(err, removed) {console.log("removed all questions"); });
		Question.find(function(err, surveys){ if (err) { console.log(err); } responseJSON = surveys;  res.send(responseJSON); });
	});

	app.get('/getListOfQuestions', function(req, res){
		var responseJSON = "";
		Question.find(function (err, questions){
			if (err) { console.log(err); }
			responseJSON = questions;
			res.send(responseJSON);
		});
	});

	app.get('/getListOfSurveys', function(req, res){
		var responseJSON = "";
		BeerSurvey.find(function (err, surveys){
			if (err) { console.log(err); }
			responseJSON = surveys;
			res.send(responseJSON);
		});
	});

	app.get('/getListOfBeers', function(req, res){
		var responseJSON = "";
		BeerBatch.find(function (err, surveys){
			if (err) { console.log(err); }
			responseJSON = surveys;
			res.send(responseJSON);
		});
	});

	app.get('/surveyDetails/:surveyId/:beerId', function(req, res) {
		surveyId = req.params.surveyId;
		beerId = req.params.beerId;
		var responseJSON = "";
		if (BeerSurvey.findOne({beerBatches: beerId.toString(), urlIdentifingKey: surveyId.toString()}, function(err, results){
			if(err) { throw err; res.end(); }
			else {
				if (results) {
					//console.log("beer Survey Found!");
					responseJSON = {};
					responseJSON['surveyName'] = results.surveyName;
					responseJSON['surveyNumber'] = results.urlIdentifingKey;
					responseJSON['questions'] = results.questions;
					res.send(responseJSON);
				} else {
					res.end();
				}
			}
		})) {} else { res.end(); };
			// res.end();
	});

	app.get('/createACrazyURL', function(req, res) {
		var token2 = 'nope';
		var crypto = require('crypto');
		var thing = require('crypto').randomBytes(12, function(ex, buf){
			var token = buf.toString('hex');
			console.log("token: "+token);
			token2 = token;
		});

		try {
			var buf = crypto.randomBytes(12);
			console.log("the stuff: "+buf.toString('hex'));
			token2 = buf.toString('hex');
		} catch (ex) {
			console.log("got an error");
		}

		res.send(token2);
	});

	/////////////////////// Join Read Methods

	app.get('/getAllBeersInASurvey/:theSurveyId', function(req, res){
		surveyId = req.params.theSurveyId;
		var responseJSON = "";
		BeerBatch.find({ beerSurvey: surveyId}, function(err, beers){
			if (err) { console.log(err); }
			responseJSON = beers;
			res.send(responseJSON);
		});
	});

	app.get('/getTheSurveyForThisBeer/:theBeerId', function(req, res){
		theBeerId = req.params.theBeerId;
		var responseJSON = "";
		BeerSurvey.find({ beerBatches: theBeerId}, function(err, surveys){
			if (err) { console.log(err); }
			responseJSON = surveys;
			res.send(responseJSON);
		});
	});

	app.get('/getBeerForThisSurvey/:theBeerId', function(req, res){
		theBeerId = req.params.theBeerId;
		var responseJSON = {};
		//console.log("the beer id: "+theBeerId);

		BeerBatch.find({ _id: theBeerId}, function(err, theBeer){
			if (err) { console.log(err); }
			else {
				if (theBeer[0] != undefined) {
					responseJSON['beerName'] = theBeer[0].beerTitle;
					responseJSON['beerDetails'] = theBeer[0].beerDetails;
					//console.log("the beer deets: "+JSON.stringify(theBeer));
					res.send(responseJSON);
				}
			}
		});
	});

	app.get('/getQuestionsForThisSurvey/:theSurveyId', function(req, res){
		theSurveyId = req.params.theSurveyId;
		var responseJSON = "";
		Question.find({ 'beerSurvey': theSurveyId.toString() }, function(err, theBeers){
			if (err) {console.log(err); }
			else {
				console.log("the questions: "+JSON.stringify(theBeers));
				responseJSON = theBeers;
				res.send(responseJSON);
			}
		});
	});

	app.get('/getAQuestion/:theQuestionId/:theQuestionNumber', function(req, res){
		theQuestionId = req.params.theQuestionId;
		theQuestionOrderNumber = req.params.theQuestionNumber;
		console.log("the sent question number: "+req.params.theQuestionNumber);
		var responseJSON = {};
		responseJSON['theQuestionNumber'] = theQuestionOrderNumber;
		Question.find({ _id: theQuestionId.toString() }, function(err, theQuestions){
			if (err) {console.log(err); }
			else {
				if (theQuestions[0] != undefined){
					if (theQuestions[0].theType != undefined){
						responseJSON['name'] = theQuestions[0].name;
						responseJSON['title'] = theQuestions[0].title;
						responseJSON['description'] = theQuestions[0].description;
						responseJSON['required'] = theQuestions[0].required;
						responseJSON['theType'] = theQuestions[0].theType;
						responseJSON['questionId'] = theQuestions[0]._id;
						switch(theQuestions[0].theType.id) {
							case 1:
								responseJSON['dropDownListWord'] = theQuestions[0].dropDownListWord;
							case 2:
								responseJSON['dropDownListNumber'] = theQuestions[0].dropDownListNumber;
							case 3:
								responseJSON['textArea'] = theQuestions[0].textArea;
							case 4:
								responseJSON['checkBoxGroup'] = theQuestions[0].checkBoxGroup;
							case 5:
								responseJSON['radioButton'] = theQuestions[0].radioButton;
							case 6:
								responseJSON['dataList'] = theQuestions[0].dataList;
							case 7:
								responseJSON['textField'] = theQuestions[0].textField;
							default:
								responseJSON['noQuestionFound'] = true;
						}
						// if (theQuestions[0].theType.id === 7){
						// 	responseJSON['textField'] = theQuestions[0].textField;
						// }
					}
				}
				//responseJSON[0]['theQuestionNumber'] = theQuestionOrderNumber;
				//responseJSON = theQuestions;
				// responseJSON['name'] = theQuestions[0].name;
				// responseJSON['title'] = theQuestions[0].title;
				// responseJSON['description'] = theQuestions[0].description;
				//responseJSON[0].push({ 'theQuestionOrderNumber': theQuestionOrderNumber}); // = theQuestionOrderNumber;
				//responseJSON[0].theQuestionOrderNumber = theQuestionOrderNumber;
				console.log("question: "+JSON.stringify(responseJSON));
				res.send(responseJSON);
			}
		});
	});

	app.get('/getSurveyNumber/:theSurveyNumber', function(req, res) {
		theSurveyNumber = req.params.theSurveyNumber;
		var responseJSON = {};
		// console.log("survey number: "+theSurveyNumber);
		BeerSurvey.find({urlIdentifingKey: theSurveyNumber.toString()}, function(err, theSurvey) {
			if (err) {console.log(err); }
			else {
				responseJSON['surveyNumber'] = theSurvey[0]._id;
				res.send(responseJSON);
			}
		});
	});

	app.post('/addDetailsToABeer', function(req, res){
		var util = require('util');
		console.log("request handler for '/addDetailsToABeer' called");
		console.log(util.inspect(req.body));
		var newDetail = {};
		newDetail['detailProperty'] = req.body.detailProperty;
		newDetail['detailDescription'] = req.body.detailDescription;
		BeerBatch.update(
			{ _id: req.body.beerId },
			{ $push: { beerDetails: newDetail } }
		).exec();
		console.log("about to inspect the object to be saved");
		console.log(JSON.stringify(newDetail));
		// console.log("survey id: "+req.body.surveyId);
		// console.log("batch id: "+newBeerBatch._id);
		// console.log(JSON.stringify(newBeerBatch));
		res.send(newDetail);
	});

	// BeerBatch
	app.post('/addNewBeerAndAssignToASurvey', function(req, res) {
		var util = require('util');
		var crypto = require('crypto');
		console.log("request handler for '/addNewBeerAndAssignToASurvey' called");
		console.log(util.inspect(req.body));
		try { var buf = crypto.randomBytes(12); var token2 = buf.toString('hex'); 
		} catch (ex) { console.log("got an error creating a beer url"); }
		console.log("the value of the token2: "+token2);
		var newBeerBatch = new BeerBatch({
			beerTitle 			: req.body.beerTitle,
			batchNumber 		: req.body.batchInfo,
			urlIdentifingKey 	: token2,
			beerSurvey 			: req.body.parentSurveyId
		});
		console.log("about to inspect the object to be saved");
		console.log(JSON.stringify(newBeerBatch));
		newBeerBatch.save(function(err){
			if(err) console.log(err);
			else { console.log("New Beer Batch Saved!"); }
		});
		BeerSurvey.update(
			{ _id: req.body.parentSurveyId },
			{ $addToSet: { beerBatches: newBeerBatch._id } }
		).exec();
		BeerBatch.update(
			{ _id: newBeerBatch._id },
			{ $addToSet: { beerSurvey: req.body.parentSurveyId } }
		).exec();
		// console.log("survey id: "+req.body.surveyId);
		// console.log("batch id: "+newBeerBatch._id);
		// console.log(JSON.stringify(newBeerBatch));
		res.send(newBeerBatch);
	});

	app.post('/addNewSurvey', function(req, res) {
		var util = require('util');
		var crypto = require('crypto');
		console.log("request handler for '/addNewSurvey' called");
		console.log(util.inspect(req.body));
		// var token2 = "";
		try { var buf = crypto.randomBytes(12); var token2 = buf.toString('hex');
		} catch (ex) { console.log("got an error creating a survey url"); }
		var newBeerSurvey = new BeerSurvey({
			activeStatus 			: true,
			surveyName 				: req.body.surveyTitle,
			surveyDescription 		: req.body.surveyDescription,
			urlIdentifingKey 		: token2
		});
		console.log("testing token2: "+token2);
		// console.log("about to inspect the object to be saved");
		// console.log(JSON.stringify(newBeerSurvey));
		newBeerSurvey.save(function(err){
			if(err) console.log("there was an error"+err);
			else { console.log("New Survey Saved!"); }
		});
		// var responseJSON = "";
		// BeerSurvey.find(function(err, surveys){
		// 	if (err) { console.log(err); }
		// 	responseJSON = surveys;
		// 	res.send(responseJSON);
		// });
		res.send(newBeerSurvey);
	});

	/// Creating Questions section

	app.post('/addNewSliderField', function(req, res){
		var util = require('util');
		console.log("request handler for '/addNewSliderField' called");
		console.log(util.inspect(req.body));
		var newSliderField = new Question({
			name 				: req.body.questionName,
			title 				: req.body.questionTitle,
			description 		: req.body.questionDescription,
			required 			: req.body.questionRequired,
			beerSurvey 			: req.body.surveyId,
			theType 			: {
				id 				: 8,
				description 	: 'slideBar'
			},
			slideBar 			: {
				questionType 	: 8,
				defaultValue 	: req.body.theDefaultValue,
				minRange 		: req.body.minRange,
				maxRange 		: req.body.maxRange,
				stepAmount	 	: req.body.stepAmount,
				previewBox 		: true,
				stepArrows 		: true,
				editBox 		: false,
				theUnits		: req.body.theUnits,
			}
		});
		console.log("about to inspect the object to be saved");
		console.log(JSON.stringify(newSliderField));
		newSliderField.save(function(err){
			if(err) console.log(err);
			else { console.log("Slider Field Saved!"); }
		});
		Question.update(
			{ _id: newSliderField._id },
			{ $addToSet: { beerSurvey: req.body.surveyId } }
		).exec();
		BeerSurvey.update(
			{ _id: req.body.surveyId },
			{ $addToSet: { questions: { questionId: newSliderField._id, questionNum: req.body.questionNumber } } }
		).exec();
		res.send(newSliderField);
	});

	app.post('/addNewTextField', function(req, res){
		var util = require('util');
		console.log("request handler for '/addNewTextField' called");
		console.log(util.inspect(req.body));
		console.log("the question number: "+req.body.questionNumber);
		var newTextField = new Question({
			name 				: req.body.questionName,
			title 				: req.body.questionTitle,
			description 		: req.body.questionDescription,
			required 			: req.body.questionRequired,
			beerSurvey 			: req.body.surveyId,
			theType 			: {
				id 				: 7,
				description 	: 'textField'
			},
			textField 			: {
				questionType 	: 7,
				size 			: req.body.theSize,
				maxLength 		: req.body.theMaxLength,
				placeholder 	: req.body.placeholder,
				defaultValue 	: req.body.theDefaultValue
			}
		});
		console.log("about to inspect the object to be saved");
		console.log(JSON.stringify(newTextField));
		newTextField.save(function(err){
			if(err) console.log(err);
			else { console.log("Text Field Saved!"); }
		});
		Question.update(
			{ _id: newTextField._id },
			{ $addToSet: { beerSurvey: req.body.surveyId } }
		).exec();
		BeerSurvey.update(
			{ _id: req.body.surveyId },
			{ $addToSet: { questions: { questionId: newTextField._id, questionNum: req.body.questionNumber } } }
		).exec();
		res.send(newTextField);
	});

	app.post('/addNewDataList', function(req, res){
		var util = require('util');
		console.log("request handler for '/addNewDataList' called");
		console.log(util.inspect(req.body));
		var newOptions = [];
		for(var i=0; i<req.body.theOptions.length; i++){
			var newOption = {};
			newOption['displayWord'] = req.body.theOptions[i].displayWord;
			newOption['theValue'] = req.body.theOptions[i].theValue;
			newOptions.push(newOption);
		}
		var newDataList = new Question({
			name 				: req.body.questionName,
			title 				: req.body.questionTitle,
			description 		: req.body.questionDescription,
			required 			: req.body.questionRequired,
			beerSurvey 			: req.body.surveyId,
			theType 			: {
				id 				: 6,
				description 	: 'dataList'
			},
			dataList 			: {
				questionType 		: 6,
				theOptions 			: newOptions
			}
		});
		console.log("about to inspect the object to be saved");
		console.log(JSON.stringify(newDataList));

		newDataList.save(function(err){
			if(err) console.log(err);
			else { console.log("Data List Saved!"); }
		});
		Question.update(
			{ _id: newDataList._id },
			{ $addToSet: { beerSurvey: req.body.surveyId } }
		).exec();
		BeerSurvey.update(
			{ _id: req.body.surveyId },
			{ $addToSet: { questions: { questionId: newDataList._id, questionNum: req.body.questionNumber } } }
		).exec();
		res.send(newDataList);
	});

	app.post('/addNewRadioButtonList', function(req, res){
		var util = require('util');
		console.log("request handler for '/addNewRadioButtonList' called");
		//console.log(util.inspect(req.body));
		var newOptions = [];
		for(var i=0; i<req.body.theOptions.length; i++){
			var newOption = {};
			newOption['displayWord'] = req.body.theOptions[i].displayWord;
			newOption['theValue'] = req.body.theOptions[i].theValue;
			newOptions.push(newOption);
		}
		var newRadioButtonList = new Question({
			name 				: req.body.questionName,
			title 				: req.body.questionTitle,
			description 		: req.body.questionDescription,
			required 			: req.body.questionRequired,
			beerSurvey 			: req.body.surveyId,
			theType 			: {
				id 				: 5,
				description 	: 'radioButton'
			},
			radioButton 		: {
				questionType 		: 5,
				groupName 			: req.body.groupName,
				theOptions 			: newOptions
			}
		});
		// console.log("about to inspect the object to be saved");
		// console.log(JSON.stringify(newRadioButtonList));
		newRadioButtonList.save(function(err){
			if(err) console.log(err);
			else { console.log("Radio Button List Saved!"); }
		});
		Question.update(
			{ _id: newRadioButtonList._id },
			{ $addToSet: { beerSurvey: req.body.surveyId } }
		).exec();
		BeerSurvey.update(
			{ _id: req.body.surveyId },
			{ $addToSet: { questions: { questionId: newRadioButtonList._id, questionNum: req.body.questionNumber } } }
		).exec();
		res.send(newRadioButtonList);
	});


	app.post('/addNewCheckBoxList', function(req, res){
		var util = require('util');
		console.log("request handler for '/addNewCheckBoxList' called");
		//console.log(util.inspect(req.body));
		var newOptions = [];
		for(var i=0; i<req.body.theOptions.length; i++){
			var newOption = {};
			newOption['displayWord'] = req.body.theOptions[i].displayWord;
			newOption['theValue'] = req.body.theOptions[i].theValue;
			newOptions.push(newOption);
		}
		var newCheckBoxList = new Question({
			name 				: req.body.questionName,
			title 				: req.body.questionTitle,
			description 		: req.body.questionDescription,
			required 			: req.body.questionRequired,
			beerSurvey 			: req.body.surveyId,
			theType 			: {
				id 				: 4,
				description 	: 'checkBoxGroup'
			},
			checkBoxGroup 		: {
				questionType 		: 4,
				groupName 			: req.body.groupName,
				theOptions 			: newOptions
			}
		});
		// console.log("about to inspect the object to be saved");
		// console.log(JSON.stringify(newCheckBoxList));
		newCheckBoxList.save(function(err){
			if(err) console.log(err);
			else { console.log("Check Box List Saved!"); }
		});
		Question.update(
			{ _id: newCheckBoxList._id },
			{ $addToSet: { beerSurvey: req.body.surveyId } }
		).exec();
		BeerSurvey.update(
			{ _id: req.body.surveyId },
			{ $addToSet: { questions: { questionId: newCheckBoxList._id, questionNum: req.body.questionNumber } } }
		).exec();
		res.send(newCheckBoxList);
	});

	app.post('/addNewDropDownList', function(req, res){
		var util = require('util');
		console.log("request handler for '/addNewDropDownList' called");
		//console.log(util.inspect(req.body));
		var newOptions = [];
		for(var i=0; i<req.body.theOptions.length; i++){
			var newOption = {};
			newOption['displayWord'] = req.body.theOptions[i].displayWord;
			newOption['theValue'] = req.body.theOptions[i].theValue;
			newOptions.push(newOption);
		}
		var newDropDownList = new Question({
			name 				: req.body.questionName,
			title 				: req.body.questionTitle,
			description 		: req.body.questionDescription,
			required 			: req.body.questionRequired,
			beerSurvey 			: req.body.surveyId,
			theType 			: {
				id 				: 1,
				description 	: 'dropDownListWord'
			},
			dropDownListWord 		: {
				questionType 		: 1,
				theOptions 			: newOptions
			}
		});

		newDropDownList.save(function(err){
			if(err) console.log(err);
			else { console.log("Drop Down List Saved!"); }
		});
		Question.update(
			{ _id: newDropDownList._id },
			{ $addToSet: { beerSurvey: req.body.surveyId } }
		).exec();
		BeerSurvey.update(
			{ _id: req.body.surveyId },
			{ $addToSet: { questions: { questionId: newDropDownList._id, questionNum: req.body.questionNumber } } }
		).exec();
		res.send(newDropDownList);
	});

	app.post('/addNewTextArea', function(req, res){
		var util = require('util');
		console.log("request handler for '/addNewTextArea' called");
		var newTextArea = new Question({
			name 				: req.body.questionName,
			title 				: req.body.questionTitle,
			description 		: req.body.questionDescription,
			required 			: req.body.questionRequired,
			beerSurvey 			: req.body.surveyId,
			theType 			: {
				id 				: 3,
				description 	: 'textArea'
			},
			textArea 			: {
				questionType 	: 3,
				rows 			: req.body.rows,
				cols 			: req.body.cols,
				placeholder 	: req.body.placeholder,
				textWrap 		: req.body.textWrap,
				maxLength 		: req.body.maxLength,
			}
		});
		newTextArea.save(function(err){
			if(err) console.log(err);
			else { console.log("Text Area Saved!"); }
		});
		Question.update(
			{ _id: newTextArea._id },
			{ $addToSet: { beerSurvey: req.body.surveyId } }
		).exec();
		BeerSurvey.update(
			{ _id: req.body.surveyId },
			{ $addToSet: { questions: { questionId: newTextArea._id, questionNum: req.body.questionNumber } } }
		).exec();
		res.send(newTextArea);
	});

}