'use strict';

/**
 * @ngdoc service
 * @name facturacionLoginApp.login
 * @description
 * # login
 * Service in the facturacionLoginApp.
 */

//Servicio de Login
angular.module('facturacionLoginApp')
  .factory('loginService',function(){	

  	var user = false;//variable para determinar si hay un usuario
  	var emailUser = null;//variable para guardar el email de usuario
	return{		
		loginPass:function(chatRef,email,pass,scope){//Funcion para realizar login normal
			chatRef.authWithPassword({
			  email    : email,
			  password : pass
			}, function(error, authData) {
			  if (error) {
			  	scope.loginError = true;
			    switch (error.code) {
			      case "INVALID_EMAIL":
			        console.log("The specified user account email is invalid.");
			        break;
			      case "INVALID_PASSWORD":
			        console.log("The specified user account password is incorrect.");
			        break;
			      case "INVALID_USER":
			        console.log("The specified user account does not exist.");
			        break;
			      default:
			        console.log("Error logging user in:", error);
			    }
			  } else {
			    console.log("Authenticated successfully with payload:", authData);  	    
			    document.location.href = 'http://localhost:8080/sistemaDeFacturacion/admin.html';//redirecciona a login
			  }
			});
		},		
		newUser:function(chatRef,email,pass,scope){//Funcion para crear un usuario nuevo
			chatRef.createUser({
				email: email,
				password: pass
			},
			function(error, userData) {
			  if (error) {
			  	scope.newUserError=true;//vuelve true para realizar la animacion
 			    switch (error.code) {
			      case "EMAIL_TAKEN":
			        console.log("The new user account cannot be created because the email is already in use.");
			        break;
			      case "INVALID_EMAIL":
			        console.log("The specified email is not a valid email.");
			        break;
			      default:
			        console.log("Error creating user:", error);
			    }
			  } else {
			  	scope.newUserError=false;////vuelve false para realizar la animacion 
				scope.newUserCorrect=true;//vuelve true para realizar la animacion 
			    console.log("Successfully created user account with uid:", userData.uid);
			  }
			});
		},
		setUser:function(userLog,email){//Funcion para guarda un usuario autenticado
			user = userLog;//guarda el usuario en la variable user
			emailUser = email;//guarda el email de usuario en la variable emailUser
		},
		getUser:function(){//Funcion para retornar el usuario
			return emailUser;
		},
		isLogged:function(){//Funcion para retornar si esta autenticado un usuario
			return user;
		}
	};

});