// accessRoutes.js
module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose'),
	User = require('../../app/models/user');

	//var BeerSurvey = require('../../app/models/beerSurvey');

	// add some here
	//process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash	: true // allow flash messages
		})
	);

	app.get('/dashboard', function(req, res){
		console.log("request handler for dashboard called");
		res.render('../app/views/dashboard.ejs');
	});

	// app.post('/login2', function(req, res, next) {
	// 	console.log("login 2 called");
	// 	passport.authenticate('local-login', function(err, user, info){
	// 		if (err) { return next(err); }
	// 		if (!user) { return res.redirect('/dashboard'); }
	// 		req.logIn(user, function(err){ 
	// 			if (err) { return next(err); }
	// 			return res.send({ message: 'hi'});
	// 		});
	// 	})(req, res, next);
	// });

	//profile
	// we want this protected so you have to be logged in to view it
	// we will use route middleware to verify this (the isLoggedIn function)
	// app.get('/profile', isLoggedIn, function(req, res) {
	// 	console.log("request handler for profile called");
	// 	if (hasCorrectPrivledges(req, res, [dashboardPageId])) { //function(req, res){
	// 		console.log("has correct privs function worked");
	// 		res.render('AngularTest.ejs');
	// 	//})) 
	// 	//{
	// 		console.log("has correct privs returned true");
	// 		//var util = require('util');
	// 		//console.log("req: "+util.inspect(req));
	// 		res.render('AngularTest.ejs');
	// 	}  else { console.log("has correct privs returned false"); res.end(); }
	// });

	// app.get('/signUp', function(req, res){
	// 	console.log("request handler for signUp called");
	// 	res.render('register.ejs', {message: req.flash('error!')});
	// });

	// app.post('/addNewUser', passport.authenticate('local-signup', {
	// 	session: false,
	// 	successRedirect : '/profile#/users', // redirect to the secure profile section
	// 	failureRedirect : '/signIn', // redirect back to the signup page if there is an error
	// 	failureFlash : true // allow flash messages
	// }));


	// res.render('../app/forgotPassword.ejs');
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log("request handler for profile called");
		//res.send('it works!');
		res.render('../app/views/dashboard.ejs');
		// hasCorrectPrivledges(req, res, [dashboardPageId], function(catName) {
		// 	console.log("has correct privs function worked!!!! "+catName);
		// 	res.render('AngularTest.ejs');
		// 	res.send('it works!');
		// } ); 
		// { //function(req, res){
			
		// //})) 
		// //{
		// 	console.log("has correct privs returned true");
		// 	//var util = require('util');
		// 	//console.log("req: "+util.inspect(req));
		// 	res.render('AngularTest.ejs');
		// }  else { console.log("has correct privs returned false"); res.end(); }
	});

	app.get('/getListOfUsers', function(req, res){
		//hasCorrectPrivledges(req, res, [usersPageId], function() {
			 var responseJSON = "";
			User.find(function (err, users){
				if (err) { console.log(err); }
			 	responseJSON = users;
			// 	//console.log(JSON.stringify(responseJSON));
			// 	//res.send(responseJSON);
				// var responseJSON = [];
				// users.forEach(function(column){
				// 	var jsonObject = {};
				// 	var localObject = {};
				// 	//console.log("one of them");
				// 	//var columnName = column.metadata.colName;
				// 	// console.log("columnName");
				// 	//console.log(column);
				// 	jsonObject["_id"] = column._id;
				// 	jsonObject["__v"] = column.__v;
				// 	//localObject["privledge"] = column.local.privledge;
				// 	localObject["email"] = column.local.email;
				// 	jsonObject['local'] = localObject;
				// 	responseJSON.push(jsonObject);
				// });
				res.send(responseJSON);
			});
		//res.send('okay');
		//});
		// } else { res.status(404).send('Not Found'); }
	});

	//logout
	app.get('/logout', isLoggedIn, function(req, res){
		req.logout();
		res.redirect('/');
	});

	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()){
			//console.log(req.user.local.privledge);
			return next();
		}

		// if they aren't redirect them to the home page
		res.redirect('/');
	}

}