"use strict";

/*
 *  Controller to visualize the entity diagram.
 */
angular.module("adminUiApp")
    .controller("EntityManagementDiagramViewCtrl",
        ["$scope", "$stateParams", "$state", "EntityDiagramService", "Modal",
            function ($scope, $stateParams, $state, EntityDiagramService, Modal) {

        $scope.diagram = null;
        $scope.status = "loading";
        $scope.error = null;

        $scope.deleteModal = Modal.confirm.delete(function () {
            EntityDiagramService.deleteDiagram($stateParams.id).then(function () {
                $state.go("entityManagement");
            }, function (error) {
                $scope.error = error.data;
            });
        });

        // If an ID isn't provided redirect to the diagram list view
        if ($stateParams.id == null || $stateParams.id === "") {
            $state.go("entityManagement");
        }

        // Load the diagram object through the EntityDiagramService
        EntityDiagramService.getDiagramById($stateParams.id).then(function (diagram) {
            $scope.diagram = diagram;
            $scope.status = "done";
        }, function () {
            $scope.diagram = null;
            $scope.status = "error";
        });

        $scope.onSelectEntity = function (eid) {
            $state.go("entityManagement.viewDiagram.viewEntity", {
                id: $stateParams.id,
                eid: eid
            });
        };

        /*
         *  On edit navigate to the diagram edit view
         */
        $scope.onEdit = function () {
            $state.go("entityManagement.editDiagram", {
                id: $stateParams.id
            });
        };

        /*
         *  When the delete button is clicked we open modal for confirmation
         */
        $scope.onDelete = function () {
            $scope.deleteModal($scope.diagram.name);
        };
    }]);
