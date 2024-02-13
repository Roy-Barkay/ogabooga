define(["jquery", "resize", "libs/bootstrap"], function ($, validation, utils) {
    try {
        $(document).ready(function () {
            var $body = $('body');
            var popover_width = 276;
            var disabled = $('.popover_btn_disabled');
            //        if (disabled.length > 0) {
            //            $.each(disabled, function (i, item) {
            //                $(item).parent().html($(item).html());
            //            });
            //        }
            var init_popover = function () {
                var $popover_btn = $('.popover_btn');
                //var $popover_title = $('.popover-title');
                for (let i = 0; i < $popover_btn.length; i++) {
                    var title = $popover_btn[i].text;
                    $popover_btn[i].setAttribute("tabindex", "0");
                    $popover_btn[i].setAttribute("role", "button");
                    $popover_btn[i].setAttribute("aria-haspopup", "true");
                    var e = " מידע נוסף על " + title
                    $popover_btn[i].setAttribute("aria-label", e)
                    $popover_btn[i].setAttribute("title", "");
                    $popover_btn[i].setAttribute("forme", title);

                }

                var bottom_space = 0;
                dust.render('popover', {
                    title: "",
                    content: ""
                }, function (err, out) {
                    $body.append(out);
                });
                $popover_btn.popover({
                    html: true,
                    trigger: 'manual',
                    title: function () {
                        var title_html = '';
                        return title_html;
                    },
                    content: function () {
                        var title = '<button href="javascript:;" class="close-btn"  title="דו שיח סגור"></button> <h3 role="heading" aria-level="2" class="popover-title-2">' + $(this).data('title') + '</h3>'
                        var popover_link = !$(this).data('link') || $(this).data('link') === '' ? '' : '<p class="popover_link"><a class="bid" title="למידע נוסף" href="' + $(this).data('link') + '">למידע נוסף<i>&nbsp;</i> </a></p>';
                        var content_html = title + $(this).data('content') + popover_link;
                        return content_html;
                    },
                    placement: function (context, source) {
                        //var $source = $(source),
                        //    $container = $source.parents(".box").parent(), // $('#main_column'),
                        //    container_offset = $container.offset(),
                        //    source_offset = $source.offset(),
                        //    source_width = $source.width(),
                        //    container_right = container_offset.left + $container.width(),
                        //    source_right = source_offset.left + source_width,
                        //    popover_outer = (popover_width / 2) - (source_width / 2) + 20,
                        //    $wrapper = $('.all_wrapper'),
                        //    top_space = source_offset.top - container_offset.top;
                        //$('.fake_popover .popover-title').html($source.data('title'));
                        //$('.fake_popover .popover-content').html($source.data('content'));
                        //var popover_height = $('.fake_popover').innerHeight();
                        //var position = '',
                        //    temp = '';
                        //if (top_space < popover_height) {
                        //    position = 'bottom';
                        //    bottom_space = popover_height + 20 - ($wrapper.height() - source_offset.top - $source.height());
                        //    console.log(bottom_space);
                        //} else {
                        //    position = 'top';
                        //}
                        ////check if the tooltip fits left side
                        //if (source_offset.left - container_offset.left < popover_outer) {
                        //    temp = 'Left';
                        //}
                        //if (container_right - source_right < popover_outer) {
                        //    if (temp == 'Left')
                        //        temp = '';
                        //    else
                        //        temp = 'Right';
                        //}
                        //position += temp;
                        //return position;
                        return 'bottom';
                    }
                });
                $popover_btn.on('shown.bs.popover', function (e) {
                    if (bottom_space > 0) {
                        $('.top_wrapper').css({
                            'margin-bottom': bottom_space
                        });
                    } else if (bottom_space < 0) {
                        $('.top_wrapper').css({
                            'margin-bottom': ""
                        });
                    }

                    var $popover = $(e.target).parent().find(".popover");
                    $popover.addClass(".current")
                    // $popover[0].setAttribute("role", "dialog")
                    $popover.hide();
                    setTimeout(function () {
                       
                        $popover.show();
                        var pop_offset = $popover.offset();
                        pop_offset["margin-top"] = 0;
                        pop_offset["margin-bottom"] = 0;
                        $(".popover:not(.current)").remove();
                        $popover.appendTo("body");
                        $popover.css(pop_offset);
                        $(".popover-content button")[0].focus()
                    }, 1)
                });
                $popover_btn.on('hidden.bs.popover', function () {
                    $('.top_wrapper').css({
                        'margin-bottom': 0
                    });
                });
                $(".wrapper").off('click.popover.harel');
                $(".popover_container").off('click.popover.harel');
                $(".popover_container").on('click.popover.harel', ".popover_btn", function (e) {
                    if (typeof ($(this).data('content')) !== 'undefined' && typeof ($(this).data('title')) !== 'undefined') {
                        e.preventDefault();
                        $(this).popover('show');
                        $('.popover_btn').not(this).popover('hide');
                    }
                });

                $body.bind('click', function (e) {
                    if ($(e.target).parents('.popover_container').length === 0 && !$(e.target).hasClass("popover_btn")) {
                        $('.popover_btn').popover('hide');
                    }
                });
            };
            window.init_popover = init_popover;
            init_popover();
            $body.on('click', '.close-btn', function (e) {
                var $parent = $(e.target).closest('.popover_container').find('.popover_btn');
                $parent.popover('hide');
                var $popover_btn = $('.popover_btn');
                var titleData = document.getElementsByClassName('popover-title-2')[0].textContent
                for (let i = 0; i < $popover_btn.length; i++) {
                    if ($popover_btn[i].text == titleData) {
                        $popover_btn[i].focus();
                        $popover_btn[i].classList.add("focused");
                        return
                    }

                }
            });
            $(window).bind('resizeStart', function () {
                $('.popover_btn').popover('hide');
            });
            $(window).bind('resizeEnd', function () {
                $('.fake_popover').remove();
                //$popover_btn.popover('destroy');
                init_popover();
            });
            $(window).trigger('init_popover');
            return {
                init_popover: init_popover
            };
        });
    } catch (err) {
        console.log("JS ERROR - popover");
        console.log(err);
    }
});
