'use strict';

/**
 * @ngdoc overview
 * @name facturacionAdminApp
 * @description
 * # facturacionAdminApp
 *
 * Main module of the application.
 */

/* Controllers GoogleChart */
google.load('visualization', '1', {
  packages: ['corechart']
});
 
angular
  .module('facturacionAdminApp', [
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
        templateUrl: 'views/home.html'
      })
      .when('/ventas', {//si en la url es /
        templateUrl: 'views/ventas.html',
        controller: 'LoginCtrl'
      })  
      .otherwise({//si en la url es cualquier otra
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, loginService){//Permiso para ver las diferentes rutas
  var routespermissionLog=['/login'];//Ruta que se requiere para cuando no esta autenticado
  var routespermissionHome=['/home'];//Ruta que se requiere para cuando esta autenticado

  $rootScope.$on('$routeChangeStart', function(){//Verifica las turas 

    var dec = loginService.isLogged();//guarda en la variable dec si hay un usuario autenticado por medio de la funcion de la clase loginService

    //verifica si es la ruta ingresada
    // if(routespermissionHome.indexOf($location.path()) !==-1)
    // {      
    //   if(!dec){//si no esta autenticado, redirecciona a /login
    //     $location.path('/login');
    //   }
    // }

    //verifica si es la ruta ingresada
    // if( routespermissionLog.indexOf($location.path()) !==-1)
    // {
    //   if(dec){//si esta autenticado, redirecciona a /home
    //     $location.path('/home');
    //   }
    // }
  });
});


