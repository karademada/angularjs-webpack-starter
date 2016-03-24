"use strict";

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// Helpers
const helpers = require("./helpers");

// Metadata
const ENV = process.env.ENV = process.env.NODE_ENV = "test";
const PRODUCTION = false;
const DEVELOPMENT = true;

const METADATA = {
    ENV: ENV,
    PRODUCTION: PRODUCTION,
    DEVELOPMENT: DEVELOPMENT
};

/*
 * Config
 * reference: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
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
    
    stats: {
        colors: true,
        reasons: true
    },

    // Options affecting the resolving of modules.
    // reference: http://webpack.github.io/docs/configuration.html#resolve
    resolve: {
        cache: false,
        // an array of extensions that should be used to resolve modules.
        // reference: http://webpack.github.io/docs/configuration.html#resolve-extensions
        extensions: ["", ".ts", ".js", ".json", ".css", ".scss", ".html"],

        // Make sure that the root is src
        root: helpers.root("src")
    },

    // Options affecting the normal modules.
    // reference: http://webpack.github.io/docs/configuration.html#module
    module: {
        noParse: [
            // things that should not be parsed
        ],

        // An array of applied pre and post loaders.
        // reference: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
        preLoaders: [
            // TsLint loader support for *.ts files
            // reference: https://github.com/wbuchwalter/tslint-loader
            {
                test: /\.ts$/,
                loader: "tslint",
                exclude: [
                    helpers.root("node_modules")
                ]
            },

            // Source map loader support for *.js files
            // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
            // reference: https://github.com/webpack/source-map-loader
            {
                test: /\.js$/,
                loader: "source-map",
                exclude: [
                    helpers.root("node_modules/rxjs")
                ]
            }
        ],

        // An array of automatically applied loaders.
        //
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        //
        // reference: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: [
            // Support for .ts files
            // reference: https://github.com/s-panferov/awesome-typescript-loader
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                query: {
                    "compilerOptions": {
                        "removeComments": true
                    }
                },
                exclude: [
                    /\.e2e\.ts$/
                ]
            },

            // Support for .json files
            {
                test: /\.json$/,
                loader: "json"
            },
            
            // Support for CSS as raw text
            // reference: https://github.com/webpack/raw-loader
            {
                test: /\.css$/,
                loader: "raw"
            },

            // Support for SASS
            // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
            {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract("style", "css?sourceMap!postcss?sourceMap!sass?sourceMap")
                // Alternative: avoid using extract-text-webpack-plugin
                // with the alternative, the stylesheets MUST be imported in code (e.g., require('...'))
                // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
                // loaders: ["style", "css?sourceMap", "postcss?sourceMap", "sass?sourceMap"]
            },

            // Support for .html with ngTemplate loader to use the Angular's $templateCache service
            {
                test: /\.html$/,
                loaders: ["ngtemplate", "html"],
                exclude: [
                    helpers.root("src/index.html")
                ]
            },

            // Sinon.js
            {
                test: /sinon\.js$/,
                loader: "imports?define=>false,require=>false"
            }
        ],
        postLoaders: [
            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                include: helpers.root("src"),
                loader: "istanbul-instrumenter-loader",
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/,
                    helpers.root("node_modules")
                ]
            }
        ]
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
            // Environment helpers
            "ENV": JSON.stringify(METADATA.ENV),
            "NODE_ENV": JSON.stringify(METADATA.ENV),
            "HMR": false,
            "PRODUCTION": METADATA.PRODUCTION,
            "DEVELOPMENT": METADATA.DEVELOPMENT
        }),

        // Plugin: ExtractTextWebpackPlugin
        // Description: Extract css file contents
        // reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextWebpackPlugin("[name].[hash].css", {
            disable: false
        })
    ],

    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    // reference: https://webpack.github.io/docs/configuration.html#node
    node: {
        global: "window",
        process: false,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false
    },

    // Static analysis linter for TypeScript advanced options configuration
    // Description: An extensible linter for the TypeScript language.
    // reference: https://github.com/wbuchwalter/tslint-loader
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: "src"
    },

    // PostCSS plugins configuration
    // Reference: https://github.com/postcss/postcss
    postcss: [
        // Autoprefixing
        // Reference: https://github.com/postcss/autoprefixer
        autoprefixer({
            browsers: ["last 2 versions"]
        })
    ]
};
