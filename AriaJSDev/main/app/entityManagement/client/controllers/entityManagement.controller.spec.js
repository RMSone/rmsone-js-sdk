"use strict";

describe("Controller: EntityManagementCtrl", function () {

    // load the controller's module
    beforeEach(module("adminUiApp"));

    var EntityManagementCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        EntityManagementCtrl = $controller("EntityManagementCtrl", {
            $scope: scope
        });
    }));

    it("should ...", function () {
        expect(1).to.equal(1);
    });
});
