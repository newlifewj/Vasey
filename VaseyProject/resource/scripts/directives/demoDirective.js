/**
 * New node file
 */

var demoDirective = angular.module("demoDirective", []);

demoDirective.directive('demoDirective', function(){
	return{
		templateUrl: '/html/directives/demoDirective_tplt.html',
		link: function(scope,el,attrs){
			scope.text='Me, demoDirective';
			el.css({'color':attrs.demoDirective});
		}
	}
})