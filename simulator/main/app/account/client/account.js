(function() {
    'use strict';
    angular.module('ecosystemApp').config(function($stateProvider) {
        return $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/account/client/login/login.html',
            controller: 'LoginCtrl'
        }).state('signup', {
            url: '/signup',
            templateUrl: 'app/account/client/signup/signup.html',
            controller: 'SignupCtrl'
        }).state('settings', {
            url: '/settings',
            templateUrl: 'app/account/client/settings/settings.html',
            controller: 'SettingsCtrl',
            authenticate: true
        });
    });

}).call(this);
