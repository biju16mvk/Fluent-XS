/*global angular, $, FluentXSApi, ProfileApi, localStorage, Activity, ActivityApi, NProgress, noty, Plugins, App */
(function() {
    'use strict';
    var app = angular.module('fluentxsAngularApp'), data;

    app.controller('RecipientCtrl', function ($scope, $http, $timeout, $route, breadcrumbs, SidebarMenuService, FlashService, AlertMessageService, SDKUrlService, $location, $rootScope) {
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
        if (parseInt(localStorage.identification_id, 10) === 1 || parseInt(localStorage.identification_id, 10) === 2) {
            var Profile = new ProfileApi(SDKUrlService.BASE_URL);
            $scope.data = FluentXS.getRecipientDetails(); //Fetching all recipient details
            $scope.recipient = $scope.data.results;
            $scope.addRecipient = function() {
                NProgress.start();
                Activity.recordActivity('Create New Recipient Attempt', 'Create Recipient', localStorage.session_id, 'OK');
                $scope.credentials = {
                    firstname: $scope.credentials.recipient_fname,
                    lastname: $scope.credentials.recipient_lname,
                    email: $scope.credentials.recipient_email,
                    printername: $scope.credentials.printer_name,
                    printerurl: $scope.credentials.printer_url,
                    draftfolder: $scope.credentials.draft_folder,
                    uploadurl: $scope.credentials.upload_url,
                    certificateurl: $scope.credentials.certificate_url,
                    boxemail: $scope.credentials.boxemail,
                    hispemail: $scope.credentials.hispemail,
                    flag: 0
                };
                $scope.response = Profile.managerecipient($scope.credentials);
                FlashService.show($scope.response.statusMessage);
                Activity.recordActivity('New Recipient Created', 'Create Recipient', localStorage.session_id, 'OK');
                $scope.data = FluentXS.getRecipientDetails(); //Fetching all recipient details
                $scope.recipient = $scope.data.results;
                $timeout(function () {
                    noty({
                        text: '<strong>New Recipient Created.</strong>',
                        type: 'success',
                        timeout: 1000
                    });
                }, 500);
                NProgress.done();
            };
        } else {
            Activity.recordActivity('Create New Recipient Attempt Failed', 'Create Recipient', localStorage.session_id, 'Create New Recipient Attempt Failed');
            $scope.data = FluentXS.logout();
            $location.path('/login').replace();
            FlashService.show("You don't have permission to perform this action.");
        }
        $timeout(function() {
            Plugins.showDataTable();
        }, 0);

        $scope.deleteRecipient = function(id) {
            NProgress.start();
            if(confirm(AlertMessageService.deleteText)) {
                Profile.deleteRecipient(id);
                var el = angular.element('#recipientContainer');
                App.blockUI(el);
                $timeout(function() {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Deleted Recipient Details.</strong>',
                        type: 'success',
                        timeout: 2000
                    });
                }, 1000);
                Activity.recordActivity('Deleted Recipient Details', 'Delete Recipient', localStorage.session_id, 'OK');
                $route.reload();
            }
            NProgress.done();
        };
        NProgress.done();
    });
    app.controller('RecipientEditCtrl', function($scope, $http, breadcrumbs, $timeout, $route, SidebarMenuService, FlashService, SDKUrlService, $routeParams, $location, $rootScope) {
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
        if (parseInt(localStorage.identification_id, 10) === 1 || parseInt(localStorage.identification_id, 10) === 2) {
            var Profile = new ProfileApi(SDKUrlService.BASE_URL);
            $scope.data = FluentXS.getRecipientDetails(); //Fetching all recipient details
            $scope.recipient = $scope.data.results;
            var id = $routeParams.id;
            var data = Profile.getrecipient(id);
            var recipient = data.results;
            $scope.credentials = {
                recipient_fname: recipient[0].person_fname,
                recipient_lname: recipient[0].person_lname,
                printer_name: recipient[0].recipient_printer,
                printer_url: recipient[0].recipient_printer_url,
                draft_folder: recipient[0].recipient_draft,
                upload_url: recipient[0].recipient_upload_url,
                certificate_url: recipient[0].certificate_data_url,
                boxemail: recipient[0].recipient_box_email,
                hispemail: recipient[0].recipient_hisp_email,
                recipient_email: recipient[0].email,
                party_id: recipient[0].party_id
            };
            $scope.addRecipient = function(event) {
                NProgress.start();
                Activity.recordActivity('Edit Recipient Attempt', 'Edit Recipient', localStorage.session_id, 'OK');
                $scope.credentials = {
                    firstname: $scope.credentials.recipient_fname,
                    lastname: $scope.credentials.recipient_lname,
                    email: $scope.credentials.recipient_email,
                    printername: $scope.credentials.printer_name,
                    printerurl: $scope.credentials.printer_url,
                    draftfolder: $scope.credentials.draft_folder,
                    uploadurl: $scope.credentials.upload_url,
                    certificateurl: $scope.credentials.certificate_url,
                    boxemail: $scope.credentials.boxemail,
                    hispemail: $scope.credentials.hispemail,
                    partyid: $scope.credentials.party_id,
                    flag: 1
                };
                $scope.response = Profile.editrecipient($scope.credentials);
                var data = Profile.getrecipient(id);
                var recipient = data.results;
                $scope.credentials = {
                    recipient_fname: recipient[0].person_fname,
                    recipient_lname: recipient[0].person_lname,
                    printer_name: recipient[0].recipient_printer,
                    printer_url: recipient[0].recipient_printer_url,
                    draft_folder: recipient[0].recipient_draft,
                    upload_url: recipient[0].recipient_upload_url,
                    certificate_url: recipient[0].certificate_data_url,
                    boxemail: recipient[0].recipient_box_email,
                    hispemail: recipient[0].recipient_hisp_email,
                    recipient_email: recipient[0].email,
                    party_id: recipient[0].party_id
                };
                $scope.data = FluentXS.getRecipientDetails(); //Fetching all recipient details
                $scope.recipient = $scope.data.results;
                FlashService.show("Recipient details updated successfully.");
                Activity.recordActivity('Edited Recipient Details', 'Edit Recipient', localStorage.session_id, 'OK');
                var el = angular.element(event.target);
                App.blockUI(el);
                $timeout(function () {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Updated Recipient Details.</strong>',
                        type: 'success',
                        timeout: 2000
                    });
                }, 1000);
                NProgress.done();
            };
        } else {
            Activity.recordActivity('Edit Recipient Attempt Failed', 'Edit Recipient', localStorage.session_id, 'Edit Recipient Attempt Failed');
            $scope.data = FluentXS.logout();
            $location.path('/login').replace();
            FlashService.show("You don't have permission to perform this action.");
        }
        NProgress.done();
    });
}());