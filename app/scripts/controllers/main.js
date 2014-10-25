'use strict';

angular.module('todoApp')
  .controller('MainCtrl', function ($scope) {

    $scope.todos = [{name:'todo item', description:'do this', done:false}];
    
    $scope.addTodo = function () {
      $scope.todos.push({name: $scope.tName, description: $scope.tDescription, done:false});
      $scope.tName = '';
    };
    
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

  });