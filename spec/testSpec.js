describe('Server test', function() {
	var request = require('http');
	console.log('here');
	// var done = function() {
	// 	console.log("callback called");
	// };

	it('Server should respond to /', function(){ //done) {
		console.log('here');
		request.get('http://localhost:3000/', function(response){
			console.log("response code: "+response.statusCode);
			expect(response.statusCode).toBe(300);
			//done();
		});
	});
});