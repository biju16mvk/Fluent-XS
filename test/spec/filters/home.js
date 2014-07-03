'use strict';

describe('Filter: home', function () {

  // load the filter's module
  beforeEach(module('fluentxsAngularApp'));

  // initialize a new instance of the filter before each test
  var home;
  beforeEach(inject(function ($filter) {
    home = $filter('home');
  }));

  it('should return the input prefixed with "home filter:"', function () {
    var text = 'angularjs';
    expect(home(text)).toBe('home filter: ' + text);
  });

});
