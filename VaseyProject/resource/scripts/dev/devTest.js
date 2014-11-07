"use strict";

/*
 * The main module cover whole application.
 */


var devTest = angular.module('devTest', []);

	devTest.controller('testIndexController',['$scope', function($scope){
		//var absPath =  $location.absUrl();
		//$scope.crntReadme = absPath.slice(absPath.indexOf('/test/')+6)+'.md';
		
		$scope.units = sys_.unitList;
		
	}]);
	