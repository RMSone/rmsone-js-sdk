"use strict";

/*
 *  Service to manage all request sent to the RAL API for entity management
 */
angular.module("adminUiApp").factory("EntityService", ["$http", "$q",
    function ($http, $q) {

        // TODO: remove caching after we begin using the API or do it in a better way if needed
        var cachedData = null;

        /*
         *  Load the data and cache it
         */
        function loadData() {
            var deferred = $q.defer();

            if (cachedData != null) {
                deferred.resolve(cachedData);
            } else {
                $http({
                    method: "GET",
                    url: "app/entityManagement/mockdata/entities.json"
                }).success(function (data) {
                    cachedData = data;
                    deferred.resolve(cachedData);
                }).error(function (data, status) {
                    cachedData = [];
                    deferred.reject({
                        status: status,
                        data: data
                    });
                });
            }

            return deferred.promise;
        }

        /*
         *  Get the entities for the entity list
         */
        function getEntities() {
            var deferred = $q.defer();

            loadData().then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        /*
         *  Get an entity's full data by a given ID
         */
        function getEntityById(id) {
            var deferred = $q.defer();

            if (String(parseInt(id)) !== String(id)) {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: Invalid entity ID!"
                });
            } else {
                loadData().then(function (data) {
                    var res = Enumerable.from(data).singleOrDefault(function (e) {
                        return String(e.id) === String(id);
                    }, null);

                    if (res) {
                        deferred.resolve(res);
                    } else {
                        deferred.reject({
                            status: 400,
                            data: "Bad Request: Invalid entity ID!"
                        });
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }

            return deferred.promise;
        }

        /*
        *  Create an entity by putting it in the cache
        */
        // TODO: revise when we begin using the API
        function createEntity(entity) {
            var deferred = $q.defer();

            if (entity.name != null && entity.schema != null) {
                loadData().then(function (data) {
                    entity.id = data.length > 0 ? parseInt(data[data.length - 1].id) + 1 : 0;
                    cachedData.push(entity);

                    deferred.resolve(entity);
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: data is wrong."
                });
            }

            return deferred.promise;
        }

        /*
        *  Edit an entity by updating it in the cache
        */
        // TODO: revise when we begin using the API
        function editEntity(id, entity) {
            var deferred = $q.defer();

            if (entity.name != null && entity.schema != null && id != null) {

                loadData().then(function (data) {

                    var res = Enumerable.from(data).singleOrDefault(function (e) {
                        return String(e.id) === String(id);
                    }, null);

                    if (res) {
                        if (res.name === entity.name) {
                            res.schema = entity.schema;

                            if (entity.extends != null) {
                                res.extends = entity.extends;
                            }
                            deferred.resolve(res);
                        } else {
                            deferred.reject({
                                status: 400,
                                data: "Bad Request: cannot change entity name."
                            });
                        }
                    } else {
                        deferred.reject({
                            status: 400,
                            data: "Bad Request: Invalid entity ID!"
                        });
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: invalid entity definition."
                });
            }

            return deferred.promise;
        }

        /*
        *  Delete an entity by deleting it form cache
        */
        // TODO: revise when we begin using the API
        function deleteEntity(id) {
            var deferred = $q.defer();

            if (String(parseInt(id)) !== String(id)) {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: Invalid entity ID!"
                });
            } else {
                loadData().then(function (data) {
                    var eData = Enumerable.from(data);
                    var index = eData.indexOf(eData.singleOrDefault(function (x) {
                        return String(x.id) === String(id);
                    }, null));

                    if (index > -1) {
                        data.splice(index, 1);
                        deferred.resolve();
                    } else {
                        deferred.reject({
                            status: 400,
                            data: "Bad Request: Invalid entity ID!"
                        });
                    }

                }, function (error) {
                    deferred.reject(error);
                });
            }

            return deferred.promise;
        }

        return {
            getEntities: getEntities,

            getEntityById: getEntityById,

            createEntity: createEntity,

            deleteEntity: deleteEntity,

            editEntity: editEntity
        };
    }]);
