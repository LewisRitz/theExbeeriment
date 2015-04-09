'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  // beforeEach(function() {
  //   browser.get('app/index.html');
  // });
});

describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it('should have those 3 elements', function() {
  	browser.get('http://localhost:3000/');

  	var someList = element.all(by.repeater('object in someValueToTest'));
  	expect(someList.count()).toBe(3);
  })
});
