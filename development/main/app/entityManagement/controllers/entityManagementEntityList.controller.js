"use strict";

/*
 *  Controller to load and manage the list of entities.
 */
angular.module("adminUiApp").controller("EntityManagementEntityListCtrl",
        ["$scope", "$state", "$stateParams", "$rootScope", "EntityService",
    function ($scope, $state, $stateParams, $rootScope, EntityService) {

        $scope.entities = [];
        $scope.selected = null;
        $scope.status = "loading";

        function handleStateChange(event, toState, toParams) {
            if (toState.name === "entityManagement.viewEntity" || toState.name === "entityManagement.editEntity") {
                var selectedEntity = Enumerable.from($scope.entities).singleOrDefault(function (e) {
                    return String(e.id) === String(toParams.id);
                }, null);

                if (selectedEntity != null) {
                    $scope.selected = selectedEntity.id;
                } else {
                    $scope.selected = null;
                }
            } else {
                $scope.selected = null;
            }
        }

        // Subscribe for the $stateChangeStart event and set the selected entity.
        var clearStateChangeStartListener = $rootScope.$on("$stateChangeStart", handleStateChange);

        // Load the entities through the EntityService.
        EntityService.getEntities().then(function (entities) {
            $scope.entities = entities;
            $scope.status = "done";
            handleStateChange(null, $state.current, $stateParams);
        }, function () {
            $scope.entities = [];
            $scope.status = "error";
        });

        // Perform cleanup on destroy.
        $scope.$on("$destroy", function () {
            clearStateChangeStartListener();
        });
    }]);
