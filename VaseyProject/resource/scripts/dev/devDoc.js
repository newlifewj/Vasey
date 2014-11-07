"use strict";

/*
 * The main module cover whole application.
 */


var devDoc = angular.module('devDoc', []);

	devDoc.controller('docListController',['$scope', '$location',function($scope,$location){
		//var absPath =  $location.absUrl();
		//console.log(absPath)
		//$scope.crntReadme = absPath.slice(absPath.indexOf('/test/')+6)+'.md';
		
		$scope.docs = sys_.docs;
		
	}]);
	