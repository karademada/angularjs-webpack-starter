"use strict";

import {AbstractController} from "./modules/commons/controllers/abstract.controller";
import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

// controller
export class AppController extends AbstractController {

    // necessary to help AngularJS know about what to inject and in which order
    static $inject = ["$log", "$state"];

    constructor(logger:ILogService, $state:IStateService) {
        super(logger, $state);
        logger.debug("Application bootstrapped!");
    }
}
