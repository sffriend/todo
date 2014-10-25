'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular
  .module('todoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



/** COOKIES!!!! http://www.w3schools.com/js/js_cookies.asp */

/**
 * Function to store cookies
 * @param cname name of the cookie
 * @param cvalue value of the cookie
 * @param exdays days until expiration
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/**
 * Get a stored cookie
 *
 * Function Explained:

 Take the cookiename as parameter (cname).

 Create a variable (name) with the text to search for (cname + "=").

 Split document.cookie on semicolons into an array called ca (ca = document.cookie.split(';')).

 Loop through the ca array (i=0;i<ca.length;i++), and read out each value c=ca[i]).

 If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length,c.length).

 If the cookie is not found, return "".

 * @param cname the name of the cookie
 * @returns {string}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) != -1) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

/**
 * EXAMPLE
 * If the cookie has been set, display a prompt
 */
function checkCookie() {
    var username=getCookie("username");
    if (username!="") {
        alert("Welcome again " + username);
    }else{
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}

