'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:VentasCtrlU
 * @description
 * # VentasCtrlU
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio ventasServiceU con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('VentasCtrlU', ['$scope', 'ventasServiceU', '$location', '$firebaseArray', 'firebaseRef', '$routeParams', 'syncData', function ($scope, ventasServiceU, $location, $firebaseArray, firebaseRef, $routeParams, syncData) {      

    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/ventas");

    $scope.refVentas = $firebaseArray(ref);

    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.ventas = $scope.refVentas.$getRecord($routeParams.id);        
    });         

    $scope.updateUser = function () {//Funcion que llama al servicio para editar
      ventasServiceU.updateUser($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      ventasServiceU.cancel($location);      
    };
}]);