define(['angularAMD','components/auth/auth.service'], function (angularAMD) {
'use strict';
    if (typeof requirejs != 'function') {
        requirejs = function(config) { requirejs = config; };
    }

    requirejs( { paths: { 'EntityManagementCtrl':'app/entityManagement/client/controllers/entityManagement.controller' } } );
    requirejs( { paths: { 'EntityManagementCreateCtrl':'app/entityManagement/client/controllers/entityManagementCreate.controller'} } );
    requirejs( { paths: {  'EntityManagementViewCtrl':'app/entityManagement/client/controllers/entityManagementView.controller' } } );
    requirejs( { paths: {  'EntityManagementUpdateCtrl':'app/entityManagement/client/controllers/entityManagementUpdate.controller' } } );


    var app = angular.module("adminUiApp", []);


    app.config(function($routeProvider) {
        $routeProvider
            .when("/entityManagement", angularAMD.route({
                templateUrl: 'app/entityManagement/client/views/entityManagement.html', controller: 'EntityManagementCtrl'
            }))
            .when("/entity/create", angularAMD.route({
                templateUrl: 'app/entityManagement/client/views/entityManagementCreate.html', controller: 'EntityManagementCreateCtrl'
            }))
            .when('/entity/:id', angularAMD.route({
                templateUrl: 'app/entityManagement/client/views/entityManagementView.html', controller: 'EntityManagementViewCtrl'
            }))
            .when("/entity/update/:id", angularAMD.route({
                templateUrl:  'app/entityManagement/client/views/entityManagementUpdate.html', controller: 'EntityManagementUpdateCtrl'
            }))



    });
    return app;
});