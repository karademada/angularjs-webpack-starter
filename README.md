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

... and a complete build based on Webpack/npm scripts with:
* unit and e2e tests
* test coverage reports
* TS to ES5 transpilation
* SASS to CSS transpilation
* TS quality/style checks
* TS code documentation generation
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
* update CHANGELOG.MD
* commit
* git tag
* git push --tags
* draft the release on GitHub (add description, etc)
* npm publish

## TODO
* load immutable
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
  * add installation notes
  * add explanations of the setup
  * add commands
  * add faq
  * list & explain dependencies
  * add badges


## License
This project and all associated source code is licensed under the terms of the [MIT License](https://en.wikipedia.org/wiki/MIT_License).
