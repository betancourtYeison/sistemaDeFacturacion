'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ProveedoresCtrlCRD
 * @description
 * # ProveedoresCtrlCRD
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio proveedoresServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ProveedoresCtrlCRD', ['$scope', 'ngTableParams', 'proveedoresServiceCRD', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, proveedoresServiceCRD, $location, $firebaseArray, firebaseRef, $filter) {    
  
    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/proveedores");
    var toggle = true;    

    $scope.refproveedores = $firebaseArray(ref);
    $scope.master = {};
    $scope.sort = true;
    $scope.proveedorCreado = false;
    $scope.proveedores = {
        rut: ''
    }
      
    $scope.refproveedores.$loaded().then(function(refproveedores) {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: { id: 'asc' } 
        }, {
            total: refproveedores.length, // length of data
            getData: function ($defer, params) {          
                var orderedData = params.sorting() ? $filter('orderBy')($scope.refproveedores, params.orderBy()) : data;                 
                var pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());                
                $defer.resolve(pageData);
            }
        }) 
    }); 
    
    $scope.loadNameProvider = function(){  
      var tam = $scope.refproveedores.length;  
      var arrayproveedores = {};
            
      if(toggle){
        $('.dropdown-menu-proveedorName').click().toggle();
        toggle = false;
      }  

      if($scope.providerName != ""){                 
        for (var i=0; i<tam; i++) {
          if($scope.providerName == $scope.refproveedores[i].nombre.substring(0,$scope.providerName.length)){            
            arrayproveedores[$scope.refproveedores[i].rut] = {nombre: $scope.refproveedores[i].nombre, 
                                                              rut: $scope.refproveedores[i].rut,
                                                              telefono: $scope.refproveedores[i].telefono};            
          }
        };
      }else{
        $('.dropdown-menu-proveedorName').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproveedores)){
        arrayproveedores[0] = {nombre : 'No existe'};
        $scope.proveedores = arrayproveedores; 
      }else{
        $scope.proveedores = arrayproveedores;            
      }

      console.log($scope.proveedores);    
    }  

    $scope.loadRutProvider = function(){  
      var tam = $scope.refproveedores.length;  
      var arrayproveedores = {};
            
      if(toggle){
        $('.dropdown-menu-proveedorRut').click().toggle();
        toggle = false;
      }  

      if($scope.providerRut != ""){                 
        for (var i=0; i<tam; i++) {
          if($scope.providerRut == $scope.refproveedores[i].rut.substring(0,$scope.providerRut.length)){            
            arrayproveedores[$scope.refproveedores[i].rut] = {nombre: $scope.refproveedores[i].nombre, 
                                                              rut: $scope.refproveedores[i].rut,
                                                              telefono: $scope.refproveedores[i].telefono};            
          }
        };
      }else{
        $('.dropdown-menu-proveedorRut').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproveedores)){
        arrayproveedores[0] = {rut : 'No existe'};
        $scope.proveedores = arrayproveedores; 
      }else{
        $scope.proveedores = arrayproveedores;            
      }
    }

    $scope.loadPhoneProvider = function(){  
      var tam = $scope.refproveedores.length;  
      var arrayproveedores = {};
            
      if(toggle){
        $('.dropdown-menu-proveedorPhone').click().toggle();
        toggle = false;
      }  

      if($scope.providerPhone != ""){                 
        for (var i=0; i<tam; i++) {
          if($scope.providerPhone == $scope.refproveedores[i].telefono.substring(0,$scope.providerPhone.length)){            
            arrayproveedores[$scope.refproveedores[i].rut] = {nombre: $scope.refproveedores[i].nombre, 
                                                              rut: $scope.refproveedores[i].rut,
                                                              telefono: $scope.refproveedores[i].telefono};            
          }
        };
      }else{
        $('.dropdown-menu-proveedorPhone').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproveedores)){
        arrayproveedores[0] = {telefono : 'No existe'};
        $scope.proveedores = arrayproveedores; 
      }else{
        $scope.proveedores = arrayproveedores;            
      }
    }
   
    $scope.changeProvider = function(id, nombre, rut, telefono){//Cuando eliges un proveedor lo reemplaza en el campo de texto      
      if(nombre != 'No existe'){
        if(id == 'nombre'){
          $('.dropdown-menu-proveedorName').click().toggle();
        }else if(id == 'rut'){
          $('.dropdown-menu-proveedorRut').click().toggle();
        }else if(id == 'telefono'){
          $('.dropdown-menu-proveedorPhone').click().toggle();
        }
        toggle = true;        
        $scope.providerName = nombre;
        $scope.providerRut = rut;
        $scope.providerPhone = telefono;
        $scope.proveedores = null;
      }      
    }   
    
    $scope.exitsProvider = function () {//funcion que llama al servicio para crear usuario          
      $scope.proveedor = $scope.refproveedores.$getRecord($scope.proveedores.rut);    
      if($scope.proveedor != null){
        return true;
      }else{
        return false;
      }
    }
    
    $scope.createNewProvider = function (form) {//funcion que llama al servicio para crear usuario  
      proveedoresServiceCRD.createNewProvider(firebaseRef, $scope, form);   
      $scope.proveedorCreado = true;     
    }

    $scope.editProvider = function (rut) {//funcion que llama al servicio para editar usuario
      proveedoresServiceCRD.editProvider($location, rut);      
    };

    $scope.deleteProvider = function(rut) {//funcion que llama al servicio para eliminar usuario        
      proveedoresServiceCRD.deleteProvider($scope, rut);                
    }

    $scope.ordenarPor = function(orden,sort){
      proveedoresServiceCRD.ordenarPor($scope, orden, sort);            
    };

    $scope.closeAlert = function () {//funcion que llama al servicio para crear usuario    
      $scope.proveedorCreado = false; 
    }
    
}]);