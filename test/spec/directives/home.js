'use strict';

describe('Directive: home', function () {
  beforeEach(module('fluentxsAngularApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<home></home>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('');
  }));
});
