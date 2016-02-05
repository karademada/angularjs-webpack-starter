import {FooController} from "./components/foo/foo.controller";

declare var angular:any;

const homeModule = angular.module("homeModule", []);

homeModule.component("foo", {
	controller: FooController,
	template: require("./components/foo/foo.template.html")
});
