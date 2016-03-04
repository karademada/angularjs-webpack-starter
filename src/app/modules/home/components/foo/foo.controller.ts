"use strict";

import IStateService = angular.ui.IStateService;
import {AbstractController} from "../../../commons/controllers/abstract.controller";

export class FooController extends AbstractController {
    constructor($state:IStateService) {
        super($state);
        console.log("Foo component loaded");
    }
}
