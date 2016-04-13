"use strict";

// Polyfills
//require("core-js");
require("core-js/es6");
require("core-js/es7/reflect");

if (DEVELOPMENT) {
    // Ensure that we get detailed stack trackes during development (useful with node & Webpack)
    // Reference: http://stackoverflow.com/questions/7697038/more-than-10-lines-in-a-node-js-stack-error
    Error.stackTraceLimit = Infinity;
} else if (PRODUCTION) {
    // ...
} else {
    // ...
}
