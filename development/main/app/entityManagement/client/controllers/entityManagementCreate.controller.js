define(['app'], function (app) {
    'use strict';

    /*
     *  Controller for the Create Entity view
     */
    app.controller('EntityManagementCreateCtrl', ['$scope', '$state', 'EntityManagementService', function ($scope, $state, EntityManagementService) {

            $scope.definition = '';
            $scope.error = null;

            /*
             *  When the Create button is clicked the RAL command is parsed and
             *  a request with the entity is sent through the EntityManagementService
             */
            $scope.onCreate = function () {
                var entityObj = {};
                var splitEntityArray = $scope.definition.split(/\s+/);

                if (splitEntityArray.length > 3 && splitEntityArray[0].toUpperCase() === 'CREATE' &&
                    splitEntityArray[1].toUpperCase() === 'ENTITY') {
                    entityObj.name = splitEntityArray[2];
                    // Everything after name is description, need to be changed in the future
                    entityObj.description = $scope.definition.substr($scope.definition.indexOf(splitEntityArray[3]));

                    EntityManagementService.createEntity(entityObj).then(function (entity) {
                        // After save navigate to the view page
                        $state.go('entityManagement.viewEntity', {
                            id: entity._id
                        });
                    }, function () {
                        $scope.error = 'Entity creation failed!';
                    });
                } else {
                    $scope.error = 'Invalid RAL command!';
                }
            };

            /*
             *  On cancel navigate to the entity management root view
             */
            $scope.onCancel = function () {
                $state.go('entityManagement');
            };
        }]);

});