/*global angular, $, localStorage, FluentXSApi, AuthenticationApi, ConfigurationApi, NProgress, ActivityApi, ESBApi, App, Plugins, FormComponents, Login */
(function() {
    'use strict';
    var app = angular.module('fluentxsAngularApp');

    /**
    Module which loads Fluent XS main page.
    **/
    app.controller('MainCtrl', function($scope, $rootScope, SDKUrlService, FlashService) {
        FlashService.clear();
        NProgress.start();
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        $scope.mainpage = FluentXS.getProductInfo();
        $scope.ExtensibleAgent = $scope.mainpage.results.ExtensibleAgent;
        $scope.WorkstationAgent = $scope.mainpage.results.WorkstationAgent;
        $scope.ExtensionServer = $scope.mainpage.results.ExtensionServer;
        $scope.ProductFamily = $scope.mainpage.results.ProductFamily;
        $scope.Print2Share = $scope.mainpage.results.Print2Share;
        $scope.NotificationCount = '4';
        $scope.openNotification = function() {
            $scope.NotificationCount = '';
        };
        NProgress.done();
    });
    app.controller('WorklistCtrl', function($rootScope, $route, SidebarMenuService, $timeout) {
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 2000);
        $rootScope.pageTitle = $route.current.title;
        SidebarMenuService.setCurrentClass($route.current.controller);
    });
    app.controller('WorklistAnalysisCtrl', function($rootScope, $route, SidebarMenuService, $timeout) {
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 2000);
        $rootScope.pageTitle = $route.current.title;
        SidebarMenuService.setCurrentClass($route.current.controller);
    });
    /**
    Module which handles login and logout functionality.
    **/
    app.controller('LoginCtrl', function($scope, $timeout, $location, $window, FlashService, SDKUrlService, $rootScope, $route) {
        NProgress.start();
        $rootScope.pageTitle = $route.current.title;
        $timeout(function() {
            Login.init();
        }, 100);
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 1000);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var uname, password, confpass;
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        $scope.user_session_id = localStorage.getItem('session_id');
        if ($scope.user_session_id) {
            if ($location.path() === '/') {
                $location.path('/home/' + $scope.user_session_id);
            } else {
                $location.path($location.path());
            }
        }
        $scope.loginUser = function() {
            NProgress.start();
            uname = $scope.credentials.userid;
            password = $scope.credentials.password;
            confpass = $scope.credentials.password;
            localStorage.setItem('user_identification_param1', $window.btoa(uname));
            localStorage.setItem('user_identification_param2', $window.btoa(password));
            Activity.recordActivity('Login attempt by ' + uname, 'Login', uname, 'OK');
            $scope.credentials = $.param({
                username: $scope.credentials.userid,
                password: $scope.credentials.password
            });
            $scope.signupcredentials = {
                uid: uname,
                userpassword: password,
                confpass: confpass,
                flag: 2
            };
            $scope.loginCredentials = {
                userid: uname,
                password: password
            };
            var FluentIS = new ESBApi(SDKUrlService.IS_URL);
            var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
            $scope.data = FluentIS.login($scope.credentials);
            if ($scope.data) {
                if (!$scope.data.error) {
                    localStorage.setItem('access_token', $scope.data.access_token);
                    //$scope.data = Authentication.validateToken($scope.data.access_token);
                    //if ($scope.data) {
                    //$scope.value = FluentXS.signup($scope.signupcredentials);
                    $scope.value = FluentESB.registerUser($scope.signupcredentials, $scope.data.access_token);
                    if ($scope.value) {
                        localStorage.setItem('session_id', $scope.value.results.party_unique_id);
                        localStorage.setItem('identification_id', $scope.value.results.person_type_id);
                        Activity.recordActivity(uname + ' logged in', 'Login', localStorage.session_id, 'OK');
                        $location.path('/home/' + $scope.value.results.party_unique_id);
                    }
                    //}
                } else if ($scope.data.readyState === 0) {
                    FlashService.show('Authentication server is not responding');
                    Activity.recordActivity('Authentication server is not responding', 'Login', uname, 'Authentication server is not responding');
                } else if ($scope.data.status === 400) {
                    FlashService.show('Invalid username or password');
                    Activity.recordActivity('Login attempt failed for ' + uname, 'Login', uname, 'Invalid username or password');
                }
            }
            /*  $scope.data = FluentXS.login($scope.loginCredentials);
                if ($scope.data.results !== null) {
                    localStorage.setItem('session_id', $scope.data.results.PartyID);
                    localStorage.setItem('identification_id', $scope.data.results.PersonTypeId);
                    $location.path('/home/' + $scope.data.results.PartyID);
                    Activity.recordActivity('Login Success', 'Login');
                } else {
                    FlashService.show($scope.data.statusMessage);
                    Activity.recordActivity('Login Failure', 'Login');
                }*/
            $scope.credentials = {
                username: $scope.credentials.userid,
                password: $scope.credentials.password
            };
            NProgress.done();
        };
        $scope.logout = function() {
            Activity.recordActivity($window.atob(localStorage.getItem('user_identification_param1')) + ' logged out', 'Logout', localStorage.session_id, 'OK');
            $scope.data = FluentXS.logout();
            localStorage.removeItem('session_id');
            localStorage.removeItem('identification_id');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_identification_param1');
            localStorage.removeItem('user_identification_param2');
            localStorage.removeItem('user_identification_param3');
            localStorage.removeItem('edit_identification_param');
            $location.path('/login').replace();
            $timeout(function () {
                $window.location.reload();
            }, 3000)           
        };
        NProgress.done();
    });
    app.controller('ActivityGraphCtrl', function(SDKUrlService, $scope, $timeout) {
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var ActivityData = Activity.getActivityDataGraph();
        var RecentActivities = ActivityData.results;
        var ActivityDateDate = Activity.getActivityGraphDate();
        var max_date = ActivityDateDate.results[0].MAXIMUM.split(' ');
        var min_date = ActivityDateDate.results[0].MINIMUM.split(' ');
        max_date = max_date[0];
        min_date = min_date[0];
        var max_date_array = max_date.split('-');
        var min_date_array = min_date.split('-');
        var new_maxdate = max_date_array[0] + '-' + max_date_array[1] + '-' + '01';
        var new_mindate = min_date_array[0] + '-' + min_date_array[1] + '-' + '01';
        var year = max_date_array[0];
        var december = max_date_array[0];
        var november = max_date_array[0];
        if (max_date_array[1] === 1) {
            december = (max_date_array[0]) - 1;
            november = (max_date_array[0]) - 1;
        } else if (max_date_array[1] === 2) {
            december = (max_date_array[0]) - 1;
            november = (max_date_array[0]);
        }
        /* if(max_date_array[1]!==12 || max_date_array[1]!==11 || max_date_array[1]!==10) {
            month = ('0'+max_date_array[1]).slice(-2);
            var minmonth = ('0'+min_date_array[1]).slice(-2);
            max_date = max_date_array[0]+'-'+month+'-01';
            min_date = min_date_array[0]+'-'+minmonth+'-01';
        } else {
            month = max_date_array[1];
            var minmonth = min_date_array[1];
            max_date = max_date_array[0]+'-'+month+'-01';
            min_date = min_date_array[0]+'-'+minmonth+'-01';            
        }*/
        min_date = new_mindate;
        max_date = new_maxdate;
        var data = [];
        var montharray = [], i, date_array;
        var jancount = 0, febcount = 0, marcount = 0, apcount = 0, maycount = 0, junecount = 0, julycount = 0, augcount = 0, sepcount = 0, octcount = 0, novcount = 0, deccount = 0;
        for (i = 0; i < RecentActivities.length; i++) {
            date_array = RecentActivities[i].created_at.split(' ');
            date_array = date_array[0].split('-');
            if (date_array[1] === '01') {
                jancount = jancount + 1;
            } else if (date_array[1] === '02') {
                febcount = febcount + 1;
            } else if (date_array[1] === '03') {
                marcount = marcount + 1;
            } else if (date_array[1] === '04') {
                apcount = apcount + 1;
            } else if (date_array[1] === '05') {
                maycount = maycount + 1;
            } else if (date_array[1] === '06') {
                junecount = junecount + 1;
            } else if (date_array[1] === '07') {
                julycount = julycount + 1;
            } else if (date_array[1] === '08') {
                augcount = augcount + 1;
            } else if (date_array[1] === '09') {
                sepcount = sepcount + 1;
            } else if (date_array[1] === '10') {
                octcount = octcount + 1;
            } else if (date_array[1] === '11') {
                novcount = novcount + 1;
            } else if (date_array[1] === '12') {
                deccount = deccount + 1;
            }
        }
        var month = new Date().getMonth() + 1;
        var array;
        if (jancount || jancount === 0) {
            array = [];
            array.push(new Date(year + '-01-01').getTime());
            array.push(febcount);
            data.push(array);
            montharray.push('Jan (' + (year) + ')');
        }
        if (febcount || febcount === 0) {
            array = [];
            array.push(new Date(year + '-02-01').getTime());
            array.push(febcount);
            data.push(array);
            montharray.push('Feb (' + (year) + ')');
        }
        if (marcount || marcount === 0) {
            array = [];
            array.push(new Date(year + '-03-01').getTime());
            array.push(marcount);
            data.push(array);
            montharray.push('Mar (' + (year) + ')');
        }
        if (apcount || apcount === 0) {
            array = [];
            array.push(new Date(year + '-04-01').getTime());
            array.push(apcount);
            data.push(array);
            montharray.push('Apr (' + (year) + ')');
        }
        if (maycount || maycount === 0) {
            array = [];
            array.push(new Date(year + '-05-01').getTime());
            array.push(maycount);
            data.push(array);
            montharray.push('May (' + (year) + ')');
        }
        if (junecount || junecount === 0) {
            array = [];
            array.push(new Date(year + '-06-01').getTime());
            array.push(junecount);
            data.push(array);
            montharray.push('June (' + (year) + ')');
        }
        if (julycount || julycount === 0) {
            array = [];
            array.push(new Date(year + '-07-01').getTime());
            array.push(julycount);
            data.push(array);
            montharray.push('July (' + (year) + ')');
        }
        if (augcount || augcount === 0) {
            array = [];
            array.push(new Date(year + '-08-01').getTime());
            array.push(augcount);
            data.push(array);
            montharray.push('Aug (' + (year) + ')');
        }
        if (sepcount || sepcount === 0) {
            array = [];
            array.push(new Date(year + '-09-01').getTime());
            array.push(sepcount);
            data.push(array);
            montharray.push('Sep (' + (year) + ')');
        }
        if (octcount || octcount === 0) {
            array = [];
            array.push(new Date(year + '-10-01').getTime());
            array.push(octcount);
            data.push(array);
            montharray.push('Oct (' + (year) + ')');
        }
        if (novcount || novcount === 0) {
            array = [];
            array.push(new Date(november + '-11-01').getTime());
            array.push(novcount);
            data.push(array);
            montharray.push('Nov (' + (november) + ')');
        }
        if (deccount || deccount === 0) {
            array = [];
            array.push(new Date(december + '-12-01').getTime());
            array.push(deccount);
            data.push(array);   
            montharray.push('Dec ('+ (december) +')');           
         }
    var data1 = [
        { label: "Total activities", data: data, color: App.getLayoutColorCode('red') }
    ];
    $.plot("#chart_filled_blue", data1, $.extend(true, {}, Plugins.getFlotDefaults(), {
        xaxis: {
            min: (new Date(min_date)).getTime(),
            max: (new Date(max_date)).getTime(),
            mode: "time",
            tickSize: [1, "month"],
            monthNames: montharray,
            tickLength: 0
        },
        series: {
            lines: {
                fill: true,
                lineWidth: 1.5
            },
            points: {
                show: true,
                radius: 3.5,
                lineWidth: 1.1
            },
            grow: { active: true, growings:[ { stepMode: "maximum" } ] }
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        tooltip: true,
        tooltipOpts: {
            content: '%s: %y'
        }
    }));
});
}());