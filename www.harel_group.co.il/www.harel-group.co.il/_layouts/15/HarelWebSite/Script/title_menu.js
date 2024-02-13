define(["utils", "jquery", "elp", "libs/jQueryRotateCompressed", "resize"], function (utils, $, ellipsis) {
    try {
        var last_body_size = $('body').width();
        if (!window.sharepoint_edit) {
            var $h1 = $('.page_title h1 span.title');
            $h1.html($h1.text().replace(/[A-Za-z][A-Za-z ]*/g, '<span>$&</span>'));
        }
        // $(".down_arrow").appendTo(".page_title h1 .title");
        // $(".businesscard").appendTo(".page_title h1 .title");
        window.title_menu_opened = false;
        if (window.ie8 || window.ie7) {
            img2 = new Image();
            img2.src = "/_layouts/15/HarelWebSite/1037/img/arrow2.png";
        }
        $(document).on('click', ".down_arrow", function (evt) {
            evt.stopPropagation();
            if (window.title_menu_opened) {
                utils.closeSubnav();
                $('.wrapper').animate({
                    'margin-bottom': 0
                }, 500);
            } else {
                window.title_menu_opened = true;
                //$(this).addClass('visible');
                var pm = $('.page_menu'),
                    $subnave = $('.subnave'),
                    $wrapper = $('.wrapper'),
                    $arrow = $('.down_arrow');
                var top = pm.height() + parseInt(pm.css('padding-top').replace(/[^-\d\.]/g, '')) + parseInt(pm.css('padding-bottom').replace(/[^-\d\.]/g, ''));
                var pos = {};
                pos.top = top - 10;
                var left = $arrow.offset().left - pm.offset().left;
                left = (left + 20 - ($subnave.width()) / 2);
                left = Math.max(left, 0);
                if ((left + $subnave.width() > pm.width()) || window.current_device == 'mobile') {
                    pos.right = 0;
                    pos.left = '';
                } else {
                    pos.right = '';
                    pos.left = left;
                }
                $subnave.css(pos);
                $subnave.css('visibility', 'visible').animate({
                    "height": "show",
                    "marginTop": "show",
                    "marginBottom": "show",
                    "paddingTop": "show",
                    "paddingBottom": "show",
                    "top": pm.height() + parseInt(pm.css('padding-top').replace(/[^-\d\.]/g, '')) + parseInt(pm.css('padding-bottom').replace(/[^-\d\.]/g, ''))
                }, {
                    duration: 500,
                    complete: function () {
                        $('.down_arrow a').attr("aria-expanded", "true");
                    }                });
                var offset = $subnave.find('ul').height() + $subnave.offset().top - $wrapper.offset().top - $wrapper.height() + 20;
                if (offset > 0)
                    $wrapper.animate({
                        'margin-bottom': offset
                    }, 500);
                if (window.ie8 || window.ie7) {
                    $(".down_arrow").find("img").attr("src", "/_layouts/15/HarelWebSite/1037/img/arrow2.png");
                } else {
                    setTimeout(function () {
                        $(".down_arrow").find("img").rotate({
                            animateTo: 180
                        });
                    }, 10);
                }
                ellipsis.ellipsis();
            }
            return false;
        });
        resizing = false;
        $(window).bind('resizeStart', function () {
            //$(window).resize(function () {
            // if(!resizing){
            //     resizing=true;
            var bodysize = $('body').width();
            if (last_body_size == bodysize) {
                return;
            }
            last_body_size = bodysize;
            utils.closeSubnav();
            //   }
        });
        $('body').on('click', function (e) {
            var $self = $(e.target);
            if ($self.parents('.subnave,.down_arrow').length === 0) {
                utils.closeSubnav();
            }
        });
        // $('.media_icon').clone().appendTo('.media_icon_holder');
        //pension page js
        //if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
        //    $('.media_icon li a').text('');
        //}
        var count = 0;
        $('.like_icon').click(function () {
            $(this).addClass('newLike');
            count++;
            $('span.like-value').text(count);
        });
    } catch (err) {
        console.log("JS ERROR - title_menu");
        console.log(err);
    }
});
