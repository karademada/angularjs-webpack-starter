"use strict";

import {homeModule} from "../../home";
import {FooController} from "./foo.controller";

// Pre-loading the html templates into the Angular's $templateCache
let templateFooUrl:any = require("./foo.template.html");

homeModule.component("foo", {
    controller: FooController,
    controllerAs: "vm",
    templateUrl: templateFooUrl,
});
