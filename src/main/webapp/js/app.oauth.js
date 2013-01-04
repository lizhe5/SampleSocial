var app = app || {};
(function($) {
	app.oauth = {};
	
	app.oauth.authorize = function(service){
		if ("facebook"==service) {
			$.ajax({
				type : "GET",
				url : contextPath+"/authorize.json?service="+service,
				dataType : "json"
			}).pipe(function(val) {
				var url = val.url;
				window.showModalDialog(url);
			});	
		}else{
			return window.showModalDialog(contextPath+"/authorize.json?service="+service);
		};
		
	}
	
	app.oauth.setToken = function(paramsStr,service){
		var params = {mehotd:"POST"};
		params.params = paramsStr;
		params.service = service;
		return app.getJsonData(contextPath+"/setToken.do",params);
	}
})(jQuery);
