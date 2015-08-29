'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:RegistroVentasCtrlCRD
 * @description
 * # RegistroVentasCtrlCRD
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio registroVentasServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('RegistroVentasCtrlCRD', ['$scope', 'ngTableParams', 'registroVentasServiceCRD', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, registroVentasServiceCRD, $location, $firebaseArray, firebaseRef, $filter) {
  
    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/registroVentas");
    var f = new Date();
    
    $scope.fecha = (f.getMonth() +1) + "/" + f.getDate() + "/" +  f.getFullYear();  
    $scope.refVentas = $firebaseArray(ref);
    $scope.factura = [];
    $scope.datosProducto = [];
    $scope.subTotal = 0;
    $scope.impuesto = 0;
    $scope.descuento = 0;
    $scope.total = 0;
    $scope.sort = true;  
    $scope.facturaRealizada = false; 

    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.noFactura = refVentas.length + 1;
    }); 

    $scope.calculateValTot = function (producto) {//funcion que llama al servicio para crear usuario                        
      registroVentasServiceCRD.calculateValTot(producto, $scope);      
    }

    $scope.calculateTot = function () {//funcion que llama al servicio para crear usuario            
      registroVentasServiceCRD.calculateTot($scope);            
    }
    
    $scope.addProduct = function (customerName, customerId, customerPhone, productRef, productCod, productVal, productCount, productPago ) {//funcion que llama al servicio para crear usuario                            
      registroVentasServiceCRD.addProduct(customerName, customerId, customerPhone, productRef, productCod, productVal, productCount, productPago, $scope);      
    }

    $scope.deleteProduct = function(id) {//funcion que llama al servicio para eliminar usuario                  
      registroVentasServiceCRD.deleteProduct(id, $scope);                
    }
    
    $scope.createBil = function () {//funcion que llama al servicio para crear usuario          
      registroVentasServiceCRD.createBil(firebaseRef, $scope);      
      $scope.noFactura = $scope.factura.noFactura + 1;
      $scope.facturaRealizada = true;      
    }

    $scope.closeAlert = function () {//funcion que llama al servicio para crear usuario    
      $scope.facturaRealizada = false;  
    }

}]);