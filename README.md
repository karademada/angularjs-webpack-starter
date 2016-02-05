# AngularJS Webpack Template

## About
A Webpack Starter kit featuring:
* AngularJS (setup, angular-material, router, ...)
* TypeScript
* Redux
* Immutable.js
* RxJS
* Lodash
* SASS, PostCSS and Autoprefixer
* Karma
* Protractor
* Jasmine
* Istanbul
* TsLint
* Typings

And a complete build based on Webpack/npm scripts with:
* unit and e2e tests
* test coverage
* TS to ES5 transpilation
* SASS to CSS transpilation
* development and production configurations
* ...

## Angular 2
As you might know, Angular 2 is right around the corner. Be aware that this starter kit will soon be deprecated.

Note that this starter kit is derived from the Angular 2 Starter Kit: https://github.com/AngularClass/angular2-webpack-starter

## TODO
* fix interpolation in index.html
  * probably due to a dependency upgrade
  * that should fix the app e2e test
* fix e2e: https://github.com/AngularClass/angular2-webpack-starter/issues/264
* add SASS/PostCSS support to production build
* fix TypeError: Reduce of empty array with no initial value with npm run build:prod
* fix docs task exclude (should exclude unit & e2e tests): https://github.com/sebastian-lenz/typedoc/issues/170
* add Redux import (vendor.ts)
* add Lodash import (vendor.ts)
* initialize Redux store
* put back require.d.ts and remove custom one once that is merged: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/7049
* find how to get hot module reloading (hmr) with the webpack-dev-server
* find how to automatically open the browser when the server starts
* finalize readme
