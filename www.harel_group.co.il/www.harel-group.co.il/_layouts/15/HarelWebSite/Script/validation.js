define(["jquery", "libs/jquery.validate"], function ($) {
    var validating = false;
    try {
        $.validator.addMethod("whitelist_chars", function (value, element) {
            if (value === '')
                return true;
            var regExp = (/^[A-Za-z\sא-ת.'"\-]+$/);
            var reg = $(element).data("whitelist");
            if (reg)
                regExp = new RegExp(reg);
            return regExp.test(value.trim());
        }, "אחד התווים אינו חוקי");
        $.validator.addMethod("legal_id", function (value, element) {
            return checkIdNumber(value.trim());
        }, "");
        $.validator.addMethod("legal_username", function (value, element) {
            return checkUserName(value.trim());
        }, "");
        $.validator.addMethod("legal_password", function (value, element) {
            return checkPassword(value.trim());
        }, "");
        $.validator.addMethod("selected", function (value, element) {
            return value ? value.trim() != "-1" : true;
        }, "");
        $.validator.addMethod("legal_email", function (value, element) {
            if (value === '')
                return true;
            var re = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            return re.test(value.trim());
        }, "");
        $.validator.addMethod("idUrUsername", function (value, element) {
            return checkIdNumber(value.trim()) ? true : checkUserName(value);
        }, "");
        $.validator.addMethod("digits", function (value, element) {
            if (value === '')
                return true;
            return (/^[0-9]+$/).test(value.trim());
        }, "ספרות בלבד");
        $.validator.addMethod("digits_plus", function (value, element) {
            return (/^[\\\/\(\)\.,\-0-9]+$/).test(value.trim());
        }, "ספרות בלבד");
        $.validator.addMethod("tel_and_area", function (value, element) {
            var area = $(element).parent().next().find('select');
            if (area.val() == -1 && value.length === 0) {
                return true;
            }
            return checkPhone(value.trim(), element);
        }, "");
        $.validator.addMethod("tel_and_area_required", function (value, element) {
            return checkPhone(value.trim(), element);
        }, "");
        $.validator.addMethod("prefixes", function (value, element, params) {
            return get_valid_prefix(value.trim(), params);
        }, "");
        $.validator.addMethod("postfix_length", function (value, element, params) {
            return valid_postfix_length(value, params)
        }, "");
        $.validator.addMethod("regex", function (value, element, params) {
            return checkRegex(value, params)
        }, "");
        $.validator.addMethod("phone_regex", function (value, element, params) {
            var regx = new RegExp("^(" + params.join("|") + ")(-)?(\\d+)?$");
            return checkRegex(value, regx)
        }, "");
        $.validator.addMethod("legal_phone", function (value, element, params) {
            return checkLegalPhone(value.trim(), element, params);
        }, "");
        $.validator.addMethod("length", function (value, element, params) {
            return checkLength(value, params);
        }, "");
        $.validator.addMethod("max_date", function (value, element, params) {
            var inputs = element.parentElement.parentElement.querySelectorAll("input");
            if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == '')
                return true;
            var date = new Date(inputs[2].value, inputs[1].value - 1, inputs[0].value);
            var isValid = date != null && date.getDate() == inputs[0].value && date.getMonth() === inputs[1].value - 1 && date.getYear() + 1900 == inputs[2].value && date <= new Date(params);
            //if (document.activeElement === element) {
            //    setTimeout(function () {
            //        var validator = $("form").validate();
            //        for (var i = 0; i < inputs.length; i++) {
            //            if (inputs[i].id !== element.id)
            //                validator.element('#' + inputs[i].id);
            //        }
            //    }, 0);
            //}
            return isValid;
        }, "תאריך לא תקין או מחוץ לטווח המותר");
        $.validator.addMethod("min_date", function (value, element, params) {
            var inputs = element.parentElement.parentElement.querySelectorAll("input");
            if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == '')
                return true;
            var date = new Date(inputs[2].value, inputs[1].value - 1, inputs[0].value);
            var isValid = date != null && date.getDate() == inputs[0].value && date.getMonth() === inputs[1].value - 1 && date.getYear() + 1900 == inputs[2].value && date >= new Date(params);
            //if (document.activeElement === element) {
            //    setTimeout(function () {
            //        var validator = $("form").validate();
            //        for (var i = 0; i < inputs.length; i++) {
            //            if (inputs[i].id !== element.id)
            //                validator.element('#' + inputs[i].id);
            //        }
            //    }, 0);
            //}
            return isValid;
        }, "תאריך לא תקין או מחוץ לטווח המותר");
        $.validator.addMethod("fill_all_date", function (value, element, params) {
            if (params) {
                var inputs = element.parentElement.parentElement.querySelectorAll("input");
                if (inputs[0].value == '' && inputs[1].value == '' && inputs[2].value == '' ||
                    inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != '')
                    return true;
                else
                    return false;
            }
            return true;
        }, "יש למלא את כל שדות התאריך");
        $.validator.addMethod("issue_date_cb", function (value, element, params) {
            if (params) {
                var inputs = element.parentElement.parentElement.querySelectorAll("input");
                if (inputs[0].value == '' && inputs[1].value == '' && inputs[2].value == '')
                    return true;
                else
                    return value;
            }
            return true;
        }, "אנא אשר את הפסקה לעיל");

        function stringToDate(value) {
            try {
                var split = value.replace(/[\\/-]/g, '.').split('.');
                if (split.length == 3)
                    return new Date(split[2], split[1] - 1, split[0])
            } catch (e) {

            }
            return null;
        }

        function checkRegex(value, regex) {
            return regex.test(value);
        }

        function checkLength(value, length) {
            return value.length == length;
        }
        function checkRangeLength(value, minLength) {
            
            return value.length >= minLength;
        }
        function valid_postfix_length(val, prefix_length_array) {
            var clean_val = val.replace(/-/g, "");
            var ret = false;
            $.each(prefix_length_array, function (i, obj) {
                prefix = get_valid_prefix(val, obj.prefixes)
                if (prefix && clean_val.substr(prefix.length).length == obj.length) {
                    ret = true;
                }
            });
            return ret;
        }

        function get_valid_prefix(val, prefix_array) {
            var ret = false;
            $.each(prefix_array, function (i, prefix) {
                if (val.indexOf(prefix) == 0) {
                    ret = prefix;
                }
            });
            return ret;
        }
        function checkDigits(value) {
            return (/^[\\\/\(\)\.,\-0-9]+$/).test(value.trim());
        }
       
        function checkPhone(value, element) {
            var num = $(element);
            var area = $(element).parent().parent().next().find('select');
            var area_len = area.val().length;
            if (area.val() == -1) {
                area.addClass("error");
                return false;
            } else {
                area.removeClass("error");
            }
            if (area_len == 4 && value.length != 6) {
                return false;
            }
            if (area_len < 4 && value.length != 7) {
                return false;
            }
            return true;
        }
        var login_validation;

        function checkLegalPhone(value, element, params) {
            $field = $(element);
            var name = $field.attr("name");
            var valid = false;
            var placeholder = $field.attr("placeholder") !== undefined ? $.trim($field.attr("placeholder")) : '';
            if (value && value != "" && $.trim(value) != placeholder) {
                var clean_val = (value.replace(/[^0-9]/g, ""));
                var clean_val_num = Number(clean_val);
                var min_length = Number(params.phone_rangelength[0]);
                var min = Number(params.phone_min);
                var max = Number(params.phone_max);
                if (min_length) {
                    if (clean_val.length >= min_length) {
                        if (clean_val_num >= min) {
                            if (clean_val_num <= max) {
                                valid = true;

                            } else {
                                valid = false;
                            }

                        } else {
                            valid = false;
                        }
                    } else {
                        valid = false;
                    }
                } else {
                    // valid = false;
                }
            }
            else {
                valid = false;
            }
            return valid;
        }
        $.validator.setDefaults({
            ignore: ".ignore",
            debug: true,
            highlight: function (element, errorClass, validClass) {
                $element = $(element);
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                }
                if (window.ie8 && $element.prop('type') == "password") {
                    $element.addClass(errorClass).removeClass(validClass);
                    if ($element.next('li')[0]) {
                        $element.next().addClass(errorClass).removeClass(validClass);
                    } else {
                        $element.addClass(errorClass).removeClass(validClass);
                    }
                } else {
                    $element.addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                $element = $(element);
                if (element.type === "checkbox") {
                    $(element).parents(".checkbox_holder").siblings(".error").remove();
                } else
                    if (element.type === "radio") {
                        $(element).parents(".radio_holder").siblings(".error").remove();
                    }
                if (window.ie8 && $element.prop('type') == "password") {
                    $element.removeClass(errorClass).addClass(validClass);
                    $element.next().removeClass(errorClass).addClass(validClass);
                } else {
                    $element.removeClass(errorClass).addClass(validClass);
                }
            },
            errorPlacement: function (error, $element) {
                if ($element.is(':radio')) {
                    error.insertAfter($element.parents(".radio_holder"));
                    return;
                }
                if ($element.is(':checkbox')) {
                    $element.parents(".checkbox_holder").append(error);
                    return;
                }
                if ((window.ie8 || window.ie9) && $element.prop('type') == "password") {
                    error.insertAfter($element.next());
                }
                else {
                    error.insertAfter($element);
                }
            },
            invalidHandler: function () {
            }
        });

        function checkUserName(value) {
            return (/^(?=.{4,25}$)([a-zA-Z][a-zA-Z0-9_]+([\.]?[a-zA-Z0-9_]+)?)$/).test(value);
        }

        function checkPassword(value) {
            return (/^[a-zA-Z0-9]*$/).test(value);
        }

        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }

        function checkIdNumber(value) {
            var strValue = pad(value, 9);
            var leng = strValue.length;
            var sum = 0;
            var mul = 1;
            if (leng === 0) {
                return true;
            }
            var strID = strValue;
            var objRegExp = new RegExp("[^0-9]", "g");
            if (objRegExp.test(strValue)) {
                return false;
            } else if ((leng > 9)) {
                return false;
            } else if ((leng < 9) && (leng >= 4)) //checking for leading zero
            {
                var addNull = 9 - leng;
                var addn = "0";
                for (i = 1; i <= addNull - 1; i++)
                    addn = addn + "0";
                strID = addn + value;
                leng = strID.length;
            } else {
                if (leng < 4) {
                    return false;
                }
            }
            //----- Algorithm CheckID Number ---------------------------------------
            for (var i = 0; i < leng; i++) {
                sum2 = (mul * (1 * (strID.substr(i, 1))));
                if (sum2 > 9)
                    sum2 = sum2 - 9;
                sum = sum + sum2;
                mul = 3 - mul;
            }
            sum = sum % 10;
            var result = 10 - sum;
            if (result == 10)
                result = 0;
            if ((1 * (strID.substr(i, 1))) != result) {
                return false;
            }
            return true;
        }
        $(document).on('change', ".standard_form select", null, function (event) {
            var form = $(event.target).parents("form");
            if (form && validating)
                form.validate().element("#" + $(event.target).attr("id"));
        });
        $(document).on('change', ".standard_form input:radio", null, function (event) {
            //        var form = $(event.target).parents("form");
            //        if (form.length > 0) {
            //            form.validate().element("#" + $(event.target).attr("id"));
            //        }
        });
        $(document).on('change', ".standard_form input:checkbox", null, function (event) {
            var form = $(event.target).parents("form");
            if (form && validating) {
                form.validate().element("#" + $(event.target).attr("id"));
            }
        });

        function copyIdToName() {
            $(".standard_form input,.standard_form select ,.standard_form textarea").each(function (i, e) {
                if ($(e).attr('data-name')) {
                    $(e).attr('data-name_save', $(e).attr("name"));
                    $(e).attr("name", $(e).data("name"));
                }
                if ($(e).attr('readonly')) {
                    $(e).removeAttr('readonly');
                    $(e).attr('readonly_tmp', "1");
                }
            });
        }

        function restoreName() {
            $(".standard_form input,.standard_form select,.standard_form textarea").each(function (i, e) {
                if ($(e).attr('data-name_save')) {
                    $(e).attr("name", $(e).attr('data-name_save'));
                }
                if ($(e).attr('readonly_tmp')) {
                    $(e).removeAttr('readonly_tmp');
                    $(e).attr('readonly', "1");
                }
            });
        }

        function apply_validation(form, validation_obj, success, failure) {
            if (!validation_obj || typeof validation_obj == "undefined") {
                return;
            }
            validating = true;
            copyIdToName();
            validation_obj.submitHandler = function () {
                restoreName();
                if (success)
                    success(form);
            };
            validation_obj.invalidHandler = function () {
                if (failure)
                    failure(form);
            };

            form.validate(validation_obj);
        }
        var ret = {
            apply_validation: apply_validation,
            contact: apply_validation,
            mail: apply_validation,
            validate: apply_validation,
            login_validation: apply_validation,
            check_id_number: checkIdNumber,
            is_vlidating: function () {
                return validating;
            },
            get_valid_prefix: get_valid_prefix,
            valid_postfix_length: valid_postfix_length,
            checkRegex: checkRegex,
            checkLength: checkLength,
            checkRangeLength: checkRangeLength,
            checkDigits: checkDigits
        };
        window.harel_portal_validation = ret;
        return ret;
    } catch (err) {
        console.log("JS ERROR - validation");
        console.log(err);
    }
});
