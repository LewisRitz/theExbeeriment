var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
pspt = require('passport'),
flash = require('connect-flash'),
fileSystem = require('fs'),
path = require('path'),
exec = require("child_process").exec;

configDB = require('./config/database.js');

//mongoose.connect(configDB.url);  	// use for deployment
mongoose.connect('localhost');		// use when showing dr. kline
require('./config/passport')(pspt);

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());

	app.set('view engine', 'ejs');

	app.use(express.session({
		secret: 'iAmSeriouslyHungryButICantStopProgramming' 
	}));
	app.use(pspt.initialize());
	app.use(pspt.session());
	app.use(flash());
});

//require('./app/routes.js')(app, pspt);
require('./app/routes/pageDependencies.js')(app, pspt);
require('./app/routes/angularResources.js')(app, pspt);
require('./app/routes/publicFiles.js')(app, pspt);
require('./app/routes/dbCRUD.js')(app, pspt);
require('./app/routes/accessRoutes.js')(app, pspt);
require('./app/routes/pagesAndPartials.js')(app, pspt);

app.listen(port);
console.log("app listening on port "+port);