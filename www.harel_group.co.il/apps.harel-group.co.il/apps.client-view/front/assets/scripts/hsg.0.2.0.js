/*
 * HSG - Harel Style Guide
 * Version 0.2.0
 * Created on 25-02-2015 11:02 by Yariv Arbiv
 */
;(function(core) {

  if (!window.jQuery) {
    throw new Error("HSG requires jQuery");
  }

  if (window && window.jQuery) {
    core(window, window.jQuery, window.document);
  }

})(function(global, $, doc) {

  "use strict";

  var HSG = $.HSG || {},
    $html = $("html"),
    $win = $(window);

  if (HSG.fn) {
    return HSG;
  }


  // build HSG main function
  HSG.fn = function(command, options) {
    var args = arguments,
      cmd = command.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),
      component = cmd[1],
      method = cmd[2];

    if (!HSG[component]) {
      $.error("HSG component [" + component + "] does not exists");
      return this;
    }

    return this.each(function() {
      var $this = $(this),
        data = $this.data(component);

        if (!data) {
          $this.data(component, (data = HSG[component](this, method ? undefined : options)));
        }

        if (method) {
          data[method].apply(data, Array.prototype.slice.call(args, 1));
        }
    });
  };


  // build supports
  HSG.support = {};


  HSG.support.svg = (function() {
    return !!('createElementNS' in document && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect);
  })();


  HSG.support.transition = (function() {

    var transitionEnd = (function() {

      var element = doc.body || doc.documentElement,
        transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
        }, name;

      for (name in transEndEventNames) {
        if (element.style[name] !== undefined) return transEndEventNames[name];
      }
    }());

    return transitionEnd && { end: transitionEnd };
  })();


  HSG.support.animation = (function() {

    var animationEnd = (function() {

      var element = doc.body || doc.documentElement,
        animEndEventNames = {
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'animationend',
        OAnimation: 'oAnimationEnd oanimationend',
        animation: 'animationend'
        }, name;

        for (name in animEndEventNames) {
          if (element.style[name] !== undefined) return animEndEventNames[name];
        }
    }());

    return animationEnd && { end: animationEnd };
  })();


  HSG.support.requestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.msRequestAnimationFrame || global.oRequestAnimationFrame || function(callback){ global.setTimeout(callback, 1000/60); };


  HSG.support.touch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  
  
   HSG.support.inputtypes = (function(props) {
            var inputElem  = document.createElement('input'), 
                smile = ':)',
                inputs = {},
                docElement = document.documentElement;
            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));


  HSG.support.mutationobserver = (global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver || null);


  // build utils
  HSG.utils = {};


    HSG.utils.scriptSource = (function() {
        var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length - 1];

        if (script.getAttribute.length !== undefined) {
            return script.getAttribute('src');
        }

        return script.getAttribute('src', 2);
    }());

  HSG.utils.debounce = function(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };


  HSG.utils.removeCssRules = function(selectorRegEx) {
      var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;

      if(!selectorRegEx) return;

      setTimeout(function(){
          try {
            _ref = document.styleSheets;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              stylesheet = _ref[_i];
              idxs = [];
              stylesheet.cssRules = stylesheet.cssRules;
              for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                  idxs.unshift(idx);
                }
              }
              for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                stylesheet.deleteRule(idxs[_k]);
              }
            }
          } catch (_error) {}
      }, 0);
  };


  HSG.utils.isDevice = function(device) {
    switch (device) {
      case "ios":
       return /iPhone|iPad|iPod/i.test(navigator.userAgent);

      case "android":
       return /Android/i.test(navigator.userAgent);

      default:
       return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

  };


  HSG.utils.isInView = function(element, options) {

    var $element = $(element);

    if (!$element.is(":visible")) {
      return false;
    }

    var windowLeft = $win.scrollLeft(),
      windowTop = $win.scrollTop(),
      offset = $element.offset(),
      left = offset.left,
      top = offset.top;

    options = $.extend({
      topoffset: 0,
      leftoffset: 0
    }, options);

    if (top + $element.height() >= windowTop && top - options.topoffset <= windowTop + $win.height() &&
        left + $element.width() >= windowLeft && left - options.leftoffset <= windowLeft + $win.width()) {
        return true;
      } else {
        return false;
      }
  };


  HSG.utils.scrollTo = function(element, options) {

    var $element = $(element);

    if (!$element.is(":visible")) {
      return false;
    }

    options = $.extend({
      duration: 400
    }, options);

    $('html, body').animate({
        scrollTop: $element.offset().top
    }, options.duration);
  };


  HSG.utils.scrollWindow = function(amount) {
    $("html, body").animate({
      scrollTop: $win.scrollTop()+amount
    });
  };


  HSG.utils.options = function(string) {

    if ($.isPlainObject(string)) {
      return string;
    }

    var start = (string ? string.indexOf("{") : -1 ), options = {};

    if (start != -1) {
      try {
        options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))();
      } catch(e) {}
    }

    return options;
  };

  HSG.utils.files={loading:{},loaded:{}};
  
  HSG.utils.loadfile = function(filename, cbk) {
    $.ajaxSetup({
      cache: true
    });
      if( HSG.utils.files.loaded[filename]){
          cbk(HSG.utils.files.loaded[filename].data,HSG.utils.files.loaded[filename].textStatus,HSG.utils.files.loaded[filename].jqxhr);
      }else if( HSG.utils.files.loading[filename]){
            $(window).on( "hsg.fileloaded", function( event, loaded_file_name ) {
               if(loaded_file_name==filename){
                    cbk(HSG.utils.files.loaded[filename].data,HSG.utils.files.loaded[filename].textStatus,HSG.utils.files.loaded[filename].jqxhr);
               }
            });
          
      }else{
           HSG.utils.files.loading[filename]=true;
           $.getScript(filename, function(data, textStatus, jqxhr){
               HSG.utils.files.loaded[filename]={data:data, textStatus:textStatus, jqxhr:jqxhr};
               delete HSG.utils.files.loading[filename];
               cbk(data, textStatus, jqxhr);
               $(window).trigger("hsg.fileloaded",filename);
           });
      }
  };
  
  
  HSG.utils.loadfiles = function (arr, done){
        function loopFn(nextTask, value) {
            HSG.utils.loadfile(value, nextTask);
        }
        var current = 0;

        loopFn(function iterate() {
            if (++current < arr.length) {
                loopFn(iterate, arr[current]);
            } else {
                done();
            }
        }, arr[current]);
    };
  


  // build events
  HSG.utils.events = {};


  HSG.utils.events.click = HSG.support.touch ? "tap" : "click";


  // declare HSG
  $.HSG = HSG;
  $.fn.hsg = HSG.fn;


  $(function(){
    $(document).trigger("hsg-domready");

    // remove css hover rules for touch devices
    if (HSG.support.touch) {
        HSG.utils.removeCssRules(/\.hsg-(?!navbar).*:hover/);
    }
  });


  $html
    .addClass(HSG.support.touch ? "hsg-touch" : "hsg-no-touch")
    .addClass(HSG.support.animation ? "hsg-animation" : "hsg-no-animation")
    .addClass(HSG.support.svg ? "hsg-svg" : "hsg-no-svg");


  return HSG;
});

;(function($, HSG) {

  "use strict";

  HSG.components = {};

  HSG.component = function(name, def) {

    var fn = function(element, options) {
      var $this = this;

      this.element = element ? $(element) : null;
      this.options = $.extend(true, {}, this.defaults, options);

      // attach fn to element
      if (this.element) {
        this.element.data(name, this);
      }

      this.init();

      this.trigger("init", [this]);
    };


    $.extend(true, fn.prototype, {

      defaults: {},

      init: function() {
        console.log("init");
      },

      trigger: function(evt, params) {
        return $(this.element || this).trigger(evt, params);
      },

      on: function() {
        return $(this.element || this).on.apply(this.element || this, arguments);
      },

      one: function() {
        return $(this.element || this).one.apply(this.element || this, arguments);
      },

      off: function(evt) {
        return $(this.element || this).off(evt);
      },

      find: function(selector) {
        return this.element ? this.element.find(selector) : $([]);
      }
    }, def);


    this.components[name] = fn;

    //TODO: figure what is this for
    // set element and options
    this[name] = function() {
      var element, options;

      if (arguments.length) {
        switch(arguments.length) {
          case 1:
            if (typeof arguments[0] === "string" || arguments[0].nodeType || arguments[0] instanceof jQuery) {
            element = $(arguments[0]);
            } else {
            options = arguments[0];
            }
            break;

          case 2:
            element = $(arguments[0]);
            options = arguments[1];
            break;
        }
      }

      // return element fn if attached to his data
      if (element && element.data(name)) {
        return element.data(name);
      }

      return (new HSG.components[name](element, options));
    };

    return fn;
  };

})(jQuery, jQuery.HSG);

;(function($, HSG) {

  "use strict";

  var $win = $(window), event = "resize orientationchange";


  HSG.component("gridMatch", {

    columns: null,
    elements: null,

    defaults: {
      target: null,
      row: null
    },

    init: function() {
      var $this = this;

      if (!this.element.data("gridMatch")) return;

      this.element.trigger("hsg.gridmatch.initiating");

      this.columns = this.element.children();
      this.elements = this.options.target ? this.element.find(this.options.target) : this.columns;

      if (!this.columns.length) return;

      $win.on(event, (function() {
        var fn = function() {
          $this.match();
        };

        $(function() {
          fn();
          $win.on("load", fn);
        });

        return HSG.utils.debounce(fn, 150);
      })());

      $(document).on("hsg-domready", function() {
        $this.columns = $this.element.children();
        $this.elements = $this.options.target ? $this.element.find($this.options.target) : $this.columns;
        $this.match();
      });

      this.element.trigger("hsg.gridmatch.init");

      return this;
    },

    match: function() {
      this.element.trigger("hsg.gridmatch.matching");

      this.revert();

      var firstVisible = this.columns.filter(":first:visible");

      if (!firstVisible.length) return;

      var stacked = Math.ceil(100 * parseFloat(firstVisible.css('width')) / parseFloat(firstVisible.parent().css('width'))) >= 100 ? true : false,
          max = 0,
          $this = this;

      if (stacked) return;

      if (this.options.row) {

        // force redraw
        this.element.width();

        // setTimeout is to let the rendering threads catch up.
        // http://stackoverflow.com/a/779785
        setTimeout(function(){
          var lastoffset = false,
            group = [];

          $this.elements.each(function(i) {
            var ele = $(this),
              offset = ele.offset().top;

              if(offset != lastoffset && group.length) {

                  $this.matchHeights($(group));
                  group  = [];
                  offset = ele.offset().top;
              }

              group.push(ele);
              lastoffset = offset;
          });

          if(group.length) {
              $this.matchHeights($(group));
          }

        }, 0);
      } else {

        this.matchHeights(this.elements);
      }

      this.element.trigger("hsg.gridmatch.match");

      return this;
    },

    matchHeights: function(elements) {
      var max = 0;

      if (elements.length < 2) return;

      elements.each(function() {
          max = Math.max(max, $(this).outerHeight());
      }).each(function() {

          var element = $(this),
              height  = max; // removed this calculation: - (element.outerHeight() - element.height());

          element.css('min-height', height + 'px');
      });

    },

    revert: function() {
      this.elements.css("min-height", "");
      return this;
    }
  });


  // attach events
  $(document).on("hsg-domready", function(e) {
    $("[data-hsg-grid-match]").each(function() {
      var obj, ele = $(this);

      if (!ele.data("gridMatch")) {
        obj = HSG.gridMatch(ele, HSG.utils.options(ele.attr("data-hsg-grid-match")));
      }
    });
  });

})(jQuery, jQuery.HSG);

;(function($, HSG) {

	"use strict";

	HSG.component("stripCollapse", {
		cls: {
			strip: "hsg-strip",
			close: "hsg-strip-close",
			opening: "hsg-opening",
			title: "hsg-strip-title"
		},

		defaults: {
			head: ".hsg-strip-head",
			side: ".hsg-strip-side",
			body: ".hsg-strip-body",
			row: ".hsg-strip-row",
			content: ".hsg-strip-content",
			duration: 400,
			title: "לחץ לפתיחה/סגירה של המידע"
		},

		init: function() {
			var $this = this,
				$head = this.element.find(this.options.head),
				$side = this.element.find(this.options.side);

			if (!this.element.hasClass(this.cls.strip)) {
				throw new Error("HSG strip collapse must be used on hsg-strip");
			}
			
			$head.attr("aria-expanded", !$this.element.hasClass(this.cls.close));
			$head.attr("role","button");

			// handle strip head
			$head
				.on("click.strip.hsg", function(e) {
					// dont trigger the strip collapse if we press on a link
					if ( e.target.nodeName !== "A") {
						e.preventDefault();
						$this.toggle();
					}
				})
				.on("keypress.strip.hsg", function(e) {
					var key = e.which;
					if(key === 13) {
						$(this).trigger("click.strip.hsg");
					}
				})
				.prop("tabindex", "0")
				.prop("title", this.options.title);


			// handle strip side
			$side
				.on("click.strip.hsg", function(e) {
					// by finding the display of the title we know if we are in collapse mode
					if ( e.target.nodeName !== "A" && $(this).find("." + $this.cls.title).css("display") == "inline-block" ) {
						e.preventDefault();
						$this.toggle();
					}
				})
				.on("keypress.strip.hsg", function(e) {
					if(e.which === 13) {
						$(this).trigger("click.strip.hsg");
					}
				});


			// attach title property if we are on collapse mode
			if ($side.find("." + $this.cls.title).css("display") == "inline-block") {
				$side.prop("title", this.options.title);
			}


			return this;
		},

		toggle: function() {
			if (this._isClose()) {
				this.open();
			} else {
				this.close();
			}
		},

		_isClose: function() {
			return this.element.hasClass(this.cls.close);
		},

		_getBody: function() {

			// return all rows (first row is strip head) if exists
			if (this.element.find(this.options.row).length) {
				return this.element.find(this.options.row + ":not(:first)");
			} else {
				return (this.element.find(this.options.body).length) ? this.element.find(this.options.body) : this.element.find(this.options.content);
			}
		},

		close: function() {
			var $this = this;
			
			var $head = this.element.find(this.options.head);

			this.element.trigger("hsg.stripcollapse.closing");

			this._getBody().slideUp(this.options.duration, function() {
				$this.element.addClass($this.cls.close);
				
				$this.element.trigger("hsg.stripcollapse.close");
				$head.attr("aria-expanded", false);
			});

		},

		open: function() {
			var $this = this,
			$body = this._getBody();
			
			var $head = this.element.find(this.options.head);

			this.element.trigger("hsg.stripcollapse.opening");

			this.element.addClass(this.cls.opening);

			$body.slideDown(this.options.duration, function() {
				$this.element.removeClass($this.cls.close).removeClass($this.cls.opening);

				if ( !HSG.utils.isInView($body, {topoffset: 0-$body.outerHeight()}) ) {
					HSG.utils.scrollTo($this.element);
				}
				
				$head.attr("aria-expanded", true);

				$this.element.trigger("hsg.stripcollapse.open");
			});
		}
	});


	// attach
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-strip-collapse]").each(function() {
			var obj, ele = $(this);

			if (!ele.data("stripCollapse")) {
				obj = HSG.stripCollapse(ele, HSG.utils.options(ele.attr("data-hsg-strip-collapse")));
			}
		});
	});

})(jQuery, jQuery.HSG);

;(function($, HSG) {

  "use strict";

  var $win = $(window);

  HSG.component("tableSide", {

    init: function() {
      if (!this.element.data("tableSide")) return;

      this.element.trigger("hsg.tableside.initiating");

      this.element.scrollLeft($win.width());

      this.element.trigger("hsg.tableside.init");
    }
  });


  // attach event
  $(document).on("hsg-domready", function(e) {
    $(".hsg-table-responsive").each(function() {
      var obj, ele = $(this);

      if (!ele.data("tableSide")) {
        obj = HSG.tableSide(ele, {});
      }
    });
  });

})(jQuery, jQuery.HSG);

;(function($, HSG) {

  "use strict";

  HSG.component("cube", {

    cls: {
      content: "hsg-cube-content",
      item: "hsg-cube-item",
      disabled: "hsg-cube-disabled",
      close: "hsg-cube-close",
      active: "hsg-cube-active",
      opening: "hsg-cube-opening"
    },

    defaults: {
      duration: 400
    },

    init: function() {
      var $this = this;

      if(!this.element.data("cube")) return;

      this.element.trigger("hsg.cube.initiating");

      this.element.find("." + this.cls.item).on("click", function(e) {
        e.preventDefault();
        $this.toggle(this);
      });

      this.element.find("." + this.cls.close).on("click", function(e) {
        e.preventDefault();
        $this.close(this);
      });

      this.updateCubesPositionForIE();

      this.element.trigger("hsg.cube.init");

      return this;

    },

    updateCubesPositionForIE: function() {
      var $this = this;

      //TODO: add support for second row
      //TODO: check if i still need this after using selectivizer.js
      // if ($(".ie8").length) {
      //   this.element.children().each(function(i) {
      //     $(this).find("." + $this.cls.content).css({
      //       "marginRight": (0-(i * 100)) + "%"
      //     });
      //   });

      // }
    },

    toggle: function(item) {
      var activeItem = $(item).closest("li");

      if (activeItem.hasClass(this.cls.active)) {
        this.close(item);

      } else {
        this.open(item);
      }
    },

    open: function(item) {
      item = isNaN(item) ? $(item) : this.element.find(this.options.toggle).eq(item);
      var $this = this,
            activeItem = item.closest("li");

      this.element.trigger("hsg.cube.opening", [activeItem]);

      if (activeItem.hasClass(this.cls.disabled)) return;

      // hide all content
      this.element
        .addClass(this.cls.opening)
        .children().removeClass(this.cls.active)
        .find("." + this.cls.content).hide();

      // show active item
      activeItem
        .addClass($this.cls.active)
        .find("." + this.cls.content).slideDown(this.options.duration, function() {
          $this.element.removeClass($this.cls.opening);
        });


      this.element.trigger("hsg.cube.open", [activeItem]);

    },

    close: function(item) {
      item = isNaN(item) ? $(item) : this.element.find(this.options.toggle).eq(item);
      var $this = this,
            activeItem = item.closest("li");

      this.element.trigger("hsg.cube.closing", [activeItem]);

      if (activeItem.hasClass(this.cls.disabled)) return;

      activeItem.find("." + this.cls.content).slideUp(this.options.duration, function() {
        activeItem.removeClass($this.cls.active);
      });

      this.element.trigger("hsg.cube.close", [activeItem]);
    }

  });


  // attach
  $(document).on("hsg-domready", function(e) {
    $("[data-hsg-cube]").each(function() {
      var obj, ele = $(this);

      if (!ele.data("cube")) {
        obj = HSG.cube(ele, HSG.utils.options(ele.attr("data-hsg-cubes")));
      }
    });
  });

})(jQuery, jQuery.HSG);