"use strict";

describe("Filter: textToHtml", function() {

    // load the filter's module
    beforeEach(module("adminUiApp"));

    // initialize a new instance of the filter before each test
    var sce;
    var textToHtml;

    beforeEach(inject(function($sce, $filter) {
        sce = $sce;
        textToHtml = $filter("textToHtml");
    }));

    it("should return an empty string when executed with null or undefined", function() {
        expect(sce.getTrustedHtml(textToHtml(null))).to.be.empty;
        expect(sce.getTrustedHtml(textToHtml(undefined))).to.be.empty;
    });

    it("should replace new lines with <\/br>", function() {
        expect(sce.getTrustedHtml(textToHtml("test\ntest"))).to.equal("test<\/br>test");
    });

    it("should replace spaces with HTML escaped spaces (&nbsp;)", function() {
        expect(sce.getTrustedHtml(textToHtml("test test"))).to.equal("test&nbsp;test");
    });

    it("should replace tabs with four HTML escaped spaces", function() {
        expect(sce.getTrustedHtml(textToHtml("test\ttest"))).to.equal("test&nbsp;&nbsp;&nbsp;&nbsp;test");
    });
});
