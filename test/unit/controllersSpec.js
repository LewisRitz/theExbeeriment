'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  // describe('PhoneListCtrl', function(){

  //   beforeEach(module('phonecatApp'));

  //   it('should create "phones" model with 3 phones', inject(function($controller) {
  //     var scope = {},
  //         ctrl = $controller('PhoneListCtrl', {$scope:scope});

  //     expect(scope.phones.length).toBe(3);
  //   }));

  // });

	describe('homePageController', function(){
		beforeEach(module('beerApp'));

		it('should create "someValueToTest" model with 3 items', inject(function($controller) {
			var scope = {},
				ctrl = $controller('homePageController', {$scope:scope});

			expect(scope.someValueToTest.length).toBe(3);
		}));
	});
});
