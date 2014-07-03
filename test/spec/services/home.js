/*global describe, FluentXSApi, beforeEach, it, sessionStorage, expect, inject, users, spyOn, fetchedSession, removeSession, setSession, module, RouteService, url, controller */
(function () {
    "use strict";
    var RESPONSE =
        {
            "service": {
                "originalURI": "\/narthexgit\/api\/user\/isUsernameExist\/q@qq.com.json",
                "version": "1.0",
                "handler": "getAllUserDetails",
                "param1": "q@qq.com"
            },
            "status": "0",
            "results": {
                "id": "21",
                "party_id": "23",
                "user_name": "q@qq.com",
                "password": "40bd001563085fc35165329ea1ff5c5ecbdbbeef",
                "created_at": "2013-09-03 06:04:41",
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
            "statusMessage": "Username not available."
        };
    beforeEach(module('fluentxsAngularApp'));

    describe('Testing Service : Users', function () {
        var data, users;
        beforeEach(inject(function (Users) {
            users = Users;
        }));
        it('should have a getDetails function', function () {
            expect(angular.isFunction(users.getDetails)).toBe(true);
        });
        it('should return a response', function () {
            var result = users.getDetails('q@qq.com');
            expect(result).toEqual(RESPONSE);
        });
    });

    describe('Testing Service : FlashService', function () {
        var flashService;
        beforeEach(inject(function (FlashService) {
            flashService = FlashService;
        }));
        describe('FlashService', function () {
            it('should have a show function', function () {
                expect(angular.isFunction(flashService.show)).toBe(true);
            });
            it('should have a clear function', function () {
                expect(angular.isFunction(flashService.clear)).toBe(true);
            });
            it('should return the message', function () {
                var result = flashService.show('Test FlashService');
                expect(result).toBe('Test FlashService');
            });
            it('should return null value as response', function () {
                var result = flashService.clear();
                expect(result).toBe(null);
            });
        });
    });

    describe('Testing Service : SessionService', function () {
        var sessionService;
        beforeEach(inject(function (SessionService) {
            sessionService = SessionService;
        }));
        describe('SessionService', function () {
            it('should have a get function', function () {
                expect(angular.isFunction(sessionService.get)).toBe(true);
            });
            it('should return a response', function () {
                var result = sessionService.get('id');
                expect(result).toBe(null);
            });
        });
    });

    describe('Testing Service : AuthenticationService', function () {
        var authenticationService;
        beforeEach(inject(function (AuthenticationService) {
            authenticationService = AuthenticationService;
        }));
        describe('AuthenticationService', function () {
            it('should have a isLoggedIn function', function () {
                expect(angular.isFunction(authenticationService.isLoggedIn)).toBe(true);
            });
            it('should return a response', function () {
                var result = authenticationService.isLoggedIn();
                expect(result).not.toBeNull();
            });
        });
    });

    describe('Testing Service : SDKUrlService', function () {
        var BASE_URL, SERVICE_BASE, API_BASE, BASE_AUTH_URL, BASE_CONF_URL;
        beforeEach(inject(function (SDKUrlService) {
            BASE_URL = SDKUrlService.BASE_URL;
            SERVICE_BASE = SDKUrlService.SERVICE_BASE;
            API_BASE = SDKUrlService.API_BASE;
            BASE_AUTH_URL = SDKUrlService.BASE_AUTH_URL;
            BASE_CONF_URL = SDKUrlService.BASE_CONF_URL;
        }));
        describe('SDKUrlService', function () {
            it('should check whether the BASE_URL returned is right', function () {
                expect(BASE_URL).toBe('http://192.168.1.23/narthexgit');
            });
            it('should check whether the SERVICE_BASE returned is right', function () {
                expect(SERVICE_BASE).toBe('/s');
            });
            it('should check whether the API_BASE returned is right', function () {
                expect(API_BASE).toBe('/api/');
            });
            it('should check whether the BASE_AUTH_URL returned is right', function () {
                expect(BASE_AUTH_URL).toBe('http://192.168.1.23/fluentxs-authentication');
            });
            it('should check whether the BASE_CONF_URL returned is right', function () {
                expect(BASE_CONF_URL).toBe('http://192.168.1.23/fluentxs-configuration');
            });
        });
    });
}());