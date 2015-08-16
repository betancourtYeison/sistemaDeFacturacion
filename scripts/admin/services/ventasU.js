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
  			scope.refVentas.$save(scope.ventas).then(function() {
  			  // data has been saved to our database  			  
  			  location.path('/registroVentasCRD');
  			});	
		},
		cancel:function(location){//Funcion para cancelar actualizacion
			location.path('/registroVentasCRD');
		}
	};

});