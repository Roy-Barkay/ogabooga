	angular.module('hrl').factory('clientViewFactory', [ '$http' , 'Utils' , '$cookies','$q' , function($http, _utils, $cookie, $q) {
	return {
			
		baseUrlSubmit: '/apps.client-view/client-view',
		
		func: function (a, b, callback){

			$http({
					method: 'GET', 
					url: me.baseUrlSubmit,
					params: {
						"a" : a,
						"b" : b
					}
				})
				.success(function(data, status, headers, config) {
					callback(status ,data, true);
			    })
			    .error(function(data, status, headers, config) {
			    	callback(status ,data, false);
			    }
		    );
		},
	

		loadPageLinks: function (callback){
			var me = this;
			
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/page-links',
					params: {}
				})
				.success(function(data, status, headers, config) {
					//debugger;
					callback(status ,data);
			    })
			    .error(function(data, status, headers, config) {
			    	//debugger;
			    	callback(status ,data);
			    }
		    );
		},		
		
		getClaims: function (callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/client-claims',
					params: {
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getRequests: function (callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/client-requests',
					params: {
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getLoans: function (callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/client-loans',
					params: {
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		

		
		getCustomerProducts: function (callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/customer-products',
					params: {
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getCarDetails: function (elementaryId,callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/car-details',
					headers: {
					       "Accept": "application/json; charset=utf-8",
					       "Accept-Charset": "charset=utf-8",
					   },
					params: {
						'elementaryId' : elementaryId,
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getApartmentDetails: function (elementaryId,callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/apartment-details',
					headers: {
					       "Accept": "application/json; charset=utf-8",
					       "Accept-Charset": "charset=utf-8",
					   },
					params: {
						'elementaryId' : elementaryId,
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getMigvanSum: function (callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/migvan-sum',
					params: {
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getOnlineRestData: function (callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/online-data',
					params: {
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getPropertiesValue: function (propertyName,callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/properties',
					params: {
						'ticket' : _utils.getQsParams('ticket'),
						'propertyName' : propertyName,
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getCampainDetails: function (userId,callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/campain-details',
					headers: {
					       "Accept": "application/json; charset=utf-8",
					       "Accept-Charset": "charset=utf-8",
					   },
					params: {
						'userId' : userId,
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		getlinkPorsheySiud: function (userId, email, mobilePhone, callback){
			var me = this;
			$http({
					method: 'GET', 
					url: me.baseUrlSubmit + '/link-porshey-siud',
					headers: {
					       "Accept": "application/json; charset=utf-8",
					       "Accept-Charset": "charset=utf-8",
					   },
					params: {
						'userId' : userId,
						'email' : email,
						'mobilePhone' : mobilePhone,
						'ticket' : _utils.getQsParams('ticket'),
						'ctime': new Date().getTime(),
					}
				})
				.success(function(data, status, headers, config) {
					if (typeof(callback) == 'function'){
						callback(status ,data, true);						
					}
			    })
			    .error(function(data, status, headers, config) {
			    	if (typeof(callback) == 'function'){
			    		callback(status ,data, false);
			    	}
			    }
		    );
		},
		
		
		writeToLog : function(action,msg){
			
			var deferred = $q.defer();
			var me = this;
			var ActionToLog = {'action' : action,'msg': msg,'ticket' : _utils.getQsParams('ticket')};	
			$http.post(me.baseUrlSubmit + '/write-action-to-log/?_csrf=' + $cookie._csrf + '&ctime=' + new Date().getTime(),ActionToLog)
				.success(function (data) {
					
				})
				.error(function (error) {
					
				});

		},
		
		toBusinessEvent : function(zehut, firstName, lastName, mobile, email, inboundOffersResponseObj, action){
			
			var deferred = $q.defer();
			var me = this;
			var params = {	
							'zehut': zehut,
							'firstName': firstName,
							'lastName': lastName,
							'mobile': mobile,
							'email': email,						
							'inboundOffersResponse' : inboundOffersResponseObj,
							'ticket' : _utils.getQsParams('ticket'),
							'action' : action
						};	
			$http.post(me.baseUrlSubmit + '/to-business-event/?_csrf=' + $cookie._csrf + '&ctime=' + new Date().getTime(),params)
				.success(function (data) {
					
				})
				.error(function (error) {
					
				});

		}	
	
		
	};
}]);