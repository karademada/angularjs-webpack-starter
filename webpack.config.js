"use strict";

const webpack = require("webpack");

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackSHAHash = require("webpack-sha-hash");

// Metadata
const ENV = process.env.ENV = process.env.NODE_ENV = "development";

// is Hot Module Replacement enabled?
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
module.exports = helpers.defaults({ // notice that we start with the defaults and work upon that
    // static data for index.html
    metadata: metadata,
    
    // our angular app
    entry: {
        "vendor": helpers.root("src/vendor.ts"),
        "main": helpers.root("src/main.ts")
    },

    // Config for our build files
    // Adding hashes to files for cache busting
    output: {
        path: helpers.root("dist")
    },

    module: {
        preLoaders: [{
                test: /\.ts$/,
                loader: "tslint",
                exclude: [
                    helpers.root("node_modules")
                ]
        }],
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
        
        // generating html
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: helpers.root("src/index.html")
        }),
        
        // replace
        new webpack.DefinePlugin({
            "process.env": {
                "ENV": JSON.stringify(metadata.ENV),
                "NODE_ENV": JSON.stringify(metadata.ENV),
                "HMR": HMR
            }
        })
    ],
    // Other module loader config
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host
    }
});
