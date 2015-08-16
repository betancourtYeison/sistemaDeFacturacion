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
      
    //$scope.ventas = syncData('ventas/' + $routeParams.id);//Sincroniza el usuario que se va a editar

    var ref = new Firebase("https://sistemadefacturacion.firebaseio.com/ventas");

    $scope.refVentas = $firebaseArray(ref);

    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.ventas = $scope.refVentas.$getRecord($routeParams.id);        
    });         

    $scope.updateUser = function () {//Funcion que llama al servicio para editar
    	//console.log($scope.ventas);
      ventasServiceU.updateUser($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      ventasServiceU.cancel($location);      
    };
}]);