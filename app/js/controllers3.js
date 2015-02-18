'use strict';

var beerApp = angular.module('beerApp', ['ngGrid'] );

beerApp.factory('myService', function($http) {
	var myService = {
		async: function() {
			var promise = $http.post('/addNewSurvey', {surveyTitle: '$scope.newSurveyTitle', surveyDescription: '$scope.newSurveyDescription'}).then(function (response){
				console.log(response);
				return response.data;
			});

			return promise;
			// success(function(data, status, headers, config) {

			// }).error(function(data, status, headers, config) {

			// });
		}
	};
	return myService;
});

// method: 'POST',
//     			url: '/addNewSurvey',
//     			data: {
//     				surveyTitle: $scope.newSurveyTitle,  
//     				surveyDescription: $scope.newSurveyDescription

beerApp.controller('beerController', [ 'myService','$scope', '$http', function(myService, $scope, $http) {
	$scope.surveyId = 1;
	$scope.theParentSurvey = {};
	$scope.aSurveyWasMade = false;
	$scope.aSurveyWasMade2 = false;
	$scope.beerWasMade = false;
	$scope.beerId = "54badb4ccd44ff295fea7803";
	$scope.theParentBeer = {};
	$scope.theNewDetail = {}
	$scope.detailWasAdded = false;
	$scope.questionNumber = 0;
	$scope.questionValueArray = {};

	$http.get('/getListOfQuestions').success(function(data) { $scope.theSurveyQuestions = data; });


	$scope.mainTitle = 'The Exbeeriment';
	$scope.test2 = window.location.pathname; //document.URL; //window.location.pathname
	$http.get('getDataTest'+$scope.test2).success(function(data) { $scope.users = data; });
	console.log($scope.users);
	$scope.dropDownListForm = false; $scope.textAreaForm = false; $scope.checkboxForm = false; 
	$scope.radioButtonForm = false; $scope.dataListForm = false; $scope.textFieldForm = false;
	$scope.sliderForm = false;

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

	// $scope.createANewSurvey = function() {
	// 	myService.async().then(function(d){
	// 		$scope.theParentSurvey = d;
	// 		$scope.aSurveyWasMade = true;
	// 		$scope.theTestData = 4;
	// 	});
	// };


	$scope.updateSlider = function(item) {
		//console.log($scope.sliderValueField);
		console.log("the value: "+item);
	};

	$scope.stepUpSlider = function() {
		$scope.theSlider = $scope.theSlider + $scope.sliderStepAmountField;
	};

	$scope.stepDownSlider = function() {
		$scope.theSlider = $scope.theSlider - $scope.sliderStepAmountField;
	};

	$scope.saveAnItemToADataList = function() {
		console.log("hereeee");
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
		console.log('test'+$scope.dropDownListDisplayWord+' '+$scope.dropDownListValue);
		var newOption = {};
		newOption['displayWord'] = $scope.dropDownListDisplayWord;
		newOption['theValue'] = $scope.dropDownListValue;
		// $scope.dropDownListWord.options.push({
		// 	'displayWord' : $scope.dropDownListDisplayWord,
		// 	'value' : $scope.dropDownListValue
		// });
		$scope.dropDownListWord.options.push(newOption);
		// $scope.dropDownListWord = '';
		// $scope.dropDownListValue = '';
	};

	$scope.removeDropDownItem = function(array, index) {
		array.splice(index, 1);
	};

	$scope.testFunction2 = function() {
		console.log("the test: "+$scope.textAreaRequiredField);
	};

	$scope.changeTextAreaWrapProperty = function() {
		if ($scope.textAreaWrapHardProperty){
			$scope.textAreaWrapProperty = "hard";
		} else {
			$scope.textAreaWrapProperty = "soft"
		}
		console.log("thing: "+$scope.textAreaWrapHardProperty);
	};

	$scope.testFunction = function(thing) {
		console.log("it works! "+$scope.questionModel);
		$scope.dropDownListForm = false;
		$scope.textAreaForm = false;
		$scope.checkboxForm = false;
		$scope.radioButtonForm = false;
		$scope.dataListForm = false;
		$scope.textFieldForm = false;
		$scope.sliderForm = false;
		switch ($scope.questionModel) {
			case "Drop Down List" :
				console.log("Drop Down List option selected");
				$scope.dropDownListForm = true;
				break
			case "Text Area" :
				console.log("text area option selected");
				$scope.textAreaForm = true;
				break
			case "Check Box List" :
				console.log("Check Box List option selected");
				$scope.checkboxForm = true;
				break
			case "Radio Button List" :
				console.log("Radio Button List option selected");
				$scope.radioButtonForm = true;
				break
			case "Searchable Drop Down List" :
				console.log("Searchable Drop Down List option selected");
				$scope.dataListForm = true;
				break
			case "Text Field" :
				console.log("Text Field option selected");
				$scope.textFieldForm = true;
				break
			case "Slide Bar (numbers only)" :
				console.log("Slide Bar (numbers only) option selected");
				$scope.sliderForm = true;
				break
			default:
				console.log("it didn't work");
		}
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
    				console.log("new drow down list saved");
    				$scope.questionNumber++;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.dropDownQuestionNameField+
    			", questionTitle: "+$scope.dropDownQuestionTitleField+", questionDescription: "+$scope.dropDownQuestionDescriptionField+
    			", quesitonRequired: "+$scope.dropDownQuestionRequiredField+", options: "+JSON.stringify($scope.dropDownListWord.options));
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
    				console.log("new text area saved");
    				$scope.questionNumber++;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.textAreaQuestionNameField+
    			", questionTitle: "+$scope.textAreaQuestionTitleField+", questionDescription: "+$scope.textAreaQuestionDescriptionField+
    			", quesitonRequired: "+$scope.textAreaRequiredField+", rows: "+$scope.textAreaRowsField+", cols: "+$scope.textAreaColsField+
    			", placeholder: "+$scope.textAreaPlaceholderField+", textWrap: "+$scope.textAreaWrapProperty+", maxLength: "+$scope.textAreaMaxLengthProperty);
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
    				console.log("new check box list saved");
    				$scope.questionNumber++;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.checkBoxListQuestionNameField+
    			", questionTitle: "+$scope.checkBoxListQuestionTitleField+", questionDescription: "+$scope.checkBoxListQuestionDescriptionField+
    			", quesitonRequired: "+$scope.checkBoxListQuestionRequiredField+", groupName: "+$scope.checkBoxListGroupNameField+", options: "+JSON.stringify($scope.checkBoxListWord.options));
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
    				console.log("new radio button list saved");
    				$scope.questionNumber++;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.radioButtonListQuestionNameField+
    			", questionTitle: "+$scope.radioButtonListQuestionTitleField+", questionDescription: "+$scope.radioButtonListQuestionDescriptionField+
    			", quesitonRequired: "+$scope.radioButtonListQuestionRequiredField+", groupName: "+$scope.radioButtonListGroupNameField+", options: "+JSON.stringify($scope.radioButtonListWord.options));
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
    				console.log("new drow down list saved");
    				$scope.questionNumber++;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.dataListQuestionNameField+
    			", questionTitle: "+$scope.dataListQuestionTitleField+", questionDescription: "+$scope.dataListQuestionDescriptionField+
    			", quesitonRequired: "+$scope.dataListQuestionRequiredField+", options: "+JSON.stringify($scope.dataListWord.options));
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
    				console.log("new text area saved");
    				$scope.questionNumber++;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.textFieldQuestionNameField+
    			", questionTitle: "+$scope.textFieldQuestionTitleField+", questionDescription: "+$scope.textFieldQuestionDescriptionField+
    			", quesitonRequired: "+$scope.textFieldRequiredField+", size: "+$scope.textFieldSizeField+", maxLength: "+$scope.textFieldMaxLengthField+
    			", placeholder: "+$scope.textFieldPlaceholderField+", defaultValue: "+$scope.textFieldDefaultValueField);
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
    				console.log("new text area saved");
    				$scope.questionNumber++;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+", questionName: "+$scope.sliderQuestionNameField+
    			", questionTitle: "+$scope.sliderQuestionTitleField+", questionDescription: "+$scope.sliderQuestionDescriptionField+
    			", quesitonRequired: "+$scope.sliderRequiredField+", minRange: "+$scope.sliderMinRangeField+", maxRange: "+$scope.sliderMaxRangeField+
    			", stepAmount: "+$scope.sliderStepAmountField+", theUnits: "+$scope.sliderUnitsField+", defaultValue: "+$scope.sliderDefaultValueField);
    	}
	};

	$scope.makeModel = function() {
		return 'theSlider'+$scope.question._id;
	};

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
    				console.log("new survey saved");
    				$scope.aSurveyWasMade = true;
    				$scope.theParentSurvey = data;
    				$scope.surveyId = data._id;
    				console.log("test if the new survey id is correct: "+$scope.surveyId);
    				console.log("the survey data: "+JSON.stringify(data));
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyTitle: "+$scope.newSurveyTitle+", surveyDescription: "+$scope.newSurveyDescription);
    	}
	};

	// $scope.useDefaultSurvey = function() {
	// 	$scope.aSurveyWasMade = true;
	// 	//$scope.theParentSurvey['_id'] = '54bad55c8b0d60f55e96fa10';
	// 	$scope.surveyId = '54bad55c8b0d60f55e96fa10';
	// 	console.log("surveyId: "+$scope.surveyId);
	// };

	// $scope.useDefaultBeer = function() {
	// 	$scope.beerWasMade = true;
	// 	$scope.beerId = "54badb4ccd44ff295fea7803";
	// };

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
    				console.log("new beer saved");
    				//console.log(JSON.stringify(data));
    				$scope.beerWasMade = true;
    				$scope.theParentBeer = data;
    				$scope.beerId = data._id;
    				console.log("the beer data: "+JSON.stringify(data));
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("surveyId: "+$scope.surveyId+"surveyTitle: "+$scope.newBeerTitle+", surveyDescription: "+$scope.newBeerBatch);
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
    				console.log("new beer saved");
    				console.log(JSON.stringify(data));
    				$scope.detailWasAdded = true;
    				$scope.theNewDetail = data;
    			}
    		});
    	} else { console.log("something was invalid");
    		console.log("beerId: "+$scope.beerId+"beerProperty: "+$scope.newBeerDetailProperty+", beerDescription: "+$scope.newBeerDetailDescription);
    	}
	}

	$scope.refreshData= function(){
		$http.get('/getListOfQuestions').success(function(data) 
		{ 
			$scope.theSurveyQuestions = data; 
			//$http.get('/getListOfSurveys')
		});
	};

	// newBeerTitle
	// newBeerBatch

	// newBeerDetailProperty
	// newBeerDetailDescription

	$scope.wasASurveyWasMadeYet = function() {
		if($scope.aSurveyWasMade) {
			console.log("funtion says true");
			return true;
		} else { 
			console.log("function says false");
			return false;
		}
	};

}]);


 // $scope.refreshData = function() {
	//     	$http.get('getListOfUsers').success(function(data) {
	// 	      	$scope.users = data; $http.get('getListOfGroups').success(function(data) {
	// 		    $scope.groups = data; $http.get('getListOfPermissions').success(function(data) {
	// 			$scope.permissions = data; $http.get('getListOfPermissionsGroupJoins').success(function(data) {
	// 	    	$scope.privGroupJoin = data; $http.get('getListOfUserPrivJoins').success(function(data) {
	// 			$scope.userPrivJoin = data; $http.get('getListOfUserGroupJoins').success(function(data) {
	// 			$scope.userGroupJoin = data; $scope.selectPermissionsForTheSelectedUser(); $scope.selectAppropriateGroups();
	// 			}); }); }); }); });
	// 	    });
	//     };


	// if (row.entity.selected){
	//     				$http({
	// 				  		method: 'POST',
	// 				  		url: '/removePermissionGroupJoinById',
	// 				  		data: { permissionId :  $scope.selectedItemId, groupId : row.entity._id }
	// 				  	}).success(function(data, status, headers, config) {
	// 						if(status===200) {
	// 							// $scope.showUpdatingNotification = false;
	// 							// $scope.showUpdatedNotification = true;
	// 							// setTimeout(function(){ 
	// 							// 	$scope.showUpdatedNotification = false; 
	// 							// }, 1000);
	// 						} else { 
	// 							console.log("error"); 
	// 						}
	// 					});
	//     			} else {






























var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
	$scope.mainTitle = 'The Exbeeriment';
});


 var app = angular.module('beerAppp', ['ngGrid']);

var test3Controllers = angular.module('test3Controllers', ['ngGrid']);

test3Controllers.controller('test3Controller1', ['$scope', 'useService',
	function($scope, useService) {
		$scope.theLastName = useService.change();//lastName;
		// fromoutside.then(function(obj){
		// 	$scope.theLastName = obj;
		// });
		$scope.theName = 'Lewis Matthew '+$scope.theLastName;
	}]);

app.run(function($rootScope) {
	$rootScope.name = "Ari Lerner";
});

app.controller('MyController', function($scope) {
	$scope.person = { name: "Ari Lerner" };
	$scope.updateClock = function(){
		$scope.clock = new Date();
	};

	$scope.timer = setInterval(function() {
		$scope.$apply(updateClock);
	}, 1000);
	updateClock();
});

app.controller('MenuController', function($scope) {
	$scope.mainMenuTitle = { 
		schoolTitle: 'West Chester University Of Pennsylvania',
		fraternityTitle: 'Sigma Alpha Epsilon' };
	$scope.mainMenuItems = [
		{ name: 'About', id: 'NavAbout', orderNum: '1' }, 
		{ name: 'Events', id: 'NavEvents', orderNum: '2' }, 
		{ name: 'News', id: 'NavNews', orderNum: '3' }, 
		{ name: 'Rush', id: 'NavRush', orderNum: '4' }, 
		{ name: 'Contact', id: 'NavContact', orderNum: '5' }
	];
	$scope.orderMainMenu = 'orderNum';
	$scope.mainMenuSignInItems = {
		signIn: { name: 'Sign In', onClicked: 'loginShowHide()'},
		zforgotPass: { name: 'Forgot Password', onClicked: 'loginShowHide()'}
	};
	$scope.loggedInMenuItems = {
		dashboard: 'Dashboard', stories: 'Stories', 
		events: 'Events', site: 'Website', 
		notifications: 'Notifications'
	};
	$scope.stuff = function(){
		console.log("blahblahblah");
	};
	$scope.NavBarRollon = function(Element){
		console.log(Element);
		Element.style.color = "#CFB53B";
	};
	$scope.NavBarRolloff = function(Element){
		Element.style.color = "#7a7a8a";
	};
	$scope.showLoginArea = true;
	$scope.hideLoginArea = false;

	$scope.showHideLoginArea = function() {
		console.log("jjjj");
		if (hideLoginArea) {
			$scope.showLoginArea = true;
			$scope.hideLoginArea = false;
		} else {
			$scope.showLoginArea = false;
			$scope.hideLoginArea = true;
		}	
	}
});


app.directive('NavBarRollOver', function(){
	return function(scope, element) {
		element.bind('change', function() {
			alert('change on '+element);
		});
	};
});

app.controller('DemoController', function($scope) {
	$scope.counter = 0;
	$scope.add = function(amount) { $scope.counter += amount; };
	$scope.subtract = function(amount) { $scope.counter -= amount; };
});

app.controller('SiteManager', function($scope) {
	$scope.dashboard = {
		mainTitle : 'Website Manager'
	};
	$scope.subMenuItems = {
		frontPage 	: 'Front Page Manager',
		aboutPage 	: '"About" Pages Manager',
		eventsPage	: '"Events" Pages Manager',
		newsPage	: '"News" Pages Manager',
		rushPage	: '"Rush" Pages Manager'
	}
	$scope.frontPageManager = {
		mainTitle : 'Manage the Front Page'
	}
	$scope.aboutPages = {
		mainTitle : 'About Pages Manager;'
	}
});

app.controller('StoriesController', function($scope, $http) {
	$http({
		method: 'GET',
		url: '/getSotriesJSON.js'
	}).success(function(data, status) {
		//console.log("success: "+JSON.stringify(data));
		//console.log("length: "+data.length);
		$scope.stories = data;
	}).error(function(data, status) {
		console.log(status+" error occured " +data);
	});
});