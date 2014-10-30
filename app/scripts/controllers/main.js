'use strict';


/**
 * Object to store the todos
 * @param name [String] of the task
 * @param description [String] of the task
 * @param date [Date] set for the task
 * @param done [boolean] completed task
 */
var todo = function(name, description, date, done) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.done = done;
};


angular.module('todoApp')
  .controller('MainCtrl', function ($scope, $cookies) {

    $scope.todos = [];

    // if todos exist in cookies, add them to the page
    if($cookies != undefined && $cookies.todos != undefined) {
        var todos = JSON.parse($cookies.todos);
        for (var i = 0; i < todos.length; i++) {
            $scope.todos.push(todos[i]);
        }
    }

    // adding a task
    $scope.addTodo = function () {
      var newTodo = new todo($scope.tName, $scope.tDescription, null, false);
      $scope.todos.push(newTodo);
      //create a cookie for todos
      $cookies.todos = JSON.stringify($scope.todos);
      clearInput($scope);
    };

    // removing a task
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
      // overwrite the tasks saved in cookies
      $cookies.todos = JSON.stringify($scope.todos);
    };

  });


/**
 * Clears the input fields
 * @param $scope
 */
function clearInput($scope) {
    $scope.tName = '';
    $scope.description = '';
}