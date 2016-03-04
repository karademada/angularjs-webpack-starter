"use strict";

import {AbstractController} from "./modules/commons/controllers/abstract.controller";
import IStateService = angular.ui.IStateService;

// controller
export class AppController extends AbstractController {
    constructor($state:IStateService) {
        super($state);
        console.log("Application bootstrapped!");
    }
}
