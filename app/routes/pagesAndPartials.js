// pagesAndPartials.js
module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose');
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'theExbeeriment@gmail.com',
			pass: 'brewbrew123'
		}
	});

	// homepage
	app.get('/signIn', function(req, res){
		console.log('Request handler for "/signIn.ejs" called')
		res.render('../app/views/signIn.ejs');
	});

	app.get('/forgotPassword', function(req, res){
		res.render('../app/views/forgotPassword.ejs');
		console.log('Request handler for "/forgotPassword.ejs" called');
	});

	app.post('/submitForgotPassword', function(req, res){
		transporter.sendMail({
			from: 'admins@theExbeeriment.com',
			to: req.body.theirEmail,//'emuinacan2@gmail.com',
			subject: 'Forgot password for theExbeeriment',
			text: 'Youre new password is: cat'
		});
		//res.send('/forgotPassword');
		res.end();
	});

	app.get('/viewSurveys', function(req, res){
		res.render('../app/views/beerSurveyList.ejs');
		console.log('Request handler for "/viewSurveys.ejs" called');
	});

	app.get('/insertData', function(req, res){
		console.log("request for '/insertData' called");
		res.render('../app/views/beerFormForInsertingData.ejs');
	});

	app.get('/:beerNumber', function(req, res){
		console.log("request handler for '/' called");
		res.render('../app/views/beerForm.ejs');
	});

	app.get('/someBeerNumber123', function(req, res){
		res.render('../app/views/beerForm.ejs');
		console.log('Request handler for "/someBeerNumber123" called');
	});

	app.get('/Survey/:firstNum/:secondNum', function(req, res){
		res.render('../app/views/beerForm.ejs');
		console.log('Request handler for "/main.ejs" called');
	});

	app.get('/', function(req, res){
		res.render('../app/views/mainPage.ejs');
		console.log('Request handler for "/main.ejs" called');
	});
}