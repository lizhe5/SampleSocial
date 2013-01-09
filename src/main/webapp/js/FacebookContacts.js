;(function() {
	(function($) {
		brite.registerView("FacebookContacts", {
			loadTmpl : true,
			emptyParent : true,
			parent : ".MainScreen-main"
		}, {
			create : function(data, config) {
				var $html = app.render("tmpl-FacebookContacts");
				var $e = $($html);
				return $e;
			},
			postDisplay : function(data, config) {
				var view = this;
				var $e = view.$el;
				view.refreshContactsList.call(view);
			},
			events : {
			},

			docEvents : {
			},

			daoEvents : {
			},
			refreshContactsList : function() {
				var view = this;
				var $e = view.$el;
				if (!$e) {
					return;
				};
				var dfd = $.Deferred();
				var $items = $e.find(".listItem").empty();
				$.ajax({
					type : "get",
					url : contextPath + "/fbContactsList.json",
					data : {
						limit : 10,
						offset : 0
					},
					dataType : "json"
				}).done(function(data) {
					for (var i = 0; i < data.length; i++) {
						$items.append(app.render("tmpl-Contact-list-rowItem", data[i]));
					};
					
					$items.find(".deleteContactBtn").click(function() {
						var id = $(this).attr("data-value");
						var d = {id:id};
						$.ajax({
							type : "POST",
							url : contextPath + "/deleteFacebookContact.do",
							data : d,
							dataType : "json"
						}).done(function(){
							view.refreshContactsList.call(view);
						})
					})
					
					$items.find(".contact-name").each(function() {
						var fbid = $(this).attr("fbid");
						var po = {};
						for (var i = 0; i < data.length; i++) {
							if (data[i].id == fbid) {
								po = data[i];
							};
						};
						var html = $("#tmpl-MainContent-ContactDetail").render(po);
					});
				});
				dfd.resolve();
				return dfd.promise();

			}
		});
	})(jQuery);

})();
