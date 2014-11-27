"use strict";

/*
 *  Controller for the Create Entity view
 */
angular.module("adminUiApp").controller("EntityManagementEditCtrl",
    ["$scope", "$state", "$stateParams", "EntityService",
    function ($scope, $state, $stateParams, EntityService) {

    $scope.definition = "";
    $scope.error = null;

    // If an ID isn"t provided redirect to the entity list view
    if ($stateParams.id == null || $stateParams.id === "") {
        $state.go("entityManagement");
    }

    // Load the entity object through the EntityService
    EntityService.getEntityById($stateParams.id).then(function () {
        $scope.definition = "";
        $scope.error = null;
    }, function () {
        $scope.definition = "";
        $scope.error = "Error loading entity!";
    });

    /*
     *  When the Save button is clicked the RAL command is parsed and
     *  a request with the updated entity is sent through the EntityService
     */
    $scope.onEdit = function () {

        var entityObj = {};
        var splitEntityArray = $scope.definition.split(/\s+/);

        if (splitEntityArray.length > 3 && splitEntityArray[0].toUpperCase() === "UPDATE" &&
            splitEntityArray[1].toUpperCase() === "ENTITY") {

            entityObj.name = splitEntityArray[2];
            if (splitEntityArray[3].toUpperCase() === "EXTENDS") {
                entityObj.extends = splitEntityArray[4];
            }
            entityObj.schema = $scope.definition.substr($scope.definition.indexOf(splitEntityArray[2]));

            EntityService.editEntity($stateParams.id, entityObj).then(function (entity) {
                // After save navigate to the view page
                $state.go("entityManagement.viewEntity", {
                    id: entity.id
                });
            }, function () {
                $scope.error = "Entity update failed!";
            });
        } else {
            $scope.error = "Invalid RAL command!";
        }

    };

    /*
     *  On cancel navigate to the entity details view
     */
    $scope.onCancel = function () {
        $state.go("entityManagement.viewEntity", {
            id: $stateParams.id
        });
    };
}]);
