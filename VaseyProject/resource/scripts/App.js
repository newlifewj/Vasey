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
	
	
	
	