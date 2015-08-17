'use strict';

/**
 * @ngdoc service
 * @name facturacionAdminApp.Proveedores
 * @description
 * # Proveedores
 * Service in the facturacionAdminApp.
 */

//Servicio de Ventas
angular.module('facturacionAdminApp')
  .factory('proveedoresServiceCRD',function(){	
	return{				
		createNewProvider:function(firebaseRef, scope, form){//Funcion para crear usuario
			var onComplete = function(error) {
			  if (!error) {
			    scope.tableParams.reload();
			    if (form) {
			      form.$setPristine();        
			    }
			    scope.proveedores = angular.copy(scope.master);
			  } 
			};
			
			firebaseRef('proveedores/'+ scope.proveedores.rut).set({
			  rut: scope.proveedores.rut,			  
			  name: scope.proveedores.name,			  
			  email: scope.proveedores.mail,
			  address: scope.proveedores.address,
			  phone: scope.proveedores.phone,
			  area: scope.proveedores.area
			}, onComplete);  
		},
		editProvider:function(location, rut){//Funcion para editar usuario
			location.path('/proveedoresU/' + rut);
		},
		deleteProvider:function(scope, rut){//Funcion para eliminar usuario
			scope.refproveedores.$remove(scope.refproveedores.$getRecord(rut)).then(function(){
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