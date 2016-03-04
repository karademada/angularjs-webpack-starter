"use strict";

// load all modules
import "./modules/modules";

declare const angular:any;
declare const require:any;

// Angular
import IRootScopeService = ng.IRootScopeService;
import IModule = ng.IModule;
import ILogService = ng.ILogService;

// Angular UI Router
import IStateProvider = ng.ui.IStateProvider;
import IUrlRouterProvider = ng.ui.IUrlRouterProvider;
import IStateService = ng.ui.IStateService;

// application controller
import {AppController} from "./app.controller";

/**
 * The application
 */
export class App {
    static bootstrap():void {
        const appModule:IModule = angular.module("appModule", ["ui.router", "immutable-angular", "ngMaterial", "homeModule"]);

        appModule.component("app", {
            controller: AppController,
            controllerAs: "vm",
            template: require("./app.template.html")
        });

        appModule.config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider:IUrlRouterProvider, $stateProvider:IStateProvider) {
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state("appMain", {
                    abstract: true, // means that this state will never be directly activated (user can never navigate to it)
                    url: ""
                });
        }]);

        appModule.run(["$state", function ($state:IStateService) {
            console.log("Bootstrapped the application...");

            console.debug("Registered UI-router states are : ");

            let index:number;
            let len:number;
            for (index = 0, len = $state.get().length; index < len; ++index) {
                console.debug("State : " + $state.get()[index].name + " [parent: " + $state.get()[index].parent + ", url: " + $state.get()[index].url + "] ");
            }
        }]);

        angular.bootstrap(document, ["appModule"]);
    }
}
