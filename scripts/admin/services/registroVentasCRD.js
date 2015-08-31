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
		calculateValTot:function(producto,scope){//Funcion para crear usuario
			producto.valorTot = (producto.valorUni*producto.cantidad);
			scope.subTotal = 0;
			
			for (var i=0; i<scope.datosProducto.length; i++) {
			  scope.subTotal += (scope.datosProducto[i].valorUni*scope.datosProducto[i].cantidad);                
			};
			
			scope.impuesto = (scope.subTotal * 16)/100;
			if(scope.descuento == 0){
			  scope.total = (scope.subTotal + scope.impuesto);
			}else{
			  scope.total = (scope.subTotal + scope.impuesto)-(((scope.subTotal + scope.impuesto) * scope.descuento)/100);
			}  
		},			
		calculateTot:function(scope){//Funcion para crear usuario
			if(scope.descuento == 0){
			  scope.total = (scope.subTotal + scope.impuesto);
			}else{
			  scope.total = (scope.subTotal + scope.impuesto)-(((scope.subTotal + scope.impuesto) * scope.descuento)/100);
			}  
		},
		addProduct:function(customerName, customerId, customerPhone, productRef, productCod, productVal, productCount, productPago, scope){//Funcion para crear usuario
			scope.datosProducto.push({referencia: productRef, 
			                          codigo: productCod, 
			                          cantidad: productCount, 
			                          valorUni: productVal, 
			                          valorTot: (productVal*productCount),
			                          formaPago: productPago});      

			scope.factura = {noFactura: scope.noFactura,
			                  nombre: customerName,
			                  cedula: customerId,
			                  telefono: customerPhone,
			                  datosProducto: scope.datosProducto};
			                      
			scope.subTotal += (productVal*productCount);      
			scope.impuesto = (scope.subTotal * 16)/100;
			if(scope.descuento == 0){
			  scope.total = (scope.subTotal + scope.impuesto);
			}else{
			  scope.total = (scope.subTotal + scope.impuesto)-(((scope.subTotal + scope.impuesto) * scope.descuento)/100);
			}      
		},	
		deleteProduct:function(id, scope){//Funcion para eliminar usuario
			scope.datosProducto.reverse();
			scope.subTotal -= (scope.datosProducto[id].valorTot);  
		 	scope.impuesto = (scope.subTotal * 16)/100;
		 	if(scope.descuento == 0){
		 		scope.total = (scope.subTotal + scope.impuesto);
		 	}else{
		 		scope.total = (scope.subTotal + scope.impuesto)(((scope.subTotal + scope.impuesto) * scope.descuento)/100);
		 	}
	      	var productToDelete = scope.datosProducto[id];            
	      	scope.datosProducto.splice(id,1);
	      	scope.datosProducto.reverse();
		},		
		createBil:function(firebaseRef, scope){//Funcion para crear usuario			
			firebaseRef('registroVentas/'+ scope.factura.noFactura).set({
			  noFactura: scope.factura.noFactura,
			  nombre: scope.factura.nombre,
			  cedula: scope.factura.cedula,
			  telefono: scope.factura.telefono
			});  		

			for (var i=0; i<scope.datosProducto.length; i++) {
				firebaseRef('registroVentas/'+ scope.factura.noFactura+'/datosProducto/'+scope.datosProducto[i].codigo).set({
				  referencia: scope.datosProducto[i].referencia,
				  codigo: scope.datosProducto[i].codigo,
				  cantidad: scope.datosProducto[i].cantidad,
				  valorUni: scope.datosProducto[i].valorUni,
				  valorTot: scope.datosProducto[i].valorTot,
				  formaPago: scope.datosProducto[i].formaPago
				});
			} 			
		}
	};
});