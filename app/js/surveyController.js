'use strict';

var publicApp = angular.module('publicApp', ['ngGrid', 'notificationBar'] );

publicApp.controller('homepageController',['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

	$scope.mainTitle = 'The Exbeeriment';
	var thePathArray = window.location.pathname.split('/');


	$scope.toggleSignIn = function(){
		$scope.adminLoginVisible = !($scope.adminLoginVisible);
		if ($scope.adminLoginVisible){
			$scope.signInButtonText = 'Hide';
		} else { $scope.signInButtonText = 'Sign In'; }
	};
	$scope.adminLoginVisible = false;
	$scope.signInButtonText = 'Sign In';


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