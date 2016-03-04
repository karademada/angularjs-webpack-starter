"use strict";

import IStateService = angular.ui.IStateService;

export abstract class AbstractController {
	$state:IStateService;

	constructor($state:IStateService) {
		this.$state = $state;
	}

	isCurrentState(stateName:string):boolean {
		const currentIncludes = this.$state.includes(stateName);
		const currentIs = this.$state.is(stateName);
		const currentName = this.$state.current.name;

		return currentName === stateName;
	}

	checkCurrentState() {
		return this.$state.current.name;
	}
}
