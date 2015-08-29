'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ListadoProductosCtrlCRD
 * @description
 * # ListadoProductosCtrlCRD
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio listadoProductosServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ListadoProductosCtrlCRD', ['$scope', 'ngTableParams', 'listadoProductosServiceCRD', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, listadoProductosServiceCRD, $location, $firebaseArray, firebaseRef, $filter) {    
  
    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/listadoProductos");

    var toggle = true;      

    $scope.refproductsList = $firebaseArray(ref);
    $scope.master = {};
    $scope.sort = true;
    $scope.productsList = {
        id: ''
    }
      
    $scope.refproductsList.$loaded().then(function(refproductsList) {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: { id: 'asc' } 
        }, {
            total: refproductsList.length, // length of data
            getData: function ($defer, params) {          
                var orderedData = params.sorting() ? $filter('orderBy')($scope.refproductsList, params.orderBy()) : data;                 
                var pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());                
                $defer.resolve(pageData);
            }
        }) 
    }); 
    
    $scope.loadProductRef = function(){  
      var tam = $scope.refproductsList.length;  
      var arrayproductsList = {};
            
      if(toggle){
        $('.dropdown-menu-productRef').click().toggle();
        toggle = false;
      }          

      if($scope.productRef != undefined){                 
        for (var i=0; i<tam; i++) {
          if($scope.productRef == $scope.refproductsList[i].referencia.substring(0,$scope.productRef.length)){            
            arrayproductsList[$scope.refproductsList[i].codigoBarras] = {referencia: $scope.refproductsList[i].referencia, 
                                                              codigoBarras: $scope.refproductsList[i].codigoBarras,
                                                              precioUnitario: $scope.refproductsList[i].precioUnitario};            
          }
        };
      }else{
        $('.dropdown-menu-productRef').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproductsList)){
        arrayproductsList[0] = {referencia : 'No existe'};
        $scope.productsList = arrayproductsList; 
      }else{
        $scope.productsList = arrayproductsList;            
      }      
    }  

    $scope.loadProductCodigo = function(){  
      var tam = $scope.refproductsList.length;  
      var arrayproductsList = {};
            
      if(toggle){
        $('.dropdown-menu-productCod').click().toggle();
        toggle = false;
      }  

      if($scope.productCod != undefined){                 
        for (var i=0; i<tam; i++) {
          if($scope.productCod == $scope.refproductsList[i].codigoBarras.substring(0,$scope.productCod.length)){            
            arrayproductsList[$scope.refproductsList[i].codigoBarras] = {referencia: $scope.refproductsList[i].referencia, 
                                                              codigoBarras: $scope.refproductsList[i].codigoBarras,
                                                              precioUnitario: $scope.refproductsList[i].precioUnitario};            
          }
        };
      }else{
        $('.dropdown-menu-productCod').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproductsList)){
        arrayproductsList[0] = {codigoBarras : 'No existe'};
        $scope.productsList = arrayproductsList; 
      }else{
        $scope.productsList = arrayproductsList;            
      }
    }

    $scope.loadProductValue = function(){  
      var tam = $scope.refproductsList.length;  
      var arrayproductsList = {};
            
      if(toggle){
        $('.dropdown-menu-productVal').click().toggle();
        toggle = false;
      }      

      if($scope.productVal != undefined){                 
        for (var i=0; i<tam; i++) {
          if($scope.productVal == $scope.refproductsList[i].precioUnitario.substring(0,$scope.productVal.length)){            
            arrayproductsList[$scope.refproductsList[i].codigoBarras] = {referencia: $scope.refproductsList[i].referencia, 
                                                              codigoBarras: $scope.refproductsList[i].codigoBarras,
                                                              precioUnitario: $scope.refproductsList[i].precioUnitario};            
          }
        };
      }else{
        $('.dropdown-menu-productVal').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproductsList)){
        arrayproductsList[0] = {precioUnitario : 'No existe'};
        $scope.productsList = arrayproductsList; 
      }else{
        $scope.productsList = arrayproductsList;            
      }
    }
   
    $scope.changeProduct = function(idClass, referencia, codigoBarras, precioUnitario){//Cuando eliges un Product lo reemplaza en el campo de texto      
      if(referencia != 'No existe' && codigoBarras != 'No existe' && precioUnitario != 'No existe'){
        if(idClass == 'referencia'){
          $('.dropdown-menu-productRef').click().toggle();
        }else if(idClass == 'codigoBarras'){
          $('.dropdown-menu-productCod').click().toggle();
        }else if(idClass == 'precioUnitario'){
          $('.dropdown-menu-productVal').click().toggle();
        }        
        toggle = true;        
        $scope.productRef = referencia;
        $scope.productCod = codigoBarras;
        $scope.productVal = precioUnitario;
        $scope.productsList = null;
      }      
    }   
    
    $scope.exitsProduct = function () {//funcion que llama al servicio para crear usuario          
      $scope.Product = $scope.refproductsList.$getRecord($scope.productsList.codigoBarras);          
      if($scope.Product != null){        
        return true;
      }else{        
        return false;
      }
    }
    
    $scope.createNewProduct = function (form) {//funcion que llama al servicio para crear usuario  
      listadoProductosServiceCRD.createNewProduct(firebaseRef, $scope, form);              
    }

    $scope.editProduct = function (id) {//funcion que llama al servicio para editar usuario
      listadoProductosServiceCRD.editProduct($location, id);      
    };

    $scope.deleteProduct = function(id) {//funcion que llama al servicio para eliminar usuario        
      listadoProductosServiceCRD.deleteProduct($scope, id);                
    }

    $scope.ordenarPor = function(orden,sort){
      listadoProductosServiceCRD.ordenarPor($scope, orden, sort);            
    };
}]);