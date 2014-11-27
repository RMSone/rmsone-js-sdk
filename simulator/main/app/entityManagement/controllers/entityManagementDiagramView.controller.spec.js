"use strict";

describe("Controller: EntityManagementDiagramViewCtrl", function () {

    // Load the controller's module.
    beforeEach(module("adminUiApp"));

    var EntityManagementDiagramViewCtrl;
    var scope;
    var controller;
    var q;

    // Initialize the controller and a mock scope.
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        controller = $controller;
        q = $q;
    }));

    it("should automatically load a diagram", function () {
        var diagramServiceMock = {
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
                             schema: [
                                {
                                     name: "attribute1",
                                     type: "INT"
                                }
                            ]
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

        EntityManagementDiagramViewCtrl = controller("EntityManagementDiagramViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            EntityDiagramService: diagramServiceMock
        });

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(scope.status).to.equal("done");
        expect(scope.diagram).to.contain.keys(["id", "name", "entities"]);
    });

    it("should handle failing to load an diagram", function () {
        var diagramServiceMock = {
            getDiagramById: function () {
                var deferred = q.defer();
                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });
                return deferred.promise;
            }
        };

        EntityManagementDiagramViewCtrl = controller("EntityManagementDiagramViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            EntityDiagramService: diagramServiceMock
        });

        // Use $digest to force Angular to resolve the getDiagramById promise.
        scope.$digest();

        expect(scope.status).to.equal("error");
        expect(scope.diagram).to.be.null;
    });

    it("should handle a missing ID by redirecting to the diagram list view", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementDiagramViewCtrl = controller("EntityManagementDiagramViewCtrl", {
            $scope: scope,
            $stateParams: {},
            $state: mockState
        });

        expect(mockState.go).to.have.been.calledWith("entityManagement");
    });

    it("should redirect to edit diagram screen upon edit", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementDiagramViewCtrl = controller("EntityManagementDiagramViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState
        });

        scope.onEdit();

        expect(mockState.go).to.have.been.calledWith("entityManagement.editDiagram", {
            id: 1
        });
    });

    it("should redirect to diagram list upon successful delete", function () {
        var mockState = {
            go: sinon.spy()
        };

        var diagramServiceMock = {
            deleteDiagram: function () {
                var deferred = q.defer();

                deferred.resolve();

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
                             schema: [
                                {
                                     name: "attribute1",
                                     type: "INT"
                                }
                            ]
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

        var deleteHandler;
        var deleteModalSpy;
        var mockModal = {
            confirm: {
                delete: sinon.spy(function (handler) {
                    deleteHandler = handler;
                    deleteModalSpy = sinon.spy();

                    return deleteModalSpy;
                })
            }
        };

        EntityManagementDiagramViewCtrl = controller("EntityManagementDiagramViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState,
            EntityDiagramService: diagramServiceMock,
            Modal: mockModal
        });

        var deleteDiagramSpy = sinon.spy(diagramServiceMock, "deleteDiagram");

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        scope.onDelete();

        // Simulate accepting the delete modal
        deleteHandler();

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(mockModal.confirm.delete).to.have.been.called;
        expect(deleteHandler).to.not.be.null;
        expect(deleteModalSpy).to.not.be.null;
        expect(deleteModalSpy).to.have.been.calledWith(scope.diagram.name);
        expect(deleteDiagramSpy).to.have.been.calledWith(1);
        expect(mockState.go).to.have.been.calledWith("entityManagement");
    });

    it("should produce an error when a delete fails", function () {
        var mockState = {
            go: sinon.spy()
        };

        var diagramServiceMock = {
            deleteDiagram: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 400,
                    data: "Bad Request: Invalid diagram ID!"
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
                             schema: [
                                {
                                     name: "attribute1",
                                     type: "INT"
                                }
                            ]
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

        var deleteHandler;
        var deleteModalSpy;
        var mockModal = {
            confirm: {
                delete: sinon.spy(function (handler) {
                    deleteHandler = handler;
                    deleteModalSpy = sinon.spy();

                    return deleteModalSpy;
                })
            }
        };

        EntityManagementDiagramViewCtrl = controller("EntityManagementDiagramViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState,
            EntityDiagramService: diagramServiceMock,
            Modal: mockModal
        });

        var deleteDiagramSpy = sinon.spy(diagramServiceMock, "deleteDiagram");

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        scope.onDelete();

        // Simulate accepting the delete modal
        deleteHandler();

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(mockModal.confirm.delete).to.have.been.called;
        expect(deleteHandler).to.not.be.null;
        expect(deleteModalSpy).to.not.be.null;
        expect(deleteModalSpy).to.have.been.calledWith(scope.diagram.name);
        expect(deleteDiagramSpy).to.have.been.calledWith(1);
        expect(scope.error).to.equal("Bad Request: Invalid diagram ID!");
    });

    it("should redirect to view diagram screen with entity details upon clicking an entity", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementDiagramViewCtrl = controller("EntityManagementDiagramViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState
        });

        scope.onSelectEntity(1);

        expect(mockState.go).to.have.been.calledWith("entityManagement.viewDiagram.viewEntity", {
            id: 1,
            eid: 1
        });
    });
});
