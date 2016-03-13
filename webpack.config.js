"use strict";

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackSHAHash = require("webpack-sha-hash");
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// Metadata
const ENV = process.env.ENV = process.env.NODE_ENV = "development";
const HMR = helpers.hasProcessFlag("hot");

const metadata = {
    title: "AngularJS Webpack Starter",
    baseUrl: "/",
    host: "localhost",
    port: 3000,
    ENV: ENV,
    HMR: HMR
};

/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,

    devtool: "cheap-module-eval-source-map", // source-map
    //cache: true,
    debug: true,
    stats: {colors: true, reasons: true},

    // our angular app
    entry: {
        "polyfills": helpers.root("src/polyfills.ts"),
        "vendor": helpers.root("src/vendor.ts"),
        "main": helpers.root("src/main.ts")
    },

    // Config for our build files
    // Adding hashes to files for cache busting
    output: {
        path: helpers.root("dist"),
        filename: "[name].[hash].bundle.js",
        sourceMapFilename: "[name].[hash].map",
        chunkFilename: "[id].[hash].chunk.js"
    },

    resolve: {
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
            // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
            {
                test: /\.scss$/,
                loaders: [ "style", "css?sourceMap", "postcss?sourceMap", "sass?sourceMap" ]
            },

            // Support for .html as raw text
            {
                test: /\.html$/,
                loader: "raw",
                exclude: [
                    helpers.root("src/index.html")
                ]
            },

            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/,
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
        new ForkCheckerPlugin(),

        // content hashes
        new WebpackSHAHash(),

        // optimization
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: [ "main", "vendor", "polyfills" ],
            filename: "[name].[hash].bundle.js",
            minChunks: Infinity
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
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: helpers.root("src/index.html"),
            chunksSortMode: "none"
        }),

        // Environment helpers (when adding more properties make sure you include them in environment.d.ts)
        new webpack.DefinePlugin({
            "ENV": JSON.stringify(metadata.ENV),
            "HMR": HMR
        })
    ],
    node: {
        global: "window",
        //progress: false,
        process: true,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false
    },
    tslint: {
        emitErrors: false,
        failOnHint: false,
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

    // Other module loader config
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        contentBase: helpers.root("src/app") // necessary so that assets are accessible
    }
};
