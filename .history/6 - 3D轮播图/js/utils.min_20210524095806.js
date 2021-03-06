"use strict";
var _slicedToArray = (function() {
        function t(t, e) {
            var n = [],
                o = !0,
                r = !1,
                i = void 0;
            try {
                for (
                    var u, c = t[Symbol.iterator]();
                    !(o = (u = c.next()).done) && (n.push(u.value), !e || n.length !== e);
                    o = !0
                );
            } catch (t) {
                (r = !0), (i = t);
            } finally {
                try {
                    !o && c.return && c.return();
                } finally {
                    if (r) throw i;
                }
            }
            return n;
        }
        return function(e, n) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return t(e, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    })(),
    _typeof =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(t) {
                  return typeof t;
              }
            : function(t) {
                  return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
              };
!(function() {
    var t = {},
        e = t.toString,
        n = t.hasOwnProperty,
        o = n.toString,
        r = o.call(Object),
        i = Object.getPrototypeOf,
        u = function(t) {
            return (
                "function" == typeof t &&
                "number" != typeof t.nodeType &&
                "function" != typeof t.item
            );
        },
        c = function(t) {
            return null != t && t === t.window;
        },
        f = function(t) {
            if (null == t) return t + "";
            var n = void 0 === t ? "undefined" : _typeof(t);
            if (/(object|function)/i.test(n)) {
                n = e.call(t);
                var o = n.match(/^\[object (\w+)\]$/) || [],
                    r = _slicedToArray(o, 2),
                    i = r[1];
                return (void 0 === i ? "object" : i).toLowerCase();
            }
            return n;
        },
        a = function(t) {
            var u = void 0,
                c = void 0;
            return (
                !(!t || "[object Object]" !== e.call(t)) &&
                (!(u = i(t)) ||
                    ("function" == typeof (c = n.call(u, "constructor") && u.constructor) &&
                        o.call(c) === r))
            );
        },
        l = function(t) {
            if (!t || !/(object|function)/i.test(void 0 === t ? "undefined" : _typeof(t)))
                return !1;
            var e = Object.keys(t);
            return (
                "undefined" != typeof Symbol && (e = e.concat(Object.getOwnPropertySymbols(t))),
                0 === e.length
            );
        },
        y = function(t) {
            var e = f(t);
            return ("number" === e || "string" === e) && !isNaN(t);
        },
        d = function(t) {
            var e = !!t && "length" in t && t.length,
                n = f(t);
            return (
                !u(t) &&
                !c(t) &&
                ("array" === n || 0 === e || ("number" == typeof e && e > 0 && e - 1 in t))
            );
        },
        p = function(t, e, n) {
            if ("function" != typeof t) throw new TypeError("func must be an function");
            "boolean" == typeof e && ((n = e), (e = 300)),
                "number" != typeof e && (e = 300),
                "boolean" != typeof n && (n = !1);
            var o = void 0;
            return function() {
                for (var r = arguments.length, i = Array(r), u = 0; u < r; u++) i[u] = arguments[u];
                var c = !o && n,
                    f = this,
                    a = void 0;
                return (
                    o && (clearTimeout(o), (o = null)),
                    (o = setTimeout(function() {
                        o && (clearTimeout(o), (o = null)),
                            n || (a = t.call.apply(t, [f].concat(i)));
                    }, e)),
                    c && (a = t.call.apply(t, [f].concat(i))),
                    a
                );
            };
        },
        s = function(t, e) {
            if ("function" != typeof t) throw new TypeError("func must be an function");
            "number" != typeof e && (e = 300);
            var n = void 0,
                o = 0;
            return function() {
                for (var r = arguments.length, i = Array(r), u = 0; u < r; u++) i[u] = arguments[u];
                var c = +new Date(),
                    f = e - (c - o),
                    a = this,
                    l = void 0;
                return (
                    f <= 0
                        ? (n && (clearTimeout(n), (n = null)),
                          (l = t.call.apply(t, [a].concat(i))),
                          (o = c))
                        : n ||
                          (n = setTimeout(function() {
                              n && (clearTimeout(n), (n = null)),
                                  (l = t.call.apply(t, [a].concat(i))),
                                  (o = +new Date());
                          }, f)),
                    l
                );
            };
        },
        b = function(t, e) {
            if (null == t || "object" !== (void 0 === t ? "undefined" : _typeof(t)))
                throw new TypeError("obj must be an array/like-array/object");
            if (("function" != typeof e && (e = function() {}), d(t)))
                for (
                    var n = 0, o = t.length, r = void 0;
                    n < o && ((r = t[n]), !1 !== e.call(r, r, n));
                    n++
                );
            else {
                var i = Object.keys(t),
                    u = 0,
                    c = i.length,
                    f = void 0,
                    a = void 0;
                for (
                    "undefined" != typeof Symbol && (i = i.concat(Object.getOwnPropertySymbols(t)));
                    u < c && ((f = i[u]), (a = t[f]), !1 !== e.call(a, a, f));
                    u++
                );
            }
            return t;
        },
        v = function t() {
            var e = void 0,
                n = arguments[0] || {},
                o = 1,
                r = arguments.length,
                i = !1,
                c = arguments[r - 1];
            for (
                "boolean" == typeof n && ((i = n), (n = arguments[o] || {}), o++),
                    Array.isArray(c) && c.treated ? r-- : ((c = []), (c.treated = !0)),
                    "object" === (void 0 === n ? "undefined" : _typeof(n)) || u(n) || (n = {});
                o < r;
                o++
            )
                if (null != (e = arguments[o])) {
                    if (c.includes(e)) return e;
                    c.push(e),
                        b(e, function(e, o) {
                            var r = Array.isArray(e),
                                u = a(e),
                                f = n[o];
                            i && e && (r || u)
                                ? (r && !Array.isArray(f) && (f = []),
                                  u && !a(f) && (f = {}),
                                  (n[o] = t(i, f, e, c)))
                                : void 0 !== e && (n[o] = e);
                        });
                }
            return n;
        },
        m = function t() {
            var e = arguments[0],
                n = !1,
                o = void 0,
                r = void 0,
                i = void 0,
                u = void 0,
                c = void 0,
                l = arguments[arguments.length - 1];
            return (
                (Array.isArray(l) && l.treated) || ((l = []), (l.treated = !0)),
                "boolean" == typeof e && ((n = e), (e = arguments[1])),
                l.indexOf(e) > -1
                    ? e
                    : (l.push(e),
                      (o = f(e)),
                      (r = Array.isArray(e)),
                      (i = a(e)),
                      null == e
                          ? e
                          : ((c = e.constructor),
                            /^(regexp|date)$/i.test(o)
                                ? new c(e)
                                : /^(error)$/i.test(o)
                                ? new c(e.message)
                                : /^(function|generatorfunction)$/i.test(o)
                                ? function() {
                                      var t = Array.from(arguments);
                                      return e.apply(this, t);
                                  }
                                : r || i
                                ? ((u = new c()),
                                  b(e, function(e, o) {
                                      if (n) return void (u[o] = t(n, e, l));
                                      u[o] = e;
                                  }),
                                  u)
                                : e))
            );
        },
        w = {
            toType: f,
            isFunction: u,
            isWindow: c,
            isPlainObject: a,
            isEmptyObject: l,
            isNumeric: y,
            isArrayLike: d,
            debounce: p,
            throttle: s,
            each: b,
            merge: v,
            clone: m,
        },
        h = window.$;
    (w.noConflict = function() {
        return window.$ === w && (window.$ = h), w;
    }),
        "undefined" != typeof window && (window.utils = window.$ = w),
        "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
            "object" === _typeof(module.exports) &&
            (module.exports = w);
})();
