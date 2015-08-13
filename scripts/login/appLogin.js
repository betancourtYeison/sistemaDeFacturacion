'use strict';

/**
 * @ngdoc overview
 * @name facturacionLoginApp
 * @description
 * # facturacionLoginApp
 *
 * Main module of the application.
 */

/* Controllers GoogleChart */
google.load('visualization', '1', {
  packages: ['corechart']
});
 
angular
  .module('facturacionLoginApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'firebase',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider//Determina las rutas con sus controladores
      .when('/', {//si en la url es /
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {//si en la url es /
        templateUrl: 'views/register.html',
        controller: 'LoginCtrl'
      })      
      .otherwise({//si en la url es cualquier otra
        redirectTo: '/'
      });
  });


