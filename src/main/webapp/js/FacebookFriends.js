;(function() {

	(function($) {
		brite.registerView("FacebookFriends", {
			loadTmpl : true,
			emptyParent : true,
			parent : ".MainScreen-main"
		}, {
			create : function(data, config) {
				var $html = app.render("tmpl-FacebookFriends");
				var $e = $($html);
				return $e;
			},
			postDisplay : function(data, config) {
				var view = this;
				var $e = view.$el;
				view.refreshFriendsList.call(view);
			},
			events : {
			},

			docEvents : {
			},

			daoEvents : {
			},
			refreshFriendsList : function() {
				var view = this;
				var $e = view.$el;
				if (!$e) {
					return;
				};
				
				brite.display("DataTable", ".listItem", {
					dataProvider : {
						list : app.getFBFriends
					},
					rowAttrs : function(obj) {
						return " etag='{0}'".format(obj.etag)
					},
					columnDef : [{
						text : "#",
						render : function(obj, idx) {
							return idx + 1
						},
						attrs : "style='width: 10%'"
					},{
						text : "Picture",
						render : function(obj, idx) {
							return "<img src='http://graph.facebook.com/"+obj.id+"/picture'/>"
						},
						attrs : "style='width: 10%'"
					}, {
						text : "Name",
						render : function(obj) {
							return obj.name
						},
						attrs : "style='width: 400px'"

					}, {
						text : "Email",
						render : function(obj) {
							return obj.email
						},
						attrs : "style='width: 25%'"
					}, {
						text : "Hometown Name",
						render : function(obj) {
							return obj.hometownName
						},
						attrs : "style='width: 25%'"
					}],
					opts : {
						htmlIfEmpty : "Not friend found",
						withPaging : true,
						cmdEdit : "EDIT_CONTACT"
					}
				});
				
				// $items.find(".addContactBtn").click(function() {
						// var $td = $(this).closest("td");
						// var $inputs = $($td).find("input");
						// var d = {};
						// $inputs.each(function() {
							// var $inp = $(this);
							// d[$inp.attr("name")] = $inp.val();
						// });
						// $.ajax({
							// type : "POST",
							// url : contextPath + "/addFacebookContact.do",
							// data : d,
							// dataType : "json"
						// })
					// })

			}
		});
	})(jQuery);

})();
