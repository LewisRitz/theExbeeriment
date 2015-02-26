describe('angular apps, controlers, and directives Can Be Accessed', function(){
	var request = require('request');

	it("app3.js should respond with 200 status", function(done){
		request("http://localhost:3000/app3.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);

	it("controllers3z.js should respond with 200 status", function(done){
		request("http://localhost:3000/app/js/controllers3z.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);

	it("directives.js should respond with 200 status", function(done){
		request("http://localhost:3000/app/js/directives.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);

	it("surveyController.js should respond with 200 status", function(done){
		request("http://localhost:3000/app/js/surveyController.js", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);

});