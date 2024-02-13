define(["jquery", "user_agent"], function ($) {
    var active = true;
    if (window.ie) {
        active = false;
    }
    try {
        var win_width = 0;
        $(window).resize(function () {
            if (!active) {
                active = true;
                return;
            }
            //Placeholders();
            var size = $(window).width();
            //   console.log(size);
            if (size == win_width) {
                return;
            }
            win_width = size;
            if (this.triggerInterval === true) {
                $(this).trigger('resizeInterval');
                this.triggerInterval = false;
                setTimeout(function () {
                    this.triggerInterval = true;
                }, 50);
            }
            if (this.resizeTO) {
                clearTimeout(this.resizeTO);
            } else {
                $(this).trigger('resizeStart');
            }
            this.resizeTO = setTimeout(function () {
                $(this).trigger('resizeEnd');
                $(this).trigger('resizeInterval');
                try {
                    delete this.resizeTO;
                } catch (e) {
                    this.resizeTO = undefined;
                }
            }, 100);
        });
    } catch (err) {
        console.log("JS ERROR - resize");
        console.log(err);
    }
});
