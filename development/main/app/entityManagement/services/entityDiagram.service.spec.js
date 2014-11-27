"use strict";

describe("Service: EntityDiagramService", function () {

    // Load the service's module.
    beforeEach(module("adminUiApp"));

    // Instantiate service.
    var EntityDiagramService;
    var scope;
    var httpBackend;

    beforeEach(inject(function (_EntityDiagramService_, $rootScope, $httpBackend) {
        EntityDiagramService = _EntityDiagramService_;
        scope = $rootScope;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe("Method: getDiagrams", function () {
        it("should be resolved to an array with 2 elements", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            },
            {
                id: 2,
                name: "Diagram Two",
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
                description: "This is the second diagram from the list.",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: ""
            }]);

            var promise = EntityDiagramService.getDiagrams();

            expect(promise).to.be.fulfilled;
            expect(promise).to.eventually.be.an("array").and.have.length(2);

            httpBackend.flush();
        });

        it("should be resolved to an empty array on no data", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([]);

            var promise = EntityDiagramService.getDiagrams();

            expect(promise).to.be.fulfilled;
            expect(promise).to.eventually.be.an("array").and.be.empty;

            httpBackend.flush();
        });

        it("should be rejected on server error", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond(500, "Internal Server Error!");

            var promise = EntityDiagramService.getDiagrams();

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });
    });

    describe("Method: getDiagramById", function () {
        it("should be rejected with a status 400 when no ID is supplied", function () {
            var promise = EntityDiagramService.getDiagramById();

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);
        });

        it("should be resolved with a single data object", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var promise = EntityDiagramService.getDiagramById(1);

            expect(promise).to.be.fulfilled.and.eventually.contain.keys(["id", "name", "entities"]);

            httpBackend.flush();
        });

        it("should be rejected with a status 400 when an invalid ID is supplied", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var promise = EntityDiagramService.getDiagramById(2);

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);

            httpBackend.flush();
        });

        it("should be rejected on server error", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond(500, "Internal Server Error!");

            var promise = EntityDiagramService.getDiagramById(1);

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });
    });

    describe("Method: createDiagram", function () {
        it("should be rejected with a status 400 when bad data is supplied", function () {
            var promise = EntityDiagramService.createDiagram({
                bad: "data",
                name: "bad data"
            });

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);
        });

        it("should be resolved with the new data object", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var promise = EntityDiagramService.createDiagram({
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

            expect(promise).to.be.fulfilled.and.eventually.contain.keys(["id", "name", "entities"]);

            httpBackend.flush();
        });

        it("should succeed to create the first diagram", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([]);

            var promise = EntityDiagramService.createDiagram({
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

            expect(promise).to.be.fulfilled.and.eventually.contain.keys(["id", "name", "entities"]);

            httpBackend.flush();
        });

        it("should be rejected on server error", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond(500, "Internal Server Error!");

            var promise = EntityDiagramService.createDiagram({
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

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });
    });

    describe("Method: deleteDiagram", function () {
        it("should be rejected with a status 400 when no ID is supplied", function () {
            var promise = EntityDiagramService.deleteDiagram();

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);
        });

        it("should delete diagram from data", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var deletePromise = EntityDiagramService.deleteDiagram(1);

            expect(deletePromise).to.be.fulfilled;

            // flush() the request issued by deleteDiagram, getDiagramByid will
            // not issue another request and will use the cached data
            httpBackend.flush();

            var getIdPromise = EntityDiagramService.getDiagramById(1);

            expect(getIdPromise).to.be.rejected;
        });

        it("should be rejected with a status 400 when an invalid ID is supplied", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var promise = EntityDiagramService.deleteDiagram(2);

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);

            httpBackend.flush();
        });

        it("should be rejected on server error", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond(500, "Internal Server Error!");

            var promise = EntityDiagramService.deleteDiagram(1);

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });

    });

    describe("Method: editDiagram", function () {
        it("should be rejected with a status 400 when bad data is supplied", function () {
            var promise = EntityDiagramService.editDiagram(1, {
                bad: "data",
                name: "bad data",
                entities: []
            });

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);
        });

        it("should be resolved with updated diagram without updated extend", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var promise = EntityDiagramService.editDiagram(1, {
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

            expect(promise).to.be.fulfilled.and.to.eventually.be.an("object").that.deep.equals({
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

            httpBackend.flush();
        });

        it("should be resolved with updated diagram with updated entities", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var promise = EntityDiagramService.editDiagram(1, {
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
                    }
                ],
                description: "Diagram that shows the relationship of some entities.",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: ""
            });

            expect(promise).to.be.fulfilled.and.to.eventually.be.an("object").that.deep.equals({
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
                    }
                ],
                description: "Diagram that shows the relationship of some entities.",
                sourceID: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: ""
            });

            httpBackend.flush();
        });

        it("should be rejected with invalid diagram id", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var promise = EntityDiagramService.editDiagram(2, {
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

            expect(promise).to.be.rejected.and.eventually.have.property("status", 400);

            httpBackend.flush();
        });

        it("should be rejected on server error", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond(500, "Internal Server Error!");

            var promise = EntityDiagramService.editDiagram(2, {
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

            expect(promise).to.be.rejected.and.eventually.have.property("status", 500);

            httpBackend.flush();
        });
    });

    describe("Caching", function () {
        it("should return the same data object upon second loading", function () {
            httpBackend.when("GET", "mockdata/entityDiagrams.json").respond([{
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
            }]);

            var firstPromise = EntityDiagramService.getDiagrams();

            firstPromise.then(function (data) {
                var secondPromise = EntityDiagramService.getDiagrams();
                expect(secondPromise).to.be.fulfilled.and.to.eventually.equal(data);
            });

            expect(firstPromise).to.be.fulfilled;

            httpBackend.flush();
        });
    });
});
