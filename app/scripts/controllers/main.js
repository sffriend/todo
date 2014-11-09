'use strict';


/**
 * Object to store the todos
 * @param name [String] of the task
 * @param description [String] of the task
 * @param date [Date] set for the task
 * @param done [boolean] completed task
 * @param priority [
 */
var todo = function(name, description, date, priority, isDone) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.isDone = isDone;
};


/**
 * Define priority of todo
 *
 * @type {{NONE: string, LOW: string, MEDIUM: string, HIGH: string}}
 */
var priorityEnum = {
    NONE : 'none',
    LOW : 'low',
    MEDIUM : 'medium',
    HIGH : 'high'
}


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
      var date = convertDate($scope.date);
      var newTodo = new todo($scope.name, $scope.description, date, priorityEnum.NONE, false);
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
 *
 * @returns {Date}
 */
function convertDate() {
    return null;
}


/**
 * Clears the input fields
 * @param $scope
 */
function clearInput($scope) {
    $scope.name = '';
    $scope.description = '';
    $scope.date = '';

}

/**
 *
 */
function initTodos() {
    $('.circle').each(randomizeLocation($(this)));
}

/**
 *
 * @param t
 */
function randomizeLocation(t) {
    var availHeight = window.innerHeight - 50;
    var availWidth = window.innerWidth - 10;

    var randHeight = Math.round(Math.random() * availHeight);
    var randWidth= Math.round(Math.random() * availWidth);

    t.style.top = randHeight + "px";
    t.style.left = randWidth + "px";
}



