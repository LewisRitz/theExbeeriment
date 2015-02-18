// pageDependencies.js
module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose');

	//**************** MAIN ANGULAR FILES ****************///

	app.get('/bower_components/angular/angular.js', function(req, res){
		console.log("Request handler 'bower_components/angular/angular.js' was called.");
		var filePath = 'app/bower_components/angular/angular.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/bower_components/angular-route/angular-route.js', function(req, res){
		console.log("Request handler 'bower_components/angular-route/angular-route.js' was called.");
		var filePath = 'app/bower_components/angular-route/angular-route.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/node_modules/angularGrid/ng-grid.js', function(req, res){
		console.log("Request handler node_modules/angularGrid/ng-grid.js' was called.");
		var filePath = 'node_modules/angularGrid/ng-grid.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	//**************** JQUERY FILES ****************///

	app.get('/bower_components/jquery/dist/jquery.js', function(req, res){
		console.log("Request handler '/bower_components/jquery/dist/jquery.js' was called.");
		var filePath = 'app/bower_components/jquery/dist/jquery.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

}