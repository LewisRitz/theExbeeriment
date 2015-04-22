'use strict';

var dashboardApp = angular.module('dashboardApp', ['ngGrid', 'notificationBar'] );

// dashboardApp.factory('someService', ['$rootScope', function($rootScope){
// 	//console.log("random service here");
// 	var thing = 'this is a test';
// 	console.log(thing);
// 	return {
// 		someThing: function() {  
// 			$rootScope.$emit('newMessage2', 'display this message');
// 			return thing;  
// 		}
// 	}
// }]);




dashboardApp.controller('parentDashboardController', ['$scope', '$http', '$timeout', '$rootScope', 'notificationBarService', 
	function($scope, $http, $timeout, $rootScope, notificationBarService) {

	var numOfActiveMessages = 0;
	$scope.showNotificationBar = function(){
		//var thing2 = notificationBarService.showNotificationBar('Success', 'Congradulations! It works!');
		//notificationBarService.showNotificationBar('Warning', 'Congradulations! It works!');
		notificationBarService.showNotificationBar('Error', 'Congradulations! It works!');
		//notificationBarService.showNotificationBar('Info', 'Congradulations! It works!');
		// $rootScope.$emit('newMessage2', 'display this message');
	};

	// $scope.$on('newMessage2', function(ev, data){
	// 	//console.log("got it");
	// });

	// $rootScope.$on('newMessage2', function(ev, data){
	// 	console.log("got it again: "+data);
	// });

	// $rootScope.$on('newMessage', function(ev, messageText, className){
	// 	// $scope.alertMessageText = messageText;
	// 	// $scope.myVar = className;
	// 	//numOfActiveMessages++;
	// 	//var currentMessageNum = numOfActiveMessages;
	// 	// $timeout(function(){
	// 	// 	if(numOfActiveMessages === currentMessageNum){ $scope.myVar = ''; $scope.alertMessageText = ''; }
	// 	// }, 3000);
	// });

	// $rootScope.$emit('newMessage', 'blahBlahBlah');
}]);

// dashboardApp.controller('someTestController', ['$scope', '$http', '$timeout', '$rootScope', 'testService', 'someService',
// 	function($scope, $http, $timeout, $rootScope, testService, someService) {
// 		$rootScope.$on('newMessage', function(ev, messageText, className){
// 			console.log("hey this is working");
// 		});

// 		$rootScope.$on('newMessage2', function(ev, messageText, className){
// 			console.log("hey this is working2");
// 		});
// 	}]);


dashboardApp.controller('formController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
	

}]);