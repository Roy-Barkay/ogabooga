define(["jquery", "utils", "libs/media.match.min", 'libs/enquire.min', 'user_agent'], function ($, utils) {
    try {
        var right_side_col_hide, right_side_search_page, $sidecolpanels, $maincol, $fullcol, $fullcolwide,
            initial_sort = false;

       

        $(document).ready(function () {
            if (!window.sharepoint_edit && $(".search_results_page").length === 0) {
                $(".ms-webpart-zone.ms-fullWidth .box").each(function (i, e) {
                    $(e).parents(".ms-webpart-zone.ms-fullWidth").before($(e));
                });
            }
            utils.extractWebparts();
            $sidecolpanels = $("#side_column > div.box");
            //       .each(function(i,e){
            //           $(e).addClass("side_column_panel").data("side_column_order",i);
            //
            //        })
            $.each($sidecolpanels, function (i, e) {
                if ($(e).hasClass("added")) {
                    $(e).addClass("box1111");
                }
            });
            if ($("#side_column > div.box").not("#left_menu").length === 0) {
                $("#tools_title").remove();
            }
            right_side_search_page = $('.right_side_search_page').length;
            right_side_col_hide = $('.right_side_col_hide').length;
            $maincol = $('#main_column');
            $fullcol = $('#full_column');
            $fullcolwide = $('.full_column_wide');
            // var page = media_order[$(".wrapper").attr('id')];
            $("body").removeClass('mobile');
            $("body").removeClass('not_mobile');
            enquire.register("only screen and (min-width: 1014px)", function () {
                //if (page) reorder(page.desktop);
                $("body").addClass('not_mobile');
                setCurrentDevice("desktop");
                placement();
            });
            enquire.register("only screen and (max-width: 1013px) and (min-width: 766px) ", function () {
                //if (page) reorder(page.tablet_landscape);
                $("body").addClass('not_mobile');
                setCurrentDevice("tablet_landscape");
                placement();
            });
            enquire.register("only screen and (max-width: 765px) and (min-width: 519px)", function () {
                //if (page) reorder(page.tablet_protrait);
                setCurrentDevice("tablet_protrait");
                $("body").addClass('not_mobile');
                placement();
            });
            enquire.register("only screen and (max-width: 518px)", function () {
                // if (page) reorder(page.mobile);
                setCurrentDevice("mobile");
                $("body").addClass('mobile');
                placement();
            });
            //        function reorder(device) {
            //            if (!window.ie8) {
            //                //  $(".panel").appendTo("#hidden_column").removeClass("leftmost");
            //                for (var column in device.order) {
            //                    $.each(device.order[column], append);
            //                }
            //                //                for (var cls in device["class"]) {
            //                //                    $.each(device["class"][cls], addcls);
            //                //                }
            //            }
            //
            //            function append(index, value) {
            //                $("#" + value).appendTo("#" + column);
            //            }
            //
            //            function addcls(index, value) {
            //                $("#" + value).addClass(cls);
            //            }
            //        }
            //        function leftMostUdate{
            //
            //        }

          
            function setCurrentDevice(res) {
                var first_set = false;
                if (!window.current_device) {
                    first_set = true;
                }
                window.current_device = res;
                if (first_set) {
                    $(document).trigger('currentDeviceFirstSet')
                   
                }
            }
            function placement() {
                $(this).trigger('currentDeviceSet');
                if (right_side_col_hide) {
                    return;
                }
                if (right_side_search_page) {
                    if (window.current_device == "desktop" || window.current_device == "tablet_landscape") {
                        $sidecolpanels.appendTo("#side_column");
                    } else {
                        $sidecolpanels.appendTo("#agents_search_title");
                    }
                    return;
                }
                if (window.current_device == "desktop") {
                    $sidecolpanels.appendTo("#side_column");
                } else {
                    $sidecolpanels.appendTo("#main_column");
                }
                $(window).trigger('appendEnd');
                updateBoxMargin();
                if (!initial_sort) {
                    initial_sort = true;
                    $(window).trigger('initialSort');
                }
            }

            function updateBoxMargin() {
                $(".box").removeClass("leftmost").removeClass("rightmost");
                adustBoxMargin($fullcol);
                adustBoxMargin($fullcolwide);
                adustBoxMargin($maincol);
            }

            function adustBoxMargin(column) {
                var colwidth = column.width();
                var accum = 0;
                column.children().each(function (i, e) {
                    $el = $(e);
                    if ($el.css("display") == "none") {
                        return true;
                    }
                    if (accum === 0) {
                        $el.addClass("rightmost");
                    }
                    var p = parseInt($el.css("margin-left").replace("px", ""));
                    if (isNaN(p)) {
                        p = 0;
                    }
                    var elwidth = $el.outerWidth() + p;
                    accum += elwidth;
                    if (accum >= colwidth) {
                        if (accum <= (10 + colwidth)) {
                            $el.addClass("leftmost");
                            accum = 0;
                        } else {
                            accum = elwidth;
                        }
                    }
                });
            }
            placement();
            return {
                updateBoxMargin: updateBoxMargin
            };
        });
    } catch (err) {
        console.log("JS ERROR - framework");
        console.log(err);
    }
});
