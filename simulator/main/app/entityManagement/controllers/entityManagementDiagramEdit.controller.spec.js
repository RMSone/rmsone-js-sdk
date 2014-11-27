"use strict";

describe("Controller: EntityManagementDiagramEditCtrl", function () {

    // Load the controller's module.
    beforeEach(module("adminUiApp"));

    var EntityManagementDiagramEditCtrl;
    var scope;
    var controller;
    var q;

    // Initialize the controller and a mock scope.
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        controller = $controller;
        q = $q;
    }));

    it("should produce an error if the name is an empty string", function () {
        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope
        });

        scope.diagram = {
            name: "",
            entities: [],
            sourceID: "",
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        };

        scope.onEdit();

        expect(scope.error).to.equal("Please enter diagram name!");
    });

    it("should produce an error if no entity is selected", function () {
        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope
        });

        scope.diagram = {
            name: "Diagram",
            entities: [],
            sourceID: "",
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        };

        scope.onEdit();

        expect(scope.error).to.equal("Please select an entity!");
    });

    it("should update the diagram and redirect to the diagram view page", function () {
        var mockState = {
            go: sinon.spy()
        };

        var editedDiagram;

        var entityServiceMock = {
            getEntities: function () {
                var deferred = q.defer();

                deferred.resolve([{
                    id: 1,
                    name: "FirstEntityEver",
                    description: "Description of FirtEntityEver",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                }, {
                    id: 2,
                    name: "BasicEntity",
                    description: "Not that important",
                    sourceID: "",
                    extends: "FirstEntityEver",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL,\n" +
                        "    value DECIMAL NOT NULL\n);"
                }]);

                return deferred.promise;
            }
        };
        var entityDiagramServiceMock = {
            editDiagram: function (id, diagram) {
                var deferred = q.defer();

                editedDiagram = diagram;
                deferred.resolve(diagram);

                return deferred.promise;
            },
            getDiagramById: function () {
                var deferred = q.defer();

                deferred.resolve({
                    id: 1,
                    name: "Diagram One",
                    entities: [
                        {
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
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL," +
                                "\n    value DECIMAL NOT NULL\n);"
                        }
                    ],
                    description: "Diagram that shows the relationship of some entities.",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: ""
                });

                return deferred.promise;
            }
        };

        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope,
            $state: mockState,
            $stateParams: {
                id: 1
            },
            EntityDiagramService: entityDiagramServiceMock,
            EntityService: entityServiceMock
        });

        var editDiagramSpy = sinon.spy(entityDiagramServiceMock, "editDiagram");

        // Use $digest to force Angular to resolve the getEntities and getDiagramById promises.
        scope.$digest();

        scope.diagram.name = "ChangedName";
        scope.onEdit();

        // Use $digest to force Angular to resolve the editDiagram promise.
        scope.$digest();

        expect(editDiagramSpy).to.have.been.called;
        expect(editedDiagram).to.be.an("object").that.deep.equals({
            id: 1,
            name: "ChangedName",
            entities: [
                {
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
                    schema: "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL," +
                        "\n    value DECIMAL NOT NULL\n);"
                }
            ],
            description: "Diagram that shows the relationship of some entities.",
            sourceID: "",
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        });
        expect(mockState.go).to.have.been.calledWith("entityManagement.viewDiagram", {
            id: 1
        });
    });

    it("should produce an error when diagram update fails", function () {
        var entityServiceMock = {
            getEntities: function () {
                var deferred = q.defer();

                deferred.resolve([{
                    id: 1,
                    name: "FirstEntityEver",
                    description: "Description of FirtEntityEver",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                }, {
                    id: 2,
                    name: "BasicEntity",
                    description: "Not that important",
                    sourceID: "",
                    extends: "FirstEntityEver",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL,\n" +
                        "    value DECIMAL NOT NULL\n);"
                }]);

                return deferred.promise;
            }
        };
        var entityDiagramServiceMock = {
            editDiagram: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });

                return deferred.promise;
            },
            getDiagramById: function () {
                var deferred = q.defer();

                deferred.resolve({
                    id: 1,
                    name: "Diagram One",
                    entities: [
                        {
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
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL," +
                                "\n    value DECIMAL NOT NULL\n);"
                        }
                    ],
                    description: "Diagram that shows the relationship of some entities.",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: ""
                });

                return deferred.promise;
            }
        };

        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope,
            EntityDiagramService: entityDiagramServiceMock,
            EntityService: entityServiceMock,
            $stateParams: {
                id: 1
            }
        });

        var editDiagramSpy = sinon.spy(entityDiagramServiceMock, "editDiagram");

        // Use $digest to force Angular to resolve the getEntities and getDiagramById promises.
        scope.$digest();

        scope.diagram.name = "FirstEntityEverRR";
        scope.onEdit();

        // Use $digest to force Angular to resolve the editDiagram promise.
        scope.$digest();

        expect(editDiagramSpy).to.have.been.called;
        expect(scope.error).to.equal("Editing diagram failed!");
    });

    it("should redirect to diagram details upon cancel", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState
        });

        scope.onCancel();

        expect(mockState.go).to.have.been.calledWith("entityManagement.viewDiagram", {
            id: 1
        });
    });

    it("should handle a missing ID by redirecting to the diagram list view", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope,
            $stateParams: {},
            $state: mockState
        });

        expect(mockState.go).to.have.been.calledWith("entityManagement");
    });

    it("should handle failing to load a diagram", function () {
        var entityServiceMock = {
            getEntities: function () {
                var deferred = q.defer();

                deferred.resolve([{
                    id: 1,
                    name: "FirstEntityEver",
                    description: "Description of FirtEntityEver",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                }, {
                    id: 2,
                    name: "BasicEntity",
                    description: "Not that important",
                    sourceID: "",
                    extends: "FirstEntityEver",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL,\n" +
                        "    value DECIMAL NOT NULL\n);"
                }]);

                return deferred.promise;
            }
        };
        var entityDiagramServiceMock = {
            getDiagramById: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });

                return deferred.promise;
            }
        };

        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            EntityDiagramService: entityDiagramServiceMock,
            EntityService: entityServiceMock
        });

        // Use $digest to force Angular to resolve the getEntities and getDiagramById promises.
        scope.$digest();

        expect(scope.status).to.equal("error");
    });

    it("should handle failing to load entities", function () {
        var entityServiceMock = {
            getEntities: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });

                return deferred.promise;
            }
        };
        var entityDiagramServiceMock = {
            getDiagramById: function () {
                var deferred = q.defer();

                deferred.resolve({
                    id: 1,
                    name: "Diagram One",
                    entities: [
                        {
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
                            schema: "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL," +
                                "\n    value DECIMAL NOT NULL\n);"
                        }
                    ],
                    description: "Diagram that shows the relationship of some entities.",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: ""
                });

                return deferred.promise;
            }
        };

        EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            EntityDiagramService: entityDiagramServiceMock,
            EntityService: entityServiceMock
        });

        // Use $digest to force Angular to resolve the getEntities and getDiagramById promises.
        scope.$digest();

        expect(scope.error).to.equal("Error loading entities!");
        expect(scope.entities).to.be.empty;
    });

    describe("Method: entityIsSelected", function () {
        it("should return false when no entity is selected", function () {
            EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
                $scope: scope
            });

            scope.diagram = {
                id: 1,
                name: "Diagram One",
                entities: [],
                description: "Diagram that shows the relationship of some entities.",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: ""
            };

            var entity = {
                id: 4,
                name: "FirstEntityEver",
                description: "Description of FirtEntityEver",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: "",
                schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
            };

            expect(scope.entityIsSelected(entity)).to.be.false;
        });

        it("should return true when an entity is selected", function () {
            EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
                $scope: scope
            });

            scope.diagram = {
                id: 1,
                name: "Diagram One",
                entities: [
                {
                    id: 1,
                    name: "FirstEntityEver",
                    description: "Description of FirtEntityEver",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                }],
                description: "Diagram that shows the relationship of some entities.",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: ""
            };

            var entity = {
                id: 1,
                name: "FirstEntityEver",
                description: "Description of FirtEntityEver",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: "",
                schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
            };

            expect(scope.entityIsSelected(entity)).to.be.true;
        });
    });

    describe("Method: onAddRemoveEntity", function () {
        it("should add the selected entity if it is not in the array", function () {
            EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
                $scope: scope
            });

            scope.diagram = {
                id: 1,
                name: "Diagram One",
                entities: [
                {
                    id: 1,
                    name: "FirstEntityEver",
                    description: "Description of FirtEntityEver",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
                }],
                description: "Diagram that shows the relationship of some entities.",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: ""
            };

            var element = {
                id: 2,
                name: "FirstEntityEver",
                description: "Description of FirtEntityEver",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: "",
                schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
            };

            expect(scope.diagram.entities).to.be.an("array").and.have.length(1);

            scope.onAddRemoveEntity(element);

            expect(scope.diagram.entities).to.be.an("array").and.have.length(2);
        });

        it("should remove the selected entity if it is in the array", function () {
            EntityManagementDiagramEditCtrl = controller("EntityManagementDiagramEditCtrl", {
                $scope: scope
            });

            scope.diagram = {
                id: 1,
                name: "Diagram One",
                entities: [
                {
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
            };

            var element = {
                id: 2,
                name: "FirstEntityEver",
                description: "Description of FirtEntityEver",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: "",
                schema: "FirstEntityEver (\n    size INT NOT NULL\n)"
            };

            expect(scope.diagram.entities).to.be.an("array").and.have.length(2);

            scope.onAddRemoveEntity(element);

            expect(scope.diagram.entities).to.be.an("array").and.have.length(1);
        });
    });
});
