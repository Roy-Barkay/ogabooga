//var base_url = local_base_url ? local_base_url : '/_layouts/15/HarelWebSite/Script';
requirejs.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    //  urlArgs: "version=0.0.86",
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
        "ajax": ["internal/harel_common"]
        //        'libs/jquery.mousewheel': ['jquery'],
        //        'libs/jquery.validate': ['jquery'],
        //
        //        'libs/jQueryRotateCompressed': ['jquery'],
        //        'libs/jquery.browser': ['jquery'],
        //        'libs/jquery.color': ['jquery'],
        //        'libs/jquery.ellipsis': ['jquery'],
        //        'libs/jquery.html5support': ['jquery'],
        //        'libs/jquery.touchSwipe.min': ['jquery'],
        //        'libs/enquire.min': ['libs/media.match.min'],
        //        'libs/jQuery.dPassword': ['jquery'],
        //        'libs/jquery.placeholder': ['jquery'],
        //        'libs/magnific-popup': ['jquery'],
        //        'libs/jcarousel': ['jquery'],
        //        'libs/jquery.alphanum': ['jquery'],
        //        'libs/picker': ['jquery'],
        //        'libs/picker.legacy': ['jquery', 'libs/picker'],
        //        'libs/picker.date': ['jquery', 'libs/picker'],
        //        'libs/bootstrap': ['jquery'],
        //        'internal/harel_common': ['jquery', 'Editor/Editor'],
        //        'libs/dust-helpers': ['libs/dust-core'],
        //        'libs/dust_etxend': ['libs/dust-core'],
        //        'dust_compiled_templates': ['libs/dust-core', 'libs/dust_etxend', 'libs/dust-helpers'],
        //        'libs/intellisys': ['jquery'],
        //        'libs/jquery.address-1.5': ['jquery']
    }
});
//requirejs.onError = function (err) {
//    console.log(err);
//};
require([
    "jquery",
    "utils",
    "framework",
    "elp",
    "validation",
    "user_agent",
    "is!is_secondary_nav?nav_menu:",
    "is!is_left_menu?left_menu:",
    //"main_menu",
    //    'libs/selectivizr',
    //  'is!is_ie8?libs/selectivizr:',
    "main_menu_new",
    "resize",
    "title_menu",
    "accessibility",
    "lobby_accourdion",
    "collapse_heading",
    'is!is_tabs?tabs:',
    "is!is_accourdion?accourdion:",
    "is!is_carousel?carousel:",
    "is!is_ribbon?internal/harel_ribbon:",
    "internal/sharepoint",
    'libs/fastclick',
    'mini_collapse',
    'libs/jquery.cookie',
    'internal/harel_common',
    'pagination',
    'autocomplete_common',
    "ajax",
    "libs/intellisys",
    "is!is_polisot?archive_polisot"
], function (n, utils, framework, ellipsis, validation) {
    var prev_term = 0,
        page_title = document.title,
        page_description = document.getElementsByName('description')[0] ? document.getElementsByName('description')[0].getAttribute('content') : "";
    $(document).ready(function () {
        var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
        if (!deviceIsIOS) { FastClick.attach(document.body); }        
        utils.Placeholders();
        //utils.promotionContentStyle();
        var $tables = $(".hsg-table-responsive table");
        $tables.each(function (i, e) {
            var t = $(e);
            t.parent().scrollLeft(t.width());
        });
        $(window).bind('resizeEnd', function () {
            utils.Placeholders();
            ellipsis.ellipsis();
            utils.phoneLinks();
            utils.androidHeightHack();
            $tables.each(function (i, e) {
                var t = $(e);
                t.parent().scrollLeft(t.width());
            });
        });

        //print
        $('#pdfMainPrintIcon').click(function (e) {
            return Harel.PrintPage('/_layouts/15/HarelWebSite/ApplicationPages/PrintPage.aspx?p=' + $(e.target).data('print-token'), $(e.target).data('print-label'));
        });
    });
    //  $('#side_column').wrapInner('<div class="boxes"></div>');
    $('.footenav li:last').css({
        'border-left': 'none'
    });
    //remove hover css for mobile device

    if (window.is_touch) {
        $('#device').remove();
    }
    utils.phoneLinks();
    /////tooltip/////
    $(".tooltip a").click(function (event) {
        // if ($(event.target).hasClass("tooltip")) {
        $(".tooltip").removeClass("show");
        $(this).parent().addClass("show");
        //}
        return false;
    });
    $(".tooltip .close-btn").click(function () {
        $(this).parents(".tooltip").removeClass("show");
    });
    $('body').click(function (e) {
        if ($(e.target).parents('.tooltip').length === 0 && !$(e.target).hasClass("tooltip")) {
            $(".tooltip").removeClass("show");
        }
    });
    $('#dictionary_index .alphaabet li').click(function () {
        var self = $(this);
        if (!self.hasClass("disabled")) {
            self.addClass("current").siblings().removeClass("current");
        }
        return false;
    });
    $('#banks_check').change(function () {
        $("#banks-popup").removeClass("error_message");
        var $this = $(this);
        setTimeout(function () {
            if ($this.is(':checked')) {
                $(".banks_list a").each(function (i, e) {
                    $(e).attr("href", $(e).data("href"));
                });
            } else {
                $(".banks_list a").each(function (i, e) {
                    $(e).attr("href", "#");
                });
            }
        }, 2);
    });
    $(".banks_list a").click(function () {
        var attr = $(this).attr('href');
        if (typeof attr !== 'undefined' && attr !== false) { } else {
            $("#banks-popup").addClass("error_message");
        }
    });
    window.closePopup = function () {
        $.magnificPopup.instance.close();
    };
    if ($(".user_box>span").length > 0) {
        var name_parts = $(".user_box>span").text().split(" ");
        var name = "";
        $.each(name_parts, function (i, e) {
            if (e.length > 7) {
                name = name + e[0] + ". ";
            } else {
                name = name + e + " ";
            }
        });
        $(".user_box>span").text(name);
    }
    var $body = $('body');
    utils.resetDisplay();
    $(".select-itmes").click(function () {
        $this = $(this);
        $options = $this.siblings(".secondary-title");
        if ($this.hasClass('active')) {
            $options.slideUp();
            $this.removeClass("active");
        } else {
            $options.slideDown();
            $this.addClass("active");
        }
    });
    $('input[name="Pension"]').change(function (e) {
        $this = $(e.target);
        $('input[name="Pension"]').parents("li").removeClass("active");
        $this.parents("li").addClass("active");
        $(".select-itmes span").text($this.parent().parent().parent().find("label").text());
        closeSearchFilters();
    });
    $(".insurence_panle_section li:last-child").addClass("lastchild");

    function closeSearchFilters() {
        if (window.current_device != 'desktop') {
            $this = $(".select-itmes");
            $options = $this.siblings(".secondary-title");
            $options.slideUp();
            $this.removeClass("active");
        }
    }

    function getUrlVars() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    $(document).on("click", ".iconElement", function (e) {
        $this = $(e.target);
        var underneathElement, originalDisplayAttribute = ($this.css("display")) ? $this.css("display") : "";
        if ($this.css("pointer-events") == "none") {
            // peek at the element below
            $this.css("display", "none");
            underneathElement = document.elementFromPoint(e.clientX, e.clientY);
            $this.css("display", originalDisplayAttribute);
            // fire the mouse event on the element below
            e.target = underneathElement;
            $(underneathElement).trigger(e);
            return false;
        }
        return true;
    });
    var iframes = $(".iframe_data_src");
    if (iframes.length > 0) {
        utils.serIframeSrc($(".iframe_data_src"));
    }

    // #region employers
    var $availableUsers = $('#availableUsers')
    var $companyNumber = $('[id$="UserCn"]');
    var $insertCnSection = $('.insertCn');
    var $chooseUserSection = $('.chooseUser');
    var companyNumber;

    $('#getAvailableUsers').click(function () {
        companyNumber = $companyNumber.val();
        if (companyNumber != "") {
            var data = {
                "Action": "New",
                "AuthType": "Simulation",
                "CompanyId": companyNumber
            };
            $insertCnSection.Authenticate(data);
        }
        else {
            $insertCnSection.find('.back-error').text('נא הזן ערך').show();
        }
    })

    $('#connectToUser').click(function () {
        var chosenUser = $availableUsers.val();
        var data = {
            "CompanyId": companyNumber,
            "AuthType": "Simulation",
            "UserId": chosenUser
        };
        $chooseUserSection.Authenticate(data);
    })

    function changePassword(currentPassword, newPassword) {
        var data = {
            "Action": "ChangePassword",
            "CurrentPassword": currentPassword,
            "NewPassword": newPassword,
            "ConfirmNewPassword": newPassword
        }
        $chooseUserSection.Authenticate(data);
    }

    $.fn.Authenticate = function (data) {
        if ($('.please-wait:visible').length) return;
        var $section = $(this);
        var $errorMsg = $section.find('.back-error');
        var $pleaseWait = $section.find('.please-wait');
        $('.back-error').hide();
        $pleaseWait.show();
        $.ajax({
            type: "POST",
            url: "/_vti_bin/webapi/EmployersAuthentication",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result.RedirectTo != undefined) {
                    window.location.href = result.RedirectTo;
                }
                else {
                    $pleaseWait.hide();
                }
                if (result != null && result.AvailableUsers != undefined) {
                    $availableUsers.html('');
                    if (result.AvailableUsers.length) {
                        $.each(result.AvailableUsers, function (index, name) {
                            $availableUsers.append($('<option>').attr('value', name.split(' ')[0]).text(name));
                        });
                        $('#cnLabel').text(data.CompanyId);
                        $chooseUserSection.show();
                    }
                    else {
                        $chooseUserSection.hide();
                    }
                }
                if (result != null && result.Status == 2) {
                    var msg;
                    switch (result.ErrorType) {
                        case 4: msg = "משתמש נעול"; break;
                        case 8: msg = "אינך מורשה לבצע מעקף הזדהות"; break;
                        case 9: msg = "לא נמצאו משתמשים"; break;
                        default: msg = "אירעה שגיאה"; break;
                    }
                    $errorMsg.text(msg).show();
                }
            },
            error: function (message) {
                console.log(message);
            }
        });
    }
    // #endregion

    // region surgeons
    $.fn.ToggleMsg = function (isValid, message) {
        var $errorMsg = $(this);
        if (isValid) {
            $errorMsg.hide();
        }
        else {
            $errorMsg.text(message).show();
        }
    }

    $('#connectToSurgeon').click(function () {
        if ($('.please-wait:visible').length) return;

        //validations
        var tz = $('.supplierTZ input').val();
        var phone = $('.supplierPhone input').val();
        if (!tz.length || !phone.length) return;
        var validator = window.harel_portal_validation;
        var $tzError = $('.supplierTZ .back-error');
        var $phoneError = $('.supplierPhone .back-error');
        var validTz = window.harel_portal_validation.check_id_number(tz);
        var validPhone = validator.checkRegex(phone, new RegExp('[0][5][0-9][-]{0,1}[0-9]{7}'));
        $phoneError.ToggleMsg(validPhone, 'מספר טלפון לא תקין');
        $tzError.ToggleMsg(validTz, 'תעודת זהות לא תקינה');
        if (!validTz || !validPhone) return;

        var $section = $('.supplierPhone');
        var $errorMsg = $section.find('.back-error');
        var $pleaseWait = $section.find('.please-wait');
        $pleaseWait.show();
        var data = {
            userId: tz,
            userMobilePhone: phone
        };

        $.ajax({
            type: "POST",
            url: portal_domain + "/_vti_bin/webapi/Surgeons/Authenticate",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null) {
                    var msg;
                    switch (result.Status) {
                        case 1: window.location.href = result.RedirectLink; break;
                        case 2: msg = "אינך מורשה לבצע פעולה זו"; break;
                        case 3: msg = result.Message;
                    }
                    $errorMsg.text(msg).show();
                }
                $pleaseWait.hide();
            },
            error: function (message) {
                console.log(message);
            }
        });
    })
    // #endregion
});
