var app = app || {};

(function(w){  
  
	w.render = function(templateName, data) {
		var tmpl = Handlebars.templates[templateName];
		if (tmpl) {
			return tmpl(data);
		} else {
			// obviously, handle this case as you think most appropriate.
			return "<small>Error: could not find template: " + templateName + "</small>";
		}
	}

})(window);

(function($) {
	
	app.render = function(templateName,data){
		data = data || {};
		return render(templateName,data);
	}
	
	// -------- Public Methods --------- //
	/**
	 * A method about use ajax to get json data
	 */
	app.getJsonData = function(url, params) {
		var dfd = $.Deferred();
		params = params || {};
		jQuery.ajax({
			  type : params.method ? params.method : "Post",
			  url : url,
			  async : true,
			  data : params,
			  dataType : "json"
		  }).success(function(data) {
		  	  if(data && data.AUTH_FAILED){
		  	  	window.location = contextPath + "/";
		  	  }
			  dfd.resolve(data);
		  }).fail(function(jxhr, arg2) {
			try {
				if (jxhr.responseText) {
					console.log(" WARNING: json not well formatted, falling back to JS eval");
					var data = eval("(" + jxhr.responseText + ")");
					dfd.resolve(data);
				} else {
					throw " EXCEPTION: Cannot get content for " + url;
				}
			} catch (ex) {
				console.log(" ERROR: " + ex + " Fail parsing JSON for url: " + url + "\nContent received:\n"
				  + jxhr.responseText);
			}
		});

		return dfd.promise();
	}
	
})(jQuery);
