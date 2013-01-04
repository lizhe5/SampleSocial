;
(function ($) {

    brite.registerView("GoogleContacts", {loadTmpl: true}, {
        create: function (data, config) {
            return $("#tmpl-GoogleContacts").render(data);
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