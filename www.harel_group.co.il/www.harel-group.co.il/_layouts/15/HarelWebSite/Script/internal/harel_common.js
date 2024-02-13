window.Harel = window.Harel || {};
var Harel = window.Harel;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Lobby - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ul = document.querySelectorAll(".dps_ul>li");
for (var i = 0; i < ul.length; i++) {
    if (ul[i].querySelector("a").attributes['href'].value != "") {
        if (ul[i].querySelector(".dps_a") != null)
            ul[i].querySelector(".dps_a").style.display = 'flex';
    }
}


var strips = document.querySelectorAll(".strip");
for (var i = 0; i < strips.length; i++) {
    var box = strips[i].querySelectorAll(".stripbox");
    var max = Number.MIN_VALUE;
    for (var j = 0; j < box.length; j++) {
        if (box[j].clientHeight == 0)
            box[j].style.marginBottom = 0;
        if (box[j].clientHeight > max) {
            max = box[j].clientHeight;
        }
    }
    if (max != Number.MIN_VALUE)
        for (var j = 0; j < box.length; j++) {
            box[j].style.minHeight = max + "px";
        }
}
window.GetToken = function (isCreateToken) {
    var newToken = isCreateToken || !sessionStorage.getItem("tokenMF");
    $.ajax({
        type: "GET",
        url: "/_vti_bin/webapi/Token/GetToken/Token_Customers?isCreateToken=" + isCreateToken,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != null)
                sessionStorage.setItem('tokenMF', result.access_token);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Post Messaging - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
try {
    if (window.addEventListener)
        window.addEventListener("message", receiveMessage);
    else if (window.attachEvent)
        window.attachEvent("onmessage", receiveMessage);
    else
        window["onmessage"] = receiveMessage;
}
catch (err) { }

window.MobileAndTabletCheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function Redirect(url) {
    message = "<PostData><Action>Redirect</Action><Params><Url>" + url + "</Url></Params></PostData>";
    PostMsg_Post(message);
}

function OtherCollective() {
    ChangeView("select_collective");
}

function ChangeView(view) {
    message = "<PostData><Action>ChangeView</Action><Params><View>" + view + "</View></Params></PostData>";
    PostMsg_Post(message);
}
function DisplayPleaseWait() {
    $(".please_wait").show();
    $(".login_content").hide();
    $(".popup-bottom").hide();
}
function getFrameID(event) {
    var frames = document.getElementsByTagName('iframe'),
        frameId = 0,
        framesLength = frames.length;

    for (; frameId < framesLength; frameId++) {
        if (frames[frameId].contentWindow === event.source) {
            //return frames[frameId];
            return frames[frameId].id;
        }
    }

    return null;
}
function IsHarelDomain(origin) {
    var hrlDomains = ["hrl.co.il", "harel-ext.com", "harel-ins.co.il", "harel-group.co.il", "10.40.101.40", "harel-net.co.il", "harel-office.com"];
    hrlDomains.push(window.location.host);
    var separatesubdom = origin.split('.');
    separatesubdom.shift();
    origin = separatesubdom.join('.');
    for (var i = 0; i < hrlDomains.length; i++)
    {
        if (origin == hrlDomains[i]) return true;
    }
    return false;
}

function receiveMessage(event) {

    try {
        //only if from harel web sites
        if (!IsHarelDomain(event.origin.toLowerCase()))
            return;

        var appId = getFrameID(event);
        var data = event.data;

        var replace = new Array('"', "&", "'");
        var by = new Array('&quot;', '&amp;', '&apos;');
        if (data != null) {
            for (var i = 0; i < replace.length; i++) {
                data = data.replace(new RegExp(replace[i], "g"), by[i]);
            }
        }

        var pmData = $.parseXML("<?xml version='1.0'?>" + data);

        switch ($(pmData).find("Action").text()) {
            case "PortalAction":
                {
                    //action name
                    var actionName = $(pmData).find("Params actionName").text();
                    if (actionName == "")
                        actionName = $(pmData).find("ActionName").text();
                    switch (actionName) {
                        case "UpdatePersonalMessages": {
                            $.ajax({
                                type: "GET",
                                url: "/_vti_bin/webapi/PortalActions/UpdatePersonalMessages/",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                    if (result > 0) {
                                        //update
                                        $(".mail_tag").text(result);
                                    }
                                    else {
                                        //hide mail tag
                                        $(".mail_tag").hide();
                                    }
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {

                                }
                            });
                            break;
                        }
                        case "GetSearchParams": {
                            //
                            var isLastSearch = $(pmData).find("IsLastSearch").text();
                            var isAppFromSearch = GetURLParameter($("iframe#" + appId).attr("src"), "isfromsearch");

                            //the app came from last search
                            if ($("iframe#" + appId).length > 0) {
                                if (isAppFromSearch == "1" && (isLastSearch == "1" || isLastSearch == ""))
                                    $("iframe#" + appId)[0].contentWindow.postMessage(JSON.stringify(Harel.Config.SearchParams), "*");
                                //the app wants the search params regardless to the last search
                                else if (isLastSearch == "0")
                                    $("iframe#" + appId)[0].contentWindow.postMessage(JSON.stringify(Harel.Config.SearchParams), "*");
                            }
                            break;
                        }
                        case "WriteActionLog": {
                            var data = $(pmData).find("data").text();
                            var replace = new Array('&quot;', '&amp;', '&apos;');
                            var by = new Array('"', "&", "'");
                            if (data != null) {
                                for (var i = 0; i < replace.length; i++) {
                                    data = data.replace(new RegExp(replace[i], "g"), by[i]);
                                }
                            }
                            $.ajax({
                                type: "POST",
                                url: "/_vti_bin/webapi/PortalActions/WriteActionLog/",
                                contentType: "application/json; charset=utf-8",
                                data: data,
                                dataType: "json"
                            });
                            break;
                        }
                        case "HandleOpenCalls": {
                            var isClose = $(pmData).find("isClose").text();
                            var loginSourceCode = $(pmData).find("loginSourceCode").text();
                            $.ajax({
                                type: "POST",
                                url: "/_vti_bin/webapi/PortalActions?isClose=" + isClose + "&loginSourceCode=" + loginSourceCode,
                                contentType: "application/json; charset=utf-8",
                                dataType: "json"
                            });

                            break;
                        }
                        case "UpdateDetails": {
                            $.ajax({
                                type: "POST",
                                url: "/_vti_bin/webapi/PortalUserActions/UpdateDetails/",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                }
                            });
                            break;
                        }
                        case "AddSurgeonsAction": {

                            //var data = $(pmData).find("data").text();
                            $.ajax({
                                type: "POST",
                                url: "/surgeons/_vti_bin/webapi/ElasticLog/AddSurgeonsAction/",
                                contentType: "application/json; charset=utf-8",
                                // data: data,
                                dataType: "json",
                                success: function (result) {
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                }
                            });
                            break;
                        }
                    }
                    break;
                }
            case "GTMEvent":
                {
                    if ($(pmData).find("Params Click") && $(pmData).find("Params Click").text() != '') {
                        var eventName = $(pmData).find("Params Click").text();
                        dataLayer.push({
                            'GA_iframeName': appId,
                            'GA_iframeID': appId,
                            'GA_iframeLocation': '1',
                            'event': eventName
                        });
                    }
                }
            case "Resize":
                {
                    //Resize
                    var height = $(pmData).find("Params Height").text();
                    //console.info("app: " + appId + ". message: " + data);
                    //check if it is not static height
                    //var isStaticHeight = GetURLParameter($("iframe#" + appId).attr("src"), "isstaticheight");
                    //if (isStaticHeight != "true" && height > 0)
                    //    $("iframe#" + appId).height(height);
                    if (height >= 0)
                        $("iframe#" + appId).height(height);

                    //only for search result page - we resize rhe cube next to the minime
                    if ($(".search_results_page").length > 0 || (".resize_elements").length > 0)
                        window.harel_portal_utils.resizeSecond();
                    break;
                }
            case "Scroll":
                {
                    if ($(pmData).find("Params ScrollTo") && $(pmData).find("Params ScrollTo").text() != '') {
                        var toElemId = $(pmData).find("Params ScrollTo").text();
                        if (toElemId != null && toElemId == 'Myself') {
                            //scroll to top ifame
                            $('html, body, #s4-workspace').animate({
                                scrollTop: $("#" + appId).offset().top
                            }, 500);
                        }
                        else if ($("#" + toElemId).length > 0) {
                            //scroll to top elementId
                            $('html, body, #s4-workspace').animate({
                                scrollTop: $("#" + toElemId).offset().top
                            }, 500);
                        }
                        else {
                            // no element id found
                        }
                    }
                    else {
                        //scroll to top page
                        $('html, body, #s4-workspace').animate({
                            scrollTop: 0
                        }, 500);
                    }
                    break;
                }
            case "ScrollToHeight":
                {
                    if ($(pmData).find("Params ScrollTo") && $(pmData).find("Params ScrollTo").text() != '') {
                        var elemIdtop = parseInt($(pmData).find("Params ScrollTo").text());
                        if (elemIdtop != null) {
                            var scrollToHeight = $("#" + appId).offset().top + elemIdtop;

                            $('html, body, #s4-workspace').animate({
                                scrollTop: scrollToHeight + 'px'
                            }, 500);
                        }
                      
                        else {
                            // no element id found
                        }
                    }
                    else {
                        //scroll to top page
                        $('html, body, #s4-workspace').animate({
                            scrollTop: 0
                        }, 500);
                    }
                    break;
                }
            case "Redirect":
                {
                    //redirect
                    var url = $(pmData).find("Params Url").text();
                    if (url.indexOf("javascript") > -1)
                        return;
                    window.location.href = url;
                    break;
                }           
            case "OpenTab":
                {
                    //open tab
                    var url = $(event.data).find("Params Url").text();
                    if (url.indexOf("javascript") > -1)
                        return;
                    window.open(url);
                    break;
                }
            case "GeneralResize":
                {
                    //Resize
                    var height = $(event.data).find("Params Height").text();
                    var iframeId = $(event.data).find("Params IframeId").text();
                    $("iframe#" + iframeId).height(height);
                    break;
                }
            case "CloseMagnificPopup":
                {
                    //get caller frame id
                    var frameID = event.source.frameElement.id;
                    $('#' + frameID).attr("src", "");
                    var frame = document.getElementById(frameID),
                        frameDoc = frame.contentDocument || frame.contentWindow.document;
                    frameDoc.removeChild(frameDoc.documentElement);
                    $.magnificPopup.instance.close();
                    break;
                }
            case "CloseAndRefreshMagnificPopup":
                {
                    //get caller frame id
                    var frameID = event.source.frameElement.id;
                    $('#' + frameID).attr("src", "");

                    window.location.href = window.location.pathname + window.location.search;
                    break;
                }
            case "CloseMagnificPopupAndRedirect":
                {
                    //get caller frame id
                    //var frameID = event.source.frameElement.id;
                    //$('#' + frameID).attr("src", "");

                    var url = $(pmData).find("Params Url").text();
                    window.location.href = url;

                    //$.magnificPopup.instance.close();

                    break;
                }
            case "ClosedPopup": {
                var frameID = event.source.frameElement.id;
                var $frame = $('#' + frameID);
                $frame.closePopup();
                break;
            }
            case "CloseModalDialog":
                {
                    var xml = $.parseXML(event.data)
                    var value = $(xml).find("Params Value").text();
                    if (value == '' || value == undefined)
                        SP.UI.ModalDialog.commonModalDialogClose();
                    else
                        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, value);
                    break;
                }
            case "LogoutPopupSetTimeOut":
                {
                    setTimeout(function () {
                        window.harel_portal_utils.showIframePopup('logout_popup');
                    }, SessionTimeoutParam);
                    break;
                }
            case "LogoutCustomersPopupSetTimeout":
                {
                    setTimeout(function () {
                        $('.customers_logoutpopup').click();
                    }, SessionTimeoutParam);
                    break;
                }
            case "ChangeView"://todo!
                {
                    $("#CollectiveIframe").hide();
                    break;
                }
            case "HideAnotherOrgLink":
                {
                    $(".another-org").hide();
                    break;
                }
            case "ShowAnotherOrgLink":
                {
                    $(".another-org").show();
                    break;
                }
            case "ShowCaptcha":
                {
                    $(".collective_navigation_container").addClass("captcha_login");
                    window.resize_iframe();
                    break;
                }
            case "ResizeCollectiveIframe":
                {
                    //window.resize_iframe();
                    $('.iframe_collective').css('height', 270);
                    break;
                }
            case "HideLoading":
                {
                    $("#login_user_details #login-popup").hide();
                    $("#login_user_details #loginIframe").show();
                    //$(".first-input-login").focus();
                    break;
                }
            case "HideLoadingEmployers":
                {
                    if ($("#popup_login_form #popup_login_form_iframe").length > 0) {
                        $("#popup_login_form #login-popup").hide();
                        $("#popup_login_form #popup_login_form_iframe").show();
                    }

                    if ($("#popup_change_password #popup_change_password_iframe").length > 0) {
                        $("#popup_change_password #login-popup").hide();
                        $("#popup_change_password #popup_change_password_iframe").show();
                    }

                    if ($("#popup_company_login #company_login_iframe").length > 0) {
                        $("#popup_company_login #login-popup").hide();
                        $("#popup_company_login #company_login_iframe").show();
                    }
                    //$(".first-input-login").focus();
                    break;
                }
            case "HideLoadingCollective":
                {
                    $(".collective_iframe_holder, .collective_navigation_container").removeClass("loading");
                    break;
                }
            case "UpdateAccessabilityEvent":
                {
                    window.accessability();
                    break;
                }
            case "ShowPopup":
                {
                    var iframeId = $(pmData).find("IframeId").text();
                    window.harel_portal_utils.showIframePopup(iframeId, '', false);
                    break;
                }
            case "ShowOTPTinyEmp": {
                var mobile = $(pmData).find('Mobile').text();
                var cn = $(pmData).find('CN').text();
                var jsonData = {
                    "AuthType": "TinyEmployer",
                    "CompanyId": cn,
                    "UserSecret": mobile,
                    "Action": "New"
                };
                $.ajax({
                    type: "POST",
                    url: "/_vti_bin/webapi/EmployersAuthentication",
                    data: JSON.stringify(jsonData),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result != null && result.NeededEntity == "EntityAuthenticationOTP")
                            window.harel_portal_utils.showIframePopup('otPopup', '', true);
                    }
                });
                break;
            }
            case "otpLoaded": {
                $('#otPopup .loading').hide();
                $('#otPopup iframe').show();
                break;
            }
            case "otpClosed": {
                var $frame = $('#otPopup iframe');
                $frame.closePopup();
                break;
            }
            case "CustomersAuth": {
                var actionId = $(pmData).find("Params ActionId").text();
                var params = $(pmData).find("Params");
                var jsonData = {};
                for (var i = 0; i < params.children().length; i++) {
                    jsonData[params.children()[i].nodeName] = params.children()[i].textContent;
                }
                $.ajax({
                    type: "POST",
                    url: "/_vti_bin/webapi/CustomersAuthentication/PostAuthenticate/" + actionId,
                    data: JSON.stringify(jsonData),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var responseData = {};
                        responseData[actionId] = result;
                        event.source.postMessage(responseData, "*");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("error", errorThrown);
                    }
                });

            }
            case "UpdateBotCallData": {
                var botId = $(pmData).find("Params ID").text();
                var data = "{'botId':'" + botId + "'}";
                UpdateBotCallData(data);
            }
        }
    }
    catch (ex) { }
}
function UpdateBotCallData(botData) {
    $.ajax({
        type: "POST",
        url: "/_vti_bin/webapi/Bot/PostBotData",
        data: botData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("error", errorThrown);
        }
    });
}

function GetURLParameter(url, sParam) {
    var sPageURL;
    if (url != "")
        sPageURL = url;
    else
        sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function HandlePopup(action, link) {
    var message, call;
    switch (action) {
        case "OpenUrl":
            if (link != '' && link != undefined) {
                message = "<PostData><Action>OpenTab</Action><Params><Url>" + link + "</Url></Params></PostData>";
                PostMsg_Post(message);
            }
            break;

        case "OpenUrlByTag":
            if (link != '' && link != undefined) {
                var target = $(link).attr("target");
                var url = $(link).attr("href");
                if (url != '' && url != undefined) {
                    if (target == "_self")
                        call = "Redirect";
                    else
                        call = "OpenTab";

                    message = "<PostData><Action>" + call + "</Action><Params><Url>" + url + "</Url></Params></PostData>";
                    PostMsg_Post(message);
                }
            }
            break;

        case "Close":
            message = "<PostData><Action>CloseMagnificPopup</Action></PostData>";
            PostMsg_Post(message);
            break;
    }
    return false;
}

function PostMsg_Post(msgXml) {
    var objIframe = window.parent;
    if (objIframe != undefined && objIframe != null) {
        objIframe.postMessage(msgXml, "*");
    }
}

function UpdateQueryString(queryString, key, newValue) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    if (queryString.match(re)) {
        return queryString.replace(re, '$1' + key + '=' + newValue + '$2');
    } else {
        var separator = queryString.indexOf('?') !== -1 ? "&" : "?";
        return queryString + separator + key + "=" + newValue;
    }
}


function removeParameter(url, parameter) {
    var urlparts = url.split('?');

    if (urlparts.length >= 2) {
        var urlBase = urlparts.shift(); //get first part, and remove from array
        var queryString = urlparts.join("?"); //join it back up

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = queryString.split(/[&]/g);
        for (var i = pars.length; i-- > 0;)               //reverse iteration as may be destructive
            if (pars[i].lastIndexOf(prefix, 0) !== -1)   //idiom for string.startsWith
                pars.splice(i, 1);
        url = urlBase + '?' + pars.join('&');
    }
    return url;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Post Messaging - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// Print //////////
Harel.PrintPage = function (url, msg) {
    var wnd = window.open(url, "_blank");
    $(wnd.document).find("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + window.location.origin + "/_layouts/15/HarelWebSite/1037/Css/popup_style.css\" />");
    $(wnd.document).find("body").html("&nbsp;<div id=\"login-popup\" class=\"popup actions\" ><div class=\"popup-top\"><div class=\"popup-top please_wait\" id=\"PleaseWait\"><div class=\"popup_table popup_box\"><div class=\"conten_block\"><span>" +
        msg +
        "</span><img src=\"" + window.location.origin + "/_layouts/15/HarelWebSite/1037/img/Loading_40x40.gif\"></div></div></div></div></div>");
}

//////// Logout Popup - begin//////////

Harel.LogoutPopup = {
    LogoutClick: function () {
        var msgRedirect = "<PostData><Action>Redirect</Action><Params><Url>/_layouts/15/HarelWebSite/ApplicationPages/HarelAuthenticate.aspx?ActionSource=LogOut</Url></Params></PostData>";
        PostMsg_Post(msgRedirect);

        var msgClose = "<PostData><Action>CloseMagnificPopup</Action></PostData>";
        PostMsg_Post(msgClose);
    },

    ContinueClick: function () {
        var url = window.location.href;
        var msgSetTimeOut = "<PostData><Action>Redirect</Action><Params><Url>" + url + "</Url></Params></PostData>";
        PostMsg_Post(msgSetTimeOut);

        var msgClose = "<PostData><Action>CloseMagnificPopup</Action></PostData>";
        PostMsg_Post(msgClose);
    },
    sites_OpenPopup: function () {
        $.magnificPopup.open({
            items: {
                closeOnBgClick: false,
                src: '#logout-popup',
                type: 'inline',
                showCloseBtn: false
            }
        }, 0);
    },

    sites_LogoutClick: function () {
        var msgRedirect = "<PostData><Action>Redirect</Action><Params><Url>" + portal_domain + "/_layouts/15/HarelSuppliers/ApplicationPages/logout.aspx?ActionSource=LogOut</Url></Params></PostData>";
        PostMsg_Post(msgRedirect);

        var msgClose = "<PostData><Action>CloseMagnificPopup</Action></PostData>";
        PostMsg_Post(msgClose);
    },

    sites_ContinueClick: function () {
        var url = window.location.href;
        var msgSetTimeOut = "<PostData><Action>Redirect</Action><Params><Url>" + url + "</Url></Params></PostData>";
        PostMsg_Post(msgSetTimeOut);

        var msgClose = "<PostData><Action>CloseMagnificPopup</Action></PostData>";
        PostMsg_Post(msgClose);
    }
};

//////// Logout Popup - END//////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Page Properties - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    $('.hiddenDiv').css('display', 'none');
    $('#txtAreaSeoMetaDescription').val($('.tfSeoMetaDescription').val());



});

Harel.PageProperties = {
    TextChange: function () {
        $('.tfSeoMetaDescription').val($('#txtAreaSeoMetaDescription').val().replace(new RegExp('\n', 'g'), ' '));
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Page Properties - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              General - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {




    var referrer = $("#Referrer");
    if (typeof (referrer) !== 'undefined') {
        referrer.val(window.parent.location.pathname);
    }

    //tool tips
    LoadTooltips();

    //rich html editor
    $(".ms-rtestate-write").attr({
        PrefixStyleSheet: 'harelstyle'
    });

    //Set a tel href for all phone link instead of the one SharePoint removes
    $("a.phoneHtmlStyle").each(function (link) { $(this).attr("href", "tel:" + $(this).text()); });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              General - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               DictionaryWP - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {

    if (typeof terms != "undefined") {

        var currentItemIndex;
        for (var i = 0; i < terms.Terms.length; i++) {
            if (terms.Terms[i].Enabled) {
                currentItemIndex = i;
                break;
            }
        }

        if (currentItemIndex != 'undefined') {
            ;

            //add class current to selected term letter
            $($(".alphaabet li")[currentItemIndex]).addClass("current");
            $($(".alphaabet li a")[currentItemIndex]).attr("aria-pressed", true);
            $(".alphaabet li[class='disabled']").attr("aria-disabled", true);
            $(".alphaabet li.disabled a").attr("aria-disabled", true);

            if (terms.Terms.length > 0) {
                var selectedLetter = $(".alphaabet li.current a").text();
                for (var i = 0; i < terms.Terms.length; i++) {
                    var letter = terms.Terms[i].Letter;
                    if (letter == selectedLetter) {
                        //get all terms for the selected letter
                        var selectedLetterTerms = terms.Terms[i].Glossary;
                        if (selectedLetterTerms != null) {
                            $("#collapse_cagtegory").append("<ul></ul>");

                            //for (var j = 0; j < terms.Terms[i].Glossary.length; j++) {
                            for (var k = 0; k < selectedLetterTerms.length; k++) {

                                var dictionary = selectedLetterTerms[k];
                                var termID = dictionary.TermId;
                                var termHeader = "<li class=\"accordionClick\" termid=\"" + termID + "\"><em></em>" +
                                    "<a role=\"" + "button" + "\" href=\"#" + dictionary.TermId + "\">" + dictionary.Expression + "</a></li>";

                                var MoreInfoUrl = "";
                                if (selectedLetterTerms[k].MoreInfoUrl != null)
                                    var MoreInfoUrl = "<a title='" + selectedLetterTerms[k].MoreInfoUrl.Text + "' class='bid' target='" + selectedLetterTerms[k].MoreInfoUrl.Target + "' href='" + selectedLetterTerms[k].MoreInfoUrl.NavigateUrl + "'>" + selectedLetterTerms[k].MoreInfoUrl.Text + "<em>&nbsp;</em></a>"

                                var termContent = "<li class=\"accordionContent\"><div id=\"term_" + dictionary.TermId + "\" class=\"question-content richtext\"><p>" + dictionary.Description + "</p>" + MoreInfoUrl + "</div>";

                                $("#collapse_cagtegory > ul").append(termHeader);
                                $("#collapse_cagtegory > ul").append(termContent);

                                if (termID != undefined) {
                                    var termContentLI = $("li.accordionClick[termid=\"" + termID + "\"]").next();
                                    termContentLI.html("<div class='question-content richtext'><p>" + selectedLetterTerms[k].Description + "</p>" + MoreInfoUrl + '</div>');
                                    //termContentLI.prev().addClass(" on");
                                    //termContentLI.css("display", "list-item");
                                }
                            }
                            //}
                        }
                        //$("#collapse_cagtegory li a:first").focus();

                        ////after the last term, set focus to next letter
                        //$("#collapse_cagtegory .accordionClick:last a").on("blur", function () {
                        //    $(".alphaabet li.current").nextUntil().not(".disabled").find("a").first().focus();
                        //});

                        break;
                    }
                }
            }
        }

        //change the selected letter class
        $(".alphaabet li").not(".disabled").click(function () {
            $(".alphaabet li[class='current']").removeClass("current");
            $(".alphaabet li a[aria-pressed='true']").removeAttr("aria-pressed");
            $(this).addClass("current");
            $(this.children).attr("aria-pressed", true);
            //fill the terms headers by the selected letter
            if (terms.Terms.length > 0) {
                var selectedLetter = $(".alphaabet li.current a").text();
                for (var i = 0; i < terms.Terms.length; i++) {
                    var letter = terms.Terms[i].Letter;
                    if (letter == selectedLetter) {

                        $("#collapse_cagtegory > ul").html("");

                        for (var j = 0; j < terms.Terms[i].Glossary.length; j++) {
                            var dictionary = terms.Terms[i].Glossary[j];
                            if (dictionary.Description != null) {
                                var termHeader = "<li class=\"accordionClick\" termid=\"" + dictionary.TermId + "\"><em></em>" +
                                    "<a role=\"" + "button" + "\" href=\"#" + dictionary.TermId + "\">" + dictionary.Expression + "</a></li>";

                                var MoreInfoUrl = "";
                                if (dictionary.MoreInfoUrl != null)
                                    var MoreInfoUrl = "<a title='" + dictionary.MoreInfoUrl.Text + "' class='bid' target='" + dictionary.MoreInfoUrl.Target + "' href='" + dictionary.MoreInfoUrl.NavigateUrl + "'>" + dictionary.MoreInfoUrl.Text + "<em>&nbsp;</em></a>"

                                var termContent = "<li class=\"accordionContent\"><div id=\"term_" + dictionary.TermId + "\" class=\"question-content richtext\"><p>" + dictionary.Description + "</p>" + MoreInfoUrl + "</div>";


                                $("#collapse_cagtegory > ul").append(termHeader);
                                $("#collapse_cagtegory > ul").append(termContent);
                            }
                        }
                        //set focus to first term
                        $("#collapse_cagtegory li a:first").focus();

                        //after the last term, set focus to next letter
                        $("#collapse_cagtegory .accordionClick:last a").on("blur", function () {
                            $(".alphaabet li.current").nextUntil().not(".disabled").find("a").first().focus();
                        });

                        break;
                    }
                }
            }
        });

        //afte the last letter, set focus to footer (Prevent endless loop)
        var lastLiLetter = $(".alphaabet li").not(".disabled").last();
        lastLiLetter.find("a").on("blur", function () {
            if (lastLiLetter.attr("class") != "current")
                $("#footer a:first").focus();
        });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               DictionaryWP - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               ContactUS WP - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    //lock category ddl
    if ($("select#category").hasClass('disabled'))
        $("select#category").selectbox({}).selectbox("disable");

    //set selected value after postback
    if ($('#HiddSelectedTopic') && $('#HiddSelectedTopic').val())
        ApplicationSubjects.subjectSelectedDefaultVal = Number($('#HiddSelectedTopic').val());

    //set required validator for tel ddl when typing tel on input
    $('#tel').change(function () {
        if ($('#tel').val()) {
            validation_obj.rules[$('#tel_area_code').attr('name')].selected = true;
            if ($.data($('#aspnetForm')[0], "validator"))
                $.data($('#aspnetForm')[0], "validator").settings.rules[$('#tel_area_code').attr('name')].selected = true;
        }
        else {
            validation_obj.rules[$('#tel_area_code').attr('name')].selected = false;
            if ($.data($('#aspnetForm')[0], "validator")) {
                $.data($('#aspnetForm')[0], "validator").settings.rules[$('#tel_area_code').attr('name')].selected = false;
                $('.select_box label').remove();
                $('.select_box .sbHolder.error').removeClass('error');
            }
        }
    });

    var ddlApplicationFields = $("select[id*='ddlApplicationFields']");
    if (ddlApplicationFields.length > 0) {
        ddlApplicationFields.change(function () {

        });

    }
    if (typeof (captchaValid) != "undefined" && captchaValid == false) {
        var captcha_label = "<label id='captcha_text-error' class='error'>" + validation_obj.messages[$('#contact_form .capcha_input').attr('name')].valueValidation + "</label>";
        $(".capcha_input_container input").after(captcha_label);

        var elmnt = document.getElementById("contact_form");
        if (elmnt != null) {
            elmnt.scrollIntoViewIfNeeded();
        }

    


    }

    
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               ContactUS WP - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Tabs - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Harel.AutosizeDialog = function () {
    //resize dialog if we are in one
    var dlg = typeof (SP.UI.ModalDialog.get_childDialog) == "function" ? SP.UI.ModalDialog.get_childDialog() : null;
    if (dlg != null) {
        dlg.autoSize();
        var dlgWin = $(".ms-dlgContent", window.parent.document);
        dlgWin.css({
            top: ($(window.top).height() / 2 - dlgWin.height() / 2) + "px",
            left: $(window.top).width() / 2 - dlgWin.width() / 2
        });
    }
}

Harel.Tabs = {
    SetSelected: function (tabHash, saveCookie) {
        $('#hOpenTab').val(tabHash);
        if (saveCookie)
            $.cookie('HarelOpenTab', tabHash, { expires: 365 });
    },
    ActiveSelected: function () {
        if (window.tabs_ready) {
            var HarelOpenTab = $.cookie('HarelOpenTab');
            $('.tabs').find("a[href = '" + HarelOpenTab + "']").click();
        } else {
            $(window).bind('tabs_ready', function () {
                var HarelOpenTab = $.cookie('HarelOpenTab');
                $('.tabs').find("a[href = '" + HarelOpenTab + "']").click();
            });

        }



    }

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Tabs - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               CustomLink - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Harel.CustomLink = {

    ValidateLink: function (oSrc, args) {
        var url = $(oSrc.parentElement).find('.CustomLinkUrl').val();
        var text = $(oSrc.parentElement).find('.CustomLinkText').val();
        var target = $(oSrc.parentElement).find('.CustomLinkTarget :checked');
        var toolTip = $(oSrc.parentElement).find('.CustomLinkToolTip').val();
        if (url == '' && (text != '' || target.length > 0 || toolTip != ''))
            args.IsValid = false;
        else
            args.IsValid = true;
    },
    ValidateLinkExtention: function (oSrc, args) {
        var url = $(oSrc.parentElement).find('.CustomLinkUrl').val();
        var text = $(oSrc.parentElement).find('.CustomLinkText').val();
        var target = $(oSrc.parentElement).find('.CustomLinkTarget :checked');
        var toolTip = $(oSrc.parentElement).find('.CustomLinkToolTip').val();
        if ((url == '' && text != '') || (url != '' && text == ''))
            args.IsValid = false;
        else
            args.IsValid = true;
    }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               CustomLink - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               SimpleAccumulator - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Harel.SimpleAccumulator =
    {
        Indexes: {},
        GetItems: function (category, gIndex, groupByCategory) {
            var currentDiv = $(".box.aShowMore").eq(gIndex);
            //hide text and show loading
            currentDiv.find("a").hide().attr("aria-expanded", "true");;
            currentDiv.find("#loading").show();

            var currentPageUrl = $('#hiddCurrentPageUrl').val();
            var allLinks = $('#hidStaticLinks').val();
            var contentTypeID = $('#hidCntTypeID').val();
            var pageListUrl = $('#hidPageURL').val();
            var count = $('#hidCount').val();
            var updateForDateText = $('.updateForDateText').val();

            var index = Harel.SimpleAccumulator.Indexes['g' + gIndex] || count;

            var data = {
                'AllLinks': allLinks,
                'ContentTypeID': contentTypeID,
                'PageListUrl': pageListUrl,
                'Index': index,
                'Count': count,
                'CurrentPageUrl': currentPageUrl,
                'Category': category,
                'GroupByCategory': groupByCategory
            };

            $.ajax({
                type: "POST",
                url: "/_vti_bin/webapi/SimpleAccumulator/GetPages/",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var addedPages = "";
               
                    if (result && result.Pages) {
                        for (var i = 0; i < result.Pages.length; i++) {

                            var dateSpan = "";
                            if (result.Pages[i].ArticleDate.length > 0) {
                                dateSpan = "<span class='date'>" +
                                    updateForDateText + " " +
                                    result.Pages[i].ArticleDate +
                                    "</span>";
                            }

                            var pSummary = "";
                            if (result.Pages[i].HarelSearchSummary != null && result.Pages[i].HarelSearchSummary.length > 0)
                                pSummary = result.Pages[i].HarelSearchSummary;

                            addedPages += "<div class='box insurence_plan'>" +
                                "<div class='insurence_plan_list'>" +
                                "<h2>" + result.Pages[i].Title + "</h2>" +
                                dateSpan +
                                "<p>" + pSummary + "</p>" +
                                "</div>" +
                                "<a href='" + result.Pages[i].PagePath + "' aria-label='" + result.Pages[i].Title + "' class='arrowicon'>button</a>" +
                                "</div>";
                        }
                    }

                    //add new pages
                    currentDiv.before(addedPages);
                    //focus on the next element
                    const list = document.querySelectorAll("#main_column > .insurence_plan");
                    const number = list.length;
                    const focusedElement = document.querySelector('#main_column > :nth-child(' + number + ')');
                    const focusedTitle = focusedElement.querySelector('h2');
                    focusedTitle.setAttribute("tabindex", 1);  
                    
                    //add link if there is more items
                    if (result.HasMoreItems) {
                        currentDiv.find("#loading").hide();
                        currentDiv.find("a").show();
                    }
                    else {
                        currentDiv.hide();
                    }

                    //set index to next click
                    Harel.SimpleAccumulator.Indexes['g' + gIndex] = (+index) + (+count);
                },
                error: function (message) {

                }
            });
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               SimpleAccumulator - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               PensionAccumulator - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var isLoad = false;
var Count;
var index;

$(document).ready(function () {
    if ($('#hidCount').length > 0) {
        isLoad = true;
        index = parseInt($('#hidCount').val());
    }
    var formLogin = document.querySelector('.result_form_login');
    if (formLogin != null)
        formLogin.setAttribute("role", "presentation");
    var formLoginUl = document.querySelector('.login_form ul');
    if (formLoginUl != null)
        formLoginUl.setAttribute("role", "presentation");
});

Harel.PensionAccumulator = {

    GetItems: function () {
        $(".aShowMore a").hide().attr("aria-expanded", "true");
        //hide text and show loading      
        $("#loading").show();

        var xAxis = $('#hidXAxis').val();
        count = $('#hidCount').val();
        var trackListTitle = $('.hidTrackListTitle').val();

        if (!isLoad)
            index = $('#hidIndex').val();
        isLoad = false;

        $.ajax({
            type: "POST",
            url: "/_vti_bin/webapi/PensionAccumulator/GetPages/",
            data: "{'Index':'" + index + "','ItemsPerPage':'" + count + "','xAxisAsString':'" + xAxis + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var addedPages = "";

                if (result && result.Pages) {
                    for (var i = 0; i < result.Pages.length; i++) {

                        var ulHTML = "";

                        //build ul
                        if (result.Pages[i].roofFundRoutesList && result.Pages[i].roofFundRoutesList.length > 0) {
                            ulHTML = "<span id='tracksTitle' class='tracksTitle'>" + trackListTitle + "</span>";
                            ulHTML += "<ul>";
                            for (var j = 0; j < result.Pages[i].roofFundRoutesList.length; j++) {
                                ulHTML += "<li><a href='" + result.Pages[i].roofFundRoutesList[j].PagePath + "'title='" + result.Pages[i].roofFundRoutesList[j].TitleToDisplay + "'>" +
                                    result.Pages[i].roofFundRoutesList[j].TitleToDisplay +
                                    "</a></li>";
                            }
                            ulHTML += "</ul>"
                        }

                        var pSummary = "";
                        if (result.Pages[i].HarelSearchSummary != null && result.Pages[i].HarelSearchSummary.length > 0)
                            pSummary = result.Pages[i].HarelSearchSummary;

                        addedPages += "<div class='box insurence_plan'>" +
                            "<div class='insurence_plan_list plan-list'>" +
                            "<h2>" + result.Pages[i].Title + "</h2>" +
                            "<p>" + pSummary + "</p>" +
                            ulHTML +
                            "</div>" +
                            "<a href='" + result.Pages[i].PagePath + "' title='" + result.Pages[i].Title + "' class='arrowicon'>button</a>" +
                            "</div>";
                    }
                }

                //add new pages
                $('.box.insurence_plan').last().after(addedPages);

                //add link if there is more items
                if (result.HasMoreItems) {
                    $("#loading").hide();
                    $(".aShowMore a").show();
                }
                else {
                    $(".aShowMore").hide();
                }


                //set index to next click
                $('#hidIndex').val(parseInt(index) + parseInt($('#hidCount').val()));

                //enable link
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });

    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               PensionAccumulator - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               ToolTip - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LoadTooltips() {
    try {
        var edit = false;
        if (typeof (IsEditMode) != "undefined" && IsEditMode) {
            edit = true;
            if (document.documentElement != undefined)
                document.documentElement.className += ' edit_mode';
        }

        var termsSpans = $("SPAN[data-termid]");
        if (termsSpans != undefined && termsSpans.length > 0) {
            var termsSpanArray = [];
            var Ids = '';
            for (var i = 0; i < termsSpans.length; i++) {
                var term = termsSpans[i];
                termsSpanArray.push(term);
                var termId = term.attributes["data-termid"].value;
                Ids = Ids + termId + ';';
            }
            if (Ids != '') {
                $.ajax({
                    type: "POST",
                    url: "/_vti_bin/webapi/TermBubble/GetTermsBubbles",
                    data: "{'Ids':'" + Ids + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        LoadTooltipsDetailsByResult(result, edit, Ids.split(';'));
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
            }
        }
    }
    catch (e) { }
}

function LoadTooltipsDetailsByResult(result, isEdit, idsArray) {
    if (result != undefined && result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            try {
                var termId = result[i].TermId;
                var span = $("SPAN[data-termid=" + termId + "]");
                var description = result[i].Description;
                if (description != '' && description != undefined && description != null && description != 'undefined') {
                    var expression;
                    var moreInfoUrl = '';
                    if (!isEdit) {//display mode
                        expression = result[i].Expression;
                        if (result[i].MoreInfoUrl != undefined && result[i].MoreInfoUrl != 'undefined') {
                            moreInfoUrl = result[i].MoreInfoUrl.NavigateUrl;
                        }
                    }

                    for (var j = 0; j < span.length; j++) {
                        var currSpan = $(span[j]);
                        var link = $("a", currSpan);
                        if (link != undefined && link.length > 0) {
                            if (!isEdit) {//display mode - add description
                                if (moreInfoUrl != '')
                                    link.attr("data-link", moreInfoUrl);
                                link.attr("data-title", expression);
                                link.attr("data-content", description);
                            }
                        }
                        //need to create tooltip markup
                        else {
                            var spanInner = document.createElement("span");
                            var link = document.createElement("a");
                            $(link).attr("href", "javascript:;");
                            $(link).attr("class", "popover_btn");
                            $(link).attr("data-toggle", "popover");
                            $(link).attr("data-placement", "top");
                            $(link).html(currSpan.text().trim());

                            if (!isEdit) {//display mode   - add description to new link
                                if (moreInfoUrl != '')
                                    $(link).attr("data-link", moreInfoUrl);
                                $(link).attr("data-title", expression);
                                $(link).attr("data-content", description);
                            }

                            $(spanInner).addClass("underline").append($(link));

                            currSpan.html($(spanInner));
                            currSpan.removeClass("no_term");
                            currSpan.addClass("popover_container");
                        }
                    }

                    //remove found term from array
                    for (var l = idsArray.length - 1; l >= 0; l--) {
                        if (idsArray[l] == termId) idsArray.splice(l, 1);
                    }
                }
            }
            catch (ex) {
            }
        }
        if (typeof window.init_popover !== "undefined")
            window.init_popover();
    }

    for (var i = 0; i < idsArray.length; i++) {
        var id = idsArray[i];
        if (id != '') {
            var span = $("SPAN[data-termid=" + id + "]");
            if (isEdit) {
                span.addClass("no_term");
            }
            else {
                span.removeClass("popover_container");
                for (var j = 0; j < $(span).length; j++) {
                    var curr = $(span[j]);
                    curr.html(curr.text().trim());
                }
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               ToolTip - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               BizPortal - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Harel.BizPortal=
$(document).ready(function () {
    if (typeof BizPortalInterval != "undefined") {
        if (BizPortalInterval <= 0)
            BizPortalInterval = 5;

        setInterval(GetMeasureBarDetails, BizPortalInterval * 60000);
    }
});

// equivalent to c# "String.Format" (use like {name of var}.format)
String.prototype.format = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

function GetMeasureBarDetails() {
    $.ajax({
        type: "GET",
        url: "/_vti_bin/webapi/MeasureBarDetails",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != null) {

                // set values of html elements in the control to updated values from web service
                if (result.indices != null) {
                    var i;
                    for (i = 0; i < result.indices.length; i++) {
                        var indexCode = result.indices[i].IndexCode;
                        $("li[data-indexcode='" + indexCode + "'] strong").eq(0).text(result.indices[i].ChangePercent);
                        $("li[data-indexcode='" + indexCode + "'] span").eq(0).text(result.indices[i].IndexValue);
                        $("li[data-indexcode='" + indexCode + "']").eq(0).attr("class", result.indices[i].Trend)
                    }
                }

                // set control heading according to format from resource - with updated date and time (of call to web service)
                if (result.UpdatedDate != null && result.UpdatedTime != null) {
                    var d = new Date();
                    var FormattedBizPortalHeading = BizPortalHeading.format(result.UpdatedDate, result.UpdatedTime, BizPortalInterval);
                    $("span[class='biz-heading']").eq(0).text(FormattedBizPortalHeading /*+ " " + d.getTime()*/);
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               BizPortal - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               InsuranceAccumulator - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var isLoad = false;
var Count;
var index;

$(document).ready(function () {
    if ($('#hidCount').length > 0) {
        isLoad = true;
        index = parseInt($('#hidCount').val());
        ClearHiddenFields();
    }
});

function ClearHiddenFields() {
    $("[id*='hidIndex_']").each(function () {
        $(this).val($('#hidCount').val());
    });
}

Harel.InsuranceAccumulator = {

    ReturnProducts: {},

    GetMoreInsurancePages: function (insType) {

        //hide text and show loading
        var parsedInsType = trimSpecialChars(insType);
        var showMoreItem = $('#showMoreLink_' + parsedInsType);
        showMoreItem.find("a").hide().attr("aria-expanded", "true");;
        showMoreItem.find("#loading").show();

        var xAxis = $('#hidXAxis').val();
        var showSubTitle = $('#hidIsShowSubTitles').val();
        Count = parseInt($('#hidCount').val());
        if (!isLoad) {
            var value = $('#hidIndex_' + parsedInsType).val()
            if (value == "")
                index = Count;
            else
                index = parseInt(value);
        }
        isLoad = false;

        if (Harel.InsuranceAccumulator.ReturnProducts.length == null) {
            $.ajax({
                type: "POST",
                url: "/_vti_bin/webapi/InsuranceProducts/GetInsuranceProducts/",
                data: "{'XAxis':'" + xAxis + "','ShowSubTitle':'" + showSubTitle + "','Count':'" + Count + "','Index':'" + index + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if (result.returnObject != null && result.returnObject.length > 0) {
                        Harel.InsuranceAccumulator.ReturnProducts = result.returnObject;
                        Harel.InsuranceAccumulator.AddPages(insType, index, Count);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }

        Harel.InsuranceAccumulator.AddPages(insType, index, Count);
    },

    AddPages: function (insType, index, Count) {
        var page, insuranceType;

        if (Harel.InsuranceAccumulator.ReturnProducts.length != null) {

            for (var i = 0; i < Harel.InsuranceAccumulator.ReturnProducts.length; i++) {

                insuranceType = Harel.InsuranceAccumulator.ReturnProducts[i].InsuranceType;

                //get pages from index till index+count
                if (insuranceType == insType) {

                    if (Harel.InsuranceAccumulator.ReturnProducts[i].insuranceProducts != null) {

                        for (var j = index; j < index + Count; j++) {

                            if (Harel.InsuranceAccumulator.ReturnProducts[i].insuranceProducts[j] != null) {

                                page = Harel.InsuranceAccumulator.ReturnProducts[i].insuranceProducts[j];
                                Harel.InsuranceAccumulator.AppendPage(page, insuranceType);
                            }
                        }

                        var zipInsType = trimSpecialChars(insType);

                        $('#hidIndex_' + zipInsType).val(index + Count);

                        //show more item
                        var showMoreItem = $('#showMoreLink_' + zipInsType);
                        //remove link if more items not found
                        if (parseInt($('#hidIndex_' + zipInsType).val()) >= Harel.InsuranceAccumulator.ReturnProducts[i].insuranceProducts.length)
                        //$('#showMoreLink_' + zipInsType).remove();
                        {
                            showMoreItem.hide();
                        }
                        else {
                            showMoreItem.find("#loading").hide();
                            showMoreItem.find("a").show();
                        }

                        $('.ellipsis').ellipsis({
                            row: 4
                        });

                    }
                }
            }
        }
    },

    AppendPage: function (page, insuranceType) {

        var portalUrl = "";

        page.SearchSummary = page.SearchSummary == null ? "" : page.SearchSummary;
        page.BusinessCardDesc1 = page.BusinessCardDesc1 == null ? "" : page.BusinessCardDesc1;
        page.BusinessCardDesc2 = page.BusinessCardDesc2 == null ? "" : page.BusinessCardDesc2;
        page.BusinessCardDesc3 = page.BusinessCardDesc3 == null ? "" : page.BusinessCardDesc3;
        var displayCard1 = page.BusinessCardDescImg1 == null || page.BusinessCardDescImg1 == "" ? "none" : "block";
        var displayCard2 = page.BusinessCardDescImg2 == null || page.BusinessCardDescImg2 == "" ? "none" : "block";
        var displayCard3 = page.BusinessCardDescImg3 == null || page.BusinessCardDescImg3 == "" ? "none" : "block";

        if (TypePortal == "Customers")
            portalUrl = $('#hiddCustomersPortal').val();

        var pSummary = "";
        if (page.SearchSummary != null && page.SearchSummary.length > 0)
            pSummary = page.SearchSummary;

        var html = "<div class='box insurence_plan'>" +
            " <div class='insurence_plan_list'>" +
            "<h2>"+ page.HarelPageTitle +"</h2>" +
            "<span class='ellipsis'>" + pSummary + "</span>" +
            "<ul>" +
            "<li>" +
            "<small>" +
            "<img style='display:" + displayCard1 + "' src='" + portalUrl + page.BusinessCardDescImg1 + "' />" +
            "</small>" +
            "<div class='plan_text'>" + page.BusinessCardDesc1 + "</div>" +
            "</li>" +
            "<li class='leftside'>" +
            "<small>" +
            "<img style='display:" + displayCard2 + "' src='" + portalUrl + page.BusinessCardDescImg2 + "' />" +
            "</small>" +
            "<div class='plan_text'>" + page.BusinessCardDesc2 + "</div>" +
            "</li>" +
            "<li class='clear_right'>" +
            "<small>" +
            "<img style='display:" + displayCard3 + "' src='" + portalUrl + page.BusinessCardDescImg3 + "' />" +
            "</small>" +
            "<div class='plan_text'>" + page.BusinessCardDesc3 + "</div>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "<a href='" + page.PagePath + "' title='" + page.HarelPageTitle + "' class='arrowicon'>button</a>" +
            "</div>";
        var insType = trimSpecialChars(insuranceType);
        $('#showMoreLink_' + insType).before(html);
    }
}

function trimSpecialChars(str) {
    return str.replace(new RegExp(' ', 'g'), '').replace(new RegExp('\'', 'g'), '_').replace(/"/g, '\\"');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               InsuranceAccumulator - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Serch Component - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Harel.CustomersSearch = {

    SearchContent: function (btnSearch) {
        var url = $(btnSearch).attr("data-url");
        var key = $("#searchfield").val();
        //check if not empty?
        if (url != null)
            window.location.href = url + "?k=" + key;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Serch Component - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               PoliciesArchiveUC - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    if ($(document).find(".polisot_div").length > 0) {

        $('body').on('keypress', function (e) {
            var tagName = e.target.tagName.toLowerCase();
            if (tagName != "select" && tagName != "span") {
                if (e.which === 13) // the enter key code
                {
                    Harel.PoliciesArchive.Filter();
                }
            }
        });
        $("body").on('keypress', '#filter_info_form .right-block span', function (e) {
            if (e.which === 13) {
                $("#filter_info_form").toggleClass("advanced_open");
                $("#filter_info_form .advanced").toggle();
                $(this).attr('aria-expanded',
                    $(this).attr('aria-expanded') == 'false' ? 'true' : 'false'
                );
            }
        });



        //set policy Name
        var policyName = getQueryParams()["pn"];
        $('#appendix_num').val(policyName);
        var openAdvanced = false;
        ////set selected archive_area
        var selectedArchiveArea = getQueryParams()["t2"];
        if (selectedArchiveArea && selectedArchiveArea != "" && $('#archive_area').length > 0) {
            $('#archive_area option').each(function () {
                if ($(this)[0].value == selectedArchiveArea)
                    $(this).prop('selected', 'selected');
            });
        }

        ////set selected Product_Type (InsuranceProductRelevant)
        var selectedInsuranceProductRelevant = getQueryParams()["pt"];
        if (selectedInsuranceProductRelevant && selectedInsuranceProductRelevant != "" && $('#archive_productType').length > 0) {
            $('#archive_productType option').each(function () {
                if ($(this)[0].value == selectedInsuranceProductRelevant) {
                    openAdvanced = true;
                    $(this).prop('selected', 'selected');
                }
            });
        }

        //set selected company
        var selectedCompany = getQueryParams()["cn"];
        if (selectedCompany && selectedCompany != "" && $('#comapny').length > 0) {
            $('#comapny option').each(function () {
                if ($(this).text() == selectedCompany) {
                    openAdvanced = true;
                    $(this).prop('selected', 'selected');
                }
            });
        }


        //set selected Insurance Type
        var selectInsuranceType = getQueryParams()["it"];
        if (selectInsuranceType && selectInsuranceType != "" && $('#archive_InsuranceType').length > 0) {
            $('#archive_InsuranceType option').each(function () {
                if ($(this).val() == selectInsuranceType) {
                    openAdvanced = true;
                    $(this).prop('selected', 'selected');
                }
            });
        }


        //set from date value
        var startDate = getQueryParams()["sd"];
        if (startDate != null && startDate != "") {
            var arrFrom = startDate.split('.');
            var from = new Date(arrFrom[2], arrFrom[1], arrFrom[0]);
            $('#from_date').val(from != 'Invalid Date' ? startDate : "");
        }

        //set end date value
        var endDate = getQueryParams()["ed"];
        if (endDate != null && endDate != "") {
            var arrTo = endDate.split('.');
            var to = new Date(arrTo[2], arrTo[1], arrTo[0]);
            $('#to_date').val(to != 'Invalid Date' ? endDate : "");
        }

        //set selected attachment from qs
        var selectedAttachment = getQueryParams()["a"];
        $('#txtAttachment').val(selectedAttachment);
        if ((selectedAttachment != undefined) && (selectedAttachment != '')) openAdvanced = true;

        if (openAdvanced) $("#filter_info_form").toggleClass("advanced_open");

        //set order links class
        var o = getQueryParams()["o"];
        $('#policies').find("th").removeAttr('aria-sort');
        if (o != null && o != "") {
            var arr = o.split(';');
            var $link; var order;
            
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != null && arr[i] != "") {
                    $link = $('#' + arr[i].split('-')[0] + 'Sort');
                    order = arr[i].split('-')[1];
                    if (order == "0") {
                        $link.prop('class', 'arrow blue-up');
                        //$link.attr('aria-label', 'מיין לפי סדר יורד');
                        $link.parents("th").attr('aria-sort', 'ascending');
                    }
                    else {
                        $link.prop('class', 'arrow blue');
                        //$link.attr('aria-label', 'מיין לפי סדר עולה');
                        $link.parents("th").attr('aria-sort', 'descending');

                    }
                }
            }
        }
        else {
            $('#TitleSort').prop('class', 'arrow blue-up');
            //$('#TitleSort').attr('aria-label','מיין לפי סדר יורד');
            $('#TitleSort').parents("th").attr('aria-sort', 'ascending');

            $('#HarelAreaAndProductsSort').prop('class', 'arrow blue-up');
            //$('#HarelAreaAndProductsSort').attr('aria-label', 'מיין לפי סדר יורד');
            $('#HarelAreaAndProductsSort').parents("th").attr('aria-sort', 'ascending');

            
        }

        //set selected page
        if ($('#paging').length > 0) {
            var currentPage = getQueryParams()["p"];
            if (currentPage != null && currentPage != "") {
                $('#filter-pagination a').each(function () {
                    if ($(this).text() == currentPage)
                        $(this).parent().addClass("active");
                    else
                        $(this).parent().removeClass("active");
                });
               
            }
            $('#policies').attr("tabindex", -1).focus();
        }
    }
});


function getQueryParams() {
    var vars = [], hash;
    var queryString = window.location.search.substr(1);
    if (queryString.length > 0) {
        var hashes = queryString.split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = decodeURIComponent(hash[1]);
        }
    }
    return vars;
}

window.GoToArchivePage = function (currentPage) {
    var goToPage;

    //if has no pages after this
    if ($(currentPage).parent().hasClass('disable'))
        return;

    switch ($(currentPage).text().trim()) {
        case "next":
            {
                //to to next page
                goToPage = parseInt($('#filter-pagination ul li.activepage a').text()) + 1;
                break;
            }
        case "next-arrow":
            {
                //go to last page
                goToPage = $('#HiddFieldNumOfLinks').val();
                break;
            }
        case "prev":
            {
                //go to prev page
                goToPage = parseInt($('#filter-pagination ul li.activepage a').text()) - 1;
                break;
            }
        case "prev arrow":
            {
                //go to first page
                goToPage = 1;
                break;
            }
        default:
            {
                goToPage = $(currentPage).text().trim();
            }
    }

    //set active page
    $('#filter-pagination a').each(function () {
        $(this).parent().removeClass("active");
    });
    $(currentPage).parent().addClass("active");

    var query = location.search;

    var refinements = $("#selectedRefinements").val();
    if (refinements !== undefined) {
        query = UpdateQueryString(query, "r", refinements);
    }

    query = UpdateQueryString(query, "p", goToPage);
    query = removeParameter(query, "autocomplete");
    query = removeParameter(query, "cr");


    //document.getElementById('s4-workspace').scrollTop = 0 //ScrollToTop

    //update the query string (redirects)
    location.search = query;
    return true;
}

Harel.PoliciesArchive = {

    CheckRangeDateTime: function () {

        var arrFrom = $('#from_date').val().split('.');
        var arrTo = $('#to_date').val().split('.');

        var from = new Date(arrFrom[2], arrFrom[1], arrFrom[0]);
        var to = new Date(arrTo[2], arrTo[1], arrTo[0]);

        if (from > to) {
            alert('error');
        }
    },

    ClearFilter: function () {

        //clear select
        $('#comapny option:selected').removeAttr('selected');
        $('#comapny option:first').attr('selected', 'selected');
        //clear form date
        $('#from_date').val("");
        //clear to date
        $('#to_date').val("");
        //clear xAxis - level 1
        $('#archive_category option:selected').removeAttr('selected');
        $('#archive_category option:first').attr('selected', 'selected');
        //clear xAxis - level 3
        $('#archive_type option:selected').removeAttr('selected');
        $('#archive_type option:first').attr('selected', 'selected');
        //clear attachment
        $('#txtAttachment').val("");
        //clear appendix_num
        $('#appendix_num').val("");
        //clear archive_InsuranceType
        $('#archive_InsuranceType option:selected').removeAttr('selected');
        $('#archive_InsuranceType option:first').attr('selected', 'selected');


        //redirect to same page after cleaning up the filters
        Harel.PoliciesArchive.Filter("", true);
    },

    Filter: function (order, clear) {
        var cn = $('#comapny').find(":selected").val();
        var cnText = $('#comapny').find(":selected").text();
        var sd = $('#from_date').val();
        var ed = $('#to_date').val();
        var t1 = $('#archive_category').find(":selected").val();
        //var t2 = $('#archive_type').find(":selected").val();
        var t2 = $('#archive_area').find(":selected").val();
        var a = $('#txtAttachment').val();
        var pn = $('#appendix_num').val();
        var pt = $('#archive_productType').val();
        var it = $('#archive_InsuranceType').val();
        var o = order;

        var newHref = document.location.protocol + "//" + document.location.hostname + document.location.pathname + "?";
        //get the archive types
        //ReferenceArchiveType
        var referenceArchiveType = getQueryParams()["ReferenceArchiveType"];
        if (typeof (referenceArchiveType) != "undefined" && referenceArchiveType != "") {
            newHref += "ReferenceArchiveType=" + encodeURIComponent(referenceArchiveType) + "&";
        }
        //UniqueId
        var uniqueId = getQueryParams()["UniqueId"];
        if (typeof (uniqueId) != "undefined" && uniqueId != "") {
            newHref += "UniqueId=" + encodeURIComponent(uniqueId) + "&";
        }
        //XAxis
        var xAxis = getQueryParams()["XAxis"];
        if (typeof (xAxis) != "undefined" && xAxis != "") {
            newHref += "XAxis=" + encodeURIComponent(xAxis) + "&";
        }

        if (clear) {
            newHref = newHref.substring(0, newHref.length - 1);
            document.location.href = newHref;
        }
        else {
            if (cn && cn != "-1")
                newHref += "cn=" + encodeURIComponent(cnText) + "&";
            if (sd && sd != "")
                newHref += "sd=" + encodeURIComponent(sd) + "&";
            if (ed && ed != "")
                newHref += "ed=" + encodeURIComponent(ed) + "&";
            if (t1 && t1 != "-1")
                newHref += "t1=" + encodeURIComponent(t1) + "&";
            if (t2 && t2 != "-1")
                newHref += "t2=" + encodeURIComponent(t2) + "&";
            if (a && a != "")
                newHref += "a=" + encodeURIComponent(a) + "&";
            if (o && o != "")
                newHref += "o=" + encodeURIComponent(o) + "&";
            if (pn && pn != "")
                newHref += "pn=" + encodeURIComponent(pn) + "&";
            if (pt && pt != "-1")
                newHref += "pt=" + encodeURIComponent(pt) + "&";
            if (it && it != "-1")
                newHref += "it=" + encodeURIComponent(it) + "&";

            newHref = newHref.substring(0, newHref.length - 1);
            document.location.href = newHref;
        }
    },

    Sort: function (col) {

        var order = "";

        // remove column from order if exist
        var o = getQueryParams()["o"];
        if (o != null && o != "") {
            order = o.replace(col + "-0" + ";", "");
            order = order.replace(col + "-1" + ";", "");
        }

        //set link class
        $link = $('#' + col + 'Sort');

        switch ($link.prop('class')) {

            case "arrow":
            case "arrow blue":
                {
                    $link.prop('class', 'arrow blue-up');
                    order = col + "-0;";

                    break;
                }
            case "arrow blue-up":
                {
                    $link.prop('class', 'arrow blue');
                    order = col + "-1;";

                    break;
                }
        }

        Harel.PoliciesArchive.Filter(order);

        //$('#HiddFieldOrder').val($('#HiddFieldOrder').val().replace(col + "-0" + ";", ""));
        //$('#HiddFieldOrder').val($('#HiddFieldOrder').val().replace(col + "-1" + ";", ""));
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               PoliciesArchiveUC - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               FormsSearchUC - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    if ($(document).find(".forms_div").length > 0) {

        $('body').on('keypress', function (e) {
            if (e.target.tagName.toLowerCase() != "select") {
                if (e.which === 13) // the enter key code
                {
                    Harel.FormsSearch.Filter();
                }
            }
        });

        //set selected YAxis from qs
        var selectedYAxis = getQueryParams()["y"];
        if (selectedYAxis != "undefined" && selectedYAxis != "" && $('#archive_task').length > 0) {
            $('#archive_task option').each(function () {
                if ($(this).val() == selectedYAxis)
                    $(this).prop('selected', 'selected');
            });
        }

        //set order links class
        var o = getQueryParams()["o"];
        if (o != null && o != "") {
            var arr = o.split(';');
            var $link; var order;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != null && arr[i] != "") {
                    $link = $('#' + arr[i].split('-')[0] + 'Sort');
                    order = arr[i].split('-')[1];

                    if (order == "0") {
                        $link.prop('class', 'arrow blue-up');
                        $link.prop('aria-label', 'מיין לפי סדר עולה');
                    }
                    else {
                        $link.prop('class', 'arrow blue');
                        $link.prop('aria-label', 'מיין לפי סדר יורד');
                    }
                }
            }
        }
        else {
            $('#TitleSort').prop('class', 'arrow blue-up');
            $('#TitleSort').prop('aria-label', 'מיין לפי סדר עולה');
            $('#HarelAreaAndProductsSort').prop('class', 'arrow blue-up');
            $('#HarelAreaAndProductsSort').prop('aria-label', 'מיין לפי סדר עולה');
        }

        //set selected page
        if ($('#paging').length > 0) {
            var currentPage = getQueryParams()["p"];
            if (currentPage != null && currentPage != "") {
                $('#filter-pagination a').each(function () {
                    if ($(this).text() == currentPage)
                        $(this).parent().addClass("active");
                    else
                        $(this).parent().removeClass("active");
                });
            }
        }
    }
});

function getQueryParams() {
    var vars = [], hash;
    var queryString = window.location.search.substr(1);
    if (queryString.length > 0) {
        var hashes = queryString.split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = decodeURIComponent(hash[1]);
        }
    }
    return vars;
}

Harel.FormsSearch = {

    ClearFilter: function () {

        //clear select
        $('#archive_category option:selected').removeAttr('selected');
        $('#archive_category option:first').attr('selected', 'selected');

        $('#archive_type option:selected').removeAttr('selected');
        $('#archive_type option:first').attr('selected', 'selected');

        $('#archive_task option:selected').removeAttr('selected');
        $('#archive_task option:first').attr('selected', 'selected');

        //redirect to same page after cleaning up the filters
        Harel.FormsSearch.Filter("", true);
    },

    Filter: function (order, clear) {
        var t1 = $('#archive_category').find(":selected").val();
        var t2 = $('#archive_type').find(":selected").val();
        var y = $('#archive_task').find(":selected").val();
        var o = order;

        var newHref = document.location.protocol + "//" + document.location.hostname + document.location.pathname + "?";

        if (clear) {
            newHref = newHref.substring(0, newHref.length - 1);
            document.location.href = newHref;
        }

        else {
            if (t1 && t1 != "-1")
                newHref += "t1=" + encodeURIComponent(t1) + "&";
            if (t2 && t2 != "-1")
                newHref += "t2=" + encodeURIComponent(t2) + "&";
            if (y && y != "-1")
                newHref += "y=" + encodeURIComponent(y) + "&";
            if (o && o != "")
                newHref += "o=" + encodeURIComponent(o) + "&";

            newHref = newHref.substring(0, newHref.length - 1);
            document.location.href = newHref;
        }
    },

    Sort: function (col) {

        var order = "";

        // remove column from order if exist
        var o = getQueryParams()["o"];
        if (o != null && o != "") {
            order = o.replace(col + "-0" + ";", "");
            order = order.replace(col + "-1" + ";", "");
        }

        //set link class
        $link = $('#' + col + 'Sort');

        switch ($link.prop('class')) {
            case "arrow": case "arrow blue":
                {
                    $link.prop('class', 'arrow blue-up');
                    order = col + "-0;";

                    break;
                }
            case "arrow blue-up":
                {
                    $link.prop('class', 'arrow blue');
                    order = col + "-1;";

                    break;
                }
        }

        Harel.FormsSearch.Filter(order);
    },

    GoToFormsSearchPage: function (pageUrl) {
        var redirect = false;
        var pageUrlParams = "?";

        var val = $('#archive_category').val();
        if (val !== "-1") {
            redirect = true;
            pageUrlParams += "t1=" + val;
        }
        val = $('#archive_type').val();
        if (val !== "-1") {
            if (redirect)
                pageUrlParams += "&";
            else
                redirect = true;
            pageUrlParams += "t2=" + val;
        }
        val = $('#archive_task').val();
        if (val !== "-1") {
            if (redirect)
                pageUrlParams += "&";
            else
                redirect = true;
            pageUrlParams += "y=" + val;
        }

        if (redirect)
            pageUrl = pageUrl + pageUrlParams;

        document.location.href = pageUrl;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               FormsSearchUC - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Login - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///_vti_bin/webapi/LoginUserNameValid/GetIsUserNameValid/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Login - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               ContentTypeSelector - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var selectedWeb;

$(document).ready(function () {
    if (typeof (redirect) != "undefined" && redirect != '') {
        Redirect(redirect);
    }

    if ($('.ContentTypeSelectorControl').length == 0)
        return;

    if ($("[id*='HidContentType']").val() != "") {
        selectedWeb = $(".txtPageSelector").val();
        HarelLoadContentTypeDDL(true);
    }

    $('.txtPageSelector').click(function () {
        FillContentType();
    });

    $('.txtPageSelector').blur(function () {
        FillContentType();
    });

    function FillContentType() {
        if ($('.txtPageSelector') != null && $('.txtPageSelector').val() != "") {
            if (selectedWeb == null || selectedWeb != $(".txtPageSelector").val()) {
                selectedWeb = $(".txtPageSelector").val();
                HarelLoadContentTypeDDL();
                $(".ddlContentTypes").blur();
            }
        }
    }

    $(".ddlContentTypes").change(function () {
        $("[id*='HidContentType']").val($('.ddlContentTypes option:selected').val());
    });
});

function HarelLoadContentTypeDDL(isLoad) {

    var domain = "";
    if (typeof portal_domain != 'undefined')
        domain = portal_domain;
    $.ajax({
        type: "POST",
        url: domain + "/_vti_bin/webapi/ContentTypeSelector/GetWebContentTypes/",
        data: "{'selectedWeb':'" + selectedWeb + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result) {
                var options = "";
                for (var i = 0; i < result.length; i++) {
                    options += "<option value='" + result[i].CntTypeID + "'>" + result[i].CntTypeName + "</option>";
                }

                $('.ddlContentTypes').html(options);
                if (isLoad)
                    $(".ddlContentTypes option[value='" + $("[id*='HidContentType']").val() + "']").prop('selected', true);
                else
                    $("[id*='HidContentType']").val($($('.ddlContentTypes option')[0]).val());
            }
            else {
                $('.ddlContentTypes').html("");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}
window.HarelLoadContentTypeDDL = HarelLoadContentTypeDDL;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Sort Table
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    Harel.RLSortTablePlaceHolderList = Harel.RLSortTablePlaceHolderList || {};

    var isDoSorting = typeof (IsEditMode) != "undefined" && IsEditMode && $(".roof_fund_routes_sort").length > 0;
    if (isDoSorting) {

        Harel.RLSortTablePlaceHolderList.InitSortRoofFundRoutes = function () {
            if (typeof (IsSortTablePagesActive) != "undefined" && IsSortTablePagesActive == true) {
                $("#sortable.roof_fund_routes_sort").sortable({
                    change: function (event, ui) {
                        $("#btnConfirm").prop("disabled", false);
                    }
                });

                $("#sortable.roof_fund_routes_sort").disableSelection();
            }
        };

        Harel.RLSortTablePlaceHolderList.SortRoofFundRoutes = function () {
            if (typeof (IsSortTablePagesActive) != "undefined" && IsSortTablePagesActive == true) {
                var textarea = $(".divHarelGuidsOfSortRoutes")[0].childNodes[1].childNodes[1];
                textarea.value = '';
                var table = $("#sortable.roof_fund_routes_sort");
                table.find('li').each(function (index) {
                    var str = textarea.value + $(this)[0].id + ";";
                    textarea.value = str;
                });

                $("#btnConfirm").prop("disabled", true);
            }
        };
        Harel.RLSortTablePlaceHolderList.InitSortRoofFundRoutes();
    }
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               RLSearchSuggestions - Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Harel.RLSearchSuggestions = Harel.RLSearchSuggestions || {};
//define Request object
Harel.RLSearchSuggestions.RequestInit = function RequestInit() {
    this.AxisX = ''
    this.SearchText = ''
};

Harel.RLSearchSuggestions.SearchPageUrl = null;
Harel.RLSearchSuggestions.Init = function Init(_searchPageURL) {
    console.log("Harel.RLSearchSuggestions.SearchPageUrl : " + _searchPageURL);
    Harel.RLSearchSuggestions.SearchPageUrl = _searchPageURL;
};

Harel.RLSearchSuggestions.BuildSearchResultsQueryAsString = function (RequestInitialization) {
    //set AxisX
    if (typeof Harel.Settings != "undefined")
        RequestInitialization.AxisX = Harel.Settings.Page.XAxis;
    else
        RequestInitialization.AxisX = "";

    var paramsKeys = Object.keys(RequestInitialization);
    var queryAsString = "";

    for (var i = 0; i < paramsKeys.length; i++) {
        queryAsString += paramsKeys[i] + "=" + encodeURIComponent(RequestInitialization[paramsKeys[i]]) + "&";
    }

    return queryAsString;
};

Harel.RLSearchSuggestions.Search = function (requestInit, cbk) {
    var urlstr = "/_vti_bin/webapi/SearchSuggestions?" + Harel.RLSearchSuggestions.BuildSearchResultsQueryAsString(requestInit);

    $.ajax({
        type: "GET",
        url: urlstr,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            cbk(result);
            return result;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               RLSearchSuggestions - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               ContentTypeSelector - End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// List Form Functions - Start
Harel.ListForms = {
    InitRadioChange: function (ListFormRadioSections) {
        for (var key in ListFormRadioSections) {
            Harel.ListForms.RadionShowHideSection(key, ListFormRadioSections[key]);
            Harel.ListForms.BindRadioChange(key, ListFormRadioSections[key]);
        }
    },
    BindRadioChange: function (radioButtonName, radioSections) {
        $('input:radio[name*=' + radioButtonName + ']').change(function () {
            Harel.ListForms.RadionShowHideSection(radioButtonName, radioSections);
        });
    },
    RadionShowHideSection: function (radioButtonName, radioSections) {
        var selectedVal = $('input:radio[name*=' + radioButtonName + ']:checked').val() || $('#' + radioButtonName).text().trim();
        for (var section in radioSections) {
            if (-1 != $.inArray(selectedVal, radioSections[section].values)) {
                $('#' + section).show();
            }
            else {
                $('#' + section).hide();
            }
        }
    },
    ValidateRequiredFieldsInSections: function (ListFormRadioSections) {
        var formValid = true;
        for (var radioButtonName in ListFormRadioSections) {
            var selectedVal = $('input:radio[name*=' + radioButtonName + ']:checked').val() || $('#' + radioButtonName).text().trim();
            for (var section in ListFormRadioSections[radioButtonName]) {
                if (-1 != $.inArray(selectedVal, ListFormRadioSections[radioButtonName][section].values)) {
                    var requiredFeildNames = ListFormRadioSections[radioButtonName][section].required;
                    for (var i = 0; i < requiredFeildNames.length; i++) {
                        var field = $("input[id^=" + requiredFeildNames[i] + "]").first();
                        if (0 == field.length) field = $("[id*=" + requiredFeildNames[i] + "]").first();
                        if (0 != field.length) {
                            field.valid();
                            field.rules("add", { required: true });
                            if (!field.valid()) {
                                field.next().text(Strings.STS.L_SPClientRequiredValidatorError).css({ display: "block" }).addClass("ms-formvalidation");
                                formValid = false;
                            }
                            field.rules("remove", "required");
                        }
                    }
                }
            }
        }
        return formValid;
    }
};
// List Form Functions - Start

Harel.Settings =
    {
        CustomersSiteUrl: "",
        CustomersSiteId: "",
        CurrentSiteId: "",
        Init: function (customerUrl, customersSiteId, currentSiteId) {
            Harel.Settings.CustomersSiteUrl = customerUrl;
            Harel.Settings.CustomersSiteId = customersSiteId;
            Harel.Settings.CurrentSiteId = currentSiteId;
        }
    }

Harel.Settings.Page =
    {
        XAxis: "",
        Init: function (xAxis) {
            Harel.Settings.Page.XAxis = xAxis;
        }
    }

Harel.Signals =
    {
        UpdatePersonalSignals: function (pid) {
            if (typeof (pid) == "undefined")
                pid = "";
            var url = "/_vti_bin/webapi/Signals/GetPersonalSignals?PID=" + encodeURIComponent(pid);
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                },
                error: function (message) {

                }
            });
        },
        UpdateSignalsContext: function () {
            $.ajax({
                type: "POST",
                url: "/_vti_bin/webapi/Signals",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }
    }
Harel.Promotions = {
    PostMarketingPromotionClick: function (id, clickPromotion) {
        $.ajax({
            type: "POST",
            url: "/_vti_bin/webapi/Promotions/PostMarketingPromotionClick",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{'Id':'" + id + "','ClickPromotion':'" + clickPromotion + "'}",
        });
    },
    PostMarketingPromotionImpression: function (id) {
        $.ajax({
            type: "POST",
            url: "/_vti_bin/webapi/Promotions/PostMarketingPromotionImpression",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{'Id':'" + id + "'}",
        });
    },
    PostCampaignManagementPromotionClick: function (campaign_id, treatment_id) {
        var url = window.location.href;
        $.ajax({
            type: "POST",
            url: "/_vti_bin/webapi/CampaignManagement/CampaignManagementClick/CampaignManagementClick",
            data: "{'CampaignID':'" + campaign_id + "', 'TreatmentID':'" + treatment_id + "', 'PageUrl':'" + url + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
    },
    PostCampaignManagementPromotionImpression: function (campaign_id, treatment_id) {
        var url = window.location.href;
        $.ajax({
            type: "POST",
            url: "/_vti_bin/webapi/CampaignManagement/CampaignManagementImpression/CampaignManagementImpression",
            data: "{'CampaignID':'" + campaign_id + "', 'TreatmentID':'" + treatment_id + "', 'PageUrl':'" + url + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
    },
    RedirectPromotionClick: function (href, target) {
        var navTo = decodeURIComponent(href);
        if (target === '_blank') {
            newPromoWindow = window.open(navTo, target);
        }
        else {
            window.location.href = navTo;
        }
    }
}

Harel.ServicePromotions = {
    Get: function (json) {
        var data = JSON.stringify(json.Data);
        api.get({
            url: json.Url,
            data: data
        }, alert('need render for service promotion.'));

    }
}

Harel.Config = {};
Harel.Config.CollectivesNavigation = {
    SelectCollective: null,
    Redirect: function () {
        $("#collectiveSpinner").show();
        Redirect(collectiveRedirect);
    }
};
//Application Search Parameters
Harel.Config.SearchParams = null;
Harel.Config.Apps = new Array();
Harel.Config.LoadingText = "";

Harel.GTM = {
    ContactUsLabel: function () {
        var category = $('#category option:selected').text();
        var topic = $('#topic option:selected').text();
        var message = Harel.GTM.GetBannerMessage();

        if (message != "")
            message = " | " + message;

        $('#submit_contact').data("ga-label", category + " | " + topic + message);
    },
    ContactUsMarketingContentLabel_Click: function () {
        var category = $('#category option:selected').text();
        var topic = $('#topic option:selected').text();
        var message = Harel.GTM.GetBannerMessage();

        message = category + " | " + topic + " | " + message;
        $('.banner').data("ga-label", message);
        $('.banner a').data("ga-label", message);
    },
    ContactUsMarketingContentLabel_Impression: function (message) {
        var category = $('#category option:selected').text();
        var topic = $('#topic option:selected').text();
        message = category + " | " + topic + " | " + message;
        $('.banner').data("ga-label", message);
    },
    GetBannerMessage: function () {
        var message = "";
        $(".banner").children().not("a").each(function () {
            message += $(this).text() + " ";
        });
        return message;
    }
};

if (typeof (TypePortal) != "undefined" && (TypePortal == "Customers" || TypePortal == "Suppliers")) {
    if (typeof (OnmatrixStart) != "undefined" && matrixStart == true) {
        matrixStart = false;
        OnmatrixStart();
    }
    if (typeof (SubstitutionScript) != "undefined" && isSubstitutionScript == true) {
        isSubstitutionScript = false;
        SubstitutionScript();
    }
}

if (!MobileAndTabletCheck() && typeof (FocusCtlId) != "undefined") {
    var ctl = document.getElementById(FocusCtlId);

    if (ctl != null)
        ctl.focus();
}

if (typeof (collectiveRedirect) != "undefined" && collectiveRedirect != "") {
    Harel.Config.CollectivesNavigation.Redirect();
}

//campaign management impression
if ($(".CustomersCampaignManagement").length > 0) {
    $(".CustomersCampaignManagement").each(function () {
        Harel.Promotions.PostCampaignManagementPromotionImpression($(this).data("campaign_id"), $(this).data("treatment_id"));
    });
}

//promotion management impression
if ($(".postPromotion").length > 0) {
    $(".postPromotion").each(function () {
        Harel.Promotions.PostMarketingPromotionImpression($(this).data("promotion_id"));
    });
}


$(document).ready(function () {
    var isMandatory = true;
    var firstTimeFormInputEditing = true;
    var documentAuditRuntimeId = '';

    if (typeof window['randomPdfRequiredFields'] !== 'undefined' && window['randomPdfRequiredFields'] !== null) {
        isMandatory = window['randomPdfRequiredFields'];
    }

    $('body').on('click', '*[data-signalForm="formsignalLink"]', function (e) {
        //$('*[data-signalForm="formsignalLink"]').click(function (e) {

        e.preventDefault();
        //e.stopPropagation();

        //$(e.target).magnificPopup({
        //    items: {
        //        closeOnBgClick: false,
        //        src: '#formsignal',
        //        type: 'inline',
        //        showCloseBtn: false
        //    }
        //});

        $.magnificPopup.open({
            items: {
                closeOnBgClick: false,
                src: '#formsignal',
                type: 'inline',
                showCloseBtn: false,
                enableEscapeKey: false
            }
        }, 0);

        documentAuditRuntimeId = uuidv4();

        var title = "";

        if ($(e.target).data('dformtitle') !== '') {
            title = decodeURIComponent($(e.target).data('dformtitle'));
            if (!$(e.target).is('a')) {
                title = decodeURIComponent($(e.target).parent().data('dformtitle'));
            }
        }
        else {
            title = decodeURIComponent($(e.target).text());
        }

        $('#formsignalTitle').text(title);

        var gaAction = (isMandatory === true) ? 'AbandonSignal_Imperssion_id-y' : 'AbandonSignal_Imperssion_id-n';

        try {
            var pdfEvent = 'GTM event To GA';
            if (typeof dataLayer != 'undefined') {
                dataLayer.push({
                    GA_EventCategory: 'Form download',
                    GA_EventAction: gaAction,
                    GA_EventLabel: title,
                    event: pdfEvent
                });
            }
        }
        catch (ex) { }

        //clear errors that might have been presented prior to this form download form display:
        $('#form-error').hide();

        var formDownloadToken = decodeURIComponent($(e.target).data('formdownloadtoken'));
        if (typeof formDownloadToken == 'undefined' || formDownloadToken == 'undefined' || formDownloadToken === '') {
            formDownloadToken = decodeURIComponent($(e.target).parents('a').data('formdownloadtoken'));
        }
        $('#formDownloadToken').val(formDownloadToken);

        var formDocType = decodeURIComponent($(e.target).data('formdt'));
        if (typeof formDocType == 'undefined' || formDocType == 'undefined' || formDocType === '') {
            formDocType = decodeURIComponent($(e.target).parents('a').data('formdt'));
        }
        $('#formDocType').val(formDocType);

        var formXAxis = decodeURIComponent($(e.target).data('formxaxis'));
        if (typeof formXAxis == 'undefined' || formXAxis == 'undefined' || formXAxis === '') {
            formXAxis = decodeURIComponent($(e.target).parents('a').data('formxaxis'));
        }
        $('#formXAxis').val(formXAxis);

        var formdockind = decodeURIComponent($(e.target).data('formdockind'));
        if (typeof formdockind == 'undefined' || formdockind == 'undefined' || formdockind === '') {
            formdockind = decodeURIComponent($(e.target).parents('a').data('formdockind'));
        }
        $('#formdockind').val(formdockind);

        var formadesc = decodeURIComponent($(e.target).data('formadesc'));
        if (typeof formadesc == 'undefined' || formadesc == 'undefined' || formadesc === '') {
            formadesc = decodeURIComponent($(e.target).parents('a').data('formadesc'));
        }
        $('#formadesc').val(formadesc);

        var mobile = $('#phone_number').val();
        var email = $('#email').val();

        var additionalFormFields = "";

        //Audit
        documentAudit(1, "", formDocType, title, formDownloadToken, formdockind, isMandatory, formXAxis, "", "", documentAuditRuntimeId, additionalFormFields); //formadesc

        var fieldsData = $(e.target).data('formfields');
        if (typeof fieldsData == 'undefined' || fieldsData == 'undefined' || fieldsData === '') {
            fieldsData = $(e.target).parents('a').data('formfields');
        }
        fieldsData = JSON.parse(decodeURIComponent(fieldsData));

        if (fieldsData && fieldsData.fieldsArray && fieldsData.fieldsArray.length > 0) {
            dust.render("pdf_download_form_fields", fieldsData.fieldsArray, function (err, out) {
                $("#fieldsUlId").html(out);
            });

            $.each(fieldsData.fieldsArray, function (i, item) {
                //console.log(item.name);
                //console.log(window[item.name]);
                if (typeof window[item.rfield] !== 'undefined' && window[item.rfield] !== 'undefined' && window[item.rfield] !== null) {
                    $('#' + item.id).val(decodeURIComponent(window[item.rfield]));
                    $('#' + item.id).data('rfield', item.rfield);
                }
            });
        }

        if ($('#phone_number') !== 'undefined' && $('#phone_number') !== null && $('#phone_number').length > 0) {
            $('#identificationNumber').parent().css('width', '50%');
            $('#phone_number').parent().css('width', '50%');
        }

        if (isMandatory) {
            $($('.form-download-identification-field').find('label')[0]).html($($('.form-download-identification-field').find('label')[0]).html() + ' <span class="form-download-required-field-asterix">*</span>');
        }

        firstTimeFormInputEditing = true;

        return false;
    });

    $('body').on('blur', '.form-download-field-input', function (e) {
        if (!firstTimeFormInputEditing) {
            executeFieldValidation(e.target.id);
        }
    });

    $('body').on('click', '.cancel-download', function (e) {
        //$('.cancel-download').click(function () {
        var title = $('#formsignalTitle').text();

        var downloadToken = $('#formDownloadToken').val();
        var docType = $('#formDocType').val();
        var identificationNumber = $('#identificationNumber').val();
        var kind = $('#formdockind').val();
        var docXAxis = $('#formXAxis').val();
        var adesc = $('#formadesc').val();

        var mobile = $('#phone_number').val();
        var email = $('#email').val();

        var downloadFormInputs = $("#fieldsUlId :input");
        var downloadFormInputsObj = $.map(downloadFormInputs, function (n, i) {
            var o = {};
            o[n.name] = $(n).val();
            return o;
        });
        //console.log(downloadFormInputsObj);
        additionalFormFields = JSON.stringify(downloadFormInputsObj);

        //Audit
        documentAudit(3, identificationNumber, docType, title, downloadToken, kind, isMandatory, docXAxis, mobile, email, documentAuditRuntimeId, additionalFormFields); //adesc

        var gaAction = (isMandatory === true) ? 'AbandonSignal_Cancel_id-y' : 'AbandonSignal_Cancel_id-n';
        try {
            var pdfEvent = 'GTM event To GA';
            if (typeof dataLayer != 'undefined') {
                dataLayer.push({
                    GA_EventCategory: 'Form download',
                    GA_EventAction: gaAction,
                    GA_EventLabel: title,
                    event: pdfEvent
                });
            }
        }
        catch (ex) { }

        $.magnificPopup.instance.close();
    });

    $('body').on('click', '#submit_formDownloadForm', function (e) {
        //$('#submit_formDownloadForm').click(function () {
        return formDownloadSubmit();
    });

    function formDownloadSubmit() {
        var title = $('#formsignalTitle').text();

        var downloadToken = $('#formDownloadToken').val();
        var docType = $('#formDocType').val();
        var identificationNumber = $('#identificationNumber').val();
        var kind = $('#formdockind').val();
        var docXAxis = $('#formXAxis').val();
        var adesc = $('#formadesc').val();

        var mobile = $('#phone_number').val();
        var email = $('#email').val();

        var validationPassed = true;
        var dataSent = $('#fieldsUlId').find('input[type=text]');

        $.each(dataSent, function (i, item) {
            validationPassed = executeFieldValidation(dataSent[i].id) && validationPassed;
        });

        firstTimeFormInputEditing = false;

        if (validationPassed === true) {

            var downloadFormInputs = $("#fieldsUlId :input");
            var downloadFormInputsObj = $.map(downloadFormInputs, function (n, i) {
                var o = {};
                var fieldValue = $(n).val();
                o[n.name] = encodeURIComponent(fieldValue).replace("\'", "%27");
                return o;
            });
            //console.log(downloadFormInputsObj);
            var additionalFormFields = JSON.stringify(downloadFormInputsObj);

            //Audit
            documentAudit(2, identificationNumber, docType, title, downloadToken, kind, isMandatory, docXAxis, mobile, email, documentAuditRuntimeId, additionalFormFields); //adesc

            //CONTINUE IS REGISTERED ONLY IF VALIDATION PASSED.
            var gaAction = (isMandatory === true) ? 'AbandonSignal_Continue_id-y' : 'AbandonSignal_Continue_id-n';
            try {
                var pdfEvent = 'GTM event To GA';
                if (typeof dataLayer != 'undefined') {
                    dataLayer.push({
                        GA_EventCategory: 'Form download',
                        GA_EventAction: gaAction,
                        GA_EventLabel: title,
                        event: pdfEvent

                    });
                }
            }
            catch (ex) { }

            var height = $('#share-popup').css("height");
            var width = $('#share-popup').css("width");

            if ($('#share-popup').find('.loading').length == 0) {
                dust.render('popup_spinner', {
                    loading_text: Harel.Config.LoadingText
                }, function (err, out) {
                    if (err)
                        return;
                    $('#share-popup').parent().append(out);

                    $(".loading").css("height", height);
                    $(".loading").css("width", width);
                    $(".loading").css("background-color", "#ffffff");
                    $(".loading").css("position", 'absolute');
                    $(".loading").css("top", '0px');

                    $(".loading").show();
                });
            }

            var dataJSON = { "docType": docType, "downloadToken": downloadToken, "identificationNumber": identificationNumber, "userDetails": [], "downloadAction": adesc };

            $.each(dataSent, function (i, item) {
                var fieldInputValue = encodeURIComponent($('#' + dataSent[i].id).val()).replace("\'", "%27");

                var field = {
                    "fieldId": dataSent[i].id,
                    "fieldType": dataSent[i].type,
                    "value": fieldInputValue,
                    "fieldName": $('#' + dataSent[i].id).data('rfield'),
                    "fieldKey": $('#' + dataSent[i].id).data('pdfkey'),
                };

                dataJSON.userDetails.push(field);
            });

            openRequestedPopup("/_vti_bin/webapi/FormsDownload/PDF", title, dataJSON);

            $(".loading").css("height", "auto");
            $(".loading").css("width", "auto");
            $(".loading").css("background-color", "transparent");
            //$(".loading").css("position", '');
            $(".loading").css("top", "auto");
            $(".loading").hide();

            $.magnificPopup.instance.close();

        }
        return false;
    }

    $(document).on("keypress", "#fieldsUlId input", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            formDownloadSubmit();
            e.stopPropagation();
            return false;
        }
    });
});

function executeFieldValidation(elementId) {
    var fieldValidation = $('#' + elementId).data('validation');

    if (fieldValidation !== '') {
        var validationValue = $('#' + elementId).val();
        var fieldOk = executeFunctionByName(fieldValidation, window, validationValue, elementId);
        if (fieldOk) {
            $('#' + elementId).removeClass('error');
            $('#' + elementId + '-error').hide();
        }
        else {
            $('#' + elementId).addClass('error');
            $('#' + elementId + '-error').show();
        }

        return fieldOk;
    }

    return true;
}

//usage:
//executeFunctionByName("My.Namespace.functionName", window, arguments);
function executeFunctionByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

function validateFormDownloadIdNumber(value, elementId) {
    if (randomPdfRequiredFields === false && value === '') {
        return true;
    }
    if (value && value !== '') {
        return window.harel_portal_validation.check_id_number(value);
    }
    return false;
}

function validateFormDownloadPhoneNumber(value, elementId) {
    if (value === '')
        return true;
    var phoneno = /^\d{8,10}$/;
    if (value.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}

formDownloadMobilePrefixes = ["050", "051", "052", "053", "054", "055", "057", "058", "059"];

function validateFormDownloadMobile(value, elementId) {
    if (value === '')
        return true;
    var phoneno = /^\d{10}$/;
    if (value.match(phoneno)) {
        if (window.harel_portal_validation.get_valid_prefix(value, formDownloadMobilePrefixes) !== false) {
            return true;
        }
        else {
            //$('#' + elementId + '-error').text(login_validation.messages[name].prefixes);
        }
    }
    return false;
}

function validateFormDownloadEmail(value) {
    if (value === '')
        return true;
    var re = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    return re.test(value.trim());
}

function documentAudit(eventId, userIdentification, docType, docName, docUrl, docKind, currentlyMandatory, docXAxis, mobile, email, documentAuditRuntimeId, additionalFormFields) {
    switch (docKind) {
        case 'פדיון':
            {
                docKind = 1;
            }
            break;
        case 'ביטול':
            {
                docKind = 2;
            }
            break;
        case 'ללא':
        default:
            {
                docKind = 0;
            }
            break;
    }

    if (docName && docName !== 'undefined' && docName !== '') {
        docName = docName.trim();
    }

    var dataJSON = {
        "eventId": eventId,
        "isUserIDMandatory": currentlyMandatory,
        "formUserId": userIdentification,
        "formMobile": mobile,
        "formEmail": email,
        "dimutDocType": docType,
        "portalDocTitle": docName,
        "portalDocClassification": docKind,
        "portalDocAxisX": docXAxis,
        "docUrl": docUrl,
        "runtimeId": documentAuditRuntimeId,
        "additionalFormFields": additionalFormFields
    };
    $.ajax({
        type: 'POST',
        url: "/_vti_bin/webapi/FormsDownload/logAction",
        data: JSON.stringify(dataJSON),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (data) {
        },
        error: function (data) {
        }
    });
}

//var pdfWindowObjectReference = null; // global variable

function openRequestedPopup(strUrl, strWindowName, dataJson) {

    $form = $("<form method='POST' contentType='application/json; charset=UTF-8'><input type='hidden' name='data' value='" + JSON.stringify(dataJson) + "'/></form>").attr("action", strUrl).attr("target", "_blank");
    $('body').append($form);
    $form.submit();
    $form.remove();
}

//better guid generator - but requires ES6 (latest browsers)
//function uuidv4() {
//    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//    )
//}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              SurveyPopup
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if (typeof (isValidPopupRuls) != "undefined" && isValidPopupRuls == "True")
        EnterSurvey();
    if (!($('#scanovateJson') === undefined)) {
        // var token = getQueryParams()["accessToken"];
        var url = "/_vti_bin/webapi/Token/GetTokenForScanovate";//?accessToken" + token;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                console.log("result", result);
                $('#scanovateJson').text(JSON.stringify(result, null, '\t'));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error", errorThrown);
            }
        });   
    }
});

function EnterSurvey() {

    $.ajax({
        type: "GET",
        url: "/_vti_bin/webapi/Survey/GetSurvey",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != null) {
                if (result.m_Item1 == true && result.m_Item2 != "" && result.m_Item2.length > 0)
                    openSurveyPopup(result.m_Item2);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("error", errorThrown);
        }
    });
}

function openSurveyPopup(url) {
    var isLoading = false;
    var id = 'surveyPopup';
    var $popup = $('#' + id).show();
    var $iframe = $('#' + id + " iframe");
    $iframe.attr("data-src", url);
    window.harel_portal_utils.showIframePopup(id, '', false);

    $popup.find('.survey_close').on('click', function (e) {
        $popup.ensureExit();
    });
    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 || e.which == 27) {
            $popup.ensureExit();
        }
    });
}

$.fn.ensureExit = function () {
    var $popup = $(this).show();
    var $frame = $popup.find('iframe');
    var $ensure = $popup.find('.ensure_exit');
    var $closeBtn = $popup.find('.survey_close');
    $frame.hide();
    $ensure.show();
    $closeBtn.hide();
    $ensure.find('.ensure_back').on('click', function () {
        $ensure.hide();
        $closeBtn.show();
        $frame.show();
    });
    $ensure.find('.ensure_confirm').on('click', function () {
        $frame.closePopup();
    });
}

$.fn.closePopup = function () {
    var $frame = $(this);
    $frame.attr("src", "");
    //var frame = $frame[0];
    //var frameDoc = frame.contentDocument || frame.contentWindow.document;
    //frameDoc.removeChild(frameDoc.documentElement);
    $.magnificPopup.instance.close();
}

$('#SaveUserInRedis').click(function () {
    if (IsAuthentication == true) {

        $.ajax({
            type: "POST",
            url: "/_vti_bin/webapi/CustomersAuthentication/PostAuthenticate/BotCreateTicket/",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.postMessage(result, "*");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error", errorThrown);
            }
        });
    }
});
Harel.Authentication = {
    CheckIsAuthentication: function (callback) {
        $.ajax({
            type: "GET",
            url: "/_vti_bin/webapi/CustomersAuthentication/GetIsAuthenticate",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {
                console.log("result", result);
                window.isLogin = result;
                callback(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error", errorThrown);
            }
        });
    }
};

    if (typeof (IsAuthentication) != "undefined" && !IsAuthentication && !sessionStorage.CurrentUserDetails) {
        if (typeof (IsEditMode) != "undefined" && !IsEditMode) {
            var els = document.querySelectorAll("a[href^='/CustomerRouting.ashx']");
            for (var i = 0, l = els.length; i < l; i++) {
                var el = els[i];
                var cdata = { "id": "CustomerRouting", "source": el.href + "&isLogin=false" }
                el.setAttribute("onclick", "window.postMessage(" + JSON.stringify(cdata) + ", '*');");
                el.href = "#";

            }

        }
}


    // Harel.Authentication.CheckIsAuthentication(function (res) {
    //          console.log("CheckIsAuthentication()1111", res);
    // });

