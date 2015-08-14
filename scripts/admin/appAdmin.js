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
        templateUrl: 'views/inicio.html'
      })      
      .when('/registroVentas', {//si en la url es /
        templateUrl: 'views/ventas/registroVentas.html',
      }) 
      .when('/registroPedidos', {//si en la url es /
        templateUrl: 'views/ventas/registroPedidos.html',
      }) 
      .when('/clientes', {//si en la url es /
        templateUrl: 'views/ventas/clientes.html',
      }) 
      .when('/registroCompras', {//si en la url es /
        templateUrl: 'views/compras/registroCompras.html',
      }) 
      .when('/proveedores', {//si en la url es /
        templateUrl: 'views/compras/proveedores.html',
      })    
      .when('/realizarInventario', {//si en la url es /
        templateUrl: 'views/inventario/realizarInventario.html',
      })     
      .when('/stockActual', {//si en la url es /
        templateUrl: 'views/inventario/stockActual.html',
      })  
      .when('/registroEntradas', {//si en la url es /
        templateUrl: 'views/almacen/registroEntradas.html',
      })           
      .when('/registroSalidas', {//si en la url es /
        templateUrl: 'views/almacen/registroSalidas.html',
      })           
      .when('/listaProductos', {//si en la url es /
        templateUrl: 'views/productos/listaProductos.html',
      })           
      .when('/grupos', {//si en la url es /
        templateUrl: 'views/productos/grupos.html',
      })           
      .when('/cuentasCobrar', {//si en la url es /
        templateUrl: 'views/cuentas/cuentasCobrar.html',
      })           
      .when('/cuentasPagar', {//si en la url es /
        templateUrl: 'views/cuentas/cuentasPagar.html',
      })           
      .when('/reporteVentas', {//si en la url es /
        templateUrl: 'views/reportes/reporteVentas.html',
      })           
      .when('/reportePedidos', {//si en la url es /
        templateUrl: 'views/reportes/reportePedidos.html',
      })           
      .when('/reporteCompras', {//si en la url es /
        templateUrl: 'views/reportes/reporteCompras.html',
      })           
      .when('/reporteAlmacen', {//si en la url es /
        templateUrl: 'views/reportes/reporteAlmacen.html',
      })           
      .when('/reporteCCobrar', {//si en la url es /
        templateUrl: 'views/reportes/reporteCCobrar.html',
      })           
      .when('/reporteCPagar', {//si en la url es /
        templateUrl: 'views/reportes/reporteCPagar.html',
      })           
      .when('/reporteKardex', {//si en la url es /
        templateUrl: 'views/reportes/reporteKardex.html',
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


