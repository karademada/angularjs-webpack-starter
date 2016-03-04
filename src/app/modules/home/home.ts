"use strict";

import IStateService = angular.ui.IStateService;
import IStateProvider = angular.ui.IStateProvider;
import IStateParamsService = angular.ui.IStateParamsService;
import IModule = angular.IModule;
import {HomeController} from "./home.controller";

export const homeModule:IModule = angular.module("homeModule", []);

// import all elements of the module
import "./components/foo/foo";

homeModule.config(function($stateProvider:IStateProvider) {
    $stateProvider
        .state("home", {
            parent: "appMain",
            url: "/home",
            views: {
                "home@": {
                    template: require("./home.template.html"),
                    controller: HomeController,
                    controllerAs: "vm"
                }
            }
        });
});

homeModule.run([function() {
    console.log("Home module loaded...");
}]);
