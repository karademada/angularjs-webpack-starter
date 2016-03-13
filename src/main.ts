"use strict";

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from "./app/app";

// Import application styles
import "./app/css/main.scss";

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection system
 */
export function main() {
    console.log("Bootstrapping the App");
    App.bootstrap();
};

function bootstrapDomReady() {
    // bootstrap after document is ready
    return document.addEventListener("DOMContentLoaded", main);
}

if("development" === ENV) {
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
