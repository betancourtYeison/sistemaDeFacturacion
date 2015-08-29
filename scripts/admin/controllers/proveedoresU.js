'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ProveedoresCtrlU
 * @description
 * # ProveedoresCtrlU
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio proveedoresServiceU con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ProveedoresCtrlU', ['$scope', 'proveedoresServiceU', '$location', '$firebaseArray', 'firebaseRef', '$routeParams', 'syncData', function ($scope, proveedoresServiceU, $location, $firebaseArray, firebaseRef, $routeParams, syncData) {
        
    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/proveedores");

    $scope.refproveedores = $firebaseArray(ref);

    $scope.refproveedores.$loaded().then(function(refproveedores) {
        $scope.proveedores = $scope.refproveedores.$getRecord($routeParams.rut);        
    });         

    $scope.updateUser = function () {//Funcion que llama al servicio para editar    	
      proveedoresServiceU.updateUser($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      proveedoresServiceU.cancel($location);      
    };
    
}]);