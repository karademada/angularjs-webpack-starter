"use strict";

const webpack = require("webpack");

const webpackMerge = require("webpack-merge"); // Used to merge webpack configs
const commonConfig = require("./webpack.common.js"); // common configuration between environments

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const CompressionPlugin = require("compression-webpack-plugin");

// Metadata
const METADATA = webpackMerge(commonConfig.metadata, {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 8080,
    ENV: process.env.NODE_ENV = process.env.ENV = "production",
    PRODUCTION: true,
    DEVELOPMENT: false
});

/*
 * Config
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
    debug: false,

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
        
        // Plugin: NoErrorsPlugin
        // Description: Only emit files when there are no errors.
        // reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        new webpack.NoErrorsPlugin(),

        // Plugin: DedupePlugin
        // Description: Prevents the inclusion of duplicate code into your bundle
        // and instead applies a copy of the function at runtime.
        // reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        // reference: https://github.com/webpack/docs/wiki/optimization#deduplication
        new webpack.optimize.DedupePlugin(),
        
        // Plugin: Uglify
        // Description: minify code, compress, ...
        // reference: https://github.com/mishoo/UglifyJS2#usage
        new webpack.optimize.UglifyJsPlugin({
            beautify: false, // set to true for debugging
            //dead_code: false, // uncomment for debugging
            //unused: false, // uncomment for debugging
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
                except: [
                    // list strings that should not be mangled here
                ]
            },
            compress: {
                screw_ie8: true
                // uncomment for debugging
                //,
                //keep_fnames: true,
                //drop_debugger: false,
                //dead_code: false,
                //unused: false
            },
            comments: false // set to true for debugging
        }),

        // Plugin: CompressionPlugin
        // Description: Prepares compressed versions of assets to serve
        // them with Content-Encoding
        // reference: https://github.com/webpack/compression-webpack-plugin
        new CompressionPlugin({
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })
    ],

    // Static analysis linter for TypeScript advanced options configuration
    // Description: An extensible linter for the TypeScript language.
    // reference: https://github.com/wbuchwalter/tslint-loader
    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: "src"
    },
        
    // Html loader for HTML minification (advanced options)
    // reference: https://github.com/webpack/html-loader#advanced-options
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
            [ /#/, /(?:)/ ],
            [ /\*/, /(?:)/ ],
            [ /\[?\(?/, /(?:)/ ]
        ],
        customAttrAssign: [ /\)?\]?=/ ]
    }
});
