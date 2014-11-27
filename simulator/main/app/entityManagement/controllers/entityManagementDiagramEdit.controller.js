"use strict";

/*
 *  Controller for the Edit Diagram view.
 */
angular.module("adminUiApp").controller("EntityManagementDiagramEditCtrl",
        ["$scope", "$state", "$stateParams", "EntityService", "EntityDiagramService",
    function ($scope, $state, $stateParams, EntityService, EntityDiagramService) {

    $scope.error = null;
    $scope.diagram = {
        name: "",
        entities: []
    };

    // Load the entities through the EntityService.
    EntityService.getEntities().then(function (entities) {
        $scope.entities = entities;
        $scope.status = "done";
    }, function () {
        $scope.entities = [];
        $scope.status = "error";
        $scope.error = "Error loading entities!";
    });

    // If an ID isn't provided redirect to the entity list view.
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

    /*
     *  When the entity is clicked we add it to the object array
     *  if it's not present or remove it otherwise.
     */
    $scope.onAddRemoveEntity = function (element) {
        for (var i = 0; i < $scope.diagram.entities.length; i++) {
            if (String(element.id) === String($scope.diagram.entities[i].id)) {
                $scope.diagram.entities.splice(i, 1);
                return;
            }
        }

        // If the entity is not found in the array, push it.
        $scope.diagram.entities.push(element);
    };

    /*
     *  When the entity list is created
     *  we check if an entity is selected.
     */
    $scope.entityIsSelected = function (entity) {
        for (var i = 0; i < $scope.diagram.entities.length; i++) {
            if (String(entity.id) === String($scope.diagram.entities[i].id)) {
                return true;
            }
        }
        return false;
    };

    /*
     *  When the Save button is clicked
     *  a request with the updated diagram is sent through the EntityDiagramService.
     */
    $scope.onEdit = function () {
        if ($scope.diagram.name !== "") {
            if ($scope.diagram.entities.length !== 0) {
                EntityDiagramService.editDiagram($stateParams.id, $scope.diagram).then(function (diagram) {
                    // After save navigate to the view page
                    $state.go("entityManagement.viewDiagram", {
                        id: diagram.id
                    });
                }, function () {
                    $scope.error = "Editing diagram failed!";
                });
            }else {
                $scope.error = "Please select an entity!";
            }
        }else {
            $scope.error = "Please enter diagram name!";
        }

    };

    /*
     *  On cancel navigate to the entity details view.
     */
    $scope.onCancel = function () {
        $state.go("entityManagement.viewDiagram", {
            id: $stateParams.id
        });
    };
}]);
