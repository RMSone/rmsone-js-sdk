"use strict";

/*
 *  Controller for the Create Entity view
 */
angular.module("adminUiApp").controller("EntityManagementCreateCtrl",
        ["$scope", "$state", "EntityService", function ($scope, $state, EntityService) {

        $scope.definition = "";
        $scope.error = null;

        /*
         *  When the Create button is clicked the RAL command is parsed and
         *  a request with the entity is sent through the EntityService
         */
        $scope.onCreate = function () {
            var entityObj = {};
            var splitEntityArray = $scope.definition.split(/\s+/);

            if (splitEntityArray.length > 3 && splitEntityArray[0].toUpperCase() === "CREATE" &&
                    splitEntityArray[1].toUpperCase() === "ENTITY") {
                entityObj.name = splitEntityArray[2];
                if (splitEntityArray[3].toUpperCase() === "EXTENDS") {
                    entityObj.extends = splitEntityArray[4];
                }
                entityObj.schema = $scope.definition.substr($scope.definition.indexOf(splitEntityArray[2]));

                EntityService.createEntity(entityObj).then(function (entity) {
                    // After save navigate to the view page
                    $state.go("entityManagement.viewEntity", {
                        id: entity.id
                    });
                }, function () {
                    $scope.error = "Entity creation failed!";
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
