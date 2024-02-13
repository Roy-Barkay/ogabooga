define(["jquery", "api", "utils", "resize", 'libs/dust-core', 'libs/dust_etxend', 'libs/dust-helpers'], function ($, api, utils) {
    try {
        var $body = $('body');
        var search_data;
        $('document').ready(function () {
            $body.on('click', '.collective_send_button', function (e) {
                submit_collective($(e.target).prev());
            });
            $body.on('keyup', '.collective_autocomplete_input', function (e) {
                if (e.keyCode == 13) {
                    submit_collective($(e.target).parent());
                }
            });
            var submit_collective = function ($target) {
                var string = $target.find('.collective_autocomplete_input').val().toLowerCase();
                var list = $target.find('.auto-complete-wrapper td a');
                var search_item;
                $.each(list, function (i, item) {
                    it = item.textContent || item.innerText;
                    if (it.toLowerCase() == string) {
                        search_item = item;
                    }
                });
                if (search_item) {
                    $(search_item).click();
                }
            };
            $body.on('click', 'a.another-org, a.another-link', function (e) {
                e.preventDefault();
                var $self = $(e.target),
                    $box = $('.collective_iframe');
                if ($box.length == 0)
                    $box = $self.closest('.box.white');
                //check if search was already rendered
                if ($('.collective_search').length > 0) {
                    var $search = $('.collective_search');
                    var $input = $search.find('.collective_autocomplete_input');
                    $input.removeClass('error');
                    $input.next('.error').remove();
                    $box.removeClass('active').addClass('inactive');
                    $search.addClass('active').removeClass('inactive');
                    
                } else {
                    render_search(Harel.Config.CollectivesNavigation.SelectCollective, $box);
                }
                $('.collective_search').find('#big_search').focus();
            });
            $body.on('click', '.direct_link', function (e) {
                window.location.href = $(e.target).attr('href');
            });
            $body.on('click', '.iframe_redirect', function (e) {
                e.preventDefault();
                var $self = $(this),
                    url = $self.data('url'),
                    $search = $('.collective_search'),
                    //$prev_box = $search.next(),
                    height = $search.height();
                $collective_iframe = $('.iframe_collective');
                if ($collective_iframe.length > 0) {
                    //open the iframe and replace url
                    var iframe = $collective_iframe[0].contentWindow.document;
                    iframe.open().write('<body onload="location.href=\'' + url + '\'">');
                    iframe.close();
                    //change views
                    $search.removeClass('active').addClass('inactive');
                    $collective_iframe.parents().removeClass('inactive');
                    $collective_iframe.parent().addClass('active');
                    $search.find('.collective_autocomplete_input').val('').trigger('click');
                } else if ($collective_iframe.length == 0) {
                    dust.render('collective_iframe', {
                        url: url,
                        height: height,
                        parent_class: $search.attr('class'),
                        OtherCollectiveText: Harel.Config.CollectivesNavigation.OtherCollectiveText
                    }, function (err, out) {
                        $(out).insertAfter($search);
                        $('.collective_iframe').removeClass('collective_search');
                        $search.removeClass('active').addClass('inactive');
                        $search.next().addClass('active');
                        resize_iframe();
                    });
                }
            });
            var render_search = function (dataReturnObject, $box) {
                dust.render('collective_search_box', {
                    parent_class: $box.attr('class')
                }, function (err, out) {
                    $(out).insertBefore($box);
                    var $search = $box.prev('.collective_search');
                    dust.render('collective_search', dataReturnObject, function (err, content) {
                        $search.html(content);
                        $box.removeClass('active').addClass('inactive');
                        $search.addClass('active');
                        utils.adjustProductsCarouselSibling();
                    });
                });
                if ($box.parents("#main_column").length > 0 || $box.parents("#full_column").length > 0) {
                    $(".collective_search").removeClass("box1111");
                }
            };
            var resize_iframe = function () {
                $('.iframe_collective').css('height', 237);
                if ($('.captcha_login .iframe_collective').parents(".box1111").length == 0) {
                    var active_collective = $('.collective_navigation_container');
                    if (active_collective.length > 1)
                        active_collective = $('.collective_navigation_container.active');
                    var width = active_collective.find('.iframe_collective').width();
                    if (width <= 724 && width > 518) {
                        $('.captcha_login .iframe_collective').css('height', 430);
                    } else if (width <= 518) {
                        $('.captcha_login .iframe_collective').css('height', 431);
                    }
                }
            };
            window.resize_iframe = resize_iframe;
            resize_iframe();
            $(window).bind('resizeInterval', function () {
                resize_iframe();
            });
        });
    } catch (err) {
        console.log("JS ERROR - collective");
        console.log(err);
    }
});
