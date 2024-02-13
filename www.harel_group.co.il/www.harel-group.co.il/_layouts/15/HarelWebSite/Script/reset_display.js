define([
    "jquery"
], function ($) {
    try {
        var ret = {
            resetDisplay: function (p, r) {
                if (window.ie8) {
                    var pause = p || 50;
                    setTimeout(function () {
                        $('body').addClass('reset_display');
                        setTimeout(function () {
                            $('body').removeClass('reset_display');
                            if (r && r > 0) {
                                ret.resetDisplay(p, r - 1);
                            }
                        }, pause);
                    }, pause);
                }
            },
        };
        return ret;
    } catch (err) {
        console.log("JS ERROR - reset_display");
        console.log(err);
    }
});
