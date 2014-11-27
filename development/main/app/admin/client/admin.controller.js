(function() {
    'use strict';

    angular.module('ecosystemApp').controller('AdminCtrl', function ($scope, $http, Auth, User) {
        $http.get('/api/users').success(function (users) {
            return $scope.users = users;
        });
        return $scope["delete"] = function (user) {
            User.remove({
                id: user._id
            });
            return _.remove($scope.users, user);
        };
    });
}).call(this);