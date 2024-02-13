define(["jquery", "autocomplete_common", "resize"], function ($, autocomplete_common) {
    try {
        window.isAnimating = false;
        var $body = $('body'),
            $all_wrapper = $('.all_wrapper'),
            wrapper_height = $all_wrapper.height(),
            wrapper_speed = 500,
            list = [];
        $(document).ready(function () {
            $body.on('keyup', '.collective_autocomplete_input', function (e) {
                //if right or left or home or end or insert or page up or page down or up or down or start or escape or enter or ctrl+a or ctrl+c or ctrl or alt
                if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 36 || e.keyCode == 35 || e.keyCode == 45 || e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 91 || e.keyCode == 27 || e.keyCode == 13 || (e.keyCode == 65 && e.ctrlKey) || (e.keyCode == 67 && e.ctrlKey) || e.keyCode == 17 || e.keyCode == 18) {
                    return;
                }
                var $this = $(this);
                var term = $(this)[0].value;
                var scope = $(this).data("scope");
                var $blog;
                if (term.length >= 2) {
                    var $wrapper = $this.parent().find(".collective_auto-complete-blog").closest('.auto-complete-wrapper');
                    $wrapper = $this.siblings(".auto-complete-wrapper");
                    $blog = $wrapper.find('.collective_auto-complete-blog');
                    var prev_term_length = $blog.find('td a').length;
                    update_autocomplete(term, $blog, function () {
                        if (list.length > 0) {
                            remove_error($this);
                        }
                        var curr_term_length = $blog.find('td a').length > 0;
                        if ($wrapper.height() === 0 && curr_term_length > 0 || window.isAnimating) {
                            autocomplete_common.showDropdown($blog, $this);
                            $this.attr('aria-expanded', true);
                            var $content = $('#main_column');
                            if ($content.length === 0) {
                                return;
                            } else {
                                var diff = $wrapper.offset().top + $wrapper.find(".collective_auto-complete-blog").height() - $content.height() - $content.offset().top;
                                if (diff > 0) {
                                    if (window.ie8) {
                                        $content.css({
                                            'margin-bottom': diff + 'px'
                                        });
                                    } else {
                                        $content.animate({
                                            'margin-bottom': diff + 'px'
                                        }, 300);
                                    }
                                } else {
                                    if (window.ie8) {
                                        $content.css({
                                            'margin-bottom': '0'
                                        });
                                    } else {
                                        $content.animate({
                                            'margin-bottom': '0'
                                        }, 300);
                                    }
                                }
                            }
                        } else {
                            if (curr_term_length && $blog.find('td a').length > prev_term_length) {
                                autocomplete_common.showDropdown($blog, $this);
                                $this.attr('aria-expanded', true);
                            }
                            else {
                                autocomplete_common.updateHeight($blog);
                            }
                        }
                    });
                } else {
                    $blog = $this.siblings(".auto-complete-wrapper").find('.collective_auto-complete-blog');
                    autocomplete_common.hideDropdown($blog, null);
                    $this.attr('aria-expanded', false);
                    var $content = $('#main_column');
                    if (window.ie8) {
                        $content.css({
                            'margin-bottom': '0'
                        });
                    } else {
                        $content.animate({
                            'margin-bottom': '0'
                        }, 300);
                    }
                }
            });
            $body.click(function (e) {
                var $self = $(e.target);
                if ($self.closest('.auto-complete-wrapper').length > 0) {
                    return;
                }
                var $blog = $self.parent().find('.collective_auto-complete-blog');
                autocomplete_common.hideDropdown($blog, null);
                var $content = $('#main_column');
                if (window.ie8) {
                    $content.css({
                        'margin-bottom': '0'
                    });
                } else {
                    $content.animate({
                        'margin-bottom': '0'
                    }, 300);
                }
            });
            $body.on('click', '.collective_send_button', function (e) {
                var $input = $(e.target).parent().find('.collective_autocomplete_input');
                if ($input.val() == "") {
                    show_error($input, 'נדרש לבחור שם ארגון');
                }
                else {
                    var url = $input.data('url');
                    if (!url) {
                        show_error($input, 'לא נמצאו תוכניות מיוחדות לארגון זה');
                        autocomplete_common.hideDropdown($input.parent().find('.collective_auto-complete-blog'), null);
                        $input.attr('aria-expanded', false);
                    }
                }
            });
            $body.on('keyup', ".collective_autocomplete_wrapper", function (e) {
                //down arrow
                var $elem = $(e.target).siblings(".auto-complete-wrapper").find('.collective_auto-complete-blog');
                var $input = $elem.closest('.auto-complete-wrapper').siblings('.collective_autocomplete_input');
                if (e.keyCode == 40) {
                    autocomplete_common.setNextChoice($elem, $input);
                    $elem.find('tr').attr('aria-selected', false);
                    $selectedOption = $elem.find('tr.active');
                    $selectedOption.attr('aria-selected', true);
                    var id = $selectedOption.attr('id');
                    $input.attr('aria-activedescendant', id);
                    //up arrow
                } else if (e.keyCode == 38) {
                    autocomplete_common.setPrevChoice($elem, $input);
                    $elem.find('tr').attr('aria-selected', false);
                    $selectedOption = $elem.find('tr.active');
                    $selectedOption.attr('aria-selected', true);
                    var id = $selectedOption.attr('id');
                    $input.attr('aria-activedescendant', id);
                    //enter
                } else if (e.keyCode == 13) {
                    $.each(list, function (i, e) {
                        if (e.Name.toLowerCase() == $input.val().toLowerCase()) {
                            $input.data('url', e.Url);
                            return;
                        }
                    })
                    if ($input.val() == "") {
                        show_error($input, 'נדרש לבחור שם ארגון');
                    }
                    else {
                        var url = $input.data('url');
                        if (!url) {
                            show_error($input, 'לא נמצאו תוכניות מיוחדות לארגון זה');
                        } else {
                            remove_error($input);
                            $elem.find('a[data-url="' + url + '"]').click();
                            autocomplete_common.hideDropdown($input.parent().find('.collective_auto-complete-blog'), null);
                            $input.attr('aria-expanded', false);

                        }
                    }
                    //escape
                } else if (e.keyCode == 27) {
                    autocomplete_common.hideDropdown($(".collective_auto-complete-blog"), null);
                    $input.attr('aria-expanded', false);
                }
            });
            var show_error = function ($input, text) {
                remove_error($input);
                $input.addClass('error');
                $('<label class="error" id="errNotFound" role="alert">' + text + '</label>').insertAfter($input);
                $input.attr('aria-describedby', 'errNotFound');
            };
            var remove_error = function ($input) {
                $input.removeClass('error');
                $input.next('.error').remove();
                $input.removeAttr('aria-describedby');
            };
            var update_autocomplete = function (term, $blog, callback) {
                list = Harel.Config.CollectivesNavigation.SelectCollective.CollectivesList;
                var updated_list = [];
                $.each(list, function (i, item) {
                    var temp = item.Name.toLowerCase();
                    console.log(temp);
                    var index = temp.indexOf(term.toLowerCase());
                    if (index > -1) {
                        var word = {
                            start: temp.substr(0, index),
                            term: term.toLowerCase(),
                            end: temp.substr(index + term.length)
                        };
                        item.word = word;
                        updated_list.push(item);
                    }
                });
                updated_list.sort(function (item1, item2) {
                    if (item1.Name < item2.Name)
                        return -1;
                    if (item1.Name > item2.Name)
                        return 1;
                    return 0;
                });
                updated_list = updated_list.slice(0, 5);
                remove_error($blog);
                dust.render('collective_search_autocomplete', {
                    "Collectives": updated_list
                }, function (err, html) {
                    $blog.find('.primary-blog').html(html);
                    $blog.find('table').attr('role', 'presentation');
                    $blog.find('table tbody').attr('role', 'listbox');
                    $blog.find('table tr').attr('role', 'option');
                    $blog.find('table tr').attr('aria-selected', false);
                    $blog.find('table tr').attr('id', function (index) {
                        return 'tr-' + index;
                    });
                    callback();
                });
            };
        });
    } catch (err) {
        console.log("JS ERROR - autocomplete_collective");
        console.log(err);
    }
});
