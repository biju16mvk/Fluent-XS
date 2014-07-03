/*global beforeEach, describe, inject, it, module, expect, browser, element, '_', input*/
/*jslint nomen: true*/
(function () {
    'use strict';

    describe('E2E : Testing fluentxsAngularApp', function () {

        beforeEach(function () {
            browser().navigateTo('../index.html');
        });

        describe('/', function () {
            it('should automatically redirect to / when location hash/fragment is empty', function () {
                expect(browser().location().url()).toBe("/");
            });
        });

        describe('/signup', function () {
            beforeEach(function () {
                browser().navigateTo('#/signup');
            });

            it('should render signup when user navigates to /signup', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Create an Account/);
            });
            it('should automatically redirect to /signup when location hash/fragment is /signup', function () {
                expect(browser().location().url()).toBe("/signup");
            });
        });
        describe('/login', function () {
            beforeEach(function () {
                browser().navigateTo('#/login');
            });

            it('should render login when user navigates to /login', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Welcome Back/);
            });
            it('should automatically redirect to /login when location hash/fragment is /login', function () {
                expect(browser().location().url()).toBe("/login");
            });
        });
        describe('/edit/:PartyID', function () {
            beforeEach(function () {
                browser().navigateTo('#/edit/10');
            });

            it('should render edit when user navigates to /edit/:PartyID', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Welcome Back/);
            });
            it('should automatically redirect to /login when location hash/fragment is /edit/{{PartyID}}', function () {
                expect(browser().location().url()).toBe("/login");
            });
        });

        describe('/home/:PartyID', function () {
            beforeEach(function () {
                browser().navigateTo('#/home/10');
            });

            it('should render home when user navigates to /home/:PartyID', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Welcome Back/);
            });
            it('should automatically redirect to /login when location hash/fragment is /home/{{PartyID}}', function () {
                expect(browser().location().url()).toBe("/login");
            });
        });

        describe('/forgotpassword', function () {
            beforeEach(function () {
                browser().navigateTo('#/forgotpassword');
            });

            it('should render forgotpassword when user navigates to /forgotpassword', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Forgot your Password/);
            });
            it('should automatically redirect to /forgotpassword when location hash/fragment is /forgotpassword', function () {
                expect(browser().location().url()).toBe("/forgotpassword");
            });
        });

        describe('/changepassword', function () {
            beforeEach(function () {
                browser().navigateTo('#/changepassword/1');
            });

            it('should render changepassword when user navigates to /changepassword', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Welcome Back/);
            });
            it('should automatically redirect to /login when location hash/fragment is /changepassword/{{PartyID}}', function () {
                expect(browser().location().url()).toBe("/login");
            });
        });

        describe('/resetpassword', function () {
            beforeEach(function () {
                browser().navigateTo('#/resetpassword/');
            });

            it('should render resetpassword when user navigates to /resetpassword', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Reset your Password/);
            });
        });

        describe('User login', function () {
            beforeEach(function () {
                browser().navigateTo('#/login');
            });

            it('should persist user information', function () {
                input('credentials.userid').enter('t@tt.com');
                input('credentials.password').enter('123');
                element(':button.btn-success').click();
                browser().navigateTo('/index.html#/home/1');
            });
            it('should not login when informations are wrong', function () {
                input('credentials.userid').enter('t@ttqqqqq.com');
                input('credentials.password').enter('1231111');
                element(':button.btn-success').click();
                expect(input('credentials.userid').val()).toEqual('t@ttqqqqq.com');
                expect(input('credentials.password').val()).toEqual('1231111');
            });
            it('should display error message when informations are wrong', function () {
                input('credentials.userid').enter('t@ttqqqqq.com');
                input('credentials.password').enter('1231111');
                element(':button.btn-success').click();
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Welcome Back/);
            });
            it('should disable form submission button when empty', function () {
                input('credentials.userid').enter('');
                input('credentials.password').enter('');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
        });

        describe('User Registration', function () {
            beforeEach(function () {
                browser().navigateTo('#/signup');
            });
            it('should disable form submission button when empty', function () {
                input('newuserid').enter('');
                input('pass').enter('');
                input('re_pass').enter('');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
            it('should disable form submission button when username is not available', function () {
                input('newuserid').enter('t@tt.com');
                input('pass').enter('abcd');
                input('re_pass').enter('abcd');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
            it('should display error message when username is not available', function () {
                input('newuserid').enter('t@tt.com');
                input('pass').enter('abcd');
                input('re_pass').enter('abcd');
                expect(element('[ng-view] span.msg-error').text()).
                    toMatch(/Username not available/);
            });
            it('should disable form submission button when username is not a valid email', function () {
                input('newuserid').enter('t@');
                input('pass').enter('abcd');
                input('re_pass').enter('abcd');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
            it('should display error message when username is not a valid email', function () {
                input('newuserid').enter('t@');
                input('pass').enter('abcd');
                input('re_pass').enter('abcd');
                expect(element('[ng-view] div.custom-error').text()).
                    toMatch(/Please enter a valid email address/);
            });
            it('should disable form submission button when passwords are not matching', function () {
                input('newuserid').enter('abcd@test.com');
                input('pass').enter('abcd');
                input('re_pass').enter('test');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
            it('should display error message when passwords are not matching', function () {
                input('newuserid').enter('abcd@test.com');
                input('pass').enter('abcd');
                input('re_pass').enter('abcdefg');
                expect(element('[ng-view] span.msg-error').text()).
                    toMatch(/Passwords not matching/);
            });
            it('should persist user informations', function () {
                input('newuserid').enter('abcd@test.com');
                input('pass').enter('abcd');
                input('re_pass').enter('abcd');
                element(':button.btn-success').click();
                expect(input('newuserid').val()).toEqual('abcd@test.com');
                expect(input('pass').val()).toEqual('abcd');
                expect(input('re_pass').val()).toEqual('abcd');
            });
/*            it('should send an email with instructions to complete registration', function () {
                input('newuserid').enter('user@test.com');
                input('pass').enter('abcd');
                input('re_pass').enter('abcd');
                element(':button.btn-success').click();
                expect(element('[ng-view] div.alert').text()).
                    toMatch(/Please check your mail to continue/);
            });*/
        });
        describe('Forgot Password', function () {
            beforeEach(function () {
                browser().navigateTo('#/forgotpassword');
            });
            it('should disable form submission button when empty', function () {
                input('userid').enter('');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
            it('should disable form submission button when username is not a valid email', function () {
                input('userid').enter('t@');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
            it('should disable form submission button when username does not exist', function () {
                input('userid').enter('abcde@test.com');
                expect(element(':button.btn-success:disabled').count()).toEqual(1);
            });
            it('should display error message when username is not a valid email', function () {
                input('userid').enter('t@');
                expect(element('[ng-view] div.custom-error').text()).
                    toMatch(/Please enter a valid email address/);
            });
            it('should display error message when username does not exist', function () {
                input('userid').enter('abcde@test.com');
                expect(element('[ng-view] span.msg-error').text()).
                    toMatch(/Email address not found/);
            });
            it('should persist user email address', function () {
                input('userid').enter('abcd@test.com');
                element(':button.btn-success').click();
                expect(input('userid').val()).toEqual('abcd@test.com');
            });
            it('should send an email with reset password link', function () {
                input('userid').enter('abcd@test.com');
                element(':button.btn-success').click();
                expect(element('[ng-view] div.alert').text()).
                    toMatch(/Mail sent successfully/);
            });
        });
        describe('Reset Password', function () {
            beforeEach(function () {
                browser().navigateTo('#/resetpassword/');
            });
            it('should disable form submission button when passwords are not matching', function () {
                input('pass').enter('test');
                input('re_pass').enter('abcd');
                expect(element(':button.btn-success:disabled').count()).toEqual(0);
            });
            it('should display error message when username does not exist', function () {
                input('pass').enter('test');
                input('re_pass').enter('abcd');
                expect(element('[ng-view] span.msg-error').text()).
                    toMatch(/Passwords not matching/);
            });
            it('shoud persist form values', function () {
                input('pass').enter('test');
                input('re_pass').enter('test');
                element(':button.btn-success').click();
                expect(input('pass').val()).toEqual('test');
                expect(input('re_pass').val()).toEqual('test');
            });
            it('should display error message when submit form with out a token value', function () {
                input('pass').enter('test');
                input('re_pass').enter('test');
                element(':button.btn-success').click();
                expect(element('[ng-view] div.alert').text()).
                    toMatch(/Invalid API Key/);
            });
        });
        describe('/managerecipient', function () {
            beforeEach(function () {
                browser().navigateTo('#/managerecipient');
            });

            it('should render edit when user navigates to /managerecipient', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Welcome Back/);
            });
            it('should automatically redirect to /login when location hash/fragment is /managerecipient', function () {
                expect(browser().location().url()).toBe("/login");
            });
        });
        describe('/managerecipient/:id', function () {
            beforeEach(function () {
                browser().navigateTo('#/managerecipient');
            });

            it('should render edit when user navigates to /managerecipient/39', function () {
                expect(element('[ng-view] h2:first').text()).
                    toMatch(/Welcome Back/);
            });
            it('should automatically redirect to /login when location hash/fragment is /managerecipient/{{id}}', function () {
                expect(browser().location().url()).toBe("/login");
            });
        });
    });
}());