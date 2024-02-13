init_iframe = function (obj) {
    setTimeout(function () {
        if (obj.document.getElementsByTagName("input").length === 0) {
            if (typeof obj.document.getElementsByTagName("form")[0] != 'undefined') {
                obj.document.getElementsByTagName("form")[0].focus();
            }
            
            return;
        } else {
            obj.document.getElementsByTagName("input")[0].focus();
        }
    }, 1000);
};
//var base_url = local_base_url ? local_base_url : '/_layouts/15/HarelWebSite/Script';
requirejs.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    //   urlArgs: "version=0.0.86",
    waitSeconds: 0,
    // baseUrl: base_url,
    baseUrl: harel_portal_base_url,
    map: {
        '*': {
            'is': 'is'
        }
    },
    paths: {
        "jquery": "rjquery"
    },
    shim: {
        'libs/jquery.mousewheel': ['jquery'],
        'libs/jquery.validate': ['jquery'],
        'libs/jQueryRotateCompressed': ['jquery'],
        'libs/jquery.browser': ['jquery'],
        //      'libs/jquery.color': ['jquery'],
        'libs/jquery.ellipsis': ['jquery'],
        'libs/jquery.html5support': ['jquery'],
        'libs/jquery.touchSwipe.min': ['jquery'],
        'libs/enquire.min': ['libs/media.match.min'],
        'libs/jQuery.dPassword': ['jquery'],
        'libs/jquery.placeholder': ['jquery'],
        'libs/magnific-popup': ['jquery'],
        'libs/jcarousel': ['jquery'],
        'libs/picker': ['jquery'],
        'libs/picker.legacy': ['jquery', 'libs/picker'],
        'libs/picker.date': ['jquery', 'libs/picker'],
        'libs/bootstrap': ['jquery'],
        'internal/harel_common': ['jquery', 'Editor/Editor', 'autocomplete_clients', 'framework'],
        'libs/dust-helpers': ['libs/dust-core'],
        'libs/dust_etxend': ['libs/dust-core'],
        'dust_compiled_templates': ['libs/dust-core', 'libs/dust_etxend', 'libs/dust-helpers'],
        'libs/intellisys': ['jquery'],
        'libs/jquery.address-1.5': ['libs/jquery.browser', 'jquery'],
        'libs/jquery.easing.min': ['jquery'],
        'libs/supersized.3.2.7': ['jquery', 'libs/jquery.easing.min'],
        'ajax_app': ['internal/harel_common'],
        //'react.development': ['jquery'],
        //'react-dom.development': ['jquery']

    }
});
requirejs.onError = function (err) {
    console.log(err);
};
require([
    "jquery",
    "utils",
    "main_common",
    'autocomplete_clients',
    "validation",
    'ajax_app',
    "footer",
    "is!is_youtube?fluid-youtube:",
    'is!is_form?validation',
    'libs/magnific-popup',
    "is!is_form?contact_form",
    'is!is_picker?datepicker',
    //  'libs/bootstrap',
    'is!is_not_sharepointedit?popover:',
    'info_panel',
    "is!is_home?home_carousel:",
    "is!is_video?libs/video",
    // "dictionary",
    'autocomplete_collective',
    'collective',
    'is!is_home?libs/jquery.easing.min:',
    'tag_manager',
    "validation_login",
    "annex_form",
    //"react",
    //"react.development",
    //"react-dom.development"

], function ($, utils, common, autocomplete, validation) {
    $(document).ready(function () {
        var prev_term = 0,
                page_title = document.title,
                page_description = document.getElementsByName('description')[0] ? document.getElementsByName('description')[0].getAttribute('content') : "";

        $('.open-mail').click(function(e) {
            return SetIframeSrc();
        });

        $('ul.share-open li a,.share_icon >a').click(function (e) {
            //   e.stopPropagation();
            var $share = $(".share-open");
            $share.slideToggle();
            var $wrapper = $('.wrapper');
            if ($share.css('display') == 'block') {
                var offset = 268 + $share.offset().top - $wrapper.offset().top - $wrapper.height() + 20;
                if (offset > 0)
                    $wrapper.animate({
                        'margin-bottom': offset
                    }, 500);
            } else {
                if (!window.title_menu_opened) {
                    $wrapper.animate({
                        'margin-bottom': 0
                    }, 500);
                }
            }
        });
        var adjust_title_heights = function () {
            var $titles = $('.marketing_programs .ttl'),
                    max_height = 0;
            $titles.css('height', "");
            $.each($titles, function (i, title) {
                if (max_height < $(title).innerHeight())
                    max_height = $(title).innerHeight();
            });
            $.each($titles, function (i, title) {
                $(title).css('height', max_height);
            });
        };
        adjust_title_heights();
        $('body').on('click', function (e) {
            if ($(e.target).closest('.share_icon').length === 0) {
                $(".share-open").slideUp();
            }
        });
        $('.open-fb').on("click", function () {
            var uri = 'http://www.facebook.com/sharer.php?s=100' + "&p[title]=" + encodeURIComponent(page_title) + "&p[summary]=" + encodeURIComponent(page_description);
            window.open(uri, '', 'width=626,height=440');
            if (typeof _gaq != 'undefined')
                _gaq.push(['_trackEvent', 'Social', 'Facebook', 'Share']);
            //   return false;
        });
        $(".twitter").on("click", function () {
            var uri = "http://twitter.com/home?status=" + encodeURIComponent(page_title + " - " + page_description);
            window.open(uri, '', 'width=626,height=440');
            if (typeof _gaq != 'undefined')
                _gaq.push(['_trackEvent', 'Social', 'Tweeter', 'Share']);
            // return false;
        });
        $(".open-plus").on("click", function () {
            $('head').append('<meta name="title" content="' + page_title + '">');
            window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.location.href), '', 'height=440,width=626');
            if (typeof _gaq != 'undefined')
                _gaq.push(['_trackEvent', 'Social', 'Google-Plus', 'Share']);
            //  return false;
        });
        $(".open-in").on("click", function () {
            window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.location.href) + '&title=' + encodeURIComponent(page_title) + "&summary=" + encodeURIComponent(page_description), '', 'height=440,width=626');
            if (typeof _gaq != 'undefined')
                _gaq.push(['_trackEvent', 'Social', 'Linkedin', 'Share']);
            //  return false;
        });
        if (!window.sharepoint_edit) {
            $('.popup_banks').magnificPopup({
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
                        $(".mfp-content").children(":first").focus();
                    },
                    close: function () {
                        $("#banks_check").prop('checked', false);
                        $(".banks_list a").each(function (i, e) {
                            $(e).attr("href","#");
                        });
                    }
                    // e.t.c.
                }
            }).on('mfpOpen', function (e /*, params */) {
                $("body").addClass("no_scrolling");
            }).on('mfpClose', function (e /*, params */) {
                $("body").removeClass("no_scrolling");
            });
            $('.popup_banks').click(function () {
                $("#banks-popup h2").text($(this).data("title"));
            });

            $('.open-mail').magnificPopup({
                items: {
                    closeOnBgClick: false,
                    src: '#mail_iframe',
                    type: 'inline',
                    showCloseBtn: false
                }
            });
            $('.open-mail').click(function () {
                utils.serIframeSrc($("#mail_iframe iframe"));
                if (typeof _gaq != 'undefined')
                    _gaq.push(['_trackEvent', 'Social', 'mail', 'Share']);
            });
            $('.customers_logoutpopup').magnificPopup({
                items: {
                    closeOnBgClick: false,
                    src: '#logout-popup',
                    type: 'inline',
                    showCloseBtn: false
                }
            });
        } else {
            //fix bug of bizportal in prod - edit page mode
            $("#bizportal").hide();
        }
        $('.close-btn ,.cancel').click(function () {
            $.magnificPopup.instance.close();
        });

        if (typeof (videojs) !== 'undefined')
            videojs.options.flash.swf = "/_layouts/15/HarelWebSite/Flash/video-js.swf";
        $('#submit_login').click(function () {
            var form = $('form#aspnetForm');
            var queryString = ""; //"&identification=" + document.getElementById("identification").value + "&phone=" + document.getElementById("phone_num").value;
            var validation_obj = window[$(this).data('validation_obj')];
            if (!validation.is_vlidating()) {
                validation.apply_validation(form, validation_obj, function (form) {
                    console.log("validation passed");
                    utils.showIframePopup("login_user_details", queryString, true);
                });
            }
            form.submit();
            return false;
        });
        //        $('.user_menu input').keypress(function (e) {
        //            var code = e.keyCode || e.which;
        //            if (code == 13) { //Enter keycode
        //                //Do something
        //                submitClientLogin();
        //                return false;
        //            }
        //        });
        //        $('#submit_client_login').click(function () {
        //            return submitClientLogin();
        //        });
        //
        //        function submitClientLogin() {
        //            var form = $('form#aspnetForm');
        //            var validation_obj = window[$('#submit_client_login').data('validation_obj')];
        //            if (!validation.is_vlidating()) {
        //                validation.apply_validation(form, validation_obj, function (form) {
        //                    console.log("validation passed");
        //                    var queryString = "LoginOriginatingAction=TopNav&identification=" + document.getElementById("identification").value + "&phone=" + document.getElementById("phone_num").value;
        //                    utils.showIframePopup("login_user_details", queryString, true);
        //                });
        //            }
        //            form.submit();
        //            return false;
        //        }
        if (utils.getQueryParameterByName("isshowlogin") == "true" && $(".user_menu_wrapper li.agent_name").length == 0) {
            utils.showIframePopup("login_user_details", "", true);
        }
        if (window.location.search) {
            var popup_param = utils.getQueryParameterByName('open_popup');
            if (popup_param) {
                utils.showIframePopup(popup_param, null, false);
            }
        }

        $("#filter_info_form .calender i").click(function () {
            if (window.ie8 || window.ie9 || window.ie10) {
                var input = $(this).siblings('input[type="text"]');
                input.focus();
            }
        });

        
    });

    if (document.addEventListener) {
        document.addEventListener("focus", focusfunc, true);
    } else {
        document.attachEvent("focus", focusfunc, true);
    }
  
   function focusfunc(event) {
        var d = document.getElementsByClassName("mfp-content");
        var traget = event.target || event.srcElement;
        if (d.length>0 && !d[0].contains(event.target)) {
            event.stopPropagation();
            $(d[0]).children(":first").focus();
        }
   }
});