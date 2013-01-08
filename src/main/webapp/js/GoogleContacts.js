;
(function ($) {

    brite.registerView("GoogleContacts",{parent:".MainScreen-main"},{
        create: function (data, config) {
           return $("#tmpl-GoogleContacts").render();
        },

        postDisplay: function (data, config) {
            var contacts = app.getContacts(data||{});
            brite.display("DataTable", ".contacts-container", {
                gridData:contacts,
                rowAttrs: function(obj){ return " etag='{0}'".format(obj.etag)},
                columnDef:[
                    {
                        text:"#",
                        render: function(obj, idx){return idx + 1},
                        attrs:"style='width: 10%'"
                    },
                    {
                        text:"Emails",
                        render:function(obj){return obj.email},
                        attrs:"style='width: 400px'"

                    },
                    {
                        text:"Full Name",
                        render:function(obj){return obj.fullName},
                        attrs:"style='width: 25%'"
                    },
                    {
                        text:"Group",
                        render:function(obj){return getGroupId(obj.groupId)}
                    }
                ],
                opts:{
                    htmlIfEmpty: "Not contacts found",
                    withPaging: false,
                    cmdEdit: "EDIT_CONTACT",
                    cmdDelete: "DELETE_CONTACT"
                }
            });
        },

        events: {
        },

        docEvents: {
        },

        daoEvents: {
        }
    });
    function getGroupId(url) {
        var myregexp = /http:\/\/www.google.com\/m8\/feeds\/groups\/(.+)\/base\/(.+)/;
        var match = myregexp.exec(url);
        if (match != null) {
            result = match[2];
        } else {
            result = "";
        }
        return result;
    }
    function getContactId(url) {
        var myregexp = /http:\/\/www.google.com\/m8\/feeds\/contacts\/(.+)\/base\/(.+)/;
        var match = myregexp.exec(url);
        if (match != null) {
            result = match[2];
        } else {
            result = "";
        }
        return result;
    }
})(jQuery);