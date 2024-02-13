/**
 * 
 */
angular.module('hrl').factory('Utils', [ '$location', function($location) {

	return{
		getQsParams: function(name){
			
			var winURL = window.location.href;
		    var queryStringArray = winURL.split("?");
		    if (!queryStringArray[1]){
		    	if (console && console.warn){
		    		console.warn('expecting '+name+' query string param');
		    		return;
		    	}
		    }
		    var queryStringParamArray = queryStringArray[1].split("&");
		    var nameValue = null;

		    for ( var i=0; i<queryStringParamArray.length; i++ )
		    {           
		        queryStringNameValueArray = queryStringParamArray[i].split("=");

		        if ( name == queryStringNameValueArray[0] )
		        {
		            nameValue = queryStringNameValueArray[1];
		        }                       
		    }

		    return nameValue;
		},
		
		showErrorPage: function(){	
			var url = "error";
			window.location.href = url;
		},
		
		showCookiesErrorPage: function(){	
			var url = "cookiesError";
			window.location.href = url;
		},
		
		addAccessibilityScript: function (webApiUrl) {
			//init variables and body class on window for IE
			var sAgent = window.navigator.userAgent;
			var Idx = sAgent.indexOf("MSIE");

			for (var version = 8 ; version <= 11 ; ++version) {
				window['ie' + version] = false;
				
			}
			if (Idx > 0) {
				var num = parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
				window['ie' + num] = true;
				angular.element('body').addClass('ie');
				angular.element('body').addClass('ie' + num);
			}
			else if (!!navigator.userAgent.match(/Trident\/7\./)) {
				ver = 11;
				window.ie11 = true;
				angular.element('body').addClass('ie');
				angular.element('body').addClass('ie11');
			}
			
			if ($('body').hasClass('ie8') || $('body').hasClass('ie9') || $('body').hasClass('ie7')) {
				//dont load the script
		    }else {
				var negishutScript = $("<script>");
				negishutScript.html('window.interdeal = {sitekey  : "de62e3a501f29fd738f1477108e55e95", Position : "Right", Menulang : "HE" }');
				negishutScript.attr('data-cfasync', 'false');
				$('body').append(negishutScript);

				var url = webApiUrl ;
				var urlScriptSrc = $('<script/>', {
					'src': url,
					'data-cfasync': 'false'
				});
				$('body').append(urlScriptSrc);			    	
		    }
		}
	};
}]);