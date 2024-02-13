define(["jquery", "utils", "api", "carousel", "elp", "validation", "internal/harel_common", "resize", 'libs/dust-core', 'libs/dust_etxend', 'libs/dust-helpers', "dust_compiled_templates", "framework"], function ($, utils, api, carousel, elp, validation) {
    try {
        var str;
        var render = function (err, data) {
            if (!err) {
                switch (data.Type) {
                case "Application":
                    var str = '';
                    //save the return object to global var
                    if (Harel.Config.Apps)
                        Harel.Config.Apps.push(data);
                    //remove the loader
                    $("#" + data.ContainerId).removeClass("application_loader");
                        $("#" + data.ContainerId).removeAttr("style");
                        $("#" + data.ContainerId).removeAttr("role");
                        $("#" + data.ContainerId).removeAttr("aria-live");
                        $("#" + data.ContainerId).removeAttr("aria-label");
                    if (data.SubType == "Application_NoPermissions") {
                        str = '<div id="error_bar" class="box white error-mess"><span><span class="alignment"><em></em></span>' + data.ErrorMsg + '<span class="error-text"></span></span></div>';
                        $("#" + data.ContainerId).append(str);
                    } else if (data.returnObject !== null) {
                        //set the search params dictionary
                        Harel.Config.SearchParams = data.returnObject.ApplicationParameters;
                        //set app url
                        var appUrl = $("#" + data.ContainerId + " a").attr("href") + data.returnObject.AppUrl;
                        //handle the rendering of the app
                        switch (data.SubType) {
                        case "Application_Iframe":
                                str = '<iframe scrolling="no" title="' + data.returnObject.Title + '" src="' + appUrl + '" id="' + data.returnObject.AppCode + '" allowTransparency="true" style="width:100%; height : ' + data.returnObject.ApplicationHeight + '" marginheight="0" marginwidth="0" frameborder="0"></iframe>';
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(str);
                                $container.addClass("hrl_app_rendered");
                                //scrolling
                                if (!data.returnObject.IsEnableScroll) {
                                    $("#" + data.ContainerId + " iframe").attr("scrolling", "no");
                                }
                                //min height to minime
                                if ($("#" + data.ContainerId + " iframe").parents(".boxmh_1").length > 0)
                                    $("#" + data.ContainerId + " iframe").css("min-height", "240px");
                            }
                            break;
                        case "Application_Self":
                            document.location.href = appUrl;
                            break;
                        case "Application_Blank":
                            window.open(appUrl, '', 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes');
                            break;
                        case "Authentication":
                            data.returnObject.category = [];
                            data.returnObject.label = [];
                            data.returnObject.action = [];
                            if (data.returnObject.GA_Events) {
                                $.each(data.returnObject.GA_Events, function (i, e) {
                                    data.returnObject.category.push(e.GA_EventCategory);
                                    data.returnObject.label.push(e.GA_EventAction);
                                    data.returnObject.action.push(e.GA_EventLabel);
                                });
                            }
                            data.returnObject.category = data.returnObject.category.join(";");
                            data.returnObject.label = data.returnObject.label.join(";");
                            data.returnObject.action = data.returnObject.action.join(";");
                            dust.render('applications_login', data.returnObject, function (err, out) {
                                var $container = $("#" + data.ContainerId);
                                if (!$container.hasClass("hrl_app_rendered")) {
                                    $container.append(out);
                                    $container.addClass("hrl_app_rendered")
                                    utils.Placeholders();
                                }
                                //Take user id and phone from search params if available
                                var params = data.returnObject.ApplicationParameters;
                                if (params) {
                                    var str = params["UserIdFromQuery"];
                                    if (str) {
                                        arr = str.split(',');
                                        if (arr)
                                            for (var i = 0; i < arr.length; i++) {
                                                if (validation.check_id_number(arr[i])) {
                                                    $container.find("#identification").val(arr[i]);
                                                    break;
                                                }
                                            }
                                    }
                                    str = params["PhoneNumberFromQuery"];
                                    if (str)
                                        $container.find("#mobile_number").val(str.split(',')[0]);
                                }
                            });
                            break;
                        }
                    }
                    break;
                case "Collective":
                    if (data.returnObject != null)
                        data.returnObject.OtherCollectiveText = Harel.Config.CollectivesNavigation.OtherCollectiveText;
                    switch (data.SubType) {
                    case "CollectiveLogin":
                        dust.render('collective_iframe', data.returnObject, function (err, out) {
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                                data.returnObject.url = "collectives/collective_login_content_captcha.html";
                                utils.Placeholders();
                                dust.render('collective_iframe', data.returnObject, function (err, out2) {
                                    $("#" + data.ContainerId + "2").append(out2);
                                    $(window).trigger('resizeInterval');
                                });
                            }
                        });
                        break;
                    case "CollectiveLoginNoIcon":
                        dust.render('collective_login_no_icon', data.returnObject, function (err, out) {
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                                utils.Placeholders();
                                $(window).trigger('resizeInterval');
                            }
                        });
                        break;
                    case "CollectiveMany":
                        dust.render('collective_many', data.returnObject, function (err, out) {
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                            }
                        });
                        break;
                    case "CollectiveNoProduct":
                        dust.render('collective_no_porduct', data.returnObject, function (err, out) {
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                            }
                        });
                        break;
                    case "CollectiveOne":
                        dust.render('collective_one', data.returnObject, function (err, out) {
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                                elp.ellipsis();
                            }
                        });
                        break;
                    case "Application_NoPermissions":
                        dust.render('applications_no_permissions', data, function (err, out) {
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                            }
                        });
                        break;
                    case "SelectCollective":
                        data.returnObject.display = data.SubType == "SelectCollective";
                        var collectiveElement = $("#" + data.ContainerId);
                        //support side column WP
                        if (collectiveElement.parent()[0] && collectiveElement.parent()[0].id == "side_column")
                            collectiveElement.wrap("<div class='box box1111'></div>");
                        if (collectiveElement.parent()[0] && collectiveElement.parent()[0].id != "side_column" && collectiveElement.parent()[0].id != "full_column") {
                            if(collectiveElement.parent()[0].id == "main_column")
                                collectiveElement.addClass("collective_search active white");
                            else
                                collectiveElement.parent().addClass("collective_search active white");
                        }
                        dust.render('collective_search', data.returnObject, function (err, out) {
                            var $container = collectiveElement;
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                                utils.Placeholders();
                            }
                        });
                        break;
                    case "CollectiveLogOnGeneral":
                    case "CollectiveLogOnSpecific":
                        dust.render('collective_iframe', data.returnObject, function (err, out) {
                            var $container = $("#" + data.ContainerId);
                            if (!$container.hasClass("hrl_app_rendered")) {
                                $container.append(out);
                                $container.addClass("hrl_app_rendered")
                            }
                        });
                        break;
                    }
                    break;
                case "InsuranceProducts":
                    //                            dust.render('insurence_plan', data, function (err, out) {
                    //                              $("#"+data.ContainerId ).append(out)
                    //                            });
                    break;
                case "RoofFundRoutes":
                    break;
                case "ExtensionsAndProducts":
                    if (typeof (data.returnObject) == "undefined" || data.returnObject === null || data.returnObject.length === 0) {
                        // if (data.returnObject.length === 0) {
                        $("#" + data.ContainerId).hide();
                    } else {
                        if ($("#" + data.ContainerId).hasClass("ajax_carousel")) {
                            dust.render('expansions', data, function (err, out) {
                                var $container = $("#" + data.ContainerId);
                                if (!$container.hasClass("hrl_app_rendered")) {
                                    $container.append(out);
                                    $container.addClass("hrl_app_rendered");
                                    carousel.carousel($("#" + data.ContainerId));
                                }
                            });
                        }
                    }
                    break;
                default:
                }
            }
        };
        return {
            render: render
        };
    } catch (err) {
        console.log("JS ERROR - ajax_render");
        console.log(err);
    }
});
