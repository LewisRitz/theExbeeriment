describe('Main Angular Files Can Be Accessed', function(){
	var request = require('request');

	it("angular.js should respond with 200 status", function(done){
		request("http://localhost:3000/bower_components/angular/angular.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);

	it("angular-route.js should respond with 200 status", function(done){
		request("http://localhost:3000/bower_components/angular-route/angular-route.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);

	it("ng-grid.js should respond with 200 status", function(done){
		request("http://localhost:3000/node_modules/angularGrid/ng-grid.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);
});

describe('jQuery Files Can Be Accessed', function(){
	var request = require('request');

	it("jquery.js should respond with 200 status", function(done){
		request("http://localhost:3000/bower_components/jquery/dist/jquery.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);
});