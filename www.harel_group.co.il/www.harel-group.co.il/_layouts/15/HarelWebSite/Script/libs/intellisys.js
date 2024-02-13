define([
 "jquery",
 "ajax_app"
], function ($) {

    /* ===========================================================
     * intellisys v1
     * ===========================================================*/
    !function ($) {
        //"use strict";

        /* Intellisys CLASS DEFINITION
        * ====================== */

        var Intellisys = function (element, options) {
            this.init(element, options);
        };

        Intellisys.prototype = {
            constructor: Intellisys,
            frameloaded: false,
            reportdrawn: false,
            reportloaded: false,
            init: function (element, options) {
                if (!window._INTELLISYS_MANAGER) {
                    window._INTELLISYS_MANAGER = { counter: 0, instances: {} };
                }
                if (!this.instanceId) {
                    this.instanceId = ++window._INTELLISYS_MANAGER.counter;
                }


                this.options = options;
                this.$element = $(element);

                if (!this.options.reportid) {
                    alert("Missing Intellisys Report Id!");
                    return;
                }
                /* this.isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
                 var _this = this;
                 window.document.addEventListener('orientationchange', function () {
                     if (_this.isIOS && _this.$frame){
                         _this.$frame.width(_this.$frame.parent().width());
                     }
                 }, false);*/

            },
            _parseFilters: function () {
                var filters = this.options.filters;
                if (filters) {
                    if (typeof filters == 'object') {

                    } else {
                        return filters;
                    }
                }
                return null;
            },
            create: function () {
                window._INTELLISYS_MANAGER[this.instanceId + ""] = {
                    instance: this,
                    proxyurl: this.options.proxyurl,
                    filters: this._parseFilters(),
                };
                this.frameloaded = false;
                this.reportloaded = false;
                this.reportdrawn = false;
                this.loading();

                if (!this.$element.hasClass("intellisys")) this.$element.addClass("intellisys");
                if (this.$frame) this.$frame.remove();

                var reportId = this.options.reportid;
                if (reportId.indexOf("!!!") != -1) {
                    var sURL = this.options.frameurl + "?IsNewPortal=1&RID=" + reportId.replace("!!!", "");
                } else {
                    var sURL = this.options.frameurl + "?RID=" + reportId;
                }

                var str = ["<iframe scrolling=\"no\" style=\"visibility:\" instanceid=\"" + (this.instanceId + "") + "\" id=\"_intellisys_" + this.instanceId];
                str.push("intellisys");
                str.push("\" class=\"intellisys frame\" title=\"סיכום הרכב נכסים\" src=\"");
                str.push(sURL);
                str.push("\"></iframe>");
                this.$frame = $(str.join("")).appendTo(this.$element);
                var _this = this;
                $(window).resize(function () {
                    _this.$frame.width("100%")
                });


                this.$frame.click(function (e) {
                    e.stopPropagation();
                    var $h = $(this);
                    var sAction = $h.attr("data-action");
                    if (sAction) {
                        $h.removeAttr("data-action");
                        switch (sAction) {
                            case "frameloaded":
                                _this.frameloaded = true;
                                _this._triggerElementEvent("frameloaded");
                                break;
                            case "reportload":
                                _this.reportloaded = true;
                                _this._triggerElementEvent("reportload");
                                break;
                            case "reportdrawn":
                                _this.$frame.css({ visibility: "visible" })
                                _this.removeLoading();
                                _this.reportdrawn = true;
                                _this._triggerElementEvent("reportdrawn");
                                //made for ie8
                                $('body').addClass('reset_display');
                                setTimeout(function () { $('body').removeClass('reset_display'); }, 50);
                                break;
                        }
                    }
                });
                return;
                _this._triggerElementEvent("created");
                this.$frame.on("frameloaded", function (e) {
                    //alert("frameloaded");
                    _this.frameloaded = true;
                    e.stopPropagation();
                    _this._triggerElementEvent("frameloaded");
                });
                this.$frame.on("reportload", function (e) {
                    //alert("reportload");
                    _this.reportloaded = true;
                    e.stopPropagation();
                    _this._triggerElementEvent("reportload");
                });
                this.$frame.on("reportdrawn", function (e) {
                    //alert("reportdrawn");
                    _this.$frame.css({ visibility: "visible" })
                    _this.removeLoading();

                    _this.reportdrawn = true;
                    e.stopPropagation();
                    _this._triggerElementEvent("reportdrawn");
                });


            },

            // publish ----------------------------------------------------------------------------------------------->

            publish: function () {
                try {
                    if (!this.reportdrawn) return;
                    this.$frame[0].contentWindow.doDashExport()
                } catch (e) {
                    return false;
                }
                return true;
            },

            // reload ----------------------------------------------------------------------------------------------->

            reload: function () {
                this.create();
            },

            // destroy ----------------------------------------------------------------------------------------------->

            destroy: function () {
                var e = $.Event('destroy');
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return;

                this.teardown();
            },
            teardown: function () {
                this.$element.html("");
                this.$element.off('.intellisys');
                this.$element.removeData('intellisys');
                this.$element
                    .removeClass('in')
                    .attr('aria-hidden', true);
            },

            // loading indication ------------------------------------------------------------------------------------>

            removeLoading: function () {
                this.$loading.remove();
                this.$loading = null;
                this.isLoading = false;
            },
            loading: function (callback) {
                callback = callback || function () { };
                if (!this.isLoading) {
                    if (this.$loading) this.removeLoading();
                    this.$loading = $('<div class="loading-mask">')
                        .appendTo(this.$element);

                    this.isLoading = true;
                } else if (callback) {
                    callback(this.isLoading);
                }
            },

            // Utilities ------------------------------------------------------------------------------------------------------>


            _triggerElementEvent: function (eventType, args) {
                this.$element.trigger(eventType, { instance: this });
            },
            toggle: function () { }
        };

        /* MODAL PLUGIN DEFINITION
        * ======================= */

        $.fn.intellisys = function (option, args) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('intellisys'),
                    options = $.extend({}, $.fn.intellisys.defaults, $this.data(), typeof option == 'object' && option);

                if (!data) $this.data('intellisys', (data = new Intellisys(this, options)));
                if (typeof option == 'string') data[option].apply(data, [].concat(args));
                else if (options.create) data.create()
            })
        };

        $.fn.intellisys.defaults = {
            reportid: null,
            loading: false,
            create: true,
            filters: null,
            frameurl: "/_layouts/15/HarelWebSite/HarelReports/OAOAnalysis/Dashboard/_sp_dashboard.htm",
            proxyurl: "/_layouts/15/HarelWebSite/HarelReports/ApplicationPages/HTTP_Proxy_Script.aspx",
        };
        $.fn.intellisys.Constructor = Intellisys;

        /* MODAL DATA-API
        * ============== */

        $(function () {
            $('[data-embed="intellisys"]').each(function () {
                var $target = $(this),
                option = $target.data('intellisys') ? 'toggle' : $.extend({}, $target.data());
                $target.intellisys(option);

            });
        });

    }(window.jQuery);

});