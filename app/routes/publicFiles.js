module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose');


	////************** Public Files *******************////

	// app.get('/images/:file', function(req, res){
	// 	file = req.params.file;
	// 	res.sendfile(file, {root: 'public/images/'});
	// });

	app.get('/styles/:file', function(req, res){
		file = req.params.file;
		res.sendfile(file, {root: 'public/styles/'});
	});

	// app.get('/js/:file', function(req, res){
	// 	file = req.params.file;
	// 	res.sendfile(file, {root: 'public/js/'});
	// });

	// app.get('/Agile-Carousel-master/:file', function(req, res){
	// 	file = req.params.file;
	// 	res.sendfile(file, {root: 'public/Agile-Carousel-master/'});
	// });

}