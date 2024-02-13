define(["jquery", "libs/jquery.touchSwipe.min", "jquery.ext", "resize"], function ($) {
    try {
        $(document).ready(function () {
            //   return;
            var nav_menu_items = [];
            var nav_menu_more = {};
            var nav_menu_selected = {};
            var nav_menu_total_width = 0;
            var nav_menu_initiated = false;
            var $secondary_nav = $(".secondary_nav");
            var $secondary_nav_ul = $(".secondary_nav >ul");
            var $more_list = $(".slidenav ul");
            var $secondary_a = $(".slidenav a");

            var licount = 0;
            $(window).bind('resizeStart', function () {
                $secondary_nav.css("overflow", "hidden");
            });
            $(window).bind('resizeEnd', function () {
                //$(window).resize(function () {
                navMenuArrange();
                $secondary_nav.css("overflow", "visible");
            });
            setTimeout(navMenuInit, 30);

            function navMenuInit() {
                $(".secondary_nav >ul>li").each(function (i, e) {
                    licount++;
                    var item = $(e);
                    var width = item.width() + parseInt(item.css('padding-left').replace(/[^-\d\.]/g, '')) + parseInt(item.css('padding-right').replace(/[^-\d\.]/g, ''));
                    var html = item.outerHTML();
                    if (item.hasClass('slidenav')) {
                        nav_menu_more = {
                            html: html,
                            width: width
                        };
                    } else {
                        var selected = false;
                        if (item.hasClass('active')) {
                            item[0].firstElementChild.setAttribute('aria-current', 'page')
                            selected = true;
                            nav_menu_selected = {
                                html: html,
                                width: width
                            };
                        }
                        nav_menu_items.push({
                            html: html,
                            width: width,
                            selected: selected
                        });
                        nav_menu_total_width += width + 1;
                    }
                });
                // nav_menu_items.reverse();
                nav_menu_initiated = true;
                $(".secondary_nav > ul").css("position", "static");
                navMenuArrange();
            }

            function navMenuArrange() {
                if (!nav_menu_initiated) {
                    return;
                }
                if (licount === 0) {
                    return;
                }
                var list = $secondary_nav_ul;
                var menu_width = $secondary_nav.width() - 33; // - list.css('margin-right').replace(/[^-\d\.]/g, '') - list.css('margin-right').replace(/[^-\d\.]/g, '');
                //clear list
                list.html("").removeClass("more");
                //check if all elements fit
                if (nav_menu_total_width <= menu_width) {
                    //if they fit simply place them all in
                    $.each(nav_menu_items, function (i, e) {
                        // list.prepend($(e.html));
                        list.append($(e.html));
                    });
                } else {
                    list.addClass("more");
                    //if they dont fit place see how many fit starign with more, then selected then according to list
                    var accumulated = nav_menu_more.width + (nav_menu_selected.width || 0);
                    var ind = -1;
                    var selected_visible = false;
                    while (accumulated < menu_width) {
                        ind++;
                        if (nav_menu_items.length > 0 && nav_menu_items[ind].selected) {
                            selected_visible = true;
                            continue;
                        }
                        accumulated += nav_menu_items[ind].width;
                    }
                    if (ind > -1) {
                        ind--;
                    }
                    // if (selected_visible){
                    var i;
                    for (i = 0; i <= ind; i++) {
                        list.append($(nav_menu_items[i].html));
                    }
                    if (!selected_visible) {
                        list.append($(nav_menu_selected.html));
                    }
                    list.append($(nav_menu_more.html));
                    $(".slidenav ul").html("");
                    for (i = ind + 1; i < nav_menu_items.length; i++) {
                        if (!nav_menu_items[i].selected) {
                            $(".slidenav ul").append($(nav_menu_items[i].html));
                        }
                    }
                    $(".secondary_nav > ul >li").removeClass("first");
                    $(".secondary_nav > ul >li:first-child").addClass("first");
                    //}else{
                    // }
                }
                $secondary_nav_ul.css({
                    display: 'table'
                });
                // max-width: calc(100% - 80px);
                if (window.ie9) {
                    $(".secondary_nav > ul.more > li").css("max-width", ($(".secondary_nav >ul").width() - 80) + "px");
                }
                if (window.android_samsung5) {
                    $(".secondary_nav > ul.more > li a").each(function (i, e) {
                        var $e = $(e);
                        if ($e.width() >= 159) {
                            $e.css("text-overflow", "ellipsis");
                        } else {
                            $e.css("text-overflow");
                        }
                    });
                }
                $("ul > li.active a")[0].setAttribute('aria-current', 'page')
                //    $(".secondary_nav >ul>li > a").css("line-height", ($(".secondary_nav >ul>li > a").outerHeight() - 5) + "px")
                // $(".secondary_nav >ul>li > a").ellipsis();
            }
            // $(".slidenav > a").live("click", function (e) {
            // $('.slidenav > a').on('click', function (e) {
            $(document).on("click", ".slidenav", null, function (e) {
                var $wrapper = $('.wrapper');
                var diff = $(".slidenav ul").height() + $(".slidenav").offset().top + $(".slidenav").height() + 5 - $wrapper.height() - $wrapper.offset().top;
                if (diff > 0 && $(".slidenav ul").css('display') != "block") {
                    if (window.ie8) {
                        $wrapper.css({
                            'margin-bottom': diff + 'px'
                        });
                    } else {
                        $wrapper.animate({
                            'margin-bottom': diff + 'px'
                        }, 500);
                    }
                } else {
                    if (window.ie8) {
                        $('.wrapper').css({
                            "margin-bottom": 0
                        });
                    } else {
                        $('.wrapper').animate({
                            'margin-bottom': 0
                        }, 500);
                    }
                }
                
                $(".slidenav ul").slideToggle(500);
                if ($(".slidenav a").attr("aria-expanded") == "true")
                {
                    $(".slidenav a").attr("aria-expanded", "false");

                }
                else
                {
                    $(".slidenav a").attr("aria-expanded", "true");
                }
                $(this).toggleClass('slidenavArrow');
            });
            //        $(document).on("click", ".secondary_nav > ul > li ", null, function (e) {
            //            var active_str = 'class="active"';
            //            var self = $(e.target).parent();
            //            if (self.hasClass('active') || self.hasClass('slidenav')) {
            //                return;
            //            } else {
            //                $.each(nav_menu_items, function (i, el) {
            //                    el.html = el.html.replace(' class="active"', '');
            //                    if (window.ie8) {
            //                        el.html = el.html.replace(' class=active', '');
            //                    }
            //                    el.selected = false;
            //                    // if (el.html.indexOf(self.html()) != -1 ) {
            //                    if ($(el.html).text().trim() == $(self.html()).text().trim()) {
            //                        el.html = el.html.replace('<li>', '<li class="active">');
            //                        if (window.ie8) {
            //                            el.html = el.html.replace('<LI>', '<LI class="active">');
            //                        }
            //                        el.selected = true;
            //                        nav_menu_selected = el;
            //                    }
            //                });
            //                navMenuArrange();
            //                // nav_menu_selected
            //            }
            //        });
            $('body').click(function (e) {
                if ($(e.target).hasClass("slidenav")) {
                    return;
                }
                if ($(e.target).parents('.slidenav').length === 0) {
                    if (window.ie8) {
                        $('.slidenav ul').hide();
                    } else {
                        $('.slidenav ul').slideUp(300);
                    }
                    $('.slidenav').removeClass('slidenavArrow');
                }
            });
        });
    } catch (err) {
        console.log("JS ERROR - nav_menu");
        console.log(err);
    }
});
