"use strict";

describe("App", () => {

    beforeEach(() => {
        browser.get("/");
    });


    it("should have a title", () => {
        const subject = browser.getTitle();
        const expectedResult = "AngularJS Webpack Starter";
        expect(subject).toEqual(expectedResult);
    });

});
