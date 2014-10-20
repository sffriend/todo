'use strict';

angular.module('todoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = ['Learn HTML', 'Learn Javascript', 'Learn CSS'];
    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };
  });