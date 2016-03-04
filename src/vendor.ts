"use strict";

// Load all third party dependencies

declare const process:any;

if ("production" !== process.env.ENV) {
    console.log("Development mode");

    // Ensure that we get detailed stack trackes during development (useful with node & Webpack)
    // Reference: http://stackoverflow.com/questions/7697038/more-than-10-lines-in-a-node-js-stack-error
    Error["stackTraceLimit"] = Infinity;
} else if ("production" === process.env.ENV) {
    // ...
} else {
    console.log("Unknown mode: ", process.env.ENV);
}

// Polyfills
import "es6-shim";
import "es6-promise";

// AngularJS
import "angular";

import "angular-ui-router";

// Angular Material
import "angular-material";

// JSData
import "js-data";

// Immutable
import "immutable";
import "immutable-angular";

// RxJS
import "rxjs";

// RxJS operators
// Add any additional required operators here 
require("rxjs/add/operator/map");

// 3rd party styles
import "./app/css/vendor.scss";
