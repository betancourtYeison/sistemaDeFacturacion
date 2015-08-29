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

    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.noFactura = refVentas.length;
    }); 

    $scope.calculateValTot = function (producto) {//funcion que llama al servicio para crear usuario                        
      producto.valorTot = (producto.valorUni*producto.cantidad);
      $scope.subTotal = 0;
      
      for (var i=0; i<$scope.datosProducto.length; i++) {
        $scope.subTotal += ($scope.datosProducto[i].valorUni*$scope.datosProducto[i].cantidad);                
      };
      
      $scope.impuesto = ($scope.subTotal * 16)/100;
      if($scope.descuento == 0){
        $scope.total = ($scope.subTotal + $scope.impuesto);
      }else{
        $scope.total = ($scope.subTotal + $scope.impuesto)-((($scope.subTotal + $scope.impuesto) * $scope.descuento)/100);
      }    
    }

    $scope.calculateTot = function () {//funcion que llama al servicio para crear usuario            
      if($scope.descuento == 0){
        $scope.total = ($scope.subTotal + $scope.impuesto);
      }else{
        $scope.total = ($scope.subTotal + $scope.impuesto)-((($scope.subTotal + $scope.impuesto) * $scope.descuento)/100);
      }      
    }
    
    $scope.addProduct = function (customerName, customerId, customerPhone, productRef, productCod, productVal, productCount, productPago ) {//funcion que llama al servicio para crear usuario                      

      $scope.datosProducto.push({referencia: productRef, 
                                codigo: productCod, 
                                cantidad: productCount, 
                                valorUni: productVal, 
                                valorTot: (productVal*productCount),
                                formaPago: productPago});      

      $scope.factura = {noFactura: ($scope.noFactura+1),
                        nombre: customerName,
                        cedula: customerId,
                        telefono: customerPhone,
                        datosProducto: $scope.datosProducto};
                            
      $scope.subTotal += (productVal*productCount);      
      $scope.impuesto = ($scope.subTotal * 16)/100;
      if($scope.descuento == 0){
        $scope.total = ($scope.subTotal + $scope.impuesto);
      }else{
        $scope.total = ($scope.subTotal + $scope.impuesto)-((($scope.subTotal + $scope.impuesto) * $scope.descuento)/100);
      }      

      //registroVentasServiceCRD.addProduct($scope);      
    }

    $scope.deleteProduct = function(id) {//funcion que llama al servicio para eliminar usuario        
      
      $scope.datosProducto.reverse();
      var productToDelete = $scope.datosProducto[id];            
      $scope.datosProducto.splice(id,1);
      $scope.datosProducto.reverse();
      //registroVentasServiceCRD.deleteUser($scope, id);                
    }
    
    $scope.createBil = function () {//funcion que llama al servicio para crear usuario    
      //console.log($scope.factura.datosProducto[0]);
      registroVentasServiceCRD.createBil(firebaseRef, $scope);      
    }

    $scope.editUser = function (id) {//funcion que llama al servicio para editar usuario
      registroVentasServiceCRD.editUser($location, id);      
    };

    $scope.ordenarPor = function(orden,sort){
      registroVentasServiceCRD.ordenarPor($scope, orden, sort);            
    };
}]);