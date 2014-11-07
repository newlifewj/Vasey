# --- Unit Convention ---
A complex View or even the whole SPA-UI is composed with multiple units (or modules). It's 
very difficult to create a big mono UI and it's always a bad work.
+ Make things easy, we can cope with simple components one by one.
+ The components are reuseable, we can include one unit into different functional Views.
+ The components are testable (unit testing).
+ The components are loose coupled, so maintaining them and the UI are easier.

### Unit Types
There are **4** types units, directive, widget, component and panel.

#### Directive
The AngularJS directives are most independent units. They are the easiest unit can be shared 
by different applications with tidy syntax. But it's not easy to transfer model to/from them.
_**Just AngularJS directive**_

#### Widget
Mostly we use 'Widget' for common View Unit other than 'Directive' because the widget is more
flexible and the syntax is easier. A widget always has three files with **identical names**: 
module, template and css file, e.g. _xxxWidget.js, xxxWidget.html(or .ejs, .jsp, ...) and_ 
_xxxWidget.css_. 
+ Widgets are not related with business, so it can be used in other application.
+ The model required by a widget should be transfered in by 'ngInit' from outer scopes.
+ A widget is a MVP-like implementation.

#### Component
Components are functional units meaningful for current business. A component might include one
or multiple widgets. Like widget, a component also has three files with **identical names**: 
module, template and css file, e.g. _xxxComponent.js, xxxComponent.html(or .ejs, .jsp, ...) and_ 
_xxxComponent.css_, but it depends on resources of the included widgets (if widgets included). 
A component could include other components **if it's really necessary**.
+ Components are coupled with current business, e.g. retrieving data from a server.
+ We can reuse components only in **current application**.
+ If widgets included in, the host-component should provide model to them.
+ We can transfer model to a component by 'ngInit' from outer scopes.

#### Panel
Panels are navigating-switch View, like 'pages' in traditional web application. A page is a 
prehensive UI for definite business in current application. In general, a SPA include multiple 
panels and user perform different operation by switching to relevant panel. If the application 
is addressed, a panel always corresponds to its own addressing pattern. A panel is composed 
with components and widgets. Again, a panel also has three files with **identical names**: 
module, template and css file, e.g. _xxxPanel.js, _xxxPanel.html(or .ejs, .jsp, ...) and_ 
_xxxPanel.css_. 

### Locations of the units in a project
The conventional units should located in its _Conventional Location_. All files should locate 
in the web-resource directory (resource for client-side), except some dynamic templates (that 
is back-end related)

#### Html templates

+ _/html/directives/_ 
+ _/html/widgets/_ 
+ _/html/components/_ 
+ _/html/panels/_ 

#### Modules driving the unit

+ _/scripts/directives/_ 
+ _/scripts/widgets/_ 
+ _/scripts/components/_ 
+ _/scripts/panels/_ 

#### CSS files

+ _/styles/directives/_ 
+ _/styles/widgets/_ 
+ _/styles/components/_ 
+ _/styles/panels/_ 

### Compose a View with units

Including units inside (instantiating units) to get a larger view. e.g. including widgets 
in a view to compose a component, and including components to compose a panel, ... 

#### Unit container and instantiation
We use a boilerplate markup as container to instantiate units -- **except directive**, 
directives are used in its own way. 
	<div class='xxxCtner' data-ng-controller='_scopeCtrl' 
				data-ng-include='URL' data-ng-init='model=MODEL'>
	</div>
**xxxCtner:**  The a class attribute must add to the container, 'xxx' is the unit_name. (The 
styles in unit's css file are scoped by its name, e.g. 'xxx' other than 'xxxCtner')

**_scopeCtrl**  The scope-limiting controller has been defined globally.

**URL**  Constant or variable specify the url point to the template (static or dynamic) of 
the unit. After the template loading, relevant controller will be invoked.

**model=Model**  Transfer Model to the model object used in unit. Don't bind the data with 
a real name of parent scope! Instead we use _ngInit_ transfer data from outside. Here the 
data object used in unit is 'model' -- it's the best name. And 'Model' could be a variable 
in outer scope or just a constant object.  

For example:
	<div class='myComponentCtner' data-ng-controller='_scopeCtrl' 
				data-ng-include='"/html/components/myComponent.html"' 
				data-ng-init='model=loadedModel'>
	</div>

In the upper code, we instantiate a component unit -- myComponent to <div> container. The 
url is fixed for myComponent, "/html/components/myComponent.html". And an object in current 
scope. loadedModel, is transfered to the unit instance. (**Note:** Actually the model is 
transfered to _scopeCtrl scope and the unit access the model by up-traversal)

As a matter of fact, we can also use a variable in current scope to instantiate dynamic units.


### Make units configurable
Each unit is supported by its css file which define the appearance of the unit. That means 
the appearance is same for all instances of this unit (if it's instantiated multi-times). 
This make sense for most situation. But how about we need the instances of the same unit are 
differently in some way, either in their appearance or behavior?

#### config mechanism
AngularJS can help us create dynamic view. Basically, the dynamic unit should clarify an API 
for configuration. We use an object to make an unit to be configurable.

	<div class='xxxCtner' data-ng-controller='_scopeCtrl' 
				data-ng-include='URL' data-ng-init='cfg=CFG; model=MODEL'>
	</div>

Compare with upper sample code, only **'cfg=CFG;'** added for the unit instantiation markup. 
The cfg object should used in the unit to control the dynamic features, so we only need assign 
relevant values to change the dynamic appearances and behaviors.
Inside the unit, cfg is used to drive some AngularJS directives such as ngStyle, ngClass, ngIf 
and so on. 

#### config API
The cfg object is the config API, the unit should expose it in the document.



