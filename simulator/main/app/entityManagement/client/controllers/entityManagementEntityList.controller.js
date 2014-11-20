define(['app','app/entityManagement/client/services/entityManagement.service'], function (app) {
    'use strict';

    /*
     *  Controller to load and manage the list of entities
     */
    app.controller('EntityManagementEntityListCtrl', ['$scope', 'EntityManagementService', function ($scope, EntityManagementService) {

            $scope.entities = [];
            $scope.status = 'loading';

            // Getting all the entities
            EntityManagementService.getEntities().then(function (entities) {
                $scope.entities = entities;
                $scope.status = 'done';
            }, function () {
                $scope.entities = [];
                $scope.status = 'error';
            });
        }]);
});