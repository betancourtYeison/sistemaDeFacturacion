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
  .controller('RegistroVentasCtrlCRD', ['$scope', 'ngTableParams', 'registroVentasServiceCRD', '$timeout', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, registroVentasServiceCRD, $timeout, $location, $firebaseArray, firebaseRef, $filter) {      
  
    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/registroVentas");
    var f = new Date();
    
    $scope.fecha = (f.getMonth() +1) + "/" + f.getDate() + "/" +  f.getFullYear();  
    $scope.hora = f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
    $scope.refVentas = $firebaseArray(ref);
    $scope.master = {};
    $scope.factura = [];
    $scope.datosProducto = [];
    $scope.subTotal = 0;
    $scope.impuesto = 0;
    $scope.descuento = 0;
    $scope.total = 0;
    $scope.sort = true;  
    $scope.facturaRealizada = false;
    $scope.generarFactura = true;  
    $scope.productExists = true;  
    $scope.productCountMax = true;  
    $scope.productCountMaxVlr = 0;

    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.noFactura = refVentas.length + 1;
    }); 

    var authData = firebaseRef().getAuth();
    if(authData){
      $scope.user = authData.password.email;          
    }  

    $scope.calculateValTot = function (producto) {//funcion que llama al servicio para crear usuario                        
      registroVentasServiceCRD.calculateValTot(producto, $scope);      
    }

    $scope.calculateTot = function () {//funcion que llama al servicio para crear usuario            
      registroVentasServiceCRD.calculateTot($scope);            
    }
    
    $scope.addProduct = function (refproductsList, productExists, customerName, customerId, customerPhone, productRef, productDescrip, productCod, productVal, productCount, productPago ) {//funcion que llama al servicio para crear usuario                                  
      
      for (var i=0; i<refproductsList.length; i++) {   
          if((refproductsList[i].codigoBarras == productCod) && (productCount > refproductsList[i].cantidad)){                    
            $scope.productCountMax = false;  
            $scope.productCountMaxVlr = refproductsList[i].cantidad;
            break;          
          }
      };    

      $scope.productExists = productExists;  
      if($scope.productExists && $scope.productCountMax){
        registroVentasServiceCRD.addProduct(customerName, customerId, customerPhone, productRef, productDescrip, productCod, productVal, productCount, productPago, $scope);            
      }
    }

    $scope.deleteProduct = function(id) {//funcion que llama al servicio para eliminar usuario                  
      registroVentasServiceCRD.deleteProduct(id, $scope);                
    }
      
    $scope.createBil = function () {//funcion que llama al servicio para crear usuario                      
      registroVentasServiceCRD.createBil(firebaseRef, $scope, $timeout, $location);   
      registroVentasServiceCRD.printPDF($scope);         
      $scope.noFactura = $scope.factura.noFactura + 1;
      $scope.facturaRealizada = true;      
    }

    $scope.ordenarPor = function(orden,sort){
      registroVentasServiceCRD.ordenarPor($scope, orden, sort);            
    };

    $scope.closeAlert = function () {//funcion que llama al servicio para crear usuario    
      $scope.facturaRealizada = false; 
      $scope.productExists = true; 
      $scope.productCountMax = true;  
    }
}]);