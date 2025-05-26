var ws = Object.create, Je = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, vs = Object.getOwnPropertyNames, Ss = Object.getPrototypeOf, Ps = Object.prototype.hasOwnProperty, Es = (n, e, t) => e in n ? Je(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, g = (n, e) => Je(n, "name", { value: e, configurable: !0 }), ye = (n, e) => () => (n && (e = n(n = 0)), e), Z = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports), Te = (n, e) => {
  for (var t in e)
    Je(n, t, {
      get: e[t],
      enumerable: !0
    });
}, Hr = (n, e, t, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of vs(e))
      !Ps.call(n, s) && s !== t && Je(n, s, { get: () => e[s], enumerable: !(r = bs(e, s)) || r.enumerable });
  return n;
}, Qe = (n, e, t) => (t = n != null ? ws(Ss(n)) : {}, Hr(e || !n || !n.__esModule ? Je(t, "default", { value: n, enumerable: !0 }) : t, n)), he = (n) => Hr(Je({}, "__esModule", { value: !0 }), n), J = (n, e, t) => Es(n, typeof e != "symbol" ? e + "" : e, t), _s = Z((n) => {
  V(), n.byteLength = d, n.toByteArray = f, n.fromByteArray = v;
  var e = [], t = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (i = 0, u = s.length; i < u; ++i)
    e[i] = s[i], t[s.charCodeAt(i)] = i;
  var i, u;
  t[45] = 62, t[95] = 63;
  function a(c) {
    var h = c.length;
    if (h % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var w = c.indexOf("=");
    w === -1 && (w = h);
    var S = w === h ? 0 : 4 - w % 4;
    return [w, S];
  }
  g(a, "getLens");
  function d(c) {
    var h = a(c), w = h[0], S = h[1];
    return (w + S) * 3 / 4 - S;
  }
  g(d, "byteLength");
  function y(c, h, w) {
    return (h + w) * 3 / 4 - w;
  }
  g(y, "_byteLength");
  function f(c) {
    var h, w = a(c), S = w[0], _ = w[1], T = new r(y(c, S, _)), L = 0, M = _ > 0 ? S - 4 : S, P;
    for (P = 0; P < M; P += 4)
      h = t[c.charCodeAt(P)] << 18 | t[c.charCodeAt(P + 1)] << 12 | t[c.charCodeAt(P + 2)] << 6 | t[c.charCodeAt(P + 3)], T[L++] = h >> 16 & 255, T[L++] = h >> 8 & 255, T[L++] = h & 255;
    return _ === 2 && (h = t[c.charCodeAt(
      P
    )] << 2 | t[c.charCodeAt(P + 1)] >> 4, T[L++] = h & 255), _ === 1 && (h = t[c.charCodeAt(P)] << 10 | t[c.charCodeAt(P + 1)] << 4 | t[c.charCodeAt(P + 2)] >> 2, T[L++] = h >> 8 & 255, T[L++] = h & 255), T;
  }
  g(f, "toByteArray");
  function b(c) {
    return e[c >> 18 & 63] + e[c >> 12 & 63] + e[c >> 6 & 63] + e[c & 63];
  }
  g(b, "tripletToBase64");
  function m(c, h, w) {
    for (var S, _ = [], T = h; T < w; T += 3)
      S = (c[T] << 16 & 16711680) + (c[T + 1] << 8 & 65280) + (c[T + 2] & 255), _.push(b(S));
    return _.join("");
  }
  g(m, "encodeChunk");
  function v(c) {
    for (var h, w = c.length, S = w % 3, _ = [], T = 16383, L = 0, M = w - S; L < M; L += T)
      _.push(m(
        c,
        L,
        L + T > M ? M : L + T
      ));
    return S === 1 ? (h = c[w - 1], _.push(e[h >> 2] + e[h << 4 & 63] + "==")) : S === 2 && (h = (c[w - 2] << 8) + c[w - 1], _.push(e[h >> 10] + e[h >> 4 & 63] + e[h << 2 & 63] + "=")), _.join("");
  }
  g(v, "fromByteArray");
}), Cs = Z((n) => {
  V(), n.read = function(e, t, r, s, i) {
    var u, a, d = i * 8 - s - 1, y = (1 << d) - 1, f = y >> 1, b = -7, m = r ? i - 1 : 0, v = r ? -1 : 1, c = e[t + m];
    for (m += v, u = c & (1 << -b) - 1, c >>= -b, b += d; b > 0; u = u * 256 + e[t + m], m += v, b -= 8)
      ;
    for (a = u & (1 << -b) - 1, u >>= -b, b += s; b > 0; a = a * 256 + e[t + m], m += v, b -= 8)
      ;
    if (u === 0)
      u = 1 - f;
    else {
      if (u === y)
        return a ? NaN : (c ? -1 : 1) * (1 / 0);
      a = a + Math.pow(2, s), u = u - f;
    }
    return (c ? -1 : 1) * a * Math.pow(2, u - s);
  }, n.write = function(e, t, r, s, i, u) {
    var a, d, y, f = u * 8 - i - 1, b = (1 << f) - 1, m = b >> 1, v = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, c = s ? 0 : u - 1, h = s ? 1 : -1, w = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (d = isNaN(t) ? 1 : 0, a = b) : (a = Math.floor(Math.log(t) / Math.LN2), t * (y = Math.pow(2, -a)) < 1 && (a--, y *= 2), a + m >= 1 ? t += v / y : t += v * Math.pow(2, 1 - m), t * y >= 2 && (a++, y /= 2), a + m >= b ? (d = 0, a = b) : a + m >= 1 ? (d = (t * y - 1) * Math.pow(2, i), a = a + m) : (d = t * Math.pow(2, m - 1) * Math.pow(2, i), a = 0)); i >= 8; e[r + c] = d & 255, c += h, d /= 256, i -= 8)
      ;
    for (a = a << i | d, f += i; f > 0; e[r + c] = a & 255, c += h, a /= 256, f -= 8)
      ;
    e[r + c - h] |= w * 128;
  };
}), Ts = Z((n) => {
  V();
  var e = _s(), t = Cs(), r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  n.Buffer = a, n.SlowBuffer = _, n.INSPECT_MAX_BYTES = 50;
  var s = 2147483647;
  n.kMaxLength = s, a.TYPED_ARRAY_SUPPORT = i(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function i() {
    try {
      let o = new Uint8Array(1), l = { foo: g(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(l, Uint8Array.prototype), Object.setPrototypeOf(o, l), o.foo() === 42;
    } catch {
      return !1;
    }
  }
  g(i, "typedArraySupport"), Object.defineProperty(a.prototype, "parent", { enumerable: !0, get: g(function() {
    if (a.isBuffer(this))
      return this.buffer;
  }, "get") }), Object.defineProperty(a.prototype, "offset", { enumerable: !0, get: g(function() {
    if (a.isBuffer(
      this
    ))
      return this.byteOffset;
  }, "get") });
  function u(o) {
    if (o > s)
      throw new RangeError('The value "' + o + '" is invalid for option "size"');
    let l = new Uint8Array(o);
    return Object.setPrototypeOf(l, a.prototype), l;
  }
  g(u, "createBuffer");
  function a(o, l, p) {
    if (typeof o == "number") {
      if (typeof l == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return b(o);
    }
    return d(o, l, p);
  }
  g(a, "Buffer"), a.poolSize = 8192;
  function d(o, l, p) {
    if (typeof o == "string")
      return m(o, l);
    if (ArrayBuffer.isView(o))
      return c(o);
    if (o == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof o);
    if (Ce(o, ArrayBuffer) || o && Ce(o.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ce(o, SharedArrayBuffer) || o && Ce(
      o.buffer,
      SharedArrayBuffer
    )))
      return h(o, l, p);
    if (typeof o == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let C = o.valueOf && o.valueOf();
    if (C != null && C !== o)
      return a.from(C, l, p);
    let N = w(o);
    if (N)
      return N;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof o[Symbol.toPrimitive] == "function")
      return a.from(o[Symbol.toPrimitive]("string"), l, p);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof o);
  }
  g(d, "from"), a.from = function(o, l, p) {
    return d(o, l, p);
  }, Object.setPrototypeOf(
    a.prototype,
    Uint8Array.prototype
  ), Object.setPrototypeOf(a, Uint8Array);
  function y(o) {
    if (typeof o != "number")
      throw new TypeError(
        '"size" argument must be of type number'
      );
    if (o < 0)
      throw new RangeError('The value "' + o + '" is invalid for option "size"');
  }
  g(y, "assertSize");
  function f(o, l, p) {
    return y(o), o <= 0 ? u(o) : l !== void 0 ? typeof p == "string" ? u(o).fill(l, p) : u(o).fill(l) : u(o);
  }
  g(f, "alloc"), a.alloc = function(o, l, p) {
    return f(o, l, p);
  };
  function b(o) {
    return y(o), u(o < 0 ? 0 : S(o) | 0);
  }
  g(b, "allocUnsafe"), a.allocUnsafe = function(o) {
    return b(
      o
    );
  }, a.allocUnsafeSlow = function(o) {
    return b(o);
  };
  function m(o, l) {
    if ((typeof l != "string" || l === "") && (l = "utf8"), !a.isEncoding(l))
      throw new TypeError("Unknown encoding: " + l);
    let p = T(o, l) | 0, C = u(p), N = C.write(
      o,
      l
    );
    return N !== p && (C = C.slice(0, N)), C;
  }
  g(m, "fromString");
  function v(o) {
    let l = o.length < 0 ? 0 : S(o.length) | 0, p = u(l);
    for (let C = 0; C < l; C += 1)
      p[C] = o[C] & 255;
    return p;
  }
  g(v, "fromArrayLike");
  function c(o) {
    if (Ce(o, Uint8Array)) {
      let l = new Uint8Array(o);
      return h(l.buffer, l.byteOffset, l.byteLength);
    }
    return v(o);
  }
  g(c, "fromArrayView");
  function h(o, l, p) {
    if (l < 0 || o.byteLength < l)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (o.byteLength < l + (p || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let C;
    return l === void 0 && p === void 0 ? C = new Uint8Array(o) : p === void 0 ? C = new Uint8Array(o, l) : C = new Uint8Array(
      o,
      l,
      p
    ), Object.setPrototypeOf(C, a.prototype), C;
  }
  g(h, "fromArrayBuffer");
  function w(o) {
    if (a.isBuffer(o)) {
      let l = S(o.length) | 0, p = u(l);
      return p.length === 0 || o.copy(p, 0, 0, l), p;
    }
    if (o.length !== void 0)
      return typeof o.length != "number" || mt(o.length) ? u(0) : v(o);
    if (o.type === "Buffer" && Array.isArray(o.data))
      return v(o.data);
  }
  g(w, "fromObject");
  function S(o) {
    if (o >= s)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
    return o | 0;
  }
  g(S, "checked");
  function _(o) {
    return +o != o && (o = 0), a.alloc(+o);
  }
  g(_, "SlowBuffer"), a.isBuffer = g(function(o) {
    return o != null && o._isBuffer === !0 && o !== a.prototype;
  }, "isBuffer"), a.compare = g(function(o, l) {
    if (Ce(o, Uint8Array) && (o = a.from(o, o.offset, o.byteLength)), Ce(l, Uint8Array) && (l = a.from(l, l.offset, l.byteLength)), !a.isBuffer(o) || !a.isBuffer(l))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (o === l)
      return 0;
    let p = o.length, C = l.length;
    for (let N = 0, $ = Math.min(p, C); N < $; ++N)
      if (o[N] !== l[N]) {
        p = o[N], C = l[N];
        break;
      }
    return p < C ? -1 : C < p ? 1 : 0;
  }, "compare"), a.isEncoding = g(function(o) {
    switch (String(o).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, "isEncoding"), a.concat = g(function(o, l) {
    if (!Array.isArray(o))
      throw new TypeError(
        '"list" argument must be an Array of Buffers'
      );
    if (o.length === 0)
      return a.alloc(0);
    let p;
    if (l === void 0)
      for (l = 0, p = 0; p < o.length; ++p)
        l += o[p].length;
    let C = a.allocUnsafe(l), N = 0;
    for (p = 0; p < o.length; ++p) {
      let $ = o[p];
      if (Ce($, Uint8Array))
        N + $.length > C.length ? (a.isBuffer($) || ($ = a.from($)), $.copy(C, N)) : Uint8Array.prototype.set.call(C, $, N);
      else if (a.isBuffer($))
        $.copy(C, N);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      N += $.length;
    }
    return C;
  }, "concat");
  function T(o, l) {
    if (a.isBuffer(o))
      return o.length;
    if (ArrayBuffer.isView(o) || Ce(o, ArrayBuffer))
      return o.byteLength;
    if (typeof o != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof o
      );
    let p = o.length, C = arguments.length > 2 && arguments[2] === !0;
    if (!C && p === 0)
      return 0;
    let N = !1;
    for (; ; )
      switch (l) {
        case "ascii":
        case "latin1":
        case "binary":
          return p;
        case "utf8":
        case "utf-8":
          return gt(o).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return p * 2;
        case "hex":
          return p >>> 1;
        case "base64":
          return Kt(o).length;
        default:
          if (N)
            return C ? -1 : gt(o).length;
          l = ("" + l).toLowerCase(), N = !0;
      }
  }
  g(T, "byteLength"), a.byteLength = T;
  function L(o, l, p) {
    let C = !1;
    if ((l === void 0 || l < 0) && (l = 0), l > this.length || ((p === void 0 || p > this.length) && (p = this.length), p <= 0) || (p >>>= 0, l >>>= 0, p <= l))
      return "";
    for (o || (o = "utf8"); ; )
      switch (o) {
        case "hex":
          return re(this, l, p);
        case "utf8":
        case "utf-8":
          return O(this, l, p);
        case "ascii":
          return H(this, l, p);
        case "latin1":
        case "binary":
          return ee(
            this,
            l,
            p
          );
        case "base64":
          return j(this, l, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return we(
            this,
            l,
            p
          );
        default:
          if (C)
            throw new TypeError("Unknown encoding: " + o);
          o = (o + "").toLowerCase(), C = !0;
      }
  }
  g(
    L,
    "slowToString"
  ), a.prototype._isBuffer = !0;
  function M(o, l, p) {
    let C = o[l];
    o[l] = o[p], o[p] = C;
  }
  g(M, "swap"), a.prototype.swap16 = g(function() {
    let o = this.length;
    if (o % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let l = 0; l < o; l += 2)
      M(this, l, l + 1);
    return this;
  }, "swap16"), a.prototype.swap32 = g(function() {
    let o = this.length;
    if (o % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let l = 0; l < o; l += 4)
      M(this, l, l + 3), M(this, l + 1, l + 2);
    return this;
  }, "swap32"), a.prototype.swap64 = g(
    function() {
      let o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let l = 0; l < o; l += 8)
        M(this, l, l + 7), M(this, l + 1, l + 6), M(this, l + 2, l + 5), M(this, l + 3, l + 4);
      return this;
    },
    "swap64"
  ), a.prototype.toString = g(function() {
    let o = this.length;
    return o === 0 ? "" : arguments.length === 0 ? O(
      this,
      0,
      o
    ) : L.apply(this, arguments);
  }, "toString"), a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = g(function(o) {
    if (!a.isBuffer(o))
      throw new TypeError("Argument must be a Buffer");
    return this === o ? !0 : a.compare(this, o) === 0;
  }, "equals"), a.prototype.inspect = g(function() {
    let o = "", l = n.INSPECT_MAX_BYTES;
    return o = this.toString("hex", 0, l).replace(/(.{2})/g, "$1 ").trim(), this.length > l && (o += " ... "), "<Buffer " + o + ">";
  }, "inspect"), r && (a.prototype[r] = a.prototype.inspect), a.prototype.compare = g(function(o, l, p, C, N) {
    if (Ce(o, Uint8Array) && (o = a.from(o, o.offset, o.byteLength)), !a.isBuffer(o))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o);
    if (l === void 0 && (l = 0), p === void 0 && (p = o ? o.length : 0), C === void 0 && (C = 0), N === void 0 && (N = this.length), l < 0 || p > o.length || C < 0 || N > this.length)
      throw new RangeError("out of range index");
    if (C >= N && l >= p)
      return 0;
    if (C >= N)
      return -1;
    if (l >= p)
      return 1;
    if (l >>>= 0, p >>>= 0, C >>>= 0, N >>>= 0, this === o)
      return 0;
    let $ = N - C, k = p - l, ne = Math.min($, k), le = this.slice(
      C,
      N
    ), ie = o.slice(l, p);
    for (let se = 0; se < ne; ++se)
      if (le[se] !== ie[se]) {
        $ = le[se], k = ie[se];
        break;
      }
    return $ < k ? -1 : k < $ ? 1 : 0;
  }, "compare");
  function P(o, l, p, C, N) {
    if (o.length === 0)
      return -1;
    if (typeof p == "string" ? (C = p, p = 0) : p > 2147483647 ? p = 2147483647 : p < -2147483648 && (p = -2147483648), p = +p, mt(p) && (p = N ? 0 : o.length - 1), p < 0 && (p = o.length + p), p >= o.length) {
      if (N)
        return -1;
      p = o.length - 1;
    } else if (p < 0)
      if (N)
        p = 0;
      else
        return -1;
    if (typeof l == "string" && (l = a.from(
      l,
      C
    )), a.isBuffer(l))
      return l.length === 0 ? -1 : B(o, l, p, C, N);
    if (typeof l == "number")
      return l = l & 255, typeof Uint8Array.prototype.indexOf == "function" ? N ? Uint8Array.prototype.indexOf.call(o, l, p) : Uint8Array.prototype.lastIndexOf.call(o, l, p) : B(o, [l], p, C, N);
    throw new TypeError("val must be string, number or Buffer");
  }
  g(P, "bidirectionalIndexOf");
  function B(o, l, p, C, N) {
    let $ = 1, k = o.length, ne = l.length;
    if (C !== void 0 && (C = String(C).toLowerCase(), C === "ucs2" || C === "ucs-2" || C === "utf16le" || C === "utf-16le")) {
      if (o.length < 2 || l.length < 2)
        return -1;
      $ = 2, k /= 2, ne /= 2, p /= 2;
    }
    function le(se, ae) {
      return $ === 1 ? se[ae] : se.readUInt16BE(ae * $);
    }
    g(le, "read");
    let ie;
    if (N) {
      let se = -1;
      for (ie = p; ie < k; ie++)
        if (le(o, ie) === le(l, se === -1 ? 0 : ie - se)) {
          if (se === -1 && (se = ie), ie - se + 1 === ne)
            return se * $;
        } else
          se !== -1 && (ie -= ie - se), se = -1;
    } else
      for (p + ne > k && (p = k - ne), ie = p; ie >= 0; ie--) {
        let se = !0;
        for (let ae = 0; ae < ne; ae++)
          if (le(o, ie + ae) !== le(l, ae)) {
            se = !1;
            break;
          }
        if (se)
          return ie;
      }
    return -1;
  }
  g(B, "arrayIndexOf"), a.prototype.includes = g(function(o, l, p) {
    return this.indexOf(
      o,
      l,
      p
    ) !== -1;
  }, "includes"), a.prototype.indexOf = g(function(o, l, p) {
    return P(this, o, l, p, !0);
  }, "indexOf"), a.prototype.lastIndexOf = g(function(o, l, p) {
    return P(this, o, l, p, !1);
  }, "lastIndexOf");
  function x(o, l, p, C) {
    p = Number(p) || 0;
    let N = o.length - p;
    C ? (C = Number(C), C > N && (C = N)) : C = N;
    let $ = l.length;
    C > $ / 2 && (C = $ / 2);
    let k;
    for (k = 0; k < C; ++k) {
      let ne = parseInt(l.substr(k * 2, 2), 16);
      if (mt(ne))
        return k;
      o[p + k] = ne;
    }
    return k;
  }
  g(x, "hexWrite");
  function E(o, l, p, C) {
    return Ze(gt(l, o.length - p), o, p, C);
  }
  g(E, "utf8Write");
  function D(o, l, p, C) {
    return Ze(xr(l), o, p, C);
  }
  g(
    D,
    "asciiWrite"
  );
  function R(o, l, p, C) {
    return Ze(Kt(l), o, p, C);
  }
  g(R, "base64Write");
  function F(o, l, p, C) {
    return Ze(
      Br(l, o.length - p),
      o,
      p,
      C
    );
  }
  g(F, "ucs2Write"), a.prototype.write = g(function(o, l, p, C) {
    if (l === void 0)
      C = "utf8", p = this.length, l = 0;
    else if (p === void 0 && typeof l == "string")
      C = l, p = this.length, l = 0;
    else if (isFinite(l))
      l = l >>> 0, isFinite(p) ? (p = p >>> 0, C === void 0 && (C = "utf8")) : (C = p, p = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let N = this.length - l;
    if ((p === void 0 || p > N) && (p = N), o.length > 0 && (p < 0 || l < 0) || l > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    C || (C = "utf8");
    let $ = !1;
    for (; ; )
      switch (C) {
        case "hex":
          return x(this, o, l, p);
        case "utf8":
        case "utf-8":
          return E(this, o, l, p);
        case "ascii":
        case "latin1":
        case "binary":
          return D(this, o, l, p);
        case "base64":
          return R(this, o, l, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return F(this, o, l, p);
        default:
          if ($)
            throw new TypeError("Unknown encoding: " + C);
          C = ("" + C).toLowerCase(), $ = !0;
      }
  }, "write"), a.prototype.toJSON = g(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function j(o, l, p) {
    return l === 0 && p === o.length ? e.fromByteArray(o) : e.fromByteArray(o.slice(l, p));
  }
  g(j, "base64Slice");
  function O(o, l, p) {
    p = Math.min(o.length, p);
    let C = [], N = l;
    for (; N < p; ) {
      let $ = o[N], k = null, ne = $ > 239 ? 4 : $ > 223 ? 3 : $ > 191 ? 2 : 1;
      if (N + ne <= p) {
        let le, ie, se, ae;
        switch (ne) {
          case 1:
            $ < 128 && (k = $);
            break;
          case 2:
            le = o[N + 1], (le & 192) === 128 && (ae = ($ & 31) << 6 | le & 63, ae > 127 && (k = ae));
            break;
          case 3:
            le = o[N + 1], ie = o[N + 2], (le & 192) === 128 && (ie & 192) === 128 && (ae = ($ & 15) << 12 | (le & 63) << 6 | ie & 63, ae > 2047 && (ae < 55296 || ae > 57343) && (k = ae));
            break;
          case 4:
            le = o[N + 1], ie = o[N + 2], se = o[N + 3], (le & 192) === 128 && (ie & 192) === 128 && (se & 192) === 128 && (ae = ($ & 15) << 18 | (le & 63) << 12 | (ie & 63) << 6 | se & 63, ae > 65535 && ae < 1114112 && (k = ae));
        }
      }
      k === null ? (k = 65533, ne = 1) : k > 65535 && (k -= 65536, C.push(k >>> 10 & 1023 | 55296), k = 56320 | k & 1023), C.push(k), N += ne;
    }
    return W(C);
  }
  g(O, "utf8Slice");
  var q = 4096;
  function W(o) {
    let l = o.length;
    if (l <= q)
      return String.fromCharCode.apply(String, o);
    let p = "", C = 0;
    for (; C < l; )
      p += String.fromCharCode.apply(String, o.slice(C, C += q));
    return p;
  }
  g(W, "decodeCodePointsArray");
  function H(o, l, p) {
    let C = "";
    p = Math.min(o.length, p);
    for (let N = l; N < p; ++N)
      C += String.fromCharCode(o[N] & 127);
    return C;
  }
  g(H, "asciiSlice");
  function ee(o, l, p) {
    let C = "";
    p = Math.min(o.length, p);
    for (let N = l; N < p; ++N)
      C += String.fromCharCode(o[N]);
    return C;
  }
  g(ee, "latin1Slice");
  function re(o, l, p) {
    let C = o.length;
    (!l || l < 0) && (l = 0), (!p || p < 0 || p > C) && (p = C);
    let N = "";
    for (let $ = l; $ < p; ++$)
      N += ys[o[$]];
    return N;
  }
  g(re, "hexSlice");
  function we(o, l, p) {
    let C = o.slice(l, p), N = "";
    for (let $ = 0; $ < C.length - 1; $ += 2)
      N += String.fromCharCode(C[$] + C[$ + 1] * 256);
    return N;
  }
  g(we, "utf16leSlice"), a.prototype.slice = g(function(o, l) {
    let p = this.length;
    o = ~~o, l = l === void 0 ? p : ~~l, o < 0 ? (o += p, o < 0 && (o = 0)) : o > p && (o = p), l < 0 ? (l += p, l < 0 && (l = 0)) : l > p && (l = p), l < o && (l = o);
    let C = this.subarray(o, l);
    return Object.setPrototypeOf(C, a.prototype), C;
  }, "slice");
  function oe(o, l, p) {
    if (o % 1 !== 0 || o < 0)
      throw new RangeError("offset is not uint");
    if (o + l > p)
      throw new RangeError("Trying to access beyond buffer length");
  }
  g(oe, "checkOffset"), a.prototype.readUintLE = a.prototype.readUIntLE = g(
    function(o, l, p) {
      o = o >>> 0, l = l >>> 0, p || oe(o, l, this.length);
      let C = this[o], N = 1, $ = 0;
      for (; ++$ < l && (N *= 256); )
        C += this[o + $] * N;
      return C;
    },
    "readUIntLE"
  ), a.prototype.readUintBE = a.prototype.readUIntBE = g(function(o, l, p) {
    o = o >>> 0, l = l >>> 0, p || oe(
      o,
      l,
      this.length
    );
    let C = this[o + --l], N = 1;
    for (; l > 0 && (N *= 256); )
      C += this[o + --l] * N;
    return C;
  }, "readUIntBE"), a.prototype.readUint8 = a.prototype.readUInt8 = g(
    function(o, l) {
      return o = o >>> 0, l || oe(o, 1, this.length), this[o];
    },
    "readUInt8"
  ), a.prototype.readUint16LE = a.prototype.readUInt16LE = g(function(o, l) {
    return o = o >>> 0, l || oe(
      o,
      2,
      this.length
    ), this[o] | this[o + 1] << 8;
  }, "readUInt16LE"), a.prototype.readUint16BE = a.prototype.readUInt16BE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 2, this.length), this[o] << 8 | this[o + 1];
  }, "readUInt16BE"), a.prototype.readUint32LE = a.prototype.readUInt32LE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
  }, "readUInt32LE"), a.prototype.readUint32BE = a.prototype.readUInt32BE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
  }, "readUInt32BE"), a.prototype.readBigUInt64LE = Ae(g(function(o) {
    o = o >>> 0, Oe(o, "offset");
    let l = this[o], p = this[o + 7];
    (l === void 0 || p === void 0) && Ue(o, this.length - 8);
    let C = l + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24, N = this[++o] + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + p * 2 ** 24;
    return BigInt(C) + (BigInt(N) << BigInt(32));
  }, "readBigUInt64LE")), a.prototype.readBigUInt64BE = Ae(g(function(o) {
    o = o >>> 0, Oe(o, "offset");
    let l = this[o], p = this[o + 7];
    (l === void 0 || p === void 0) && Ue(o, this.length - 8);
    let C = l * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o], N = this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + p;
    return (BigInt(C) << BigInt(
      32
    )) + BigInt(N);
  }, "readBigUInt64BE")), a.prototype.readIntLE = g(function(o, l, p) {
    o = o >>> 0, l = l >>> 0, p || oe(
      o,
      l,
      this.length
    );
    let C = this[o], N = 1, $ = 0;
    for (; ++$ < l && (N *= 256); )
      C += this[o + $] * N;
    return N *= 128, C >= N && (C -= Math.pow(2, 8 * l)), C;
  }, "readIntLE"), a.prototype.readIntBE = g(function(o, l, p) {
    o = o >>> 0, l = l >>> 0, p || oe(o, l, this.length);
    let C = l, N = 1, $ = this[o + --C];
    for (; C > 0 && (N *= 256); )
      $ += this[o + --C] * N;
    return N *= 128, $ >= N && ($ -= Math.pow(2, 8 * l)), $;
  }, "readIntBE"), a.prototype.readInt8 = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
  }, "readInt8"), a.prototype.readInt16LE = g(function(o, l) {
    o = o >>> 0, l || oe(
      o,
      2,
      this.length
    );
    let p = this[o] | this[o + 1] << 8;
    return p & 32768 ? p | 4294901760 : p;
  }, "readInt16LE"), a.prototype.readInt16BE = g(function(o, l) {
    o = o >>> 0, l || oe(o, 2, this.length);
    let p = this[o + 1] | this[o] << 8;
    return p & 32768 ? p | 4294901760 : p;
  }, "readInt16BE"), a.prototype.readInt32LE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
  }, "readInt32LE"), a.prototype.readInt32BE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
  }, "readInt32BE"), a.prototype.readBigInt64LE = Ae(g(function(o) {
    o = o >>> 0, Oe(o, "offset");
    let l = this[o], p = this[o + 7];
    (l === void 0 || p === void 0) && Ue(o, this.length - 8);
    let C = this[o + 4] + this[o + 5] * 2 ** 8 + this[o + 6] * 2 ** 16 + (p << 24);
    return (BigInt(C) << BigInt(
      32
    )) + BigInt(l + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24);
  }, "readBigInt64LE")), a.prototype.readBigInt64BE = Ae(g(function(o) {
    o = o >>> 0, Oe(o, "offset");
    let l = this[o], p = this[o + 7];
    (l === void 0 || p === void 0) && Ue(o, this.length - 8);
    let C = (l << 24) + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o];
    return (BigInt(C) << BigInt(32)) + BigInt(
      this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + p
    );
  }, "readBigInt64BE")), a.prototype.readFloatLE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 4, this.length), t.read(this, o, !0, 23, 4);
  }, "readFloatLE"), a.prototype.readFloatBE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 4, this.length), t.read(this, o, !1, 23, 4);
  }, "readFloatBE"), a.prototype.readDoubleLE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 8, this.length), t.read(this, o, !0, 52, 8);
  }, "readDoubleLE"), a.prototype.readDoubleBE = g(function(o, l) {
    return o = o >>> 0, l || oe(o, 8, this.length), t.read(
      this,
      o,
      !1,
      52,
      8
    );
  }, "readDoubleBE");
  function de(o, l, p, C, N, $) {
    if (!a.isBuffer(o))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (l > N || l < $)
      throw new RangeError('"value" argument is out of bounds');
    if (p + C > o.length)
      throw new RangeError("Index out of range");
  }
  g(de, "checkInt"), a.prototype.writeUintLE = a.prototype.writeUIntLE = g(function(o, l, p, C) {
    if (o = +o, l = l >>> 0, p = p >>> 0, !C) {
      let k = Math.pow(2, 8 * p) - 1;
      de(
        this,
        o,
        l,
        p,
        k,
        0
      );
    }
    let N = 1, $ = 0;
    for (this[l] = o & 255; ++$ < p && (N *= 256); )
      this[l + $] = o / N & 255;
    return l + p;
  }, "writeUIntLE"), a.prototype.writeUintBE = a.prototype.writeUIntBE = g(function(o, l, p, C) {
    if (o = +o, l = l >>> 0, p = p >>> 0, !C) {
      let k = Math.pow(2, 8 * p) - 1;
      de(this, o, l, p, k, 0);
    }
    let N = p - 1, $ = 1;
    for (this[l + N] = o & 255; --N >= 0 && ($ *= 256); )
      this[l + N] = o / $ & 255;
    return l + p;
  }, "writeUIntBE"), a.prototype.writeUint8 = a.prototype.writeUInt8 = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(this, o, l, 1, 255, 0), this[l] = o & 255, l + 1;
  }, "writeUInt8"), a.prototype.writeUint16LE = a.prototype.writeUInt16LE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(this, o, l, 2, 65535, 0), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
  }, "writeUInt16LE"), a.prototype.writeUint16BE = a.prototype.writeUInt16BE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(this, o, l, 2, 65535, 0), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
  }, "writeUInt16BE"), a.prototype.writeUint32LE = a.prototype.writeUInt32LE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(
      this,
      o,
      l,
      4,
      4294967295,
      0
    ), this[l + 3] = o >>> 24, this[l + 2] = o >>> 16, this[l + 1] = o >>> 8, this[l] = o & 255, l + 4;
  }, "writeUInt32LE"), a.prototype.writeUint32BE = a.prototype.writeUInt32BE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(
      this,
      o,
      l,
      4,
      4294967295,
      0
    ), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
  }, "writeUInt32BE");
  function Xe(o, l, p, C, N) {
    Wt(l, C, N, o, p, 7);
    let $ = Number(l & BigInt(4294967295));
    o[p++] = $, $ = $ >> 8, o[p++] = $, $ = $ >> 8, o[p++] = $, $ = $ >> 8, o[p++] = $;
    let k = Number(l >> BigInt(32) & BigInt(4294967295));
    return o[p++] = k, k = k >> 8, o[p++] = k, k = k >> 8, o[p++] = k, k = k >> 8, o[p++] = k, p;
  }
  g(Xe, "wrtBigUInt64LE");
  function Ft(o, l, p, C, N) {
    Wt(l, C, N, o, p, 7);
    let $ = Number(l & BigInt(4294967295));
    o[p + 7] = $, $ = $ >> 8, o[p + 6] = $, $ = $ >> 8, o[p + 5] = $, $ = $ >> 8, o[p + 4] = $;
    let k = Number(l >> BigInt(32) & BigInt(4294967295));
    return o[p + 3] = k, k = k >> 8, o[p + 2] = k, k = k >> 8, o[p + 1] = k, k = k >> 8, o[p] = k, p + 8;
  }
  g(Ft, "wrtBigUInt64BE"), a.prototype.writeBigUInt64LE = Ae(g(function(o, l = 0) {
    return Xe(this, o, l, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64LE")), a.prototype.writeBigUInt64BE = Ae(g(function(o, l = 0) {
    return Ft(this, o, l, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64BE")), a.prototype.writeIntLE = g(function(o, l, p, C) {
    if (o = +o, l = l >>> 0, !C) {
      let ne = Math.pow(2, 8 * p - 1);
      de(this, o, l, p, ne - 1, -ne);
    }
    let N = 0, $ = 1, k = 0;
    for (this[l] = o & 255; ++N < p && ($ *= 256); )
      o < 0 && k === 0 && this[l + N - 1] !== 0 && (k = 1), this[l + N] = (o / $ >> 0) - k & 255;
    return l + p;
  }, "writeIntLE"), a.prototype.writeIntBE = g(function(o, l, p, C) {
    if (o = +o, l = l >>> 0, !C) {
      let ne = Math.pow(2, 8 * p - 1);
      de(this, o, l, p, ne - 1, -ne);
    }
    let N = p - 1, $ = 1, k = 0;
    for (this[l + N] = o & 255; --N >= 0 && ($ *= 256); )
      o < 0 && k === 0 && this[l + N + 1] !== 0 && (k = 1), this[l + N] = (o / $ >> 0) - k & 255;
    return l + p;
  }, "writeIntBE"), a.prototype.writeInt8 = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(this, o, l, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[l] = o & 255, l + 1;
  }, "writeInt8"), a.prototype.writeInt16LE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(this, o, l, 2, 32767, -32768), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
  }, "writeInt16LE"), a.prototype.writeInt16BE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(this, o, l, 2, 32767, -32768), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
  }, "writeInt16BE"), a.prototype.writeInt32LE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(
      this,
      o,
      l,
      4,
      2147483647,
      -2147483648
    ), this[l] = o & 255, this[l + 1] = o >>> 8, this[l + 2] = o >>> 16, this[l + 3] = o >>> 24, l + 4;
  }, "writeInt32LE"), a.prototype.writeInt32BE = g(function(o, l, p) {
    return o = +o, l = l >>> 0, p || de(
      this,
      o,
      l,
      4,
      2147483647,
      -2147483648
    ), o < 0 && (o = 4294967295 + o + 1), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
  }, "writeInt32BE"), a.prototype.writeBigInt64LE = Ae(g(function(o, l = 0) {
    return Xe(this, o, l, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE")), a.prototype.writeBigInt64BE = Ae(
    g(function(o, l = 0) {
      return Ft(this, o, l, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE")
  );
  function jt(o, l, p, C, N, $) {
    if (p + C > o.length)
      throw new RangeError("Index out of range");
    if (p < 0)
      throw new RangeError("Index out of range");
  }
  g(jt, "checkIEEE754");
  function Ut(o, l, p, C, N) {
    return l = +l, p = p >>> 0, N || jt(o, l, p, 4), t.write(o, l, p, C, 23, 4), p + 4;
  }
  g(
    Ut,
    "writeFloat"
  ), a.prototype.writeFloatLE = g(function(o, l, p) {
    return Ut(this, o, l, !0, p);
  }, "writeFloatLE"), a.prototype.writeFloatBE = g(function(o, l, p) {
    return Ut(this, o, l, !1, p);
  }, "writeFloatBE");
  function zt(o, l, p, C, N) {
    return l = +l, p = p >>> 0, N || jt(o, l, p, 8), t.write(
      o,
      l,
      p,
      C,
      52,
      8
    ), p + 8;
  }
  g(zt, "writeDouble"), a.prototype.writeDoubleLE = g(function(o, l, p) {
    return zt(this, o, l, !0, p);
  }, "writeDoubleLE"), a.prototype.writeDoubleBE = g(function(o, l, p) {
    return zt(this, o, l, !1, p);
  }, "writeDoubleBE"), a.prototype.copy = g(function(o, l, p, C) {
    if (!a.isBuffer(o))
      throw new TypeError("argument should be a Buffer");
    if (p || (p = 0), !C && C !== 0 && (C = this.length), l >= o.length && (l = o.length), l || (l = 0), C > 0 && C < p && (C = p), C === p || o.length === 0 || this.length === 0)
      return 0;
    if (l < 0)
      throw new RangeError("targetStart out of bounds");
    if (p < 0 || p >= this.length)
      throw new RangeError("Index out of range");
    if (C < 0)
      throw new RangeError("sourceEnd out of bounds");
    C > this.length && (C = this.length), o.length - l < C - p && (C = o.length - l + p);
    let N = C - p;
    return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(l, p, C) : Uint8Array.prototype.set.call(o, this.subarray(p, C), l), N;
  }, "copy"), a.prototype.fill = g(function(o, l, p, C) {
    if (typeof o == "string") {
      if (typeof l == "string" ? (C = l, l = 0, p = this.length) : typeof p == "string" && (C = p, p = this.length), C !== void 0 && typeof C != "string")
        throw new TypeError("encoding must be a string");
      if (typeof C == "string" && !a.isEncoding(C))
        throw new TypeError(
          "Unknown encoding: " + C
        );
      if (o.length === 1) {
        let $ = o.charCodeAt(0);
        (C === "utf8" && $ < 128 || C === "latin1") && (o = $);
      }
    } else
      typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
    if (l < 0 || this.length < l || this.length < p)
      throw new RangeError("Out of range index");
    if (p <= l)
      return this;
    l = l >>> 0, p = p === void 0 ? this.length : p >>> 0, o || (o = 0);
    let N;
    if (typeof o == "number")
      for (N = l; N < p; ++N)
        this[N] = o;
    else {
      let $ = a.isBuffer(o) ? o : a.from(
        o,
        C
      ), k = $.length;
      if (k === 0)
        throw new TypeError('The value "' + o + '" is invalid for argument "value"');
      for (N = 0; N < p - l; ++N)
        this[N + l] = $[N % k];
    }
    return this;
  }, "fill");
  var je = {};
  function pt(o, l, p) {
    var C;
    je[o] = (C = class extends p {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: l.apply(this, arguments), writable: !0, configurable: !0 }), this.name = `${this.name} [${o}]`, this.stack, delete this.name;
      }
      get code() {
        return o;
      }
      set code(N) {
        Object.defineProperty(
          this,
          "code",
          { configurable: !0, enumerable: !0, value: N, writable: !0 }
        );
      }
      toString() {
        return `${this.name} [${o}]: ${this.message}`;
      }
    }, g(C, "NodeError"), C);
  }
  g(pt, "E"), pt("ERR_BUFFER_OUT_OF_BOUNDS", function(o) {
    return o ? `${o} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError), pt(
    "ERR_INVALID_ARG_TYPE",
    function(o, l) {
      return `The "${o}" argument must be of type number. Received type ${typeof l}`;
    },
    TypeError
  ), pt("ERR_OUT_OF_RANGE", function(o, l, p) {
    let C = `The value of "${o}" is out of range.`, N = p;
    return Number.isInteger(p) && Math.abs(p) > 2 ** 32 ? N = Vt(String(p)) : typeof p == "bigint" && (N = String(
      p
    ), (p > BigInt(2) ** BigInt(32) || p < -(BigInt(2) ** BigInt(32))) && (N = Vt(N)), N += "n"), C += ` It must be ${l}. Received ${N}`, C;
  }, RangeError);
  function Vt(o) {
    let l = "", p = o.length, C = o[0] === "-" ? 1 : 0;
    for (; p >= C + 4; p -= 3)
      l = `_${o.slice(p - 3, p)}${l}`;
    return `${o.slice(0, p)}${l}`;
  }
  g(Vt, "addNumericalSeparator");
  function Tr(o, l, p) {
    Oe(l, "offset"), (o[l] === void 0 || o[l + p] === void 0) && Ue(l, o.length - (p + 1));
  }
  g(Tr, "checkBounds");
  function Wt(o, l, p, C, N, $) {
    if (o > p || o < l) {
      let k = typeof l == "bigint" ? "n" : "", ne;
      throw $ > 3 ? l === 0 || l === BigInt(0) ? ne = `>= 0${k} and < 2${k} ** ${($ + 1) * 8}${k}` : ne = `>= -(2${k} ** ${($ + 1) * 8 - 1}${k}) and < 2 ** ${($ + 1) * 8 - 1}${k}` : ne = `>= ${l}${k} and <= ${p}${k}`, new je.ERR_OUT_OF_RANGE("value", ne, o);
    }
    Tr(C, N, $);
  }
  g(Wt, "checkIntBI");
  function Oe(o, l) {
    if (typeof o != "number")
      throw new je.ERR_INVALID_ARG_TYPE(l, "number", o);
  }
  g(Oe, "validateNumber");
  function Ue(o, l, p) {
    throw Math.floor(o) !== o ? (Oe(o, p), new je.ERR_OUT_OF_RANGE(p || "offset", "an integer", o)) : l < 0 ? new je.ERR_BUFFER_OUT_OF_BOUNDS() : new je.ERR_OUT_OF_RANGE(p || "offset", `>= ${p ? 1 : 0} and <= ${l}`, o);
  }
  g(Ue, "boundsError");
  var ms = /[^+/0-9A-Za-z-_]/g;
  function Ar(o) {
    if (o = o.split("=")[0], o = o.trim().replace(ms, ""), o.length < 2)
      return "";
    for (; o.length % 4 !== 0; )
      o = o + "=";
    return o;
  }
  g(Ar, "base64clean");
  function gt(o, l) {
    l = l || 1 / 0;
    let p, C = o.length, N = null, $ = [];
    for (let k = 0; k < C; ++k) {
      if (p = o.charCodeAt(k), p > 55295 && p < 57344) {
        if (!N) {
          if (p > 56319) {
            (l -= 3) > -1 && $.push(239, 191, 189);
            continue;
          } else if (k + 1 === C) {
            (l -= 3) > -1 && $.push(239, 191, 189);
            continue;
          }
          N = p;
          continue;
        }
        if (p < 56320) {
          (l -= 3) > -1 && $.push(239, 191, 189), N = p;
          continue;
        }
        p = (N - 55296 << 10 | p - 56320) + 65536;
      } else
        N && (l -= 3) > -1 && $.push(239, 191, 189);
      if (N = null, p < 128) {
        if ((l -= 1) < 0)
          break;
        $.push(p);
      } else if (p < 2048) {
        if ((l -= 2) < 0)
          break;
        $.push(p >> 6 | 192, p & 63 | 128);
      } else if (p < 65536) {
        if ((l -= 3) < 0)
          break;
        $.push(p >> 12 | 224, p >> 6 & 63 | 128, p & 63 | 128);
      } else if (p < 1114112) {
        if ((l -= 4) < 0)
          break;
        $.push(p >> 18 | 240, p >> 12 & 63 | 128, p >> 6 & 63 | 128, p & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return $;
  }
  g(gt, "utf8ToBytes");
  function xr(o) {
    let l = [];
    for (let p = 0; p < o.length; ++p)
      l.push(o.charCodeAt(p) & 255);
    return l;
  }
  g(
    xr,
    "asciiToBytes"
  );
  function Br(o, l) {
    let p, C, N, $ = [];
    for (let k = 0; k < o.length && !((l -= 2) < 0); ++k)
      p = o.charCodeAt(
        k
      ), C = p >> 8, N = p % 256, $.push(N), $.push(C);
    return $;
  }
  g(Br, "utf16leToBytes");
  function Kt(o) {
    return e.toByteArray(
      Ar(o)
    );
  }
  g(Kt, "base64ToBytes");
  function Ze(o, l, p, C) {
    let N;
    for (N = 0; N < C && !(N + p >= l.length || N >= o.length); ++N)
      l[N + p] = o[N];
    return N;
  }
  g(Ze, "blitBuffer");
  function Ce(o, l) {
    return o instanceof l || o != null && o.constructor != null && o.constructor.name != null && o.constructor.name === l.name;
  }
  g(Ce, "isInstance");
  function mt(o) {
    return o !== o;
  }
  g(mt, "numberIsNaN");
  var ys = function() {
    let o = "0123456789abcdef", l = new Array(256);
    for (let p = 0; p < 16; ++p) {
      let C = p * 16;
      for (let N = 0; N < 16; ++N)
        l[C + N] = o[p] + o[N];
    }
    return l;
  }();
  function Ae(o) {
    return typeof BigInt > "u" ? Nr : o;
  }
  g(Ae, "defineBigIntMethod");
  function Nr() {
    throw new Error("BigInt not supported");
  }
  g(Nr, "BufferBigIntNotDefined");
}), It, dr, G, X, V = ye(() => {
  It = globalThis, dr = globalThis.setImmediate ?? ((n) => setTimeout(n, 0)), G = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : Ts().Buffer, X = globalThis.process ?? {}, X.env ?? (X.env = {});
  try {
    X.nextTick(() => {
    });
  } catch {
    let n = Promise.resolve();
    X.nextTick = n.then.bind(n);
  }
}), ke = Z((n, e) => {
  V();
  var t = typeof Reflect == "object" ? Reflect : null, r = t && typeof t.apply == "function" ? t.apply : g(function(P, B, x) {
    return Function.prototype.apply.call(P, B, x);
  }, "ReflectApply"), s;
  t && typeof t.ownKeys == "function" ? s = t.ownKeys : Object.getOwnPropertySymbols ? s = g(function(P) {
    return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
  }, "ReflectOwnKeys") : s = g(function(P) {
    return Object.getOwnPropertyNames(P);
  }, "ReflectOwnKeys");
  function i(P) {
    console && console.warn && console.warn(P);
  }
  g(
    i,
    "ProcessEmitWarning"
  );
  var u = Number.isNaN || g(function(P) {
    return P !== P;
  }, "NumberIsNaN");
  function a() {
    a.init.call(this);
  }
  g(a, "EventEmitter"), e.exports = a, e.exports.once = T, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var d = 10;
  function y(P) {
    if (typeof P != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof P);
  }
  g(y, "checkListener"), Object.defineProperty(a, "defaultMaxListeners", { enumerable: !0, get: g(function() {
    return d;
  }, "get"), set: g(
    function(P) {
      if (typeof P != "number" || P < 0 || u(P))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + P + ".");
      d = P;
    },
    "set"
  ) }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = g(function(P) {
    if (typeof P != "number" || P < 0 || u(P))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
    return this._maxListeners = P, this;
  }, "setMaxListeners");
  function f(P) {
    return P._maxListeners === void 0 ? a.defaultMaxListeners : P._maxListeners;
  }
  g(f, "_getMaxListeners"), a.prototype.getMaxListeners = g(function() {
    return f(this);
  }, "getMaxListeners"), a.prototype.emit = g(function(P) {
    for (var B = [], x = 1; x < arguments.length; x++)
      B.push(arguments[x]);
    var E = P === "error", D = this._events;
    if (D !== void 0)
      E = E && D.error === void 0;
    else if (!E)
      return !1;
    if (E) {
      var R;
      if (B.length > 0 && (R = B[0]), R instanceof Error)
        throw R;
      var F = new Error("Unhandled error." + (R ? " (" + R.message + ")" : ""));
      throw F.context = R, F;
    }
    var j = D[P];
    if (j === void 0)
      return !1;
    if (typeof j == "function")
      r(j, this, B);
    else
      for (var O = j.length, q = w(j, O), x = 0; x < O; ++x)
        r(q[x], this, B);
    return !0;
  }, "emit");
  function b(P, B, x, E) {
    var D, R, F;
    if (y(
      x
    ), R = P._events, R === void 0 ? (R = P._events = /* @__PURE__ */ Object.create(null), P._eventsCount = 0) : (R.newListener !== void 0 && (P.emit("newListener", B, x.listener ? x.listener : x), R = P._events), F = R[B]), F === void 0)
      F = R[B] = x, ++P._eventsCount;
    else if (typeof F == "function" ? F = R[B] = E ? [x, F] : [F, x] : E ? F.unshift(x) : F.push(x), D = f(P), D > 0 && F.length > D && !F.warned) {
      F.warned = !0;
      var j = new Error("Possible EventEmitter memory leak detected. " + F.length + " " + String(B) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      j.name = "MaxListenersExceededWarning", j.emitter = P, j.type = B, j.count = F.length, i(j);
    }
    return P;
  }
  g(b, "_addListener"), a.prototype.addListener = g(function(P, B) {
    return b(this, P, B, !1);
  }, "addListener"), a.prototype.on = a.prototype.addListener, a.prototype.prependListener = g(function(P, B) {
    return b(this, P, B, !0);
  }, "prependListener");
  function m() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  g(m, "onceWrapper");
  function v(P, B, x) {
    var E = {
      fired: !1,
      wrapFn: void 0,
      target: P,
      type: B,
      listener: x
    }, D = m.bind(E);
    return D.listener = x, E.wrapFn = D, D;
  }
  g(v, "_onceWrap"), a.prototype.once = g(function(P, B) {
    return y(B), this.on(P, v(this, P, B)), this;
  }, "once"), a.prototype.prependOnceListener = g(function(P, B) {
    return y(B), this.prependListener(P, v(this, P, B)), this;
  }, "prependOnceListener"), a.prototype.removeListener = g(function(P, B) {
    var x, E, D, R, F;
    if (y(B), E = this._events, E === void 0)
      return this;
    if (x = E[P], x === void 0)
      return this;
    if (x === B || x.listener === B)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete E[P], E.removeListener && this.emit("removeListener", P, x.listener || B));
    else if (typeof x != "function") {
      for (D = -1, R = x.length - 1; R >= 0; R--)
        if (x[R] === B || x[R].listener === B) {
          F = x[R].listener, D = R;
          break;
        }
      if (D < 0)
        return this;
      D === 0 ? x.shift() : S(x, D), x.length === 1 && (E[P] = x[0]), E.removeListener !== void 0 && this.emit("removeListener", P, F || B);
    }
    return this;
  }, "removeListener"), a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = g(function(P) {
    var B, x, E;
    if (x = this._events, x === void 0)
      return this;
    if (x.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : x[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete x[P]), this;
    if (arguments.length === 0) {
      var D = Object.keys(x), R;
      for (E = 0; E < D.length; ++E)
        R = D[E], R !== "removeListener" && this.removeAllListeners(
          R
        );
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (B = x[P], typeof B == "function")
      this.removeListener(P, B);
    else if (B !== void 0)
      for (E = B.length - 1; E >= 0; E--)
        this.removeListener(P, B[E]);
    return this;
  }, "removeAllListeners");
  function c(P, B, x) {
    var E = P._events;
    if (E === void 0)
      return [];
    var D = E[B];
    return D === void 0 ? [] : typeof D == "function" ? x ? [D.listener || D] : [D] : x ? _(D) : w(D, D.length);
  }
  g(c, "_listeners"), a.prototype.listeners = g(function(P) {
    return c(this, P, !0);
  }, "listeners"), a.prototype.rawListeners = g(function(P) {
    return c(this, P, !1);
  }, "rawListeners"), a.listenerCount = function(P, B) {
    return typeof P.listenerCount == "function" ? P.listenerCount(B) : h.call(P, B);
  }, a.prototype.listenerCount = h;
  function h(P) {
    var B = this._events;
    if (B !== void 0) {
      var x = B[P];
      if (typeof x == "function")
        return 1;
      if (x !== void 0)
        return x.length;
    }
    return 0;
  }
  g(h, "listenerCount"), a.prototype.eventNames = g(function() {
    return this._eventsCount > 0 ? s(this._events) : [];
  }, "eventNames");
  function w(P, B) {
    for (var x = new Array(B), E = 0; E < B; ++E)
      x[E] = P[E];
    return x;
  }
  g(w, "arrayClone");
  function S(P, B) {
    for (; B + 1 < P.length; B++)
      P[B] = P[B + 1];
    P.pop();
  }
  g(S, "spliceOne");
  function _(P) {
    for (var B = new Array(P.length), x = 0; x < B.length; ++x)
      B[x] = P[x].listener || P[x];
    return B;
  }
  g(_, "unwrapListeners");
  function T(P, B) {
    return new Promise(function(x, E) {
      function D(F) {
        P.removeListener(B, R), E(F);
      }
      g(D, "errorListener");
      function R() {
        typeof P.removeListener == "function" && P.removeListener("error", D), x([].slice.call(arguments));
      }
      g(R, "resolver"), M(P, B, R, { once: !0 }), B !== "error" && L(P, D, { once: !0 });
    });
  }
  g(T, "once");
  function L(P, B, x) {
    typeof P.on == "function" && M(P, "error", B, x);
  }
  g(
    L,
    "addErrorHandlerIfEventEmitter"
  );
  function M(P, B, x, E) {
    if (typeof P.on == "function")
      E.once ? P.once(B, x) : P.on(B, x);
    else if (typeof P.addEventListener == "function")
      P.addEventListener(B, g(function D(R) {
        E.once && P.removeEventListener(B, D), x(R);
      }, "wrapListener"));
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof P);
  }
  g(M, "eventTargetAgnosticAddListener");
}), Gr = {};
Te(Gr, { Socket: () => Lt, isIP: () => Jr });
function Jr(n) {
  return 0;
}
var Ir, Ht, et, Lt, Ot = ye(() => {
  V(), Ir = Qe(ke(), 1), g(Jr, "isIP"), Ht = /^[^.]+\./, et = class K extends Ir.EventEmitter {
    constructor() {
      super(...arguments), J(this, "opts", {}), J(this, "connecting", !1), J(this, "pending", !0), J(
        this,
        "writable",
        !0
      ), J(this, "encrypted", !1), J(this, "authorized", !1), J(this, "destroyed", !1), J(this, "ws", null), J(this, "writeBuffer"), J(this, "tlsState", 0), J(this, "tlsRead"), J(this, "tlsWrite");
    }
    static get poolQueryViaFetch() {
      return K.opts.poolQueryViaFetch ?? K.defaults.poolQueryViaFetch;
    }
    static set poolQueryViaFetch(e) {
      K.opts.poolQueryViaFetch = e;
    }
    static get fetchEndpoint() {
      return K.opts.fetchEndpoint ?? K.defaults.fetchEndpoint;
    }
    static set fetchEndpoint(e) {
      K.opts.fetchEndpoint = e;
    }
    static get fetchConnectionCache() {
      return !0;
    }
    static set fetchConnectionCache(e) {
      console.warn("The `fetchConnectionCache` option is deprecated (now always `true`)");
    }
    static get fetchFunction() {
      return K.opts.fetchFunction ?? K.defaults.fetchFunction;
    }
    static set fetchFunction(e) {
      K.opts.fetchFunction = e;
    }
    static get webSocketConstructor() {
      return K.opts.webSocketConstructor ?? K.defaults.webSocketConstructor;
    }
    static set webSocketConstructor(e) {
      K.opts.webSocketConstructor = e;
    }
    get webSocketConstructor() {
      return this.opts.webSocketConstructor ?? K.webSocketConstructor;
    }
    set webSocketConstructor(e) {
      this.opts.webSocketConstructor = e;
    }
    static get wsProxy() {
      return K.opts.wsProxy ?? K.defaults.wsProxy;
    }
    static set wsProxy(e) {
      K.opts.wsProxy = e;
    }
    get wsProxy() {
      return this.opts.wsProxy ?? K.wsProxy;
    }
    set wsProxy(e) {
      this.opts.wsProxy = e;
    }
    static get coalesceWrites() {
      return K.opts.coalesceWrites ?? K.defaults.coalesceWrites;
    }
    static set coalesceWrites(e) {
      K.opts.coalesceWrites = e;
    }
    get coalesceWrites() {
      return this.opts.coalesceWrites ?? K.coalesceWrites;
    }
    set coalesceWrites(e) {
      this.opts.coalesceWrites = e;
    }
    static get useSecureWebSocket() {
      return K.opts.useSecureWebSocket ?? K.defaults.useSecureWebSocket;
    }
    static set useSecureWebSocket(e) {
      K.opts.useSecureWebSocket = e;
    }
    get useSecureWebSocket() {
      return this.opts.useSecureWebSocket ?? K.useSecureWebSocket;
    }
    set useSecureWebSocket(e) {
      this.opts.useSecureWebSocket = e;
    }
    static get forceDisablePgSSL() {
      return K.opts.forceDisablePgSSL ?? K.defaults.forceDisablePgSSL;
    }
    static set forceDisablePgSSL(e) {
      K.opts.forceDisablePgSSL = e;
    }
    get forceDisablePgSSL() {
      return this.opts.forceDisablePgSSL ?? K.forceDisablePgSSL;
    }
    set forceDisablePgSSL(e) {
      this.opts.forceDisablePgSSL = e;
    }
    static get disableSNI() {
      return K.opts.disableSNI ?? K.defaults.disableSNI;
    }
    static set disableSNI(e) {
      K.opts.disableSNI = e;
    }
    get disableSNI() {
      return this.opts.disableSNI ?? K.disableSNI;
    }
    set disableSNI(e) {
      this.opts.disableSNI = e;
    }
    static get pipelineConnect() {
      return K.opts.pipelineConnect ?? K.defaults.pipelineConnect;
    }
    static set pipelineConnect(e) {
      K.opts.pipelineConnect = e;
    }
    get pipelineConnect() {
      return this.opts.pipelineConnect ?? K.pipelineConnect;
    }
    set pipelineConnect(e) {
      this.opts.pipelineConnect = e;
    }
    static get subtls() {
      return K.opts.subtls ?? K.defaults.subtls;
    }
    static set subtls(e) {
      K.opts.subtls = e;
    }
    get subtls() {
      return this.opts.subtls ?? K.subtls;
    }
    set subtls(e) {
      this.opts.subtls = e;
    }
    static get pipelineTLS() {
      return K.opts.pipelineTLS ?? K.defaults.pipelineTLS;
    }
    static set pipelineTLS(e) {
      K.opts.pipelineTLS = e;
    }
    get pipelineTLS() {
      return this.opts.pipelineTLS ?? K.pipelineTLS;
    }
    set pipelineTLS(e) {
      this.opts.pipelineTLS = e;
    }
    static get rootCerts() {
      return K.opts.rootCerts ?? K.defaults.rootCerts;
    }
    static set rootCerts(e) {
      K.opts.rootCerts = e;
    }
    get rootCerts() {
      return this.opts.rootCerts ?? K.rootCerts;
    }
    set rootCerts(e) {
      this.opts.rootCerts = e;
    }
    wsProxyAddrForHost(e, t) {
      let r = this.wsProxy;
      if (r === void 0)
        throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
      return typeof r == "function" ? r(e, t) : `${r}?address=${e}:${t}`;
    }
    setNoDelay() {
      return this;
    }
    setKeepAlive() {
      return this;
    }
    ref() {
      return this;
    }
    unref() {
      return this;
    }
    connect(e, t, r) {
      this.connecting = !0, r && this.once("connect", r);
      let s = g(() => {
        this.connecting = !1, this.pending = !1, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), i = g((a, d = !1) => {
        a.binaryType = "arraybuffer", a.addEventListener("error", (y) => {
          this.emit("error", y), this.emit("close");
        }), a.addEventListener("message", (y) => {
          if (this.tlsState === 0) {
            let f = G.from(y.data);
            this.emit("data", f);
          }
        }), a.addEventListener("close", () => {
          this.emit("close");
        }), d ? s() : a.addEventListener(
          "open",
          s
        );
      }, "configureWebSocket"), u;
      try {
        u = this.wsProxyAddrForHost(t, typeof e == "string" ? parseInt(e, 10) : e);
      } catch (a) {
        this.emit("error", a), this.emit("close");
        return;
      }
      try {
        let a = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u;
        if (this.webSocketConstructor !== void 0)
          this.ws = new this.webSocketConstructor(a), i(this.ws);
        else
          try {
            this.ws = new WebSocket(a), i(this.ws);
          } catch {
            this.ws = new __unstable_WebSocket(a), i(this.ws);
          }
      } catch (a) {
        let d = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
        fetch(d, { headers: { Upgrade: "websocket" } }).then(
          (y) => {
            if (this.ws = y.webSocket, this.ws == null)
              throw a;
            this.ws.accept(), i(this.ws, !0);
          }
        ).catch((y) => {
          this.emit(
            "error",
            new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${y}`)
          ), this.emit("close");
        });
      }
    }
    async startTls(e) {
      if (this.subtls === void 0)
        throw new Error(
          "For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information."
        );
      this.tlsState = 1;
      let t = await this.subtls.TrustedCert.databaseFromPEM(this.rootCerts), r = new this.subtls.WebSocketReadQueue(this.ws), s = r.read.bind(r), i = this.rawWrite.bind(this), { read: u, write: a } = await this.subtls.startTls(e, t, s, i, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u, this.tlsWrite = a, this.tlsState = 2, this.encrypted = !0, this.authorized = !0, this.emit("secureConnection", this), this.tlsReadLoop();
    }
    async tlsReadLoop() {
      for (; ; ) {
        let e = await this.tlsRead();
        if (e === void 0)
          break;
        {
          let t = G.from(e);
          this.emit("data", t);
        }
      }
    }
    rawWrite(e) {
      if (!this.coalesceWrites) {
        this.ws.send(e);
        return;
      }
      if (this.writeBuffer === void 0)
        this.writeBuffer = e, setTimeout(
          () => {
            this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
          },
          0
        );
      else {
        let t = new Uint8Array(this.writeBuffer.length + e.length);
        t.set(this.writeBuffer), t.set(e, this.writeBuffer.length), this.writeBuffer = t;
      }
    }
    write(e, t = "utf8", r = (s) => {
    }) {
      return e.length === 0 ? (r(), !0) : (typeof e == "string" && (e = G.from(e, t)), this.tlsState === 0 ? (this.rawWrite(e), r()) : this.tlsState === 1 ? this.once("secureConnection", () => {
        this.write(e, t, r);
      }) : (this.tlsWrite(
        e
      ), r()), !0);
    }
    end(e = G.alloc(0), t = "utf8", r = () => {
    }) {
      return this.write(e, t, () => {
        this.ws.close(), r();
      }), this;
    }
    destroy() {
      return this.destroyed = !0, this.end();
    }
  }, g(et, "Socket"), J(et, "defaults", { poolQueryViaFetch: !1, fetchEndpoint: g(
    (n, e, t) => {
      let r;
      return t?.jwtAuth ? r = n.replace(Ht, "apiauth.") : r = n.replace(Ht, "api."), "https://" + r + "/sql";
    },
    "fetchEndpoint"
  ), fetchConnectionCache: !0, fetchFunction: void 0, webSocketConstructor: void 0, wsProxy: g(
    (n) => n + "/v2",
    "wsProxy"
  ), useSecureWebSocket: !0, forceDisablePgSSL: !0, coalesceWrites: !0, pipelineConnect: "password", subtls: void 0, rootCerts: "", pipelineTLS: !1, disableSNI: !1 }), J(et, "opts", {}), Lt = et;
}), Yr = {};
Te(Yr, { parse: () => pr });
function pr(n, e = !1) {
  let { protocol: t } = new URL(n), r = "http:" + n.substring(
    t.length
  ), { username: s, password: i, host: u, hostname: a, port: d, pathname: y, search: f, searchParams: b, hash: m } = new URL(
    r
  );
  i = decodeURIComponent(i), s = decodeURIComponent(s), y = decodeURIComponent(y);
  let v = s + ":" + i, c = e ? Object.fromEntries(b.entries()) : f;
  return {
    href: n,
    protocol: t,
    auth: v,
    username: s,
    password: i,
    host: u,
    hostname: a,
    port: d,
    pathname: y,
    search: f,
    query: c,
    hash: m
  };
}
var Xr = ye(() => {
  V(), g(pr, "parse");
}), Zr = Z((n) => {
  V(), n.parse = function(s, i) {
    return new t(s, i).parse();
  };
  var e = class en {
    constructor(i, u) {
      this.source = i, this.transform = u || r, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var i = this.source[this.position++];
      return i === "\\" ? { value: this.source[this.position++], escaped: !0 } : { value: i, escaped: !1 };
    }
    record(i) {
      this.recorded.push(
        i
      );
    }
    newEntry(i) {
      var u;
      (this.recorded.length > 0 || i) && (u = this.recorded.join(""), u === "NULL" && !i && (u = null), u !== null && (u = this.transform(u)), this.entries.push(u), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[")
        for (; !this.isEof(); ) {
          var i = this.nextCharacter();
          if (i.value === "=")
            break;
        }
    }
    parse(i) {
      var u, a, d;
      for (this.consumeDimensions(); !this.isEof(); )
        if (u = this.nextCharacter(), u.value === "{" && !d)
          this.dimension++, this.dimension > 1 && (a = new en(this.source.substr(this.position - 1), this.transform), this.entries.push(a.parse(
            !0
          )), this.position += a.position - 2);
        else if (u.value === "}" && !d) {
          if (this.dimension--, !this.dimension && (this.newEntry(), i))
            return this.entries;
        } else
          u.value === '"' && !u.escaped ? (d && this.newEntry(!0), d = !d) : u.value === "," && !d ? this.newEntry() : this.record(u.value);
      if (this.dimension !== 0)
        throw new Error("array dimension not balanced");
      return this.entries;
    }
  };
  g(e, "ArrayParser");
  var t = e;
  function r(s) {
    return s;
  }
  g(r, "identity");
}), tn = Z((n, e) => {
  V();
  var t = Zr();
  e.exports = { create: g(function(r, s) {
    return { parse: g(function() {
      return t.parse(r, s);
    }, "parse") };
  }, "create") };
}), As = Z((n, e) => {
  V();
  var t = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, r = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, s = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, i = /^-?infinity$/;
  e.exports = g(function(f) {
    if (i.test(f))
      return Number(f.replace("i", "I"));
    var b = t.exec(f);
    if (!b)
      return u(
        f
      ) || null;
    var m = !!b[8], v = parseInt(b[1], 10);
    m && (v = d(v));
    var c = parseInt(b[2], 10) - 1, h = b[3], w = parseInt(
      b[4],
      10
    ), S = parseInt(b[5], 10), _ = parseInt(b[6], 10), T = b[7];
    T = T ? 1e3 * parseFloat(T) : 0;
    var L, M = a(f);
    return M != null ? (L = new Date(Date.UTC(v, c, h, w, S, _, T)), y(v) && L.setUTCFullYear(v), M !== 0 && L.setTime(L.getTime() - M)) : (L = new Date(v, c, h, w, S, _, T), y(v) && L.setFullYear(v)), L;
  }, "parseDate");
  function u(f) {
    var b = r.exec(f);
    if (b) {
      var m = parseInt(b[1], 10), v = !!b[4];
      v && (m = d(m));
      var c = parseInt(b[2], 10) - 1, h = b[3], w = new Date(m, c, h);
      return y(
        m
      ) && w.setFullYear(m), w;
    }
  }
  g(u, "getDate");
  function a(f) {
    if (f.endsWith("+00"))
      return 0;
    var b = s.exec(f.split(" ")[1]);
    if (b) {
      var m = b[1];
      if (m === "Z")
        return 0;
      var v = m === "-" ? -1 : 1, c = parseInt(b[2], 10) * 3600 + parseInt(
        b[3] || 0,
        10
      ) * 60 + parseInt(b[4] || 0, 10);
      return c * v * 1e3;
    }
  }
  g(a, "timeZoneOffset");
  function d(f) {
    return -(f - 1);
  }
  g(d, "bcYearToNegativeYear");
  function y(f) {
    return f >= 0 && f < 100;
  }
  g(y, "is0To99");
}), xs = Z((n, e) => {
  V(), e.exports = r;
  var t = Object.prototype.hasOwnProperty;
  function r(s) {
    for (var i = 1; i < arguments.length; i++) {
      var u = arguments[i];
      for (var a in u)
        t.call(u, a) && (s[a] = u[a]);
    }
    return s;
  }
  g(r, "extend");
}), Bs = Z((n, e) => {
  V();
  var t = xs();
  e.exports = r;
  function r(_) {
    if (!(this instanceof r))
      return new r(_);
    t(this, S(_));
  }
  g(r, "PostgresInterval");
  var s = [
    "seconds",
    "minutes",
    "hours",
    "days",
    "months",
    "years"
  ];
  r.prototype.toPostgres = function() {
    var _ = s.filter(this.hasOwnProperty, this);
    return this.milliseconds && _.indexOf("seconds") < 0 && _.push("seconds"), _.length === 0 ? "0" : _.map(function(T) {
      var L = this[T] || 0;
      return T === "seconds" && this.milliseconds && (L = (L + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), L + " " + T;
    }, this).join(" ");
  };
  var i = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, u = ["years", "months", "days"], a = ["hours", "minutes", "seconds"];
  r.prototype.toISOString = r.prototype.toISO = function() {
    var _ = u.map(L, this).join(""), T = a.map(L, this).join("");
    return "P" + _ + "T" + T;
    function L(M) {
      var P = this[M] || 0;
      return M === "seconds" && this.milliseconds && (P = (P + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), P + i[M];
    }
  };
  var d = "([+-]?\\d+)", y = d + "\\s+years?", f = d + "\\s+mons?", b = d + "\\s+days?", m = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", v = new RegExp([y, f, b, m].map(function(_) {
    return "(" + _ + ")?";
  }).join("\\s*")), c = { years: 2, months: 4, days: 6, hours: 9, minutes: 10, seconds: 11, milliseconds: 12 }, h = ["hours", "minutes", "seconds", "milliseconds"];
  function w(_) {
    var T = _ + "000000".slice(_.length);
    return parseInt(
      T,
      10
    ) / 1e3;
  }
  g(w, "parseMilliseconds");
  function S(_) {
    if (!_)
      return {};
    var T = v.exec(_), L = T[8] === "-";
    return Object.keys(c).reduce(function(M, P) {
      var B = c[P], x = T[B];
      return !x || (x = P === "milliseconds" ? w(x) : parseInt(x, 10), !x) || (L && ~h.indexOf(P) && (x *= -1), M[P] = x), M;
    }, {});
  }
  g(S, "parse");
}), Ns = Z((n, e) => {
  V(), e.exports = g(function(t) {
    if (/^\\x/.test(t))
      return new G(t.substr(
        2
      ), "hex");
    for (var r = "", s = 0; s < t.length; )
      if (t[s] !== "\\")
        r += t[s], ++s;
      else if (/[0-7]{3}/.test(t.substr(s + 1, 3)))
        r += String.fromCharCode(parseInt(t.substr(s + 1, 3), 8)), s += 4;
      else {
        for (var i = 1; s + i < t.length && t[s + i] === "\\"; )
          i++;
        for (var u = 0; u < Math.floor(i / 2); ++u)
          r += "\\";
        s += Math.floor(i / 2) * 2;
      }
    return new G(r, "binary");
  }, "parseBytea");
}), Is = Z((n, e) => {
  V();
  var t = Zr(), r = tn(), s = As(), i = Bs(), u = Ns();
  function a(E) {
    return g(function(D) {
      return D === null ? D : E(D);
    }, "nullAllowed");
  }
  g(a, "allowNull");
  function d(E) {
    return E === null ? E : E === "TRUE" || E === "t" || E === "true" || E === "y" || E === "yes" || E === "on" || E === "1";
  }
  g(d, "parseBool");
  function y(E) {
    return E ? t.parse(E, d) : null;
  }
  g(y, "parseBoolArray");
  function f(E) {
    return parseInt(E, 10);
  }
  g(f, "parseBaseTenInt");
  function b(E) {
    return E ? t.parse(E, a(f)) : null;
  }
  g(b, "parseIntegerArray");
  function m(E) {
    return E ? t.parse(E, a(function(D) {
      return L(D).trim();
    })) : null;
  }
  g(m, "parseBigIntegerArray");
  var v = g(function(E) {
    if (!E)
      return null;
    var D = r.create(E, function(R) {
      return R !== null && (R = P(R)), R;
    });
    return D.parse();
  }, "parsePointArray"), c = g(function(E) {
    if (!E)
      return null;
    var D = r.create(E, function(R) {
      return R !== null && (R = parseFloat(R)), R;
    });
    return D.parse();
  }, "parseFloatArray"), h = g(function(E) {
    if (!E)
      return null;
    var D = r.create(E);
    return D.parse();
  }, "parseStringArray"), w = g(function(E) {
    if (!E)
      return null;
    var D = r.create(
      E,
      function(R) {
        return R !== null && (R = s(R)), R;
      }
    );
    return D.parse();
  }, "parseDateArray"), S = g(function(E) {
    if (!E)
      return null;
    var D = r.create(E, function(R) {
      return R !== null && (R = i(R)), R;
    });
    return D.parse();
  }, "parseIntervalArray"), _ = g(function(E) {
    return E ? t.parse(E, a(u)) : null;
  }, "parseByteAArray"), T = g(function(E) {
    return parseInt(E, 10);
  }, "parseInteger"), L = g(function(E) {
    var D = String(E);
    return /^\d+$/.test(D) ? D : E;
  }, "parseBigInteger"), M = g(function(E) {
    return E ? t.parse(E, a(JSON.parse)) : null;
  }, "parseJsonArray"), P = g(
    function(E) {
      return E[0] !== "(" ? null : (E = E.substring(1, E.length - 1).split(","), { x: parseFloat(E[0]), y: parseFloat(
        E[1]
      ) });
    },
    "parsePoint"
  ), B = g(function(E) {
    if (E[0] !== "<" && E[1] !== "(")
      return null;
    for (var D = "(", R = "", F = !1, j = 2; j < E.length - 1; j++) {
      if (F || (D += E[j]), E[j] === ")") {
        F = !0;
        continue;
      } else if (!F)
        continue;
      E[j] !== "," && (R += E[j]);
    }
    var O = P(D);
    return O.radius = parseFloat(R), O;
  }, "parseCircle"), x = g(function(E) {
    E(20, L), E(21, T), E(23, T), E(26, T), E(700, parseFloat), E(701, parseFloat), E(16, d), E(1082, s), E(1114, s), E(1184, s), E(
      600,
      P
    ), E(651, h), E(718, B), E(1e3, y), E(1001, _), E(1005, b), E(1007, b), E(1028, b), E(1016, m), E(1017, v), E(1021, c), E(1022, c), E(1231, c), E(1014, h), E(1015, h), E(1008, h), E(1009, h), E(1040, h), E(1041, h), E(
      1115,
      w
    ), E(1182, w), E(1185, w), E(1186, i), E(1187, S), E(17, u), E(114, JSON.parse.bind(JSON)), E(3802, JSON.parse.bind(JSON)), E(199, M), E(3807, M), E(3907, h), E(2951, h), E(791, h), E(1183, h), E(1270, h);
  }, "init");
  e.exports = { init: x };
}), Ls = Z((n, e) => {
  V();
  var t = 1e6;
  function r(s) {
    var i = s.readInt32BE(0), u = s.readUInt32BE(
      4
    ), a = "";
    i < 0 && (i = ~i + (u === 0), u = ~u + 1 >>> 0, a = "-");
    var d = "", y, f, b, m, v, c;
    {
      if (y = i % t, i = i / t >>> 0, f = 4294967296 * y + u, u = f / t >>> 0, b = "" + (f - t * u), u === 0 && i === 0)
        return a + b + d;
      for (m = "", v = 6 - b.length, c = 0; c < v; c++)
        m += "0";
      d = m + b + d;
    }
    {
      if (y = i % t, i = i / t >>> 0, f = 4294967296 * y + u, u = f / t >>> 0, b = "" + (f - t * u), u === 0 && i === 0)
        return a + b + d;
      for (m = "", v = 6 - b.length, c = 0; c < v; c++)
        m += "0";
      d = m + b + d;
    }
    {
      if (y = i % t, i = i / t >>> 0, f = 4294967296 * y + u, u = f / t >>> 0, b = "" + (f - t * u), u === 0 && i === 0)
        return a + b + d;
      for (m = "", v = 6 - b.length, c = 0; c < v; c++)
        m += "0";
      d = m + b + d;
    }
    return y = i % t, f = 4294967296 * y + u, b = "" + f % t, a + b + d;
  }
  g(r, "readInt8"), e.exports = r;
}), Os = Z((n, e) => {
  V();
  var t = Ls(), r = g(function(h, w, S, _, T) {
    S = S || 0, _ = _ || !1, T = T || function(F, j, O) {
      return F * Math.pow(2, O) + j;
    };
    var L = S >> 3, M = g(function(F) {
      return _ ? ~F & 255 : F;
    }, "inv"), P = 255, B = 8 - S % 8;
    w < B && (P = 255 << 8 - w & 255, B = w), S && (P = P >> S % 8);
    var x = 0;
    S % 8 + w >= 8 && (x = T(0, M(h[L]) & P, B));
    for (var E = w + S >> 3, D = L + 1; D < E; D++)
      x = T(x, M(
        h[D]
      ), 8);
    var R = (w + S) % 8;
    return R > 0 && (x = T(x, M(h[E]) >> 8 - R, R)), x;
  }, "parseBits"), s = g(function(h, w, S) {
    var _ = Math.pow(2, S - 1) - 1, T = r(h, 1), L = r(h, S, 1);
    if (L === 0)
      return 0;
    var M = 1, P = g(function(x, E, D) {
      x === 0 && (x = 1);
      for (var R = 1; R <= D; R++)
        M /= 2, (E & 1 << D - R) > 0 && (x += M);
      return x;
    }, "parsePrecisionBits"), B = r(h, w, S + 1, !1, P);
    return L == Math.pow(
      2,
      S + 1
    ) - 1 ? B === 0 ? T === 0 ? 1 / 0 : -1 / 0 : NaN : (T === 0 ? 1 : -1) * Math.pow(2, L - _) * B;
  }, "parseFloatFromBits"), i = g(function(h) {
    return r(h, 1) == 1 ? -1 * (r(h, 15, 1, !0) + 1) : r(h, 15, 1);
  }, "parseInt16"), u = g(function(h) {
    return r(h, 1) == 1 ? -1 * (r(
      h,
      31,
      1,
      !0
    ) + 1) : r(h, 31, 1);
  }, "parseInt32"), a = g(function(h) {
    return s(h, 23, 8);
  }, "parseFloat32"), d = g(function(h) {
    return s(h, 52, 11);
  }, "parseFloat64"), y = g(function(h) {
    var w = r(h, 16, 32);
    if (w == 49152)
      return NaN;
    for (var S = Math.pow(1e4, r(h, 16, 16)), _ = 0, T = [], L = r(h, 16), M = 0; M < L; M++)
      _ += r(h, 16, 64 + 16 * M) * S, S /= 1e4;
    var P = Math.pow(10, r(
      h,
      16,
      48
    ));
    return (w === 0 ? 1 : -1) * Math.round(_ * P) / P;
  }, "parseNumeric"), f = g(function(h, w) {
    var S = r(w, 1), _ = r(
      w,
      63,
      1
    ), T = new Date((S === 0 ? 1 : -1) * _ / 1e3 + 9466848e5);
    return h || T.setTime(T.getTime() + T.getTimezoneOffset() * 6e4), T.usec = _ % 1e3, T.getMicroSeconds = function() {
      return this.usec;
    }, T.setMicroSeconds = function(L) {
      this.usec = L;
    }, T.getUTCMicroSeconds = function() {
      return this.usec;
    }, T;
  }, "parseDate"), b = g(
    function(h) {
      for (var w = r(
        h,
        32
      ), S = r(h, 32, 32), _ = r(h, 32, 64), T = 96, L = [], M = 0; M < w; M++)
        L[M] = r(h, 32, T), T += 32, T += 32;
      var P = g(function(x) {
        var E = r(h, 32, T);
        if (T += 32, E == 4294967295)
          return null;
        var D;
        if (x == 23 || x == 20)
          return D = r(h, E * 8, T), T += E * 8, D;
        if (x == 25)
          return D = h.toString(this.encoding, T >> 3, (T += E << 3) >> 3), D;
        console.log("ERROR: ElementType not implemented: " + x);
      }, "parseElement"), B = g(function(x, E) {
        var D = [], R;
        if (x.length > 1) {
          var F = x.shift();
          for (R = 0; R < F; R++)
            D[R] = B(x, E);
          x.unshift(F);
        } else
          for (R = 0; R < x[0]; R++)
            D[R] = P(E);
        return D;
      }, "parse");
      return B(L, _);
    },
    "parseArray"
  ), m = g(function(h) {
    return h.toString("utf8");
  }, "parseText"), v = g(function(h) {
    return h === null ? null : r(h, 8) > 0;
  }, "parseBool"), c = g(function(h) {
    h(20, t), h(21, i), h(23, u), h(26, u), h(1700, y), h(700, a), h(701, d), h(16, v), h(1114, f.bind(null, !1)), h(1184, f.bind(null, !0)), h(1e3, b), h(1007, b), h(1016, b), h(1008, b), h(1009, b), h(25, m);
  }, "init");
  e.exports = { init: c };
}), Rs = Z((n, e) => {
  V(), e.exports = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
  };
}), Rt = Z((n) => {
  V();
  var e = Is(), t = Os(), r = tn(), s = Rs();
  n.getTypeParser = a, n.setTypeParser = d, n.arrayParser = r, n.builtins = s;
  var i = { text: {}, binary: {} };
  function u(y) {
    return String(y);
  }
  g(u, "noParse");
  function a(y, f) {
    return f = f || "text", i[f] && i[f][y] || u;
  }
  g(a, "getTypeParser");
  function d(y, f, b) {
    typeof f == "function" && (b = f, f = "text"), i[f][y] = b;
  }
  g(d, "setTypeParser"), e.init(function(y, f) {
    i.text[y] = f;
  }), t.init(function(y, f) {
    i.binary[y] = f;
  });
}), gr = Z((n, e) => {
  V();
  var t = Rt();
  function r(s) {
    this._types = s || t, this.text = {}, this.binary = {};
  }
  g(r, "TypeOverrides"), r.prototype.getOverrides = function(s) {
    switch (s) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  }, r.prototype.setTypeParser = function(s, i, u) {
    typeof i == "function" && (u = i, i = "text"), this.getOverrides(i)[s] = u;
  }, r.prototype.getTypeParser = function(s, i) {
    return i = i || "text", this.getOverrides(i)[s] || this._types.getTypeParser(s, i);
  }, e.exports = r;
});
function rt(n) {
  let e = 1779033703, t = 3144134277, r = 1013904242, s = 2773480762, i = 1359893119, u = 2600822924, a = 528734635, d = 1541459225, y = 0, f = 0, b = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], m = g((_, T) => _ >>> T | _ << 32 - T, "rrot"), v = new Uint32Array(64), c = new Uint8Array(64), h = g(() => {
    for (let D = 0, R = 0; D < 16; D++, R += 4)
      v[D] = c[R] << 24 | c[R + 1] << 16 | c[R + 2] << 8 | c[R + 3];
    for (let D = 16; D < 64; D++) {
      let R = m(v[D - 15], 7) ^ m(v[D - 15], 18) ^ v[D - 15] >>> 3, F = m(
        v[D - 2],
        17
      ) ^ m(v[D - 2], 19) ^ v[D - 2] >>> 10;
      v[D] = v[D - 16] + R + v[D - 7] + F | 0;
    }
    let _ = e, T = t, L = r, M = s, P = i, B = u, x = a, E = d;
    for (let D = 0; D < 64; D++) {
      let R = m(P, 6) ^ m(P, 11) ^ m(P, 25), F = P & B ^ ~P & x, j = E + R + F + b[D] + v[D] | 0, O = m(_, 2) ^ m(
        _,
        13
      ) ^ m(_, 22), q = _ & T ^ _ & L ^ T & L, W = O + q | 0;
      E = x, x = B, B = P, P = M + j | 0, M = L, L = T, T = _, _ = j + W | 0;
    }
    e = e + _ | 0, t = t + T | 0, r = r + L | 0, s = s + M | 0, i = i + P | 0, u = u + B | 0, a = a + x | 0, d = d + E | 0, f = 0;
  }, "process"), w = g((_) => {
    typeof _ == "string" && (_ = new TextEncoder().encode(_));
    for (let T = 0; T < _.length; T++)
      c[f++] = _[T], f === 64 && h();
    y += _.length;
  }, "add"), S = g(() => {
    if (c[f++] = 128, f == 64 && h(), f + 8 > 64) {
      for (; f < 64; )
        c[f++] = 0;
      h();
    }
    for (; f < 58; )
      c[f++] = 0;
    let _ = y * 8;
    c[f++] = _ / 1099511627776 & 255, c[f++] = _ / 4294967296 & 255, c[f++] = _ >>> 24, c[f++] = _ >>> 16 & 255, c[f++] = _ >>> 8 & 255, c[f++] = _ & 255, h();
    let T = new Uint8Array(32);
    return T[0] = e >>> 24, T[1] = e >>> 16 & 255, T[2] = e >>> 8 & 255, T[3] = e & 255, T[4] = t >>> 24, T[5] = t >>> 16 & 255, T[6] = t >>> 8 & 255, T[7] = t & 255, T[8] = r >>> 24, T[9] = r >>> 16 & 255, T[10] = r >>> 8 & 255, T[11] = r & 255, T[12] = s >>> 24, T[13] = s >>> 16 & 255, T[14] = s >>> 8 & 255, T[15] = s & 255, T[16] = i >>> 24, T[17] = i >>> 16 & 255, T[18] = i >>> 8 & 255, T[19] = i & 255, T[20] = u >>> 24, T[21] = u >>> 16 & 255, T[22] = u >>> 8 & 255, T[23] = u & 255, T[24] = a >>> 24, T[25] = a >>> 16 & 255, T[26] = a >>> 8 & 255, T[27] = a & 255, T[28] = d >>> 24, T[29] = d >>> 16 & 255, T[30] = d >>> 8 & 255, T[31] = d & 255, T;
  }, "digest");
  return n === void 0 ? { add: w, digest: S } : (w(n), S());
}
var Ms = ye(() => {
  V(), g(rt, "sha256");
}), xe, nr, Ds = ye(() => {
  V(), xe = class Pe {
    constructor() {
      J(this, "_dataLength", 0), J(this, "_bufferLength", 0), J(this, "_state", new Int32Array(4)), J(this, "_buffer", new ArrayBuffer(68)), J(this, "_buffer8"), J(this, "_buffer32"), this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
    }
    static hashByteArray(e, t = !1) {
      return this.onePassHasher.start().appendByteArray(
        e
      ).end(t);
    }
    static hashStr(e, t = !1) {
      return this.onePassHasher.start().appendStr(e).end(t);
    }
    static hashAsciiStr(e, t = !1) {
      return this.onePassHasher.start().appendAsciiStr(e).end(t);
    }
    static _hex(e) {
      let t = Pe.hexChars, r = Pe.hexOut, s, i, u, a;
      for (a = 0; a < 4; a += 1)
        for (i = a * 8, s = e[a], u = 0; u < 8; u += 2)
          r[i + 1 + u] = t.charAt(s & 15), s >>>= 4, r[i + 0 + u] = t.charAt(
            s & 15
          ), s >>>= 4;
      return r.join("");
    }
    static _md5cycle(e, t) {
      let r = e[0], s = e[1], i = e[2], u = e[3];
      r += (s & i | ~s & u) + t[0] - 680876936 | 0, r = (r << 7 | r >>> 25) + s | 0, u += (r & s | ~r & i) + t[1] - 389564586 | 0, u = (u << 12 | u >>> 20) + r | 0, i += (u & r | ~u & s) + t[2] + 606105819 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & r) + t[3] - 1044525330 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & i | ~s & u) + t[4] - 176418897 | 0, r = (r << 7 | r >>> 25) + s | 0, u += (r & s | ~r & i) + t[5] + 1200080426 | 0, u = (u << 12 | u >>> 20) + r | 0, i += (u & r | ~u & s) + t[6] - 1473231341 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & r) + t[7] - 45705983 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & i | ~s & u) + t[8] + 1770035416 | 0, r = (r << 7 | r >>> 25) + s | 0, u += (r & s | ~r & i) + t[9] - 1958414417 | 0, u = (u << 12 | u >>> 20) + r | 0, i += (u & r | ~u & s) + t[10] - 42063 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & r) + t[11] - 1990404162 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & i | ~s & u) + t[12] + 1804603682 | 0, r = (r << 7 | r >>> 25) + s | 0, u += (r & s | ~r & i) + t[13] - 40341101 | 0, u = (u << 12 | u >>> 20) + r | 0, i += (u & r | ~u & s) + t[14] - 1502002290 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & r) + t[15] + 1236535329 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & u | i & ~u) + t[1] - 165796510 | 0, r = (r << 5 | r >>> 27) + s | 0, u += (r & i | s & ~i) + t[6] - 1069501632 | 0, u = (u << 9 | u >>> 23) + r | 0, i += (u & s | r & ~s) + t[11] + 643717713 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & r | u & ~r) + t[0] - 373897302 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s & u | i & ~u) + t[5] - 701558691 | 0, r = (r << 5 | r >>> 27) + s | 0, u += (r & i | s & ~i) + t[10] + 38016083 | 0, u = (u << 9 | u >>> 23) + r | 0, i += (u & s | r & ~s) + t[15] - 660478335 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & r | u & ~r) + t[4] - 405537848 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s & u | i & ~u) + t[9] + 568446438 | 0, r = (r << 5 | r >>> 27) + s | 0, u += (r & i | s & ~i) + t[14] - 1019803690 | 0, u = (u << 9 | u >>> 23) + r | 0, i += (u & s | r & ~s) + t[3] - 187363961 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & r | u & ~r) + t[8] + 1163531501 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s & u | i & ~u) + t[13] - 1444681467 | 0, r = (r << 5 | r >>> 27) + s | 0, u += (r & i | s & ~i) + t[2] - 51403784 | 0, u = (u << 9 | u >>> 23) + r | 0, i += (u & s | r & ~s) + t[7] + 1735328473 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & r | u & ~r) + t[12] - 1926607734 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s ^ i ^ u) + t[5] - 378558 | 0, r = (r << 4 | r >>> 28) + s | 0, u += (r ^ s ^ i) + t[8] - 2022574463 | 0, u = (u << 11 | u >>> 21) + r | 0, i += (u ^ r ^ s) + t[11] + 1839030562 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ r) + t[14] - 35309556 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (s ^ i ^ u) + t[1] - 1530992060 | 0, r = (r << 4 | r >>> 28) + s | 0, u += (r ^ s ^ i) + t[4] + 1272893353 | 0, u = (u << 11 | u >>> 21) + r | 0, i += (u ^ r ^ s) + t[7] - 155497632 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ r) + t[10] - 1094730640 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (s ^ i ^ u) + t[13] + 681279174 | 0, r = (r << 4 | r >>> 28) + s | 0, u += (r ^ s ^ i) + t[0] - 358537222 | 0, u = (u << 11 | u >>> 21) + r | 0, i += (u ^ r ^ s) + t[3] - 722521979 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ r) + t[6] + 76029189 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (s ^ i ^ u) + t[9] - 640364487 | 0, r = (r << 4 | r >>> 28) + s | 0, u += (r ^ s ^ i) + t[12] - 421815835 | 0, u = (u << 11 | u >>> 21) + r | 0, i += (u ^ r ^ s) + t[15] + 530742520 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ r) + t[2] - 995338651 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (i ^ (s | ~u)) + t[0] - 198630844 | 0, r = (r << 6 | r >>> 26) + s | 0, u += (s ^ (r | ~i)) + t[7] + 1126891415 | 0, u = (u << 10 | u >>> 22) + r | 0, i += (r ^ (u | ~s)) + t[14] - 1416354905 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~r)) + t[5] - 57434055 | 0, s = (s << 21 | s >>> 11) + i | 0, r += (i ^ (s | ~u)) + t[12] + 1700485571 | 0, r = (r << 6 | r >>> 26) + s | 0, u += (s ^ (r | ~i)) + t[3] - 1894986606 | 0, u = (u << 10 | u >>> 22) + r | 0, i += (r ^ (u | ~s)) + t[10] - 1051523 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~r)) + t[1] - 2054922799 | 0, s = (s << 21 | s >>> 11) + i | 0, r += (i ^ (s | ~u)) + t[8] + 1873313359 | 0, r = (r << 6 | r >>> 26) + s | 0, u += (s ^ (r | ~i)) + t[15] - 30611744 | 0, u = (u << 10 | u >>> 22) + r | 0, i += (r ^ (u | ~s)) + t[6] - 1560198380 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~r)) + t[13] + 1309151649 | 0, s = (s << 21 | s >>> 11) + i | 0, r += (i ^ (s | ~u)) + t[4] - 145523070 | 0, r = (r << 6 | r >>> 26) + s | 0, u += (s ^ (r | ~i)) + t[11] - 1120210379 | 0, u = (u << 10 | u >>> 22) + r | 0, i += (r ^ (u | ~s)) + t[2] + 718787259 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~r)) + t[9] - 343485551 | 0, s = (s << 21 | s >>> 11) + i | 0, e[0] = r + e[0] | 0, e[1] = s + e[1] | 0, e[2] = i + e[2] | 0, e[3] = u + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(Pe.stateIdentity), this;
    }
    appendStr(e) {
      let t = this._buffer8, r = this._buffer32, s = this._bufferLength, i, u;
      for (u = 0; u < e.length; u += 1) {
        if (i = e.charCodeAt(u), i < 128)
          t[s++] = i;
        else if (i < 2048)
          t[s++] = (i >>> 6) + 192, t[s++] = i & 63 | 128;
        else if (i < 55296 || i > 56319)
          t[s++] = (i >>> 12) + 224, t[s++] = i >>> 6 & 63 | 128, t[s++] = i & 63 | 128;
        else {
          if (i = (i - 55296) * 1024 + (e.charCodeAt(++u) - 56320) + 65536, i > 1114111)
            throw new Error(
              "Unicode standard supports code points up to U+10FFFF"
            );
          t[s++] = (i >>> 18) + 240, t[s++] = i >>> 12 & 63 | 128, t[s++] = i >>> 6 & 63 | 128, t[s++] = i & 63 | 128;
        }
        s >= 64 && (this._dataLength += 64, Pe._md5cycle(this._state, r), s -= 64, r[0] = r[16]);
      }
      return this._bufferLength = s, this;
    }
    appendAsciiStr(e) {
      let t = this._buffer8, r = this._buffer32, s = this._bufferLength, i, u = 0;
      for (; ; ) {
        for (i = Math.min(e.length - u, 64 - s); i--; )
          t[s++] = e.charCodeAt(u++);
        if (s < 64)
          break;
        this._dataLength += 64, Pe._md5cycle(this._state, r), s = 0;
      }
      return this._bufferLength = s, this;
    }
    appendByteArray(e) {
      let t = this._buffer8, r = this._buffer32, s = this._bufferLength, i, u = 0;
      for (; ; ) {
        for (i = Math.min(e.length - u, 64 - s); i--; )
          t[s++] = e[u++];
        if (s < 64)
          break;
        this._dataLength += 64, Pe._md5cycle(this._state, r), s = 0;
      }
      return this._bufferLength = s, this;
    }
    getState() {
      let e = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
    }
    setState(e) {
      let t = e.buffer, r = e.state, s = this._state, i;
      for (this._dataLength = e.length, this._bufferLength = e.buflen, s[0] = r[0], s[1] = r[1], s[2] = r[2], s[3] = r[3], i = 0; i < t.length; i += 1)
        this._buffer8[i] = t.charCodeAt(i);
    }
    end(e = !1) {
      let t = this._bufferLength, r = this._buffer8, s = this._buffer32, i = (t >> 2) + 1;
      this._dataLength += t;
      let u = this._dataLength * 8;
      if (r[t] = 128, r[t + 1] = r[t + 2] = r[t + 3] = 0, s.set(Pe.buffer32Identity.subarray(i), i), t > 55 && (Pe._md5cycle(this._state, s), s.set(Pe.buffer32Identity)), u <= 4294967295)
        s[14] = u;
      else {
        let a = u.toString(16).match(/(.*?)(.{0,8})$/);
        if (a === null)
          return;
        let d = parseInt(
          a[2],
          16
        ), y = parseInt(a[1], 16) || 0;
        s[14] = d, s[15] = y;
      }
      return Pe._md5cycle(this._state, s), e ? this._state : Pe._hex(
        this._state
      );
    }
  }, g(xe, "Md5"), J(xe, "stateIdentity", new Int32Array([1732584193, -271733879, -1732584194, 271733878])), J(xe, "buffer32Identity", new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), J(xe, "hexChars", "0123456789abcdef"), J(xe, "hexOut", []), J(xe, "onePassHasher", new xe()), nr = xe;
}), mr = {};
Te(mr, { createHash: () => nn, createHmac: () => sn, randomBytes: () => rn });
function rn(n) {
  return crypto.getRandomValues(G.alloc(n));
}
function nn(n) {
  if (n === "sha256")
    return { update: g(function(e) {
      return { digest: g(
        function() {
          return G.from(rt(e));
        },
        "digest"
      ) };
    }, "update") };
  if (n === "md5")
    return { update: g(function(e) {
      return {
        digest: g(function() {
          return typeof e == "string" ? nr.hashStr(e) : nr.hashByteArray(e);
        }, "digest")
      };
    }, "update") };
  throw new Error(`Hash type '${n}' not supported`);
}
function sn(n, e) {
  if (n !== "sha256")
    throw new Error(`Only sha256 is supported (requested: '${n}')`);
  return { update: g(function(t) {
    return { digest: g(
      function() {
        typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(
          t
        ));
        let r = e.length;
        if (r > 64)
          e = rt(e);
        else if (r < 64) {
          let d = new Uint8Array(64);
          d.set(e), e = d;
        }
        let s = new Uint8Array(
          64
        ), i = new Uint8Array(64);
        for (let d = 0; d < 64; d++)
          s[d] = 54 ^ e[d], i[d] = 92 ^ e[d];
        let u = new Uint8Array(t.length + 64);
        u.set(s, 0), u.set(t, 64);
        let a = new Uint8Array(96);
        return a.set(i, 0), a.set(rt(u), 64), G.from(rt(a));
      },
      "digest"
    ) };
  }, "update") };
}
var on = ye(() => {
  V(), Ms(), Ds(), g(rn, "randomBytes"), g(nn, "createHash"), g(sn, "createHmac");
}), Mt = Z((n, e) => {
  V(), e.exports = {
    host: "localhost",
    user: X.platform === "win32" ? X.env.USERNAME : X.env.USER,
    database: void 0,
    password: null,
    connectionString: void 0,
    port: 5432,
    rows: 0,
    binary: !1,
    max: 10,
    idleTimeoutMillis: 3e4,
    client_encoding: "",
    ssl: !1,
    application_name: void 0,
    fallback_application_name: void 0,
    options: void 0,
    parseInputDatesAsUTC: !1,
    statement_timeout: !1,
    lock_timeout: !1,
    idle_in_transaction_session_timeout: !1,
    query_timeout: !1,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
  };
  var t = Rt(), r = t.getTypeParser(20, "text"), s = t.getTypeParser(
    1016,
    "text"
  );
  e.exports.__defineSetter__("parseInt8", function(i) {
    t.setTypeParser(20, "text", i ? t.getTypeParser(
      23,
      "text"
    ) : r), t.setTypeParser(1016, "text", i ? t.getTypeParser(1007, "text") : s);
  });
}), Dt = Z((n, e) => {
  V();
  var t = (on(), he(mr)), r = Mt();
  function s(c) {
    var h = c.replace(
      /\\/g,
      "\\\\"
    ).replace(/"/g, '\\"');
    return '"' + h + '"';
  }
  g(s, "escapeElement");
  function i(c) {
    for (var h = "{", w = 0; w < c.length; w++)
      w > 0 && (h = h + ","), c[w] === null || typeof c[w] > "u" ? h = h + "NULL" : Array.isArray(c[w]) ? h = h + i(c[w]) : c[w] instanceof G ? h += "\\\\x" + c[w].toString("hex") : h += s(u(c[w]));
    return h = h + "}", h;
  }
  g(i, "arrayString");
  var u = g(function(c, h) {
    if (c == null)
      return null;
    if (c instanceof G)
      return c;
    if (ArrayBuffer.isView(c)) {
      var w = G.from(c.buffer, c.byteOffset, c.byteLength);
      return w.length === c.byteLength ? w : w.slice(c.byteOffset, c.byteOffset + c.byteLength);
    }
    return c instanceof Date ? r.parseInputDatesAsUTC ? f(c) : y(c) : Array.isArray(c) ? i(c) : typeof c == "object" ? a(c, h) : c.toString();
  }, "prepareValue");
  function a(c, h) {
    if (c && typeof c.toPostgres == "function") {
      if (h = h || [], h.indexOf(c) !== -1)
        throw new Error('circular reference detected while preparing "' + c + '" for query');
      return h.push(c), u(c.toPostgres(u), h);
    }
    return JSON.stringify(c);
  }
  g(a, "prepareObject");
  function d(c, h) {
    for (c = "" + c; c.length < h; )
      c = "0" + c;
    return c;
  }
  g(d, "pad");
  function y(c) {
    var h = -c.getTimezoneOffset(), w = c.getFullYear(), S = w < 1;
    S && (w = Math.abs(w) + 1);
    var _ = d(w, 4) + "-" + d(c.getMonth() + 1, 2) + "-" + d(c.getDate(), 2) + "T" + d(
      c.getHours(),
      2
    ) + ":" + d(c.getMinutes(), 2) + ":" + d(c.getSeconds(), 2) + "." + d(c.getMilliseconds(), 3);
    return h < 0 ? (_ += "-", h *= -1) : _ += "+", _ += d(Math.floor(h / 60), 2) + ":" + d(h % 60, 2), S && (_ += " BC"), _;
  }
  g(y, "dateToString");
  function f(c) {
    var h = c.getUTCFullYear(), w = h < 1;
    w && (h = Math.abs(h) + 1);
    var S = d(h, 4) + "-" + d(c.getUTCMonth() + 1, 2) + "-" + d(c.getUTCDate(), 2) + "T" + d(c.getUTCHours(), 2) + ":" + d(c.getUTCMinutes(), 2) + ":" + d(c.getUTCSeconds(), 2) + "." + d(
      c.getUTCMilliseconds(),
      3
    );
    return S += "+00:00", w && (S += " BC"), S;
  }
  g(f, "dateToStringUTC");
  function b(c, h, w) {
    return c = typeof c == "string" ? { text: c } : c, h && (typeof h == "function" ? c.callback = h : c.values = h), w && (c.callback = w), c;
  }
  g(b, "normalizeQueryConfig");
  var m = g(function(c) {
    return t.createHash("md5").update(c, "utf-8").digest("hex");
  }, "md5"), v = g(
    function(c, h, w) {
      var S = m(h + c), _ = m(G.concat([G.from(S), w]));
      return "md5" + _;
    },
    "postgresMd5PasswordHash"
  );
  e.exports = {
    prepareValue: g(function(c) {
      return u(c);
    }, "prepareValueWrapper"),
    normalizeQueryConfig: b,
    postgresMd5PasswordHash: v,
    md5: m
  };
}), lt = {};
Te(lt, { default: () => an });
var an, $t = ye(() => {
  V(), an = {};
}), $s = Z((n, e) => {
  V();
  var t = (on(), he(mr));
  function r(h) {
    if (h.indexOf("SCRAM-SHA-256") === -1)
      throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let w = t.randomBytes(
      18
    ).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: w, response: "n,,n=*,r=" + w, message: "SASLInitialResponse" };
  }
  g(r, "startSession");
  function s(h, w, S) {
    if (h.message !== "SASLInitialResponse")
      throw new Error(
        "SASL: Last message was not SASLInitialResponse"
      );
    if (typeof w != "string")
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
    if (typeof S != "string")
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let _ = y(S);
    if (_.nonce.startsWith(h.clientNonce)) {
      if (_.nonce.length === h.clientNonce.length)
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var T = G.from(_.salt, "base64"), L = c(w, T, _.iteration), M = v(L, "Client Key"), P = m(
      M
    ), B = "n=*,r=" + h.clientNonce, x = "r=" + _.nonce + ",s=" + _.salt + ",i=" + _.iteration, E = "c=biws,r=" + _.nonce, D = B + "," + x + "," + E, R = v(P, D), F = b(M, R), j = F.toString("base64"), O = v(L, "Server Key"), q = v(O, D);
    h.message = "SASLResponse", h.serverSignature = q.toString("base64"), h.response = E + ",p=" + j;
  }
  g(s, "continueSession");
  function i(h, w) {
    if (h.message !== "SASLResponse")
      throw new Error("SASL: Last message was not SASLResponse");
    if (typeof w != "string")
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: S } = f(
      w
    );
    if (S !== h.serverSignature)
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  g(i, "finalizeSession");
  function u(h) {
    if (typeof h != "string")
      throw new TypeError("SASL: text must be a string");
    return h.split("").map((w, S) => h.charCodeAt(S)).every((w) => w >= 33 && w <= 43 || w >= 45 && w <= 126);
  }
  g(u, "isPrintableChars");
  function a(h) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(h);
  }
  g(a, "isBase64");
  function d(h) {
    if (typeof h != "string")
      throw new TypeError("SASL: attribute pairs text must be a string");
    return new Map(h.split(",").map((w) => {
      if (!/^.=/.test(w))
        throw new Error("SASL: Invalid attribute pair entry");
      let S = w[0], _ = w.substring(2);
      return [S, _];
    }));
  }
  g(d, "parseAttributePairs");
  function y(h) {
    let w = d(h), S = w.get("r");
    if (S) {
      if (!u(S))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let _ = w.get("s");
    if (_) {
      if (!a(_))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let T = w.get("i");
    if (T) {
      if (!/^[1-9][0-9]*$/.test(T))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let L = parseInt(T, 10);
    return { nonce: S, salt: _, iteration: L };
  }
  g(y, "parseServerFirstMessage");
  function f(h) {
    let w = d(h).get("v");
    if (w) {
      if (!a(w))
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
    return { serverSignature: w };
  }
  g(f, "parseServerFinalMessage");
  function b(h, w) {
    if (!G.isBuffer(h))
      throw new TypeError("first argument must be a Buffer");
    if (!G.isBuffer(w))
      throw new TypeError(
        "second argument must be a Buffer"
      );
    if (h.length !== w.length)
      throw new Error("Buffer lengths must match");
    if (h.length === 0)
      throw new Error("Buffers cannot be empty");
    return G.from(h.map((S, _) => h[_] ^ w[_]));
  }
  g(b, "xorBuffers");
  function m(h) {
    return t.createHash("sha256").update(h).digest();
  }
  g(m, "sha256");
  function v(h, w) {
    return t.createHmac("sha256", h).update(w).digest();
  }
  g(v, "hmacSha256");
  function c(h, w, S) {
    for (var _ = v(
      h,
      G.concat([w, G.from([0, 0, 0, 1])])
    ), T = _, L = 0; L < S - 1; L++)
      _ = v(h, _), T = b(T, _);
    return T;
  }
  g(c, "Hi"), e.exports = { startSession: r, continueSession: s, finalizeSession: i };
}), yr = {};
Te(yr, { join: () => un });
function un(...n) {
  return n.join("/");
}
var ln = ye(() => {
  V(), g(
    un,
    "join"
  );
}), wr = {};
Te(wr, { stat: () => cn });
function cn(n, e) {
  e(new Error("No filesystem"));
}
var hn = ye(() => {
  V(), g(cn, "stat");
}), br = {};
Te(br, { default: () => fn });
var fn, dn = ye(() => {
  V(), fn = {};
}), pn = {};
Te(pn, { StringDecoder: () => gn });
var Gt, gn, Qs = ye(() => {
  V(), Gt = class {
    constructor(e) {
      J(this, "td"), this.td = new TextDecoder(e);
    }
    write(e) {
      return this.td.decode(e, { stream: !0 });
    }
    end(e) {
      return this.td.decode(e);
    }
  }, g(Gt, "StringDecoder"), gn = Gt;
}), ks = Z((n, e) => {
  V();
  var { Transform: t } = (dn(), he(br)), { StringDecoder: r } = (Qs(), he(pn)), s = Symbol(
    "last"
  ), i = Symbol("decoder");
  function u(b, m, v) {
    let c;
    if (this.overflow) {
      if (c = this[i].write(b).split(
        this.matcher
      ), c.length === 1)
        return v();
      c.shift(), this.overflow = !1;
    } else
      this[s] += this[i].write(b), c = this[s].split(this.matcher);
    this[s] = c.pop();
    for (let h = 0; h < c.length; h++)
      try {
        d(this, this.mapper(c[h]));
      } catch (w) {
        return v(w);
      }
    if (this.overflow = this[s].length > this.maxLength, this.overflow && !this.skipOverflow) {
      v(new Error(
        "maximum buffer reached"
      ));
      return;
    }
    v();
  }
  g(u, "transform");
  function a(b) {
    if (this[s] += this[i].end(), this[s])
      try {
        d(this, this.mapper(this[s]));
      } catch (m) {
        return b(m);
      }
    b();
  }
  g(a, "flush");
  function d(b, m) {
    m !== void 0 && b.push(m);
  }
  g(d, "push");
  function y(b) {
    return b;
  }
  g(y, "noop");
  function f(b, m, v) {
    switch (b = b || /\r?\n/, m = m || y, v = v || {}, arguments.length) {
      case 1:
        typeof b == "function" ? (m = b, b = /\r?\n/) : typeof b == "object" && !(b instanceof RegExp) && !b[Symbol.split] && (v = b, b = /\r?\n/);
        break;
      case 2:
        typeof b == "function" ? (v = m, m = b, b = /\r?\n/) : typeof m == "object" && (v = m, m = y);
    }
    v = Object.assign({}, v), v.autoDestroy = !0, v.transform = u, v.flush = a, v.readableObjectMode = !0;
    let c = new t(v);
    return c[s] = "", c[i] = new r("utf8"), c.matcher = b, c.mapper = m, c.maxLength = v.maxLength, c.skipOverflow = v.skipOverflow || !1, c.overflow = !1, c._destroy = function(h, w) {
      this._writableState.errorEmitted = !1, w(h);
    }, c;
  }
  g(f, "split"), e.exports = f;
}), qs = Z((n, e) => {
  V();
  var t = (ln(), he(yr)), r = (dn(), he(br)).Stream, s = ks(), i = ($t(), he(lt)), u = 5432, a = X.platform === "win32", d = X.stderr, y = 56, f = 7, b = 61440, m = 32768;
  function v(M) {
    return (M & b) == m;
  }
  g(v, "isRegFile");
  var c = ["host", "port", "database", "user", "password"], h = c.length, w = c[h - 1];
  function S() {
    var M = d instanceof r && d.writable === !0;
    if (M) {
      var P = Array.prototype.slice.call(arguments).concat(`
`);
      d.write(i.format.apply(i, P));
    }
  }
  g(S, "warn"), Object.defineProperty(e.exports, "isWin", { get: g(function() {
    return a;
  }, "get"), set: g(function(M) {
    a = M;
  }, "set") }), e.exports.warnTo = function(M) {
    var P = d;
    return d = M, P;
  }, e.exports.getFileName = function(M) {
    var P = M || X.env, B = P.PGPASSFILE || (a ? t.join(P.APPDATA || "./", "postgresql", "pgpass.conf") : t.join(P.HOME || "./", ".pgpass"));
    return B;
  }, e.exports.usePgPass = function(M, P) {
    return Object.prototype.hasOwnProperty.call(X.env, "PGPASSWORD") ? !1 : a ? !0 : (P = P || "<unkn>", v(M.mode) ? M.mode & (y | f) ? (S('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', P), !1) : !0 : (S('WARNING: password file "%s" is not a plain file', P), !1));
  };
  var _ = e.exports.match = function(M, P) {
    return c.slice(0, -1).reduce(function(B, x, E) {
      return E == 1 && Number(M[x] || u) === Number(
        P[x]
      ) ? B && !0 : B && (P[x] === "*" || P[x] === M[x]);
    }, !0);
  };
  e.exports.getPassword = function(M, P, B) {
    var x, E = P.pipe(
      s()
    );
    function D(j) {
      var O = T(j);
      O && L(O) && _(M, O) && (x = O[w], E.end());
    }
    g(D, "onLine");
    var R = g(function() {
      P.destroy(), B(x);
    }, "onEnd"), F = g(function(j) {
      P.destroy(), S("WARNING: error on reading file: %s", j), B(
        void 0
      );
    }, "onErr");
    P.on("error", F), E.on("data", D).on("end", R).on("error", F);
  };
  var T = e.exports.parseLine = function(M) {
    if (M.length < 11 || M.match(/^\s+#/))
      return null;
    for (var P = "", B = "", x = 0, E = 0, D = 0, R = {}, F = !1, j = g(
      function(q, W, H) {
        var ee = M.substring(W, H);
        Object.hasOwnProperty.call(X.env, "PGPASS_NO_DEESCAPE") || (ee = ee.replace(/\\([:\\])/g, "$1")), R[c[q]] = ee;
      },
      "addToObj"
    ), O = 0; O < M.length - 1; O += 1) {
      if (P = M.charAt(O + 1), B = M.charAt(
        O
      ), F = x == h - 1, F) {
        j(x, E);
        break;
      }
      O >= 0 && P == ":" && B !== "\\" && (j(x, E, O + 1), E = O + 2, x += 1);
    }
    return R = Object.keys(R).length === h ? R : null, R;
  }, L = e.exports.isValidEntry = function(M) {
    for (var P = { 0: function(R) {
      return R.length > 0;
    }, 1: function(R) {
      return R === "*" ? !0 : (R = Number(R), isFinite(R) && R > 0 && R < 9007199254740992 && Math.floor(R) === R);
    }, 2: function(R) {
      return R.length > 0;
    }, 3: function(R) {
      return R.length > 0;
    }, 4: function(R) {
      return R.length > 0;
    } }, B = 0; B < c.length; B += 1) {
      var x = P[B], E = M[c[B]] || "", D = x(E);
      if (!D)
        return !1;
    }
    return !0;
  };
}), Fs = Z((n, e) => {
  V(), ln(), he(yr);
  var t = (hn(), he(wr)), r = qs();
  e.exports = function(s, i) {
    var u = r.getFileName();
    t.stat(u, function(a, d) {
      if (a || !r.usePgPass(d, u))
        return i(void 0);
      var y = t.createReadStream(
        u
      );
      r.getPassword(s, y, i);
    });
  }, e.exports.warnTo = r.warnTo;
}), mn = {};
Te(mn, { default: () => yn });
var yn, js = ye(() => {
  V(), yn = {};
}), Us = Z((n, e) => {
  V();
  var t = (Xr(), he(Yr)), r = (hn(), he(wr));
  function s(i) {
    if (i.charAt(0) === "/") {
      var a = i.split(" ");
      return { host: a[0], database: a[1] };
    }
    var u = t.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(i) ? encodeURI(i).replace(/\%25(\d\d)/g, "%$1") : i, !0), a = u.query;
    for (var d in a)
      Array.isArray(a[d]) && (a[d] = a[d][a[d].length - 1]);
    var y = (u.auth || ":").split(":");
    if (a.user = y[0], a.password = y.splice(1).join(
      ":"
    ), a.port = u.port, u.protocol == "socket:")
      return a.host = decodeURI(u.pathname), a.database = u.query.db, a.client_encoding = u.query.encoding, a;
    a.host || (a.host = u.hostname);
    var f = u.pathname;
    if (!a.host && f && /^%2f/i.test(f)) {
      var b = f.split("/");
      a.host = decodeURIComponent(b[0]), f = b.splice(1).join("/");
    }
    switch (f && f.charAt(
      0
    ) === "/" && (f = f.slice(1) || null), a.database = f && decodeURI(f), (a.ssl === "true" || a.ssl === "1") && (a.ssl = !0), a.ssl === "0" && (a.ssl = !1), (a.sslcert || a.sslkey || a.sslrootcert || a.sslmode) && (a.ssl = {}), a.sslcert && (a.ssl.cert = r.readFileSync(a.sslcert).toString()), a.sslkey && (a.ssl.key = r.readFileSync(a.sslkey).toString()), a.sslrootcert && (a.ssl.ca = r.readFileSync(a.sslrootcert).toString()), a.sslmode) {
      case "disable": {
        a.ssl = !1;
        break;
      }
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        break;
      case "no-verify": {
        a.ssl.rejectUnauthorized = !1;
        break;
      }
    }
    return a;
  }
  g(s, "parse"), e.exports = s, s.parse = s;
}), vr = Z((n, e) => {
  V();
  var t = (js(), he(mn)), r = Mt(), s = Us().parse, i = g(function(b, m, v) {
    return v === void 0 ? v = X.env["PG" + b.toUpperCase()] : v === !1 || (v = X.env[v]), m[b] || v || r[b];
  }, "val"), u = g(function() {
    switch (X.env.PGSSLMODE) {
      case "disable":
        return !1;
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        return !0;
      case "no-verify":
        return { rejectUnauthorized: !1 };
    }
    return r.ssl;
  }, "readSSLConfigFromEnvironment"), a = g(function(b) {
    return "'" + ("" + b).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  }, "quoteParamValue"), d = g(function(b, m, v) {
    var c = m[v];
    c != null && b.push(v + "=" + a(c));
  }, "add"), y = class {
    constructor(m) {
      m = typeof m == "string" ? s(m) : m || {}, m.connectionString && (m = Object.assign({}, m, s(m.connectionString))), this.user = i("user", m), this.database = i("database", m), this.database === void 0 && (this.database = this.user), this.port = parseInt(i("port", m), 10), this.host = i("host", m), Object.defineProperty(this, "password", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: i("password", m)
      }), this.binary = i("binary", m), this.options = i("options", m), this.ssl = typeof m.ssl > "u" ? u() : m.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = !0), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: !1 }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: !1 }), this.client_encoding = i("client_encoding", m), this.replication = i("replication", m), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = i("application_name", m, "PGAPPNAME"), this.fallback_application_name = i("fallback_application_name", m, !1), this.statement_timeout = i("statement_timeout", m, !1), this.lock_timeout = i("lock_timeout", m, !1), this.idle_in_transaction_session_timeout = i("idle_in_transaction_session_timeout", m, !1), this.query_timeout = i("query_timeout", m, !1), m.connectionTimeoutMillis === void 0 ? this.connect_timeout = X.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(m.connectionTimeoutMillis / 1e3), m.keepAlive === !1 ? this.keepalives = 0 : m.keepAlive === !0 && (this.keepalives = 1), typeof m.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(m.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(m) {
      var v = [];
      d(v, this, "user"), d(v, this, "password"), d(v, this, "port"), d(v, this, "application_name"), d(
        v,
        this,
        "fallback_application_name"
      ), d(v, this, "connect_timeout"), d(v, this, "options");
      var c = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (d(v, c, "sslmode"), d(v, c, "sslca"), d(v, c, "sslkey"), d(v, c, "sslcert"), d(v, c, "sslrootcert"), this.database && v.push("dbname=" + a(this.database)), this.replication && v.push("replication=" + a(this.replication)), this.host && v.push("host=" + a(this.host)), this.isDomainSocket)
        return m(null, v.join(" "));
      this.client_encoding && v.push("client_encoding=" + a(this.client_encoding)), t.lookup(this.host, function(h, w) {
        return h ? m(h, null) : (v.push("hostaddr=" + a(w)), m(null, v.join(" ")));
      });
    }
  };
  g(y, "ConnectionParameters");
  var f = y;
  e.exports = f;
}), zs = Z((n, e) => {
  V();
  var t = Rt(), r = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, s = class {
    constructor(a, d) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = d, this.RowCtor = null, this.rowAsArray = a === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(a) {
      var d;
      a.text ? d = r.exec(a.text) : d = r.exec(a.command), d && (this.command = d[1], d[3] ? (this.oid = parseInt(
        d[2],
        10
      ), this.rowCount = parseInt(d[3], 10)) : d[2] && (this.rowCount = parseInt(d[2], 10)));
    }
    _parseRowAsArray(a) {
      for (var d = new Array(
        a.length
      ), y = 0, f = a.length; y < f; y++) {
        var b = a[y];
        b !== null ? d[y] = this._parsers[y](b) : d[y] = null;
      }
      return d;
    }
    parseRow(a) {
      for (var d = {}, y = 0, f = a.length; y < f; y++) {
        var b = a[y], m = this.fields[y].name;
        b !== null ? d[m] = this._parsers[y](
          b
        ) : d[m] = null;
      }
      return d;
    }
    addRow(a) {
      this.rows.push(a);
    }
    addFields(a) {
      this.fields = a, this.fields.length && (this._parsers = new Array(a.length));
      for (var d = 0; d < a.length; d++) {
        var y = a[d];
        this._types ? this._parsers[d] = this._types.getTypeParser(y.dataTypeID, y.format || "text") : this._parsers[d] = t.getTypeParser(y.dataTypeID, y.format || "text");
      }
    }
  };
  g(s, "Result");
  var i = s;
  e.exports = i;
}), Vs = Z((n, e) => {
  V();
  var { EventEmitter: t } = ke(), r = zs(), s = Dt(), i = class extends t {
    constructor(d, y, f) {
      super(), d = s.normalizeQueryConfig(d, y, f), this.text = d.text, this.values = d.values, this.rows = d.rows, this.types = d.types, this.name = d.name, this.binary = d.binary, this.portal = d.portal || "", this.callback = d.callback, this._rowMode = d.rowMode, X.domain && d.callback && (this.callback = X.domain.bind(d.callback)), this._result = new r(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = !1, this._canceledDueToError = !1, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? !0 : !this.text || !this.values ? !1 : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new r(this._rowMode, this.types), this._results.push(this._result));
    }
    handleRowDescription(d) {
      this._checkForMultirow(), this._result.addFields(d.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(d) {
      let y;
      if (!this._canceledDueToError) {
        try {
          y = this._result.parseRow(
            d.fields
          );
        } catch (f) {
          this._canceledDueToError = f;
          return;
        }
        this.emit("row", y, this._result), this._accumulateRows && this._result.addRow(y);
      }
    }
    handleCommandComplete(d, y) {
      this._checkForMultirow(), this._result.addCommandComplete(
        d
      ), this.rows && y.sync();
    }
    handleEmptyQuery(d) {
      this.rows && d.sync();
    }
    handleError(d, y) {
      if (this._canceledDueToError && (d = this._canceledDueToError, this._canceledDueToError = !1), this.callback)
        return this.callback(d);
      this.emit("error", d);
    }
    handleReadyForQuery(d) {
      if (this._canceledDueToError)
        return this.handleError(
          this._canceledDueToError,
          d
        );
      if (this.callback)
        try {
          this.callback(null, this._results);
        } catch (y) {
          X.nextTick(() => {
            throw y;
          });
        }
      this.emit(
        "end",
        this._results
      );
    }
    submit(d) {
      if (typeof this.text != "string" && typeof this.name != "string")
        return new Error(
          "A query must have either text or a name. Supplying neither is unsupported."
        );
      let y = d.parsedStatements[this.name];
      return this.text && y && this.text !== y ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(d) : d.query(this.text), null);
    }
    hasBeenParsed(d) {
      return this.name && d.parsedStatements[this.name];
    }
    handlePortalSuspended(d) {
      this._getRows(d, this.rows);
    }
    _getRows(d, y) {
      d.execute({ portal: this.portal, rows: y }), y ? d.flush() : d.sync();
    }
    prepare(d) {
      this.isPreparedStatement = !0, this.hasBeenParsed(d) || d.parse({ text: this.text, name: this.name, types: this.types });
      try {
        d.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: s.prepareValue });
      } catch (y) {
        this.handleError(y, d);
        return;
      }
      d.describe({ type: "P", name: this.portal || "" }), this._getRows(d, this.rows);
    }
    handleCopyInResponse(d) {
      d.sendCopyFail("No source stream defined");
    }
    handleCopyData(d, y) {
    }
  };
  g(i, "Query");
  var u = i;
  e.exports = u;
}), wn = Z((n) => {
  V(), Object.defineProperty(n, "__esModule", { value: !0 }), n.NoticeMessage = n.DataRowMessage = n.CommandCompleteMessage = n.ReadyForQueryMessage = n.NotificationResponseMessage = n.BackendKeyDataMessage = n.AuthenticationMD5Password = n.ParameterStatusMessage = n.ParameterDescriptionMessage = n.RowDescriptionMessage = n.Field = n.CopyResponse = n.CopyDataMessage = n.DatabaseError = n.copyDone = n.emptyQuery = n.replicationStart = n.portalSuspended = n.noData = n.closeComplete = n.bindComplete = n.parseComplete = void 0, n.parseComplete = { name: "parseComplete", length: 5 }, n.bindComplete = { name: "bindComplete", length: 5 }, n.closeComplete = { name: "closeComplete", length: 5 }, n.noData = { name: "noData", length: 5 }, n.portalSuspended = { name: "portalSuspended", length: 5 }, n.replicationStart = { name: "replicationStart", length: 4 }, n.emptyQuery = { name: "emptyQuery", length: 4 }, n.copyDone = { name: "copyDone", length: 4 };
  var e = class extends Error {
    constructor(O, q, W) {
      super(O), this.length = q, this.name = W;
    }
  };
  g(e, "DatabaseError");
  var t = e;
  n.DatabaseError = t;
  var r = class {
    constructor(O, q) {
      this.length = O, this.chunk = q, this.name = "copyData";
    }
  };
  g(r, "CopyDataMessage");
  var s = r;
  n.CopyDataMessage = s;
  var i = class {
    constructor(O, q, W, H) {
      this.length = O, this.name = q, this.binary = W, this.columnTypes = new Array(H);
    }
  };
  g(i, "CopyResponse");
  var u = i;
  n.CopyResponse = u;
  var a = class {
    constructor(O, q, W, H, ee, re, we) {
      this.name = O, this.tableID = q, this.columnID = W, this.dataTypeID = H, this.dataTypeSize = ee, this.dataTypeModifier = re, this.format = we;
    }
  };
  g(a, "Field");
  var d = a;
  n.Field = d;
  var y = class {
    constructor(O, q) {
      this.length = O, this.fieldCount = q, this.name = "rowDescription", this.fields = new Array(this.fieldCount);
    }
  };
  g(y, "RowDescriptionMessage");
  var f = y;
  n.RowDescriptionMessage = f;
  var b = class {
    constructor(O, q) {
      this.length = O, this.parameterCount = q, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  };
  g(b, "ParameterDescriptionMessage");
  var m = b;
  n.ParameterDescriptionMessage = m;
  var v = class {
    constructor(O, q, W) {
      this.length = O, this.parameterName = q, this.parameterValue = W, this.name = "parameterStatus";
    }
  };
  g(v, "ParameterStatusMessage");
  var c = v;
  n.ParameterStatusMessage = c;
  var h = class {
    constructor(O, q) {
      this.length = O, this.salt = q, this.name = "authenticationMD5Password";
    }
  };
  g(h, "AuthenticationMD5Password");
  var w = h;
  n.AuthenticationMD5Password = w;
  var S = class {
    constructor(O, q, W) {
      this.length = O, this.processID = q, this.secretKey = W, this.name = "backendKeyData";
    }
  };
  g(S, "BackendKeyDataMessage");
  var _ = S;
  n.BackendKeyDataMessage = _;
  var T = class {
    constructor(O, q, W, H) {
      this.length = O, this.processId = q, this.channel = W, this.payload = H, this.name = "notification";
    }
  };
  g(T, "NotificationResponseMessage");
  var L = T;
  n.NotificationResponseMessage = L;
  var M = class {
    constructor(O, q) {
      this.length = O, this.status = q, this.name = "readyForQuery";
    }
  };
  g(M, "ReadyForQueryMessage");
  var P = M;
  n.ReadyForQueryMessage = P;
  var B = class {
    constructor(O, q) {
      this.length = O, this.text = q, this.name = "commandComplete";
    }
  };
  g(B, "CommandCompleteMessage");
  var x = B;
  n.CommandCompleteMessage = x;
  var E = class {
    constructor(O, q) {
      this.length = O, this.fields = q, this.name = "dataRow", this.fieldCount = q.length;
    }
  };
  g(E, "DataRowMessage");
  var D = E;
  n.DataRowMessage = D;
  var R = class {
    constructor(O, q) {
      this.length = O, this.message = q, this.name = "notice";
    }
  };
  g(R, "NoticeMessage");
  var F = R;
  n.NoticeMessage = F;
}), Ws = Z((n) => {
  V(), Object.defineProperty(n, "__esModule", { value: !0 }), n.Writer = void 0;
  var e = class {
    constructor(s = 256) {
      this.size = s, this.offset = 5, this.headerPosition = 0, this.buffer = G.allocUnsafe(s);
    }
    ensure(s) {
      var i = this.buffer.length - this.offset;
      if (i < s) {
        var u = this.buffer, a = u.length + (u.length >> 1) + s;
        this.buffer = G.allocUnsafe(a), u.copy(this.buffer);
      }
    }
    addInt32(s) {
      return this.ensure(4), this.buffer[this.offset++] = s >>> 24 & 255, this.buffer[this.offset++] = s >>> 16 & 255, this.buffer[this.offset++] = s >>> 8 & 255, this.buffer[this.offset++] = s >>> 0 & 255, this;
    }
    addInt16(s) {
      return this.ensure(2), this.buffer[this.offset++] = s >>> 8 & 255, this.buffer[this.offset++] = s >>> 0 & 255, this;
    }
    addCString(s) {
      if (!s)
        this.ensure(1);
      else {
        var i = G.byteLength(s);
        this.ensure(i + 1), this.buffer.write(s, this.offset, "utf-8"), this.offset += i;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(s = "") {
      var i = G.byteLength(s);
      return this.ensure(i), this.buffer.write(s, this.offset), this.offset += i, this;
    }
    add(s) {
      return this.ensure(
        s.length
      ), s.copy(this.buffer, this.offset), this.offset += s.length, this;
    }
    join(s) {
      if (s) {
        this.buffer[this.headerPosition] = s;
        let i = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(i, this.headerPosition + 1);
      }
      return this.buffer.slice(s ? 0 : 5, this.offset);
    }
    flush(s) {
      var i = this.join(s);
      return this.offset = 5, this.headerPosition = 0, this.buffer = G.allocUnsafe(this.size), i;
    }
  };
  g(e, "Writer");
  var t = e;
  n.Writer = t;
}), Ks = Z((n) => {
  V(), Object.defineProperty(n, "__esModule", { value: !0 }), n.serialize = void 0;
  var e = Ws(), t = new e.Writer(), r = g((O) => {
    t.addInt16(3).addInt16(0);
    for (let H of Object.keys(O))
      t.addCString(
        H
      ).addCString(O[H]);
    t.addCString("client_encoding").addCString("UTF8");
    var q = t.addCString("").flush(), W = q.length + 4;
    return new e.Writer().addInt32(W).add(q).flush();
  }, "startup"), s = g(() => {
    let O = G.allocUnsafe(
      8
    );
    return O.writeInt32BE(8, 0), O.writeInt32BE(80877103, 4), O;
  }, "requestSsl"), i = g((O) => t.addCString(O).flush(
    112
  ), "password"), u = g(function(O, q) {
    return t.addCString(O).addInt32(G.byteLength(q)).addString(q), t.flush(112);
  }, "sendSASLInitialResponseMessage"), a = g(function(O) {
    return t.addString(O).flush(112);
  }, "sendSCRAMClientFinalMessage"), d = g((O) => t.addCString(O).flush(81), "query"), y = [], f = g((O) => {
    let q = O.name || "";
    q.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", q, q.length), console.error("This can cause conflicts and silent errors executing queries"));
    let W = O.types || y;
    for (var H = W.length, ee = t.addCString(q).addCString(O.text).addInt16(
      H
    ), re = 0; re < H; re++)
      ee.addInt32(W[re]);
    return t.flush(80);
  }, "parse"), b = new e.Writer(), m = g(function(O, q) {
    for (let W = 0; W < O.length; W++) {
      let H = q ? q(O[W], W) : O[W];
      H == null ? (t.addInt16(0), b.addInt32(-1)) : H instanceof G ? (t.addInt16(
        1
      ), b.addInt32(H.length), b.add(H)) : (t.addInt16(0), b.addInt32(G.byteLength(H)), b.addString(H));
    }
  }, "writeValues"), v = g((O = {}) => {
    let q = O.portal || "", W = O.statement || "", H = O.binary || !1, ee = O.values || y, re = ee.length;
    return t.addCString(q).addCString(W), t.addInt16(re), m(ee, O.valueMapper), t.addInt16(re), t.add(b.flush()), t.addInt16(H ? 1 : 0), t.flush(66);
  }, "bind"), c = G.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), h = g((O) => {
    if (!O || !O.portal && !O.rows)
      return c;
    let q = O.portal || "", W = O.rows || 0, H = G.byteLength(q), ee = 4 + H + 1 + 4, re = G.allocUnsafe(1 + ee);
    return re[0] = 69, re.writeInt32BE(ee, 1), re.write(q, 5, "utf-8"), re[H + 5] = 0, re.writeUInt32BE(W, re.length - 4), re;
  }, "execute"), w = g(
    (O, q) => {
      let W = G.allocUnsafe(16);
      return W.writeInt32BE(16, 0), W.writeInt16BE(1234, 4), W.writeInt16BE(
        5678,
        6
      ), W.writeInt32BE(O, 8), W.writeInt32BE(q, 12), W;
    },
    "cancel"
  ), S = g((O, q) => {
    let W = 4 + G.byteLength(q) + 1, H = G.allocUnsafe(1 + W);
    return H[0] = O, H.writeInt32BE(W, 1), H.write(q, 5, "utf-8"), H[W] = 0, H;
  }, "cstringMessage"), _ = t.addCString("P").flush(68), T = t.addCString("S").flush(68), L = g((O) => O.name ? S(68, `${O.type}${O.name || ""}`) : O.type === "P" ? _ : T, "describe"), M = g((O) => {
    let q = `${O.type}${O.name || ""}`;
    return S(67, q);
  }, "close"), P = g((O) => t.add(O).flush(100), "copyData"), B = g((O) => S(102, O), "copyFail"), x = g((O) => G.from([O, 0, 0, 0, 4]), "codeOnlyBuffer"), E = x(72), D = x(83), R = x(88), F = x(99), j = {
    startup: r,
    password: i,
    requestSsl: s,
    sendSASLInitialResponseMessage: u,
    sendSCRAMClientFinalMessage: a,
    query: d,
    parse: f,
    bind: v,
    execute: h,
    describe: L,
    close: M,
    flush: g(
      () => E,
      "flush"
    ),
    sync: g(() => D, "sync"),
    end: g(() => R, "end"),
    copyData: P,
    copyDone: g(() => F, "copyDone"),
    copyFail: B,
    cancel: w
  };
  n.serialize = j;
}), Hs = Z((n) => {
  V(), Object.defineProperty(n, "__esModule", { value: !0 }), n.BufferReader = void 0;
  var e = G.allocUnsafe(0), t = class {
    constructor(i = 0) {
      this.offset = i, this.buffer = e, this.encoding = "utf-8";
    }
    setBuffer(i, u) {
      this.offset = i, this.buffer = u;
    }
    int16() {
      let i = this.buffer.readInt16BE(this.offset);
      return this.offset += 2, i;
    }
    byte() {
      let i = this.buffer[this.offset];
      return this.offset++, i;
    }
    int32() {
      let i = this.buffer.readInt32BE(
        this.offset
      );
      return this.offset += 4, i;
    }
    uint32() {
      let i = this.buffer.readUInt32BE(this.offset);
      return this.offset += 4, i;
    }
    string(i) {
      let u = this.buffer.toString(this.encoding, this.offset, this.offset + i);
      return this.offset += i, u;
    }
    cstring() {
      let i = this.offset, u = i;
      for (; this.buffer[u++] !== 0; )
        ;
      return this.offset = u, this.buffer.toString(this.encoding, i, u - 1);
    }
    bytes(i) {
      let u = this.buffer.slice(this.offset, this.offset + i);
      return this.offset += i, u;
    }
  };
  g(t, "BufferReader");
  var r = t;
  n.BufferReader = r;
}), Gs = Z((n) => {
  V(), Object.defineProperty(n, "__esModule", { value: !0 }), n.Parser = void 0;
  var e = wn(), t = Hs(), r = 1, s = 4, i = r + s, u = G.allocUnsafe(0), a = class {
    constructor(f) {
      if (this.buffer = u, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new t.BufferReader(), f?.mode === "binary")
        throw new Error("Binary mode not supported yet");
      this.mode = f?.mode || "text";
    }
    parse(f, b) {
      this.mergeBuffer(f);
      let m = this.bufferOffset + this.bufferLength, v = this.bufferOffset;
      for (; v + i <= m; ) {
        let c = this.buffer[v], h = this.buffer.readUInt32BE(
          v + r
        ), w = r + h;
        if (w + v <= m) {
          let S = this.handlePacket(v + i, c, h, this.buffer);
          b(S), v += w;
        } else
          break;
      }
      v === m ? (this.buffer = u, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = m - v, this.bufferOffset = v);
    }
    mergeBuffer(f) {
      if (this.bufferLength > 0) {
        let b = this.bufferLength + f.byteLength;
        if (b + this.bufferOffset > this.buffer.byteLength) {
          let m;
          if (b <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength)
            m = this.buffer;
          else {
            let v = this.buffer.byteLength * 2;
            for (; b >= v; )
              v *= 2;
            m = G.allocUnsafe(v);
          }
          this.buffer.copy(m, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = m, this.bufferOffset = 0;
        }
        f.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = b;
      } else
        this.buffer = f, this.bufferOffset = 0, this.bufferLength = f.byteLength;
    }
    handlePacket(f, b, m, v) {
      switch (b) {
        case 50:
          return e.bindComplete;
        case 49:
          return e.parseComplete;
        case 51:
          return e.closeComplete;
        case 110:
          return e.noData;
        case 115:
          return e.portalSuspended;
        case 99:
          return e.copyDone;
        case 87:
          return e.replicationStart;
        case 73:
          return e.emptyQuery;
        case 68:
          return this.parseDataRowMessage(f, m, v);
        case 67:
          return this.parseCommandCompleteMessage(
            f,
            m,
            v
          );
        case 90:
          return this.parseReadyForQueryMessage(f, m, v);
        case 65:
          return this.parseNotificationMessage(
            f,
            m,
            v
          );
        case 82:
          return this.parseAuthenticationResponse(f, m, v);
        case 83:
          return this.parseParameterStatusMessage(
            f,
            m,
            v
          );
        case 75:
          return this.parseBackendKeyData(f, m, v);
        case 69:
          return this.parseErrorMessage(f, m, v, "error");
        case 78:
          return this.parseErrorMessage(f, m, v, "notice");
        case 84:
          return this.parseRowDescriptionMessage(
            f,
            m,
            v
          );
        case 116:
          return this.parseParameterDescriptionMessage(f, m, v);
        case 71:
          return this.parseCopyInMessage(
            f,
            m,
            v
          );
        case 72:
          return this.parseCopyOutMessage(f, m, v);
        case 100:
          return this.parseCopyData(f, m, v);
        default:
          return new e.DatabaseError("received invalid response: " + b.toString(16), m, "error");
      }
    }
    parseReadyForQueryMessage(f, b, m) {
      this.reader.setBuffer(f, m);
      let v = this.reader.string(1);
      return new e.ReadyForQueryMessage(b, v);
    }
    parseCommandCompleteMessage(f, b, m) {
      this.reader.setBuffer(f, m);
      let v = this.reader.cstring();
      return new e.CommandCompleteMessage(b, v);
    }
    parseCopyData(f, b, m) {
      let v = m.slice(f, f + (b - 4));
      return new e.CopyDataMessage(b, v);
    }
    parseCopyInMessage(f, b, m) {
      return this.parseCopyMessage(
        f,
        b,
        m,
        "copyInResponse"
      );
    }
    parseCopyOutMessage(f, b, m) {
      return this.parseCopyMessage(f, b, m, "copyOutResponse");
    }
    parseCopyMessage(f, b, m, v) {
      this.reader.setBuffer(f, m);
      let c = this.reader.byte() !== 0, h = this.reader.int16(), w = new e.CopyResponse(b, v, c, h);
      for (let S = 0; S < h; S++)
        w.columnTypes[S] = this.reader.int16();
      return w;
    }
    parseNotificationMessage(f, b, m) {
      this.reader.setBuffer(f, m);
      let v = this.reader.int32(), c = this.reader.cstring(), h = this.reader.cstring();
      return new e.NotificationResponseMessage(b, v, c, h);
    }
    parseRowDescriptionMessage(f, b, m) {
      this.reader.setBuffer(
        f,
        m
      );
      let v = this.reader.int16(), c = new e.RowDescriptionMessage(b, v);
      for (let h = 0; h < v; h++)
        c.fields[h] = this.parseField();
      return c;
    }
    parseField() {
      let f = this.reader.cstring(), b = this.reader.uint32(), m = this.reader.int16(), v = this.reader.uint32(), c = this.reader.int16(), h = this.reader.int32(), w = this.reader.int16() === 0 ? "text" : "binary";
      return new e.Field(f, b, m, v, c, h, w);
    }
    parseParameterDescriptionMessage(f, b, m) {
      this.reader.setBuffer(f, m);
      let v = this.reader.int16(), c = new e.ParameterDescriptionMessage(b, v);
      for (let h = 0; h < v; h++)
        c.dataTypeIDs[h] = this.reader.int32();
      return c;
    }
    parseDataRowMessage(f, b, m) {
      this.reader.setBuffer(f, m);
      let v = this.reader.int16(), c = new Array(v);
      for (let h = 0; h < v; h++) {
        let w = this.reader.int32();
        c[h] = w === -1 ? null : this.reader.string(w);
      }
      return new e.DataRowMessage(b, c);
    }
    parseParameterStatusMessage(f, b, m) {
      this.reader.setBuffer(f, m);
      let v = this.reader.cstring(), c = this.reader.cstring();
      return new e.ParameterStatusMessage(
        b,
        v,
        c
      );
    }
    parseBackendKeyData(f, b, m) {
      this.reader.setBuffer(f, m);
      let v = this.reader.int32(), c = this.reader.int32();
      return new e.BackendKeyDataMessage(b, v, c);
    }
    parseAuthenticationResponse(f, b, m) {
      this.reader.setBuffer(
        f,
        m
      );
      let v = this.reader.int32(), c = { name: "authenticationOk", length: b };
      switch (v) {
        case 0:
          break;
        case 3:
          c.length === 8 && (c.name = "authenticationCleartextPassword");
          break;
        case 5:
          if (c.length === 12) {
            c.name = "authenticationMD5Password";
            let w = this.reader.bytes(4);
            return new e.AuthenticationMD5Password(b, w);
          }
          break;
        case 10:
          c.name = "authenticationSASL", c.mechanisms = [];
          let h;
          do
            h = this.reader.cstring(), h && c.mechanisms.push(h);
          while (h);
          break;
        case 11:
          c.name = "authenticationSASLContinue", c.data = this.reader.string(b - 8);
          break;
        case 12:
          c.name = "authenticationSASLFinal", c.data = this.reader.string(b - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + v);
      }
      return c;
    }
    parseErrorMessage(f, b, m, v) {
      this.reader.setBuffer(f, m);
      let c = {}, h = this.reader.string(1);
      for (; h !== "\0"; )
        c[h] = this.reader.cstring(), h = this.reader.string(1);
      let w = c.M, S = v === "notice" ? new e.NoticeMessage(b, w) : new e.DatabaseError(w, b, v);
      return S.severity = c.S, S.code = c.C, S.detail = c.D, S.hint = c.H, S.position = c.P, S.internalPosition = c.p, S.internalQuery = c.q, S.where = c.W, S.schema = c.s, S.table = c.t, S.column = c.c, S.dataType = c.d, S.constraint = c.n, S.file = c.F, S.line = c.L, S.routine = c.R, S;
    }
  };
  g(a, "Parser");
  var d = a;
  n.Parser = d;
}), bn = Z((n) => {
  V(), Object.defineProperty(n, "__esModule", { value: !0 }), n.DatabaseError = n.serialize = n.parse = void 0;
  var e = wn();
  Object.defineProperty(n, "DatabaseError", { enumerable: !0, get: g(
    function() {
      return e.DatabaseError;
    },
    "get"
  ) });
  var t = Ks();
  Object.defineProperty(n, "serialize", {
    enumerable: !0,
    get: g(function() {
      return t.serialize;
    }, "get")
  });
  var r = Gs();
  function s(i, u) {
    let a = new r.Parser();
    return i.on("data", (d) => a.parse(d, u)), new Promise((d) => i.on("end", () => d()));
  }
  g(s, "parse"), n.parse = s;
}), vn = {};
Te(vn, { connect: () => Sn });
function Sn({ socket: n, servername: e }) {
  return n.startTls(e), n;
}
var Js = ye(
  () => {
    V(), g(Sn, "connect");
  }
), Pn = Z((n, e) => {
  V();
  var t = (Ot(), he(Gr)), r = ke().EventEmitter, { parse: s, serialize: i } = bn(), u = i.flush(), a = i.sync(), d = i.end(), y = class extends r {
    constructor(m) {
      super(), m = m || {}, this.stream = m.stream || new t.Socket(), this._keepAlive = m.keepAlive, this._keepAliveInitialDelayMillis = m.keepAliveInitialDelayMillis, this.lastBuffer = !1, this.parsedStatements = {}, this.ssl = m.ssl || !1, this._ending = !1, this._emitMessage = !1;
      var v = this;
      this.on("newListener", function(c) {
        c === "message" && (v._emitMessage = !0);
      });
    }
    connect(m, v) {
      var c = this;
      this._connecting = !0, this.stream.setNoDelay(!0), this.stream.connect(m, v), this.stream.once("connect", function() {
        c._keepAlive && c.stream.setKeepAlive(!0, c._keepAliveInitialDelayMillis), c.emit("connect");
      });
      let h = g(function(w) {
        c._ending && (w.code === "ECONNRESET" || w.code === "EPIPE") || c.emit("error", w);
      }, "reportStreamError");
      if (this.stream.on("error", h), this.stream.on("close", function() {
        c.emit("end");
      }), !this.ssl)
        return this.attachListeners(
          this.stream
        );
      this.stream.once("data", function(w) {
        var S = w.toString("utf8");
        switch (S) {
          case "S":
            break;
          case "N":
            return c.stream.end(), c.emit("error", new Error("The server does not support SSL connections"));
          default:
            return c.stream.end(), c.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        var _ = (Js(), he(vn));
        let T = { socket: c.stream };
        c.ssl !== !0 && (Object.assign(T, c.ssl), "key" in c.ssl && (T.key = c.ssl.key)), t.isIP(v) === 0 && (T.servername = v);
        try {
          c.stream = _.connect(T);
        } catch (L) {
          return c.emit(
            "error",
            L
          );
        }
        c.attachListeners(c.stream), c.stream.on("error", h), c.emit("sslconnect");
      });
    }
    attachListeners(m) {
      m.on(
        "end",
        () => {
          this.emit("end");
        }
      ), s(m, (v) => {
        var c = v.name === "error" ? "errorMessage" : v.name;
        this._emitMessage && this.emit("message", v), this.emit(c, v);
      });
    }
    requestSsl() {
      this.stream.write(i.requestSsl());
    }
    startup(m) {
      this.stream.write(i.startup(m));
    }
    cancel(m, v) {
      this._send(i.cancel(m, v));
    }
    password(m) {
      this._send(i.password(m));
    }
    sendSASLInitialResponseMessage(m, v) {
      this._send(i.sendSASLInitialResponseMessage(m, v));
    }
    sendSCRAMClientFinalMessage(m) {
      this._send(i.sendSCRAMClientFinalMessage(
        m
      ));
    }
    _send(m) {
      return this.stream.writable ? this.stream.write(m) : !1;
    }
    query(m) {
      this._send(i.query(m));
    }
    parse(m) {
      this._send(i.parse(m));
    }
    bind(m) {
      this._send(i.bind(m));
    }
    execute(m) {
      this._send(i.execute(m));
    }
    flush() {
      this.stream.writable && this.stream.write(u);
    }
    sync() {
      this._ending = !0, this._send(u), this._send(a);
    }
    ref() {
      this.stream.ref();
    }
    unref() {
      this.stream.unref();
    }
    end() {
      if (this._ending = !0, !this._connecting || !this.stream.writable) {
        this.stream.end();
        return;
      }
      return this.stream.write(d, () => {
        this.stream.end();
      });
    }
    close(m) {
      this._send(i.close(m));
    }
    describe(m) {
      this._send(i.describe(m));
    }
    sendCopyFromChunk(m) {
      this._send(i.copyData(m));
    }
    endCopyFrom() {
      this._send(i.copyDone());
    }
    sendCopyFail(m) {
      this._send(i.copyFail(m));
    }
  };
  g(y, "Connection");
  var f = y;
  e.exports = f;
}), Ys = Z((n, e) => {
  V();
  var t = ke().EventEmitter;
  $t(), he(lt);
  var r = Dt(), s = $s(), i = Fs(), u = gr(), a = vr(), d = Vs(), y = Mt(), f = Pn(), b = class extends t {
    constructor(c) {
      super(), this.connectionParameters = new a(c), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(
        this,
        "password",
        { configurable: !0, enumerable: !1, writable: !0, value: this.connectionParameters.password }
      ), this.replication = this.connectionParameters.replication;
      var h = c || {};
      this._Promise = h.Promise || It.Promise, this._types = new u(h.types), this._ending = !1, this._connecting = !1, this._connected = !1, this._connectionError = !1, this._queryable = !0, this.connection = h.connection || new f({ stream: h.stream, ssl: this.connectionParameters.ssl, keepAlive: h.keepAlive || !1, keepAliveInitialDelayMillis: h.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = h.binary || y.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || !1, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: !1 }), this._connectionTimeoutMillis = h.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(c) {
      let h = g((w) => {
        X.nextTick(() => {
          w.handleError(c, this.connection);
        });
      }, "enqueueError");
      this.activeQuery && (h(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(h), this.queryQueue.length = 0;
    }
    _connect(c) {
      var h = this, w = this.connection;
      if (this._connectionCallback = c, this._connecting || this._connected) {
        let S = new Error("Client has already been connected. You cannot reuse a client.");
        X.nextTick(
          () => {
            c(S);
          }
        );
        return;
      }
      this._connecting = !0, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        w._ending = !0, w.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? w.connect(this.host + "/.s.PGSQL." + this.port) : w.connect(this.port, this.host), w.on("connect", function() {
        h.ssl ? w.requestSsl() : w.startup(h.getStartupConf());
      }), w.on("sslconnect", function() {
        w.startup(h.getStartupConf());
      }), this._attachListeners(
        w
      ), w.once("end", () => {
        let S = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(S), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(S) : this._handleErrorEvent(S) : this._connectionError || this._handleErrorEvent(S)), X.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(c) {
      if (c) {
        this._connect(c);
        return;
      }
      return new this._Promise((h, w) => {
        this._connect((S) => {
          S ? w(S) : h();
        });
      });
    }
    _attachListeners(c) {
      c.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), c.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), c.on("authenticationSASL", this._handleAuthSASL.bind(this)), c.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), c.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), c.on("backendKeyData", this._handleBackendKeyData.bind(this)), c.on("error", this._handleErrorEvent.bind(this)), c.on("errorMessage", this._handleErrorMessage.bind(this)), c.on("readyForQuery", this._handleReadyForQuery.bind(this)), c.on("notice", this._handleNotice.bind(this)), c.on("rowDescription", this._handleRowDescription.bind(this)), c.on("dataRow", this._handleDataRow.bind(this)), c.on("portalSuspended", this._handlePortalSuspended.bind(
        this
      )), c.on("emptyQuery", this._handleEmptyQuery.bind(this)), c.on("commandComplete", this._handleCommandComplete.bind(this)), c.on("parseComplete", this._handleParseComplete.bind(this)), c.on("copyInResponse", this._handleCopyInResponse.bind(this)), c.on("copyData", this._handleCopyData.bind(this)), c.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(c) {
      let h = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(() => this.password()).then((w) => {
        if (w !== void 0) {
          if (typeof w != "string") {
            h.emit("error", new TypeError(
              "Password must be a string"
            ));
            return;
          }
          this.connectionParameters.password = this.password = w;
        } else
          this.connectionParameters.password = this.password = null;
        c();
      }).catch((w) => {
        h.emit("error", w);
      }) : this.password !== null ? c() : i(
        this.connectionParameters,
        (w) => {
          w !== void 0 && (this.connectionParameters.password = this.password = w), c();
        }
      );
    }
    _handleAuthCleartextPassword(c) {
      this._checkPgPass(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(c) {
      this._checkPgPass(
        () => {
          let h = r.postgresMd5PasswordHash(this.user, this.password, c.salt);
          this.connection.password(h);
        }
      );
    }
    _handleAuthSASL(c) {
      this._checkPgPass(() => {
        this.saslSession = s.startSession(c.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(c) {
      s.continueSession(
        this.saslSession,
        this.password,
        c.data
      ), this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
    }
    _handleAuthSASLFinal(c) {
      s.finalizeSession(this.saslSession, c.data), this.saslSession = null;
    }
    _handleBackendKeyData(c) {
      this.processID = c.processID, this.secretKey = c.secretKey;
    }
    _handleReadyForQuery(c) {
      this._connecting && (this._connecting = !1, this._connected = !0, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
      let { activeQuery: h } = this;
      this.activeQuery = null, this.readyForQuery = !0, h && h.handleReadyForQuery(this.connection), this._pulseQueryQueue();
    }
    _handleErrorWhileConnecting(c) {
      if (!this._connectionError) {
        if (this._connectionError = !0, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback)
          return this._connectionCallback(c);
        this.emit("error", c);
      }
    }
    _handleErrorEvent(c) {
      if (this._connecting)
        return this._handleErrorWhileConnecting(c);
      this._queryable = !1, this._errorAllQueries(c), this.emit("error", c);
    }
    _handleErrorMessage(c) {
      if (this._connecting)
        return this._handleErrorWhileConnecting(c);
      let h = this.activeQuery;
      if (!h) {
        this._handleErrorEvent(c);
        return;
      }
      this.activeQuery = null, h.handleError(
        c,
        this.connection
      );
    }
    _handleRowDescription(c) {
      this.activeQuery.handleRowDescription(c);
    }
    _handleDataRow(c) {
      this.activeQuery.handleDataRow(c);
    }
    _handlePortalSuspended(c) {
      this.activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(c) {
      this.activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(c) {
      this.activeQuery.handleCommandComplete(c, this.connection);
    }
    _handleParseComplete(c) {
      this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
    }
    _handleCopyInResponse(c) {
      this.activeQuery.handleCopyInResponse(this.connection);
    }
    _handleCopyData(c) {
      this.activeQuery.handleCopyData(
        c,
        this.connection
      );
    }
    _handleNotification(c) {
      this.emit("notification", c);
    }
    _handleNotice(c) {
      this.emit("notice", c);
    }
    getStartupConf() {
      var c = this.connectionParameters, h = { user: c.user, database: c.database }, w = c.application_name || c.fallback_application_name;
      return w && (h.application_name = w), c.replication && (h.replication = "" + c.replication), c.statement_timeout && (h.statement_timeout = String(parseInt(c.statement_timeout, 10))), c.lock_timeout && (h.lock_timeout = String(parseInt(c.lock_timeout, 10))), c.idle_in_transaction_session_timeout && (h.idle_in_transaction_session_timeout = String(parseInt(c.idle_in_transaction_session_timeout, 10))), c.options && (h.options = c.options), h;
    }
    cancel(c, h) {
      if (c.activeQuery === h) {
        var w = this.connection;
        this.host && this.host.indexOf("/") === 0 ? w.connect(this.host + "/.s.PGSQL." + this.port) : w.connect(this.port, this.host), w.on("connect", function() {
          w.cancel(
            c.processID,
            c.secretKey
          );
        });
      } else
        c.queryQueue.indexOf(h) !== -1 && c.queryQueue.splice(c.queryQueue.indexOf(h), 1);
    }
    setTypeParser(c, h, w) {
      return this._types.setTypeParser(c, h, w);
    }
    getTypeParser(c, h) {
      return this._types.getTypeParser(c, h);
    }
    escapeIdentifier(c) {
      return '"' + c.replace(/"/g, '""') + '"';
    }
    escapeLiteral(c) {
      for (var h = !1, w = "'", S = 0; S < c.length; S++) {
        var _ = c[S];
        _ === "'" ? w += _ + _ : _ === "\\" ? (w += _ + _, h = !0) : w += _;
      }
      return w += "'", h === !0 && (w = " E" + w), w;
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === !0)
        if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
          this.readyForQuery = !1, this.hasExecuted = !0;
          let c = this.activeQuery.submit(this.connection);
          c && X.nextTick(() => {
            this.activeQuery.handleError(c, this.connection), this.readyForQuery = !0, this._pulseQueryQueue();
          });
        } else
          this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
    }
    query(c, h, w) {
      var S, _, T, L, M;
      if (c == null)
        throw new TypeError(
          "Client was passed a null or undefined query"
        );
      return typeof c.submit == "function" ? (T = c.query_timeout || this.connectionParameters.query_timeout, _ = S = c, typeof h == "function" && (S.callback = S.callback || h)) : (T = this.connectionParameters.query_timeout, S = new d(c, h, w), S.callback || (_ = new this._Promise((P, B) => {
        S.callback = (x, E) => x ? B(x) : P(E);
      }))), T && (M = S.callback, L = setTimeout(() => {
        var P = new Error("Query read timeout");
        X.nextTick(
          () => {
            S.handleError(P, this.connection);
          }
        ), M(P), S.callback = () => {
        };
        var B = this.queryQueue.indexOf(S);
        B > -1 && this.queryQueue.splice(B, 1), this._pulseQueryQueue();
      }, T), S.callback = (P, B) => {
        clearTimeout(L), M(P, B);
      }), this.binary && !S.binary && (S.binary = !0), S._result && !S._result._types && (S._result._types = this._types), this._queryable ? this._ending ? (X.nextTick(() => {
        S.handleError(new Error("Client was closed and is not queryable"), this.connection);
      }), _) : (this.queryQueue.push(S), this._pulseQueryQueue(), _) : (X.nextTick(() => {
        S.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
      }), _);
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    end(c) {
      if (this._ending = !0, !this.connection._connecting)
        if (c)
          c();
        else
          return this._Promise.resolve();
      if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), c)
        this.connection.once("end", c);
      else
        return new this._Promise((h) => {
          this.connection.once("end", h);
        });
    }
  };
  g(b, "Client");
  var m = b;
  m.Query = d, e.exports = m;
}), Xs = Z((n, e) => {
  V();
  var t = ke().EventEmitter, r = g(function() {
  }, "NOOP"), s = g((c, h) => {
    let w = c.findIndex(h);
    return w === -1 ? void 0 : c.splice(w, 1)[0];
  }, "removeWhere"), i = class {
    constructor(h, w, S) {
      this.client = h, this.idleListener = w, this.timeoutId = S;
    }
  };
  g(i, "IdleItem");
  var u = i, a = class {
    constructor(h) {
      this.callback = h;
    }
  };
  g(a, "PendingItem");
  var d = a;
  function y() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  g(y, "throwOnDoubleRelease");
  function f(c, h) {
    if (h)
      return { callback: h, result: void 0 };
    let w, S, _ = g(function(L, M) {
      L ? w(L) : S(M);
    }, "cb"), T = new c(function(L, M) {
      S = L, w = M;
    }).catch((L) => {
      throw Error.captureStackTrace(L), L;
    });
    return { callback: _, result: T };
  }
  g(f, "promisify");
  function b(c, h) {
    return g(function w(S) {
      S.client = h, h.removeListener("error", w), h.on("error", () => {
        c.log(
          "additional client error after disconnection due to error",
          S
        );
      }), c._remove(h), c.emit("error", S, h);
    }, "idleListener");
  }
  g(b, "makeIdleListener");
  var m = class extends t {
    constructor(h, w) {
      super(), this.options = Object.assign({}, h), h != null && "password" in h && Object.defineProperty(this.options, "password", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: h.password
      }), h != null && h.ssl && h.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: !1 }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || !1, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
      }, this.Client = this.options.Client || w || Qt().Client, this.Promise = this.options.Promise || It.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = !1, this.ended = !1;
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _pulseQueue() {
      if (this.log("pulse queue"), this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log("pulse queue on ending"), this._idle.length && this._idle.slice().map((w) => {
          this._remove(w.client);
        }), this._clients.length || (this.ended = !0, this._endCallback());
        return;
      }
      if (!this._pendingQueue.length) {
        this.log("no queued requests");
        return;
      }
      if (!this._idle.length && this._isFull())
        return;
      let h = this._pendingQueue.shift();
      if (this._idle.length) {
        let w = this._idle.pop();
        clearTimeout(
          w.timeoutId
        );
        let S = w.client;
        S.ref && S.ref();
        let _ = w.idleListener;
        return this._acquireClient(S, h, _, !1);
      }
      if (!this._isFull())
        return this.newClient(h);
      throw new Error("unexpected condition");
    }
    _remove(h) {
      let w = s(
        this._idle,
        (S) => S.client === h
      );
      w !== void 0 && clearTimeout(w.timeoutId), this._clients = this._clients.filter(
        (S) => S !== h
      ), h.end(), this.emit("remove", h);
    }
    connect(h) {
      if (this.ending) {
        let _ = new Error("Cannot use a pool after calling end on the pool");
        return h ? h(_) : this.Promise.reject(_);
      }
      let w = f(this.Promise, h), S = w.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && X.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
          return this._pendingQueue.push(new d(w.callback)), S;
        let _ = g((M, P, B) => {
          clearTimeout(L), w.callback(M, P, B);
        }, "queueCallback"), T = new d(_), L = setTimeout(() => {
          s(
            this._pendingQueue,
            (M) => M.callback === _
          ), T.timedOut = !0, w.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return L.unref && L.unref(), this._pendingQueue.push(T), S;
      }
      return this.newClient(new d(w.callback)), S;
    }
    newClient(h) {
      let w = new this.Client(this.options);
      this._clients.push(
        w
      );
      let S = b(this, w);
      this.log("checking client timeout");
      let _, T = !1;
      this.options.connectionTimeoutMillis && (_ = setTimeout(() => {
        this.log("ending client due to timeout"), T = !0, w.connection ? w.connection.stream.destroy() : w.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), w.connect((L) => {
        if (_ && clearTimeout(_), w.on("error", S), L)
          this.log("client failed to connect", L), this._clients = this._clients.filter((M) => M !== w), T && (L = new Error("Connection terminated due to connection timeout", { cause: L })), this._pulseQueue(), h.timedOut || h.callback(L, void 0, r);
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let M = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(w), this._idle.findIndex((P) => P.client === w) !== -1 && this._acquireClient(
                w,
                new d((P, B, x) => x()),
                S,
                !1
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            M.unref(), w.once("end", () => clearTimeout(M));
          }
          return this._acquireClient(w, h, S, !0);
        }
      });
    }
    _acquireClient(h, w, S, _) {
      _ && this.emit("connect", h), this.emit("acquire", h), h.release = this._releaseOnce(h, S), h.removeListener("error", S), w.timedOut ? _ && this.options.verify ? this.options.verify(h, h.release) : h.release() : _ && this.options.verify ? this.options.verify(h, (T) => {
        if (T)
          return h.release(T), w.callback(T, void 0, r);
        w.callback(void 0, h, h.release);
      }) : w.callback(void 0, h, h.release);
    }
    _releaseOnce(h, w) {
      let S = !1;
      return (_) => {
        S && y(), S = !0, this._release(h, w, _);
      };
    }
    _release(h, w, S) {
      if (h.on("error", w), h._poolUseCount = (h._poolUseCount || 0) + 1, this.emit("release", S, h), S || this.ending || !h._queryable || h._ending || h._poolUseCount >= this.options.maxUses) {
        h._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(h), this._pulseQueue();
        return;
      }
      if (this._expired.has(h)) {
        this.log("remove expired client"), this._expired.delete(h), this._remove(h), this._pulseQueue();
        return;
      }
      let _;
      this.options.idleTimeoutMillis && (_ = setTimeout(() => {
        this.log("remove idle client"), this._remove(h);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && _.unref()), this.options.allowExitOnIdle && h.unref(), this._idle.push(new u(
        h,
        w,
        _
      )), this._pulseQueue();
    }
    query(h, w, S) {
      if (typeof h == "function") {
        let T = f(this.Promise, h);
        return dr(function() {
          return T.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), T.result;
      }
      typeof w == "function" && (S = w, w = void 0);
      let _ = f(this.Promise, S);
      return S = _.callback, this.connect((T, L) => {
        if (T)
          return S(T);
        let M = !1, P = g((B) => {
          M || (M = !0, L.release(B), S(B));
        }, "onError");
        L.once("error", P), this.log("dispatching query");
        try {
          L.query(h, w, (B, x) => {
            if (this.log("query dispatched"), L.removeListener(
              "error",
              P
            ), !M)
              return M = !0, L.release(B), B ? S(B) : S(void 0, x);
          });
        } catch (B) {
          return L.release(B), S(B);
        }
      }), _.result;
    }
    end(h) {
      if (this.log("ending"), this.ending) {
        let S = new Error("Called end on pool more than once");
        return h ? h(S) : this.Promise.reject(S);
      }
      this.ending = !0;
      let w = f(this.Promise, h);
      return this._endCallback = w.callback, this._pulseQueue(), w.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((h, w) => h + (this._expired.has(w) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  };
  g(m, "Pool");
  var v = m;
  e.exports = v;
}), En = {};
Te(En, { default: () => _n });
var _n, Zs = ye(() => {
  V(), _n = {};
}), ei = Z((n, e) => {
  e.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
    "database",
    "libpq",
    "pg",
    "postgre",
    "postgres",
    "postgresql",
    "rdbms"
  ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: { "buffer-writer": "2.0.0", "packet-reader": "1.0.0", "pg-connection-string": "^2.5.0", "pg-pool": "^3.5.2", "pg-protocol": "^1.5.0", "pg-types": "^2.1.0", pgpass: "1.x" }, devDependencies: {
    async: "2.6.4",
    bluebird: "3.5.2",
    co: "4.6.0",
    "pg-copy-streams": "0.3.0"
  }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: { "pg-native": { optional: !0 } }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
}), ti = Z((n, e) => {
  V();
  var t = ke().EventEmitter, r = ($t(), he(lt)), s = Dt(), i = e.exports = function(a, d, y) {
    t.call(this), a = s.normalizeQueryConfig(a, d, y), this.text = a.text, this.values = a.values, this.name = a.name, this.callback = a.callback, this.state = "new", this._arrayMode = a.rowMode === "array", this._emitRowEvents = !1, this.on("newListener", function(f) {
      f === "row" && (this._emitRowEvents = !0);
    }.bind(this));
  };
  r.inherits(i, t);
  var u = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  i.prototype.handleError = function(a) {
    var d = this.native.pq.resultErrorFields();
    if (d)
      for (var y in d) {
        var f = u[y] || y;
        a[f] = d[y];
      }
    this.callback ? this.callback(a) : this.emit("error", a), this.state = "error";
  }, i.prototype.then = function(a, d) {
    return this._getPromise().then(
      a,
      d
    );
  }, i.prototype.catch = function(a) {
    return this._getPromise().catch(a);
  }, i.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(a, d) {
      this._once("end", a), this._once("error", d);
    }.bind(this)), this._promise);
  }, i.prototype.submit = function(a) {
    this.state = "running";
    var d = this;
    this.native = a.native, a.native.arrayMode = this._arrayMode;
    var y = g(function(m, v, c) {
      if (a.native.arrayMode = !1, dr(function() {
        d.emit("_done");
      }), m)
        return d.handleError(m);
      d._emitRowEvents && (c.length > 1 ? v.forEach(
        (h, w) => {
          h.forEach((S) => {
            d.emit("row", S, c[w]);
          });
        }
      ) : v.forEach(function(h) {
        d.emit("row", h, c);
      })), d.state = "end", d.emit("end", c), d.callback && d.callback(null, c);
    }, "after");
    if (X.domain && (y = X.domain.bind(y)), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", this.name, this.name.length), console.error("This can cause conflicts and silent errors executing queries"));
      var f = (this.values || []).map(s.prepareValue);
      if (a.namedQueries[this.name]) {
        if (this.text && a.namedQueries[this.name] !== this.text) {
          let m = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return y(m);
        }
        return a.native.execute(this.name, f, y);
      }
      return a.native.prepare(this.name, this.text, f.length, function(m) {
        return m ? y(m) : (a.namedQueries[d.name] = d.text, d.native.execute(d.name, f, y));
      });
    } else if (this.values) {
      if (!Array.isArray(
        this.values
      )) {
        let m = new Error("Query values must be an array");
        return y(m);
      }
      var b = this.values.map(s.prepareValue);
      a.native.query(this.text, b, y);
    } else
      a.native.query(this.text, y);
  };
}), ri = Z((n, e) => {
  V();
  var t = (Zs(), he(En)), r = gr();
  ei();
  var s = ke().EventEmitter, i = ($t(), he(lt)), u = vr(), a = ti(), d = e.exports = function(y) {
    s.call(this), y = y || {}, this._Promise = y.Promise || It.Promise, this._types = new r(y.types), this.native = new t({ types: this._types }), this._queryQueue = [], this._ending = !1, this._connecting = !1, this._connected = !1, this._queryable = !0;
    var f = this.connectionParameters = new u(y);
    this.user = f.user, Object.defineProperty(this, "password", { configurable: !0, enumerable: !1, writable: !0, value: f.password }), this.database = f.database, this.host = f.host, this.port = f.port, this.namedQueries = {};
  };
  d.Query = a, i.inherits(d, s), d.prototype._errorAllQueries = function(y) {
    let f = g((b) => {
      X.nextTick(() => {
        b.native = this.native, b.handleError(y);
      });
    }, "enqueueError");
    this._hasActiveQuery() && (f(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(f), this._queryQueue.length = 0;
  }, d.prototype._connect = function(y) {
    var f = this;
    if (this._connecting) {
      X.nextTick(() => y(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = !0, this.connectionParameters.getLibpqConnectionString(function(b, m) {
      if (b)
        return y(b);
      f.native.connect(m, function(v) {
        if (v)
          return f.native.end(), y(v);
        f._connected = !0, f.native.on("error", function(c) {
          f._queryable = !1, f._errorAllQueries(c), f.emit("error", c);
        }), f.native.on("notification", function(c) {
          f.emit("notification", { channel: c.relname, payload: c.extra });
        }), f.emit("connect"), f._pulseQueryQueue(!0), y();
      });
    });
  }, d.prototype.connect = function(y) {
    if (y) {
      this._connect(y);
      return;
    }
    return new this._Promise((f, b) => {
      this._connect((m) => {
        m ? b(m) : f();
      });
    });
  }, d.prototype.query = function(y, f, b) {
    var m, v, c, h, w;
    if (y == null)
      throw new TypeError("Client was passed a null or undefined query");
    if (typeof y.submit == "function")
      c = y.query_timeout || this.connectionParameters.query_timeout, v = m = y, typeof f == "function" && (y.callback = f);
    else if (c = this.connectionParameters.query_timeout, m = new a(y, f, b), !m.callback) {
      let S, _;
      v = new this._Promise((T, L) => {
        S = T, _ = L;
      }), m.callback = (T, L) => T ? _(T) : S(L);
    }
    return c && (w = m.callback, h = setTimeout(() => {
      var S = new Error(
        "Query read timeout"
      );
      X.nextTick(() => {
        m.handleError(S, this.connection);
      }), w(S), m.callback = () => {
      };
      var _ = this._queryQueue.indexOf(m);
      _ > -1 && this._queryQueue.splice(_, 1), this._pulseQueryQueue();
    }, c), m.callback = (S, _) => {
      clearTimeout(h), w(S, _);
    }), this._queryable ? this._ending ? (m.native = this.native, X.nextTick(() => {
      m.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), v) : (this._queryQueue.push(m), this._pulseQueryQueue(), v) : (m.native = this.native, X.nextTick(() => {
      m.handleError(new Error("Client has encountered a connection error and is not queryable"));
    }), v);
  }, d.prototype.end = function(y) {
    var f = this;
    this._ending = !0, this._connected || this.once("connect", this.end.bind(this, y));
    var b;
    return y || (b = new this._Promise(function(m, v) {
      y = g((c) => c ? v(c) : m(), "cb");
    })), this.native.end(function() {
      f._errorAllQueries(new Error("Connection terminated")), X.nextTick(() => {
        f.emit("end"), y && y();
      });
    }), b;
  }, d.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  }, d.prototype._pulseQueryQueue = function(y) {
    if (this._connected && !this._hasActiveQuery()) {
      var f = this._queryQueue.shift();
      if (!f) {
        y || this.emit("drain");
        return;
      }
      this._activeQuery = f, f.submit(this);
      var b = this;
      f.once("_done", function() {
        b._pulseQueryQueue();
      });
    }
  }, d.prototype.cancel = function(y) {
    this._activeQuery === y ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(y) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(y), 1);
  }, d.prototype.ref = function() {
  }, d.prototype.unref = function() {
  }, d.prototype.setTypeParser = function(y, f, b) {
    return this._types.setTypeParser(
      y,
      f,
      b
    );
  }, d.prototype.getTypeParser = function(y, f) {
    return this._types.getTypeParser(y, f);
  };
}), Lr = Z((n, e) => {
  V(), e.exports = ri();
}), Qt = Z((n, e) => {
  V();
  var t = Ys(), r = Mt(), s = Pn(), i = Xs(), { DatabaseError: u } = bn(), a = g(
    (y) => {
      var f;
      return f = class extends i {
        constructor(b) {
          super(b, y);
        }
      }, g(f, "BoundPool"), f;
    },
    "poolFactory"
  ), d = g(
    function(y) {
      this.defaults = r, this.Client = y, this.Query = this.Client.Query, this.Pool = a(this.Client), this._pools = [], this.Connection = s, this.types = Rt(), this.DatabaseError = u;
    },
    "PG"
  );
  typeof X.env.NODE_PG_FORCE_NATIVE < "u" ? e.exports = new d(Lr()) : (e.exports = new d(t), Object.defineProperty(e.exports, "native", {
    configurable: !0,
    enumerable: !1,
    get() {
      var y = null;
      try {
        y = new d(Lr());
      } catch (f) {
        if (f.code !== "MODULE_NOT_FOUND")
          throw f;
      }
      return Object.defineProperty(e.exports, "native", { value: y }), y;
    }
  }));
});
V();
V();
Ot();
Xr();
V();
var ni = Object.defineProperty, si = Object.defineProperties, ii = Object.getOwnPropertyDescriptors, Or = Object.getOwnPropertySymbols, oi = Object.prototype.hasOwnProperty, ai = Object.prototype.propertyIsEnumerable, Rr = g(
  (n, e, t) => e in n ? ni(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t,
  "__defNormalProp"
), ui = g((n, e) => {
  for (var t in e || (e = {}))
    oi.call(e, t) && Rr(n, t, e[t]);
  if (Or)
    for (var t of Or(e))
      ai.call(e, t) && Rr(n, t, e[t]);
  return n;
}, "__spreadValues"), li = g((n, e) => si(n, ii(e)), "__spreadProps"), ci = 1008e3, Mr = new Uint8Array(
  new Uint16Array([258]).buffer
)[0] === 2, hi = new TextDecoder(), Sr = new TextEncoder(), yt = Sr.encode("0123456789abcdef"), wt = Sr.encode("0123456789ABCDEF"), fi = Sr.encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), Cn = fi.slice();
Cn[62] = 45;
Cn[63] = 95;
var tt, bt;
function Tn(n, { alphabet: e, scratchArr: t } = {}) {
  if (!tt)
    if (tt = new Uint16Array(256), bt = new Uint16Array(256), Mr)
      for (let v = 0; v < 256; v++)
        tt[v] = yt[v & 15] << 8 | yt[v >>> 4], bt[v] = wt[v & 15] << 8 | wt[v >>> 4];
    else
      for (let v = 0; v < 256; v++)
        tt[v] = yt[v & 15] | yt[v >>> 4] << 8, bt[v] = wt[v & 15] | wt[v >>> 4] << 8;
  n.byteOffset % 4 !== 0 && (n = new Uint8Array(n));
  let r = n.length, s = r >>> 1, i = r >>> 2, u = t || new Uint16Array(r), a = new Uint32Array(
    n.buffer,
    n.byteOffset,
    i
  ), d = new Uint32Array(u.buffer, u.byteOffset, s), y = e === "upper" ? bt : tt, f = 0, b = 0, m;
  if (Mr)
    for (; f < i; )
      m = a[f++], d[b++] = y[m >>> 8 & 255] << 16 | y[m & 255], d[b++] = y[m >>> 24] << 16 | y[m >>> 16 & 255];
  else
    for (; f < i; )
      m = a[f++], d[b++] = y[m >>> 24] << 16 | y[m >>> 16 & 255], d[b++] = y[m >>> 8 & 255] << 16 | y[m & 255];
  for (f <<= 2; f < r; )
    u[f] = y[n[f++]];
  return hi.decode(u.subarray(0, r));
}
g(Tn, "_toHex");
function An(n, e = {}) {
  let t = "", r = n.length, s = ci >>> 1, i = Math.ceil(r / s), u = new Uint16Array(i > 1 ? s : r);
  for (let a = 0; a < i; a++) {
    let d = a * s, y = d + s;
    t += Tn(n.subarray(d, y), li(ui(
      {},
      e
    ), { scratchArr: u }));
  }
  return t;
}
g(An, "_toHexChunked");
function xn(n, e = {}) {
  return e.alphabet !== "upper" && typeof n.toHex == "function" ? n.toHex() : An(n, e);
}
g(xn, "toHex");
V();
var Bn = class Nn {
  constructor(e, t) {
    this.strings = e, this.values = t;
  }
  toParameterizedQuery(e = { query: "", params: [] }) {
    let { strings: t, values: r } = this;
    for (let s = 0, i = t.length; s < i; s++)
      if (e.query += t[s], s < r.length) {
        let u = r[s];
        if (u instanceof On)
          e.query += u.sql;
        else if (u instanceof St)
          if (u.queryData instanceof Nn)
            u.queryData.toParameterizedQuery(
              e
            );
          else {
            if (u.queryData.params?.length)
              throw new Error("This query is not composable");
            e.query += u.queryData.query;
          }
        else {
          let { params: a } = e;
          a.push(u), e.query += "$" + a.length, (u instanceof G || ArrayBuffer.isView(u)) && (e.query += "::bytea");
        }
      }
    return e;
  }
};
g(Bn, "SqlTemplate");
var In = Bn, Ln = class {
  constructor(e) {
    this.sql = e;
  }
};
g(Ln, "UnsafeRawSql");
var On = Ln, di = Qe(gr()), pi = Qe(Dt()), Rn = class Mn extends Error {
  constructor(e) {
    super(e), J(this, "name", "NeonDbError"), J(this, "severity"), J(this, "code"), J(this, "detail"), J(this, "hint"), J(this, "position"), J(this, "internalPosition"), J(
      this,
      "internalQuery"
    ), J(this, "where"), J(this, "schema"), J(this, "table"), J(this, "column"), J(this, "dataType"), J(this, "constraint"), J(this, "file"), J(this, "line"), J(this, "routine"), J(this, "sourceError"), "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Mn);
  }
};
g(
  Rn,
  "NeonDbError"
);
var Ve = Rn, Dr = "transaction() expects an array of queries, or a function returning an array of queries", gi = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Dn(n) {
  return n instanceof G ? "\\x" + xn(n) : n;
}
g(Dn, "encodeBuffersAsBytea");
function sr(n) {
  let { query: e, params: t } = n instanceof In ? n.toParameterizedQuery() : n;
  return { query: e, params: t.map((r) => Dn((0, pi.prepareValue)(r))) };
}
g(sr, "prepareQuery");
function We(n, {
  arrayMode: e,
  fullResults: t,
  fetchOptions: r,
  isolationLevel: s,
  readOnly: i,
  deferrable: u,
  authToken: a
} = {}) {
  if (!n)
    throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
  let d;
  try {
    d = pr(n);
  } catch {
    throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(n));
  }
  let {
    protocol: y,
    username: f,
    hostname: b,
    port: m,
    pathname: v
  } = d;
  if (y !== "postgres:" && y !== "postgresql:" || !f || !b || !v)
    throw new Error(
      "Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value"
    );
  function c(w, ...S) {
    if (!(Array.isArray(w) && Array.isArray(w.raw) && Array.isArray(S)))
      throw new Error(
        'This function can now be called only as a tagged-template function: sql`SELECT ${value}`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).'
      );
    return new St(h, new In(w, S));
  }
  g(c, "templateFn"), c.query = (w, S, _) => new St(h, { query: w, params: S ?? [] }, _), c.unsafe = (w) => new On(w), c.transaction = async (w, S) => {
    if (typeof w == "function" && (w = w(c)), !Array.isArray(w))
      throw new Error(Dr);
    w.forEach((L) => {
      if (!(L instanceof St))
        throw new Error(
          Dr
        );
    });
    let _ = w.map((L) => L.queryData), T = w.map((L) => L.opts ?? {});
    return h(_, T, S);
  };
  async function h(w, S, _) {
    let {
      fetchEndpoint: T,
      fetchFunction: L
    } = Lt, M = Array.isArray(w) ? { queries: w.map((H) => sr(H)) } : sr(w), P = r ?? {}, B = e ?? !1, x = t ?? !1, E = s, D = i, R = u;
    _ !== void 0 && (_.fetchOptions !== void 0 && (P = { ...P, ..._.fetchOptions }), _.arrayMode !== void 0 && (B = _.arrayMode), _.fullResults !== void 0 && (x = _.fullResults), _.isolationLevel !== void 0 && (E = _.isolationLevel), _.readOnly !== void 0 && (D = _.readOnly), _.deferrable !== void 0 && (R = _.deferrable)), S !== void 0 && !Array.isArray(S) && S.fetchOptions !== void 0 && (P = { ...P, ...S.fetchOptions });
    let F = a;
    !Array.isArray(S) && S?.authToken !== void 0 && (F = S.authToken);
    let j = typeof T == "function" ? T(b, m, { jwtAuth: F !== void 0 }) : T, O = {
      "Neon-Connection-String": n,
      "Neon-Raw-Text-Output": "true",
      "Neon-Array-Mode": "true"
    }, q = await Qn(F);
    q && (O.Authorization = `Bearer ${q}`), Array.isArray(w) && (E !== void 0 && (O["Neon-Batch-Isolation-Level"] = E), D !== void 0 && (O["Neon-Batch-Read-Only"] = String(D)), R !== void 0 && (O["Neon-Batch-Deferrable"] = String(
      R
    )));
    let W;
    try {
      W = await (L ?? fetch)(j, { method: "POST", body: JSON.stringify(M), headers: O, ...P });
    } catch (H) {
      let ee = new Ve(`Error connecting to database: ${H}`);
      throw ee.sourceError = H, ee;
    }
    if (W.ok) {
      let H = await W.json();
      if (Array.isArray(w)) {
        let ee = H.results;
        if (!Array.isArray(ee))
          throw new Ve("Neon internal error: unexpected result format");
        return ee.map((re, we) => {
          let oe = S[we] ?? {}, de = oe.arrayMode ?? B, Xe = oe.fullResults ?? x;
          return ir(re, { arrayMode: de, fullResults: Xe, types: oe.types });
        });
      } else {
        let ee = S ?? {}, re = ee.arrayMode ?? B, we = ee.fullResults ?? x;
        return ir(H, { arrayMode: re, fullResults: we, types: ee.types });
      }
    } else {
      let { status: H } = W;
      if (H === 400) {
        let ee = await W.json(), re = new Ve(ee.message);
        for (let we of gi)
          re[we] = ee[we] ?? void 0;
        throw re;
      } else {
        let ee = await W.text();
        throw new Ve(`Server error (HTTP status ${H}): ${ee}`);
      }
    }
  }
  return g(h, "execute"), c;
}
g(We, "neon");
var $n = class {
  constructor(e, t, r) {
    this.execute = e, this.queryData = t, this.opts = r;
  }
  then(e, t) {
    return this.execute(this.queryData, this.opts).then(e, t);
  }
  catch(e) {
    return this.execute(this.queryData, this.opts).catch(
      e
    );
  }
  finally(e) {
    return this.execute(this.queryData, this.opts).finally(e);
  }
};
g($n, "NeonQueryPromise");
var St = $n;
function ir(n, { arrayMode: e, fullResults: t, types: r }) {
  let s = new di.default(r), i = n.fields.map((d) => d.name), u = n.fields.map((d) => s.getTypeParser(d.dataTypeID)), a = e === !0 ? n.rows.map((d) => d.map((y, f) => y === null ? null : u[f](
    y
  ))) : n.rows.map((d) => Object.fromEntries(d.map((y, f) => [i[f], y === null ? null : u[f](y)])));
  return t ? (n.viaNeonFetch = !0, n.rowAsArray = e, n.rows = a, n._parsers = u, n._types = s, n) : a;
}
g(ir, "processQueryResult");
async function Qn(n) {
  if (typeof n == "string")
    return n;
  if (typeof n == "function")
    try {
      return await Promise.resolve(n());
    } catch (e) {
      let t = new Ve("Error getting auth token.");
      throw e instanceof Error && (t = new Ve(`Error getting auth token: ${e.message}`)), t;
    }
}
g(Qn, "getAuthToken");
V();
var mi = Qe(Qt());
V();
var yi = Qe(Qt()), kn = class extends yi.Client {
  constructor(e) {
    super(e), this.config = e;
  }
  get neonConfig() {
    return this.connection.stream;
  }
  connect(e) {
    let { neonConfig: t } = this;
    t.forceDisablePgSSL && (this.ssl = this.connection.ssl = !1), this.ssl && t.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let r = typeof this.config != "string" && this.config?.host !== void 0 || typeof this.config != "string" && this.config?.connectionString !== void 0 || X.env.PGHOST !== void 0, s = X.env.USER ?? X.env.USERNAME;
    if (!r && this.host === "localhost" && this.user === s && this.database === s && this.password === null)
      throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let i = super.connect(e), u = t.pipelineTLS && this.ssl, a = t.pipelineConnect === "password";
    if (!u && !t.pipelineConnect)
      return i;
    let d = this.connection;
    if (u && d.on(
      "connect",
      () => d.stream.emit("data", "S")
    ), a) {
      d.removeAllListeners("authenticationCleartextPassword"), d.removeAllListeners("readyForQuery"), d.once("readyForQuery", () => d.on("readyForQuery", this._handleReadyForQuery.bind(this)));
      let y = this.ssl ? "sslconnect" : "connect";
      d.on(y, () => {
        this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return i;
  }
  async _handleAuthSASLContinue(e) {
    if (typeof crypto > "u" || crypto.subtle === void 0 || crypto.subtle.importKey === void 0)
      throw new Error("Cannot use SASL auth when `crypto.subtle` is not defined");
    let t = crypto.subtle, r = this.saslSession, s = this.password, i = e.data;
    if (r.message !== "SASLInitialResponse" || typeof s != "string" || typeof i != "string")
      throw new Error("SASL: protocol error");
    let u = Object.fromEntries(i.split(",").map((ee) => {
      if (!/^.=/.test(ee))
        throw new Error("SASL: Invalid attribute pair entry");
      let re = ee[0], we = ee.substring(2);
      return [re, we];
    })), a = u.r, d = u.s, y = u.i;
    if (!a || !/^[!-+--~]+$/.test(a))
      throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable"
      );
    if (!d || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(d))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
    if (!y || !/^[1-9][0-9]*$/.test(y))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
    if (!a.startsWith(
      r.clientNonce
    ))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    if (a.length === r.clientNonce.length)
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let f = parseInt(y, 10), b = G.from(d, "base64"), m = new TextEncoder(), v = m.encode(s), c = await t.importKey("raw", v, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]), h = new Uint8Array(await t.sign("HMAC", c, G.concat([b, G.from([0, 0, 0, 1])]))), w = h;
    for (var S = 0; S < f - 1; S++)
      h = new Uint8Array(await t.sign(
        "HMAC",
        c,
        h
      )), w = G.from(w.map((ee, re) => w[re] ^ h[re]));
    let _ = w, T = await t.importKey("raw", _, { name: "HMAC", hash: {
      name: "SHA-256"
    } }, !1, ["sign"]), L = new Uint8Array(await t.sign("HMAC", T, m.encode("Client Key"))), M = await t.digest("SHA-256", L), P = "n=*,r=" + r.clientNonce, B = "r=" + a + ",s=" + d + ",i=" + f, x = "c=biws,r=" + a, E = P + "," + B + "," + x, D = await t.importKey("raw", M, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]);
    var R = new Uint8Array(
      await t.sign("HMAC", D, m.encode(E))
    ), F = G.from(L.map((ee, re) => L[re] ^ R[re])), j = F.toString("base64");
    let O = await t.importKey("raw", _, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]), q = await t.sign("HMAC", O, m.encode(
      "Server Key"
    )), W = await t.importKey("raw", q, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]);
    var H = G.from(await t.sign("HMAC", W, m.encode(E)));
    r.message = "SASLResponse", r.serverSignature = H.toString("base64"), r.response = x + ",p=" + j, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
g(kn, "NeonClient");
var wi = kn;
Ot();
var bi = Qe(vr());
function qn(n, e) {
  if (e)
    return { callback: e, result: void 0 };
  let t, r, s = g(function(u, a) {
    u ? t(u) : r(a);
  }, "cb"), i = new n(function(u, a) {
    r = u, t = a;
  });
  return { callback: s, result: i };
}
g(qn, "promisify");
var vi = class extends mi.Pool {
  constructor() {
    super(...arguments), J(this, "Client", wi), J(this, "hasFetchUnsupportedListeners", !1), J(this, "addListener", this.on);
  }
  on(e, t) {
    return e !== "error" && (this.hasFetchUnsupportedListeners = !0), super.on(e, t);
  }
  query(e, t, r) {
    if (!Lt.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof e == "function")
      return super.query(
        e,
        t,
        r
      );
    typeof t == "function" && (r = t, t = void 0);
    let s = qn(this.Promise, r);
    r = s.callback;
    try {
      let i = new bi.default(
        this.options
      ), u = encodeURIComponent, a = encodeURI, d = `postgresql://${u(i.user)}:${u(i.password)}@${u(i.host)}/${a(i.database)}`, y = typeof e == "string" ? e : e.text, f = t ?? e.values ?? [];
      We(d, { fullResults: !0, arrayMode: e.rowMode === "array" }).query(y, f, { types: e.types ?? this.options?.types }).then((b) => r(void 0, b)).catch((b) => r(
        b
      ));
    } catch (i) {
      r(i);
    }
    return s.result;
  }
};
g(vi, "NeonPool");
Ot();
var Pr = Qe(Qt());
Pr.DatabaseError;
Pr.defaults;
var be = Pr.types;
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
const I = Symbol.for("drizzle:entityKind");
function Q(n, e) {
  if (!n || typeof n != "object")
    return !1;
  if (n instanceof e)
    return !0;
  if (!Object.prototype.hasOwnProperty.call(e, I))
    throw new Error(
      `Class "${e.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  let t = Object.getPrototypeOf(n).constructor;
  if (t)
    for (; t; ) {
      if (I in t && t[I] === e[I])
        return !0;
      t = Object.getPrototypeOf(t);
    }
  return !1;
}
class Si {
  static [I] = "ConsoleLogWriter";
  write(e) {
    console.log(e);
  }
}
class Pi {
  static [I] = "DefaultLogger";
  writer;
  constructor(e) {
    this.writer = e?.writer ?? new Si();
  }
  logQuery(e, t) {
    const r = t.map((i) => {
      try {
        return JSON.stringify(i);
      } catch {
        return String(i);
      }
    }), s = r.length ? ` -- params: [${r.join(", ")}]` : "";
    this.writer.write(`Query: ${e}${s}`);
  }
}
class Ei {
  static [I] = "NoopLogger";
  logQuery() {
  }
}
class qe {
  static [I] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(e) {
    return this.then(void 0, e);
  }
  finally(e) {
    return this.then(
      (t) => (e?.(), t),
      (t) => {
        throw e?.(), t;
      }
    );
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
}
class ce {
  constructor(e, t) {
    this.table = e, this.config = t, this.name = t.name, this.keyAsName = t.keyAsName, this.notNull = t.notNull, this.default = t.default, this.defaultFn = t.defaultFn, this.onUpdateFn = t.onUpdateFn, this.hasDefault = t.hasDefault, this.primary = t.primaryKey, this.isUnique = t.isUnique, this.uniqueName = t.uniqueName, this.uniqueType = t.uniqueType, this.dataType = t.dataType, this.columnType = t.columnType, this.generated = t.generated, this.generatedIdentity = t.generatedIdentity;
  }
  static [I] = "Column";
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  generated = void 0;
  generatedIdentity = void 0;
  config;
  mapFromDriverValue(e) {
    return e;
  }
  mapToDriverValue(e) {
    return e;
  }
  // ** @internal */
  shouldDisableInsert() {
    return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
  }
}
class _i {
  static [I] = "ColumnBuilder";
  config;
  constructor(e, t, r) {
    this.config = {
      name: e,
      keyAsName: e === "",
      notNull: !1,
      default: void 0,
      hasDefault: !1,
      primaryKey: !1,
      isUnique: !1,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType: t,
      columnType: r,
      generated: void 0
    };
  }
  /**
   * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
   *
   * @example
   * ```ts
   * const users = pgTable('users', {
   * 	id: integer('id').$type<UserId>().primaryKey(),
   * 	details: json('details').$type<UserDetails>().notNull(),
   * });
   * ```
   */
  $type() {
    return this;
  }
  /**
   * Adds a `not null` clause to the column definition.
   *
   * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
   */
  notNull() {
    return this.config.notNull = !0, this;
  }
  /**
   * Adds a `default <value>` clause to the column definition.
   *
   * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
   *
   * If you need to set a dynamic default value, use {@link $defaultFn} instead.
   */
  default(e) {
    return this.config.default = e, this.config.hasDefault = !0, this;
  }
  /**
   * Adds a dynamic default value to the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $defaultFn(e) {
    return this.config.defaultFn = e, this.config.hasDefault = !0, this;
  }
  /**
   * Alias for {@link $defaultFn}.
   */
  $default = this.$defaultFn;
  /**
   * Adds a dynamic update value to the column.
   * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
   * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $onUpdateFn(e) {
    return this.config.onUpdateFn = e, this.config.hasDefault = !0, this;
  }
  /**
   * Alias for {@link $onUpdateFn}.
   */
  $onUpdate = this.$onUpdateFn;
  /**
   * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
   *
   * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
   */
  primaryKey() {
    return this.config.primaryKey = !0, this.config.notNull = !0, this;
  }
  /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
  setName(e) {
    this.config.name === "" && (this.config.name = e);
  }
}
const Ie = Symbol.for("drizzle:Name");
class Ci {
  static [I] = "PgForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate = "no action";
  /** @internal */
  _onDelete = "no action";
  constructor(e, t) {
    this.reference = () => {
      const { name: r, columns: s, foreignColumns: i } = e();
      return { name: r, columns: s, foreignTable: i[0].table, foreignColumns: i };
    }, t && (this._onUpdate = t.onUpdate, this._onDelete = t.onDelete);
  }
  onUpdate(e) {
    return this._onUpdate = e === void 0 ? "no action" : e, this;
  }
  onDelete(e) {
    return this._onDelete = e === void 0 ? "no action" : e, this;
  }
  /** @internal */
  build(e) {
    return new Ti(e, this);
  }
}
class Ti {
  constructor(e, t) {
    this.table = e, this.reference = t.reference, this.onUpdate = t._onUpdate, this.onDelete = t._onDelete;
  }
  static [I] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name: e, columns: t, foreignColumns: r } = this.reference(), s = t.map((a) => a.name), i = r.map((a) => a.name), u = [
      this.table[Ie],
      ...s,
      r[0].table[Ie],
      ...i
    ];
    return e ?? `${u.join("_")}_fk`;
  }
}
function Ai(n, ...e) {
  return n(...e);
}
function xi(n, e) {
  return `${n[Ie]}_${e.join("_")}_unique`;
}
function $r(n, e, t) {
  for (let r = e; r < n.length; r++) {
    const s = n[r];
    if (s === "\\") {
      r++;
      continue;
    }
    if (s === '"')
      return [n.slice(e, r).replace(/\\/g, ""), r + 1];
    if (!t && (s === "," || s === "}"))
      return [n.slice(e, r).replace(/\\/g, ""), r];
  }
  return [n.slice(e).replace(/\\/g, ""), n.length];
}
function Fn(n, e = 0) {
  const t = [];
  let r = e, s = !1;
  for (; r < n.length; ) {
    const i = n[r];
    if (i === ",") {
      (s || r === e) && t.push(""), s = !0, r++;
      continue;
    }
    if (s = !1, i === "\\") {
      r += 2;
      continue;
    }
    if (i === '"') {
      const [d, y] = $r(n, r + 1, !0);
      t.push(d), r = y;
      continue;
    }
    if (i === "}")
      return [t, r + 1];
    if (i === "{") {
      const [d, y] = Fn(n, r + 1);
      t.push(d), r = y;
      continue;
    }
    const [u, a] = $r(n, r, !1);
    t.push(u), r = a;
  }
  return [t, r];
}
function Bi(n) {
  const [e] = Fn(n, 1);
  return e;
}
function jn(n) {
  return `{${n.map((e) => Array.isArray(e) ? jn(e) : typeof e == "string" ? `"${e.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${e}`).join(",")}}`;
}
class te extends _i {
  foreignKeyConfigs = [];
  static [I] = "PgColumnBuilder";
  array(e) {
    return new Ii(this.config.name, this, e);
  }
  references(e, t = {}) {
    return this.foreignKeyConfigs.push({ ref: e, actions: t }), this;
  }
  unique(e, t) {
    return this.config.isUnique = !0, this.config.uniqueName = e, this.config.uniqueType = t?.nulls, this;
  }
  generatedAlwaysAs(e) {
    return this.config.generated = {
      as: e,
      type: "always",
      mode: "stored"
    }, this;
  }
  /** @internal */
  buildForeignKeys(e, t) {
    return this.foreignKeyConfigs.map(({ ref: r, actions: s }) => Ai(
      (i, u) => {
        const a = new Ci(() => {
          const d = i();
          return { columns: [e], foreignColumns: [d] };
        });
        return u.onUpdate && a.onUpdate(u.onUpdate), u.onDelete && a.onDelete(u.onDelete), a.build(t);
      },
      r,
      s
    ));
  }
  /** @internal */
  buildExtraConfigColumn(e) {
    return new Ni(e, this.config);
  }
}
class Y extends ce {
  constructor(e, t) {
    t.uniqueName || (t.uniqueName = xi(e, [t.name])), super(e, t), this.table = e;
  }
  static [I] = "PgColumn";
}
class Ni extends Y {
  static [I] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: void 0
  };
  asc() {
    return this.indexConfig.order = "asc", this;
  }
  desc() {
    return this.indexConfig.order = "desc", this;
  }
  nullsFirst() {
    return this.indexConfig.nulls = "first", this;
  }
  nullsLast() {
    return this.indexConfig.nulls = "last", this;
  }
  /**
   * ### PostgreSQL documentation quote
   *
   * > An operator class with optional parameters can be specified for each column of an index.
   * The operator class identifies the operators to be used by the index for that column.
   * For example, a B-tree index on four-byte integers would use the int4_ops class;
   * this operator class includes comparison functions for four-byte integers.
   * In practice the default operator class for the column's data type is usually sufficient.
   * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
   * For example, we might want to sort a complex-number data type either by absolute value or by real part.
   * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
   * More information about operator classes check:
   *
   * ### Useful links
   * https://www.postgresql.org/docs/current/sql-createindex.html
   *
   * https://www.postgresql.org/docs/current/indexes-opclass.html
   *
   * https://www.postgresql.org/docs/current/xindex.html
   *
   * ### Additional types
   * If you have the `pg_vector` extension installed in your database, you can use the
   * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
   *
   * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
   *
   * @param opClass
   * @returns
   */
  op(e) {
    return this.indexConfig.opClass = e, this;
  }
}
class Jt {
  static [I] = "IndexedColumn";
  constructor(e, t, r, s) {
    this.name = e, this.keyAsName = t, this.type = r, this.indexConfig = s;
  }
  name;
  keyAsName;
  type;
  indexConfig;
}
class Ii extends te {
  static [I] = "PgArrayBuilder";
  constructor(e, t, r) {
    super(e, "array", "PgArray"), this.config.baseBuilder = t, this.config.size = r;
  }
  /** @internal */
  build(e) {
    const t = this.config.baseBuilder.build(e);
    return new Er(
      e,
      this.config,
      t
    );
  }
}
class Er extends Y {
  constructor(e, t, r, s) {
    super(e, t), this.baseColumn = r, this.range = s, this.size = t.size;
  }
  size;
  static [I] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${typeof this.size == "number" ? this.size : ""}]`;
  }
  mapFromDriverValue(e) {
    return typeof e == "string" && (e = Bi(e)), e.map((t) => this.baseColumn.mapFromDriverValue(t));
  }
  mapToDriverValue(e, t = !1) {
    const r = e.map(
      (s) => s === null ? null : Q(this.baseColumn, Er) ? this.baseColumn.mapToDriverValue(s, !0) : this.baseColumn.mapToDriverValue(s)
    );
    return t ? r : jn(r);
  }
}
const Qr = Symbol.for("drizzle:isPgEnum");
function Li(n) {
  return !!n && typeof n == "function" && Qr in n && n[Qr] === !0;
}
class _e {
  static [I] = "Subquery";
  constructor(e, t, r, s = !1) {
    this._ = {
      brand: "Subquery",
      sql: e,
      selectedFields: t,
      alias: r,
      isWith: s
    };
  }
  // getSQL(): SQL<unknown> {
  // 	return new SQL([this]);
  // }
}
class Un extends _e {
  static [I] = "WithSubquery";
}
const Se = {
  startActiveSpan(n, e) {
    return e();
  }
}, ue = Symbol.for("drizzle:ViewBaseConfig"), Pt = Symbol.for("drizzle:Schema"), or = Symbol.for("drizzle:Columns"), kr = Symbol.for("drizzle:ExtraConfigColumns"), Yt = Symbol.for("drizzle:OriginalName"), Xt = Symbol.for("drizzle:BaseName"), Ct = Symbol.for("drizzle:IsAlias"), qr = Symbol.for("drizzle:ExtraConfigBuilder"), Oi = Symbol.for("drizzle:IsDrizzleTable");
class U {
  static [I] = "Table";
  /** @internal */
  static Symbol = {
    Name: Ie,
    Schema: Pt,
    OriginalName: Yt,
    Columns: or,
    ExtraConfigColumns: kr,
    BaseName: Xt,
    IsAlias: Ct,
    ExtraConfigBuilder: qr
  };
  /**
   * @internal
   * Can be changed if the table is aliased.
   */
  [Ie];
  /**
   * @internal
   * Used to store the original name of the table, before any aliasing.
   */
  [Yt];
  /** @internal */
  [Pt];
  /** @internal */
  [or];
  /** @internal */
  [kr];
  /**
   *  @internal
   * Used to store the table name before the transformation via the `tableCreator` functions.
   */
  [Xt];
  /** @internal */
  [Ct] = !1;
  /** @internal */
  [Oi] = !0;
  /** @internal */
  [qr] = void 0;
  constructor(e, t, r) {
    this[Ie] = this[Yt] = e, this[Pt] = t, this[Xt] = r;
  }
}
function Ne(n) {
  return n[Ie];
}
function it(n) {
  return `${n[Pt] ?? "public"}.${n[Ie]}`;
}
function zn(n) {
  return n != null && typeof n.getSQL == "function";
}
function Ri(n) {
  const e = { sql: "", params: [] };
  for (const t of n)
    e.sql += t.sql, e.params.push(...t.params), t.typings?.length && (e.typings || (e.typings = []), e.typings.push(...t.typings));
  return e;
}
class pe {
  static [I] = "StringChunk";
  value;
  constructor(e) {
    this.value = Array.isArray(e) ? e : [e];
  }
  getSQL() {
    return new z([this]);
  }
}
class z {
  constructor(e) {
    this.queryChunks = e;
  }
  static [I] = "SQL";
  /** @internal */
  decoder = Vn;
  shouldInlineParams = !1;
  append(e) {
    return this.queryChunks.push(...e.queryChunks), this;
  }
  toQuery(e) {
    return Se.startActiveSpan("drizzle.buildSQL", (t) => {
      const r = this.buildQueryFromSourceParams(this.queryChunks, e);
      return t?.setAttributes({
        "drizzle.query.text": r.sql,
        "drizzle.query.params": JSON.stringify(r.params)
      }), r;
    });
  }
  buildQueryFromSourceParams(e, t) {
    const r = Object.assign({}, t, {
      inlineParams: t.inlineParams || this.shouldInlineParams,
      paramStartIndex: t.paramStartIndex || { value: 0 }
    }), {
      casing: s,
      escapeName: i,
      escapeParam: u,
      prepareTyping: a,
      inlineParams: d,
      paramStartIndex: y
    } = r;
    return Ri(e.map((f) => {
      if (Q(f, pe))
        return { sql: f.value.join(""), params: [] };
      if (Q(f, ar))
        return { sql: i(f.value), params: [] };
      if (f === void 0)
        return { sql: "", params: [] };
      if (Array.isArray(f)) {
        const b = [new pe("(")];
        for (const [m, v] of f.entries())
          b.push(v), m < f.length - 1 && b.push(new pe(", "));
        return b.push(new pe(")")), this.buildQueryFromSourceParams(b, r);
      }
      if (Q(f, z))
        return this.buildQueryFromSourceParams(f.queryChunks, {
          ...r,
          inlineParams: d || f.shouldInlineParams
        });
      if (Q(f, U)) {
        const b = f[U.Symbol.Schema], m = f[U.Symbol.Name];
        return {
          sql: b === void 0 || f[Ct] ? i(m) : i(b) + "." + i(m),
          params: []
        };
      }
      if (Q(f, ce)) {
        const b = s.getColumnCasing(f);
        if (t.invokeSource === "indexes")
          return { sql: i(b), params: [] };
        const m = f.table[U.Symbol.Schema];
        return {
          sql: f.table[Ct] || m === void 0 ? i(f.table[U.Symbol.Name]) + "." + i(b) : i(m) + "." + i(f.table[U.Symbol.Name]) + "." + i(b),
          params: []
        };
      }
      if (Q(f, Fe)) {
        const b = f[ue].schema, m = f[ue].name;
        return {
          sql: b === void 0 || f[ue].isAlias ? i(m) : i(b) + "." + i(m),
          params: []
        };
      }
      if (Q(f, Le)) {
        if (Q(f.value, Ke))
          return { sql: u(y.value++, f), params: [f], typings: ["none"] };
        const b = f.value === null ? null : f.encoder.mapToDriverValue(f.value);
        if (Q(b, z))
          return this.buildQueryFromSourceParams([b], r);
        if (d)
          return { sql: this.mapInlineParam(b, r), params: [] };
        let m = ["none"];
        return a && (m = [a(f.encoder)]), { sql: u(y.value++, b), params: [b], typings: m };
      }
      return Q(f, Ke) ? { sql: u(y.value++, f), params: [f], typings: ["none"] } : Q(f, z.Aliased) && f.fieldAlias !== void 0 ? { sql: i(f.fieldAlias), params: [] } : Q(f, _e) ? f._.isWith ? { sql: i(f._.alias), params: [] } : this.buildQueryFromSourceParams([
        new pe("("),
        f._.sql,
        new pe(") "),
        new ar(f._.alias)
      ], r) : Li(f) ? f.schema ? { sql: i(f.schema) + "." + i(f.enumName), params: [] } : { sql: i(f.enumName), params: [] } : zn(f) ? f.shouldOmitSQLParens?.() ? this.buildQueryFromSourceParams([f.getSQL()], r) : this.buildQueryFromSourceParams([
        new pe("("),
        f.getSQL(),
        new pe(")")
      ], r) : d ? { sql: this.mapInlineParam(f, r), params: [] } : { sql: u(y.value++, f), params: [f], typings: ["none"] };
    }));
  }
  mapInlineParam(e, { escapeString: t }) {
    if (e === null)
      return "null";
    if (typeof e == "number" || typeof e == "boolean")
      return e.toString();
    if (typeof e == "string")
      return t(e);
    if (typeof e == "object") {
      const r = e.toString();
      return t(r === "[object Object]" ? JSON.stringify(e) : r);
    }
    throw new Error("Unexpected param value: " + e);
  }
  getSQL() {
    return this;
  }
  as(e) {
    return e === void 0 ? this : new z.Aliased(this, e);
  }
  mapWith(e) {
    return this.decoder = typeof e == "function" ? { mapFromDriverValue: e } : e, this;
  }
  inlineParams() {
    return this.shouldInlineParams = !0, this;
  }
  /**
   * This method is used to conditionally include a part of the query.
   *
   * @param condition - Condition to check
   * @returns itself if the condition is `true`, otherwise `undefined`
   */
  if(e) {
    return e ? this : void 0;
  }
}
class ar {
  constructor(e) {
    this.value = e;
  }
  static [I] = "Name";
  brand;
  getSQL() {
    return new z([this]);
  }
}
function Mi(n) {
  return typeof n == "object" && n !== null && "mapToDriverValue" in n && typeof n.mapToDriverValue == "function";
}
const Vn = {
  mapFromDriverValue: (n) => n
}, Wn = {
  mapToDriverValue: (n) => n
};
({
  ...Vn,
  ...Wn
});
class Le {
  /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */
  constructor(e, t = Wn) {
    this.value = e, this.encoder = t;
  }
  static [I] = "Param";
  brand;
  getSQL() {
    return new z([this]);
  }
}
function A(n, ...e) {
  const t = [];
  (e.length > 0 || n.length > 0 && n[0] !== "") && t.push(new pe(n[0]));
  for (const [r, s] of e.entries())
    t.push(s, new pe(n[r + 1]));
  return new z(t);
}
((n) => {
  function e() {
    return new z([]);
  }
  n.empty = e;
  function t(d) {
    return new z(d);
  }
  n.fromList = t;
  function r(d) {
    return new z([new pe(d)]);
  }
  n.raw = r;
  function s(d, y) {
    const f = [];
    for (const [b, m] of d.entries())
      b > 0 && y !== void 0 && f.push(y), f.push(m);
    return new z(f);
  }
  n.join = s;
  function i(d) {
    return new ar(d);
  }
  n.identifier = i;
  function u(d) {
    return new Ke(d);
  }
  n.placeholder = u;
  function a(d, y) {
    return new Le(d, y);
  }
  n.param = a;
})(A || (A = {}));
((n) => {
  class e {
    constructor(r, s) {
      this.sql = r, this.fieldAlias = s;
    }
    static [I] = "SQL.Aliased";
    /** @internal */
    isSelectionField = !1;
    getSQL() {
      return this.sql;
    }
    /** @internal */
    clone() {
      return new e(this.sql, this.fieldAlias);
    }
  }
  n.Aliased = e;
})(z || (z = {}));
class Ke {
  constructor(e) {
    this.name = e;
  }
  static [I] = "Placeholder";
  getSQL() {
    return new z([this]);
  }
}
function Zt(n, e) {
  return n.map((t) => {
    if (Q(t, Ke)) {
      if (!(t.name in e))
        throw new Error(`No value for placeholder "${t.name}" was provided`);
      return e[t.name];
    }
    if (Q(t, Le) && Q(t.value, Ke)) {
      if (!(t.value.name in e))
        throw new Error(`No value for placeholder "${t.value.name}" was provided`);
      return t.encoder.mapToDriverValue(e[t.value.name]);
    }
    return t;
  });
}
const Di = Symbol.for("drizzle:IsDrizzleView");
class Fe {
  static [I] = "View";
  /** @internal */
  [ue];
  /** @internal */
  [Di] = !0;
  constructor({ name: e, schema: t, selectedFields: r, query: s }) {
    this[ue] = {
      name: e,
      originalName: e,
      schema: t,
      selectedFields: r,
      query: s,
      isExisting: !s,
      isAlias: !1
    };
  }
  getSQL() {
    return new z([this]);
  }
}
ce.prototype.getSQL = function() {
  return new z([this]);
};
U.prototype.getSQL = function() {
  return new z([this]);
};
_e.prototype.getSQL = function() {
  return new z([this]);
};
class Tt {
  constructor(e) {
    this.table = e;
  }
  static [I] = "ColumnAliasProxyHandler";
  get(e, t) {
    return t === "table" ? this.table : e[t];
  }
}
class _r {
  constructor(e, t) {
    this.alias = e, this.replaceOriginalName = t;
  }
  static [I] = "TableAliasProxyHandler";
  get(e, t) {
    if (t === U.Symbol.IsAlias)
      return !0;
    if (t === U.Symbol.Name)
      return this.alias;
    if (this.replaceOriginalName && t === U.Symbol.OriginalName)
      return this.alias;
    if (t === ue)
      return {
        ...e[ue],
        name: this.alias,
        isAlias: !0
      };
    if (t === U.Symbol.Columns) {
      const s = e[U.Symbol.Columns];
      if (!s)
        return s;
      const i = {};
      return Object.keys(s).map((u) => {
        i[u] = new Proxy(
          s[u],
          new Tt(new Proxy(e, this))
        );
      }), i;
    }
    const r = e[t];
    return Q(r, ce) ? new Proxy(r, new Tt(new Proxy(e, this))) : r;
  }
}
function er(n, e) {
  return new Proxy(n, new _r(e, !1));
}
function Be(n, e) {
  return new Proxy(
    n,
    new Tt(new Proxy(n.table, new _r(e, !1)))
  );
}
function Kn(n, e) {
  return new z.Aliased(At(n.sql, e), n.fieldAlias);
}
function At(n, e) {
  return A.join(n.queryChunks.map((t) => Q(t, ce) ? Be(t, e) : Q(t, z) ? At(t, e) : Q(t, z.Aliased) ? Kn(t, e) : t));
}
class ge {
  static [I] = "SelectionProxyHandler";
  config;
  constructor(e) {
    this.config = { ...e };
  }
  get(e, t) {
    if (t === "_")
      return {
        ...e._,
        selectedFields: new Proxy(
          e._.selectedFields,
          this
        )
      };
    if (t === ue)
      return {
        ...e[ue],
        selectedFields: new Proxy(
          e[ue].selectedFields,
          this
        )
      };
    if (typeof t == "symbol")
      return e[t];
    const s = (Q(e, _e) ? e._.selectedFields : Q(e, Fe) ? e[ue].selectedFields : e)[t];
    if (Q(s, z.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !s.isSelectionField)
        return s.sql;
      const i = s.clone();
      return i.isSelectionField = !0, i;
    }
    if (Q(s, z)) {
      if (this.config.sqlBehavior === "sql")
        return s;
      throw new Error(
        `You tried to reference "${t}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
      );
    }
    return Q(s, ce) ? this.config.alias ? new Proxy(
      s,
      new Tt(
        new Proxy(
          s.table,
          new _r(this.config.alias, this.config.replaceOriginalName ?? !1)
        )
      )
    ) : s : typeof s != "object" || s === null ? s : new Proxy(s, new ge(this.config));
  }
}
function $i(n, e, t) {
  const r = {}, s = n.reduce(
    (i, { path: u, field: a }, d) => {
      let y;
      Q(a, ce) ? y = a : Q(a, z) ? y = a.decoder : y = a.sql.decoder;
      let f = i;
      for (const [b, m] of u.entries())
        if (b < u.length - 1)
          m in f || (f[m] = {}), f = f[m];
        else {
          const v = e[d], c = f[m] = v === null ? null : y.mapFromDriverValue(v);
          if (t && Q(a, ce) && u.length === 2) {
            const h = u[0];
            h in r ? typeof r[h] == "string" && r[h] !== Ne(a.table) && (r[h] = !1) : r[h] = c === null ? Ne(a.table) : !1;
          }
        }
      return i;
    },
    {}
  );
  if (t && Object.keys(r).length > 0)
    for (const [i, u] of Object.entries(r))
      typeof u == "string" && !t[u] && (s[i] = null);
  return s;
}
function Me(n, e) {
  return Object.entries(n).reduce((t, [r, s]) => {
    if (typeof r != "string")
      return t;
    const i = e ? [...e, r] : [r];
    return Q(s, ce) || Q(s, z) || Q(s, z.Aliased) ? t.push({ path: i, field: s }) : Q(s, U) ? t.push(...Me(s[U.Symbol.Columns], i)) : t.push(...Me(s, i)), t;
  }, []);
}
function Cr(n, e) {
  const t = Object.keys(n), r = Object.keys(e);
  if (t.length !== r.length)
    return !1;
  for (const [s, i] of t.entries())
    if (i !== r[s])
      return !1;
  return !0;
}
function Hn(n, e) {
  const t = Object.entries(e).filter(([, r]) => r !== void 0).map(([r, s]) => Q(s, z) || Q(s, ce) ? [r, s] : [r, new Le(s, n[U.Symbol.Columns][r])]);
  if (t.length === 0)
    throw new Error("No values to set");
  return Object.fromEntries(t);
}
function Qi(n, e) {
  for (const t of e)
    for (const r of Object.getOwnPropertyNames(t.prototype))
      r !== "constructor" && Object.defineProperty(
        n.prototype,
        r,
        Object.getOwnPropertyDescriptor(t.prototype, r) || /* @__PURE__ */ Object.create(null)
      );
}
function ki(n) {
  return n[U.Symbol.Columns];
}
function Re(n) {
  return Q(n, _e) ? n._.alias : Q(n, Fe) ? n[ue].name : Q(n, z) ? void 0 : n[U.Symbol.IsAlias] ? n[U.Symbol.Name] : n[U.Symbol.BaseName];
}
function fe(n, e) {
  return {
    name: typeof n == "string" && n.length > 0 ? n : "",
    config: typeof n == "object" ? n : e
  };
}
function qi(n) {
  if (typeof n != "object" || n === null || n.constructor.name !== "Object")
    return !1;
  if ("logger" in n) {
    const e = typeof n.logger;
    return !(e !== "boolean" && (e !== "object" || typeof n.logger.logQuery != "function") && e !== "undefined");
  }
  if ("schema" in n) {
    const e = typeof n.schema;
    return !(e !== "object" && e !== "undefined");
  }
  if ("casing" in n) {
    const e = typeof n.casing;
    return !(e !== "string" && e !== "undefined");
  }
  if ("mode" in n)
    return !(n.mode !== "default" || n.mode !== "planetscale" || n.mode !== void 0);
  if ("connection" in n) {
    const e = typeof n.connection;
    return !(e !== "string" && e !== "object" && e !== "undefined");
  }
  if ("client" in n) {
    const e = typeof n.client;
    return !(e !== "object" && e !== "function" && e !== "undefined");
  }
  return Object.keys(n).length === 0;
}
class Fr extends qe {
  constructor(e, t, r, s) {
    super(), this.session = t, this.dialect = r, this.config = { table: e, withList: s };
  }
  static [I] = "PgDelete";
  config;
  /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will delete only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be deleted.
   *
   * ```ts
   * // Delete all cars with green color
   * await db.delete(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.delete(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Delete all BMW cars with a green color
   * await db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Delete all cars with the green or blue color
   * await db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(e) {
    return this.config.where = e, this;
  }
  returning(e = this.config.table[U.Symbol.Columns]) {
    return this.config.returningFields = e, this.config.returning = Me(e), this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  /** @internal */
  _prepare(e) {
    return Se.startActiveSpan("drizzle.prepareQuery", () => this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, e, !0));
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => Se.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new ge({
        alias: Ne(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
}
function Fi(n) {
  return (n.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).map((t) => t.toLowerCase()).join("_");
}
function ji(n) {
  return (n.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).reduce((t, r, s) => {
    const i = s === 0 ? r.toLowerCase() : `${r[0].toUpperCase()}${r.slice(1)}`;
    return t + i;
  }, "");
}
function Ui(n) {
  return n;
}
class zi {
  static [I] = "CasingCache";
  /** @internal */
  cache = {};
  cachedTables = {};
  convert;
  constructor(e) {
    this.convert = e === "snake_case" ? Fi : e === "camelCase" ? ji : Ui;
  }
  getColumnCasing(e) {
    if (!e.keyAsName)
      return e.name;
    const t = e.table[U.Symbol.Schema] ?? "public", r = e.table[U.Symbol.OriginalName], s = `${t}.${r}.${e.name}`;
    return this.cache[s] || this.cacheTable(e.table), this.cache[s];
  }
  cacheTable(e) {
    const t = e[U.Symbol.Schema] ?? "public", r = e[U.Symbol.OriginalName], s = `${t}.${r}`;
    if (!this.cachedTables[s]) {
      for (const i of Object.values(e[U.Symbol.Columns])) {
        const u = `${s}.${i.name}`;
        this.cache[u] = this.convert(i.name);
      }
      this.cachedTables[s] = !0;
    }
  }
  clearCache() {
    this.cache = {}, this.cachedTables = {};
  }
}
class Vi extends Error {
  static [I] = "DrizzleError";
  constructor({ message: e, cause: t }) {
    super(e), this.name = "DrizzleError", this.cause = t;
  }
}
class kt extends te {
  static [I] = "PgIntColumnBaseBuilder";
  generatedAlwaysAsIdentity(e) {
    if (e) {
      const { name: t, ...r } = e;
      this.config.generatedIdentity = {
        type: "always",
        sequenceName: t,
        sequenceOptions: r
      };
    } else
      this.config.generatedIdentity = {
        type: "always"
      };
    return this.config.hasDefault = !0, this.config.notNull = !0, this;
  }
  generatedByDefaultAsIdentity(e) {
    if (e) {
      const { name: t, ...r } = e;
      this.config.generatedIdentity = {
        type: "byDefault",
        sequenceName: t,
        sequenceOptions: r
      };
    } else
      this.config.generatedIdentity = {
        type: "byDefault"
      };
    return this.config.hasDefault = !0, this.config.notNull = !0, this;
  }
}
class Wi extends kt {
  static [I] = "PgBigInt53Builder";
  constructor(e) {
    super(e, "number", "PgBigInt53");
  }
  /** @internal */
  build(e) {
    return new Ki(e, this.config);
  }
}
class Ki extends Y {
  static [I] = "PgBigInt53";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(e) {
    return typeof e == "number" ? e : Number(e);
  }
}
class Hi extends kt {
  static [I] = "PgBigInt64Builder";
  constructor(e) {
    super(e, "bigint", "PgBigInt64");
  }
  /** @internal */
  build(e) {
    return new Gi(
      e,
      this.config
    );
  }
}
class Gi extends Y {
  static [I] = "PgBigInt64";
  getSQLType() {
    return "bigint";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function Ji(n, e) {
  const { name: t, config: r } = fe(n, e);
  return r.mode === "number" ? new Wi(t) : new Hi(t);
}
class Yi extends te {
  static [I] = "PgBigSerial53Builder";
  constructor(e) {
    super(e, "number", "PgBigSerial53"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new Xi(
      e,
      this.config
    );
  }
}
class Xi extends Y {
  static [I] = "PgBigSerial53";
  getSQLType() {
    return "bigserial";
  }
  mapFromDriverValue(e) {
    return typeof e == "number" ? e : Number(e);
  }
}
class Zi extends te {
  static [I] = "PgBigSerial64Builder";
  constructor(e) {
    super(e, "bigint", "PgBigSerial64"), this.config.hasDefault = !0;
  }
  /** @internal */
  build(e) {
    return new eo(
      e,
      this.config
    );
  }
}
class eo extends Y {
  static [I] = "PgBigSerial64";
  getSQLType() {
    return "bigserial";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function to(n, e) {
  const { name: t, config: r } = fe(n, e);
  return r.mode === "number" ? new Yi(t) : new Zi(t);
}
class ro extends te {
  static [I] = "PgBooleanBuilder";
  constructor(e) {
    super(e, "boolean", "PgBoolean");
  }
  /** @internal */
  build(e) {
    return new no(e, this.config);
  }
}
class no extends Y {
  static [I] = "PgBoolean";
  getSQLType() {
    return "boolean";
  }
}
function so(n) {
  return new ro(n ?? "");
}
class io extends te {
  static [I] = "PgCharBuilder";
  constructor(e, t) {
    super(e, "string", "PgChar"), this.config.length = t.length, this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new oo(
      e,
      this.config
    );
  }
}
class oo extends Y {
  static [I] = "PgChar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? "char" : `char(${this.length})`;
  }
}
function ao(n, e = {}) {
  const { name: t, config: r } = fe(n, e);
  return new io(t, r);
}
class uo extends te {
  static [I] = "PgCidrBuilder";
  constructor(e) {
    super(e, "string", "PgCidr");
  }
  /** @internal */
  build(e) {
    return new lo(e, this.config);
  }
}
class lo extends Y {
  static [I] = "PgCidr";
  getSQLType() {
    return "cidr";
  }
}
function co(n) {
  return new uo(n ?? "");
}
class ho extends te {
  static [I] = "PgCustomColumnBuilder";
  constructor(e, t, r) {
    super(e, "custom", "PgCustomColumn"), this.config.fieldConfig = t, this.config.customTypeParams = r;
  }
  /** @internal */
  build(e) {
    return new fo(
      e,
      this.config
    );
  }
}
class fo extends Y {
  static [I] = "PgCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  constructor(e, t) {
    super(e, t), this.sqlName = t.customTypeParams.dataType(t.fieldConfig), this.mapTo = t.customTypeParams.toDriver, this.mapFrom = t.customTypeParams.fromDriver;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(e) {
    return typeof this.mapFrom == "function" ? this.mapFrom(e) : e;
  }
  mapToDriverValue(e) {
    return typeof this.mapTo == "function" ? this.mapTo(e) : e;
  }
}
function po(n) {
  return (e, t) => {
    const { name: r, config: s } = fe(e, t);
    return new ho(r, s, n);
  };
}
class ct extends te {
  static [I] = "PgDateColumnBaseBuilder";
  defaultNow() {
    return this.default(A`now()`);
  }
}
class go extends ct {
  static [I] = "PgDateBuilder";
  constructor(e) {
    super(e, "date", "PgDate");
  }
  /** @internal */
  build(e) {
    return new Gn(e, this.config);
  }
}
class Gn extends Y {
  static [I] = "PgDate";
  getSQLType() {
    return "date";
  }
  mapFromDriverValue(e) {
    return new Date(e);
  }
  mapToDriverValue(e) {
    return e.toISOString();
  }
}
class mo extends ct {
  static [I] = "PgDateStringBuilder";
  constructor(e) {
    super(e, "string", "PgDateString");
  }
  /** @internal */
  build(e) {
    return new Jn(
      e,
      this.config
    );
  }
}
class Jn extends Y {
  static [I] = "PgDateString";
  getSQLType() {
    return "date";
  }
}
function Yn(n, e) {
  const { name: t, config: r } = fe(n, e);
  return r?.mode === "date" ? new go(t) : new mo(t);
}
class yo extends te {
  static [I] = "PgDoublePrecisionBuilder";
  constructor(e) {
    super(e, "number", "PgDoublePrecision");
  }
  /** @internal */
  build(e) {
    return new wo(
      e,
      this.config
    );
  }
}
class wo extends Y {
  static [I] = "PgDoublePrecision";
  getSQLType() {
    return "double precision";
  }
  mapFromDriverValue(e) {
    return typeof e == "string" ? Number.parseFloat(e) : e;
  }
}
function bo(n) {
  return new yo(n ?? "");
}
class vo extends te {
  static [I] = "PgInetBuilder";
  constructor(e) {
    super(e, "string", "PgInet");
  }
  /** @internal */
  build(e) {
    return new So(e, this.config);
  }
}
class So extends Y {
  static [I] = "PgInet";
  getSQLType() {
    return "inet";
  }
}
function Po(n) {
  return new vo(n ?? "");
}
class Eo extends kt {
  static [I] = "PgIntegerBuilder";
  constructor(e) {
    super(e, "number", "PgInteger");
  }
  /** @internal */
  build(e) {
    return new _o(e, this.config);
  }
}
class _o extends Y {
  static [I] = "PgInteger";
  getSQLType() {
    return "integer";
  }
  mapFromDriverValue(e) {
    return typeof e == "string" ? Number.parseInt(e) : e;
  }
}
function De(n) {
  return new Eo(n ?? "");
}
class Co extends te {
  static [I] = "PgIntervalBuilder";
  constructor(e, t) {
    super(e, "string", "PgInterval"), this.config.intervalConfig = t;
  }
  /** @internal */
  build(e) {
    return new To(e, this.config);
  }
}
class To extends Y {
  static [I] = "PgInterval";
  fields = this.config.intervalConfig.fields;
  precision = this.config.intervalConfig.precision;
  getSQLType() {
    const e = this.fields ? ` ${this.fields}` : "", t = this.precision ? `(${this.precision})` : "";
    return `interval${e}${t}`;
  }
}
function Ao(n, e = {}) {
  const { name: t, config: r } = fe(n, e);
  return new Co(t, r);
}
class xo extends te {
  static [I] = "PgJsonBuilder";
  constructor(e) {
    super(e, "json", "PgJson");
  }
  /** @internal */
  build(e) {
    return new Xn(e, this.config);
  }
}
class Xn extends Y {
  static [I] = "PgJson";
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return "json";
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    if (typeof e == "string")
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    return e;
  }
}
function Bo(n) {
  return new xo(n ?? "");
}
class No extends te {
  static [I] = "PgJsonbBuilder";
  constructor(e) {
    super(e, "json", "PgJsonb");
  }
  /** @internal */
  build(e) {
    return new Zn(e, this.config);
  }
}
class Zn extends Y {
  static [I] = "PgJsonb";
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return "jsonb";
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    if (typeof e == "string")
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    return e;
  }
}
function Io(n) {
  return new No(n ?? "");
}
class Lo extends te {
  static [I] = "PgLineBuilder";
  constructor(e) {
    super(e, "array", "PgLine");
  }
  /** @internal */
  build(e) {
    return new Oo(
      e,
      this.config
    );
  }
}
class Oo extends Y {
  static [I] = "PgLine";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(e) {
    const [t, r, s] = e.slice(1, -1).split(",");
    return [Number.parseFloat(t), Number.parseFloat(r), Number.parseFloat(s)];
  }
  mapToDriverValue(e) {
    return `{${e[0]},${e[1]},${e[2]}}`;
  }
}
class Ro extends te {
  static [I] = "PgLineABCBuilder";
  constructor(e) {
    super(e, "json", "PgLineABC");
  }
  /** @internal */
  build(e) {
    return new Mo(
      e,
      this.config
    );
  }
}
class Mo extends Y {
  static [I] = "PgLineABC";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(e) {
    const [t, r, s] = e.slice(1, -1).split(",");
    return { a: Number.parseFloat(t), b: Number.parseFloat(r), c: Number.parseFloat(s) };
  }
  mapToDriverValue(e) {
    return `{${e.a},${e.b},${e.c}}`;
  }
}
function Do(n, e) {
  const { name: t, config: r } = fe(n, e);
  return !r?.mode || r.mode === "tuple" ? new Lo(t) : new Ro(t);
}
class $o extends te {
  static [I] = "PgMacaddrBuilder";
  constructor(e) {
    super(e, "string", "PgMacaddr");
  }
  /** @internal */
  build(e) {
    return new Qo(e, this.config);
  }
}
class Qo extends Y {
  static [I] = "PgMacaddr";
  getSQLType() {
    return "macaddr";
  }
}
function ko(n) {
  return new $o(n ?? "");
}
class qo extends te {
  static [I] = "PgMacaddr8Builder";
  constructor(e) {
    super(e, "string", "PgMacaddr8");
  }
  /** @internal */
  build(e) {
    return new Fo(e, this.config);
  }
}
class Fo extends Y {
  static [I] = "PgMacaddr8";
  getSQLType() {
    return "macaddr8";
  }
}
function jo(n) {
  return new qo(n ?? "");
}
class Uo extends te {
  static [I] = "PgNumericBuilder";
  constructor(e, t, r) {
    super(e, "string", "PgNumeric"), this.config.precision = t, this.config.scale = r;
  }
  /** @internal */
  build(e) {
    return new es(e, this.config);
  }
}
class es extends Y {
  static [I] = "PgNumeric";
  precision;
  scale;
  constructor(e, t) {
    super(e, t), this.precision = t.precision, this.scale = t.scale;
  }
  mapFromDriverValue(e) {
    return typeof e == "string" ? e : String(e);
  }
  getSQLType() {
    return this.precision !== void 0 && this.scale !== void 0 ? `numeric(${this.precision}, ${this.scale})` : this.precision === void 0 ? "numeric" : `numeric(${this.precision})`;
  }
}
class zo extends te {
  static [I] = "PgNumericNumberBuilder";
  constructor(e, t, r) {
    super(e, "number", "PgNumericNumber"), this.config.precision = t, this.config.scale = r;
  }
  /** @internal */
  build(e) {
    return new Vo(
      e,
      this.config
    );
  }
}
class Vo extends Y {
  static [I] = "PgNumericNumber";
  precision;
  scale;
  constructor(e, t) {
    super(e, t), this.precision = t.precision, this.scale = t.scale;
  }
  mapFromDriverValue(e) {
    return typeof e == "number" ? e : Number(e);
  }
  mapToDriverValue = String;
  getSQLType() {
    return this.precision !== void 0 && this.scale !== void 0 ? `numeric(${this.precision}, ${this.scale})` : this.precision === void 0 ? "numeric" : `numeric(${this.precision})`;
  }
}
class Wo extends te {
  static [I] = "PgNumericBigIntBuilder";
  constructor(e, t, r) {
    super(e, "bigint", "PgNumericBigInt"), this.config.precision = t, this.config.scale = r;
  }
  /** @internal */
  build(e) {
    return new Ko(
      e,
      this.config
    );
  }
}
class Ko extends Y {
  static [I] = "PgNumericBigInt";
  precision;
  scale;
  constructor(e, t) {
    super(e, t), this.precision = t.precision, this.scale = t.scale;
  }
  mapFromDriverValue = BigInt;
  mapToDriverValue = String;
  getSQLType() {
    return this.precision !== void 0 && this.scale !== void 0 ? `numeric(${this.precision}, ${this.scale})` : this.precision === void 0 ? "numeric" : `numeric(${this.precision})`;
  }
}
function Ho(n, e) {
  const { name: t, config: r } = fe(n, e), s = r?.mode;
  return s === "number" ? new zo(t, r?.precision, r?.scale) : s === "bigint" ? new Wo(t, r?.precision, r?.scale) : new Uo(t, r?.precision, r?.scale);
}
class Go extends te {
  static [I] = "PgPointTupleBuilder";
  constructor(e) {
    super(e, "array", "PgPointTuple");
  }
  /** @internal */
  build(e) {
    return new Jo(
      e,
      this.config
    );
  }
}
class Jo extends Y {
  static [I] = "PgPointTuple";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(e) {
    if (typeof e == "string") {
      const [t, r] = e.slice(1, -1).split(",");
      return [Number.parseFloat(t), Number.parseFloat(r)];
    }
    return [e.x, e.y];
  }
  mapToDriverValue(e) {
    return `(${e[0]},${e[1]})`;
  }
}
class Yo extends te {
  static [I] = "PgPointObjectBuilder";
  constructor(e) {
    super(e, "json", "PgPointObject");
  }
  /** @internal */
  build(e) {
    return new Xo(
      e,
      this.config
    );
  }
}
class Xo extends Y {
  static [I] = "PgPointObject";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(e) {
    if (typeof e == "string") {
      const [t, r] = e.slice(1, -1).split(",");
      return { x: Number.parseFloat(t), y: Number.parseFloat(r) };
    }
    return e;
  }
  mapToDriverValue(e) {
    return `(${e.x},${e.y})`;
  }
}
function Zo(n, e) {
  const { name: t, config: r } = fe(n, e);
  return !r?.mode || r.mode === "tuple" ? new Go(t) : new Yo(t);
}
function ea(n) {
  const e = [];
  for (let t = 0; t < n.length; t += 2)
    e.push(Number.parseInt(n.slice(t, t + 2), 16));
  return new Uint8Array(e);
}
function jr(n, e) {
  const t = new ArrayBuffer(8), r = new DataView(t);
  for (let s = 0; s < 8; s++)
    r.setUint8(s, n[e + s]);
  return r.getFloat64(0, !0);
}
function ts(n) {
  const e = ea(n);
  let t = 0;
  const r = e[t];
  t += 1;
  const s = new DataView(e.buffer), i = s.getUint32(t, r === 1);
  if (t += 4, i & 536870912 && (s.getUint32(t, r === 1), t += 4), (i & 65535) === 1) {
    const u = jr(e, t);
    t += 8;
    const a = jr(e, t);
    return t += 8, [u, a];
  }
  throw new Error("Unsupported geometry type");
}
class ta extends te {
  static [I] = "PgGeometryBuilder";
  constructor(e) {
    super(e, "array", "PgGeometry");
  }
  /** @internal */
  build(e) {
    return new ra(
      e,
      this.config
    );
  }
}
class ra extends Y {
  static [I] = "PgGeometry";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(e) {
    return ts(e);
  }
  mapToDriverValue(e) {
    return `point(${e[0]} ${e[1]})`;
  }
}
class na extends te {
  static [I] = "PgGeometryObjectBuilder";
  constructor(e) {
    super(e, "json", "PgGeometryObject");
  }
  /** @internal */
  build(e) {
    return new sa(
      e,
      this.config
    );
  }
}
class sa extends Y {
  static [I] = "PgGeometryObject";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(e) {
    const t = ts(e);
    return { x: t[0], y: t[1] };
  }
  mapToDriverValue(e) {
    return `point(${e.x} ${e.y})`;
  }
}
function ia(n, e) {
  const { name: t, config: r } = fe(n, e);
  return !r?.mode || r.mode === "tuple" ? new ta(t) : new na(t);
}
class oa extends te {
  static [I] = "PgRealBuilder";
  constructor(e, t) {
    super(e, "number", "PgReal"), this.config.length = t;
  }
  /** @internal */
  build(e) {
    return new aa(e, this.config);
  }
}
class aa extends Y {
  static [I] = "PgReal";
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return "real";
  }
  mapFromDriverValue = (e) => typeof e == "string" ? Number.parseFloat(e) : e;
}
function ua(n) {
  return new oa(n ?? "");
}
class la extends te {
  static [I] = "PgSerialBuilder";
  constructor(e) {
    super(e, "number", "PgSerial"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new ca(e, this.config);
  }
}
class ca extends Y {
  static [I] = "PgSerial";
  getSQLType() {
    return "serial";
  }
}
function ha(n) {
  return new la(n ?? "");
}
class fa extends kt {
  static [I] = "PgSmallIntBuilder";
  constructor(e) {
    super(e, "number", "PgSmallInt");
  }
  /** @internal */
  build(e) {
    return new da(e, this.config);
  }
}
class da extends Y {
  static [I] = "PgSmallInt";
  getSQLType() {
    return "smallint";
  }
  mapFromDriverValue = (e) => typeof e == "string" ? Number(e) : e;
}
function pa(n) {
  return new fa(n ?? "");
}
class ga extends te {
  static [I] = "PgSmallSerialBuilder";
  constructor(e) {
    super(e, "number", "PgSmallSerial"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new ma(
      e,
      this.config
    );
  }
}
class ma extends Y {
  static [I] = "PgSmallSerial";
  getSQLType() {
    return "smallserial";
  }
}
function ya(n) {
  return new ga(n ?? "");
}
class wa extends te {
  static [I] = "PgTextBuilder";
  constructor(e, t) {
    super(e, "string", "PgText"), this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new ba(e, this.config);
  }
}
class ba extends Y {
  static [I] = "PgText";
  enumValues = this.config.enumValues;
  getSQLType() {
    return "text";
  }
}
function va(n, e = {}) {
  const { name: t, config: r } = fe(n, e);
  return new wa(t, r);
}
class Sa extends ct {
  constructor(e, t, r) {
    super(e, "string", "PgTime"), this.withTimezone = t, this.precision = r, this.config.withTimezone = t, this.config.precision = r;
  }
  static [I] = "PgTimeBuilder";
  /** @internal */
  build(e) {
    return new rs(e, this.config);
  }
}
class rs extends Y {
  static [I] = "PgTime";
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t), this.withTimezone = t.withTimezone, this.precision = t.precision;
  }
  getSQLType() {
    return `time${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
}
function Pa(n, e = {}) {
  const { name: t, config: r } = fe(n, e);
  return new Sa(t, r.withTimezone ?? !1, r.precision);
}
class Ea extends ct {
  static [I] = "PgTimestampBuilder";
  constructor(e, t, r) {
    super(e, "date", "PgTimestamp"), this.config.withTimezone = t, this.config.precision = r;
  }
  /** @internal */
  build(e) {
    return new ns(e, this.config);
  }
}
class ns extends Y {
  static [I] = "PgTimestamp";
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t), this.withTimezone = t.withTimezone, this.precision = t.precision;
  }
  getSQLType() {
    return `timestamp${this.precision === void 0 ? "" : ` (${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
  mapFromDriverValue = (e) => new Date(this.withTimezone ? e : e + "+0000");
  mapToDriverValue = (e) => e.toISOString();
}
class _a extends ct {
  static [I] = "PgTimestampStringBuilder";
  constructor(e, t, r) {
    super(e, "string", "PgTimestampString"), this.config.withTimezone = t, this.config.precision = r;
  }
  /** @internal */
  build(e) {
    return new ss(
      e,
      this.config
    );
  }
}
class ss extends Y {
  static [I] = "PgTimestampString";
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t), this.withTimezone = t.withTimezone, this.precision = t.precision;
  }
  getSQLType() {
    return `timestamp${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
}
function Et(n, e = {}) {
  const { name: t, config: r } = fe(n, e);
  return r?.mode === "string" ? new _a(t, r.withTimezone ?? !1, r.precision) : new Ea(t, r?.withTimezone ?? !1, r?.precision);
}
class Ca extends te {
  static [I] = "PgUUIDBuilder";
  constructor(e) {
    super(e, "string", "PgUUID");
  }
  /**
   * Adds `default gen_random_uuid()` to the column definition.
   */
  defaultRandom() {
    return this.default(A`gen_random_uuid()`);
  }
  /** @internal */
  build(e) {
    return new is(e, this.config);
  }
}
class is extends Y {
  static [I] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
}
function os(n) {
  return new Ca(n ?? "");
}
class Ta extends te {
  static [I] = "PgVarcharBuilder";
  constructor(e, t) {
    super(e, "string", "PgVarchar"), this.config.length = t.length, this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new Aa(
      e,
      this.config
    );
  }
}
class Aa extends Y {
  static [I] = "PgVarchar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? "varchar" : `varchar(${this.length})`;
  }
}
function ot(n, e = {}) {
  const { name: t, config: r } = fe(n, e);
  return new Ta(t, r);
}
class xa extends te {
  static [I] = "PgBinaryVectorBuilder";
  constructor(e, t) {
    super(e, "string", "PgBinaryVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new Ba(
      e,
      this.config
    );
  }
}
class Ba extends Y {
  static [I] = "PgBinaryVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `bit(${this.dimensions})`;
  }
}
function Na(n, e) {
  const { name: t, config: r } = fe(n, e);
  return new xa(t, r);
}
class Ia extends te {
  static [I] = "PgHalfVectorBuilder";
  constructor(e, t) {
    super(e, "array", "PgHalfVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new La(
      e,
      this.config
    );
  }
}
class La extends Y {
  static [I] = "PgHalfVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `halfvec(${this.dimensions})`;
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    return e.slice(1, -1).split(",").map((t) => Number.parseFloat(t));
  }
}
function Oa(n, e) {
  const { name: t, config: r } = fe(n, e);
  return new Ia(t, r);
}
class Ra extends te {
  static [I] = "PgSparseVectorBuilder";
  constructor(e, t) {
    super(e, "string", "PgSparseVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new Ma(
      e,
      this.config
    );
  }
}
class Ma extends Y {
  static [I] = "PgSparseVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `sparsevec(${this.dimensions})`;
  }
}
function Da(n, e) {
  const { name: t, config: r } = fe(n, e);
  return new Ra(t, r);
}
class $a extends te {
  static [I] = "PgVectorBuilder";
  constructor(e, t) {
    super(e, "array", "PgVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new Qa(
      e,
      this.config
    );
  }
}
class Qa extends Y {
  static [I] = "PgVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `vector(${this.dimensions})`;
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    return e.slice(1, -1).split(",").map((t) => Number.parseFloat(t));
  }
}
function ka(n, e) {
  const { name: t, config: r } = fe(n, e);
  return new $a(t, r);
}
function qa() {
  return {
    bigint: Ji,
    bigserial: to,
    boolean: so,
    char: ao,
    cidr: co,
    customType: po,
    date: Yn,
    doublePrecision: bo,
    inet: Po,
    integer: De,
    interval: Ao,
    json: Bo,
    jsonb: Io,
    line: Do,
    macaddr: ko,
    macaddr8: jo,
    numeric: Ho,
    point: Zo,
    geometry: ia,
    real: ua,
    serial: ha,
    smallint: pa,
    smallserial: ya,
    text: va,
    time: Pa,
    timestamp: Et,
    uuid: os,
    varchar: ot,
    bit: Na,
    halfvec: Oa,
    sparsevec: Da,
    vector: ka
  };
}
const ur = Symbol.for("drizzle:PgInlineForeignKeys"), Ur = Symbol.for("drizzle:EnableRLS");
class ve extends U {
  static [I] = "PgTable";
  /** @internal */
  static Symbol = Object.assign({}, U.Symbol, {
    InlineForeignKeys: ur,
    EnableRLS: Ur
  });
  /**@internal */
  [ur] = [];
  /** @internal */
  [Ur] = !1;
  /** @internal */
  [U.Symbol.ExtraConfigBuilder] = void 0;
  /** @internal */
  [U.Symbol.ExtraConfigColumns] = {};
}
function Fa(n, e, t, r, s = n) {
  const i = new ve(n, r, s), u = typeof e == "function" ? e(qa()) : e, a = Object.fromEntries(
    Object.entries(u).map(([f, b]) => {
      const m = b;
      m.setName(f);
      const v = m.build(i);
      return i[ur].push(...m.buildForeignKeys(v, i)), [f, v];
    })
  ), d = Object.fromEntries(
    Object.entries(u).map(([f, b]) => {
      const m = b;
      m.setName(f);
      const v = m.buildExtraConfigColumn(i);
      return [f, v];
    })
  ), y = Object.assign(i, a);
  return y[U.Symbol.Columns] = a, y[U.Symbol.ExtraConfigColumns] = d, t && (y[ve.Symbol.ExtraConfigBuilder] = t), Object.assign(y, {
    enableRLS: () => (y[ve.Symbol.EnableRLS] = !0, y)
  });
}
const ht = (n, e, t) => Fa(n, e, t, void 0);
class ja {
  static [I] = "PgPrimaryKeyBuilder";
  /** @internal */
  columns;
  /** @internal */
  name;
  constructor(e, t) {
    this.columns = e, this.name = t;
  }
  /** @internal */
  build(e) {
    return new Ua(e, this.columns, this.name);
  }
}
class Ua {
  constructor(e, t, r) {
    this.table = e, this.columns = t, this.name = r;
  }
  static [I] = "PgPrimaryKey";
  columns;
  name;
  getName() {
    return this.name ?? `${this.table[ve.Symbol.Name]}_${this.columns.map((e) => e.name).join("_")}_pk`;
  }
}
function me(n, e) {
  return Mi(e) && !zn(n) && !Q(n, Le) && !Q(n, Ke) && !Q(n, ce) && !Q(n, U) && !Q(n, Fe) ? new Le(n, e) : n;
}
const He = (n, e) => A`${n} = ${me(e, n)}`, za = (n, e) => A`${n} <> ${me(e, n)}`;
function xt(...n) {
  const e = n.filter(
    (t) => t !== void 0
  );
  if (e.length !== 0)
    return e.length === 1 ? new z(e) : new z([
      new pe("("),
      A.join(e, new pe(" and ")),
      new pe(")")
    ]);
}
function Va(...n) {
  const e = n.filter(
    (t) => t !== void 0
  );
  if (e.length !== 0)
    return e.length === 1 ? new z(e) : new z([
      new pe("("),
      A.join(e, new pe(" or ")),
      new pe(")")
    ]);
}
function Wa(n) {
  return A`not ${n}`;
}
const Ka = (n, e) => A`${n} > ${me(e, n)}`, Ha = (n, e) => A`${n} >= ${me(e, n)}`, Ga = (n, e) => A`${n} < ${me(e, n)}`, Ja = (n, e) => A`${n} <= ${me(e, n)}`;
function Ya(n, e) {
  return Array.isArray(e) ? e.length === 0 ? A`false` : A`${n} in ${e.map((t) => me(t, n))}` : A`${n} in ${me(e, n)}`;
}
function Xa(n, e) {
  return Array.isArray(e) ? e.length === 0 ? A`true` : A`${n} not in ${e.map((t) => me(t, n))}` : A`${n} not in ${me(e, n)}`;
}
function Za(n) {
  return A`${n} is null`;
}
function eu(n) {
  return A`${n} is not null`;
}
function tu(n) {
  return A`exists ${n}`;
}
function ru(n) {
  return A`not exists ${n}`;
}
function nu(n, e, t) {
  return A`${n} between ${me(e, n)} and ${me(
    t,
    n
  )}`;
}
function su(n, e, t) {
  return A`${n} not between ${me(
    e,
    n
  )} and ${me(t, n)}`;
}
function iu(n, e) {
  return A`${n} like ${e}`;
}
function ou(n, e) {
  return A`${n} not like ${e}`;
}
function au(n, e) {
  return A`${n} ilike ${e}`;
}
function uu(n, e) {
  return A`${n} not ilike ${e}`;
}
function lu(n) {
  return A`${n} asc`;
}
function as(n) {
  return A`${n} desc`;
}
class us {
  constructor(e, t, r) {
    this.sourceTable = e, this.referencedTable = t, this.relationName = r, this.referencedTableName = t[U.Symbol.Name];
  }
  static [I] = "Relation";
  referencedTableName;
  fieldName;
}
class cu {
  constructor(e, t) {
    this.table = e, this.config = t;
  }
  static [I] = "Relations";
}
class $e extends us {
  constructor(e, t, r, s) {
    super(e, t, r?.relationName), this.config = r, this.isNullable = s;
  }
  static [I] = "One";
  withFieldName(e) {
    const t = new $e(
      this.sourceTable,
      this.referencedTable,
      this.config,
      this.isNullable
    );
    return t.fieldName = e, t;
  }
}
class qt extends us {
  constructor(e, t, r) {
    super(e, t, r?.relationName), this.config = r;
  }
  static [I] = "Many";
  withFieldName(e) {
    const t = new qt(
      this.sourceTable,
      this.referencedTable,
      this.config
    );
    return t.fieldName = e, t;
  }
}
function hu() {
  return {
    and: xt,
    between: nu,
    eq: He,
    exists: tu,
    gt: Ka,
    gte: Ha,
    ilike: au,
    inArray: Ya,
    isNull: Za,
    isNotNull: eu,
    like: iu,
    lt: Ga,
    lte: Ja,
    ne: za,
    not: Wa,
    notBetween: su,
    notExists: ru,
    notLike: ou,
    notIlike: uu,
    notInArray: Xa,
    or: Va,
    sql: A
  };
}
function fu() {
  return {
    sql: A,
    asc: lu,
    desc: as
  };
}
function du(n, e) {
  Object.keys(n).length === 1 && "default" in n && !Q(n.default, U) && (n = n.default);
  const t = {}, r = {}, s = {};
  for (const [i, u] of Object.entries(n))
    if (Q(u, U)) {
      const a = it(u), d = r[a];
      t[a] = i, s[i] = {
        tsName: i,
        dbName: u[U.Symbol.Name],
        schema: u[U.Symbol.Schema],
        columns: u[U.Symbol.Columns],
        relations: d?.relations ?? {},
        primaryKey: d?.primaryKey ?? []
      };
      for (const f of Object.values(
        u[U.Symbol.Columns]
      ))
        f.primary && s[i].primaryKey.push(f);
      const y = u[U.Symbol.ExtraConfigBuilder]?.(u[U.Symbol.ExtraConfigColumns]);
      if (y)
        for (const f of Object.values(y))
          Q(f, ja) && s[i].primaryKey.push(...f.columns);
    } else if (Q(u, cu)) {
      const a = it(u.table), d = t[a], y = u.config(
        e(u.table)
      );
      let f;
      for (const [b, m] of Object.entries(y))
        if (d) {
          const v = s[d];
          v.relations[b] = m;
        } else
          a in r || (r[a] = {
            relations: {},
            primaryKey: f
          }), r[a].relations[b] = m;
    }
  return { tables: s, tableNamesMap: t };
}
function pu(n) {
  return function(t, r) {
    return new $e(
      n,
      t,
      r,
      r?.fields.reduce((s, i) => s && i.notNull, !0) ?? !1
    );
  };
}
function gu(n) {
  return function(t, r) {
    return new qt(n, t, r);
  };
}
function mu(n, e, t) {
  if (Q(t, $e) && t.config)
    return {
      fields: t.config.fields,
      references: t.config.references
    };
  const r = e[it(t.referencedTable)];
  if (!r)
    throw new Error(
      `Table "${t.referencedTable[U.Symbol.Name]}" not found in schema`
    );
  const s = n[r];
  if (!s)
    throw new Error(`Table "${r}" not found in schema`);
  const i = t.sourceTable, u = e[it(i)];
  if (!u)
    throw new Error(
      `Table "${i[U.Symbol.Name]}" not found in schema`
    );
  const a = [];
  for (const d of Object.values(
    s.relations
  ))
    (t.relationName && t !== d && d.relationName === t.relationName || !t.relationName && d.referencedTable === t.sourceTable) && a.push(d);
  if (a.length > 1)
    throw t.relationName ? new Error(
      `There are multiple relations with name "${t.relationName}" in table "${r}"`
    ) : new Error(
      `There are multiple relations between "${r}" and "${t.sourceTable[U.Symbol.Name]}". Please specify relation name`
    );
  if (a[0] && Q(a[0], $e) && a[0].config)
    return {
      fields: a[0].config.references,
      references: a[0].config.fields
    };
  throw new Error(
    `There is not enough information to infer relation "${u}.${t.fieldName}"`
  );
}
function yu(n) {
  return {
    one: pu(n),
    many: gu(n)
  };
}
function lr(n, e, t, r, s = (i) => i) {
  const i = {};
  for (const [
    u,
    a
  ] of r.entries())
    if (a.isJson) {
      const d = e.relations[a.tsKey], y = t[u], f = typeof y == "string" ? JSON.parse(y) : y;
      i[a.tsKey] = Q(d, $e) ? f && lr(
        n,
        n[a.relationTableTsKey],
        f,
        a.selection,
        s
      ) : f.map(
        (b) => lr(
          n,
          n[a.relationTableTsKey],
          b,
          a.selection,
          s
        )
      );
    } else {
      const d = s(t[u]), y = a.field;
      let f;
      Q(y, ce) ? f = y : Q(y, z) ? f = y.decoder : f = y.sql.decoder, i[a.tsKey] = d === null ? null : f.mapFromDriverValue(d);
    }
  return i;
}
class ls extends Fe {
  static [I] = "PgViewBase";
}
class _t {
  static [I] = "PgDialect";
  /** @internal */
  casing;
  constructor(e) {
    this.casing = new zi(e?.casing);
  }
  async migrate(e, t, r) {
    const s = typeof r == "string" ? "__drizzle_migrations" : r.migrationsTable ?? "__drizzle_migrations", i = typeof r == "string" ? "drizzle" : r.migrationsSchema ?? "drizzle", u = A`
			CREATE TABLE IF NOT EXISTS ${A.identifier(i)}.${A.identifier(s)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
    await t.execute(A`CREATE SCHEMA IF NOT EXISTS ${A.identifier(i)}`), await t.execute(u);
    const d = (await t.all(
      A`select id, hash, created_at from ${A.identifier(i)}.${A.identifier(s)} order by created_at desc limit 1`
    ))[0];
    await t.transaction(async (y) => {
      for await (const f of e)
        if (!d || Number(d.created_at) < f.folderMillis) {
          for (const b of f.sql)
            await y.execute(A.raw(b));
          await y.execute(
            A`insert into ${A.identifier(i)}.${A.identifier(s)} ("hash", "created_at") values(${f.hash}, ${f.folderMillis})`
          );
        }
    });
  }
  escapeName(e) {
    return `"${e}"`;
  }
  escapeParam(e) {
    return `$${e + 1}`;
  }
  escapeString(e) {
    return `'${e.replace(/'/g, "''")}'`;
  }
  buildWithCTE(e) {
    if (!e?.length)
      return;
    const t = [A`with `];
    for (const [r, s] of e.entries())
      t.push(A`${A.identifier(s._.alias)} as (${s._.sql})`), r < e.length - 1 && t.push(A`, `);
    return t.push(A` `), A.join(t);
  }
  buildDeleteQuery({ table: e, where: t, returning: r, withList: s }) {
    const i = this.buildWithCTE(s), u = r ? A` returning ${this.buildSelection(r, { isSingleTable: !0 })}` : void 0, a = t ? A` where ${t}` : void 0;
    return A`${i}delete from ${e}${a}${u}`;
  }
  buildUpdateSet(e, t) {
    const r = e[U.Symbol.Columns], s = Object.keys(r).filter(
      (u) => t[u] !== void 0 || r[u]?.onUpdateFn !== void 0
    ), i = s.length;
    return A.join(s.flatMap((u, a) => {
      const d = r[u], y = t[u] ?? A.param(d.onUpdateFn(), d), f = A`${A.identifier(this.casing.getColumnCasing(d))} = ${y}`;
      return a < i - 1 ? [f, A.raw(", ")] : [f];
    }));
  }
  buildUpdateQuery({ table: e, set: t, where: r, returning: s, withList: i, from: u, joins: a }) {
    const d = this.buildWithCTE(i), y = e[ve.Symbol.Name], f = e[ve.Symbol.Schema], b = e[ve.Symbol.OriginalName], m = y === b ? void 0 : y, v = A`${f ? A`${A.identifier(f)}.` : void 0}${A.identifier(b)}${m && A` ${A.identifier(m)}`}`, c = this.buildUpdateSet(e, t), h = u && A.join([A.raw(" from "), this.buildFromTable(u)]), w = this.buildJoins(a), S = s ? A` returning ${this.buildSelection(s, { isSingleTable: !u })}` : void 0, _ = r ? A` where ${r}` : void 0;
    return A`${d}update ${v} set ${c}${h}${w}${_}${S}`;
  }
  /**
   * Builds selection SQL with provided fields/expressions
   *
   * Examples:
   *
   * `select <selection> from`
   *
   * `insert ... returning <selection>`
   *
   * If `isSingleTable` is true, then columns won't be prefixed with table name
   */
  buildSelection(e, { isSingleTable: t = !1 } = {}) {
    const r = e.length, s = e.flatMap(({ field: i }, u) => {
      const a = [];
      if (Q(i, z.Aliased) && i.isSelectionField)
        a.push(A.identifier(i.fieldAlias));
      else if (Q(i, z.Aliased) || Q(i, z)) {
        const d = Q(i, z.Aliased) ? i.sql : i;
        t ? a.push(
          new z(
            d.queryChunks.map((y) => Q(y, Y) ? A.identifier(this.casing.getColumnCasing(y)) : y)
          )
        ) : a.push(d), Q(i, z.Aliased) && a.push(A` as ${A.identifier(i.fieldAlias)}`);
      } else
        Q(i, ce) && (t ? a.push(A.identifier(this.casing.getColumnCasing(i))) : a.push(i));
      return u < r - 1 && a.push(A`, `), a;
    });
    return A.join(s);
  }
  buildJoins(e) {
    if (!e || e.length === 0)
      return;
    const t = [];
    for (const [r, s] of e.entries()) {
      r === 0 && t.push(A` `);
      const i = s.table, u = s.lateral ? A` lateral` : void 0, a = s.on ? A` on ${s.on}` : void 0;
      if (Q(i, ve)) {
        const d = i[ve.Symbol.Name], y = i[ve.Symbol.Schema], f = i[ve.Symbol.OriginalName], b = d === f ? void 0 : s.alias;
        t.push(
          A`${A.raw(s.joinType)} join${u} ${y ? A`${A.identifier(y)}.` : void 0}${A.identifier(f)}${b && A` ${A.identifier(b)}`}${a}`
        );
      } else if (Q(i, Fe)) {
        const d = i[ue].name, y = i[ue].schema, f = i[ue].originalName, b = d === f ? void 0 : s.alias;
        t.push(
          A`${A.raw(s.joinType)} join${u} ${y ? A`${A.identifier(y)}.` : void 0}${A.identifier(f)}${b && A` ${A.identifier(b)}`}${a}`
        );
      } else
        t.push(
          A`${A.raw(s.joinType)} join${u} ${i}${a}`
        );
      r < e.length - 1 && t.push(A` `);
    }
    return A.join(t);
  }
  buildFromTable(e) {
    if (Q(e, U) && e[U.Symbol.IsAlias]) {
      let t = A`${A.identifier(e[U.Symbol.OriginalName])}`;
      return e[U.Symbol.Schema] && (t = A`${A.identifier(e[U.Symbol.Schema])}.${t}`), A`${t} ${A.identifier(e[U.Symbol.Name])}`;
    }
    return e;
  }
  buildSelectQuery({
    withList: e,
    fields: t,
    fieldsFlat: r,
    where: s,
    having: i,
    table: u,
    joins: a,
    orderBy: d,
    groupBy: y,
    limit: f,
    offset: b,
    lockingClause: m,
    distinct: v,
    setOperators: c
  }) {
    const h = r ?? Me(t);
    for (const O of h)
      if (Q(O.field, ce) && Ne(O.field.table) !== (Q(u, _e) ? u._.alias : Q(u, ls) ? u[ue].name : Q(u, z) ? void 0 : Ne(u)) && !((q) => a?.some(
        ({ alias: W }) => W === (q[U.Symbol.IsAlias] ? Ne(q) : q[U.Symbol.BaseName])
      ))(O.field.table)) {
        const q = Ne(O.field.table);
        throw new Error(
          `Your "${O.path.join("->")}" field references a column "${q}"."${O.field.name}", but the table "${q}" is not part of the query! Did you forget to join it?`
        );
      }
    const w = !a || a.length === 0, S = this.buildWithCTE(e);
    let _;
    v && (_ = v === !0 ? A` distinct` : A` distinct on (${A.join(v.on, A`, `)})`);
    const T = this.buildSelection(h, { isSingleTable: w }), L = this.buildFromTable(u), M = this.buildJoins(a), P = s ? A` where ${s}` : void 0, B = i ? A` having ${i}` : void 0;
    let x;
    d && d.length > 0 && (x = A` order by ${A.join(d, A`, `)}`);
    let E;
    y && y.length > 0 && (E = A` group by ${A.join(y, A`, `)}`);
    const D = typeof f == "object" || typeof f == "number" && f >= 0 ? A` limit ${f}` : void 0, R = b ? A` offset ${b}` : void 0, F = A.empty();
    if (m) {
      const O = A` for ${A.raw(m.strength)}`;
      m.config.of && O.append(
        A` of ${A.join(
          Array.isArray(m.config.of) ? m.config.of : [m.config.of],
          A`, `
        )}`
      ), m.config.noWait ? O.append(A` nowait`) : m.config.skipLocked && O.append(A` skip locked`), F.append(O);
    }
    const j = A`${S}select${_} ${T} from ${L}${M}${P}${E}${B}${x}${D}${R}${F}`;
    return c.length > 0 ? this.buildSetOperations(j, c) : j;
  }
  buildSetOperations(e, t) {
    const [r, ...s] = t;
    if (!r)
      throw new Error("Cannot pass undefined values to any set operator");
    return s.length === 0 ? this.buildSetOperationQuery({ leftSelect: e, setOperator: r }) : this.buildSetOperations(
      this.buildSetOperationQuery({ leftSelect: e, setOperator: r }),
      s
    );
  }
  buildSetOperationQuery({
    leftSelect: e,
    setOperator: { type: t, isAll: r, rightSelect: s, limit: i, orderBy: u, offset: a }
  }) {
    const d = A`(${e.getSQL()}) `, y = A`(${s.getSQL()})`;
    let f;
    if (u && u.length > 0) {
      const c = [];
      for (const h of u)
        if (Q(h, Y))
          c.push(A.identifier(h.name));
        else if (Q(h, z)) {
          for (let w = 0; w < h.queryChunks.length; w++) {
            const S = h.queryChunks[w];
            Q(S, Y) && (h.queryChunks[w] = A.identifier(S.name));
          }
          c.push(A`${h}`);
        } else
          c.push(A`${h}`);
      f = A` order by ${A.join(c, A`, `)} `;
    }
    const b = typeof i == "object" || typeof i == "number" && i >= 0 ? A` limit ${i}` : void 0, m = A.raw(`${t} ${r ? "all " : ""}`), v = a ? A` offset ${a}` : void 0;
    return A`${d}${m}${y}${f}${b}${v}`;
  }
  buildInsertQuery({ table: e, values: t, onConflict: r, returning: s, withList: i, select: u, overridingSystemValue_: a }) {
    const d = [], y = e[U.Symbol.Columns], f = Object.entries(y).filter(([S, _]) => !_.shouldDisableInsert()), b = f.map(
      ([, S]) => A.identifier(this.casing.getColumnCasing(S))
    );
    if (u) {
      const S = t;
      Q(S, z) ? d.push(S) : d.push(S.getSQL());
    } else {
      const S = t;
      d.push(A.raw("values "));
      for (const [_, T] of S.entries()) {
        const L = [];
        for (const [M, P] of f) {
          const B = T[M];
          if (B === void 0 || Q(B, Le) && B.value === void 0)
            if (P.defaultFn !== void 0) {
              const x = P.defaultFn(), E = Q(x, z) ? x : A.param(x, P);
              L.push(E);
            } else if (!P.default && P.onUpdateFn !== void 0) {
              const x = P.onUpdateFn(), E = Q(x, z) ? x : A.param(x, P);
              L.push(E);
            } else
              L.push(A`default`);
          else
            L.push(B);
        }
        d.push(L), _ < S.length - 1 && d.push(A`, `);
      }
    }
    const m = this.buildWithCTE(i), v = A.join(d), c = s ? A` returning ${this.buildSelection(s, { isSingleTable: !0 })}` : void 0, h = r ? A` on conflict ${r}` : void 0, w = a === !0 ? A`overriding system value ` : void 0;
    return A`${m}insert into ${e} ${b} ${w}${v}${h}${c}`;
  }
  buildRefreshMaterializedViewQuery({ view: e, concurrently: t, withNoData: r }) {
    const s = t ? A` concurrently` : void 0, i = r ? A` with no data` : void 0;
    return A`refresh materialized view${s} ${e}${i}`;
  }
  prepareTyping(e) {
    return Q(e, Zn) || Q(e, Xn) ? "json" : Q(e, es) ? "decimal" : Q(e, rs) ? "time" : Q(e, ns) || Q(e, ss) ? "timestamp" : Q(e, Gn) || Q(e, Jn) ? "date" : Q(e, is) ? "uuid" : "none";
  }
  sqlToQuery(e, t) {
    return e.toQuery({
      casing: this.casing,
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      prepareTyping: this.prepareTyping,
      invokeSource: t
    });
  }
  // buildRelationalQueryWithPK({
  // 	fullSchema,
  // 	schema,
  // 	tableNamesMap,
  // 	table,
  // 	tableConfig,
  // 	queryConfig: config,
  // 	tableAlias,
  // 	isRoot = false,
  // 	joinOn,
  // }: {
  // 	fullSchema: Record<string, unknown>;
  // 	schema: TablesRelationalConfig;
  // 	tableNamesMap: Record<string, string>;
  // 	table: PgTable;
  // 	tableConfig: TableRelationalConfig;
  // 	queryConfig: true | DBQueryConfig<'many', true>;
  // 	tableAlias: string;
  // 	isRoot?: boolean;
  // 	joinOn?: SQL;
  // }): BuildRelationalQueryResult<PgTable, PgColumn> {
  // 	// For { "<relation>": true }, return a table with selection of all columns
  // 	if (config === true) {
  // 		const selectionEntries = Object.entries(tableConfig.columns);
  // 		const selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = selectionEntries.map((
  // 			[key, value],
  // 		) => ({
  // 			dbKey: value.name,
  // 			tsKey: key,
  // 			field: value as PgColumn,
  // 			relationTableTsKey: undefined,
  // 			isJson: false,
  // 			selection: [],
  // 		}));
  // 		return {
  // 			tableTsKey: tableConfig.tsName,
  // 			sql: table,
  // 			selection,
  // 		};
  // 	}
  // 	// let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
  // 	// let selectionForBuild = selection;
  // 	const aliasedColumns = Object.fromEntries(
  // 		Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]),
  // 	);
  // 	const aliasedRelations = Object.fromEntries(
  // 		Object.entries(tableConfig.relations).map(([key, value]) => [key, aliasedRelation(value, tableAlias)]),
  // 	);
  // 	const aliasedFields = Object.assign({}, aliasedColumns, aliasedRelations);
  // 	let where, hasUserDefinedWhere;
  // 	if (config.where) {
  // 		const whereSql = typeof config.where === 'function' ? config.where(aliasedFields, operators) : config.where;
  // 		where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
  // 		hasUserDefinedWhere = !!where;
  // 	}
  // 	where = and(joinOn, where);
  // 	// const fieldsSelection: { tsKey: string; value: PgColumn | SQL.Aliased; isExtra?: boolean }[] = [];
  // 	let joins: Join[] = [];
  // 	let selectedColumns: string[] = [];
  // 	// Figure out which columns to select
  // 	if (config.columns) {
  // 		let isIncludeMode = false;
  // 		for (const [field, value] of Object.entries(config.columns)) {
  // 			if (value === undefined) {
  // 				continue;
  // 			}
  // 			if (field in tableConfig.columns) {
  // 				if (!isIncludeMode && value === true) {
  // 					isIncludeMode = true;
  // 				}
  // 				selectedColumns.push(field);
  // 			}
  // 		}
  // 		if (selectedColumns.length > 0) {
  // 			selectedColumns = isIncludeMode
  // 				? selectedColumns.filter((c) => config.columns?.[c] === true)
  // 				: Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
  // 		}
  // 	} else {
  // 		// Select all columns if selection is not specified
  // 		selectedColumns = Object.keys(tableConfig.columns);
  // 	}
  // 	// for (const field of selectedColumns) {
  // 	// 	const column = tableConfig.columns[field]! as PgColumn;
  // 	// 	fieldsSelection.push({ tsKey: field, value: column });
  // 	// }
  // 	let initiallySelectedRelations: {
  // 		tsKey: string;
  // 		queryConfig: true | DBQueryConfig<'many', false>;
  // 		relation: Relation;
  // 	}[] = [];
  // 	// let selectedRelations: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
  // 	// Figure out which relations to select
  // 	if (config.with) {
  // 		initiallySelectedRelations = Object.entries(config.with)
  // 			.filter((entry): entry is [typeof entry[0], NonNullable<typeof entry[1]>] => !!entry[1])
  // 			.map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey]! }));
  // 	}
  // 	const manyRelations = initiallySelectedRelations.filter((r) =>
  // 		is(r.relation, Many)
  // 		&& (schema[tableNamesMap[r.relation.referencedTable[Table.Symbol.Name]]!]?.primaryKey.length ?? 0) > 0
  // 	);
  // 	// If this is the last Many relation (or there are no Many relations), we are on the innermost subquery level
  // 	const isInnermostQuery = manyRelations.length < 2;
  // 	const selectedExtras: {
  // 		tsKey: string;
  // 		value: SQL.Aliased;
  // 	}[] = [];
  // 	// Figure out which extras to select
  // 	if (isInnermostQuery && config.extras) {
  // 		const extras = typeof config.extras === 'function'
  // 			? config.extras(aliasedFields, { sql })
  // 			: config.extras;
  // 		for (const [tsKey, value] of Object.entries(extras)) {
  // 			selectedExtras.push({
  // 				tsKey,
  // 				value: mapColumnsInAliasedSQLToAlias(value, tableAlias),
  // 			});
  // 		}
  // 	}
  // 	// Transform `fieldsSelection` into `selection`
  // 	// `fieldsSelection` shouldn't be used after this point
  // 	// for (const { tsKey, value, isExtra } of fieldsSelection) {
  // 	// 	selection.push({
  // 	// 		dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey]!.name,
  // 	// 		tsKey,
  // 	// 		field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
  // 	// 		relationTableTsKey: undefined,
  // 	// 		isJson: false,
  // 	// 		isExtra,
  // 	// 		selection: [],
  // 	// 	});
  // 	// }
  // 	let orderByOrig = typeof config.orderBy === 'function'
  // 		? config.orderBy(aliasedFields, orderByOperators)
  // 		: config.orderBy ?? [];
  // 	if (!Array.isArray(orderByOrig)) {
  // 		orderByOrig = [orderByOrig];
  // 	}
  // 	const orderBy = orderByOrig.map((orderByValue) => {
  // 		if (is(orderByValue, Column)) {
  // 			return aliasedTableColumn(orderByValue, tableAlias) as PgColumn;
  // 		}
  // 		return mapColumnsInSQLToAlias(orderByValue, tableAlias);
  // 	});
  // 	const limit = isInnermostQuery ? config.limit : undefined;
  // 	const offset = isInnermostQuery ? config.offset : undefined;
  // 	// For non-root queries without additional config except columns, return a table with selection
  // 	if (
  // 		!isRoot
  // 		&& initiallySelectedRelations.length === 0
  // 		&& selectedExtras.length === 0
  // 		&& !where
  // 		&& orderBy.length === 0
  // 		&& limit === undefined
  // 		&& offset === undefined
  // 	) {
  // 		return {
  // 			tableTsKey: tableConfig.tsName,
  // 			sql: table,
  // 			selection: selectedColumns.map((key) => ({
  // 				dbKey: tableConfig.columns[key]!.name,
  // 				tsKey: key,
  // 				field: tableConfig.columns[key] as PgColumn,
  // 				relationTableTsKey: undefined,
  // 				isJson: false,
  // 				selection: [],
  // 			})),
  // 		};
  // 	}
  // 	const selectedRelationsWithoutPK:
  // 	// Process all relations without primary keys, because they need to be joined differently and will all be on the same query level
  // 	for (
  // 		const {
  // 			tsKey: selectedRelationTsKey,
  // 			queryConfig: selectedRelationConfigValue,
  // 			relation,
  // 		} of initiallySelectedRelations
  // 	) {
  // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
  // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
  // 		const relationTableTsName = tableNamesMap[relationTableName]!;
  // 		const relationTable = schema[relationTableTsName]!;
  // 		if (relationTable.primaryKey.length > 0) {
  // 			continue;
  // 		}
  // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
  // 		const joinOn = and(
  // 			...normalizedRelation.fields.map((field, i) =>
  // 				eq(
  // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
  // 					aliasedTableColumn(field, tableAlias),
  // 				)
  // 			),
  // 		);
  // 		const builtRelation = this.buildRelationalQueryWithoutPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table: fullSchema[relationTableTsName] as PgTable,
  // 			tableConfig: schema[relationTableTsName]!,
  // 			queryConfig: selectedRelationConfigValue,
  // 			tableAlias: relationTableAlias,
  // 			joinOn,
  // 			nestedQueryRelation: relation,
  // 		});
  // 		const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier('data')}`.as(selectedRelationTsKey);
  // 		joins.push({
  // 			on: sql`true`,
  // 			table: new Subquery(builtRelation.sql as SQL, {}, relationTableAlias),
  // 			alias: relationTableAlias,
  // 			joinType: 'left',
  // 			lateral: true,
  // 		});
  // 		selectedRelations.push({
  // 			dbKey: selectedRelationTsKey,
  // 			tsKey: selectedRelationTsKey,
  // 			field,
  // 			relationTableTsKey: relationTableTsName,
  // 			isJson: true,
  // 			selection: builtRelation.selection,
  // 		});
  // 	}
  // 	const oneRelations = initiallySelectedRelations.filter((r): r is typeof r & { relation: One } =>
  // 		is(r.relation, One)
  // 	);
  // 	// Process all One relations with PKs, because they can all be joined on the same level
  // 	for (
  // 		const {
  // 			tsKey: selectedRelationTsKey,
  // 			queryConfig: selectedRelationConfigValue,
  // 			relation,
  // 		} of oneRelations
  // 	) {
  // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
  // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
  // 		const relationTableTsName = tableNamesMap[relationTableName]!;
  // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
  // 		const relationTable = schema[relationTableTsName]!;
  // 		if (relationTable.primaryKey.length === 0) {
  // 			continue;
  // 		}
  // 		const joinOn = and(
  // 			...normalizedRelation.fields.map((field, i) =>
  // 				eq(
  // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
  // 					aliasedTableColumn(field, tableAlias),
  // 				)
  // 			),
  // 		);
  // 		const builtRelation = this.buildRelationalQueryWithPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table: fullSchema[relationTableTsName] as PgTable,
  // 			tableConfig: schema[relationTableTsName]!,
  // 			queryConfig: selectedRelationConfigValue,
  // 			tableAlias: relationTableAlias,
  // 			joinOn,
  // 		});
  // 		const field = sql`case when ${sql.identifier(relationTableAlias)} is null then null else json_build_array(${
  // 			sql.join(
  // 				builtRelation.selection.map(({ field }) =>
  // 					is(field, SQL.Aliased)
  // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
  // 						: is(field, Column)
  // 						? aliasedTableColumn(field, relationTableAlias)
  // 						: field
  // 				),
  // 				sql`, `,
  // 			)
  // 		}) end`.as(selectedRelationTsKey);
  // 		const isLateralJoin = is(builtRelation.sql, SQL);
  // 		joins.push({
  // 			on: isLateralJoin ? sql`true` : joinOn,
  // 			table: is(builtRelation.sql, SQL)
  // 				? new Subquery(builtRelation.sql, {}, relationTableAlias)
  // 				: aliasedTable(builtRelation.sql, relationTableAlias),
  // 			alias: relationTableAlias,
  // 			joinType: 'left',
  // 			lateral: is(builtRelation.sql, SQL),
  // 		});
  // 		selectedRelations.push({
  // 			dbKey: selectedRelationTsKey,
  // 			tsKey: selectedRelationTsKey,
  // 			field,
  // 			relationTableTsKey: relationTableTsName,
  // 			isJson: true,
  // 			selection: builtRelation.selection,
  // 		});
  // 	}
  // 	let distinct: PgSelectConfig['distinct'];
  // 	let tableFrom: PgTable | Subquery = table;
  // 	// Process first Many relation - each one requires a nested subquery
  // 	const manyRelation = manyRelations[0];
  // 	if (manyRelation) {
  // 		const {
  // 			tsKey: selectedRelationTsKey,
  // 			queryConfig: selectedRelationQueryConfig,
  // 			relation,
  // 		} = manyRelation;
  // 		distinct = {
  // 			on: tableConfig.primaryKey.map((c) => aliasedTableColumn(c as PgColumn, tableAlias)),
  // 		};
  // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
  // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
  // 		const relationTableTsName = tableNamesMap[relationTableName]!;
  // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
  // 		const joinOn = and(
  // 			...normalizedRelation.fields.map((field, i) =>
  // 				eq(
  // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
  // 					aliasedTableColumn(field, tableAlias),
  // 				)
  // 			),
  // 		);
  // 		const builtRelationJoin = this.buildRelationalQueryWithPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table: fullSchema[relationTableTsName] as PgTable,
  // 			tableConfig: schema[relationTableTsName]!,
  // 			queryConfig: selectedRelationQueryConfig,
  // 			tableAlias: relationTableAlias,
  // 			joinOn,
  // 		});
  // 		const builtRelationSelectionField = sql`case when ${
  // 			sql.identifier(relationTableAlias)
  // 		} is null then '[]' else json_agg(json_build_array(${
  // 			sql.join(
  // 				builtRelationJoin.selection.map(({ field }) =>
  // 					is(field, SQL.Aliased)
  // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
  // 						: is(field, Column)
  // 						? aliasedTableColumn(field, relationTableAlias)
  // 						: field
  // 				),
  // 				sql`, `,
  // 			)
  // 		})) over (partition by ${sql.join(distinct.on, sql`, `)}) end`.as(selectedRelationTsKey);
  // 		const isLateralJoin = is(builtRelationJoin.sql, SQL);
  // 		joins.push({
  // 			on: isLateralJoin ? sql`true` : joinOn,
  // 			table: isLateralJoin
  // 				? new Subquery(builtRelationJoin.sql as SQL, {}, relationTableAlias)
  // 				: aliasedTable(builtRelationJoin.sql as PgTable, relationTableAlias),
  // 			alias: relationTableAlias,
  // 			joinType: 'left',
  // 			lateral: isLateralJoin,
  // 		});
  // 		// Build the "from" subquery with the remaining Many relations
  // 		const builtTableFrom = this.buildRelationalQueryWithPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table,
  // 			tableConfig,
  // 			queryConfig: {
  // 				...config,
  // 				where: undefined,
  // 				orderBy: undefined,
  // 				limit: undefined,
  // 				offset: undefined,
  // 				with: manyRelations.slice(1).reduce<NonNullable<typeof config['with']>>(
  // 					(result, { tsKey, queryConfig: configValue }) => {
  // 						result[tsKey] = configValue;
  // 						return result;
  // 					},
  // 					{},
  // 				),
  // 			},
  // 			tableAlias,
  // 		});
  // 		selectedRelations.push({
  // 			dbKey: selectedRelationTsKey,
  // 			tsKey: selectedRelationTsKey,
  // 			field: builtRelationSelectionField,
  // 			relationTableTsKey: relationTableTsName,
  // 			isJson: true,
  // 			selection: builtRelationJoin.selection,
  // 		});
  // 		// selection = builtTableFrom.selection.map((item) =>
  // 		// 	is(item.field, SQL.Aliased)
  // 		// 		? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
  // 		// 		: item
  // 		// );
  // 		// selectionForBuild = [{
  // 		// 	dbKey: '*',
  // 		// 	tsKey: '*',
  // 		// 	field: sql`${sql.identifier(tableAlias)}.*`,
  // 		// 	selection: [],
  // 		// 	isJson: false,
  // 		// 	relationTableTsKey: undefined,
  // 		// }];
  // 		// const newSelectionItem: (typeof selection)[number] = {
  // 		// 	dbKey: selectedRelationTsKey,
  // 		// 	tsKey: selectedRelationTsKey,
  // 		// 	field,
  // 		// 	relationTableTsKey: relationTableTsName,
  // 		// 	isJson: true,
  // 		// 	selection: builtRelationJoin.selection,
  // 		// };
  // 		// selection.push(newSelectionItem);
  // 		// selectionForBuild.push(newSelectionItem);
  // 		tableFrom = is(builtTableFrom.sql, PgTable)
  // 			? builtTableFrom.sql
  // 			: new Subquery(builtTableFrom.sql, {}, tableAlias);
  // 	}
  // 	if (selectedColumns.length === 0 && selectedRelations.length === 0 && selectedExtras.length === 0) {
  // 		throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`);
  // 	}
  // 	let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'];
  // 	function prepareSelectedColumns() {
  // 		return selectedColumns.map((key) => ({
  // 			dbKey: tableConfig.columns[key]!.name,
  // 			tsKey: key,
  // 			field: tableConfig.columns[key] as PgColumn,
  // 			relationTableTsKey: undefined,
  // 			isJson: false,
  // 			selection: [],
  // 		}));
  // 	}
  // 	function prepareSelectedExtras() {
  // 		return selectedExtras.map((item) => ({
  // 			dbKey: item.value.fieldAlias,
  // 			tsKey: item.tsKey,
  // 			field: item.value,
  // 			relationTableTsKey: undefined,
  // 			isJson: false,
  // 			selection: [],
  // 		}));
  // 	}
  // 	if (isRoot) {
  // 		selection = [
  // 			...prepareSelectedColumns(),
  // 			...prepareSelectedExtras(),
  // 		];
  // 	}
  // 	if (hasUserDefinedWhere || orderBy.length > 0) {
  // 		tableFrom = new Subquery(
  // 			this.buildSelectQuery({
  // 				table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
  // 				fields: {},
  // 				fieldsFlat: selectionForBuild.map(({ field }) => ({
  // 					path: [],
  // 					field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
  // 				})),
  // 				joins,
  // 				distinct,
  // 			}),
  // 			{},
  // 			tableAlias,
  // 		);
  // 		selectionForBuild = selection.map((item) =>
  // 			is(item.field, SQL.Aliased)
  // 				? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
  // 				: item
  // 		);
  // 		joins = [];
  // 		distinct = undefined;
  // 	}
  // 	const result = this.buildSelectQuery({
  // 		table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
  // 		fields: {},
  // 		fieldsFlat: selectionForBuild.map(({ field }) => ({
  // 			path: [],
  // 			field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
  // 		})),
  // 		where,
  // 		limit,
  // 		offset,
  // 		joins,
  // 		orderBy,
  // 		distinct,
  // 	});
  // 	return {
  // 		tableTsKey: tableConfig.tsName,
  // 		sql: result,
  // 		selection,
  // 	};
  // }
  buildRelationalQueryWithoutPK({
    fullSchema: e,
    schema: t,
    tableNamesMap: r,
    table: s,
    tableConfig: i,
    queryConfig: u,
    tableAlias: a,
    nestedQueryRelation: d,
    joinOn: y
  }) {
    let f = [], b, m, v = [], c;
    const h = [];
    if (u === !0)
      f = Object.entries(i.columns).map(([_, T]) => ({
        dbKey: T.name,
        tsKey: _,
        field: Be(T, a),
        relationTableTsKey: void 0,
        isJson: !1,
        selection: []
      }));
    else {
      const S = Object.fromEntries(
        Object.entries(i.columns).map(([B, x]) => [B, Be(x, a)])
      );
      if (u.where) {
        const B = typeof u.where == "function" ? u.where(S, hu()) : u.where;
        c = B && At(B, a);
      }
      const _ = [];
      let T = [];
      if (u.columns) {
        let B = !1;
        for (const [x, E] of Object.entries(u.columns))
          E !== void 0 && x in i.columns && (!B && E === !0 && (B = !0), T.push(x));
        T.length > 0 && (T = B ? T.filter((x) => u.columns?.[x] === !0) : Object.keys(i.columns).filter((x) => !T.includes(x)));
      } else
        T = Object.keys(i.columns);
      for (const B of T) {
        const x = i.columns[B];
        _.push({ tsKey: B, value: x });
      }
      let L = [];
      u.with && (L = Object.entries(u.with).filter((B) => !!B[1]).map(([B, x]) => ({ tsKey: B, queryConfig: x, relation: i.relations[B] })));
      let M;
      if (u.extras) {
        M = typeof u.extras == "function" ? u.extras(S, { sql: A }) : u.extras;
        for (const [B, x] of Object.entries(M))
          _.push({
            tsKey: B,
            value: Kn(x, a)
          });
      }
      for (const { tsKey: B, value: x } of _)
        f.push({
          dbKey: Q(x, z.Aliased) ? x.fieldAlias : i.columns[B].name,
          tsKey: B,
          field: Q(x, ce) ? Be(x, a) : x,
          relationTableTsKey: void 0,
          isJson: !1,
          selection: []
        });
      let P = typeof u.orderBy == "function" ? u.orderBy(S, fu()) : u.orderBy ?? [];
      Array.isArray(P) || (P = [P]), v = P.map((B) => Q(B, ce) ? Be(B, a) : At(B, a)), b = u.limit, m = u.offset;
      for (const {
        tsKey: B,
        queryConfig: x,
        relation: E
      } of L) {
        const D = mu(t, r, E), R = it(E.referencedTable), F = r[R], j = `${a}_${B}`, O = xt(
          ...D.fields.map(
            (H, ee) => He(
              Be(D.references[ee], j),
              Be(H, a)
            )
          )
        ), q = this.buildRelationalQueryWithoutPK({
          fullSchema: e,
          schema: t,
          tableNamesMap: r,
          table: e[F],
          tableConfig: t[F],
          queryConfig: Q(E, $e) ? x === !0 ? { limit: 1 } : { ...x, limit: 1 } : x,
          tableAlias: j,
          joinOn: O,
          nestedQueryRelation: E
        }), W = A`${A.identifier(j)}.${A.identifier("data")}`.as(B);
        h.push({
          on: A`true`,
          table: new _e(q.sql, {}, j),
          alias: j,
          joinType: "left",
          lateral: !0
        }), f.push({
          dbKey: B,
          tsKey: B,
          field: W,
          relationTableTsKey: F,
          isJson: !0,
          selection: q.selection
        });
      }
    }
    if (f.length === 0)
      throw new Vi({ message: `No fields selected for table "${i.tsName}" ("${a}")` });
    let w;
    if (c = xt(y, c), d) {
      let S = A`json_build_array(${A.join(
        f.map(
          ({ field: L, tsKey: M, isJson: P }) => P ? A`${A.identifier(`${a}_${M}`)}.${A.identifier("data")}` : Q(L, z.Aliased) ? L.sql : L
        ),
        A`, `
      )})`;
      Q(d, qt) && (S = A`coalesce(json_agg(${S}${v.length > 0 ? A` order by ${A.join(v, A`, `)}` : void 0}), '[]'::json)`);
      const _ = [{
        dbKey: "data",
        tsKey: "data",
        field: S.as("data"),
        isJson: !0,
        relationTableTsKey: i.tsName,
        selection: f
      }];
      b !== void 0 || m !== void 0 || v.length > 0 ? (w = this.buildSelectQuery({
        table: er(s, a),
        fields: {},
        fieldsFlat: [{
          path: [],
          field: A.raw("*")
        }],
        where: c,
        limit: b,
        offset: m,
        orderBy: v,
        setOperators: []
      }), c = void 0, b = void 0, m = void 0, v = []) : w = er(s, a), w = this.buildSelectQuery({
        table: Q(w, ve) ? w : new _e(w, {}, a),
        fields: {},
        fieldsFlat: _.map(({ field: L }) => ({
          path: [],
          field: Q(L, ce) ? Be(L, a) : L
        })),
        joins: h,
        where: c,
        limit: b,
        offset: m,
        orderBy: v,
        setOperators: []
      });
    } else
      w = this.buildSelectQuery({
        table: er(s, a),
        fields: {},
        fieldsFlat: f.map(({ field: S }) => ({
          path: [],
          field: Q(S, ce) ? Be(S, a) : S
        })),
        joins: h,
        where: c,
        limit: b,
        offset: m,
        orderBy: v,
        setOperators: []
      });
    return {
      tableTsKey: i.tsName,
      sql: w,
      selection: f
    };
  }
}
class wu {
  static [I] = "TypedQueryBuilder";
  /** @internal */
  getSelectedFields() {
    return this._.selectedFields;
  }
}
class Ee {
  static [I] = "PgSelectBuilder";
  fields;
  session;
  dialect;
  withList = [];
  distinct;
  constructor(e) {
    this.fields = e.fields, this.session = e.session, this.dialect = e.dialect, e.withList && (this.withList = e.withList), this.distinct = e.distinct;
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  /**
   * Specify the table, subquery, or other target that you're
   * building a select query against.
   *
   * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM | Postgres from documentation}
   */
  from(e) {
    const t = !!this.fields, r = e;
    let s;
    return this.fields ? s = this.fields : Q(r, _e) ? s = Object.fromEntries(
      Object.keys(r._.selectedFields).map((i) => [i, r[i]])
    ) : Q(r, ls) ? s = r[ue].selectedFields : Q(r, z) ? s = {} : s = ki(r), new cs({
      table: r,
      fields: s,
      isPartialSelect: t,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    }).setToken(this.authToken);
  }
}
class bu extends wu {
  static [I] = "PgSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({ table: e, fields: t, isPartialSelect: r, session: s, dialect: i, withList: u, distinct: a }) {
    super(), this.config = {
      withList: u,
      table: e,
      fields: { ...t },
      distinct: a,
      setOperators: []
    }, this.isPartialSelect = r, this.session = s, this.dialect = i, this._ = {
      selectedFields: t
    }, this.tableName = Re(e), this.joinsNotNullableMap = typeof this.tableName == "string" ? { [this.tableName]: !0 } : {};
  }
  createJoin(e, t) {
    return (r, s) => {
      const i = this.tableName, u = Re(r);
      if (typeof u == "string" && this.config.joins?.some((a) => a.alias === u))
        throw new Error(`Alias "${u}" is already used in this query`);
      if (!this.isPartialSelect && (Object.keys(this.joinsNotNullableMap).length === 1 && typeof i == "string" && (this.config.fields = {
        [i]: this.config.fields
      }), typeof u == "string" && !Q(r, z))) {
        const a = Q(r, _e) ? r._.selectedFields : Q(r, Fe) ? r[ue].selectedFields : r[U.Symbol.Columns];
        this.config.fields[u] = a;
      }
      if (typeof s == "function" && (s = s(
        new Proxy(
          this.config.fields,
          new ge({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
        )
      )), this.config.joins || (this.config.joins = []), this.config.joins.push({ on: s, table: r, joinType: e, alias: u, lateral: t }), typeof u == "string")
        switch (e) {
          case "left": {
            this.joinsNotNullableMap[u] = !1;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([a]) => [a, !1])
            ), this.joinsNotNullableMap[u] = !0;
            break;
          }
          case "cross":
          case "inner": {
            this.joinsNotNullableMap[u] = !0;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([a]) => [a, !1])
            ), this.joinsNotNullableMap[u] = !1;
            break;
          }
        }
      return this;
    };
  }
  /**
   * Executes a `left join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  leftJoin = this.createJoin("left", !1);
  /**
   * Executes a `left join lateral` operation by adding subquery to the current query.
   *
   * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
   *
   * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#left-join-lateral}
   *
   * @param table the subquery to join.
   * @param on the `on` clause.
   */
  leftJoinLateral = this.createJoin("left", !0);
  /**
   * Executes a `right join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  rightJoin = this.createJoin("right", !1);
  /**
   * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
   *
   * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  innerJoin = this.createJoin("inner", !1);
  /**
   * Executes an `inner join lateral` operation, creating a new table by combining rows from two queries that have matching values.
   *
   * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
   *
   * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join-lateral}
   *
   * @param table the subquery to join.
   * @param on the `on` clause.
   */
  innerJoinLateral = this.createJoin("inner", !0);
  /**
   * Executes a `full join` operation by combining rows from two tables into a new table.
   *
   * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  fullJoin = this.createJoin("full", !1);
  /**
   * Executes a `cross join` operation by combining rows from two tables into a new table.
   *
   * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
   *
   * @param table the table to join.
   *
   * @example
   *
   * ```ts
   * // Select all users, each user with every pet
   * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .crossJoin(pets)
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .crossJoin(pets)
   * ```
   */
  crossJoin = this.createJoin("cross", !1);
  /**
   * Executes a `cross join lateral` operation by combining rows from two queries into a new table.
   *
   * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
   *
   * Calling this method retrieves all rows from both main and joined queries, merging all rows from each query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join-lateral}
   *
   * @param table the query to join.
   */
  crossJoinLateral = this.createJoin("cross", !0);
  createSetOperator(e, t) {
    return (r) => {
      const s = typeof r == "function" ? r(vu()) : r;
      if (!Cr(this.getSelectedFields(), s.getSelectedFields()))
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      return this.config.setOperators.push({ type: e, isAll: t, rightSelect: s }), this;
    };
  }
  /**
   * Adds `union` set operator to the query.
   *
   * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
   *
   * @example
   *
   * ```ts
   * // Select all unique names from customers and users tables
   * await db.select({ name: users.name })
   *   .from(users)
   *   .union(
   *     db.select({ name: customers.name }).from(customers)
   *   );
   * // or
   * import { union } from 'drizzle-orm/pg-core'
   *
   * await union(
   *   db.select({ name: users.name }).from(users),
   *   db.select({ name: customers.name }).from(customers)
   * );
   * ```
   */
  union = this.createSetOperator("union", !1);
  /**
   * Adds `union all` set operator to the query.
   *
   * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
   *
   * @example
   *
   * ```ts
   * // Select all transaction ids from both online and in-store sales
   * await db.select({ transaction: onlineSales.transactionId })
   *   .from(onlineSales)
   *   .unionAll(
   *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   *   );
   * // or
   * import { unionAll } from 'drizzle-orm/pg-core'
   *
   * await unionAll(
   *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
   *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   * );
   * ```
   */
  unionAll = this.createSetOperator("union", !0);
  /**
   * Adds `intersect` set operator to the query.
   *
   * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
   *
   * @example
   *
   * ```ts
   * // Select course names that are offered in both departments A and B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .intersect(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { intersect } from 'drizzle-orm/pg-core'
   *
   * await intersect(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */
  intersect = this.createSetOperator("intersect", !1);
  /**
   * Adds `intersect all` set operator to the query.
   *
   * Calling this method will retain only the rows that are present in both result sets including all duplicates.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect-all}
   *
   * @example
   *
   * ```ts
   * // Select all products and quantities that are ordered by both regular and VIP customers
   * await db.select({
   *   productId: regularCustomerOrders.productId,
   *   quantityOrdered: regularCustomerOrders.quantityOrdered
   * })
   * .from(regularCustomerOrders)
   * .intersectAll(
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * // or
   * import { intersectAll } from 'drizzle-orm/pg-core'
   *
   * await intersectAll(
   *   db.select({
   *     productId: regularCustomerOrders.productId,
   *     quantityOrdered: regularCustomerOrders.quantityOrdered
   *   })
   *   .from(regularCustomerOrders),
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * ```
   */
  intersectAll = this.createSetOperator("intersect", !0);
  /**
   * Adds `except` set operator to the query.
   *
   * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
   *
   * @example
   *
   * ```ts
   * // Select all courses offered in department A but not in department B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .except(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { except } from 'drizzle-orm/pg-core'
   *
   * await except(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */
  except = this.createSetOperator("except", !1);
  /**
   * Adds `except all` set operator to the query.
   *
   * Calling this method will retrieve all rows from the left query, except for the rows that are present in the result set of the right query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#except-all}
   *
   * @example
   *
   * ```ts
   * // Select all products that are ordered by regular customers but not by VIP customers
   * await db.select({
   *   productId: regularCustomerOrders.productId,
   *   quantityOrdered: regularCustomerOrders.quantityOrdered,
   * })
   * .from(regularCustomerOrders)
   * .exceptAll(
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered,
   *   })
   *   .from(vipCustomerOrders)
   * );
   * // or
   * import { exceptAll } from 'drizzle-orm/pg-core'
   *
   * await exceptAll(
   *   db.select({
   *     productId: regularCustomerOrders.productId,
   *     quantityOrdered: regularCustomerOrders.quantityOrdered
   *   })
   *   .from(regularCustomerOrders),
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * ```
   */
  exceptAll = this.createSetOperator("except", !0);
  /** @internal */
  addSetOperators(e) {
    return this.config.setOperators.push(...e), this;
  }
  /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be selected.
   *
   * ```ts
   * // Select all cars with green color
   * await db.select().from(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Select all BMW cars with a green color
   * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Select all cars with the green or blue color
   * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(e) {
    return typeof e == "function" && (e = e(
      new Proxy(
        this.config.fields,
        new ge({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
      )
    )), this.config.where = e, this;
  }
  /**
   * Adds a `having` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
   *
   * @param having the `having` clause.
   *
   * @example
   *
   * ```ts
   * // Select all brands with more than one car
   * await db.select({
   * 	brand: cars.brand,
   * 	count: sql<number>`cast(count(${cars.id}) as int)`,
   * })
   *   .from(cars)
   *   .groupBy(cars.brand)
   *   .having(({ count }) => gt(count, 1));
   * ```
   */
  having(e) {
    return typeof e == "function" && (e = e(
      new Proxy(
        this.config.fields,
        new ge({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
      )
    )), this.config.having = e, this;
  }
  groupBy(...e) {
    if (typeof e[0] == "function") {
      const t = e[0](
        new Proxy(
          this.config.fields,
          new ge({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
        )
      );
      this.config.groupBy = Array.isArray(t) ? t : [t];
    } else
      this.config.groupBy = e;
    return this;
  }
  orderBy(...e) {
    if (typeof e[0] == "function") {
      const t = e[0](
        new Proxy(
          this.config.fields,
          new ge({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
        )
      ), r = Array.isArray(t) ? t : [t];
      this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).orderBy = r : this.config.orderBy = r;
    } else {
      const t = e;
      this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).orderBy = t : this.config.orderBy = t;
    }
    return this;
  }
  /**
   * Adds a `limit` clause to the query.
   *
   * Calling this method will set the maximum number of rows that will be returned by this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param limit the `limit` clause.
   *
   * @example
   *
   * ```ts
   * // Get the first 10 people from this query.
   * await db.select().from(people).limit(10);
   * ```
   */
  limit(e) {
    return this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).limit = e : this.config.limit = e, this;
  }
  /**
   * Adds an `offset` clause to the query.
   *
   * Calling this method will skip a number of rows when returning results from this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param offset the `offset` clause.
   *
   * @example
   *
   * ```ts
   * // Get the 10th-20th people from this query.
   * await db.select().from(people).offset(10).limit(10);
   * ```
   */
  offset(e) {
    return this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).offset = e : this.config.offset = e, this;
  }
  /**
   * Adds a `for` clause to the query.
   *
   * Calling this method will specify a lock strength for this query that controls how strictly it acquires exclusive access to the rows being queried.
   *
   * See docs: {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE}
   *
   * @param strength the lock strength.
   * @param config the lock configuration.
   */
  for(e, t = {}) {
    return this.config.lockingClause = { strength: e, config: t }, this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  as(e) {
    return new Proxy(
      new _e(this.getSQL(), this.config.fields, e),
      new ge({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    );
  }
  /** @internal */
  getSelectedFields() {
    return new Proxy(
      this.config.fields,
      new ge({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    );
  }
  $dynamic() {
    return this;
  }
}
class cs extends bu {
  static [I] = "PgSelect";
  /** @internal */
  _prepare(e) {
    const { session: t, config: r, dialect: s, joinsNotNullableMap: i, authToken: u } = this;
    if (!t)
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    return Se.startActiveSpan("drizzle.prepareQuery", () => {
      const a = Me(r.fields), d = t.prepareQuery(s.sqlToQuery(this.getSQL()), a, e, !0);
      return d.joinsNotNullableMap = i, d.setToken(u);
    });
  }
  /**
   * Create a prepared statement for this query. This allows
   * the database to remember this query for the given session
   * and call it by name, rather than specifying the full query.
   *
   * {@link https://www.postgresql.org/docs/current/sql-prepare.html | Postgres prepare documentation}
   */
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => Se.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
}
Qi(cs, [qe]);
function Ye(n, e) {
  return (t, r, ...s) => {
    const i = [r, ...s].map((u) => ({
      type: n,
      isAll: e,
      rightSelect: u
    }));
    for (const u of i)
      if (!Cr(t.getSelectedFields(), u.rightSelect.getSelectedFields()))
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
    return t.addSetOperators(i);
  };
}
const vu = () => ({
  union: Su,
  unionAll: Pu,
  intersect: Eu,
  intersectAll: _u,
  except: Cu,
  exceptAll: Tu
}), Su = Ye("union", !1), Pu = Ye("union", !0), Eu = Ye("intersect", !1), _u = Ye("intersect", !0), Cu = Ye("except", !1), Tu = Ye("except", !0);
class hs {
  static [I] = "PgQueryBuilder";
  dialect;
  dialectConfig;
  constructor(e) {
    this.dialect = Q(e, _t) ? e : void 0, this.dialectConfig = Q(e, _t) ? void 0 : e;
  }
  $with = (e, t) => {
    const r = this;
    return { as: (i) => (typeof i == "function" && (i = i(r)), new Proxy(
      new Un(
        i.getSQL(),
        t ?? ("getSelectedFields" in i ? i.getSelectedFields() ?? {} : {}),
        e,
        !0
      ),
      new ge({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    )) };
  };
  with(...e) {
    const t = this;
    function r(u) {
      return new Ee({
        fields: u ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        withList: e
      });
    }
    function s(u) {
      return new Ee({
        fields: u ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        distinct: !0
      });
    }
    function i(u, a) {
      return new Ee({
        fields: a ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        distinct: { on: u }
      });
    }
    return { select: r, selectDistinct: s, selectDistinctOn: i };
  }
  select(e) {
    return new Ee({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect()
    });
  }
  selectDistinct(e) {
    return new Ee({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new Ee({
      fields: t ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: { on: e }
    });
  }
  // Lazy load dialect to avoid circular dependency
  getDialect() {
    return this.dialect || (this.dialect = new _t(this.dialectConfig)), this.dialect;
  }
}
class zr {
  constructor(e, t, r, s, i) {
    this.table = e, this.session = t, this.dialect = r, this.withList = s, this.overridingSystemValue_ = i;
  }
  static [I] = "PgInsertBuilder";
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  overridingSystemValue() {
    return this.overridingSystemValue_ = !0, this;
  }
  values(e) {
    if (e = Array.isArray(e) ? e : [e], e.length === 0)
      throw new Error("values() must be called with at least one value");
    const t = e.map((r) => {
      const s = {}, i = this.table[U.Symbol.Columns];
      for (const u of Object.keys(r)) {
        const a = r[u];
        s[u] = Q(a, z) ? a : new Le(a, i[u]);
      }
      return s;
    });
    return new Vr(
      this.table,
      t,
      this.session,
      this.dialect,
      this.withList,
      !1,
      this.overridingSystemValue_
    ).setToken(this.authToken);
  }
  select(e) {
    const t = typeof e == "function" ? e(new hs()) : e;
    if (!Q(t, z) && !Cr(this.table[or], t._.selectedFields))
      throw new Error(
        "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
      );
    return new Vr(this.table, t, this.session, this.dialect, this.withList, !0);
  }
}
class Vr extends qe {
  constructor(e, t, r, s, i, u, a) {
    super(), this.session = r, this.dialect = s, this.config = { table: e, values: t, withList: i, select: u, overridingSystemValue_: a };
  }
  static [I] = "PgInsert";
  config;
  returning(e = this.config.table[U.Symbol.Columns]) {
    return this.config.returningFields = e, this.config.returning = Me(e), this;
  }
  /**
   * Adds an `on conflict do nothing` clause to the query.
   *
   * Calling this method simply avoids inserting a row as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
   *
   * @param config The `target` and `where` clauses.
   *
   * @example
   * ```ts
   * // Insert one row and cancel the insert if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing();
   *
   * // Explicitly specify conflict target
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing({ target: cars.id });
   * ```
   */
  onConflictDoNothing(e = {}) {
    if (e.target === void 0)
      this.config.onConflict = A`do nothing`;
    else {
      let t = "";
      t = Array.isArray(e.target) ? e.target.map((s) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(s))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(e.target));
      const r = e.where ? A` where ${e.where}` : void 0;
      this.config.onConflict = A`(${A.raw(t)})${r} do nothing`;
    }
    return this;
  }
  /**
   * Adds an `on conflict do update` clause to the query.
   *
   * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
   *
   * @param config The `target`, `set` and `where` clauses.
   *
   * @example
   * ```ts
   * // Update the row if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'Porsche' }
   *   });
   *
   * // Upsert with 'where' clause
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'newBMW' },
   *     targetWhere: sql`${cars.createdAt} > '2023-01-01'::date`,
   *   });
   * ```
   */
  onConflictDoUpdate(e) {
    if (e.where && (e.targetWhere || e.setWhere))
      throw new Error(
        'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
      );
    const t = e.where ? A` where ${e.where}` : void 0, r = e.targetWhere ? A` where ${e.targetWhere}` : void 0, s = e.setWhere ? A` where ${e.setWhere}` : void 0, i = this.dialect.buildUpdateSet(this.config.table, Hn(this.config.table, e.set));
    let u = "";
    return u = Array.isArray(e.target) ? e.target.map((a) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(a))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(e.target)), this.config.onConflict = A`(${A.raw(u)})${r} do update set ${i}${t}${s}`, this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  /** @internal */
  _prepare(e) {
    return Se.startActiveSpan("drizzle.prepareQuery", () => this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, e, !0));
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => Se.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new ge({
        alias: Ne(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
}
class Au extends qe {
  constructor(e, t, r) {
    super(), this.session = t, this.dialect = r, this.config = { view: e };
  }
  static [I] = "PgRefreshMaterializedView";
  config;
  concurrently() {
    if (this.config.withNoData !== void 0)
      throw new Error("Cannot use concurrently and withNoData together");
    return this.config.concurrently = !0, this;
  }
  withNoData() {
    if (this.config.concurrently !== void 0)
      throw new Error("Cannot use concurrently and withNoData together");
    return this.config.withNoData = !0, this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildRefreshMaterializedViewQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  /** @internal */
  _prepare(e) {
    return Se.startActiveSpan("drizzle.prepareQuery", () => this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0, e, !0));
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => Se.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
}
class Wr {
  constructor(e, t, r, s) {
    this.table = e, this.session = t, this.dialect = r, this.withList = s;
  }
  static [I] = "PgUpdateBuilder";
  authToken;
  setToken(e) {
    return this.authToken = e, this;
  }
  set(e) {
    return new xu(
      this.table,
      Hn(this.table, e),
      this.session,
      this.dialect,
      this.withList
    ).setToken(this.authToken);
  }
}
class xu extends qe {
  constructor(e, t, r, s, i) {
    super(), this.session = r, this.dialect = s, this.config = { set: t, table: e, withList: i, joins: [] }, this.tableName = Re(e), this.joinsNotNullableMap = typeof this.tableName == "string" ? { [this.tableName]: !0 } : {};
  }
  static [I] = "PgUpdate";
  config;
  tableName;
  joinsNotNullableMap;
  from(e) {
    const t = e, r = Re(t);
    return typeof r == "string" && (this.joinsNotNullableMap[r] = !0), this.config.from = t, this;
  }
  getTableLikeFields(e) {
    return Q(e, ve) ? e[U.Symbol.Columns] : Q(e, _e) ? e._.selectedFields : e[ue].selectedFields;
  }
  createJoin(e) {
    return (t, r) => {
      const s = Re(t);
      if (typeof s == "string" && this.config.joins.some((i) => i.alias === s))
        throw new Error(`Alias "${s}" is already used in this query`);
      if (typeof r == "function") {
        const i = this.config.from && !Q(this.config.from, z) ? this.getTableLikeFields(this.config.from) : void 0;
        r = r(
          new Proxy(
            this.config.table[U.Symbol.Columns],
            new ge({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          ),
          i && new Proxy(
            i,
            new ge({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          )
        );
      }
      if (this.config.joins.push({ on: r, table: t, joinType: e, alias: s }), typeof s == "string")
        switch (e) {
          case "left": {
            this.joinsNotNullableMap[s] = !1;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([i]) => [i, !1])
            ), this.joinsNotNullableMap[s] = !0;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[s] = !0;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([i]) => [i, !1])
            ), this.joinsNotNullableMap[s] = !1;
            break;
          }
        }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  /**
   * Adds a 'where' clause to the query.
   *
   * Calling this method will update only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param where the 'where' clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be updated.
   *
   * ```ts
   * // Update all cars with green color
   * await db.update(cars).set({ color: 'red' })
   *   .where(eq(cars.color, 'green'));
   * // or
   * await db.update(cars).set({ color: 'red' })
   *   .where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Update all BMW cars with a green color
   * await db.update(cars).set({ color: 'red' })
   *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Update all cars with the green or blue color
   * await db.update(cars).set({ color: 'red' })
   *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(e) {
    return this.config.where = e, this;
  }
  returning(e) {
    if (!e && (e = Object.assign({}, this.config.table[U.Symbol.Columns]), this.config.from)) {
      const t = Re(this.config.from);
      if (typeof t == "string" && this.config.from && !Q(this.config.from, z)) {
        const r = this.getTableLikeFields(this.config.from);
        e[t] = r;
      }
      for (const r of this.config.joins) {
        const s = Re(r.table);
        if (typeof s == "string" && !Q(r.table, z)) {
          const i = this.getTableLikeFields(r.table);
          e[s] = i;
        }
      }
    }
    return this.config.returningFields = e, this.config.returning = Me(e), this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  /** @internal */
  _prepare(e) {
    const t = this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, e, !0);
    return t.joinsNotNullableMap = this.joinsNotNullableMap, t;
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => this._prepare().execute(e, this.authToken);
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new ge({
        alias: Ne(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
}
class Bt extends z {
  constructor(e) {
    super(Bt.buildEmbeddedCount(e.source, e.filters).queryChunks), this.params = e, this.mapWith(Number), this.session = e.session, this.sql = Bt.buildCount(
      e.source,
      e.filters
    );
  }
  sql;
  token;
  static [I] = "PgCountBuilder";
  [Symbol.toStringTag] = "PgCountBuilder";
  session;
  static buildEmbeddedCount(e, t) {
    return A`(select count(*) from ${e}${A.raw(" where ").if(t)}${t})`;
  }
  static buildCount(e, t) {
    return A`select count(*) as count from ${e}${A.raw(" where ").if(t)}${t};`;
  }
  /** @intrnal */
  setToken(e) {
    return this.token = e, this;
  }
  then(e, t) {
    return Promise.resolve(this.session.count(this.sql, this.token)).then(
      e,
      t
    );
  }
  catch(e) {
    return this.then(void 0, e);
  }
  finally(e) {
    return this.then(
      (t) => (e?.(), t),
      (t) => {
        throw e?.(), t;
      }
    );
  }
}
class Bu {
  constructor(e, t, r, s, i, u, a) {
    this.fullSchema = e, this.schema = t, this.tableNamesMap = r, this.table = s, this.tableConfig = i, this.dialect = u, this.session = a;
  }
  static [I] = "PgRelationalQueryBuilder";
  findMany(e) {
    return new Kr(
      this.fullSchema,
      this.schema,
      this.tableNamesMap,
      this.table,
      this.tableConfig,
      this.dialect,
      this.session,
      e || {},
      "many"
    );
  }
  findFirst(e) {
    return new Kr(
      this.fullSchema,
      this.schema,
      this.tableNamesMap,
      this.table,
      this.tableConfig,
      this.dialect,
      this.session,
      e ? { ...e, limit: 1 } : { limit: 1 },
      "first"
    );
  }
}
class Kr extends qe {
  constructor(e, t, r, s, i, u, a, d, y) {
    super(), this.fullSchema = e, this.schema = t, this.tableNamesMap = r, this.table = s, this.tableConfig = i, this.dialect = u, this.session = a, this.config = d, this.mode = y;
  }
  static [I] = "PgRelationalQuery";
  /** @internal */
  _prepare(e) {
    return Se.startActiveSpan("drizzle.prepareQuery", () => {
      const { query: t, builtQuery: r } = this._toSQL();
      return this.session.prepareQuery(
        r,
        void 0,
        e,
        !0,
        (s, i) => {
          const u = s.map(
            (a) => lr(this.schema, this.tableConfig, a, t.selection, i)
          );
          return this.mode === "first" ? u[0] : u;
        }
      );
    });
  }
  prepare(e) {
    return this._prepare(e);
  }
  _getQuery() {
    return this.dialect.buildRelationalQueryWithoutPK({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    });
  }
  /** @internal */
  getSQL() {
    return this._getQuery().sql;
  }
  _toSQL() {
    const e = this._getQuery(), t = this.dialect.sqlToQuery(e.sql);
    return { query: e, builtQuery: t };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute() {
    return Se.startActiveSpan("drizzle.operation", () => this._prepare().execute(void 0, this.authToken));
  }
}
class Nu extends qe {
  constructor(e, t, r, s) {
    super(), this.execute = e, this.sql = t, this.query = r, this.mapBatchResult = s;
  }
  static [I] = "PgRaw";
  /** @internal */
  getSQL() {
    return this.sql;
  }
  getQuery() {
    return this.query;
  }
  mapResult(e, t) {
    return t ? this.mapBatchResult(e) : e;
  }
  _prepare() {
    return this;
  }
  /** @internal */
  isResponseInArrayMode() {
    return !1;
  }
}
class Iu {
  constructor(e, t, r) {
    if (this.dialect = e, this.session = t, this._ = r ? {
      schema: r.schema,
      fullSchema: r.fullSchema,
      tableNamesMap: r.tableNamesMap,
      session: t
    } : {
      schema: void 0,
      fullSchema: {},
      tableNamesMap: {},
      session: t
    }, this.query = {}, this._.schema)
      for (const [s, i] of Object.entries(this._.schema))
        this.query[s] = new Bu(
          r.fullSchema,
          this._.schema,
          this._.tableNamesMap,
          r.fullSchema[s],
          i,
          e,
          t
        );
  }
  static [I] = "PgDatabase";
  query;
  /**
   * Creates a subquery that defines a temporary named result set as a CTE.
   *
   * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param alias The alias for the subquery.
   *
   * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
   *
   * @example
   *
   * ```ts
   * // Create a subquery with alias 'sq' and use it in the select query
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * const result = await db.with(sq).select().from(sq);
   * ```
   *
   * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
   *
   * ```ts
   * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
   * const sq = db.$with('sq').as(db.select({
   *   name: sql<string>`upper(${users.name})`.as('name'),
   * })
   * .from(users));
   *
   * const result = await db.with(sq).select({ name: sq.name }).from(sq);
   * ```
   */
  $with = (e, t) => {
    const r = this;
    return { as: (i) => (typeof i == "function" && (i = i(new hs(r.dialect))), new Proxy(
      new Un(
        i.getSQL(),
        t ?? ("getSelectedFields" in i ? i.getSelectedFields() ?? {} : {}),
        e,
        !0
      ),
      new ge({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    )) };
  };
  $count(e, t) {
    return new Bt({ source: e, filters: t, session: this.session });
  }
  /**
   * Incorporates a previously defined CTE (using `$with`) into the main query.
   *
   * This method allows the main query to reference a temporary named result set.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param queries The CTEs to incorporate into the main query.
   *
   * @example
   *
   * ```ts
   * // Define a subquery 'sq' as a CTE using $with
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * // Incorporate the CTE 'sq' into the main query and select from it
   * const result = await db.with(sq).select().from(sq);
   * ```
   */
  with(...e) {
    const t = this;
    function r(y) {
      return new Ee({
        fields: y ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e
      });
    }
    function s(y) {
      return new Ee({
        fields: y ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e,
        distinct: !0
      });
    }
    function i(y, f) {
      return new Ee({
        fields: f ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e,
        distinct: { on: y }
      });
    }
    function u(y) {
      return new Wr(y, t.session, t.dialect, e);
    }
    function a(y) {
      return new zr(y, t.session, t.dialect, e);
    }
    function d(y) {
      return new Fr(y, t.session, t.dialect, e);
    }
    return { select: r, selectDistinct: s, selectDistinctOn: i, update: u, insert: a, delete: d };
  }
  select(e) {
    return new Ee({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(e) {
    return new Ee({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new Ee({
      fields: t ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: { on: e }
    });
  }
  /**
   * Creates an update query.
   *
   * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
   *
   * Use `.set()` method to specify which values to update.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param table The table to update.
   *
   * @example
   *
   * ```ts
   * // Update all rows in the 'cars' table
   * await db.update(cars).set({ color: 'red' });
   *
   * // Update rows with filters and conditions
   * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
   *
   * // Update with returning clause
   * const updatedCar: Car[] = await db.update(cars)
   *   .set({ color: 'red' })
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  update(e) {
    return new Wr(e, this.session, this.dialect);
  }
  /**
   * Creates an insert query.
   *
   * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert}
   *
   * @param table The table to insert into.
   *
   * @example
   *
   * ```ts
   * // Insert one row
   * await db.insert(cars).values({ brand: 'BMW' });
   *
   * // Insert multiple rows
   * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
   *
   * // Insert with returning clause
   * const insertedCar: Car[] = await db.insert(cars)
   *   .values({ brand: 'BMW' })
   *   .returning();
   * ```
   */
  insert(e) {
    return new zr(e, this.session, this.dialect);
  }
  /**
   * Creates a delete query.
   *
   * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param table The table to delete from.
   *
   * @example
   *
   * ```ts
   * // Delete all rows in the 'cars' table
   * await db.delete(cars);
   *
   * // Delete rows with filters and conditions
   * await db.delete(cars).where(eq(cars.color, 'green'));
   *
   * // Delete with returning clause
   * const deletedCar: Car[] = await db.delete(cars)
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  delete(e) {
    return new Fr(e, this.session, this.dialect);
  }
  refreshMaterializedView(e) {
    return new Au(e, this.session, this.dialect);
  }
  authToken;
  execute(e) {
    const t = typeof e == "string" ? A.raw(e) : e.getSQL(), r = this.dialect.sqlToQuery(t), s = this.session.prepareQuery(
      r,
      void 0,
      void 0,
      !1
    );
    return new Nu(
      () => s.execute(void 0, this.authToken),
      t,
      r,
      (i) => s.mapResult(i, !0)
    );
  }
  transaction(e, t) {
    return this.session.transaction(e, t);
  }
}
class Lu {
  constructor(e, t) {
    this.name = e, this.value = t;
  }
  static [I] = "PgCheckBuilder";
  brand;
  /** @internal */
  build(e) {
    return new Ou(e, this);
  }
}
class Ou {
  constructor(e, t) {
    this.table = e, this.name = t.name, this.value = t.value;
  }
  static [I] = "PgCheck";
  name;
  value;
}
function Ru(n, e) {
  return new Lu(n, e);
}
class fs {
  constructor(e, t) {
    this.unique = e, this.name = t;
  }
  static [I] = "PgIndexBuilderOn";
  on(...e) {
    return new tr(
      e.map((t) => {
        if (Q(t, z))
          return t;
        t = t;
        const r = new Jt(t.name, !!t.keyAsName, t.columnType, t.indexConfig);
        return t.indexConfig = JSON.parse(JSON.stringify(t.defaultConfig)), r;
      }),
      this.unique,
      !1,
      this.name
    );
  }
  onOnly(...e) {
    return new tr(
      e.map((t) => {
        if (Q(t, z))
          return t;
        t = t;
        const r = new Jt(t.name, !!t.keyAsName, t.columnType, t.indexConfig);
        return t.indexConfig = t.defaultConfig, r;
      }),
      this.unique,
      !0,
      this.name
    );
  }
  /**
   * Specify what index method to use. Choices are `btree`, `hash`, `gist`, `spgist`, `gin`, `brin`, or user-installed access methods like `bloom`. The default method is `btree.
   *
   * If you have the `pg_vector` extension installed in your database, you can use the `hnsw` and `ivfflat` options, which are predefined types.
   *
   * **You can always specify any string you want in the method, in case Drizzle doesn't have it natively in its types**
   *
   * @param method The name of the index method to be used
   * @param columns
   * @returns
   */
  using(e, ...t) {
    return new tr(
      t.map((r) => {
        if (Q(r, z))
          return r;
        r = r;
        const s = new Jt(r.name, !!r.keyAsName, r.columnType, r.indexConfig);
        return r.indexConfig = JSON.parse(JSON.stringify(r.defaultConfig)), s;
      }),
      this.unique,
      !0,
      this.name,
      e
    );
  }
}
class tr {
  static [I] = "PgIndexBuilder";
  /** @internal */
  config;
  constructor(e, t, r, s, i = "btree") {
    this.config = {
      name: s,
      columns: e,
      unique: t,
      only: r,
      method: i
    };
  }
  concurrently() {
    return this.config.concurrently = !0, this;
  }
  with(e) {
    return this.config.with = e, this;
  }
  where(e) {
    return this.config.where = e, this;
  }
  /** @internal */
  build(e) {
    return new Mu(this.config, e);
  }
}
class Mu {
  static [I] = "PgIndex";
  config;
  constructor(e, t) {
    this.config = { ...e, table: t };
  }
}
function at(n) {
  return new fs(!1, n);
}
function ds(n) {
  return new fs(!0, n);
}
class Du {
  constructor(e) {
    this.query = e;
  }
  authToken;
  getQuery() {
    return this.query;
  }
  mapResult(e, t) {
    return e;
  }
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  static [I] = "PgPreparedQuery";
  /** @internal */
  joinsNotNullableMap;
}
class $u {
  constructor(e) {
    this.dialect = e;
  }
  static [I] = "PgSession";
  /** @internal */
  execute(e, t) {
    return Se.startActiveSpan("drizzle.operation", () => Se.startActiveSpan("drizzle.prepareQuery", () => this.prepareQuery(
      this.dialect.sqlToQuery(e),
      void 0,
      void 0,
      !1
    )).setToken(t).execute(void 0, t));
  }
  all(e) {
    return this.prepareQuery(
      this.dialect.sqlToQuery(e),
      void 0,
      void 0,
      !1
    ).all();
  }
  /** @internal */
  async count(e, t) {
    const r = await this.execute(e, t);
    return Number(
      r[0].count
    );
  }
}
const vt = {
  arrayMode: !1,
  fullResults: !0
}, cr = {
  arrayMode: !0,
  fullResults: !0
};
class Qu extends Du {
  constructor(e, t, r, s, i, u) {
    super(t), this.client = e, this.logger = r, this.fields = s, this._isResponseInArrayMode = i, this.customResultMapper = u, this.clientQuery = e.query ?? e;
  }
  static [I] = "NeonHttpPreparedQuery";
  clientQuery;
  /** @internal */
  async execute(e = {}, t = this.authToken) {
    const r = Zt(this.query.params, e);
    this.logger.logQuery(this.query.sql, r);
    const { fields: s, clientQuery: i, query: u, customResultMapper: a } = this;
    if (!s && !a)
      return i(
        u.sql,
        r,
        t === void 0 ? vt : {
          ...vt,
          authToken: t
        }
      );
    const d = await i(
      u.sql,
      r,
      t === void 0 ? cr : {
        ...cr,
        authToken: t
      }
    );
    return this.mapResult(d);
  }
  mapResult(e) {
    if (!this.fields && !this.customResultMapper)
      return e;
    const t = e.rows;
    return this.customResultMapper ? this.customResultMapper(t) : t.map((r) => $i(this.fields, r, this.joinsNotNullableMap));
  }
  all(e = {}) {
    const t = Zt(this.query.params, e);
    return this.logger.logQuery(this.query.sql, t), this.clientQuery(
      this.query.sql,
      t,
      this.authToken === void 0 ? vt : {
        ...vt,
        authToken: this.authToken
      }
    ).then((r) => r.rows);
  }
  /** @internal */
  values(e = {}, t) {
    const r = Zt(this.query.params, e);
    return this.logger.logQuery(this.query.sql, r), this.clientQuery(this.query.sql, r, { arrayMode: !0, fullResults: !0, authToken: t }).then((s) => s.rows);
  }
  /** @internal */
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}
class ku extends $u {
  constructor(e, t, r, s = {}) {
    super(t), this.client = e, this.schema = r, this.options = s, this.clientQuery = e.query ?? e, this.logger = s.logger ?? new Ei();
  }
  static [I] = "NeonHttpSession";
  clientQuery;
  logger;
  prepareQuery(e, t, r, s, i) {
    return new Qu(
      this.client,
      e,
      this.logger,
      t,
      s,
      i
    );
  }
  async batch(e) {
    const t = [], r = [];
    for (const i of e) {
      const u = i._prepare(), a = u.getQuery();
      t.push(u), r.push(
        this.clientQuery(a.sql, a.params, {
          fullResults: !0,
          arrayMode: u.isResponseInArrayMode()
        })
      );
    }
    return (await this.client.transaction(r, cr)).map((i, u) => t[u].mapResult(i, !0));
  }
  // change return type to QueryRows<true>
  async query(e, t) {
    return this.logger.logQuery(e, t), await this.clientQuery(e, t, { arrayMode: !0, fullResults: !0 });
  }
  // change return type to QueryRows<false>
  async queryObjects(e, t) {
    return this.clientQuery(e, t, { arrayMode: !1, fullResults: !0 });
  }
  /** @internal */
  async count(e, t) {
    const r = await this.execute(e, t);
    return Number(
      r.rows[0].count
    );
  }
  async transaction(e, t = {}) {
    throw new Error("No transactions support in neon-http driver");
  }
}
class qu {
  constructor(e, t, r = {}) {
    this.client = e, this.dialect = t, this.options = r, this.initMappers();
  }
  static [I] = "NeonHttpDriver";
  createSession(e) {
    return new ku(this.client, this.dialect, e, { logger: this.options.logger });
  }
  initMappers() {
    be.setTypeParser(be.builtins.TIMESTAMPTZ, (e) => e), be.setTypeParser(be.builtins.TIMESTAMP, (e) => e), be.setTypeParser(be.builtins.DATE, (e) => e), be.setTypeParser(be.builtins.INTERVAL, (e) => e), be.setTypeParser(1231, (e) => e), be.setTypeParser(1115, (e) => e), be.setTypeParser(1185, (e) => e), be.setTypeParser(1187, (e) => e), be.setTypeParser(1182, (e) => e);
  }
}
function Nt(n, e, t, r) {
  return new Proxy(n, {
    get(s, i) {
      const u = s[i];
      return typeof u != "function" && (typeof u != "object" || u === null) ? u : r ? Nt(u, e, t) : i === "query" ? Nt(u, e, t, !0) : new Proxy(u, {
        apply(a, d, y) {
          const f = a.call(d, ...y);
          return typeof f == "object" && f !== null && "setToken" in f && typeof f.setToken == "function" && f.setToken(e), t(a, i, f);
        }
      });
    }
  });
}
class Fu extends Iu {
  static [I] = "NeonHttpDatabase";
  $withAuth(e) {
    return this.authToken = e, Nt(this, e, (t, r, s) => r === "with" ? Nt(s, e, (i, u, a) => a) : s);
  }
  async batch(e) {
    return this.session.batch(e);
  }
}
function ze(n, e = {}) {
  const t = new _t({ casing: e.casing });
  let r;
  e.logger === !0 ? r = new Pi() : e.logger !== !1 && (r = e.logger);
  let s;
  if (e.schema) {
    const d = du(
      e.schema,
      yu
    );
    s = {
      fullSchema: e.schema,
      schema: d.tables,
      tableNamesMap: d.tableNamesMap
    };
  }
  const u = new qu(n, t, { logger: r }).createSession(s), a = new Fu(
    t,
    u,
    s
  );
  return a.$client = n, a;
}
function hr(...n) {
  if (typeof n[0] == "string") {
    const e = We(n[0]);
    return ze(e, n[1]);
  }
  if (qi(n[0])) {
    const { connection: e, client: t, ...r } = n[0];
    if (t)
      return ze(t, r);
    if (typeof e == "object") {
      const { connectionString: i, ...u } = e, a = We(i, u);
      return ze(a, r);
    }
    const s = We(e);
    return ze(s, r);
  }
  return ze(n[0], n[1]);
}
((n) => {
  function e(t) {
    return ze({}, t);
  }
  n.mock = e;
})(hr || (hr = {}));
const ju = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
function Uu(n) {
  return typeof n == "string" && ju.test(n);
}
const ft = De().primaryKey().generatedAlwaysAsIdentity(), rr = { withTimezone: !0 }, dt = {
  created_at: Et(rr).defaultNow().notNull(),
  updated_at: Et(rr),
  deleted_at: Et(rr)
}, nt = ht(
  "users",
  {
    id: ft,
    uuid: os().defaultRandom().unique().notNull(),
    ...dt
  },
  (n) => [ds("uuid_idx").on(n.uuid)]
), zu = ht(
  "adhoc_games",
  {
    id: ft,
    solution: ot().notNull(),
    user_id: De().notNull().references(() => nt.id),
    ...dt
  },
  (n) => [at("adhoc_game_user_idx").on(n.user_id)]
), Ge = ht(
  "solutions",
  {
    id: ft,
    value: ot().notNull().unique(),
    date: Yn().defaultNow().notNull().unique(),
    ...dt
  },
  (n) => [ds("daily_game_solution_date_idx").on(n.date)]
), st = ht(
  "daily_games",
  {
    id: ft,
    user_id: De().notNull().references(() => nt.id),
    solution_id: De().notNull().references(() => Ge.id),
    ...dt
  },
  (n) => [
    at("daily_game_user_idx").on(n.user_id),
    at("daily_game_solution_idx").on(n.solution_id)
  ]
), Vu = ht(
  "attempts",
  {
    id: ft,
    value: ot().notNull(),
    feedback: ot().notNull(),
    daily_game_id: De().references(() => st.id),
    adhoc_game_id: De().references(() => zu.id),
    ...dt
  },
  (n) => [
    Ru(
      "game_type",
      A`
      (${n.daily_game_id} IS NOT NULL AND ${n.adhoc_game_id} IS NULL)
      OR
      (${n.daily_game_id} IS NULL AND ${n.adhoc_game_id} IS NOT NULL)
    `
    ),
    at("daily_game_attempt_idx").on(n.daily_game_id),
    at("adhoc_game_attempt_idx").on(n.adhoc_game_id)
  ]
);
async function Wu({
  db: n,
  game: e,
  attempt: t,
  feedback: r
}) {
  console.info("create new attempt");
  const s = "solution_id" in e, u = (await n.insert(Vu).values({
    [s ? "daily_game_id" : "adhoc_game_id"]: e.id,
    value: t,
    feedback: r
  }).returning()).pop();
  if (!u)
    throw Error("failed to create new attempt");
  return u;
}
const ut = {
  maxAttempts: 8,
  solutionLength: 4
};
function Ku(n, e) {
  const t = {};
  for (let r = 0; r < n.length; r++) {
    const s = n[r], i = s[e];
    t[i] = s;
  }
  return t;
}
const fr = "gray";
new Array(ut.solutionLength).fill(
  fr
);
new Array(ut.maxAttempts).fill(fr).map(() => new Array(ut.solutionLength).fill(fr));
const Hu = [
  "fairy",
  "fire",
  "lightning",
  "grass",
  "ice",
  "water",
  "rock"
], Gu = Hu.map((n, e) => {
  const t = e + 1;
  return {
    icon: n,
    color: `var(--token-${t})`,
    id: t
  };
}), ps = "X", Ju = [
  {
    value: "-",
    label: "incorrect color",
    key: "incorrect"
  },
  {
    value: "O",
    label: "correct color, incorrect position",
    key: "halfCorrect"
  },
  {
    value: ps,
    label: "correct color, correct position",
    key: "correct"
  }
], Yu = Ju.map((n, e) => ({
  ...n,
  id: e,
  color: `var(--feedback-token-${n.key})`
}));
Ku(Yu, "value");
const Xu = new Array(ut.solutionLength).fill(ps).join("");
function Zu(n) {
  const e = new Uint32Array(1);
  return crypto.getRandomValues(e), Math.floor(e[0] / (Math.pow(2, 32) - 1) * n);
}
function el(n) {
  const e = Zu(n.length);
  return n[e];
}
function tl() {
  const n = Gu.map((t) => t.id);
  return new Array(ut.solutionLength).fill(0).map(() => el(n)).join("");
}
function rl(n, e) {
  const t = n.split(""), r = e.split(""), s = [];
  for (let u = 0; u < t.length; u++) {
    const a = t[u], d = r[u];
    a === d && (s.push("X"), delete t[u], delete r[u]);
  }
  for (let u = 0; u < t.length; u++) {
    const a = t[u], d = r.findIndex(
      (y) => !!(a && y) && a === y
    );
    d !== -1 && (s.push("O"), delete t[u], delete r[d]);
  }
  const i = s.join("").padEnd(t.length, "-");
  return { feedback: i, win: i === Xu };
}
async function nl({
  db: n
}) {
  console.info("create new solution");
  const e = tl(), r = (await n.insert(Ge).values({
    value: e
  }).returning()).pop();
  if (!r)
    throw Error("failed to create new solution");
  return r;
}
async function sl({
  db: n
}) {
  return console.info("get daily solution"), (await n.select().from(Ge).where(A`${Ge.date} = CURRENT_DATE`)).pop();
}
async function il({
  db: n,
  id: e
}) {
  return console.info(`get solution by id '${e}'`), (await n.select().from(Ge).where(He(Ge.id, e))).pop();
}
async function gs({
  db: n
}) {
  const e = await sl({ db: n });
  e && console.info(`get solution '${e.id}'`);
  const t = e || await nl({ db: n });
  return e || console.info(`create new solution '${t.id}'`), t;
}
async function ol({
  db: n,
  user: e
}) {
  console.info("create new daily solution");
  const t = await gs({ db: n }), s = (await n.insert(st).values({
    user_id: e.id,
    solution_id: t.id
  }).returning()).pop();
  if (!s)
    throw Error("failed to create new daily solution");
  return s;
}
async function al({
  db: n,
  user: e
}) {
  console.info("get daily solution");
  const t = await gs({ db: n });
  return (await n.select().from(st).where(
    xt(
      He(st.user_id, e.id),
      He(st.solution_id, t.id)
    )
  )).pop();
}
async function ul({
  db: n,
  user: e
}) {
  console.info("get or create daily game");
  const t = await al({ db: n, user: e });
  t && console.info(`get daily game '${t.id}'`);
  const r = t || await ol({ db: n, user: e });
  return t || console.info(`create new daily game '${r.id}'`), r;
}
async function ll({
  db: n,
  uuid: e
}) {
  return (await n.select().from(nt).where(He(nt.uuid, e)).orderBy(as(nt.created_at)).limit(1)).pop();
}
async function cl({
  attempt: n,
  db: e,
  id: t
}) {
  const r = Uu(t) ? await ll({ db: e, uuid: t }) : void 0;
  if (!r)
    throw Error("missing user");
  const s = await ul({ db: e, user: r }), i = await il({ db: e, id: s.solution_id });
  if (!i)
    throw Error("missing solution");
  const { feedback: u } = rl(n, i.value);
  return await Wu({
    db: e,
    game: s,
    feedback: u,
    attempt: n
  }), { id: r.uuid };
}
async function Fl(n) {
  try {
    const e = We(Netlify.env.get("DATABASE_URL")), t = hr({ client: e }), s = new URL(n.url).pathname.split("/"), i = s[2], u = s[4], a = await cl({ db: t, id: i, attempt: u });
    return new Response(JSON.stringify(a), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return console.error("Unexpected error in /game/:id/try/:code", e), new Response("Internal Server Error", { status: 500 });
  }
}
export {
  Fl as default
};
