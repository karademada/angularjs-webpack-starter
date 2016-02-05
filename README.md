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
* TSLint
* Typings
* TSDoc

... and a complete build based on Webpack/npm scripts with:
* hot module replacement (HMR): https://webpack.github.io/docs/hot-module-replacement.html
* unit tests (Karma & Jasmine)
* end to end tests (Protractor)
* test coverage reports (Istanbul)
* TS to ES5 transpilation (TypeScript)
* SASS to CSS transpilation
* TS quality/style checks (TSLint)
* TS code documentation generation (TSDoc)
* development and production configurations
* 
* ...

Check out the [change log](CHANGELOG.md)

## Angular 2
As you might know, Angular 2 is right around the corner. Be aware that this starter kit will soon be deprecated.

Note that this starter kit is derived from the Angular 2 Starter Kit: https://github.com/AngularClass/angular2-webpack-starter

## Status & roadmap
Check out the issues & labels to get an idea of what's next. For existing features, refer to the previous section.

## Installation
...

## Upgrade
Check out the [upgrade](UPGRADE.md) page

## Frequently Asked Questions (FAQ)
...

## Contributing
* Fork the project
* Create a feature branch in your fork
* Rebase  if needed to keep the project history clean
* Commit your changes & push to GitHub
* Try and flood me with pull requests :)

## Releasing a version

* commit all changes to include in the release
* edit the version in package.json
* respect semver
* update CHANGELOG.md
* update UPGRADE.md
* commit
* git tag
* git push --tags
* draft the release on GitHub (add description, etc)
* npm publish

## TODO
* load immutable
* add Redux import (vendor.ts)
* initialize Redux store
* add jsdata
* add SASS/PostCSS support to production build
* fix e2e: https://github.com/AngularClass/angular2-webpack-starter/issues/264
* fix docs task exclude (should exclude unit & e2e tests): https://github.com/sebastian-lenz/typedoc/issues/170
* put back require.d.ts and remove custom one once that is merged: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/7049
* fix production build
  * https://github.com/erm0l0v/webpack-md5-hash/issues/1
  * TypeError: Reduce of empty array with no initial value 
* extract build to a separate project
* create a yeoman generator
* finalize readme
  * add installation notes
  * add explanations of the setup
  * add commands
  * list & explain dependencies
  * add badges
* upgrade to webpack 2 a webpack-dev-server 2
  * https://gist.github.com/sokra/27b24881210b56bbaff7
  * should allow to automatically open the browser when the server starts

## License
This project and all associated source code is licensed under the terms of the [MIT License](https://en.wikipedia.org/wiki/MIT_License).
