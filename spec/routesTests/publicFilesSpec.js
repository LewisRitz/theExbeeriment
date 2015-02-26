describe('public Files Can Be Accessed', function(){
	var request = require('request');

	it("beerFormStyles.css should respond with 200 status", function(done){
		request("http://localhost:3000/styles/beerFormStyles.css", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	}, 250);
});