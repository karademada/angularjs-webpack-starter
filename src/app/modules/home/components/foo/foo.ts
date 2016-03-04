"use strict";

import {homeModule} from "../../home";
import {FooController} from "./foo.controller";

homeModule.component("foo", {
    controller: FooController,
    controllerAs: "vm",
    template: require("./foo.template.html")
});
