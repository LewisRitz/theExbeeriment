// Order of test Create, Read, Update, Delete

describe('survey can be created', function(){
	var request = require('request'),
	mongoose= require('mongoose');


// /addNewSurvey
	var someFunction = function(){
		console.log("it works");
	};

	// there are details about how to do some things oh this site
	// http://stackoverflow.com/questions/21860607/jasmine-node-testin-child-process-callback
	it("survey should be created ", function(done, someFunction){
		var util = require('util');
		var crypto = require('crypto');
		//someFunction();
		request("http://localhost:3000/styles/beerFormStyles.css", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			//someFunction();
			done();
		});
	}, 250);
});

// app.post('/addNewSurvey', function(req, res) {
// 		var util = require('util');
// 		var crypto = require('crypto');
// 		console.log("request handler for '/addNewSurvey' called");
// 		console.log(util.inspect(req.body));
// 		// var token2 = "";
// 		try { var buf = crypto.randomBytes(12); var token2 = buf.toString('hex');
// 		} catch (ex) { console.log("got an error creating a survey url"); }
// 		var newBeerSurvey = new BeerSurvey({
// 			activeStatus 			: true,
// 			surveyName 				: req.body.surveyTitle,
// 			surveyDescription 		: req.body.surveyDescription,
// 			urlIdentifingKey 		: token2
// 		});
// 		console.log("testing token2: "+token2);
// 		// console.log("about to inspect the object to be saved");
// 		// console.log(JSON.stringify(newBeerSurvey));
// 		newBeerSurvey.save(function(err){
// 			if(err) console.log("there was an error"+err);
// 			else { console.log("New Survey Saved!"); }
// 		});
// 		// var responseJSON = "";
// 		// BeerSurvey.find(function(err, surveys){
// 		// 	if (err) { console.log(err); }
// 		// 	responseJSON = surveys;
// 		// 	res.send(responseJSON);
// 		// });
// 		res.send(newBeerSurvey);
// 	});