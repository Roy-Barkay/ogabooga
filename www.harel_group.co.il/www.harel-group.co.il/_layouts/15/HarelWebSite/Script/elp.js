define([
    "jquery",
    "libs/jquery.ellipsis",
], function ($) {
    try {
        var ellipsis = function (delay) {
            if (!window.sharepoint_edit) {
                //  if (!this._elipsis_elements) {
                this._elipsis_elements = $('.subnave a, .ellipsis,#expansoins.expansoins_lobby .carousel_container .slidediv').not('.agents_tabs  a');
                //  }
                if (this._elipsis_elements.length > 0) {
                    if (delay) {
                        var ee = this._elipsis_elements;
                        setTimeout(function () {
                            ee.ellipsis();
                        }, 1);
                    } else {
                        this._elipsis_elements.ellipsis();
                    }
                }
            }
        };
        ellipsis(1);
        return {
            ellipsis: ellipsis
        };
    } catch (err) {
        console.log("JS ERROR - elp");
        console.log(err);
    }
});
