"use strict";

import IModule = ng.IModule;

/**
 * Simple registry of modules.
 */
export class ModuleRegistry {

    /**
     * The modules.
     * @type {Array}
     */
    private modules:Array<IModule>;

    /**
     * The module names.
     * @type {Array}
     */
    private moduleNames:Array<string>;

    /**
     * Create a module registry.
     */
    constructor() {
        this.modules = [];
        this.moduleNames = [];
    }

    /**
     * Clear the registry.
     */
    clear():void {
        this.modules = [];
        this.moduleNames = [];
    }

    /**
     * Register a module
     * @param module the module to register
     */
    registerModule(module:IModule):void {
        this.modules.push(module);
        this.moduleNames.push(module.name);
    }

    /**
     * Get the registered modules.
     * @returns {Array<IModule>}
     */
    getModules():Array<IModule> {
        return this.modules;
    }

    /**
     * Get the names of the registered modules.
     * @returns {Array<string>}
     */
    getModuleNames():Array<string> {
        return this.moduleNames;
    }
}
