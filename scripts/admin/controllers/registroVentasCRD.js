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
    var refProduct = new Firebase("https://sistemadefacturacion.firebaseio.com/listadoProductos");
    var f = new Date();    
    
    $scope.fecha = (f.getMonth() +1) + "/" + f.getDate() + "/" +  f.getFullYear();  
    $scope.hora = f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
    $scope.refVentas = $firebaseArray(ref);
    $scope.refProductEdit = $firebaseArray(refProduct);    
    $scope.master = {};
    $scope.factura = [];
    $scope.datosProducto = [];
    $scope.backUpDatosProducto = [];
    $scope.subTotal = 0;
    $scope.impuesto = 0;
    $scope.descuento = 0;
    $scope.total = 0;
    $scope.sort = true;  
    $scope.facturaRealizada = false;
    $scope.generarFactura = true;  
    $scope.productExists = true;  
    $scope.productIsntInTable = true;  
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

      $scope.productExists = productExists;  
      $scope.productIsntInTable = true;  
      $scope.productCountMax = true;  

      for (var i=0; i<$scope.datosProducto.length; i++) {     
        console.log("Entro al for");   
        console.log($scope.datosProducto[i]); 
        console.log(productCod);   
        if($scope.datosProducto[i].codigo == productCod){  
          console.log("Entro al if del for");   
          $scope.productEdit = $scope.refProductEdit.$getRecord(productCod);          
          $scope.productEditCantidad = $scope.productEdit.cantidad;          
          $scope.productEdit.cantidad = ($scope.productEdit.cantidad - productCount);          

          if($scope.productEdit.cantidad<0){              
            $scope.productCountMax = false;  
            $scope.productCountMaxVlr = $scope.productEditCantidad;
            $scope.productEdit.cantidad = $scope.productEditCantidad;
          }                  

          if($scope.productCountMax){            
            $scope.datosProducto[i].cantidad = ($scope.datosProducto[i].cantidad + productCount);
            registroVentasServiceCRD.calculateValTot($scope.datosProducto[i], $scope);   
            registroVentasServiceCRD.updateCountProduct($scope, $location);
          }            

          $scope.productIsntInTable = false;  
          break;
        }
      }      

      //Si no existe en la tabla recore los productos y revisa si la cantidad no excede el stock
      if($scope.productIsntInTable){    
        console.log("No esta en la tabla");        
        $scope.productEdit = $scope.refProductEdit.$getRecord(productCod);            
        $scope.productEditCantidadInicial = $scope.productEdit.cantidad;            

        $scope.backUpDatosProducto.push({codigoBarras: $scope.productEdit.codigoBarras,
                                          referencia: $scope.productEdit.referencia,
                                          descripcion: $scope.productEdit.descripcion,
                                          grupo: $scope.productEdit.grupo,
                                          precioUnitario: $scope.productEdit.precioUnitario,
                                          unidad: $scope.productEdit.unidad,
                                          cantidad: $scope.productEdit.cantidad
                                       });   

        console.log($scope.backUpDatosProducto);

        $scope.productEdit.cantidad = ($scope.productEdit.cantidad - productCount);            
        if($scope.productEdit.cantidad<0){              
          $scope.productCountMax = false;  
          $scope.productCountMaxVlr = $scope.productEditCantidadInicial;
          $scope.productEdit.cantidad = $scope.productEditCantidadInicial;
        }                      
      }

      console.log($scope.productExists);
      console.log($scope.productCountMax);
      console.log($scope.productIsntInTable);
       
      if($scope.productExists && $scope.productCountMax && $scope.productIsntInTable){        
        registroVentasServiceCRD.addProduct(customerName, customerId, customerPhone, productRef, productDescrip, productCod, productVal, productCount, productPago, $scope);            
        registroVentasServiceCRD.updateCountProduct($scope, $location);
      }
    }

    $scope.updateCountProduct = function (operacion) {//Funcion que llama al servicio para editar           
      registroVentasServiceCRD.updateCountProduct($scope, $location);
    }

    $scope.deleteProduct = function(id,codigoBarras) {//funcion que llama al servicio para eliminar usuario                  
      registroVentasServiceCRD.deleteProduct(id, $scope); 
      console.log($scope.productEdit.$id); 

      $scope.productEdit.$id = codigoBarras;

      console.log($scope.productEdit.$id); 

      for (var i=0; i<$scope.backUpDatosProducto.length; i++) {
        if($scope.backUpDatosProducto[i].codigoBarras == codigoBarras){
          console.log("entro if");          
          console.log($scope.productEdit); 

          $scope.productEdit.codigoBarras = $scope.backUpDatosProducto[i].codigoBarras;
          $scope.productEdit.referencia = $scope.backUpDatosProducto[i].referencia;
          $scope.productEdit.descripcion = $scope.backUpDatosProducto[i].descripcion;
          $scope.productEdit.grupo = $scope.backUpDatosProducto[i].grupo;
          $scope.productEdit.precioUnitario = $scope.backUpDatosProducto[i].precioUnitario;
          $scope.productEdit.unidad = $scope.backUpDatosProducto[i].unidad;
          $scope.productEdit.cantidad = $scope.backUpDatosProducto[i].cantidad;
                                          
          console.log($scope.productEdit);
        }
      };
      console.log(codigoBarras);      
      console.log($scope.productEdit);
      registroVentasServiceCRD.updateCountProduct($scope, $location);               
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