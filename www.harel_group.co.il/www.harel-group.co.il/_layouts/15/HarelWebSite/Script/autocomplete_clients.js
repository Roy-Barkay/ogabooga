define(["jquery", "autocomplete_common", "utils", "resize"], function ($, autocomplete_common, utils) {
    try {
        window.isAnimating = false;
        var $body = $('body'),
            $all_wrapper = $('.all_wrapper'),
            wrapper_height = $all_wrapper.height(),
            wrapper_speed = 500;
        var is_char = function (e) {
            return !(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 36 || e.keyCode == 35 || e.keyCode == 45 || e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 91 || e.keyCode == 27 || e.keyCode == 13 || (e.keyCode == 65 && e.ctrlKey) || (e.keyCode == 67 && e.ctrlKey) || e.keyCode == 17 || e.keyCode == 18);
        };
        $(window).bind('resizeStart', function () {
            $.each($('.auto-complete-wrapper'), function (i, wrapper) {
                $(wrapper).css('width', "");
            });
        });
        $(window).bind('resizeEnd', function () {
            $.each($('.auto-complete-wrapper'), function (i, wrapper) {
                $(wrapper).css('width', $(wrapper).closest('.autocomplete_wrapper').outerWidth());
            });
        });
        $(document).ready(function () {
            $body.on('keyup', '.search_input', function (e) {
                //if right or left or home or end or insert or page up or page down or up or down or start or escape or enter or ctrl+a or ctrl+c or ctrl or alt
                if (!is_char(e)) {
                    return;
                }
                window.from_autocomplete = 2;
                var $this = $(this);
                var term = $(this)[0].value;
                var scope = $(this).data("scope");
                if (term.length > 2) {
                    var requestInit = new Harel.RLSearchSuggestions.RequestInit();
                    requestInit.SearchText = term;
                    Harel.RLSearchSuggestions.Search(requestInit, function (data) {
                        var render_data = $.extend(true, {}, data);
                        //                        $.each(render_data.Suggestions, function (i, item) {
                        //                            var temp = item.Expression.toLowerCase();
                        //                            var index = temp.indexOf(term.toLowerCase());
                        //                            if (index > -1) {
                        //                                var expression = temp.substr(0, index) + '<span>' + term.toLowerCase() + '</span>' + temp.substr(index + term.length);
                        //                                item.Expression = expression;
                        //                            }
                        //                        });
                        //                        $.each(render_data.PersonalSuggestions, function (i, item) {
                        //                            var temp = item.Expression.toLowerCase();
                        //                            var index = temp.indexOf(term.toLowerCase());
                        //                            if (index > -1) {
                        //                                var expression = temp.substr(0, index) + '<span>' + term.toLowerCase() + '</span>' + temp.substr(index + term.length);
                        //                                item.Expression = expression;
                        //                            }
                        //                        });
                        dust.render("autocomplete_client", render_data, function (err, out) {
                            //console.log(out);
                            var $blog;
                            if (render_data.Suggestions.length === 0 && render_data.PersonalSuggestions.length === 0) {
                                $blog = $this.siblings(".auto-complete-wrapper").find('.auto-complete-blog');
                                autocomplete_common.hideDropdown($blog, null);
                                return;
                            }
                            var $wrapper = $this.parent().find(".auto-complete-blog").closest('.auto-complete-wrapper');
                            $wrapper.css('width', $this.parent().outerWidth());
                            if ($wrapper.height() === 0 || window.isAnimating) {
                                $this.parent().find(".auto-complete-blog").html(out);
                                $wrapper = $this.siblings(".auto-complete-wrapper");
                                $blog = $wrapper.find('.auto-complete-blog');
                                autocomplete_common.showDropdown($blog, $this);
                                $this.parent().find(".auto-complete-blog").find('tbody tr').removeClass('active');
                            } else {
                                $wrapper = $this.parent().find(".auto-complete-blog").closest('.auto-complete-wrapper');
                                $this.parent().find(".auto-complete-blog").html(out);
                                $blog = $wrapper.find('.auto-complete-blog');
                                autocomplete_common.updateHeight($blog);
                            }
                        });
                    });
                } else {
                    var $blog = $this.siblings(".auto-complete-wrapper").find('.auto-complete-blog');
                    autocomplete_common.hideDropdown($blog, null);
                }
            });
            $body.on('click', ".auto-complete-blog tr", function (e) {
                window.from_autocomplete = 1;
                console.log('from autocomplete');
                autocomplete_common.enterClickChoice($(e.target), function () {
                    var $target = $(e.target);
                    submitSearch($target.closest('.autocomplete_wrapper').find('.autocomplete_input'), $target.parent().data('type') || $target.data('type'));
                });
            });
            $body.on('click', '.autocomplete_input_submit', function (e) {
                var $target = $(e.target);
                submitSearch($target.parent().parent().find('.autocomplete_input'), "NotSuggestion");
                return false;
            });
            $body.on('keypress', '.autocomplete_input', function (e) {
                var key = e.which;
                if (key === 13) // the enter key code
                {
                    //                    noAutoSuggets = true;
                    //                    var link = $(".auto-complete-blog tr.active .recent_pages");
                    //                    if (link.length > 0) {
                    //                        href = link.data("href");
                    //                        if (typeof (href) !== "undefined" && href !== '') {
                    //                            RedirectToSearch($(e.target), href);
                    //                        } else {
                    //                            submitSearch($(e.target));
                    //                        }
                    //                    } else
                    var $target = $(e.target);
                    var type = $target.data('type') && $target.data('type') !== "" ? $target.data('type') : "NotSuggestion";
                    submitSearch($target, type);
                    return false;
                } else if (is_char(e)) {
                    window.from_autocomplete = 2;
                }
            });

            function submitSearch($input, type) {
                //1.	AutoSuggestType :
                //
                //        NotSuggestion,
                //        General,
                //        Personalized,
                //        DidYouMean
                var placeholder = $input.attr('placeholder');
                if ($input.val().length > 0 && $.trim($input.val()) != $.trim(placeholder)) {
                    var url_params = utils.getUrlParams();
                    var url = document.URL.toString();
                    var referrer = url.indexOf("?") > -1 ? url.substring(0, url.indexOf("?")) : url;
                    var sim = url_params.sim || false;
                    window.hrl_redirect = true;
                    window.location.href = Harel.RLSearchSuggestions.SearchPageUrl + "?k=" + encodeURIComponent($input.val()) + "&as=" + type + "&referrer=" + encodeURIComponent(referrer) + "&sim=" + sim + "&autocomplete=" + window.from_autocomplete;
                }
            }
        });
    } catch (err) {
        console.log("JS ERROR - autocomplete_clients");
        console.log(err);
    }
});
