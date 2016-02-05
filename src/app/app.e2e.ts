"use strict";

describe("App", () => {

  beforeEach(() => {
	browser.get("/");
  });


  it("should have a title", () => {
	let subject = browser.getTitle();
	let result = "AngularJS Webpack Starter";
	expect(subject).toEqual(result);
  });

});
