'use strict';

var surveyApp = angular.module('surveyApp', ['ngGrid'] );

surveyApp.controller('surveyController',['$scope', '$http', function($scope, $http) {
	// var firstParam = '9ffdb1928d63e3665e241680';
	// var secondParam = '54c2edf57c5a50811b0f436e';
	$scope.mainTitle = 'The Exbeeriment';
	var thePathArray = window.location.pathname.split('/');
	$scope.theQuestionArray = [];
	$scope.chechBoxArray = [[]];
	$scope.questionValueArray = {};
	// console.log("path part 1: "+thePathArray[2]+" path part 2: "+thePathArray[3]);
	$http.get('../../surveyDetails/'+thePathArray[2]+'/'+thePathArray[3]).success(function(data) { 
		$scope.surveyName = data.surveyName;
		$scope.surveyNumber = data.surveyNumber;
		$scope.questions = data.questions; 
		console.log("original questions array: "+JSON.stringify($scope.questions));
		init(function(){
			console.log("second");
			console.log("questions array: "+JSON.stringify($scope.theQuestionArray));
		});
		// console.log("surveyName: "+$scope.surveyName);

		// console.log("pathName: "+window.location.pathname);
	});
	// $http.get('../../getBeerForThisSurvey/'+thePathArray[3]).success(function(data) {
	// 	$scope.beerName = data.beerName;
	// 	$scope.beerDetails = data.beerDetails;
	// });
	$scope.submitFormData = function(){
		console.log("button clicked: "+JSON.stringify($scope.questionValueArray));
		var submittableJSON = {};
		//console.log("survey Number: "+$scope.surveyNumber); // URL Identifier


		// if (submittableJSON != undefined) {
		// 	$http({
		// 		method: 'POST',
		// 		url: '/saveFormData',
		// 		data: {
		// 			surveyId: $scope.surveyId,  
		// 			questionName: $scope.textFieldQuestionNameField, 
		// 			questionTitle: $scope.textFieldQuestionTitleField,
		// 			questionDescription: $scope.textFieldQuestionDescriptionField,
		// 			questionRequired: $scope.textFieldRequiredField,
		// 			theSize: $scope.textFieldSizeField,
		// 			theMaxLength:  $scope.textFieldMaxLengthField,
		// 			placeholder:  $scope.textFieldPlaceholderField,
		// 			theDefaultValue:  $scope.textFieldDefaultValueField,
		// 			questionNumber: $scope.questionNumber
		// 		},
		// 	}).success(function(data, status, headers, config){
		// 		if(status===200){
		// 			console.log("new text area saved");
		// 			$scope.questionNumber++;
		// 		}
		// 	});
		// }
	};
	var init = function(callback) {
		//console.log("the questions: "+JSON.stringify($scope.questions));
		for (var theQuestionNum in $scope.questions){
			//console.log("the question number: "+$scope.questions[theQuestionNum].questionNum+" and "+theQuestionNum);
			$http.get('../../getAQuestion/'+$scope.questions[theQuestionNum].questionId+'/'+theQuestionNum).success(function(data, status, headers, config) {
				if(status === 200){
					// console.log("the returned question data: "+JSON.stringify(data));
					//console.log("the data: "+JSON.stringify(data));
					//console.log("question Number: "+theQuestionNum);
					//data[0]['theQuestionNumber'] = theQuestionNum.toString();
					$scope.theQuestionArray.push(data);
					// callback();
					//$scope.$apply();
					//console.log("the question array: "+JSON.stringify($scope.theQuestionArray[0]));
				}
			});
		}
		// console.log("second");
		// console.log("questions order: "+JSON.stringify($scope.questions));
		// console.log("questions array: "+JSON.stringify($scope.theQuestionArray));




		// $http.get('../../getSurveyNumber/'+$scope.surveyNumber).success(function(data, status, headers, config) {
		// 	console.log("status: "+status);
		// 	if(status === 200){
		// 		console.log("survey number: "+data.surveyNumber);
		// 		if (data.surveyNumber != undefined) {
		// 			$http.get('../../getQuestionsForThisSurvey/'+data.surveyNumber).success(function(data, status, headers, config) {
		// 				$scope.TheQuesitons = data;
		// 				console.log("data: "+JSON.stringify(data));
		// 				console.log("questions: "+JSON.stringify($scope.questions));
		// 				// for (question in $scope.questions){
		// 				// 	console.log("questions: "+$scope.questions[question]);
		// 				// }
		// 			});
		// 		}
		// 	}
		// });
	};


	// var init = function(){
	// 	console.log("the id's before being sent: "+JSON.stringify($scope.questions));
	// $http({
	// 	method: 'POST',
	// 	url: '../../getQuestionsForThisSurvey',
	// 	data: { questions: $scope.questions, "red": "red" },
	// }).success(function(data, status, headers, config){
	// 	if(status===200){
	// 		console.log("questions: "+JSON.stringify(data));
	// 	}});
	// };

	// $http.get('../../getQuestionsForThisSurvey').success(function(data){
	// 	$scope.questions.push(data.question);
	// });
}]);