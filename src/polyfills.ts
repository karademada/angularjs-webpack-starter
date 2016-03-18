"use strict";

// Polyfills
import "es6-shim";
import "es7-reflect-metadata";

if ("development" === ENV) {
    // Ensure that we get detailed stack trackes during development (useful with node & Webpack)
    // Reference: http://stackoverflow.com/questions/7697038/more-than-10-lines-in-a-node-js-stack-error
    Error.stackTraceLimit = Infinity;
} else if ("production" === ENV) {
    // ...
} else {
    // ...
}
