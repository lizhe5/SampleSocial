;(function() {

	/**
	 * View: MainScreen
	 *
	 */
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
				var dfd = $.Deferred();
				var $items = $e.find(".listItem").empty();
				$.ajax({
					type : "get",
					url : contextPath + "/fbFriendsList.json",
					data : {
						limit : 10,
						offset : 0
					},
					dataType : "json"
				}).done(function(data) {
					for (var i=0; i < data.length; i++) {
						$items.append(app.render("tmpl-Friends-list-rowItem", data[i]));
					};
						$items.find(".addContactBtn").click(function() {
							var $td = $(this).closest("td");
							var $inputs = $($td).find("input");
							var d = {};
							$inputs.each(function() {
								var $inp = $(this);
								d[$inp.attr("name")] = $inp.val();
							})

							d.groupId = view.groupId;
							brite.dao("Contact").addContact(d).done(function(po) {
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
							// $(this).popover({
							// html : true,
							// title : 'Detail',
							// trigger : 'hover',
							// content : html
							// })
						});
				});
				dfd.resolve();
				return dfd.promise();

			}
		});
	})(jQuery);

})();
