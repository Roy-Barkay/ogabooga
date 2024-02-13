define([
    "jquery",
    "libs/domReady",
    "is!is_ie8orie9?libs/jquery.html5support",
    "user_agent",
    "resize",
    'libs/dust-core',
    'libs/dust_etxend',
    'libs/dust-helpers',
    "dust_compiled_templates"
], function ($, domReady) {
    try {
        //    console.log("utils start " + (new Date().getTime() - window.start));
        domReady(function () {
            if (window.ie8 || window.ie9) {
                $.placeholder();
            }
        });
        var ret = {
            //        customSelect: function () {
            //
            //        },
            //  customSelectOpen: customSelectOpenPrivate,
            applyCalc: function () {
                if (!window.sharepoint_edit) {
                    // $(' .login_box input[type="password"]').css('width', '');
                    // $('.nav .main_menu_box ul li    .megamenu li').css('width', '');
                    if (window.current_device == 'mobile' || window.current_device == 'tablet_protrait') {
                        var w = $('.content').width();
                        $('.nav li .login_box').css('width', w);
                        $('.nav li .search_box').css('width', w);
                    } else {
                        $('.nav li .login_box').css('width', '');
                        $('.nav li .search_box').css('width', '');
                    }
                    if (window.current_device == 'tablet_protrait') {
                        $('.nav .main_menu_box ul li    .megamenu li').css('width', '50%').css('width', '-=7px');
                    } else if (window.current_device == 'mobile') {
                        $('.nav .main_menu_box ul li    .megamenu li').css('width', '100%');
                    } else {
                        $('.nav .main_menu_box ul li    .megamenu li').css('width', '');
                    }
                    //        if (window.ie) {
                    //            $('.login_submit').css('top', '');
                    //            $('.login_box input[type="password"]').css('width', '');
                    //            $('.login_box input[type="text"]').css('width', '');
                    //            $('.nav li .login_box').css('height', '');
                    //            $('.login_box input[type="password"]').css('margin-right', '');
                    //            if (window.current_device == 'mobile') {
                    //                var w = $('.content').width() - 11;
                    //                $('.login_box input[type="password"]').css('width', w);
                    //                $('.login_box input[type="text"]').css('width', w + "px");
                    //                $('.login_submit').css('top', '48px');
                    //                $('.nav li .login_box').css('height', '96px');
                    //                $('.login_box input[type="password"]').css('margin-right', '0');
                    //
                    //            }
                    //
                    //            if (window.current_device == 'tablet_protrait') {
                    //                var w = $('.content').width() - 22;
                    //                $('.login_boxxml input[type="password"]').css('margin-right', Math.floor(w * 0.01));
                    //                $('.login_box input[type="password"]').css('width', Math.floor(w * 0.54));
                    //
                    //
                    //                $('.login_box input[type="text"]').css('width', Math.floor(w * 0.45));
                    //                $('.passwordfield').css('width', Math.floor(w * 0.54));
                    //            }
                    //        }
                }
            },
            closeSubnav: function () {
                if (window.title_menu_opened) {
                    var pm = $('.page_menu');
                    $('.subnave').animate({
                        "height": "hide",
                        "marginTop": "hide",
                        "marginBottom": "hide",
                        "paddingTop": "hide",
                        "paddingBottom": "hide",
                        "top": pm.height() + parseInt(pm.css('padding-top').replace(/[^-\d\.]/g, '')) + parseInt(pm.css('padding-bottom').replace(/[^-\d\.]/g, '')) - 10
                    }, {
                            duration: 500,
                            complete: function () {
                                window.title_menu_opened = false;
                                $('.subnave').css('visibility', '');
                                $('.down_arrow a').attr("aria-expanded", "false");

                            }
                        });
                    if (window.ie8) {
                        $(".down_arrow").find("img").attr("src", "/_layouts/15/HarelWebSite/1037/img/arrow1.png");
                    } else {
                        setTimeout(function () {
                            $(".down_arrow").find("img").rotate({
                                animateTo: 0
                            });
                        }, 10);
                    }
                }
            },
            Placeholders: function () {
                if (window.ie8 || window.ie9) {
                    $.placeholder();
                }
                //            function placeholderIsSupported() {
                //                var test = document.createElement('input');
                //                return ('placeholder' in test);
                //            }
                //            if (window.ie8) {
                //                return;
                //            }
                //            if (!placeholderIsSupported()) {
                //                $.each($('input[type=text]'), function (i, e) {
                //                    if ($(e).val() === '') {
                //                        $(e).val($(e).attr('placeholder')).addClass('placeholder');
                //                    }
                //                });
                //                $('input[type=text]').focusin(function () {
                //                    var placeholder = $(this).attr('placeholder');
                //                    if ($(this).val() == placeholder) {
                //                        $(this).val('').removeClass('placeholder');
                //                    }
                //                });
                //                $('input[type=text]').focusout(function () {
                //                    var placeholder = $(this).attr('placeholder');
                //                    if ($(this).val() === '') {
                //                        $(this).val(placeholder).addClass('placeholder');
                //                    }
                //                });
                //            }
            },
            //            ellipsis: function (delay) {
            //                if (!window.sharepoint_edit) {
            //                    if (!this._elipsis_elements) {
            //                        this._elipsis_elements = $('.tab_header a,.megamenu >ul li a,.subnave a, .ellipsis,#expansoins.expansoins_lobby .carousel_container .slidediv').not('.agents_tabs  a');
            //                    }
            //                    if (this._elipsis_elements.length > 0) {
            //                        if (delay) {
            //                            var ee = this._elipsis_elements;
            //                            setTimeout(function () {
            //                                ee.ellipsis();
            //                            }, 350);
            //                        } else {
            //                            this._elipsis_elements.ellipsis();
            //                        }
            //                    }
            //                }
            //            },
            androidHeightHack: function () {
                if (window.android_native) {
                    $('<style></style>').appendTo($(document.body)).remove();
                }
            },
            reverse_children: function ($elemnts) {
                $.each($elemnts, function (i, e) {
                    $e = $(e);
                    $e.children().each(function (i, li) {
                        $e.prepend(li);
                    });
                });
            },
            getQueryParameterByName: function (name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            },
            setFocusThickboxIframe: function ($iframe) {
                $iframe.load(function () {
                    $iframe[0].contentWindow.focus();
                });
            },
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
            showIframePopup: function (id, append, isLoading) {
                var $iframe = $('#' + id + " iframe");
                if ($iframe.length == 0) {
                    return;
                }
                var appendVal = append !== undefined ? append : '';
                var src = $iframe.attr("data-src") + appendVal;
                if ($iframe.attr("data-src").indexOf("?") == -1) {
                    src = $iframe.attr("data-src") + "?" + appendVal;
                } else {
                    src = $iframe.attr("data-src") + "&" + appendVal;
                }
                this.setFocusThickboxIframe($iframe);
                $.magnificPopup.open({
                    items: {
                        closeOnBgClick: false,
                        src: '#' + id,
                        type: 'inline',
                        showCloseBtn: false,
                        enableEscapeKey: false
                    }
                }, 0);
                var hide = $iframe.attr("data-hideBeforeLoad");
                var element = $iframe.attr("data-elementToDisplay");
                if (typeof hide !== undefined) {
                    if (hide == 'true') {
                        $iframe.hide();
                    }
                }
                if (typeof element !== undefined) {
                    $("#" + element).show();
                }
                $iframe.attr("src", src);
                if (isLoading) {
                    var height = $iframe.css("height");
                    $iframe.css('display', 'none');
                    if ($iframe.parent().find('.loading').length == 0) {
                        dust.render('popup_spinner', {
                            loading_text: Harel.Config.LoadingText
                        }, function (err, out) {
                            if (err)
                                return;
                            $iframe.parent().append(out);
                            $(".loading").css("height", height);
                        });
                    }
                }
            },
            phoneLinks: function () {
                if (window.current_device == 'mobile' || window.current_device == 'tablet_protrait') {
                    $.each($('.harelstyleStyle-phone'), function (i, el) {
                        var num = $(el).data('num');
                        $(el).attr('href', "tel:" + num).addClass("active_num").addClass("standard_link"); //.html( num);
                    });
                } else {
                    $.each($('.harelstyleStyle-phone'), function (i, el) {
                        $(el).attr('href', "javascript:void(0)").removeClass("active_num").removeClass("standard_link");
                    });
                }
                //
            },
            getUrlParams: function (url) {
                // http://stackoverflow.com/a/23946023/2407309
                if (typeof url == 'undefined') {
                    url = window.location.search;
                }
                var urlParams = {};
                var queryString = url.split('?')[1];
                if (queryString) {
                    var keyValuePairs = queryString.split('&');
                    for (var i = 0; i < keyValuePairs.length; i++) {
                        var keyValuePair = keyValuePairs[i].split('=');
                        var paramName = keyValuePair[0];
                        var paramValue = keyValuePair[1] || '';
                        urlParams[paramName] = decodeURIComponent(paramValue.replace(/\+/g, ' '));
                    }
                }
                return urlParams;
            },
            changeInputType: function (x, type) {
                /* x is the <input/> element, type is the type you want to change it to.*/
                x = $(x);
                if (x.prop('type') == type)
                    return x; //That was easy.
                try {
                    return x.prop('type', type); //Stupid IE security will not allow this
                } catch (e) {
                    if (window.ie8) {
                        if (x.attr("placeholder")) {
                            if (type == "password" && ($.trim(x.val()) == x.attr("placeholder").trim())) {
                                x.val("");
                            }
                        }
                        x.show();
                        x.next().remove();
                    }
                    //Try re-creating the element (yep... this sucks)
                    //jQuery has no html() method for the element, so we have to put into a div first
                    var html = $("<div>").append(x.clone()).html();
                    var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
                    //If no match, we add the type attribute to the end; otherwise, we replace
                    var tmp = $(html.match(regex) === null ?
                        html.replace(">", ' type="' + type + '">') :
                        html.replace(regex, 'type="' + type + '"'));
                    //Copy data from old element
                    tmp.data('type', x.data('type'));
                    var events = x.data('events');
                    var cb = function (events) {
                        return function () {
                            //Bind all prior events
                            for (var i in events) {
                                var y = events[i];
                                for (var j in y)
                                    tmp.bind(i, y[j].handler);
                            }
                        };
                    }(events);
                    var val = x.val();
                    x.replaceWith(tmp);
                    tmp.val(val);
                    setTimeout(cb, 10); //Wait a bit to call function
                    if (window.ie8) {
                        $.placeholder();
                    }
                    return tmp;
                }
            },
            duplicateInputType: function (x, type) {
                //Try re-creating the element (yep... this sucks)
                //jQuery has no html() method for the element, so we have to put into a div first
                var html = $("<div>").append(x.clone()).html();
                var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
                //If no match, we add the type attribute to the end; otherwise, we replace
                var tmp = $(html.match(regex) === null ?
                    html.replace(">", ' type="' + type + '">') :
                    html.replace(regex, 'type="' + type + '"'));
                //Copy data from old element
                tmp.data('type', x.data('type'));
                tmp.addClass('hide')
                var events = x.data('events');
                var cb = function (events) {
                    return function () {
                        //Bind all prior events
                        for (var i in events) {
                            var y = events[i];
                            for (var j in y)
                                tmp.bind(i, y[j].handler);
                        }
                    };
                }(events);
                var val = x.val();
                // x.replaceWith(tmp);
                x.after(tmp);
                tmp.val(val);
                setTimeout(cb, 10); //Wait a bit to call function
                return tmp;
            },
            serIframeSrc: function ($iframe) {
                $iframe.attr("src", $iframe.data("src"));
                ret.setFocusThickboxIframe($iframe);
            },
            PostMsg_Post: function (msgXml) {
                var objIframe = window.parent;
                if (objIframe !== undefined && objIframe !== null) {
                    objIframe.postMessage(msgXml, "*");
                }
            },
            adjustProductsCarouselSibling: function () {
                $.each($('.dynamic_height'), function (i, item) {
                    if ($(item).find(".carousel_box").length > 0) {
                        if (window.current_device == 'mobile') {
                            $(item).next().css("min-height", "").find('.added, #services, .white').css("min-height", "");
                        } else {
                            $(item).next().css('min-height', $(item).outerHeight()).find('.added, #services, .white, #promotion_content').css('min-height', $(item).outerHeight());
                        }
                    }
                });



            },
            //promotionContentStyle: function () {
            //    $.each($('.promotion_dynamic_style'), function (i, item) {
            //        if ($(item).parent().hasClass("fullbox") || $(item).parent().hasClass("box3211") || $(item).parent().children().hasClass("application_container")) {
            //            $(item)[0].children.namedItem('AmbienceIconId').classList.add("AmbienceIcon")
            //            $(item)[0].children[1].classList.add("after_AmbienceIcon")
            //            if ($(item).find(".bottom_promotion_content_link").length > 0) {
            //                var button1 = $(item).find(".bottom_promotion_content_link")[0];
            //                $(button1).attr('class', 'bottom_promotion_content_button');
            //                $(button1).parent().attr('class', 'promotion_div_width_button');


            //            }
            //            if ($(item).find(".promotion_div").length > 0) {
            //                var divwidth = $(item).find(".promotion_div")[0];

            //                $(divwidth).attr('class', 'promotion_div_width');
            //                $(divwidth).parent().attr('class', 'col_butoon');
            //            }


            //        }
            //        else {
            //            $(item)[0].children.namedItem('AmbienceIconId').style.display = "none";
            //            $(item)[0].children[1].classList.remove("after_AmbienceIcon")
            //        }
            //    });


            //},
            extractWebparts: function () {
                if (!window.sharepoint_edit && $(".search_results_page").length === 0) {
                    $(".ms-webpart-zone.ms-fullWidth .box").each(function (i, e) {
                        $(e).parents(".ms-webpart-zone.ms-fullWidth").before($(e));
                    });
                }
            },
            resizeSecond: function () {
                var is_mobile = (window.current_device == 'mobile' || window.current_device == 'tablet_protrait');
                var maxHeight = Math.max.apply(null, $(".iframe_result").map(function () {
                    return $(this).height();
                }).get());
                if (!is_mobile && $('.iframe_result').length > 0) {
                    $('.line1').css({
                        'min-height': maxHeight
                    });
                } else {
                    $('.line1').css({
                        'min-height': 0
                    });
                }
            }
        };
        window.harel_portal_utils = ret;
        return ret;
    } catch (err) {
        console.log("JS ERROR - utils");
        console.log(err);
    }
});
