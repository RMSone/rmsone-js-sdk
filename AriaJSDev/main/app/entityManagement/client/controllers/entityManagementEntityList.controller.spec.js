"use strict";

describe("Controller: EntityManagementEntityListCtrl", function () {
    // load the controller's module
    beforeEach(module("adminUiApp"));

    var EntityManagementEntityListCtrl; 
    var scope;
    var controller;
    var q;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        controller = $controller;
        q = $q;
    }));

	 it("should load list of entites", function () {
	 	var entityServiceMock = {
	 		getEntities: function() {
		 			var deferred = q.defer();
		 			deferred.resolve([{
		                "id" : "1",
		                "name" : "FirstEntityEver",
		                "description" : "Description of FirtEntityEver",
		                "sourceID" : "",
		                "createdAt" : "",
		                "createdBy" : "",
		                "updatedAt" : "",
		                "updatedBy" : "",
		                "schema" : "FirstEntityEver (\n    size INT NOT NULL\n)"
		            }, {
		                "id" : "2",
		                "name" : "BasicEntity",
		                "description" : "Not that important",
		                "sourceID" : "",
		                "extends" : "FirstEntityEver",
		                "createdAt" : "",
		                "createdBy" : "",
		                "updatedAt" : "",
		                "updatedBy" : "",
		                "schema" : "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL,\n" +
                            "    value DECIMAL NOT NULL\n);"
		            }, {
		                "id" : "3",
		                "name" : "ComplexEntity",
		                "description" : "Most important entity",
		                "sourceID" : "",
		                "extends" : "BasicEntity",
		                "createdAt" : "",
		                "createdBy" : "",
		                "updatedAt" : "",
		                "updatedBy" : "",
		                "schema" : "ComplexEntity EXTENDS BasicEntity (\n    complexity STRING NOT NULL\n);"
		            }, {
		                "id" : "4",
		                "name" : "Independent",
		                "description" : "Description of an independent entity",
		                "sourceID" : "",
		                "createdAt" : "",
		                "createdBy" : "",
		                "updatedAt" : "",
		                "updatedBy" : "",
		                "schema" : "Independent (\n    value DECIMAL NOT NULL\n);"
		            }]);
	            return deferred.promise;
	 		}
	 	};
	 	
	 	EntityManagementEntityListCtrl = controller("EntityManagementEntityListCtrl", {
        	$scope: scope,
        	EntityManagementService : entityServiceMock
        });
        
        // Use $digest to force Angular to resolve the promise
        scope.$digest();
        
        expect(scope.status).to.equal("done");
        expect(scope.entities).to.be.an("array").and.have.length(4);  	
	 });

    it("should handle failing to load entities", function () {
        var entityServiceMock = {
            getEntities: function() {
                var deferred = q.defer();
                deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });
                return deferred.promise;
            }
        };
        
        EntityManagementEntityListCtrl = controller("EntityManagementEntityListCtrl", {
        	$scope: scope,
        	EntityManagementService : entityServiceMock
        });
        
        // Use $digest to force Angular to resolve the promise
        scope.$digest();
        
        expect(scope.status).to.equal("error");    
        expect(scope.entities).to.be.an("array").and.be.empty;    
    });
});
