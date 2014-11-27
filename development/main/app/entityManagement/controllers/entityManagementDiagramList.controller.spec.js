"use strict";

describe("Controller: EntityManagementDiagramListCtrl", function () {
    // Load the controller's module.
    beforeEach(module("adminUiApp"));

    var EntityManagementDiagramListCtrl;
    var scope;
    var rootScope;
    var controller;
    var q;

    // Initialize the controller and a mock scope.
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        controller = $controller;
        q = $q;
    }));

    it("should load list of diagrams", function () {
        var diagramServiceMock = {
            getDiagrams: function () {
                var deferred = q.defer();

                deferred.resolve([{
                    id: 1,
                    name: "Diagram One",
                    entities: [{
                        id: 1,
                        name: "FirstEntityEver",
                        description: "Description of FirtEntityEver",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                    },
                    {
                        id: 2,
                        name: "BasicEntity",
                        description: "Not that important",
                        sourceID: "",
                        extends: "FirstEntityEver",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                            "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                    }],
                    description: "Diagram that shows the relationship of some entities.",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: ""
                },
                {
                    id: 2,
                    name: "Diagram Two",
                    entities: [{
                        id: 1,
                        name: "FirstEntityEver",
                        description: "Description of FirtEntityEver",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                    },
                    {
                        id: 2,
                        name: "BasicEntity",
                        description: "Not that important",
                        sourceID: "",
                        extends: "FirstEntityEver",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                            "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                    }],
                    description: "Diagram that shows the relationship of some entities.",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: ""
                }]);

                return deferred.promise;
            }
        };

        EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
            $scope: scope,
            EntityDiagramService: diagramServiceMock
        });

        // Use $digest to force Angular to resolve the getDiagrams promise.
        scope.$digest();

        expect(scope.status).to.equal("done");
        expect(scope.diagrams).to.be.an("array").and.have.length(2);
    });

    it("should handle failing to load diagrams", function () {
        var diagramServiceMock = {
            getDiagrams: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });

                return deferred.promise;
            }
        };

        EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
            $scope: scope,
            EntityDiagramService: diagramServiceMock
        });

        // Use $digest to force Angular to resolve the getDiagrams promise.
        scope.$digest();

        expect(scope.status).to.equal("error");
        expect(scope.diagrams).to.be.an("array").and.be.empty;
    });

    it("should change selected diagram on $stateChangeStart when switching to view mode of existing diagram",
        function () {
            var diagramServiceMock = {
                getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            var toState = {
                name: "entityManagement.viewDiagram"
            };
            var toParams = {
                id: 1
            };

            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(scope.selectedDiagram).to.equal(1);
        });

    it("should change selected diagram on $stateChangeStart when switching to edit mode of existing diagram",
        function () {
            var diagramServiceMock = {
                getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            var toState = {
                name: "entityManagement.editDiagram"
            };
            var toParams = {
                id: 1
            };

            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(scope.selectedDiagram).to.equal(1);
        });

    it("should change selected diagram on $stateChangeStart when switching to view mode of existing diagram" +
            " with entity details",
        function () {
            var diagramServiceMock = {
                getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            var toState = {
                name: "entityManagement.viewDiagram"
            };
            var toParams = {
                id: 1,
                eid: 1
            };

            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(scope.selectedDiagram).to.equal(1);
        });

    it("should change selected diagram and entity to null on $stateChangeStart when switching to other state",
        function () {
            var diagramServiceMock = {
                getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            var toState = {
                name: "entityManagement"
            };
            var toParams = null;

            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(scope.selectedDiagram).to.be.null;
            expect(scope.selectedEntity).to.be.null;
        });

    it("should change selected diagram and entity to null on $stateChangeStart when switching to missing diagram",
        function () {
            var diagramServiceMock = {
                getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            var toState = {
                name: "entityManagement.viewDiagram"
            };
            var toParams = {
                id: 3
            };

            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(scope.selectedDiagram).to.be.null;
            expect(scope.selectedEntity).to.be.null;
        });

    it("should change selected entity on $stateChangeStart when switching to view mode of existing diagram" +
            " with entity details",
        function () {
            var diagramServiceMock = {
                getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            var toState = {
                name: "entityManagement.viewDiagram.viewEntity"
            };
            var toParams = {
                id: 1,
                eid: 1
            };

            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(scope.selectedEntity).to.equal(1);
        });

    it("should change selected entity to null on $stateChangeStart when switching to missing entity" +
        " with entity details",
        function () {
            var diagramServiceMock = {
                getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            var toState = {
                name: "entityManagement.viewDiagram.viewEntity"
            };
            var toParams = {
                id: 1,
                eid: 3
            };

            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(scope.selectedEntity).to.be.null;
        });

    it("should navigate to the view diagram page when a diagram is selected from the digram list", function () {
        var mockState = {
            current: {
                name: "entityManagement"
            },
            go: sinon.spy()
        };

        var diagramServiceMock = {
             getDiagrams: function () {
                var deferred = q.defer();

                deferred.resolve([{
                    id: 1,
                    name: "Diagram One",
                    entities: [{
                        id: 1,
                        name: "FirstEntityEver",
                        description: "Description of FirtEntityEver",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                    },
                    {
                        id: 2,
                        name: "BasicEntity",
                        description: "Not that important",
                        sourceID: "",
                        extends: "FirstEntityEver",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                            "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                    }],
                    description: "Diagram that shows the relationship of some entities.",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: ""
                },
                {
                    id: 2,
                    name: "Diagram Two",
                    entities: [{
                        id: 1,
                        name: "FirstEntityEver",
                        description: "Description of FirtEntityEver",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                    },
                    {
                        id: 2,
                        name: "BasicEntity",
                        description: "Not that important",
                        sourceID: "",
                        extends: "FirstEntityEver",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: "",
                        schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                            "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                    }],
                    description: "Diagram that shows the relationship of some entities.",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: ""
                }]);

                return deferred.promise;
            }
        };

        EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
            $scope: scope,
            $state: mockState,
            EntityDiagramService: diagramServiceMock
        });

        // Use $digest to force Angular to resolve the getDiagrams promise.
        scope.$digest();

        scope.openDiagram(1);

        expect(mockState.go).to.have.been.calledWith("entityManagement.viewDiagram", {
            id: 1
        });
    });

    it("should navigate to the view diagram page with entity details when an entity is selected from the digram list",
        function () {
            var mockState = {
                current: {
                    name: "entityManagement"
                },
                go: sinon.spy()
            };

            var diagramServiceMock = {
                 getDiagrams: function () {
                    var deferred = q.defer();

                    deferred.resolve([{
                        id: 1,
                        name: "Diagram One",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    },
                    {
                        id: 2,
                        name: "Diagram Two",
                        entities: [{
                            id: 1,
                            name: "FirstEntityEver",
                            description: "Description of FirtEntityEver",
                            sourceID: "",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                        },
                        {
                            id: 2,
                            name: "BasicEntity",
                            description: "Not that important",
                            sourceID: "",
                            extends: "FirstEntityEver",
                            createdAt: "",
                            createdBy: "",
                            updatedAt: "",
                            updatedBy: "",
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    " +
                                "independent Independent NOT NULL,\n    value DECIMAL NOT NULL\n);"
                        }],
                        description: "Diagram that shows the relationship of some entities.",
                        sourceID: "",
                        createdAt: "",
                        createdBy: "",
                        updatedAt: "",
                        updatedBy: ""
                    }]);

                    return deferred.promise;
                }
            };

            EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
                $scope: scope,
                $state: mockState,
                EntityDiagramService: diagramServiceMock
            });

            // Use $digest to force Angular to resolve the getDiagrams promise.
            scope.$digest();

            scope.showEntityDetails(1, 1);

            expect(mockState.go).to.have.been.calledWith("entityManagement.viewDiagram.viewEntity", {
                id: 1,
                eid: 1
            });
        });

    it("should clean up event listeners on $destroy", function () {
        EntityManagementDiagramListCtrl = controller("EntityManagementDiagramListCtrl", {
            $scope: scope
        });

        expect(rootScope.$$listenerCount.$stateChangeStart).to.equal(1);

        scope.$broadcast("$destroy");

        expect(rootScope.$$listenerCount.$stateChangeStart).to.be.undefined;
    });
});
