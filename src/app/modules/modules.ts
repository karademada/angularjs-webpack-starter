import IModule = ng.IModule;

import {ModuleRegistry} from "./commons/modules/module.registry";

import {homeModule} from "./home/home";

const moduleRegistry:ModuleRegistry = new ModuleRegistry();

// Register all your modules below
moduleRegistry.registerModule(homeModule);

exports.moduleRegistry = moduleRegistry;
