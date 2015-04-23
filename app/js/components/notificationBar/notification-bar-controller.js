'use strict';

var notificationBar = angular.module('notificationBar', ['notificationBar']);
//var dashboardApp = angular.module('dashboardApp', ['ngGrid', 'notificationBar'] );




notificationBar.factory('notificationBarService', ['$timeout', '$rootScope', function($timeout, $rootScope){
	var naomi = {  name: 'Naomi', address: '666 Whatever Drive'  };
	var igor = { name: 'Igor', address: '999 Ugh Lane' };
	var className = '';
	var alertMessageText = '';
	var activeMessageIndex = 0;

	return {
		// naomi: function() {  return naomi;  },
		// igor: function() {  return igor;  },
		// setNaomi: function(stuff){ naomi.name = stuff; },
		// className: function() { return className; },
		// alertMessageText: function() { return alertMessageText; },
		showNotificationBar: function(className, AlertMessageText){ 
			$rootScope.$emit('newMessage', AlertMessageText, className);
		}
	};
}]);


notificationBar.controller('notificationBarController', ['$scope', '$http', '$timeout','notificationBarService', '$rootScope', function($scope, $http, $timeout, notificationBarService, $rootScope) {
	var activeMessageIndex = 0
	$scope.myService = notificationBarService.showNotificationBar;
	// $scope.myVar = "Warning";
	// $scope.alertMessageText = "this is a new test";
	// $scope.showNotificationBar = function(className){
	// 	var alertMessageText = "this is an alert message yo!";
	// 	$scope.alertMessageText = alertMessageText;
	// 	$scope.myVar = className;
	// 	activeMessageIndex++;
	// 	var currentMessageNum = activeMessageIndex;
	// 	$timeout(function(){
	// 		if(activeMessageIndex === currentMessageNum){ $scope.myVar = ''; }
	// 	}, 3000);
	// };
	// $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
	// $scope.igor = { name: 'Igor', address: '123 Somewhere' };

	// $scope.naomi =  testService.naomi();
	// $scope.igor = testService.igor();
	var activeMessageIndex;
	$scope.theClassName = '';
	$scope.alertMessageText = '';

	$rootScope.$on('newMessage', function(ev, displayMessage, className){
		activeMessageIndex++;
		var currentMessageNum = activeMessageIndex;
		$scope.theClassName = className;
		$scope.alertMessageText = displayMessage;
		// console.log("got it yooo");
		$timeout(function(){
			if(activeMessageIndex === currentMessageNum){ 
				$scope.theClassName = '';
				$scope.alertMessageText = '';
			}
		}, 3000);

	});

	// $scope.$on('newMessage', function(ev, data){
	// 	console.log("new message received. classname: "+className);
	// });

	// // $rootScope.$on('newMessage', function(ev, data){
	// // 	console.log("yeah this is it");
	// // });

	// $scope.$watch('testService.showNotificationBar()', function(newVal, oldVal){
	// 	console.log("inside watch function");
	// }, true);

	// $rootScope.$on('newMessage', function(ev, data){
	// 	console.log("got it yooo");
	// });

	// $scope.$watch(function () { return testService.naomi }, function (newVal, oldVal) {
	// 	if (typeof newVal !== 'undefined') {
	// 		$scope.naomi = testService.naomi();
	// 	}
	// });
	// $scope.$watch(function () { return testService.className }, function (newVal, oldVal) {
	// 	console.log("test service altered: "+testService.className());
	// 	if (typeof newVal !== 'undefined') {
	// 		$scope.className = testService.className();
	// 	}
	// }, true);
	// $scope.$watch(testService.className, function (newVal, oldVal) {
	// 	console.log("test service altered!!!: "+testService.className());
	// 	// if (typeof newVal !== 'undefined') {
	// 	// 	$scope.className = testService.className();
	// 	// }
	// }, true);
	// $scope.$watch(function () { return testService.alertMessageText }, function (newVal, oldVal) {
	// 	if (typeof newVal !== 'undefined') {
	// 		$scope.alertMessageText = testService.alertMessageText();
	// 	}
	// }, true);
}]);