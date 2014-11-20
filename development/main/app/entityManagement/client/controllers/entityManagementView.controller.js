define(['app'], function (app) {
    "use strict";

    /*
     *  Controller to visualize the RAL statement of a given entity
     */
    angular.module("adminUiApp")
        .controller("EntityManagementViewCtrl", ["$scope", "$stateParams", "$state", "EntityManagementService",
            function ($scope, $stateParams, $state, EntityManagementService) {

                $scope.entity = null;
                $scope.status = "loading";

                // If an ID isn"t provided redirect to the entity list view
                if ($stateParams.id == null || $stateParams.id === "") {
                    $state.go("entityManagement");
                }

                // Load the entity object through the EntityManagementService
                EntityManagementService.getEntityById($stateParams.id).then(function (entity) {
                    $scope.entity = entity;
                    $scope.status = "done";
                }, function () {
                    $scope.entity = null;
                    $scope.status = "error";
                });

                $scope.onDelete = function () {
                    EntityManagementService.deleteEntity($scope.entity._id).then(function () {
                        // After save navigate to the view page
                        $state.go("entityManagement");
                    }, function () {
                        $scope.error = 'Unable to delete the entity';
                    });
                };

                $scope.onUpdate = function () {
                    $state.go("entityManagement.updateEntity", {
                        id: $scope.entity._id
                    });
                };

            }
        ]);
});