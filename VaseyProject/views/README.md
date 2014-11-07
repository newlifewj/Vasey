
# Summary
	The Ejs views rendering in back-end, the result could be either a html or html template (the 
	template can be populated in front-end by AngularJS). In most situation we needn't a dynamic 
	view driven by Node.js because a static html template is good enough. But sometimes we do need
	a dynamic view (or template) driven be back-end:
	* The host-page for SPA
		The host-page need transfer some dynamic data form back-end to front-end context. We don't 
		want use a lot of Ajax operations to kick off the application (There are some sequential and 
		asynchronous problems and it's not efficiently). And we also need provide special hosting 
		according to user's status.
	* Pages beyond SPA application
		Except the host-page, we need other pages like error view, testing page and so on. 
		They are easier but presenting dynamic data. It's better using a back-end template.
	* The dynamic templates for AngularJS
		Sometimes we need a dynamic template for a front-end view-component. For example, a button 
		is visible conditionally for different roles (or privilege). We can use multiple static 
		html templates for this requirement. But using an Ejs template seems better.
		
# Directories
	* cdnResource/localResource
		resource.ejs is a page-partial containing all the third-party libraries, e.g. Angular, 
		Bootstrap. We don't want to mix them with the main-page to make the page too long. Ejs 
		provides 'include' syntax, so we just include the resource.ejs to main-page. However 
		the resources.ejs are different for developing and product, e.g. CDN+fallback is used 
		in product but local resource used for developing.
		There two directories only contain two different resource.js.
	* templates
		If we need dynamic templates, the .ejs files locate here. There could be sub-directories 
		if the quantity of dynamic template is huge.
		
# Files
	* error.ejs
		The error page for all exception, e.g. 400, 500 ..., and the error message and stack 
		is presented. Show error stack is only meaningful for developing. Only empty page. 
		Different error page is feedback according the 'evn' variable. That's guaranteed by 
		logic of main routine 
	* resource.ejs
		The Ejs partial for third-party libraries and common application resource. It's a copy 
		file in cdnResource/ or localResource/.
	* maskPop.ejs
		We always need popover view with masking the screen. There are some fundamental markups 
		and css supporting masking-popover. They are organized into one sub-page to be included 
		in main page. Without it, some popover will not work. In general, it's included in the 
		<body> as first chunk of markups.
	* host.ejs
		The dynamic host-page for SPA, resource.ejs is included in. The web-base lead to the
		host-page, e.g. http://www.myweb.com/ . 
	* test.ejs
		A common host page for an UI unit (a widget, a component or a panel). It will render an 
		unit-list and the specified unit. webbase/test/ lead to the test page only with unit-list. 
		webbase/test/[path]/[unit] lead to render the unit together with unit-list.
	* README.md
		This file. 
	
	
	
	
	
	