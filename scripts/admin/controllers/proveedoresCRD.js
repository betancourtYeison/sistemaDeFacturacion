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

    $scope.refproveedores = $firebaseArray(ref);
    $scope.master = {};
    $scope.sort = true
      
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
    
    $scope.createNewProvider = function (form) {//funcion que llama al servicio para crear usuario  
      proveedoresServiceCRD.createNewProvider(firebaseRef, $scope, form);        
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
}]);