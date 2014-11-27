"use strict";

/*
 *  Service to manage all request sent to the RAL API for diagram management.
 */
angular.module("adminUiApp").factory("EntityDiagramService", ["$http", "$q",
    function ($http, $q) {

        // TODO: remove caching after we begin using the API or do it in a better way if needed
        var cachedData = null;

        /*
         *  Load the data and cache it.
         */
        function loadData() {
            var deferred = $q.defer();

            if (cachedData != null) {
                deferred.resolve(cachedData);
            } else {
                $http({
                    method: "GET",
                    url: "app/entityManagement/mockdata/entityDiagrams.json"
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
         *  Get the diagrams for the diagram list.
         */
        function getDiagrams() {
            var deferred = $q.defer();

            loadData().then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        /*
         *  Get an diagram's full data by a given ID.
         */
        function getDiagramById(id) {
            var deferred = $q.defer();

            if (String(parseInt(id)) !== String(id)) {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: Invalid diagram ID!"
                });
            } else {
                loadData().then(function (data) {
                    var res = Enumerable.from(data).singleOrDefault(function (e) {
                        return String(e.id) === String(id);
                    }, null);

                    if (res) {
                        deferred.resolve(angular.copy(res));
                    } else {
                        deferred.reject({
                            status: 400,
                            data: "Bad Request: Invalid diagram ID!"
                        });
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }

            return deferred.promise;
        }

        /*
         *  Create an diagram by putting it in the cache.
         */
        // TODO: revise when we begin using the API.
        function createDiagram(diagram) {
            var deferred = $q.defer();

            if (diagram.name != null && diagram.entities != null) {
                loadData().then(function (data) {
                    diagram.id = data.length > 0 ? parseInt(data[data.length - 1].id) + 1 : 0;
                    cachedData.push(diagram);

                    deferred.resolve(diagram);
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
         *  Edit an diagram by updating it in the cache.
         */
        // TODO: revise when we begin using the API.
        function editDiagram(id, diagram) {
            var deferred = $q.defer();

            if (diagram.name != null && diagram.entities.length !== 0 && id != null) {
                loadData().then(function (data) {
                    var res = Enumerable.from(data).singleOrDefault(function (e) {
                        return String(e.id) === String(id);
                    }, null);

                    if (res) {
                        res.name = diagram.name;
                        res.entities = diagram.entities;

                        deferred.resolve(res);
                    } else {
                        deferred.reject({
                            status: 400,
                            data: "Bad Request: Invalid diagram ID!"
                        });
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: invalid diagram definition."
                });
            }

            return deferred.promise;
        }

        /*
        *  Delete an diagram by deleting it form cache.
        */
        // TODO: revise when we begin using the API.
        function deleteDiagram(id) {
            var deferred = $q.defer();

            if (String(parseInt(id)) !== String(id)) {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: Invalid diagram ID!"
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
                            data: "Bad Request: Invalid diagram ID!"
                        });
                    }

                }, function (error) {
                    deferred.reject(error);
                });
            }

            return deferred.promise;
        }

        return {
            getDiagrams: getDiagrams,

            getDiagramById: getDiagramById,

            createDiagram: createDiagram,

            deleteDiagram: deleteDiagram,

            editDiagram: editDiagram
        };
    }]);
