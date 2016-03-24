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
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// Metadata
const ENV = process.env.ENV = process.env.NODE_ENV = "development";
const HMR = helpers.hasProcessFlag("hot");
const PRODUCTION = false;
const DEVELOPMENT = true;

const METADATA = {
    title: "AngularJS Webpack Starter",
    baseUrl: "/",
    HOST: "localhost",
    PORT: 3000,
    ENV: ENV,
    HMR: HMR,
    PRODUCTION: PRODUCTION,
    DEVELOPMENT: DEVELOPMENT
};

/*
 * Config
 * reference: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    // static data for index.html
    metadata: METADATA,
    
    // Developer tool to enhance debugging
    // reference: https://webpack.github.io/docs/configuration.html#devtool
    // reference: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
    devtool: "source-map",

    // Cache generated modules and chunks to improve performance for multiple incremental builds.
    // Enabled by default in watch mode.
    // You can pass false to disable it
    // reference: http://webpack.github.io/docs/configuration.html#cache
    //cache: true,
    
    // Switch loaders to debug mode
    // reference: http://webpack.github.io/docs/configuration.html#debug
    debug: true,
    
    stats: {
        colors: true,
        reasons: true
    },

    // the entry point for the bundles
    // reference: http://webpack.github.io/docs/configuration.html#entry
    entry: {
        "polyfills": helpers.root("src/polyfills.ts"),
        "vendor": helpers.root("src/vendor.ts"),
        "main": helpers.root("src/main.ts")
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
        chunkFilename: "[id].[hash].chunk.js"
    },

    // Options affecting the resolving of modules.
    // reference: http://webpack.github.io/docs/configuration.html#resolve
    resolve: {
        // an array of extensions that should be used to resolve modules.
        // reference: http://webpack.github.io/docs/configuration.html#resolve-extensions
        extensions: [ "", ".ts", ".js", ".json", ".css", ".scss", ".html" ]
    },

    // Options affecting the normal modules.
    // reference: http://webpack.github.io/docs/configuration.html#module
    module: {
        noParse: [
            // things that should not be parsed
        ],
        
        // An array of applied pre and post loaders.
        // reference: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
        preLoaders: [
            // TsLint loader support for *.ts files
            // reference: https://github.com/wbuchwalter/tslint-loader
            {
                test: /\.ts$/,
                loader: "tslint",
                exclude: [
                    helpers.root("node_modules")
                ]
            },

            // Source map loader support for *.js files
            // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
            // reference: https://github.com/webpack/source-map-loader
            {
                test: /\.js$/,
                loader: "source-map",
                exclude: [
                    helpers.root("node_modules/rxjs")
                ]
            }
        ],

        // An array of automatically applied loaders.
        //
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        //
        // reference: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: [
            // Support for .ts files.
            // reference: https://github.com/s-panferov/awesome-typescript-loader
            {
                test: /\.ts$/,
                loader: "awesome-typescript",
                exclude: [
                    /\.e2e\.ts$/,
                    /\.spec\.ts$/,
                ]
            },
            
            // Support for .json files.
            {
                test: /\.json$/,
                loader: "json"
            },

            // Support for CSS as raw text
            // reference: https://github.com/webpack/raw-loader
            {
                test: /\.css$/,
                loader: "raw"
            },

            // Support for SASS
            // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
            {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract("style", "css?sourceMap!postcss?sourceMap!sass?sourceMap")
                // Alternative: avoid using extract-text-webpack-plugin
                // with the alternative, the stylesheets MUST be imported in code (e.g., require('...'))
                // Reference: http://ihaveabackup.net/2015/08/17/sass-with-sourcemaps-webpack-and-live-reload/
                // loaders: ["style", "css?sourceMap", "postcss?sourceMap", "sass?sourceMap"]
            },

            // Support for .html with ngTemplate loader to use the Angular's $templateCache service
            {
                test: /\.html$/,
                loaders: ["ngtemplate", "html"],
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

    // Add additional plugins to the compiler.
    // reference: http://webpack.github.io/docs/configuration.html#plugins
    plugins: [
        // Plugin: ForkCheckerPlugin
        // Description: Do type checking in a separate process, so webpack don't need to wait.
        // reference: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
        new ForkCheckerPlugin(),

        // Plugin: WebpackSHAHash
        // Description: Generate SHA content hashes
        new WebpackSHAHash(),
        
        // Plugin: OccurenceOrderPlugin
        // Description: Varies the distribution of the ids to get the smallest id length
        // for often used ids.
        // reference: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        // reference: https://github.com/webpack/docs/wiki/optimization#minimize
        new webpack.optimize.OccurenceOrderPlugin(true),

        // Plugin: CommonsChunkPlugin
        // Description: Shares common code between the pages.
        // It identifies common modules and put them into a commons chunk.
        // reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        // reference: https://github.com/webpack/docs/wiki/optimization#multi-page-app
        new webpack.optimize.CommonsChunkPlugin({
            name: [ "main", "vendor", "polyfills" ],
            filename: "[name].[hash].bundle.js",
            minChunks: Infinity
        }),

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
        
        // Plugin: HtmlWebpackPlugin
        // Description: Simplifies creation of HTML files to serve your webpack bundles.
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation.
        // reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: helpers.root("src/index.html"),
            chunksSortMode: "none"
        }),

        // Plugin: ExtractTextWebpackPlugin
        // Description: Extract css file contents
        // reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextWebpackPlugin("[name].[hash].css", {
            disable: false
        }),

        // Environment helpers (when adding more properties make sure you include them in environment.d.ts)
        // Plugin: DefinePlugin
        // Description: Define free variables.
        // Useful for having development builds with debug logging or adding global constants.
        // reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new webpack.DefinePlugin({
            "ENV": JSON.stringify(METADATA.ENV),
            "HMR": METADATA.HMR,
            "PRODUCTION": METADATA.PRODUCTION,
            "DEVELOPMENT": METADATA.DEVELOPMENT
        })
    ],
    
    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    // reference: https://webpack.github.io/docs/configuration.html#node
    node: {
        global: "window",
        //progress: false,
        process: true,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false
    },
        
    // Static analysis linter for TypeScript advanced options configuration
    // Description: An extensible linter for the TypeScript language.
    // reference: https://github.com/wbuchwalter/tslint-loader
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: "src"
    },

    // PostCSS plugins configuration
    // Reference: https://github.com/postcss/postcss
    postcss: [
        // Autoprefixing
        // Reference: https://github.com/postcss/autoprefixer
        autoprefixer({
            browsers: [ "last 2 versions" ]
        })
    ],
    
    // Webpack Development Server configuration
    // Description: The webpack-dev-server is a little node.js Express server.
    // The server emits information about the compilation state to the client,
    // which reacts to those events.
    // reference: https://webpack.github.io/docs/webpack-dev-server.html
    devServer: {
        port: METADATA.PORT,
        host: METADATA.HOST,

        // HTML5 History API support: no need for # in URLs
        // automatically redirect 404 errors to the index.html page
        historyApiFallback: true,

        // file watch configuration
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        contentBase: helpers.root("src/app"), // necessary so that assets are accessible
        
        // Can be used to add specific headers
        headers: {
            // enable CORS
            "Access-Control-Allow-Origin": "*"
        }
    }
};
