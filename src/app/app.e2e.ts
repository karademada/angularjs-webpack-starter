"use strict";

describe("App", () => {

    beforeEach(() => {
        browser.get("/");
    });

    it("should have a title", () => {
        const subject:webdriver.promise.Promise<string> = browser.getTitle();
        const expectedResult:string = "AngularJS Webpack Starter";
        expect(subject).toEqual(expectedResult);
    });

});
