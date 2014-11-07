
# --- e2e Unit Test Runner ---

Present an Unit-List for testing. The Runner can load script, template(html or ejs) and 
styles (including all dependencies) of the tested unit. So the View of the selected unit 
is presented. While an unit is testing, tester can also read its markdown document - if 
existing.

### Summary
Writing test suit is a heavy burden for developers. And it's difficult to maintain the
TDD or BDD test code synchronously with code updating. Finally, the test code become 
useless at all. Further more, the 'jasmine-like' unit testing doesn't make sense in
front-end View components.
That's why we prefer using e2e test -- the Unit Watching Test by human being. The pros 
are obviously:
+ Needn't write and maintain test code except a few of easy .json config files.
+ The e2e unit watching test is helpful for both developers and users. (Even we use BDD
or TDD testing, developer and client still need watch the UI, right?) 

### Mechanism
The e2e Unit Test Runner require **this** project seed. Basing the project structure 
convention, naming convention and test.json configuration, the e2e-runner can find correct 
resources for the testing unit.
There are some restricts for creating the View Units. The restricts are necessary not only
for test, but also for UI modularization. Developers will get benefits from the View unit
stereotypes. Basing the unit stereotypes, the e2e Unit Test Runner can present the unit 
View correctly.
[View Unit Convention and Restriction] (/_doc/readme?readme=/dev/wiki/unitConvention.md)

### Unit Test Runner
--'/_test'-- is the base URL of the Runner. It will present a blank view port and a list of
View Units available for test, clicking an unit will render it in view port.
The testing unit is deep-linnking, e.g. --'localhost:3000/_test/components/fooComponent'-- 
will present a component named 'fooComponent'.

### Document
Except run e2e testing, the Runner provide a link 'readme' to display the document of current
testing unit. The Runner can find the document if it's available and floowing the convention
for naming and location. Document for an unit should locate accompanied with the unit. For 
example, 'scripts/components/fooComponent.js' and 'scripts/components/fooComponent.md'

### Configuration
We needn't write test-suit for each unit, however it's necessary to write JSON files for 
test configuration
**test.json** (Only one for an App)
This file indicate the Runner what units need test, where are they and the dependencies of 
each one. For example:

	[
		{
			"type":"static",
			"path": "widgets/", 
			"name": "demoWidget",
			"modules": [
			            	{"path":"widgets/", "name":"demoWidget"}
			            ]
		},
	
		{
			"type":"dynamic",
			"path": "components/", 
			"name": "dynamicComponent",
			"modules": [
			            	{"path":"components/", "name":"dynamicComponent"},
			            	{"path":"widgets/", "name":"demoWidget"}
			           ]
		},
		...
	]

	/*
	 	type='static': default, using html template; 'dynamic' means using ejs template/
	 	path: relative path basing '/resource' directory.
	 	name: the file name of this unit.
	 	modules: what modules are depended. (Each unit must depend it self)
	*/

**test model, xxx.json** (a file for each unit)
Most View units are driven by model data (except some specials). In practice, the models 
are Ajax data, localStorage or .... But we prefer using static data for test to isolate the 
unit completely. Mostly, the model was created by developer. The models are named with same 
names as the units. and they locate in e2e/models/ inside respective folders. For example, 
a model for 'fooComponent' should be e2e/models/components/fooComponent.json:
	{
		"field1":"xxx",
		"field2":[...],
		...
	}



		
		
		
		
	