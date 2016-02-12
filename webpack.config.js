"use strict";

const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const WebpackSHAHash = require('webpack-sha-hash');

// Metadata
var ENV = process.env.ENV = process.env.NODE_ENV = "development";

const metadata = {
    title: "AngularJS Webpack Starter",
    baseUrl: "/",
    host: "localhost",
    port: 3000,
    ENV: ENV
};

/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use "eval"
    devtool: "source-map",
    debug: true,

    // our angular app
    entry: {
        "vendor": "./src/vendor.ts",
        "main": "./src/main.ts"
    },

    // Config for our build files
    // Adding hashes to files for cache busting
    output: {
        path: root("dist"),
        filename: "[name].[hash].bundle.js",
        //sourceMapFilename: "[name].[hash].map",
        chunkFilename: "[id].[hash].chunk.js"
    },

    resolve: {
        // ensure loader extensions match
        extensions: ["", ".ts", ".js", ".json", ".css", ".scss", ".html"]
    },

    module: {
        preLoaders: [
            {test: /\.ts$/, loader: "tslint", exclude: [/node_modules/]}],
        loaders: [
            // Support for *.json files.
            {test: /\.json$/, loader: "json"},

            // Support for CSS as raw text
            {test: /\.css$/, loader: "raw"},

            // Use style in development for hot-loading
            {test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract("style", "css?sourceMap!postcss!sass")},

            // Support for .html as raw text
            {test: /\.html$/, loader: "raw", exclude: [ root("src/index.html") ]},

            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: "ts",
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/,
                ]
            }

            // if you add a loader include the resolve file extension above
        ]
    },

    plugins: [
        // content hashes
        new WebpackSHAHash(),
        
        // optimization
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.[hash].bundle.js",
            minChunks: Infinity
        }),
        
        // static assets
        new CopyWebpackPlugin([{
            from: "src/assets",
            to: "assets"
        }]),
        
        // Extract css files
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextWebpackPlugin("[name].[hash].css", {
            disable: false}
        ),
        
        // generating html
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        
        // replace
        new webpack.DefinePlugin({
            "process.env": {
                "ENV": JSON.stringify(metadata.ENV),
                "NODE_ENV": JSON.stringify(metadata.ENV)
            }
        })
    ],

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

    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    },
    // we need this due to problems with es6-shim
    node: {
        global: "window",
        progress: false,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ["node_modules"].concat(args));
}
