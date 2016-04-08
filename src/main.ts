"use strict";

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from "./app/app";

if(PRODUCTION) {
    // We only import the application styles here for the production build
    // In development, main-styles.ts takes care of that (separate bundle)
    require("./app/css/main.scss");
}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection system
 */
export function main():void {
    console.log("Bootstrapping the App");
    App.bootstrap();
}

function bootstrapDomReady():void {
    // bootstrap after document is ready
    document.addEventListener("DOMContentLoaded", main);
}

if(DEVELOPMENT) {
    console.log("Development environment");

    // activate Hot Module Replacement (HMR)
    if(HMR) {
        if(document.readyState === "complete") {
            main();
        }else {
            bootstrapDomReady();
        }
        module.hot.accept();
    }else {
        bootstrapDomReady();
    }
}else {
    bootstrapDomReady();
}
