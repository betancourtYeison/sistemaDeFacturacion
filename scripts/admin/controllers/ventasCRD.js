'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:VentasCtrlCRD
 * @description
 * # VentasCtrlCRD
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio ventasServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('VentasCtrlCRD', ['$scope', 'ngTableParams', 'ventasServiceCRD', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, ventasServiceCRD, $location, $firebaseArray, firebaseRef, $filter) {
  
    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/ventas");

    $scope.refVentas = $firebaseArray(ref);

    $scope.sort = true
      
    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: { id: 'asc' } 
        }, {
            total: refVentas.length, // length of data
            getData: function ($defer, params) {          
                var orderedData = params.sorting() ? $filter('orderBy')($scope.refVentas, params.orderBy()) : data;                 
                var pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());                
                $defer.resolve(pageData);
            }
        }) 
    });     

    $scope.ventas = {
      username: '123456',
      firstName: 'Yeison',
      lastName: 'Betancourt',
      email: 'yeisonbe10@hotmail.com',
      password: '19931004'
    };
    
    $scope.createNewUser = function () {//funcion que llama al servicio para crear usuario
      console.log('entro');
      ventasServiceCRD.createNewUser(firebaseRef, $scope);      
    }

    $scope.editUser = function (id) {//funcion que llama al servicio para editar usuario
      ventasServiceCRD.editUser($location, id);      
    };

    $scope.deleteUser = function(id) {//funcion que llama al servicio para eliminar usuario        
      ventasServiceCRD.deleteUser($scope, id);                
    }

    $scope.ordenarPor = function(orden,sort){
      ventasServiceCRD.ordenarPor($scope, orden, sort);            
    };
}]);