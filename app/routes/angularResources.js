module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose');

//**************** ANGULAR APPS, CONTROLLERS, AND DIRECTIVES ****************///

	app.get('/app3.js', function(req, res) {
		var util = require('util');
		console.log("Request handler for 'app3.js' was called.");
		var filePath = './app/js/app3.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/app/js/controllers3z.js', function(req, res) {
		console.log("Request handler for 'controllers3.js' was called.");
		var filePath = './app/js/controllers3.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/app/js/directives.js', function(req, res){
		console.log("Request handler 'directives.js' was called.");
		var filePath = './app/js/directives.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/app/js/surveyController.js', function(req, res) {
		console.log("Request handler for 'surveyController.js' was called.");
		var filePath = './app/js/surveyController.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});
}