* 0.1.3
  * added missing core-js typings (#97)
  * added a way to have HMR but disable page reload for HMR failures (#96)
  * fixed stylesheets loading order (#95)
  * added security headers to production server configuration (#94)
  * added support for pushstate with the production build (#93)
  * created separate build for application styles in development (#92)
  * improved TSLint configuration for Angular 1.5 (#91)
  * put generated documents in the reports folder (#90)
  * added support for CSP (#72 and #114)
* 0.1.2
  * added ng template cache support (see #67)
  * configured commons module
  * enabled HTML5 mode
  * support for executing a subset of the unit tests (or a specific one)
  * enhanced TSLint configuration
  * support for executing unit tests against multiple Web browsers
  * centralized reports
* 0.1.1
  * separated base assets and other assets
  * fixed issues with TS helpers
  * improved npm scripts
  * add sinon.js
  * added webpack profiling task
  * improved tslint support
  * switched to a different TypeScript loader (awesome-typescript-loader)
  * updated dependencies
  * improved environment configuration
* 0.1.0
  * added a module registry
  * added basic i18n support
  * made hot module replacement optional
  * added HTML minification for production build
  * added css bundles for production build
  * fixed bug with the production build (#38)
  * added ui router configuration
  * added sass/postcss support for production build
  * enabled strict DI mode for AngularJS
  * upgraded dependency on tslint-loader to work around a webpack issue: https://github.com/wbuchwalter/tslint-loader/issues/18
  * added basic support & docs for proxy
* 0.0.2
  * improved sass configuration for dev and prod
    * support added in production
    * sourcemaps added in dev
  * fixed an issue with images (wrong path) (fixed #37)
  * switched to webpack-sha-hash (SHA-based content hashes) (closed #36)
  * added moment.js & typings (closed #33)
  * added typings for webpack (closed #35)
* 0.0.1
  * Initial version
