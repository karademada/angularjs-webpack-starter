"use strict";

const webpack = require("webpack");

const webpackMerge = require("webpack-merge"); // Used to merge webpack configs
const commonConfig = require("./webpack.common.js"); // common configuration between environments

// Webpack Plugins
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// Helpers
const helpers = require("./helpers");

// Metadata
const METADATA = {
    ENV: process.env.ENV = process.env.NODE_ENV = "test",
    PRODUCTION: false,
    DEVELOPMENT: true,
};

/*
 * Config
 * reference: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    // Developer tool to enhance debugging
    // reference: https://webpack.github.io/docs/configuration.html#devtool
    // reference: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
    // do not change for tests or step-through debugging won't work
    devtool: "inline-source-map",

    // Cache generated modules and chunks to improve performance for multiple incremental builds.
    // Enabled by default in watch mode.
    // You can pass false to disable it
    // reference: http://webpack.github.io/docs/configuration.html#cache
    //cache: true,

    // Switch loaders to debug mode
    // reference: http://webpack.github.io/docs/configuration.html#debug
    debug: true,
    
    stats: commonConfig.stats,

    // Options affecting the resolving of modules.
    // reference: http://webpack.github.io/docs/configuration.html#resolve
    resolve: commonConfig.resolve,

    // Options affecting the normal modules.
    // reference: http://webpack.github.io/docs/configuration.html#module
    module: {
        // things that should not be parsed
        noParse: commonConfig.module.noParse,

        // An array of applied pre and post loaders.
        // reference: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
        preLoaders: commonConfig.module.preLoaders,

        // An array of automatically applied loaders.
        //
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        //
        // reference: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: commonConfig.module.loaders.concat([
            // Support for .ts files.
            // reference: https://github.com/s-panferov/awesome-typescript-loader
            {
                test: /\.ts$/,
                loader: "awesome-typescript",
                exclude: [
                    /\.e2e\.ts$/, // exclude end-to-end tests
                ],
            },
        ]),

        // Post processors
        postLoaders: [
            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                include: helpers.root("src"),
                loader: "istanbul-instrumenter-loader",
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/,
                    helpers.root("node_modules"),
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
            "HMR": false,
            "PRODUCTION": METADATA.PRODUCTION,
            "DEVELOPMENT": METADATA.DEVELOPMENT,
            "process.env": {
                "ENV": JSON.stringify(METADATA.ENV),
                "NODE_ENV": JSON.stringify(METADATA.ENV),
                "HMR": false,
                "PRODUCTION": METADATA.PRODUCTION,
                "DEVELOPMENT": METADATA.DEVELOPMENT,
            },
        }),

        // Plugin: ExtractTextWebpackPlugin
        // Description: Extract css file contents
        // reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextWebpackPlugin("[name].[hash].css", {
            disable: false,
        })
    ],

    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    // reference: https://webpack.github.io/docs/configuration.html#node
    node: commonConfig.node,

    // Static analysis linter for TypeScript advanced options configuration
    // Description: An extensible linter for the TypeScript language.
    // reference: https://github.com/wbuchwalter/tslint-loader
    tslint: commonConfig.tslint,

    // PostCSS plugins configuration
    // Reference: https://github.com/postcss/postcss
    postcss: commonConfig.postcss,
};
