/**
 * New node file
 */

var demoPanel = angular.module('demoPanel',['ngCookies']);

demoPanel.controller("demoPanelController",["$scope",function($scope){
	$scope.panelModel1 = {text: "model1 provided by panel --111"};
	$scope.panelModel2 = {text: "model2 provided by panel --222"};
	$scope.text = "demoPanel--internal model"
}]);