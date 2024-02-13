define(["jquery", "utils", "libs/jquery.touchSwipe.min", "libs/jquery.ellipsis", 'libs/magnific-popup'], function ($, utils) {
    try {
        var carousel = function ($container) {
            var is_lobby = $container.hasClass("expansoins_lobby");
            var is_article = $container.hasClass("carousel_article");
            var items_count;
            var item_width;
            var item_margin;
            var current_item = 0;
            var current_window_size = 3;
            var current_window = 0;
            var total_windows = 3;
            var current_viewport_width;
            var block = false;
            var carousel_padding = 27;
            var $items = $container.find(".carousel_container ul li");
            var $list = $container.find(".carousel_container ul");
            var $crsl_left = $container.find('.crsl_left');
            var $crsl_right = $container.find('.crsl_right');
            var $title = $container.find('#MainTitle');
           
            var short = $container.hasClass("short");
            $(window).bind('resizeEnd', function () {
                //$(window).resize(function () {
                carouselArrange();
            });
            carouselInit();

            function carouselInit() {
                $crsl_left.removeClass("disabled");
                $crsl_left.removeAttr("tabindex");
                $crsl_left.removeClass("aria-disabled");
                $crsl_right.attr("aria-disabled", "true");
                if ($title[0] != undefined && $title[0].textContent != ''){
                    $title.attr("role", "heading")
                    $title.attr("aria-level", "2")
                }
                
                items_count = $items.length;
                if (items_count > 0) {
                    item_margin = parseInt($items.css("margin-left").replace(/[^-\d\.]/g, ''));
                    $list.css("width", 502 * items_count + "px");
                }
                carouselArrange();
            }

            function carouselArrange() {
                if (is_article) {
                    // $items.trigger("destroy");
                    $items.css("visibility", "visible");
                    current_viewport_width = $container.width()-carousel_padding;
                    if (current_viewport_width === 733 - carousel_padding) {
                        $items.css("width", (current_viewport_width - 16 ) / 3);
                        current_window_size = 3;
                        if (items_count <= 3) {
                            $crsl_left.addClass("disabled");
                            $crsl_left.attr("tabindex", "-1");
                            $crsl_left.attr("aria-disabled", "true");
                            
                        }
                    } else if (current_viewport_width === 486 - carousel_padding) {
                        $items.css("width", (current_viewport_width - 8 ) / 2);

                        current_window_size = 2;
                        if (items_count <= 2) {
                            $crsl_left.addClass("disabled");
                            $crsl_left.attr("tabindex", "-1");
                            $crsl_left.attr("aria-disabled", "true");
                        }
                    } else if (current_viewport_width > 733 - carousel_padding) {
                        $items.css("width", (current_viewport_width - 24) / 4);
                        current_window_size = 4;
                        if (items_count <= 4) {
                            $crsl_left.addClass("disabled");
                            $crsl_left.attr("tabindex", "-1");
                            $crsl_left.attr("aria-disabled", "true");
                        }
                    } else {
                        $items.css("width", current_viewport_width);
                        current_window_size = 1;
                        if (items_count <= 1) {
                            $crsl_left.addClass("disabled");
                            $crsl_left.attr("tabindex", "-1");
                            $crsl_left.attr("aria-disabled", "true");
                        }
                    }
                }
                else {
                    // $items.trigger("destroy");
                    $items.css("visibility", "visible");
                    current_viewport_width = $container.width() - carousel_padding;
                    if (current_viewport_width === 733 - carousel_padding) {
                        $items.css("width", "230px");
                        current_window_size = 3;
                        if (items_count <= 3) {
                            $crsl_left.addClass("disabled");
                            $crsl_left.attr("tabindex", "-1");
                            $crsl_left.attr("aria-disabled", "true");
                        }
                    } else if (current_viewport_width > 485 - carousel_padding) {
                        $items.css("width", (current_viewport_width - 8) / 2);
                        current_window_size = 2;
                        if (items_count <= 2) {
                            $crsl_left.addClass("disabled");
                            $crsl_left.attr("tabindex", "-1");
                            $crsl_left.attr("aria-disabled", "true");
                        }
                    } else {
                        $items.css("width", current_viewport_width);
                        current_window_size = 1;
                        if (items_count <= 1) {
                            $crsl_left.addClass("disabled");
                            $crsl_left.attr("tabindex", "-1");
                            $crsl_left.attr("aria-disabled", "true");
                        }
                    }
                }
                if ($crsl_left.hasClass('disabled') && $crsl_right.hasClass('disabled')) {
                    $crsl_left.css('display', 'none');
                    $crsl_right.css('display', 'none');
                }
                total_windows = Math.ceil(items_count / current_window_size);
                item_width = parseInt($items.width());
                current_window = Math.floor(current_item / current_window_size);
                var offset = -current_window * (current_viewport_width + item_margin);
                $list.css("right", offset + "px");
                current_item = current_window * current_window_size;
                isVisible();
            }
            $crsl_left.click(function () {
                if (block) {
                    return;
                }
                block = true;
                if (current_window == (total_windows - 1)) {
                    block = false;
                    return;
                }
                $items.css("visibility", "visible");
                $list.animate({
                    right: "-=" + (current_viewport_width + item_margin)
                }, 500, function () {
                    current_window++;
                    current_item += current_window_size;
                    if (current_window == (total_windows - 1)) {
                        $crsl_left.addClass("disabled");
                        $crsl_left.attr("tabindex", "-1");
                        $crsl_left.attr("aria-disabled", "true");
                    }
                    $crsl_right.removeClass("disabled");
                    $crsl_right.removeAttr("tabindex");
                    $crsl_right.removeAttr("aria-disabled");
                    block = false;
                    isVisible();
                });
                return;
            });
            $crsl_right.click(function () {
                if (block) {
                    return;
                }
                block = true;
                if (current_window === 0) {
                    block = false;
                    return;
                }
                $items.css("visibility", "visible");
                $list.animate({
                    right: "+=" + (current_viewport_width + item_margin)
                }, 500, function () {
                    current_window--;
                    current_item -= current_window_size;
                    $crsl_left.removeClass("disabled");
                    $crsl_left.removeAttr("tabindex");
                    $crsl_left.removeAttr("aria-disabled");
                    if (current_window === 0) {
                        $crsl_right.addClass("disabled");
                        $crsl_right.attr("tabindex", "-1");
                        $crsl_right.attr("aria-disabled", "true");
                    }
                    block = false;
                    isVisible();
                });
                return;
            });

            function isVisible() {
                $items.show();
                if (short) {
                    $items.find('p').ellipsis({
                        row: 7
                    });
                }
                //  setTimeout(function () {
                // visibility: visible
                //$items.trigger("destroy");
                // $items.dotdotdot();
                $container.find("ul li").css("visibility", "visible");
                var $titles = $items.find('.title, .ttl'),
                    max_height = 0;
                //if($titles.length == 0)
                //    $titles = $items.find('.title');
                $titles.css('height', "");
                $.each($titles, function (i, title) {
                    if (max_height < $(title).innerHeight())
                        max_height = $(title).innerHeight();
                });
                $.each($titles, function (i, title) {
                    $(title).css('height', max_height);
                });
                $items.css("height", "");
                var maxH = 0;
                $items.each(function (i, e) {
                    if (i < current_item || i >= current_item + current_window_size) {
                        $(e).css("visibility", "hidden");
                    } else {}
                    if ($(e).height() > maxH) {
                        maxH = $(e).outerHeight();
                    }
                });
                $items.css("height", maxH);
                $items.find('.popup_banks').magnificPopup({
                    items: {
                        closeOnBgClick: false,
                        src: '#banks-popup',
                        type: 'inline',
                        showCloseBtn: false
                    },
                    callbacks: {
                        open: function () {
                            $("#banks_check").prop('checked', false);
                            $(".banks_list a").each(function (i, e) {
                                $(e).attr("href","#");
                            });
                        },
                        close: function () {
                            $("#banks_check").prop('checked', false);
                            $(".banks_list a").each(function (i, e) {
                                $(e).attr("href","#");
                            });
                        }
                    }
                    // e.t.c.
                });
                //                adjustOrganizationsLobby();
                //                // }, 300);
                //                  function adjustOrganizationsLobby() {
                utils.adjustProductsCarouselSibling();
                //                }
            }
            $container.find(".carousel_container").swipe({
                swipeLeft: function (event, direction, distance, duration, fingerCount) {
                    if (direction == 'left') {
                        $crsl_right.click();
                    }
                },
                swipeRight: function (event, direction, distance, duration, fingerCount) {
                    if (direction == 'right') {
                        $crsl_left.click();
                    }
                },
                threshold: 35,
                allowPageScroll: "vertical",
                excludedElements: "button, input, select, textarea, .noSwipe"

            });
            //$list.slidemove();
        };
        $(".carousel_box").each(function (i, e) {
            var c = $(e);
            if (c.find(".carousel_container li").length > 0) {
                carousel(c);
            }
        });
        return {
            carousel: carousel
        };
    } catch (err) {
        console.log("JS ERROR - carousel");
        console.log(err);
    }
});
