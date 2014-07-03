/*global angular, $, FluentXSApi, ProfileApi, localStorage, Activity, ActivityApi, NProgress, noty, Plugins, App */
(function() {
    'use strict';
    var app = angular.module('fluentxsAngularApp'),
        data;

    app.controller('TenantCtrl', function ($scope, $http, $timeout, $route, breadcrumbs, SidebarMenuService, AlertMessageService, FlashService, SDKUrlService, $location, $rootScope) {
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
            var Profile = new ProfileApi(SDKUrlService.BASE_URL);
            $scope.data = FluentXS.getTenantDetails(); //Fetching all tenant details
            $scope.tenant = $scope.data.results;
            $scope.recipientData = FluentXS.getRecipientDetails(); //Fetching all recipient details
            $scope.recipientData = $scope.recipientData.results;
            $scope.addTenant = function() {
                NProgress.start();
                Activity.recordActivity('Create New Tenant Attempt', 'Create Tenant', localStorage.session_id, 'OK');
                $scope.credentials = {
                    firstname: $scope.credentials.tenant_fname,
                    lastname: $scope.credentials.tenant_lname,
                    email: $scope.credentials.tenant_email,
                    printername: $scope.credentials.printer_name,
                    printerurl: $scope.credentials.printer_url,
                    draftfolder: $scope.credentials.draft_folder,
                    uploadurl: $scope.credentials.upload_url,
                    certificateurl: $scope.credentials.certificate_url,
                    boxemail: $scope.credentials.boxemail,
                    hispemail: $scope.credentials.hispemail,
                    selectedRecipient: $scope.credentials.selectedRecipient,
                    flag: 0
                };
                $scope.response = Profile.managetenant($scope.credentials);
                FlashService.show($scope.response.statusMessage);
                Activity.recordActivity('New Tenant Created', 'Create Tenant', localStorage.session_id, 'OK');
                $timeout(function() {
                    noty({
                        text: '<strong>New Tenant Created.</strong>',
                        type: 'success',
                        timeout: 1000
                    });
                }, 500);
                NProgress.done();
            };
        } else {
            Activity.recordActivity('Create New Tenant Attempt Failed', 'Create Tenant', localStorage.session_id, 'Create New Tenant Attempt Failed');
            $scope.data = FluentXS.logout();
            $location.path('/login').replace();
            FlashService.show("You don't have permission to perform this action.");
        }
        $timeout(function() {
            Plugins.showDataTable();
        }, 0);

        $scope.deleteTenant = function(id) {
            NProgress.start();
            if(confirm(AlertMessageService.deleteText)) {
                Profile.deleteTenant(id);
                var el = angular.element('#recipientContainer');
                App.blockUI(el);
                $timeout(function() {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Deleted Tenant Details.</strong>',
                        type: 'success',
                        timeout: 2000
                    });
                }, 1000);
                Activity.recordActivity('Deleted Tenant Details', 'Delete Tenant', localStorage.session_id, 'OK');
                $route.reload();
            }
            NProgress.done();
        };

        NProgress.done();
    });
    app.controller('TenantEditCtrl', function($scope, $http, breadcrumbs, $timeout, SidebarMenuService, FlashService, SDKUrlService, $routeParams, $location, $rootScope, $route) {
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
            var Profile = new ProfileApi(SDKUrlService.BASE_URL);
            $scope.data = FluentXS.getTenantDetails(); //Fetching all tenant details
            $scope.tenant = $scope.data.results;
            $scope.recipientData = FluentXS.getRecipientDetails(); //Fetching all recipient details
            $scope.recipientData = $scope.recipientData.results;
            var id = $routeParams.id;
            var recipientarray;
            var data = Profile.gettenant(id);
            var tenant = data.results[0];
            if (tenant.Recipient) {
                var array = JSON.parse("[" + tenant.Recipient + "]");
                recipientarray = FluentXS.getRecipientByID(array);
            }
            $scope.credentials = {
                tenant_fname: tenant.person_fname,
                tenant_lname: tenant.person_lname,
                printer_name: tenant.recipient_printer,
                printer_url: tenant.recipient_printer_url,
                draft_folder: tenant.recipient_draft,
                upload_url: tenant.recipient_upload_url,
                certificate_url: tenant.CertificateDataUrl,
                boxemail: tenant.recipient_box_email,
                hispemail: tenant.recipient_hisp_email,
                tenant_email: tenant.email,
                selectedRecipient: recipientarray,
                party_id: tenant.party_id
            };
            $scope.addTenant = function(event) {
                NProgress.start();
                Activity.recordActivity('Edit Tenant Attempt', 'Edit Tenant', localStorage.session_id, 'OK');
                $scope.credentials = {
                    firstname: $scope.credentials.tenant_fname,
                    lastname: $scope.credentials.tenant_lname,
                    email: $scope.credentials.tenant_email,
                    printername: $scope.credentials.printer_name,
                    printerurl: $scope.credentials.printer_url,
                    draftfolder: $scope.credentials.draft_folder,
                    uploadurl: $scope.credentials.upload_url,
                    certificateurl: $scope.credentials.certificate_url,
                    boxemail: $scope.credentials.boxemail,
                    hispemail: $scope.credentials.hispemail,
                    selectedRecipient: $scope.credentials.selectedRecipient,
                    partyid: $scope.credentials.party_id,
                    flag: 1
                };
                $scope.response = Profile.edittenant($scope.credentials);
                var recipientarray;
                var data = Profile.gettenant(id);
                var tenant = data.results[0];
                if (tenant.Recipient) {
                    var array = JSON.parse("[" + tenant.Recipient + "]");
                    recipientarray = FluentXS.getRecipientByID(array);
                }
                $scope.credentials = {
                    tenant_fname: tenant.person_fname,
                    tenant_lname: tenant.person_lname,
                    printer_name: tenant.recipient_printer,
                    printer_url: tenant.recipient_printer_url,
                    draft_folder: tenant.recipient_draft,
                    upload_url: tenant.recipient_upload_url,
                    certificate_url: tenant.CertificateDataUrl,
                    boxemail: tenant.recipient_box_email,
                    hispemail: tenant.recipient_hisp_email,
                    tenant_email: tenant.email,
                    selectedRecipient: recipientarray,
                    party_id: tenant.party_id
                };
                $scope.data = FluentXS.getTenantDetails(); //Fetching all recipient details
                $scope.recipient = $scope.data.results;
                FlashService.show("Tenant details updated successfully.");
                Activity.recordActivity('Edited Tenant Details', 'Edit Tenant', localStorage.session_id, 'OK');
                var el = angular.element(event.target);
                App.blockUI(el);
                $timeout(function() {
                    App.unblockUI(el);
                    noty({
                        text: '<strong>Updated Tenant Details.</strong>',
                        type: 'success',
                        timeout: 2000
                    });
                }, 1000);
                NProgress.done();
            };
        } else {
            Activity.recordActivity('Edit Tenant Attempt Failed', 'Edit Tenant', localStorage.session_id, 'Edit Tenant Attempt Failed');
            $scope.data = FluentXS.logout();
            $location.path('/login').replace();
            FlashService.show("You don't have permission to perform this action.");
        }
        NProgress.done();
    });
}());