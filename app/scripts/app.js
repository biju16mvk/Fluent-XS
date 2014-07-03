/*global angular, '_', localStorage, timerIncrement, ESBApi, FluentXSApi, setInterval */
(function() {
    'use strict';
    var app = angular.module('fluentxsAngularApp', ['ngResource', 'ngRoute', 'ui.multiselect']);
    app.config(function($routeProvider) {
        $routeProvider
        /*            .when('/', {
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl'
            })*/
        .when('/home/:PartyID?', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeCtrl',
            title: 'Dashboard',
            resolve: {
                checkLogin: function(AuthenticationService, $rootScope, $timeout) {
                    return AuthenticationService.isLoggedIn();
                }
            }
        })
            .when('/edit/:PartyID', {
                templateUrl: 'app/views/update_profile.html',
                controller: 'EditCtrl',
                title: 'Update Profile',
                resolve: {
                    recipient: function(SDKUrlService, TokenValidationService) {
                        //if (localStorage.access_token) {
                        //if (TokenValidationService.isValid(localStorage.getItem('access_token'))) {
                        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
                        return FluentESB.getRecipientDetails(localStorage.getItem('access_token'));
                        //}
                        //} else {
                        //var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
                        //return FluentXS.getRecipientDetails(localStorage.getItem('access_token'));
                        //}
                    },
                    livingarrangement: function(SDKUrlService, TokenValidationService) {
                        //if (localStorage.access_token) {
                        //if (TokenValidationService.isValid(localStorage.getItem('access_token'))) {
                        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
                        return FluentESB.getLivingDetails(localStorage.getItem('access_token'));
                        //}
                        //} else {
                        //var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
                        //return FluentXS.getLivingDetails(localStorage.getItem('access_token'));
                        //}
                    },
                    education: function(SDKUrlService, TokenValidationService) {
                        //if (localStorage.access_token) {
                        //if (TokenValidationService.isValid(localStorage.getItem('access_token'))) {
                        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
                        return FluentESB.getEducationDetails(localStorage.getItem('access_token'));
                        //}
                        //} else {
                        //var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
                        //return FluentXS.getEducationDetails(localStorage.getItem('access_token'));
                        //}
                    },
                    country: function(SDKUrlService, TokenValidationService) {
                        //if (localStorage.access_token) {
                        //if (TokenValidationService.isValid(localStorage.getItem('access_token'))) {
                        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
                        return FluentESB.getCountryDetails(localStorage.getItem('access_token'));
                        //}
                        //} else {
                        //var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
                        //return FluentXS.getCountryDetails(localStorage.getItem('access_token'));
                        //}
                    }
                    //data: function(SDKUrlService, TokenValidationService) {
                    //if (localStorage.access_token) {
                    //if (TokenValidationService.isValid(localStorage.getItem('access_token'))) {
                    //var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
                    //return FluentXS.getUserDetails(localStorage.getItem('edit_identification_param'));
                    //}
                    //} else {
                    //var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
                    //return FluentXS.getUserDetails(localStorage.getItem('session_id'));
                    //}
                    //}
                }
            })
            .when('/signup', {
                templateUrl: 'app/views/signup.html',
                controller: 'SignupCtrl',
                title: 'SignUp'
            })
            .when('/', {
                templateUrl: 'app/views/login.html',
                controller: 'LoginCtrl',
                title: 'Login'
            })
            .when('/forgotpassword', {
                templateUrl: 'app/views/forgotpassword.html',
                controller: 'PasswordCtrl',
                title: 'Forgot Password'
            })
            .when('/resetpassword/:Token', {
                templateUrl: 'app/views/resetpassword.html',
                controller: 'ResetPasswordCtrl',
                title: 'Reset Password'
            })
            .when('/changepassword/:PartyID', {
                templateUrl: 'app/views/changepassword.html',
                controller: 'ChangePasswordCtrl',
                title: 'Change Password'
            })
            .when('/managerecipient', {
                templateUrl: 'app/views/manage_recipient.html',
                controller: 'RecipientCtrl',
                title: 'Manage Recipient'
            })
            .when('/addrecipient', {
                templateUrl: 'app/views/editrecipient.html',
                controller: 'RecipientCtrl',
                title: 'Add Recipient',
            })
            .when('/console/nup/worklist/restapi', {
                templateUrl: 'app/views/tab.html',
                controller: 'WorklistCtrl',
                title: 'REST API'
            })
            .when('/console/nup/worklist/unit-tests', {
                templateUrl: 'app/views/unit-test.html',
                controller: 'WorklistCtrl',
                title: 'Unit Test'
            })
            .when('/console/nup/worklist/performance-tests', {
                templateUrl: 'app/views/end2end.html',
                controller: 'WorklistCtrl',
                title: 'Performance Test'
            })
            .when('/console/nup/worklist/code-coverage', {
                templateUrl: 'app/views/code-coverage.html',
                controller: 'WorklistCtrl',
                title: 'Code Coverage'
            })
            .when('/console/nup/worklist/code-analysis', {
                templateUrl: 'app/views/code-analysis.html',
                controller: 'WorklistCtrl',
                title: 'Code Analysis'
            })
            .when('/console/nup/worklist/about', {
                templateUrl: 'app/views/about.html',
                controller: 'WorklistCtrl',
                title: 'About'
            })
            .when('/console/nup/worklist/js-sdk', {
                templateUrl: 'app/views/js-sdk.html',
                controller: 'WorklistCtrl',
                title: 'JS-SDK'
            })
            .when('/console/nup/worklist/activity', {
                templateUrl: 'app/views/activity.html',
                controller: 'WorklistCtrl',
                title: 'Activity'
            })
            .when('/console/nup/worklist/analysis-report', {
                templateUrl: 'app/views/analysis-report.html',
                controller: 'WorklistAnalysisCtrl',
                title: 'Analysis Report'
            })
            .when('/console/nup/worklist/analysis-about', {
                templateUrl: 'app/views/analysis-about.html',
                controller: 'WorklistAnalysisCtrl',
                title: 'Analysis-About'
            })
            .when('/managerecipient/:id', {
                templateUrl: 'app/views/editrecipient.html',
                controller: 'RecipientEditCtrl',
                title: 'Edit Recipient'
            })
            .when('/managetenant/:id', {
                templateUrl: 'app/views/addtenant.html',
                controller: 'TenantEditCtrl',
                title: 'Edit Tenant'
            })
            .when('/serverstatus', {
                templateUrl: 'app/views/serverstatus.html',
                controller: 'ServerStatusCtrl',
                title: 'Server Status'
            })
            .when('/manageserver', {
                templateUrl: 'app/views/serverdetails.html',
                controller: 'ServerCtrl',
                title: 'Manage Server'
            })
            .when('/addserver', {
                templateUrl: 'app/views/addeditserver.html',
                controller: 'ServerCtrl',
                title: 'Add Server'
            })
            .when('/manageserver/:id', {
                templateUrl: 'app/views/addeditserver.html',
                controller: 'ServerEditCtrl',
                title: 'Edit Server'
            })
            .when('/download', {
                templateUrl: 'app/views/download.html',
                title: 'Download'
            })
            .when('/addtenant', {
                templateUrl: 'app/views/addtenant.html',
                controller: 'TenantCtrl',
                title: 'Add Tenant'
            })
            .when('/managetenant', {
                templateUrl: 'app/views/managetenant.html',
                controller: 'TenantCtrl',
                title: 'Manage Tenant'
            })
            .when('/manageusers', {
                templateUrl: 'app/views/manageusers.html',
                controller: 'UserCtrl',
                title: 'Manage User'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    app.config(function($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
    app.run(function($rootScope, $location, $timeout, AuthenticationService, AlertMessageService, FlashService, TokenValidationService) {
        $rootScope.$on('$routeChangeStart', function() {
            if (AuthenticationService.isLoggedIn()) {
                $rootScope.Authenticated = true;
                $rootScope.Identity = localStorage.getItem('identification_id');
                if (localStorage.access_token) {
                    //if (TokenValidationService.isValid(localStorage.getItem('access_token'))) {
                    $rootScope.Authenticated = true;
                    $rootScope.Identity = localStorage.getItem('identification_id');
                } else {
                    localStorage.removeItem('session_id');
                    localStorage.removeItem('identification_id');
                    localStorage.removeItem('access_token');
                    $location.path('/login').replace();
                    FlashService.show("Your session has expired..");
                }
                //}
            } else {
                $rootScope.Authenticated = false;
                localStorage.removeItem('session_id');
                localStorage.removeItem('access_token');
                localStorage.removeItem('identification_id');
            }
        });
        $rootScope.idletime = 0;
        var idleInterval = setInterval(function() {
            $rootScope.idletime = $rootScope.idletime + 1;
            var time = $rootScope.idletime;
            if (time > 30) { // 30 minutes
                $location.path('/login').replace();
                if (AuthenticationService.isLoggedIn()) {
                    $timeout(function() {
                        noty({
                            text: '<strong>' + AlertMessageService.sessionExpireText + '</strong>',
                            type: 'error',
                            timeout: 0
                        });
                    }, 0);
                }
                localStorage.removeItem('session_id');
                localStorage.removeItem('identification_id');
                localStorage.removeItem('access_token');
            }
        }, 1800000);
        $rootScope.mouseOver = function() {
            $rootScope.idletime = 0;
        };
        $rootScope.keyPress = function() {
            $rootScope.idletime = 0;
        };
    });
}());