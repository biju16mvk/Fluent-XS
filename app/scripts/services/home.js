/*global angular, sessionStorage, $, API_BASE, localStorage, window, Users, FluentXSApi, ActivityApi, ESBApi */
(function() {
    "use strict";

    var app = angular.module('fluentxsAngularApp');

    app.factory('Users', function(SDKUrlService) {
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        return {
            getDetails: function(val) {
                var data = FluentXS.getAvailability(val);
                return data;
            }
        };
    });

    app.factory('SDKUrlService', function($http) {
        return {
            BASE_URL: 'http://192.168.1.23/narthexgit',
            SERVICE_BASE: '/s',
            API_BASE: '/api/',
            BASE_AUTH_URL: 'http://192.168.1.23/fluentxs-authentication',
            BASE_CONF_URL: 'http://192.168.1.23/fluentxs-configuration',
            ACTIVITY_URL: 'http://192.168.1.23/fluentxs-activity',
            IS_URL: 'https://192.168.1.28:9443',
            ESB_URL: 'http://192.168.1.28:8281'
        };
    });

    app.factory('AlertMessageService', function($http) {
        return {
            deleteText: 'Are you sure you want to delete?',
            sessionExpireText: 'Your session has expired. Please login to continue.',
            noPermissionText: "You don't have permission to perform this action."
        };
    });

    app.factory('FlashService', function($rootScope) {

        return {
            show: function(message) {
                $rootScope.flash = message;
                return message;
            },
            clear: function() {
                $rootScope.flash = '';
                return null;
            }
        };
    });

    app.factory('SessionService', function() {
        return {
            get: function(key) {
                return localStorage.getItem(key);
            }
        };
    });

    app.factory('AuthenticationService', function(SessionService) {
        return {
            isLoggedIn: function() {
                return SessionService.get('session_id');
            }
        };
    });

    app.factory('SidebarMenuService', function($rootScope) {
        return {
            setCurrentClass: function(controllerName) {
                if (controllerName === 'HomeCtrl') {
                    $rootScope.homeClass = 'current';
                    $rootScope.monitorClass = '';
                    $rootScope.configurationClass = '';
                    $rootScope.nupClassAnalysis = '';
                    $rootScope.nupClass = '';
                } else if (controllerName === 'ServerStatusCtrl') {
                    $rootScope.nupClassAnalysis = '';
                    $rootScope.nupClass = '';
                    $rootScope.homeClass = '';
                    $rootScope.configurationClass = '';
                    $rootScope.monitorClass = 'current';
                } else if (controllerName === 'ServerCtrl' || controllerName === 'ServerEditCtrl' || controllerName === 'UserCtrl' || controllerName === 'RecipientCtrl' || controllerName === 'RecipientEditCtrl' || controllerName === 'TenantCtrl' || controllerName === 'TenantEditCtrl') {
                    $rootScope.homeClass = '';
                    $rootScope.nupClassAnalysis = '';
                    $rootScope.nupClass = '';
                    $rootScope.monitorClass = '';
                    $rootScope.configurationClass = 'current';
                } else if (controllerName === 'WorklistCtrl') {
                    $rootScope.nupClass = 'current';
                    $rootScope.nupClassAnalysis = '';
                    $rootScope.homeClass = '';
                    $rootScope.monitorClass = '';
                    $rootScope.configurationClass = '';
                } else if (controllerName === 'WorklistAnalysisCtrl') {
                    $rootScope.nupClassAnalysis = 'current';
                    $rootScope.nupClass = '';
                    $rootScope.homeClass = '';
                    $rootScope.monitorClass = '';
                    $rootScope.configurationClass = '';
                }
            }
        };
    });

    app.factory('TokenValidationService', function(SDKUrlService, $rootScope, $window) {
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var FluentIS = new ESBApi(SDKUrlService.IS_URL);
        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
        return {
            isValid: function(access_token) {
                var data = FluentESB.validateToken(access_token);
                if (data) {
                    return data;
                } else {
                    data = Activity.getLastActivity();
                    var jsondata = JSON.parse(data.results.data);
                    var user_session = jsondata.uniqueIdentification;
                    var d = new Date();
                    var date = [d.getHours(), d.getMinutes() + 1, d.getSeconds()].join(':');
                    var str = data.results.created_at;
                    var result = str.split(" ");

                    var array1 = date.split(":");
                    var array2 = result[1].split(":");

                    var hours = (parseInt(array1[0], 10) - parseInt(array2[0], 10));
                    var minutes = (parseInt(array1[1], 10) - parseInt(array2[1], 10));
                    if (parseInt(hours, 10) < 1 && parseInt(minutes, 10) < 30 && user_session === localStorage.session_id) {
                        $rootScope.credentials = $.param({
                            username: $window.atob(localStorage.user_identification_param1),
                            password: $window.atob(localStorage.user_identification_param2)
                        });
                        $rootScope.signupcredentials = {
                            uid: $window.atob(localStorage.user_identification_param1),
                            userpassword: $window.atob(localStorage.user_identification_param2),
                            confpass: $window.atob(localStorage.user_identification_param2),
                            flag: 2
                        };
                        $rootScope.data = FluentIS.login($rootScope.credentials);
                        localStorage.setItem('access_token', $rootScope.data.access_token);
                        $rootScope.value = FluentESB.registerUser($rootScope.signupcredentials, $rootScope.data.access_token);
                        localStorage.setItem('session_id', $rootScope.value.results.party_unique_id);
                        localStorage.setItem('identification_id', $rootScope.value.results.person_type_id);
                        $window.location.reload();
                        return data;
                    }
                }

            }
        };
    });
    app.factory('breadcrumbs', ['$rootScope', '$location',
        function($rootScope, $location) {

            var breadcrumbs = [];
            var breadcrumbsService = {};

            //we want to update breadcrumbs only when a route is actually changed
            //as $location.path() will get updated imediatelly (even if route change fails!)
            $rootScope.$on('$viewContentLoaded', function() {
                var pathElements = $location.path().split('/'),
                    result = [],
                    i;
                var breadcrumbPath = function(index) {
                    return '/' + (pathElements.slice(0, index + 1)).join('/');
                };

                pathElements.shift();
                for (i = 0; i < pathElements.length; i++) {
                    result.push({
                        name: pathElements[i].charAt(0).toUpperCase() + pathElements[i].slice(1).toLowerCase(),
                        path: breadcrumbPath(i)
                    });
                }

                breadcrumbs = result;
            });
            $rootScope.$on('$routeChangeSuccess', function(event, current) {
                var pathElements = $location.path().split('/'),
                    result = [],
                    i;
                var breadcrumbPath = function(index) {
                    return '/' + (pathElements.slice(0, index + 1)).join('/');
                };

                pathElements.shift();
                for (i = 0; i < pathElements.length; i++) {
                    result.push({
                        name: pathElements[i].charAt(0).toUpperCase() + pathElements[i].slice(1).toLowerCase(),
                        path: breadcrumbPath(i)
                    });
                }

                breadcrumbs = result;
            });
            breadcrumbsService.getAll = function() {
                return breadcrumbs;
            };

            breadcrumbsService.getFirst = function() {
                return breadcrumbs[0] || {};
            };

            return breadcrumbsService;
        }
    ]);
}());