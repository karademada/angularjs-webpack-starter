"use strict";

import {AbstractController} from "../commons/controllers/abstract.controller";
import IStateService = angular.ui.IStateService;

export class HomeController extends AbstractController {

    constructor($state:IStateService) {
        super($state);
        console.log("Home controller loaded...");
    }
}
