/*global beforeEach, describe, inject, it, module, expect, '_', $httpBackend, FluentXSApi, localStorage*/
/*jslint nomen: true*/
var forgotPasswordResponse = {
        "service": {
            "handler": "Forgot Password",
            "originalURI": "/narthexgit/api/user/forgotpassword.json",
            "method": "POST"
        },
        "status": "0",
        "results": {
            "id": "1",
            "party_id": "1",
            "user_name": "t@tt.com",
            "password": "40bd001563085fc35165329ea1ff5c5ecbdbbeef",
            "created_at": "2013-08-30 05:36:02",
            "created_at_tz": "0000-00-00 00:00:00",
            "created_at_gmt": "0000-00-00 00:00:00",
            "updated_at": "0000-00-00 00:00:00",
            "updated_at_tz": "0000-00-00 00:00:00",
            "updated_at_gmt": "0000-00-00 00:00:00",
            "lock_version": null,
            "created_session_id": null,
            "updated_session_id": null,
            "record_status_id": "1"
        },
        "statusMessage": "Mail sent successfully."
    };
var forgotPasswordResponse_invalid = {
        "service": {
            "handler": "Forgot Password",
            "originalURI": "\/narthexgit\/api\/user\/forgotpassword.json",
            "method": "POST"
        },
        "status": "1",
        "results": "",
        "statusMessage": "Invalid Username."
    };
var oldPasswordInvalid = {
        "service": {
            "handler": "changePassword",
            "originalURI": "/narthexgit/api/user/changepassword.json",
            "method": "POST"
        },
        "status": "1",
        "results": "",
        "statusMessage": "Old Password is incorrect."
    };
var passwordInvalid = {
        "service": {
            "handler": "changePassword",
            "originalURI": "/narthexgit/api/user/changepassword.json",
            "method": "POST"
        },
        "status": "0",
        "results": "1",
        "statusMessage": "Passwords not matching."
    };
var changepasswordResponse = {
        "service": {
            "handler": "changePassword",
            "originalURI": "/narthexgit/api/user/changepassword.json",
            "method": "POST"
        },
        "status": "0",
        "results": "1",
        "statusMessage": "Password changed successfully"
    };
var useravailabilityresponse =
        {
            "service": {
                "handler": "userRegistration",
                "originalURI": "/narthexgit/api/user/signup.json",
                "method": "POST"
            },
            "status": "1",
            "results": {
                "id": "1",
                "party_id": "1",
                "user_name": "t@tt.com",
                "password": "40bd001563085fc35165329ea1ff5c5ecbdbbeef",
                "created_at": "2013-08-30 05:36:02",
                "created_at_tz": "0000-00-00 00:00:00",
                "created_at_gmt": "0000-00-00 00:00:00",
                "updated_at": "0000-00-00 00:00:00",
                "updated_at_tz": "0000-00-00 00:00:00",
                "updated_at_gmt": "0000-00-00 00:00:00",
                "lock_version": null,
                "created_session_id": null,
                "updated_session_id": null,
                "record_status_id": "1"
            },
            "statusMessage": "Username not available"
        };
var RESPONSE_LOGOUT =
    {
        "service": {
            "originalURI": "/narthexgit/api/user/logout.json",
            "version": "1.0",
            "handler": "logout"
        },
        "status": "0",
        "results": [
            "User Logged Out"
        ],
        "statusMessage": "Please log in to continue."
    };
var resetPasswordResponse =
    {
        "service": {
            "handler": "resetPassword",
            "originalURI": "/narthexgit/api/user/resetpassword.json",
            "method": "POST"
        },
        "status": "1",
        "results": "",
        "statusMessage": "Invalid API Key"
    };
var userUpdateResponse =
    {
        "service": {
            "originalURI": "/narthexgit/api/user/update.json",
            "version": "1.0",
            "handler": "Update user details"
        },
        "status": "0",
        "results": null,
        "statusMessage": "User details updates successfully."
    };
beforeEach(module('fluentxsAngularApp'));

describe('Controller: SignupCtrl', function () {
    var $scope = null;
    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('SignupCtrl', {$scope: $scope});
    }));
    it('should register a new user', function () {
        $scope.credentials = {uid: 't@tt.com', userpassword: '123', confpass: '123', flag: 0};
        var data = $scope.registerUser();
        expect($scope.data).not.toBeNull();
    });
});

describe('Controller: PasswordCtrl', function () {
    var $scope = null;
    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('PasswordCtrl', {$scope: $scope});
    }));
    it('should send an email to the user', function () {
        $scope.credentials = {email: "t@tt.com"};
        var data = $scope.forgotPassword();
        expect($scope.data).not.toBeNull();
    });
});

describe('Controller: ChangePasswordCtrl', function () {
    var $scope = null, $routeParams;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
        $routeParams = {};
        localStorage.setItem('session_id', 45);
    }));
    it('should change the user password', inject(function ($controller) {
        $routeParams.PartyID = 45;
        $controller('ChangePasswordCtrl', {
            $scope: $scope,
            $routeParams : $routeParams
        });
        $scope.credentials = {oldpass: "test", newpass: "123", re_pass: "123", party_id: $routeParams.PartyID};
        var data = $scope.changePassword();
        expect($scope.data).toEqual(oldPasswordInvalid);
    }));
    it('should logged out the user', inject(function ($controller) {
        $routeParams.PartyID = 45444;
        $controller('ChangePasswordCtrl', {
            $scope: $scope,
            $routeParams : $routeParams
        });
        expect($scope.data).toEqual(RESPONSE_LOGOUT);
    }));
});

describe('Controller: ResetPasswordCtrl', function () {
    var $scope = null, $routeParams;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
        $routeParams = {};
    }));
    it('should reset the user password', inject(function ($controller) {
        $routeParams.Token = "123ttttttttt";
        $controller('ResetPasswordCtrl', {$scope: $scope, $routeParams: $routeParams});
        $scope.credentials = {pass: "123", re_pass: "123", pwdToken: $routeParams.Token};
        var data = $scope.resetPassword();
        expect($scope.data).toEqual(resetPasswordResponse);
    }));
});

describe('Controller: EditCtrl', function () {
    var $scope = null, $routeParams;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
        $routeParams = {};
        localStorage.setItem('session_id', '0bac7f82-b063-4301-9b21-d64bf3d07266');
    }));
    it('should logged out the user', inject(function ($controller) {
        $routeParams.PartyID = 4533333;
        $controller('EditCtrl', {$scope: $scope, $routeParams: $routeParams});
        expect($scope.data).toEqual(RESPONSE_LOGOUT);
    }));
    it('should edit the user details', inject(function ($controller) {
        $routeParams.PartyID = '0bac7f82-b063-4301-9b21-d64bf3d07266';
        $controller('EditCtrl', {$scope: $scope, $routeParams: $routeParams});
        $scope.credentials = {
            partyid: 45,
            firstname: "test",
            middlename: "test",
            lastname: "test",
            gender_id: 1,
            live_id: 1,
            education_id: 1,
            street: "test",
            address: "test",
            zip: "1234",
            city: "test",
            state: "test",
            countryid: 1,
            email: "test@123.com",
            phone: "1001010101",
            fax: "1234",
            selectedRecipient: 2
        };
        var value = $scope.genderFemaleValue(2);
        expect(value).toBe(2);
        value = $scope.genderMaleValue(1);
        expect(value).toBe(1);
        value = $scope.genderOtherValue(3);
        expect(value).toBe(3);
        value = $scope.genderUnknownValue(4);
        expect(value).toBe(4);
        value = $scope.getGenderClass(1);
        expect(value).toBe("btn btn-info");

        $scope.genderID = 1;
        value = $scope.getGenderClass(1);
        expect(value).toBe("btn btn-info active");

        var data = $scope.updateProfile();
        expect($scope.data).toEqual(userUpdateResponse);
    }));
    it('should not call the gender function', inject(function ($controller) {
        $routeParams.PartyID = 45;
        $controller('EditCtrl', {$scope: $scope, $routeParams: $routeParams});
        $scope.credentials = {
            partyid: 45,
            firstname: "test",
            middlename: "test",
            lastname: "test",
            gender_id: 1,
            live_id: 1,
            education_id: 1,
            street: "test",
            address: "test",
            zip: "1234",
            city: "test",
            state: "test",
            countryid: 1,
            email: "test@123.com",
            phone: "1001010101",
            fax: "1234",
            selectedRecipient: 2
        };
        var data = $scope.updateProfile();
        expect($scope.data).toEqual(userUpdateResponse);
    }));
});