"use strict";

/*
 * When testing with webpack and ES6, we have to do some extra
 * things get testing to work right. Because we are gonna write test
 * in ES6 to, we have to compile those as well. That's handled in
 * karma.conf.js with the karma-webpack plugin. This is the entry
 * file for webpack test. Just like webpack will create a bundle.js
 * file for our client, when we run test, it well compile and bundle them
 * all here! Crazy huh. So we need to do some setup
 */
// declare const require: any;
declare const __karma__: any;

/* tslint:disable */
const args:any = __karma__.config.args;
const opts:any = args[0];
/* tslint:enable */

Error.stackTraceLimit = Infinity;

const path:any = require("path");

//require("core-js");
require("core-js/es6");
require("core-js/es7/reflect");
require("angular");
require("angular-mocks");
require("angular-ui-router");
require("angular-translate");
require("angular-material");
require("immutable");
require("moment");
require("rxjs");

// load the RxJS operators
require("../src/rxjs-operators");

/*
 Ok, this is kinda crazy. We can use the the context method on
 require that webpack created in order to tell webpack
 what files we actually want to require or import.
 Below, context will be an function/object with file names as keys.
 using that regex we are saying look in ../src then find
 any file that ends with spec.ts and get its path. By passing in true
 we say do this recursively
 */
const testsContext:any = require.context("../src", true, /\.spec\.ts/);

// do NOT delete any of the code below, it is necessary to load the unit tests

let modules:any = testsContext.keys();

// check if the user specified a specific test path 
let testPath:string = opts.testPath;

// if so then we need to filter out test modules that do not match the provided file/folder path
if (testPath) {
    testPath = testPath.toLocaleLowerCase();
    testPath = testPath.slice(7);
    testPath = path.normalize(testPath);
    //console.debug("Filtering the tests to execute. Test file paths must start with: ",testPath);

    modules = modules.filter((modulePath:any) => {
        modulePath = modulePath.toLocaleLowerCase();
        modulePath = path.normalize(modulePath);
        const shouldBeIncluded:boolean = modulePath.startsWith(testPath);
        return shouldBeIncluded;
    });
}

// load the tests
modules.forEach(testsContext);
