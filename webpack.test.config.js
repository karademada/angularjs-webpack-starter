"use strict";

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

// Helpers
const helpers = require("./helpers");

// Metadata
let ENV = process.env.ENV = process.env.NODE_ENV = "test";

/*
 * Config
 */
module.exports = {
    devtool: "inline-source-map",
    debug: true,
    stats: { colors: true, reasons: true },

    resolve: {
        cache: false,
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
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                query: {
                    "compilerOptions": {
                        "removeComments": true,
                    }
                },
                exclude: [
                    /\.e2e\.ts$/
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
            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: "raw-loader"
            },
            {
                test: /\.scss$/,
                loaders: [ "style", "css?sourceMap", "postcss?sourceMap", "sass?sourceMap" ]
            },

            // Sinon.js
            {
                test: /sinon\.js$/,
                loader: "imports?define=>false,require=>false"
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
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // Environment helpers
            "ENV": JSON.stringify(ENV),
            "NODE_ENV": JSON.stringify(ENV)
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
            browsers: ["last 2 versions"]
        })
    ]
};
