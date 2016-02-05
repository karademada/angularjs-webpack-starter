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
document.addEventListener("DOMContentLoaded", function main() {
    console.log("Bootstrapping the App");
    App.bootstrap();
});
