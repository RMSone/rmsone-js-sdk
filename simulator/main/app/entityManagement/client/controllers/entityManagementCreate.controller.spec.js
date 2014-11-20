"use strict";

describe("Controller: EntityManagementCreateCtrl", function () {

    // load the controller's module
    beforeEach(module("adminUiApp"));

    var EntityManagementCreateCtrl; 
    var scope;
    var controller;
    var q;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        controller = $controller;
        q = $q;
    }));

	it("should produce an error if the RAL command is an empty string", function (){
		EntityManagementCreateCtrl = controller("EntityManagementCreateCtrl", {
            $scope: scope
        });
        
		scope.definition = "";
		scope.onCreate();
		
		expect(scope.error).to.equal("Invalid RAL command!");
	});

	it("should produce an error if the RAL command does not start with \"CREATE ENTITY\"", function (){
		EntityManagementCreateCtrl = controller("EntityManagementCreateCtrl", {
            $scope: scope
        });
        
		scope.definition = "bad string";
		scope.onCreate();
		
		expect(scope.error).to.equal("Invalid RAL command!");
	});
	
	it("should produce an error if the RAL command starts with \"CREATE ENTITY\" " +
        "but is not followed by the entity definition", function (){
		EntityManagementCreateCtrl = controller("EntityManagementCreateCtrl", {
            $scope: scope
        });
        
		scope.definition = "CREATE ENTITY";
		scope.onCreate();
		
		expect(scope.error).to.equal("Invalid RAL command!");
	});
	
	it("should create an entity without EXTENDS and redirect to the entity view page", function (){
		var mockState = {
            go: sinon.spy()
        };
        
        var createdEntity;
        var entityServiceMock = {
	 		createEntity: function (entity) {
	 			var deferred = q.defer();
	 			
	 			entity.id = 1;
	 			createdEntity = entity;
	 			deferred.resolve(entity);
	 			
	            return deferred.promise;
	 		}
	 	};
		
		EntityManagementCreateCtrl = controller("EntityManagementCreateCtrl", {
            $scope: scope,
            $state: mockState,
            EntityManagementService: entityServiceMock
        });
        
        var createEntitySpy = sinon.spy(entityServiceMock, "createEntity");
        
		scope.definition = "CREATE ENTITY FirstEntityEver ( size INT NOT NULL )";
		scope.onCreate();
		
		// Use $digest to force Angular to resolve the promise
        scope.$digest();
		
		expect(createEntitySpy).to.have.been.called;
		expect(createdEntity).to.be.an("object").that.deep.equals({
			id: 1,
			name: "FirstEntityEver",
			schema: "FirstEntityEver ( size INT NOT NULL )"
		});
		expect(mockState.go).to.have.been.calledWith("entityManagement.viewEntity", {
            id : 1
        });
	});
	
	it("should create an entity with EXTENDS and redirect to the entity view page", function (){
		var mockState = {
            go: sinon.spy()
        };
        
        var createdEntity;
        var entityServiceMock = {
	 		createEntity: function (entity) {
	 			var deferred = q.defer();
	 			
	 			entity.id = 1;
	 			createdEntity = entity;
	 			deferred.resolve(entity);
	 			
	            return deferred.promise;
	 		}
	 	};
		
		EntityManagementCreateCtrl = controller("EntityManagementCreateCtrl", {
            $scope: scope,
            $state: mockState,
            EntityManagementService: entityServiceMock
        });
        
        var createEntitySpy = sinon.spy(entityServiceMock, "createEntity");
        
		scope.definition = "CREATE ENTITY FirstEntityEver EXTENDS RootEntity ( size INT NOT NULL )";
		scope.onCreate();
		
		// Use $digest to force Angular to resolve the promise
        scope.$digest();
		
		expect(createEntitySpy).to.have.been.called;
		expect(createdEntity).to.be.an("object").that.deep.equals({
			id: 1,
			name: "FirstEntityEver",
			extends: "RootEntity",
			schema: "FirstEntityEver EXTENDS RootEntity ( size INT NOT NULL )"
		});
		expect(mockState.go).to.have.been.calledWith("entityManagement.viewEntity", {
            id : 1
        });
	});

	it("should produce an error when entity creation fails", function (){
        var entityServiceMock = {
	 		createEntity: function () {
	 			var deferred = q.defer();
	 			
	 			deferred.reject({
                    status: 500,
                    data: "Internal Server Error!"
                });
	 			
	            return deferred.promise;
	 		}
	 	};
		
		EntityManagementCreateCtrl = controller("EntityManagementCreateCtrl", {
            $scope: scope,
            EntityManagementService: entityServiceMock
        });
        
        var createEntitySpy = sinon.spy(entityServiceMock, "createEntity");
        
		scope.definition = "CREATE ENTITY FirstEntityEver ( size INT NOT NULL )";
		scope.onCreate();
		
		// Use $digest to force Angular to resolve the promise
        scope.$digest();
		
		expect(createEntitySpy).to.have.been.called;
		expect(scope.error).to.equal("Entity creation failed!");
	});
	
    it("should redirect to entity list view upon cancel", function () {
        var mockState = {
            go: sinon.spy()
        };
        
        EntityManagementCreateCtrl = controller("EntityManagementCreateCtrl", {
            $scope: scope,
            $state: mockState
        });

		scope.onCancel();
		
		expect(mockState.go).to.have.been.calledWith("entityManagement");
    });
});
