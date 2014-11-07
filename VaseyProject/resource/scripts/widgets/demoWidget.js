/**
 * New node file
 */

var demoWidget = angular.module('demoWidget',['ngCookies']);

demoWidget.controller("demoWidgetController",["$scope",function($scope){
	$scope.text="demoWidget--internal model"
}]);