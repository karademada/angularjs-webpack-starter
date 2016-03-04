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

if("development" === process.env.ENV) {
    // activate Hot Module Replacement (HMR)
    if("hot" in module) {
        if(document.readyState === "complete") {
            main();
        }else {
            document.addEventListener("DOMContentLoaded", main);
        }
        module.hot.accept();
    }else {
        document.addEventListener("DOMContentLoaded", main);
    }

}
