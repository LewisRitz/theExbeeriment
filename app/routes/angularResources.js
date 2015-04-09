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

	// directive dependencies
	app.get('/adminLogin.js', function(req, res){
		console.log('Request handler for "/adminLogin.js" called');
		var filePath = './app/js/components/adminLogin/admin-login-directive.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/adminLogin.html', function(req, res){
		//res.send('../app/js/components/adminLogin/admin-login.html');
		console.log('Request handler for "/adminLogin.html" called');
		var filePath = './app/js/components/adminLogin/admin-login.html';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/notificationBar.js', function(req, res){
		console.log('Request handler for "/notificationBar.js" called');
		var filePath = './app/js/components/notificationBar/notification-bar-directive.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/notificationBarService.js', function(req, res){
		console.log('Request handler for "/notificationBar.js" called');
		var filePath = './app/js/components/notificationBar/notification-bar-service.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/notificationBar.html', function(req, res){
		//res.send('../app/js/components/adminLogin/admin-login.html');
		console.log('Request handler for "/notificationBar.html" called');
		var filePath = './app/js/components/notificationBar/notification-bar.html';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/dashboardController.js', function(req, res){
		console.log('Request handler for "/dashboardController.js" called');
		var filePath = './app/js/components/dashboard/dashboard-controller.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/dashboard.css', function(req, res){
		console.log('Request handler for "/dashboardController.js" called');
		var filePath = './app/js/components/dashboard/dashboard-controller.css';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});














}