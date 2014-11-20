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

    it("should automatically load an entity", function() {       
        var entityServiceMock = {
            getEntityById: function(){
                var deferred = q.defer();
                deferred.resolve({
                    "id" : "1",
                    "name" : "New Test Entity",
                    "description" : "Description of New Test Entity",
                    "sourceID" : "",
                    "createdAt" : "",
                    "createdBy" : "",
                    "updatedAt" : "",
                    "updatedBy" : "",
                    "schema" : "NewTestEntity (\n    size INT NOT NULL\n)"
                });
                return deferred.promise;
            }
        };
        
        EntityManagementViewCtrl = controller("EntityManagementViewCtrl", {
            $scope: scope,
            $stateParams: {id: 1},
            EntityManagementService: entityServiceMock
        });
        
        // Use $digest to force Angular to resolve the promise
        scope.$digest();
        
        expect(scope.status).to.equal("done");    
        expect(scope.entity).to.contain.keys(["id", "name", "schema"]);
    });
    
    it("should handle failing to load an entity", function() {
        var entityServiceMock = {
            getEntityById: function(){
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
            $stateParams: {id: 1},
            EntityManagementService: entityServiceMock
        });
        
        // Use $digest to force Angular to resolve the promise
        scope.$digest();
        
        expect(scope.status).to.equal("error");    
        expect(scope.entity).to.be.null;
    });
    
    it("should handle a missing ID by redirecting to the entity list view", function() {
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
});
