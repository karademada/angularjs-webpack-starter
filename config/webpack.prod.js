"use strict";

const webpack = require("webpack");

const webpackMerge = require("webpack-merge"); // Used to merge webpack configs
const commonConfig = require("./webpack.common.js"); // common configuration between environments

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// Metadata
const METADATA = webpackMerge(commonConfig.metadata, {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 8080,
    ENV: process.env.NODE_ENV = process.env.ENV = "production",
    PRODUCTION: true,
    DEVELOPMENT: false,
});

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
    debug: false,

    // the entry point for the bundles
    // reference: http://webpack.github.io/docs/configuration.html#entry
    entry: {
        "polyfills": helpers.root("src/polyfills.ts"),
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
            "HMR": false,
            "PRODUCTION": METADATA.PRODUCTION,
            "DEVELOPMENT": METADATA.DEVELOPMENT,
            "process.env": {
                "ENV": JSON.stringify(METADATA.ENV),
                "NODE_ENV": JSON.stringify(METADATA.ENV),
                "HMR": false,
                "PRODUCTION": METADATA.PRODUCTION,
                "DEVELOPMENT": METADATA.DEVELOPMENT
            }
        }),

        // Plugin: OccurenceOrderPlugin
        // Description: Varies the distribution of the ids to get the smallest id length
        // for often used ids.
        // reference: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        // reference: https://github.com/webpack/docs/wiki/optimization#minimize
        new webpack.optimize.OccurenceOrderPlugin(true),

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
            ]),
            // the filename configured in the output section is reused
            //filename: "[name].[hash].bundle.js",
            chunks: Infinity,
        }),
        
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
        }),


        // Plugin: ExtractTextWebpackPlugin
        // Description: Extract css file contents
        // reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextWebpackPlugin("[name].[hash].css", {
            disable: false,
        }),
    ],

    // TSLint configuration
    // Static analysis linter for TypeScript advanced options configuration
    // Description: An extensible linter for the TypeScript language.
    // reference: https://github.com/wbuchwalter/tslint-loader
    tslint: {

        // TSLint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // TSLint does not interrupt the compilation by default
        // if you want any file with tslint errors to fail
        // set failOnHint to true
        failOnHint: true, // (!) the production build will break if there are outstanding TSLint issues

        resourcePath: helpers.root("src"),

        // can be used to customize the path to the directory containing formatter (optional)
        //formattersDirectory: helpers.root("node_modules/tslint-loader/formatters/"),
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
        customAttrAssign: [ /\)?\]?=/ ],
    }
});
