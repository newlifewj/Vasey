# demoDirective

### A markdown doc can be nice looking!!!

This is [an example](http://example.com/ "I'm the title") of an inline link.

### Define a list below
    
+ Get milk
+ Buy food

This is paragraph text with some **bold** or some _italics_ how about _**both**_ ?

**Code** block below:
    
    function hello() { 
      alert('Hello world!'); 
    }
    
    "use strict";

	/*
	 * The main module cover whole application.
	 */
	
	
	var App = angular.module('App', sys_.allModules);
	
	App.controller('_scopeCtrl', ['$scope',function($scope){}]);
	
	App.controller('appBodyController', ['$scope',function($scope){
		$scope.anyClickOnBody = function(event){
			/*	
			 *	There are two classes popover, 'light-pop' and 'blocking-pop'. We can close a 
			 *	light-pop by clicking outside area, but must interact with blocking-pop to close it.
			 */
			var lightPops = document.getElementsByClassName('lightPop');
			if(lightPops){
				for(var i=0; i<lightPops.length; i++){
					angular.element(lightPops[i]).css({display:none});
				}
			};
		}
	}]);