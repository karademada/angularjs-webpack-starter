// Karma configuration
// reference: http://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
	var testWebpackConfig = require("./webpack.test.config.js");
	config.set({

		// base path that will be used to resolve all patterns (e.g. files, exclude)
		basePath: "",

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [
			"jasmine"
		],

		// list of files / patterns to load in the browser
		files: [{pattern: "spec-bundle.js", watched: false}],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {"spec-bundle.js": ["coverage", "webpack", "sourcemap"]},

		// list of files to exclude
		exclude: [],

		// list of paths mappings
		// can be used to map paths served by the Karma web server to /base/ content
		// knowing that /base corresponds to the project root folder (i.e., where this config file is located)
		proxies: {},


		// Webpack Config at ./webpack.test.config.js
		webpack: testWebpackConfig,

		// test coverage
		coverageReporter: {
			dir: "coverage/",
			reporters: [
				{type: "text-summary"},
				{type: "json"},
				{type: "html"}
			]
		},

		// Webpack please don"t spam the console when running in karma!
		webpackServer: {noInfo: true},


		// test results reporter to use
		// possible values: "dots", "progress", "spec", "junit"
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		// https://www.npmjs.com/package/karma-junit-reporter
		// https://www.npmjs.com/package/karma-spec-reporter
		reporters: ["spec", "progress", "coverage"],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [
			"PhantomJS"
			//"Chrome",
			//"Firefox",
			//"IE"
		],

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		junitReporter: {
			outputFile: "target/reports/tests-unit/unit.xml",
			suite: "unit"
		},
	});
};
