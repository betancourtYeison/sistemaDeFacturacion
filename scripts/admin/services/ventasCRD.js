'use strict';

/**
 * @ngdoc service
 * @name facturacionAdminApp.Ventas
 * @description
 * # Ventas
 * Service in the facturacionAdminApp.
 */

//Servicio de Ventas
angular.module('facturacionAdminApp')
  .factory('ventasServiceCRD',function(){	
	return{				
		createNewUser:function(firebaseRef, scope){//Funcion para crear usuario
			var onComplete = function(error) {
			  if (!error) {
			    scope.tableParams.reload();
			  } 
			};

			firebaseRef('ventas/'+ scope.ventas.username).set({
			  id: scope.ventas.username,
			  firstName: scope.ventas.firstName,
			  lastName: scope.ventas.lastName,
			  email: scope.ventas.email,
			  password: scope.ventas.password
			}, onComplete);  
		},
		editUser:function(location, id){//Funcion para editar usuario
			location.path('/registroVentasU/' + id);
		},
		deleteUser:function(scope, id){//Funcion para eliminar usuario
			scope.refVentas.$remove(scope.refVentas.$getRecord(id)).then(function(){
			  //data has been removed to our database  			  
			  scope.tableParams.reload();
  			});     
		},
		ordenarPor:function(scope, orden, sort){//Funcion para eliminar usuario
			scope.sort = sort;
      		scope.ordenSeleccionado = orden;
		}
	};

});