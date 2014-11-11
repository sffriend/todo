'use strict';


/**
 * Object to store the todos
 * @param name [String] of the task
 * @param description [String] of the task
 * @param date [Date] set for the task
 * @param done [boolean] completed task
 * @param priority [
 */
var todo = function(name, project, date, priority, isDone) {
    this.name = name;
    this.project = project;
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
    AUTO : 'AUTO',
    LOW : 'LOW',
    MEDIUM : 'MEDIUM',
    HIGH : 'HIGH'
}


angular.module('todoApp')
  .controller('MainCtrl', function ($scope, $cookies) {

    $scope.todos = [];
    $scope.date = "None";

    // if todos exist in cookies, add them to the page
    if($cookies != undefined && $cookies.todos != undefined) {
        var todos = JSON.parse($cookies.todos);
        for (var i = 0; i < todos.length; i++) {
            $scope.todos.push(todos[i]);
        }
    }

    // adding a task
    $scope.addTodo = function () {
      console.log($scope.priority);

      if ($scope.priority == priorityEnum.AUTO) {
        var milToDays = 1.157e8
        var time = Math.abs((new Date() - new Date($scope.date)) / milToDays);

        if (time <= 5) {
          $scope.priority = priorityEnum.HIGH;
        }
        else if (time > 5 && time <= 20) {
          $scope.priority = priorityEnum.MEDIUM;
        }
        else if (time > 20) {
          $scope.priority = priorityEnum.LOW;
        }
      }

      var newTodo = new todo($scope.name, $scope.project, $scope.date, $scope.priority, false);
      $scope.todos.push(newTodo);
      //reload cookies for todos
      $cookies.todos = JSON.stringify($scope.todos);
      clearInput($scope);
    };

    // removing a task
    $scope.removeTodo = function (t, index) {
        //t.addClass('remove');

      $scope.todos.splice(index, 1);
      // overwrite the tasks saved in cookies
      $cookies.todos = JSON.stringify($scope.todos);
    };

     // removing a task
    $scope.editTodo = function (index) {
        // overwrite the tasks saved in cookies
      $cookies.todos = JSON.stringify($scope.todos);
    };



  });


/**
 *
 * @returns {Date}
 */
function convertDate() {
return null;}

function createPriority() {
  return 'MEDIUM';
}

/**
 * Clears the input fields
 * @param $scope
 */
function clearInput($scope) {
    $scope.name = '';
    $scope.description = '';
    $scope.date = '';
    $scope.project = '';
    $scope.priority = 'AUTO';
    $(this).closest('.add-todo').hide();
}

angular.module('todoApp').directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'mm/dd/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});



