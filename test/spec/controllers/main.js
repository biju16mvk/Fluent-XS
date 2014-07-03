/*global beforeEach, describe, localStorage, inject, it, module, expect, '_', $httpBackend, FluentXSApi,ProfileApi,AuthenticationApi, ConfigurationApi */
/*jslint nomen: true*/
(function () {
    'use strict';
    var RESPONSE =
        {
            "service": {
                "originalURI": "\/narthexgit\/api\/productinformation.json",
                "version": "1.0",
                "handler": "Productinformation"
            },
            "status": "0",
            "results": {
                "WorkstationAgent": "Fluent XA",
                "ProductFamily": "Fluent Family of Products",
                "Print2Share": "Fluent XA Print2Share",
                "ExtensionServer": "Fluent XS",
                "ExtensibleAgent": "eXtensible Agent"
            },
            "statusMessage": "Success"
        };

    var RESPONSE_RECEPIENT =
            {
                "service": {
                    "originalURI": "\/narthexgit\/api\/recipient.json",
                    "version": "1.0",
                    "handler": "getRecepientDetails"
                },
                "status": "0",
                "results": [
                    {
                        "id": "31",
                        "person_fname": "Lee",
                        "person_lname": "Johns",
                        "party_id": "39",
                        "person_type_id": "5",
                        "recipient_printer": "test printer",
                        "recipient_draft": "C:\/\/drafts",
                        "recipient_printer_url": "C:\/\/test\/print",
                        "recipient_upload_url": "test",
                        "user_name": "test@tt.com"
                    },
                    {
                        "id": "32",
                        "person_fname": "Rod",
                        "person_lname": "Stewart",
                        "party_id": "40",
                        "person_type_id": "5",
                        "recipient_printer": "RodStewart Printer",
                        "recipient_draft": "E:\/\/test\/draft",
                        "recipient_printer_url": "test",
                        "recipient_upload_url": "test",
                        "user_name": "rod@test.com"
                    },
                    {
                        "id": "33",
                        "person_fname": "Jeff",
                        "person_lname": "Anderson",
                        "party_id": "41",
                        "person_type_id": "5",
                        "recipient_printer": "HP InkJet",
                        "recipient_draft": "C:\/\/jeff\/draft",
                        "recipient_printer_url": "C:\/\/jeff\/print",
                        "recipient_upload_url": "C:\/\/jeff\/upload",
                        "user_name": "jeff@mail.com"
                    },
                    {
                        "id": '36',
                        "person_fname": 'test',
                        "person_lname": 'test',
                        "party_id": '44',
                        "person_type_id": '5',
                        "recipient_printer": 'test',
                        "recipient_draft": 'test',
                        "recipient_printer_url": 'test',
                        "recipient_upload_url": 'test',
                        "user_name": 'test'
                    }
                ],
                "statusMessage": "Success"
            };


    var RESPONSE_LIVINGARRANGEMENT =
            {
                "service": {
                    "originalURI": "\/narthexgit\/api\/livingarrangement.json",
                    "version": "1.0",
                    "handler": "getAllLivingArrangementList"
                },
                "status": "0",
                "results": [
                    {
                        "id": "1",
                        "name": "Single"
                    },
                    {
                        "id": "2",
                        "name": "Married"
                    },
                    {
                        "id": "3",
                        "name": "Widower"
                    },
                    {
                        "id": "4",
                        "name": "Not Specified"
                    }
                ],
                "statusMessage": "Success"
            };
    var RESPONSE_EDUCATION =
            {
                "service": {
                    "originalURI": "\/narthexgit\/api\/education.json",
                    "version": "1.0",
                    "handler": "getAllEducationList"
                },
                "status": "0",
                "results": [
                    {
                        "id": "1",
                        "name": "MS"
                    },
                    {
                        "id": "2",
                        "name": "MBA"
                    }
                ],
                "statusMessage": "Success"
            };
    var RESPONSE_COUNTRY =
            {
                "service": {
                    "originalURI": "\/narthexgit\/api\/country.json",
                    "version": "1.0",
                    "handler": "getAllCountryList"
                },
                "status": "0",
                "results": [
                    {
                        "id": "1",
                        "name": "United States"
                    },
                    {
                        "id": "2",
                        "name": "India"
                    }
                ],
                "statusMessage": "Success"
            };
    var RESPONSE_USER =
            {
                "service": {
                    "originalURI": "\/narthexgit\/api\/user\/profile\/1.json",
                    "version": "1.0",
                    "handler": "getAllDetails",
                    "param1": "1"
                },
                "status": "0",
                "results":
                    {
                        "PartyID": "1",
                        "UserName": "t@tt.com",
                        "PassCode": "40bd001563085fc35165329ea1ff5c5ecbdbbeef",
                        "PersonId": "1",
                        "PersonTypeId": "4",
                        "PersonType": "User",
                        "FirstName": "Administrator",
                        "MiddleName": "Alias",
                        "LastName": "Narthex",
                        "LivingStatusId": "2",
                        "LivingStatus": "Married",
                        "GenderId": "1",
                        "Gender": "Male",
                        "Address": "addressfirststreet",
                        "Street": "addressfirst",
                        "ZipCode": "234567",
                        "City": "cochin",
                        "State": "kerala",
                        "CountryId": "2",
                        "Country": "India",
                        "Email": "aneeshas08@gmail.com",
                        "Fax": "2233445",
                        "Phone": "12345",
                        "Education": "1,2",
                        "EducationName": "MS,MBA",
                        "Recipient": "39,40",
                        "CreatedAt": "2013-08-30 05:35:58",
                        "UpdatedAt": "0000-00-00 00:00:00"
                    },
                "statusMessage": "Success"
            };
    var RESPONSE_LOGIN =
        {
            "service": {
                "originalURI": null,
                "version": "1.0",
                "handler": "getAllDetails",
                "param1": "24"
            },
            "status": "0",
            "results": {
                "PartyID": "24",
                "UserName": "test@test.com",
                "PassCode": "40bd001563085fc35165329ea1ff5c5ecbdbbeef",
                "PersonId": "22",
                "PersonTypeId": "4",
                "PersonType": "User",
                "FirstName": "Test",
                "MiddleName": "Alias",
                "LastName": "Tester",
                "LivingStatusId": "1",
                "LivingStatus": "Single",
                "GenderId": "1",
                "Gender": "Male",
                "Address": "test",
                "Street": "test",
                "ZipCode": "123",
                "City": "test",
                "State": "test",
                "CountryId": "2",
                "Country": "India",
                "Email": "test@tt.com",
                "Fax": "123456",
                "Phone": "123456789",
                "Education": null,
                "EducationName": null,
                "Recipient": null,
                "CreatedAt": "2013-09-04 04:14:09",
                "UpdatedAt": "0000-00-00 00:00:00"
            },
            "statusMessage": "Login Successful."
        };
    var RESPONSE_LOGOUT =
        {
            "service": {
                "originalURI": "/narthexgit/api/user/logout.json",
                "version": "1.0",
                "handler": "logout"
            },
            "status": "0",
            "results": '',
            "statusMessage": "Please log in to continue."
        };
    var recepient_email_response =
        {
            "service": {
                "handler": "editRecipient",
                "originalURI": "/narthexgit/api/managerecipient.json",
                "method": "POST"
            },
            "status": "0",
            "results": null,
            "statusMessage": "Email address already in our database.."
        };
    var recepient_edit_response =
        {
            "service": {
                "handler": "editRecipient",
                "originalURI": "/narthexgit/api/managerecipient.json",
                "method": "POST"
            },
            "status": "0",
            "results": null,
            "statusMessage": "Recipient updated successfully."
        };
    var LDAP_RESPONSE =
        {
            "service": {
                "originalURI": "/fluentxs-authentication/api/user/authentication.json",
                "version": "1.0",
                "handler": "login"
            },
            "status": "0",
            "results": {
                "0": {
                    "0": "loginshell",
                    "1": "objectclass",
                    "2": "uid",
                    "3": "uidnumber",
                    "4": "givenname",
                    "5": "cn",
                    "6": "homedirectory",
                    "7": "sn",
                    "8": "gidnumber",
                    "9": "userpassword",
                    "10": "mail",
                    "loginshell": {
                        "0": "/bin/bash",
                        "count": 1
                    },
                    "objectclass": {
                        "0": "inetOrgPerson",
                        "1": "posixAccount",
                        "2": "top",
                        "count": 3
                    },
                    "uid": {
                        "0": "biju",
                        "count": 1
                    },
                    "uidnumber": {
                        "0": "1003",
                        "count": 1
                    },
                    "givenname": {
                        "0": "biju",
                        "count": 1
                    },
                    "cn": {
                        "0": "biju",
                        "count": 1
                    },
                    "homedirectory": {
                        "0": "/home/biju",
                        "count": 1
                    },
                    "sn": {
                        "0": "biju",
                        "count": 1
                    },
                    "gidnumber": {
                        "0": "515",
                        "count": 1
                    },
                    "userpassword": {
                        "0": "{SHA}qUqP5cyxm6YcTAhz05Hph5gvu9M=",
                        "count": 1
                    },
                    "mail": {
                        "0": "biju@citrusinformatics.com",
                        "count": 1
                    },
                    "count": 11,
                    "dn": "uid=biju,ou=People,dc=prime,dc=ds,dc=netspective,dc=com"
                },
                "count": 1
            },
            "statusMessage": "Success"
        };
    var LDAP_INVALID_RESPONSE =
            {
                "service": {
                    "originalURI": "/fluentxs-authentication/api/user/authentication.json",
                    "version": "1.0",
                    "handler": "login"
                },
                "status": "0",
                "results": -1,
                "statusMessage": "Failure"
            };
    var CONFIGURATION_RESPONSE =
            {
                "service": {
                    "handler": "getSettingsByType",
                    "originalURI": "/fluentxs-configuration/api/configuration/list/ldap.json",
                    "method": "GET"
                },
                "status": "0",
                "results": [
                    {
                        "id": "1",
                        "party_id": null,
                        "user_id": null,
                        "name": "uid",
                        "seed_name": "uid",
                        "description": "uid",
                        "position": null,
                        "is_system": "0",
                        "ancestor_id": null,
                        "parent_id": null,
                        "hierarchy_level": null,
                        "hierarchy_path": null,
                        "configuration_type_id": "1",
                        "property_value_string": "fluentxs_authentication.user.user_name",
                        "property_value_date": null,
                        "property_value_time": null,
                        "property_value_integer": null,
                        "property_value_decimal": null,
                        "property_value_boolean": null,
                        "created_at": "2013-09-04 14:28:59",
                        "created_at_tz": null,
                        "created_at_gmt": "0000-00-00 00:00:00",
                        "updated_at": "0000-00-00 00:00:00",
                        "updated_at_tz": null,
                        "updated_at_gmt": "0000-00-00 00:00:00",
                        "lock_version": null,
                        "created_session_id": null,
                        "updated_session_id": null,
                        "record_status_id": "1",
                        "property_value_timestamp": "0000-00-00 00:00:00"
                    },
                    {
                        "id": "2",
                        "party_id": null,
                        "user_id": null,
                        "name": "userpassword",
                        "seed_name": "userpassword",
                        "description": "userpassword",
                        "position": null,
                        "is_system": "0",
                        "ancestor_id": null,
                        "parent_id": null,
                        "hierarchy_level": null,
                        "hierarchy_path": null,
                        "configuration_type_id": "1",
                        "property_value_string": "fluentxs_authentication.user.password",
                        "property_value_date": null,
                        "property_value_time": null,
                        "property_value_integer": null,
                        "property_value_decimal": null,
                        "property_value_boolean": null,
                        "created_at": "2013-09-04 14:29:35",
                        "created_at_tz": null,
                        "created_at_gmt": "0000-00-00 00:00:00",
                        "updated_at": "0000-00-00 00:00:00",
                        "updated_at_tz": null,
                        "updated_at_gmt": "0000-00-00 00:00:00",
                        "lock_version": null,
                        "created_session_id": null,
                        "updated_session_id": null,
                        "record_status_id": "1",
                        "property_value_timestamp": "0000-00-00 00:00:00"
                    },
                    {
                        "id": "3",
                        "party_id": null,
                        "user_id": null,
                        "name": "uidnumber",
                        "seed_name": "uidnumber",
                        "description": "uidnumber",
                        "position": null,
                        "is_system": "0",
                        "ancestor_id": null,
                        "parent_id": null,
                        "hierarchy_level": null,
                        "hierarchy_path": null,
                        "configuration_type_id": "1",
                        "property_value_string": "fluentxs_party.party_identifier.identifier_value",
                        "property_value_date": null,
                        "property_value_time": null,
                        "property_value_integer": null,
                        "property_value_decimal": null,
                        "property_value_boolean": null,
                        "created_at": "2013-09-04 14:30:12",
                        "created_at_tz": null,
                        "created_at_gmt": "0000-00-00 00:00:00",
                        "updated_at": "0000-00-00 00:00:00",
                        "updated_at_tz": null,
                        "updated_at_gmt": "0000-00-00 00:00:00",
                        "lock_version": null,
                        "created_session_id": null,
                        "updated_session_id": null,
                        "record_status_id": "1",
                        "property_value_timestamp": "0000-00-00 00:00:00"
                    }
                ],
                "statusMessage": "Success"
            };
    var LOGIN_FAILED =
            {
                "service": {
                    "originalURI": null,
                    "version": "1.0",
                    "handler": "getAllDetails"
                },
                "status": "1",
                "results": null,
                "statusMessage": "Invalid Username or Password."
            };
    var USER_AVAIL_RESPONSE =
            {
                "service": {
                    "handler": "userRegistration",
                    "originalURI": "\/narthexgit\/api\/user\/signup.json",
                    "method": "POST"
                },
                "status": "1",
                "results": {
                    "id": "2",
                    "party_id": "2",
                    "user_name": "biju",
                    "password": "{SHA}qUqP5cyxm6YcTAhz05Hph5gvu9M=",
                    "created_at": "2013-08-30 05:38:18",
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
    var USER_RESPONSE =
            {
                "service": {
                    "originalURI": "/narthexgit/api/user/profile/2.json",
                    "version": "1.0",
                    "handler": "getAllDetails",
                    "param1": "2"
                },
                "status": "0",
                "results": {
                    "PartyID": "2",
                    "UserName": "biju",
                    "PassCode": "{SHA}qUqP5cyxm6YcTAhz05Hph5gvu9M=",
                    "PersonId": "2",
                    "PersonTypeId": "4",
                    "PersonType": "User",
                    "FirstName": "JOHN",
                    "MiddleName": "LEE",
                    "LastName": "JOHN",
                    "LivingStatusId": "2",
                    "LivingStatus": "Married",
                    "GenderId": "1",
                    "Gender": "Male",
                    "Address": "TEXAS",
                    "Street": "TEXAS",
                    "ZipCode": "1111111",
                    "City": "TEXAS",
                    "State": "TEXAS",
                    "CountryId": "1",
                    "Country": "United States",
                    "Email": "test111@test.com",
                    "Fax": "223344511111111",
                    "Phone": "12345",
                    "Education": null,
                    "EducationName": null,
                    "Recipient": null,
                    "CreatedAt": "2013-08-30 05:38:18",
                    "UpdatedAt": "0000-00-00 00:00:00"
                },
                "statusMessage": "Success"
            };
    var ADD_REC_RESPONSE =
            {
                "service": {
                    "handler": "editRecipient",
                    "originalURI": "/narthexgit/api/managerecipient.json",
                    "method": "POST"
                },
                "status": "0",
                "results": null,
                "statusMessage": "Email address already in our database."
            };
    var EDIT_REC_RESPONSE =
            {
                "service": {
                    "handler": "editRecipient",
                    "originalURI": "/narthexgit/api/managerecipient.json",
                    "method": "POST"
                },
                "status": "0",
                "results": null,
                "statusMessage": "Recipient updated successfully."
            };
  // load the controller's module
    beforeEach(module('fluentxsAngularApp'));

    describe('Controller: MainCtrl', function () {

        var $scope = '';
        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('MainCtrl', {$scope: $scope});
        }));
        it('should check the ExtensibleAgent', function () {
            expect($scope.ExtensibleAgent).toBe('eXtensible Agent');
        });
        it('should check the WorkstationAgent', function () {
            expect($scope.WorkstationAgent).toBe('Fluent XA');
        });
        it('should check the ExtensionServer', function () {
            expect($scope.ExtensionServer).toBe('Fluent XS');
        });
        it('should check the ProductFamily', function () {
            expect($scope.ProductFamily).toBe('Fluent Family of Products');
        });
        it('should check the Print2Share', function () {
            expect($scope.Print2Share).toBe('Fluent XA Print2Share');
        });
    });

    describe('Controller: TestCtrl', function () {
        var $scope = '';
        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('TestCtrl', {$scope: $scope});
        }));
        it('should check the TestCtrl', function () {
            expect($scope.testcase).toBe("true");
        });
    });

    describe('Controller: WorklistCtrl', function () {
        var $scope = '';
        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('WorklistCtrl', {$scope: $scope});
        }));
        it('should check the WorklistCtrl', function () {
            expect($scope.testcase).toBe("false");
        });
    });

    describe('Controller: LoginCtrl', function () {

        var $scope = '';
        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('LoginCtrl', {$scope: $scope});
        }));
        it('should check login', function () {
            $scope.credentials =  $.param({username: 'admin', password: 'admin'});
            var data = $scope.loginUser();
            expect($scope.data).not.toBeNull();
        });
        it('should check whether login fails', function () {
            $scope.credentials = $.param({username: 'admin', password: 'admin'});
            var data = $scope.loginUser();
            expect($scope.data).not.toBeNull();
        });
        it('should check the logout functionality', function () {
            var data = $scope.logout();
            expect($scope.data).not.toBeNull();
        });
    }); 

    describe('Controller: HomeCtrl', function () {

        var $scope = null, $routeParams;
        beforeEach(inject(function ($rootScope) {
            $scope = $rootScope.$new();
            $routeParams = {};
            localStorage.setItem('session_id', '0bac7f82-b063-4301-9b21-d64bf3d07266');
        }));
        it('should return the details of user', inject(function ($controller) {
            $routeParams.PartyID = '0bac7f82-b063-4301-9b21-d64bf3d07266';
            $controller('HomeCtrl', {
                $scope: $scope,
                $routeParams : $routeParams
            });
            expect($scope.data.results).toBeNull();
        }));
        it('should return the logged out response', inject(function ($controller) {
            $routeParams.PartyID = 33333;
            $controller('HomeCtrl', {
                $scope: $scope,
                $routeParams : $routeParams
            });
            expect($scope.data).not.toBeNull();
        }));
    });

    describe('Controller: ServerStatusCtrl', function () {
        var $scope = null;
        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('ServerStatusCtrl', {$scope: $scope});
        }));
        it('should check the controller', function () {
            $scope.loginCredentials = $.param({username: 'test', password: 'test'});
            $scope.credentials = {email: 'test'};
            expect($scope.data).not.toBeNull();
        });
        it('should check the IS status', function () {
            $scope.loginCredentials = $.param({username: 'admin', password: 'admin'});
            $scope.credentials = {email: 'test'};
            expect($scope.data).not.toBeNull();
        });
        it('should check the IS status function', function () {
            $scope.loginCredentials = $.param({username: 'admin', password: 'admin'});
            var data = $scope.refreshISStatus();
            expect($scope.data).not.toBeNull();
        });
        it('should check the ESB status function', function () {
            $scope.credentials = {email: 'test'};
            var data = $scope.refreshESBStatus();
            expect($scope.esbdata).not.toBeNull();
        });
    });
    describe('Controller: RecipientCtrl', function () {

        var $scope = null;
        beforeEach(inject(function ($rootScope) {
            $scope = $rootScope.$new();
        }));
        it('should not return the recipients', inject(function ($controller) {
            $controller('RecipientCtrl', {$scope: $scope});
            localStorage.setItem('identification_id', 1);
            expect($scope.data).not.toBeNull();
        }));
        it('should create new recipient', inject(function ($controller) {
            $controller('RecipientCtrl', {$scope: $scope});
            $scope.credentials = {
                recipient_fname: "test",
                recipient_lname: "test",
                recipient_email: "test",
                printer_name: "test",
                printer_url: "test",
                draft_folder: "test",
                upload_url: "test",
                flag: 0
            };
            var response = $scope.addRecipient();
            expect($scope.response).toEqual(ADD_REC_RESPONSE);
        }));
        it('should return all the recipients', inject(function ($controller) {
            $controller('RecipientCtrl', {$scope: $scope});
            localStorage.setItem('identification_id', 33333);
            expect($scope.data).not.toBeNull();
        }));
    });

    describe('Controller: RecipientEditCtrl', function () {
        var $scope = null, $routeParams;
        beforeEach(inject(function ($rootScope) {
            $scope = $rootScope.$new();
            $routeParams = {};
        }));
        it('should not return the recipients', inject(function ($controller) {
            $routeParams.id = 10;
            $controller('RecipientEditCtrl', {$scope: $scope, $routeParams : $routeParams});
            localStorage.setItem('identification_id', 1);
            expect($scope.data).toEqual(RESPONSE_LOGOUT);
        }));
        it('should edit recipient details', inject(function ($controller) {
            $routeParams.id = 10;
            $controller('RecipientEditCtrl', {$scope: $scope, $routeParams : $routeParams});
            $scope.credentials = {
                recipient_fname: "test",
                recipient_lname: "test",
                recipient_email: "test",
                printer_name: "test",
                printer_url: "test",
                draft_folder: "test",
                upload_url: "test",
                party_id: 10,
                flag: 1
            };
            var response = $scope.addRecipient();
            expect($scope.response).not.toBeNull();
        }));
        it('should return the recipients', inject(function ($controller) {
            $routeParams.id = 10;
            $controller('RecipientEditCtrl', {$scope: $scope, $routeParams : $routeParams});
            localStorage.setItem('identification_id', 33333);
            expect($scope.data).not.toBeNull();
        }));
    });
    /*



    describe('Testing Routes', function () {

        it('should check the routeprovider for main page', function () {
            inject(function ($route) {
                expect($route.routes['/'].templateUrl).toBe('app/views/main.html');
            });
        });
        it('should check the controller for main page', function () {
            inject(function ($route) {
                expect($route.routes['/'].controller).toBe('MainCtrl');
            });
        });
        it('should check the routeprovider for user home page', function () {
            inject(function ($route) {
                expect($route.routes['/home/:PartyID'].templateUrl).toBe('app/views/home.html');
            });
        });
        it('should check the controller for user home page', function () {
            inject(function ($route) {
                expect($route.routes['/home/:PartyID'].controller).toBe('HomeCtrl');
            });
        });
        it('should check the routeprovider for user profile update page', function () {
            inject(function ($route) {
                expect($route.routes['/edit/:PartyID'].templateUrl).toBe('app/views/update_profile.html');
            });
        });
        it('should check the controller for user profile update page', function () {
            inject(function ($route) {
                expect($route.routes['/edit/:PartyID'].controller).toBe('EditCtrl');
            });
        });
        it('should check the routeprovider for Sign Up', function () {
            inject(function ($route) {
                expect($route.routes['/signup'].templateUrl).toBe('app/views/signup.html');
            });
        });
        it('should check the controller for sign up page', function () {
            inject(function ($route) {
                expect($route.routes['/signup'].controller).toBe('SignupCtrl');
            });
        });
        it('should check the routeprovider for Log In', function () {
            inject(function ($route) {
                expect($route.routes['/login'].templateUrl).toBe('app/views/login.html');
            });
        });
        it('should check the controller for login page', function () {
            inject(function ($route) {
                expect($route.routes['/login'].controller).toBe('LoginCtrl');
            });
        });
        it('should check the routeprovider for forgot password', function () {
            inject(function ($route) {
                expect($route.routes['/forgotpassword'].templateUrl).toBe('app/views/forgotpassword.html');
            });
        });
        it('should check the controller for forgot password page', function () {
            inject(function ($route) {
                expect($route.routes['/forgotpassword'].controller).toBe('PasswordCtrl');
            });
        });
        it('should check the routeprovider for reset password', function () {
            inject(function ($route) {
                expect($route.routes['/resetpassword/:Token'].templateUrl).toBe('app/views/resetpassword.html');
            });
        });
        it('should check the controller for reset password page', function () {
            inject(function ($route) {
                expect($route.routes['/resetpassword/:Token'].controller).toBe('ResetPasswordCtrl');
            });
        });
        it('should check the routeprovider for change password', function () {
            inject(function ($route) {
                expect($route.routes['/changepassword/:PartyID'].templateUrl).toBe('app/views/changepassword.html');
            });
        });
        it('should check the controller for change password page', function () {
            inject(function ($route) {
                expect($route.routes['/changepassword/:PartyID'].controller).toBe('ChangePasswordCtrl');
            });
        });
        it('should check the routeprovider for manage recipient', function () {
            inject(function ($route) {
                expect($route.routes['/managerecipient'].templateUrl).toBe('app/views/manage_recipient.html');
            });
        });
        it('should check the controller for manage recipient page', function () {
            inject(function ($route) {
                expect($route.routes['/managerecipient'].controller).toBe('RecipientCtrl');
            });
        });
        it('should check the routeprovider for edit recipient details page', function () {
            inject(function ($route) {
                expect($route.routes['/managerecipient/:id'].templateUrl).toBe('app/views/manage_recipient.html');
            });
        });
        it('should check the controller for edit recipient details page', function () {
            inject(function ($route) {
                expect($route.routes['/managerecipient/:id'].controller).toBe('RecipientEditCtrl');
            });
        });
    });*/


}());