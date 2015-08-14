'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio loginService con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('LoginCtrl', ['$scope', 'loginService', function ($scope,loginService) {

    $scope.loginError=false;//variable bool para realizar animacion
    $scope.newUserError=false;//variable bool para realizar animacion
    $scope.newUserCorrect=false;//variable bool para realizar animacion

    var chatRef = new Firebase('https://sistemadefacturacion.firebaseio.com/');//Conecta a la base de dato de firebase la cual permite logueo federado y normal    

    var authData = chatRef.getAuth();
    $scope.user = authData.password.email;
    loginService.setUser(true,authData.password.email);  	

    //Funcion para cerrar la sesion
    $scope.logout=function(){
    	loginService.logout(chatRef,$scope);//Cierra la sesion mediante la funcion que esta en la clase loginService
      	loginService.setUser(false);//Determina que no hay usuario mediante la funcion que esta en la clase loginService
    };
}]);