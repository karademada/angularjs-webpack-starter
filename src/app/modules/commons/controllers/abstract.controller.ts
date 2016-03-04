"use strict";

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

export abstract class AbstractController {
    logger:ILogService;
    $state:IStateService;

    static $inject = ["$log", "$state"];

    constructor(logger:ILogService, $state:IStateService) {
        this.logger = logger;
        this.$state = $state;
    }

    isCurrentState(stateName:string):boolean {
        //const currentIncludes = this.$state.includes(stateName);
        //const currentIs = this.$state.is(stateName);
        const currentName = this.$state.current.name;

        return currentName === stateName;
    }

    checkCurrentState() {
        return this.$state.current.name;
    }
}
