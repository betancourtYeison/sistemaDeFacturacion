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

  	//Variable que permitira ser usada para la autenticacion de login federado y normal  	
  	var auth = new FirebaseSimpleLogin(chatRef, function(error,user){
  		if(error){//si no pudo autenticarse
  			$scope.loginError=true;//cambia el estado de bool para ejecutar la animacion 
  		}else if(user){//si es autenticado satisfactoriamente ejecuta...
  			if(user.provider === 'password'){//si es autenticado por usuario normal
				$scope.user=user.email;//guarda el email en la variable user
				$scope.loginError=false;//cambia el estado de bool para ejecutar la animacion 
          		loginService.setUser(true, user.email);//guarda el email para verificar la autenticacion de las vistas por medio de la funcion de loginService
  			}else if(user.provider === 'twitter'){//si es autenticado por twitter
  				$scope.user=user.displayName;//guarda el displayname en la variable user
          		loginService.setUser(true, user.displayName);//guarda el email para verificar la autenticacion de las vistas por medio de la funcion de loginService
        	}else{//si es autenticado por facebook o github
          		$scope.user=user.thirdPartyUserData.email;//guarda el email en la variable user
          		loginService.setUser(true, user.thirdPartyUserData.email);//guarda el email para verificar la autenticacion de las vistas por medio de la funcion de loginService
	        } 
    	    //document.location.href = 'http://localhost:8080/sistemaDeFacturacion2/index2.html';//redirecciona al home
  		}
	});  	

	//Funcion para login por Facebook
	$scope.loginFacebook=function(){
		loginService.loginFacebook(auth);//Autentica por facebook mediante la funcion que esta en la clase loginService
	};

	//Funcion para login por Twitter
	$scope.loginTwitter=function(){
		loginService.loginTwitter(auth);//Autentica por Twitter mediante la funcion que esta en la clase loginService
	};

	//Funcion para login por Github
	$scope.loginGithub=function(){
		loginService.loginGithub(auth);//Autentica por Github mediante la funcion que esta en la clase loginService
	};

	//Funcion para login por acceso normal
	$scope.loginPass=function(emai,pass){
		loginService.loginPass(auth,emai,pass);//Autentica por acceso normal mediante la funcion que esta en la clase loginService
	};

	//Funcion para cerrar la sesion
	$scope.logout=function(){
		loginService.logout(auth,$scope);//Cierra la sesion mediante la funcion que esta en la clase loginService
    	loginService.setUser(false);//Determina que no hay usuario mediante la funcion que esta en la clase loginService
	};

	//Funcion para crear un nuevo usuario
	$scope.newUser=function(email,pass){
		loginService.newUser(chatRef,email,pass,$scope);//Crea usuario mediante la funcion que esta en la clase loginService
	};
}]);