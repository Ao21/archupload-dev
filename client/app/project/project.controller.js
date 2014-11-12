'use strict';

angular.module('archuploadApp')
  .controller('ProjectCtrl', function ($scope, $http, socket, $stateParams,ProjectServices) {
    $scope.awesomeThings = [];
	ProjectServices.get($stateParams.id).then(function(data){
		$scope.project = data.plain();
	})
    
  });
