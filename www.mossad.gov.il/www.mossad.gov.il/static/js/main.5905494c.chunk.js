(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    106: function (e, t, a) {},
    107: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(43),
        i = a.n(o),
        l = (a(56), a(13)),
        c = a(1),
        s = a(9),
        u = a(3),
        m = a(4),
        d = a(7),
        h = a(5),
        f = a(6),
        p = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props.savedPositions;
                  return r.a.createElement(
                    s.b,
                    { to: "/positions", className: "saved-positions" },
                    r.a.createElement("img", {
                      src: "/save-white.svg",
                      alt: "saved Positions",
                    }),
                    e ? r.a.createElement("span", null, e) : null
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        E = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.changeLanguage,
                    a = e.currentLang;
                  return r.a.createElement(
                    "div",
                    { className: "translation-ribbon" },
                    r.a.createElement(
                      "button",
                      {
                        className: "he" === a.lang ? "mobile-hide" : null,
                        onClick: function () {
                          return t({ lang: "he", dir: "rtl" });
                        },
                      },
                      "\u05e2\u05d1"
                    ),
                    "/",
                    r.a.createElement(
                      "button",
                      {
                        className: "en" === a.lang ? "mobile-hide" : null,
                        onClick: function () {
                          return t({ lang: "en", dir: "ltr" });
                        },
                      },
                      "EN"
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        g = function (e) {
          var t = e.savedPositions,
            a = e.translation,
            o = e.changeLanguage,
            i = e.currentLang,
            l = e.links,
            u = Object(n.useState)(!1),
            m = Object(c.a)(u, 2),
            d = m[0],
            h = m[1],
            f = Object(n.useState)(0),
            g = Object(c.a)(f, 2),
            v = g[0],
            O = g[1];
          Object(n.useEffect)(function () {
            window.addEventListener("scroll", y);
          }, []);
          var b = function () {
              h(!d);
            },
            y = function () {
              O(document.documentElement.scrollTop);
            };
          return r.a.createElement(
            "div",
            {
              className: (function (e, t) {
                var a = e ? "rohm-nav active-menu" : "rohm-nav";
                return (a = t > 0 ? a + " scrolled" : a);
              })(d, v),
            },
            r.a.createElement(
              "a",
              { href: "/", className: "mossad-logo" },
              r.a.createElement("img", {
                src: "/rohm-logo.png",
                alt: "rohm logo",
              }),
              r.a.createElement(
                "div",
                { className: "mossad-name" },
                r.a.createElement("h1", null, a.data.SITE_NAME),
                r.a.createElement("h2", null, a.data.SITE_PARAGRAPH)
              )
            ),
            r.a.createElement(
              "button",
              { className: "roham-hamburger", onClick: b },
              r.a.createElement("img", {
                src: "/hamburger.svg",
                alt: "hamburger",
              })
            ),
            r.a.createElement(
              "ul",
              { className: "rohm-nav-links" },
              l && l.length > 0
                ? l.map(function (e) {
                    return r.a.createElement(
                      "li",
                      {
                        className: "rohm-nav-link",
                        key: e.id,
                        onClick: function () {
                          return b();
                        },
                      },
                      r.a.createElement(
                        s.b,
                        { to: e.link },
                        "he" === a.lang ? e.description : e.titleEn
                      )
                    );
                  })
                : null
            ),
            r.a.createElement(p, { savedPositions: t }),
            "he" === a.lang
              ? r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    s.b,
                    {
                      className: "rohm-primary-button align-left desktop",
                      to: "/application",
                    },
                    a.data.TOP_NAV_BUTTON_APPLY
                  ),
                  r.a.createElement(
                    s.b,
                    {
                      className: "rohm-primary-button align-left mobile",
                      to: "/application",
                    },
                    a.data.TOP_NAV_BUTTON_APPLY_MOBILE
                  )
                )
              : null,
            r.a.createElement(
              "div",
              { className: "contact-us-link" },
              r.a.createElement(
                "a",
                { href: "/contact-us/fa" },
                "\u0641\u0627\u0631\u0633\u06cc",
                r.a.createElement("img", {
                  src: "/square-arrow-white.svg",
                  alt: "contact us",
                })
              )
            ),
            r.a.createElement(
              "div",
              { className: "contact-us-link" },
              r.a.createElement(
                "a",
                { href: "/contact-us/ar" },
                "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
                r.a.createElement("img", {
                  src: "/square-arrow-white.svg",
                  alt: "contact us",
                })
              )
            ),
            r.a.createElement(E, { changeLanguage: o, currentLang: i })
          );
        },
        v = function (e) {
          var t = e.socials;
          return r.a.createElement(
            "ul",
            { className: "social-links" },
            t && t.length > 0
              ? t.map(function (e, t) {
                  return r.a.createElement(
                    "li",
                    { key: t },
                    r.a.createElement(
                      "a",
                      { href: e.link, target: "_blank" },
                      r.a.createElement("img", {
                        src: e.img,
                        alt: "Instagram",
                      }),
                      r.a.createElement("img", {
                        src: e.img2,
                        alt: "Instagram",
                        className: "img-hover",
                      })
                    )
                  );
                })
              : null
          );
        },
        O = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = {}),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              { key: "componentDidMount", value: function () {} },
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.translation,
                    a = e.footer,
                    n = e.socials,
                    o = e.pathname;
                  return r.a.createElement(
                    "footer",
                    { className: "rohm-footer" },
                    r.a.createElement(
                      "div",
                      { className: "apply-section" },
                      a && Object.keys(a).length > 0
                        ? r.a.createElement(
                            r.a.Fragment,
                            null,
                            r.a.createElement(
                              "h3",
                              null,
                              "he" === t.lang ? a.title : a.titleEn
                            ),
                            r.a.createElement(
                              "p",
                              null,
                              "he" === t.lang ? a.text : a.textEn
                            ),
                            r.a.createElement(
                              s.b,
                              { to: "/application", className: "footer-link" },
                              "he" === t.lang ? a.button : a.buttonEn,
                              r.a.createElement("img", {
                                src: "send-white.svg",
                                alt: "send application",
                              })
                            )
                          )
                        : null
                    ),
                    r.a.createElement(
                      "div",
                      null,
                      r.a.createElement(
                        "ul",
                        { className: "links-section" },
                        a && a.footerItems.length > 0
                          ? r.a.createElement(
                              r.a.Fragment,
                              null,
                              a.footerItems.map(function (e) {
                                return r.a.createElement(
                                  "li",
                                  { key: e.id },
                                  r.a.createElement(
                                    "a",
                                    { href: e.link },
                                    "he" === t.lang ? e.description : e.titleEn
                                  )
                                );
                              })
                            )
                          : null
                      ),
                      o.includes("contact-us")
                        ? null
                        : r.a.createElement(v, { socials: n })
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        b = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.translation,
                    a = e.breadCrumbsObj;
                  return r.a.createElement(
                    "ul",
                    { className: "bread-crumbs" },
                    r.a.createElement(
                      "li",
                      null,
                      r.a.createElement(
                        "span",
                        null,
                        r.a.createElement("a", { href: "/" }, t.data.HOME),
                        r.a.createElement("span", {
                          className: "arrow-left-black",
                        })
                      )
                    ),
                    a.map(function (e, n) {
                      return r.a.createElement(
                        "li",
                        { key: n },
                        a.length === n + 1
                          ? r.a.createElement(
                              "span",
                              null,
                              "he" === t.lang ? e.title : e.titleEN
                            )
                          : r.a.createElement(
                              "span",
                              null,
                              r.a.createElement(
                                "a",
                                { href: e.link },
                                "he" === t.lang ? e.title : e.titleEN
                              ),
                              r.a.createElement("span", {
                                className: "arrow-left-black",
                              })
                            )
                      );
                    })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        y = a(8),
        N = a(10);
      var S = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++)
              o[i] = arguments[i];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(o))
              )).state = { active: !1 }),
              (a.options = r.a.createRef()),
              (a.handleDropDown = function () {
                a.setState({ active: !a.state.active }),
                  a.options.current.children[0].focus();
              }),
              (a.handleApprove = function () {
                a.setState({ active: !a.state.active });
              }),
              (a.handleCheck = function (e) {
                e.preventDefault(),
                  13 === e.keyCode && (e.target.checked = !e.target.checked);
              }),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.input,
                    n = t.handleInputChange,
                    o = t.translation,
                    i = this.state.active;
                  return r.a.createElement(
                    "div",
                    { className: i ? "multi-select active" : "multi-select" },
                    r.a.createElement(
                      "button",
                      {
                        onClick: this.handleDropDown,
                        onKeyDown: this.handleDropDown,
                        "aria-expanded": i,
                        className: "multiselect-button",
                      },
                      o.data.POSITIONS_PAGE.DOMAIN
                    ),
                    r.a.createElement(
                      "div",
                      {
                        className: i
                          ? "multi-select-dropdown show"
                          : "multi-select-dropdown",
                      },
                      r.a.createElement(
                        "ul",
                        { ref: this.options },
                        a.options
                          ? a.options.map(function (e) {
                              return r.a.createElement(
                                "li",
                                { className: "option", key: e.id },
                                r.a.createElement(
                                  "label",
                                  {
                                    tabIndex: "1",
                                    onClick: function (t) {
                                      return n(t, a, e);
                                    },
                                  },
                                  r.a.createElement("input", {
                                    type: "checkbox",
                                    name: e.title,
                                    id: e.title,
                                    checked: e.checked,
                                    readOnly: !0,
                                  }),
                                  r.a.createElement(
                                    "span",
                                    null,
                                    "he" === o.lang ? e.title : e.titleEN
                                  )
                                )
                              );
                            })
                          : null
                      ),
                      r.a.createElement(
                        "div",
                        { className: "drop-down-footer" },
                        r.a.createElement(
                          "button",
                          {
                            onClick: function () {
                              return e.handleApprove();
                            },
                            onKeyDown: this.handleDropDown,
                          },
                          o.data.POSITIONS_PAGE.FIND_ME_POSITION
                        )
                      )
                    ),
                    r.a.createElement("div", {
                      className: i
                        ? "multi-select-background show"
                        : "multi-select-background",
                      onClick: this.handleDropDown,
                    })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        A = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).radioChange = function (e, t, a, n) {
                var r = Object(N.a)({}, e);
                (r.options = [t]), a(n, e, t, r);
              }),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.input,
                    n = t.handleInputChange,
                    o = t.label,
                    i = t.error,
                    l = t.translation;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    o
                      ? r.a.createElement(
                          "label",
                          {
                            htmlFor: a.options[0].id,
                            className: "input-label",
                          },
                          o
                        )
                      : null,
                    r.a.createElement(
                      "div",
                      { className: "radio-div" },
                      a.options
                        ? a.options.map(function (t) {
                            return r.a.createElement(
                              "label",
                              {
                                htmlFor: t.title,
                                key: t.id,
                                onClick: function (r) {
                                  return e.radioChange(a, t, n, r);
                                },
                                className: "radio-label",
                              },
                              r.a.createElement("input", {
                                type: "radio",
                                name: a.field,
                                value: t.id,
                                id: t.title,
                                checked: t.checked,
                              }),
                              r.a.createElement(
                                "span",
                                null,
                                "he" === l.lang ? t.title : t.titleEN
                              )
                            );
                          })
                        : null
                    ),
                    i &&
                      r.a.createElement(
                        "span",
                        { className: "error-message" },
                        i
                      )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        j = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = {}),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.filterInput,
                    a = e.removeFilter;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    t.options.map(function (e) {
                      return r.a.createElement(
                        "label",
                        { className: "active-filter", key: e.id },
                        e.title,
                        r.a.createElement(
                          "button",
                          {
                            className: "close-label",
                            onClick: function () {
                              return a(t, e);
                            },
                            title: "clear " + e.title,
                          },
                          r.a.createElement("img", {
                            src: "/X.svg",
                            alt: "clear" + e.title,
                          })
                        )
                      );
                    })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        w = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++)
              o[i] = arguments[i];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(o))
              )).state = { active: !1 }),
              (a.handleMobileShow = function () {
                a.setState({ active: !a.state.active });
              }),
              (a.handelInputSwitch = function (e, t, a, n, o) {
                switch (e.type) {
                  case "radio":
                    return r.a.createElement(A, {
                      input: e,
                      key: t,
                      handleInputChange: a,
                      translation: n,
                    });
                  case "multi-select":
                    return r.a.createElement(S, {
                      input: e,
                      key: t,
                      handleInputChange: a,
                      translation: n,
                      activeFilters: o,
                    });
                  default:
                    return "";
                }
              }),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.filterInputs,
                    n = t.handleInputChange,
                    o = t.activeFilters,
                    i = t.removeAllFilters,
                    l = t.removeFilter,
                    c = t.positionNavigation,
                    s = t.currentPosition,
                    u = t.translation,
                    m = this.state.active;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      "div",
                      { className: "mobile-actions" },
                      r.a.createElement(
                        "button",
                        {
                          className:
                            o.length > 0
                              ? "mobile-filter active"
                              : "mobile-filter",
                          onClick: this.handleMobileShow,
                        },
                        o.length > 0
                          ? r.a.createElement("img", {
                              src: "/filter-icon-filled.svg",
                              alt: "active filter",
                            })
                          : r.a.createElement("img", {
                              src: "/filter-icon.svg",
                              alt: "filter",
                            }),
                        "\u05e1\u05d9\u05e0\u05d5\u05df"
                      ),
                      s.title
                        ? r.a.createElement(
                            "button",
                            {
                              className: "mobile-positions-back",
                              onClick: function () {
                                return c({});
                              },
                            },
                            "\u05d7\u05d6\u05e8\u05d4 \u05dc\u05d7\u05d9\u05e4\u05d5\u05e9 \u05d4\u05e8\u05d0\u05e9\u05d9"
                          )
                        : null
                    ),
                    r.a.createElement(
                      "div",
                      {
                        className: m
                          ? "positions-filters show"
                          : "positions-filters",
                      },
                      r.a.createElement(
                        "label",
                        { className: "position-filter-label" },
                        u.data.POSITIONS_PAGE.FILTER_BY,
                        ":"
                      ),
                      r.a.createElement(
                        "div",
                        { className: "filter-section" },
                        a.map(function (t, a) {
                          return e.handelInputSwitch(t, a, n, u, o);
                        })
                      ),
                      o.length > 0
                        ? r.a.createElement(
                            "div",
                            { className: "active-filters" },
                            o.map(function (e) {
                              return r.a.createElement(j, {
                                filterInput: e,
                                removeFilter: l,
                                key: e.field,
                              });
                            }),
                            o.length > 0
                              ? r.a.createElement(
                                  "div",
                                  { className: "remove-all" },
                                  r.a.createElement(
                                    "button",
                                    { onClick: i },
                                    "\u05e0\u05e7\u05d4 \u05d4\u05db\u05dc"
                                  )
                                )
                              : null
                          )
                        : null
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        R = { field: "department", type: "multi-select", options: [] },
        T = { field: "positionPrecentage", type: "radio", options: [] };
      var C = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.position,
                    a = e.handleSave,
                    n = e.savedPositions;
                  return r.a.createElement(
                    "button",
                    {
                      onClick: function () {
                        return a({ id: t.id, name: t.title });
                      },
                      className: "rohm-save",
                    },
                    r.a.createElement("img", {
                      src: n.find(function (e) {
                        return e.id === t.id;
                      })
                        ? "/saved-white.svg"
                        : "/save-white.svg",
                      alt: "save",
                    })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        _ = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.positions,
                    a = e.preview,
                    n = e.currentPosition,
                    o = e.filteredData,
                    i = e.handleSave,
                    l = e.savedPositions;
                  return r.a.createElement(
                    "div",
                    { className: "position-cards" },
                    r.a.createElement(
                      "div",
                      { className: "result-count" },
                      "\u05de\u05e6\u05d9\u05d2 ",
                      t.length,
                      " \u05de\u05ea\u05d5\u05da ",
                      o.length
                    ),
                    r.a.createElement(
                      "ul",
                      null,
                      t.map(function (e) {
                        return r.a.createElement(
                          "li",
                          {
                            className:
                              n.id === e.id
                                ? "position-card active"
                                : "position-card",
                            key: e.id,
                            tabIndex: "0",
                          },
                          r.a.createElement(
                            "div",
                            { className: "card-header" },
                            r.a.createElement("h3", null, e.title),
                            r.a.createElement(
                              "div",
                              { className: "card-actions" },
                              r.a.createElement(C, {
                                position: e,
                                handleSave: i,
                                savedPositions: l,
                              })
                            )
                          ),
                          r.a.createElement(
                            "div",
                            { className: "card-body" },
                            r.a.createElement(
                              "p",
                              { className: "position-description" },
                              e.jobDescription
                            ),
                            r.a.createElement(
                              "p",
                              { className: "position-includes" },
                              e.jobIncludes
                            )
                          ),
                          r.a.createElement(
                            "div",
                            { className: "card-footer" },
                            r.a.createElement(
                              "div",
                              { className: "card-info" },
                              r.a.createElement("img", {
                                src: e.department.img,
                                alt: e.department.title,
                              }),
                              r.a.createElement(
                                "span",
                                null,
                                e.department.title
                              )
                            ),
                            r.a.createElement(
                              "div",
                              { className: "card-info clock" },
                              r.a.createElement("img", {
                                src: "/clock.svg",
                                alt: e.department.title,
                              }),
                              r.a.createElement(
                                "span",
                                null,
                                e.positionPrecentage.title
                              )
                            ),
                            r.a.createElement(
                              "button",
                              {
                                className: "show-position",
                                onClick: function () {
                                  return a(e);
                                },
                              },
                              "\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05de\u05e9\u05e8\u05d4"
                            )
                          )
                        );
                      })
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        L = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = { active: !1 }),
              (a.showShare = function () {
                a.setState({ active: !a.state.active });
              }),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = this.state.active,
                    a = this.props.url;
                  return r.a.createElement(
                    "div",
                    { className: "share-div" },
                    t
                      ? r.a.createElement(
                          "ul",
                          { className: "share-links" },
                          r.a.createElement(
                            "li",
                            null,
                            r.a.createElement(
                              "a",
                              {
                                href:
                                  "https://api.whatsapp.com/send/?text=" +
                                  window.location.origin +
                                  a +
                                  "&type=custom_url&app_absent=0",
                                target: "_blank",
                              },
                              r.a.createElement("img", {
                                src: "/message.svg",
                                alt: "whatsapp",
                              })
                            )
                          ),
                          r.a.createElement(
                            "li",
                            null,
                            r.a.createElement(
                              "a",
                              {
                                href:
                                  'https://www.facebook.com/sharer/sharer.php?u="' +
                                  encodeURIComponent(
                                    window.location.origin + a
                                  ) +
                                  '"',
                                target: "_blank",
                              },
                              r.a.createElement("img", {
                                src: "/facebook.svg",
                                alt: "facebook",
                              })
                            )
                          ),
                          r.a.createElement(
                            "li",
                            null,
                            r.a.createElement(
                              "a",
                              {
                                href:
                                  "https://twitter.com/intent/tweet?url=" +
                                  window.location.origin +
                                  a,
                                target: "_blank",
                              },
                              r.a.createElement("img", {
                                src: "/twitter.svg",
                                alt: "twitter",
                              })
                            )
                          ),
                          r.a.createElement(
                            "li",
                            null,
                            r.a.createElement(
                              "a",
                              {
                                href:
                                  "https://www.linkedin.com/sharing/share-offsite/?url=" +
                                  window.location.origin +
                                  a,
                                target: "_blank",
                              },
                              r.a.createElement("img", {
                                src: "/linkedin.svg",
                                alt: "linkedin",
                              })
                            )
                          )
                        )
                      : null,
                    r.a.createElement("div", {
                      className: t
                        ? "multi-select-background show"
                        : "multi-select-background",
                      onClick: function () {
                        return e.showShare();
                      },
                    })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        I = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "gotToForm",
                value: function () {
                  window.location.href = "/application";
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.currentPosition,
                    n = t.filteredData,
                    o = t.positionNavigation,
                    i = t.handleSave,
                    l = t.savedPositions,
                    c = t.positionStages,
                    u = n.indexOf(
                      n.filter(function (e) {
                        return e.id === a.id;
                      })[0]
                    );
                  return r.a.createElement(
                    "div",
                    { className: "position-preview" },
                    r.a.createElement(
                      "div",
                      { className: "preview-header" },
                      r.a.createElement("h2", null, a.title),
                      r.a.createElement("p", null, a.jobDescription),
                      r.a.createElement(
                        "div",
                        { className: "preview-footer" },
                        r.a.createElement(
                          "div",
                          { className: "preview-info" },
                          a.department
                            ? r.a.createElement(
                                r.a.Fragment,
                                null,
                                r.a.createElement("img", {
                                  src: a.department.img,
                                  alt: a.department.title,
                                }),
                                r.a.createElement(
                                  "span",
                                  null,
                                  a.department.title
                                )
                              )
                            : null
                        ),
                        r.a.createElement(
                          "div",
                          { className: "preview-info clock" },
                          a.positionPrecentage
                            ? r.a.createElement(
                                r.a.Fragment,
                                null,
                                r.a.createElement("img", {
                                  src: "/clock.svg",
                                  alt: a.department.title,
                                }),
                                r.a.createElement(
                                  "span",
                                  null,
                                  a.positionPrecentage.title
                                )
                              )
                            : null
                        ),
                        r.a.createElement(
                          "div",
                          { className: "position-navigation" },
                          r.a.createElement(
                            "button",
                            {
                              className:
                                0 === u
                                  ? "previous-position"
                                  : "previous-position show",
                              onClick: function () {
                                return o(n[u - 1]);
                              },
                            },
                            r.a.createElement("img", {
                              src: "/send-white.svg",
                              alt: "",
                            }),
                            r.a.createElement(
                              "span",
                              null,
                              " \u05dc\u05de\u05e9\u05e8\u05d4 \u05d4\u05e7\u05d5\u05d3\u05de\u05ea"
                            )
                          ),
                          r.a.createElement(
                            "button",
                            {
                              className:
                                u === n.length - 1
                                  ? "next-position"
                                  : "next-position show",
                              onClick: function () {
                                return o(n[u + 1]);
                              },
                            },
                            r.a.createElement(
                              "span",
                              null,
                              " \u05dc\u05de\u05e9\u05e8\u05d4 \u05d4\u05d1\u05d0\u05d4 "
                            ),
                            r.a.createElement("img", {
                              src: "/send-white.svg",
                              alt: "",
                            })
                          )
                        )
                      )
                    ),
                    r.a.createElement(
                      "div",
                      { className: "preview-body" },
                      r.a.createElement(
                        "div",
                        { className: "preview-content" },
                        a.jobAssigments && a.jobAssigments > 0
                          ? r.a.createElement(
                              r.a.Fragment,
                              null,
                              r.a.createElement(
                                "h3",
                                null,
                                "\u05de\u05e9\u05d9\u05de\u05d5\u05ea \u05d4\u05ea\u05e4\u05e7\u05d9\u05d3"
                              ),
                              r.a.createElement(
                                "ol",
                                { className: "order-list" },
                                a.jobAssigments.map(function (e, t) {
                                  return r.a.createElement("li", { key: t }, e);
                                })
                              )
                            )
                          : null,
                        r.a.createElement(
                          "h3",
                          null,
                          "\u05de\u05d4 \u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05d7\u05e4\u05e9\u05d9\u05dd?"
                        ),
                        r.a.createElement(
                          "div",
                          { className: "looking-for" },
                          a.prerequisite && a.prerequisite.length > 0
                            ? r.a.createElement(
                                "div",
                                { className: "looking-for-section" },
                                r.a.createElement(
                                  "h4",
                                  null,
                                  "\u05ea\u05e0\u05d0\u05d9 \u05e1\u05e3"
                                ),
                                r.a.createElement(
                                  "ul",
                                  null,
                                  a.prerequisite.map(function (e, t) {
                                    return r.a.createElement(
                                      "li",
                                      { key: t },
                                      e
                                    );
                                  })
                                )
                              )
                            : null,
                          a.additionalCriteria &&
                            a.additionalCriteria.length > 0
                            ? r.a.createElement(
                                "div",
                                { className: "looking-for-section" },
                                r.a.createElement(
                                  "h4",
                                  null,
                                  "\u05e7\u05e8\u05d9\u05d8\u05e8\u05d9\u05d5\u05e0\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd "
                                ),
                                r.a.createElement(
                                  "ul",
                                  null,
                                  a.additionalCriteria.map(function (e, t) {
                                    return r.a.createElement(
                                      "li",
                                      { key: t },
                                      e
                                    );
                                  })
                                )
                              )
                            : null,
                          a.interpersonalSkills &&
                            a.interpersonalSkills.length > 0
                            ? r.a.createElement(
                                "div",
                                { className: "looking-for-section" },
                                r.a.createElement(
                                  "h4",
                                  null,
                                  "\u05db\u05d9\u05e9\u05d5\u05e8\u05d9\u05dd \u05d1\u05d9\u05e0\u05d0\u05d9\u05e9\u05d9\u05d9\u05dd"
                                ),
                                r.a.createElement(
                                  "ul",
                                  null,
                                  a.interpersonalSkills.map(function (e, t) {
                                    return r.a.createElement(
                                      "li",
                                      { key: t },
                                      e
                                    );
                                  })
                                )
                              )
                            : null
                        )
                      ),
                      r.a.createElement(
                        "div",
                        { className: "preview-actions" },
                        r.a.createElement(C, {
                          position: a,
                          handleSave: i,
                          savedPositions: l,
                        }),
                        r.a.createElement(
                          "button",
                          {
                            onClick: function () {
                              i({ id: a.id, name: a.title }), e.gotToForm();
                            },
                            className: "apply",
                          },
                          "\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea"
                        )
                      ),
                      c
                        ? r.a.createElement(
                            "div",
                            { className: "preview-stages" },
                            r.a.createElement(
                              "h3",
                              null,
                              "\u05de\u05d4 \u05d4\u05dc\u05d0\u05d4?"
                            ),
                            r.a.createElement(
                              "ul",
                              { className: "stages-container" },
                              c.map(function (e, t) {
                                return r.a.createElement(
                                  "li",
                                  { key: t },
                                  r.a.createElement(
                                    "span",
                                    { className: "stage-preview-number" },
                                    t + 1
                                  ),
                                  r.a.createElement(
                                    "div",
                                    { className: "stage-content" },
                                    r.a.createElement("h4", {
                                      dangerouslySetInnerHTML: {
                                        __html: e.title,
                                      },
                                    }),
                                    r.a.createElement("p", null, e.description)
                                  )
                                );
                              })
                            )
                          )
                        : null,
                      r.a.createElement(
                        "div",
                        { className: "preview-actions mobile" },
                        r.a.createElement(C, {
                          position: a,
                          handleSave: i,
                          savedPositions: l,
                        }),
                        r.a.createElement(L, { url: "/positions/" + a.id }),
                        r.a.createElement(
                          s.b,
                          { to: "/application", className: "apply" },
                          "\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea"
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        P = a(28),
        M = a.n(P);
      var F = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.itemsCount,
                    a = e.pageSize,
                    n = e.currentPage,
                    o = e.onPageChange,
                    i = e.translation,
                    l = Math.ceil(t / a);
                  if (1 === l) return null;
                  var c = M.a.range(1, l + 1);
                  return r.a.createElement(
                    "nav",
                    { "aria-label": "navigation", className: "pagination-div" },
                    r.a.createElement(
                      "div",
                      { className: "pagination" },
                      c.length > 0
                        ? r.a.createElement(
                            "button",
                            {
                              className: "paginaion-arrow",
                              disabled: 1 === n,
                              onClick: function (e) {
                                return o(e, n - 1);
                              },
                            },
                            r.a.createElement("span", {
                              className: "square-arrow right",
                            }),
                            i.data.PREVIOUS
                          )
                        : null,
                      r.a.createElement(
                        "ul",
                        { className: "pages-section" },
                        c.map(function (e) {
                          return r.a.createElement(
                            "li",
                            {
                              className:
                                e === n ? "page-item active" : "page-item",
                              key: e,
                              onClick: function (t) {
                                return o(t, e);
                              },
                              onKeyDown: function (t) {
                                return o(t, e);
                              },
                              tabIndex: "0",
                            },
                            r.a.createElement(
                              "a",
                              { className: "page-link" },
                              e
                            )
                          );
                        })
                      ),
                      c.length > 0
                        ? r.a.createElement(
                            "button",
                            {
                              className: "paginaion-arrow right",
                              disabled: l === n,
                              onClick: function (e) {
                                return o(e, n + 1);
                              },
                            },
                            i.data.NEXT,
                            r.a.createElement("span", {
                              className: "square-arrow",
                            })
                          )
                        : null
                    )
                  );
                },
              },
            ]),
            t
          );
        })(r.a.Component),
        k = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = {}),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.searching,
                    a = e.searchTerm,
                    n = e.translation;
                  return r.a.createElement(
                    "div",
                    { className: "search-position" },
                    r.a.createElement(
                      "form",
                      null,
                      r.a.createElement(
                        "h1",
                        null,
                        n.data.POSITIONS_PAGE.TITLE
                      ),
                      r.a.createElement("input", {
                        type: "text",
                        placeholder: n.data.POSITIONS_PAGE.SEARCH_PLACEHODER,
                        onChange: function (e) {
                          return t(e.target.value);
                        },
                        value: a,
                      })
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component);
      function x(e, t) {
        if ("" === e) return t;
        var a = [];
        return (
          t.forEach(function (t) {
            var n = !1;
            Object.keys(t).forEach(function (a) {
              n ||
                (n = (function e(t, a) {
                  var n = !1;
                  "object" === typeof t
                    ? Object.keys(t).forEach(function (r) {
                        n || (n = e(t[r], a));
                      })
                    : String(t).includes(a) && (n = !0);
                  return n;
                })(t[a], e));
            }),
              n && a.push(t);
          }),
          a
        );
      }
      var D = [
        {
          id: "1",
          title:
            "\u05e8\u05d0\u05d9\u05d5\u05df \u05d8\u05dc\u05e4\u05d5\u05e0\u05d9",
          description:
            "\u05e7\u05d5\u05e8\u05d5\u05ea \u05d4\u05d7\u05d9\u05d9\u05dd \u05e9\u05dc\u05da \u05d9\u05d5\u05e2\u05d1\u05e8\u05d5 \u05dc\u05e0\u05e6\u05d9\u05d2\u05d9 \u05d4\u05d2\u05d9\u05d5\u05e1 \u05dc\u05d1\u05d7\u05d9\u05e0\u05d4. \u05d1\u05de\u05d9\u05d3\u05d4 \u05d5\u05ea\u05de\u05e6\u05d0 \u05d4\u05ea\u05d0\u05de\u05d4 \u05dc\u05d0\u05d7\u05d3 \u05de\u05d4\u05ea\u05e4\u05e7\u05d9\u05d3\u05d9\u05dd \u05d4\u05e4\u05e0\u05d5\u05d9\u05d9\u05dd \u05dc\u05d0\u05d9\u05d5\u05e9, \u05e0\u05d9\u05e6\u05d5\u05e8 \u05d0\u05d9\u05ea\u05da \u05e7\u05e9\u05e8 \u05d8\u05dc\u05e4\u05d5\u05e0\u05d9, \u05e0\u05e1\u05e4\u05e8 \u05e2\u05dc \u05d4\u05ea\u05e4\u05e7\u05d9\u05d3 \u05e9\u05e0\u05e8\u05e6\u05d4 \u05dc\u05d4\u05e6\u05d9\u05e2 \u05dc\u05da, \u05e0\u05e1\u05d1\u05d9\u05e8 \u05dc\u05da \u05e2\u05dc \u05ea\u05d4\u05dc\u05d9\u05da \u05d4\u05d2\u05d9\u05d5\u05e1 \u05d5\u05d4\u05e9\u05dc\u05d1\u05d9\u05dd \u05d4\u05e9\u05d5\u05e0\u05d9\u05dd, \u05e0\u05e9\u05d0\u05dc \u05e9\u05d0\u05dc\u05d5\u05ea \u05e8\u05e7\u05e2 \u05d5\u05e2\u05d1\u05d5\u05e8 \u05d7\u05dc\u05e7 \u05de\u05d4\u05ea\u05e4\u05e7\u05d9\u05d3\u05d9\u05dd \u05e0\u05d1\u05e6\u05e2 \u05d4\u05e2\u05e8\u05db\u05d4 \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05ea. ",
        },
        {
          id: "2",
          title:
            "\u05de\u05d1\u05d7\u05e0\u05d9 \u05d4\u05ea\u05d0\u05de\u05d4",
          description:
            "\u05d1\u05e9\u05dc\u05d1 \u05d6\u05d4 \u05e0\u05d1\u05e7\u05e9\u05da \u05dc\u05d1\u05e6\u05e2 \u05de\u05d1\u05d7\u05e0\u05d9 \u05de\u05d9\u05d5\u05df \u05d0\u05d9\u05e9\u05d9\u05d5\u05ea\u05d9\u05d9\u05dd \u05de\u05d5\u05ea\u05d0\u05de\u05d9\u05dd \u05dc\u05ea\u05e4\u05e7\u05d9\u05d3. \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d4\u05de\u05d1\u05d7\u05e0\u05d9\u05dd \u05de\u05d0\u05e4\u05e9\u05e8\u05d9\u05dd \u05dc\u05e0\u05d5 \u05dc\u05d4\u05e2\u05e8\u05d9\u05da \u05d9\u05db\u05d5\u05dc\u05d5\u05ea \u05d5\u05ea\u05db\u05d5\u05e0\u05d5\u05ea \u05d1\u05d0\u05d9\u05e9\u05d9\u05d5\u05ea \u05e9\u05dc\u05da.",
        },
        {
          id: "3",
          title:
            "\u05d0\u05d1\u05d7\u05d5\u05df \u05ea\u05e2\u05e1\u05d5\u05e7\u05ea\u05d9 ",
          description:
            "\u05de\u05e4\u05d2\u05e9 \u05e2\u05dd \u05e0\u05e6\u05d9\u05d2 \u05d4\u05d2\u05d9\u05d5\u05e1 \u05d5/\u05d0\u05d5 \u05e0\u05e6\u05d9\u05d2 \u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05d1\u05d5 \u05e0\u05db\u05d9\u05e8 \u05d0\u05d5\u05ea\u05da, \u05e0\u05e1\u05e4\u05e8 \u05dc\u05da \u05e2\u05dc \u05d4\u05d0\u05e8\u05d2\u05d5\u05df \u05d5\u05e2\u05dc \u05d4\u05ea\u05e4\u05e7\u05d9\u05d3 \u05d1\u05de\u05d8\u05e8\u05d4 \u05dc\u05d4\u05e2\u05e8\u05d9\u05da \u05d0\u05ea \u05d4\u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc \u05d4\u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05e9\u05dc\u05da \u05d5\u05d0\u05ea \u05e8\u05de\u05ea \u05d4\u05d4\u05ea\u05d0\u05de\u05d4 \u05e9\u05dc\u05da \u05dc\u05d0\u05d5\u05e4\u05d9 \u05d4\u05d0\u05e8\u05d2\u05d5\u05df\xa0 \u05d5\u05dc\u05e1\u05d1\u05d9\u05d1\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4. \u05e2\u05d1\u05d5\u05e8 \u05d7\u05dc\u05e7 \u05de\u05d4\u05ea\u05e4\u05e7\u05d9\u05d3\u05d9\u05dd \u05e0\u05d1\u05e6\u05e2 \u05de\u05d1\u05d7\u05e0\u05d9 \u05de\u05d9\u05d5\u05df \u05ea\u05e2\u05e1\u05d5\u05e7\u05ea\u05d9\u05d9\u05dd.",
        },
        {
          id: "4",
          title:
            "\u05d4\u05ea\u05d0\u05de\u05d4 \u05d1\u05d9\u05d8\u05d7\u05d5\u05e0\u05d9\u05ea",
          description:
            "\u05db\u05dc \u05d4\u05de\u05d5\u05e2\u05de\u05d3\u05d9\u05dd/\u05d5\u05ea \u05dc\u05d2\u05d9\u05d5\u05e1 \u05dc\u05de\u05d5\u05e1\u05d3 \u05e0\u05d3\u05e8\u05e9\u05d9\u05dd/\u05d5\u05ea \u05dc\u05e2\u05d1\u05d5\u05e8 \u05ea\u05d4\u05dc\u05d9\u05da \u05d4\u05ea\u05d0\u05de\u05d4 \u05d1\u05d9\u05d8\u05d7\u05d5\u05e0\u05d9\u05ea \u05db\u05ea\u05e0\u05d0\u05d9 \u05de\u05e7\u05d3\u05d9\u05dd \u05dc\u05d4\u05e6\u05d1\u05d4 \u05d1\u05ea\u05e4\u05e7\u05d9\u05d3. \u05d1\u05d3\u05d9\u05e7\u05ea \u05d4\u05d4\u05ea\u05d0\u05de\u05d4 \u05d4\u05d1\u05d9\u05d8\u05d7\u05d5\u05e0\u05d9\u05ea \u05de\u05d1\u05d5\u05e6\u05e2\u05ea \u05d1\u05db\u05e4\u05d5\u05e3 \u05dc\u05d7\u05d5\u05e7 \u05e9\u05d9\u05e8\u05d5\u05ea \u05d4\u05d1\u05d9\u05d8\u05d7\u05d5\u05df \u05d4\u05db\u05dc\u05dc\u05d9 \u05d4\u05ea\u05e9\u05e1''\u05d1 - 2002.",
        },
      ];
      function H(e) {
        a(15)({
          method: "post",
          url:
            "localhost" === window.location.hostname
              ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetPositionsPage"
              : "/Roham.DMZ/api/ManagedActions/GetPositionsPage",
          headers: { "Content-Type": "application/json" },
        })
          .then(function (t) {
            e(t.data);
          })
          .catch(function (e) {
            return e;
          });
      }
      var G = function (e) {
        var t = e.handleSave,
          a = e.savedPositions,
          o = e.translation,
          i = e.searchDepartment,
          s = e.searchPositionPrecentage,
          u = e.searchString,
          m = e.id,
          d = Object(n.useState)([]),
          h = Object(c.a)(d, 2),
          f = h[0],
          p = h[1],
          E = Object(n.useState)(""),
          g = Object(c.a)(E, 2),
          v = g[0],
          O = g[1],
          b = Object(n.useState)([]),
          y = Object(c.a)(b, 2),
          S = y[0],
          A = y[1],
          j = Object(n.useState)([]),
          C = Object(c.a)(j, 2),
          L = C[0],
          P = C[1],
          G = Object(n.useState)({}),
          q = Object(c.a)(G, 2),
          U = q[0],
          Y = q[1],
          B = Object(n.useState)(7),
          Z = Object(c.a)(B, 2),
          z = Z[0],
          V = (Z[1], Object(n.useState)(1)),
          $ = Object(c.a)(V, 2),
          X = $[0],
          J = $[1],
          W = Object(n.useState)([]),
          K = Object(c.a)(W, 2),
          Q = K[0],
          ee = K[1],
          te = Object(n.useState)([]),
          ae = Object(c.a)(te, 2),
          ne = ae[0],
          re = ae[1],
          oe = Object(n.useState)([]),
          ie = Object(c.a)(oe, 2),
          le = ie[0],
          ce = ie[1],
          se = Object(n.useState)([]),
          ue = Object(c.a)(se, 2),
          me = ue[0],
          de = ue[1],
          he = Object(n.useState)({}),
          fe = Object(c.a)(he, 2),
          pe = fe[0],
          Ee = fe[1],
          ge = [R, T];
        Object(n.useEffect)(function () {
          H(Ee), ee(D);
        }, []),
          Object(n.useEffect)(
            function () {
              re(x(v, f));
            },
            [v, f, L]
          ),
          Object(n.useEffect)(
            function () {
              m && ye(m, le);
            },
            [le]
          ),
          Object(n.useEffect)(
            function () {
              ce(
                (function (e, t) {
                  if (0 === e.length) return t;
                  var a = t;
                  return (
                    e.forEach(function (e) {
                      var t = e.options.filter(function (e) {
                        return e.checked;
                      });
                      if (t.length > 1) {
                        var n = [];
                        t.forEach(function (t) {
                          var r = a.filter(function (a) {
                            return a[e.field].id === t.id;
                          });
                          n = n.concat(r);
                        }),
                          (a = n);
                      } else
                        t.forEach(function (t) {
                          a = a.filter(function (a) {
                            return a[e.field].id === t.id;
                          });
                        });
                    }),
                    a
                  );
                })(L, ne)
              );
            },
            [ne, L]
          ),
          Object(n.useEffect)(
            function () {
              de(
                (function (e, t, a) {
                  var n = (t - 1) * a;
                  return M()(e).slice(n).take(a).value();
                })(le, X, z)
              );
            },
            [le, X, L]
          ),
          Object(n.useEffect)(
            function () {
              pe.payload &&
                ((ge[0].options = pe.payload.domains),
                (ge[1].options = pe.payload.positionPercentage),
                ge.forEach(function (e) {
                  return e.options.forEach(function (e) {
                    return (e.checked = !1);
                  });
                }),
                A(ge),
                u && Oe(u),
                i.length > 0 && ve("department", i, ge),
                s.length > 0 && ve("positionPrecentage", s, ge),
                p(pe.payload.positions));
            },
            [pe]
          ),
          Object(n.useEffect)(
            function () {
              if (pe.payload) {
                var e = JSON.parse(JSON.stringify(S)),
                  t = !1;
                e.forEach(function (e) {
                  (e.options = e.options.filter(function (e) {
                    return e.checked;
                  })),
                    e.options.length > 0 && (t = !0);
                }),
                  P(t ? Object(l.a)(e) : []);
              }
            },
            [S]
          );
        var ve = function (e, t, a) {
            var n = a,
              r = Object.assign(
                {},
                n.find(function (t) {
                  return t.field === e;
                })
              );
            t.forEach(function (e) {
              var t = r.options
                .map(function (e) {
                  return e.id;
                })
                .indexOf(e);
              t >= 0 && (r.options[t].checked = !0);
            }),
              A(n);
          },
          Oe = function (e) {
            O(e);
          },
          be = function (e) {
            e.id
              ? Y(function (t) {
                  return Object(N.a)({}, t, e);
                })
              : Y({});
          },
          ye = function (e, t) {
            var a = t.filter(function (t) {
              return t.id === e;
            })[0];
            Y(function (e) {
              return Object(N.a)({}, e, a);
            });
          };
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(k, {
            searching: Oe,
            searchTerm: v,
            translation: o,
          }),
          r.a.createElement(
            "div",
            { className: "positions-dashboard" },
            r.a.createElement(
              "h2",
              null,
              le && le.length,
              " ",
              o.data.POSITIONS_PAGE.OPEN_POSITIONS
            ),
            X.title,
            r.a.createElement(w, {
              activeFilters: L,
              filterInputs: S,
              handleInputChange: function (e, t, a) {
                e.preventDefault();
                var n = S;
                if ("radio" === t.type) {
                  var r = n
                      .map(function (e) {
                        return e.field;
                      })
                      .indexOf(t.field),
                    o = n[r];
                  o.options.forEach(function (e) {
                    return (e.checked = !1);
                  });
                  var i = o.options
                    .map(function (e) {
                      return e.id;
                    })
                    .indexOf(a.id);
                  (n[r].options[i].checked = !0), A(Object(l.a)(n));
                } else {
                  var c = n
                      .map(function (e) {
                        return e.field;
                      })
                      .indexOf(t.field),
                    s = n[c].options
                      .map(function (e) {
                        return e.id;
                      })
                      .indexOf(a.id);
                  (n[c].options[s].checked = !a.checked), A(Object(l.a)(n));
                }
                J(1);
              },
              removeAllFilters: function () {
                P([]),
                  S.forEach(function (e) {
                    return e.options.forEach(function (e) {
                      return (e.checked = !1);
                    });
                  });
              },
              removeFilter: function (e, t) {
                var a = L,
                  n = a.indexOf(e),
                  r = a[n].options.indexOf(t);
                a[n].options.splice(r, 1),
                  0 === a[n].options.length && a.splice(n, 1),
                  P(Object(l.a)(a));
              },
              positionNavigation: be,
              currentPosition: U,
              translation: o,
            }),
            le.length > 0
              ? r.a.createElement(
                  "div",
                  {
                    className: U.id
                      ? "positions-section preview"
                      : "positions-section",
                  },
                  r.a.createElement(_, {
                    positions: me,
                    filteredData: le,
                    currentPosition: U,
                    preview: function (e) {
                      e.id
                        ? Y(function (t) {
                            return Object(N.a)({}, t, e);
                          })
                        : Y({}),
                        window.scrollTo({ top: 200, behavior: "smooth" });
                    },
                    handleSave: t,
                    savedPositions: a,
                  }),
                  r.a.createElement(I, {
                    currentPosition: U,
                    filteredData: le,
                    positionNavigation: be,
                    handleSave: t,
                    savedPositions: a,
                    positionStages: Q,
                  }),
                  r.a.createElement(F, {
                    itemsCount: le.length,
                    pageSize: z,
                    onPageChange: function (e, t) {
                      (("Enter" === e.key && "onKeyDown" === e._reactName) ||
                        "onClick" === e._reactName) &&
                        (window.scrollTo({ top: 0, behavior: "smooth" }), J(t));
                    },
                    currentPage: X,
                    translation: o,
                  })
                )
              : r.a.createElement(
                  "div",
                  { className: "no-results" },
                  r.a.createElement(
                    "h3",
                    null,
                    "\u05de\u05e6\u05d8\u05e2\u05e8\u05d9\u05dd, \u05de\u05d9\u05d8\u05d1 \u05db\u05d5\u05d7\u05d5\u05ea\u05d9\u05e0\u05d5 \u05dc\u05d0 \u05de\u05e6\u05d0\u05d5 \u05d0\u05ea \u05de\u05d4 \u05e9\u05d7\u05d9\u05e4\u05e9\u05ea\u05dd"
                  ),
                  r.a.createElement(
                    "h4",
                    null,
                    "\u05d8\u05d9\u05e4\u05d9\u05dd \u05dc\u05d7\u05d9\u05e4\u05d5\u05e9:"
                  ),
                  r.a.createElement(
                    "p",
                    null,
                    "\u05d1\u05d3\u05e7\u05d5 \u05d0\u05dd \u05d9\u05e9 \u05d8\u05e2\u05d5\u05d9\u05d5\u05ea \u05d0\u05d9\u05d5\u05ea",
                    r.a.createElement("br", null),
                    "\u05e0\u05e1\u05d5 \u05dc\u05d7\u05e4\u05e9 \u05de\u05d5\u05e0\u05d7 \u05db\u05dc\u05dc\u05d9 \u05d9\u05d5\u05ea\u05e8",
                    r.a.createElement("br", null),
                    "\u05d4\u05d2\u05d1\u05d9\u05dc\u05d5 \u05d0\u05ea \u05ea\u05d9\u05d1\u05ea \u05d4\u05d1\u05d7\u05d9\u05e8\u05d4 \u05d4\u05de\u05e8\u05d5\u05d1\u05d4 \u05dc\u05d1\u05d7\u05d9\u05e8\u05d4 \u05d0\u05d7\u05ea \u05d0\u05d5 \u05e9\u05ea\u05d9\u05d9\u05dd \u05d0\u05d5 \u05dc\u05d7\u05e6\u05d5",
                    r.a.createElement(
                      "a",
                      { href: "/application" },
                      "\u05dc\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea \u05db\u05dc\u05dc\u05d9\u05ea"
                    )
                  )
                )
          )
        );
      };
      var q,
        U = function (e) {
          var t = Object(y.g)().id,
            a = Object(s.c)(),
            o = Object(c.a)(a, 1)[0],
            i = o.get("searchTerm"),
            l = o.getAll("department"),
            u = o.getAll("positionPrecentage"),
            m = Object(n.useState)([
              {
                title: "\u05de\u05e9\u05e8\u05d5\u05ea",
                titleEN: "Positions",
                link: "/",
              },
            ]),
            d = Object(c.a)(m, 2),
            h = d[0];
          return (
            d[1],
            r.a.createElement(
              "div",
              { className: "page-content" },
              r.a.createElement(b, {
                translation: e.translation,
                breadCrumbsObj: h,
              }),
              r.a.createElement(G, {
                id: t,
                searchString: i,
                searchDepartment: l,
                searchPositionPrecentage: u,
                handleSave: e.handleSave,
                savedPositions: e.savedPositions,
                translation: e.translation,
              })
            )
          );
        },
        Y =
          (a(80),
          function (e) {
            var t = e.domains,
              a = e.translation,
              o = e.positions,
              i = Object(n.useRef)();
            return r.a.createElement(
              "div",
              { className: "whats-your-domain" },
              r.a.createElement("h2", null, a.data.HOMEPAGE_DOMAINS.TITLE),
              r.a.createElement("div", { id: "domains" }),
              r.a.createElement(
                "div",
                { id: "domains", className: "scrollable", ref: i },
                t && t.length > 0 && o && o.length > 0
                  ? t.map(function (e) {
                      return r.a.createElement(
                        "a",
                        {
                          href: "positions?department=" + e.id,
                          key: e.id,
                          className: "domain slick-slide",
                          target: "_self",
                        },
                        r.a.createElement("img", {
                          src: e.background,
                          className: "background",
                          alt: e.id,
                        }),
                        r.a.createElement("img", {
                          src: e.icon,
                          alt: e.title,
                          className: "icon",
                        }),
                        r.a.createElement(
                          "h3",
                          null,
                          "he" === a.lang ? e.title : e.titleEn
                        ),
                        r.a.createElement(
                          "p",
                          null,
                          o && o.length > 0
                            ? o.filter(function (t) {
                                return t.department.id === e.id;
                              }).length
                            : 0,
                          " ",
                          a.data.POSITIONS
                        )
                      );
                    })
                  : null,
                t && t.length > 0 && o && o.length > 0
                  ? t.map(function (e) {
                      return r.a.createElement(
                        "a",
                        {
                          href: "positions?department=" + e.id,
                          key: e.id,
                          className: "domain slick-slide",
                          target: "_self",
                        },
                        r.a.createElement("img", {
                          src: e.background,
                          className: "background",
                          alt: e.id,
                        }),
                        r.a.createElement("img", {
                          src: e.icon,
                          alt: e.title,
                          className: "icon",
                        }),
                        r.a.createElement(
                          "h3",
                          null,
                          "he" === a.lang ? e.title : e.titleEn
                        ),
                        r.a.createElement(
                          "p",
                          null,
                          o && o.length > 0
                            ? o.filter(function (t) {
                                return t.department.id === e.id;
                              }).length
                            : 0,
                          " ",
                          a.data.POSITIONS
                        )
                      );
                    })
                  : null
              ),
              r.a.createElement(
                "div",
                { className: "domains-footer to-all" },
                r.a.createElement(
                  "div",
                  { className: "navigation" },
                  r.a.createElement(
                    "button",
                    {
                      className: "navigation-button",
                      tabIndex: "-1",
                      onClick: function () {
                        i.current.scrollBy({
                          top: 0,
                          left: 500,
                          behavior: "smooth",
                        });
                      },
                    },
                    r.a.createElement("img", {
                      src: "arrow-right.svg",
                      alt: "navigate right",
                    })
                  ),
                  r.a.createElement(
                    "button",
                    {
                      className: "navigation-button",
                      tabIndex: "-1",
                      onClick: function () {
                        i.current.scrollBy({
                          top: 0,
                          left: -500,
                          behavior: "smooth",
                        });
                      },
                    },
                    r.a.createElement("img", {
                      src: "arrow-left.svg",
                      alt: "navigate left",
                    })
                  )
                ),
                r.a.createElement(
                  s.b,
                  { to: "/career" },
                  a.data.HOMEPAGE_DOMAINS.TO_ALL,
                  r.a.createElement("img", { src: "send-black.svg", alt: "go" })
                )
              )
            );
          }),
        B = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = { components: [], chosenComponent: 1 }),
              (a.handleDown = function () {
                var e = document.getElementsByClassName(
                  a.state.components[a.state.chosenComponent].className
                )[0].offsetTop;
                window.scrollTo({
                  top: e - (window.innerWidth / 100) * 0.83 * 5.625,
                  behavior: "smooth",
                }),
                  a.state.chosenComponent + 1 === a.state.components.length
                    ? a.setState({ chosenComponent: 0 })
                    : a.setState({
                        chosenComponent: a.state.chosenComponent + 1,
                      });
              }),
              (a.handleClass = function (e) {
                return a.state.components.length > 0 &&
                  "stories" === a.state.components[e].className
                  ? "down black"
                  : 0 === e
                  ? "down up"
                  : "down";
              }),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = Array.from(
                    document.getElementById("rohm").children
                  ).filter(function (e) {
                    return "rohm-nav" !== e.className && "down" !== e.className;
                  });
                  this.setState({ components: e });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.state.chosenComponent;
                  return r.a.createElement(
                    "button",
                    {
                      className: this.handleClass(e),
                      onClick: this.handleDown,
                    },
                    r.a.createElement("img", {
                      src: "down-arrow.svg",
                      alt: "down",
                    })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        Z = (function () {
          function e(t) {
            Object(u.a)(this, e),
              (this.el = t),
              (this.chars =
                '\u05d0\u05d1\u05d2\u05d3\u05d4\u05d5\u05d6\u05d7\u05d8\u05d9\u05db\u05dc\u05de\u05e0\u05e1\u05e2\u05e4\u05e6\u05e7\u05e8\u05e9\u05ea"\u05e3\u05da\u05dd\u05e5'),
              (this.update = this.update.bind(this));
          }
          return (
            Object(m.a)(e, [
              {
                key: "setText",
                value: function (e) {
                  var t = this,
                    a = this.el.innerText,
                    n = Math.max(a.length, e.length),
                    r = new Promise(function (e) {
                      return (t.resolve = e);
                    });
                  this.queue = [];
                  for (var o = 0; o < n; o++) {
                    var i = a[o] || "",
                      l = e[o] || "",
                      c = Math.floor(40 * Math.random()),
                      s = c + Math.floor(40 * Math.random());
                    this.queue.push({ from: i, to: l, start: c, end: s });
                  }
                  return (
                    cancelAnimationFrame(this.frameRequest),
                    (this.frame = 0),
                    this.update(),
                    r
                  );
                },
              },
              {
                key: "update",
                value: function () {
                  for (
                    var e = "", t = 0, a = 0, n = this.queue.length;
                    a < n;
                    a++
                  ) {
                    var r = this.queue[a],
                      o = r.from,
                      i = r.to,
                      l = r.start,
                      c = r.end,
                      s = r.char;
                    this.frame >= c
                      ? (t++, (e += i))
                      : this.frame >= l
                      ? ((!s || Math.random() < 5) &&
                          ((s = this.randomChar()), (this.queue[a].char = s)),
                        (e += '<span class="dud">'.concat(s, "</span>")))
                      : (e += o);
                  }
                  (this.el.innerHTML = e),
                    t === this.queue.length
                      ? this.resolve()
                      : ((this.frameRequest = requestAnimationFrame(
                          this.update
                        )),
                        this.frame++);
                },
              },
              {
                key: "randomChar",
                value: function () {
                  return this.chars[
                    Math.floor(Math.random() * this.chars.length)
                  ];
                },
              },
            ]),
            e
          );
        })();
      var z = (function (e) {
        function t() {
          var e, a;
          Object(u.a)(this, t);
          for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
            r[o] = arguments[o];
          return (
            ((a = Object(d.a)(
              this,
              (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
            )).state = { active: !1 }),
            a
          );
        }
        return (
          Object(f.a)(t, e),
          Object(m.a)(t, [
            {
              key: "render",
              value: function () {
                var e = this.props,
                  t = e.options,
                  a = e.handleInputChange,
                  n = e.placeholder,
                  o = e.value;
                return r.a.createElement(
                  "div",
                  {
                    className:
                      t.length > 0 ? "auto-complete active" : "auto-complete",
                  },
                  r.a.createElement("input", {
                    onKeyUp: function (e) {
                      return a(e);
                    },
                    className: "auto-complete-input",
                    placeholder: n,
                  }),
                  r.a.createElement(
                    "div",
                    {
                      className:
                        t.length > 0
                          ? "auto-complete-dropdown show"
                          : "auto-complete-dropdown",
                    },
                    r.a.createElement(
                      "ul",
                      null,
                      t.length > 0
                        ? t.map(function (e) {
                            return r.a.createElement(
                              "li",
                              { className: "option", key: e.title + e.id },
                              e.icon
                                ? r.a.createElement("a", {
                                    href: "/positions?department=" + e.id,
                                    dangerouslySetInnerHTML: {
                                      __html: e.title.replace(
                                        o,
                                        "<strong>" + o + "</strong>"
                                      ),
                                    },
                                  })
                                : r.a.createElement("a", {
                                    href: "/positions/" + e.id,
                                    dangerouslySetInnerHTML: {
                                      __html: e.title.replace(
                                        o,
                                        "<strong>" + o + "</strong>"
                                      ),
                                    },
                                  })
                            );
                          })
                        : null
                    )
                  )
                );
              },
            },
          ]),
          t
        );
      })(n.Component);
      var V = [
        {
          id: "1",
          title: "\u05d0\u05d1\u05d8\u05d7\u05d4",
          icon: "security-icon.svg",
          titleEN: "Security",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 17,
          background: "/domain_5.jpg",
          selected: !0,
        },
        {
          id: "5",
          title:
            "\u05d4\u05e0\u05d3\u05e1\u05d4 \u05d5\u05e4\u05d9\u05ea\u05d5\u05d7",
          icon: "cube-black.png",
          titleEN: "Engineering",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 18,
          background: "/domain_7.jpg",
          selected: !0,
        },
        {
          id: "2",
          title: "\u05de\u05d1\u05e6\u05e2\u05d9",
          icon: "operational-icon.svg",
          titleEN: "Operational",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 18,
          background: "/domain_1.jpg",
          selected: !0,
        },
        {
          id: "3",
          title: "\u05de\u05d5\u05d3\u05d9\u05e2\u05d9\u05df",
          titleEN: "Intelligence",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 18,
          background: "/domain_8.jpg",
          icon: "languages-icon.svg",
          selected: !0,
        },
        {
          id: "7",
          title: "\u05de\u05d8\u05d4",
          titleEN: "Administrative",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 18,
          background: "/domain_4.jpg",
          icon: "cyber-icon.svg",
        },
        {
          id: "6",
          title: "\u05e0\u05d9\u05d4\u05d5\u05dc",
          icon: "administration-icon.svg",
          titleEN: "Management",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 18,
          background: "/domain_6.jpg",
        },
        {
          id: "8",
          title: "\u05ea\u05d5\u05db\u05e0\u05d4",
          titleEN: "Technology",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 18,
          background: "/domain_2.jpg",
          icon: "technology-icon.svg",
        },
        {
          id: "4",
          title:
            "\u05ea\u05e4\u05e2\u05d5\u05dc \u05d5\u05dc\u05d5\u05d2\u05d9\u05e1\u05d8\u05d9\u05e7\u05d4",
          titleEN: "Maintenance",
          description:
            "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05ea\u05d7\u05d5\u05dd",
          positions: 18,
          background: "/domain_3.jpg",
          icon: "maintenance-icon.svg",
        },
      ];
      var $ = function (e) {
          var t = e.tags,
            o = e.translation,
            i = Object(n.useState)(""),
            u = Object(c.a)(i, 2),
            m = u[0],
            d = u[1],
            h = Object(n.useState)([]),
            f = Object(c.a)(h, 2),
            p = f[0],
            E = f[1],
            g = Object(n.useState)([]),
            v = Object(c.a)(g, 2),
            O = v[0],
            b = v[1],
            y = Object(n.useState)(!1),
            N = Object(c.a)(y, 2),
            S = N[0],
            A = N[1],
            j = (Object(n.useRef)(null), Object(n.useState)(!1)),
            w = Object(c.a)(j, 2);
          w[0], w[1];
          return (
            Object(n.useEffect)(
              function () {
                m.length > 1
                  ? (function (e, t) {
                      var n = a(15),
                        r = JSON.stringify({ SearchString: e });
                      n({
                        method: "post",
                        url:
                          "localhost" == window.location.hostname
                            ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetPositions"
                            : "/Roham.DMZ/api/ManagedActions/GetPositions",
                        headers: { "Content-Type": "application/json" },
                        data: r,
                      })
                        .then(function (e) {
                          t(e.data.payload.positions);
                        })
                        .catch(function (e) {
                          return e;
                        });
                    })(m, b)
                  : E([]);
              },
              [m]
            ),
            Object(n.useEffect)(
              function () {
                m.length > 1 &&
                  E(
                    [].concat(
                      Object(l.a)(O),
                      Object(l.a)(
                        V.filter(function (e) {
                          return e.title.includes(m);
                        })
                      )
                    )
                  );
              },
              [O]
            ),
            r.a.createElement(
              "div",
              {
                className: "search-banner",
                onClick: function () {
                  return (w[0],
                  w[1],
                  function (e) {
                    S ||
                      ((function (e, t) {
                        q = t;
                        var a = 0;
                        new Z(e).setText(q[a]).then(function () {}),
                          (a = (a + 1) % q.length);
                      })(document.getElementById("searchHeader"), [e]),
                      A(!0));
                  })(o.data.SEARCH_BANNER.TITLE_AFTER);
                },
              },
              r.a.createElement(
                "h2",
                { id: "searchHeader" },
                o.data.SEARCH_BANNER.TITLE
              ),
              r.a.createElement(
                "form",
                {
                  onSubmit: function (e) {
                    e.preventDefault(),
                      (window.location.href = "/positions?searchTerm=" + m);
                  },
                },
                r.a.createElement(
                  "div",
                  {
                    className: S ? "search-div show" : "search-div",
                    action: "/positions",
                  },
                  r.a.createElement(
                    "label",
                    { htmlFor: "searchTerm", className: "search-label" },
                    o.data.SEARCH_BANNER.LABEL
                  ),
                  r.a.createElement(z, {
                    options: p,
                    handleInputChange: function (e) {
                      d(e.target.value);
                    },
                    placeholder: o.data.SEARCH,
                    value: m,
                  }),
                  r.a.createElement(
                    "button",
                    { type: "submit" },
                    r.a.createElement("img", {
                      src: "search.svg",
                      alt: "search",
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "tags" },
                    t && t.length > 0
                      ? t.map(function (e) {
                          return r.a.createElement(
                            s.b,
                            {
                              to: "/positions?" + e.type + "=" + e.id,
                              className: "cat",
                              key: e.title,
                            },
                            "he" === o.lang ? e.title : e.titleEn
                          );
                        })
                      : null
                  )
                )
              ),
              r.a.createElement("iframe", {
                id: "videoBackground",
                src: "https://www.youtube-nocookie.com/embed/a54mP2ZJi0U?playlist=a54mP2ZJi0U&autoplay=1&loop=1&mute=1&controls=0&modestbranding=1",
              })
            )
          );
        },
        X = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).shuffle = function (e) {
                for (var t, a = e.length; 0 !== a; ) {
                  (t = Math.floor(Math.random() * a)), a--;
                  var n = [e[t], e[a]];
                  (e[a] = n[0]), (e[t] = n[1]);
                }
                return e;
              }),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.hotPositions,
                    a = e.handleSave,
                    n = e.savedPositions,
                    o = e.translation;
                  return r.a.createElement(
                    "div",
                    { className: "hot-positions" },
                    r.a.createElement("h2", null, o.data.HOT_POSITIONS.TITLE),
                    r.a.createElement(
                      "div",
                      { className: "hot-positions-div" },
                      t && t.length > 0
                        ? t.map(function (e) {
                            return r.a.createElement(
                              "div",
                              {
                                className: "hot-position",
                                tabIndex: "0",
                                key: e.id,
                              },
                              r.a.createElement(
                                "div",
                                { className: "hot-position-body" },
                                r.a.createElement(
                                  "span",
                                  { className: "hot-position-type" },
                                  e.department.title
                                ),
                                r.a.createElement("h3", null, e.title),
                                r.a.createElement("p", null, e.jobDescription)
                              ),
                              r.a.createElement(
                                "div",
                                { className: "hot-position-footer" },
                                r.a.createElement(C, {
                                  position: e,
                                  handleSave: a,
                                  savedPositions: n,
                                }),
                                r.a.createElement(L, {
                                  url: "/positions/" + e.id,
                                }),
                                r.a.createElement(
                                  "a",
                                  { href: "/positions/" + e.id },
                                  o.data.HOT_POSITIONS.VIEW
                                )
                              )
                            );
                          })
                        : null
                    ),
                    r.a.createElement(
                      "div",
                      { className: "to-all" },
                      r.a.createElement(
                        "a",
                        { href: "/positions" },
                        o.data.HOT_POSITIONS.TO_ALL,
                        r.a.createElement("img", {
                          src: "send-white.svg",
                          alt: "go",
                        })
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        J = a(17),
        W =
          (a(96),
          (function (e) {
            function t() {
              return (
                Object(u.a)(this, t),
                Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
              );
            }
            return (
              Object(f.a)(t, e),
              Object(m.a)(t, [
                {
                  key: "render",
                  value: function () {
                    var e = this.props,
                      t = e.reasons,
                      a = e.translation;
                    return r.a.createElement(
                      "div",
                      { className: "reasons" },
                      r.a.createElement(
                        "div",
                        { className: "reasons-tabs" },
                        r.a.createElement(
                          J.d,
                          null,
                          r.a.createElement(
                            J.b,
                            null,
                            t && t.length > 0
                              ? t.map(function (e) {
                                  return r.a.createElement(
                                    J.a,
                                    { key: e.id },
                                    "he" === a.lang ? e.title : e.titleEn
                                  );
                                })
                              : null
                          ),
                          t && t.length > 0
                            ? t.map(function (e) {
                                return r.a.createElement(
                                  J.c,
                                  { key: e.id },
                                  r.a.createElement(
                                    "p",
                                    null,
                                    "he" === a.lang
                                      ? e.description
                                      : e.descriptionEn
                                  ),
                                  r.a.createElement(
                                    "div",
                                    { className: "image-container" },
                                    r.a.createElement("lottie-player", {
                                      autoplay: !0,
                                      loop: !0,
                                      mode: "normal",
                                      src: e.image,
                                      style: {
                                        width: "30rem",
                                        height: "auto",
                                        margin: "auto",
                                      },
                                    })
                                  )
                                );
                              })
                            : null
                        )
                      ),
                      r.a.createElement(
                        "ul",
                        { className: "reasons-mobile" },
                        t && t.length > 0
                          ? t.map(function (e) {
                              return r.a.createElement(
                                "li",
                                { key: e.id },
                                r.a.createElement(
                                  "h3",
                                  null,
                                  "he" === a.lang ? e.title : e.titleEn
                                ),
                                r.a.createElement("lottie-player", {
                                  autoplay: !0,
                                  loop: !0,
                                  mode: "normal",
                                  src: e.image,
                                  style: {
                                    width: "60rem",
                                    height: "auto",
                                    margin: "auto",
                                  },
                                }),
                                r.a.createElement(
                                  "p",
                                  null,
                                  "he" === a.lang
                                    ? e.description
                                    : e.descriptionEn
                                )
                              );
                            })
                          : null
                      )
                    );
                  },
                },
              ]),
              t
            );
          })(n.Component));
      function K(e) {
        a(15)({
          method: "post",
          url:
            "localhost" === window.location.hostname
              ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetHomePage"
              : "/Roham.DMZ/api/ManagedActions/GetHomePage",
          headers: { "Content-Type": "application/json" },
        })
          .then(function (t) {
            e(t.data.payload);
          })
          .catch(function (e) {
            return e;
          });
      }
      a(97);
      var Q = function (e) {
        var t = e.handleSave,
          a = e.savedPositions,
          o = e.translation,
          i = Object(n.useState)([]),
          l = Object(c.a)(i, 2),
          s = l[0],
          u = l[1],
          m = Object(n.useState)({}),
          d = Object(c.a)(m, 2),
          h = d[0],
          f = d[1],
          p = Object(n.useState)([]),
          E = Object(c.a)(p, 2),
          g = E[0],
          v = E[1],
          O = Object(n.useState)([]),
          b = Object(c.a)(O, 2),
          y = b[0],
          N = b[1],
          S = Object(n.useState)([]),
          A = Object(c.a)(S, 2),
          j = A[0],
          w = A[1],
          R = Object(n.useState)([]),
          T = Object(c.a)(R, 2),
          C = T[0],
          _ = T[1],
          L = Object(n.useState)({}),
          I = Object(c.a)(L, 2),
          P = I[0],
          M = I[1];
        return (
          Object(n.useEffect)(function () {
            H(f), K(M);
          }, []),
          Object(n.useEffect)(
            function () {
              if (Object.keys(P).length > 0) {
                var e = P.domains.filter(function (e) {
                  return e.selected;
                });
                e.map(function (e) {
                  return (e.type = "department");
                });
                var t = P.positionPercentages.filter(function (e) {
                  return e.selected;
                });
                t.map(function (e) {
                  return (e.type = "positionPrecentage");
                }),
                  w(e.concat(t)),
                  N(P.reasons),
                  u(P.positions),
                  _(P.domains);
              }
            },
            [P]
          ),
          Object(n.useEffect)(
            function () {
              Object.keys(h).length > 0 && v(h.payload.positions);
            },
            [h]
          ),
          r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement($, { tags: j, translation: o }),
            r.a.createElement(B, null),
            r.a.createElement(W, { reasons: y, translation: o }),
            r.a.createElement(X, {
              hotPositions: s,
              handleSave: t,
              savedPositions: a,
              translation: o,
            }),
            r.a.createElement(Y, { domains: C, translation: o, positions: g })
          )
        );
      };
      var ee = function (e) {
        var t = e.translation,
          o = Object(n.useState)([]),
          i = Object(c.a)(o, 2),
          l = i[0],
          s = i[1],
          u = Object(n.useState)({}),
          m = Object(c.a)(u, 2),
          d = m[0],
          h = m[1],
          f = Object(n.useState)(0),
          p = Object(c.a)(f, 2),
          E = p[0],
          g = p[1],
          v = Object(n.useState)({}),
          O = Object(c.a)(v, 2),
          b = O[0],
          y = O[1],
          S = Object(n.useRef)();
        Object(n.useEffect)(function () {
          var e;
          (e = h),
            a(15)({
              method: "post",
              url:
                "localhost" == window.location.hostname
                  ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetCeosPage"
                  : "/Roham.DMZ/api/ManagedActions/GetCeosPage",
              headers: { "Content-Type": "application/json" },
            })
              .then(function (t) {
                e(t.data.payload);
              })
              .catch(function (e) {
                return e;
              });
        }, []),
          Object(n.useEffect)(
            function () {
              s(d.ceos);
            },
            [d]
          ),
          Object(n.useEffect)(
            function () {
              d.ceos && d.ceos.length > 0 && A(0);
            },
            [l]
          ),
          Object(n.useEffect)(
            function () {
              document.getElementsByClassName("active").length > 0 &&
                document
                  .getElementsByClassName("active")[0]
                  .scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "center",
                  });
            },
            [b]
          );
        var A = function (e) {
          g(e),
            y(function (t) {
              return Object(N.a)({}, t, l[e]);
            });
        };
        return (
          Object(n.useEffect)(function () {}, [E]),
          r.a.createElement(
            "div",
            { className: "timeline-div" },
            l && l.length > 0
              ? r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement("h2", null, t.data.CEOS.TITLE),
                  r.a.createElement(
                    "div",
                    { className: "timeline-images" },
                    l && l.length > 0
                      ? l.map(function (e, t) {
                          return r.a.createElement(
                            "button",
                            {
                              key: t,
                              onClick: function () {
                                return A(t);
                              },
                              className:
                                l
                                  .map(function (e) {
                                    return e.id;
                                  })
                                  .indexOf(b.id) === t
                                  ? "active"
                                  : null,
                            },
                            r.a.createElement("img", {
                              src: e.img,
                              alt: e.title,
                            })
                          );
                        })
                      : null
                  ),
                  r.a.createElement(
                    "div",
                    { className: "timeline-input" },
                    r.a.createElement("span", null, "1949"),
                    r.a.createElement("input", {
                      type: "range",
                      min: "0",
                      max: l.length - 1,
                      value: E,
                      onChange: function (e) {
                        return A(e.target.value);
                      },
                      ref: S,
                      style: {
                        backgroundSize:
                          (100 * (E - 0)) / (l.length - 1 - 0) + "% 100%",
                      },
                    }),
                    r.a.createElement("span", null, new Date().getFullYear())
                  ),
                  r.a.createElement(
                    "h3",
                    null,
                    "he" === t.lang ? b.title : b.titleEn,
                    ", ",
                    b.end,
                    "-",
                    b.start
                  ),
                  r.a.createElement("div", {
                    dangerouslySetInnerHTML:
                      "he" === t.lang
                        ? { __html: b.description }
                        : { __html: b.descriptionEn },
                  })
                )
              : null
          )
        );
      };
      var te = function () {
          var e = Object(n.useState)([]),
            t = Object(c.a)(e, 2),
            o = t[0],
            i = t[1],
            l = Object(n.useState)({}),
            s = Object(c.a)(l, 2),
            u = s[0],
            m = s[1],
            d = Object(n.useState)(""),
            h = Object(c.a)(d, 2),
            f = h[0],
            p = h[1];
          Object(n.useEffect)(function () {
            var e;
            (e = m),
              a(15)({
                method: "post",
                url:
                  "localhost" == window.location.hostname
                    ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetExhibitionsPage"
                    : "/Roham.DMZ/api/ManagedActions/GetExhibitionsPage",
                headers: { "Content-Type": "application/json" },
              })
                .then(function (t) {
                  e(t.data.payload);
                })
                .catch(function (e) {
                  return e;
                });
          }, []),
            Object(n.useEffect)(
              function () {
                i(u.exhibitions), p(u.title);
              },
              [u]
            );
          return r.a.createElement(
            r.a.Fragment,
            null,
            o && o.length > 0
              ? r.a.createElement(
                  "div",
                  { className: "exhibitions" },
                  r.a.createElement("h2", null, f),
                  r.a.createElement(
                    "ul",
                    null,
                    o.map(function (e) {
                      return r.a.createElement(
                        "li",
                        { className: "exhibition", key: e.id, title: e.title },
                        r.a.createElement(
                          "a",
                          { href: e.link },
                          r.a.createElement(
                            "div",
                            { className: "exhibitions-image" },
                            r.a.createElement("img", {
                              src: e.img,
                              alt: e.title,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            { className: "exhibition-text" },
                            r.a.createElement("h4", null, e.title)
                          )
                        )
                      );
                    })
                  )
                )
              : null
          );
        },
        ae = function (e) {
          var t = e.translation;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "timeline" },
              r.a.createElement(ee, { translation: t })
            ),
            r.a.createElement(
              "div",
              { className: "exhibitons" },
              r.a.createElement(te, null)
            )
          );
        };
      var ne = function () {
          var e = Object(n.useState)([]),
            t = Object(c.a)(e, 2),
            o = t[0],
            i = t[1],
            l = Object(n.useState)(""),
            s = Object(c.a)(l, 2),
            u = s[0],
            m = s[1],
            d = Object(n.useState)({}),
            h = Object(c.a)(d, 2),
            f = h[0],
            p = h[1],
            E = Object(n.useState)(!1),
            g = Object(c.a)(E, 2),
            v = g[0],
            O = g[1],
            b = Object(n.useState)({}),
            y = Object(c.a)(b, 2),
            N = y[0],
            S = y[1];
          Object(n.useEffect)(function () {
            var e;
            (e = S),
              a(15)({
                method: "post",
                url:
                  "localhost" === window.location.hostname
                    ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetTestimonialsPage"
                    : "/Roham.DMZ/api/ManagedActions/GetTestimonialsPage",
                headers: { "Content-Type": "application/json" },
              })
                .then(function (t) {
                  e(t.data.payload);
                })
                .catch(function (e) {
                  return e;
                });
          }, []),
            Object(n.useEffect)(
              function () {
                i(N.testimonials), m(N.note);
              },
              [N]
            ),
            Object(n.useEffect)(
              function () {
                o && o.length > 0 && p(o[0]);
              },
              [o]
            );
          return r.a.createElement(
            "div",
            { className: "testimonials" },
            r.a.createElement("p", null, u),
            f
              ? r.a.createElement(
                  "div",
                  {
                    className: "testimonial-main",
                    style: { background: v ? "#000" : 'url("' + f.img + '")' },
                  },
                  v
                    ? r.a.createElement("div", {
                        className: "iframe-div",
                        dangerouslySetInnerHTML: { __html: f.embeded },
                      })
                    : r.a.createElement(
                        r.a.Fragment,
                        null,
                        r.a.createElement(
                          "button",
                          {
                            onClick: function () {
                              O(!v);
                            },
                          },
                          r.a.createElement("img", {
                            src: "/youtube.svg",
                            alt: "play",
                            className: "play",
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "video-name" },
                          r.a.createElement(
                            "h2",
                            { className: "name-age" },
                            f.title
                          ),
                          r.a.createElement("h3", { className: "role" }, f.role)
                        )
                      )
                )
              : null,
            r.a.createElement(
              "ul",
              { className: "testimonial-cards" },
              o && o.length > 0 && f
                ? o.map(function (e, t) {
                    return r.a.createElement(
                      "li",
                      { key: t },
                      r.a.createElement(
                        "button",
                        {
                          className:
                            e.id === f.id
                              ? "testimonial-card chosen"
                              : "testimonial-card",
                          style: { backgroundImage: 'url("' + e.img + '")' },
                          onClick: function () {
                            return (function (e) {
                              p(e), O(!1);
                            })(e);
                          },
                        },
                        r.a.createElement("img", {
                          src: "/youtube.svg",
                          alt: "play",
                          className: "play",
                        }),
                        r.a.createElement(
                          "div",
                          { className: "video-name" },
                          r.a.createElement(
                            "h2",
                            { className: "name-age" },
                            e.title
                          ),
                          r.a.createElement("h3", { className: "role" }, e.role)
                        )
                      )
                    );
                  })
                : null
            )
          );
        },
        re = function (e) {
          var t = e.aboutTabs,
            a = e.translation,
            o = e.path,
            i = Object(n.useState)(0),
            l = Object(c.a)(i, 2),
            s = l[0],
            u = l[1],
            m = function (e) {
              var t = document.createElement("div");
              return (
                (t.innerHTML = e),
                0 === t.childNodes.length ? "" : t.childNodes[0].nodeValue
              );
            };
          return r.a.createElement(
            "div",
            { className: "about-tabs" },
            r.a.createElement(
              J.d,
              {
                selectedIndex: s,
                onSelect: function (e) {
                  return u(e);
                },
              },
              r.a.createElement(
                J.b,
                null,
                t && t.length > 0
                  ? t.map(function (e) {
                      return r.a.createElement(
                        J.a,
                        { key: e.id },
                        "he" === a.lang ? e.title : e.titleEn
                      );
                    })
                  : null
              ),
              t && t.length > 0
                ? t.map(function (e) {
                    return r.a.createElement(
                      J.c,
                      { key: e.id },
                      r.a.createElement("div", {
                        className: "about-tab-content",
                        dangerouslySetInnerHTML:
                          "he" === a.lang
                            ? { __html: m(e.content) }
                            : { __html: m(e.contentEn) },
                      }),
                      e.image &&
                        /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(e.image)
                        ? r.a.createElement("img", {
                            src: e.image,
                            alt: e.title,
                            className: "about-icon",
                          })
                        : null
                    );
                  })
                : null
            ),
            r.a.createElement(
              "div",
              { className: "mobile-about" },
              !o && t && t.length > 0
                ? t.map(function (e, t) {
                    return r.a.createElement(
                      r.a.Fragment,
                      { key: t + "-m" },
                      e.image &&
                        /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(e.image)
                        ? r.a.createElement("img", {
                            src: e.image,
                            alt: e.title,
                            className: "about-icon",
                          })
                        : null,
                      r.a.createElement("div", {
                        key: e.id,
                        className: "about-tab-content",
                        dangerouslySetInnerHTML:
                          "he" === a.lang
                            ? { __html: m(e.content) }
                            : { __html: m(e.contentEn) },
                      })
                    );
                  })
                : null
            )
          );
        };
      var oe = function (e) {
          var t = e.translation,
            o = Object(y.g)().path,
            i = Object(n.useState)([]),
            l = Object(c.a)(i, 2),
            s = l[0],
            u = l[1],
            m = Object(n.useState)([
              {
                title: "\u05d0\u05d5\u05d3\u05d5\u05ea",
                titleEN: "About",
                link: "/",
              },
            ]),
            d = Object(c.a)(m, 2),
            h = d[0],
            f = (d[1], Object(n.useState)({})),
            p = Object(c.a)(f, 2),
            E = p[0],
            g = p[1];
          return (
            Object(n.useEffect)(function () {
              var e;
              (e = g),
                a(15)({
                  method: "post",
                  url:
                    "localhost" == window.location.hostname
                      ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetAboutPage"
                      : "/Roham.DMZ/api/ManagedActions/GetAboutPage",
                  headers: { "Content-Type": "application/json" },
                })
                  .then(function (t) {
                    e(t.data.payload);
                  })
                  .catch(function (e) {
                    return e;
                  });
            }, []),
            Object(n.useEffect)(
              function () {
                u(E.about);
              },
              [E]
            ),
            r.a.createElement(
              "div",
              { className: "page-content about-page" },
              r.a.createElement(b, { translation: t, breadCrumbsObj: h }),
              r.a.createElement(re, { aboutTabs: s, translation: t, path: o })
            )
          );
        },
        ie = function (e) {
          var t = e.historyTabs,
            a = e.translation,
            o = e.path,
            i = Object(n.useState)(0),
            l = Object(c.a)(i, 2),
            s = l[0],
            u = l[1];
          Object(n.useEffect)(
            function () {
              if (t && t.length > 0 && o)
                switch (o) {
                  case "history":
                    u(t.length);
                    break;
                  case "testimonials":
                    u(t.length + 1);
                }
            },
            [t]
          );
          var m = function (e) {
            var t = document.createElement("div");
            return (
              (t.innerHTML = e),
              0 === t.childNodes.length ? "" : t.childNodes[0].nodeValue
            );
          };
          return r.a.createElement(
            "div",
            { className: "about-tabs" },
            r.a.createElement(
              J.d,
              {
                selectedIndex: s,
                onSelect: function (e) {
                  return u(e);
                },
              },
              r.a.createElement(
                J.b,
                null,
                t && t.length > 0
                  ? t.map(function (e) {
                      return r.a.createElement(
                        J.a,
                        { key: e.id },
                        "he" === a.lang ? e.title : e.titleEn
                      );
                    })
                  : null,
                r.a.createElement(J.a, { key: 6 }, a.data.ABOUT.HISTORY)
              ),
              t && t.length > 0
                ? t.map(function (e) {
                    return r.a.createElement(
                      J.c,
                      { key: e.id },
                      r.a.createElement("div", {
                        className: "about-tab-content",
                        dangerouslySetInnerHTML:
                          "he" === a.lang
                            ? { __html: m(e.content) }
                            : { __html: m(e.contentEn) },
                      }),
                      e.image &&
                        /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(e.image)
                        ? r.a.createElement("img", {
                            src: e.image,
                            alt: e.title,
                            className: "about-icon",
                          })
                        : null
                    );
                  })
                : null,
              r.a.createElement(
                J.c,
                { key: t && t.length > 0 ? t.length + 1 : 0 },
                r.a.createElement(ae, { translation: a })
              )
            ),
            r.a.createElement(
              "div",
              { className: "mobile-about" },
              r.a.createElement(ae, { translation: a }),
              !o && t && t.length > 0
                ? t.map(function (e, t) {
                    return r.a.createElement(
                      r.a.Fragment,
                      { key: t + "-m" },
                      e.image &&
                        /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(e.image)
                        ? r.a.createElement("img", {
                            src: e.image,
                            alt: e.title,
                            className: "about-icon",
                          })
                        : null,
                      r.a.createElement("div", {
                        key: e.id,
                        className: "about-tab-content",
                        dangerouslySetInnerHTML:
                          "he" === a.lang
                            ? { __html: m(e.content) }
                            : { __html: m(e.contentEn) },
                      })
                    );
                  })
                : "history" === o
                ? r.a.createElement(ae, { translation: a })
                : r.a.createElement(ne, null)
            )
          );
        };
      var le = function (e) {
          var t = e.translation,
            o = Object(y.g)().path,
            i = Object(n.useState)([]),
            l = Object(c.a)(i, 2),
            s = l[0],
            u = l[1],
            m = Object(n.useState)([
              {
                title: "\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d4",
                titleEN: "History",
                link: "/",
              },
            ]),
            d = Object(c.a)(m, 2),
            h = d[0],
            f = (d[1], Object(n.useState)({})),
            p = Object(c.a)(f, 2),
            E = p[0],
            g = p[1];
          return (
            Object(n.useEffect)(function () {
              var e;
              (e = g),
                a(15)({
                  method: "post",
                  url:
                    "localhost" == window.location.hostname
                      ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetHistoryPage"
                      : "/Roham.DMZ/api/ManagedActions/GetHistoryPage",
                  headers: { "Content-Type": "application/json" },
                })
                  .then(function (t) {
                    e(t.data.payload);
                  })
                  .catch(function (e) {
                    return e;
                  });
            }, []),
            Object(n.useEffect)(
              function () {
                u(E.history);
              },
              [E]
            ),
            r.a.createElement(
              "div",
              { className: "page-content about-page" },
              r.a.createElement(b, { translation: t, breadCrumbsObj: h }),
              r.a.createElement(ie, { historyTabs: s, translation: t, path: o })
            )
          );
        },
        ce = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.button,
                    a = e.translation;
                  return r.a.createElement(
                    "li",
                    null,
                    r.a.createElement(
                      "a",
                      {
                        href: "positions?department=" + t.id,
                        className: "domain-link",
                      },
                      r.a.createElement("img", {
                        src: t.icon,
                        className: "domain-icon",
                        alt: "he" === a.lang ? t.title : t.titleEn,
                      }),
                      r.a.createElement(
                        "h3",
                        null,
                        "he" === a.lang ? t.title : t.titleEn
                      ),
                      r.a.createElement("p", null, t.description)
                    ),
                    r.a.createElement("img", {
                      className: "domain-background",
                      src: t.background,
                      alt: "a",
                    })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        se = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(d.a)(this, Object(h.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.buttons,
                    a = e.pageData,
                    n = e.translation;
                  return r.a.createElement(
                    "div",
                    { className: "domains-lobby" },
                    a && t
                      ? r.a.createElement(
                          r.a.Fragment,
                          null,
                          r.a.createElement(
                            "h1",
                            null,
                            "he" === n.lang ? a.title : a.titleEN
                          ),
                          r.a.createElement(
                            "p",
                            null,
                            "he" === n.lang ? a.description : a.paragraphEN
                          ),
                          r.a.createElement(
                            "ul",
                            { className: "domain-buttons" },
                            t.map(function (e) {
                              return r.a.createElement(ce, {
                                key: e.id,
                                button: e,
                                translation: n,
                              });
                            })
                          )
                        )
                      : null
                  );
                },
              },
            ]),
            t
          );
        })(n.Component);
      function ue(e) {
        a(15)({
          method: "post",
          url:
            "localhost" == window.location.hostname
              ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetDomainsPage"
              : "/Roham.DMZ/api/ManagedActions/GetDomainsPage",
          headers: { "Content-Type": "application/json" },
        })
          .then(function (t) {
            e(t.data.payload);
          })
          .catch(function (e) {
            return e;
          });
      }
      var me = function (e) {
          var t = e.stages,
            a = e.translation,
            o = Object(n.useRef)(null),
            i = Object(n.useState)(!1),
            l = Object(c.a)(i, 2),
            s = l[0],
            u = l[1],
            m = (function (e) {
              var t = Object(n.useState)(!1),
                a = Object(c.a)(t, 2),
                r = a[0],
                o = a[1],
                i = Object(n.useMemo)(function () {
                  return new IntersectionObserver(function (e) {
                    var t = Object(c.a)(e, 1)[0];
                    return o(t.isIntersecting);
                  });
                }, []);
              return (
                Object(n.useEffect)(
                  function () {
                    return (
                      i.observe(e.current),
                      function () {
                        i.disconnect();
                      }
                    );
                  },
                  [e, i]
                ),
                r
              );
            })(o);
          return (
            Object(n.useEffect)(
              function () {
                !0 === m && u(!0);
              },
              [m]
            ),
            r.a.createElement(
              "div",
              { className: "stages", ref: o },
              r.a.createElement("h2", null, a.data.STAGES.TITLE),
              r.a.createElement(
                "div",
                {
                  className: s
                    ? "stages-section stages-animation"
                    : "stages-section",
                },
                t && t.length > 0
                  ? t.map(function (e, t) {
                      return r.a.createElement(
                        "div",
                        { className: "stage", key: e.id },
                        r.a.createElement(
                          "div",
                          { className: "stage-number" },
                          t + 1
                        ),
                        r.a.createElement(
                          "h3",
                          null,
                          "he" === a.lang ? e.title : e.titleEn
                        ),
                        r.a.createElement(
                          "p",
                          null,
                          "he" === a.lang ? e.description : e.descriptionEn
                        )
                      );
                    })
                  : null
              ),
              r.a.createElement(
                "div",
                { className: "domains-stages to-all" },
                r.a.createElement(
                  "a",
                  { href: "/positions" },
                  a.data.HOT_POSITIONS.TO_ALL,
                  r.a.createElement("img", { src: "send-white.svg", alt: "go" })
                )
              )
            )
          );
        },
        de = function (e) {
          var t = e.translation;
          return r.a.createElement(
            "div",
            { className: "career-banner" },
            r.a.createElement("h2", null, t.data.CAREER.TITLE),
            r.a.createElement("p", null, t.data.CAREER.PARAGRAPH),
            r.a.createElement(
              s.b,
              { to: "/positions" },
              t.data.HOT_POSITIONS.TO_ALL,
              r.a.createElement("img", { src: "send-white.svg", alt: "share" })
            )
          );
        },
        he = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = {}),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.story,
                    a = e.open,
                    n = e.togglePopup;
                  return r.a.createElement(
                    "div",
                    { className: a ? "story-popup show" : "story-popup" },
                    r.a.createElement("div", {
                      className: "story-background",
                      onClick: function () {
                        return n({});
                      },
                    }),
                    r.a.createElement(
                      "div",
                      {
                        className: "story-window",
                        style: { background: "url(" + t.image + ")" },
                      },
                      r.a.createElement(
                        "button",
                        {
                          onClick: function () {
                            return n({});
                          },
                        },
                        r.a.createElement("img", {
                          src: "/x-icon.svg",
                          alt: "close",
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "story-info" },
                        r.a.createElement("h3", null, t.title),
                        r.a.createElement("h4", null, t.role),
                        r.a.createElement("p", null, t.story),
                        r.a.createElement(
                          "a",
                          { href: t.link },
                          t.linkText,
                          r.a.createElement("span", { className: "arrow-left" })
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        fe =
          (n.Component,
          function (e) {
            var t = e.translation,
              a = Object(n.useState)([]),
              o = Object(c.a)(a, 2),
              i = o[0],
              l = o[1],
              s = Object(n.useState)({}),
              u = Object(c.a)(s, 2),
              m = u[0],
              d = u[1],
              h = Object(n.useState)({}),
              f = Object(c.a)(h, 2),
              p = f[0],
              E = f[1],
              g = Object(n.useState)([
                {
                  title:
                    "\u05e7\u05e8\u05d9\u05d9\u05e8\u05d4 \u05d1\u05de\u05d5\u05e1\u05d3",
                  titleEN: "Career",
                  link: "/",
                },
              ]),
              v = Object(c.a)(g, 2),
              O = v[0],
              y = (v[1], Object(n.useState)({})),
              N = Object(c.a)(y, 2),
              S = N[0],
              A = N[1],
              j = Object(n.useState)([]),
              w = Object(c.a)(j, 2),
              R = w[0],
              T = w[1],
              C = Object(n.useState)([]),
              _ = Object(c.a)(C, 2),
              L = (_[0], _[1]);
            return (
              Object(n.useEffect)(function () {
                ue(A), K(E);
              }, []),
              Object(n.useEffect)(
                function () {
                  l(S.domains), d(S.domainPage);
                },
                [S]
              ),
              Object(n.useEffect)(
                function () {
                  T(p.stages), L(p.stories);
                },
                [p]
              ),
              r.a.createElement(
                "div",
                { className: "page-content domains-page" },
                r.a.createElement(b, { translation: t, breadCrumbsObj: O }),
                r.a.createElement(de, { translation: t }),
                r.a.createElement(se, {
                  buttons: i,
                  pageData: m,
                  translation: t,
                }),
                r.a.createElement(me, { stages: R, translation: t })
              )
            );
          }),
        pe = a(44),
        Ee = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = { open: !1 }),
              (a.toggleFaq = function () {
                a.setState({ open: !a.state.open });
              }),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.faq,
                    a = e.translation,
                    n = this.state.open;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    "he" !== a.lang && "" === t.titleEn
                      ? null
                      : r.a.createElement(
                          "li",
                          { className: n ? "faq active" : "faq" },
                          r.a.createElement(
                            "button",
                            { onClick: this.toggleFaq },
                            r.a.createElement(
                              "span",
                              null,
                              "he" === a.lang ? t.title : t.titleEn
                            ),
                            r.a.createElement("img", {
                              src: "/arrow-up.svg",
                              alt: "arrow",
                            })
                          ),
                          r.a.createElement(
                            pe.Collapse,
                            { isOpened: n },
                            r.a.createElement(
                              "p",
                              null,
                              "he" === a.lang ? t.answer : t.answerEn
                            )
                          )
                        )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        ge = (function (e) {
          function t() {
            var e, a;
            Object(u.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(d.a)(
                this,
                (e = Object(h.a)(t)).call.apply(e, [this].concat(r))
              )).state = {}),
              a
            );
          }
          return (
            Object(f.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.faqs,
                    a = e.translation;
                  return r.a.createElement(
                    "div",
                    { className: "faqs-lobby" },
                    r.a.createElement(
                      "h1",
                      null,
                      "he" === a.lang ? t.title : t.titleEN
                    ),
                    r.a.createElement(
                      "p",
                      null,
                      "he" === a.lang ? t.description : t.paragraphEN
                    ),
                    r.a.createElement(
                      "ul",
                      { className: "faqs-list" },
                      t && t.faqs
                        ? t.faqs.map(function (e) {
                            return r.a.createElement(Ee, {
                              faq: e,
                              key: e.id,
                              translation: a,
                            });
                          })
                        : null
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component);
      var ve = function (e) {
          var t = e.translation,
            o = Object(n.useState)([]),
            i = Object(c.a)(o, 2),
            l = i[0],
            s = i[1],
            u = Object(n.useState)([
              {
                title:
                  "\u05e9\u05d0\u05dc\u05d5\u05ea \u05d5\u05ea\u05e9\u05d5\u05d1\u05d5\u05ea",
                titleEN: "Frequently Asked Questions",
                link: "/",
              },
            ]),
            m = Object(c.a)(u, 2),
            d = m[0];
          m[1];
          return (
            Object(n.useEffect)(function () {
              var e;
              (e = s),
                a(15)({
                  method: "post",
                  url:
                    "localhost" == window.location.hostname
                      ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetFaqsPage"
                      : "/Roham.DMZ/api/ManagedActions/GetFaqsPage",
                  headers: { "Content-Type": "application/json" },
                })
                  .then(function (t) {
                    e(t.data.payload);
                  })
                  .catch(function (e) {
                    return e;
                  });
            }, []),
            r.a.createElement(
              "div",
              { className: "page-content faqs-page" },
              r.a.createElement(b, { translation: t, breadCrumbsObj: d }),
              r.a.createElement(ge, { faqs: l, translation: t })
            )
          );
        },
        Oe = a(12),
        be = a(18),
        ye = a(2),
        Ne = a.n(ye),
        Se = function (e) {
          var t = e.name,
            a = e.placeholder,
            n = e.value,
            o = e.error,
            i = e.onChange,
            l = e.label,
            c = e.required,
            s = r.a.createRef();
          return r.a.createElement(
            "div",
            { className: "text-input" },
            l
              ? r.a.createElement(
                  "label",
                  { htmlFor: t, className: "input-label" },
                  l,
                  c
                    ? r.a.createElement("span", { className: "required" }, "*")
                    : null
                )
              : null,
            r.a.createElement("input", {
              type: "text",
              name: t,
              id: t,
              placeholder: a,
              value: n,
              onChange: function () {
                i({ currentTarget: s.current });
              },
              className: o && "error-input",
              required: c,
              ref: s,
            }),
            r.a.createElement("span", { className: "error-message" }, o),
            n
              ? r.a.createElement(
                  "button",
                  { type: "button" },
                  r.a.createElement("img", {
                    src: "/ex.svg",
                    alt: "empty input",
                    onClick: function () {
                      (s.current.value = ""), i({ currentTarget: s.current });
                    },
                  })
                )
              : null
          );
        },
        Ae = function (e) {
          var t = e.name,
            a = e.placeholder,
            n = e.value,
            o = e.onChange,
            i = e.options,
            l = e.label,
            c = e.error,
            s = e.defaultOption,
            u = e.required;
          return r.a.createElement(
            r.a.Fragment,
            null,
            l
              ? r.a.createElement(
                  "label",
                  { htmlFor: t, className: "input-label" },
                  l,
                  u && " " !== l
                    ? r.a.createElement("span", { className: "required" }, "*")
                    : null
                )
              : null,
            r.a.createElement(
              "select",
              {
                type: "text",
                name: t,
                id: t,
                defaultValue: "",
                value: s || n,
                onChange: o,
                className: c && "error-input",
                required: u,
              },
              r.a.createElement("option", { value: "", disabled: !0 }, a),
              i.map(function (e) {
                return r.a.createElement(
                  "option",
                  { key: e.id + e.value, value: e.id },
                  e.value
                );
              })
            ),
            c && r.a.createElement("span", { className: "error-message" }, c)
          );
        },
        je = function (e) {
          var t = e.name,
            a = e.placeholder,
            n = e.cols,
            o = e.rows,
            i = e.value,
            l = e.onChange,
            c = e.limit,
            s = e.error,
            u = e.required;
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement("textarea", {
              name: t,
              id: t,
              cols: n,
              rows: o,
              placeholder: a,
              onChange: l,
              value: i,
              maxLength: c,
              className: s && "error-input",
              required: u,
            }),
            r.a.createElement(
              "div",
              null,
              s && r.a.createElement("span", { className: "error-message" }, s)
            ),
            c
              ? r.a.createElement(
                  "span",
                  { className: "text-area-limit" },
                  i.length,
                  "/",
                  c
                )
              : null
          );
        };
      function we(e, t) {
        return (
          e.forEach(function (e) {
            switch (e.type) {
              case "any.empty":
                e.message = t.MANDATORY;
                break;
              case "string.min":
                e.message = t.MIN_BEFORE + e.context.limit + t.MIN_AFTER;
                break;
              case "string.max":
                e.message = t.MAX_BEFORE + e.context.limit + t.MAX_AFTER;
                break;
              case "string.alphanum":
                e.message = t.ALPHA;
                break;
              case "object.regex":
                e.message = t.REGEX;
                break;
              case "string.regex.base":
                e.message = t.BASE;
                break;
              case "string.email":
                e.message = t.EMAIL;
            }
          }),
          e
        );
      }
      var Re = [],
        Te = [
          { id: "01", value: "01" },
          { id: "02", value: "02" },
          { id: "03", value: "03" },
          { id: "04", value: "04" },
          { id: "05", value: "05" },
          { id: "06", value: "06" },
          { id: "07", value: "07" },
          { id: "08", value: "08" },
          { id: "09", value: "09" },
          { id: "10", value: "10" },
          { id: "11", value: "11" },
          { id: "12", value: "12" },
        ],
        Ce = [
          { id: "01", value: "01" },
          { id: "02", value: "02" },
          { id: "03", value: "03" },
          { id: "04", value: "04" },
          { id: "05", value: "05" },
          { id: "06", value: "06" },
          { id: "07", value: "07" },
          { id: "08", value: "08" },
          { id: "09", value: "09" },
          { id: "10", value: "10" },
          { id: "11", value: "11" },
          { id: "12", value: "12" },
          { id: "13", value: "13" },
          { id: "14", value: "14" },
          { id: "15", value: "15" },
          { id: "16", value: "16" },
          { id: "17", value: "17" },
          { id: "18", value: "18" },
          { id: "19", value: "19" },
          { id: "20", value: "20" },
          { id: "21", value: "21" },
          { id: "22", value: "22" },
          { id: "23", value: "23" },
          { id: "24", value: "24" },
          { id: "25", value: "25" },
          { id: "26", value: "26" },
          { id: "27", value: "27" },
          { id: "28", value: "28" },
          { id: "29", value: "29" },
          { id: "30", value: "30" },
          { id: "31", value: "31" },
        ];
      function _e() {
        if (0 === Re.length)
          for (var e = new Date().getFullYear(), t = 0; e - t >= e - 100; t++)
            Re.push({ value: e - t, id: e - t });
        return Re;
      }
      function Le() {
        return Te;
      }
      function Ie() {
        return Ce;
      }
      function Pe(e, t) {
        var n = a(15),
          r = JSON.stringify({ catalogTypes: e });
        n({
          method: "post",
          url:
            "localhost" == window.location.hostname
              ? "http://192.168.40.11/RohamDMZ/api/ManagedActions/GetCatalogs"
              : "/Roham.DMZ/api/ManagedActions/GetCatalogs",
          headers: { "Content-Type": "application/json" },
          data: r,
        })
          .then(function (e) {
            t(e.data);
          })
          .catch(function (e) {
            return e;
          });
      }
      var Me = a(15);
      function Fe(e, t, a, n) {
        var r = JSON.stringify({
            FirstName: e.firstName,
            LastName: e.lastName,
            FatherName: e.fatherName,
            BirthDate: new Date(e.year + "-" + e.month + "-" + e.day),
            Country: e.country,
            CitizenShip: e.citizenship,
            MobilePhone: e.phone,
            Email: e.email,
            Language: e.language,
            Notes: e.notes,
            IPAddress: t,
          }),
          o = {
            method: "post",
            url:
              "localhost" === window.location.hostname
                ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/SubmitContactMe"
                : "/Roham.DMZ/api/ManagedActions/SubmitContactMe",
            data: r,
            headers: { "Content-Type": "application/json" },
          };
        Me(o)
          .then(function (e) {
            200 === e.status && a(!0);
          })
          .catch(function (e) {
            return (
              n(
                "\u05d1\u05e2\u05d9\u05d4 \u05d1\u05e9\u05e8\u05ea, \u05d0\u05e0\u05d0 \u05e4\u05e0\u05d4 \u05de\u05d0\u05d5\u05d7\u05e8 \u05d9\u05d5\u05ea\u05e8"
              ),
              e
            );
          });
      }
      var ke = a(20);
      function xe(e) {
        a(15)({
          method: "post",
          url:
            "localhost" == window.location.hostname
              ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetContactUsTranslation"
              : "/Roham.DMZ/api/ManagedActions/GetContactUsTranslation",
          headers: { "Content-Type": "application/json" },
        })
          .then(function (t) {
            e(t.data.payload);
          })
          .catch(function (e) {
            return e;
          });
      }
      function De(e) {
        a(15)({
          method: "post",
          url:
            "localhost" == window.location.hostname
              ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetCVPage"
              : "/Roham.DMZ/api/ManagedActions/GetCVPage",
          headers: { "Content-Type": "application/json" },
        })
          .then(function (t) {
            e(t.data.payload);
          })
          .catch(function (e) {
            return e;
          });
      }
      function He(e, t) {
        var a =
          ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
          e["@@iterator"];
        if (!a) {
          if (
            Array.isArray(e) ||
            (a = (function (e, t) {
              if (!e) return;
              if ("string" === typeof e) return Ge(e, t);
              var a = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === a && e.constructor && (a = e.constructor.name);
              if ("Map" === a || "Set" === a) return Array.from(e);
              if (
                "Arguments" === a ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
              )
                return Ge(e, t);
            })(e)) ||
            (t && e && "number" === typeof e.length)
          ) {
            a && (e = a);
            var n = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return n >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[n++] };
              },
              e: function (e) {
                throw e;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          i = !0,
          l = !1;
        return {
          s: function () {
            a = a.call(e);
          },
          n: function () {
            var e = a.next();
            return (i = e.done), e;
          },
          e: function (e) {
            (l = !0), (o = e);
          },
          f: function () {
            try {
              i || null == a.return || a.return();
            } finally {
              if (l) throw o;
            }
          },
        };
      }
      function Ge(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var a = 0, n = new Array(t); a < t; a++) n[a] = e[a];
        return n;
      }
      function qe() {
        qe = function () {
          return e;
        };
        var e = {},
          t = Object.prototype,
          a = t.hasOwnProperty,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.asyncIterator || "@@asyncIterator",
          i = n.toStringTag || "@@toStringTag";
        function l(e, t, a) {
          return (
            Object.defineProperty(e, t, {
              value: a,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          );
        }
        try {
          l({}, "");
        } catch (w) {
          l = function (e, t, a) {
            return (e[t] = a);
          };
        }
        function c(e, t, a, n) {
          var r = t && t.prototype instanceof m ? t : m,
            o = Object.create(r.prototype),
            i = new S(n || []);
          return (
            (o._invoke = (function (e, t, a) {
              var n = "suspendedStart";
              return function (r, o) {
                if ("executing" === n)
                  throw new Error("Generator is already running");
                if ("completed" === n) {
                  if ("throw" === r) throw o;
                  return j();
                }
                for (a.method = r, a.arg = o; ; ) {
                  var i = a.delegate;
                  if (i) {
                    var l = b(i, a);
                    if (l) {
                      if (l === u) continue;
                      return l;
                    }
                  }
                  if ("next" === a.method) a.sent = a._sent = a.arg;
                  else if ("throw" === a.method) {
                    if ("suspendedStart" === n)
                      throw ((n = "completed"), a.arg);
                    a.dispatchException(a.arg);
                  } else "return" === a.method && a.abrupt("return", a.arg);
                  n = "executing";
                  var c = s(e, t, a);
                  if ("normal" === c.type) {
                    if (
                      ((n = a.done ? "completed" : "suspendedYield"),
                      c.arg === u)
                    )
                      continue;
                    return { value: c.arg, done: a.done };
                  }
                  "throw" === c.type &&
                    ((n = "completed"), (a.method = "throw"), (a.arg = c.arg));
                }
              };
            })(e, a, i)),
            o
          );
        }
        function s(e, t, a) {
          try {
            return { type: "normal", arg: e.call(t, a) };
          } catch (w) {
            return { type: "throw", arg: w };
          }
        }
        e.wrap = c;
        var u = {};
        function m() {}
        function d() {}
        function h() {}
        var f = {};
        l(f, r, function () {
          return this;
        });
        var p = Object.getPrototypeOf,
          E = p && p(p(A([])));
        E && E !== t && a.call(E, r) && (f = E);
        var g = (h.prototype = m.prototype = Object.create(f));
        function v(e) {
          ["next", "throw", "return"].forEach(function (t) {
            l(e, t, function (e) {
              return this._invoke(t, e);
            });
          });
        }
        function O(e, t) {
          var n;
          this._invoke = function (r, o) {
            function i() {
              return new t(function (n, i) {
                !(function n(r, o, i, l) {
                  var c = s(e[r], e, o);
                  if ("throw" !== c.type) {
                    var u = c.arg,
                      m = u.value;
                    return m && "object" == typeof m && a.call(m, "__await")
                      ? t.resolve(m.__await).then(
                          function (e) {
                            n("next", e, i, l);
                          },
                          function (e) {
                            n("throw", e, i, l);
                          }
                        )
                      : t.resolve(m).then(
                          function (e) {
                            (u.value = e), i(u);
                          },
                          function (e) {
                            return n("throw", e, i, l);
                          }
                        );
                  }
                  l(c.arg);
                })(r, o, n, i);
              });
            }
            return (n = n ? n.then(i, i) : i());
          };
        }
        function b(e, t) {
          var a = e.iterator[t.method];
          if (void 0 === a) {
            if (((t.delegate = null), "throw" === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = "return"),
                (t.arg = void 0),
                b(e, t),
                "throw" === t.method)
              )
                return u;
              (t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return u;
          }
          var n = s(a, e.iterator, t.arg);
          if ("throw" === n.type)
            return (
              (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), u
            );
          var r = n.arg;
          return r
            ? r.done
              ? ((t[e.resultName] = r.value),
                (t.next = e.nextLoc),
                "return" !== t.method &&
                  ((t.method = "next"), (t.arg = void 0)),
                (t.delegate = null),
                u)
              : r
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              u);
        }
        function y(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function N(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function S(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(y, this),
            this.reset(!0);
        }
        function A(e) {
          if (e) {
            var t = e[r];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var n = -1,
                o = function t() {
                  for (; ++n < e.length; )
                    if (a.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                  return (t.value = void 0), (t.done = !0), t;
                };
              return (o.next = o);
            }
          }
          return { next: j };
        }
        function j() {
          return { value: void 0, done: !0 };
        }
        return (
          (d.prototype = h),
          l(g, "constructor", h),
          l(h, "constructor", d),
          (d.displayName = l(h, i, "GeneratorFunction")),
          (e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === d || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (e.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, h)
                : ((e.__proto__ = h), l(e, i, "GeneratorFunction")),
              (e.prototype = Object.create(g)),
              e
            );
          }),
          (e.awrap = function (e) {
            return { __await: e };
          }),
          v(O.prototype),
          l(O.prototype, o, function () {
            return this;
          }),
          (e.AsyncIterator = O),
          (e.async = function (t, a, n, r, o) {
            void 0 === o && (o = Promise);
            var i = new O(c(t, a, n, r), o);
            return e.isGeneratorFunction(a)
              ? i
              : i.next().then(function (e) {
                  return e.done ? e.value : i.next();
                });
          }),
          v(g),
          l(g, i, "Generator"),
          l(g, r, function () {
            return this;
          }),
          l(g, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (e) {
            var t = [];
            for (var a in e) t.push(a);
            return (
              t.reverse(),
              function a() {
                for (; t.length; ) {
                  var n = t.pop();
                  if (n in e) return (a.value = n), (a.done = !1), a;
                }
                return (a.done = !0), a;
              }
            );
          }),
          (e.values = A),
          (S.prototype = {
            constructor: S,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(N),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    a.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = void 0);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var t = this;
              function n(a, n) {
                return (
                  (i.type = "throw"),
                  (i.arg = e),
                  (t.next = a),
                  n && ((t.method = "next"), (t.arg = void 0)),
                  !!n
                );
              }
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r],
                  i = o.completion;
                if ("root" === o.tryLoc) return n("end");
                if (o.tryLoc <= this.prev) {
                  var l = a.call(o, "catchLoc"),
                    c = a.call(o, "finallyLoc");
                  if (l && c) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  } else if (l) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  a.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var o = r;
                  break;
                }
              }
              o &&
                ("break" === e || "continue" === e) &&
                o.tryLoc <= t &&
                t <= o.finallyLoc &&
                (o = null);
              var i = o ? o.completion : {};
              return (
                (i.type = e),
                (i.arg = t),
                o
                  ? ((this.method = "next"), (this.next = o.finallyLoc), u)
                  : this.complete(i)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                u
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.finallyLoc === e)
                  return this.complete(a.completion, a.afterLoc), N(a), u;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.tryLoc === e) {
                  var n = a.completion;
                  if ("throw" === n.type) {
                    var r = n.arg;
                    N(a);
                  }
                  return r;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (e, t, a) {
              return (
                (this.delegate = { iterator: A(e), resultName: t, nextLoc: a }),
                "next" === this.method && (this.arg = void 0),
                u
              );
            },
          }),
          e
        );
      }
      var Ue = function (e) {
        var t = e.translation,
          a = Object(n.useState)({
            firstName: "",
            lastName: "",
            fatherName: "",
            day: "",
            month: "",
            year: "",
            email: "",
            country: "",
            citizenship: "",
            language: "",
            phone: "",
            notes: "",
          }),
          o = Object(c.a)(a, 2),
          i = o[0],
          l = o[1],
          s = Object(n.useState)({}),
          u = Object(c.a)(s, 2),
          m = u[0],
          d = u[1],
          h = Object(n.useState)(""),
          f = Object(c.a)(h, 2),
          p = f[0],
          E = f[1],
          g = Object(n.useState)(!1),
          v = Object(c.a)(g, 2),
          O = v[0],
          y = v[1],
          S = Object(n.useState)([]),
          A = Object(c.a)(S, 2),
          j = A[0],
          w = A[1],
          R = Object(n.useState)([]),
          T = Object(c.a)(R, 2),
          C = T[0],
          _ = T[1],
          L = Object(n.useState)(""),
          I = Object(c.a)(L, 2),
          P = I[0],
          M = I[1],
          F = Object(n.useState)(!1),
          k = Object(c.a)(F, 2),
          x = k[0],
          D = k[1],
          H = Object(n.useState)({}),
          G = Object(c.a)(H, 2),
          q = G[0],
          U = G[1],
          Y = Object(n.useState)([
            {
              title:
                "\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea",
              titleEN: "Apply Now",
              link: "/",
            },
          ]),
          B = Object(c.a)(Y, 2),
          Z = B[0];
        B[1];
        Object(n.useEffect)(function () {
          Pe([1], w),
            xe(U),
            De(_),
            (function () {
              var e = Object(be.a)(
                qe().mark(function e() {
                  var t, a;
                  return qe().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (e.next = 3),
                              fetch("https://api.ipify.org?format=json")
                            );
                          case 3:
                            return (t = e.sent), (e.next = 6), t.json();
                          case 6:
                            (a = e.sent), E(a.ip), (e.next = 13);
                            break;
                          case 10:
                            (e.prev = 10),
                              (e.t0 = e.catch(0)),
                              console.error("Error:", e.t0);
                          case 13:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 10]]
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })()();
        }, []),
          Object(n.useEffect)(
            function () {
              z();
            },
            [q]
          );
        var z = function () {
          return r.a.createElement("p", {
            dangerouslySetInnerHTML: { __html: q[t.lang] },
          });
        };
        Object(n.useEffect)(function () {}, [O]);
        var V = {
            firstName: Ne.a
              .string()
              .required()
              .regex(
                /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
              )
              .min(2)
              .max(30)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            lastName: Ne.a
              .string()
              .required()
              .regex(
                /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
              )
              .min(2)
              .max(30)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            fatherName: Ne.a
              .string()
              .allow("")
              .regex(
                /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
              )
              .min(2)
              .max(30)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            day: Ne.a
              .string()
              .optional()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            month: Ne.a
              .string()
              .optional()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            year: Ne.a
              .string()
              .optional()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            email: Ne.a
              .string()
              .optional()
              .allow("")
              .email()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            phone: Ne.a
              .string()
              .regex(/^\d+$/)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            subject: Ne.a.optional().error(function (e) {
              return we(e, t.data.FORM.ERRORS);
            }),
            country: Ne.a
              .string()
              .required()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            citizenship: Ne.a.optional().error(function (e) {
              return we(e, t.data.FORM.ERRORS);
            }),
            language: Ne.a.optional().error(function (e) {
              return we(e, t.data.FORM.ERRORS);
            }),
            notes: Ne.a
              .string()
              .required()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
          },
          $ = function (e) {
            var t = e.currentTarget,
              a = m,
              n = (function (e) {
                var t = e.name,
                  a = e.value,
                  n = Object(Oe.a)({}, t, a),
                  r = Object(Oe.a)({}, t, V[t]),
                  o = Ne.a.validate(n, r).error;
                return o ? o.details[0].message : null;
              })(t);
            n ? (a[t.name] = n) : delete a[t.name];
            var r = i;
            (i[t.name] = t.value),
              l(function (e) {
                return Object(N.a)({}, e, r);
              }),
              d(m);
          };
        return (
          Object(n.useEffect)(
            function () {
              window.gtag("event", "form_submit", {
                form_destination: window.location.href,
              });
            },
            [O]
          ),
          r.a.createElement(
            "div",
            { className: "page-content contact-us" },
            r.a.createElement(b, { translation: t, breadCrumbsObj: Z }),
            r.a.createElement("h1", null, t.data.CONTACT_US.TITLE),
            q && q.fa ? z() : "",
            r.a.createElement(
              "div",
              {
                className: O
                  ? "application-stage success"
                  : "application-stage",
              },
              O
                ? r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement("img", {
                      src: "/plane.svg",
                      alt: "success plane",
                    }),
                    r.a.createElement("h2", null, t.data.FORM.SUCCESS),
                    r.a.createElement("p", null, t.data.FORM.SUCCESS_PARA)
                  )
                : r.a.createElement(
                    "form",
                    {
                      onSubmit: function (e) {
                        e.preventDefault();
                        var t = (function () {
                          var e = Ne.a.validate(i, V, { abortEarly: !1 }).error;
                          if (!e) return null;
                          var t,
                            a = {},
                            n = He(e.details);
                          try {
                            for (n.s(); !(t = n.n()).done; ) {
                              var r = t.value;
                              a[r.path[0]] = r.message;
                            }
                          } catch (o) {
                            n.e(o);
                          } finally {
                            n.f();
                          }
                          return a;
                        })();
                        d(t || {}), t || D(!0);
                      },
                    },
                    r.a.createElement(
                      "div",
                      { className: "form-columns" },
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.PERSONAL_INFO
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "firstName",
                            label: t.data.CONTACT_US.FIRST_NAME,
                            required: !0,
                            value: i.firstName,
                            onChange: $,
                            error: m.firstName,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "lastName",
                            label: t.data.CONTACT_US.LAST_NAME,
                            required: !0,
                            value: i.lastName,
                            onChange: $,
                            error: m.lastName,
                          })
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement("div", { className: "spacer" }),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "fatherName",
                            label: t.data.CONTACT_US.FATHER_NAME,
                            value: i.fatherName,
                            onChange: $,
                            error: m.fatherName,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "three-columns" },
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Ae, {
                              name: "year",
                              label: t.data.CONTACT_US.BIRTHDAY,
                              placeholder: t.data.FORM.YEAR,
                              options: _e(),
                              onChange: $,
                              error: m.year,
                              required: !0,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Ae, {
                              name: "month",
                              placeholder: t.data.FORM.MONTH,
                              label: " ",
                              options: Le(),
                              onChange: $,
                              error: m.month,
                              required: !0,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Ae, {
                              name: "day",
                              placeholder: t.data.FORM.DAY,
                              label: " ",
                              options: Ie(),
                              onChange: $,
                              error: m.day,
                              required: !0,
                            })
                          )
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.CONTACT_INFO
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "email",
                            label: t.data.CONTACT_US.EMAIL,
                            value: i.email,
                            onChange: $,
                            error: m.email,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "phone",
                            label: t.data.CONTACT_US.PHONE,
                            required: !0,
                            value: i.phone,
                            onChange: $,
                            error: m.phone,
                          })
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.RESI_INFO
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Ae, {
                            name: "country",
                            required: !0,
                            label: t.data.CONTACT_US.COUNTRY,
                            options: C.countries ? C.countries : [],
                            onChange: $,
                            error: m.country,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Ae, {
                            name: "citizenship",
                            label: t.data.CONTACT_US.CITIZENSHIP,
                            options: C.countries ? C.countries : [],
                            onChange: $,
                            error: m.citizenship,
                          })
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.ANY_INFO
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(Ae, {
                            name: "language",
                            required: !0,
                            label: t.data.CONTACT_US.LANGUAGE,
                            options: j.payload ? j.payload[0] : [],
                            onChange: $,
                            error: m.language,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(je, {
                            name: "notes",
                            cols: "30",
                            rows: "3",
                            required: !0,
                            value: i.notes,
                            placeholder: t.data.CONTACT_US.NOTES_PLACEHOLDER,
                            limit: "200",
                            onChange: $,
                            error: m.notes,
                          })
                        )
                      )
                    ),
                    r.a.createElement(
                      "div",
                      { className: "form-actions" },
                      x
                        ? r.a.createElement(
                            "div",
                            { className: "recapcha" },
                            r.a.createElement(ke.a, {
                              sitekey:
                                "6LehjbMZAAAAAHsywENdjmEJLvhEODgIPWnF2Lyd",
                              onChange: function () {
                                Fe(i, p, y, M);
                              },
                            })
                          )
                        : null,
                      r.a.createElement(
                        "button",
                        { type: "submit", id: "sendCU" },
                        t.data.SEND
                      ),
                      r.a.createElement(
                        "div",
                        { className: "error-message" },
                        P
                      )
                    )
                  )
            )
          )
        );
      };
      function Ye(e, t) {
        var a =
          ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
          e["@@iterator"];
        if (!a) {
          if (
            Array.isArray(e) ||
            (a = (function (e, t) {
              if (!e) return;
              if ("string" === typeof e) return Be(e, t);
              var a = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === a && e.constructor && (a = e.constructor.name);
              if ("Map" === a || "Set" === a) return Array.from(e);
              if (
                "Arguments" === a ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
              )
                return Be(e, t);
            })(e)) ||
            (t && e && "number" === typeof e.length)
          ) {
            a && (e = a);
            var n = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return n >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[n++] };
              },
              e: function (e) {
                throw e;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          i = !0,
          l = !1;
        return {
          s: function () {
            a = a.call(e);
          },
          n: function () {
            var e = a.next();
            return (i = e.done), e;
          },
          e: function (e) {
            (l = !0), (o = e);
          },
          f: function () {
            try {
              i || null == a.return || a.return();
            } finally {
              if (l) throw o;
            }
          },
        };
      }
      function Be(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var a = 0, n = new Array(t); a < t; a++) n[a] = e[a];
        return n;
      }
      function Ze() {
        Ze = function () {
          return e;
        };
        var e = {},
          t = Object.prototype,
          a = t.hasOwnProperty,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.asyncIterator || "@@asyncIterator",
          i = n.toStringTag || "@@toStringTag";
        function l(e, t, a) {
          return (
            Object.defineProperty(e, t, {
              value: a,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          );
        }
        try {
          l({}, "");
        } catch (w) {
          l = function (e, t, a) {
            return (e[t] = a);
          };
        }
        function c(e, t, a, n) {
          var r = t && t.prototype instanceof m ? t : m,
            o = Object.create(r.prototype),
            i = new S(n || []);
          return (
            (o._invoke = (function (e, t, a) {
              var n = "suspendedStart";
              return function (r, o) {
                if ("executing" === n)
                  throw new Error("Generator is already running");
                if ("completed" === n) {
                  if ("throw" === r) throw o;
                  return j();
                }
                for (a.method = r, a.arg = o; ; ) {
                  var i = a.delegate;
                  if (i) {
                    var l = b(i, a);
                    if (l) {
                      if (l === u) continue;
                      return l;
                    }
                  }
                  if ("next" === a.method) a.sent = a._sent = a.arg;
                  else if ("throw" === a.method) {
                    if ("suspendedStart" === n)
                      throw ((n = "completed"), a.arg);
                    a.dispatchException(a.arg);
                  } else "return" === a.method && a.abrupt("return", a.arg);
                  n = "executing";
                  var c = s(e, t, a);
                  if ("normal" === c.type) {
                    if (
                      ((n = a.done ? "completed" : "suspendedYield"),
                      c.arg === u)
                    )
                      continue;
                    return { value: c.arg, done: a.done };
                  }
                  "throw" === c.type &&
                    ((n = "completed"), (a.method = "throw"), (a.arg = c.arg));
                }
              };
            })(e, a, i)),
            o
          );
        }
        function s(e, t, a) {
          try {
            return { type: "normal", arg: e.call(t, a) };
          } catch (w) {
            return { type: "throw", arg: w };
          }
        }
        e.wrap = c;
        var u = {};
        function m() {}
        function d() {}
        function h() {}
        var f = {};
        l(f, r, function () {
          return this;
        });
        var p = Object.getPrototypeOf,
          E = p && p(p(A([])));
        E && E !== t && a.call(E, r) && (f = E);
        var g = (h.prototype = m.prototype = Object.create(f));
        function v(e) {
          ["next", "throw", "return"].forEach(function (t) {
            l(e, t, function (e) {
              return this._invoke(t, e);
            });
          });
        }
        function O(e, t) {
          var n;
          this._invoke = function (r, o) {
            function i() {
              return new t(function (n, i) {
                !(function n(r, o, i, l) {
                  var c = s(e[r], e, o);
                  if ("throw" !== c.type) {
                    var u = c.arg,
                      m = u.value;
                    return m && "object" == typeof m && a.call(m, "__await")
                      ? t.resolve(m.__await).then(
                          function (e) {
                            n("next", e, i, l);
                          },
                          function (e) {
                            n("throw", e, i, l);
                          }
                        )
                      : t.resolve(m).then(
                          function (e) {
                            (u.value = e), i(u);
                          },
                          function (e) {
                            return n("throw", e, i, l);
                          }
                        );
                  }
                  l(c.arg);
                })(r, o, n, i);
              });
            }
            return (n = n ? n.then(i, i) : i());
          };
        }
        function b(e, t) {
          var a = e.iterator[t.method];
          if (void 0 === a) {
            if (((t.delegate = null), "throw" === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = "return"),
                (t.arg = void 0),
                b(e, t),
                "throw" === t.method)
              )
                return u;
              (t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return u;
          }
          var n = s(a, e.iterator, t.arg);
          if ("throw" === n.type)
            return (
              (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), u
            );
          var r = n.arg;
          return r
            ? r.done
              ? ((t[e.resultName] = r.value),
                (t.next = e.nextLoc),
                "return" !== t.method &&
                  ((t.method = "next"), (t.arg = void 0)),
                (t.delegate = null),
                u)
              : r
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              u);
        }
        function y(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function N(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function S(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(y, this),
            this.reset(!0);
        }
        function A(e) {
          if (e) {
            var t = e[r];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var n = -1,
                o = function t() {
                  for (; ++n < e.length; )
                    if (a.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                  return (t.value = void 0), (t.done = !0), t;
                };
              return (o.next = o);
            }
          }
          return { next: j };
        }
        function j() {
          return { value: void 0, done: !0 };
        }
        return (
          (d.prototype = h),
          l(g, "constructor", h),
          l(h, "constructor", d),
          (d.displayName = l(h, i, "GeneratorFunction")),
          (e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === d || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (e.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, h)
                : ((e.__proto__ = h), l(e, i, "GeneratorFunction")),
              (e.prototype = Object.create(g)),
              e
            );
          }),
          (e.awrap = function (e) {
            return { __await: e };
          }),
          v(O.prototype),
          l(O.prototype, o, function () {
            return this;
          }),
          (e.AsyncIterator = O),
          (e.async = function (t, a, n, r, o) {
            void 0 === o && (o = Promise);
            var i = new O(c(t, a, n, r), o);
            return e.isGeneratorFunction(a)
              ? i
              : i.next().then(function (e) {
                  return e.done ? e.value : i.next();
                });
          }),
          v(g),
          l(g, i, "Generator"),
          l(g, r, function () {
            return this;
          }),
          l(g, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (e) {
            var t = [];
            for (var a in e) t.push(a);
            return (
              t.reverse(),
              function a() {
                for (; t.length; ) {
                  var n = t.pop();
                  if (n in e) return (a.value = n), (a.done = !1), a;
                }
                return (a.done = !0), a;
              }
            );
          }),
          (e.values = A),
          (S.prototype = {
            constructor: S,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(N),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    a.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = void 0);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var t = this;
              function n(a, n) {
                return (
                  (i.type = "throw"),
                  (i.arg = e),
                  (t.next = a),
                  n && ((t.method = "next"), (t.arg = void 0)),
                  !!n
                );
              }
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r],
                  i = o.completion;
                if ("root" === o.tryLoc) return n("end");
                if (o.tryLoc <= this.prev) {
                  var l = a.call(o, "catchLoc"),
                    c = a.call(o, "finallyLoc");
                  if (l && c) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  } else if (l) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  a.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var o = r;
                  break;
                }
              }
              o &&
                ("break" === e || "continue" === e) &&
                o.tryLoc <= t &&
                t <= o.finallyLoc &&
                (o = null);
              var i = o ? o.completion : {};
              return (
                (i.type = e),
                (i.arg = t),
                o
                  ? ((this.method = "next"), (this.next = o.finallyLoc), u)
                  : this.complete(i)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                u
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.finallyLoc === e)
                  return this.complete(a.completion, a.afterLoc), N(a), u;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.tryLoc === e) {
                  var n = a.completion;
                  if ("throw" === n.type) {
                    var r = n.arg;
                    N(a);
                  }
                  return r;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (e, t, a) {
              return (
                (this.delegate = { iterator: A(e), resultName: t, nextLoc: a }),
                "next" === this.method && (this.arg = void 0),
                u
              );
            },
          }),
          e
        );
      }
      var ze = function (e) {
          var t = e.translation,
            a = e.changeLanguage,
            o = Object(n.useState)({
              firstName: "",
              lastName: "",
              fatherName: "",
              day: "",
              month: "",
              year: "",
              email: "",
              country: "",
              citizenship: "",
              language: "ar",
              phone: "",
              notes: "",
            }),
            i = Object(c.a)(o, 2),
            l = i[0],
            s = i[1],
            u = Object(n.useState)({}),
            m = Object(c.a)(u, 2),
            d = m[0],
            h = m[1],
            f = Object(n.useState)(""),
            p = Object(c.a)(f, 2),
            E = p[0],
            g = p[1],
            v = Object(n.useState)(!1),
            O = Object(c.a)(v, 2),
            y = O[0],
            S = O[1],
            A = Object(n.useState)([]),
            j = Object(c.a)(A, 2),
            w = (j[0], j[1]),
            R = Object(n.useState)([]),
            T = Object(c.a)(R, 2),
            C = T[0],
            _ = T[1],
            L = Object(n.useState)(""),
            I = Object(c.a)(L, 2),
            P = I[0],
            M = I[1],
            F = Object(n.useState)(!1),
            k = Object(c.a)(F, 2),
            x = k[0],
            D = k[1],
            H = Object(n.useState)({}),
            G = Object(c.a)(H, 2),
            q = G[0],
            U = G[1],
            Y = Object(n.useState)(""),
            B = Object(c.a)(Y, 2),
            Z = B[0],
            z = B[1],
            V = Object(n.useState)([
              {
                title: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
                titleEN: "Contact Us",
                link: "/",
              },
            ]),
            $ = Object(c.a)(V, 2),
            X = $[0];
          $[1];
          Object(n.useEffect)(function () {
            Pe([1], w),
              a({ lang: "en", dir: "ltr" }),
              xe(U),
              De(_),
              (function () {
                var e = Object(be.a)(
                  Ze().mark(function e() {
                    var t, a;
                    return Ze().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                (e.next = 3),
                                fetch("https://api.ipify.org?format=json")
                              );
                            case 3:
                              return (t = e.sent), (e.next = 6), t.json();
                            case 6:
                              (a = e.sent), g(a.ip), (e.next = 13);
                              break;
                            case 10:
                              (e.prev = 10),
                                (e.t0 = e.catch(0)),
                                console.error("Error:", e.t0);
                            case 13:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 10]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })()();
          }, []),
            Object(n.useEffect)(
              function () {
                q.fa && z(q.ar);
              },
              [q]
            );
          var J = {
              firstName: Ne.a
                .string()
                .required()
                .regex(
                  /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
                )
                .min(2)
                .max(30)
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              lastName: Ne.a
                .string()
                .required()
                .regex(
                  /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
                )
                .min(2)
                .max(30)
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              fatherName: Ne.a
                .string()
                .allow("")
                .regex(
                  /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
                )
                .min(2)
                .max(30)
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              day: Ne.a
                .string()
                .optional()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              month: Ne.a
                .string()
                .optional()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              year: Ne.a
                .string()
                .optional()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              email: Ne.a
                .string()
                .optional()
                .allow("")
                .email()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              phone: Ne.a
                .string()
                .regex(/^\d+$/)
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              subject: Ne.a.optional().error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
              country: Ne.a
                .string()
                .required()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              citizenship: Ne.a.optional().error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
              language: Ne.a.optional().error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
              notes: Ne.a
                .string()
                .required()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
            },
            W = function (e) {
              var t = e.currentTarget,
                a = d,
                n = (function (e) {
                  var t = e.name,
                    a = e.value,
                    n = Object(Oe.a)({}, t, a),
                    r = Object(Oe.a)({}, t, J[t]),
                    o = Ne.a.validate(n, r).error;
                  return o ? o.details[0].message : null;
                })(t);
              n ? (a[t.name] = n) : delete a[t.name];
              var r = l;
              (l[t.name] = t.value),
                s(function (e) {
                  return Object(N.a)({}, e, r);
                }),
                h(d);
            };
          return (
            Object(n.useEffect)(
              function () {
                window.gtag("event", "form_submit", {
                  form_destination: window.location.href,
                });
              },
              [y]
            ),
            r.a.createElement(
              "div",
              { className: "page-content contact-us", dir: "rtl" },
              r.a.createElement("link", {
                rel: "stylesheet",
                href: "../../index.css'",
              }),
              r.a.createElement(b, { translation: t, breadCrumbsObj: X }),
              r.a.createElement("h1", null, t.data.CONTACT_US.TITLE),
              r.a.createElement("p", {
                dangerouslySetInnerHTML: { __html: Z },
              }),
              r.a.createElement(
                "div",
                {
                  className: y
                    ? "application-stage success"
                    : "application-stage",
                },
                y
                  ? r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement("img", {
                        src: "/plane.svg",
                        alt: "success plane",
                      }),
                      r.a.createElement("h2", null, t.data.FORM.SUCCESS),
                      r.a.createElement("p", null, t.data.FORM.SUCCESS_PARA)
                    )
                  : r.a.createElement(
                      "form",
                      {
                        onSubmit: function (e) {
                          e.preventDefault();
                          var t = (function () {
                            var e = Ne.a.validate(l, J, {
                              abortEarly: !1,
                            }).error;
                            if (!e) return null;
                            var t,
                              a = {},
                              n = Ye(e.details);
                            try {
                              for (n.s(); !(t = n.n()).done; ) {
                                var r = t.value;
                                a[r.path[0]] = r.message;
                              }
                            } catch (o) {
                              n.e(o);
                            } finally {
                              n.f();
                            }
                            return a;
                          })();
                          h(t || {}), t || D(!0);
                        },
                        target: "frame",
                      },
                      r.a.createElement(
                        "div",
                        { className: "form-columns" },
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(
                            "h2",
                            null,
                            t.data.CONTACT_US.PERSONAL_INFO
                          ),
                          r.a.createElement(
                            "div",
                            { className: "form-row" },
                            r.a.createElement(Se, {
                              name: "firstName",
                              label: t.data.CONTACT_US.FIRST_NAME,
                              required: !0,
                              value: l.firstName,
                              onChange: W,
                              error: d.firstName,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            { className: "form-row" },
                            r.a.createElement(Se, {
                              name: "lastName",
                              label: t.data.CONTACT_US.LAST_NAME,
                              required: !0,
                              value: l.lastName,
                              onChange: W,
                              error: d.lastName,
                            })
                          )
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement("div", { className: "spacer" }),
                          r.a.createElement(
                            "div",
                            { className: "form-row" },
                            r.a.createElement(Se, {
                              name: "fatherName",
                              label: t.data.CONTACT_US.FATHER_NAME,
                              value: l.fatherName,
                              onChange: W,
                              error: d.fatherName,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            { className: "three-columns" },
                            r.a.createElement(
                              "div",
                              null,
                              r.a.createElement(Ae, {
                                name: "year",
                                label: t.data.CONTACT_US.BIRTHDAY,
                                placeholder: t.data.FORM.YEAR,
                                options: _e(),
                                onChange: W,
                                error: d.year,
                                required: !0,
                              })
                            ),
                            r.a.createElement(
                              "div",
                              null,
                              r.a.createElement(Ae, {
                                name: "month",
                                placeholder: t.data.FORM.MONTH,
                                label: " ",
                                options: Le(),
                                onChange: W,
                                error: d.month,
                                required: !0,
                              })
                            ),
                            r.a.createElement(
                              "div",
                              null,
                              r.a.createElement(Ae, {
                                name: "day",
                                placeholder: t.data.FORM.DAY,
                                label: " ",
                                options: Ie(),
                                onChange: W,
                                error: d.day,
                                required: !0,
                              })
                            )
                          )
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(
                            "h2",
                            null,
                            t.data.CONTACT_US.CONTACT_INFO
                          ),
                          r.a.createElement(
                            "div",
                            { className: "form-row" },
                            r.a.createElement(Se, {
                              name: "email",
                              label: t.data.CONTACT_US.EMAIL,
                              value: l.email,
                              onChange: W,
                              error: d.email,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            { className: "form-row" },
                            r.a.createElement(Se, {
                              name: "phone",
                              label: t.data.CONTACT_US.PHONE,
                              required: !0,
                              value: l.phone,
                              onChange: W,
                              error: d.phone,
                            })
                          )
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(
                            "h2",
                            null,
                            t.data.CONTACT_US.RESI_INFO
                          ),
                          r.a.createElement(
                            "div",
                            { className: "form-row" },
                            r.a.createElement(Ae, {
                              name: "country",
                              required: !0,
                              label: t.data.CONTACT_US.COUNTRY,
                              options: C.countries ? C.countries : [],
                              onChange: W,
                              error: d.country,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            { className: "form-row" },
                            r.a.createElement(Ae, {
                              name: "citizenship",
                              label: t.data.CONTACT_US.CITIZENSHIP,
                              options: C.countries ? C.countries : [],
                              onChange: W,
                              error: d.citizenship,
                            })
                          )
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(
                            "h2",
                            null,
                            t.data.CONTACT_US.ANY_INFO
                          ),
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Ae, {
                              name: "language",
                              required: !0,
                              label: t.data.CONTACT_US.LANGUAGE,
                              options: C.languages ? C.languages : [],
                              onChange: W,
                              defaultOption: "",
                              error: d.language,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(je, {
                              name: "notes",
                              cols: "30",
                              rows: "3",
                              required: !0,
                              value: l.notes,
                              placeholder: t.data.CONTACT_US.NOTES_PLACEHOLDER,
                              limit: "200",
                              onChange: W,
                              error: d.notes,
                            })
                          )
                        )
                      ),
                      r.a.createElement(
                        "div",
                        { className: "form-actions" },
                        x
                          ? r.a.createElement(
                              "div",
                              { className: "recapcha" },
                              r.a.createElement(ke.a, {
                                sitekey:
                                  "6LehjbMZAAAAAHsywENdjmEJLvhEODgIPWnF2Lyd",
                                onChange: function () {
                                  Fe(l, E, S, M);
                                },
                              })
                            )
                          : null,
                        r.a.createElement(
                          "button",
                          { type: "submit", id: "sendAr" },
                          t.data.SEND
                        ),
                        r.a.createElement(
                          "div",
                          { className: "error-message" },
                          P
                        )
                      )
                    )
              )
            )
          );
        },
        Ve = function (e) {
          var t = e.name,
            a = e.placeholder,
            n = e.value,
            o = e.error,
            i = e.onChange,
            l = e.label,
            c = e.required;
          return r.a.createElement(
            "div",
            { className: "upload-input" },
            l && 0 === n.length
              ? r.a.createElement(
                  "label",
                  { htmlFor: t, className: "input-label" },
                  l
                )
              : r.a.createElement(
                  "label",
                  { htmlFor: t, className: "input-label" },
                  n[0].name
                ),
            r.a.createElement("input", {
              type: "file",
              name: t,
              id: t,
              placeholder: a,
              value: n.path,
              onChange: i,
              className: o && "error-input",
              accept: ".docx,.doc,.pdf",
              required: c,
            }),
            o && r.a.createElement("span", { className: "error-message" }, o)
          );
        },
        $e = function (e) {
          var t = e.errors,
            a = e.form,
            n = e.handleChange,
            o = (e.validate, e.addLanguage),
            i = e.removeLanguage,
            l = e.translation,
            c = e.catalogs,
            s = e.apiError,
            u = e.verified,
            m = e.recaptach,
            d = e.file,
            h = e.handleFileChange;
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(
              "div",
              { className: "form-columns" },
              r.a.createElement(
                "div",
                null,
                r.a.createElement("h2", null, l.data.FORM.PERSONAL_INFO),
                r.a.createElement(
                  "div",
                  { className: "form-row" },
                  r.a.createElement(Se, {
                    name: "firstName",
                    label: l.data.FORM.FIRST_NAME,
                    value: a.firstName,
                    onChange: n,
                    error: t.firstName,
                    required: !0,
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "form-row" },
                  r.a.createElement(Se, {
                    name: "lastName",
                    label: l.data.FORM.LAST_NAME,
                    value: a.lastName,
                    onChange: n,
                    error: t.lastName,
                    required: !0,
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "form-row" },
                  r.a.createElement(Se, {
                    name: "id",
                    label: l.data.FORM.ID_OR_PASSPORT,
                    value: a.id,
                    onChange: n,
                    error: t.id,
                    required: !0,
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "form-row three-columns" },
                  r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(Ae, {
                      name: "year",
                      placeholder: l.data.FORM.YEAR,
                      label: l.data.FORM.BIRTHDAY,
                      options: _e(),
                      onChange: n,
                      error: t.year,
                      required: !0,
                    })
                  ),
                  r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(Ae, {
                      name: "month",
                      placeholder: l.data.FORM.MONTH,
                      label: " ",
                      options: Le(),
                      onChange: n,
                      error: t.month,
                      required: !0,
                    })
                  ),
                  r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(Ae, {
                      name: "day",
                      placeholder: l.data.FORM.DAY,
                      label: " ",
                      options: Ie(),
                      onChange: n,
                      error: t.day,
                      required: !0,
                    })
                  )
                )
              ),
              r.a.createElement(
                "div",
                null,
                r.a.createElement("h2", null, l.data.FORM.CONTACT_INFO),
                r.a.createElement(
                  "div",
                  { className: "form-row" },
                  r.a.createElement(Se, {
                    name: "email",
                    label: l.data.FORM.EMAIL,
                    onChange: n,
                    error: t.email,
                    value: a.email,
                    required: !0,
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "form-row" },
                  r.a.createElement(Se, {
                    name: "phone",
                    label: l.data.FORM.PHONE,
                    onChange: n,
                    error: t.phone,
                    value: a.phone,
                    required: !0,
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "form-row stick-bottom" },
                  r.a.createElement("h2", null, l.data.FORM.HOW_DID_YOU_REACH),
                  r.a.createElement(Ae, {
                    name: "how",
                    label: l.data.FORM.PLEASE_SELECT,
                    placeholder: l.data.FORM.SELECT,
                    options: c.payload ? c.payload[1] : [],
                    onChange: n,
                    error: t.how,
                    required: !0,
                  })
                )
              ),
              r.a.createElement(
                "div",
                null,
                r.a.createElement("h2", null, l.data.FORM.LANGUAGES),
                a.languages.map(function (e, a) {
                  return r.a.createElement(
                    "div",
                    { className: "form-row langauge", key: a },
                    r.a.createElement(
                      "div",
                      null,
                      r.a.createElement(Ae, {
                        name: "language" + a,
                        placeholder: l.data.FORM.SELECT,
                        label: l.data.FORM.LANGUAGE,
                        options: c.payload ? c.payload[0] : [],
                        onChange: n,
                        error: t.language,
                        defaultOption: e.languageID,
                        required: !0,
                      })
                    ),
                    r.a.createElement(
                      "div",
                      null,
                      r.a.createElement(Ae, {
                        name: "level" + a,
                        placeholder: l.data.FORM.SELECT,
                        label: l.data.FORM.LEVEL,
                        options: c.payload ? c.payload[2] : [],
                        onChange: n,
                        error: t.level,
                        required: !0,
                      })
                    ),
                    a > 1
                      ? r.a.createElement(
                          "button",
                          {
                            type: "button",
                            onClick: function (e) {
                              return i(e);
                            },
                            className: "remove-language",
                          },
                          r.a.createElement("img", {
                            src: "remove.svg",
                            alt: "delete language",
                          })
                        )
                      : null
                  );
                }),
                r.a.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: function () {
                      return o(a.languages.length);
                    },
                    className: "add-language",
                  },
                  r.a.createElement("img", { src: "/add.svg", alt: "add" }),
                  l.data.FORM.ADD_LANG
                )
              ),
              r.a.createElement(
                "div",
                { className: "expanded" },
                r.a.createElement("h2", null, l.data.FORM.VOLUNTEERING),
                r.a.createElement(Ae, {
                  name: "volunteered",
                  placeholder: l.data.FORM.SELECT,
                  label: l.data.FORM.PLEASE_SELECT,
                  options: c.payload ? c.payload[3] : [],
                  onChange: n,
                  error: t.volunteered,
                  required: !0,
                }),
                r.a.createElement(
                  "div",
                  { className: "form-row" },
                  r.a.createElement(je, {
                    name: "notes",
                    value: a.notes,
                    placeholder: l.data.FORM.NOTES_PLACEHOLDER,
                    rows: "10",
                    limit: "200",
                    onChange: n,
                  })
                ),
                r.a.createElement("h2", null, l.data.FORM.UPLOAD_CV_TITLE),
                r.a.createElement(Ve, {
                  name: "attachment",
                  placeholder: l.data.FORM.UPLOAD_CV,
                  value: d,
                  label: l.data.FORM.UPLOAD_CV,
                  required: !0,
                  error: t.file,
                  onChange: h,
                }),
                r.a.createElement(
                  "div",
                  { className: "add-file", hidden: !0 },
                  r.a.createElement("button", {
                    id: "mybutton",
                    dangerouslySetInnerHTML: { __html: l.data.FORM.UPLOAD_CV },
                    className: "addFile",
                    onClick: function (e) {
                      return e.preventDefault();
                    },
                  }),
                  r.a.createElement(
                    "div",
                    { className: "ProgressDIV" },
                    r.a.createElement("div", {
                      className: "Completed",
                      id: "Completed1",
                    })
                  ),
                  r.a.createElement("div", { id: "MyControlFileContainer" }),
                  r.a.createElement("div", { id: "main1" })
                )
              )
            ),
            r.a.createElement(
              "div",
              { className: "form-actions" },
              m
                ? r.a.createElement(
                    "div",
                    { className: "recapcha" },
                    r.a.createElement(ke.a, {
                      ref: function (e) {
                        return (m = e);
                      },
                      sitekey: "6LehjbMZAAAAAHsywENdjmEJLvhEODgIPWnF2Lyd",
                      onChange: u,
                    })
                  )
                : null,
              r.a.createElement(
                "button",
                {
                  type: "button",
                  onClick: function () {
                    window.location.href = "/";
                  },
                },
                l.data.CANCEL
              ),
              r.a.createElement(
                "button",
                { type: "submit", id: "sendButton" },
                l.data.SEND
              ),
              r.a.createElement("div", { className: "error-message" }, s)
            )
          );
        },
        Xe = a(15);
      function Je(e, t, a, n, r, o) {
        var i = new FormData();
        i.append("oReq.FirstName", e.firstName),
          i.append("oReq.LastName", e.lastName),
          i.append("oReq.IDNumber", e.id),
          i.append("oReq.Email", e.email),
          i.append("oReq.MobilePhone", e.phone),
          i.append("oReq.BirthDate", e.year + "-" + e.month + "-" + e.day),
          i.append("oReq.ReferSourceID", e.how);
        for (var l = 0; l < e.languages.length; l++)
          i.append(
            "oReq.Languages[" + l + "].LanguageId",
            e.languages[l].languageID
          ),
            i.append(
              "oReq.Languages[" + l + "].languageName",
              e.languages[l].languageName
            ),
            i.append(
              "oReq.Languages[" + l + "].LanguageLevelID",
              e.languages[l].languageLevelID
            );
        i.append("oReq.DutyTypeID", e.volunteered),
          i.append("oReq.Remarks", e.notes),
          i.append("oReq.Attachment", t[0]);
        for (var c = 0; c < e.attachedPosition.length; c++)
          i.append(
            "oReq.AttachedPositions[" + c + "].id",
            e.attachedPosition[c].id
          ),
            i.append(
              "oReq.AttachedPositions[" + c + "].name",
              e.attachedPosition[c].name
                ? e.attachedPosition[c].name
                : e.attachedPosition[c].title
            );
        i.append("oReq.HashCode", a), i.append("oReq.captchaResponse", n);
        var s = {
          method: "post",
          url:
            "localhost" === window.location.hostname
              ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/SubmitMyPosition"
              : "/Roham.DMZ/api/ManagedActions/SubmitMyPosition",
          data: i,
          headers: { Accept: "application/zip" },
          responseType: "blob",
        };
        Xe(s)
          .then(function (e) {
            200 === e.status && r(!0);
          })
          .catch(function (e) {
            return (
              o(
                "\u05d1\u05e2\u05d9\u05d4 \u05d1\u05e9\u05e8\u05ea, \u05d0\u05e0\u05d0 \u05e4\u05e0\u05d4 \u05de\u05d0\u05d5\u05d7\u05e8 \u05d9\u05d5\u05ea\u05e8"
              ),
              e
            );
          });
      }
      var We = {
        title:
          "\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea",
        titleEN: "Apply now",
        paragraph:
          "\u05d4\u05e9\u05d0\u05dc\u05d5\u05df \u05d9\u05e9\u05de\u05e9 \u05d0\u05ea \u05d4\u05de\u05d5\u05e1\u05d3 \u05dc\u05e6\u05d5\u05e8\u05da \u05d1\u05d3\u05d9\u05e7\u05ea \u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05d4\u05e2\u05e1\u05e7\u05d4 \u05d6\u05de\u05d9\u05e0\u05d5\u05ea \u05dc\u05de\u05e1\u05e4\u05e8 \u05de\u05d5\u05d2\u05d1\u05dc \u05e9\u05dc \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05de\u05d5\u05e1\u05de\u05db\u05d9\u05dd \u05d5\u05db\u05df \u05dc\u05e6\u05d5\u05e8\u05da \u05d1\u05d7\u05d9\u05e0\u05ea \u05d4\u05ea\u05e7\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05e2\u05dd \u05d9\u05d5\u05e2\u05e6\u05d9\u05dd. (\u05de\u05d9\u05d5\u05e2\u05d3 \u05dc\u05e0\u05e9\u05d9\u05dd \u05d5\u05dc\u05d2\u05d1\u05e8\u05d9\u05dd \u05db\u05d0\u05d7\u05d3)",
        paragraphEN:
          "The questionnaire will be used by the institution for the purpose of examining available employment options for a limited number of qualified employees. This document is for both women and men.",
      };
      var Ke = function () {
          return r.a.createElement(
            "div",
            { className: "loader" },
            r.a.createElement("lottie-player", {
              autoplay: !0,
              loop: !0,
              mode: "normal",
              src: "render-lines.json",
              style: { width: "15rem", height: "auto", margin: "0 auto 0 " },
            }),
            r.a.createElement("h2", null, "\u05d8\u05d5\u05e2\u05df...")
          );
        },
        Qe = a(46);
      function et() {
        et = function () {
          return e;
        };
        var e = {},
          t = Object.prototype,
          a = t.hasOwnProperty,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.asyncIterator || "@@asyncIterator",
          i = n.toStringTag || "@@toStringTag";
        function l(e, t, a) {
          return (
            Object.defineProperty(e, t, {
              value: a,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          );
        }
        try {
          l({}, "");
        } catch (w) {
          l = function (e, t, a) {
            return (e[t] = a);
          };
        }
        function c(e, t, a, n) {
          var r = t && t.prototype instanceof m ? t : m,
            o = Object.create(r.prototype),
            i = new S(n || []);
          return (
            (o._invoke = (function (e, t, a) {
              var n = "suspendedStart";
              return function (r, o) {
                if ("executing" === n)
                  throw new Error("Generator is already running");
                if ("completed" === n) {
                  if ("throw" === r) throw o;
                  return j();
                }
                for (a.method = r, a.arg = o; ; ) {
                  var i = a.delegate;
                  if (i) {
                    var l = b(i, a);
                    if (l) {
                      if (l === u) continue;
                      return l;
                    }
                  }
                  if ("next" === a.method) a.sent = a._sent = a.arg;
                  else if ("throw" === a.method) {
                    if ("suspendedStart" === n)
                      throw ((n = "completed"), a.arg);
                    a.dispatchException(a.arg);
                  } else "return" === a.method && a.abrupt("return", a.arg);
                  n = "executing";
                  var c = s(e, t, a);
                  if ("normal" === c.type) {
                    if (
                      ((n = a.done ? "completed" : "suspendedYield"),
                      c.arg === u)
                    )
                      continue;
                    return { value: c.arg, done: a.done };
                  }
                  "throw" === c.type &&
                    ((n = "completed"), (a.method = "throw"), (a.arg = c.arg));
                }
              };
            })(e, a, i)),
            o
          );
        }
        function s(e, t, a) {
          try {
            return { type: "normal", arg: e.call(t, a) };
          } catch (w) {
            return { type: "throw", arg: w };
          }
        }
        e.wrap = c;
        var u = {};
        function m() {}
        function d() {}
        function h() {}
        var f = {};
        l(f, r, function () {
          return this;
        });
        var p = Object.getPrototypeOf,
          E = p && p(p(A([])));
        E && E !== t && a.call(E, r) && (f = E);
        var g = (h.prototype = m.prototype = Object.create(f));
        function v(e) {
          ["next", "throw", "return"].forEach(function (t) {
            l(e, t, function (e) {
              return this._invoke(t, e);
            });
          });
        }
        function O(e, t) {
          var n;
          this._invoke = function (r, o) {
            function i() {
              return new t(function (n, i) {
                !(function n(r, o, i, l) {
                  var c = s(e[r], e, o);
                  if ("throw" !== c.type) {
                    var u = c.arg,
                      m = u.value;
                    return m && "object" == typeof m && a.call(m, "__await")
                      ? t.resolve(m.__await).then(
                          function (e) {
                            n("next", e, i, l);
                          },
                          function (e) {
                            n("throw", e, i, l);
                          }
                        )
                      : t.resolve(m).then(
                          function (e) {
                            (u.value = e), i(u);
                          },
                          function (e) {
                            return n("throw", e, i, l);
                          }
                        );
                  }
                  l(c.arg);
                })(r, o, n, i);
              });
            }
            return (n = n ? n.then(i, i) : i());
          };
        }
        function b(e, t) {
          var a = e.iterator[t.method];
          if (void 0 === a) {
            if (((t.delegate = null), "throw" === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = "return"),
                (t.arg = void 0),
                b(e, t),
                "throw" === t.method)
              )
                return u;
              (t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return u;
          }
          var n = s(a, e.iterator, t.arg);
          if ("throw" === n.type)
            return (
              (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), u
            );
          var r = n.arg;
          return r
            ? r.done
              ? ((t[e.resultName] = r.value),
                (t.next = e.nextLoc),
                "return" !== t.method &&
                  ((t.method = "next"), (t.arg = void 0)),
                (t.delegate = null),
                u)
              : r
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              u);
        }
        function y(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function N(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function S(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(y, this),
            this.reset(!0);
        }
        function A(e) {
          if (e) {
            var t = e[r];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var n = -1,
                o = function t() {
                  for (; ++n < e.length; )
                    if (a.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                  return (t.value = void 0), (t.done = !0), t;
                };
              return (o.next = o);
            }
          }
          return { next: j };
        }
        function j() {
          return { value: void 0, done: !0 };
        }
        return (
          (d.prototype = h),
          l(g, "constructor", h),
          l(h, "constructor", d),
          (d.displayName = l(h, i, "GeneratorFunction")),
          (e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === d || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (e.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, h)
                : ((e.__proto__ = h), l(e, i, "GeneratorFunction")),
              (e.prototype = Object.create(g)),
              e
            );
          }),
          (e.awrap = function (e) {
            return { __await: e };
          }),
          v(O.prototype),
          l(O.prototype, o, function () {
            return this;
          }),
          (e.AsyncIterator = O),
          (e.async = function (t, a, n, r, o) {
            void 0 === o && (o = Promise);
            var i = new O(c(t, a, n, r), o);
            return e.isGeneratorFunction(a)
              ? i
              : i.next().then(function (e) {
                  return e.done ? e.value : i.next();
                });
          }),
          v(g),
          l(g, i, "Generator"),
          l(g, r, function () {
            return this;
          }),
          l(g, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (e) {
            var t = [];
            for (var a in e) t.push(a);
            return (
              t.reverse(),
              function a() {
                for (; t.length; ) {
                  var n = t.pop();
                  if (n in e) return (a.value = n), (a.done = !1), a;
                }
                return (a.done = !0), a;
              }
            );
          }),
          (e.values = A),
          (S.prototype = {
            constructor: S,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(N),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    a.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = void 0);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var t = this;
              function n(a, n) {
                return (
                  (i.type = "throw"),
                  (i.arg = e),
                  (t.next = a),
                  n && ((t.method = "next"), (t.arg = void 0)),
                  !!n
                );
              }
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r],
                  i = o.completion;
                if ("root" === o.tryLoc) return n("end");
                if (o.tryLoc <= this.prev) {
                  var l = a.call(o, "catchLoc"),
                    c = a.call(o, "finallyLoc");
                  if (l && c) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  } else if (l) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  a.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var o = r;
                  break;
                }
              }
              o &&
                ("break" === e || "continue" === e) &&
                o.tryLoc <= t &&
                t <= o.finallyLoc &&
                (o = null);
              var i = o ? o.completion : {};
              return (
                (i.type = e),
                (i.arg = t),
                o
                  ? ((this.method = "next"), (this.next = o.finallyLoc), u)
                  : this.complete(i)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                u
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.finallyLoc === e)
                  return this.complete(a.completion, a.afterLoc), N(a), u;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.tryLoc === e) {
                  var n = a.completion;
                  if ("throw" === n.type) {
                    var r = n.arg;
                    N(a);
                  }
                  return r;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (e, t, a) {
              return (
                (this.delegate = { iterator: A(e), resultName: t, nextLoc: a }),
                "next" === this.method && (this.arg = void 0),
                u
              );
            },
          }),
          e
        );
      }
      var tt = new FileReader(),
        at = null;
      function nt(e) {
        return new Promise(function (t, a) {
          (tt.onload = (function () {
            var e = Object(be.a)(
              et().mark(function e(a) {
                var n;
                return et().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (n = new Uint8Array(a.target.result)),
                          at.update(n),
                          t();
                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })()),
            tt.readAsArrayBuffer(e);
        });
      }
      var rt = (function () {
        var e = Object(be.a)(
          et().mark(function e(t) {
            var a, n, r, o;
            return et().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (!at) {
                      e.next = 4;
                      break;
                    }
                    at.init(), (e.next = 7);
                    break;
                  case 4:
                    return (e.next = 6), Object(Qe.a)();
                  case 6:
                    at = e.sent;
                  case 7:
                    (a = Math.floor(t.size / 67108864)), (n = 0);
                  case 9:
                    if (!(n <= a)) {
                      e.next = 16;
                      break;
                    }
                    return (
                      (r = t.slice(
                        67108864 * n,
                        Math.min(67108864 * (n + 1), t.size)
                      )),
                      (e.next = 13),
                      nt(r)
                    );
                  case 13:
                    n++, (e.next = 9);
                    break;
                  case 16:
                    return (
                      (o = at.digest()), e.abrupt("return", Promise.resolve(o))
                    );
                  case 18:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })();
      function ot(e) {
        return it.apply(this, arguments);
      }
      function it() {
        return (it = Object(be.a)(
          et().mark(function e(t) {
            var a, n;
            return et().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (a = t), (e.next = 3), rt(a);
                  case 3:
                    return (n = e.sent), e.abrupt("return", n);
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      var lt = a(30),
        ct = a.n(lt);
      function st() {
        st = function () {
          return e;
        };
        var e = {},
          t = Object.prototype,
          a = t.hasOwnProperty,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.asyncIterator || "@@asyncIterator",
          i = n.toStringTag || "@@toStringTag";
        function l(e, t, a) {
          return (
            Object.defineProperty(e, t, {
              value: a,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          );
        }
        try {
          l({}, "");
        } catch (w) {
          l = function (e, t, a) {
            return (e[t] = a);
          };
        }
        function c(e, t, a, n) {
          var r = t && t.prototype instanceof m ? t : m,
            o = Object.create(r.prototype),
            i = new S(n || []);
          return (
            (o._invoke = (function (e, t, a) {
              var n = "suspendedStart";
              return function (r, o) {
                if ("executing" === n)
                  throw new Error("Generator is already running");
                if ("completed" === n) {
                  if ("throw" === r) throw o;
                  return j();
                }
                for (a.method = r, a.arg = o; ; ) {
                  var i = a.delegate;
                  if (i) {
                    var l = b(i, a);
                    if (l) {
                      if (l === u) continue;
                      return l;
                    }
                  }
                  if ("next" === a.method) a.sent = a._sent = a.arg;
                  else if ("throw" === a.method) {
                    if ("suspendedStart" === n)
                      throw ((n = "completed"), a.arg);
                    a.dispatchException(a.arg);
                  } else "return" === a.method && a.abrupt("return", a.arg);
                  n = "executing";
                  var c = s(e, t, a);
                  if ("normal" === c.type) {
                    if (
                      ((n = a.done ? "completed" : "suspendedYield"),
                      c.arg === u)
                    )
                      continue;
                    return { value: c.arg, done: a.done };
                  }
                  "throw" === c.type &&
                    ((n = "completed"), (a.method = "throw"), (a.arg = c.arg));
                }
              };
            })(e, a, i)),
            o
          );
        }
        function s(e, t, a) {
          try {
            return { type: "normal", arg: e.call(t, a) };
          } catch (w) {
            return { type: "throw", arg: w };
          }
        }
        e.wrap = c;
        var u = {};
        function m() {}
        function d() {}
        function h() {}
        var f = {};
        l(f, r, function () {
          return this;
        });
        var p = Object.getPrototypeOf,
          E = p && p(p(A([])));
        E && E !== t && a.call(E, r) && (f = E);
        var g = (h.prototype = m.prototype = Object.create(f));
        function v(e) {
          ["next", "throw", "return"].forEach(function (t) {
            l(e, t, function (e) {
              return this._invoke(t, e);
            });
          });
        }
        function O(e, t) {
          var n;
          this._invoke = function (r, o) {
            function i() {
              return new t(function (n, i) {
                !(function n(r, o, i, l) {
                  var c = s(e[r], e, o);
                  if ("throw" !== c.type) {
                    var u = c.arg,
                      m = u.value;
                    return m && "object" == typeof m && a.call(m, "__await")
                      ? t.resolve(m.__await).then(
                          function (e) {
                            n("next", e, i, l);
                          },
                          function (e) {
                            n("throw", e, i, l);
                          }
                        )
                      : t.resolve(m).then(
                          function (e) {
                            (u.value = e), i(u);
                          },
                          function (e) {
                            return n("throw", e, i, l);
                          }
                        );
                  }
                  l(c.arg);
                })(r, o, n, i);
              });
            }
            return (n = n ? n.then(i, i) : i());
          };
        }
        function b(e, t) {
          var a = e.iterator[t.method];
          if (void 0 === a) {
            if (((t.delegate = null), "throw" === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = "return"),
                (t.arg = void 0),
                b(e, t),
                "throw" === t.method)
              )
                return u;
              (t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return u;
          }
          var n = s(a, e.iterator, t.arg);
          if ("throw" === n.type)
            return (
              (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), u
            );
          var r = n.arg;
          return r
            ? r.done
              ? ((t[e.resultName] = r.value),
                (t.next = e.nextLoc),
                "return" !== t.method &&
                  ((t.method = "next"), (t.arg = void 0)),
                (t.delegate = null),
                u)
              : r
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              u);
        }
        function y(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function N(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function S(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(y, this),
            this.reset(!0);
        }
        function A(e) {
          if (e) {
            var t = e[r];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var n = -1,
                o = function t() {
                  for (; ++n < e.length; )
                    if (a.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                  return (t.value = void 0), (t.done = !0), t;
                };
              return (o.next = o);
            }
          }
          return { next: j };
        }
        function j() {
          return { value: void 0, done: !0 };
        }
        return (
          (d.prototype = h),
          l(g, "constructor", h),
          l(h, "constructor", d),
          (d.displayName = l(h, i, "GeneratorFunction")),
          (e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === d || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (e.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, h)
                : ((e.__proto__ = h), l(e, i, "GeneratorFunction")),
              (e.prototype = Object.create(g)),
              e
            );
          }),
          (e.awrap = function (e) {
            return { __await: e };
          }),
          v(O.prototype),
          l(O.prototype, o, function () {
            return this;
          }),
          (e.AsyncIterator = O),
          (e.async = function (t, a, n, r, o) {
            void 0 === o && (o = Promise);
            var i = new O(c(t, a, n, r), o);
            return e.isGeneratorFunction(a)
              ? i
              : i.next().then(function (e) {
                  return e.done ? e.value : i.next();
                });
          }),
          v(g),
          l(g, i, "Generator"),
          l(g, r, function () {
            return this;
          }),
          l(g, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (e) {
            var t = [];
            for (var a in e) t.push(a);
            return (
              t.reverse(),
              function a() {
                for (; t.length; ) {
                  var n = t.pop();
                  if (n in e) return (a.value = n), (a.done = !1), a;
                }
                return (a.done = !0), a;
              }
            );
          }),
          (e.values = A),
          (S.prototype = {
            constructor: S,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(N),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    a.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = void 0);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var t = this;
              function n(a, n) {
                return (
                  (i.type = "throw"),
                  (i.arg = e),
                  (t.next = a),
                  n && ((t.method = "next"), (t.arg = void 0)),
                  !!n
                );
              }
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r],
                  i = o.completion;
                if ("root" === o.tryLoc) return n("end");
                if (o.tryLoc <= this.prev) {
                  var l = a.call(o, "catchLoc"),
                    c = a.call(o, "finallyLoc");
                  if (l && c) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  } else if (l) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  a.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var o = r;
                  break;
                }
              }
              o &&
                ("break" === e || "continue" === e) &&
                o.tryLoc <= t &&
                t <= o.finallyLoc &&
                (o = null);
              var i = o ? o.completion : {};
              return (
                (i.type = e),
                (i.arg = t),
                o
                  ? ((this.method = "next"), (this.next = o.finallyLoc), u)
                  : this.complete(i)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                u
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.finallyLoc === e)
                  return this.complete(a.completion, a.afterLoc), N(a), u;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.tryLoc === e) {
                  var n = a.completion;
                  if ("throw" === n.type) {
                    var r = n.arg;
                    N(a);
                  }
                  return r;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (e, t, a) {
              return (
                (this.delegate = { iterator: A(e), resultName: t, nextLoc: a }),
                "next" === this.method && (this.arg = void 0),
                u
              );
            },
          }),
          e
        );
      }
      function ut(e, t) {
        var a =
          ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
          e["@@iterator"];
        if (!a) {
          if (
            Array.isArray(e) ||
            (a = (function (e, t) {
              if (!e) return;
              if ("string" === typeof e) return mt(e, t);
              var a = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === a && e.constructor && (a = e.constructor.name);
              if ("Map" === a || "Set" === a) return Array.from(e);
              if (
                "Arguments" === a ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
              )
                return mt(e, t);
            })(e)) ||
            (t && e && "number" === typeof e.length)
          ) {
            a && (e = a);
            var n = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return n >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[n++] };
              },
              e: function (e) {
                throw e;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          i = !0,
          l = !1;
        return {
          s: function () {
            a = a.call(e);
          },
          n: function () {
            var e = a.next();
            return (i = e.done), e;
          },
          e: function (e) {
            (l = !0), (o = e);
          },
          f: function () {
            try {
              i || null == a.return || a.return();
            } finally {
              if (l) throw o;
            }
          },
        };
      }
      function mt(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var a = 0, n = new Array(t); a < t; a++) n[a] = e[a];
        return n;
      }
      var dt = function (e) {
          var t = e.translation,
            a = e.savedPositions,
            o = e.clearSavedPosition,
            i = Object(n.useState)({}),
            u = Object(c.a)(i, 2),
            m = u[0],
            d = u[1],
            h = Object(n.useState)({
              how: "",
              firstName: "",
              lastName: "",
              id: "",
              year: "",
              month: "",
              day: "",
              email: "",
              phone: "",
              volunteered: "",
              notes: "",
              languages: new Array({ languageID: "he", languageLevelID: "" }),
            }),
            f = Object(c.a)(h, 2),
            p = f[0],
            E = f[1],
            g = Object(n.useState)([]),
            v = Object(c.a)(g, 2),
            O = (v[0], v[1], Object(n.useState)([])),
            y = Object(c.a)(O, 2),
            S = y[0],
            A = y[1],
            j = Object(n.useState)({}),
            w = Object(c.a)(j, 2),
            R = w[0],
            T = w[1],
            C = Object(n.useState)(!1),
            _ = Object(c.a)(C, 2),
            L = _[0],
            I = _[1],
            P = Object(n.useState)(!1),
            M = Object(c.a)(P, 2),
            F = M[0],
            k = M[1],
            x = Object(n.useState)({}),
            D = Object(c.a)(x, 2),
            H = D[0],
            G = D[1],
            q = Object(n.useState)(!1),
            U = Object(c.a)(q, 2),
            Y = U[0],
            B = U[1],
            Z = Object(n.useState)(""),
            z = Object(c.a)(Z, 2),
            V = z[0],
            $ = z[1],
            X = Object(n.useState)([
              {
                title:
                  "\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea",
                titleEN: "Apply Now",
                link: "/",
              },
            ]),
            J = Object(c.a)(X, 2),
            W = J[0],
            K =
              (J[1],
              {
                how: Ne.a
                  .string()
                  .required()
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                firstName: Ne.a
                  .string()
                  .required()
                  .regex(
                    /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
                  )
                  .min(2)
                  .max(30)
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                lastName: Ne.a
                  .string()
                  .required()
                  .regex(
                    /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
                  )
                  .min(2)
                  .max(30)
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                id: Ne.a
                  .string()
                  .regex(/^[0-9]*$/)
                  .min(8)
                  .max(9)
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                year: Ne.a
                  .string()
                  .required()
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                month: Ne.a
                  .string()
                  .required()
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                day: Ne.a
                  .string()
                  .required()
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                email: Ne.a
                  .string()
                  .email()
                  .required()
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                phone: Ne.a
                  .string()
                  .required()
                  .regex(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                volunteered: Ne.a
                  .string()
                  .required()
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
                languages: Ne.a.array().items(
                  Ne.a.object({
                    languageID: Ne.a
                      .string()
                      .required()
                      .error(function (e) {
                        return we(e, t.data.FORM.ERRORS);
                      }),
                    languageLevelID: Ne.a
                      .string()
                      .required()
                      .error(function (e) {
                        return we(e, t.data.FORM.ERRORS);
                      }),
                  })
                ),
                notes: Ne.a
                  .string()
                  .allow("")
                  .error(function (e) {
                    return we(e, t.data.FORM.ERRORS);
                  }),
              }),
            Q = {
              languageID: Ne.a
                .string()
                .required()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
              languageLevelID: Ne.a
                .string()
                .required()
                .error(function (e) {
                  return we(e, t.data.FORM.ERRORS);
                }),
            };
          Object(n.useEffect)(function () {
            d(function (e) {
              return Object(N.a)({}, e, We);
            }),
              Pe([1, 2, 3, 5], G);
          }, []),
            Object(n.useEffect)(
              function () {
                H.payload && H.payload.length > 0 && k(!0);
              },
              [H]
            ),
            Object(n.useEffect)(
              function () {
                L &&
                  (o(),
                  window.gtag("event", "form_submit", {
                    form_destination: window.location.href,
                  }));
              },
              [L]
            );
          var ee = function () {
              var e = Ne.a.validate(p, K, { abortEarly: !1 }).error;
              if (!e) return null;
              var t,
                a = {},
                n = ut(e.details);
              try {
                for (n.s(); !(t = n.n()).done; ) {
                  var r = t.value;
                  a[r.path[0]] = r.message;
                }
              } catch (o) {
                n.e(o);
              } finally {
                n.f();
              }
              return a;
            },
            te = (function () {
              var e = Object(be.a)(
                st().mark(function e(t) {
                  var n, r, o;
                  return st().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (n = t), (r = p), (e.next = 4), ot(S[0]);
                        case 4:
                          (o = e.sent),
                            (r.attachedPosition = a),
                            r.languages.forEach(function (e) {
                              return (e.languageName = H.payload[0].filter(
                                function (t) {
                                  return t.id === e.languageID;
                                }
                              )[0].value);
                            }),
                            Je(r, S, o, n, I, $);
                        case 8:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })();
          return r.a.createElement(
            "div",
            { className: "page-content application-page" },
            r.a.createElement(b, { translation: t, breadCrumbsObj: W }),
            r.a.createElement(
              "h1",
              null,
              "he" === t.lang ? m.title : m.titleEN
            ),
            r.a.createElement(
              "p",
              null,
              "he" === t.lang ? m.paragraph : m.paragraphEN
            ),
            r.a.createElement(
              "div",
              {
                className: L
                  ? "application-stage success"
                  : "application-stage",
              },
              L
                ? r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement("img", {
                      src: "plane.svg",
                      alt: "success plane",
                    }),
                    r.a.createElement("h2", null, t.data.FORM.SUCCESS),
                    r.a.createElement("p", null, t.data.FORM.SUCCESS_PARA),
                    r.a.createElement(
                      s.b,
                      { className: "form-back", to: "/" },
                      t.data.FORM.BACKHOME
                    )
                  )
                : r.a.createElement(
                    "form",
                    {
                      onSubmit: function (e) {
                        e.preventDefault();
                        var t = ee();
                        T(t || {}), t || B(!0);
                      },
                      encType: "multipart/form-data",
                    },
                    r.a.createElement($e, {
                      form: p,
                      errors: R,
                      handleChange: function (e) {
                        var a = e.currentTarget,
                          n = R,
                          r = (function (e) {
                            var t = e.name,
                              a = e.value,
                              n = Object(Oe.a)({}, t, a),
                              r = {};
                            (r = Object(Oe.a)({}, t, K[t])),
                              t.includes("language") &&
                                ((r = Object(Oe.a)(
                                  {},
                                  "languageID",
                                  Q.languageID
                                )),
                                (n = { languageID: a })),
                              t.includes("level") &&
                                ((r = Object(Oe.a)(
                                  {},
                                  "languageLevelID",
                                  Q.languageLevelID
                                )),
                                (n = { languageLevelID: a }));
                            var o = Ne.a.validate(n, r).error;
                            return o ? o.details[0].message : null;
                          })(a);
                        r ? (n[a.name] = r) : delete n[a.name];
                        var o,
                          i = p;
                        if (
                          a.name.includes("language") ||
                          a.name.includes("level")
                        ) {
                          var l = a.name.charAt(a.name.length - 1),
                            c = a.name.includes("language")
                              ? "languageID"
                              : "languageLevelID";
                          i.languages[l][c] = a.value;
                        } else
                          "id" === a.name
                            ? ((o = a.value),
                              (o = String(o).trim()).length > 9 ||
                              o.length < 9 ||
                              isNaN(o) ||
                              ((o =
                                o.length < 9 ? ("00000000" + o).slice(-9) : o),
                              Array.from(o, Number).reduce(function (e, t, a) {
                                var n = t * ((a % 2) + 1);
                                return e + (n > 9 ? n - 9 : n);
                              }) %
                                10 !==
                                0)
                                ? (n[a.name] = t.data.FORM.ERRORS.ID)
                                : delete n[a.name],
                              (i[a.name] = a.value))
                            : (i[a.name] =
                                "file" === a.name ? a.files[0] : a.value);
                        E(function (e) {
                          return Object(N.a)({}, e, i);
                        }),
                          T(R);
                      },
                      validate: ee(),
                      addLanguage: function () {
                        var e = p;
                        e.languages.push({
                          languageID: "",
                          languageLevelID: "",
                        }),
                          E(function (t) {
                            return Object(N.a)({}, t, e);
                          });
                      },
                      removeLanguage: function (e) {
                        var t = p;
                        t.languages.splice(e, 1),
                          E(function (e) {
                            return Object(N.a)({}, e, t);
                          });
                      },
                      translation: t,
                      catalogs: H,
                      apiError: V,
                      verified: te,
                      recaptach: Y,
                      file: S,
                      handleFileChange: function (e) {
                        if (e.target.files[0].size < 3145728) {
                          A(Object(l.a)(e.target.files));
                          var t = R;
                          delete t.file,
                            E(function (e) {
                              return Object(N.a)({}, e, t);
                            });
                        } else {
                          var a = R;
                          (a.file =
                            "\u05d4\u05e7\u05d5\u05d1\u05e5 \u05d2\u05d3\u05d5\u05dc \u05de\u05d9\u05d3\u05d9"),
                            E(function (e) {
                              return Object(N.a)({}, e, a);
                            });
                        }
                      },
                    })
                  )
            ),
            r.a.createElement("button", { onClick: te }),
            F ? null : r.a.createElement(Ke, null)
          );
        },
        ht = [
          {
            lang: "he",
            data: {
              SITE_NAME: "\u05d4\u05de\u05d5\u05e1\u05d3",
              SITE_PARAGRAPH:
                "\u05dc\u05de\u05d5\u05d3\u05d9\u05e2\u05d9\u05df \u05d5\u05ea\u05e4\u05e7\u05d9\u05d3\u05d9\u05dd \u05de\u05d9\u05d5\u05d7\u05d3\u05d9\u05dd",
              TOP_NAV_BUTTON_APPLY:
                "\u05dc\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea",
              TOP_NAV_BUTTON_APPLY_MOBILE:
                "\u05dc\u05d4\u05d2\u05e9\u05ea \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea",
              SEARCH: "\u05d7\u05d9\u05e4\u05d5\u05e9",
              POSITIONS: "\u05de\u05e9\u05e8\u05d5\u05ea",
              SEND: "\u05e9\u05dc\u05d7",
              CANCEL: "\u05d1\u05d9\u05d8\u05d5\u05dc",
              NEXT: "\u05d4\u05d1\u05d0",
              PREVIOUS: "\u05d4\u05e7\u05d5\u05d3\u05dd",
              HOME: "\u05d1\u05d9\u05ea",
              SEARCH_BANNER: {
                TITLE:
                  "\u05dc\u05e8\u05d0\u05d5\u05ea \u05d0\u05ea \u05d4\u05d1\u05dc\u05ea\u05d9 \u05e0\u05e8\u05d0\u05d4 \u05d5\u05dc\u05e2\u05e9\u05d5\u05ea \u05d0\u05ea \u05d4\u05d1\u05dc\u05ea\u05d9 \u05d0\u05e4\u05e9\u05e8\u05d9",
                TITLE_AFTER:
                  "\u05dc\u05de\u05e6\u05d5\u05d0 \u05de\u05e9\u05de\u05e2\u05d5\u05ea                   \u05d1\u05e7\u05e8\u05d9\u05d9\u05e8\u05d4",
                LABEL:
                  "\u05dc\u05d3\u05d5\u05d2\u05de\u05d0, \u05de\u05d4\u05e0\u05d3\u05e1 \u05ea\u05d5\u05db\u05e0\u05d4, \u05e1\u05d9\u05d9\u05d1\u05e8 \u05d0\u05d5 \u05d0\u05d3\u05de\u05d9\u05e0\u05d9\u05e1\u05d8\u05e8\u05e6\u05d9\u05d4",
              },
              HOT_POSITIONS: {
                TITLE:
                  "\u05de\u05e9\u05e8\u05d5\u05ea \u05d7\u05de\u05d5\u05ea",
                TO_ALL:
                  "\u05dc\u05db\u05dc \u05d4\u05de\u05e9\u05e8\u05d5\u05ea",
                VIEW: "\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05de\u05e9\u05e8\u05d4",
              },
              HOMEPAGE_DOMAINS: {
                TITLE:
                  "\u05de\u05d4 \u05d4\u05ea\u05d7\u05d5\u05dd \u05e9\u05dc\u05da?",
                TO_ALL:
                  "\u05dc\u05db\u05dc \u05d4\u05ea\u05d7\u05d5\u05de\u05d9\u05dd",
              },
              STAGES: {
                TITLE: "\u05e9\u05dc\u05d1\u05d9 \u05d2\u05d9\u05d5\u05e1",
              },
              HOMEPAGE_STORIES: {
                TITLE:
                  "\u05e2\u05e9\u05d9\u05d9\u05d4 \u05de\u05e2\u05d1\u05e8 \u05dc\u05db\u05dc \u05d3\u05d9\u05de\u05d9\u05d5\u05df",
              },
              FOOTER: {
                TITLE:
                  "\u05ea\u05de\u05d9\u05d3 \u05d4\u05e8\u05d2\u05e9\u05ea \u05e9\u05d4\u05de\u05e7\u05d5\u05dd \u05e9\u05dc\u05da \u05d0\u05d9\u05ea\u05e0\u05d5?",
                PARAGRAPH:
                  "\u05e0\u05d9\u05ea\u05df \u05dc\u05d4\u05d2\u05d9\u05e9 \u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea \u05db\u05dc\u05dc\u05d9\u05ea, \u05db\u05e9\u05ea\u05e6\u05d5\u05e5 \u05d4\u05d4\u05d3\u05de\u05e0\u05d5\u05ea \u05d4\u05de\u05ea\u05d0\u05d9\u05de\u05d4 \u05d1\u05e9\u05d1\u05d9\u05dc\u05da \u05e0\u05d9\u05e6\u05d5\u05e8 \u05e7\u05e9\u05e8",
              },
              FORM: {
                FIRST_NAME: "\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9",
                LAST_NAME: "\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4",
                ID_OR_PASSPORT:
                  "\u05de\u05e1\u05e4\u05e8 \u05ea\u05e2\u05d5\u05d3\u05ea \u05d6\u05d4\u05d5\u05ea",
                BIRTHDAY:
                  "\u05ea\u05d0\u05e8\u05d9\u05da \u05dc\u05d9\u05d3\u05d4",
                DAY: "\u05d9\u05d5\u05dd",
                MONTH: "\u05d7\u05d5\u05d3\u05e9",
                YEAR: "\u05e9\u05e0\u05d4",
                EMAIL:
                  "\u05db\u05ea\u05d5\u05d1\u05ea \u05d3\u05d5\u05d0\u05f4\u05dc",
                PHONE:
                  "\u05d8\u05dc\u05e4\u05d5\u05df \u05e0\u05d9\u05d9\u05d3",
                HOW_DID_YOU_REACH:
                  "\u05db\u05d9\u05e6\u05d3 \u05d4\u05d2\u05e2\u05ea \u05d0\u05dc\u05d9\u05e0\u05d5",
                LANGUAGE: "\u05e9\u05e4\u05d4",
                LEVEL: "\u05e8\u05de\u05d4",
                PLEASE_SELECT:
                  "\u05d1\u05d7\u05e8\u05d5 \u05de\u05ea\u05d5\u05da \u05d4\u05e8\u05e9\u05d9\u05de\u05d4",
                UPLOAD_CV_TITLE:
                  "\u05e7\u05d5\u05e8\u05d5\u05ea \u05d7\u05d9\u05d9\u05dd",
                UPLOAD_CV:
                  "\u05d4\u05e2\u05dc\u05d0\u05ea \u05e7\u05d5\u05f4\u05d7 (PDF, DOCX, DOC)",
                PERSONAL_INFO:
                  "\u05e4\u05e8\u05d8\u05d9\u05dd \u05d0\u05d9\u05e9\u05d9\u05d9\u05dd",
                CONTACT_INFO:
                  "\u05e4\u05e8\u05d8\u05d9 \u05d4\u05ea\u05e7\u05e9\u05e8\u05d5\u05ea",
                LANGUAGES: "\u05e9\u05e4\u05d5\u05ea",
                VOLUNTEERING:
                  "\u05e9\u05d9\u05e8\u05d5\u05ea \u05e6\u05d1\u05d0\u05d9/ \u05dc\u05d0\u05d5\u05de\u05d9/ \u05d4\u05ea\u05e0\u05d3\u05d1\u05d5\u05ea",
                SELECT: "\u05d1\u05d7\u05e8",
                ADD_LANG: "\u05d4\u05d5\u05e1\u05e4\u05ea \u05e9\u05e4\u05d4",
                SUCCESS:
                  "\u05ea\u05d5\u05d3\u05d4 \u05e2\u05dc \u05e4\u05e0\u05d9\u05d9\u05ea\u05da",
                SUCCESS_PARA:
                  "\u05de\u05d5\u05e2\u05de\u05d3\u05d5\u05ea\u05da \u05ea\u05d1\u05d7\u05df, \u05d1\u05de\u05d9\u05d3\u05d4 \u05d5\u05ea\u05de\u05e6\u05d0/\u05d9 \u05de\u05ea\u05d0\u05d9\u05de/\u05d4 \u05e0\u05d9\u05e6\u05d5\u05e8 \u05e7\u05e9\u05e8",
                NOTES_PLACEHOLDER:
                  "\u05d4\u05d5\u05e1\u05d9\u05e4\u05d5 \u05db\u05d0\u05df \u05d4\u05e2\u05e8\u05d5\u05ea \u05e0\u05d5\u05e1\u05e4\u05d5\u05ea\u2026",
                BACKHOME:
                  "\u05d7\u05d6\u05e8\u05d4 \u05dc\u05e2\u05de\u05d5\u05d3 \u05d4\u05d1\u05d9\u05ea",
                ERRORS: {
                  MANDATORY:
                    "\u05d6\u05d4\u05d5 \u05e9\u05d3\u05d4 \u05d7\u05d5\u05d1\u05d4",
                  MIN_BEFORE:
                    "\u05d0\u05e0\u05d0 \u05d4\u05db\u05e0\u05e1 \u05dc\u05e4\u05d7\u05d5\u05ea ",
                  MIN_AFTER: " \u05ea\u05d5\u05d5\u05d9\u05dd",
                  MAX_BEFORE:
                    "\u05d0\u05e0\u05d0 \u05d4\u05db\u05e0\u05e1 \u05e2\u05d3 ",
                  MAX_AFTER: " \u05ea\u05d5\u05d5\u05d9\u05dd",
                  ALPHA:
                    "\u05d9\u05e9 \u05dc\u05d4\u05db\u05e0\u05d9\u05e1 \u05d0\u05d5\u05ea\u05d9\u05d5\u05ea",
                  REGEX:
                    "\u05d0\u05e0\u05d0 \u05d4\u05db\u05e0\u05e1 \u05d4\u05db\u05e0\u05e1 \u05de\u05d9\u05d3\u05e2 \u05ea\u05e7\u05d9\u05df",
                  BASE: "\u05d0\u05e0\u05d0 \u05d4\u05db\u05e0\u05e1 \u05d4\u05db\u05e0\u05e1 \u05de\u05d9\u05d3\u05e2 \u05ea\u05e7\u05d9\u05df",
                  EMAIL:
                    "\u05d0\u05e0\u05d0 \u05d4\u05db\u05e0\u05e1 \u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05ea\u05e7\u05d9\u05df",
                  ID: "\u05ea\u05e2\u05d5\u05d3\u05ea \u05d6\u05d4\u05d5\u05ea \u05dc\u05d0 \u05ea\u05e7\u05e0\u05d9\u05ea",
                },
              },
              POSITIONS_PAGE: {
                TITLE:
                  "\u05de\u05d4 \u05de\u05e2\u05e0\u05d9\u05d9\u05df \u05d0\u05d5\u05ea\u05da?",
                SEARCH_PLACEHODER:
                  "\u05dc\u05d3\u05d5\u05d2\u05de\u05d0: \u05d4\u05e0\u05d3\u05e1\u05ea \u05ea\u05d5\u05db\u05e0\u05d4, \u05e1\u05d9\u05d9\u05d1\u05e8, \u05d0\u05d3\u05de\u05d9\u05e0\u05d9\u05e1\u05d8\u05e8\u05e6\u05d9\u05d4",
                OPEN_POSITIONS:
                  "\u05de\u05e9\u05e8\u05d5\u05ea \u05e4\u05ea\u05d5\u05d7\u05d5\u05ea",
                FILTER_BY: "\u05e1\u05d9\u05e0\u05d5\u05df \u05dc\u05e4\u05d9",
                DOMAIN:
                  "\u05ea\u05d7\u05d5\u05dd \u05e2\u05d9\u05e1\u05d5\u05e7",
                FIND_ME_POSITION:
                  "\u05de\u05e6\u05d0\u05d5 \u05dc\u05d9 \u05de\u05e9\u05e8\u05d4",
              },
              CONTACT_US: {
                TITLE:
                  "\u05d1\u05e8\u05d5\u05db\u05d9\u05dd \u05d4\u05d1\u05d0\u05d9\u05dd",
                PARAGRAPH:
                  ' \u05dc\u05d9\u05e6\u05d9\u05e8\u05ea \u05e7\u05e9\u05e8 \u05de\u05d4\u05d9\u05e8 \u05d5\u05d1\u05d8\u05d5\u05d7, \u05d0\u05e0\u05d5 \u05de\u05de\u05dc\u05d9\u05e6\u05d9\u05dd \u05dc\u05d9\u05e6\u05d5\u05e8 \u05d0\u05d9\u05ea\u05e0\u05d5 \u05e7\u05e9\u05e8 \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea\n                        <a href="https://www.facebook.com/TheMossadOfficial/inbox" target="_blank">Facebook Messenger</a>. <br>\n                        \u05e0\u05d0 \u05dc\u05db\u05ea\u05d5\u05d1 \u05e8\u05e7 \u05d1\u05e4\u05e8\u05e1\u05d9\u05ea, \u05e2\u05e8\u05d1\u05d9\u05ea \u05d0\u05d5 \u05d0\u05e0\u05d2\u05dc\u05d9\u05ea. \u05d4\u05d5\u05d3\u05e2\u05d5\u05ea \u05d1\u05e9\u05e4\u05d5\u05ea \u05d0\u05d7\u05e8\u05d5\u05ea \u05dc\u05d0 \u05d9\u05d9\u05e7\u05e8\u05d0\u05d5.',
                FIRST_NAME: "\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9",
                LAST_NAME: "\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4",
                FATHER_NAME: "\u05e9\u05dd \u05d4\u05d0\u05d1",
                BIRTHDAY:
                  "\u05ea\u05d0\u05e8\u05d9\u05da \u05dc\u05d9\u05d3\u05d4",
                YEAR_PLACEHOLDER: "\u05e9\u05e0\u05d4",
                MONTH_PLACEHOLDER: "\u05d7\u05d5\u05d3\u05e9",
                DAY_PLACEHOLDER: "\u05d9\u05d5\u05dd",
                PHONE: "\u05d8\u05dc\u05e4\u05d5\u05df",
                EMAIL:
                  '\u05db\u05ea\u05d5\u05d1\u05ea \u05d3\u05d5\u05d0"\u05dc',
                COUNTRY:
                  "\u05de\u05d3\u05d9\u05e0\u05ea \u05de\u05d5\u05e6\u05d0",
                CITIZENSHIP: "\u05d0\u05d6\u05e8\u05d7\u05d5\u05ea",
                LANGUAGE:
                  "\u05d1\u05d0\u05d9\u05d6\u05d5 \u05e9\u05e4\u05d4 \u05db\u05ea\u05d1\u05ea \u05d0\u05ea \u05d4\u05de\u05e1\u05e8 \u05e9\u05dc\u05da",
                NOTES_PLACEHOLDER:
                  "\u05d4\u05d5\u05e1\u05d9\u05e4\u05d5 \u05db\u05d0\u05df \u05d4\u05e2\u05e8\u05d5\u05ea \u05e0\u05d5\u05e1\u05e4\u05d5\u05ea",
                PERSONAL_INFO:
                  "\u05e4\u05e8\u05d8\u05d9\u05dd \u05d0\u05d9\u05e9\u05d9\u05d9\u05dd",
                CONTACT_INFO:
                  "\u05e4\u05e8\u05d8\u05d9 \u05d4\u05ea\u05e7\u05e9\u05e8\u05d5\u05ea",
                RESI_INFO:
                  "\u05e4\u05e8\u05d8\u05d9 \u05de\u05d2\u05d5\u05e8\u05d9\u05dd",
                ANY_INFO:
                  "\u05de\u05e9\u05d4\u05d5 \u05e9\u05ea\u05e8\u05e6\u05d5 \u05dc\u05d4\u05d5\u05e1\u05d9\u05e3?",
              },
              ABOUT: {
                HISTORY:
                  "\u05e8\u05d0\u05e9\u05d9 \u05d4\u05d0\u05e8\u05d2\u05d5\u05df \u05dc\u05d3\u05d5\u05e8\u05d5\u05ea\u05d9\u05d4\u05dd",
                FIRST_HAND:
                  "\u05de\u05de\u05e7\u05d5\u05e8 \u05e8\u05d0\u05e9\u05d5\u05df",
              },
              CAREER: {
                TITLE:
                  "\u05e7\u05e8\u05d9\u05d9\u05e8\u05d4 \u05d1\u05de\u05d5\u05e1\u05d3",
                PARAGRAPH:
                  "\u05d7\u05d5\u05e9\u05d1\u05d9\u05dd \u05e9\u05d0\u05ea\u05dd \u05de\u05e1\u05d5\u05d2\u05dc\u05d9\u05dd \u05dc\u05e2\u05de\u05d5\u05d3 \u05d1\u05e4\u05e0\u05d9 \u05dc\u05d7\u05e6\u05d9\u05dd \u05d5\u05d0\u05ea\u05d2\u05e8\u05d9\u05dd \u05e9\u05e8\u05e7 \u05d9\u05d5\u05d1\u05d9\u05dc\u05d5 \u05d0\u05d5\u05ea\u05db\u05dd \u05dc\u05d4\u05d9\u05d5\u05ea \u05d7\u05dc\u05e7 \u05d1\u05dc\u05ea\u05d9 \u05e0\u05e4\u05e8\u05d3 \u05de\u05d4\u05de\u05d5\u05e1\u05d3?",
              },
              CEOS: {
                TITLE:
                  "\u05e8\u05d0\u05e9\u05d9 \u05d4\u05de\u05d5\u05e1\u05d3 \u05dc\u05d0\u05d5\u05e8\u05da \u05d4\u05e9\u05e0\u05d9\u05dd",
              },
            },
          },
          {
            lang: "en",
            data: {
              SITE_NAME: "Mossad",
              SITE_PARAGRAPH: "Israeli Secret Intelligence Service",
              TOP_NAV_BUTTON_APPLY: "For General Application",
              TOP_NAV_BUTTON_APPLY_MOBILE: "For Application",
              SEARCH: "Search",
              POSITIONS: "Positions",
              SEND: "Send",
              CANCEL: "Cancel",
              NEXT: "Next",
              PREVIOUS: "Previous",
              HOME: "Home",
              SEARCH_BANNER: {
                TITLE: "To see the invisible and do the impossible",
                TITLE_AFTER: "Find meaning in your career",
                LABEL:
                  "For example, software engineer, cyber or administration",
              },
              HOT_POSITIONS: {
                TITLE: "Hot Positions",
                TO_ALL: "To All Positions",
                VIEW: "View Position",
              },
              HOMEPAGE_DOMAINS: {
                TITLE: "What's your domain?",
                TO_ALL: "To All Domains",
              },
              STAGES: { TITLE: "Recruitment stages" },
              HOMEPAGE_STORIES: { TITLE: "Doing, Beyond every imagination" },
              FOOTER: {
                TITLE: "Have you always felt that you belong with us?",
                PARAGRAPH:
                  "You can submit a general application, when the right position appears, we will contact you",
              },
              FORM: {
                FIRST_NAME: "First Name",
                LAST_NAME: "Last Name",
                ID_OR_PASSPORT: "ID Number  Passport Number",
                BIRTHDAY: "Date Of Birth",
                DAY: "Day",
                MONTH: "Month",
                YEAR: "Year",
                EMAIL: "Email",
                PHONE: "Phone",
                HOW_DID_YOU_REACH: "How did you reach us?",
                LANGUAGE: "Language",
                LEVEL: "Level",
                PLEASE_SELECT: "Please Select from the list",
                UPLOAD_CV_TITLE: "Uploading a CV",
                UPLOAD_CV: "Upload CV(PDF, DOCX, DOC)",
                PERSONAL_INFO: "Personal Information",
                CONTACT_INFO: "Contact Information",
                LANGUAGES: "Languages",
                VOLUNTEERING: "Military/ National Service/ Volunteering",
                SELECT: "Select",
                ADD_LANG: "Add Language",
                SUCCESS: "The form has been sent successfully",
                SUCCESS_PARA: "We will get back to you soon",
                NOTES_PLACEHOLDER: "Add more comments here\u2026",
                BACKHOME: "Back To Home Page",
                ERRORS: {
                  MANDATORY: "This is a mandatory field",
                  MIN_BEFORE: "Please enter at least ",
                  MIN_AFTER: " characters",
                  MAX_BEFORE: "Please enter up to ",
                  MAX_AFTER: " characters",
                  ALPHA: "Please write only letters",
                  REGEX: "Please enter correct information",
                  BASE: "Please enter correct information",
                  EMAIL: "Please enter a valid email",
                  ID: "Incorrect ID",
                },
              },
              POSITIONS_PAGE: {
                TITLE: "What do you find interesting?",
                SEARCH_PLACEHODER:
                  "For example: software engineering, cyber, administration",
                OPEN_POSITIONS: "Open Positions",
                FILTER_BY: "Filter By",
                DOMAIN: "Domain",
                FIND_ME_POSITION: "Find me a position",
              },
              CONTACT_US: {
                TITLE: "Welcome to our website",
                PARAGRAPH:
                  ' For swift and safe contact, we recommend contacting us via\n                                <a href="https://www.facebook.com/TheMossadOfficial/inbox" target="_blank">Facebook messenger</a>. <br>\n                                Please write only in Farsi, Arabic, or English. Messages in other languages will not be read.',
                FIRST_NAME: "First Name",
                LAST_NAME: "Last Name",
                FATHER_NAME: "Father's Name",
                BIRTHDAY: "Birth date",
                YEAR_PLACEHOLDER: "Select Year",
                MONTH_PLACEHOLDER: "Select Month",
                DAY_PLACEHOLDER: "Select Day",
                PHONE: "Phone",
                EMAIL: "Email",
                COUNTRY: "Country",
                CITIZENSHIP: "Citizenship",
                LANGUAGE: "Select the language you used in this form",
                NOTES_PLACEHOLDER: "Please add additional notes",
                PERSONAL_INFO: "Personal Information",
                CONTACT_INFO: "Contact Information",
                RESI_INFO: "Residential Information",
                ANY_INFO: "Anything you'd like to add?",
              },
              ABOUT: { HISTORY: "The CEOs", FIRST_HAND: "First-Hand" },
              CAREER: {
                TITLE: "Carrer In The Mossad",
                PARAGRAPH:
                  "Do you think you are able to withstand pressures and challenges that will only lead you to become an integral part of the institution?",
              },
              CEOS: { TITLE: "The Mossad's Previous CEOS" },
            },
          },
          {
            lang: "fa",
            data: {
              SEND: "\u0627\u0631\u0633\u0627\u0644",
              HOME: "Home",
              FORM: {
                DAY: "\u0627\u0646\u062a\u062e\u0627\u0628",
                MONTH: "\u0627\u0646\u062a\u062e\u0627\u0628",
                YEAR: "\u0627\u0646\u062a\u062e\u0627\u0628",
                SUCCESS: "\u0628\u0627 \u062a\u0634\u06a9\u0631",
                SUCCESS_PARA:
                  '<span >&rlm;\u0627\u0632&rlm; &rlm;\u0627\u0645\u0631\u0648\u0632&rlm; &rlm;\u0645\u0627&rlm; &rlm;\u0646\u06cc\u0632&rlm; &rlm;\u062f\u0631&rlm; &rlm;\u0635\u0641\u062d\u0647&rlm; &rlm;\u0631\u0633\u0645\u06cc&rlm; \n                                <span>&rlm;</span><a href="https://www.facebook.com/TheMossadOfficial/" target="_blank"><span >\u0641\u06cc\u0633\u0628\u0648\u06a9&rlm; &rlm;\u0645\u0648\u0633\u0627\u062f</span>&ZeroWidthSpace;</a>&rlm; &rlm;\u062f\u0631&rlm; &rlm;\u062f\u0633\u062a\u0631\u0633&rlm; &rlm;\u0647\u0633\u062a\u06cc\u0645&rlm; &rlm;\u0648&rlm; &rlm;\u0645\u06cc\u062a\u0648\u0627\u0646\u06cc\u062f&rlm; &rlm;\u0628\u0635\u0648\u0631\u062a&rlm; &rlm;\u0622\u0646\u0644\u0627\u06cc\u0646&rlm; &rlm;\u0628\u0627&rlm; &rlm;\u0645\u0627&rlm; &rlm;\u0635\u062d\u0628\u062a&rlm; &rlm;\u06a9\u0646\u06cc\u062f&rlm;.</span>',
                ERRORS: {
                  MANDATORY: "This is a mandatory field",
                  MIN_BEFORE: "Please enter at least ",
                  MIN_AFTER: " characters",
                  MAX_BEFORE: "Please enter up to ",
                  MAX_AFTER: " characters",
                  ALPHA: "Please write only letters",
                  REGEX: "Please enter correct information",
                  BASE: "Please enter correct information",
                  EMAIL: "Please enter a valid email",
                },
              },
              CONTACT_US: {
                TITLE: "\u062a\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
                PARAGRAPH:
                  " \u0645\u0631\u0627\u062c\u0639\u0647 \u06a9\u0646\u0646\u062f\u0647 \u06af\u0631\u0627\u0645\u06cc\u060c\n                \u0628\u0647 \u067e\u06cc\u0634\u0631\u0648 \u062a\u0631\u06cc\u0646 \u0633\u0627\u0632\u0645\u0627\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062a\u06cc \u062f\u0646\u06cc\u0627 \u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f!\n                \u0633\u0627\u0632\u0645\u0627\u0646 \u0645\u0627 \u0646\u06cc\u0627\u0632 \u0628\u0647 \u0647\u0645\u06a9\u0627\u0631\u0627\u0646 \u0645\u062e\u062a\u0644\u0641\u06cc \u062f\u0627\u0631\u062f \u0648 \u0627\u0632 \u0634\u0645\u0627 \u062f\u0639\u0648\u062a \u0645\u06cc\u06a9\u0646\u06cc\u0645 \u06a9\u0647 \u0645\u0634\u062e\u0635\u0627\u062a \u062e\u0648\u062f \u0631\u0627 \u0628\u0631\u0627\u06cc\u0645\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u06a9\u0646\u06cc\u062f \u062a\u0627 \u0628\u0627 \u0634\u0645\u0627 \u062a\u0645\u0627\u0633 \u0628\u06af\u200b\u06cc\u0631\u06cc\u0645 \u0648 \u0645\u0646\u0627\u0633\u0628 \u0628\u0648\u062f\u0646 \u0634\u0645\u0627 \u0631\u0627 \u0628\u0631\u0631\u0633\u06cc \u06a9\u0646\u06cc\u0645.\n                \u0627\u06cc\u0646 \u0633\u0627\u06cc\u062a \u06a9\u0627\u0645\u0644\u0627 \u0627\u0645\u0646 \u0627\u0633\u062a \u0648 \u0647\u0631 \u0631\u0648\u0632 \u062a\u0648\u0633\u0637 \u0628\u0647\u062a\u0631\u06cc\u0646 \u06a9\u0627\u0631\u0634\u0646\u0627\u0633\u0627\u0646 \u0633\u0627\u06cc\u0628\u0631\u06cc \u0645\u0648\u0633\u0627\u062f \u0628\u0631\u0631\u0633\u06cc \u0645\u06cc\u0634\u0648\u062f. \u0645\u0634\u062e\u0635\u0627\u062a \u0634\u0645\u0627 \u0628\u0637\u0648\u0631 \u0645\u062d\u0641\u0648\u0638 \u0627\u0631\u0633\u0627\u0644 \u062e\u0648\u0627\u0647\u062f \u0634\u062f.\n                \u0644\u0637\u0641\u0627 \u062f\u0631 \u062a\u0644\u0641\u0646 \u0648 \u06cc\u0627 \u0627\u06cc\u0645\u06cc\u0644\u06cc \u06a9\u0647 \u0627\u0631\u0633\u0627\u0644 \u06a9\u0631\u062f\u0647 \u0627\u06cc\u062f \u062f\u0631 \u062f\u0633\u062a\u0631\u0633 \u0628\u0648\u062f\u0647 \u0648 \u0635\u0628\u0648\u0631\u0627\u0646\u0647 \u0645\u0646\u062a\u0638\u0631 \u062a\u200b\u0645\u0627\u0633 \u0645\u0627 \u0628\u0627\u0634\u06cc\u062f. \u0642\u0635\u062f \u0645\u0627 \u0627\u06cc\u0646\u0633\u062a \u06a9\u0647 \u0628\u0627 \u062a\u0645\u0627\u0645\u06cc \u0627\u0641\u0631\u0627\u062f \u0648\u0627\u062c\u062f \u0634\u0631\u0627\u06cc\u0637 \u062a\u0645\u0627\u0633 \u0628\u06af\u06cc\u0631\u06cc\u0645.\n                \u0634\u0645\u0627 \u062f\u0631 \u0634\u0631\u0641 \u06cc\u06a9 \u062a\u063a\u06cc\u06cc\u0631 \u0645\u062b\u0628\u062a \u062f\u0631 \u0632\u0646\u062f\u06af\u06cc\u062a\u0627\u0646 \u0647\u0633\u062a\u06cc\u062f \u0648 \u062e\u0648\u0627\u0647\u06cc\u062f \u062a\u0648\u0627\u0646\u0633\u062a \u062c\u0647\u062a \u062a\u0627\u0645\u06cc\u0646 \u06cc\u06a9 \u0627\u06cc\u0646\u062f\u0647 \u062e\u0648\u0628 \u0648 \u0627\u06cc\u062f\u0647 \u0627\u0644 \u0628\u0631\u0627\u06cc \u062e\u0648\u062f \u0648 \u062e\u0627\u0646\u0648\u0627\u062f\u0647 \u062a\u0627\u0646\u060c \u06a9\u0634\u0648\u0631\u062a\u0627\u0646 \u0648 \u062a\u0645\u0627\u0645\u06cc \u0627\u0646\u0633\u0627\u0646\u0647\u0627 \u0641\u0639\u0627\u0644\u06cc\u062a \u06a9\u0646\u06cc\u062f.\n                \u0628\u0647 \u0627\u0645\u06cc\u062f \u062f\u06cc\u062f\u0627\u0631!\u200b\n                \u200f\u0627\u0632 \u0647\u0645\u0647 \u062f\u0648\u0633\u062a\u0627\u0646 \u200f\u0639\u0632\u06cc\u0632\u200f \u200f\u062e\u0648\u0627\u0647\u0634\u0645\u0646\u062f\u200f \u0627\u0633\u062a \u0641\u0642\u0637 \u0628\u0647 \u200f\u0632\u0628\u0627\u0646\u0647\u0627\u06cc\u200f \u200f\u0641\u0627\u0631\u0633\u06cc\u200f,\u200f \u200f\u0639\u0631\u0628\u06cc\u200f \u0648 \u200f\u0627\u0646\u06af\u0644\u06cc\u0633\u06cc\u200f \u0645\u0631\u0627\u062c\u0639\u0647 \u200f\u0641\u0631\u0645\u0627\u06cc\u06cc\u062f\u200f. \u200f\u067e\u06cc\u0627\u0645\u0647\u0627\u200f \u0628\u0647 \u200f\u0632\u0628\u0627\u0646\u0647\u0627\u06cc\u200f \u200f\u062f\u06cc\u06af\u0631\u200f \u200f\u0631\u0633\u06cc\u062f\u06af\u06cc\u200f \u200f\u0646\u062e\u0648\u0627\u0647\u0646\u062f\u200f \u0634\u062f\u200f.\u200f \u200f\u0645\u062a\u0634\u06a9\u0631\u06cc\u0645\u200f.\u200b\u200b\u200b",
                FIRST_NAME: "\u0646\u0627\u0645 ",
                LAST_NAME:
                  "\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc",
                FATHER_NAME: "\u0646\u0627\u0645 \u067e\u062f\u0631",
                BIRTHDAY:
                  "\u062a\u0627\u0631\u06cc\u062e \u062a\u0648\u0644\u062f",
                YEAR_PLACEHOLDER: "Select Year",
                MONTH_PLACEHOLDER: "Select Month",
                DAY_PLACEHOLDER: "Select Day",
                PHONE: "\u062a\u0644\u0641\u0646",
                EMAIL:
                  "\u067e\u0633\u062a \u0627\u0644\u06a9\u062a\u0631\u0648\u0646\u06cc\u06a9\u06cc",
                COUNTRY: "\u06a9\u0634\u0648\u0631 ",
                CITIZENSHIP: "\u062a\u0627\u0628\u0639\u06cc\u062a",
                LANGUAGE:
                  "\u067e\u06cc\u063a\u0627\u0645\u062a\u0627\u0646 \u0631\u0627 \u0628\u0647 \u0686\u0647 \u0632\u0628\u0627\u0646 \u0646\u0648\u0634\u062a\u0647 \u0627\u06cc\u062f\u061f",
                NOTES_PLACEHOLDER: "\u0645\u062a\u0646*",
                PERSONAL_INFO:
                  "\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0634\u062e\u0635\u06cc",
                CONTACT_INFO:
                  "\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u062a\u0645\u0627\u0633",
                RESI_INFO:
                  "\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0645\u0633\u06a9\u0648\u0646\u06cc",
                ANY_INFO:
                  "\u0686\u06cc\u0632\u06cc \u06a9\u0647 \u0645\u06cc \u062e\u0648\u0627\u0647\u06cc\u062f \u0627\u0636\u0627\u0641\u0647 \u06a9\u0646\u06cc\u062f\u061f",
              },
            },
          },
          {
            lang: "ar",
            data: {
              SEND: "\u0627\u0631\u0633\u0627\u0644",
              HOME: "Home",
              FORM: {
                DAY: "\u0627\u062e\u062a\u0627\u0631",
                MONTH: "\u0627\u062e\u062a\u0627\u0631",
                YEAR: "\u0627\u062e\u062a\u0627\u0631",
                SUCCESS: "\u0634\u0643\u0631\u0627\u064b \u0644\u0642\u062f",
                SUCCESS_PARA:
                  "\u200b \u0648\u0635\u0644\u062a\u200b \u0627\u0633\u062a\u0645\u0627\u0631\u062a\u0643 \u0628\u0646\u062c\u0627\u062d ",
                ERRORS: {
                  MANDATORY: "This is a mandatory field",
                  MIN_BEFORE: "Please enter at least ",
                  MIN_AFTER: " characters",
                  MAX_BEFORE: "Please enter up to ",
                  MAX_AFTER: " characters",
                  ALPHA: "Please write only letters",
                  REGEX: "Please enter correct information",
                  BASE: "Please enter correct information",
                  EMAIL: "Please enter a valid email",
                },
              },
              CONTACT_US: {
                TITLE:
                  "\u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0646\u0627",
                PARAGRAPH:
                  ' \u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b \u0644\u063a\u0631\u0636 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0646\u0627 \u0628\u0634\u0643\u0644 \u0633\u0631\u064a\u0639 \u0648\u0645\u0624\u0645\u0646 \u064a\u0646\u0635\u062d \u0628\u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629 \u0625\u0644\u0649 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u200b\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\n                <a href="mailto:Mossadarabi@mail.gov.il">Mossadarabi@mail.gov.il</a> \u0627\u0648 \u200b\n                                <a href="https://www.facebook.com/TheMossadOfficial/inbox" target="_blank">Facebook messenger</a>. <br>\n                                \u062d\u064a\u062b \u064a\u062c\u0628 \u0623\u0646 \u062a\u0634\u0645\u0644 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0648\u0627\u0631\u062f\u0629 \u0623\u062f\u0646\u0627\u0647.\n\u200b\u200b\u200b\u0627\u0644\u0631\u062c\u0627\u0621 \u0627\u0644\u062a\u0648\u062c\u0647 \u0627\u0644\u064a\u0646\u0627 \u0628\u0627\u0644\u0644\u063a\u0627\u062a \u0627\u0644\u0641\u0627\u0631\u0633\u064a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0627\u0646\u062c\u0644\u064a\u0632\u064a\u0629. \u062a\u0648\u062c\u0647\u0627\u062a \u0628\u063a\u064a\u0631 \u0647\u0630\u0647 \u0627\u0644\u0644\u063a\u0627\u062a \u0633\u0648\u0641 \u0644\u0646 \u062a\u062d\u0638\u0649 \u0628\u0627\u0644\u0642\u0631\u0627\u0621\u0629',
                FIRST_NAME:
                  "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 ",
                LAST_NAME:
                  "\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629",
                FATHER_NAME:
                  "\u0627\u0633\u0645 \u0627\u0644\u0648\u0627\u0644\u062f",
                BIRTHDAY:
                  "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0645\u064a\u0644\u0627\u062f",
                YEAR_PLACEHOLDER: "Select Year",
                MONTH_PLACEHOLDER: "Select Month",
                DAY_PLACEHOLDER: "Select Day",
                PHONE: "\u0647\u0627\u062a\u0641",
                EMAIL:
                  "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
                COUNTRY: "\u062f\u0648\u0644\u0629",
                CITIZENSHIP: "\u0627\u0644\u0645\u0648\u0627\u0637\u0646\u0629",
                LANGUAGE:
                  "\u0627\u062e\u062a\u0631 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u062a\u064a \u0627\u0633\u062a\u0639\u0645\u0644\u062a\u0647\u0627 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0631\u0629 ",
                NOTES_PLACEHOLDER: "\u0646\u0635*",
                PERSONAL_INFO:
                  "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0634\u062e\u0635\u064a\u0629 ",
                CONTACT_INFO:
                  "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644 ",
                RESI_INFO:
                  "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0633\u0643\u0646\u064a\u0629",
                ANY_INFO:
                  "\u0647\u0644 \u062a\u0648\u062f \u0625\u0636\u0627\u0641\u0629 \u0623\u064a \u0634\u064a\u0621\u061f ",
              },
            },
          },
        ];
      function ft(e) {
        return ht.filter(function (t) {
          return t.lang === e;
        })[0];
      }
      function pt(e, t) {
        var a =
          ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
          e["@@iterator"];
        if (!a) {
          if (
            Array.isArray(e) ||
            (a = (function (e, t) {
              if (!e) return;
              if ("string" === typeof e) return Et(e, t);
              var a = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === a && e.constructor && (a = e.constructor.name);
              if ("Map" === a || "Set" === a) return Array.from(e);
              if (
                "Arguments" === a ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
              )
                return Et(e, t);
            })(e)) ||
            (t && e && "number" === typeof e.length)
          ) {
            a && (e = a);
            var n = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return n >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[n++] };
              },
              e: function (e) {
                throw e;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          i = !0,
          l = !1;
        return {
          s: function () {
            a = a.call(e);
          },
          n: function () {
            var e = a.next();
            return (i = e.done), e;
          },
          e: function (e) {
            (l = !0), (o = e);
          },
          f: function () {
            try {
              i || null == a.return || a.return();
            } finally {
              if (l) throw o;
            }
          },
        };
      }
      function Et(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var a = 0, n = new Array(t); a < t; a++) n[a] = e[a];
        return n;
      }
      function gt() {
        gt = function () {
          return e;
        };
        var e = {},
          t = Object.prototype,
          a = t.hasOwnProperty,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.asyncIterator || "@@asyncIterator",
          i = n.toStringTag || "@@toStringTag";
        function l(e, t, a) {
          return (
            Object.defineProperty(e, t, {
              value: a,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          );
        }
        try {
          l({}, "");
        } catch (w) {
          l = function (e, t, a) {
            return (e[t] = a);
          };
        }
        function c(e, t, a, n) {
          var r = t && t.prototype instanceof m ? t : m,
            o = Object.create(r.prototype),
            i = new S(n || []);
          return (
            (o._invoke = (function (e, t, a) {
              var n = "suspendedStart";
              return function (r, o) {
                if ("executing" === n)
                  throw new Error("Generator is already running");
                if ("completed" === n) {
                  if ("throw" === r) throw o;
                  return j();
                }
                for (a.method = r, a.arg = o; ; ) {
                  var i = a.delegate;
                  if (i) {
                    var l = b(i, a);
                    if (l) {
                      if (l === u) continue;
                      return l;
                    }
                  }
                  if ("next" === a.method) a.sent = a._sent = a.arg;
                  else if ("throw" === a.method) {
                    if ("suspendedStart" === n)
                      throw ((n = "completed"), a.arg);
                    a.dispatchException(a.arg);
                  } else "return" === a.method && a.abrupt("return", a.arg);
                  n = "executing";
                  var c = s(e, t, a);
                  if ("normal" === c.type) {
                    if (
                      ((n = a.done ? "completed" : "suspendedYield"),
                      c.arg === u)
                    )
                      continue;
                    return { value: c.arg, done: a.done };
                  }
                  "throw" === c.type &&
                    ((n = "completed"), (a.method = "throw"), (a.arg = c.arg));
                }
              };
            })(e, a, i)),
            o
          );
        }
        function s(e, t, a) {
          try {
            return { type: "normal", arg: e.call(t, a) };
          } catch (w) {
            return { type: "throw", arg: w };
          }
        }
        e.wrap = c;
        var u = {};
        function m() {}
        function d() {}
        function h() {}
        var f = {};
        l(f, r, function () {
          return this;
        });
        var p = Object.getPrototypeOf,
          E = p && p(p(A([])));
        E && E !== t && a.call(E, r) && (f = E);
        var g = (h.prototype = m.prototype = Object.create(f));
        function v(e) {
          ["next", "throw", "return"].forEach(function (t) {
            l(e, t, function (e) {
              return this._invoke(t, e);
            });
          });
        }
        function O(e, t) {
          var n;
          this._invoke = function (r, o) {
            function i() {
              return new t(function (n, i) {
                !(function n(r, o, i, l) {
                  var c = s(e[r], e, o);
                  if ("throw" !== c.type) {
                    var u = c.arg,
                      m = u.value;
                    return m && "object" == typeof m && a.call(m, "__await")
                      ? t.resolve(m.__await).then(
                          function (e) {
                            n("next", e, i, l);
                          },
                          function (e) {
                            n("throw", e, i, l);
                          }
                        )
                      : t.resolve(m).then(
                          function (e) {
                            (u.value = e), i(u);
                          },
                          function (e) {
                            return n("throw", e, i, l);
                          }
                        );
                  }
                  l(c.arg);
                })(r, o, n, i);
              });
            }
            return (n = n ? n.then(i, i) : i());
          };
        }
        function b(e, t) {
          var a = e.iterator[t.method];
          if (void 0 === a) {
            if (((t.delegate = null), "throw" === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = "return"),
                (t.arg = void 0),
                b(e, t),
                "throw" === t.method)
              )
                return u;
              (t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return u;
          }
          var n = s(a, e.iterator, t.arg);
          if ("throw" === n.type)
            return (
              (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), u
            );
          var r = n.arg;
          return r
            ? r.done
              ? ((t[e.resultName] = r.value),
                (t.next = e.nextLoc),
                "return" !== t.method &&
                  ((t.method = "next"), (t.arg = void 0)),
                (t.delegate = null),
                u)
              : r
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              u);
        }
        function y(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function N(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function S(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(y, this),
            this.reset(!0);
        }
        function A(e) {
          if (e) {
            var t = e[r];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var n = -1,
                o = function t() {
                  for (; ++n < e.length; )
                    if (a.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                  return (t.value = void 0), (t.done = !0), t;
                };
              return (o.next = o);
            }
          }
          return { next: j };
        }
        function j() {
          return { value: void 0, done: !0 };
        }
        return (
          (d.prototype = h),
          l(g, "constructor", h),
          l(h, "constructor", d),
          (d.displayName = l(h, i, "GeneratorFunction")),
          (e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === d || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (e.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, h)
                : ((e.__proto__ = h), l(e, i, "GeneratorFunction")),
              (e.prototype = Object.create(g)),
              e
            );
          }),
          (e.awrap = function (e) {
            return { __await: e };
          }),
          v(O.prototype),
          l(O.prototype, o, function () {
            return this;
          }),
          (e.AsyncIterator = O),
          (e.async = function (t, a, n, r, o) {
            void 0 === o && (o = Promise);
            var i = new O(c(t, a, n, r), o);
            return e.isGeneratorFunction(a)
              ? i
              : i.next().then(function (e) {
                  return e.done ? e.value : i.next();
                });
          }),
          v(g),
          l(g, i, "Generator"),
          l(g, r, function () {
            return this;
          }),
          l(g, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (e) {
            var t = [];
            for (var a in e) t.push(a);
            return (
              t.reverse(),
              function a() {
                for (; t.length; ) {
                  var n = t.pop();
                  if (n in e) return (a.value = n), (a.done = !1), a;
                }
                return (a.done = !0), a;
              }
            );
          }),
          (e.values = A),
          (S.prototype = {
            constructor: S,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(N),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    a.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = void 0);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var t = this;
              function n(a, n) {
                return (
                  (i.type = "throw"),
                  (i.arg = e),
                  (t.next = a),
                  n && ((t.method = "next"), (t.arg = void 0)),
                  !!n
                );
              }
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r],
                  i = o.completion;
                if ("root" === o.tryLoc) return n("end");
                if (o.tryLoc <= this.prev) {
                  var l = a.call(o, "catchLoc"),
                    c = a.call(o, "finallyLoc");
                  if (l && c) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  } else if (l) {
                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  a.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var o = r;
                  break;
                }
              }
              o &&
                ("break" === e || "continue" === e) &&
                o.tryLoc <= t &&
                t <= o.finallyLoc &&
                (o = null);
              var i = o ? o.completion : {};
              return (
                (i.type = e),
                (i.arg = t),
                o
                  ? ((this.method = "next"), (this.next = o.finallyLoc), u)
                  : this.complete(i)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                u
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.finallyLoc === e)
                  return this.complete(a.completion, a.afterLoc), N(a), u;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var a = this.tryEntries[t];
                if (a.tryLoc === e) {
                  var n = a.completion;
                  if ("throw" === n.type) {
                    var r = n.arg;
                    N(a);
                  }
                  return r;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (e, t, a) {
              return (
                (this.delegate = { iterator: A(e), resultName: t, nextLoc: a }),
                "next" === this.method && (this.arg = void 0),
                u
              );
            },
          }),
          e
        );
      }
      var vt = function (e) {
        var t = e.translation,
          a = e.changeLanguage,
          o = Object(n.useState)({
            firstName: "",
            lastName: "",
            fatherName: "",
            day: "",
            month: "",
            year: "",
            email: "",
            country: "",
            citizenship: "",
            language: "fa",
            phone: "",
            notes: "",
          }),
          i = Object(c.a)(o, 2),
          l = i[0],
          s = i[1],
          u = Object(n.useState)({}),
          m = Object(c.a)(u, 2),
          d = m[0],
          h = m[1],
          f = Object(n.useState)(""),
          p = Object(c.a)(f, 2),
          E = p[0],
          g = p[1],
          v = Object(n.useState)(!1),
          O = Object(c.a)(v, 2),
          y = O[0],
          S = O[1],
          A = Object(n.useState)([]),
          j = Object(c.a)(A, 2),
          w = (j[0], j[1]),
          R = Object(n.useState)([]),
          T = Object(c.a)(R, 2),
          C = T[0],
          _ = T[1],
          L = Object(n.useState)(""),
          I = Object(c.a)(L, 2),
          P = I[0],
          M = I[1],
          F = Object(n.useState)(!1),
          k = Object(c.a)(F, 2),
          x = k[0],
          D = k[1],
          H = Object(n.useState)({}),
          G = Object(c.a)(H, 2),
          q = G[0],
          U = G[1],
          Y = Object(n.useState)(""),
          B = Object(c.a)(Y, 2),
          Z = B[0],
          z = B[1],
          V = Object(n.useState)([
            {
              title: "\u0641\u0627\u0631\u0633\u06cc",
              titleEN: "Contact Us",
              link: "/",
            },
          ]),
          $ = Object(c.a)(V, 2),
          X = $[0];
        $[1];
        Object(n.useEffect)(function () {
          Pe([1], w),
            a({ lang: "en", dir: "ltr" }),
            xe(U),
            De(_),
            (function () {
              var e = Object(be.a)(
                gt().mark(function e() {
                  var t, a;
                  return gt().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (e.next = 3),
                              fetch("https://api.ipify.org?format=json")
                            );
                          case 3:
                            return (t = e.sent), (e.next = 6), t.json();
                          case 6:
                            (a = e.sent), g(a.ip), (e.next = 13);
                            break;
                          case 10:
                            (e.prev = 10),
                              (e.t0 = e.catch(0)),
                              console.error("Error:", e.t0);
                          case 13:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 10]]
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })()();
        }, []),
          Object(n.useEffect)(
            function () {
              q.fa && z(q.fa);
            },
            [q]
          ),
          Object(n.useEffect)(
            function () {
              ct.a.initialize({ gtmId: "G-FMNHNGNYC9" });
            },
            [y]
          );
        var J = {
            firstName: Ne.a
              .string()
              .required()
              .regex(
                /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
              )
              .min(2)
              .max(30)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            lastName: Ne.a
              .string()
              .required()
              .regex(
                /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
              )
              .min(2)
              .max(30)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            fatherName: Ne.a
              .string()
              .allow("")
              .regex(
                /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
              )
              .min(2)
              .max(30)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            day: Ne.a
              .string()
              .optional()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            month: Ne.a
              .string()
              .optional()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            year: Ne.a
              .string()
              .optional()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            email: Ne.a
              .string()
              .optional()
              .allow("")
              .email()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            phone: Ne.a
              .string()
              .regex(/^\d+$/)
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            subject: Ne.a.optional().error(function (e) {
              return we(e, t.data.FORM.ERRORS);
            }),
            country: Ne.a
              .string()
              .required()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
            citizenship: Ne.a.optional().error(function (e) {
              return we(e, t.data.FORM.ERRORS);
            }),
            language: Ne.a.optional().error(function (e) {
              return we(e, t.data.FORM.ERRORS);
            }),
            notes: Ne.a
              .string()
              .required()
              .error(function (e) {
                return we(e, t.data.FORM.ERRORS);
              }),
          },
          W = function (e) {
            var t = e.currentTarget,
              a = d,
              n = (function (e) {
                var t = e.name,
                  a = e.value,
                  n = Object(Oe.a)({}, t, a),
                  r = Object(Oe.a)({}, t, J[t]),
                  o = Ne.a.validate(n, r).error;
                return o ? o.details[0].message : null;
              })(t);
            n ? (a[t.name] = n) : delete a[t.name];
            var r = l;
            (l[t.name] = t.value),
              s(function (e) {
                return Object(N.a)({}, e, r);
              }),
              h(d);
          };
        return (
          Object(n.useEffect)(
            function () {
              window.gtag("event", "form_submit", {
                form_destination: window.location.href,
              });
            },
            [y]
          ),
          r.a.createElement(
            "div",
            { className: "page-content contact-us", dir: "rtl" },
            r.a.createElement(b, { translation: t, breadCrumbsObj: X }),
            r.a.createElement("h1", null, t.data.CONTACT_US.TITLE),
            r.a.createElement("p", { dangerouslySetInnerHTML: { __html: Z } }),
            r.a.createElement(
              "div",
              {
                className: y
                  ? "application-stage success"
                  : "application-stage",
              },
              y
                ? r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement("img", {
                      src: "/plane.svg",
                      alt: "success plane",
                    }),
                    r.a.createElement("h2", null, t.data.FORM.SUCCESS),
                    r.a.createElement("p", {
                      dangerouslySetInnerHTML: {
                        __html: t.data.FORM.SUCCESS_PARA,
                      },
                    })
                  )
                : r.a.createElement(
                    "form",
                    {
                      onSubmit: function (e) {
                        e.preventDefault();
                        var t = (function () {
                          var e = Ne.a.validate(l, J, { abortEarly: !1 }).error;
                          if (!e) return null;
                          var t,
                            a = {},
                            n = pt(e.details);
                          try {
                            for (n.s(); !(t = n.n()).done; ) {
                              var r = t.value;
                              a[r.path[0]] = r.message;
                            }
                          } catch (o) {
                            n.e(o);
                          } finally {
                            n.f();
                          }
                          return a;
                        })();
                        h(t || {}), t || D(!0);
                      },
                    },
                    r.a.createElement(
                      "div",
                      { className: "form-columns" },
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.PERSONAL_INFO
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "firstName",
                            label: t.data.CONTACT_US.FIRST_NAME,
                            required: !0,
                            value: l.firstName,
                            onChange: W,
                            error: d.firstName,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "lastName",
                            label: t.data.CONTACT_US.LAST_NAME,
                            required: !0,
                            value: l.lastName,
                            onChange: W,
                            error: d.lastName,
                          })
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement("div", { className: "spacer" }),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "fatherName",
                            label: t.data.CONTACT_US.FATHER_NAME,
                            value: l.fatherName,
                            onChange: W,
                            error: d.fatherName,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "three-columns" },
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Ae, {
                              name: "year",
                              label: t.data.CONTACT_US.BIRTHDAY,
                              placeholder: t.data.FORM.YEAR,
                              options: _e(),
                              onChange: W,
                              error: d.year,
                              required: !0,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Ae, {
                              name: "month",
                              placeholder: t.data.FORM.MONTH,
                              label: " ",
                              options: Le(),
                              onChange: W,
                              error: d.month,
                              required: !0,
                            })
                          ),
                          r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Ae, {
                              name: "day",
                              placeholder: t.data.FORM.DAY,
                              label: " ",
                              options: Ie(),
                              onChange: W,
                              error: d.day,
                              required: !0,
                            })
                          )
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.CONTACT_INFO
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "email",
                            label: t.data.CONTACT_US.EMAIL,
                            value: l.email,
                            onChange: W,
                            error: d.email,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Se, {
                            name: "phone",
                            label: t.data.CONTACT_US.PHONE,
                            required: !0,
                            value: l.phone,
                            onChange: W,
                            error: d.phone,
                          })
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.RESI_INFO
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Ae, {
                            name: "country",
                            required: !0,
                            label: t.data.CONTACT_US.COUNTRY,
                            options: C.countries ? C.countries : [],
                            onChange: W,
                            error: d.country,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "form-row" },
                          r.a.createElement(Ae, {
                            name: "citizenship",
                            label: t.data.CONTACT_US.CITIZENSHIP,
                            options: C.countries ? C.countries : [],
                            onChange: W,
                            error: d.citizenship,
                          })
                        )
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          "h2",
                          null,
                          t.data.CONTACT_US.ANY_INFO
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(Ae, {
                            name: "language",
                            required: !0,
                            label: t.data.CONTACT_US.LANGUAGE,
                            options: C.languages ? C.languages : [],
                            onChange: W,
                            defaultOption: "",
                            error: d.language,
                          })
                        ),
                        r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(je, {
                            name: "notes",
                            cols: "30",
                            rows: "3",
                            required: !0,
                            value: l.notes,
                            placeholder: t.data.CONTACT_US.NOTES_PLACEHOLDER,
                            limit: "200",
                            onChange: W,
                            error: d.notes,
                          })
                        )
                      )
                    ),
                    r.a.createElement(
                      "div",
                      { className: "form-actions" },
                      x
                        ? r.a.createElement(
                            "div",
                            { className: "recapcha" },
                            r.a.createElement(ke.a, {
                              sitekey:
                                "6LehjbMZAAAAAHsywENdjmEJLvhEODgIPWnF2Lyd",
                              onChange: function () {
                                Fe(l, E, S, M);
                              },
                            })
                          )
                        : null,
                      r.a.createElement(
                        "button",
                        { type: "submit", id: "sendFa" },
                        t.data.SEND
                      ),
                      r.a.createElement(
                        "div",
                        { className: "error-message" },
                        P
                      )
                    )
                  )
            )
          )
        );
      };
      var Ot = function (e) {
        var t = e.translation,
          a = Object(n.useState)([]),
          o = Object(c.a)(a, 2),
          i = (o[0], o[1]),
          l = Object(n.useState)({}),
          s = Object(c.a)(l, 2),
          u = (s[0], s[1]),
          m = Object(n.useState)([]),
          d = Object(c.a)(m, 2),
          h = d[0],
          f = d[1],
          p = Object(n.useState)([]),
          E = Object(c.a)(p, 2),
          g = E[0],
          v = E[1],
          O = Object(n.useState)([
            {
              title: "\u05ea\u05d4\u05dc\u05d9\u05da \u05d2\u05d9\u05d5\u05e1",
              titleEN: "Recruitment Process",
              link: "/",
            },
          ]),
          y = Object(c.a)(O, 2),
          N = y[0],
          S = (y[1], Object(n.useState)({})),
          A = Object(c.a)(S, 2),
          j = A[0],
          w = A[1];
        return (
          Object(n.useEffect)(function () {
            ue(w), K(v);
          }, []),
          Object(n.useEffect)(
            function () {
              i(j.domains), u(j.domainPage);
            },
            [j]
          ),
          Object(n.useEffect)(
            function () {
              f(g.stages);
            },
            [g]
          ),
          r.a.createElement(
            "div",
            { className: "page-content process-page" },
            r.a.createElement(b, { translation: t, breadCrumbsObj: N }),
            r.a.createElement(me, { stages: h, translation: t })
          )
        );
      };
      var bt = function (e) {
          var t = e.translation,
            o = Object(n.useState)([]),
            i = Object(c.a)(o, 2),
            l = i[0],
            s = i[1],
            u = Object(n.useState)([
              {
                title:
                  "\u05d4\u05e6\u05d4\u05e8\u05ea \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea",
                titleEN: "Website Accessibility",
                link: "/",
              },
            ]),
            m = Object(c.a)(u, 2),
            d = m[0];
          m[1];
          Object(n.useLayoutEffect)(function () {
            var e;
            (e = s),
              a(15)({
                method: "post",
                url:
                  "localhost" == window.location.hostname
                    ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetAccessibilityPage"
                    : "/Roham.DMZ/api/ManagedActions/GetAccessibilityPage",
                headers: { "Content-Type": "application/json" },
              })
                .then(function (t) {
                  e(t.data.payload);
                })
                .catch(function (e) {
                  return e;
                });
          }, []);
          return r.a.createElement(
            "div",
            { className: "page-content accessibility-page" },
            r.a.createElement(b, { translation: t, breadCrumbsObj: d }),
            r.a.createElement(
              "h1",
              null,
              "he" === t.lang ? l.title : l.titleEn
            ),
            r.a.createElement("div", {
              dangerouslySetInnerHTML:
                "he" === t.lang
                  ? { __html: l.description }
                  : { __html: l.descriptionEn },
            })
          );
        },
        yt = function () {
          var e = Object(n.useState)({}),
            t = Object(c.a)(e, 2),
            o = (t[0], t[1]),
            i = Object(n.useState)([]),
            s = Object(c.a)(i, 2),
            u = s[0],
            m = s[1],
            d = Object(n.useState)(ft("he")),
            h = Object(c.a)(d, 2),
            f = h[0],
            p = h[1],
            E = Object(y.e)().pathname,
            v = Object(n.useState)({}),
            b = Object(c.a)(v, 2),
            N = b[0],
            S = b[1],
            A = Object(y.f)(),
            j = function (e) {
              if (localStorage.savedPositions) {
                var t = JSON.parse(localStorage.savedPositions);
                t.find(function (t) {
                  return t.id === e.id;
                })
                  ? (t = t.filter(function (t) {
                      return !(t.id === e.id);
                    }))
                  : t.push(e),
                  localStorage.setItem("savedPositions", JSON.stringify(t)),
                  m(t);
              } else
                localStorage.setItem("savedPositions", JSON.stringify([e])),
                  m([e]);
            },
            w = function () {
              localStorage.setItem("savedPositions", JSON.stringify([])), m([]);
            },
            R = function (e) {
              var t = e.lang,
                a = e.dir,
                n = document.getElementsByTagName("html")[0];
              n.setAttribute("dir", a),
                n.setAttribute("lang", t),
                o({ lang: t, dir: a }),
                p(ft(t));
            };
          Object(n.useEffect)(function () {
            var e;
            localStorage.savedPositions &&
              m(Object(l.a)(JSON.parse(localStorage.savedPositions))),
              (e = S),
              a(15)({
                method: "post",
                url:
                  "localhost" === window.location.hostname
                    ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetMasterPage"
                    : "/Roham.DMZ/api/ManagedActions/GetMasterPage",
                headers: { "Content-Type": "application/json" },
              })
                .then(function (t) {
                  e(t.data.payload);
                })
                .catch(function (e) {
                  return e;
                }),
              C.includes(navigator.language) && A("/contact-us/fa"),
              T.includes(navigator.language) && A("/contact-us/ar");
          }, []);
          var T = [
              "ar",
              "ar-AE",
              "ar-BH",
              "ar-DZ",
              "ar-EG",
              "ar-IQ",
              "ar-JO",
              "ar-KW",
              "ar-LB",
              "ar-LY",
              "ar-MA",
              "ar-OM",
              "ar-QA",
              "ar-SA",
              "ar-SY",
              "ar-TN",
              "ar-YE",
            ],
            C = ["fa", "fa-IR"];
          return (
            Object(n.useEffect)(
              function () {
                window.scrollTo(0, 0);
              },
              [E]
            ),
            r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(g, {
                savedPositions: u.length,
                translation: f,
                changeLanguage: R,
                currentLang: f,
                links: N ? N.topNavigation : [],
              }),
              r.a.createElement(
                y.c,
                null,
                r.a.createElement(y.a, {
                  path: "/faq",
                  element: r.a.createElement(ve, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/application/:id/",
                  element: r.a.createElement(dt, {
                    translation: f,
                    savedPositions: u,
                    clearSavedPosition: w,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/application",
                  element: r.a.createElement(dt, {
                    translation: f,
                    savedPositions: u,
                    clearSavedPosition: w,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/career",
                  element: r.a.createElement(fe, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/about",
                  element: r.a.createElement(oe, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/history",
                  element: r.a.createElement(le, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/process",
                  element: r.a.createElement(Ot, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/accessibility",
                  element: r.a.createElement(bt, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/about/:path",
                  element: r.a.createElement(oe, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/contact-us",
                  element: r.a.createElement(Ue, { translation: f }),
                }),
                r.a.createElement(y.a, {
                  path: "/contact-us/ar",
                  element: r.a.createElement(ze, {
                    translation: ft("ar"),
                    changeLanguage: R,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/eng/Pages/contactusar.aspx",
                  element: r.a.createElement(ze, {
                    translation: ft("ar"),
                    changeLanguage: R,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/contact-us/fa",
                  element: r.a.createElement(vt, {
                    translation: ft("fa"),
                    changeLanguage: R,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/eng/Pages/contactusfa.aspx",
                  element: r.a.createElement(vt, {
                    translation: ft("fa"),
                    changeLanguage: R,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/positions/:id/",
                  element: r.a.createElement(U, {
                    handleSave: j,
                    savedPositions: u,
                    translation: f,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/positions",
                  element: r.a.createElement(U, {
                    handleSave: j,
                    savedPositions: u,
                    translation: f,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/",
                  element: r.a.createElement(Q, {
                    handleSave: j,
                    savedPositions: u,
                    translation: f,
                  }),
                }),
                r.a.createElement(y.a, {
                  path: "/*",
                  element: r.a.createElement(Q, {
                    handleSave: j,
                    savedPositions: u,
                    translation: f,
                  }),
                }),
                r.a.createElement(y.a, {
                  element: r.a.createElement(Q, {
                    handleSave: j,
                    savedPositions: u,
                    translation: f,
                  }),
                })
              ),
              r.a.createElement(O, {
                translation: f,
                footer: N ? N.footer : {},
                socials: N ? N.socialItems : [],
                pathname: E,
              })
            )
          );
        };
      a(106);
      var Nt = function () {
          return r.a.createElement(
            "div",
            { id: "rohm" },
            r.a.createElement(yt, null)
          );
        },
        St = function (e) {
          e &&
            e instanceof Function &&
            a
              .e(3)
              .then(a.bind(null, 108))
              .then(function (t) {
                var a = t.getCLS,
                  n = t.getFID,
                  r = t.getFCP,
                  o = t.getLCP,
                  i = t.getTTFB;
                a(e), n(e), r(e), o(e), i(e);
              });
        };
      i.a
        .createRoot(document.getElementById("root"))
        .render(r.a.createElement(s.a, null, r.a.createElement(Nt, null))),
        St();
    },
    48: function (e, t, a) {
      e.exports = a(107);
    },
    56: function (e, t, a) {},
  },
  [[48, 1, 2]],
]);
//# sourceMappingURL=main.5905494c.chunk.js.map
