'use strict';

angular.module('archuploadApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project', {
        url: '/project/:id',
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      });
  });