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
			firebaseRef('ventas/'+ scope.ventas.username).set({
			  id: scope.ventas.username,
			  firstName: scope.ventas.firstName,
			  lastName: scope.ventas.lastName,
			  email: scope.ventas.email,
			  password: scope.ventas.password
			}); 
		},
		editUser:function(location, id){//Funcion para editar usuario
			location.path('/registroVentasU/' + id);
		},
		deleteUser:function(scope, syncData, id){//Funcion para eliminar usuario
			scope.ventas = syncData('ventas/' + id);
      		scope.ventas.$remove();
		}
	};

});