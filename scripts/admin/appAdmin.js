'use strict';

/**
 * @ngdoc overview
 * @name facturacionAdminApp
 * @description
 * # facturacionAdminApp
 *
 * Main module of the application.
 */
 
angular
  .module('facturacionAdminApp', [
    'ngAnimate',    
    'ngRoute',
    'firebase'
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
      .when('/404', {//si en la url es /
        templateUrl: 'views/404.html',
      })      
      .otherwise({//si en la url es cualquier otra
        redirectTo: '/404'
      });
  })
  .run(function($rootScope, loginService){//Arranca con la aplicacion
    $rootScope.$on('$routeChangeStart', function(){//Inicia el rootScope

    if(!loginService.isLogged()){//Verifica si esta logeado
      document.location.href = 'http://localhost:8080/sistemaDeFacturacion/';//redirecciona a login
    }    
  });
});


