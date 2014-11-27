"use strict";

describe("Directive: entityDiagram", function () {

    // Load the controller's module.
    beforeEach(module("adminUiApp"));

    beforeEach(module("app/entityManagement/views/entityManagementEntityDiagram.html"));

    var $compile;
    var scope;

    var elementMarkup = "<div id=\"directiveElement\" entity-diagram=\"\"></div>";
    var diagramSource = null;

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        scope = $rootScope.$new();

        diagramSource = {
            "id": 1,
            "name": "Diagram One",
            "entities": [{
                "id": 1,
                "name": "FirstEntityEver",
                "description": "Description of FirtEntityEver",
                "sourceID": "",
                "createdAt": "",
                "createdBy": "",
                "updatedAt": "",
                "updatedBy": "",
                "schema": [{
                    "name": "attribute1",
                    "type": "INT"
                }]
            }, {
                "id": 2,
                "name": "BasicEntity",
                "description": "Not that important",
                "sourceID": "",
                "extends": "FirstEntityEver",
                "createdAt": "",
                "createdBy": "",
                "updatedAt": "",
                "updatedBy": "",
                "schema": [{
                    "name": "attribute2",
                    "type": "STRING"
                }, {
                    "name": "attribute3",
                    "type": "STRING"
                }, {
                    "name": "attribute4",
                    "type": "STRING"
                }, {
                    "name": "attribute5",
                    "type": "STRING"
                }, {
                    "name": "attribute6",
                    "type": "STRING"
                }, {
                    "name": "attribute7",
                    "type": "STRING"
                }, {
                    "name": "attribute8",
                    "type": "STRING"
                }]
            }, {
                "id": 3,
                "name": "BasicEntity2",
                "description": "Not that important",
                "sourceID": "",
                "extends": "BasicEntity",
                "createdAt": "",
                "createdBy": "",
                "updatedAt": "",
                "updatedBy": "",
                "schema": [{
                    "name": "attribute4",
                    "type": "STRING"
                }, {
                    "name": "attribute5",
                    "type": "STRING"
                }]
            }],
            "description": "Diagram that shows the relationship of some entities.",
            "sourceID": "",
            "createdAt": "",
            "createdBy": "",
            "updatedAt": "",
            "updatedBy": ""
        }, {
            "id": 2,
            "name": "Diagram Two",
            "entities": [{
                "id": 1,
                "name": "FirstEntityEver",
                "description": "Description of FirtEntityEver",
                "sourceID": "",
                "createdAt": "",
                "createdBy": "",
                "updatedAt": "",
                "updatedBy": "",
                "schema": "FirstEntityEver (\n    size INT NOT NULL\n)"
            }, {
                "id": 2,
                "name": "BasicEntity",
                "description": "Not that important",
                "sourceID": "",
                "extends": "FirstEntityEver",
                "createdAt": "",
                "createdBy": "",
                "updatedAt": "",
                "updatedBy": "",
                "schema": "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL,\n" +
                    "    value DECIMAL NOT NULL\n);"
            }],
            "description": "This is the second diagram from the list.",
            "sourceID": "",
            "createdAt": "",
            "createdBy": "",
            "updatedAt": "",
            "updatedBy": ""
        }, {
            "id": 3,
            "name": "Diagram Three",
            "entities": [{
                "id": 1,
                "name": "FirstEntityEver",
                "description": "Description of FirtEntityEver",
                "sourceID": "",
                "createdAt": "",
                "createdBy": "",
                "updatedAt": "",
                "updatedBy": "",
                "schema": "FirstEntityEver (\n    size INT NOT NULL\n)"
            }, {
                "id": 2,
                "name": "BasicEntity",
                "description": "Not that important",
                "sourceID": "",
                "extends": "FirstEntityEver",
                "createdAt": "",
                "createdBy": "",
                "updatedAt": "",
                "updatedBy": "",
                "schema": "BasicEntity EXTENDS FirstEntityEver (\n    independent Independent NOT NULL,\n"+
                    "    value DECIMAL NOT NULL\n);"
            }],
            "description": "This is some other diagram from the list of diagrams.",
            "sourceID": "",
            "createdAt": "",
            "createdBy": "",
            "updatedAt": "",
            "updatedBy": ""
        };
    }));

    describe("Initialization", function () {
        var element;

        beforeEach(function () {
            scope.diagram = diagramSource;

            element = angular.element(elementMarkup);
            angular.element(document.body).append(element);
            $compile(element)(scope);
            scope.$apply();
        });

        afterEach(function () {
            angular.element("#directiveElement").remove();
        });

        it("should create svg elements", function () {
            expect(element.find("svg").length).to.not.equal(0);
            expect(element.find("svg")).to.not.be.empty;
        });
    });
});
