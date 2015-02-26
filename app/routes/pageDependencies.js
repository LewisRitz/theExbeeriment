// pageDependencies.js
module.exports = function(app, passport) {
	var exec = require("child_process").exec,
	fileSystem = require('fs'),
	path = require('path'),
	mongoose= require('mongoose');

	//**************** JASMINE TESTING *******************///
	app.get('/hello', function(req, res){
		res.send('hello world');
	});

	//**************** MAIN ANGULAR FILES ****************///

	app.get('/testingEnigmaMachine/:codeToEncrypt', function(req, res){
		var codeToEncrypt = (req.params.codeToEncrypt).toUpperCase();

		//var RegAlphabet = [ 'A',  'B', 'C'2, 'D'3, 'E'4, 'F'5, 'G'6, 'H'7, 'I'8, 'J'9, 'K'10, 'L'11, 'M'12, 'N'13, 'O'14, 'P'15, 'Q'16, 'R'17, 'S'18, 'T'19, 'U'20, 'V'21, 'W'22, 'X'23, 'Y'24, 'Z'25];
		var RegAlphabet = [ 'A',  'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		var Rotor1  = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
		var Rotor2  = ['Z', 'A', 'Q', 'W', 'S', 'X', 'C', 'D', 'E', 'R', 'F', 'V', 'B', 'G', 'T', 'Y', 'H', 'N', 'M', 'J', 'U', 'I', 'K', 'L', 'O', 'P'];
		var Rotor3  = ['P', 'L', 'O', 'K', 'M', 'I', 'J', 'N', 'U', 'H', 'B', 'Y', 'G', 'V', 'T', 'F', 'C', 'R', 'D', 'X', 'E', 'S', 'Z', 'W', 'A', 'Q'];
		var Reflector  = ['N', 'P', 'K', 'M', 'S', 'L', 'Z', 'T', 'W', 'Q', 'C', 'F', 'D', 'A', 'V', 'B', 'J', 'Y', 'E', 'H', 'X', 'O', 'I', 'U', 'R', 'G'];

		var Rotor1 = [ 16, 22, 4, 17, 19, 24, 20, 8, 14, 15, 11, 10, 9, 7, 6, 5, 3, 18, 0, 25, 23, 2, 21, 1, 13, 12 ]; 
		var Rotor2 = [ 25, 0, 16, 22, 18, 23, 2, 3, 4, 17, 5, 21, 1, 6, 19, 24, 7, 13, 12, 9, 20, 8, 10, 11, 14, 15 ]; 
		var Rotor3 = [ 15, 11, 14, 10, 12, 8, 9, 13, 20, 7, 1, 24, 6, 21, 19, 5, 2, 17, 3, 23, 4, 18, 25, 22, 0, 16 ];
		var Reflector = [ 13, 15, 10, 12, 18, 11, 25, 19, 22, 16, 2, 5, 3, 0, 21, 1, 9, 24, 4, 7, 23, 14, 8, 20, 17, 6 ];
		var Rotor3i = [];
		var Rotor2i = [];
		var Rotor1i = [];

		for (i = 0; i < 26; i++){
			for (x = 0; x < 26; x++){
				if (Rotor3[x] === i) { Rotor3i[i] = x; }
				if (Rotor2[x] === i) { Rotor2i[i] = x; }
				if (Rotor1[x] === i) { Rotor1i[i] = x; }
			}
		}

		Rotor4Consolodated = [];

		for (i = 0; i < 26; i++){
			Rotor4Consolodated[i] = Rotor1i[Rotor2i[Rotor3i[Reflector[Rotor3[i]]]]];
		}

		console.log('rotor1: '+JSON.stringify(Rotor1));
		console.log('rotor2: '+JSON.stringify(Rotor2));
		console.log('rotor3: '+JSON.stringify(Rotor3));
		console.log('reflector: '+JSON.stringify(Reflector));
		console.log('rotor3i: '+JSON.stringify(Rotor3i));
		console.log('rotor2i: '+JSON.stringify(Rotor2i));
		console.log('rotor1i: '+JSON.stringify(Rotor1i));

		// var AlphObj = function(params) {
		// 	this.letter = params.letter;
		// 	this.num
		// }


		// var Alphabet = [{'A', 0 }, {'B', 1 }, {'C', 2 }, {'D', 3 }, {'E', 4 }, {'F', 5 }, {'G', 6 }, {'H', 7 }, {'I', 8 }, {'J', 9 }, {'K', 10 }, {'L', 11 }, 
		// {'M', 12 }, {'N', 13 }, {'O', 14 }, {'P', 15 }, {'Q', 16 }, {'R', 17 }, {'S', 18 }, {'T', 19 }, {'U', 20 }, {'V', 21 }, {'W', 22 }, {'X', 23 }, {'Y', 24 }, 
		// {'Z', 25 }, ];

		//var Rotor1Num = [16, 22, 4,  17,  19,  24,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]

		// for this character
			// 

		// var ReturnStringR1 = 'var Rotor1 = [ ';
		// var ReturnStringR2 = 'var Rotor2 = [ ';
		// var ReturnStringR3 = 'var Rotor3 = [ ';
		// var ReturnStringRefl = 'var Reflector = [ ';

		// for (var i = 0; i < 26; i++){
		// 	// for each element in rotor 1
		// 	// find the matching element in the RegAlphabet Array
		// 	for (var x = 0; x < 26; x++){
		// 		if (Rotor1[i] === RegAlphabet[x]){ ReturnStringR1 += x+', '; }
		// 		if (Rotor2[i] === RegAlphabet[x]){ ReturnStringR2 += x+', '; }
		// 		if (Rotor3[i] === RegAlphabet[x]){ ReturnStringR3 += x+', '; }
		// 		if (Reflector[i] === RegAlphabet[x]){ ReturnStringRefl += x+', '; }
		// 	}
		// }

		// ReturnStringR1 += '];'; ReturnStringR2 += '];'; ReturnStringR3 += '];'; ReturnStringRefl += '];';
		// //res.send(ReturnStringR1 + '   ' + ReturnStringR2 + '   ' + ReturnStringR3);
		// res.send(ReturnStringRefl);


		// [10,19,21,14,0] result after rotor1 conversion
		// [5,9,8,19,25] result after rotor2 conversion
		// [8,7,20,23,16] result after rotor3 conversion
		// [22,19,23,20,9] result after reflector conversion


		var ResponseString;
		var arrayPos = [];
		for (var i = 0; i < codeToEncrypt.length; i++){
			var character = codeToEncrypt.charAt(i);
			//console.log('the char: '+character);
			for (var x = 0; x < 26; x++){
				if (character === RegAlphabet[x]) { arrayPos.push(x); }
			}
		}
		resultArray = [];
		result2Array = [];

		var Rotor2Index = 0;
		for (var i=0; i< arrayPos.length; i++){
			resultArray.push(RegAlphabet[Rotor1i[Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[arrayPos[i]]]]]]]]]);
			//result2Array.push(RegAlphabet[Rotor4Consolodated[Rotor2[Rotor1[arrayPos[i]]]]]);

			if ((i != 0) && (i%26 === 0)) { Rotor2Index++; }
			if(Rotor2Index >= 26) { updateDynamicRotor4(); Rotor2Index = 0; }
			console.log(" ");
			console.log(" ");
			console.log('shifted output: '+((arrayPos[i]+i)%26));
			//result2Array.push(RegAlphabet[Rotor4Consolodated[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]);
			var thing = 0; 
			console.log('Rotor2Index: '+Rotor2Index);
			console.log('input: '+(arrayPos[i]%26)+ ' letter: '+RegAlphabet[(arrayPos[i]%26)]);
			console.log('intoRotor1: '+((arrayPos[i]+i)%26)+ ' letter: '+RegAlphabet[ ((arrayPos[i]+i)%26) ]);
			console.log('intoRotor2: '+Rotor1[((arrayPos[i]+i)%26)]+ ' letter: '+RegAlphabet[ Rotor1[((arrayPos[i]+i)%26)] ]);
			console.log('intoRotor3: '+Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]+ 
				' letter: '+RegAlphabet[ Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index] ]);

			console.log('intoReflector: '+Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]+ 
				' letter: '+RegAlphabet[ Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]] ]);

			console.log('intoRotor3i: '+Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]+ 
				' letter: '+RegAlphabet[ Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]] ]);

			console.log('intoRotor2i: '+Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]]+ 
				' letter: '+RegAlphabet[ Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]] ]);

			//console.log('intoRotor1i: '+Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]]]);
			console.log('intoRotor1i: '+parseInt( Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]]]]]] )+ 
				' letter: '+RegAlphabet[ Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]]]]]] ]);
			//thing = Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]]];
			//console.log("the thing: "+thing);
			//console.log('intoRotor1i: '+parseInt(thing)+(i%26));
			// var something = parseInt( Rotor1i[Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]]]]-(i%26));
			// console.log('test output: '+(((something%26)+26)%26));

			console.log('output: '+ ((((parseInt( Rotor1i[Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]]]]]]]-(i%26)))%26)+26)%26)+ 
				' letter: '+RegAlphabet[ ((((parseInt(Rotor1i[Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]]]]]]]-(i%26)))%26)+26)%26) ]);
			//console.log('output: '+Rotor1i[Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)]+Rotor2Index]]]]]]);

			result2Array.push(RegAlphabet[ ((((parseInt(Rotor1i[Rotor2i[Rotor3i[Reflector[Rotor3[Rotor2[Rotor1[((arrayPos[i]+i)%26)+Rotor2Index] ]]]]]]-(i%26)))%26)+26)%26)-Rotor2Index ]);
		}
		//res.send(JSON.stringify(resultArray)+'  '+JSON.stringify(result2Array));
		res.send(JSON.stringify(result2Array));
	});

	// abcdefghijklmnopqrstuvwxyzabc
	//

	app.get('/bower_components/angular/angular.js', function(req, res){
		console.log("Request handler 'bower_components/angular/angular.js' was called.");
		var filePath = 'app/bower_components/angular/angular.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/bower_components/angular-route/angular-route.js', function(req, res){
		console.log("Request handler 'bower_components/angular-route/angular-route.js' was called.");
		var filePath = 'app/bower_components/angular-route/angular-route.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	app.get('/node_modules/angularGrid/ng-grid.js', function(req, res){
		console.log("Request handler node_modules/angularGrid/ng-grid.js' was called.");
		var filePath = 'node_modules/angularGrid/ng-grid.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

	//**************** JQUERY FILES ****************///

	app.get('/bower_components/jquery/dist/jquery.js', function(req, res){
		console.log("Request handler '/bower_components/jquery/dist/jquery.js' was called.");
		var filePath = 'app/bower_components/jquery/dist/jquery.js';
		var stat = fileSystem.statSync(filePath);
		var readStream = fileSystem.createReadStream(filePath);
		readStream.pipe(res);
	});

}