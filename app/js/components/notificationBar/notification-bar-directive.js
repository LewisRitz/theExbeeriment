angular.module('notificationBar').directive('notificationBar', function(){
	return {
		restrict: 'E',
		controller: 'notificationBarController',
		// scope: {
		// 	myVar: '=type',
		// 	alertMessageText: '=text'
		// },
		// scope: {
		// 	customerInfo: '=info'
		// },
		templateUrl: 'notificationBar.html'
		//template: 'Name: {{customerInfo.name}} Address: {{customerInfo.address}}'
	};

});