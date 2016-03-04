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
import IState = ng.ui.IState;
import IStateProvider = ng.ui.IStateProvider;
import IUrlRouterProvider = ng.ui.IUrlRouterProvider;
import IStateService = ng.ui.IStateService;
import ITranslateProvider = angular.translate.ITranslateProvider;

// application controller
import {AppController} from "./app.controller";

/**
 * The application
 */
export class App {
    static bootstrap():void {
        const appModule:IModule = angular.module("appModule", ["ui.router", "pascalprecht.translate", "immutable-angular", "ngMaterial", "homeModule"]);

        appModule.component("app", {
            controller: AppController,
            controllerAs: "vm",
            template: require("./app.template.html")
        });

        appModule.config(["$urlRouterProvider", "$stateProvider", "$translateProvider", function ($urlRouterProvider:IUrlRouterProvider, $stateProvider:IStateProvider, $translateProvider:ITranslateProvider) {
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state("appMain", {
                    abstract: true, // means that this state will never be directly activated (user can never navigate to it)
                    url: ""
                });

            // i18n
            $translateProvider.useStaticFilesLoader({
                prefix: "app/translations/",
                suffix: ".json"
            });

            // Preferred language to be used when there is no language set or there is an error while downloading the translations files
            $translateProvider.preferredLanguage("en");
            // Language to be used for those translation keys that are not defined in another language
            $translateProvider.fallbackLanguage("en");
            // Enable escaping of HTML
            $translateProvider.useSanitizeValueStrategy("escaped");
        }]);

        appModule.run(["$state", "$log", ($state:IStateService, logger:ILogService) => {
            logger.debug("Bootstrapped the application...");

            logger.debug("Registered UI-router states are : ");

            let index:number;
            let len:number;
            for (index = 0, len = $state.get().length; index < len; ++index) {
                const stateName:IState = $state.get()[index].name;
                const stateParent:IState = $state.get()[index].parent;
                const stateUrl:IState = $state.get()[index].url;
                logger.debug(`State : ${stateName} [parent: ${stateParent}, url: ${stateUrl}]`);
            }
        }]);

        angular.bootstrap(document, ["appModule"]);
    }
}
