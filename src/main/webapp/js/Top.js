;(function() {

	/**
	 * View: Top
	 *
	 */
    (function ($) {
        brite.registerView("Top",  {parent:".MainScreen-header"}, {
            create:function (data, config) {
                var $html = app.render("tmpl-Top");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                
            },
            events:{
            	"btap;.nav li":function(e){
            		var view = this;
            		var $e = view.$el;
            		var $li = $(e.currentTarget);
            		$e.find("li").removeClass("active");
            		$li.addClass("active");
            	},

                "btap;.nav li[data-nav='facebook']": function(e) {
                    app.oauth.authorize('facebook');
                },
                "btap;.nav li[data-nav='linkedin']": function(e) {
                    app.oauth.authorize('linkedin');
                },
                "btap;.nav li[data-nav='google']": function(e) {
                    app.oauth.authorize('google');
                },

                "btap;.nav li[data-nav='contact']": function(e) {
                    brite.display("GoogleContacts");
                },

                "btap;.nav li[data-nav='mail']": function(e) {
                    brite.display("GoogleMails");
                },
                "btap;.nav li[data-nav='fbfriend']": function(e) {
                	 brite.display("FacebookFriends");
                }
            },

            docEvents:{
            },

            daoEvents:{
            }
        });
        
    })(jQuery);


})();