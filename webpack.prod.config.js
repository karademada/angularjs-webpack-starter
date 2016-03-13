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
module.exports = {
    // static data for index.html
    metadata: metadata,

    devtool: "source-map",
    
    // no debug in production
    debug: false,

    stats: { colors: true, reasons: true },
    
    entry: {
        "polyfills": helpers.root("src/polyfills.ts"),
        "vendor": helpers.root("src/vendor.ts"),
        "main": helpers.root("src/main.ts") // our angular app
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
        extensions: ["", ".ts", ".js", ".json", ".css", ".scss", ".html"]
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
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
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
            name: ["main", "vendor", "polyfills"],
            filename: "[name].[hash].bundle.js",
            chunks: Infinity
        }),
        
        // static assets
        new CopyWebpackPlugin([
            {
                from: helpers.root("src/app/assets"),
                to: "assets",
                ignore: [
                    "README.md"
                ]
            },
            {
                from: helpers.root("src/app/assets-base"),
                to: "",
                ignore: [
                    "README.md"
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
            disable: false}
        ),
        
        // define vars
        new webpack.DefinePlugin({
            // Environment helpers
            "ENV": JSON.stringify(metadata.ENV),
            "NODE_ENV": JSON.stringify(metadata.ENV),
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
        progress: false,
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
            browsers: ["last 2 versions"]
        })
    ],
    
    // HTML minification
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
        customAttrAssign: [ /\)?\]?=/ ]
    }
};
