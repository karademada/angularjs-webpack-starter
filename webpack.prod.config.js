"use strict";

const webpack = require("webpack");

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const OccurenceOrderPlugin = require("webpack/lib/optimize/OccurenceOrderPlugin");
const DedupePlugin = require("webpack/lib/optimize/DedupePlugin");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const WebpackSHAHash = require("webpack-sha-hash");

// Metadata
var ENV = process.env.NODE_ENV = process.env.ENV = "production";
var HOST = process.env.HOST || "localhost";
var PORT = process.env.PORT || 8080;

const metadata = {
    title: "AngularJS Webpack Starter",
    baseUrl: "/",
    host: HOST,
    port: PORT,
    ENV: ENV
};

/*
 * Config
 */
module.exports = helpers.defaults({ // notice that we start with the defaults and work upon that
    // static data for index.html
    metadata: metadata,
    
    // no debug in production
    debug: false,

    // our angular app
    entry: {
        "vendor": helpers.root("src/vendor.ts"),
        "main": helpers.root("src/main.ts")
    },

    // Config for our build files
    output: {
        path: helpers.root("dist"),
        filename: "[name].[chunkhash].bundle.js",
        sourceMapFilename: "[name].[chunkhash].bundle.map",
        chunkFilename: "[id].[chunkhash].chunk.js"
    },

    resolve: {
        cache: false,
        // ensure loader extensions match
        extensions: prepend([".ts", ".js", ".json", ".css", ".scss", ".html"], ".async") // ensure .async.ts etc also works
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: "tslint",
                exclude: [
                    helpers.root("node_modules")
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map",
                exclude: [
                    helpers.root("node_modules/rxjs")
                ]
            }
        ],
        loaders: [
            // Support Angular 2 async routes via .async.ts
            {
                test: /\.async\.ts$/,
                loaders: ["es6-promise", "ts"],
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/,
                ]
            },
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: "ts",
                query: {
                    // remove TypeScript helpers to be injected below by DefinePlugin
                    "compilerOptions": {
                        "removeComments": true,
                        "noEmitHelpers": true,
                    }
                },
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/,
                    /\.async\.ts$/,
                ]
            },

            // Support for *.json files.
            {
                test: /\.json$/,
                loader: "json"
            },

            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: "raw"
            },

            // Use style in development for hot-loading
            {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract("style", "css!postcss!sass")
            },

            // support for .html as raw text
            {
                test: /\.html$/,
                loader: "raw",
                exclude: [ 
                    helpers.root("src/index.html") 
                ]
            }

            // if you add a loader include the file extension
        ]
    },

    plugins: [
        // content hashes
        new WebpackSHAHash(),
        
        // optimization
        new DedupePlugin(),
        new OccurenceOrderPlugin(true),
        new CommonsChunkPlugin({
            name: "polyfills",
            filename: "polyfills.[chunkhash].bundle.js",
            chunks: Infinity
        }),
        
        // static assets
        new CopyWebpackPlugin([
            {
                from: helpers.root("src/assets"),
                to: helpers.root("assets")
            }
        ]),
        
        // generating html
        new HtmlWebpackPlugin({
            template: helpers.root("src/index.html")
        }),

        // Extract css files
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextWebpackPlugin("[name].[hash].css", {
            disable: false}
        ),
        
        // define vars
        new webpack.DefinePlugin({
            // Environment helpers
            "process.env": {
                "ENV": JSON.stringify(metadata.ENV),
                "NODE_ENV": JSON.stringify(metadata.ENV)
            }
        }),
        
        // TypeScript helpers
        new webpack.ProvidePlugin({
            "__metadata": "ts-helper/metadata",
            "__decorate": "ts-helper/decorate",
            "__awaiter": "ts-helper/awaiter",
            "__extends": "ts-helper/extends",
            "__param": "ts-helper/param"
        }),

        // Uglify
        new UglifyJsPlugin({
            // to debug prod builds uncomment //debug lines and comment //prod lines

            // beautify: true,//debug
            // mangle: false,//debug
            // dead_code: false,//debug
            // unused: false,//debug
            // deadCode: false,//debug
            // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
            // comments: true,//debug

            beautify: false,//prod
            mangle: {screw_ie8: true},//prod
            compress: {screw_ie8: true}, //prod
            comments: false//prod

        }),
        
        // include uglify in production
        new CompressionPlugin({
            algorithm: helpers.gzipMaxLevel,
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })
    ],
    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: true
    },
    // HTML minification
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
        customAttrAssign: [ /\)?\]?=/ ]
    }
});
