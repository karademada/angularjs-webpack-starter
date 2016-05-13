"use strict";

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import {AbstractController} from "app/modules/commons/controllers/abstract.controller";

export class FooController extends AbstractController {

    // necessary to help AngularJS know about what to inject and in which order
    public static $inject: Array<string> = ["$log", "$state"];

    public constructor(logger:ILogService, $state:IStateService) {
        super(logger, $state);
        logger.debug("Foo component loaded");
    }
}
