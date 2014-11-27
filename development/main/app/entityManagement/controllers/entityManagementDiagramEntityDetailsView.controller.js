"use strict";

/*
 *  Controller to visualize the details of a given entity
 */
angular.module("adminUiApp")
    .controller("EntityManagementDiagramEntityDetailsViewCtrl",
        ["$scope", "$stateParams", "$state", "EntityService",
            function ($scope, $stateParams, $state, EntityService) {

        $scope.entity = null;
        $scope.status = "loading";

        // If a diagram ID isn't provided redirect to the diagram list view
        if ($stateParams.id == null || $stateParams.id === "") {
            $state.go("entityManagement");
        }

        // If an entity ID isn't provided redirect to the diagram view page
        if ($stateParams.eid == null || $stateParams.eid === "") {
            $state.go("entityManagement.viewDiagram", {
                id: $stateParams.id
            });
        }

        // Load the entity object through the EntityService
        EntityService.getEntityById($stateParams.eid).then(function (entity) {
            $scope.entity = entity;
            $scope.status = "done";
        }, function () {
            $scope.entity = null;
            $scope.status = "error";
        });
    }]);
