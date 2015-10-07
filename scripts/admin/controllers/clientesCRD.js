'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ClientesCtrlCRD
 * @description
 * # ClientesCtrlCRD
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio clientesServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ClientesCtrlCRD', ['$scope', 'ngTableParams', 'clientesServiceCRD', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, clientesServiceCRD, $location, $firebaseArray, firebaseRef, $filter) {    
  
    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/clientes");
    var toggle = true;    

    $scope.refcustomers = $firebaseArray(ref);
    $scope.master = {};
    $scope.sort = true;
    $scope.clienteCreado = false;
    $scope.customers = {
        id: ''
    }
      
    $scope.refcustomers.$loaded().then(function(refcustomers) {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: { id: 'asc' } 
        }, {
            total: refcustomers.length, // length of data
            getData: function ($defer, params) {          
                var orderedData = params.sorting() ? $filter('orderBy')($scope.refcustomers, params.orderBy()) : data;                 
                var pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());                
                $defer.resolve(pageData);
            }
        }) 
    }); 
    
    $scope.loadNameCustomer = function(){
      var tam = $scope.refcustomers.length;  
      var arraycustomers = {};
            
      if(toggle){
        $('.dropdown-menu-customerName').click().toggle();
        toggle = false;
      }      
      
      var tempRefcustomersName;
      var tempCustomerName = $scope.customerName.toUpperCase();
      
      if($scope.customerName != undefined){                 
        for (var i=0; i<tam; i++) {
          tempRefcustomersName = $scope.refcustomers[i].name.substring(0,$scope.customerName.length).toUpperCase();
          if(tempCustomerName == tempRefcustomersName){            
            arraycustomers[$scope.refcustomers[i].id] = {name: $scope.refcustomers[i].name, 
                                                              id: $scope.refcustomers[i].id,
                                                              phone: $scope.refcustomers[i].phone};            
          }
        };
      }else{
        $('.dropdown-menu-customerName').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arraycustomers)){
        arraycustomers[0] = {name : 'No existe'};
        $scope.customers = arraycustomers; 
      }else{
        $scope.customers = arraycustomers;            
      }      
    }  

    $scope.loadIdCustomer = function(){  
      var tam = $scope.refcustomers.length;  
      var arraycustomers = {};
            
      if(toggle){
        $('.dropdown-menu-customerId').click().toggle();
        toggle = false;
      }  

      if($scope.customerId != undefined){                 
        for (var i=0; i<tam; i++) {
          if($scope.customerId == $scope.refcustomers[i].id.substring(0,$scope.customerId.length)){            
            arraycustomers[$scope.refcustomers[i].id] = {name: $scope.refcustomers[i].name, 
                                                              id: $scope.refcustomers[i].id,
                                                              phone: $scope.refcustomers[i].phone};            
          }
        };
      }else{
        $('.dropdown-menu-customerId').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arraycustomers)){
        arraycustomers[0] = {id : 'No existe'};
        $scope.customers = arraycustomers; 
      }else{
        $scope.customers = arraycustomers;            
      }
    }

    $scope.loadPhoneCustomer = function(){  
      var tam = $scope.refcustomers.length;  
      var arraycustomers = {};
            
      if(toggle){
        $('.dropdown-menu-customerPhone').click().toggle();
        toggle = false;
      }  

      if($scope.customerPhone != undefined){                 
        for (var i=0; i<tam; i++) {
          if($scope.customerPhone == $scope.refcustomers[i].phone.substring(0,$scope.customerPhone.length)){            
            arraycustomers[$scope.refcustomers[i].id] = {name: $scope.refcustomers[i].name, 
                                                              id: $scope.refcustomers[i].id,
                                                              phone: $scope.refcustomers[i].phone};            
          }
        };
      }else{
        $('.dropdown-menu-customerPhone').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arraycustomers)){
        arraycustomers[0] = {phone : 'No existe'};
        $scope.customers = arraycustomers; 
      }else{
        $scope.customers = arraycustomers;            
      }
    }
   
    $scope.changeCustomer = function(idClass, name, id, phone){//Cuando eliges un customer lo reemplaza en el campo de texto      
      if(name != 'No existe' && id != 'No existe' && phone != 'No existe'){
        if(idClass == 'name'){
          $('.dropdown-menu-customerName').click().toggle();
        }else if(idClass == 'id'){
          $('.dropdown-menu-customerId').click().toggle();
        }else if(idClass == 'phone'){
          $('.dropdown-menu-customerPhone').click().toggle();
        }
        toggle = true;        
        $scope.customerName = name;
        $scope.customerId = id;
        $scope.customerPhone = phone;
        $scope.customers = null;
      }      
    }   
    
    $scope.exitsCustomer = function () {//funcion que llama al servicio para crear usuario          
      $scope.customer = $scope.refcustomers.$getRecord($scope.customers.id);          
      if($scope.customer != null){        
        return true;
      }else{        
        return false;
      }
    }
    
    $scope.createNewCustomer = function (form) {//funcion que llama al servicio para crear usuario  
      clientesServiceCRD.createNewCustomer(firebaseRef, $scope, form);
      $scope.clienteCreado = true;        
    }

    $scope.editCustomer = function (id) {//funcion que llama al servicio para editar usuario
      clientesServiceCRD.editCustomer($location, id);      
    };

    $scope.deleteCustomer = function(id) {//funcion que llama al servicio para eliminar usuario        
      clientesServiceCRD.deleteCustomer($scope, id);                
    }

    $scope.ordenarPor = function(orden,sort){
      clientesServiceCRD.ordenarPor($scope, orden, sort);            
    };

    $scope.closeAlert = function () {//funcion que llama al servicio para crear usuario    
      $scope.clienteCreado = false; 
    }
    
}]);