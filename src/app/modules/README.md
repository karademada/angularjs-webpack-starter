# About
This folder should contain all modules of your application including everything they're made of; for example:
* controllers
* templates
* stylesheets
* unit tests
* models
* services
* directives
* filters
* ...

# Design approach
The idea is to isolate components as much as possible so that removing one can be done in a clean manner without worrying (too much) about side-effects.
Think of components as custom elements that enclose specific semantics, styling, and behaviour.

A component should solve one problem and solve it well.

# Organization and naming convention
Note that each module MUST respect the following organization & naming convention (not all files are required).
*  <module_name>: folder for the module
  * <module_name>.ts: AngularJS module definition: define the module and all that it is made of (components, services, ...)
  * components: folder containing all the components of that module
    * <component_name>: folder of a component in the module
      *  <component_name>.controller.ts: controller of the component (mandatory)
      *  <component_name>.controller.spec.ts: unit tests for the controller of the component (mandatory)
      *  <component_name>.template.html: template/partial view of the component (mandatory)
      * _<component_name>.scss: styles for the component (optional). Pay attention to the `_` at the beginning)
      *  <component_name>.model.ts: model of the component (optional)
  * services: folder containing all the services of that module      
    * <service_name>.service.ts: a service (optional)
    * <service_name>.service.spec.ts: unit tests for a service (optional)
  * filters: folder containing all the filters of that module  
    *  <filter_name>.filter.ts (optional)
    *  <filter_name>.filter.spec.ts: unit tests for a filter

If the name of a module or component is composed (which you should avoid if possible), then separate the parts with hyphens (-).

# Additional guidelines
* each component MUST be placed in its own directory
* respect the namespace rule above to correctly isolate/encapsulate the component
* components CANNOT be nested (i.e., use a flat structure)

# CSS components
* all selectors in a component MUST start with the component name in order to create an isolated namespace for each component
* follow the design approach and naming convention described [here](../css/README.md)
