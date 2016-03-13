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
// Add any additional required operators here 
require("rxjs/add/operator/map");

// 3rd party styles
import "./app/css/vendor.scss";

if ("development" === ENV) {
    // ...
} else if ("production" === ENV) {
    // ...
} else {
    // ...
}
