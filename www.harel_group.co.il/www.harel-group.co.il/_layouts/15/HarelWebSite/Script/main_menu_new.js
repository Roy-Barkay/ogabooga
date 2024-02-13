define(["reset_display", "jquery", "utils", "libs/magnific-popup", "framework", "resize", 'user_agent'], function (reset_display, $, utils) {
    try {
        var $body = $('body');
        var $header = $('#header');
        var $search_input = $('#header .autocomplete_input');
        var $search_button = $('.nav_new .search_button');
        var $menu_button = $('.nav_new .menu_button');
        var $user_button = $('.nav_new .user_button');
        var $menu_panel = $('.nav_new .menu_panel');
        var $search_panel = $('.nav_new .search_panel');
        var $panels = $('.nav_new .search_panel, .nav_new .menu_panel');
        var $panels_wrappers = $('.nav_new .panel_wrapper');
        var $panels_inners = $('.nav_new .panel_inner');
        var $user_menu_all = $(".nav_new .user_menu");
        var $user_menu = $(".nav_new .user_menu_hrl");
        var $user_menu_list = $user_menu.find(".user_content");
        var $user_menu_fav = $(".nav_new  .user_menu_fav");
        var $mmb_li = $menu_panel.find("li.submenu");
        var $mm_continers = $('.megamenu_wrapper');
        var $wrapper = $('.all_wrapper');
        var $mm_continers_count = $mm_continers.length;
        var last_body_size = $body.width();
        var mm_open = false;
        var mb_open = false;
        var ub_open = false;
        var panel_open = false;
        var is_fluid = false;
        var is_desktop = false;
        var is_employer = $('.nav_new').hasClass('employer_nav');
        var prev_device_is_dektop = "";
        var speed_constant = 250;
        var $content = $('.all_wrapper_inner > .wrapper');
        
         function SetCurrent() {
            var arr = $(".menu_panel_inner > ul > li");
            var currentUrl = $(location).attr('href').toLowerCase();
            $.each(arr,
                function (index, value) {
                    var elm = $(value);
                    var current = false;
                    $.each(elm.find("a"), function (index, value) {
                        if (value.id === "hyperlinkLinkContent")
                            return true; //skip this link
                        var hrefVal = value.href.toLowerCase();
                        current = current || hrefVal !== '' && currentUrl.indexOf(hrefVal) > -1;
                        return !current;
                    });
                    if (current) {
                        elm.addClass("current");
                        return false;
                    }
                }
            );
        }

        $(document).ready(function () {
            SetCurrent();
            //     var orig_wrapper_height = function(){ return $wrapper.height()};
            if (window.current_device == 'desktop') {
                is_desktop = true;
            }
            if ($header.hasClass('search_open')) {
                $search_button.addClass('active');
                if (window.current_device != 'desktop') {
                    panel_open = true;
                    $search_button.addClass('alreadyActive')
                    $wrapper.find(".wrapper.top_wrapper").css('margin-top', '41px');
                }
            }
            $(window).bind('resizeInterval', function () {
                bodysize = $body.width();
                if (last_body_size == bodysize) {
                    return;
                }
                last_body_size = bodysize;
                if (window.current_device == 'desktop') {
                    is_desktop = true;
                } else {
                    is_desktop = false;
                }
                if (prev_device_is_dektop && is_desktop) {
                    return;
                }
                if (!prev_device_is_dektop && !is_desktop) {
                    return;
                }
                if (prev_device_is_dektop && !is_desktop) {
                    if ($search_button.hasClass("active")) {
                        $search_button.removeClass("active");
                        $menu_panel.css("right", "");
                    }
                    prev_device_is_dektop = is_desktop;
                    closePanels(function () {
                        // if (callback) callback();
                    }, true);
                    return;
                }
                if (!prev_device_is_dektop && is_desktop) {
                    prev_device_is_dektop = is_desktop;
                    // if($search_button.hasClass("active")){
                    $menu_button.removeClass("active");
                    $search_button.removeClass("active");
                    $(".search_panel_wrap,.search_panel_inner,.menu_panel_wrap,.menu_panel_inner").removeAttr("style");
                    //}
                    return;
                }
            });
            $(window).bind('resizeEnd', function () {
                $("li.submenu.open .megamenu_wrapper").height($("li.submenu.open .megamenu").height());
            });
            $search_button.click(function () {
                showSearch();
            });
            $menu_button.click(function () {
                showMenu();
            });
            $user_button.click(function () {
                if (is_employer) {
                    Harel.Login.Login();
                } else {
                    if ($user_button.hasClass("active")) {
                        closeUserBox(null);
                    } else {
                        if ($search_button.hasClass('active')) {
                            showSearch();
                            openUserBox(false, function () {
                                reset_display.resetDisplay(100, 10);
                            });
                        } else {
                            openUserBox(false, function () {
                                reset_display.resetDisplay(100, 10);
                            });
                        }
                    }
                }
            });
            $(".fav-link").click(function () {
                openUserBox(true);
            });
            $(".close_favorites").click(function () {
                closeUserBox();
            });
            var set_wrapper_height = function (type) {};
            $mmb_li.click(function (e) {
                var self = $(this);
                var target = $(e.target);
                var mm_continer = self.find('.megamenu_wrapper');
                var mm = self.find('.megamenu');
                var active = self.hasClass("open");
                var panel = $(".menu_panel_inner");
                closeUserBox(function () {
                    closeContainers(function () {
                        if (active) {
                            mm.css("visibility", "hidden");
                            self.removeClass("open");
                        } else {
                            mm.css("visibility", "visible");
                            //                        if (is_fluid) {
                            //                            mm.show();
                            //                            if (current_device == 'tablet_protrait') {
                            //                                $mmli.css('width', '50%').css('width', '-=8px');
                            //                            } else if (current_device == 'mobile') {
                            //                                $mmli.css('width', '100%');
                            //                            } else {
                            //                                $mmli.css('width', '');
                            //                            }
                            //                        }
                            $content.stop();
                            var height = mm.height() + panel.height() + $header.offset().top + $header.height();
                            var diff = Math.max(0, height - $content.height() - $content.offset().top);
                            $content.animate({
                                'margin-bottom': diff + "px"
                            }, speed_constant);
                            if (!window.IsEditor) {
                                $('html, body').animate({
                                    scrollTop: self.offset().top
                                }, 500);
                            }
                            mm_continer.delay(100).animate({
                                height: mm.height()
                            }, speed_constant, function () {
                                mm_open = true;
                                self.addClass("open");
                            });
                        }
                    });
                });
            });
            $body.on('click', function (e) {
                var $self = $(e.target);
                if ($(".search_open").length > 0 && $(".search_button.active").length > 0) {
                    return;
                }
                if ($self.parents('#header').length === 0 && ($user_button.hasClass('active') || $menu_button.hasClass('active') || $search_button.hasClass('active') || $menu_panel.find("li.submenu.open").length > 0)) {
                    closePanels(function () {
                        closeUserBox(function () {});
                    });
                }
            });
            $search_input.on('focus', function () {
                if ($user_menu_fav.hasClass('visible')) {
                    closeUserBox(function () {});
                }
            });
            $(document).on('focus', '.secondary_nav li:first', function () {
                console.log('----');
                closePanels(function () {
                    closeUserBox(function () {});
                });
            });
        });

       
        function showSearch(callback) {
            if (window.current_device == 'desktop') {
                if ($search_button.hasClass("active")) {
                    $search_button.removeClass("active");
                    $menu_panel.css({
                        visibility: 'visible'
                    });
                    $menu_panel.delay(100).animate({
                        right: 8
                    }, speed_constant, function () {
                        $search_panel.css({
                            visibility: 'hidden'
                        });
                        $menu_button.css({
                            visibility: 'visible'
                        });
                        $search_button.css({
                            visibility: 'visible'
                        });
                        reset_display.resetDisplay(100, 10);
                        if (callback)
                            callback();
                    });
                } else {
                    closeContainers(function () {
                        closeUserBox(function () {
                            //   closeMenuboxes(function () {
                        });
                        $search_button.addClass("active");
                        $search_panel.css({
                            visibility: 'visible'
                        });
                        $menu_panel.animate({
                            right: -$menu_panel.width()
                        }, speed_constant, function () {
                            $search_button.css({
                                visibility: 'hidden'
                            });
                            $menu_button.css({
                                visibility: 'visible'
                            }).focus();
                            $menu_panel.css({
                                visibility: 'hidden'
                            });
                            $search_input.focus();
                            if (callback)
                                callback();
                        });
                    });
                }
            } else {
                if ($search_button.hasClass("active")) {
                    if ($search_button.hasClass('alreadyActive')) {
                        $wrapper.find(".wrapper.top_wrapper").css('margin-top', '0px');
                    }
                    closePanels(function () {
                        if (callback)
                            callback();
                    });
                } else {
                    if ($search_button.hasClass('alreadyActive')) {
                          $wrapper.find(".wrapper.top_wrapper").css('margin-top', '41px');
                    }
                    showPanel($search_panel, $search_button);
                    if (callback)
                        callback();
                }
            }
        }

        function removeOpenSearch() {
            //  $(".search_open").removeClass("search_open");
        }

        function showMenu() {
            if (window.current_device == 'desktop') {
                $search_button.addClass('not_first_open');
                $menu_panel.css({
                    visibility: 'visible'
                }).animate({
                    right: 8
                }, speed_constant, function () {
                    $search_button.removeClass("active").css({
                        visibility: 'visible'
                    }).focus();
                    $search_panel.css({
                        visibility: 'hidden'
                    });
                    $menu_button.css({
                        visibility: 'hidden'
                    });
                    removeOpenSearch();
                });
            } else {
                if ($menu_button.hasClass("active")) {
                    closePanels();
                } else {
                    showPanel($menu_panel, $menu_button);
                }
            }
        }

        function showPanel(self, button) {
            var extra = 0;
            var $continer = self.find(".panel_wrapper");
            var $box = self.find(".panel_inner");
            //   var active = self.hasClass("active");
            //            if (window.current_device == "tablet_landscape" && user_mode) {
            //                extra=10;
            //            }
            //            if ($box.hasClass('input_box')) {
            //                extra = 10;
            //            }
            closeUserBox(function () {
                closePanels(function () {
                    removeOpenSearch();
                    //  if (active) {} else {
                    $box.css("visibility", "visible");
                    var wrapper_height = $wrapper.height();
                    var panel_height = $box.height() + 50;
                    var diff = panel_height - $content.height() - $content.offset().top;
                    if (diff > 0)
                        $content.stop().animate({
                            'margin-bottom': diff + 'px'
                        }, speed_constant);
                    //    self.addClass("active");
                    button.addClass("active");
                    $continer.animate({
                        height: $box.height() //+ extra
                    }, speed_constant, function () {
                        $(".menu_panel_inner").css({
                            top: 0,
                            bottom: 'auto'
                        });
                        $continer.css('overflow', 'visible');
                        panel_open = true;
                        // mb_open = true;
                        //                            if (window.android_native) {
                        //                                if ($continer.parent().hasClass("login")) {
                        //                                    $('.main_menu .menu_box_continer').hide();
                        //                                    setTimeout(function () {
                        //                                        $('.main_menu .menu_box_continer').show();
                        //                                    }, 1000);
                        //                                }
                        //                                utils.resetDisplay(10, 100);
                        //                            }
                    });
                    //  }
                });
            });
        }

        function closePanels(callback, no_animation) {
            var speed = no_animation ? 0 : speed_constant;
            closeContainers(function () {
                if (!panel_open) {
                    callback();
                } else {
                    $(".menu_panel_inner").css({
                        top: 'auto',
                        bottom: 0
                    });
                    $content.stop().animate({
                        'margin-bottom': 0
                    }, speed);
                    $panels_wrappers.animate({
                        height: 0
                    }, speed, function () {
                        $panels_wrappers.css('overflow', 'hidden');
                        $menu_button.removeClass("active");
                        $search_button.removeClass("active");
                        panel_open = false;
                        $panels_inners.css("visibility", "hidden");
                        if (callback)
                            callback();
                    });
                    //            var speed = speed_constant; //$('#navslide >  li.active .menu_box_continer').height()/speed_factor;
                    //            if (!mb_open) {
                    //                speed = 1;
                    //            }
                    //            var i = 0;
                    //            $mmb.css({
                    //                top: 'auto',
                    //                bottom: 0
                    //            });
                    //            //console.log(speed);
                    //            $mb_continers.animate({
                    //                height: 0
                    //            }, speed, function () {
                    //                i++;
                    //                if (i == $mb_continers_count) {
                    //                    mb_open = false;
                    //                    if (is_fluid) {
                    //                        $top_li.removeClass("active");
                    //                    }
                    //                    $(".menu_box").css("visibility", "hidden");
                    //                    if (ub_open) {
                    //                        closeUserBox(function () {
                    //                            callback();
                    //                        });
                    //                    } else {
                    //                        callback();
                    //                    }
                    //                }
                    //            });
                }
            }, no_animation);
        }

        function openUserBoxInner(open_fav, callback) {
            var extraheight = 100;
            if ($('.home_carousel').length > 0) {
                extraheight = extraheight + $('.home_carousel').height();
            }
            if (open_fav) {
                $(window).trigger('open_userbox');
                closeUserBox(function () {
                    ub_open = true;
                    $user_menu_fav.addClass("visible");
                    var height = $user_menu_fav.find(".user_content").height() + extraheight;
                    var diff = height - $content.height() - $content.offset().top;
                    if (diff > 0)
                        $content.stop().animate({
                            'margin-bottom': diff + 'px'
                        }, speed_constant);
                    $user_menu_fav.stop(true, false).animate({
                        height: $user_menu_fav.find(".user_content").height()
                    }, speed_constant, function () {
                        $user_button.addClass("active");
                        $('#favorites_tabs li:first').focus();
                        if (callback)
                            callback();
                    });
                });
            } else {
                ub_open = true;
                $user_menu.addClass("visible");
                var height = $user_menu_list.height() + extraheight;
                var diff = height - $content.height() - $content.offset().top;
                if (diff > 0)
                    $content.stop().animate({
                        'margin-bottom': diff + 'px'
                    }, speed_constant, function () {});
                $user_menu.stop(true, false).animate({
                    height: $user_menu_list.height()
                }, speed_constant, function () {
                    $user_button.addClass("active");
                    if (callback)
                        callback();
                });
            }
            if (window.ie8 || window.ie9) {
                $('#identification').trigger("blur");
                $('#mobile_number').trigger("blur");
            }
        }

        function closeUserBox(callback) {
            ret.closeUserBox(callback);
        }

        function closeContainers(callback, no_animation) {
            var speed = no_animation ? 0 : speed_constant; //$('.main_menu_box > ul> li.active .megamenu_continer').height()/speed_factor;
            if (!mm_open) {
                speed = 1;
            } else {
                //                $("html, body").animate({
                //                    scrollTop: 0
                //                }, "slow");
            }
            var i = 0;
            var first = true;
            //  console.log(speed);
            if ($mm_continers_count === 0) {
                if (callback)
                    callback();
            } else {
                $mm_continers.delay(100).animate({
                    height: 0
                }, {
                    duration: speed,
                    complete: function () {
                        i++;
                        if (i == $mm_continers_count) {
                            $mmb_li.removeClass("open");
                            if (!mm_open) {
                                $content.stop().animate({
                                    'margin-bottom': 0
                                }, speed);
                            }
                            mm_open = false;
                            if (callback)
                                callback();
                        }
                    },
                    start: function () {
                        if (mm_open && first) {
                            first = false;
                            var $menu_panel_inner = $('.menu_panel_inner');
                            var $submenu = $('.menu_panel_inner >ul>li').not('.open');
                            var height = 0;
                            if (window.current_device != 'desktop') {
                                height = $menu_panel_inner.offset().top + $submenu.outerHeight() * ($submenu.length + 1) + 50;
                            }
                            var diff = Math.max(0, height - $content.height() - $content.offset().top);
                            $content.stop().animate({
                                'margin-bottom': diff + 'px'
                            }, speed);
                        }
                    },
                    fail: function () {
                        console.log('failed');
                    }
                });
            }
        }

        function openUserBox(open_fav, callback) {
            if (window.current_device != 'desktop') {
                closePanels(function () {
                    removeOpenSearch();
                    openUserBoxInner(open_fav, callback);
                });
                //                $nav.animate({
                //                    height: 50
                //                }, 500);
                //                $top_li.removeClass("active");
            } else {
                closeContainers(function () {
                    removeOpenSearch();
                    openUserBoxInner(open_fav, callback);
                });
            }
        }
        var ret = {
            closeUserBox: function (callback) {
                if (!ub_open) {
                    if (callback)
                        callback();
                    return;
                }
                ub_open = false;
                $user_menu_all.stop(true, false).animate({
                    height: 0
                }, speed_constant).promise().done(function () {
                    $user_menu_all.removeClass("visible");
                    $user_button.removeClass("active");
                    var height = $user_menu_all.height() + 50;
                    var diff = height - $content.height() - $content.offset().top;
                    var margin = diff > 0 ? diff : 0;
                    $content.stop().animate({
                        'margin-bottom': margin + 'px'
                    }, speed_constant).promise().done(function () {
                        var $inputs = $user_menu_all.find('.login_form input:not([type=button])');
                        $inputs.unbind("keyup").val("");
                        if ($user_menu_all.find('.login_form input.error').length > 0) {
                            $inputs.removeClass('error');
                            $inputs.next('.error').remove();
                        }
                    });
                    if (callback)
                        callback();
                });
            },
            openUserBox: function (callback) {
                openUserBox(false, function () {
                    reset_display.resetDisplay(100, 10);
                    $("#identification").focus();
                });
            },
            showSearch: showSearch
        };
        return ret;
    } catch (err) {
        console.log("JS ERROR - main_menu_new");
        console.log(err);
    }
});
