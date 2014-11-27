"use strict";

/*
 *  Controller for the Create diagram view.
 */
angular.module("adminUiApp").controller("EntityManagementDiagramCreateCtrl",
        ["$scope", "$state", "EntityDiagramService", "EntityService",
    function ($scope, $state, EntityDiagramService, EntityService) {

    $scope.entities = [];
    $scope.diagram = {
        name: "",
        entities: []
    };
    $scope.status = "loading";
    $scope.error = null;

    // Load the entities through the EntityService.
    EntityService.getEntities().then(function (entities) {
        $scope.entities = entities;
        $scope.status = "done";
    }, function () {
        $scope.entities = [];
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
     *  When the Create button is clicked
     *  a request with the diagram is sent through the EntityDiagramService.
     */
    $scope.onCreate = function () {
        if ($scope.diagram.name !== "") {
            if ($scope.diagram.entities.length !== 0) {
                EntityDiagramService.createDiagram($scope.diagram).then(function (diagram) {
                    // After save navigate to the view page
                    $state.go("entityManagement.viewDiagram", {
                        id: diagram.id
                    });
                }, function () {
                    $scope.error = "Diagram creation failed!";
                });
            }else {
                $scope.error = "Please select an entity!";
            }
        } else {
            $scope.error = "Please enter diagram name!";
        }
    };

    /*
     *  On cancel navigate to the entity management root view.
     */
    $scope.onCancel = function () {
        $state.go("entityManagement");
    };
}]);
