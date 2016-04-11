"use strict";

// Load all third party dependencies

// AngularJS
import "angular";

import "angular-ui-router";
import "angular-translate";
import "angular-translate-loader-static-files";

// Angular Material
import "angular-material";

// JSData
import "js-data";

// Immutable
import "immutable";
import "immutable-angular";

// RxJS
import "rxjs";

// RxJS operators
import "./rxjs-operators";

// MomentJS
import "moment";

// 3rd party styles
if(PRODUCTION) {
    // We only import the vendor styles here for the production build
    // In development, vendor-styles.ts takes care of that (separate bundle)
    require("./app/css/vendor.scss");
}
