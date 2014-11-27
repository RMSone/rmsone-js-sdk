"use strict";

describe("Controller: EntityManagementDiagramCreateCtrl", function () {

    // Load the controller's module.
    beforeEach(module("adminUiApp"));

    var EntityManagementDiagramCreateCtrl;
    var scope;
    var controller;
    var q;

    // Initialize the controller and a mock scope.
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        controller = $controller;
        q = $q;
    }));

    it("should produce an error if the diagram name is an empty string", function () {
        EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
            $scope: scope
        });

        scope.diagram.name = "";
        scope.onCreate();

        expect(scope.error).to.equal("Please enter diagram name!");
    });

    it("should produce an error if no entity is selected", function () {
        EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
            $scope: scope
        });

        scope.diagram.name = "Name";
        scope.diagram.entities = [];
        scope.onCreate();

        expect(scope.error).to.equal("Please select an entity!");
    });

    it("should create a diagram and redirect to the diagram view page", function () {
        var mockState = {
            go: sinon.spy()
        };

        var createdDiagram;
        var entityDiagramServiceMock = {
            createDiagram: function (diagram) {
                var deferred = q.defer();

                diagram.id = 1;
                createdDiagram = diagram;
                deferred.resolve(diagram);

                return deferred.promise;
            }
        };
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

        EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
            $scope: scope,
            $state: mockState,
            EntityDiagramService: entityDiagramServiceMock,
            EntityService: entityServiceMock
        });

        var createDiagramSpy = sinon.spy(entityDiagramServiceMock, "createDiagram");

        scope.diagram.name = "Diagram Name";
        scope.diagram.entities = [{
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
        }];

        // Use $digest to force Angular to resolve the getEntities promise.
        scope.$digest();

        scope.onCreate();

        // Use $digest to force Angular to resolve the createDiagram promise.
        scope.$digest();

        expect(createDiagramSpy).to.have.been.called;
        expect(createdDiagram).to.be.an("object").that.deep.equals({
            id: 1,
            name: "Diagram Name",
            entities: [{
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
            }]
        });
        expect(mockState.go).to.have.been.calledWith("entityManagement.viewDiagram", {
            id: 1
        });
    });

    it("should produce an error when diagram creation fails", function () {
        var entityDiagramServiceMock = {
            createDiagram: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });

                return deferred.promise;
            }
        };
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

        EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
            $scope: scope,
            EntityDiagramService: entityDiagramServiceMock,
            EntityService: entityServiceMock
        });

        var createDiagramSpy = sinon.spy(entityDiagramServiceMock, "createDiagram");

        scope.diagram = {
            name: "Diagram One",
            entities: [{
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
            }]
        };

        // Use $digest to force Angular to resolve the getEntities promise.
        scope.$digest();

        scope.onCreate();

        // Use $digest to force Angular to resolve the createDiagram promise.
        scope.$digest();

        expect(createDiagramSpy).to.have.been.called;
        expect(scope.error).to.equal("Diagram creation failed!");
    });

    it("should redirect to diagram list view upon cancel", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
            $scope: scope,
            $state: mockState
        });

        scope.onCancel();

        expect(mockState.go).to.have.been.calledWith("entityManagement");
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

        EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
            $scope: scope,
            EntityService: entityServiceMock
        });

        // Use $digest to force Angular to resolve the getEntities promise.
        scope.$digest();

        expect(scope.status).to.equal("error");
        expect(scope.diagram.entities).to.be.an("array").and.be.empty;
    });

    describe("Method: entityIsSelected", function () {
        it("should return false when no entity is selected", function () {
            EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
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
            EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
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
            EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
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
            EntityManagementDiagramCreateCtrl = controller("EntityManagementDiagramCreateCtrl", {
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
