;
(function ($) {

    brite.registerView("GoogleMails", {loadTmpl: true}, {
        create: function (data, config) {
            return $("#tmpl-GoogleMails").render(data);
        },

        postDisplay: function (data, config) {

        },

        events: {
        },

        docEvents: {
        },

        daoEvents: {
        }
    })
})(jQuery);