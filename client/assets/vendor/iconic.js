/*!
 * iconic.js v0.4.0 - The Iconic JavaScript library
 * Copyright (c) 2014 Waybury - http://useiconic.com
 */

! function(a) {
    "object" == typeof exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : "undefined" != typeof window ? window.IconicJS = a() : "undefined" != typeof global ? global.IconicJS = a() : "undefined" != typeof self && (self.IconicJS = a())
}(function() {
    var a;
    return function b(a, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {
                    exports: {}
                };
                a[g][0].call(j.exports, function(b) {
                    var c = a[g][1][b];
                    return e(c ? c : b)
                }, j, j.exports, b, a, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(a, b) {
            var c = (a("./modules/polyfills"), a("./modules/svg-injector")),
                d = a("./modules/extend"),
                e = a("./modules/responsive"),
                f = a("./modules/position"),
                g = a("./modules/container"),
                h = a("./modules/log"),
                i = {},
                j = window.iconicSmartIconApis = {},
                k = ("file:" === window.location.protocol, 0),
                l = function(a, b, e) {
                    b = d({}, i, b || {});
                    var f = {
                        evalScripts: b.evalScripts,
                        pngFallback: b.pngFallback
                    };
                    f.each = function(a) {
                        if (a)
                            if ("string" == typeof a) h.debug(a);
                            else if (a instanceof SVGSVGElement) {
                            var c = a.getAttribute("data-icon");
                            if (c && j[c]) {
                                var d = j[c](a);
                                for (var e in d) a[e] = d[e]
                            }
                            /iconic-bg-/.test(a.getAttribute("class")) && g.addBackground(a), m(a), k++, b && b.each && "function" == typeof b.each && b.each(a)
                        }
                    }, "string" == typeof a && (a = document.querySelectorAll(a)), c(a, f, e)
                },
                m = function(a) {
                    var b = [];
                    a ? "string" == typeof a ? b = document.querySelectorAll(a) : void 0 !== a.length ? b = a : "object" == typeof a && b.push(a) : b = document.querySelectorAll("svg.iconic"), Array.prototype.forEach.call(b, function(a) {
                        a instanceof SVGSVGElement && (a.update && a.update(), e.refresh(a), f.refresh(a))
                    })
                },
                n = function() {
                    i.debug && console.time && console.time("autoInjectSelector - " + i.autoInjectSelector);
                    var a = k;
                    l(i.autoInjectSelector, {}, function() {
                        if (i.debug && console.timeEnd && console.timeEnd("autoInjectSelector - " + i.autoInjectSelector), h.debug("AutoInjected: " + (k - a)), e.refreshAll(), i.autoInjectDone && "function" == typeof i.autoInjectDone) {
                            var b = k - a;
                            i.autoInjectDone(b)
                        }
                    })
                },
                o = function(a) {
                    a && "" !== a && "complete" !== document.readyState ? document.addEventListener("DOMContentLoaded", n) : document.removeEventListener("DOMContentLoaded", n)
                },
                p = function(a) {
                    return a = a || {}, d(i, a), o(i.autoInjectSelector), h.enableDebug(i.debug), window._Iconic ? window._Iconic : {
                        inject: l,
                        update: m,
                        smartIconApis: j,
                        svgInjectedCount: k
                    }
                };
            b.exports = p, window._Iconic = new p({
                autoInjectSelector: "img.iconic",
                evalScripts: "once",
                pngFallback: !1,
                each: null,
                autoInjectDone: null,
                debug: !1
            })
        }, {
            "./modules/container": 2,
            "./modules/extend": 3,
            "./modules/log": 4,
            "./modules/polyfills": 5,
            "./modules/position": 6,
            "./modules/responsive": 7,
            "./modules/svg-injector": 8
        }],
        2: [function(a, b) {
            var c = function(a) {
                var b = a.getAttribute("class").split(" "),
                    c = -1 !== b.indexOf("iconic-fluid"),
                    d = [],
                    e = ["iconic-bg"];
                Array.prototype.forEach.call(b, function(a) {
                    switch (a) {
                        case "iconic-sm":
                        case "iconic-md":
                        case "iconic-lg":
                            d.push(a), c || e.push(a.replace(/-/, "-bg-"));
                            break;
                        case "iconic-fluid":
                            d.push(a), e.push(a.replace(/-/, "-bg-"));
                            break;
                        case "iconic-bg-circle":
                        case "iconic-bg-rounded-rect":
                        case "iconic-bg-badge":
                            e.push(a);
                            break;
                        default:
                            d.push(a)
                    }
                }), a.setAttribute("class", d.join(" "));
                var f = a.parentNode,
                    g = Array.prototype.indexOf.call(f.childNodes, a),
                    h = document.createElement("span");
                h.setAttribute("class", e.join(" ")), h.appendChild(a), f.insertBefore(h, f.childNodes[g])
            };
            b.exports = {
                addBackground: c
            }
        }, {}],
        3: [function(a, b) {
            b.exports = function(a) {
                return Array.prototype.forEach.call(Array.prototype.slice.call(arguments, 1), function(b) {
                    if (b)
                        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
                }), a
            }
        }, {}],
        4: [function(a, b) {
            var c = !1,
                d = function(a) {
                    console && console.log && console.log(a)
                },
                e = function(a) {
                    d("Iconic INFO: " + a)
                },
                f = function(a) {
                    d("Iconic WARNING: " + a)
                },
                g = function(a) {
                    c && d("Iconic DEBUG: " + a)
                },
                h = function(a) {
                    c = a
                };
            b.exports = {
                info: e,
                warn: f,
                debug: g,
                enableDebug: h
            }
        }, {}],
        5: [function() {
            Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
                    "use strict";
                    if (void 0 === this || null === this || "function" != typeof a) throw new TypeError;
                    var c, d = this.length >>> 0;
                    for (c = 0; d > c; ++c) c in this && a.call(b, this[c], c, this)
                }),
                function() {
                    if (Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
                            this.returnValue = !1
                        }), Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
                            this.cancelBubble = !0
                        }), !Element.prototype.addEventListener) {
                        var a = [],
                            b = function(b, c) {
                                var d = this,
                                    e = function(a) {
                                        a.target = a.srcElement, a.currentTarget = d, c.handleEvent ? c.handleEvent(a) : c.call(d, a)
                                    };
                                if ("DOMContentLoaded" == b) {
                                    var f = function(a) {
                                        "complete" == document.readyState && e(a)
                                    };
                                    if (document.attachEvent("onreadystatechange", f), a.push({
                                            object: this,
                                            type: b,
                                            listener: c,
                                            wrapper: f
                                        }), "complete" == document.readyState) {
                                        var g = new Event;
                                        g.srcElement = window, f(g)
                                    }
                                } else this.attachEvent("on" + b, e), a.push({
                                    object: this,
                                    type: b,
                                    listener: c,
                                    wrapper: e
                                })
                            },
                            c = function(b, c) {
                                for (var d = 0; d < a.length;) {
                                    var e = a[d];
                                    if (e.object == this && e.type == b && e.listener == c) {
                                        "DOMContentLoaded" == b ? this.detachEvent("onreadystatechange", e.wrapper) : this.detachEvent("on" + b, e.wrapper);
                                        break
                                    }++d
                                }
                            };
                        Element.prototype.addEventListener = b, Element.prototype.removeEventListener = c, HTMLDocument && (HTMLDocument.prototype.addEventListener = b, HTMLDocument.prototype.removeEventListener = c), Window && (Window.prototype.addEventListener = b, Window.prototype.removeEventListener = c)
                    }
                }()
        }, {}],
        6: [function(a, b) {
            var c = function(a) {
                var b = a.getAttribute("data-position");
                if (b && "" !== b) {
                    var c, d, e, f, g, h, i, j = a.getAttribute("width"),
                        k = a.getAttribute("height"),
                        l = b.split("-"),
                        m = a.querySelectorAll("g.iconic-container");
                    Array.prototype.forEach.call(m, function(a) {
                        if (c = a.getAttribute("data-width"), d = a.getAttribute("data-height"), c !== j || d !== k) {
                            if (e = a.getAttribute("transform"), f = 1, e) {
                                var b = e.match(/scale\((\d)/);
                                f = b && b[1] ? b[1] : 1
                            }
                            g = Math.floor((j / f - c) / 2), h = Math.floor((k / f - d) / 2), Array.prototype.forEach.call(l, function(a) {
                                switch (a) {
                                    case "top":
                                        h = 0;
                                        break;
                                    case "bottom":
                                        h = k / f - d;
                                        break;
                                    case "left":
                                        g = 0;
                                        break;
                                    case "right":
                                        g = j / f - c;
                                        break;
                                    case "center":
                                        break;
                                    default:
                                        console && console.log && console.log("Unknown position: " + a)
                                }
                            }), i = 0 === h ? g : g + " " + h, i = "translate(" + i + ")", e ? /translate/.test(e) ? e = e.replace(/translate\(.*?\)/, i) : e += " " + i : e = i, a.setAttribute("transform", e)
                        }
                    })
                }
            };
            b.exports = {
                refresh: c
            }
        }, {}],
        7: [function(a, b) {
            var c = /(iconic-sm\b|iconic-md\b|iconic-lg\b)/,
                d = function(a, b) {
                    var c = "undefined" != typeof window.getComputedStyle && window.getComputedStyle(a, null).getPropertyValue(b);
                    return !c && a.currentStyle && (c = a.currentStyle[b.replace(/([a-z])\-([a-z])/, function(a, b, c) {
                        return b + c.toUpperCase()
                    })] || a.currentStyle[b]), c
                },
                e = function(a) {
                    var b = a.style.display;
                    a.style.display = "block";
                    var c = parseFloat(d(a, "width").slice(0, -2)),
                        e = parseFloat(d(a, "height").slice(0, -2));
                    return a.style.display = b, {
                        width: c,
                        height: e
                    }
                },
                f = function() {
                    var a = "/* Iconic Responsive Support Styles */\n.iconic-property-fill, .iconic-property-text {stroke: none !important;}\n.iconic-property-stroke {fill: none !important;}\nsvg.iconic.iconic-fluid {height:100% !important;width:100% !important;}\nsvg.iconic.iconic-sm:not(.iconic-size-md):not(.iconic-size-lg), svg.iconic.iconic-size-sm{width:16px;height:16px;}\nsvg.iconic.iconic-md:not(.iconic-size-sm):not(.iconic-size-lg), svg.iconic.iconic-size-md{width:32px;height:32px;}\nsvg.iconic.iconic-lg:not(.iconic-size-sm):not(.iconic-size-md), svg.iconic.iconic-size-lg{width:128px;height:128px;}\nsvg.iconic-sm > g.iconic-md, svg.iconic-sm > g.iconic-lg, svg.iconic-md > g.iconic-sm, svg.iconic-md > g.iconic-lg, svg.iconic-lg > g.iconic-sm, svg.iconic-lg > g.iconic-md {display: none;}\nsvg.iconic.iconic-icon-sm > g.iconic-lg, svg.iconic.iconic-icon-md > g.iconic-lg {display:none;}\nsvg.iconic-sm:not(.iconic-icon-md):not(.iconic-icon-lg) > g.iconic-sm, svg.iconic-md.iconic-icon-sm > g.iconic-sm, svg.iconic-lg.iconic-icon-sm > g.iconic-sm {display:inline;}\nsvg.iconic-md:not(.iconic-icon-sm):not(.iconic-icon-lg) > g.iconic-md, svg.iconic-sm.iconic-icon-md > g.iconic-md, svg.iconic-lg.iconic-icon-md > g.iconic-md {display:inline;}\nsvg.iconic-lg:not(.iconic-icon-sm):not(.iconic-icon-md) > g.iconic-lg, svg.iconic-sm.iconic-icon-lg > g.iconic-lg, svg.iconic-md.iconic-icon-lg > g.iconic-lg {display:inline;}";
                    navigator && navigator.userAgent && /MSIE 10\.0/.test(navigator.userAgent) && (a += "svg.iconic{zoom:1.0001;}");
                    var b = document.createElement("style");
                    b.id = "iconic-responsive-css", b.type = "text/css", b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)), (document.head || document.getElementsByTagName("head")[0]).appendChild(b)
                },
                g = function(a) {
                    if (/iconic-fluid/.test(a.getAttribute("class"))) {
                        var b, d = e(a),
                            f = a.viewBox.baseVal.width / a.viewBox.baseVal.height;
                        b = 1 === f ? Math.min(d.width, d.height) : 1 > f ? d.width : d.height;
                        var g;
                        g = 32 > b ? "iconic-sm" : b >= 32 && 128 > b ? "iconic-md" : "iconic-lg";
                        var h = a.getAttribute("class"),
                            i = c.test(h) ? h.replace(c, g) : h + " " + g;
                        a.setAttribute("class", i)
                    }
                },
                h = function() {
                    var a = document.querySelectorAll(".injected-svg.iconic-fluid");
                    Array.prototype.forEach.call(a, function(a) {
                        g(a)
                    })
                };
            document.addEventListener("DOMContentLoaded", function() {
                f()
            }), window.addEventListener("resize", function() {
                h()
            }), b.exports = {
                refresh: g,
                refreshAll: h
            }
        }, {}],
        8: [function(b, c, d) {
            ! function(b, e) {
                "use strict";

                function f(a) {
                    a = a.split(" ");
                    for (var b = {}, c = a.length, d = []; c--;) b.hasOwnProperty(a[c]) || (b[a[c]] = 1, d.unshift(a[c]));
                    return d.join(" ")
                }
                var g = "file:" === b.location.protocol,
                    h = e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
                    i = Array.prototype.forEach || function(a, b) {
                        if (void 0 === this || null === this || "function" != typeof a) throw new TypeError;
                        var c, d = this.length >>> 0;
                        for (c = 0; d > c; ++c) c in this && a.call(b, this[c], c, this)
                    },
                    j = {},
                    k = 0,
                    l = [],
                    m = [],
                    n = {},
                    o = function(a) {
                        return a.cloneNode(!0)
                    },
                    p = function(a, b) {
                        m[a] = m[a] || [], m[a].push(b)
                    },
                    q = function(a) {
                        for (var b = 0, c = m[a].length; c > b; b++) ! function(b) {
                            setTimeout(function() {
                                m[a][b](o(j[a]))
                            }, 0)
                        }(b)
                    },
                    r = function(a, c) {
                        if (void 0 !== j[a]) j[a] instanceof SVGSVGElement ? c(o(j[a])) : p(a, c);
                        else {
                            if (!b.XMLHttpRequest) return c("Browser does not support XMLHttpRequest"), !1;
                            j[a] = {}, p(a, c);
                            var d = new XMLHttpRequest;
                            d.onreadystatechange = function() {
                                if (4 === d.readyState) {
                                    if (404 === d.status || null === d.responseXML) return c("Unable to load SVG file: " + a), g && c("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."), c(), !1;
                                    if (!(200 === d.status || g && 0 === d.status)) return c("There was a problem injecting the SVG: " + d.status + " " + d.statusText), !1;
                                    if (d.responseXML instanceof Document) j[a] = d.responseXML.documentElement;
                                    else if (DOMParser && DOMParser instanceof Function) {
                                        var b;
                                        try {
                                            var e = new DOMParser;
                                            b = e.parseFromString(d.responseText, "text/xml")
                                        } catch (f) {
                                            b = void 0
                                        }
                                        if (!b || b.getElementsByTagName("parsererror").length) return c("Unable to parse SVG file: " + a), !1;
                                        j[a] = b.documentElement
                                    }
                                    q(a)
                                }
                            }, d.open("GET", a), d.overrideMimeType && d.overrideMimeType("text/xml"), d.send()
                        }
                    },
                    s = function(a, c, d, e) {
                        var g = a.getAttribute("data-src") || a.getAttribute("src");
                        if (!/svg$/i.test(g)) return e("Attempted to inject a file with a non-svg extension: " + g), void 0;
                        if (!h) {
                            var j = a.getAttribute("data-fallback") || a.getAttribute("data-png");
                            return j ? (a.setAttribute("src", j), e(null)) : d ? (a.setAttribute("src", d + "/" + g.split("/").pop().replace(".svg", ".png")), e(null)) : e("This browser does not support SVG and no PNG fallback was defined."), void 0
                        } - 1 === l.indexOf(a) && (l.push(a), a.setAttribute("src", ""), r(g, function(d) {
                            if ("undefined" == typeof d || "string" == typeof d) return e(d), !1;
                            var h = a.getAttribute("id");
                            h && d.setAttribute("id", h);
                            var j = a.getAttribute("title");
                            j && d.setAttribute("title", j);
                            var m = [].concat(d.getAttribute("class") || [], "injected-svg", a.getAttribute("class") || []).join(" ");
                            d.setAttribute("class", f(m));
                            var o = a.getAttribute("style");
                            o && d.setAttribute("style", o);
                            var p = [].filter.call(a.attributes, function(a) {
                                return /^data-\w[\w\-]*$/.test(a.name)
                            });
                            i.call(p, function(a) {
                                a.name && a.value && d.setAttribute(a.name, a.value)
                            });
                            for (var q, r = d.querySelectorAll("defs clipPath[id]"), s = 0, t = r.length; t > s; s++) {
                                q = r[s].id + "-" + k;
                                for (var u = d.querySelectorAll('[clip-path*="' + r[s].id + '"]'), v = 0, w = u.length; w > v; v++) u[v].setAttribute("clip-path", "url("+ window.location.href +"#" + q + ")");
                                r[s].id = q
                            }
                            d.removeAttribute("xmlns:a");
                            for (var x, y, z = d.querySelectorAll("script"), A = [], B = 0, C = z.length; C > B; B++) y = z[B].getAttribute("type"), y && "application/ecmascript" !== y && "application/javascript" !== y || (x = z[B].innerText || z[B].textContent, A.push(x), d.removeChild(z[B]));
                            if (A.length > 0 && ("always" === c || "once" === c && !n[g])) {
                                for (var D = 0, E = A.length; E > D; D++) new Function(A[D])(b);
                                n[g] = !0
                            }
                            a.parentNode.replaceChild(d, a), delete l[l.indexOf(a)], a = null, k++, e(d)
                        }))
                    },
                    t = function(a, b, c) {
                        b = b || {};
                        var d = b.evalScripts || "always",
                            e = b.pngFallback || !1,
                            f = b.each;
                        if (void 0 !== a.length) {
                            var g = 0;
                            i.call(a, function(b) {
                                s(b, d, e, function(b) {
                                    f && "function" == typeof f && f(b), c && a.length === ++g && c(g)
                                })
                            })
                        } else a ? s(a, d, e, function(b) {
                            f && "function" == typeof f && f(b), c && c(1), a = null
                        }) : c && c(0)
                    };
                "object" == typeof c && "object" == typeof c.exports ? c.exports = d = t : "function" == typeof a && a.amd ? a(function() {
                    return t
                }) : "object" == typeof b && (b.SVGInjector = t)
            }(window, document)
        }, {}]
    }, {}, [1])(1)
});
