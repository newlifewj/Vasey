
# Summary
	All front-end scripts. In order to organize the AngularJS application, a conventional 
	structure (or modularization) is used. 

# Directories
	* lib/
		AngularJs framework and necessary modules (including 3rd-party modules). In general 
		we needn't other JavaScript libraries in AngularJS application. But sometimes other 
		lib may be helpful, e.g. jQuery and so on. Although we can use CDN resource in product 
		version for AngularJS and its official modules, but there may be more 3rd-party modules 
		in the lib/ directory. Furthermore, we prefer using local library in developing stage. 
		Even in product version, we should set CDN-fallback in case of CDN not working.
	* test/
		Script (AngularJS script) supporting e2e test framework. Of course this directory 
		will be excluded from product package.
	* directives/
		All the custom directives created by current App. Other 3rd-party directives locate 
		in lib/ directory. Here are the directives which will be implemented into many widgets 
		or components. There may be some directives defined in specific component or widget 
		modules. They just locate together with that component or widget because they are not 
		implemented elsewhere.
		In practice, we just use one module contain all custom directives - cstmDirectives.js. 
		And we always include this .js file in App.
	* widgets/
		All widgets defined in current App. Widgets obey the path/name convention strictly. 
		For example, a widget named WWW: There should a files here named WWW.js and the module 
		name is WWW. There should be a main-template file: /html/widgets/WWW.html (and other 
		supporting templates named WWW_tpltXXX ...). There should be a css file: /styles/widgets/ 
		WWW.css. A widget never depend on other widgets.
		Widgets are essential units to construct a panel and the addressing panels construct 
		a SPA. It's configurable, reusable and deployable. 
	* components/
		All components defined in current App. Components obey path/name convention strictly.
		There may be some views are meaningful modules, but they are neither widgets nor panels. 
		For example, the Head or Foot of the page, there are several widget instantiated in it 
		together with other markups. We don't want reuse Head or Foot and they are not panels.
	* panels/
		All panels deployed in current SPA. We can say each panel is a mini-app. If current 
		application is addressed, panels are addressing views. For example, clicking navigation 
		always lead to different panels.
	
# Files
	* App.js
		This is the bootstrap module of current SPA. We must boot SPA like that:
		<html data-ng-app="App"> ... </html> (App.js export the module 'APP'.). There are some
		system level settings and behaviors in it, e.g. parsing the JSON data transfered from 
		back-end, setting global variables in $rootScope.
		App.js is always included.
	* util.js and others
		Maybe other essential modules or tools are required. They are not specified for one 
		unit and always included like App.js.
	* README.md
		This file.
		
		
		
		
		