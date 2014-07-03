/*global angular, sessionStorage, $, API_BASE, ESBApi, localStorage, FluentXSApi, ActivityApi, NProgress, FluentXS, Activity, App, noty, $location, Plugins */
(function() {
    'use strict';

    var app = angular.module('fluentxsAngularApp');
    /**
    Module which loads user home page.
    **/
    app.controller('HomeCtrl', function ($rootScope, $scope, $route, $http, $window, $routeParams, $timeout, AuthenticationService, SidebarMenuService, $location, FlashService, SDKUrlService, breadcrumbs, checkLogin) {
        NProgress.start();
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 1000);
        $rootScope.pageTitle = $route.current.title;
        SidebarMenuService.setCurrentClass($route.current.controller);
        $scope.breadcrumbs = breadcrumbs;
        if(checkLogin) {
            var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
            var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
            if ($routeParams.PartyID) {
                if ($routeParams.PartyID === localStorage.session_id) {
                    $scope.data = FluentXS.getUserDetails($routeParams.PartyID);
                } else {
                    $scope.data = '';
                }
            } else {
                $scope.data = FluentXS.getUserDetails(localStorage.session_id);
            }
            if (!$scope.data) {
                $scope.data = FluentXS.logout();
                localStorage.removeItem('session_id');
                localStorage.removeItem('identification_id');
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_identification_param1');
                localStorage.removeItem('user_identification_param2');
                localStorage.removeItem('user_identification_param3');
                $location.path('/login').replace();
                FlashService.show("Please login to continue...");
            } else {
                var data = $scope.data.results;
                $rootScope.PartyID = data.PartyID;
                $rootScope.PartyUniqueID = data.PartyUniqueID;
                $rootScope.UserName = data.UserName;
                $rootScope.PersonTypeId = parseInt(data.PersonTypeId);
                $rootScope.Email = data.Email;
                if (data.FirstName) {
                    $rootScope.Name = data.FirstName + " " + data.MiddleName + " " + data.LastName;
                } else {
                    $rootScope.Name = $rootScope.UserName;
                }
                localStorage.setItem('user_identification_param3', $window.btoa($rootScope.Name));
            }
            if($rootScope.PersonTypeId === 1 && !$rootScope.ActivityCount) {
                var d = new Date();
                var date = d.getDate();
                date = ('0' + date).slice(-2);
                var month = d.getMonth() + 1;
                month = ('0' + month).slice(-2);
                var year = d.getFullYear();
                var todaydate = year+'-'+month+'-'+date;
                var todayactivity = 0, i, date_array;
                $scope.ActivityCountData = Activity.getActivityCount();
                $rootScope.ActivityCount = $scope.ActivityCountData.results;
                $rootScope.ActivityCount = parseInt($rootScope.ActivityCount, 10);
                $scope.UserCountData = FluentXS.getUserCount();
                $rootScope.UserCount = $scope.UserCountData.results;
                $scope.ActivityData = Activity.getActivityData();
                $rootScope.RecentActivities = $scope.ActivityData.results;
                $scope.AllActivityData = Activity.getAllActivityData();
                todayactivity = $scope.AllActivityData.results;
                $rootScope.todayactivity = todayactivity;
                $scope.UserData = FluentXS.getUserData();
                $rootScope.UserDetails = $scope.UserData.results;
                var todayuser = 0;
                for (i = 0; i < $scope.UserDetails.length; i++) {
                    date_array = $scope.UserDetails[i].CreatedAt.split(' ');
                    if(date_array[0] === todaydate) {
                        todayuser = todayuser+1;
                    }
                }
                $rootScope.todayuser = todayuser;
            }
            $scope.greetings = 'Welcome back, ' + $rootScope.Name;
            $scope.refreshActivity = function(event) {
                $scope.ActivityCountData = Activity.getActivityCount();
                $scope.UserCountData = FluentXS.getUserCount();
                $scope.ActivityData = Activity.getActivityData();
                $scope.RecentActivities = $scope.ActivityData.results;
                $scope.$watch('ActivityCountData', function () {
                    $rootScope.ActivityCount = $scope.ActivityCountData.results;
                });
                $scope.$watch('UserCountData', function () {
                    $rootScope.UserCount = $scope.UserCountData.results;
                });
                $scope.AllActivityData = Activity.getAllActivityData();
                //$scope.AllActivities = $scope.AllActivityData.results;
                $scope.todayactivity = $scope.AllActivityData.results;
                $scope.$watch('todayactivity', function () {
                    $rootScope.todayactivity = $scope.todayactivity;
                });
                var target = angular.element(event.target);
                var el = angular.element(target).parents().eq(5);
                App.blockUI(el);
                $timeout(function () {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Widget updated.</strong>',
                        type: 'success',
                        timeout: 1000
                    });
                }, 1000);
            };
        } else {
            $location.path('/login').replace();
            FlashService.show("Please login to continue...");            
        }
        NProgress.done();
    });
    /**
    Module for handling server status details.
    Checks whether a server is up or down and displays the result to console.
    **/
    app.controller('ServerStatusCtrl', function($rootScope, $scope, $timeout, $route, SDKUrlService, breadcrumbs, SidebarMenuService) {
        NProgress.start();
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 1000);
        $rootScope.pageTitle = $route.current.title;
        SidebarMenuService.setCurrentClass($route.current.controller);
        $scope.breadcrumbs = breadcrumbs;
        $scope.loginCredentials = $.param({
            username: 'test',
            password: 'test'
        });
        $scope.credentials = {
            email: 'test'
        };
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
        $scope.esbdata = FluentESB.forgotPassword($scope.credentials);
        var FluentIS = new ESBApi(SDKUrlService.IS_URL);
        $scope.data = FluentIS.login($scope.loginCredentials);
        $scope.istitle = 'is';
        $scope.refreshtitle = 'Refresh';
        if ($scope.data.readyState === 0) {
            $rootScope.is_server_no = 1;
            $rootScope.is_server_name = 'Identity Server';
            $rootScope.is_server_status = 'Down';
        } else {
            $rootScope.is_server_no = 1;
            $rootScope.is_server_name = 'Identity Server';
            $rootScope.is_server_status = 'Up';
        }
        if ($scope.esbdata.readyState === 0) {
            $rootScope.esb_server_no = 2;
            $rootScope.esb_server_name = 'ESB Server';
            $rootScope.esb_server_status = 'Down';
        } else {
            $rootScope.esb_server_no = 2;
            $rootScope.esb_server_name = 'ESB Server';
            $rootScope.esb_server_status = 'Up';
        }
        $scope.refreshISStatus = function() {
            Activity.recordActivity('Identity Server health check', 'Server');
            NProgress.start();
            $scope.data = FluentIS.login($scope.loginCredentials);
            if ($scope.data.readyState === 0) {
                $rootScope.is_server_no = 1;
                $rootScope.is_server_name = 'Identity Server';
                $rootScope.is_server_status = 'Down';
            } else {
                $rootScope.is_server_no = 1;
                $rootScope.is_server_name = 'Identity Server';
                $rootScope.is_server_status = 'Up';
            }
            NProgress.done();
        };
        $scope.refreshESBStatus = function() {
            Activity.recordActivity('ESB Server health check', 'Server');
            NProgress.start();
            $scope.esbdata = FluentESB.forgotPassword($scope.credentials);
            if ($scope.esbdata.readyState === 0) {
                $scope.esb_server_no = 2;
                $scope.esb_server_name = 'ESB Server';
                $scope.esb_server_status = 'Down';
            } else {
                $scope.esb_server_no = 2;
                $scope.esb_server_name = 'ESB Server';
                $scope.esb_server_status = 'Up';
            }
            NProgress.done();
        };
        NProgress.done();
    });

    app.controller('ServerCtrl', function($rootScope, $scope, $timeout, $route, breadcrumbs, FlashService, SDKUrlService, SidebarMenuService) {
        NProgress.start();
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 1000);
        $rootScope.pageTitle = $route.current.title;
        SidebarMenuService.setCurrentClass($route.current.controller);
        $scope.breadcrumbs = breadcrumbs;
        FlashService.clear();
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        if (parseInt(localStorage.identification_id, 10) === 1) {
            $scope.data = FluentXS.getServerDetails();
            if ($scope.data) {
                $scope.server = $scope.data.results;
            }
            $scope.addServer = function() {
                NProgress.start();
                Activity.recordActivity('Add New Server Details Attempt', 'Add Server', localStorage.session_id, 'OK');
                $scope.credentials = {
                    server_name: $scope.credentials.server_name,
                    server_baseurl: $scope.credentials.server_baseurl,
                    flag: 0
                };
                $scope.response = FluentXS.manageserver($scope.credentials);
                FlashService.show($scope.response.statusMessage);
                Activity.recordActivity('Added New Server Details', 'Add Server', localStorage.session_id, 'OK');
                $scope.data = FluentXS.getServerDetails();
                if ($scope.data) {
                    $scope.server = $scope.data.results;
                }
                $timeout(function () {
                    noty({
                        text: '<strong>New server details created.</strong>',
                        type: 'success',
                        timeout: 1000
                    });
                }, 500);
                NProgress.done();
            };
        } else {
            Activity.recordActivity('Add New Server Details Attempt Failed', 'Add Server', localStorage.session_id, 'Add New Server Details Attempt Failed');
            $scope.data = FluentXS.logout();
            $location.path('/login').replace();
            FlashService.show("You don't have permission to perform this action.");
        }
        $timeout(function() {
            Plugins.showDataTable();
        }, 0);
        NProgress.done();
    });
    app.controller('ServerEditCtrl', function($rootScope, $scope, $routeParams, $timeout, $route, breadcrumbs, FlashService, SDKUrlService, SidebarMenuService) {
        NProgress.start();
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 1000);
        $rootScope.pageTitle = $route.current.title;
        SidebarMenuService.setCurrentClass($route.current.controller);
        $scope.breadcrumbs = breadcrumbs;
        FlashService.clear();
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        if (parseInt(localStorage.identification_id, 10) === 1) {
            $scope.data = FluentXS.getServerDetails();
            if ($scope.data) {
                $scope.server = $scope.data.results;
            }
            var id = $routeParams.id;
            var data = FluentXS.getServer(id);
            var server = data.results;
            $scope.credentials = {
                server_name: server.name,
                server_baseurl: server.property_value_string,
                server_id: server.id
            };
            $scope.addServer = function(event) {
                var el = angular.element(event.target);
                NProgress.start();
                Activity.recordActivity('Edit Server Details Attempt', 'Edit Server', localStorage.session_id, 'OK');
                $scope.credentials = {
                    server_name: $scope.credentials.server_name,
                    server_baseurl: $scope.credentials.server_baseurl,
                    server_id: $scope.credentials.server_id,
                    flag: 1
                };
                $scope.response = FluentXS.manageserver($scope.credentials);
                FlashService.show($scope.response.statusMessage);
                Activity.recordActivity('Edited Server Details', 'Edit Server', localStorage.session_id, 'OK');
                var data = FluentXS.getServer(id);
                var server = data.results;
                $scope.credentials = {
                    server_name: server.name,
                    server_baseurl: server.property_value_string,
                    server_id: server.id
                };
                $scope.data = FluentXS.getServerDetails();
                if ($scope.data) {
                    $scope.server = $scope.data.results;
                }
                NProgress.done();
                App.blockUI(el);
                $timeout(function () {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Updated Server Details.</strong>',
                        type: 'success',
                        timeout: 2000
                    });
                }, 1000);
            };
        } else {
            Activity.recordActivity('Edited Server Details Attempt Failed', 'Edit Server', localStorage.session_id, 'Edited Server Details Attempt Failed');
            $scope.data = FluentXS.logout();
            $location.path('/login').replace();
            FlashService.show("You don't have permission to perform this action.");
        }
        NProgress.done();
    });
    app.controller('SidebarCtrl', function ($timeout, $scope, $rootScope, $window, SDKUrlService, AuthenticationService) {
        $rootScope.PersonTypeId = parseInt(localStorage.getItem('identification_id'));
        $rootScope.PartyUniqueID = localStorage.getItem('session_id');
        $rootScope.Name = $window.atob(localStorage.getItem('user_identification_param3'));
        if (AuthenticationService.isLoggedIn() && !$rootScope.ActivityCount) {
            $rootScope.Authenticated = true;
            var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
            var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
            var todayactivity = 0;
            var d = new Date();
            var date = d.getDate();
            date = ('0' + date).slice(-2);
            var month = d.getMonth() + 1;
            month = ('0' + month).slice(-2);
            var year = d.getFullYear();
            var todaydate = year + '-' + month + '-' + date;
            $scope.ActivityCountData = Activity.getActivityCount();
            $scope.UserCountData = FluentXS.getUserCount();
            $scope.ActivityData = Activity.getActivityData();
            $rootScope.RecentActivities = $scope.ActivityData.results;
            $rootScope.ActivityCount = $scope.ActivityCountData.results;
            $rootScope.UserCount = $scope.UserCountData.results;
            $scope.AllActivityData = Activity.getAllActivityData();
            todayactivity = $scope.AllActivityData.results;
            $rootScope.todayactivity = todayactivity;
            $scope.UserData = FluentXS.getUserData();
            $rootScope.UserDetails = $scope.UserData.results;
            var todayuser = 0, date_array;
            for (var i = 0; i < $scope.UserDetails.length; i++) {
                date_array = $scope.UserDetails[i].CreatedAt.split(' ');
                if (date_array[0] === todaydate) {
                    todayuser = todayuser + 1;
                }
            }
            $rootScope.todayuser = todayuser;
        }
        $timeout(function() {
            App.init();
            Plugins.init();
            FormComponents.init();
        }, 100);
    });

    app.controller('UserCtrl', function ($scope, SDKUrlService, $timeout, $route, $rootScope, SidebarMenuService, AlertMessageService) {
        NProgress.start();
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 1000);
        $rootScope.pageTitle = $route.current.title;
        SidebarMenuService.setCurrentClass($route.current.controller);
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        $scope.UserData = FluentXS.getAllUserData();
        $scope.UserDetails = $scope.UserData.results;
        $timeout(function() {
            Plugins.showDataTable();
        }, 100);

        $scope.deleteUser = function(id) {
            NProgress.start();
            if(confirm(AlertMessageService.deleteText)) {
                FluentXS.deleteUser(id);
                var el = angular.element('#userContainer');
                App.blockUI(el);
                $timeout(function() {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Deleted User Details.</strong>',
                        type: 'success',
                        timeout: 2000
                    });
                }, 1000);
                $route.reload();
                Activity.recordActivity('Deleted User Details', 'Delete User', localStorage.session_id, 'OK');
            }
            NProgress.done();
        };
        NProgress.done();
    });
}());