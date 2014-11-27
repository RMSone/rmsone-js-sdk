"use strict";

describe("Controller: EntityManagementEditCtrl", function () {

    // load the controller's module
    beforeEach(module("adminUiApp"));

    var EntityManagementEditCtrl;
    var scope;
    var controller;
    var q;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        controller = $controller;
        q = $q;
    }));

    it("should produce an error if the RAL command is an empty string", function () {
        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope
        });

        scope.definition = "";
        scope.onEdit();

        expect(scope.error).to.equal("Invalid RAL command!");
    });

    it("should produce an error if the RAL command does not start with \"UPDATE ENTITY\"", function () {
        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope
        });

        scope.definition = "bad string";
        scope.onEdit();

        expect(scope.error).to.equal("Invalid RAL command!");
    });

    it("should produce an error if the RAL command starts with \"UPDATE ENTITY\" " +
        "but is not followed by the entity definition", function () {

        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope
        });

        scope.definition = "UPDATE ENTITY";
        scope.onEdit();

        expect(scope.error).to.equal("Invalid RAL command!");
    });

    it("should update an entity without EXTENDS and redirect to the entity view page", function () {
        var mockState = {
            go: sinon.spy()
        };

        var editedEntity;
        var entityServiceMock = {
            editEntity: function (id, entity) {
                var deferred = q.defer();

                entity.id = id;
                editedEntity = entity;
                deferred.resolve(entity);

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

        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope,
            $state: mockState,
            $stateParams: {
                id: 1
            },
            EntityService: entityServiceMock
        });

        var editEntitySpy = sinon.spy(entityServiceMock, "editEntity");

        scope.definition = "UPDATE ENTITY FirstEntityEver ( size DECIMAL NOT NULL )";
        scope.onEdit();

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(editEntitySpy).to.have.been.called;
        expect(editedEntity).to.be.an("object").that.deep.equals({
            id: 1,
            name: "FirstEntityEver",
            schema: "FirstEntityEver ( size DECIMAL NOT NULL )"
        });
        expect(mockState.go).to.have.been.calledWith("entityManagement.viewEntity", {
            id: 1
        });
    });

    it("should update an entity with EXTENDS and redirect to the entity view page", function () {
        var mockState = {
            go: sinon.spy()
        };

        var editedEntity;
        var entityServiceMock = {
            editEntity: function (id, entity) {
                var deferred = q.defer();

                entity.id = id;
                editedEntity = entity;
                deferred.resolve(entity);

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

        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope,
            $state: mockState,
            $stateParams: {
                id: 1
            },
            EntityService: entityServiceMock
        });

        var editEntitySpy = sinon.spy(entityServiceMock, "editEntity");

        scope.definition = "UPDATE ENTITY FirstEntityEver EXTENDS RootEntity ( size DECIMAL NOT NULL )";
        scope.onEdit();

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(editEntitySpy).to.have.been.called;
        expect(editedEntity).to.be.an("object").that.deep.equals({
            id: 1,
            name: "FirstEntityEver",
            extends: "RootEntity",
            schema: "FirstEntityEver EXTENDS RootEntity ( size DECIMAL NOT NULL )"
        });
        expect(mockState.go).to.have.been.calledWith("entityManagement.viewEntity", {
            id: 1
        });
    });

    it("should produce an error when entity update fails", function () {
        var entityServiceMock = {
            editEntity: function () {
                var deferred = q.defer();

                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
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

        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope,
            EntityService: entityServiceMock,
            $stateParams: {
                id: 1
            }
        });

        var editEntitySpy = sinon.spy(entityServiceMock, "editEntity");

        scope.definition = "UPDATE ENTITY FirstEntityEver ( size INT NOT NULL )";
        scope.onEdit();

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(editEntitySpy).to.have.been.called;
        expect(scope.error).to.equal("Entity update failed!");
    });

    it("should redirect to entity details upon cancel", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            $state: mockState
        });

        scope.onCancel();

        expect(mockState.go).to.have.been.calledWith("entityManagement.viewEntity", {
            id: 1
        });
    });

    it("should handle a missing ID by redirecting to the entity list view", function () {
        var mockState = {
            go: sinon.spy()
        };

        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope,
            $stateParams: {},
            $state: mockState
        });

        expect(mockState.go).to.have.been.calledWith("entityManagement");
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

        EntityManagementEditCtrl = controller("EntityManagementEditCtrl", {
            $scope: scope,
            $stateParams: {
                id: 1
            },
            EntityService: entityServiceMock
        });

        // Use $digest to force Angular to resolve the promise
        scope.$digest();

        expect(scope.error).to.equal("Error loading entity!");
        expect(scope.definition).to.be.empty;
    });
});
