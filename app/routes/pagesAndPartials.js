// pagesAndPartials.js
module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose');

	// homepage
	app.get('/', function(req, res){
		res.render('../app/beerForm.ejs');
		console.log('Request handler for "/main.ejs" called');
	});

	app.get('/Survey/:firstNum/:secondNum', function(req, res){
		res.render('../app/beerForm.ejs');
		console.log('Request handler for "/main.ejs" called');
	});

	app.get('/viewSurveys', function(req, res){
		res.render('../app/beerSurveyList.ejs');
		console.log('Request handler for "/viewSurveys.ejs" called');
	});

	app.get('/insertData', function(req, res){
		console.log("request for '/insertData' called");
		res.render('../app/beerFormForInsertingData.ejs');
	});

	app.get('/:beerNumber', function(req, res){
		console.log("request handler for '/' called");
		res.render('../app/beerForm.ejs');
	});

	app.get('/someBeerNumber123', function(req, res){
		res.render('../app/beerForm.ejs');
		console.log('Request handler for "/someBeerNumber123" called');
	});
}