"use strict";

const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    devtool: "cheap-module-eval-source-map", // source-map
    stats: { colors: true, reasons: true },
    resolve: {
        extensions: ["", ".ts", ".js", ".json", ".css", ".scss", ".html"]
    },
    debug: true,
    output: {
        filename: "[name].[hash].bundle.js",
        sourceMapFilename: "[name].[hash].map",
        chunkFilename: "[id].[hash].chunk.js"
    },
    module: {
        noParse: [
            // things that should not be parsed
        ]
    },
    node: {
        global: "window",
        progress: false,
        process: HMR? true: false,
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
    ],
    devServer: {
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};
