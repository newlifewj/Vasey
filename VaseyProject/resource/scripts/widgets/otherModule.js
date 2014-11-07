/**
 * New node file
 */

var otherModule = angular.module('otherModule',['ngCookies']);

otherModule.controller("otherModuleController",["$scope",function($scope){
	$scope.text="otherModule--internal model";
}]);