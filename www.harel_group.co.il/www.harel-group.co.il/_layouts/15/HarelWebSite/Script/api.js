define(["jquery"], function ($) {
    try {
        var root = '/api/', //HTTPS!!
            cache = {},
            ajax = function (request, callback, no_cache) {
                request = $.extend({
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                    async: true,
                    error: function (err) {
                        //       console.log("### AJAX ERROR ###");
                        //      console.log(err);
                        callback(err);
                    },
                    success: function (data) {
                        callback(null, data);
                    }
                }, request);
                //                if (no_cache && no_cache === true) {
                //                    $.ajax(request);
                //                    return;
                //                }
                //               var index = JSON.stringify(request);
                //                if (cache.hasOwnProperty(index)) {
                //                    data = cache[index];
                //                    callback(null, data);
                //                } else {
                //                    request.success = function (data) {
                //                        cache[index] = data;
                //                        callback(null, data);
                //                    };
                $.ajax(request);
                //               }
            };
        return {
            get: ajax
        };
    } catch (err) {
        console.log("JS ERROR - api");
        console.log(err);
    }
});
