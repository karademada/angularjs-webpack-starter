"use strict";

const webpack = require("webpack");

// Helpers
const helpers = require("./helpers");

// Webpack Plugins
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const ForkCheckerPlugin = require("awesome-typescript-loader").ForkCheckerPlugin;
const WebpackSHAHash = require("webpack-sha-hash");

// Metadata
const METADATA = {
    title: "AngularJS Webpack Starter",
    baseUrl: "/",
};

/*
 * Config
 * reference: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    // static data for index.html
    metadata: METADATA,

    stats: {
        colors: true,
        reasons: true,
    },

    // Options affecting the output of the compilation
    // reference: http://webpack.github.io/docs/configuration.html#output
    output: {
        // Mandatory but not actually useful since everything remains in memory with webpack-dev-server
        // reference: http://webpack.github.io/docs/configuration.html#output-path
        path: helpers.root("dist"),
        // We need to tell Webpack to serve our bundled application
        // from the build path. When proxying:
        // http://localhost:3000/ -> http://localhost:8080/
        publicPath: "/",
        // Adding hashes to files for cache busting
        // IMPORTANT: You must not specify an absolute path here!
        // reference: http://webpack.github.io/docs/configuration.html#output-filename
        filename: "[name].[hash].bundle.js",
        // The filename of the SourceMaps for the JavaScript files.
        // They are inside the output.path directory.
        // reference: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
        sourceMapFilename: "[name].[hash].map",
        // The filename of non-entry chunks as relative path
        // inside the output.path directory.
        // reference: http://webpack.github.io/docs/configuration.html#output-chunkfilename
        chunkFilename: "[id].[hash].chunk.js",
    },

    // Options affecting the resolving of modules.
    // reference: http://webpack.github.io/docs/configuration.html#resolve
    resolve: {
        cache: false,
        // an array of extensions that should be used to resolve modules.
        // reference: http://webpack.github.io/docs/configuration.html#resolve-extensions
        extensions: [ "", ".ts", ".js", ".json", ".css", ".scss", ".html" ],

        // Add folders where modules are located (useful to avoid having to specify '../../../Foo/Bar' kind of imports
        // reference: http://webpack.github.io/docs/configuration.html#resolve-root
        root: [
            helpers.root("src"),
        ],
        
        // Remove other default values
        // can be used to configure all locations where Webpack's module resolver will look for modules
        modulesDirectories: [
            helpers.root("node_modules")
        ],
    },

    // Webpack's loader loading configuration
    // reference: http://webpack.github.io/docs/configuration.html#resolveloader
    resolveLoader: {
        
        // Where Webpack looks for loaders
        // can be customized so that Webpack can find loaders in other locations 
        modulesDirectories: [
            helpers.root("node_modules"),
        ],
        
        // default values kept
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
        packageMains: ["webpackLoader", "webLoader", "loader", "main"]
    },

    // Options affecting the normal modules.
    // reference: http://webpack.github.io/docs/configuration.html#module
    module: {
        // things that should not be parsed
        noParse: [
            // ...
        ],

        // An array of applied pre and post loaders.
        // reference: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
        preLoaders: [
            // TSLint loader support for *.ts files
            // reference: https://github.com/wbuchwalter/tslint-loader
            {
                test: /\.ts$/,
                loader: "tslint",
                exclude: [
                    helpers.root("node_modules"),
                ]
            },

            // Source map loader support for *.js files
            // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
            // reference: https://github.com/webpack/source-map-loader
            {
                test: /\.js$/,
                loader: "source-map",
                exclude: [
                    helpers.root("node_modules/rxjs"),
                ],
            },
        ],

        // An array of automatically applied loaders.
        //
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        //
        // reference: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: [
            // Support for *.json files
            {
                test: /\.json$/,
                loader: "json",
            },

            // Support for CSS as raw text
            // reference: https://github.com/webpack/raw-loader
            {
                test: /\.css$/,
                loader: "raw",
            },

            // Support for SASS
            // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
            {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract("style", "css?sourceMap!postcss?sourceMap!sass?sourceMap"),
                // Alternative: avoid using extract-text-webpack-plugin
                // with the alternative, the stylesheets MUST be imported in code (e.g., require("..."))
                // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
                // loaders: ["style", "css?sourceMap", "postcss?sourceMap", "sass?sourceMap"],
            },

            // Support for .html with ngTemplate loader to use the Angular's $templateCache service
            {
                test: /\.html$/,
                loaders: [ "ngtemplate", "html" ],
                exclude: [
                    helpers.root("src/index.html"),
                ],
            },

            // Sinon.js
            {
                test: /sinon\.js$/,
                loader: "imports?define=>false,require=>false",
            },
        ],
        
        // Post processors
        postLoaders: [
            // ...
        ],
    },

    // Add additional plugins to the compiler.
    // reference: http://webpack.github.io/docs/configuration.html#plugins
    plugins: [
        // Plugin: ForkCheckerPlugin
        // Description: Do type checking in a separate process, so webpack don't need to wait.
        // reference: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
        new ForkCheckerPlugin(),
        
        // Plugin: NoErrorsPlugin
        // Description: Only emit files when there are no errors.
        // reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        new webpack.NoErrorsPlugin(),

        // Plugin: CopyWebpackPlugin
        // Description: Copy files and directories in webpack.
        // Copies project static assets.
        // reference: https://www.npmjs.com/package/copy-webpack-plugin
        new CopyWebpackPlugin([
            {
                from: helpers.root("src/app/assets"),
                to: "assets",
                ignore: [
                    "*.md",
                    "*.txt",
                ],
            },
            {
                from: helpers.root("src/app/assets-base"),
                to: "",
                ignore: [
                    "*.md",
                    "*.txt",
                ],
            },
        ]),

        // Plugin: HtmlWebpackPlugin
        // Description: Simplifies creation of HTML files to serve your webpack bundles.
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation.
        // reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: helpers.root("src/index.html"),
            chunksSortMode: helpers.packageSort([
                "polyfills",
                "vendor",
                "main",
            ]),
        }),

        // Plugin: WebpackSHAHash
        // Description: Generate SHA content hashes
        new WebpackSHAHash(),
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
        failOnHint: false,

        resourcePath: helpers.root("src"),

        // can be used to customize the path to the directory containing formatter (optional)
        //formattersDirectory: helpers.root("node_modules/tslint-loader/formatters/"),
    },

    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    // reference: https://webpack.github.io/docs/configuration.html#node
    node: {
        global: "window",
        process: false,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },

    // PostCSS plugins configuration
    // Reference: https://github.com/postcss/postcss
    postcss: [
        // Autoprefixing
        // Reference: https://github.com/postcss/autoprefixer
        autoprefixer({
            browsers: [ "last 2 versions" ],
        }),
    ],
};
