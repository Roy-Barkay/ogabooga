define(["jquery", "utils", "resize"], function ($, utils) {
    try {
        function autoSendImpression() {
            $(".gaType_imperssion").each(function (i, e) {
                $this = $(e);
                if (!$this.hasClass("gaType_imperssion_sent")) {
                    sendEvent($this, "imperssion");
                    $this.addClass("gaType_imperssion_sent");
                }
            });
        }

        function sendEvent($this, type, event) {
            if (typeof dataLayer !== "undefined") {
                if (typeof event == "undefined") {
                    event = 'GTM event To GA'
                }
                var cat = $this.data('ga-category').split(";");
                var action = $this.data('ga-action').split(";")
                var label = $this.data('ga-label').split(";")
                for (i = 0; i < cat.length; i++) {
                    dataLayer.push({
                        GA_EventCategory: cat[i] || "",
                        GA_EventAction: action[i] || "",
                        GA_EventLabel: label[i] || "",
                        event: event
                    });

                    //if (mixpanel && cat[i] == "Form download") {
                    //    mixpanel.track('Download Form', {
                    //        'Source System Code': window.elastic_log_data.portal_id, 'User Type Code': 3, 'Page Name': document.querySelector("div.page_title span.title").innerText, 'Page Path URL': document.location.pathname, 'Click Text': label[i], 'Click Target URL': $this[0].href, Strip: 'Content',
                    //    });
                    //}
                    //else {
                    //    mixpanel.track('Click', { 'Source System Code': window.elastic_log_data.portal_id, 'User Type Code': 3, 'Page Name': document.querySelector("div.page_title span.title").innerText, 'Page Path URL': document.location.pathname, 'Click Text': label[i], 'Click Target URL': $this[0].href});
                    //}
                }
            }
        }

        function sendData(data) {
            if (typeof dataLayer !== "undefined") {
                dataLayer.push(data);
            }
        }
        $(document).ready(function () {
            if (typeof(IsEditMode) != "undefined" && !IsEditMode) {
                $("a[href$='.pdf']:not(.gaType_click)").each(function (index, element) {
                    $.data(element, "ga-category", "Form download");
                    $.data(element, "ga-action", "Download");
                    $.data(element, "ga-label", element.innerText);
                    $(element).addClass("gaType_click");
                });
            }
            //gaType_click
            //gaType_imperssion
            //gaType_hover
            $(document).on("click", ".gaType_click", function (e) {
                var $this = $(e.target);
                if (!$this.hasClass("gaType_click")) {
                    $this = $(e.target).parents(".gaType_click");
                }

                var before_click = $this.data('ga-before-click');

                if (before_click != undefined)
                    Harel.GTM[before_click]();

                sendEvent($this, "click");
            });
            $(document).on("hover", ".gaType_hover", function (e) {
                var $this = $(e.target);
                if (!$this.hasClass("gaType_hover")) {
                    $this = $(e.target).parents(".gaType_hover");
                }
                sendEvent($this, "hover");
            });
            autoSendImpression();
        });
        return {
            "autoSendImpression": autoSendImpression,
            "sendData": sendData
        }
    } catch (err) {
        console.log("JS ERROR - tag_manager");
        console.log(err);
    }
});
