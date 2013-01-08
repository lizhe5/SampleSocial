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
					data = [{
						"about" : "",
						"bio" : "",
						"birthday" : "",
						"birthdayAsDate" : null,
						"education" : [],
						"email" : "",
						"favoriteAthletes" : [],
						"favoriteTeams" : [],
						"firstName" : "aa",
						"gender" : "",
						"hometown" : null,
						"hometownName" : "",
						"id" : "100001542382538",
						"interestedIn" : [],
						"languages" : [],
						"lastName" : "",
						"link" : "",
						"locale" : "",
						"location" : null,
						"meetingFor" : [],
						"metadata" : null,
						"middleName" : "",
						"name" : "Woofgl Liang",
						"political" : "",
						"quotes" : "",
						"relationshipStatus" : "",
						"religion" : "",
						"significantOther" : null,
						"sports" : [],
						"thirdPartyId" : "",
						"timezone" : 0,
						"type" : "",
						"updatedTime" : null,
						"username" : "",
						"verified" : false,
						"website" : "",
						"work" : []
					}, {
						"about" : "",
						"bio" : "",
						"birthday" : "",
						"birthdayAsDate" : null,
						"education" : [],
						"email" : "",
						"favoriteAthletes" : [],
						"favoriteTeams" : [],
						"firstName" : "bb",
						"gender" : "",
						"hometown" : null,
						"hometownName" : "",
						"id" : "100002348599426",
						"interestedIn" : [],
						"languages" : [],
						"lastName" : "",
						"link" : "",
						"locale" : "",
						"location" : null,
						"meetingFor" : [],
						"metadata" : null,
						"middleName" : "",
						"name" : "ÀŒ”Óπ‚222",
						"political" : "",
						"quotes" : "",
						"relationshipStatus" : "",
						"religion" : "",
						"significantOther" : null,
						"sports" : [],
						"thirdPartyId" : "",
						"timezone" : 0,
						"type" : "",
						"updatedTime" : null,
						"username" : "",
						"verified" : false,
						"website" : "",
						"work" : []
					}, {
						"about" : "",
						"bio" : "",
						"birthday" : "",
						"birthdayAsDate" : null,
						"education" : [],
						"email" : "",
						"favoriteAthletes" : [],
						"favoriteTeams" : [],
						"firstName" : "cc",
						"gender" : "",
						"hometown" : null,
						"hometownName" : "",
						"id" : "100003944136001",
						"interestedIn" : [],
						"languages" : [],
						"lastName" : "",
						"link" : "",
						"locale" : "",
						"location" : null,
						"meetingFor" : [],
						"metadata" : null,
						"middleName" : "",
						"name" : "Xuwei  Wang",
						"political" : "",
						"quotes" : "",
						"relationshipStatus" : "",
						"religion" : "",
						"significantOther" : null,
						"sports" : [],
						"thirdPartyId" : "",
						"timezone" : 0,
						"type" : "",
						"updatedTime" : null,
						"username" : "",
						"verified" : false,
						"website" : "",
						"work" : []
					}]
					for (var i = 0; i < data.length; i++) {
						$items.append(app.render("tmpl-Friends-list-rowItem", data[i]));
					};
					$items.find(".addContactBtn").click(function() {
						var $td = $(this).closest("td");
						var $inputs = $($td).find("input");
						var d = {};
						$inputs.each(function() {
							var $inp = $(this);
							d[$inp.attr("name")] = $inp.val();
						});
						$.ajax({
							type : "POST",
							url : contextPath + "/addContact.do",
							data : d,
							dataType : "json"
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
