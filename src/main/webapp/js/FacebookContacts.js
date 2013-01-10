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
				"btap;.icon-remove" : function(e) {
					var view = this;
					var $e = view.$el;
					
					var $tr = $(e.currentTarget).closest("tr");
					var id = $tr.attr("data-obj_id");
					var d = {
						id : id
					};
					$.ajax({
						type : "POST",
						url : contextPath + "/deleteFacebookContact.do",
						data : d,
						dataType : "json"
					}).done(function() {
						view.refreshContactsList.call(view);
					})
				},
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
				brite.display("DataTable", ".listItem", {
					dataProvider : {
						list : app.getFBContacts
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
							return obj.hometownname
						},
						attrs : "style='width: 25%'"
					}],
					opts : {
						htmlIfEmpty : "Not contacts found",
						withPaging : true,
						cmdEdit : "EDIT_CONTACT",
						cmdDelete : "DELETE_CONTACT"
					}
				});

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
						var d = {
							id : id
						};
						$.ajax({
							type : "POST",
							url : contextPath + "/deleteFacebookContact.do",
							data : d,
							dataType : "json"
						}).done(function() {
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
