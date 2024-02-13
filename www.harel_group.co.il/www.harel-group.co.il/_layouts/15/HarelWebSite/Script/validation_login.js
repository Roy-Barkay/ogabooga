define(["jquery", "tag_manager", "validation", "utils", "main_menu_new"], function ($, tagManager, validation, utils, main_menu_new) {
    try {
        $(document).on("keypress", ".login_form input", function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                var $btn = $(e.target).parents('.login_form').find(".result_form_login_submit");
                customLoginValidation($btn);
                e.stopPropagation();
                return false;
            }
        });
        $(document).on("click", ".result_form_login_submit", function (e) {
            customLoginValidation($(this));
            return false;
        });

        function customLoginValidation($btn) {

            //var $btn = $(".result_form_login_submit");
            //var $btn = $(e.target).closest(".result_form_login_submit");
            var $form = $btn.closest('.login_form');
            applicationLoginValidation($btn, $form, true);
            $form.find("input").unbind("keyup").keyup(function (e) {
                var $form1 = $btn.parents(".login_form");
                applicationLoginValidation($btn, $form1, false);
            });
        }

        function applicationLoginValidationPass(identification, phone) {
            var isDesktop = window.innerWidth >= '960';
            var destUrl = '/personal-info/my-harel/Pages/client-view.aspx';
            var paramsForElasticLog = { general: { action_code: '2077', system_code: '218' }, MessageForUser: { infoTitle: '' }, entityELCustomerRouting: { Action: 9999, Topic: 9997, DestinationUrlWithParams: destUrl, DestinationUrl: destUrl } };
            var params = { UserId: identification, FullPhone: phone };
            var paramsContext = { ContextJson: { LogTypCurrentPlatform: isDesktop ? 1 : 2 }, from: 'minimi' }
            var paramsPortalLogger = { actionLog: { Id: 0, SuccessMessage: 'AL00', FailureMessage: '' }, success: true, actionContent: 'לא פעולה מהירה' }
            $('.result_form_login_submit').addClass("disabled").text("המתן...").val("המתן...");
            //clear browser session
            sessionStorage.removeItem('checkOpenCalls');

            $.ajax({
                type: "POST",
                url: "`/_vti_bin/webapi/CustomersAuthentication/PostAuthenticate/ContextConfig",
                data: JSON.stringify(paramsContext),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    sendAuth("ElasticLogger", paramsForElasticLog);
                    sendAuth("PortalLogger", paramsPortalLogger);
                    sendAuth("StartProcess", params);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("error", errorThrown);
                }
            });
            //utils.showIframePopup("login_user_details", queryString, true);
        }
        function sendAuth(action, params) {
            $.ajax({
                type: "POST",
                url: "/_vti_bin/webapi/CustomersAuthentication/PostAuthenticate/" + action,
                data: JSON.stringify(params),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (action == "StartProcess") {
                        if (result.Details.hasOpenContactCalls) {
                            sessionStorage.setItem("checkOpenCalls", "hasOpenCalls");
                        }
                        $('.result_form_login_submit').removeClass("disabled").text("כניסה").val("כניסה");
                        clearLogin();
                        let curUser = {};
                        curUser.UserId = params.UserId;
                        curUser.FullPhone = params.FullPhone;

                        var obj = Object.assign({}, result, curUser);
                        window.postMessage(obj, "*");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (action == "StartProcess") {
                        $('.result_form_login_submit').removeClass("disabled").text("כניסה").val("כניסה");
                    }
                    console.log("error", errorThrown);
                }
            });
        }
        function clearLogin() {
            main_menu_new.closeUserBox(function () {
                $('#identification').val("");
                $('#mobile_number').val("");
                if (window.ie8 || window.ie9) {
                    setTimeout(function () {
                        $('#identification').trigger("blur");
                        $('#mobile_number').trigger("blur");
                    }, 200)
                }
            });
        }
        var login_validation;

        function applicationLoginValidation($submit_btn, $form, submit_form) {
            login_validation = window[$submit_btn.data("validation_obj")];
            var inputs = [];
            for (key in login_validation.rules) {
                inputs.push(key);
            }
            var $id_field, $phone_field, phone_field_name, id_field_name;
            if (login_validation.rules[inputs[0]].hasOwnProperty("prefixes")) {
                phone_field_name = inputs[0];
                id_field_name = inputs[1];
            } else {
                phone_field_name = inputs[1];
                id_field_name = inputs[0];
            }
            $id_field = $form.find("input[name='" + id_field_name + "']");
            $phone_field = $form.find("input[name='" + phone_field_name + "']");
            var validid = validate_id($id_field, id_field_name);
            var validphone = validate_phone($phone_field, phone_field_name);
            if (validid && validphone && submit_form) {
                //google tag manager
                if (typeof event == "undefined") {
                    event = 'GTM event To GA'
                }
                var cat = $submit_btn.data('ga-category').split(";");
                var action = $submit_btn.data('ga-action').split(";")
                var label = $submit_btn.data('ga-label').split(";")
                sessionStorage.setItem("loginOriginAction", cat[0]);
                for (i = 0; i < cat.length; i++) {
                    var data = {
                        GA_EventCategory: cat[i] || "",
                        GA_EventAction: action[i] || "",
                        GA_EventLabel: label[i] || "",
                        event: event
                    };
                    tagManager.sendData(data);
                }

                applicationLoginValidationPass($id_field.val(), $phone_field.val());
            }
            if (submit_form)
                validid ? $phone_field.focus():$id_field.focus();
            //var form = $('form#aspnetForm');
            //var validation_obj = window[$(this).data('validation_obj')];
            //if (!validation.is_vlidating()) {
            //    validation.apply_validation(form, validation_obj, function (form) {
            //        var queryString = "LoginOriginatingAction=ApplicationReportOrServiceLogin&identification=" + $("#login_identification").val() + "&phone=" + $("#login_phone_num").val();
            //        console.log("validation passed");
            //        utils.showIframePopup("login_user_details", queryString);
            //    });
            //}
            //form.submit();
            return false;
        }
        var validate_id = function ($field, name) {
            var value = $.trim($field.val());
            var valid = false;
            var placeholder = $field.attr("placeholder") !== undefined ? $.trim($field.attr("placeholder")) : '';
            if (value && value != "" && $.trim(value) != placeholder) {
                if (validation.check_id_number(value)) {
                    remove_error($field);
                    valid = true;
                } else {
                    valid = false;
                    set_error($field, login_validation.messages[name].legal_id, name);
                }
            } else {
                valid = false;
                set_error($field, login_validation.messages[name].required, name);
            }
            return valid;
        };
        var validate_phone = function ($field, name) {
            var value = $field.val();
            var valid = false;

            var placeholder = $field.attr("placeholder") !== undefined ? $.trim($field.attr("placeholder")) : '';
            if (value && value != "" && $.trim(value) != placeholder) {
                if (validation.checkLength(value, login_validation.rules[name].length)) {
                    remove_error($field);
                    valid = true;
                    if (validation.checkRegex(value, new RegExp("^(\\d+)$"))) {
                        var prefix = validation.get_valid_prefix(value, login_validation.rules[name].prefixes);
                        if (prefix) {
                            remove_error($field);
                            valid = true;
                        } else {
                            set_error($field, login_validation.messages[name].prefixes, name);
                            valid = false;
                        }
                    } else {
                        set_error($field, login_validation.messages[name].length, name);
                        valid = false;
                    }
                } else {
                    set_error($field, login_validation.messages[name].length, name);
                    valid = false;
                }
            } else {
                valid = false;
                set_error($field, login_validation.messages[name].required, name);
            }
            return valid;
        };
        var set_error = function ($field, text, name) {
            remove_error($field);
            $field.addClass('error');
            $field.attr('aria-describedby', name + '_error');
            $('<label id="' + name + '_error" class="error">' + text + '</label>').insertAfter($field);
        };
        var remove_error = function ($field) {
            $field.removeClass('error');
            $field.next('.error').remove();
        };
        var is_valid_phone_chars = function (val) {
            var objRegExp = new RegExp("^\d+(-\d+)?");
            return objRegExp.test(val);
        };
    } catch (err) {
        console.log("JS ERROR - validation_login");
        console.log(err);
    }
});
