'use strict';

var dashboardApp = angular.module('dashboardApp', ['ngGrid', 'notificationBar'] );

dashboardApp.controller('parentDashboardController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
	var numOfActiveMessages = 0;
	$scope.showNotificationBar = function(className){
		var alertMessageText = "this is an alert message yo!";
		$scope.alertMessageText = alertMessageText;
		$scope.myVar = className;
		numOfActiveMessages++;
		var currentMessageNum = numOfActiveMessages;
		$timeout(function(){
			if(numOfActiveMessages === currentMessageNum){ $scope.myVar = ''; }
		}, 3000);
	};

}]);

dashboardApp.controller('formController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
	

}]);