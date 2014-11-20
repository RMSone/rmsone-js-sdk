"use strict";

describe("Service: EntityManagementService", function() {

    // load the service's module
    beforeEach(module("adminUiApp"));

    // instantiate service
    var EntityManagementService;
    var scope;
    var httpBackend;

    beforeEach(inject(function(_EntityManagementService_, $rootScope, $httpBackend) {
        EntityManagementService = _EntityManagementService_;
        scope = $rootScope;
        httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe("Method: getEntities", function () {
        it("should be resolved to an array with 4 elements", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond([{
                "id" : "1",
                "name" : "FirstEntityEver",
                "description" : "Description of FirstEntityEver",
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

            var promise = EntityManagementService.getEntities();

            expect(promise).to.be.fulfilled;
            expect(promise).to.eventually.be.an("array").and.have.length(4);

            httpBackend.flush();
        });

        it("should be resolved to an empty array on no data", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond([]);

            var promise = EntityManagementService.getEntities();

            expect(promise).to.be.fulfilled;
            expect(promise).to.eventually.be.an("array").and.be.empty;

            httpBackend.flush();
        });

        it("should be rejected on server error", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond(500, "Internal Server Error!");

            var promise = EntityManagementService.getEntities();

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });
    });

    describe("Method: getEntityById", function () {
        it("should be rejected with a status 400 when no ID is supplied", function() {
            var promise = EntityManagementService.getEntityById();

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);
        });
        
        it("should be resolved with a single data object", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond([{
                "id" : "1",
                "name" : "FirstEntityEver",
                "description" : "Description of FirstEntityEver",
                "sourceID" : "",
                "createdAt" : "",
                "createdBy" : "",
                "updatedAt" : "",
                "updatedBy" : "",
                "schema" : "FirstEntityEver (\n    size INT NOT NULL\n)"
            }]);

            var promise = EntityManagementService.getEntityById(1);

            expect(promise).to.be.fulfilled.and.eventually.contain.keys(["id", "name", "schema"]);
            

            httpBackend.flush();
        });

        it("should be rejected with a status 400 when an invalid ID is supplied", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond([{
                "id" : "1",
                "name" : "FirstEntityEver",
                "description" : "Description of FirstEntityEver",
                "sourceID" : "",
                "createdAt" : "",
                "createdBy" : "",
                "updatedAt" : "",
                "updatedBy" : "",
                "schema" : "FirstEntityEver (\n    size INT NOT NULL\n)"
            }]);

            var promise = EntityManagementService.getEntityById(2);

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);


            httpBackend.flush();
        });
        
        it("should be rejected on server error", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond(500, "Internal Server Error!");

            var promise = EntityManagementService.getEntityById(1);

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });    
    });
    
    describe("Method: createEntity", function () {
        it("should be rejected with a status 400 when bad data is supplied", function() {
            var promise = EntityManagementService.createEntity({bad: "data", name: "bad data"});

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);
        });
        
        it("should be resolved with then new data object", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond([{
                "id" : "1",
                "name" : "New Test Entity",
                "description" : "Description of New Test Entity",
                "sourceID" : "",
                "createdAt" : "",
                "createdBy" : "",
                "updatedAt" : "",
                "updatedBy" : "",
                "schema" : "NewTestEntity (\n    size INT NOT NULL\n)"
            }]);

            var promise = EntityManagementService.createEntity({
                name: "New Test Entity",
                schema: "NewTestEntity (\n    size INT NOT NULL\n)"
            });

            expect(promise).to.be.fulfilled.and.eventually.contain.keys(["id", "name", "schema"]);
            

            httpBackend.flush();
        });
        
        it("should be rejected on server error", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond(500, "Internal Server Error!");

            var promise = EntityManagementService.createEntity({
                name: "New Test Entity",
                schema: "NewTestEntity (\n    size INT NOT NULL\n)"
            });

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });    
    });
    
    describe("Caching", function () {
        it("should return the same data object upon second loading", function() {
            httpBackend.when("GET", "mockdata/entities.json").respond([{
                "id" : "1",
                "name" : "FirstEntityEver",
                "description" : "Description of FirstEntityEver",
                "sourceID" : "",
                "createdAt" : "",
                "createdBy" : "",
                "updatedAt" : "",
                "updatedBy" : "",
                "schema" : "FirstEntityEver (\n    size INT NOT NULL\n)"
            }]);
            
            var firstPromise = EntityManagementService.getEntities();
            
            firstPromise.then(function(data){
               var secondPromise = EntityManagementService.getEntities();
               expect(secondPromise).to.be.fulfilled.and.to.eventually.equal(data);
            });
            
            expect(firstPromise).to.be.fulfilled;
            
            httpBackend.flush();
        });
    });
});
