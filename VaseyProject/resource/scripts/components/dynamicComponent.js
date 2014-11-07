/**
 * New node file
 */

var dynamicComponent = angular.module('dynamicComponent',['ngCookies']);

dynamicComponent.controller("dynamicComponentController",["$scope",function($scope){
	$scope.text = "dynamicComponet--internal model";
	$scope.internalModel = {text: "demoWidget -- driven by demoComponent"};
}]);

