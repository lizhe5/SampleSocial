;
(function ($) {

    brite.registerView("GoogleMails", {
        create: function (data, config) {
            var view = this;
            var emails = app.getEmails();
            return showEmails.call(view, emails);
        },

        postDisplay: function (data, config) {

        },

        events: {
        },

        docEvents: {
        },

        daoEvents: {
        }
    });
    function showEmails(emails) {
        return brite.display("DataTable", ".MainScreen-main", {
            gridData: emails,
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
                withPaging: false,
                cmdDelete: "DELETE_EMAIL"
            }
        });
    }
})(jQuery);