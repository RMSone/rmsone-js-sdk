/**
 * Created by csarkar on 10/16/2014.
 */
(function() {
    'use strict';
    angular.module('ecosystemApp').config(function($stateProvider) {
        return $stateProvider.state('main', {
            url: '/',
            templateUrl: 'app/bootstrapp/client/bootstrapp.html',
            controller: 'BootstrappCtrl',
            authenticate: true
        }).state('submitapp', {
            url: '/submitapp',
            templateUrl: 'app/bootstrapp/client/submitapp.html',
            controller: 'SubmitappCtrl',
            authenticate: true
        });
    });

}).call(this);
