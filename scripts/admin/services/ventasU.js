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
  .factory('ventasServiceU',function(){	
  	
	return{				
		updateUser:function(scope, location){//Funcion para actualizar
			scope.ventas.$update({
			  firstName: scope.ventas.firstName,
			  lastName: scope.ventas.lastName,
			  email: scope.ventas.email,
			  password: scope.ventas.password
			});

			location.path('/registroVentasCRD');
		},
		cancel:function(location){//Funcion para cancelar actualizacion
			location.path('/registroVentasCRD');
		}
	};

});