define(['angularAMD','components/auth/auth.service'], function (angularAMD) {
    'use strict';

    if (typeof requirejs != 'function') {
        requirejs = function(config) { requirejs = config; };
    }

    requirejs( { paths: {   'LoginCtrl':'app/account/client/login/login.controller' } } );
    requirejs( { paths: {  'SignupCtrl':'app/account/client/signup/signup.controller'} } );
    requirejs( { paths: {  'SettingsCtrl':'app/account/client/settings/settings.controller' } } );

    var app = angular.module("rmsAccount", ['rmsAdminService']);
   app.config(function($routeProvider) {

       $routeProvider
           .when("/login", angularAMD.route({
               templateUrl: 'app/account/client/login/login.html', controller: 'LoginCtrl'
           }))
           .when("/signup", angularAMD.route({
               templateUrl: 'app/account/client/signup/signup.html', controller: 'SignupCtrl'
           }))
           .when("/settings", angularAMD.route({
               templateUrl: 'app/account/client/settings/settings.html', controller: 'SettingsCtrl'
           }))
    });

    return app;

});
