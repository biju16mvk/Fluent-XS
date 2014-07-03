/*global angular, sessionStorage, jQuery, API_BASE*/
(function() {
    "use strict";
    /** Directive for checking Password Match in User Registration Page**/
    var app = angular.module('fluentxsAngularApp');

    app.directive('pwCheck', [
        function() {
            return {
                require: 'ngModel',
                link: function(scope, elem, attrs, ctrl) {
                    var firstPassword = '#' + attrs.pwCheck;
                    elem.add(firstPassword).on('keyup', function() {
                        scope.$apply(function() {
                            ctrl.$setValidity('pwmatch', elem.val() === jQuery(firstPassword).val());
                        });
                    });
                }
            };
        }
    ]);

    /** Directive for checking username availability**/
    app.directive('uniqueEmail', ["Users",
        function(Users) {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function(scope, elem, attrs, ctrl) {

                    /*We need to check that the value is different to the original*/

                    /*using push() here to run it as the last parser, after we are sure that other validators were run*/
                    ctrl.$parsers.push(function(viewValue) {
                        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        if (filter.test(viewValue)) {
                            var users = Users.getDetails(viewValue);
                            if (users.results !== null) {
                                ctrl.$setValidity('uniqueEmail', false);
                            } else {
                                ctrl.$setValidity('uniqueEmail', true);
                            }
                            return viewValue;
                        }
                    });
                }
            };
        }
    ]);
    app.directive('checkUserid', ["Users",
        function(Users) {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function(scope, elem, attrs, ctrl) {

                    /*We need to check that the value is different to the original*/

                    /*using push() here to run it as the last parser, after we are sure that other validators were run*/
                    ctrl.$parsers.push(function(viewValue) {
                        if (viewValue) {
                            var users = Users.getDetails(viewValue);
                            if (users.results !== null) {
                                ctrl.$setValidity('checkUserid', true);
                            } else {
                                ctrl.$setValidity('checkUserid', false);
                            }
                            return viewValue;
                        }
                    });
                }
            };
        }
    ]);
    app.directive('checkMenu', ["$document",
        function($document) {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'app/views/menu.html',
            };
        }
    ]);
    app.directive('breadCrumbs', ["$document",
        function($document) {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'app/views/breadcrumbs.html',
            };
        }
    ]);
    app.directive('sidebarNotification', function () {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: 'app/views/sidebarnotification.html',
        }
    });
    app.directive('headerTemplate', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/views/headertemplate.html',
        }
    });
    app.directive('adminHome', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/views/admin_home.html',
        }
    });
    app.directive('userHome', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/views/user_home.html',
        }
    });
    app.directive('formAutofillFix', function() {
        return function(scope, elem, attrs) {
            // Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
            elem.prop('method', 'POST');

            // Fix autofill issues where Angular doesn't know about autofilled inputs
            if(attrs.ngSubmit) {
                setTimeout(function() {
                    elem.unbind('submit').submit(function(e) {
                        e.preventDefault();
                        elem.find('input, textarea, select').trigger('input').trigger('change').trigger('keydown');
                        scope.$apply(attrs.ngSubmit);
                    });
                }, 0);
            }
        };
    });
    app.directive('autoFillSync', function($timeout) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                var origVal = elem.val();
                $timeout(function () {
                    var newVal = elem.val();
                    if(ngModel.$pristine) {
                        ngModel.$setViewValue(newVal);
                    }
                }, 500);
            }
        };
    });
}());