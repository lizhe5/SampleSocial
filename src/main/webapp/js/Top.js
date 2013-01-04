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
            		if ($li.attr("data-nav")=="facebook") {
            			app.oauth.authorize('facebook');	
            		};
            	}
            	},
                "btap;.nav li.contact": function(e) {
                    brite.display("GoogleContacts", "MainScreen-main");
                },
                "btap;.nav li.mail": function(e) {
                    brite.display("GoogleMails", "MainScreen-main");
                }
            },

            docEvents:{
            },

            daoEvents:{
            }
        });
        
    })(jQuery);


})();
