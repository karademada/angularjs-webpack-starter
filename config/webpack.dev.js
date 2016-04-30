"use strict";

const webpack = require("webpack");

const webpackMerge = require("webpack-merge"); // Used to merge webpack configs
const commonConfig = require("./webpack.common.js"); // common configuration between environments

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// Metadata
const METADATA = webpackMerge(commonConfig.metadata, {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    ENV: process.env.ENV = process.env.NODE_ENV = "development",
    HMR: helpers.hasProcessFlag("hot"),
    PRODUCTION: false,
    DEVELOPMENT: true,
});

// Directives to be used in CSP header
// References
// https://developer.mozilla.org/en-US/docs/Web/Security/CSP
// https://scotthelme.co.uk/csp-cheat-sheet
const cspDirectives = [
    "base-uri 'self'",
    "default-src 'self'",
    "child-src 'self'",
    "connect-src 'self' http://my.awesome.api ws://localhost:3000",  // http://my.awesome.api is due to the mock REST api mock baseUrl and ws://localhost:3000" is due to FakeRest
    "font-src 'self'",
    "form-action 'self'",
    "frame-src 'self'",   // TODO: deprecated. Use child-src instead. Used here because child-src is not yet supported by Firefox. Remove as soon as it is fully supported
    "frame-ancestors 'none'",  // the app will not be allowed to be embedded in an iframe (roughly equivalent to X-Frame-Options: DENY)
    "img-src 'self' data: image/png",  // data: image/png" is due to Angular Material loading PNG images in base64 encoding
    "media-src 'self'",
    "object-src 'self'",
    "plugin-types application/pdf",  // valid mime-types for plugins invoked via <object> and <embed>  // TODO: not yet supported by Firefox
    "script-src 'self' 'unsafe-eval'",  // 'unsafe-eval' is due to Angular Material inline theming (see issue https://github.com/angular/material/issues/980)
    "style-src 'self' 'unsafe-inline'",  // 'unsafe-inline' is due to Angular Material inline theming (see issue https://github.com/angular/material/issues/980)
    "referrer no-referrer",
    "reflected-xss block",
    "block-all-mixed-content",
    "report-uri http://localhost"  // TODO: define an specific URL to POST the reports of policy failures
];


/*
 * Config
 * IMPORTANT: notice that the configuration below is MERGED with the common configuration (commonConfig)
 * reference: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {
    // static data for index.html
    metadata: METADATA,

    // Developer tool to enhance debugging
    // reference: https://webpack.github.io/docs/configuration.html#devtool
    // reference: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
    devtool: "source-map",

    // Cache generated modules and chunks to improve performance for multiple incremental builds.
    // Enabled by default in watch mode.
    // You can pass false to disable it
    // reference: http://webpack.github.io/docs/configuration.html#cache
    //cache: true,

    // Switch loaders to debug mode
    // reference: http://webpack.github.io/docs/configuration.html#debug
    debug: true,

    // the entry point for the bundles
    // reference: http://webpack.github.io/docs/configuration.html#entry
    entry: {
        "polyfills": helpers.root("src/polyfills.ts"),
        "vendor-styles": helpers.root("src/vendor-styles.ts"),
        "main-styles": helpers.root("src/main-styles.ts"), // our angular app's styles. Useful only changing the styles bundle while working on styling
        "vendor": helpers.root("src/vendor.ts"),
        "main": helpers.root("src/main.ts"), // our angular app
    },

    // Options affecting the normal modules.
    // reference: http://webpack.github.io/docs/configuration.html#module
    module: {
        // An array of automatically applied loaders.
        //
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        //
        // reference: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: [
            // Support for .ts files.
            // reference: https://github.com/s-panferov/awesome-typescript-loader
            {
                test: /\.ts$/,
                loader: "awesome-typescript",
                exclude: [
                    /\.e2e\.ts$/, // exclude end-to-end tests
                    /\.spec\.ts$/, // exclude unit tests
                ],
            },
        ],
    },

    // Add additional plugins to the compiler.
    // reference: http://webpack.github.io/docs/configuration.html#plugins
    plugins: [
        // Environment helpers (when adding more properties make sure you include them in environment.d.ts)
        // Plugin: DefinePlugin
        // Description: Define free variables.
        // Useful for having development builds with debug logging or adding global constants.
        // reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new webpack.DefinePlugin({
            "ENV": JSON.stringify(METADATA.ENV),
            "NODE_ENV": JSON.stringify(METADATA.ENV),
            "HMR": METADATA.HMR,
            "PRODUCTION": METADATA.PRODUCTION,
            "DEVELOPMENT": METADATA.DEVELOPMENT,
            "process.env": {
                "ENV": JSON.stringify(METADATA.ENV),
                "NODE_ENV": JSON.stringify(METADATA.ENV),
                "HMR": METADATA.HMR,
                "PRODUCTION": METADATA.PRODUCTION,
                "DEVELOPMENT": METADATA.DEVELOPMENT,
            },
        }),

        // Plugin: CommonsChunkPlugin
        // Description: Shares common code between the pages.
        // It identifies common modules and put them into a commons chunk.
        // reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        // reference: https://github.com/webpack/docs/wiki/optimization#multi-page-app
        new webpack.optimize.CommonsChunkPlugin({
            name: helpers.reverse([
                "polyfills",
                "vendor",
                "main",
                "vendor-styles",
                "main-styles"
            ]),
        }),

        // Plugin: ExtractTextWebpackPlugin
        // Description: Extract css file contents
        // reference: https://github.com/webpack/extract-text-webpack-plugin
        // notice that we don't use [hash] for the stylesheet filenames in DEV: that way plugins that reload stylesheets work as expected
        new ExtractTextWebpackPlugin("[name].css", {
            disable: false,
        }),
    ],

    // Webpack Development Server configuration
    // Description: The webpack-dev-server is a little node.js Express server.
    // The server emits information about the compilation state to the client,
    // which reacts to those events.
    // reference: https://webpack.github.io/docs/webpack-dev-server.html
    devServer: {
        port: METADATA.PORT,
        host: METADATA.HOST,

        // HTML5 History API support: no need for # in URLs
        // automatically redirect 404 errors to the index.html page
        // uses connect-history-api-fallback behind the scenes: https://github.com/bripkens/connect-history-api-fallback
        // reference: http://jaketrent.com/post/pushstate-webpack-dev-server/
        historyApiFallback: true,

        // file watch configuration
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        contentBase: helpers.root("src/app"), // necessary so that assets are accessible

        // Can be used to add specific headers
        headers: {
            // enable CORS
            "Access-Control-Allow-Origin": "*",

            // CSP header (and its variants per browser)
            "Content-Security-Policy": cspDirectives.join("; "),
            "X-Content-Security-Policy": cspDirectives.join("; "),
            "X-WebKit-CSP": cspDirectives.join("; "),

            // Other security headers

            // protect against clickjacking: https://en.wikipedia.org/wiki/Clickjacking
            // reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options
            "X-Frame-Options": "deny",

            // enable some protection against XSS
            // reference: https://www.owasp.org/index.php/List_of_useful_HTTP_headers
            // other reference: http://blog.innerht.ml/the-misunderstood-x-xss-protection/
            "X-Xss-Protection": "1; mode=block",

            // protect against drive-by download attacks and user uploaded content that could be treated by Internet Explorer as executable or dynamic HTML files
            // reference: https://www.owasp.org/index.php/List_of_useful_HTTP_headers
            "X-Content-Type-Options": "nosniff",
        },
    },
});

// If Hot Module Replacement (HMR) is enabled but the inline option has not been specified
// then we make sure that live reloading is not enabled
// reference: https://github.com/webpack/webpack/issues/418
if(helpers.hasProcessFlag("hot") && !helpers.hasProcessFlag("inline")) {
    module.exports.entry["webpack-dev-server"] = "webpack/hot/only-dev-server";
}
