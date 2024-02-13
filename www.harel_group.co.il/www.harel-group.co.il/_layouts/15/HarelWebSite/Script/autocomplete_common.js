define(["jquery", "resize"], function ($) {
    try {
        var $body = $('body'),
            prev_term = "";
        window.isAnimating = false;
        window.from_autocomplete = 2;
        $(document).ready(function () {
            $body.click(function (e) {
                var $self = $(e.target);
                if ($self.hasClass('search_scope') || $self.hasClass('searchfield') || $self.parents('.search_scope').length > 0) {
                    return;
                }
                var $blog = $self.closest('.autocomplete_wrapper').find($(".auto-complete-blog"));
                if ($blog.length === 0) {
                    $blog = $(".auto-complete-blog");
                }
                ret.hideDropdown($blog, null);
            });
        });
        $body.on('keyup', ".autocomplete_wrapper", function (e) {
            //down arrow
            var $elem = $(e.target).siblings(".auto-complete-wrapper").find('.auto-complete-blog');
            var $input = $elem.closest('.auto-complete-wrapper').siblings('.autocomplete_input');
            if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {
                window.from_autocomplete = 1;
            }
            if (e.keyCode == 40) {
                ret.setNextChoice($elem, $input);
                //up arrow
            } else if (e.keyCode == 38) {
                ret.setPrevChoice($elem, $input);
                //enter
            } else if (e.keyCode == 13) {
                ret.enterChoice($elem, $input);
                ret.hideDropdown($(".auto-complete-blog"), null);
                //escape
            } else if (e.keyCode == 27) {
                ret.hideDropdown($(".auto-complete-blog"), null);
            }
        });
        var ret = {
            showDropdown: function ($elem, $input) {
                var $wrapper = $elem.closest('.auto-complete-wrapper');
                $wrapper.show();
                var input_height = $input.outerHeight();
                $elem.show();
                $elem.css('bottom', 0);
                $elem.css('top', 'auto');
                $wrapper.css('top', $input.position().top + input_height - 1);
                window.isAnimating = true;
                if (window.ie8) {
                    $wrapper.css({
                        height: $elem.height()
                    });
                    window.isAnimating = false;
                } else {
                    $wrapper.stop().animate({
                        height: $elem.height() + 1
                    }, 500, function () {
                        window.isAnimating = false;
                    });
                }
                var $content = $('.wrapper');
                if ($content.length === 0) {
                    return;
                } else {
                    var diff = $wrapper.offset().top + $wrapper.find(".auto-complete-blog").height() - $content.height() - $content.offset().top;
                    if (diff > 0) {
                        if (window.ie8) {
                            $content.css({
                                'margin-bottom': diff + 'px'
                            });
                        } else {
                            $content.animate({
                                'margin-bottom': diff + 'px'
                            }, 500);
                        }
                    }
                }
            },
            updateHeight: function ($elem) {
                var $wrapper = $elem.closest('.auto-complete-wrapper'),
                    term_length = $wrapper.find('td a').length;
                $wrapper.stop().css({
                    height: $elem.height() + 1
                });
                if (term_length === 0) {
                    this.hideDropdown($elem);
                }
                var $content = $('.wrapper');
                if ($content.length === 0) {
                    return;
                } else {
                    var diff = $wrapper.offset().top + $wrapper.find(".auto-complete-blog").height() - $content.height() - $content.offset().top;
                    if (diff > 0) {
                        $content.stop().css({
                            'margin-bottom': diff + 'px'
                        });
                    }
                }
            },
            hideDropdown: function ($elem, callback) {
                var speed = 200;
                var $wrapper = $elem.closest('.auto-complete-wrapper');
                if ($elem.length === 0) {
                    return;
                }
                if (window.ie8) {
                    var s = $wrapper[0].offsetHeight;
                    if (s === 0) {
                        if (callback) callback();
                        return;
                    }
                    $wrapper.css({
                        height: 0
                    });
                    $('.wrapper').css({
                        "margin-bottom": 0
                    });
                    $elem.hide();
                    $wrapper.hide();
                    if (callback) callback();
                    return;
                }
                if ($wrapper.height() === 0) {
                    if (callback) callback();
                    return;
                }
                $wrapper.stop(true, false).animate({
                    height: 0
                }, speed, function () {
                    $wrapper.hide();
                    $elem.hide();
                });
                $('.wrapper').animate({
                    'margin-bottom': 0
                }, speed, function () {
                    if (callback) callback();
                });
            },
            setPrevChoice: function ($elem, $input) {
                var $current = $elem.find('tbody tr.active'),
                    $prev = $current.prev();
                if ($prev.length === 0) {
                    var $table;
                    if ($current.length > 0) {
                        $table = $current.closest('.primary-blog').prev();
                    } else {
                        $table = $elem.find('.primary-blog').last();
                    }
                    if ($table.length === 0)
                        $prev = $elem.find('tbody tr').last();
                    else
                        $prev = $table.find('tbody tr').last();
                }
                $current.removeClass('active');
                $prev.addClass('active');
                ret.enterChoice($elem, $input);
            },
            setNextChoice: function ($elem, $input) {
                var $current = $elem.find('tbody tr.active'),
                    $next = $current.next();
                if ($next.length === 0) {
                    var $table;
                    if ($current.length > 0) {
                        $table = $current.closest('.primary-blog').next();
                    } else {
                        $table = $elem.find('.primary-blog tbody tr').closest('.primary-blog').first();
                    }
                    if ($table.length === 0)
                        $next = $elem.find('tbody tr').first();
                    else
                        $next = $table.find('tbody tr').first();
                }
                $current.removeClass('active');
                $next.addClass('active');
                ret.enterChoice($elem, $input);
            },
            enterChoice: function ($elem, $input) {
                var short;
                var $current = $elem.find('tbody tr.active td').last().find('a');
                if ($elem.parents('.client').length === 0) {
                    short = $elem.find('tbody tr.active').data("short");
                    if (short && short !== "") {
                        $input.val(short);
                        $input.data('type', $current.data('type'));
                        $input.data('url', $current.data('url'));
                    } else {
                        if ($current.length > 0) {
                            $input.val($current.text());
                            $input.data('type', $current.data('type'));
                            $input.data('url', $current.data('url'));
                        }
                    }
                } else if ($current.length > 0) {
                    $input.val($current.text());
                    $input.data('type', $current.data('type'));
                    $input.data('url', $current.data('url'));
                }
                prev_term = $input.val();
            },
            enterClickChoice: function ($target, callback) {
                $(".auto-complete-blog tr").removeClass('active');
                var tr = $target.closest('tr');
                tr.addClass('active');
                var $elem = $target.closest('.auto-complete-blog'),
                    $input = $elem.closest('.auto-complete-wrapper').siblings('.autocomplete_input');
                ret.enterChoice($elem, $input);
                if (callback) {
                    callback();
                }
            }
        };
        return ret;
    } catch (err) {
        console.log("JS ERROR - autocomplete_common");
        console.log(err);
    }
});
