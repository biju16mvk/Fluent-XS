'use strict';

angular.module('fluentxsAngularApp')
  .filter('home', function () {
    return function (input) {
      return 'home filter: ' + input;
    };
  });
