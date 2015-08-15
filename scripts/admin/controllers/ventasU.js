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
  .controller('VentasCtrlU', ['$scope', 'ventasServiceU', '$location', 'firebaseRef', '$routeParams', 'syncData', function ($scope, ventasServiceU, $location, firebaseRef, $routeParams, syncData) {
      
    $scope.ventas = syncData('ventas/' + $routeParams.id);//Sincroniza el usuario que se va a editar

    $scope.updateUser = function () {//Funcion que llama al servicio para editar
      ventasServiceU.updateUser($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      ventasServiceU.cancel($location);      
    };
}]);