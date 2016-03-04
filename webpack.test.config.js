"use strict";

const webpack = require("webpack");

// Helpers
const helpers = require("./helpers");

// Metadata
let ENV = process.env.ENV = process.env.NODE_ENV = "test";

/*
 * Config
 */
module.exports = helpers.defaults({ // notice that we start with the defaults and work upon that
    resolve: {
        cache: false,
    },
    devtool: "inline-source-map",
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                query: {
                    // remove TypeScript helpers to be injected below by DefinePlugin
                    "compilerOptions": {
                        "noEmitHelpers": true,
                        "removeComments": true,
                    }
                },
                exclude: [
                    /\.e2e\.ts$/,
                    helpers.root("node_modules")
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
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
        ],
        noParse: []
    },
    plugins: [
        new webpack.DefinePlugin({
            // Environment helpers
            "process.env": {
                "ENV": JSON.stringify(ENV),
                "NODE_ENV": JSON.stringify(ENV)
            }
        }),
        new webpack.ProvidePlugin({
            // TypeScript helpers
            "__metadata": "Reflect.metadata",
            "__decorate": "Reflect.decorate",
            "__awaiter": "ts-helper/awaiter",
            "__extends": "ts-helper/extends",
            "__param": "ts-helper/param"
        })
    ]
});
