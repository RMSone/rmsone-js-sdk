define(['app','components/auth/auth.service'], function (app) {
    'use strict';
    app.controller('SignupCtrl', function($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};
        $scope.register = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                return Auth.createUser({
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password
                }).then(function() {
                    return $location.path('/login');
                })["catch"](function(err) {
                    err = err.data;
                    $scope.errors = {};
                    return angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        return $scope.errors[field] = error.message;
                    });
                });
            }
        };
        return $scope.loginOauth = function(provider) {
            return $window.location.href = '/auth/' + provider;
        };
    });
});