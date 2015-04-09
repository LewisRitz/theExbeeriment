// angular.module('notificationBar').factory('alertTheUser', ['$scope', '$timeout', function($scope, $timeout){
// 	return function(className, alertMessageText){
// 		$scope.alertMessageText = alertMessageText;
// 		$scope.myVar = className;
// 		$timeout(function(){$scope.myVar = ''}, 3000);
// 	};
// }]);

// function alertTheUser() {
// 	this.alertTheUser = function(){
// 		$scope.alertMessageText = alertMessageText;
// 		$scope.myVar = className;
// 		$timeout(function(){$scope.myVar = ''}, 3000);
// 	}
// }


// $scope.testFunction = function(theString){
// 		console.log("this is a test");
// 		$scope.alertMessageText = "An email has been sent yo!";
// 		//$scope.changeValues('Warning');
// 		$scope.changeValues(theString);
// 	};

// 	$scope.showNotificationBar = function(theString){
// 		var alertMessageText = "this is an alert message yo!";
// 		alertTheUser(theString, alertMessageText);
// 	};

// 	$scope.changeValues = function(newClassName){
// 		$scope.myVar = newClassName;
// 		//console.log('1'+$scope.myVar);
// 		$timeout(function(){$scope.myVar = ''}, 3000);
// 		//setTimeout(function(){ $scope.myVar = ''; }, 3000);
// 	};