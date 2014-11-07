/**
 * New node file
 */

var demoComponent = angular.module('demoComponent',['ngCookies']);

demoComponent.controller("demoComponentController",["$scope",function($scope){
	$scope.text = "demoComponet--internal model";
	$scope.internalModel = {text: "demoWidget -- driven by demoComponent"};
	$scope.componentCfg={'border':'dashed 1px red'}
}]);

