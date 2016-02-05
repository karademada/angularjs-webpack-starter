"use strict";

// load all modules
import "./modules/modules";

declare var angular:any;
declare var require:any;

import {AppController} from "./app.controller";

/**
 * The application
 */
export class App {
	static bootstrap():any {
		const appModule = angular.module("appModule", ["ngMaterial", "homeModule"]);

		appModule.component("app", {
			controller: AppController,
			controllerAs: "appCtrl",
			template: require("./app.template.html")
		});

		angular.bootstrap(document, ["appModule"]);
		console.log("Bootstrapped the application...");
	}
}
