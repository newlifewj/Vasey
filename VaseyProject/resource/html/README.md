
# Summary
	AngularJS use Ajax-loading partials as dynamic markups - the template html. All the html 
	templates (partials) locate in ./resource/html directory. According to the path and name 
	convention, there are 4 sub directories respectively: /panels, /components, /widgets and 
	/directives. 
	Note: Sometimes we need dynamic partials driven by back-end. They locate in .views/ejs. 
	However, no reason to create dynamic directive and widgets.
	
# Directories
	* directives
		Directive is not an independent View Unit -- it's a small functional part. The main 
		purpose of using directive is reusing some common behavior or view. We can't test a 
		directive if it's not used by other View. For example, how can we test ngClick if it's 
		not instantiated in a button (or others) element?
		The html template with same-name for a directive is just a testing markup - not a view 
		in application. For example, we have a directive named DDD.js. So we need create a test 
		markup named DDD.html using DDD for test. But DDD.html is not an application unit.
		Except the testing markup, there maybe other htmls for this directive because some directive 
		need 'templateUrl'. Directive use 'templateUrl' loading some markups in its instance. We 
		use '_' naming them. For example, a directive named DDD.js, its testing html is DDD.html 
		and it need an Ajax-loading template named DDD_template.html 
	* widgets
		The html templates for all widgets. The main-template is named according to name convention.
		For example, a widget named WWW, its main template named WWW.html. There maybe other templates 
		supporting the WWW widget, they are named with '_', e.g. WWW_tpltXXX.html.
		A widget maybe implement directives.
	* components
		The html templates for all components. The main-template is named according to name convention.
		For example, a component named CCC which main template should be CCC.html. Other supporting 
		template files should be name with '_', e.g. CCC_tpltXXX.html.
		A component maybe includes other widgets and implements directives.
	* panels
		The html for all panels. Main-template of a panel, e.g. PPP, should be named as PPP.html. 
		Other supporting templates should be named with '_', e.g. PPP_tpltXXX.html.
		A panel is a sub View of the SPA application. It's not reusable. We separate a SPA to several 
		panels just for testing and developing purpose. Mostly a panel includes other components or 
		widgets or implement directives.
		Panel is a addressing unit, for example:
		'webBase/' --- the default-view panel or host-page.
		'webBase/a' --- panel A.
		'webBase/b' --- panel B.
		...
		Panels seldom share data except share data in $rootScrope.
		
		
		
		
		
		
		
		
		