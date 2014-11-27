"use strict";

/*
 *  Controller to load and manage the list of diagrams.
 */
angular.module("adminUiApp").controller("EntityManagementDiagramListCtrl",
        ["$scope", "$state", "$stateParams", "$rootScope", "EntityDiagramService",
    function ($scope, $state, $stateParams, $rootScope, EntityDiagramService) {

        $scope.diagrams = [];
        $scope.selectedDiagram = null;
        $scope.selectedEntity = null;
        $scope.status = "loading";

        function handleStateChange(event, toState, toParams) {
            var selectedDiagram;

            if (toState.name === "entityManagement.viewDiagram" || toState.name === "entityManagement.editDiagram" ||
                toState.name === "entityManagement.viewDiagram.viewEntity") {
                selectedDiagram = Enumerable.from($scope.diagrams).singleOrDefault(function (e) {
                    return String(e.id) === String(toParams.id);
                }, null);

                if (selectedDiagram != null) {
                    $scope.selectedDiagram = selectedDiagram.id;
                } else {
                    $scope.selectedDiagram = null;
                    $scope.selectedEntity = null;
                }
            } else {
                $scope.selectedDiagram = null;
                $scope.selectedEntity = null;
            }

            if (toState.name === "entityManagement.viewDiagram.viewEntity" && selectedDiagram != null) {
                var selectedEntity = Enumerable.from(selectedDiagram.entities).singleOrDefault(function (e) {
                    return String(e.id) === String(toParams.eid);
                }, null);

                if (selectedEntity != null) {
                    $scope.selectedEntity = selectedEntity.id;
                } else {
                    $scope.selectedEntity = null;
                }
            } else {
                $scope.selectedEntity = null;
            }
        }

        // Subscribe for the $stateChangeStart event and set the selected entity.
        var clearStateChangeStartListener = $rootScope.$on("$stateChangeStart", handleStateChange);

        // Load the diagrams through the EntityDiagramService.
        EntityDiagramService.getDiagrams().then(function (diagrams) {
            $scope.diagrams = diagrams;
            $scope.status = "done";
            handleStateChange(null, $state.current, $stateParams);
        }, function () {
            $scope.diagrams = [];
            $scope.status = "error";
        });

        /*
         *  Open diagram view page.
         */
        $scope.openDiagram = function (id) {
            $state.go("entityManagement.viewDiagram", {
                id: id
            });
        };

        /*
         *  Open diagram view page with entity details.
         */
        $scope.showEntityDetails = function (id, eid) {
            $state.go("entityManagement.viewDiagram.viewEntity", {
                id: id,
                eid: eid
            });
        };

        // Perform cleanup on destroy.
        $scope.$on("$destroy", function () {
            clearStateChangeStartListener();
        });
    }]);
