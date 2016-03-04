"use strict";

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import {AbstractController} from "../commons/controllers/abstract.controller";

export class HomeController extends AbstractController {

    static $inject = ["$log", "$state"];

    constructor(logger:ILogService, $state:IStateService) {
        super(logger, $state);
        logger.debug("Home controller loaded...");
    }
}
