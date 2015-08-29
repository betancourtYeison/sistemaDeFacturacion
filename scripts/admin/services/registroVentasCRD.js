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
  .factory('registroVentasServiceCRD',function(){	
	return{	
		addProduct:function(scope){//Funcion para crear usuario
			console.log(scope);
		},			
		createBil:function(firebaseRef, scope){//Funcion para crear usuario		    
			firebaseRef('registroVentas/'+ scope.factura.noFactura).set({
			  noFactura: scope.factura.noFactura,
			  nombre: scope.factura.nombre,
			  cedula: scope.factura.cedula,
			  telefono: scope.factura.telefono
			});  		
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