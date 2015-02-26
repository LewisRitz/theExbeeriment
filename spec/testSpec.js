describe('Server test', function() {
	// var Customer = require('domain').Customer;














	// var request = require('http');
	// console.log('here');
	// // var done = function() {
	// // 	console.log("callback called");
	// // };

	// it('Server should respond to /', function(){ //done) {
	// 	console.log('here');
	// 	request.get('http://localhost:3000/', function(response){
	// 		console.log("response code: "+response.statusCode);
	// 		expect(response.statusCode).toBe(300);
	// 		//done();
	// 	});
	// });

	//jasmine.getEnv().defaultTimeoutInterval = 10;

	// it('should pass', function(){
	// 	expect(1+2).toEqual(3);
	// });

	// it('shows asyncronous test', function(){
	// 	setTimeout(function(){
	// 		expect('second').toEqual('second');
	// 		asyncSpecDone();
	// 	}, 1);
	// 	expect('first').toEqual('first');
	// 	asyncSpecWait();
	// });

	// it('shows asynchronous test node-style', function(done){
	// 	setTimeout(function(){
	// 		expect('second').toEqual('second');
	// 		console.log('second');
	// 		// If you call done() with an argument, it will fail the spec
	// 		// so you can use itas a handler for many async node calls
	// 		done('abc');
	// 		//done();
	// 	}, 1);
	// 	expect('first').toEqual('first');
	// 	console.log('first');
	// });

	//s

	var request = require('request');

	it("should respond with hello world", function(done) {
		request("http://localhost:3000/hello", function(error, response, body){
			expect(body).toEqual("hello world");
			done();
		});
	}, 250);
});

describe('Enigma Machine', function(){
	var InputString = 'LEWIS';
	var responseBody = '["P","D","Q","M","E"]';
	var request = require('request');

	it("should respond with the encoded value", function(done, responseBody){
		request("http://localhost:3000/testingEnigmaMachine/:"+InputString, function(error, response, body){
			expect(body).toEqual('["P","D","Q","M","E"]');
			done();
		});
	}, 250);
});