/*global angular, $, localStorage, FluentXSApi, NProgress, ActivityApi, ESBApi, App, noty */
(function() {
    "use strict";
    var app = angular.module('fluentxsAngularApp');
    /**
    Module for handling user registration. 
    Creates LDAP user as well as register user to Fluent XS application.
    **/
    app.controller('SignupCtrl', function($scope, $location, $http, FlashService, SDKUrlService, $rootScope, $timeout, $route) {
        NProgress.start();
        $rootScope.pageTitle = $route.current.title;
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var FluentIS = new ESBApi(SDKUrlService.IS_URL);
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        FlashService.clear();
        $scope.registerUser = function(event) {
            NProgress.start();
            var uname = $scope.credentials.newuserid;
            var password = $scope.credentials.pass;
            var confpass = $scope.credentials.re_pass;
            var email = $scope.credentials.email;
            Activity.recordActivity('Signup attempt by ' + uname, 'Signup');
            $scope.credentials = {
                uid: $scope.credentials.newuserid,
                userpassword: $scope.credentials.pass,
                confpass: $scope.credentials.re_pass,
                flag: 0
            };
            $scope.data = FluentXS.createuser($scope.credentials);
            var el = angular.element(event.target);
            App.blockUI(el);
            if ($scope.data) {
                $scope.result = $scope.data;
                if ($scope.result) {
                    $scope.credentials = {
                        uid: uname,
                        userpassword: password,
                        confpass: confpass,
                        useremail: email,
                        identifierToken: $scope.result.id,
                        responseToken: $scope.result,
                        flag: 3
                    };
                    $scope.data = FluentXS.signup($scope.credentials);
                    if (parseInt($scope.data.status, 10) === 0) {
                        $timeout(function () {
                            App.unblockUI(el);
                            noty({
                                text: '<strong>User registered successfully.</strong>',
                                type: 'success',
                                timeout: 5000
                            });
                        }, 1000); 
                        Activity.recordActivity(uname + ' created an account', 'Signup');
                    } else {
                        Activity.recordActivity(uname + "'s account creation failed", 'Signup');
                    }
                    $location.path('/login').replace();
                    FlashService.show('Please login to continue');
                } else if ($scope.data.status === 409) {
                        $timeout(function () {
                            App.unblockUI(el);
                            noty({
                                text: '<strong>User ' + uname + ' Already Exists.</strong>',
                                type: 'error',
                                timeout: 5000
                            });
                        }, 1000); 
                } else if ($scope.data.status === 401) {
                        $timeout(function () {
                            App.unblockUI(el);
                            noty({
                                text: '<strong>Registration server is not authenticated.</strong>',
                                type: 'error',
                                timeout: 5000
                            });
                        }, 1000); 
                } else if ($scope.data.status === 500) {
                        $timeout(function () {
                            App.unblockUI(el);
                            noty({
                                text: '<strong>User registration failed.</strong>',
                                type: 'error',
                                timeout: 5000
                            });
                        }, 1000); 
                }
            } else {
                $timeout(function () {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Registration server is not responding.</strong>',
                        type: 'error',
                        timeout: 2000
                    });
                }, 1000); 
            }

            NProgress.done();
        };
        NProgress.done();
    });
    /**
    Module for handling profile updation.
    **/
    app.controller('EditCtrl', function($scope, $http, $routeParams, $timeout, $route, $rootScope, breadcrumbs, AuthenticationService, AlertMessageService, FlashService, $location, SDKUrlService, recipient, livingarrangement, education, country) {
        NProgress.start();
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 5000);
        $rootScope.pageTitle = $route.current.title;
        $scope.breadcrumbs = breadcrumbs;
        localStorage.setItem('edit_identification_param', $routeParams.PartyID);
        var data;
        var access_token = localStorage.getItem('access_token');
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        FlashService.clear();
        if (($routeParams.PartyID !== localStorage.session_id) && parseInt(localStorage.identification_id, 10) !== 1 && parseInt(localStorage.identification_id, 10) !== 2) {
            Activity.recordActivity('Edit Profile Failed', 'Edit Profile', localStorage.session_id, 'Edit Profile Failed');
            $scope.data = FluentXS.logout();
            localStorage.removeItem('session_id');
            localStorage.removeItem('identification_id');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_identification_param1');
            localStorage.removeItem('user_identification_param2');
            localStorage.removeItem('user_identification_param3');
            localStorage.removeItem('edit_identification_param');
            $location.path('/login').replace();
            $timeout(function() {
                noty({
                    text: '<strong>' + AlertMessageService.noPermissionText + '</strong>',
                    type: 'error',
                    timeout: 3000
                });
            }, 3000);

        } else {
            /**
              Fetching all recipient details
            **/
            if (recipient) {
                $scope.recipient = recipient.results;
            }

            /**
              Fetching all living arrangement details
            **/
            if (livingarrangement) {
                $scope.livingarrangement = livingarrangement.results;
                $scope.live_id = $scope.livingarrangement[0].id;
            }

            /**
              Fetching all education details
            **/
            if (education) {
                $scope.education = education.results;
            }
            /**
              Fetching all country details
            **/
            if (country) {
                $scope.country = country.results;
                $scope.countryid = $scope.country[0].id;
            }

            data = FluentXS.getUserDetails(localStorage.getItem('edit_identification_param'));
            if (data) {
                data = data.results;
                $scope.genderID = data.GenderId;
                $rootScope.PartyID = data.PartyID;
                $rootScope.MiddleName = data.MiddleName;
                $rootScope.LastName = data.LastName;
                $rootScope.FirstName = data.FirstName;
                $rootScope.genderID = data.GenderId;
                $rootScope.PersonId = data.PersonTypeId;
                $scope.newuserid = data.UserName;
                var array = JSON.parse("[" + data.Recipient + "]");
                var recipientarray = FluentXS.getRecipientByID(array);
                $scope.credentials = {
                    firstname: data.FirstName,
                    middlename: data.MiddleName,
                    lastname: data.LastName,
                    live_id: data.LivingStatusId,
                    religion_id: data.ReligionId,
                    education_id: data.Education,
                    language_id: data.Languages,
                    street: data.Street,
                    address: data.Address,
                    zip: data.ZipCode,
                    city: data.City,
                    state: data.State,
                    countryid: data.CountryId,
                    email: data.Email,
                    phone: data.Phone,
                    fax: data.Fax,
                    selectedRecipient: recipientarray
                };
                $rootScope.userData = data.results;
            }
            $scope.getGenderClass = function(value) {
                if (parseInt($scope.genderID, 10) === value) {
                    return "btn btn-info active";
                }
                if (parseInt($scope.genderID, 10) !== value) {
                    return "btn btn-info";
                }
            };
        }
        $scope.updateProfile = function(event) {
            NProgress.start();
            Activity.recordActivity('Edit Profile Attempt', 'Edit Profile', localStorage.session_id, 'OK');
            if (this.genderValue) {
                $scope.gender_id = this.genderValue;
            } else {
                $scope.gender_id = $rootScope.genderID;
            }
            $scope.credentials = {
                partyid: $rootScope.PartyID,
                person_type_id: $rootScope.PersonId,
                firstname: $scope.credentials.firstname,
                middlename: $scope.credentials.middlename,
                lastname: $scope.credentials.lastname,
                gender_id: $scope.gender_id,
                live_id: $scope.credentials.live_id,
                religion_id: $scope.credentials.religion_id,
                education_id: $scope.credentials.education_id,
                language_id: $scope.credentials.language_id,
                street: $scope.credentials.street,
                address: $scope.credentials.address,
                zip: $scope.credentials.zip,
                city: $scope.credentials.city,
                state: $scope.credentials.state,
                countryid: $scope.credentials.countryid,
                email: $scope.credentials.email,
                phone: $scope.credentials.phone,
                fax: $scope.credentials.fax,
                selectedRecipient: $scope.credentials.selectedRecipient
            };
            var access_token = localStorage.getItem('access_token');
            $scope.data = FluentESB.updateProfile($scope.credentials, access_token);
            //$scope.data = FluentXS.updateUser($scope.credentials);
            Activity.recordActivity('Edit Profile Success', 'Edit Profile', localStorage.session_id, 'User details updated successfully');
            FlashService.show('User details updated successfully');
            var el = angular.element(event.target);
            App.blockUI(el);
            $timeout(function() {
                App.unblockUI(el);
                noty({
                    text: '<strong>User details updated successfully.</strong>',
                    type: 'success',
                    timeout: 2000
                });
            }, 1000);
            NProgress.done();
        };
        $scope.genderFemaleValue = function(value) {
            this.genderValue = value;
            return value;
        };
        $scope.genderMaleValue = function(value) {
            this.genderValue = value;
            return value;
        };
        $scope.genderOtherValue = function(value) {
            this.genderValue = value;
            return value;
        };
        $scope.genderUnknownValue = function(value) {
            this.genderValue = value;
            return value;
        };
        NProgress.done();
    });
    /**
    Module for handling forgot password.
    An email will be send to user's email address with reset password link.
    **/
    app.controller('PasswordCtrl', function($scope, $http, $timeout, FlashService, SDKUrlService, $rootScope, $route) {
        NProgress.start();
        $rootScope.pageTitle = $route.current.title;
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
        FlashService.clear();
        $scope.forgotPassword = function() {
            var uname = $scope.credentials.userid;
            Activity.recordActivity('Forgot Password Attempt', 'Forgot Password', $scope.credentials.userid, 'OK');
            $scope.credentials = {
                email: $scope.credentials.userid
            };
            $scope.data = FluentESB.forgotPassword($scope.credentials);
            if ($scope.data.readyState === 0) {
                Activity.recordActivity('Server is not responding', 'Forgot Password', uname, 'Server is not responding');
                FlashService.show('Server is not responding');
            } else if (!$scope.data.results) {
                Activity.recordActivity('Forgot Password Failed', 'Forgot Password', uname, $scope.data.statusMessage);
                FlashService.show($scope.data.statusMessage);
            } else {
                Activity.recordActivity('Forgot Password Email', 'Forgot Password', uname, $scope.data.statusMessage);
                FlashService.show($scope.data.statusMessage);
            }
        };
        NProgress.done();
    });
    /**
    Module for handling reset password.
    Will reset LDAP password as well as Fluent XS password.
    **/
    app.controller('ResetPasswordCtrl', function($scope, $http, $timeout, $routeParams, FlashService, SDKUrlService, $rootScope, $route) {
        NProgress.start();
        $rootScope.pageTitle = $route.current.title;
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
        var FluentIS = new ESBApi(SDKUrlService.IS_URL);
        FlashService.clear();
        $scope.resetPassword = function() {
            $scope.token = {
                Token: $routeParams.Token
            };
            $scope.data = FluentXS.getTokenData($scope.token);
            if ($scope.data.results) {
                var uname = $scope.data.results.user_name;
                Activity.recordActivity('Reset Password Attempt', 'Reset Password', $scope.data.results.user_name, 'OK');
                $scope.credentials = {
                    username: $scope.data.results.user_name,
                    newpass: $scope.credentials.pass,
                    confpass: $scope.credentials.re_pass,
                    pwdToken: $routeParams.Token,
                    usertoken: $scope.data.results.access_token
                };
                $scope.data = FluentESB.resetPassword($scope.credentials);
                if ($scope.data.readyState === 0) {
                    Activity.recordActivity('Server is not responding', 'Reset Password', uname, 'Server is not responding');
                    FlashService.show('Server is not responding');
                } else {
                    $scope.value = FluentXS.changeLDAPPassword($scope.credentials);
                    if (!$scope.value.error) {
                        Activity.recordActivity('Password Reset Success', 'Reset Password', uname, 'OK');
                        FlashService.show($scope.data.statusMessage);
                    } else {
                        Activity.recordActivity('Password server is not responding', 'Reset Password', uname, 'Password server is not responding');
                        FlashService.show('Password server is not responding');
                    }
                }
            } else {
                Activity.recordActivity('No user found error', 'Reset Password', $routeParams.Token, 'No user found');
                FlashService.show('No user found');
            }
        };
        NProgress.done();
    });
    /**
    Module for handling change password.
    Will change LDAP password as well as Fluent XS password.
    **/
    app.controller('ChangePasswordCtrl', function($scope, $http, $routeParams, $timeout, breadcrumbs, FlashService, AuthenticationService, $location, $rootScope, SDKUrlService, $route) {
        NProgress.start();
        var el = angular.element('#container');
        App.blockUI(el);
        $timeout(function() {
            App.unblockUI(el);
        }, 1000);
        $rootScope.pageTitle = $route.current.title;
        $scope.breadcrumbs = breadcrumbs;
        var data;
        var FluentXS = new FluentXSApi(SDKUrlService.BASE_URL);
        var Activity = new ActivityApi(SDKUrlService.ACTIVITY_URL);
        var FluentESB = new ESBApi(SDKUrlService.ESB_URL);
        var FluentIS = new ESBApi(SDKUrlService.IS_URL);
        FlashService.clear();
        if ($routeParams.PartyID !== localStorage.session_id) {
            Activity.recordActivity('Change Password Attempt Failed', 'Change Password', localStorage.session_id, 'Change Password Attempt Failed');
            $scope.data = FluentXS.logout();
            localStorage.removeItem('session_id');
            localStorage.removeItem('identification_id');
            localStorage.removeItem('access_token');
            $location.path('/login').replace();
            FlashService.show("You don't have permission to perform this action.");
        } else {
            data = FluentXS.getUserDetails($routeParams.PartyID);
            $rootScope.userData = data.results;
            data = data.results;
            $rootScope.PartyID = data.PartyID;
            $rootScope.MiddleName = data.MiddleName;
            $rootScope.LastName = data.LastName;
            $rootScope.FirstName = data.FirstName;
            $scope.changePassword = function(event) {
                var el = angular.element(event.target);
                App.blockUI(el);
                Activity.recordActivity('Change Password Attempt', 'Change Password', localStorage.session_id, 'OK');
                $scope.credentials = {
                    username: data.UserName,
                    oldpass: $scope.credentials.oldpass,
                    newpass: $scope.credentials.newpass,
                    confpass: $scope.credentials.confpass,
                    usertoken: data.UserToken,
                    party_id: $rootScope.PartyID
                };
                var access_token = localStorage.getItem('access_token');
                $scope.data = FluentESB.changePassword($scope.credentials, access_token);
                if ($scope.data) {
                    if ($scope.data.readyState === 0) {
                        Activity.recordActivity('Server is not responding', 'Change Password', localStorage.session_id, 'Server is not responding');
                        FlashService.show('Server is not responding');
                        $scope.alertclass = 'alert fade in alert-danger';
                        $timeout(function() {
                            App.unblockUI(el);
                            noty({
                                text: '<strong>Server is not responding.</strong>',
                                type: 'error',
                                timeout: 2000
                            });
                        }, 1000);
                    } else if (!$scope.data.results) {
                        Activity.recordActivity('Password Change Failed', 'Change Password', localStorage.session_id, $scope.data.statusMessage);
                        FlashService.show($scope.data.statusMessage);
                        $scope.alertclass = 'alert fade in alert-danger';
                        $timeout(function() {
                            App.unblockUI(el);
                            noty({
                                text: '<strong>Old password is incorrect.</strong>',
                                type: 'error',
                                timeout: 2000
                            });
                        }, 1000);
                    } else {
                        $scope.value = FluentXS.changeLDAPPassword($scope.credentials);
                        if ($scope.value) {
                            if (!$scope.value.error) {
                                Activity.recordActivity('Password Change Success', 'Change Password', localStorage.session_id, $scope.data.statusMessage);
                                FlashService.show($scope.data.statusMessage);
                                $scope.alertclass = 'alert fade in alert-success';
                                $timeout(function() {
                                    App.unblockUI(el);
                                    noty({
                                        text: '<strong>Password changed successfully.</strong>',
                                        type: 'success',
                                        timeout: 2000
                                    });
                                }, 1000);
                            } else {
                                Activity.recordActivity('Password server is not responding', 'Change Password', localStorage.session_id, 'Password server is not responding');
                                FlashService.show('Password server is not responding');
                                $scope.alertclass = 'alert fade in alert-danger';
                                $timeout(function() {
                                    App.unblockUI(el);
                                    noty({
                                        text: '<strong>Password server is not responding.</strong>',
                                        type: 'error',
                                        timeout: 2000
                                    });
                                }, 1000);
                            }
                        } else {
                            Activity.recordActivity('Error occured in updating password', 'Change Password', localStorage.session_id, 'Password server is not responding');
                            FlashService.show('Error occured in updating password');
                            $scope.alertclass = 'alert fade in alert-danger';
                            $timeout(function() {
                                App.unblockUI(el);
                                noty({
                                    text: '<strong>Error occured in updating password.</strong>',
                                    type: 'error',
                                    timeout: 2000
                                });
                            }, 1000);
                        }

                    }
                } else {
                    $timeout(function() {
                        App.unblockUI(el);
                        noty({
                            text: '<strong>Error occured in updating password.</strong>',
                            type: 'error',
                            timeout: 2000
                        });
                    }, 1000);
                    NProgress.done();
                }
            };
        }
        NProgress.done();
    });
}());