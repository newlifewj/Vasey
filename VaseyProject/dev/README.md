
# --- dev directory ---

### Summary
We need more in developing than the published product, e.g. the test, documents ...
Files in this directory are developing only resource. So this directory will not be built
into production package.
For some reasons, not all developing resources are located in this directory. For example 
all .md documents are developing files, but it's better to place them accompanied with relevant 
source code. (There are other developing-files located out of dev/ directory)

### e2e folder
Resources for e2e test runner. [e2e test solution] (/_doc/readme?readme=/dev/e2e/README.md)

### doc folder
Resources for markdown documents reader. [markdown reader] (/_doc/readme?readme=/dev/doc/README.md)

### 
# Summary
	Files for unit-e2e test. We use an unit test solution to decouple test with application. 
	Through testing each UI unit, we can test not only front-end appearance and behavior, but 
	also the related back-end logic supporting the UI. It's end-to-end test running in real 
	environment. In order to perform test, UI units should be created 'conventionally':
	* Name convention
		Main files of one unit should share same name (except extension), template name 
		(e.g. myUnit.html or myUnit.ejs), main script filename (e.g. myUnit.js), main css 
		filename (e.g. myUnit.css) and class name of the unit container (e.g <div class='myUnit'..,).
		Note: 'mian file', not all. An unit maybe depend on multiple script or css files.
	* Classification convention (type convention)
		All the UI units fall into 3 type: widgets, components and panels.
	* Path convention
		The files supporting UI unit should locate in default directories. 
		1 template: /resources/html/[type]/[name].html or /views/templates/[type]/[name].ejs
		2 script:	/resources/scripts/[type]/[name].js.
		3 css:		/resources/styles/[type]/[name].css.
		We can see the isomorphic structure in ./resources/html, ./views/ejs, ./resources/scripts, 
		./resource/styles and ./test/models
		
# Directories
	* models
		When a view unit is instantiated, we can use 'model' initialize it (through ng-init).
		The passed-in model is passed form parent view or previous view. Now we perform unit 
		test, it's necessary to define this model by hand. 
		The test model are independent .json files, the test framework will find them according 
		to path/name convention.
	* cfgs
		The json config objects for units. In general, only some of the widget units are configurable. 
		There may be multiple config objects for one unit. 
		
# Files
	* test.js	
		The router processing the test request and scaffolding the test. The main work is parsing 
		test.json (unit testing config) file and render a test-hosting page.
	* test.ejs (not in ./test directory)
		It should located here, but Express use another directory as 'views'. Although we have  
		put it in ./views/, but it's belong to test. 
		Driven by test.js, test.ejs will host the tested unit according to the URL and its config 
		in test.json.
	* test.json
		The config file for test. It's an JSON array, each member is a test unit. test.ejs will 
		generate a test-index for all testable unit configured in test.json. When an unit was 
		specified in test URL, test.js can find its config by searching test.json. Then this unit 
		is hosted by test.ejs correctly.
	* README.md
		This file.
		
		
		
		
		
		
		
	