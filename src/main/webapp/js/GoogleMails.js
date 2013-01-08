;
(function ($) {

    brite.registerView("GoogleMails",{parent:".MainScreen-main"}, {
        create: function (data, config) {
            $(".MainScreen-main .mails-container").remove();
            return $("#tmpl-GoogleMails").render();
        },

        postDisplay: function (data, config) {
            var view = this;
            showEmails.call(view);
        },

        events: {
        },

        docEvents: {
        },

        daoEvents: {
        }
    });
    function showEmails() {
        return brite.display("DataTable", ".mails-container", {
            dataProvider: {list: app.getEmails},
            columnDef: [
                {
                    text: "#",
                    render: function (obj, idx) {
                        return idx + 1
                    },
                    attrs: "style='width: 10%'"
                },
                {
                    text: "Date",
                    render: function (obj) {
                        var recDate = new Date(obj.date);
                        return recDate.format("yyyy-MM-dd hh:mm:ss")
                    },
                    attrs: "style='width: 20%'"

                },
                {
                    text: "From",
                    render: function (obj) {
                        return obj.from
                    },
                    attrs: "style='width: 25%'"
                },
                {
                    text: "Subject",
                    render: function (obj) {
                        return obj.subject
                    }
                }
            ],
            opts: {
                htmlIfEmpty: "Not emails found",
                withPaging: true,
                cmdDelete: "DELETE_EMAIL"
            }
        });
    }
})(jQuery);