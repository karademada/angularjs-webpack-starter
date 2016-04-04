import {ModuleRegistry} from "./commons/modules/module.registry";

import {commonsModule} from "./commons/commons";
import {homeModule} from "./home/home";

const moduleRegistry:ModuleRegistry = new ModuleRegistry();

// Register all your modules below
moduleRegistry.registerModule(commonsModule);
moduleRegistry.registerModule(homeModule);

exports.moduleRegistry = moduleRegistry;
