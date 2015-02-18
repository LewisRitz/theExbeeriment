// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
	// passport session setup

	//passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user._id);
		});
	});

	// local signup

	// we are using named strategies since we have one for login and one for signup

	passport.use('local-signup', new LocalStrategy({
		// by default, local strat uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		permissions	  : 'permissionLevel',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) {

		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function(){

			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			User.findOne({ 'local.email' : email }, function(err, user) {
				if (err) { return done(err); } // return errors
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					// if there is no user with that email
					// create the user
					var newUser = new User();

					// set the user's local credentials
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.privledge = req.body.permissionLevel;

					// save the user
					newUser.save(function(err) {
						if (err) { throw err; }
						return done(null, newUser);
					});
				}
			});
		});
	}));

	// local login

	// we are using the named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	}, 
	function(req, email, password, done) { // callback with email and password from our form
		//console.log("email: "+email+" password: "+password);

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'local.email' : email }, function(err, user) {
			// if there are any errors, return the error before anything else
			if (err) { console.log("error happened"); return done(err); }
			console.log("here");
			// if no user is found, return the message
			if (!user) { 
				console.log("no user found");
				return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the flashdata using connect-flash
			}
			console.log("user found");
			// if the user is found but the password is wrong
			if (!user.validPassword(password)) {
				console.log("wrong password");
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			}
			console.log("correct password");
			//var theUser = { _id: user._id, __v: user.__v, local: { privledge: user.local.privledge, email: user.local.email }};
			user.local.password = null;
			// all is well, return successful user
			return done(null, user);
		});
		//req.session.save();
	}));

    // local login

	// we are using the named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-edit', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		permissions	  : 'permissionLevel',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	}, 
	function(req, email, password, done) { // callback with email and password from our form

		process.nextTick(function(){

			// User.update(
			// 	{ _id: req.body.userId },
			// 	{
			// 		email : req.body.email,
			// 		password : req.body.password,
			// 		privledge : req.body.privledge, 
			// 		$addToSet: { privs: req.body.permissionId } 
			// 	}
			// ).exec();

			User.findOne({ '_id': req.body.userId}, function(err, theUser){
				theUser.local.email = req.body.email;
				theUser.local.password = req.body.password;
				theUser.local.privledge = req.body.privledge;
				theUser.save(function(err){
					if (err) return handleError(err);
					else { console.log("User Info Updated!"); return done(null, theUser); }
				});
			});

			// User.findOne({ 'local.email' : req.body.email }, function(err, user) {
			// 	if (err) { return done(err); } // return errors
			// 	if (user) {
			// 		return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			// 	} else {
			// 		// if there is no user with that email
			// 		// create the user
			// 		var newUser = new User();

			// 		// set the user's local credentials
			// 		newUser.local.email = req.body.email;
			// 		//newUser.local.password = newUser.generateHash(password);
			// 		newUser.local.privledge = req.body.permissionLevel;

			// 		// save the user
			// 		newUser.save(function(err) {
			// 			if (err) { throw err; }
			// 			return done(null, newUser);
			// 		});
			// 	}
			// });

		});
  //       console.log("ON THE DB: "+req.body.email+", "+req.body.privledge+", "+req.body.userId);
		// // find a user whose email is the same as the forms email
		// // we are checking to see if the user trying to login already exists



		// //  User.findOneAndUpdate({_id:req.body.userId}, req.body, function(err, user) {
		// // 	res.send(user);
		// // });
		// User.findOne({ '_id': req.body.userId}, function(err, theUser){
		// 	// theUser.email = req.body.email;
		// 	// theUser.privledge = req.body.privledge;
		// 	// theUser.save(function(err){
		// 	// 	if (err) return handleError(err);
		// 	// 	else { console.log("User Info Updated!");}
		// 	// });
		// });
		// User.findOne({ '_id' : req.body.userId }, function(err, user) {
		// 	// if there are any errors, return the error before anything else
		// 	if (err) { return done(err); }
			
		// 	// if no user is found, return the message
		// 	if (!user) { 
		// 		return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the flashdata using connect-flash
		// 	}

		// 	// if the user is found but the password is wrong
		// 	if (!user.validPassword(password)) {
		// 		return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
		// 	}

		// 	// all is well, return successful user
		// 	return done(null, user);
		// });
	}));

};

















