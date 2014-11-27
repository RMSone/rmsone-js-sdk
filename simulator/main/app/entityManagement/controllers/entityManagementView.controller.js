"use strict";

/*
 *  Controller to visualize the RAL statement of a given entity
 */
angular.module("adminUiApp")
    .controller("EntityManagementViewCtrl",
        ["$scope", "$stateParams", "$state", "EntityService", "Modal",
            function ($scope, $stateParams, $state, EntityService, Modal) {

        $scope.entity = null;
        $scope.status = "loading";
        $scope.error = null;
        $scope.deleteModal = Modal.confirm.delete(function () {
            EntityService.deleteEntity($stateParams.id).then(function () {
                $state.go("entityManagement");
            }, function (error) {
                $scope.error = error.data;
            });
        });

        // If an ID isn"t provided redirect to the entity list view
        if ($stateParams.id == null || $stateParams.id === "") {
            $state.go("entityManagement");
        }

        // Load the entity object through the EntityService
        EntityService.getEntityById($stateParams.id).then(function (entity) {
            $scope.entity = entity;
            $scope.status = "done";
        }, function () {
            $scope.entity = null;
            $scope.status = "error";
        });

        /*
         *  On edit navigate to the entity edit view
         */
        $scope.onEdit = function () {
            $state.go("entityManagement.editEntity", {
                id: $stateParams.id
            });
        };

        /*
         *  When the delete button is clicked we open modal for confirmation
         */
        $scope.onDelete = function () {
            $scope.deleteModal($scope.entity.name);
        };
    }]);
