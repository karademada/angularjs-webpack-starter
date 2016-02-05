"use strict";

let fs = require("fs");
let path = require("path");

const seleniumFolder = "node_modules/protractor/selenium";
let seleniumFiles = fs.readdirSync(seleniumFolder);
let seleniumJarFile = "";
for(let i in seleniumFiles) {
    if(path.extname(seleniumFiles[i]) === ".jar") {
        seleniumJarFile = seleniumFiles[i];
        break;
    }
}
if(seleniumJarFile === null || seleniumJarFile === "") {
    throw new Error("The Selenium jar file could not be located in ["+seleniumFolder+"]. Please make sure that Protactor is correctly installed!");
}


exports.config = {
    baseUrl: "http://localhost:3000/",

    // use `npm run e2e`
    specs: [
        "src/**/**.e2e.ts",
        "src/**/*.e2e.ts"
    ],
    exclude: [],
    
    allScriptsTimeout: 110000,

    framework: "jasmine",

    jasmineNodeOpts: {
        defaultTimeoutInterval: 600000,
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false
    },

    capabilities: {
        "browserName": "chrome",
        "chromeOptions": {
            "args": [
                "show-fps-counter=true"
            ]
        }
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;
    },

    directConnect: true,

    seleniumServerJar: seleniumJarFile
};
