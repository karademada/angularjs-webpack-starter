"use strict";

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import {AbstractController} from "../../../commons/controllers/abstract.controller";

export class FooController extends AbstractController {

    static $inject = ["$log", "$state"];

    constructor(logger:ILogService, $state:IStateService) {
        super(logger, $state);
        logger.debug("Foo component loaded");
    }
}
