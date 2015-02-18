'use strict';

/* App Module */

var test3App = angular.module('test3App', ['ngRoute', 'test3Controllers']);

test3App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/someBeerNumber123', {
        templateUrl: '/someBeerNumber123',
        controller: 'BeerController'
      }).
      otherwise({
        redirectTo: '/someBeerNumber123'
      });
  }]);