"use strict";

// Angular

import IModule = ng.IModule;
import ILogService = ng.ILogService;

// Angular UI Router
import IState = ng.ui.IState;
import IStateProvider = ng.ui.IStateProvider;
import IUrlRouterProvider = ng.ui.IUrlRouterProvider;
import IStateService = ng.ui.IStateService;

// location provider
import ILocationProvider = angular.ILocationProvider;

// i18n
import ITranslateProvider = angular.translate.ITranslateProvider;

// load all modules
import {ModuleRegistry} from "./modules/commons/modules/module.registry";
const moduleRegistry:ModuleRegistry = require("./modules/modules").moduleRegistry;

// application controller
import {AppController} from "./app.controller";

// Pre-loading the html templates into the Angular's $templateCache
const templateAppUrl:any = require("./app.template.html");

/**
 * The application
 */
export class App {
    public static bootstrap():void {
        const modules:any = [];
        modules.push("ui.router");
        modules.push("pascalprecht.translate");
        modules.push("immutable-angular");
        modules.push("ngMaterial");

        moduleRegistry.getModuleNames().forEach((entry:string) => {
           modules.push(entry);
        });

        const appModule:IModule = angular.module("appModule", modules);

        appModule.component("app", {
            controller: AppController,
            controllerAs: "vm",
            templateUrl: templateAppUrl,
        });

        appModule.config(["$urlRouterProvider", "$stateProvider", "$translateProvider", "$locationProvider",
        ($urlRouterProvider:IUrlRouterProvider, $stateProvider:IStateProvider, $translateProvider:ITranslateProvider,
         $locationProvider: ILocationProvider):any => {
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state("appMain", {
                    abstract: true, // means that this state will never be directly activated (user can never navigate to it)
                    url: "",
                });

            // i18n
            $translateProvider.useStaticFilesLoader({
                prefix: "assets/translations/",
                suffix: ".json",
            });

            // Preferred language to be used when there is no language set or there is an error while downloading the translations files
            $translateProvider.preferredLanguage("en");

            // Language to be used for those translation keys that are not defined in another language
            $translateProvider.fallbackLanguage("en");

            // Enable escaping of HTML
            $translateProvider.useSanitizeValueStrategy("escaped");

            // Enable HTML5 History API: adds support for pretty URLs
            // requires server configuration (URL rewriting)
            $locationProvider.html5Mode(true);
        },]);

        appModule.run(["$state", "$log", ($state:IStateService, logger:ILogService) => {
            logger.debug("Bootstrapped the application...");

            logger.debug("Registered UI-router states: ");
            let index:number;
            let len:number;
            for (index = 0, len = $state.get().length; index < len; ++index) {
                const stateName:IState = $state.get()[index].name;
                const stateParent:IState = $state.get()[index].parent;
                const stateUrl:IState = $state.get()[index].url;
                logger.debug(`State : ${stateName} [parent: ${stateParent}, url: ${stateUrl}]`);
            }
        },]);

        angular.bootstrap(document, ["appModule"], {
            "strictDi": true,
        });
    }
}
