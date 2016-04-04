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
    public constructor() {
        this.modules = [];
        this.moduleNames = [];
    }

    /**
     * Clear the registry.
     */
    public clear():void {
        this.modules = [];
        this.moduleNames = [];
    }

    /**
     * Register a module
     * @param module the module to register
     */
    public registerModule(module:IModule):void {
        this.modules.push(module);
        this.moduleNames.push(module.name);
    }

    /**
     * Get the registered modules.
     * @returns {Array<IModule>}
     */
    public getModules():Array<IModule> {
        return this.modules;
    }

    /**
     * Get the names of the registered modules.
     * @returns {Array<string>}
     */
    public getModuleNames():Array<string> {
        return this.moduleNames;
    }
}
