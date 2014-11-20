define(['app'], function (app) {
    "use strict";

    /*
     *  Controller for the Create Entity view
     */
    app.controller("EntityManagementUpdateCtrl", ["$scope", "$stateParams", "$state", "EntityManagementService", function ($scope, $stateParams, $state, EntityManagementService) {

        $scope.entity = null;


        // If an ID isn"t provided redirect to the entity list view
        if ($stateParams.id == null || $stateParams.id === "") {
            $state.go("entityManagement");
        }

        // Load the entity object through the EntityManagementService
        EntityManagementService.getEntityById($stateParams.id).then(function (entity) {
            $scope.entity = entity;
            $scope.status = "done";
            $scope.definition = 'update entity ' + $scope.entity.name + ' ' + $scope.entity.description;
            $scope.error = null;
        }, function () {
            $scope.entity = null;
            $scope.status = "error";
        });


        /*
         *  When the Create button is clicked the RAL command is parsed and
         *  a request with the entity is sent through the EntityManagementService
         */
        $scope.onUpdate = function () {
            var entityObj = {};
            var splitEntityArray = $scope.definition.split(/\s+/);

            if (splitEntityArray.length > 3 && splitEntityArray[0].toUpperCase() === 'UPDATE' &&
                splitEntityArray[1].toUpperCase() === 'ENTITY') {
                entityObj.name = splitEntityArray[2];
                // Everything after name is description, need to be changed in the future
                entityObj.description = $scope.definition.substr($scope.definition.indexOf(splitEntityArray[3]));

                EntityManagementService.updateEntity($scope.entity._id, entityObj).then(function (entity) {
                    // After update navigate to the view page
                    $state.go("entityManagement.viewEntity", {
                        id: entity._id
                    });
                }, function () {
                    $scope.error = "Entity Updation failed!";
                });
            } else {
                $scope.error = "Invalid RAL command!";
            }
        };

        /*
         *  On cancel navigate to the entity management root view
         */
        $scope.onCancel = function () {
            $state.go("entityManagement");
        };
    }]);
});