'use strict';

/**
 * @ngdoc service
 * @name facturacionAdminApp.login
 * @description
 * # login
 * Service in the facturacionAdminApp.
 */

//Servicio de Login
angular.module('facturacionAdminApp')
  .factory('loginService',function(){	

  	var user = false;//variable para determinar si hay un usuario
  	var emailUser = null;//variable para guardar el email de usuario
	return{
		loginFacebook:function(auth){//Funcion para realizar login federado con Facebook
			auth.login('facebook',{
				rememberMe: true,
				scope: 'email, user_likes'
			});
		},
		loginTwitter:function(auth){//Funcion para realizar login federado con Twitter
			auth.login('twitter',{
				rememberMe: true,
				scope: 'email, user_likes'
			});
		},
		loginGithub:function(auth){//Funcion para realizar login federado con Github
			auth.login('github',{
				rememberMe: true,
				scope: 'email, user_likes'
			});
		},
		loginPass:function(auth,email,pass){//Funcion para realizar login normal
			auth.login('password',{
				email: email,
				password: pass
			});
		},
		logout:function(auth,scope){//Funcion para cerrar sesion
			alert("entro");
			auth.logout();
			scope.user='';//borra el usuario
			document.location.href = 'http://localhost:8080/sistemaDeFacturacion2/';//redirecciona a login
		},
		newUser:function(chatRef,email,pass,scope){//Funcion para crear un usuario nuevo
			chatRef.createUser({
				email: email,
				password: pass
			}, function(error){
				if(error === null){
					scope.newUserError=false;////vuelve false para realizar la animacion 
					scope.newUserCorrect=true;//vuelve true para realizar la animacion 
				}else{
					scope.newUserError=true;//vuelve true para realizar la animacion 
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