'use strict';

/**
 * Object to store the todos
 * @param name [String] of the task
 * @param description [String] of the task
 * @param date [Date] set for the task
 * @param done [boolean] completed task
 * @param priority [
 */
var todo = function (name, project, description, date, priority, isDone, edit) {
   this.name = name;
   this.project = project;
   this.description = description;
   this.date = date;
   this.priority = priority;
   this.isDone = false;
   this.edit = false;
};

/**
 * Define priority of todo
 *
 * @type {{NONE: string, LOW: string, MEDIUM: string, HIGH: string}}
 */
var priorityEnum = {
   AUTO: 'AUTO',
   LOW: 'LOW',
   MEDIUM: 'MEDIUM',
   HIGH: 'HIGH'
}


angular.module('todoApp')
   .controller('MainCtrl', function ($scope, $cookies) {

      $scope.todos = [];

      // if todos exist in cookies, add them to the page
      if ($cookies != undefined && $cookies.todos != undefined) {
         var todos = JSON.parse($cookies.todos);
         for (var i = 0; i < todos.length; i++) {
            $scope.todos.unshift(todos[i]);
         }
      }

      // adding a task
      $scope.addTodo = function () {
         saveProject($scope.project);

         if ($scope.priority == priorityEnum.AUTO) {
            $scope.automateDate();
         }

         if (!($scope.date)) {
            $scope.date = "None";
         }

         if (!($scope.project)) {
            $scope.project = "None";
         }

         var newTodo = new todo($scope.name, $scope.project, $scope.description, $scope.date, $scope.priority, false, false);
         $scope.todos.unshift(newTodo);
         // var newProject = new project($scope.project);
         // $scope.projects.push(newProject);
         //reload cookies for todos
         $cookies.todos = JSON.stringify($scope.todos);
         clearInput($scope);
      };
      
      $scope.automateDate = function () {
         var milToDays = 1.157e8
         var time = Math.abs((new Date() - new Date($scope.date)) / milToDays);
         
         // Change time periods?
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

      // removing a task
      $scope.removeTodo = function (t, index) {
         //t.addClass('remove');
         $scope.todos.splice(index, 1);
         // overwrite the tasks saved in cookies
         $cookies.todos = JSON.stringify($scope.todos);
      };

      // editing a task
      $scope.editTodo = function (index) {
         $scope.todos[index].isEdit = !$scope.todos[index].isEdit;
         // overwrite the tasks saved in cookies
      };
      
      $scope.saveEdits = function (index) {
         $scope.todos[index].isEdit = !$scope.todos[index].isEdit;
         $cookies.todos = JSON.stringify($scope.todos);
      }
      
      // completing todos
      $scope.completeTodo = function (index) {
         $scope.todos[index].isDone = !$scope.todos[index].isDone;
      };
      
      // clear input fields on cancel
      $scope.clearTodo = function () {
         clearInput($scope);
      }
   });

function saveProject(project) {
  $(".project").append("<option>" + project + "</option>");
}

/**
 *
 * @returns {Date}
 */
function convertDate() {
   return null;
}

function createPriority() {
   return 'MEDIUM';
}
var addTask = false;

function addTaskk($scope) {
   console.log(addTask);
   addTask = !addTask;
   $scope.addTask = addTask;
   console.log(addTask);
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



angular.module('todoApp').directive('datepicker', function () {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
         $(function () {
            element.datepicker({
               dateFormat: 'mm/dd/yy',
               onSelect: function (date) {
                  ngModelCtrl.$setViewValue(date);
                  scope.$apply();
               }
            });
         });
      }
   }
});

var myapp = angular.module('sampleapp', [ ]);

myapp.controller('samplecontoller', function ($scope) {

  
});

