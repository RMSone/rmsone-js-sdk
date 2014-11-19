define(['angular'], function () {
    'use strict';
    var user = angular.module('rmsAdminService', []);
    user.factory('User', function($resource) {
        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    });
});