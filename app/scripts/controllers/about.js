'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
   .controller('ProjectCtrl', function ($scope) {
      var project = function(name) {
      	this.name = name;
      }

      $scope.projects = [];
      var thisProject = new project("steph");
      $scope.projects.push(thisProject);
   });
