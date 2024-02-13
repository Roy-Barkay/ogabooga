define(["jquery"], function () {
    jQuery.fn.outerHTML = function (s) {
        return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
    };
    // maintain a to the existing function
    var oldslideUp = $.slideUp;
    // ...before overwriting the jQuery extension point
    $.fn.slideUp1 = function () {
        // original behavior - use function.apply to preserve context
        var ret = $.slideUp.apply(this, arguments);
        // preserve return value (probably the jQuery object...)
        return ret;
    };
});
