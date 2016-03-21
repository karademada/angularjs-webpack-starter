"use strict";

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const WebpackSHAHash = require("webpack-sha-hash");
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// Metadata
const ENV = process.env.NODE_ENV = process.env.ENV = "production";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

const METADATA = {
    title: "AngularJS Webpack Starter",
    baseUrl: "/",
    host: HOST,
    port: PORT,
    ENV: ENV
};

/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: METADATA,

    // reference: https://webpack.github.io/docs/configuration.html#devtool
    devtool: "source-map",

    // no debug in production
    debug: false,

    stats: {
        colors: true,
        reasons: true
    },

    entry: {
        "polyfills": helpers.root("src/polyfills.ts"),
        "vendor": helpers.root("src/vendor.ts"),
        "main": helpers.root("src/main.ts") // our angular app
    },

    // Config for our build files
    output: {
        path: helpers.root("dist"),
        // We need to tell Webpack to serve our bundled application
        // from the build path. When proxying:
        // http://localhost:3000/ -> http://localhost:8080/
        publicPath: '/',
        filename: "[name].[chunkhash].bundle.js",
        sourceMapFilename: "[name].[chunkhash].bundle.map",
        chunkFilename: "[id].[chunkhash].chunk.js"
    },

    resolve: {
        cache: false,
        // ensure loader extensions match
        extensions: [ "", ".ts", ".js", ".json", ".css", ".scss", ".html" ]
    },

    module: {
        noParse: [
            // things that should not be parsed
        ],
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
            // Support for .ts files
            {
                test: /\.ts$/,
                loader: "awesome-typescript",
                query: {
                    "compilerOptions": {
                        "removeComments": true
                    }
                },
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/
                ]
            },

            // Support for *.json files
            {
                test: /\.json$/,
                loader: "json"
            },

            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: "raw"
            },

            // Support for SASS
            // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
            {
                test: /\.scss$/,
                //loader: ExtractTextWebpackPlugin.extract("style", "css?sourceMap!postcss!sass")
                loaders: ["style", "css?sourceMap", "postcss?sourceMap", "sass?sourceMap"]
            },

            // Support for .html with ngTemplate loader to use the Angular's $templateCache service
            {
                test: /\.html$/,
                loaders: [ "ngtemplate", "html" ],
                exclude: [
                    helpers.root("src/index.html")
                ]
            },

            // Sinon.js
            {
                test: /sinon\.js$/,
                loader: "imports?define=>false,require=>false"
            }
        ]
    },

    plugins: [
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoErrorsPlugin(),

        new ForkCheckerPlugin(),

        // content hashes
        new WebpackSHAHash(),

        // optimization
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: [ "main", "vendor", "polyfills" ],
            // the filename configured in the output section is reused
            //filename: "[name].[hash].bundle.js",
            chunks: Infinity
        }),

        // static assets
        new CopyWebpackPlugin([
            {
                from: helpers.root("src/app/assets"),
                to: "assets",
                ignore: [
                    "*.md",
                    "*.txt"
                ]
            },
            {
                from: helpers.root("src/app/assets-base"),
                to: "",
                ignore: [
                    "*.md",
                    "*.txt"
                ]
            }
        ]),

        // generating html
        new HtmlWebpackPlugin({
            template: helpers.root("src/index.html"),
            chunksSortMode: "none"
        }),

        // Extract css files
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextWebpackPlugin("[name].[hash].css", {
                disable: false
            }
        ),

        // define vars
        new webpack.DefinePlugin({
            // Environment helpers
            "ENV": JSON.stringify(METADATA.ENV),
            "NODE_ENV": JSON.stringify(METADATA.ENV),
            "HMR": false
        }),

        // Uglify
        new webpack.optimize.UglifyJsPlugin({
            // reference: https://github.com/mishoo/UglifyJS2#usage
            beautify: false, // set to true for debugging
            //dead_code: false, // uncomment for debugging
            //unused: false, // uncomment for debugging
            mangle: {
                screw_ie8: true,
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

        // include uglify in production
        new CompressionPlugin({
            algorithm: helpers.gzipMaxLevel,
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })
    ],

    node: {
        global: "window",
        process: false,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false
    },

    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: "src"
    },

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer
     * Add vendor prefixes to css
     */
    postcss: [
        autoprefixer({
            browsers: [ "last 2 versions" ]
        })
    ],

    // HTML minification
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [ [ /#/, /(?:)/ ], [ /\*/, /(?:)/ ], [ /\[?\(?/, /(?:)/ ] ],
        customAttrAssign: [ /\)?\]?=/ ]
    }
};
