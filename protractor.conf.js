
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

    seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar"
};
