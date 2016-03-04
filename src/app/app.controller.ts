"use strict";

import {AbstractController} from "./modules/commons/controllers/abstract.controller";
import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

// controller
export class AppController extends AbstractController {

    static $inject = ["$log", "$state"];

    constructor(logger:ILogService, $state:IStateService) {
        super(logger, $state);
        logger.debug("Application bootstrapped!");
    }
}
