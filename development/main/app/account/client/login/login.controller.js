(function() {
    'use strict';
    angular.module('ecosystemApp').controller('LoginCtrl', function($scope, Auth, $location, $window,$cookieStore) {
        $scope.user = {};
        $scope.errors = {};
        $scope.userpic='assets/images/avatar.jpg';
        if ($cookieStore.get('email')) {
            $scope.user.email = $cookieStore.get('email');
        }
        $scope.login = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                return Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                }).then(function() {
                    //return $location.path('/');
                    return $window.location.href='/';
                    $urlRouterProvider.reload();
                })["catch"](function(err) {
                    return $scope.errors.other = err.message;
                });
            }
        };
        return $scope.loginOauth = function(provider) {
            return $window.location.href = '/auth/' + provider;
        };
    });

}).call(this);
