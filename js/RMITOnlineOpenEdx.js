/******************************************************
 **
 **  Clipboard.js use with prismjs (http://prismjs.com)
 **  - allow copying code to clipboard
 **
 ******************************************************/
/*!
 * clipboard.js v1.6.0
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT Â© Zeno Rocha
 */
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.Clipboard = e()
    }
}(function() {
    var e, t, n;
    return function e(t, n, o) {
        function i(a, c) {
            if (!n[a]) {
                if (!t[a]) {
                    var l = "function" == typeof require && require;
                    if (!c && l) return l(a, !0);
                    if (r) return r(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var s = n[a] = {
                    exports: {}
                };
                t[a][0].call(s.exports, function(e) {
                    var n = t[a][1][e];
                    return i(n ? n : e)
                }, s, s.exports, e, t, n, o)
            }
            return n[a].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
        return i
    }({
        1: [function(e, t, n) {
            function o(e, t) {
                for (; e && e.nodeType !== i;) {
                    if (e.matches(t)) return e;
                    e = e.parentNode
                }
            }
            var i = 9;
            if (Element && !Element.prototype.matches) {
                var r = Element.prototype;
                r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
            }
            t.exports = o
        }, {}],
        2: [function(e, t, n) {
            function o(e, t, n, o, r) {
                var a = i.apply(this, arguments);
                return e.addEventListener(n, a, r), {
                    destroy: function() {
                        e.removeEventListener(n, a, r)
                    }
                }
            }

            function i(e, t, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, t), n.delegateTarget && o.call(e, n)
                }
            }
            var r = e("./closest");
            t.exports = o
        }, {
            "./closest": 1
        }],
        3: [function(e, t, n) {
            n.node = function(e) {
                return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
            }, n.nodeList = function(e) {
                var t = Object.prototype.toString.call(e);
                return void 0 !== e && ("[object NodeList]" === t || "[object HTMLCollection]" === t) && "length" in e && (0 === e.length || n.node(e[0]))
            }, n.string = function(e) {
                return "string" == typeof e || e instanceof String
            }, n.fn = function(e) {
                var t = Object.prototype.toString.call(e);
                return "[object Function]" === t
            }
        }, {}],
        4: [function(e, t, n) {
            function o(e, t, n) {
                if (!e && !t && !n) throw new Error("Missing required arguments");
                if (!c.string(t)) throw new TypeError("Second argument must be a String");
                if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
                if (c.node(e)) return i(e, t, n);
                if (c.nodeList(e)) return r(e, t, n);
                if (c.string(e)) return a(e, t, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function i(e, t, n) {
                return e.addEventListener(t, n), {
                    destroy: function() {
                        e.removeEventListener(t, n)
                    }
                }
            }

            function r(e, t, n) {
                return Array.prototype.forEach.call(e, function(e) {
                    e.addEventListener(t, n)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(e, function(e) {
                            e.removeEventListener(t, n)
                        })
                    }
                }
            }

            function a(e, t, n) {
                return l(document.body, e, t, n)
            }
            var c = e("./is"),
                l = e("delegate");
            t.exports = o
        }, {
            "./is": 3,
            delegate: 2
        }],
        5: [function(e, t, n) {
            function o(e) {
                var t;
                if ("SELECT" === e.nodeName) e.focus(), t = e.value;
                else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                    var n = e.hasAttribute("readonly");
                    n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value
                } else {
                    e.hasAttribute("contenteditable") && e.focus();
                    var o = window.getSelection(),
                        i = document.createRange();
                    i.selectNodeContents(e), o.removeAllRanges(), o.addRange(i), t = o.toString()
                }
                return t
            }
            t.exports = o
        }, {}],
        6: [function(e, t, n) {
            function o() {}
            o.prototype = {
                on: function(e, t, n) {
                    var o = this.e || (this.e = {});
                    return (o[e] || (o[e] = [])).push({
                        fn: t,
                        ctx: n
                    }), this
                },
                once: function(e, t, n) {
                    function o() {
                        i.off(e, o), t.apply(n, arguments)
                    }
                    var i = this;
                    return o._ = t, this.on(e, o, n)
                },
                emit: function(e) {
                    var t = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[e] || []).slice(),
                        o = 0,
                        i = n.length;
                    for (o; o < i; o++) n[o].fn.apply(n[o].ctx, t);
                    return this
                },
                off: function(e, t) {
                    var n = this.e || (this.e = {}),
                        o = n[e],
                        i = [];
                    if (o && t)
                        for (var r = 0, a = o.length; r < a; r++) o[r].fn !== t && o[r].fn._ !== t && i.push(o[r]);
                    return i.length ? n[e] = i : delete n[e], this
                }
            }, t.exports = o
        }, {}],
        7: [function(t, n, o) {
            ! function(i, r) {
                if ("function" == typeof e && e.amd) e(["module", "select"], r);
                else if ("undefined" != typeof o) r(n, t("select"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.select), i.clipboardAction = a.exports
                }
            }(this, function(e, t) {
                "use strict";

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function o(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }
                var i = n(t),
                    r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    },
                    a = function() {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var o = t[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                            }
                        }
                        return function(t, n, o) {
                            return n && e(t.prototype, n), o && e(t, o), t
                        }
                    }(),
                    c = function() {
                        function e(t) {
                            o(this, e), this.resolveOptions(t), this.initSelection()
                        }
                        return a(e, [{
                            key: "resolveOptions",
                            value: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = t.action, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                            }
                        }, {
                            key: "initSelection",
                            value: function e() {
                                this.text ? this.selectFake() : this.target && this.selectTarget()
                            }
                        }, {
                            key: "selectFake",
                            value: function e() {
                                var t = this,
                                    n = "rtl" == document.documentElement.getAttribute("dir");
                                this.removeFake(), this.fakeHandlerCallback = function() {
                                    return t.removeFake()
                                }, this.fakeHandler = document.body.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";
                                var o = window.pageYOffset || document.documentElement.scrollTop;
                                this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                            }
                        }, {
                            key: "removeFake",
                            value: function e() {
                                this.fakeHandler && (document.body.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                            }
                        }, {
                            key: "selectTarget",
                            value: function e() {
                                this.selectedText = (0, i.default)(this.target), this.copyText()
                            }
                        }, {
                            key: "copyText",
                            value: function e() {
                                var t = void 0;
                                try {
                                    t = document.execCommand(this.action)
                                } catch (e) {
                                    t = !1
                                }
                                this.handleResult(t)
                            }
                        }, {
                            key: "handleResult",
                            value: function e(t) {
                                this.emitter.emit(t ? "success" : "error", {
                                    action: this.action,
                                    text: this.selectedText,
                                    trigger: this.trigger,
                                    clearSelection: this.clearSelection.bind(this)
                                })
                            }
                        }, {
                            key: "clearSelection",
                            value: function e() {
                                this.target && this.target.blur(), window.getSelection().removeAllRanges()
                            }
                        }, {
                            key: "destroy",
                            value: function e() {
                                this.removeFake()
                            }
                        }, {
                            key: "action",
                            set: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                                if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            },
                            get: function e() {
                                return this._action
                            }
                        }, {
                            key: "target",
                            set: function e(t) {
                                if (void 0 !== t) {
                                    if (!t || "object" !== ("undefined" == typeof t ? "undefined" : r(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = t
                                }
                            },
                            get: function e() {
                                return this._target
                            }
                        }]), e
                    }();
                e.exports = c
            })
        }, {
            select: 5
        }],
        8: [function(t, n, o) {
            ! function(i, r) {
                if ("function" == typeof e && e.amd) e(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if ("undefined" != typeof o) r(n, t("./clipboard-action"), t("tiny-emitter"), t("good-listener"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports
                }
            }(this, function(e, t, n, o) {
                "use strict";

                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }

                function a(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }

                function c(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }

                function l(e, t) {
                    var n = "data-clipboard-" + e;
                    if (t.hasAttribute(n)) return t.getAttribute(n)
                }
                var u = i(t),
                    s = i(n),
                    f = i(o),
                    d = function() {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var o = t[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                            }
                        }
                        return function(t, n, o) {
                            return n && e(t.prototype, n), o && e(t, o), t
                        }
                    }(),
                    h = function(e) {
                        function t(e, n) {
                            r(this, t);
                            var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                            return o.resolveOptions(n), o.listenClick(e), o
                        }
                        return c(t, e), d(t, [{
                            key: "resolveOptions",
                            value: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText
                            }
                        }, {
                            key: "listenClick",
                            value: function e(t) {
                                var n = this;
                                this.listener = (0, f.default)(t, "click", function(e) {
                                    return n.onClick(e)
                                })
                            }
                        }, {
                            key: "onClick",
                            value: function e(t) {
                                var n = t.delegateTarget || t.currentTarget;
                                this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new u.default({
                                    action: this.action(n),
                                    target: this.target(n),
                                    text: this.text(n),
                                    trigger: n,
                                    emitter: this
                                })
                            }
                        }, {
                            key: "defaultAction",
                            value: function e(t) {
                                return l("action", t)
                            }
                        }, {
                            key: "defaultTarget",
                            value: function e(t) {
                                var n = l("target", t);
                                if (n) return document.querySelector(n)
                            }
                        }, {
                            key: "defaultText",
                            value: function e(t) {
                                return l("text", t)
                            }
                        }, {
                            key: "destroy",
                            value: function e() {
                                this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                            }
                        }], [{
                            key: "isSupported",
                            value: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                    n = "string" == typeof t ? [t] : t,
                                    o = !!document.queryCommandSupported;
                                return n.forEach(function(e) {
                                    o = o && !!document.queryCommandSupported(e)
                                }), o
                            }
                        }]), t
                    }(s.default);
                e.exports = h
            })
        }, {
            "./clipboard-action": 7,
            "good-listener": 4,
            "tiny-emitter": 6
        }]
    }, {}, [8])(8)
});
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 *
 * http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript&plugins=toolbar+previewer-base+previewer-color+copy-to-clipboard
 */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function() {
        var e = /\blang(?:uage)?-(\w+)\b/i,
            t = 0,
            n = _self.Prism = {
                manual: _self.Prism && _self.Prism.manual,
                util: {
                    encode: function(e) {
                        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }), e.__id
                    },
                    clone: function(e) {
                        var t = n.util.type(e);
                        switch (t) {
                            case "Object":
                                var a = {};
                                for (var r in e) e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                                return a;
                            case "Array":
                                return e.map && e.map(function(e) {
                                    return n.util.clone(e)
                                })
                        }
                        return e
                    }
                },
                languages: {
                    extend: function(e, t) {
                        var a = n.util.clone(n.languages[e]);
                        for (var r in t) a[r] = t[r];
                        return a
                    },
                    insertBefore: function(e, t, a, r) {
                        r = r || n.languages;
                        var l = r[e];
                        if (2 == arguments.length) {
                            a = arguments[1];
                            for (var i in a) a.hasOwnProperty(i) && (l[i] = a[i]);
                            return l
                        }
                        var o = {};
                        for (var s in l)
                            if (l.hasOwnProperty(s)) {
                                if (s == t)
                                    for (var i in a) a.hasOwnProperty(i) && (o[i] = a[i]);
                                o[s] = l[s]
                            }
                        return n.languages.DFS(n.languages, function(t, n) {
                            n === r[e] && t != e && (this[t] = o)
                        }), r[e] = o
                    },
                    DFS: function(e, t, a, r) {
                        r = r || {};
                        for (var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), "Object" !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)))
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    var a = {
                        callback: t,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    n.hooks.run("before-highlightall", a);
                    for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) n.highlightElement(r, e === !0, a.callback)
                },
                highlightElement: function(t, a, r) {
                    for (var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;
                    o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
                    var s = t.textContent,
                        u = {
                            element: t,
                            language: l,
                            grammar: i,
                            code: s
                        };
                    if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (u.element.textContent = u.code), n.hooks.run("complete", u), void 0;
                    if (n.hooks.run("before-highlight", u), a && _self.Worker) {
                        var g = new Worker(n.filename);
                        g.onmessage = function(e) {
                            u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                        }, g.postMessage(JSON.stringify({
                            language: u.language,
                            code: u.code,
                            immediateClose: !0
                        }))
                    } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                },
                highlight: function(e, t, r) {
                    var l = n.tokenize(e, t);
                    return a.stringify(n.util.encode(l), r)
                },
                tokenize: function(e, t) {
                    var a = n.Token,
                        r = [e],
                        l = t.rest;
                    if (l) {
                        for (var i in l) t[i] = l[i];
                        delete t.rest
                    }
                    e: for (var i in t)
                        if (t.hasOwnProperty(i) && t[i]) {
                            var o = t[i];
                            o = "Array" === n.util.type(o) ? o : [o];
                            for (var s = 0; s < o.length; ++s) {
                                var u = o[s],
                                    g = u.inside,
                                    c = !!u.lookbehind,
                                    h = !!u.greedy,
                                    f = 0,
                                    d = u.alias;
                                if (h && !u.pattern.global) {
                                    var p = u.pattern.toString().match(/[imuy]*$/)[0];
                                    u.pattern = RegExp(u.pattern.source, p + "g")
                                }
                                u = u.pattern || u;
                                for (var m = 0, y = 0; m < r.length; y += r[m].length, ++m) {
                                    var v = r[m];
                                    if (r.length > e.length) break e;
                                    if (!(v instanceof a)) {
                                        u.lastIndex = 0;
                                        var b = u.exec(v),
                                            k = 1;
                                        if (!b && h && m != r.length - 1) {
                                            if (u.lastIndex = y, b = u.exec(e), !b) break;
                                            for (var w = b.index + (c ? b[1].length : 0), _ = b.index + b[0].length, P = m, A = y, j = r.length; j > P && _ > A; ++P) A += r[P].length, w >= A && (++m, y = A);
                                            if (r[m] instanceof a || r[P - 1].greedy) continue;
                                            k = P - m, v = e.slice(y, A), b.index -= y
                                        }
                                        if (b) {
                                            c && (f = b[1].length);
                                            var w = b.index + f,
                                                b = b[0].slice(f),
                                                _ = w + b.length,
                                                x = v.slice(0, w),
                                                O = v.slice(_),
                                                S = [m, k];
                                            x && S.push(x);
                                            var N = new a(i, g ? n.tokenize(b, g) : b, d, b, h);
                                            S.push(N), O && S.push(O), Array.prototype.splice.apply(r, S)
                                        }
                                    }
                                }
                            }
                        }
                    return r
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var a = n.hooks.all;
                        a[e] = a[e] || [], a[e].push(t)
                    },
                    run: function(e, t) {
                        var a = n.hooks.all[e];
                        if (a && a.length)
                            for (var r, l = 0; r = a[l++];) r(t)
                    }
                }
            },
            a = n.Token = function(e, t, n, a, r) {
                this.type = e, this.content = t, this.alias = n, this.length = 0 | (a || "").length, this.greedy = !!r
            };
        if (a.stringify = function(e, t, r) {
                if ("string" == typeof e) return e;
                if ("Array" === n.util.type(e)) return e.map(function(n) {
                    return a.stringify(n, t, e)
                }).join("");
                var l = {
                    type: e.type,
                    content: a.stringify(e.content, t, r),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t,
                    parent: r
                };
                if ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias) {
                    var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(l.classes, i)
                }
                n.hooks.run("wrap", l);
                var o = Object.keys(l.attributes).map(function(e) {
                    return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
                }).join(" ");
                return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">"
            }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function(e) {
            var t = JSON.parse(e.data),
                a = t.language,
                r = t.code,
                l = t.immediateClose;
            _self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close()
        }, !1), _self.Prism) : _self.Prism;
        var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return r && (n.filename = r.src, !document.addEventListener || n.manual || r.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?[\w\W]+?\?>/,
    doctype: /<!DOCTYPE[\w\W]+?>/i,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                inside: {
                    punctuation: /[=>"']/
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: {
        pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css"
    }
}), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0
    }],
    string: {
        pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0
    }
}), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\\\|\\?[^\\])*?`/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript"
    }
}), Prism.languages.js = Prism.languages.javascript;
! function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var t = [],
            e = {},
            n = function() {};
        Prism.plugins.toolbar = {};
        var a = Prism.plugins.toolbar.registerButton = function(n, a) {
                var o;
                o = "function" == typeof a ? a : function(t) {
                    var e;
                    return "function" == typeof a.onClick ? (e = document.createElement("button"), e.type = "button", e.addEventListener("click", function() {
                        a.onClick.call(this, t)
                    })) : "string" == typeof a.url ? (e = document.createElement("a"), e.href = a.url) : e = document.createElement("span"), e.textContent = a.text, e
                }, t.push(e[n] = o)
            },
            o = Prism.plugins.toolbar.hook = function(a) {
                var o = a.element.parentNode;
                if (o && /pre/i.test(o.nodeName) && !o.classList.contains("code-toolbar")) {
                    o.classList.add("code-toolbar");
                    var r = document.createElement("div");
                    r.classList.add("toolbar"), document.body.hasAttribute("data-toolbar-order") && (t = document.body.getAttribute("data-toolbar-order").split(",").map(function(t) {
                        return e[t] || n
                    })), t.forEach(function(t) {
                        var e = t(a);
                        if (e) {
                            var n = document.createElement("div");
                            n.classList.add("toolbar-item"), n.appendChild(e), r.appendChild(n)
                        }
                    }), o.appendChild(r)
                }
            };
        a("label", function(t) {
            var e = t.element.parentNode;
            if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
                var n, a, o = e.getAttribute("data-label");
                try {
                    a = document.querySelector("template#" + o)
                } catch (r) {}
                return a ? n = a.content : (e.hasAttribute("data-url") ? (n = document.createElement("a"), n.href = e.getAttribute("data-url")) : n = document.createElement("span"), n.textContent = o), n
            }
        }), Prism.hooks.add("complete", o)
    }
}();
! function() {
    if ("undefined" != typeof self && self.Prism && self.document && Function.prototype.bind) {
        var t = function(t) {
                var e = 0,
                    s = 0,
                    i = t;
                if (i.parentNode) {
                    do e += i.offsetLeft, s += i.offsetTop; while ((i = i.offsetParent) && i.nodeType < 9);
                    i = t;
                    do e -= i.scrollLeft, s -= i.scrollTop; while ((i = i.parentNode) && !/body/i.test(i.nodeName))
                }
                return {
                    top: s,
                    right: innerWidth - e - t.offsetWidth,
                    bottom: innerHeight - s - t.offsetHeight,
                    left: e
                }
            },
            e = /(?:^|\s)token(?=$|\s)/,
            s = /(?:^|\s)active(?=$|\s)/g,
            i = /(?:^|\s)flipped(?=$|\s)/g,
            o = function(t, e, s, i) {
                this._elt = null, this._type = t, this._clsRegexp = RegExp("(?:^|\\s)" + t + "(?=$|\\s)"), this._token = null, this.updater = e, this._mouseout = this.mouseout.bind(this), this.initializer = i;
                var n = this;
                s || (s = ["*"]), "Array" !== Prism.util.type(s) && (s = [s]), s.forEach(function(t) {
                    "string" != typeof t && (t = t.lang), o.byLanguages[t] || (o.byLanguages[t] = []), o.byLanguages[t].indexOf(n) < 0 && o.byLanguages[t].push(n)
                }), o.byType[t] = this
            };
        o.prototype.init = function() {
            this._elt || (this._elt = document.createElement("div"), this._elt.className = "prism-previewer prism-previewer-" + this._type, document.body.appendChild(this._elt), this.initializer && this.initializer())
        }, o.prototype.check = function(t) {
            do
                if (e.test(t.className) && this._clsRegexp.test(t.className)) break; while (t = t.parentNode);
            t && t !== this._token && (this._token = t, this.show())
        }, o.prototype.mouseout = function() {
            this._token.removeEventListener("mouseout", this._mouseout, !1), this._token = null, this.hide()
        }, o.prototype.show = function() {
            if (this._elt || this.init(), this._token)
                if (this.updater.call(this._elt, this._token.textContent)) {
                    this._token.addEventListener("mouseout", this._mouseout, !1);
                    var e = t(this._token);
                    this._elt.className += " active", e.top - this._elt.offsetHeight > 0 ? (this._elt.className = this._elt.className.replace(i, ""), this._elt.style.top = e.top + "px", this._elt.style.bottom = "") : (this._elt.className += " flipped", this._elt.style.bottom = e.bottom + "px", this._elt.style.top = ""), this._elt.style.left = e.left + Math.min(200, this._token.offsetWidth / 2) + "px"
                } else this.hide()
        }, o.prototype.hide = function() {
            this._elt.className = this._elt.className.replace(s, "")
        }, o.byLanguages = {}, o.byType = {}, o.initEvents = function(t, e) {
            var s = [];
            o.byLanguages[e] && (s = s.concat(o.byLanguages[e])), o.byLanguages["*"] && (s = s.concat(o.byLanguages["*"])), t.addEventListener("mouseover", function(t) {
                var e = t.target;
                s.forEach(function(t) {
                    t.check(e)
                })
            }, !1)
        }, Prism.plugins.Previewer = o, Prism.hooks.add("after-highlight", function(t) {
            (o.byLanguages["*"] || o.byLanguages[t.language]) && o.initEvents(t.element, t.language)
        })
    }
}();
! function() {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var e = {
            css: !0,
            less: !0,
            markup: {
                lang: "markup",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
            },
            sass: [{
                lang: "sass",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }, {
                lang: "sass",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }],
            scss: !0,
            stylus: [{
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
        };
        Prism.hooks.add("before-highlight", function(a) {
            if (a.language && e[a.language] && !e[a.language].initialized) {
                var i = e[a.language];
                "Array" !== Prism.util.type(i) && (i = [i]), i.forEach(function(i) {
                    var r, l, n, s;
                    i === !0 ? (r = "important", l = a.language, i = a.language) : (r = i.before || "important", l = i.inside || i.lang, n = i.root || Prism.languages, s = i.skip, i = a.language), !s && Prism.languages[i] && (Prism.languages.insertBefore(l, r, {
                        color: /\B#(?:[0-9a-f]{3}){1,2}\b|\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B|\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i
                    }, n), a.grammar = Prism.languages[i], e[a.language] = {
                        initialized: !0
                    })
                })
            }
        }), Prism.plugins.Previewer && new Prism.plugins.Previewer("color", function(e) {
            return this.style.backgroundColor = "", this.style.backgroundColor = e, !!this.style.backgroundColor
        })
    }
}();
! function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        if (!Prism.plugins.toolbar) return console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."), void 0;
        var o = window.Clipboard || void 0;
        o || "function" != typeof require || (o = require("clipboard"));
        var e = [];
        if (!o) {
            var t = document.createElement("script"),
                n = document.querySelector("head");
            t.onload = function() {
                if (o = window.Clipboard)
                    for (; e.length;) e.pop()()
            }, t.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.8/clipboard.min.js", n.appendChild(t)
        }
        Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(t) {
            function n() {
                var e = new o(i, {
                    text: function() {
                        return t.code
                    }
                });
                e.on("success", function() {
                    i.textContent = "Copied!", r()
                }), e.on("error", function() {
                    i.textContent = "Press Ctrl+C to copy", r()
                })
            }

            function r() {
                setTimeout(function() {
                    i.textContent = "Copy"
                }, 5e3)
            }
            var i = document.createElement("a");
            return i.textContent = "Copy", o ? n() : e.push(n), i
        })
    }
}();


Prism.plugins.toolbar.registerButton('select-code', function(env) {
    var button = document.createElement('button');
    button.innerHTML = 'Select Code';

    button.addEventListener('click', function() {
        // Source: http://stackoverflow.com/a/11128179/2757940
        if (document.body.createTextRange) { // ms
            var range = document.body.createTextRange();
            range.moveToElementText(env.element);
            range.select();
        } else if (window.getSelection) { // moz, opera, webkit
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(env.element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    return button;
});
$(document).ready(function() {

    var myTimer;

    $(".colour-button").mouseover(function() {
        $(this).addClass("on");
    });
    $('.colour-button').on("focus", function() {
        $(this).addClass("on");
    });
    $(".colour-button").mouseout(function() {
        $(this).removeClass("on");
    });
    $('.colour-button').on("blur", function() {
        $(this).removeClass("on");
    });
    $('.colour-button').on("click", function() {

        var myButton = $(this);
        myButton.removeClass("on");
        myTimer = setTimeout(function() {
            myButton.addClass("on");
        }, 150);
    });

});

jQuery(document).ready(function() {

    unpackSVG();

    function unpackSVG() {

        $('img.svg-icon').each(function() {

            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });

    }

});

jQuery(document).ready(function() {
    // wrap elements in anchors for accessibility
    $(".modal-me").wrap('<a class="anchor-wrapper" href="#"> </a>');
    $(".anchor-wrapper").hover(function() {
        $(this).find("img").addClass("on");
    }, function() {
        $(this).find("img").removeClass("on");
    });
    $(".anchor-wrapper").focus(function() {
        $(this).find("img").addClass("on");
    });
    $(".anchor-wrapper").blur(function() {
        $(this).find("img").removeClass("on");
    });
    $(".modal-close-button").blur(function() {
        $(this).focus();
    });
    var modal_home;
    $(".anchor-wrapper").click(function() {
        modal_home = $(this).find(".modal-me");
        $(this).css('cursor', 'default');
        $(this).find(".modal-mask").addClass("on");
        $(this).find(".modal-close-button").focus();
        // move modal-mask to html
        $(this).find(".modal-mask").detach().appendTo('body').css('z-index', '9999');
    });
    $(".modal-close-button").click(function() {
        event.stopPropagation();
        // put modal-mask home again
        $('body > .modal-mask').detach().appendTo(modal_home);
        $(this).parent().parent().removeClass("on");
        $(this).parent().parent().parent().css('cursor', 'pointer');
        $(modal_home).parent().focus();
    });
});

$(document).ready(function() {
    // search through the document and obtain the css link via the file name
    function getCSSLink(currentIframe) {
        // search through all links in head
        $('html head link').each(function() {
            // only get link with rel="stylesheet"
            if ($(this).attr('rel') === 'stylesheet') {
                // get the href of the <link> and check for the name
                var link = $(this).attr('href');
                var linkSplit = link.split('/');
                var cssName = linkSplit[linkSplit.length - 1];
                if (cssName.match(/RMITOnlineOpenEdx.css/gi) || cssName.match(/custom/gi)) {
                    insertCSS(link, currentIframe);
                    //console.log(cssName);
                }

            }
        });
    }

    // when the iframe loads, insert the <link> with the href for the custom css
    function insertCSS(href, currentIframe) {
        currentIframe
            .contents().find("head")
            .append($('<link rel="stylesheet" type="text/css" href="' + href + '">'));
    }

    // check if visual editor iframe is loaded
    var checkXblockLoaded = setInterval(function() {
        if ($('.xblock-header .action-edit').length) {
            //console.log('xblock loaded');
            $('.xblock-header .action-edit').off('click');
            $('.xblock-header .action-edit').on('click', function() {
                //console.log('click edit btn');
                //console.log($('.modal-window .xblock iframe'));

                var checkIframeLoaded = setInterval(function() {
                    if ($('.modal-window .xblock iframe').length) {
                        //console.log('iframe exist');
                        //                        $('.modal-window .xblock iframe').on('load', function(){
                        //console.log('Iframe loaded');
                        var currentIframe = $('.modal-window .xblock iframe');
                        getCSSLink(currentIframe);
                        //                        });
                        clearInterval(checkIframeLoaded);
                    }
                }, 200);

            });

            clearInterval(checkXblockLoaded);
        }
    }, 500);
});
