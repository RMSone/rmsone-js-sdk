"use strict";

describe("Controller: EntityManagementViewCtrl", function () {

    // load the controller's module
    beforeEach(module("adminUiApp"));

    var EntityManagementViewCtrl;
    var scope;
    var controller;
    var q;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        controller = $controller;
        q = $q;
    }));

    it("should automatically load an entity", function () {
        var entityServiceMock = {
            getEntityById: function () {
                var deferred = q.defer();
                deferred.resolve({
                    id: 1,
                    name: "New Test Entity",
                    description: "Description of New Test Entity",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "NewTestEntity (\n    size INT NOT NULL\n)"
                });
                return deferred.promise;
            }
        };

        EntityManagementViewCtrl = controller("EntityManagementViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            EntityService: entityServiceMock
        });

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(scope.status).to.equal("done");
        expect(scope.entity).to.contain.keys(["id", "name", "schema"]);
    });

    it("should handle failing to load an entity", function () {
        var entityServiceMock = {
            getEntityById: function () {
                var deferred = q.defer();
                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });
                return deferred.promise;
            }
        };

        EntityManagementViewCtrl = controller("EntityManagementViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            EntityService: entityServiceMock
        });

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(scope.status).to.equal("error");
        expect(scope.entity).to.be.null;
    });

    it("should handle a missing ID by redirecting to the entity list view", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementViewCtrl = controller("EntityManagementViewCtrl", {
            $scope: scope,
            $stateParams: {},
            $state: mockState
        });

        expect(mockState.go).to.have.been.calledWith("entityManagement");
    });

    it("should redirect to edit entity screen upon edit", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementViewCtrl = controller("EntityManagementViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState
        });

        scope.onEdit();

        expect(mockState.go).to.have.been.calledWith("entityManagement.editEntity", {
            id: 1
        });

    });

    it("should redirect to entity list upon successful delete", function () {
        var mockState = {
            go: sinon.spy()
        };

        var entityServiceMock = {
            deleteEntity: function () {
                var deferred = q.defer();

                deferred.resolve();

                return deferred.promise;
            },
            getEntityById: function () {
                var deferred = q.defer();
                deferred.resolve({
                    id: 1,
                    name: "New Test Entity",
                    description: "Description of New Test Entity",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "NewTestEntity (\n    size INT NOT NULL\n)"
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

        EntityManagementViewCtrl = controller("EntityManagementViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState,
            EntityService: entityServiceMock,
            Modal: mockModal
        });

        var deleteEntitySpy = sinon.spy(entityServiceMock, "deleteEntity");

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
        expect(deleteModalSpy).to.have.been.calledWith(scope.entity.name);
        expect(deleteEntitySpy).to.have.been.calledWith(1);
        expect(mockState.go).to.have.been.calledWith("entityManagement");
    });

    it("should produce an error when a delete fails", function () {
        var mockState = {
            go: sinon.spy()
        };

        var entityServiceMock = {
            deleteEntity: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 400,
                    data: "Bad Request: Invalid entity ID!"
                });

                return deferred.promise;
            },
            getEntityById: function () {
                var deferred = q.defer();
                deferred.resolve({
                    id: 1,
                    name: "New Test Entity",
                    description: "Description of New Test Entity",
                    sourceID: "",
                    createdAt: "",
                    createdBy: "",
                    updatedAt: "",
                    updatedBy: "",
                    schema: "NewTestEntity (\n    size INT NOT NULL\n)"
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

        EntityManagementViewCtrl = controller("EntityManagementViewCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState,
            EntityService: entityServiceMock,
            Modal: mockModal
        });

        var deleteEntitySpy = sinon.spy(entityServiceMock, "deleteEntity");

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
        expect(deleteModalSpy).to.have.been.calledWith(scope.entity.name);
        expect(deleteEntitySpy).to.have.been.calledWith(1);
        expect(scope.error).to.equal("Bad Request: Invalid entity ID!");
    });

});
