// Main configuration file. Sets up AngularJS module and routes and any other config objects
var appRoot = angular.module('hrl', ['ngCookies']);     //Define the main module
appRoot.config(['$httpProvider', function($httpProvider, $routeProvider) {
	
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    if (window.initClientErrorReporter) {
        window.initClientErrorReporter({
            angularModule: 'hrl',
            beforeSubmitCallback: function(data) {
                data.url = window.location.href;
                data.userAgent = window.navigator.userAgent;
            }
        });
    }
}]);

// allow to remove listeners on root scope
appRoot.run([ '$rootScope', function($rootScope) {
	$rootScope.$off = function(eventName, fn) {
		if(this.$$listeners) {
			var eventArr = this.$$listeners[eventName];
			if(eventArr) {
				for(var i = 0; i < eventArr.length; i++) {
					if(eventArr[i] === fn) {
						eventArr.splice(i, 1);
					}
				}
			}
		}
	};
}]);

// init variables and body class on window for IE
(function() {
	var sAgent = window.navigator.userAgent;
	var Idx = sAgent.indexOf("MSIE");

	for (var version = 8 ; version <= 11 ; ++version) {
		window['ie' + version] = false;
		
	}
	if (Idx > 0) {
		var num = parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
		window['ie' + num] = true;
		angular.element('body').addClass('ie' + num);
	}
	else if (!!navigator.userAgent.match(/Trident\/7\./)) {
		ver = 11;
		window.ie11 = true;
		angular.element('body').addClass('ie11');
	}
})();