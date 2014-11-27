'use strict';

/*
 *  Service to manage all request sent to the RAL API for entity management
 */
angular.module('adminUiApp')
    .factory('EntityManagementService', ['$http', '$q', function($http, $q) {

        var cachedData = null;

        /*
         *  Create an entity given all the information
         */
        function createEntity(entity) {
            var deferred = $q.defer();

            if (entity.name !== null && entity.description !== null) {
                RMSSDK.swagger.entity.addEntity({
                    body: JSON.stringify(entity)
                }, function(data) {
                    cachedData = JSON.parse(data.data);
                    deferred.resolve(cachedData);
                }, function(error) {
                    cachedData = [];
                    deferred.reject({
                        status: 400,
                        data: error
                    });
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: 'Bad Request: data is wrong.'
                });
            }
            return deferred.promise;
        }

        /*
         *  Get the entities for the entity list
         */
        function getEntities() {
            var deferred = $q.defer();
            RMSSDK.swagger.entity.getEntities({}, function(data) {
                cachedData = JSON.parse(data.data);
                deferred.resolve(cachedData);
            }, function(error) {
                cachedData = [];
                deferred.reject({
                    status: 400,
                    data: error
                });
            });
            return deferred.promise;
        }

        /*
         *  Get an entity's full data by a given ID
         */
        function getEntityById(id) {
            var deferred = $q.defer();

            if (id !== null) {
                RMSSDK.swagger.entity.getEntityById({
                    'entityId': id
                }, function(data) {
                    cachedData = JSON.parse(data.data);
                    deferred.resolve(cachedData);
                }, function(error) {
                    cachedData = [];
                    deferred.reject({
                        status: 400,
                        data: error
                    });
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: 'Bad Request: ID is invalid.'
                });
            }
            return deferred.promise;
        }


        /*
         *  Update an entity given id and other information
         */
        function updateEntity(id, entity) {
            var deferred = $q.defer();

            if (entity.name !== null && entity.description !== null) {
                //Calling RMS SDK to update the information about an entity
                RMSSDK.swagger.entity.updateEntity({
                    'entityId': id,
                    body: JSON.stringify(entity)
                }, function(data) {
                    cachedData = JSON.parse(data.data);
                    deferred.resolve(cachedData);
                }, function(error) {
                    cachedData = [];
                    deferred.reject({
                        status: 400,
                        data: error
                    });
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: 'Bad Request: data is wrong.'
                });
            }
            return deferred.promise;
        }

        /*
         *  delete an entity given id of the entity
         */
        function deleteEntity(id) {
            var deferred = $q.defer();

            if (id !== null) {
                RMSSDK.swagger.entity.deleteEntity({
                    'entityId': id
                }, function(data) {
                    deferred.resolve({
                        status: data.status
                    });
                }, function(error) {
                    cachedData = [];
                    deferred.reject({
                        status: 400,
                        data: error
                    });
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: 'Bad Request: ID is invalid.'
                });
            }
            return deferred.promise;
        }

        return {
            getEntities: getEntities,
            getEntityById: getEntityById,
            createEntity: createEntity,
            deleteEntity: deleteEntity,
            updateEntity: updateEntity
        };
    }]);