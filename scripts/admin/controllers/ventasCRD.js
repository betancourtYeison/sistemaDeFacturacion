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
  .controller('VentasCtrlCRD', ['$scope', 'ventasServiceCRD', '$location', 'firebaseRef', 'syncData', 
    function ($scope, ventasServiceCRD, $location, firebaseRef, syncData) {

    $scope.regVentas = syncData('ventas');//Sincroniza los datos de la base datos para mostrar
    
    $scope.createNewUser = function () {//funcion que llama al servicio para crear usuario
      ventasServiceCRD.createNewUser(firebaseRef, $scope);      
    }

    $scope.editUser = function (id) {//funcion que llama al servicio para editar usuario
      ventasServiceCRD.editUser($location, id);      
    };

    $scope.deleteUser = function(id) {//funcion que llama al servicio para eliminar usuario
      ventasServiceCRD.deleteUser($scope, syncData, id);      
    }
}]);