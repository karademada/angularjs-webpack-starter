"use strict";

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import {AbstractController} from "app/modules/commons/controllers/abstract.controller";

export class HomeController extends AbstractController {

    public static $inject: Array<string> = ["$log", "$state"];

    public constructor(logger:ILogService, $state:IStateService) {
        super(logger, $state);
        logger.debug("Home controller loaded...");
    }
}
