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
	$scope.showFirstNotificationBar = function(){
		//var thing2 = notificationBarService.showNotificationBar('Success', 'Congradulations! It works!');
		//notificationBarService.showNotificationBar('Warning', 'Congradulations! It works!');
		//notificationBarService.showNotificationBar('Error', 'Congradulations! It works!');
		notificationBarService.showNotificationBar('Success', 'Survey: someweirdthignthatgoeshere was created successfully!');
		// $rootScope.$emit('newMessage2', 'display this message');
	};

	$scope.showSecondNotificationBar = function(){  notificationBarService.showNotificationBar('Warning', 'Congradulations! It works!');  };
	$scope.showThirdNotificationBar = function(){  notificationBarService.showNotificationBar('Error', 'Congradulations! It works!');  };
	$scope.showFourthNotificationBar = function(){  notificationBarService.showNotificationBar('Info', 'Congradulations! It works!');  };

	$scope.setProperty = function(){
		notificationBarService.setSomeProperty('Red');
	};

	$scope.logProperty = function(){
		notificationBarService.logSomeProperty('hello there');
	};

	$scope.GetSurveys = function() {
		$http({
    			method: 'GET',
    			url: '/getListOfSurveys',
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				angular.forEach(data,function(item,index){ item.index=index; item.beerBatchIndexMap = []; item.questionIndexMap = []; });
					// console.log("Retreived survey data "+JSON.stringify(data));
    				$scope.Surveys = data;
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Survey Data Could Not Be Retreived From The Server. Please Try Again Later. ');
    		});
    };
    $scope.GetSurveys();

    $scope.GetBeers = function() {
		$http({
    			method: 'GET',
    			url: '/getListOfBeers',
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				angular.forEach(data,function(item,index){ item.index=index; item.surveyIndexMap = []; });
    				$scope.BeerBatches = data;
    				console.log("Retreived beer data "+JSON.stringify(data));
    				//notificationBarService.showNotificationBar('Success', 'Text Area \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Beer Data Could Not Be Retreived From The Server. Please Try Again Later. ');
    		});
    };
    $scope.GetBeers();

    $scope.GetQuestions = function() {
		$http({
    			method: 'GET',
    			url: '/getListOfQuestions',
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				angular.forEach(data,function(item,index){ item.index=index; item.surveyIndexMap = []; });
    				$scope.Questions = data;
    				console.log("Retreived question data "+JSON.stringify(data));
    				//notificationBarService.showNotificationBar('Success', 'Text Area \''+data.name+'\' was created successfully!');
    				setTimeout(function() { $scope.createIndexMappings(); } , 1000);
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Question Data Could Not Be Retreived From The Server. Please Try Again Later. ');
    		}); 
    };
    $scope.GetQuestions();

    $scope.mySelections = [];

    $scope.gridOptions = { 
    	data: 'Surveys',
    	// enableCellSelection: true,
    	// enableRowSelection: true,
    	// enableCellEdit: false,
    	multiSelect: false,
    	// showSelectionCheckbox: false, 
    	selectedItems: $scope.mySelections,
    	columnDefs: [{
    		field:'surveyName', 
    		displayName:'Name',
    		cellTemplate: '<div class="widerGrid" ng-click="selectAssociatedBeerBatches(row)" ng-bind="row.getProperty(col.field)"></div>'
    	},{	
    		field:'surveyDescription', 
    		displayName:'Description',
    		cellTemplate: '<div class="widerGrid" ng-click="selectAssociatedBeerBatches(row)" ng-bind="row.getProperty(col.field)"></div>'
    	}] 
    };

    $scope.createIndexMappings = function(){
    	for(var j=0; j<$scope.Surveys.length; j++){
    		for(var k=0; k<$scope.Surveys[j].beerBatches.length; k++){
    			for(var i=0; i<$scope.BeerBatches.length; i++){
	    			if($scope.BeerBatches[i]._id === $scope.Surveys[j].beerBatches[k]){
	    				$scope.BeerBatches[i].surveyIndexMap.push(j);
	    				$scope.Surveys[j].beerBatchIndexMap.push(i);
	    			}
	    		}
    		}
    		for(var k=0; k<$scope.Surveys[j].questions.length; k++){
    			for(var i=0; i<$scope.Questions.length; i++){
	    			if($scope.Questions[i]._id === $scope.Surveys[j].questions[k]){
	    				$scope.Questions[i].surveyIndexMap.push(j);
	    				$scope.Surveys[j].questionIndexMap.push(i);
	    			}
	    		}
    		}
    	}
    	// console.log('BeerBatches: '+JSON.stringify($scope.BeerBatches)+" surveys: "+JSON.stringify($scope.Surveys));
    }


    var lastSelectedBeerBatchRowIndex = 0
    $scope.selectAssociatedBeerBatches = function(row) {
    	if(row.entity.beerBatchIndexMap[0] === undefined) { $scope.beerBatches.selectRow(lastSelectedBeerBatchRowIndex, false); } else {
    		$scope.beerBatches.selectRow(row.entity.beerBatchIndexMap[0], true);
    		lastSelectedBeerBatchRowIndex = row.entity.beerBatchIndexMap[0];
    	}
    	$scope.selectAssociatedQuestions(row);
    	// console.log("index: "+row.entity.beerBatchIndexMap[0]+" survey: "+
    	// 	row.entity.surveyName+" beer: "+$scope.BeerBatches[row.entity.beerBatchIndexMap[0]].beerTitle);
    	// console.log("counter: "+counter);
    };

    var lastSelectedSurveyRowIndex = 0
    $scope.selectAssociatedSurveys = function(row) {
    	if(row.entity.theType === undefined) { // this is a BeerBatch Object
	    	if(row.entity.surveyIndexMap[0] === undefined) { $scope.gridOptions.selectRow(lastSelectedSurveyRowIndex, false); } else {
	    		$scope.gridOptions.selectRow(row.entity.surveyIndexMap[0], true);
	    		lastSelectedBeerBatchRowIndex = row.entity.surveyIndexMap[0];
	    	}
	    }
	    else {
	    	console.log("clicked a question");
	    	if(row.entity.surveyIndexMap[0] === undefined) { $scope.gridOptions.selectRow(lastSelectedSurveyRowIndex, false); } else {
	    		$scope.gridOptions.selectRow(row.entity.surveyIndexMap[0], true);
	    		lastSelectedQuesitonRowIndex = row.entity.surveyIndexMap[0];
	    	}
	    }
    };

    var lastSelectedQuesitonRowIndex = 0
    $scope.selectAssociatedQuestions = function(row) {
    	if(row.entity.questionIndexMap[0] === undefined) { $scope.theQuestions.selectRow(lastSelectedQuesitonRowIndex, false); } else {
    		$scope.theQuestions.selectRow(row.entity.questionIndexMap[0], true);
    		lastSelectedQuestionRowIndex = row.entity.surveyIndexMap[0];
    	}
    };


    $scope.beerBatches = {
    	data: 'BeerBatches',
    	enableCellEdit: true,
    	multiSelect: false,
    	columnDefs: [{
    		field:'beerTitle', 
    		displayName:'Name',
    		cellTemplate: '<div ng-click="selectAssociatedSurveys(row)" class="widerGrid" ng-bind="row.getProperty(col.field)"></div>'
    	},{	
    		field:'batchNumber', 
    		displayName:'Description',
    		cellTemplate: '<div ng-click="selectAssociatedSurveys(row)" class="widerGrid" ng-bind="row.getProperty(col.field)"></div>'
    	}]

    };

    $scope.theQuestions = {
    	data: 'Questions',
    	enableCellEdit: true,
    	multiSelect: false,
    	columnDefs: [{
    		field:'name', 
    		displayName:'Name',
    		cellTemplate: '<div ng-click="selectAssociatedSurveys(row)" class="widerGrid" ng-bind="row.getProperty(col.field)"></div>'
    	},{	
    		field:'title', 
    		displayName:'Title',
    		cellTemplate: '<div ng-click="selectAssociatedSurveys(row)" class="widerGrid" ng-bind="row.getProperty(col.field)"></div>'
    	},{	
    		field:'description', 
    		displayName:'Description',
    		cellTemplate: '<div ng-click="selectAssociatedSurveys(row)" class="widerGrid" ng-bind="row.getProperty(col.field)"></div>'
    	}]

    };

    // $scope.myData = [{name: "Moroni", age: 50},
    //                  {name: "Tiancum", age: 43},
    //                  {name: "Jacob", age: 27},
    //                  {name: "Nephi", age: 29},
    //                  {name: "Enos", age: 34}];
    // $scope.gridOptions = { data: 'myData' };



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

// // dashboardApp.controller('MyCtrl', ['$scope', function($scope) {
// //     $scope.mySelections = [];
//     $scope.myData = [{name: "Moroni", age: 50},
//                      {name: "Tiancum", age: 43},
//                      {name: "Jacob", age: 27},
//                      {name: "Nephi", age: 29},
//                      {name: "Enos", age: 34}];
//     $scope.gridOptions = { 
//       data: 'myData',
//       selectedItems: $scope.mySelections,
//       multiSelect: false
//     };
// // }]);


dashboardApp.controller('formController', ['$scope', '$http', '$timeout', 'notificationBarService', function($scope, $http, $timeout, notificationBarService) {
	
	$scope.workflowItem = 'Main';

	$scope.workflowItemShow = function(WorkflowStepName) {
		if (WorkflowStepName === $scope.workflowItem) { return true; }
		else { return false; }
	};

	$scope.changeWorkflowStep = function(newWorkflowStep) {
		if($scope.workflowItem === 'Main') {
			if($scope.checkIfaSurveyWasCreated()){
				$scope.workflowItem = newWorkflowStep;
			}
		} else if ($scope.workflowItem === 'AddBeerBatch') {
			if($scope.checkIfaBrewBatchWasCreated()){
				$scope.workflowItem = newWorkflowStep;
			}
		} else {
			$scope.workflowItem = newWorkflowStep;
		}
	};
	$scope.checkIfaSurveyWasCreated = function() { 
		if( $scope.surveyId === 1){ 
			notificationBarService.showNotificationBar('Warning', 'Please create the survey before proceeding.');
			return false; 
		} else return true; 
	}
	$scope.checkIfaBrewBatchWasCreated = function(){
		if($scope.beerId === 1){
			notificationBarService.showNotificationBar('Warning', 'Please create the beer batch before proceeding.');
			return false;
		} else return true; 
	}


	$scope.questionValueArray = {};

	$scope.dropDownListForm = false; $scope.textAreaForm = false; $scope.checkboxForm = false; 
	$scope.radioButtonForm = false; $scope.dataListForm = false; $scope.textFieldForm = false;
	$scope.sliderForm = false; $scope.questionModel = '';

	$scope.testFunction = function(thing) {
		// console.log("it works! "+$scope.questionModel);
		$scope.dropDownListForm = false;
		$scope.textAreaForm = false;
		$scope.checkboxForm = false;
		$scope.radioButtonForm = false;
		$scope.dataListForm = false;
		$scope.textFieldForm = false;
		$scope.sliderForm = false;
		switch ($scope.questionModel) {
			case "Drop Down List" :
				// console.log("Drop Down List option selected");
				$scope.dropDownListForm = true;
				break
			case "Text Area" :
				// console.log("text area option selected");
				$scope.textAreaForm = true;
				break
			case "Check Box List" :
				// console.log("Check Box List option selected");
				$scope.checkboxForm = true;
				break
			case "Radio Button List" :
				// console.log("Radio Button List option selected");
				$scope.radioButtonForm = true;
				break
			case "Searchable Drop Down List" :
				// console.log("Searchable Drop Down List option selected");
				$scope.dataListForm = true;
				break
			case "Text Field" :
				// console.log("Text Field option selected");
				$scope.textFieldForm = true;
				break
			case "Slide Bar (numbers only)" :
				// console.log("Slide Bar (numbers only) option selected");
				$scope.sliderForm = true;
				break
			default:
				console.log("it didn't work");
		}
	};

	$scope.dropDownListWord = {};
	$scope.dropDownListWord.options = [];
	$scope.dropDownQuestionRequiredField = false;
	$scope.dropDownQuestionDescriptionField = "";

	$scope.textAreaRowsField = 8;
	$scope.textAreaColsField = 50;
	$scope.textAreaRequiredField = false;
	$scope.textAreaWrapProperty = "soft";
	$scope.textAreaMaxLengthProperty = 180;
	$scope.textAreaQuestionDescriptionField = "";
	$scope.textAreaPlaceholderField = "";
	$scope.textAreaWrapHardProperty = false;

	$scope.checkBoxListWord = {};
	$scope.checkBoxListWord.options = [];
	$scope.checkBoxListQuestionRequiredField = false;
	$scope.checkBoxListQuestionDescriptionField = "";

	$scope.radioButtonListWord = {};
	$scope.radioButtonListWord.options = [];
	$scope.radioButtonListQuestionRequiredField = false;
	$scope.radioButtonListQuestionDescriptionField = "";

	$scope.dataListWord = {};
	$scope.dataListWord.options = [];
	$scope.dataListQuestionRequiredField = false;
	$scope.dataListQuestionDescriptionField = "";

	$scope.sliderMinRangeField = 0;
	$scope.sliderMaxRangeField = 101;
	$scope.sliderValueField = 50;
	$scope.sliderStepAmountField = 2;
	$scope.sliderDefaultValueField = 50;

	$scope.textFieldRequiredField = false;
	$scope.textFieldPlaceholderField = "";
	$scope.textFieldMaxLengthField = 180;
	$scope.textFieldSizeField = 30;
	$scope.textFieldQuestionDescriptionField = "";
	$scope.textFieldDefaultValueField = "";

	$scope.saveAnItemToADataList = function() {
		// console.log("hereeee");
		var newOption = {};
		newOption['displayWord'] = $scope.dataListListDisplayWord;
		newOption['theValue'] = $scope.dataListListValue;
		$scope.dataListWord.options.push(newOption);
	};

	$scope.removeDataListItem = function(array, index) {
		array.splice(index, 1);
	};

	$scope.saveAnItemToARadioButtonList = function() {
		var newOption = {};
		newOption['displayWord'] = $scope.radioButtonListDisplayWord;
		newOption['theValue'] = $scope.radioButtonListValue;
		$scope.radioButtonListWord.options.push(newOption);
	};

	$scope.removeRadioButtonItem = function(array, index) {
		array.splice(index, 1);
	};

	$scope.saveAnItemToACheckBoxList = function() {
		var newOption = {};
		newOption['displayWord'] = $scope.checkBoxListDisplayWord;
		newOption['theValue'] = $scope.checkBoxListValue;
		$scope.checkBoxListWord.options.push(newOption);
	};

	$scope.removeCheckBoxItem = function(array, index) {
		array.splice(index, 1);
	};

	$scope.saveAnItemToADropDownList = function() {
		// console.log('test'+$scope.dropDownListDisplayWord+' '+$scope.dropDownListValue);
		var newOption = {};
		newOption['displayWord'] = $scope.dropDownListDisplayWord;
		newOption['theValue'] = $scope.dropDownListValue;
		$scope.dropDownListWord.options.push(newOption);
	};

	$scope.removeDropDownItem = function(array, index) {
		array.splice(index, 1);
	};

	$scope.changeTextAreaWrapProperty = function() {
		if ($scope.textAreaWrapHardProperty){
			$scope.textAreaWrapProperty = "hard";
		} else {
			$scope.textAreaWrapProperty = "soft"
		}
		// console.log("thing: "+$scope.textAreaWrapHardProperty);
	};

	$scope.saveADropDownList = function() {
		if (($scope.surveyId != undefined) && ($scope.dropDownQuestionNameField != undefined) && ( $scope.dropDownQuestionTitleField != undefined) && ( $scope.dropDownQuestionDescriptionField != undefined) && ( $scope.dropDownQuestionRequiredField != undefined) && ( $scope.dropDownListWord.options != undefined)){
    		$http({
    			method: 'POST',
    			url: '/addNewDropDownList',
    			data: {
    				surveyId: $scope.surveyId,  
    				questionName: $scope.dropDownQuestionNameField, 
    				questionTitle: $scope.dropDownQuestionTitleField,
    				questionDescription: $scope.dropDownQuestionDescriptionField,
    				questionRequired: $scope.dropDownQuestionRequiredField,
    				theOptions: $scope.dropDownListWord.options,
    				questionNumber: $scope.questionNumber
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new drow down list saved");
    				$scope.questionNumber++;
    				notificationBarService.showNotificationBar('Success', 'Drop Down List \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Drop Down List could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		// console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.dropDownQuestionNameField+
    		// 	", questionTitle: "+$scope.dropDownQuestionTitleField+", questionDescription: "+$scope.dropDownQuestionDescriptionField+
    		// 	", quesitonRequired: "+$scope.dropDownQuestionRequiredField+", options: "+JSON.stringify($scope.dropDownListWord.options));
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    	}
	};

	$scope.saveATextArea = function() {
		if (($scope.surveyId != undefined) && ($scope.textAreaQuestionNameField != undefined) && ( $scope.textAreaQuestionTitleField != undefined) && ( $scope.textAreaQuestionDescriptionField != undefined) && ( $scope.textAreaRequiredField != undefined) && ( $scope.textAreaRowsField != undefined) && ( $scope.textAreaColsField != undefined) && ( $scope.textAreaPlaceholderField != undefined) && ( $scope.textAreaWrapHardProperty != undefined) && ( $scope.textAreaMaxLengthProperty != undefined)) {
    		$http({
    			method: 'POST',
    			url: '/addNewTextArea',
    			data: {
    				surveyId: $scope.surveyId,  
    				questionName: $scope.textAreaQuestionNameField, 
    				questionTitle: $scope.textAreaQuestionTitleField,
    				questionDescription: $scope.textAreaQuestionDescriptionField,
    				questionRequired: $scope.textAreaRequiredField,
    				rows: $scope.textAreaRowsField,
    				cols:  $scope.textAreaColsField,
    				placeholder:  $scope.textAreaPlaceholderField,
    				textWrap:  $scope.textAreaWrapProperty,
    				maxLength:  $scope.textAreaMaxLengthProperty,
    				questionNumber: $scope.questionNumber
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new text area saved");
    				$scope.questionNumber++;
    				notificationBarService.showNotificationBar('Success', 'Text Area \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Text Area could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		// console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.textAreaQuestionNameField+
    		// 	", questionTitle: "+$scope.textAreaQuestionTitleField+", questionDescription: "+$scope.textAreaQuestionDescriptionField+
    		// 	", quesitonRequired: "+$scope.textAreaRequiredField+", rows: "+$scope.textAreaRowsField+", cols: "+$scope.textAreaColsField+
    		// 	", placeholder: "+$scope.textAreaPlaceholderField+", textWrap: "+$scope.textAreaWrapProperty+", maxLength: "+$scope.textAreaMaxLengthProperty);
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    	}
	};

	$scope.saveACheckBoxList = function() {
		if (($scope.surveyId != undefined) && ($scope.checkBoxListQuestionNameField != undefined) && ($scope.checkBoxListQuestionTitleField != undefined) && ($scope.checkBoxListQuestionDescriptionField != undefined) && ($scope.checkBoxListQuestionRequiredField != undefined) && ($scope.checkBoxListGroupNameField != undefined) && ($scope.checkBoxListWord.options != undefined)) {
			$http({
    			method: 'POST',
    			url: '/addNewCheckBoxList',
    			data: {
    				surveyId: $scope.surveyId,  
    				questionName: $scope.checkBoxListQuestionNameField, 
    				questionTitle: $scope.checkBoxListQuestionTitleField,
    				questionDescription: $scope.checkBoxListQuestionDescriptionField,
    				questionRequired: $scope.checkBoxListQuestionRequiredField,
    				groupName: $scope.checkBoxListGroupNameField,
    				theOptions:  $scope.checkBoxListWord.options,
    				questionNumber: $scope.questionNumber
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new check box list saved");
    				$scope.questionNumber++;
    				notificationBarService.showNotificationBar('Success', 'Check Box List \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Check Box List could not be created! ');
    		});
    	} else { //console.log("something was invalid");
    		// console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.checkBoxListQuestionNameField+
    		// 	", questionTitle: "+$scope.checkBoxListQuestionTitleField+", questionDescription: "+$scope.checkBoxListQuestionDescriptionField+
    		// 	", quesitonRequired: "+$scope.checkBoxListQuestionRequiredField+", groupName: "+$scope.checkBoxListGroupNameField+", options: "+JSON.stringify($scope.checkBoxListWord.options));
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    	}
	};

	$scope.	saveARadioButtonList = function() {
		if (($scope.surveyId != undefined) && ($scope.radioButtonListQuestionNameField != undefined) && ($scope.radioButtonListQuestionTitleField != undefined) && ($scope.radioButtonListQuestionDescriptionField != undefined) && ($scope.radioButtonListQuestionRequiredField != undefined) && ($scope.radioButtonListGroupNameField != undefined) && ($scope.radioButtonListWord.options != undefined)) {
			$http({
    			method: 'POST',
    			url: '/addNewRadioButtonList',
    			data: {
    				surveyId: $scope.surveyId,  
    				questionName: $scope.radioButtonListQuestionNameField, 
    				questionTitle: $scope.radioButtonListQuestionTitleField,
    				questionDescription: $scope.radioButtonListQuestionDescriptionField,
    				questionRequired: $scope.radioButtonListQuestionRequiredField,
    				groupName: $scope.radioButtonListGroupNameField,
    				theOptions:  $scope.radioButtonListWord.options,
    				questionNumber: $scope.questionNumber
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new radio button list saved");
    				$scope.questionNumber++;
    				// console.log(JSON.stringify(data));
    				notificationBarService.showNotificationBar('Success', 'Radio Button List \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Radio Button List could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		// console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.radioButtonListQuestionNameField+
    		// 	", questionTitle: "+$scope.radioButtonListQuestionTitleField+", questionDescription: "+$scope.radioButtonListQuestionDescriptionField+
    		// 	", quesitonRequired: "+$scope.radioButtonListQuestionRequiredField+", groupName: "+$scope.radioButtonListGroupNameField+", options: "+JSON.stringify($scope.radioButtonListWord.options));
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    	}
	};

	$scope.saveADataList = function() {
		if (($scope.surveyId != undefined) && ($scope.dataListQuestionNameField != undefined) && ( $scope.dataListQuestionTitleField != undefined) 
			&& ( $scope.dataListQuestionDescriptionField != undefined) && ( $scope.dataListQuestionRequiredField != undefined) 
			&& ( $scope.dataListWord.options != undefined)){
    		$http({
    			method: 'POST',
    			url: '/addNewDataList',
    			data: {
    				surveyId: $scope.surveyId,  
    				questionName: $scope.dataListQuestionNameField, 
    				questionTitle: $scope.dataListQuestionTitleField,
    				questionDescription: $scope.dataListQuestionDescriptionField,
    				questionRequired: $scope.dataListQuestionRequiredField,
    				theOptions: $scope.dataListWord.options,
    				questionNumber: $scope.questionNumber
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new drow down list saved");
    				$scope.questionNumber++;
    				notificationBarService.showNotificationBar('Success', 'Searchable Drop Down List \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Searchable Drop Down List could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		// console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.dataListQuestionNameField+
    		// 	", questionTitle: "+$scope.dataListQuestionTitleField+", questionDescription: "+$scope.dataListQuestionDescriptionField+
    		// 	", quesitonRequired: "+$scope.dataListQuestionRequiredField+", options: "+JSON.stringify($scope.dataListWord.options));
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    	}
	};

	$scope.saveATextField = function() {
		if (($scope.surveyId != undefined) && ($scope.textFieldQuestionNameField != undefined) && ( $scope.textFieldQuestionTitleField != undefined) && ( $scope.textFieldQuestionDescriptionField != undefined) && ( $scope.textFieldRequiredField != undefined) && ( $scope.textFieldSizeField != undefined) && ( $scope.textFieldMaxLengthField != undefined) && ( $scope.textFieldPlaceholderField != undefined) && ( $scope.textFieldDefaultValueField != undefined)) {
    		$http({
    			method: 'POST',
    			url: '/addNewTextField',
    			data: {
    				surveyId: $scope.surveyId,  
    				questionName: $scope.textFieldQuestionNameField, 
    				questionTitle: $scope.textFieldQuestionTitleField,
    				questionDescription: $scope.textFieldQuestionDescriptionField,
    				questionRequired: $scope.textFieldRequiredField,
    				theSize: $scope.textFieldSizeField,
    				theMaxLength:  $scope.textFieldMaxLengthField,
    				placeholder:  $scope.textFieldPlaceholderField,
    				theDefaultValue:  $scope.textFieldDefaultValueField,
    				questionNumber: $scope.questionNumber
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new text area saved");
    				$scope.questionNumber++;
    				notificationBarService.showNotificationBar('Success', 'Text Field \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Text Field could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		// console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.textFieldQuestionNameField+
    		// 	", questionTitle: "+$scope.textFieldQuestionTitleField+", questionDescription: "+$scope.textFieldQuestionDescriptionField+
    		// 	", quesitonRequired: "+$scope.textFieldRequiredField+", size: "+$scope.textFieldSizeField+", maxLength: "+$scope.textFieldMaxLengthField+
    		// 	", placeholder: "+$scope.textFieldPlaceholderField+", defaultValue: "+$scope.textFieldDefaultValueField);
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    	}
	};

	$scope.saveASliderForm = function() {
		if (($scope.surveyId != undefined) && ($scope.sliderQuestionNameField != undefined) && ( $scope.sliderQuestionTitleField != undefined) && ( $scope.sliderQuestionDescriptionField != undefined) && ( $scope.sliderRequiredField != undefined) && ( $scope.sliderMinRangeField != undefined) && ( $scope.sliderStepAmountField != undefined) && ( $scope.sliderUnitsField != undefined) && ( $scope.sliderDefaultValueField != undefined)) {
    		$http({
    			method: 'POST',
    			url: '/addNewSliderField',
    			data: {
    				surveyId: $scope.surveyId,  
    				questionName: $scope.sliderQuestionNameField, 
    				questionTitle: $scope.sliderQuestionTitleField,
    				questionDescription: $scope.sliderQuestionDescriptionField,
    				questionRequired: $scope.sliderRequiredField,
    				minRange: $scope.sliderMinRangeField,
    				maxRange: $scope.sliderMaxRangeField,
    				stepAmount: $scope.sliderStepAmountField,
    				theUnits:  $scope.sliderUnitsField,
    				theDefaultValue:  $scope.sliderDefaultValueField,
    				questionNumber: $scope.questionNumber
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new text area saved");
    				$scope.questionNumber++;
    				notificationBarService.showNotificationBar('Success', 'Slider question \''+data.name+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Slider question could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		// console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.sliderQuestionNameField+
    		// 	", questionTitle: "+$scope.sliderQuestionTitleField+", questionDescription: "+$scope.sliderQuestionDescriptionField+
    		// 	", quesitonRequired: "+$scope.sliderRequiredField+", minRange: "+$scope.sliderMinRangeField+", maxRange: "+$scope.sliderMaxRangeField+
    		// 	", stepAmount: "+$scope.sliderStepAmountField+", theUnits: "+$scope.sliderUnitsField+", defaultValue: "+$scope.sliderDefaultValueField);
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    	}
	};

	// $scope.makeModel = function() {
	// 	return 'theSlider'+$scope.question._id;
	// };
	$scope.surveyId = 1;

	$scope.createANewSurvey = function() {
		if (($scope.newSurveyTitle != undefined) && ($scope.newSurveyDescription != undefined)) {
    		$http({
    			method: 'POST',
    			url: '/addNewSurvey',
    			data: {
    				surveyTitle: $scope.newSurveyTitle,  
    				surveyDescription: $scope.newSurveyDescription
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new survey saved");
    				$scope.aSurveyWasMade = true;
    				$scope.theParentSurvey = data;
    				$scope.surveyId = data._id;
    				// console.log("test if the new survey id is correct: "+$scope.surveyId);
    				// console.log("the survey data: "+JSON.stringify(data));
    				notificationBarService.showNotificationBar('Success', 'Survey \''+data.surveyName+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Survey could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    		// console.log("surveyTitle: "+$scope.newSurveyTitle+", surveyDescription: "+$scope.newSurveyDescription);
    	}
	};

	$scope.beerId = 1;


	$scope.createNewBeerForASurvey = function() {
		if (($scope.surveyId != undefined) && ($scope.newBeerTitle != undefined) && ($scope.newBeerBatch != undefined)) {
    		$http({
    			method: 'POST',
    			url: '/addNewBeerAndAssignToASurvey',
    			data: {
    				parentSurveyId: $scope.surveyId,
    				beerTitle: $scope.newBeerTitle,  
    				batchInfo: $scope.newBeerBatch
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new beer saved");
    				//console.log(JSON.stringify(data));
    				$scope.beerWasMade = true;
    				$scope.theParentBeer = data;
    				$scope.beerId = data._id;
    				// console.log("the beer data: "+JSON.stringify(data));
    				notificationBarService.showNotificationBar('Success', 'Beer-Batch \''+data.surveyName+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Beer-Batch could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    		// console.log("surveyId: "+$scope.surveyId+"surveyTitle: "+$scope.newBeerTitle+", surveyDescription: "+$scope.newBeerBatch);
    	}
	};

	$scope.addDetailToBeer = function() {
		if (($scope.beerId != undefined) && ($scope.newBeerDetailProperty != undefined) && ($scope.newBeerDetailDescription != undefined)) {
    		$http({
    			method: 'POST',
    			url: '/addDetailsToABeer',
    			data: {
    				beerId: 			$scope.beerId,
    				detailProperty: 	$scope.newBeerDetailProperty,  
    				detailDescription: 	$scope.newBeerDetailDescription
    			},
    		}).success(function(data, status, headers, config){
    			if(status===200){
    				// console.log("new beer saved");
    				// console.log(JSON.stringify(data));
    				$scope.detailWasAdded = true;
    				$scope.theNewDetail = data;
    				notificationBarService.showNotificationBar('Success', 'Detail \''+data.detailProperty+'\' was created successfully!');
    			}
    		}).error(function(data, status, headers, config){
    			notificationBarService.showNotificationBar('Error', 'Detail could not be created! ');
    		});
    	} else { // console.log("something was invalid");
    		notificationBarService.showNotificationBar('Warning', 'Please Fill In All Required Fields');
    		// console.log("beerId: "+$scope.beerId+"beerProperty: "+$scope.newBeerDetailProperty+", beerDescription: "+$scope.newBeerDetailDescription);
    	}
	}

	$scope.refreshData= function(){
		$http.get('/getListOfQuestions').success(function(data) 
		{ 
			$scope.theSurveyQuestions = data; 
			//$http.get('/getListOfSurveys')
		});
	};








}]);


dashboardApp.controller('pageNavigationController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

	$scope.currentPage = 'Homepage';

	// $scope.pageStructure = [
	// {
	// 	mainPage: {
	// 		name = 'Homepage'
	// 	}
	// }, {
	// 	mainPage: {
	// 		name = 'Survey'
	// 	},
	// 	subpages = [{
	// 		name = 'SurveyDashboard'
	// 	},{
	// 		name = 'CreateSurveyPage'
	// 	},{
	// 		name = 'ViewSurveyListPage'
	// 	},{
	// 		name = 'ViewSurveyPage'
	// 	}]
	// }, {
	// 	mainPage: {
	// 		name = 'Statistics'
	// 	},
	// 	subpages = [{
	// 		name = 'StatisticsDashboard'
	// 	}]
	// }]

	$scope.currentPageCheck = function(pageInQuestion) {
		//console.log("check: "+pageInQuestion+" : "+(pageInQuestion === $scope.currentPage));
		// return (pageInQuestion === $scope.currentPage);
		if(pageInQuestion === $scope.currentPage) return true
			else return false
	};

	$scope.changePageTo = function(newPage) {
		$scope.currentPage = newPage;
	};




}]);




























/////