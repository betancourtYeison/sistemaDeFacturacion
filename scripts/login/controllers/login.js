'use strict';

/**
 * @ngdoc function
 * @name facturacionLoginApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the facturacionLoginApp
 */

//Controlador para Login la cual tiene 1 servicio loginService con su respectivo scope
angular.module('facturacionLoginApp')
  .controller('LoginCtrl', ['$scope', 'loginService', function ($scope,loginService) {

	//$scope.loginError=false;//variable bool para realizar animacion
  	$scope.newUserError=false;//variable bool para realizar animacion
  	$scope.newUserCorrect=false;//variable bool para realizar animacion

  	var chatRef = new Firebase('https://sistemadefacturacion.firebaseio.com/');//Conecta a la base de dato de firebase la cual permite logueo federado y normal
 		
	//Funcion para login por acceso normal
	$scope.loginPass=function(emai,pass){
		loginService.loginPass(chatRef,emai,pass,$scope);//Autentica por acceso normal mediante la funcion que esta en la clase loginService
	};

	//Funcion para crear un nuevo usuario
	$scope.newUser=function(email,pass){		
		loginService.newUser(chatRef,email,pass,$scope);//Crea usuario mediante la funcion que esta en la clase loginService
	};
}]);