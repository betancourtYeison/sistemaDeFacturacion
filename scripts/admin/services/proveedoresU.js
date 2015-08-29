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
  .factory('proveedoresServiceU',function(){	
	return{				
		updateUser:function(scope, location){//Funcion para actualizar			
  			scope.refproveedores.$save(scope.proveedores).then(function() {
  			  // data has been saved to our database  			  
  			  location.path('/proveedoresCRD');
  			});	
		},
		cancel:function(location){//Funcion para cancelar actualizacion
			location.path('/proveedoresCRD');
		}
	};
});