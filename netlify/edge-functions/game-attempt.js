const wi = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
function bi(r) {
  return typeof r == "string" && wi.test(r);
}
const L = Symbol.for("drizzle:entityKind");
function M(r, e) {
  if (!r || typeof r != "object")
    return !1;
  if (r instanceof e)
    return !0;
  if (!Object.prototype.hasOwnProperty.call(e, L))
    throw new Error(
      `Class "${e.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  let t = Object.getPrototypeOf(r).constructor;
  if (t)
    for (; t; ) {
      if (L in t && t[L] === e[L])
        return !0;
      t = Object.getPrototypeOf(t);
    }
  return !1;
}
class he {
  constructor(e, t) {
    this.table = e, this.config = t, this.name = t.name, this.keyAsName = t.keyAsName, this.notNull = t.notNull, this.default = t.default, this.defaultFn = t.defaultFn, this.onUpdateFn = t.onUpdateFn, this.hasDefault = t.hasDefault, this.primary = t.primaryKey, this.isUnique = t.isUnique, this.uniqueName = t.uniqueName, this.uniqueType = t.uniqueType, this.dataType = t.dataType, this.columnType = t.columnType, this.generated = t.generated, this.generatedIdentity = t.generatedIdentity;
  }
  static [L] = "Column";
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
class vi {
  static [L] = "ColumnBuilder";
  config;
  constructor(e, t, n) {
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
      columnType: n,
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
const De = Symbol.for("drizzle:Name");
class Si {
  static [L] = "PgForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate = "no action";
  /** @internal */
  _onDelete = "no action";
  constructor(e, t) {
    this.reference = () => {
      const { name: n, columns: s, foreignColumns: i } = e();
      return { name: n, columns: s, foreignTable: i[0].table, foreignColumns: i };
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
    return new Pi(e, this);
  }
}
class Pi {
  constructor(e, t) {
    this.table = e, this.reference = t.reference, this.onUpdate = t._onUpdate, this.onDelete = t._onDelete;
  }
  static [L] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name: e, columns: t, foreignColumns: n } = this.reference(), s = t.map((o) => o.name), i = n.map((o) => o.name), u = [
      this.table[De],
      ...s,
      n[0].table[De],
      ...i
    ];
    return e ?? `${u.join("_")}_fk`;
  }
}
function Ei(r, ...e) {
  return r(...e);
}
function _i(r, e) {
  return `${r[De]}_${e.join("_")}_unique`;
}
function on(r, e, t) {
  for (let n = e; n < r.length; n++) {
    const s = r[n];
    if (s === "\\") {
      n++;
      continue;
    }
    if (s === '"')
      return [r.slice(e, n).replace(/\\/g, ""), n + 1];
    if (!t && (s === "," || s === "}"))
      return [r.slice(e, n).replace(/\\/g, ""), n];
  }
  return [r.slice(e).replace(/\\/g, ""), r.length];
}
function En(r, e = 0) {
  const t = [];
  let n = e, s = !1;
  for (; n < r.length; ) {
    const i = r[n];
    if (i === ",") {
      (s || n === e) && t.push(""), s = !0, n++;
      continue;
    }
    if (s = !1, i === "\\") {
      n += 2;
      continue;
    }
    if (i === '"') {
      const [h, m] = on(r, n + 1, !0);
      t.push(h), n = m;
      continue;
    }
    if (i === "}")
      return [t, n + 1];
    if (i === "{") {
      const [h, m] = En(r, n + 1);
      t.push(h), n = m;
      continue;
    }
    const [u, o] = on(r, n, !1);
    t.push(u), n = o;
  }
  return [t, n];
}
function Ci(r) {
  const [e] = En(r, 1);
  return e;
}
function _n(r) {
  return `{${r.map((e) => Array.isArray(e) ? _n(e) : typeof e == "string" ? `"${e.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${e}`).join(",")}}`;
}
class re extends vi {
  foreignKeyConfigs = [];
  static [L] = "PgColumnBuilder";
  array(e) {
    return new Ai(this.config.name, this, e);
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
    return this.foreignKeyConfigs.map(({ ref: n, actions: s }) => Ei(
      (i, u) => {
        const o = new Si(() => {
          const h = i();
          return { columns: [e], foreignColumns: [h] };
        });
        return u.onUpdate && o.onUpdate(u.onUpdate), u.onDelete && o.onDelete(u.onDelete), o.build(t);
      },
      n,
      s
    ));
  }
  /** @internal */
  buildExtraConfigColumn(e) {
    return new Ti(e, this.config);
  }
}
class X extends he {
  constructor(e, t) {
    t.uniqueName || (t.uniqueName = _i(e, [t.name])), super(e, t), this.table = e;
  }
  static [L] = "PgColumn";
}
class Ti extends X {
  static [L] = "ExtraConfigColumn";
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
class or {
  static [L] = "IndexedColumn";
  constructor(e, t, n, s) {
    this.name = e, this.keyAsName = t, this.type = n, this.indexConfig = s;
  }
  name;
  keyAsName;
  type;
  indexConfig;
}
class Ai extends re {
  static [L] = "PgArrayBuilder";
  constructor(e, t, n) {
    super(e, "array", "PgArray"), this.config.baseBuilder = t, this.config.size = n;
  }
  /** @internal */
  build(e) {
    const t = this.config.baseBuilder.build(e);
    return new Lr(
      e,
      this.config,
      t
    );
  }
}
class Lr extends X {
  constructor(e, t, n, s) {
    super(e, t), this.baseColumn = n, this.range = s, this.size = t.size;
  }
  size;
  static [L] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${typeof this.size == "number" ? this.size : ""}]`;
  }
  mapFromDriverValue(e) {
    return typeof e == "string" && (e = Ci(e)), e.map((t) => this.baseColumn.mapFromDriverValue(t));
  }
  mapToDriverValue(e, t = !1) {
    const n = e.map(
      (s) => s === null ? null : M(this.baseColumn, Lr) ? this.baseColumn.mapToDriverValue(s, !0) : this.baseColumn.mapToDriverValue(s)
    );
    return t ? n : _n(n);
  }
}
const an = Symbol.for("drizzle:isPgEnum");
function xi(r) {
  return !!r && typeof r == "function" && an in r && r[an] === !0;
}
class Te {
  static [L] = "Subquery";
  constructor(e, t, n, s = !1) {
    this._ = {
      brand: "Subquery",
      sql: e,
      selectedFields: t,
      alias: n,
      isWith: s
    };
  }
  // getSQL(): SQL<unknown> {
  // 	return new SQL([this]);
  // }
}
class Cn extends Te {
  static [L] = "WithSubquery";
}
const Ee = {
  startActiveSpan(r, e) {
    return e();
  }
}, le = Symbol.for("drizzle:ViewBaseConfig"), Nt = Symbol.for("drizzle:Schema"), yr = Symbol.for("drizzle:Columns"), un = Symbol.for("drizzle:ExtraConfigColumns"), ar = Symbol.for("drizzle:OriginalName"), ur = Symbol.for("drizzle:BaseName"), kt = Symbol.for("drizzle:IsAlias"), ln = Symbol.for("drizzle:ExtraConfigBuilder"), Ii = Symbol.for("drizzle:IsDrizzleTable");
class j {
  static [L] = "Table";
  /** @internal */
  static Symbol = {
    Name: De,
    Schema: Nt,
    OriginalName: ar,
    Columns: yr,
    ExtraConfigColumns: un,
    BaseName: ur,
    IsAlias: kt,
    ExtraConfigBuilder: ln
  };
  /**
   * @internal
   * Can be changed if the table is aliased.
   */
  [De];
  /**
   * @internal
   * Used to store the original name of the table, before any aliasing.
   */
  [ar];
  /** @internal */
  [Nt];
  /** @internal */
  [yr];
  /** @internal */
  [un];
  /**
   *  @internal
   * Used to store the table name before the transformation via the `tableCreator` functions.
   */
  [ur];
  /** @internal */
  [kt] = !1;
  /** @internal */
  [Ii] = !0;
  /** @internal */
  [ln] = void 0;
  constructor(e, t, n) {
    this[De] = this[ar] = e, this[Nt] = t, this[ur] = n;
  }
}
function Re(r) {
  return r[De];
}
function yt(r) {
  return `${r[Nt] ?? "public"}.${r[De]}`;
}
function Tn(r) {
  return r != null && typeof r.getSQL == "function";
}
function Ni(r) {
  const e = { sql: "", params: [] };
  for (const t of r)
    e.sql += t.sql, e.params.push(...t.params), t.typings?.length && (e.typings || (e.typings = []), e.typings.push(...t.typings));
  return e;
}
class ge {
  static [L] = "StringChunk";
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
  static [L] = "SQL";
  /** @internal */
  decoder = An;
  shouldInlineParams = !1;
  append(e) {
    return this.queryChunks.push(...e.queryChunks), this;
  }
  toQuery(e) {
    return Ee.startActiveSpan("drizzle.buildSQL", (t) => {
      const n = this.buildQueryFromSourceParams(this.queryChunks, e);
      return t?.setAttributes({
        "drizzle.query.text": n.sql,
        "drizzle.query.params": JSON.stringify(n.params)
      }), n;
    });
  }
  buildQueryFromSourceParams(e, t) {
    const n = Object.assign({}, t, {
      inlineParams: t.inlineParams || this.shouldInlineParams,
      paramStartIndex: t.paramStartIndex || { value: 0 }
    }), {
      casing: s,
      escapeName: i,
      escapeParam: u,
      prepareTyping: o,
      inlineParams: h,
      paramStartIndex: m
    } = n;
    return Ni(e.map((d) => {
      if (M(d, ge))
        return { sql: d.value.join(""), params: [] };
      if (M(d, wr))
        return { sql: i(d.value), params: [] };
      if (d === void 0)
        return { sql: "", params: [] };
      if (Array.isArray(d)) {
        const b = [new ge("(")];
        for (const [y, v] of d.entries())
          b.push(v), y < d.length - 1 && b.push(new ge(", "));
        return b.push(new ge(")")), this.buildQueryFromSourceParams(b, n);
      }
      if (M(d, z))
        return this.buildQueryFromSourceParams(d.queryChunks, {
          ...n,
          inlineParams: h || d.shouldInlineParams
        });
      if (M(d, j)) {
        const b = d[j.Symbol.Schema], y = d[j.Symbol.Name];
        return {
          sql: b === void 0 || d[kt] ? i(y) : i(b) + "." + i(y),
          params: []
        };
      }
      if (M(d, he)) {
        const b = s.getColumnCasing(d);
        if (t.invokeSource === "indexes")
          return { sql: i(b), params: [] };
        const y = d.table[j.Symbol.Schema];
        return {
          sql: d.table[kt] || y === void 0 ? i(d.table[j.Symbol.Name]) + "." + i(b) : i(y) + "." + i(d.table[j.Symbol.Name]) + "." + i(b),
          params: []
        };
      }
      if (M(d, Ve)) {
        const b = d[le].schema, y = d[le].name;
        return {
          sql: b === void 0 || d[le].isAlias ? i(y) : i(b) + "." + i(y),
          params: []
        };
      }
      if (M(d, Me)) {
        if (M(d.value, nt))
          return { sql: u(m.value++, d), params: [d], typings: ["none"] };
        const b = d.value === null ? null : d.encoder.mapToDriverValue(d.value);
        if (M(b, z))
          return this.buildQueryFromSourceParams([b], n);
        if (h)
          return { sql: this.mapInlineParam(b, n), params: [] };
        let y = ["none"];
        return o && (y = [o(d.encoder)]), { sql: u(m.value++, b), params: [b], typings: y };
      }
      return M(d, nt) ? { sql: u(m.value++, d), params: [d], typings: ["none"] } : M(d, z.Aliased) && d.fieldAlias !== void 0 ? { sql: i(d.fieldAlias), params: [] } : M(d, Te) ? d._.isWith ? { sql: i(d._.alias), params: [] } : this.buildQueryFromSourceParams([
        new ge("("),
        d._.sql,
        new ge(") "),
        new wr(d._.alias)
      ], n) : xi(d) ? d.schema ? { sql: i(d.schema) + "." + i(d.enumName), params: [] } : { sql: i(d.enumName), params: [] } : Tn(d) ? d.shouldOmitSQLParens?.() ? this.buildQueryFromSourceParams([d.getSQL()], n) : this.buildQueryFromSourceParams([
        new ge("("),
        d.getSQL(),
        new ge(")")
      ], n) : h ? { sql: this.mapInlineParam(d, n), params: [] } : { sql: u(m.value++, d), params: [d], typings: ["none"] };
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
      const n = e.toString();
      return t(n === "[object Object]" ? JSON.stringify(e) : n);
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
class wr {
  constructor(e) {
    this.value = e;
  }
  static [L] = "Name";
  brand;
  getSQL() {
    return new z([this]);
  }
}
function Li(r) {
  return typeof r == "object" && r !== null && "mapToDriverValue" in r && typeof r.mapToDriverValue == "function";
}
const An = {
  mapFromDriverValue: (r) => r
}, xn = {
  mapToDriverValue: (r) => r
};
({
  ...An,
  ...xn
});
class Me {
  /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */
  constructor(e, t = xn) {
    this.value = e, this.encoder = t;
  }
  static [L] = "Param";
  brand;
  getSQL() {
    return new z([this]);
  }
}
function I(r, ...e) {
  const t = [];
  (e.length > 0 || r.length > 0 && r[0] !== "") && t.push(new ge(r[0]));
  for (const [n, s] of e.entries())
    t.push(s, new ge(r[n + 1]));
  return new z(t);
}
((r) => {
  function e() {
    return new z([]);
  }
  r.empty = e;
  function t(h) {
    return new z(h);
  }
  r.fromList = t;
  function n(h) {
    return new z([new ge(h)]);
  }
  r.raw = n;
  function s(h, m) {
    const d = [];
    for (const [b, y] of h.entries())
      b > 0 && m !== void 0 && d.push(m), d.push(y);
    return new z(d);
  }
  r.join = s;
  function i(h) {
    return new wr(h);
  }
  r.identifier = i;
  function u(h) {
    return new nt(h);
  }
  r.placeholder = u;
  function o(h, m) {
    return new Me(h, m);
  }
  r.param = o;
})(I || (I = {}));
((r) => {
  class e {
    constructor(n, s) {
      this.sql = n, this.fieldAlias = s;
    }
    static [L] = "SQL.Aliased";
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
  r.Aliased = e;
})(z || (z = {}));
class nt {
  constructor(e) {
    this.name = e;
  }
  static [L] = "Placeholder";
  getSQL() {
    return new z([this]);
  }
}
function lr(r, e) {
  return r.map((t) => {
    if (M(t, nt)) {
      if (!(t.name in e))
        throw new Error(`No value for placeholder "${t.name}" was provided`);
      return e[t.name];
    }
    if (M(t, Me) && M(t.value, nt)) {
      if (!(t.value.name in e))
        throw new Error(`No value for placeholder "${t.value.name}" was provided`);
      return t.encoder.mapToDriverValue(e[t.value.name]);
    }
    return t;
  });
}
const Bi = Symbol.for("drizzle:IsDrizzleView");
class Ve {
  static [L] = "View";
  /** @internal */
  [le];
  /** @internal */
  [Bi] = !0;
  constructor({ name: e, schema: t, selectedFields: n, query: s }) {
    this[le] = {
      name: e,
      originalName: e,
      schema: t,
      selectedFields: n,
      query: s,
      isExisting: !s,
      isAlias: !1
    };
  }
  getSQL() {
    return new z([this]);
  }
}
he.prototype.getSQL = function() {
  return new z([this]);
};
j.prototype.getSQL = function() {
  return new z([this]);
};
Te.prototype.getSQL = function() {
  return new z([this]);
};
class Dt {
  constructor(e) {
    this.table = e;
  }
  static [L] = "ColumnAliasProxyHandler";
  get(e, t) {
    return t === "table" ? this.table : e[t];
  }
}
class Br {
  constructor(e, t) {
    this.alias = e, this.replaceOriginalName = t;
  }
  static [L] = "TableAliasProxyHandler";
  get(e, t) {
    if (t === j.Symbol.IsAlias)
      return !0;
    if (t === j.Symbol.Name)
      return this.alias;
    if (this.replaceOriginalName && t === j.Symbol.OriginalName)
      return this.alias;
    if (t === le)
      return {
        ...e[le],
        name: this.alias,
        isAlias: !0
      };
    if (t === j.Symbol.Columns) {
      const s = e[j.Symbol.Columns];
      if (!s)
        return s;
      const i = {};
      return Object.keys(s).map((u) => {
        i[u] = new Proxy(
          s[u],
          new Dt(new Proxy(e, this))
        );
      }), i;
    }
    const n = e[t];
    return M(n, he) ? new Proxy(n, new Dt(new Proxy(e, this))) : n;
  }
}
function cr(r, e) {
  return new Proxy(r, new Br(e, !1));
}
function Be(r, e) {
  return new Proxy(
    r,
    new Dt(new Proxy(r.table, new Br(e, !1)))
  );
}
function In(r, e) {
  return new z.Aliased(Mt(r.sql, e), r.fieldAlias);
}
function Mt(r, e) {
  return I.join(r.queryChunks.map((t) => M(t, he) ? Be(t, e) : M(t, z) ? Mt(t, e) : M(t, z.Aliased) ? In(t, e) : t));
}
class Ri extends Error {
  static [L] = "DrizzleError";
  constructor({ message: e, cause: t }) {
    super(e), this.name = "DrizzleError", this.cause = t;
  }
}
class Oi {
  static [L] = "ConsoleLogWriter";
  write(e) {
    console.log(e);
  }
}
class $i {
  static [L] = "DefaultLogger";
  writer;
  constructor(e) {
    this.writer = e?.writer ?? new Oi();
  }
  logQuery(e, t) {
    const n = t.map((i) => {
      try {
        return JSON.stringify(i);
      } catch {
        return String(i);
      }
    }), s = n.length ? ` -- params: [${n.join(", ")}]` : "";
    this.writer.write(`Query: ${e}${s}`);
  }
}
class ki {
  static [L] = "NoopLogger";
  logQuery() {
  }
}
class We {
  static [L] = "QueryPromise";
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
function Di(r, e, t) {
  const n = {}, s = r.reduce(
    (i, { path: u, field: o }, h) => {
      let m;
      M(o, he) ? m = o : M(o, z) ? m = o.decoder : m = o.sql.decoder;
      let d = i;
      for (const [b, y] of u.entries())
        if (b < u.length - 1)
          y in d || (d[y] = {}), d = d[y];
        else {
          const v = e[h], c = d[y] = v === null ? null : m.mapFromDriverValue(v);
          if (t && M(o, he) && u.length === 2) {
            const f = u[0];
            f in n ? typeof n[f] == "string" && n[f] !== Re(o.table) && (n[f] = !1) : n[f] = c === null ? Re(o.table) : !1;
          }
        }
      return i;
    },
    {}
  );
  if (t && Object.keys(n).length > 0)
    for (const [i, u] of Object.entries(n))
      typeof u == "string" && !t[u] && (s[i] = null);
  return s;
}
function je(r, e) {
  return Object.entries(r).reduce((t, [n, s]) => {
    if (typeof n != "string")
      return t;
    const i = e ? [...e, n] : [n];
    return M(s, he) || M(s, z) || M(s, z.Aliased) ? t.push({ path: i, field: s }) : M(s, j) ? t.push(...je(s[j.Symbol.Columns], i)) : t.push(...je(s, i)), t;
  }, []);
}
function Rr(r, e) {
  const t = Object.keys(r), n = Object.keys(e);
  if (t.length !== n.length)
    return !1;
  for (const [s, i] of t.entries())
    if (i !== n[s])
      return !1;
  return !0;
}
function Nn(r, e) {
  const t = Object.entries(e).filter(([, n]) => n !== void 0).map(([n, s]) => M(s, z) || M(s, he) ? [n, s] : [n, new Me(s, r[j.Symbol.Columns][n])]);
  if (t.length === 0)
    throw new Error("No values to set");
  return Object.fromEntries(t);
}
function Mi(r, e) {
  for (const t of e)
    for (const n of Object.getOwnPropertyNames(t.prototype))
      n !== "constructor" && Object.defineProperty(
        r.prototype,
        n,
        Object.getOwnPropertyDescriptor(t.prototype, n) || /* @__PURE__ */ Object.create(null)
      );
}
function Qi(r) {
  return r[j.Symbol.Columns];
}
function Fe(r) {
  return M(r, Te) ? r._.alias : M(r, Ve) ? r[le].name : M(r, z) ? void 0 : r[j.Symbol.IsAlias] ? r[j.Symbol.Name] : r[j.Symbol.BaseName];
}
function de(r, e) {
  return {
    name: typeof r == "string" && r.length > 0 ? r : "",
    config: typeof r == "object" ? r : e
  };
}
function qi(r) {
  if (typeof r != "object" || r === null || r.constructor.name !== "Object")
    return !1;
  if ("logger" in r) {
    const e = typeof r.logger;
    return !(e !== "boolean" && (e !== "object" || typeof r.logger.logQuery != "function") && e !== "undefined");
  }
  if ("schema" in r) {
    const e = typeof r.schema;
    return !(e !== "object" && e !== "undefined");
  }
  if ("casing" in r) {
    const e = typeof r.casing;
    return !(e !== "string" && e !== "undefined");
  }
  if ("mode" in r)
    return !(r.mode !== "default" || r.mode !== "planetscale" || r.mode !== void 0);
  if ("connection" in r) {
    const e = typeof r.connection;
    return !(e !== "string" && e !== "object" && e !== "undefined");
  }
  if ("client" in r) {
    const e = typeof r.client;
    return !(e !== "object" && e !== "function" && e !== "undefined");
  }
  return Object.keys(r).length === 0;
}
class Ut extends re {
  static [L] = "PgIntColumnBaseBuilder";
  generatedAlwaysAsIdentity(e) {
    if (e) {
      const { name: t, ...n } = e;
      this.config.generatedIdentity = {
        type: "always",
        sequenceName: t,
        sequenceOptions: n
      };
    } else
      this.config.generatedIdentity = {
        type: "always"
      };
    return this.config.hasDefault = !0, this.config.notNull = !0, this;
  }
  generatedByDefaultAsIdentity(e) {
    if (e) {
      const { name: t, ...n } = e;
      this.config.generatedIdentity = {
        type: "byDefault",
        sequenceName: t,
        sequenceOptions: n
      };
    } else
      this.config.generatedIdentity = {
        type: "byDefault"
      };
    return this.config.hasDefault = !0, this.config.notNull = !0, this;
  }
}
class Fi extends Ut {
  static [L] = "PgBigInt53Builder";
  constructor(e) {
    super(e, "number", "PgBigInt53");
  }
  /** @internal */
  build(e) {
    return new Ui(e, this.config);
  }
}
class Ui extends X {
  static [L] = "PgBigInt53";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(e) {
    return typeof e == "number" ? e : Number(e);
  }
}
class ji extends Ut {
  static [L] = "PgBigInt64Builder";
  constructor(e) {
    super(e, "bigint", "PgBigInt64");
  }
  /** @internal */
  build(e) {
    return new zi(
      e,
      this.config
    );
  }
}
class zi extends X {
  static [L] = "PgBigInt64";
  getSQLType() {
    return "bigint";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function Vi(r, e) {
  const { name: t, config: n } = de(r, e);
  return n.mode === "number" ? new Fi(t) : new ji(t);
}
class Wi extends re {
  static [L] = "PgBigSerial53Builder";
  constructor(e) {
    super(e, "number", "PgBigSerial53"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new Hi(
      e,
      this.config
    );
  }
}
class Hi extends X {
  static [L] = "PgBigSerial53";
  getSQLType() {
    return "bigserial";
  }
  mapFromDriverValue(e) {
    return typeof e == "number" ? e : Number(e);
  }
}
class Ki extends re {
  static [L] = "PgBigSerial64Builder";
  constructor(e) {
    super(e, "bigint", "PgBigSerial64"), this.config.hasDefault = !0;
  }
  /** @internal */
  build(e) {
    return new Gi(
      e,
      this.config
    );
  }
}
class Gi extends X {
  static [L] = "PgBigSerial64";
  getSQLType() {
    return "bigserial";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function Ji(r, e) {
  const { name: t, config: n } = de(r, e);
  return n.mode === "number" ? new Wi(t) : new Ki(t);
}
class Yi extends re {
  static [L] = "PgBooleanBuilder";
  constructor(e) {
    super(e, "boolean", "PgBoolean");
  }
  /** @internal */
  build(e) {
    return new Xi(e, this.config);
  }
}
class Xi extends X {
  static [L] = "PgBoolean";
  getSQLType() {
    return "boolean";
  }
}
function Zi(r) {
  return new Yi(r ?? "");
}
class eo extends re {
  static [L] = "PgCharBuilder";
  constructor(e, t) {
    super(e, "string", "PgChar"), this.config.length = t.length, this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new to(
      e,
      this.config
    );
  }
}
class to extends X {
  static [L] = "PgChar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? "char" : `char(${this.length})`;
  }
}
function ro(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new eo(t, n);
}
class no extends re {
  static [L] = "PgCidrBuilder";
  constructor(e) {
    super(e, "string", "PgCidr");
  }
  /** @internal */
  build(e) {
    return new so(e, this.config);
  }
}
class so extends X {
  static [L] = "PgCidr";
  getSQLType() {
    return "cidr";
  }
}
function io(r) {
  return new no(r ?? "");
}
class oo extends re {
  static [L] = "PgCustomColumnBuilder";
  constructor(e, t, n) {
    super(e, "custom", "PgCustomColumn"), this.config.fieldConfig = t, this.config.customTypeParams = n;
  }
  /** @internal */
  build(e) {
    return new ao(
      e,
      this.config
    );
  }
}
class ao extends X {
  static [L] = "PgCustomColumn";
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
function uo(r) {
  return (e, t) => {
    const { name: n, config: s } = de(e, t);
    return new oo(n, s, r);
  };
}
class vt extends re {
  static [L] = "PgDateColumnBaseBuilder";
  defaultNow() {
    return this.default(I`now()`);
  }
}
class lo extends vt {
  static [L] = "PgDateBuilder";
  constructor(e) {
    super(e, "date", "PgDate");
  }
  /** @internal */
  build(e) {
    return new Ln(e, this.config);
  }
}
class Ln extends X {
  static [L] = "PgDate";
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
class co extends vt {
  static [L] = "PgDateStringBuilder";
  constructor(e) {
    super(e, "string", "PgDateString");
  }
  /** @internal */
  build(e) {
    return new Bn(
      e,
      this.config
    );
  }
}
class Bn extends X {
  static [L] = "PgDateString";
  getSQLType() {
    return "date";
  }
}
function Rn(r, e) {
  const { name: t, config: n } = de(r, e);
  return n?.mode === "date" ? new lo(t) : new co(t);
}
class ho extends re {
  static [L] = "PgDoublePrecisionBuilder";
  constructor(e) {
    super(e, "number", "PgDoublePrecision");
  }
  /** @internal */
  build(e) {
    return new fo(
      e,
      this.config
    );
  }
}
class fo extends X {
  static [L] = "PgDoublePrecision";
  getSQLType() {
    return "double precision";
  }
  mapFromDriverValue(e) {
    return typeof e == "string" ? Number.parseFloat(e) : e;
  }
}
function po(r) {
  return new ho(r ?? "");
}
class go extends re {
  static [L] = "PgInetBuilder";
  constructor(e) {
    super(e, "string", "PgInet");
  }
  /** @internal */
  build(e) {
    return new mo(e, this.config);
  }
}
class mo extends X {
  static [L] = "PgInet";
  getSQLType() {
    return "inet";
  }
}
function yo(r) {
  return new go(r ?? "");
}
class wo extends Ut {
  static [L] = "PgIntegerBuilder";
  constructor(e) {
    super(e, "number", "PgInteger");
  }
  /** @internal */
  build(e) {
    return new bo(e, this.config);
  }
}
class bo extends X {
  static [L] = "PgInteger";
  getSQLType() {
    return "integer";
  }
  mapFromDriverValue(e) {
    return typeof e == "string" ? Number.parseInt(e) : e;
  }
}
function Oe(r) {
  return new wo(r ?? "");
}
class vo extends re {
  static [L] = "PgIntervalBuilder";
  constructor(e, t) {
    super(e, "string", "PgInterval"), this.config.intervalConfig = t;
  }
  /** @internal */
  build(e) {
    return new So(e, this.config);
  }
}
class So extends X {
  static [L] = "PgInterval";
  fields = this.config.intervalConfig.fields;
  precision = this.config.intervalConfig.precision;
  getSQLType() {
    const e = this.fields ? ` ${this.fields}` : "", t = this.precision ? `(${this.precision})` : "";
    return `interval${e}${t}`;
  }
}
function Po(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new vo(t, n);
}
class Eo extends re {
  static [L] = "PgJsonBuilder";
  constructor(e) {
    super(e, "json", "PgJson");
  }
  /** @internal */
  build(e) {
    return new On(e, this.config);
  }
}
class On extends X {
  static [L] = "PgJson";
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
function _o(r) {
  return new Eo(r ?? "");
}
class Co extends re {
  static [L] = "PgJsonbBuilder";
  constructor(e) {
    super(e, "json", "PgJsonb");
  }
  /** @internal */
  build(e) {
    return new $n(e, this.config);
  }
}
class $n extends X {
  static [L] = "PgJsonb";
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
function To(r) {
  return new Co(r ?? "");
}
class Ao extends re {
  static [L] = "PgLineBuilder";
  constructor(e) {
    super(e, "array", "PgLine");
  }
  /** @internal */
  build(e) {
    return new xo(
      e,
      this.config
    );
  }
}
class xo extends X {
  static [L] = "PgLine";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(e) {
    const [t, n, s] = e.slice(1, -1).split(",");
    return [Number.parseFloat(t), Number.parseFloat(n), Number.parseFloat(s)];
  }
  mapToDriverValue(e) {
    return `{${e[0]},${e[1]},${e[2]}}`;
  }
}
class Io extends re {
  static [L] = "PgLineABCBuilder";
  constructor(e) {
    super(e, "json", "PgLineABC");
  }
  /** @internal */
  build(e) {
    return new No(
      e,
      this.config
    );
  }
}
class No extends X {
  static [L] = "PgLineABC";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(e) {
    const [t, n, s] = e.slice(1, -1).split(",");
    return { a: Number.parseFloat(t), b: Number.parseFloat(n), c: Number.parseFloat(s) };
  }
  mapToDriverValue(e) {
    return `{${e.a},${e.b},${e.c}}`;
  }
}
function Lo(r, e) {
  const { name: t, config: n } = de(r, e);
  return !n?.mode || n.mode === "tuple" ? new Ao(t) : new Io(t);
}
class Bo extends re {
  static [L] = "PgMacaddrBuilder";
  constructor(e) {
    super(e, "string", "PgMacaddr");
  }
  /** @internal */
  build(e) {
    return new Ro(e, this.config);
  }
}
class Ro extends X {
  static [L] = "PgMacaddr";
  getSQLType() {
    return "macaddr";
  }
}
function Oo(r) {
  return new Bo(r ?? "");
}
class $o extends re {
  static [L] = "PgMacaddr8Builder";
  constructor(e) {
    super(e, "string", "PgMacaddr8");
  }
  /** @internal */
  build(e) {
    return new ko(e, this.config);
  }
}
class ko extends X {
  static [L] = "PgMacaddr8";
  getSQLType() {
    return "macaddr8";
  }
}
function Do(r) {
  return new $o(r ?? "");
}
class Mo extends re {
  static [L] = "PgNumericBuilder";
  constructor(e, t, n) {
    super(e, "string", "PgNumeric"), this.config.precision = t, this.config.scale = n;
  }
  /** @internal */
  build(e) {
    return new kn(e, this.config);
  }
}
class kn extends X {
  static [L] = "PgNumeric";
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
class Qo extends re {
  static [L] = "PgNumericNumberBuilder";
  constructor(e, t, n) {
    super(e, "number", "PgNumericNumber"), this.config.precision = t, this.config.scale = n;
  }
  /** @internal */
  build(e) {
    return new qo(
      e,
      this.config
    );
  }
}
class qo extends X {
  static [L] = "PgNumericNumber";
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
class Fo extends re {
  static [L] = "PgNumericBigIntBuilder";
  constructor(e, t, n) {
    super(e, "bigint", "PgNumericBigInt"), this.config.precision = t, this.config.scale = n;
  }
  /** @internal */
  build(e) {
    return new Uo(
      e,
      this.config
    );
  }
}
class Uo extends X {
  static [L] = "PgNumericBigInt";
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
function jo(r, e) {
  const { name: t, config: n } = de(r, e), s = n?.mode;
  return s === "number" ? new Qo(t, n?.precision, n?.scale) : s === "bigint" ? new Fo(t, n?.precision, n?.scale) : new Mo(t, n?.precision, n?.scale);
}
class zo extends re {
  static [L] = "PgPointTupleBuilder";
  constructor(e) {
    super(e, "array", "PgPointTuple");
  }
  /** @internal */
  build(e) {
    return new Vo(
      e,
      this.config
    );
  }
}
class Vo extends X {
  static [L] = "PgPointTuple";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(e) {
    if (typeof e == "string") {
      const [t, n] = e.slice(1, -1).split(",");
      return [Number.parseFloat(t), Number.parseFloat(n)];
    }
    return [e.x, e.y];
  }
  mapToDriverValue(e) {
    return `(${e[0]},${e[1]})`;
  }
}
class Wo extends re {
  static [L] = "PgPointObjectBuilder";
  constructor(e) {
    super(e, "json", "PgPointObject");
  }
  /** @internal */
  build(e) {
    return new Ho(
      e,
      this.config
    );
  }
}
class Ho extends X {
  static [L] = "PgPointObject";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(e) {
    if (typeof e == "string") {
      const [t, n] = e.slice(1, -1).split(",");
      return { x: Number.parseFloat(t), y: Number.parseFloat(n) };
    }
    return e;
  }
  mapToDriverValue(e) {
    return `(${e.x},${e.y})`;
  }
}
function Ko(r, e) {
  const { name: t, config: n } = de(r, e);
  return !n?.mode || n.mode === "tuple" ? new zo(t) : new Wo(t);
}
function Go(r) {
  const e = [];
  for (let t = 0; t < r.length; t += 2)
    e.push(Number.parseInt(r.slice(t, t + 2), 16));
  return new Uint8Array(e);
}
function cn(r, e) {
  const t = new ArrayBuffer(8), n = new DataView(t);
  for (let s = 0; s < 8; s++)
    n.setUint8(s, r[e + s]);
  return n.getFloat64(0, !0);
}
function Dn(r) {
  const e = Go(r);
  let t = 0;
  const n = e[t];
  t += 1;
  const s = new DataView(e.buffer), i = s.getUint32(t, n === 1);
  if (t += 4, i & 536870912 && (s.getUint32(t, n === 1), t += 4), (i & 65535) === 1) {
    const u = cn(e, t);
    t += 8;
    const o = cn(e, t);
    return t += 8, [u, o];
  }
  throw new Error("Unsupported geometry type");
}
class Jo extends re {
  static [L] = "PgGeometryBuilder";
  constructor(e) {
    super(e, "array", "PgGeometry");
  }
  /** @internal */
  build(e) {
    return new Yo(
      e,
      this.config
    );
  }
}
class Yo extends X {
  static [L] = "PgGeometry";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(e) {
    return Dn(e);
  }
  mapToDriverValue(e) {
    return `point(${e[0]} ${e[1]})`;
  }
}
class Xo extends re {
  static [L] = "PgGeometryObjectBuilder";
  constructor(e) {
    super(e, "json", "PgGeometryObject");
  }
  /** @internal */
  build(e) {
    return new Zo(
      e,
      this.config
    );
  }
}
class Zo extends X {
  static [L] = "PgGeometryObject";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(e) {
    const t = Dn(e);
    return { x: t[0], y: t[1] };
  }
  mapToDriverValue(e) {
    return `point(${e.x} ${e.y})`;
  }
}
function ea(r, e) {
  const { name: t, config: n } = de(r, e);
  return !n?.mode || n.mode === "tuple" ? new Jo(t) : new Xo(t);
}
class ta extends re {
  static [L] = "PgRealBuilder";
  constructor(e, t) {
    super(e, "number", "PgReal"), this.config.length = t;
  }
  /** @internal */
  build(e) {
    return new ra(e, this.config);
  }
}
class ra extends X {
  static [L] = "PgReal";
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return "real";
  }
  mapFromDriverValue = (e) => typeof e == "string" ? Number.parseFloat(e) : e;
}
function na(r) {
  return new ta(r ?? "");
}
class sa extends re {
  static [L] = "PgSerialBuilder";
  constructor(e) {
    super(e, "number", "PgSerial"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new ia(e, this.config);
  }
}
class ia extends X {
  static [L] = "PgSerial";
  getSQLType() {
    return "serial";
  }
}
function oa(r) {
  return new sa(r ?? "");
}
class aa extends Ut {
  static [L] = "PgSmallIntBuilder";
  constructor(e) {
    super(e, "number", "PgSmallInt");
  }
  /** @internal */
  build(e) {
    return new ua(e, this.config);
  }
}
class ua extends X {
  static [L] = "PgSmallInt";
  getSQLType() {
    return "smallint";
  }
  mapFromDriverValue = (e) => typeof e == "string" ? Number(e) : e;
}
function la(r) {
  return new aa(r ?? "");
}
class ca extends re {
  static [L] = "PgSmallSerialBuilder";
  constructor(e) {
    super(e, "number", "PgSmallSerial"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new ha(
      e,
      this.config
    );
  }
}
class ha extends X {
  static [L] = "PgSmallSerial";
  getSQLType() {
    return "smallserial";
  }
}
function fa(r) {
  return new ca(r ?? "");
}
class da extends re {
  static [L] = "PgTextBuilder";
  constructor(e, t) {
    super(e, "string", "PgText"), this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new pa(e, this.config);
  }
}
class pa extends X {
  static [L] = "PgText";
  enumValues = this.config.enumValues;
  getSQLType() {
    return "text";
  }
}
function ga(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new da(t, n);
}
class ma extends vt {
  constructor(e, t, n) {
    super(e, "string", "PgTime"), this.withTimezone = t, this.precision = n, this.config.withTimezone = t, this.config.precision = n;
  }
  static [L] = "PgTimeBuilder";
  /** @internal */
  build(e) {
    return new Mn(e, this.config);
  }
}
class Mn extends X {
  static [L] = "PgTime";
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t), this.withTimezone = t.withTimezone, this.precision = t.precision;
  }
  getSQLType() {
    return `time${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
}
function ya(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new ma(t, n.withTimezone ?? !1, n.precision);
}
class wa extends vt {
  static [L] = "PgTimestampBuilder";
  constructor(e, t, n) {
    super(e, "date", "PgTimestamp"), this.config.withTimezone = t, this.config.precision = n;
  }
  /** @internal */
  build(e) {
    return new Qn(e, this.config);
  }
}
class Qn extends X {
  static [L] = "PgTimestamp";
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
class ba extends vt {
  static [L] = "PgTimestampStringBuilder";
  constructor(e, t, n) {
    super(e, "string", "PgTimestampString"), this.config.withTimezone = t, this.config.precision = n;
  }
  /** @internal */
  build(e) {
    return new qn(
      e,
      this.config
    );
  }
}
class qn extends X {
  static [L] = "PgTimestampString";
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t), this.withTimezone = t.withTimezone, this.precision = t.precision;
  }
  getSQLType() {
    return `timestamp${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
}
function Lt(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return n?.mode === "string" ? new ba(t, n.withTimezone ?? !1, n.precision) : new wa(t, n?.withTimezone ?? !1, n?.precision);
}
class va extends re {
  static [L] = "PgUUIDBuilder";
  constructor(e) {
    super(e, "string", "PgUUID");
  }
  /**
   * Adds `default gen_random_uuid()` to the column definition.
   */
  defaultRandom() {
    return this.default(I`gen_random_uuid()`);
  }
  /** @internal */
  build(e) {
    return new Fn(e, this.config);
  }
}
class Fn extends X {
  static [L] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
}
function Un(r) {
  return new va(r ?? "");
}
class Sa extends re {
  static [L] = "PgVarcharBuilder";
  constructor(e, t) {
    super(e, "string", "PgVarchar"), this.config.length = t.length, this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new Pa(
      e,
      this.config
    );
  }
}
class Pa extends X {
  static [L] = "PgVarchar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? "varchar" : `varchar(${this.length})`;
  }
}
function wt(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new Sa(t, n);
}
class Ea extends re {
  static [L] = "PgBinaryVectorBuilder";
  constructor(e, t) {
    super(e, "string", "PgBinaryVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new _a(
      e,
      this.config
    );
  }
}
class _a extends X {
  static [L] = "PgBinaryVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `bit(${this.dimensions})`;
  }
}
function Ca(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Ea(t, n);
}
class Ta extends re {
  static [L] = "PgHalfVectorBuilder";
  constructor(e, t) {
    super(e, "array", "PgHalfVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new Aa(
      e,
      this.config
    );
  }
}
class Aa extends X {
  static [L] = "PgHalfVector";
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
function xa(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Ta(t, n);
}
class Ia extends re {
  static [L] = "PgSparseVectorBuilder";
  constructor(e, t) {
    super(e, "string", "PgSparseVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new Na(
      e,
      this.config
    );
  }
}
class Na extends X {
  static [L] = "PgSparseVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `sparsevec(${this.dimensions})`;
  }
}
function La(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Ia(t, n);
}
class Ba extends re {
  static [L] = "PgVectorBuilder";
  constructor(e, t) {
    super(e, "array", "PgVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new Ra(
      e,
      this.config
    );
  }
}
class Ra extends X {
  static [L] = "PgVector";
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
function Oa(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Ba(t, n);
}
function $a() {
  return {
    bigint: Vi,
    bigserial: Ji,
    boolean: Zi,
    char: ro,
    cidr: io,
    customType: uo,
    date: Rn,
    doublePrecision: po,
    inet: yo,
    integer: Oe,
    interval: Po,
    json: _o,
    jsonb: To,
    line: Lo,
    macaddr: Oo,
    macaddr8: Do,
    numeric: jo,
    point: Ko,
    geometry: ea,
    real: na,
    serial: oa,
    smallint: la,
    smallserial: fa,
    text: ga,
    time: ya,
    timestamp: Lt,
    uuid: Un,
    varchar: wt,
    bit: Ca,
    halfvec: xa,
    sparsevec: La,
    vector: Oa
  };
}
const br = Symbol.for("drizzle:PgInlineForeignKeys"), hn = Symbol.for("drizzle:EnableRLS");
class Pe extends j {
  static [L] = "PgTable";
  /** @internal */
  static Symbol = Object.assign({}, j.Symbol, {
    InlineForeignKeys: br,
    EnableRLS: hn
  });
  /**@internal */
  [br] = [];
  /** @internal */
  [hn] = !1;
  /** @internal */
  [j.Symbol.ExtraConfigBuilder] = void 0;
  /** @internal */
  [j.Symbol.ExtraConfigColumns] = {};
}
function ka(r, e, t, n, s = r) {
  const i = new Pe(r, n, s), u = typeof e == "function" ? e($a()) : e, o = Object.fromEntries(
    Object.entries(u).map(([d, b]) => {
      const y = b;
      y.setName(d);
      const v = y.build(i);
      return i[br].push(...y.buildForeignKeys(v, i)), [d, v];
    })
  ), h = Object.fromEntries(
    Object.entries(u).map(([d, b]) => {
      const y = b;
      y.setName(d);
      const v = y.buildExtraConfigColumn(i);
      return [d, v];
    })
  ), m = Object.assign(i, o);
  return m[j.Symbol.Columns] = o, m[j.Symbol.ExtraConfigColumns] = h, t && (m[Pe.Symbol.ExtraConfigBuilder] = t), Object.assign(m, {
    enableRLS: () => (m[Pe.Symbol.EnableRLS] = !0, m)
  });
}
const ot = (r, e, t) => ka(r, e, t, void 0);
function Da(...r) {
  return r[0].columns ? new vr(r[0].columns, r[0].name) : new vr(r);
}
class vr {
  static [L] = "PgPrimaryKeyBuilder";
  /** @internal */
  columns;
  /** @internal */
  name;
  constructor(e, t) {
    this.columns = e, this.name = t;
  }
  /** @internal */
  build(e) {
    return new Ma(e, this.columns, this.name);
  }
}
class Ma {
  constructor(e, t, n) {
    this.table = e, this.columns = t, this.name = n;
  }
  static [L] = "PgPrimaryKey";
  columns;
  name;
  getName() {
    return this.name ?? `${this.table[Pe.Symbol.Name]}_${this.columns.map((e) => e.name).join("_")}_pk`;
  }
}
function ye(r, e) {
  return Li(e) && !Tn(r) && !M(r, Me) && !M(r, nt) && !M(r, he) && !M(r, j) && !M(r, Ve) ? new Me(r, e) : r;
}
const Qe = (r, e) => I`${r} = ${ye(e, r)}`, Qa = (r, e) => I`${r} <> ${ye(e, r)}`;
function Qt(...r) {
  const e = r.filter(
    (t) => t !== void 0
  );
  if (e.length !== 0)
    return e.length === 1 ? new z(e) : new z([
      new ge("("),
      I.join(e, new ge(" and ")),
      new ge(")")
    ]);
}
function qa(...r) {
  const e = r.filter(
    (t) => t !== void 0
  );
  if (e.length !== 0)
    return e.length === 1 ? new z(e) : new z([
      new ge("("),
      I.join(e, new ge(" or ")),
      new ge(")")
    ]);
}
function Fa(r) {
  return I`not ${r}`;
}
const Ua = (r, e) => I`${r} > ${ye(e, r)}`, ja = (r, e) => I`${r} >= ${ye(e, r)}`, za = (r, e) => I`${r} < ${ye(e, r)}`, Va = (r, e) => I`${r} <= ${ye(e, r)}`;
function Wa(r, e) {
  return Array.isArray(e) ? e.length === 0 ? I`false` : I`${r} in ${e.map((t) => ye(t, r))}` : I`${r} in ${ye(e, r)}`;
}
function Ha(r, e) {
  return Array.isArray(e) ? e.length === 0 ? I`true` : I`${r} not in ${e.map((t) => ye(t, r))}` : I`${r} not in ${ye(e, r)}`;
}
function Ka(r) {
  return I`${r} is null`;
}
function Ga(r) {
  return I`${r} is not null`;
}
function Ja(r) {
  return I`exists ${r}`;
}
function Ya(r) {
  return I`not exists ${r}`;
}
function Xa(r, e, t) {
  return I`${r} between ${ye(e, r)} and ${ye(
    t,
    r
  )}`;
}
function Za(r, e, t) {
  return I`${r} not between ${ye(
    e,
    r
  )} and ${ye(t, r)}`;
}
function eu(r, e) {
  return I`${r} like ${e}`;
}
function tu(r, e) {
  return I`${r} not like ${e}`;
}
function ru(r, e) {
  return I`${r} ilike ${e}`;
}
function nu(r, e) {
  return I`${r} not ilike ${e}`;
}
function jn(r) {
  return I`${r} asc`;
}
function zn(r) {
  return I`${r} desc`;
}
class Vn {
  constructor(e, t, n) {
    this.sourceTable = e, this.referencedTable = t, this.relationName = n, this.referencedTableName = t[j.Symbol.Name];
  }
  static [L] = "Relation";
  referencedTableName;
  fieldName;
}
class su {
  constructor(e, t) {
    this.table = e, this.config = t;
  }
  static [L] = "Relations";
}
class ze extends Vn {
  constructor(e, t, n, s) {
    super(e, t, n?.relationName), this.config = n, this.isNullable = s;
  }
  static [L] = "One";
  withFieldName(e) {
    const t = new ze(
      this.sourceTable,
      this.referencedTable,
      this.config,
      this.isNullable
    );
    return t.fieldName = e, t;
  }
}
class jt extends Vn {
  constructor(e, t, n) {
    super(e, t, n?.relationName), this.config = n;
  }
  static [L] = "Many";
  withFieldName(e) {
    const t = new jt(
      this.sourceTable,
      this.referencedTable,
      this.config
    );
    return t.fieldName = e, t;
  }
}
function iu() {
  return {
    and: Qt,
    between: Xa,
    eq: Qe,
    exists: Ja,
    gt: Ua,
    gte: ja,
    ilike: ru,
    inArray: Wa,
    isNull: Ka,
    isNotNull: Ga,
    like: eu,
    lt: za,
    lte: Va,
    ne: Qa,
    not: Fa,
    notBetween: Za,
    notExists: Ya,
    notLike: tu,
    notIlike: nu,
    notInArray: Ha,
    or: qa,
    sql: I
  };
}
function ou() {
  return {
    sql: I,
    asc: jn,
    desc: zn
  };
}
function au(r, e) {
  Object.keys(r).length === 1 && "default" in r && !M(r.default, j) && (r = r.default);
  const t = {}, n = {}, s = {};
  for (const [i, u] of Object.entries(r))
    if (M(u, j)) {
      const o = yt(u), h = n[o];
      t[o] = i, s[i] = {
        tsName: i,
        dbName: u[j.Symbol.Name],
        schema: u[j.Symbol.Schema],
        columns: u[j.Symbol.Columns],
        relations: h?.relations ?? {},
        primaryKey: h?.primaryKey ?? []
      };
      for (const d of Object.values(
        u[j.Symbol.Columns]
      ))
        d.primary && s[i].primaryKey.push(d);
      const m = u[j.Symbol.ExtraConfigBuilder]?.(u[j.Symbol.ExtraConfigColumns]);
      if (m)
        for (const d of Object.values(m))
          M(d, vr) && s[i].primaryKey.push(...d.columns);
    } else if (M(u, su)) {
      const o = yt(u.table), h = t[o], m = u.config(
        e(u.table)
      );
      let d;
      for (const [b, y] of Object.entries(m))
        if (h) {
          const v = s[h];
          v.relations[b] = y;
        } else
          o in n || (n[o] = {
            relations: {},
            primaryKey: d
          }), n[o].relations[b] = y;
    }
  return { tables: s, tableNamesMap: t };
}
function uu(r) {
  return function(t, n) {
    return new ze(
      r,
      t,
      n,
      n?.fields.reduce((s, i) => s && i.notNull, !0) ?? !1
    );
  };
}
function lu(r) {
  return function(t, n) {
    return new jt(r, t, n);
  };
}
function cu(r, e, t) {
  if (M(t, ze) && t.config)
    return {
      fields: t.config.fields,
      references: t.config.references
    };
  const n = e[yt(t.referencedTable)];
  if (!n)
    throw new Error(
      `Table "${t.referencedTable[j.Symbol.Name]}" not found in schema`
    );
  const s = r[n];
  if (!s)
    throw new Error(`Table "${n}" not found in schema`);
  const i = t.sourceTable, u = e[yt(i)];
  if (!u)
    throw new Error(
      `Table "${i[j.Symbol.Name]}" not found in schema`
    );
  const o = [];
  for (const h of Object.values(
    s.relations
  ))
    (t.relationName && t !== h && h.relationName === t.relationName || !t.relationName && h.referencedTable === t.sourceTable) && o.push(h);
  if (o.length > 1)
    throw t.relationName ? new Error(
      `There are multiple relations with name "${t.relationName}" in table "${n}"`
    ) : new Error(
      `There are multiple relations between "${n}" and "${t.sourceTable[j.Symbol.Name]}". Please specify relation name`
    );
  if (o[0] && M(o[0], ze) && o[0].config)
    return {
      fields: o[0].config.references,
      references: o[0].config.fields
    };
  throw new Error(
    `There is not enough information to infer relation "${u}.${t.fieldName}"`
  );
}
function hu(r) {
  return {
    one: uu(r),
    many: lu(r)
  };
}
function Sr(r, e, t, n, s = (i) => i) {
  const i = {};
  for (const [
    u,
    o
  ] of n.entries())
    if (o.isJson) {
      const h = e.relations[o.tsKey], m = t[u], d = typeof m == "string" ? JSON.parse(m) : m;
      i[o.tsKey] = M(h, ze) ? d && Sr(
        r,
        r[o.relationTableTsKey],
        d,
        o.selection,
        s
      ) : d.map(
        (b) => Sr(
          r,
          r[o.relationTableTsKey],
          b,
          o.selection,
          s
        )
      );
    } else {
      const h = s(t[u]), m = o.field;
      let d;
      M(m, he) ? d = m : M(m, z) ? d = m.decoder : d = m.sql.decoder, i[o.tsKey] = h === null ? null : d.mapFromDriverValue(h);
    }
  return i;
}
class fu {
  constructor(e, t) {
    this.name = e, this.value = t;
  }
  static [L] = "PgCheckBuilder";
  brand;
  /** @internal */
  build(e) {
    return new du(e, this);
  }
}
class du {
  constructor(e, t) {
    this.table = e, this.name = t.name, this.value = t.value;
  }
  static [L] = "PgCheck";
  name;
  value;
}
function Wn(r, e) {
  return new fu(r, e);
}
class me {
  static [L] = "SelectionProxyHandler";
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
    if (t === le)
      return {
        ...e[le],
        selectedFields: new Proxy(
          e[le].selectedFields,
          this
        )
      };
    if (typeof t == "symbol")
      return e[t];
    const s = (M(e, Te) ? e._.selectedFields : M(e, Ve) ? e[le].selectedFields : e)[t];
    if (M(s, z.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !s.isSelectionField)
        return s.sql;
      const i = s.clone();
      return i.isSelectionField = !0, i;
    }
    if (M(s, z)) {
      if (this.config.sqlBehavior === "sql")
        return s;
      throw new Error(
        `You tried to reference "${t}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
      );
    }
    return M(s, he) ? this.config.alias ? new Proxy(
      s,
      new Dt(
        new Proxy(
          s.table,
          new Br(this.config.alias, this.config.replaceOriginalName ?? !1)
        )
      )
    ) : s : typeof s != "object" || s === null ? s : new Proxy(s, new me(this.config));
  }
}
class fn extends We {
  constructor(e, t, n, s) {
    super(), this.session = t, this.dialect = n, this.config = { table: e, withList: s };
  }
  static [L] = "PgDelete";
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
  returning(e = this.config.table[j.Symbol.Columns]) {
    return this.config.returningFields = e, this.config.returning = je(e), this;
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
    return Ee.startActiveSpan("drizzle.prepareQuery", () => this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, e, !0));
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => Ee.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new me({
        alias: Re(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
}
function pu(r) {
  return (r.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).map((t) => t.toLowerCase()).join("_");
}
function gu(r) {
  return (r.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).reduce((t, n, s) => {
    const i = s === 0 ? n.toLowerCase() : `${n[0].toUpperCase()}${n.slice(1)}`;
    return t + i;
  }, "");
}
function mu(r) {
  return r;
}
class yu {
  static [L] = "CasingCache";
  /** @internal */
  cache = {};
  cachedTables = {};
  convert;
  constructor(e) {
    this.convert = e === "snake_case" ? pu : e === "camelCase" ? gu : mu;
  }
  getColumnCasing(e) {
    if (!e.keyAsName)
      return e.name;
    const t = e.table[j.Symbol.Schema] ?? "public", n = e.table[j.Symbol.OriginalName], s = `${t}.${n}.${e.name}`;
    return this.cache[s] || this.cacheTable(e.table), this.cache[s];
  }
  cacheTable(e) {
    const t = e[j.Symbol.Schema] ?? "public", n = e[j.Symbol.OriginalName], s = `${t}.${n}`;
    if (!this.cachedTables[s]) {
      for (const i of Object.values(e[j.Symbol.Columns])) {
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
class Hn extends Ve {
  static [L] = "PgViewBase";
}
class Bt {
  static [L] = "PgDialect";
  /** @internal */
  casing;
  constructor(e) {
    this.casing = new yu(e?.casing);
  }
  async migrate(e, t, n) {
    const s = typeof n == "string" ? "__drizzle_migrations" : n.migrationsTable ?? "__drizzle_migrations", i = typeof n == "string" ? "drizzle" : n.migrationsSchema ?? "drizzle", u = I`
			CREATE TABLE IF NOT EXISTS ${I.identifier(i)}.${I.identifier(s)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
    await t.execute(I`CREATE SCHEMA IF NOT EXISTS ${I.identifier(i)}`), await t.execute(u);
    const h = (await t.all(
      I`select id, hash, created_at from ${I.identifier(i)}.${I.identifier(s)} order by created_at desc limit 1`
    ))[0];
    await t.transaction(async (m) => {
      for await (const d of e)
        if (!h || Number(h.created_at) < d.folderMillis) {
          for (const b of d.sql)
            await m.execute(I.raw(b));
          await m.execute(
            I`insert into ${I.identifier(i)}.${I.identifier(s)} ("hash", "created_at") values(${d.hash}, ${d.folderMillis})`
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
    const t = [I`with `];
    for (const [n, s] of e.entries())
      t.push(I`${I.identifier(s._.alias)} as (${s._.sql})`), n < e.length - 1 && t.push(I`, `);
    return t.push(I` `), I.join(t);
  }
  buildDeleteQuery({ table: e, where: t, returning: n, withList: s }) {
    const i = this.buildWithCTE(s), u = n ? I` returning ${this.buildSelection(n, { isSingleTable: !0 })}` : void 0, o = t ? I` where ${t}` : void 0;
    return I`${i}delete from ${e}${o}${u}`;
  }
  buildUpdateSet(e, t) {
    const n = e[j.Symbol.Columns], s = Object.keys(n).filter(
      (u) => t[u] !== void 0 || n[u]?.onUpdateFn !== void 0
    ), i = s.length;
    return I.join(s.flatMap((u, o) => {
      const h = n[u], m = t[u] ?? I.param(h.onUpdateFn(), h), d = I`${I.identifier(this.casing.getColumnCasing(h))} = ${m}`;
      return o < i - 1 ? [d, I.raw(", ")] : [d];
    }));
  }
  buildUpdateQuery({ table: e, set: t, where: n, returning: s, withList: i, from: u, joins: o }) {
    const h = this.buildWithCTE(i), m = e[Pe.Symbol.Name], d = e[Pe.Symbol.Schema], b = e[Pe.Symbol.OriginalName], y = m === b ? void 0 : m, v = I`${d ? I`${I.identifier(d)}.` : void 0}${I.identifier(b)}${y && I` ${I.identifier(y)}`}`, c = this.buildUpdateSet(e, t), f = u && I.join([I.raw(" from "), this.buildFromTable(u)]), w = this.buildJoins(o), S = s ? I` returning ${this.buildSelection(s, { isSingleTable: !u })}` : void 0, E = n ? I` where ${n}` : void 0;
    return I`${h}update ${v} set ${c}${f}${w}${E}${S}`;
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
    const n = e.length, s = e.flatMap(({ field: i }, u) => {
      const o = [];
      if (M(i, z.Aliased) && i.isSelectionField)
        o.push(I.identifier(i.fieldAlias));
      else if (M(i, z.Aliased) || M(i, z)) {
        const h = M(i, z.Aliased) ? i.sql : i;
        t ? o.push(
          new z(
            h.queryChunks.map((m) => M(m, X) ? I.identifier(this.casing.getColumnCasing(m)) : m)
          )
        ) : o.push(h), M(i, z.Aliased) && o.push(I` as ${I.identifier(i.fieldAlias)}`);
      } else
        M(i, he) && (t ? o.push(I.identifier(this.casing.getColumnCasing(i))) : o.push(i));
      return u < n - 1 && o.push(I`, `), o;
    });
    return I.join(s);
  }
  buildJoins(e) {
    if (!e || e.length === 0)
      return;
    const t = [];
    for (const [n, s] of e.entries()) {
      n === 0 && t.push(I` `);
      const i = s.table, u = s.lateral ? I` lateral` : void 0, o = s.on ? I` on ${s.on}` : void 0;
      if (M(i, Pe)) {
        const h = i[Pe.Symbol.Name], m = i[Pe.Symbol.Schema], d = i[Pe.Symbol.OriginalName], b = h === d ? void 0 : s.alias;
        t.push(
          I`${I.raw(s.joinType)} join${u} ${m ? I`${I.identifier(m)}.` : void 0}${I.identifier(d)}${b && I` ${I.identifier(b)}`}${o}`
        );
      } else if (M(i, Ve)) {
        const h = i[le].name, m = i[le].schema, d = i[le].originalName, b = h === d ? void 0 : s.alias;
        t.push(
          I`${I.raw(s.joinType)} join${u} ${m ? I`${I.identifier(m)}.` : void 0}${I.identifier(d)}${b && I` ${I.identifier(b)}`}${o}`
        );
      } else
        t.push(
          I`${I.raw(s.joinType)} join${u} ${i}${o}`
        );
      n < e.length - 1 && t.push(I` `);
    }
    return I.join(t);
  }
  buildFromTable(e) {
    if (M(e, j) && e[j.Symbol.IsAlias]) {
      let t = I`${I.identifier(e[j.Symbol.OriginalName])}`;
      return e[j.Symbol.Schema] && (t = I`${I.identifier(e[j.Symbol.Schema])}.${t}`), I`${t} ${I.identifier(e[j.Symbol.Name])}`;
    }
    return e;
  }
  buildSelectQuery({
    withList: e,
    fields: t,
    fieldsFlat: n,
    where: s,
    having: i,
    table: u,
    joins: o,
    orderBy: h,
    groupBy: m,
    limit: d,
    offset: b,
    lockingClause: y,
    distinct: v,
    setOperators: c
  }) {
    const f = n ?? je(t);
    for (const R of f)
      if (M(R.field, he) && Re(R.field.table) !== (M(u, Te) ? u._.alias : M(u, Hn) ? u[le].name : M(u, z) ? void 0 : Re(u)) && !((q) => o?.some(
        ({ alias: W }) => W === (q[j.Symbol.IsAlias] ? Re(q) : q[j.Symbol.BaseName])
      ))(R.field.table)) {
        const q = Re(R.field.table);
        throw new Error(
          `Your "${R.path.join("->")}" field references a column "${q}"."${R.field.name}", but the table "${q}" is not part of the query! Did you forget to join it?`
        );
      }
    const w = !o || o.length === 0, S = this.buildWithCTE(e);
    let E;
    v && (E = v === !0 ? I` distinct` : I` distinct on (${I.join(v.on, I`, `)})`);
    const C = this.buildSelection(f, { isSingleTable: w }), B = this.buildFromTable(u), $ = this.buildJoins(o), P = s ? I` where ${s}` : void 0, x = i ? I` having ${i}` : void 0;
    let A;
    h && h.length > 0 && (A = I` order by ${I.join(h, I`, `)}`);
    let _;
    m && m.length > 0 && (_ = I` group by ${I.join(m, I`, `)}`);
    const O = typeof d == "object" || typeof d == "number" && d >= 0 ? I` limit ${d}` : void 0, k = b ? I` offset ${b}` : void 0, F = I.empty();
    if (y) {
      const R = I` for ${I.raw(y.strength)}`;
      y.config.of && R.append(
        I` of ${I.join(
          Array.isArray(y.config.of) ? y.config.of : [y.config.of],
          I`, `
        )}`
      ), y.config.noWait ? R.append(I` nowait`) : y.config.skipLocked && R.append(I` skip locked`), F.append(R);
    }
    const U = I`${S}select${E} ${C} from ${B}${$}${P}${_}${x}${A}${O}${k}${F}`;
    return c.length > 0 ? this.buildSetOperations(U, c) : U;
  }
  buildSetOperations(e, t) {
    const [n, ...s] = t;
    if (!n)
      throw new Error("Cannot pass undefined values to any set operator");
    return s.length === 0 ? this.buildSetOperationQuery({ leftSelect: e, setOperator: n }) : this.buildSetOperations(
      this.buildSetOperationQuery({ leftSelect: e, setOperator: n }),
      s
    );
  }
  buildSetOperationQuery({
    leftSelect: e,
    setOperator: { type: t, isAll: n, rightSelect: s, limit: i, orderBy: u, offset: o }
  }) {
    const h = I`(${e.getSQL()}) `, m = I`(${s.getSQL()})`;
    let d;
    if (u && u.length > 0) {
      const c = [];
      for (const f of u)
        if (M(f, X))
          c.push(I.identifier(f.name));
        else if (M(f, z)) {
          for (let w = 0; w < f.queryChunks.length; w++) {
            const S = f.queryChunks[w];
            M(S, X) && (f.queryChunks[w] = I.identifier(S.name));
          }
          c.push(I`${f}`);
        } else
          c.push(I`${f}`);
      d = I` order by ${I.join(c, I`, `)} `;
    }
    const b = typeof i == "object" || typeof i == "number" && i >= 0 ? I` limit ${i}` : void 0, y = I.raw(`${t} ${n ? "all " : ""}`), v = o ? I` offset ${o}` : void 0;
    return I`${h}${y}${m}${d}${b}${v}`;
  }
  buildInsertQuery({ table: e, values: t, onConflict: n, returning: s, withList: i, select: u, overridingSystemValue_: o }) {
    const h = [], m = e[j.Symbol.Columns], d = Object.entries(m).filter(([S, E]) => !E.shouldDisableInsert()), b = d.map(
      ([, S]) => I.identifier(this.casing.getColumnCasing(S))
    );
    if (u) {
      const S = t;
      M(S, z) ? h.push(S) : h.push(S.getSQL());
    } else {
      const S = t;
      h.push(I.raw("values "));
      for (const [E, C] of S.entries()) {
        const B = [];
        for (const [$, P] of d) {
          const x = C[$];
          if (x === void 0 || M(x, Me) && x.value === void 0)
            if (P.defaultFn !== void 0) {
              const A = P.defaultFn(), _ = M(A, z) ? A : I.param(A, P);
              B.push(_);
            } else if (!P.default && P.onUpdateFn !== void 0) {
              const A = P.onUpdateFn(), _ = M(A, z) ? A : I.param(A, P);
              B.push(_);
            } else
              B.push(I`default`);
          else
            B.push(x);
        }
        h.push(B), E < S.length - 1 && h.push(I`, `);
      }
    }
    const y = this.buildWithCTE(i), v = I.join(h), c = s ? I` returning ${this.buildSelection(s, { isSingleTable: !0 })}` : void 0, f = n ? I` on conflict ${n}` : void 0, w = o === !0 ? I`overriding system value ` : void 0;
    return I`${y}insert into ${e} ${b} ${w}${v}${f}${c}`;
  }
  buildRefreshMaterializedViewQuery({ view: e, concurrently: t, withNoData: n }) {
    const s = t ? I` concurrently` : void 0, i = n ? I` with no data` : void 0;
    return I`refresh materialized view${s} ${e}${i}`;
  }
  prepareTyping(e) {
    return M(e, $n) || M(e, On) ? "json" : M(e, kn) ? "decimal" : M(e, Mn) ? "time" : M(e, Qn) || M(e, qn) ? "timestamp" : M(e, Ln) || M(e, Bn) ? "date" : M(e, Fn) ? "uuid" : "none";
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
    tableNamesMap: n,
    table: s,
    tableConfig: i,
    queryConfig: u,
    tableAlias: o,
    nestedQueryRelation: h,
    joinOn: m
  }) {
    let d = [], b, y, v = [], c;
    const f = [];
    if (u === !0)
      d = Object.entries(i.columns).map(([E, C]) => ({
        dbKey: C.name,
        tsKey: E,
        field: Be(C, o),
        relationTableTsKey: void 0,
        isJson: !1,
        selection: []
      }));
    else {
      const S = Object.fromEntries(
        Object.entries(i.columns).map(([x, A]) => [x, Be(A, o)])
      );
      if (u.where) {
        const x = typeof u.where == "function" ? u.where(S, iu()) : u.where;
        c = x && Mt(x, o);
      }
      const E = [];
      let C = [];
      if (u.columns) {
        let x = !1;
        for (const [A, _] of Object.entries(u.columns))
          _ !== void 0 && A in i.columns && (!x && _ === !0 && (x = !0), C.push(A));
        C.length > 0 && (C = x ? C.filter((A) => u.columns?.[A] === !0) : Object.keys(i.columns).filter((A) => !C.includes(A)));
      } else
        C = Object.keys(i.columns);
      for (const x of C) {
        const A = i.columns[x];
        E.push({ tsKey: x, value: A });
      }
      let B = [];
      u.with && (B = Object.entries(u.with).filter((x) => !!x[1]).map(([x, A]) => ({ tsKey: x, queryConfig: A, relation: i.relations[x] })));
      let $;
      if (u.extras) {
        $ = typeof u.extras == "function" ? u.extras(S, { sql: I }) : u.extras;
        for (const [x, A] of Object.entries($))
          E.push({
            tsKey: x,
            value: In(A, o)
          });
      }
      for (const { tsKey: x, value: A } of E)
        d.push({
          dbKey: M(A, z.Aliased) ? A.fieldAlias : i.columns[x].name,
          tsKey: x,
          field: M(A, he) ? Be(A, o) : A,
          relationTableTsKey: void 0,
          isJson: !1,
          selection: []
        });
      let P = typeof u.orderBy == "function" ? u.orderBy(S, ou()) : u.orderBy ?? [];
      Array.isArray(P) || (P = [P]), v = P.map((x) => M(x, he) ? Be(x, o) : Mt(x, o)), b = u.limit, y = u.offset;
      for (const {
        tsKey: x,
        queryConfig: A,
        relation: _
      } of B) {
        const O = cu(t, n, _), k = yt(_.referencedTable), F = n[k], U = `${o}_${x}`, R = Qt(
          ...O.fields.map(
            (G, te) => Qe(
              Be(O.references[te], U),
              Be(G, o)
            )
          )
        ), q = this.buildRelationalQueryWithoutPK({
          fullSchema: e,
          schema: t,
          tableNamesMap: n,
          table: e[F],
          tableConfig: t[F],
          queryConfig: M(_, ze) ? A === !0 ? { limit: 1 } : { ...A, limit: 1 } : A,
          tableAlias: U,
          joinOn: R,
          nestedQueryRelation: _
        }), W = I`${I.identifier(U)}.${I.identifier("data")}`.as(x);
        f.push({
          on: I`true`,
          table: new Te(q.sql, {}, U),
          alias: U,
          joinType: "left",
          lateral: !0
        }), d.push({
          dbKey: x,
          tsKey: x,
          field: W,
          relationTableTsKey: F,
          isJson: !0,
          selection: q.selection
        });
      }
    }
    if (d.length === 0)
      throw new Ri({ message: `No fields selected for table "${i.tsName}" ("${o}")` });
    let w;
    if (c = Qt(m, c), h) {
      let S = I`json_build_array(${I.join(
        d.map(
          ({ field: B, tsKey: $, isJson: P }) => P ? I`${I.identifier(`${o}_${$}`)}.${I.identifier("data")}` : M(B, z.Aliased) ? B.sql : B
        ),
        I`, `
      )})`;
      M(h, jt) && (S = I`coalesce(json_agg(${S}${v.length > 0 ? I` order by ${I.join(v, I`, `)}` : void 0}), '[]'::json)`);
      const E = [{
        dbKey: "data",
        tsKey: "data",
        field: S.as("data"),
        isJson: !0,
        relationTableTsKey: i.tsName,
        selection: d
      }];
      b !== void 0 || y !== void 0 || v.length > 0 ? (w = this.buildSelectQuery({
        table: cr(s, o),
        fields: {},
        fieldsFlat: [{
          path: [],
          field: I.raw("*")
        }],
        where: c,
        limit: b,
        offset: y,
        orderBy: v,
        setOperators: []
      }), c = void 0, b = void 0, y = void 0, v = []) : w = cr(s, o), w = this.buildSelectQuery({
        table: M(w, Pe) ? w : new Te(w, {}, o),
        fields: {},
        fieldsFlat: E.map(({ field: B }) => ({
          path: [],
          field: M(B, he) ? Be(B, o) : B
        })),
        joins: f,
        where: c,
        limit: b,
        offset: y,
        orderBy: v,
        setOperators: []
      });
    } else
      w = this.buildSelectQuery({
        table: cr(s, o),
        fields: {},
        fieldsFlat: d.map(({ field: S }) => ({
          path: [],
          field: M(S, he) ? Be(S, o) : S
        })),
        joins: f,
        where: c,
        limit: b,
        offset: y,
        orderBy: v,
        setOperators: []
      });
    return {
      tableTsKey: i.tsName,
      sql: w,
      selection: d
    };
  }
}
class wu {
  static [L] = "TypedQueryBuilder";
  /** @internal */
  getSelectedFields() {
    return this._.selectedFields;
  }
}
class Ce {
  static [L] = "PgSelectBuilder";
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
    const t = !!this.fields, n = e;
    let s;
    return this.fields ? s = this.fields : M(n, Te) ? s = Object.fromEntries(
      Object.keys(n._.selectedFields).map((i) => [i, n[i]])
    ) : M(n, Hn) ? s = n[le].selectedFields : M(n, z) ? s = {} : s = Qi(n), new Kn({
      table: n,
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
  static [L] = "PgSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({ table: e, fields: t, isPartialSelect: n, session: s, dialect: i, withList: u, distinct: o }) {
    super(), this.config = {
      withList: u,
      table: e,
      fields: { ...t },
      distinct: o,
      setOperators: []
    }, this.isPartialSelect = n, this.session = s, this.dialect = i, this._ = {
      selectedFields: t
    }, this.tableName = Fe(e), this.joinsNotNullableMap = typeof this.tableName == "string" ? { [this.tableName]: !0 } : {};
  }
  createJoin(e, t) {
    return (n, s) => {
      const i = this.tableName, u = Fe(n);
      if (typeof u == "string" && this.config.joins?.some((o) => o.alias === u))
        throw new Error(`Alias "${u}" is already used in this query`);
      if (!this.isPartialSelect && (Object.keys(this.joinsNotNullableMap).length === 1 && typeof i == "string" && (this.config.fields = {
        [i]: this.config.fields
      }), typeof u == "string" && !M(n, z))) {
        const o = M(n, Te) ? n._.selectedFields : M(n, Ve) ? n[le].selectedFields : n[j.Symbol.Columns];
        this.config.fields[u] = o;
      }
      if (typeof s == "function" && (s = s(
        new Proxy(
          this.config.fields,
          new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
        )
      )), this.config.joins || (this.config.joins = []), this.config.joins.push({ on: s, table: n, joinType: e, alias: u, lateral: t }), typeof u == "string")
        switch (e) {
          case "left": {
            this.joinsNotNullableMap[u] = !1;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([o]) => [o, !1])
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
              Object.entries(this.joinsNotNullableMap).map(([o]) => [o, !1])
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
    return (n) => {
      const s = typeof n == "function" ? n(vu()) : n;
      if (!Rr(this.getSelectedFields(), s.getSelectedFields()))
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
        new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
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
        new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
      )
    )), this.config.having = e, this;
  }
  groupBy(...e) {
    if (typeof e[0] == "function") {
      const t = e[0](
        new Proxy(
          this.config.fields,
          new me({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
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
          new me({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
        )
      ), n = Array.isArray(t) ? t : [t];
      this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).orderBy = n : this.config.orderBy = n;
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
      new Te(this.getSQL(), this.config.fields, e),
      new me({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    );
  }
  /** @internal */
  getSelectedFields() {
    return new Proxy(
      this.config.fields,
      new me({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    );
  }
  $dynamic() {
    return this;
  }
}
class Kn extends bu {
  static [L] = "PgSelect";
  /** @internal */
  _prepare(e) {
    const { session: t, config: n, dialect: s, joinsNotNullableMap: i, authToken: u } = this;
    if (!t)
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    return Ee.startActiveSpan("drizzle.prepareQuery", () => {
      const o = je(n.fields), h = t.prepareQuery(s.sqlToQuery(this.getSQL()), o, e, !0);
      return h.joinsNotNullableMap = i, h.setToken(u);
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
  execute = (e) => Ee.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
}
Mi(Kn, [We]);
function at(r, e) {
  return (t, n, ...s) => {
    const i = [n, ...s].map((u) => ({
      type: r,
      isAll: e,
      rightSelect: u
    }));
    for (const u of i)
      if (!Rr(t.getSelectedFields(), u.rightSelect.getSelectedFields()))
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
}), Su = at("union", !1), Pu = at("union", !0), Eu = at("intersect", !1), _u = at("intersect", !0), Cu = at("except", !1), Tu = at("except", !0);
class Gn {
  static [L] = "PgQueryBuilder";
  dialect;
  dialectConfig;
  constructor(e) {
    this.dialect = M(e, Bt) ? e : void 0, this.dialectConfig = M(e, Bt) ? void 0 : e;
  }
  $with = (e, t) => {
    const n = this;
    return { as: (i) => (typeof i == "function" && (i = i(n)), new Proxy(
      new Cn(
        i.getSQL(),
        t ?? ("getSelectedFields" in i ? i.getSelectedFields() ?? {} : {}),
        e,
        !0
      ),
      new me({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    )) };
  };
  with(...e) {
    const t = this;
    function n(u) {
      return new Ce({
        fields: u ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        withList: e
      });
    }
    function s(u) {
      return new Ce({
        fields: u ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        distinct: !0
      });
    }
    function i(u, o) {
      return new Ce({
        fields: o ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        distinct: { on: u }
      });
    }
    return { select: n, selectDistinct: s, selectDistinctOn: i };
  }
  select(e) {
    return new Ce({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect()
    });
  }
  selectDistinct(e) {
    return new Ce({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new Ce({
      fields: t ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: { on: e }
    });
  }
  // Lazy load dialect to avoid circular dependency
  getDialect() {
    return this.dialect || (this.dialect = new Bt(this.dialectConfig)), this.dialect;
  }
}
class dn {
  constructor(e, t, n, s, i) {
    this.table = e, this.session = t, this.dialect = n, this.withList = s, this.overridingSystemValue_ = i;
  }
  static [L] = "PgInsertBuilder";
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
    const t = e.map((n) => {
      const s = {}, i = this.table[j.Symbol.Columns];
      for (const u of Object.keys(n)) {
        const o = n[u];
        s[u] = M(o, z) ? o : new Me(o, i[u]);
      }
      return s;
    });
    return new pn(
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
    const t = typeof e == "function" ? e(new Gn()) : e;
    if (!M(t, z) && !Rr(this.table[yr], t._.selectedFields))
      throw new Error(
        "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
      );
    return new pn(this.table, t, this.session, this.dialect, this.withList, !0);
  }
}
class pn extends We {
  constructor(e, t, n, s, i, u, o) {
    super(), this.session = n, this.dialect = s, this.config = { table: e, values: t, withList: i, select: u, overridingSystemValue_: o };
  }
  static [L] = "PgInsert";
  config;
  returning(e = this.config.table[j.Symbol.Columns]) {
    return this.config.returningFields = e, this.config.returning = je(e), this;
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
      this.config.onConflict = I`do nothing`;
    else {
      let t = "";
      t = Array.isArray(e.target) ? e.target.map((s) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(s))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(e.target));
      const n = e.where ? I` where ${e.where}` : void 0;
      this.config.onConflict = I`(${I.raw(t)})${n} do nothing`;
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
    const t = e.where ? I` where ${e.where}` : void 0, n = e.targetWhere ? I` where ${e.targetWhere}` : void 0, s = e.setWhere ? I` where ${e.setWhere}` : void 0, i = this.dialect.buildUpdateSet(this.config.table, Nn(this.config.table, e.set));
    let u = "";
    return u = Array.isArray(e.target) ? e.target.map((o) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(o))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(e.target)), this.config.onConflict = I`(${I.raw(u)})${n} do update set ${i}${t}${s}`, this;
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
    return Ee.startActiveSpan("drizzle.prepareQuery", () => this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, e, !0));
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => Ee.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new me({
        alias: Re(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
}
class Au extends We {
  constructor(e, t, n) {
    super(), this.session = t, this.dialect = n, this.config = { view: e };
  }
  static [L] = "PgRefreshMaterializedView";
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
    return Ee.startActiveSpan("drizzle.prepareQuery", () => this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0, e, !0));
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  /** @internal */
  setToken(e) {
    return this.authToken = e, this;
  }
  execute = (e) => Ee.startActiveSpan("drizzle.operation", () => this._prepare().execute(e, this.authToken));
}
class gn {
  constructor(e, t, n, s) {
    this.table = e, this.session = t, this.dialect = n, this.withList = s;
  }
  static [L] = "PgUpdateBuilder";
  authToken;
  setToken(e) {
    return this.authToken = e, this;
  }
  set(e) {
    return new xu(
      this.table,
      Nn(this.table, e),
      this.session,
      this.dialect,
      this.withList
    ).setToken(this.authToken);
  }
}
class xu extends We {
  constructor(e, t, n, s, i) {
    super(), this.session = n, this.dialect = s, this.config = { set: t, table: e, withList: i, joins: [] }, this.tableName = Fe(e), this.joinsNotNullableMap = typeof this.tableName == "string" ? { [this.tableName]: !0 } : {};
  }
  static [L] = "PgUpdate";
  config;
  tableName;
  joinsNotNullableMap;
  from(e) {
    const t = e, n = Fe(t);
    return typeof n == "string" && (this.joinsNotNullableMap[n] = !0), this.config.from = t, this;
  }
  getTableLikeFields(e) {
    return M(e, Pe) ? e[j.Symbol.Columns] : M(e, Te) ? e._.selectedFields : e[le].selectedFields;
  }
  createJoin(e) {
    return (t, n) => {
      const s = Fe(t);
      if (typeof s == "string" && this.config.joins.some((i) => i.alias === s))
        throw new Error(`Alias "${s}" is already used in this query`);
      if (typeof n == "function") {
        const i = this.config.from && !M(this.config.from, z) ? this.getTableLikeFields(this.config.from) : void 0;
        n = n(
          new Proxy(
            this.config.table[j.Symbol.Columns],
            new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          ),
          i && new Proxy(
            i,
            new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          )
        );
      }
      if (this.config.joins.push({ on: n, table: t, joinType: e, alias: s }), typeof s == "string")
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
    if (!e && (e = Object.assign({}, this.config.table[j.Symbol.Columns]), this.config.from)) {
      const t = Fe(this.config.from);
      if (typeof t == "string" && this.config.from && !M(this.config.from, z)) {
        const n = this.getTableLikeFields(this.config.from);
        e[t] = n;
      }
      for (const n of this.config.joins) {
        const s = Fe(n.table);
        if (typeof s == "string" && !M(n.table, z)) {
          const i = this.getTableLikeFields(n.table);
          e[s] = i;
        }
      }
    }
    return this.config.returningFields = e, this.config.returning = je(e), this;
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
      new me({
        alias: Re(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
}
class qt extends z {
  constructor(e) {
    super(qt.buildEmbeddedCount(e.source, e.filters).queryChunks), this.params = e, this.mapWith(Number), this.session = e.session, this.sql = qt.buildCount(
      e.source,
      e.filters
    );
  }
  sql;
  token;
  static [L] = "PgCountBuilder";
  [Symbol.toStringTag] = "PgCountBuilder";
  session;
  static buildEmbeddedCount(e, t) {
    return I`(select count(*) from ${e}${I.raw(" where ").if(t)}${t})`;
  }
  static buildCount(e, t) {
    return I`select count(*) as count from ${e}${I.raw(" where ").if(t)}${t};`;
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
class Iu {
  constructor(e, t, n, s, i, u, o) {
    this.fullSchema = e, this.schema = t, this.tableNamesMap = n, this.table = s, this.tableConfig = i, this.dialect = u, this.session = o;
  }
  static [L] = "PgRelationalQueryBuilder";
  findMany(e) {
    return new mn(
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
    return new mn(
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
class mn extends We {
  constructor(e, t, n, s, i, u, o, h, m) {
    super(), this.fullSchema = e, this.schema = t, this.tableNamesMap = n, this.table = s, this.tableConfig = i, this.dialect = u, this.session = o, this.config = h, this.mode = m;
  }
  static [L] = "PgRelationalQuery";
  /** @internal */
  _prepare(e) {
    return Ee.startActiveSpan("drizzle.prepareQuery", () => {
      const { query: t, builtQuery: n } = this._toSQL();
      return this.session.prepareQuery(
        n,
        void 0,
        e,
        !0,
        (s, i) => {
          const u = s.map(
            (o) => Sr(this.schema, this.tableConfig, o, t.selection, i)
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
    return Ee.startActiveSpan("drizzle.operation", () => this._prepare().execute(void 0, this.authToken));
  }
}
class Nu extends We {
  constructor(e, t, n, s) {
    super(), this.execute = e, this.sql = t, this.query = n, this.mapBatchResult = s;
  }
  static [L] = "PgRaw";
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
class Lu {
  constructor(e, t, n) {
    if (this.dialect = e, this.session = t, this._ = n ? {
      schema: n.schema,
      fullSchema: n.fullSchema,
      tableNamesMap: n.tableNamesMap,
      session: t
    } : {
      schema: void 0,
      fullSchema: {},
      tableNamesMap: {},
      session: t
    }, this.query = {}, this._.schema)
      for (const [s, i] of Object.entries(this._.schema))
        this.query[s] = new Iu(
          n.fullSchema,
          this._.schema,
          this._.tableNamesMap,
          n.fullSchema[s],
          i,
          e,
          t
        );
  }
  static [L] = "PgDatabase";
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
    const n = this;
    return { as: (i) => (typeof i == "function" && (i = i(new Gn(n.dialect))), new Proxy(
      new Cn(
        i.getSQL(),
        t ?? ("getSelectedFields" in i ? i.getSelectedFields() ?? {} : {}),
        e,
        !0
      ),
      new me({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    )) };
  };
  $count(e, t) {
    return new qt({ source: e, filters: t, session: this.session });
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
    function n(m) {
      return new Ce({
        fields: m ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e
      });
    }
    function s(m) {
      return new Ce({
        fields: m ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e,
        distinct: !0
      });
    }
    function i(m, d) {
      return new Ce({
        fields: d ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e,
        distinct: { on: m }
      });
    }
    function u(m) {
      return new gn(m, t.session, t.dialect, e);
    }
    function o(m) {
      return new dn(m, t.session, t.dialect, e);
    }
    function h(m) {
      return new fn(m, t.session, t.dialect, e);
    }
    return { select: n, selectDistinct: s, selectDistinctOn: i, update: u, insert: o, delete: h };
  }
  select(e) {
    return new Ce({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(e) {
    return new Ce({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new Ce({
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
    return new gn(e, this.session, this.dialect);
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
    return new dn(e, this.session, this.dialect);
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
    return new fn(e, this.session, this.dialect);
  }
  refreshMaterializedView(e) {
    return new Au(e, this.session, this.dialect);
  }
  authToken;
  execute(e) {
    const t = typeof e == "string" ? I.raw(e) : e.getSQL(), n = this.dialect.sqlToQuery(t), s = this.session.prepareQuery(
      n,
      void 0,
      void 0,
      !1
    );
    return new Nu(
      () => s.execute(void 0, this.authToken),
      t,
      n,
      (i) => s.mapResult(i, !0)
    );
  }
  transaction(e, t) {
    return this.session.transaction(e, t);
  }
}
class Jn {
  constructor(e, t) {
    this.unique = e, this.name = t;
  }
  static [L] = "PgIndexBuilderOn";
  on(...e) {
    return new hr(
      e.map((t) => {
        if (M(t, z))
          return t;
        t = t;
        const n = new or(t.name, !!t.keyAsName, t.columnType, t.indexConfig);
        return t.indexConfig = JSON.parse(JSON.stringify(t.defaultConfig)), n;
      }),
      this.unique,
      !1,
      this.name
    );
  }
  onOnly(...e) {
    return new hr(
      e.map((t) => {
        if (M(t, z))
          return t;
        t = t;
        const n = new or(t.name, !!t.keyAsName, t.columnType, t.indexConfig);
        return t.indexConfig = t.defaultConfig, n;
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
    return new hr(
      t.map((n) => {
        if (M(n, z))
          return n;
        n = n;
        const s = new or(n.name, !!n.keyAsName, n.columnType, n.indexConfig);
        return n.indexConfig = JSON.parse(JSON.stringify(n.defaultConfig)), s;
      }),
      this.unique,
      !0,
      this.name,
      e
    );
  }
}
class hr {
  static [L] = "PgIndexBuilder";
  /** @internal */
  config;
  constructor(e, t, n, s, i = "btree") {
    this.config = {
      name: s,
      columns: e,
      unique: t,
      only: n,
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
    return new Bu(this.config, e);
  }
}
class Bu {
  static [L] = "PgIndex";
  config;
  constructor(e, t) {
    this.config = { ...e, table: t };
  }
}
function st(r) {
  return new Jn(!1, r);
}
function Yn(r) {
  return new Jn(!0, r);
}
class Ru {
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
  static [L] = "PgPreparedQuery";
  /** @internal */
  joinsNotNullableMap;
}
class Ou {
  constructor(e) {
    this.dialect = e;
  }
  static [L] = "PgSession";
  /** @internal */
  execute(e, t) {
    return Ee.startActiveSpan("drizzle.operation", () => Ee.startActiveSpan("drizzle.prepareQuery", () => this.prepareQuery(
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
    const n = await this.execute(e, t);
    return Number(
      n[0].count
    );
  }
}
const fr = { withTimezone: !0 }, ut = {
  created_at: Lt(fr).defaultNow().notNull(),
  updated_at: Lt(fr),
  deleted_at: Lt(fr)
}, St = Oe().primaryKey().generatedAlwaysAsIdentity(), pt = ot(
  "users",
  {
    id: St,
    uuid: Un().defaultRandom().unique().notNull(),
    ...ut
  },
  (r) => [Yn("uuid_idx").on(r.uuid)]
), $u = ot(
  "adhoc_games",
  {
    id: St,
    solution: wt().notNull(),
    user_id: Oe().notNull().references(() => pt.id),
    ...ut
  },
  (r) => [st("adhoc_game_user_idx").on(r.user_id)]
), it = ot(
  "solutions",
  {
    id: St,
    value: wt().notNull().unique(),
    date: Rn().defaultNow().notNull().unique(),
    ...ut
  },
  (r) => [Yn("daily_game_solution_date_idx").on(r.date)]
), gt = ot(
  "daily_games",
  {
    id: St,
    user_id: Oe().notNull().references(() => pt.id),
    solution_id: Oe().notNull().references(() => it.id),
    ...ut
  },
  (r) => [
    st("daily_game_user_idx").on(r.user_id),
    st("daily_game_solution_idx").on(r.solution_id)
  ]
), Rt = ot(
  "generic_games",
  {
    id: St,
    daily_game_id: Oe().references(() => gt.id),
    adhoc_game_id: Oe().references(() => $u.id),
    ...ut
  },
  (r) => [
    Wn(
      "game_type",
      I`
      (${r.daily_game_id} IS NOT NULL AND ${r.adhoc_game_id} IS NULL)
      OR
      (${r.daily_game_id} IS NULL AND ${r.adhoc_game_id} IS NOT NULL)
    `
    ),
    st("daily_game_idx").on(r.daily_game_id),
    st("adhoc_game_idx").on(r.adhoc_game_id)
  ]
), Ot = ot(
  "attempts",
  {
    game_id: Oe().references(() => Rt.id).notNull(),
    game_attempts_order: Oe().notNull(),
    value: wt().notNull(),
    feedback: wt().notNull(),
    ...ut
  },
  (r) => [
    Wn(
      "game_attempts_order_check",
      I`
      (${r.game_attempts_order} > 0 AND ${r.game_attempts_order} < 17)
    `
    ),
    Da({
      name: "id",
      columns: [r.game_id, r.game_attempts_order]
    }),
    st("game_attempts_idx").on(r.game_id)
  ]
);
async function ku({
  db: r,
  game: e,
  attempt: t,
  feedback: n,
  order: s
}) {
  console.info("create new attempt");
  const u = (await r.insert(Ot).values({
    game_id: e.id,
    game_attempts_order: s,
    value: t,
    feedback: n
  }).returning()).pop();
  if (!u)
    throw Error("failed to create new attempt");
  return u;
}
async function Du({
  db: r,
  game: e
}) {
  return console.info("get attempts"), await r.select().from(Ot).where(Qe(Ot.game_id, e.id)).orderBy(jn(Ot.game_attempts_order));
}
const bt = {
  maxAttempts: 8,
  solutionLength: 4
};
function Mu(r, e) {
  const t = {};
  for (let n = 0; n < r.length; n++) {
    const s = r[n], i = s[e];
    t[i] = s;
  }
  return t;
}
const Pr = "var(--token-default)";
new Array(bt.solutionLength).fill(
  Pr
);
new Array(bt.maxAttempts).fill(Pr).map(() => new Array(bt.solutionLength).fill(Pr));
const Qu = [
  "fairy",
  "fire",
  "lightning",
  "grass",
  "ice",
  "water",
  "rock"
], qu = Qu.map((r, e) => {
  const t = e + 1;
  return {
    icon: r,
    color: `var(--token-${t})`,
    id: t
  };
}), Xn = "X", Fu = [
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
    value: Xn,
    label: "correct color, correct position",
    key: "correct"
  }
], Uu = Fu.map((r, e) => ({
  ...r,
  id: e,
  color: `var(--feedback-token-${r.key})`
}));
Mu(Uu, "value");
const ju = new Array(bt.solutionLength).fill(Xn).join("");
function zu(r) {
  const e = new Uint32Array(1);
  return crypto.getRandomValues(e), Math.floor(e[0] / (Math.pow(2, 32) - 1) * r);
}
function Vu(r) {
  const e = zu(r.length);
  return r[e];
}
function Wu() {
  const r = qu.map((t) => t.id);
  return new Array(bt.solutionLength).fill(0).map(() => Vu(r)).join("");
}
function Hu(r, e) {
  const t = r.split(""), n = e.split(""), s = [];
  for (let u = 0; u < t.length; u++) {
    const o = t[u], h = n[u];
    o === h && (s.push("X"), delete t[u], delete n[u]);
  }
  for (let u = 0; u < t.length; u++) {
    const o = t[u], h = n.findIndex(
      (m) => !!(o && m) && o === m
    );
    h !== -1 && (s.push("O"), delete t[u], delete n[h]);
  }
  const i = s.join("").padEnd(t.length, "-");
  return { feedback: i, win: i === ju };
}
async function Ku({
  db: r
}) {
  console.info("create new solution");
  const e = Wu(), n = (await r.insert(it).values({
    value: e
  }).returning()).pop();
  if (!n)
    throw Error("failed to create new solution");
  return n;
}
async function Gu({
  db: r
}) {
  return console.info("get daily solution"), (await r.select().from(it).where(I`${it.date} = CURRENT_DATE`)).pop();
}
async function Ju({
  db: r,
  id: e
}) {
  return console.info(`get solution by id '${e}'`), (await r.select().from(it).where(Qe(it.id, e))).pop();
}
async function Zn({
  db: r
}) {
  const e = await Gu({ db: r });
  e && console.info(`get solution '${e.id}'`);
  const t = e || await Ku({ db: r });
  return e || console.info(`create new solution '${t.id}'`), t;
}
async function Yu({
  db: r,
  user: e
}) {
  console.info("create new daily solution");
  const t = await Zn({ db: r }), s = (await r.insert(gt).values({
    user_id: e.id,
    solution_id: t.id
  }).returning()).pop();
  if (!s)
    throw Error("failed to create new daily solution");
  return s;
}
async function Xu({
  db: r,
  user: e
}) {
  console.info("get daily solution");
  const t = await Zn({ db: r });
  return (await r.select().from(gt).where(
    Qt(
      Qe(gt.user_id, e.id),
      Qe(gt.solution_id, t.id)
    )
  )).pop();
}
async function Zu({
  db: r,
  user: e
}) {
  console.info("get or create daily game");
  const t = await Xu({ db: r, user: e });
  t && console.info(`get daily game '${t.id}'`);
  const n = t || await Yu({ db: r, user: e });
  return t || console.info(`create new daily game '${n.id}'`), n;
}
async function el({
  db: r,
  game: e
}) {
  console.info("get generic game");
  const n = "solution_id" in e ? Rt.daily_game_id : Rt.adhoc_game_id;
  return (await r.select().from(Rt).where(Qe(n, e.id))).pop();
}
async function tl({
  db: r,
  uuid: e
}) {
  return (await r.select().from(pt).where(Qe(pt.uuid, e)).orderBy(zn(pt.created_at)).limit(1)).pop();
}
async function rl({
  attempt: r,
  order: e,
  db: t,
  id: n
}) {
  const s = bi(n) ? await tl({ db: t, uuid: n }) : void 0;
  if (!s)
    throw Error("missing user");
  const i = await Zu({ db: t, user: s }), u = await Ju({ db: t, id: i.solution_id });
  if (!u)
    throw Error("missing solution");
  const o = await el({ db: t, game: i });
  if (!o)
    throw Error("missing game");
  const h = (await Du({ db: t, game: o })).length + 1, m = parseInt(e), d = Number.isNaN(m) ? void 0 : m;
  if (!d)
    throw Error("failed to parse turn order");
  if (h !== d)
    throw Error("409 Conflict");
  const { feedback: b } = Hu(r, u.value);
  return await ku({
    db: t,
    game: o,
    feedback: b,
    attempt: r,
    order: d
  }), { id: s.uuid };
}
var nl = Object.create, lt = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, il = Object.getOwnPropertyNames, ol = Object.getPrototypeOf, al = Object.prototype.hasOwnProperty, ul = (r, e, t) => e in r ? lt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, g = (r, e) => lt(r, "name", { value: e, configurable: !0 }), we = (r, e) => () => (r && (e = r(r = 0)), e), ee = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), xe = (r, e) => {
  for (var t in e)
    lt(r, t, {
      get: e[t],
      enumerable: !0
    });
}, es = (r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of il(e))
      !al.call(r, s) && s !== t && lt(r, s, { get: () => e[s], enumerable: !(n = sl(e, s)) || n.enumerable });
  return r;
}, He = (r, e, t) => (t = r != null ? nl(ol(r)) : {}, es(e || !r || !r.__esModule ? lt(t, "default", { value: r, enumerable: !0 }) : t, r)), fe = (r) => es(lt({}, "__esModule", { value: !0 }), r), Y = (r, e, t) => ul(r, typeof e != "symbol" ? e + "" : e, t), ll = ee((r) => {
  V(), r.byteLength = h, r.toByteArray = d, r.fromByteArray = v;
  var e = [], t = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (i = 0, u = s.length; i < u; ++i)
    e[i] = s[i], t[s.charCodeAt(i)] = i;
  var i, u;
  t[45] = 62, t[95] = 63;
  function o(c) {
    var f = c.length;
    if (f % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var w = c.indexOf("=");
    w === -1 && (w = f);
    var S = w === f ? 0 : 4 - w % 4;
    return [w, S];
  }
  g(o, "getLens");
  function h(c) {
    var f = o(c), w = f[0], S = f[1];
    return (w + S) * 3 / 4 - S;
  }
  g(h, "byteLength");
  function m(c, f, w) {
    return (f + w) * 3 / 4 - w;
  }
  g(m, "_byteLength");
  function d(c) {
    var f, w = o(c), S = w[0], E = w[1], C = new n(m(c, S, E)), B = 0, $ = E > 0 ? S - 4 : S, P;
    for (P = 0; P < $; P += 4)
      f = t[c.charCodeAt(P)] << 18 | t[c.charCodeAt(P + 1)] << 12 | t[c.charCodeAt(P + 2)] << 6 | t[c.charCodeAt(P + 3)], C[B++] = f >> 16 & 255, C[B++] = f >> 8 & 255, C[B++] = f & 255;
    return E === 2 && (f = t[c.charCodeAt(
      P
    )] << 2 | t[c.charCodeAt(P + 1)] >> 4, C[B++] = f & 255), E === 1 && (f = t[c.charCodeAt(P)] << 10 | t[c.charCodeAt(P + 1)] << 4 | t[c.charCodeAt(P + 2)] >> 2, C[B++] = f >> 8 & 255, C[B++] = f & 255), C;
  }
  g(d, "toByteArray");
  function b(c) {
    return e[c >> 18 & 63] + e[c >> 12 & 63] + e[c >> 6 & 63] + e[c & 63];
  }
  g(b, "tripletToBase64");
  function y(c, f, w) {
    for (var S, E = [], C = f; C < w; C += 3)
      S = (c[C] << 16 & 16711680) + (c[C + 1] << 8 & 65280) + (c[C + 2] & 255), E.push(b(S));
    return E.join("");
  }
  g(y, "encodeChunk");
  function v(c) {
    for (var f, w = c.length, S = w % 3, E = [], C = 16383, B = 0, $ = w - S; B < $; B += C)
      E.push(y(
        c,
        B,
        B + C > $ ? $ : B + C
      ));
    return S === 1 ? (f = c[w - 1], E.push(e[f >> 2] + e[f << 4 & 63] + "==")) : S === 2 && (f = (c[w - 2] << 8) + c[w - 1], E.push(e[f >> 10] + e[f >> 4 & 63] + e[f << 2 & 63] + "=")), E.join("");
  }
  g(v, "fromByteArray");
}), cl = ee((r) => {
  V(), r.read = function(e, t, n, s, i) {
    var u, o, h = i * 8 - s - 1, m = (1 << h) - 1, d = m >> 1, b = -7, y = n ? i - 1 : 0, v = n ? -1 : 1, c = e[t + y];
    for (y += v, u = c & (1 << -b) - 1, c >>= -b, b += h; b > 0; u = u * 256 + e[t + y], y += v, b -= 8)
      ;
    for (o = u & (1 << -b) - 1, u >>= -b, b += s; b > 0; o = o * 256 + e[t + y], y += v, b -= 8)
      ;
    if (u === 0)
      u = 1 - d;
    else {
      if (u === m)
        return o ? NaN : (c ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, s), u = u - d;
    }
    return (c ? -1 : 1) * o * Math.pow(2, u - s);
  }, r.write = function(e, t, n, s, i, u) {
    var o, h, m, d = u * 8 - i - 1, b = (1 << d) - 1, y = b >> 1, v = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, c = s ? 0 : u - 1, f = s ? 1 : -1, w = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (h = isNaN(t) ? 1 : 0, o = b) : (o = Math.floor(Math.log(t) / Math.LN2), t * (m = Math.pow(2, -o)) < 1 && (o--, m *= 2), o + y >= 1 ? t += v / m : t += v * Math.pow(2, 1 - y), t * m >= 2 && (o++, m /= 2), o + y >= b ? (h = 0, o = b) : o + y >= 1 ? (h = (t * m - 1) * Math.pow(2, i), o = o + y) : (h = t * Math.pow(2, y - 1) * Math.pow(2, i), o = 0)); i >= 8; e[n + c] = h & 255, c += f, h /= 256, i -= 8)
      ;
    for (o = o << i | h, d += i; d > 0; e[n + c] = o & 255, c += f, o /= 256, d -= 8)
      ;
    e[n + c - f] |= w * 128;
  };
}), hl = ee((r) => {
  V();
  var e = ll(), t = cl(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = o, r.SlowBuffer = E, r.INSPECT_MAX_BYTES = 50;
  var s = 2147483647;
  r.kMaxLength = s, o.TYPED_ARRAY_SUPPORT = i(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function i() {
    try {
      let a = new Uint8Array(1), l = { foo: g(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(l, Uint8Array.prototype), Object.setPrototypeOf(a, l), a.foo() === 42;
    } catch {
      return !1;
    }
  }
  g(i, "typedArraySupport"), Object.defineProperty(o.prototype, "parent", { enumerable: !0, get: g(function() {
    if (o.isBuffer(this))
      return this.buffer;
  }, "get") }), Object.defineProperty(o.prototype, "offset", { enumerable: !0, get: g(function() {
    if (o.isBuffer(
      this
    ))
      return this.byteOffset;
  }, "get") });
  function u(a) {
    if (a > s)
      throw new RangeError('The value "' + a + '" is invalid for option "size"');
    let l = new Uint8Array(a);
    return Object.setPrototypeOf(l, o.prototype), l;
  }
  g(u, "createBuffer");
  function o(a, l, p) {
    if (typeof a == "number") {
      if (typeof l == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return b(a);
    }
    return h(a, l, p);
  }
  g(o, "Buffer"), o.poolSize = 8192;
  function h(a, l, p) {
    if (typeof a == "string")
      return y(a, l);
    if (ArrayBuffer.isView(a))
      return c(a);
    if (a == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
    if (Ae(a, ArrayBuffer) || a && Ae(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ae(a, SharedArrayBuffer) || a && Ae(
      a.buffer,
      SharedArrayBuffer
    )))
      return f(a, l, p);
    if (typeof a == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let T = a.valueOf && a.valueOf();
    if (T != null && T !== a)
      return o.from(T, l, p);
    let N = w(a);
    if (N)
      return N;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof a[Symbol.toPrimitive] == "function")
      return o.from(a[Symbol.toPrimitive]("string"), l, p);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
  }
  g(h, "from"), o.from = function(a, l, p) {
    return h(a, l, p);
  }, Object.setPrototypeOf(
    o.prototype,
    Uint8Array.prototype
  ), Object.setPrototypeOf(o, Uint8Array);
  function m(a) {
    if (typeof a != "number")
      throw new TypeError(
        '"size" argument must be of type number'
      );
    if (a < 0)
      throw new RangeError('The value "' + a + '" is invalid for option "size"');
  }
  g(m, "assertSize");
  function d(a, l, p) {
    return m(a), a <= 0 ? u(a) : l !== void 0 ? typeof p == "string" ? u(a).fill(l, p) : u(a).fill(l) : u(a);
  }
  g(d, "alloc"), o.alloc = function(a, l, p) {
    return d(a, l, p);
  };
  function b(a) {
    return m(a), u(a < 0 ? 0 : S(a) | 0);
  }
  g(b, "allocUnsafe"), o.allocUnsafe = function(a) {
    return b(
      a
    );
  }, o.allocUnsafeSlow = function(a) {
    return b(a);
  };
  function y(a, l) {
    if ((typeof l != "string" || l === "") && (l = "utf8"), !o.isEncoding(l))
      throw new TypeError("Unknown encoding: " + l);
    let p = C(a, l) | 0, T = u(p), N = T.write(
      a,
      l
    );
    return N !== p && (T = T.slice(0, N)), T;
  }
  g(y, "fromString");
  function v(a) {
    let l = a.length < 0 ? 0 : S(a.length) | 0, p = u(l);
    for (let T = 0; T < l; T += 1)
      p[T] = a[T] & 255;
    return p;
  }
  g(v, "fromArrayLike");
  function c(a) {
    if (Ae(a, Uint8Array)) {
      let l = new Uint8Array(a);
      return f(l.buffer, l.byteOffset, l.byteLength);
    }
    return v(a);
  }
  g(c, "fromArrayView");
  function f(a, l, p) {
    if (l < 0 || a.byteLength < l)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (a.byteLength < l + (p || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let T;
    return l === void 0 && p === void 0 ? T = new Uint8Array(a) : p === void 0 ? T = new Uint8Array(a, l) : T = new Uint8Array(
      a,
      l,
      p
    ), Object.setPrototypeOf(T, o.prototype), T;
  }
  g(f, "fromArrayBuffer");
  function w(a) {
    if (o.isBuffer(a)) {
      let l = S(a.length) | 0, p = u(l);
      return p.length === 0 || a.copy(p, 0, 0, l), p;
    }
    if (a.length !== void 0)
      return typeof a.length != "number" || Ct(a.length) ? u(0) : v(a);
    if (a.type === "Buffer" && Array.isArray(a.data))
      return v(a.data);
  }
  g(w, "fromObject");
  function S(a) {
    if (a >= s)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
    return a | 0;
  }
  g(S, "checked");
  function E(a) {
    return +a != a && (a = 0), o.alloc(+a);
  }
  g(E, "SlowBuffer"), o.isBuffer = g(function(a) {
    return a != null && a._isBuffer === !0 && a !== o.prototype;
  }, "isBuffer"), o.compare = g(function(a, l) {
    if (Ae(a, Uint8Array) && (a = o.from(a, a.offset, a.byteLength)), Ae(l, Uint8Array) && (l = o.from(l, l.offset, l.byteLength)), !o.isBuffer(a) || !o.isBuffer(l))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (a === l)
      return 0;
    let p = a.length, T = l.length;
    for (let N = 0, D = Math.min(p, T); N < D; ++N)
      if (a[N] !== l[N]) {
        p = a[N], T = l[N];
        break;
      }
    return p < T ? -1 : T < p ? 1 : 0;
  }, "compare"), o.isEncoding = g(function(a) {
    switch (String(a).toLowerCase()) {
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
  }, "isEncoding"), o.concat = g(function(a, l) {
    if (!Array.isArray(a))
      throw new TypeError(
        '"list" argument must be an Array of Buffers'
      );
    if (a.length === 0)
      return o.alloc(0);
    let p;
    if (l === void 0)
      for (l = 0, p = 0; p < a.length; ++p)
        l += a[p].length;
    let T = o.allocUnsafe(l), N = 0;
    for (p = 0; p < a.length; ++p) {
      let D = a[p];
      if (Ae(D, Uint8Array))
        N + D.length > T.length ? (o.isBuffer(D) || (D = o.from(D)), D.copy(T, N)) : Uint8Array.prototype.set.call(T, D, N);
      else if (o.isBuffer(D))
        D.copy(T, N);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      N += D.length;
    }
    return T;
  }, "concat");
  function C(a, l) {
    if (o.isBuffer(a))
      return a.length;
    if (ArrayBuffer.isView(a) || Ae(a, ArrayBuffer))
      return a.byteLength;
    if (typeof a != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof a
      );
    let p = a.length, T = arguments.length > 2 && arguments[2] === !0;
    if (!T && p === 0)
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
          return _t(a).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return p * 2;
        case "hex":
          return p >>> 1;
        case "base64":
          return ir(a).length;
        default:
          if (N)
            return T ? -1 : _t(a).length;
          l = ("" + l).toLowerCase(), N = !0;
      }
  }
  g(C, "byteLength"), o.byteLength = C;
  function B(a, l, p) {
    let T = !1;
    if ((l === void 0 || l < 0) && (l = 0), l > this.length || ((p === void 0 || p > this.length) && (p = this.length), p <= 0) || (p >>>= 0, l >>>= 0, p <= l))
      return "";
    for (a || (a = "utf8"); ; )
      switch (a) {
        case "hex":
          return ne(this, l, p);
        case "utf8":
        case "utf-8":
          return R(this, l, p);
        case "ascii":
          return G(this, l, p);
        case "latin1":
        case "binary":
          return te(
            this,
            l,
            p
          );
        case "base64":
          return U(this, l, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return be(
            this,
            l,
            p
          );
        default:
          if (T)
            throw new TypeError("Unknown encoding: " + a);
          a = (a + "").toLowerCase(), T = !0;
      }
  }
  g(
    B,
    "slowToString"
  ), o.prototype._isBuffer = !0;
  function $(a, l, p) {
    let T = a[l];
    a[l] = a[p], a[p] = T;
  }
  g($, "swap"), o.prototype.swap16 = g(function() {
    let a = this.length;
    if (a % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let l = 0; l < a; l += 2)
      $(this, l, l + 1);
    return this;
  }, "swap16"), o.prototype.swap32 = g(function() {
    let a = this.length;
    if (a % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let l = 0; l < a; l += 4)
      $(this, l, l + 3), $(this, l + 1, l + 2);
    return this;
  }, "swap32"), o.prototype.swap64 = g(
    function() {
      let a = this.length;
      if (a % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let l = 0; l < a; l += 8)
        $(this, l, l + 7), $(this, l + 1, l + 6), $(this, l + 2, l + 5), $(this, l + 3, l + 4);
      return this;
    },
    "swap64"
  ), o.prototype.toString = g(function() {
    let a = this.length;
    return a === 0 ? "" : arguments.length === 0 ? R(
      this,
      0,
      a
    ) : B.apply(this, arguments);
  }, "toString"), o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = g(function(a) {
    if (!o.isBuffer(a))
      throw new TypeError("Argument must be a Buffer");
    return this === a ? !0 : o.compare(this, a) === 0;
  }, "equals"), o.prototype.inspect = g(function() {
    let a = "", l = r.INSPECT_MAX_BYTES;
    return a = this.toString("hex", 0, l).replace(/(.{2})/g, "$1 ").trim(), this.length > l && (a += " ... "), "<Buffer " + a + ">";
  }, "inspect"), n && (o.prototype[n] = o.prototype.inspect), o.prototype.compare = g(function(a, l, p, T, N) {
    if (Ae(a, Uint8Array) && (a = o.from(a, a.offset, a.byteLength)), !o.isBuffer(a))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof a);
    if (l === void 0 && (l = 0), p === void 0 && (p = a ? a.length : 0), T === void 0 && (T = 0), N === void 0 && (N = this.length), l < 0 || p > a.length || T < 0 || N > this.length)
      throw new RangeError("out of range index");
    if (T >= N && l >= p)
      return 0;
    if (T >= N)
      return -1;
    if (l >= p)
      return 1;
    if (l >>>= 0, p >>>= 0, T >>>= 0, N >>>= 0, this === a)
      return 0;
    let D = N - T, Q = p - l, se = Math.min(D, Q), ce = this.slice(
      T,
      N
    ), oe = a.slice(l, p);
    for (let ie = 0; ie < se; ++ie)
      if (ce[ie] !== oe[ie]) {
        D = ce[ie], Q = oe[ie];
        break;
      }
    return D < Q ? -1 : Q < D ? 1 : 0;
  }, "compare");
  function P(a, l, p, T, N) {
    if (a.length === 0)
      return -1;
    if (typeof p == "string" ? (T = p, p = 0) : p > 2147483647 ? p = 2147483647 : p < -2147483648 && (p = -2147483648), p = +p, Ct(p) && (p = N ? 0 : a.length - 1), p < 0 && (p = a.length + p), p >= a.length) {
      if (N)
        return -1;
      p = a.length - 1;
    } else if (p < 0)
      if (N)
        p = 0;
      else
        return -1;
    if (typeof l == "string" && (l = o.from(
      l,
      T
    )), o.isBuffer(l))
      return l.length === 0 ? -1 : x(a, l, p, T, N);
    if (typeof l == "number")
      return l = l & 255, typeof Uint8Array.prototype.indexOf == "function" ? N ? Uint8Array.prototype.indexOf.call(a, l, p) : Uint8Array.prototype.lastIndexOf.call(a, l, p) : x(a, [l], p, T, N);
    throw new TypeError("val must be string, number or Buffer");
  }
  g(P, "bidirectionalIndexOf");
  function x(a, l, p, T, N) {
    let D = 1, Q = a.length, se = l.length;
    if (T !== void 0 && (T = String(T).toLowerCase(), T === "ucs2" || T === "ucs-2" || T === "utf16le" || T === "utf-16le")) {
      if (a.length < 2 || l.length < 2)
        return -1;
      D = 2, Q /= 2, se /= 2, p /= 2;
    }
    function ce(ie, ue) {
      return D === 1 ? ie[ue] : ie.readUInt16BE(ue * D);
    }
    g(ce, "read");
    let oe;
    if (N) {
      let ie = -1;
      for (oe = p; oe < Q; oe++)
        if (ce(a, oe) === ce(l, ie === -1 ? 0 : oe - ie)) {
          if (ie === -1 && (ie = oe), oe - ie + 1 === se)
            return ie * D;
        } else
          ie !== -1 && (oe -= oe - ie), ie = -1;
    } else
      for (p + se > Q && (p = Q - se), oe = p; oe >= 0; oe--) {
        let ie = !0;
        for (let ue = 0; ue < se; ue++)
          if (ce(a, oe + ue) !== ce(l, ue)) {
            ie = !1;
            break;
          }
        if (ie)
          return oe;
      }
    return -1;
  }
  g(x, "arrayIndexOf"), o.prototype.includes = g(function(a, l, p) {
    return this.indexOf(
      a,
      l,
      p
    ) !== -1;
  }, "includes"), o.prototype.indexOf = g(function(a, l, p) {
    return P(this, a, l, p, !0);
  }, "indexOf"), o.prototype.lastIndexOf = g(function(a, l, p) {
    return P(this, a, l, p, !1);
  }, "lastIndexOf");
  function A(a, l, p, T) {
    p = Number(p) || 0;
    let N = a.length - p;
    T ? (T = Number(T), T > N && (T = N)) : T = N;
    let D = l.length;
    T > D / 2 && (T = D / 2);
    let Q;
    for (Q = 0; Q < T; ++Q) {
      let se = parseInt(l.substr(Q * 2, 2), 16);
      if (Ct(se))
        return Q;
      a[p + Q] = se;
    }
    return Q;
  }
  g(A, "hexWrite");
  function _(a, l, p, T) {
    return ht(_t(l, a.length - p), a, p, T);
  }
  g(_, "utf8Write");
  function O(a, l, p, T) {
    return ht(rn(l), a, p, T);
  }
  g(
    O,
    "asciiWrite"
  );
  function k(a, l, p, T) {
    return ht(ir(l), a, p, T);
  }
  g(k, "base64Write");
  function F(a, l, p, T) {
    return ht(
      nn(l, a.length - p),
      a,
      p,
      T
    );
  }
  g(F, "ucs2Write"), o.prototype.write = g(function(a, l, p, T) {
    if (l === void 0)
      T = "utf8", p = this.length, l = 0;
    else if (p === void 0 && typeof l == "string")
      T = l, p = this.length, l = 0;
    else if (isFinite(l))
      l = l >>> 0, isFinite(p) ? (p = p >>> 0, T === void 0 && (T = "utf8")) : (T = p, p = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let N = this.length - l;
    if ((p === void 0 || p > N) && (p = N), a.length > 0 && (p < 0 || l < 0) || l > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    T || (T = "utf8");
    let D = !1;
    for (; ; )
      switch (T) {
        case "hex":
          return A(this, a, l, p);
        case "utf8":
        case "utf-8":
          return _(this, a, l, p);
        case "ascii":
        case "latin1":
        case "binary":
          return O(this, a, l, p);
        case "base64":
          return k(this, a, l, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return F(this, a, l, p);
        default:
          if (D)
            throw new TypeError("Unknown encoding: " + T);
          T = ("" + T).toLowerCase(), D = !0;
      }
  }, "write"), o.prototype.toJSON = g(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function U(a, l, p) {
    return l === 0 && p === a.length ? e.fromByteArray(a) : e.fromByteArray(a.slice(l, p));
  }
  g(U, "base64Slice");
  function R(a, l, p) {
    p = Math.min(a.length, p);
    let T = [], N = l;
    for (; N < p; ) {
      let D = a[N], Q = null, se = D > 239 ? 4 : D > 223 ? 3 : D > 191 ? 2 : 1;
      if (N + se <= p) {
        let ce, oe, ie, ue;
        switch (se) {
          case 1:
            D < 128 && (Q = D);
            break;
          case 2:
            ce = a[N + 1], (ce & 192) === 128 && (ue = (D & 31) << 6 | ce & 63, ue > 127 && (Q = ue));
            break;
          case 3:
            ce = a[N + 1], oe = a[N + 2], (ce & 192) === 128 && (oe & 192) === 128 && (ue = (D & 15) << 12 | (ce & 63) << 6 | oe & 63, ue > 2047 && (ue < 55296 || ue > 57343) && (Q = ue));
            break;
          case 4:
            ce = a[N + 1], oe = a[N + 2], ie = a[N + 3], (ce & 192) === 128 && (oe & 192) === 128 && (ie & 192) === 128 && (ue = (D & 15) << 18 | (ce & 63) << 12 | (oe & 63) << 6 | ie & 63, ue > 65535 && ue < 1114112 && (Q = ue));
        }
      }
      Q === null ? (Q = 65533, se = 1) : Q > 65535 && (Q -= 65536, T.push(Q >>> 10 & 1023 | 55296), Q = 56320 | Q & 1023), T.push(Q), N += se;
    }
    return W(T);
  }
  g(R, "utf8Slice");
  var q = 4096;
  function W(a) {
    let l = a.length;
    if (l <= q)
      return String.fromCharCode.apply(String, a);
    let p = "", T = 0;
    for (; T < l; )
      p += String.fromCharCode.apply(String, a.slice(T, T += q));
    return p;
  }
  g(W, "decodeCodePointsArray");
  function G(a, l, p) {
    let T = "";
    p = Math.min(a.length, p);
    for (let N = l; N < p; ++N)
      T += String.fromCharCode(a[N] & 127);
    return T;
  }
  g(G, "asciiSlice");
  function te(a, l, p) {
    let T = "";
    p = Math.min(a.length, p);
    for (let N = l; N < p; ++N)
      T += String.fromCharCode(a[N]);
    return T;
  }
  g(te, "latin1Slice");
  function ne(a, l, p) {
    let T = a.length;
    (!l || l < 0) && (l = 0), (!p || p < 0 || p > T) && (p = T);
    let N = "";
    for (let D = l; D < p; ++D)
      N += yi[a[D]];
    return N;
  }
  g(ne, "hexSlice");
  function be(a, l, p) {
    let T = a.slice(l, p), N = "";
    for (let D = 0; D < T.length - 1; D += 2)
      N += String.fromCharCode(T[D] + T[D + 1] * 256);
    return N;
  }
  g(be, "utf16leSlice"), o.prototype.slice = g(function(a, l) {
    let p = this.length;
    a = ~~a, l = l === void 0 ? p : ~~l, a < 0 ? (a += p, a < 0 && (a = 0)) : a > p && (a = p), l < 0 ? (l += p, l < 0 && (l = 0)) : l > p && (l = p), l < a && (l = a);
    let T = this.subarray(a, l);
    return Object.setPrototypeOf(T, o.prototype), T;
  }, "slice");
  function ae(a, l, p) {
    if (a % 1 !== 0 || a < 0)
      throw new RangeError("offset is not uint");
    if (a + l > p)
      throw new RangeError("Trying to access beyond buffer length");
  }
  g(ae, "checkOffset"), o.prototype.readUintLE = o.prototype.readUIntLE = g(
    function(a, l, p) {
      a = a >>> 0, l = l >>> 0, p || ae(a, l, this.length);
      let T = this[a], N = 1, D = 0;
      for (; ++D < l && (N *= 256); )
        T += this[a + D] * N;
      return T;
    },
    "readUIntLE"
  ), o.prototype.readUintBE = o.prototype.readUIntBE = g(function(a, l, p) {
    a = a >>> 0, l = l >>> 0, p || ae(
      a,
      l,
      this.length
    );
    let T = this[a + --l], N = 1;
    for (; l > 0 && (N *= 256); )
      T += this[a + --l] * N;
    return T;
  }, "readUIntBE"), o.prototype.readUint8 = o.prototype.readUInt8 = g(
    function(a, l) {
      return a = a >>> 0, l || ae(a, 1, this.length), this[a];
    },
    "readUInt8"
  ), o.prototype.readUint16LE = o.prototype.readUInt16LE = g(function(a, l) {
    return a = a >>> 0, l || ae(
      a,
      2,
      this.length
    ), this[a] | this[a + 1] << 8;
  }, "readUInt16LE"), o.prototype.readUint16BE = o.prototype.readUInt16BE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 2, this.length), this[a] << 8 | this[a + 1];
  }, "readUInt16BE"), o.prototype.readUint32LE = o.prototype.readUInt32LE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 4, this.length), (this[a] | this[a + 1] << 8 | this[a + 2] << 16) + this[a + 3] * 16777216;
  }, "readUInt32LE"), o.prototype.readUint32BE = o.prototype.readUInt32BE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 4, this.length), this[a] * 16777216 + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]);
  }, "readUInt32BE"), o.prototype.readBigUInt64LE = Ne(g(function(a) {
    a = a >>> 0, qe(a, "offset");
    let l = this[a], p = this[a + 7];
    (l === void 0 || p === void 0) && Je(a, this.length - 8);
    let T = l + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24, N = this[++a] + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + p * 2 ** 24;
    return BigInt(T) + (BigInt(N) << BigInt(32));
  }, "readBigUInt64LE")), o.prototype.readBigUInt64BE = Ne(g(function(a) {
    a = a >>> 0, qe(a, "offset");
    let l = this[a], p = this[a + 7];
    (l === void 0 || p === void 0) && Je(a, this.length - 8);
    let T = l * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a], N = this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + p;
    return (BigInt(T) << BigInt(
      32
    )) + BigInt(N);
  }, "readBigUInt64BE")), o.prototype.readIntLE = g(function(a, l, p) {
    a = a >>> 0, l = l >>> 0, p || ae(
      a,
      l,
      this.length
    );
    let T = this[a], N = 1, D = 0;
    for (; ++D < l && (N *= 256); )
      T += this[a + D] * N;
    return N *= 128, T >= N && (T -= Math.pow(2, 8 * l)), T;
  }, "readIntLE"), o.prototype.readIntBE = g(function(a, l, p) {
    a = a >>> 0, l = l >>> 0, p || ae(a, l, this.length);
    let T = l, N = 1, D = this[a + --T];
    for (; T > 0 && (N *= 256); )
      D += this[a + --T] * N;
    return N *= 128, D >= N && (D -= Math.pow(2, 8 * l)), D;
  }, "readIntBE"), o.prototype.readInt8 = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 1, this.length), this[a] & 128 ? (255 - this[a] + 1) * -1 : this[a];
  }, "readInt8"), o.prototype.readInt16LE = g(function(a, l) {
    a = a >>> 0, l || ae(
      a,
      2,
      this.length
    );
    let p = this[a] | this[a + 1] << 8;
    return p & 32768 ? p | 4294901760 : p;
  }, "readInt16LE"), o.prototype.readInt16BE = g(function(a, l) {
    a = a >>> 0, l || ae(a, 2, this.length);
    let p = this[a + 1] | this[a] << 8;
    return p & 32768 ? p | 4294901760 : p;
  }, "readInt16BE"), o.prototype.readInt32LE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 4, this.length), this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24;
  }, "readInt32LE"), o.prototype.readInt32BE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 4, this.length), this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3];
  }, "readInt32BE"), o.prototype.readBigInt64LE = Ne(g(function(a) {
    a = a >>> 0, qe(a, "offset");
    let l = this[a], p = this[a + 7];
    (l === void 0 || p === void 0) && Je(a, this.length - 8);
    let T = this[a + 4] + this[a + 5] * 2 ** 8 + this[a + 6] * 2 ** 16 + (p << 24);
    return (BigInt(T) << BigInt(
      32
    )) + BigInt(l + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24);
  }, "readBigInt64LE")), o.prototype.readBigInt64BE = Ne(g(function(a) {
    a = a >>> 0, qe(a, "offset");
    let l = this[a], p = this[a + 7];
    (l === void 0 || p === void 0) && Je(a, this.length - 8);
    let T = (l << 24) + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a];
    return (BigInt(T) << BigInt(32)) + BigInt(
      this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + p
    );
  }, "readBigInt64BE")), o.prototype.readFloatLE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 4, this.length), t.read(this, a, !0, 23, 4);
  }, "readFloatLE"), o.prototype.readFloatBE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 4, this.length), t.read(this, a, !1, 23, 4);
  }, "readFloatBE"), o.prototype.readDoubleLE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 8, this.length), t.read(this, a, !0, 52, 8);
  }, "readDoubleLE"), o.prototype.readDoubleBE = g(function(a, l) {
    return a = a >>> 0, l || ae(a, 8, this.length), t.read(
      this,
      a,
      !1,
      52,
      8
    );
  }, "readDoubleBE");
  function pe(a, l, p, T, N, D) {
    if (!o.isBuffer(a))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (l > N || l < D)
      throw new RangeError('"value" argument is out of bounds');
    if (p + T > a.length)
      throw new RangeError("Index out of range");
  }
  g(pe, "checkInt"), o.prototype.writeUintLE = o.prototype.writeUIntLE = g(function(a, l, p, T) {
    if (a = +a, l = l >>> 0, p = p >>> 0, !T) {
      let Q = Math.pow(2, 8 * p) - 1;
      pe(
        this,
        a,
        l,
        p,
        Q,
        0
      );
    }
    let N = 1, D = 0;
    for (this[l] = a & 255; ++D < p && (N *= 256); )
      this[l + D] = a / N & 255;
    return l + p;
  }, "writeUIntLE"), o.prototype.writeUintBE = o.prototype.writeUIntBE = g(function(a, l, p, T) {
    if (a = +a, l = l >>> 0, p = p >>> 0, !T) {
      let Q = Math.pow(2, 8 * p) - 1;
      pe(this, a, l, p, Q, 0);
    }
    let N = p - 1, D = 1;
    for (this[l + N] = a & 255; --N >= 0 && (D *= 256); )
      this[l + N] = a / D & 255;
    return l + p;
  }, "writeUIntBE"), o.prototype.writeUint8 = o.prototype.writeUInt8 = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(this, a, l, 1, 255, 0), this[l] = a & 255, l + 1;
  }, "writeUInt8"), o.prototype.writeUint16LE = o.prototype.writeUInt16LE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(this, a, l, 2, 65535, 0), this[l] = a & 255, this[l + 1] = a >>> 8, l + 2;
  }, "writeUInt16LE"), o.prototype.writeUint16BE = o.prototype.writeUInt16BE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(this, a, l, 2, 65535, 0), this[l] = a >>> 8, this[l + 1] = a & 255, l + 2;
  }, "writeUInt16BE"), o.prototype.writeUint32LE = o.prototype.writeUInt32LE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(
      this,
      a,
      l,
      4,
      4294967295,
      0
    ), this[l + 3] = a >>> 24, this[l + 2] = a >>> 16, this[l + 1] = a >>> 8, this[l] = a & 255, l + 4;
  }, "writeUInt32LE"), o.prototype.writeUint32BE = o.prototype.writeUInt32BE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(
      this,
      a,
      l,
      4,
      4294967295,
      0
    ), this[l] = a >>> 24, this[l + 1] = a >>> 16, this[l + 2] = a >>> 8, this[l + 3] = a & 255, l + 4;
  }, "writeUInt32BE");
  function ct(a, l, p, T, N) {
    sr(l, T, N, a, p, 7);
    let D = Number(l & BigInt(4294967295));
    a[p++] = D, D = D >> 8, a[p++] = D, D = D >> 8, a[p++] = D, D = D >> 8, a[p++] = D;
    let Q = Number(l >> BigInt(32) & BigInt(4294967295));
    return a[p++] = Q, Q = Q >> 8, a[p++] = Q, Q = Q >> 8, a[p++] = Q, Q = Q >> 8, a[p++] = Q, p;
  }
  g(ct, "wrtBigUInt64LE");
  function Zt(a, l, p, T, N) {
    sr(l, T, N, a, p, 7);
    let D = Number(l & BigInt(4294967295));
    a[p + 7] = D, D = D >> 8, a[p + 6] = D, D = D >> 8, a[p + 5] = D, D = D >> 8, a[p + 4] = D;
    let Q = Number(l >> BigInt(32) & BigInt(4294967295));
    return a[p + 3] = Q, Q = Q >> 8, a[p + 2] = Q, Q = Q >> 8, a[p + 1] = Q, Q = Q >> 8, a[p] = Q, p + 8;
  }
  g(Zt, "wrtBigUInt64BE"), o.prototype.writeBigUInt64LE = Ne(g(function(a, l = 0) {
    return ct(this, a, l, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64LE")), o.prototype.writeBigUInt64BE = Ne(g(function(a, l = 0) {
    return Zt(this, a, l, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64BE")), o.prototype.writeIntLE = g(function(a, l, p, T) {
    if (a = +a, l = l >>> 0, !T) {
      let se = Math.pow(2, 8 * p - 1);
      pe(this, a, l, p, se - 1, -se);
    }
    let N = 0, D = 1, Q = 0;
    for (this[l] = a & 255; ++N < p && (D *= 256); )
      a < 0 && Q === 0 && this[l + N - 1] !== 0 && (Q = 1), this[l + N] = (a / D >> 0) - Q & 255;
    return l + p;
  }, "writeIntLE"), o.prototype.writeIntBE = g(function(a, l, p, T) {
    if (a = +a, l = l >>> 0, !T) {
      let se = Math.pow(2, 8 * p - 1);
      pe(this, a, l, p, se - 1, -se);
    }
    let N = p - 1, D = 1, Q = 0;
    for (this[l + N] = a & 255; --N >= 0 && (D *= 256); )
      a < 0 && Q === 0 && this[l + N + 1] !== 0 && (Q = 1), this[l + N] = (a / D >> 0) - Q & 255;
    return l + p;
  }, "writeIntBE"), o.prototype.writeInt8 = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(this, a, l, 1, 127, -128), a < 0 && (a = 255 + a + 1), this[l] = a & 255, l + 1;
  }, "writeInt8"), o.prototype.writeInt16LE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(this, a, l, 2, 32767, -32768), this[l] = a & 255, this[l + 1] = a >>> 8, l + 2;
  }, "writeInt16LE"), o.prototype.writeInt16BE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(this, a, l, 2, 32767, -32768), this[l] = a >>> 8, this[l + 1] = a & 255, l + 2;
  }, "writeInt16BE"), o.prototype.writeInt32LE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(
      this,
      a,
      l,
      4,
      2147483647,
      -2147483648
    ), this[l] = a & 255, this[l + 1] = a >>> 8, this[l + 2] = a >>> 16, this[l + 3] = a >>> 24, l + 4;
  }, "writeInt32LE"), o.prototype.writeInt32BE = g(function(a, l, p) {
    return a = +a, l = l >>> 0, p || pe(
      this,
      a,
      l,
      4,
      2147483647,
      -2147483648
    ), a < 0 && (a = 4294967295 + a + 1), this[l] = a >>> 24, this[l + 1] = a >>> 16, this[l + 2] = a >>> 8, this[l + 3] = a & 255, l + 4;
  }, "writeInt32BE"), o.prototype.writeBigInt64LE = Ne(g(function(a, l = 0) {
    return ct(this, a, l, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE")), o.prototype.writeBigInt64BE = Ne(
    g(function(a, l = 0) {
      return Zt(this, a, l, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE")
  );
  function er(a, l, p, T, N, D) {
    if (p + T > a.length)
      throw new RangeError("Index out of range");
    if (p < 0)
      throw new RangeError("Index out of range");
  }
  g(er, "checkIEEE754");
  function tr(a, l, p, T, N) {
    return l = +l, p = p >>> 0, N || er(a, l, p, 4), t.write(a, l, p, T, 23, 4), p + 4;
  }
  g(
    tr,
    "writeFloat"
  ), o.prototype.writeFloatLE = g(function(a, l, p) {
    return tr(this, a, l, !0, p);
  }, "writeFloatLE"), o.prototype.writeFloatBE = g(function(a, l, p) {
    return tr(this, a, l, !1, p);
  }, "writeFloatBE");
  function rr(a, l, p, T, N) {
    return l = +l, p = p >>> 0, N || er(a, l, p, 8), t.write(
      a,
      l,
      p,
      T,
      52,
      8
    ), p + 8;
  }
  g(rr, "writeDouble"), o.prototype.writeDoubleLE = g(function(a, l, p) {
    return rr(this, a, l, !0, p);
  }, "writeDoubleLE"), o.prototype.writeDoubleBE = g(function(a, l, p) {
    return rr(this, a, l, !1, p);
  }, "writeDoubleBE"), o.prototype.copy = g(function(a, l, p, T) {
    if (!o.isBuffer(a))
      throw new TypeError("argument should be a Buffer");
    if (p || (p = 0), !T && T !== 0 && (T = this.length), l >= a.length && (l = a.length), l || (l = 0), T > 0 && T < p && (T = p), T === p || a.length === 0 || this.length === 0)
      return 0;
    if (l < 0)
      throw new RangeError("targetStart out of bounds");
    if (p < 0 || p >= this.length)
      throw new RangeError("Index out of range");
    if (T < 0)
      throw new RangeError("sourceEnd out of bounds");
    T > this.length && (T = this.length), a.length - l < T - p && (T = a.length - l + p);
    let N = T - p;
    return this === a && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(l, p, T) : Uint8Array.prototype.set.call(a, this.subarray(p, T), l), N;
  }, "copy"), o.prototype.fill = g(function(a, l, p, T) {
    if (typeof a == "string") {
      if (typeof l == "string" ? (T = l, l = 0, p = this.length) : typeof p == "string" && (T = p, p = this.length), T !== void 0 && typeof T != "string")
        throw new TypeError("encoding must be a string");
      if (typeof T == "string" && !o.isEncoding(T))
        throw new TypeError(
          "Unknown encoding: " + T
        );
      if (a.length === 1) {
        let D = a.charCodeAt(0);
        (T === "utf8" && D < 128 || T === "latin1") && (a = D);
      }
    } else
      typeof a == "number" ? a = a & 255 : typeof a == "boolean" && (a = Number(a));
    if (l < 0 || this.length < l || this.length < p)
      throw new RangeError("Out of range index");
    if (p <= l)
      return this;
    l = l >>> 0, p = p === void 0 ? this.length : p >>> 0, a || (a = 0);
    let N;
    if (typeof a == "number")
      for (N = l; N < p; ++N)
        this[N] = a;
    else {
      let D = o.isBuffer(a) ? a : o.from(
        a,
        T
      ), Q = D.length;
      if (Q === 0)
        throw new TypeError('The value "' + a + '" is invalid for argument "value"');
      for (N = 0; N < p - l; ++N)
        this[N + l] = D[N % Q];
    }
    return this;
  }, "fill");
  var Ge = {};
  function Et(a, l, p) {
    var T;
    Ge[a] = (T = class extends p {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: l.apply(this, arguments), writable: !0, configurable: !0 }), this.name = `${this.name} [${a}]`, this.stack, delete this.name;
      }
      get code() {
        return a;
      }
      set code(N) {
        Object.defineProperty(
          this,
          "code",
          { configurable: !0, enumerable: !0, value: N, writable: !0 }
        );
      }
      toString() {
        return `${this.name} [${a}]: ${this.message}`;
      }
    }, g(T, "NodeError"), T);
  }
  g(Et, "E"), Et("ERR_BUFFER_OUT_OF_BOUNDS", function(a) {
    return a ? `${a} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError), Et(
    "ERR_INVALID_ARG_TYPE",
    function(a, l) {
      return `The "${a}" argument must be of type number. Received type ${typeof l}`;
    },
    TypeError
  ), Et("ERR_OUT_OF_RANGE", function(a, l, p) {
    let T = `The value of "${a}" is out of range.`, N = p;
    return Number.isInteger(p) && Math.abs(p) > 2 ** 32 ? N = nr(String(p)) : typeof p == "bigint" && (N = String(
      p
    ), (p > BigInt(2) ** BigInt(32) || p < -(BigInt(2) ** BigInt(32))) && (N = nr(N)), N += "n"), T += ` It must be ${l}. Received ${N}`, T;
  }, RangeError);
  function nr(a) {
    let l = "", p = a.length, T = a[0] === "-" ? 1 : 0;
    for (; p >= T + 4; p -= 3)
      l = `_${a.slice(p - 3, p)}${l}`;
    return `${a.slice(0, p)}${l}`;
  }
  g(nr, "addNumericalSeparator");
  function en(a, l, p) {
    qe(l, "offset"), (a[l] === void 0 || a[l + p] === void 0) && Je(l, a.length - (p + 1));
  }
  g(en, "checkBounds");
  function sr(a, l, p, T, N, D) {
    if (a > p || a < l) {
      let Q = typeof l == "bigint" ? "n" : "", se;
      throw D > 3 ? l === 0 || l === BigInt(0) ? se = `>= 0${Q} and < 2${Q} ** ${(D + 1) * 8}${Q}` : se = `>= -(2${Q} ** ${(D + 1) * 8 - 1}${Q}) and < 2 ** ${(D + 1) * 8 - 1}${Q}` : se = `>= ${l}${Q} and <= ${p}${Q}`, new Ge.ERR_OUT_OF_RANGE("value", se, a);
    }
    en(T, N, D);
  }
  g(sr, "checkIntBI");
  function qe(a, l) {
    if (typeof a != "number")
      throw new Ge.ERR_INVALID_ARG_TYPE(l, "number", a);
  }
  g(qe, "validateNumber");
  function Je(a, l, p) {
    throw Math.floor(a) !== a ? (qe(a, p), new Ge.ERR_OUT_OF_RANGE(p || "offset", "an integer", a)) : l < 0 ? new Ge.ERR_BUFFER_OUT_OF_BOUNDS() : new Ge.ERR_OUT_OF_RANGE(p || "offset", `>= ${p ? 1 : 0} and <= ${l}`, a);
  }
  g(Je, "boundsError");
  var mi = /[^+/0-9A-Za-z-_]/g;
  function tn(a) {
    if (a = a.split("=")[0], a = a.trim().replace(mi, ""), a.length < 2)
      return "";
    for (; a.length % 4 !== 0; )
      a = a + "=";
    return a;
  }
  g(tn, "base64clean");
  function _t(a, l) {
    l = l || 1 / 0;
    let p, T = a.length, N = null, D = [];
    for (let Q = 0; Q < T; ++Q) {
      if (p = a.charCodeAt(Q), p > 55295 && p < 57344) {
        if (!N) {
          if (p > 56319) {
            (l -= 3) > -1 && D.push(239, 191, 189);
            continue;
          } else if (Q + 1 === T) {
            (l -= 3) > -1 && D.push(239, 191, 189);
            continue;
          }
          N = p;
          continue;
        }
        if (p < 56320) {
          (l -= 3) > -1 && D.push(239, 191, 189), N = p;
          continue;
        }
        p = (N - 55296 << 10 | p - 56320) + 65536;
      } else
        N && (l -= 3) > -1 && D.push(239, 191, 189);
      if (N = null, p < 128) {
        if ((l -= 1) < 0)
          break;
        D.push(p);
      } else if (p < 2048) {
        if ((l -= 2) < 0)
          break;
        D.push(p >> 6 | 192, p & 63 | 128);
      } else if (p < 65536) {
        if ((l -= 3) < 0)
          break;
        D.push(p >> 12 | 224, p >> 6 & 63 | 128, p & 63 | 128);
      } else if (p < 1114112) {
        if ((l -= 4) < 0)
          break;
        D.push(p >> 18 | 240, p >> 12 & 63 | 128, p >> 6 & 63 | 128, p & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return D;
  }
  g(_t, "utf8ToBytes");
  function rn(a) {
    let l = [];
    for (let p = 0; p < a.length; ++p)
      l.push(a.charCodeAt(p) & 255);
    return l;
  }
  g(
    rn,
    "asciiToBytes"
  );
  function nn(a, l) {
    let p, T, N, D = [];
    for (let Q = 0; Q < a.length && !((l -= 2) < 0); ++Q)
      p = a.charCodeAt(
        Q
      ), T = p >> 8, N = p % 256, D.push(N), D.push(T);
    return D;
  }
  g(nn, "utf16leToBytes");
  function ir(a) {
    return e.toByteArray(
      tn(a)
    );
  }
  g(ir, "base64ToBytes");
  function ht(a, l, p, T) {
    let N;
    for (N = 0; N < T && !(N + p >= l.length || N >= a.length); ++N)
      l[N + p] = a[N];
    return N;
  }
  g(ht, "blitBuffer");
  function Ae(a, l) {
    return a instanceof l || a != null && a.constructor != null && a.constructor.name != null && a.constructor.name === l.name;
  }
  g(Ae, "isInstance");
  function Ct(a) {
    return a !== a;
  }
  g(Ct, "numberIsNaN");
  var yi = function() {
    let a = "0123456789abcdef", l = new Array(256);
    for (let p = 0; p < 16; ++p) {
      let T = p * 16;
      for (let N = 0; N < 16; ++N)
        l[T + N] = a[p] + a[N];
    }
    return l;
  }();
  function Ne(a) {
    return typeof BigInt > "u" ? sn : a;
  }
  g(Ne, "defineBigIntMethod");
  function sn() {
    throw new Error("BigInt not supported");
  }
  g(sn, "BufferBigIntNotDefined");
}), zt, Or, J, Z, V = we(() => {
  zt = globalThis, Or = globalThis.setImmediate ?? ((r) => setTimeout(r, 0)), J = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : hl().Buffer, Z = globalThis.process ?? {}, Z.env ?? (Z.env = {});
  try {
    Z.nextTick(() => {
    });
  } catch {
    let r = Promise.resolve();
    Z.nextTick = r.then.bind(r);
  }
}), Ke = ee((r, e) => {
  V();
  var t = typeof Reflect == "object" ? Reflect : null, n = t && typeof t.apply == "function" ? t.apply : g(function(P, x, A) {
    return Function.prototype.apply.call(P, x, A);
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
  function o() {
    o.init.call(this);
  }
  g(o, "EventEmitter"), e.exports = o, e.exports.once = C, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
  var h = 10;
  function m(P) {
    if (typeof P != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof P);
  }
  g(m, "checkListener"), Object.defineProperty(o, "defaultMaxListeners", { enumerable: !0, get: g(function() {
    return h;
  }, "get"), set: g(
    function(P) {
      if (typeof P != "number" || P < 0 || u(P))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + P + ".");
      h = P;
    },
    "set"
  ) }), o.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, o.prototype.setMaxListeners = g(function(P) {
    if (typeof P != "number" || P < 0 || u(P))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
    return this._maxListeners = P, this;
  }, "setMaxListeners");
  function d(P) {
    return P._maxListeners === void 0 ? o.defaultMaxListeners : P._maxListeners;
  }
  g(d, "_getMaxListeners"), o.prototype.getMaxListeners = g(function() {
    return d(this);
  }, "getMaxListeners"), o.prototype.emit = g(function(P) {
    for (var x = [], A = 1; A < arguments.length; A++)
      x.push(arguments[A]);
    var _ = P === "error", O = this._events;
    if (O !== void 0)
      _ = _ && O.error === void 0;
    else if (!_)
      return !1;
    if (_) {
      var k;
      if (x.length > 0 && (k = x[0]), k instanceof Error)
        throw k;
      var F = new Error("Unhandled error." + (k ? " (" + k.message + ")" : ""));
      throw F.context = k, F;
    }
    var U = O[P];
    if (U === void 0)
      return !1;
    if (typeof U == "function")
      n(U, this, x);
    else
      for (var R = U.length, q = w(U, R), A = 0; A < R; ++A)
        n(q[A], this, x);
    return !0;
  }, "emit");
  function b(P, x, A, _) {
    var O, k, F;
    if (m(
      A
    ), k = P._events, k === void 0 ? (k = P._events = /* @__PURE__ */ Object.create(null), P._eventsCount = 0) : (k.newListener !== void 0 && (P.emit("newListener", x, A.listener ? A.listener : A), k = P._events), F = k[x]), F === void 0)
      F = k[x] = A, ++P._eventsCount;
    else if (typeof F == "function" ? F = k[x] = _ ? [A, F] : [F, A] : _ ? F.unshift(A) : F.push(A), O = d(P), O > 0 && F.length > O && !F.warned) {
      F.warned = !0;
      var U = new Error("Possible EventEmitter memory leak detected. " + F.length + " " + String(x) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      U.name = "MaxListenersExceededWarning", U.emitter = P, U.type = x, U.count = F.length, i(U);
    }
    return P;
  }
  g(b, "_addListener"), o.prototype.addListener = g(function(P, x) {
    return b(this, P, x, !1);
  }, "addListener"), o.prototype.on = o.prototype.addListener, o.prototype.prependListener = g(function(P, x) {
    return b(this, P, x, !0);
  }, "prependListener");
  function y() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  g(y, "onceWrapper");
  function v(P, x, A) {
    var _ = {
      fired: !1,
      wrapFn: void 0,
      target: P,
      type: x,
      listener: A
    }, O = y.bind(_);
    return O.listener = A, _.wrapFn = O, O;
  }
  g(v, "_onceWrap"), o.prototype.once = g(function(P, x) {
    return m(x), this.on(P, v(this, P, x)), this;
  }, "once"), o.prototype.prependOnceListener = g(function(P, x) {
    return m(x), this.prependListener(P, v(this, P, x)), this;
  }, "prependOnceListener"), o.prototype.removeListener = g(function(P, x) {
    var A, _, O, k, F;
    if (m(x), _ = this._events, _ === void 0)
      return this;
    if (A = _[P], A === void 0)
      return this;
    if (A === x || A.listener === x)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete _[P], _.removeListener && this.emit("removeListener", P, A.listener || x));
    else if (typeof A != "function") {
      for (O = -1, k = A.length - 1; k >= 0; k--)
        if (A[k] === x || A[k].listener === x) {
          F = A[k].listener, O = k;
          break;
        }
      if (O < 0)
        return this;
      O === 0 ? A.shift() : S(A, O), A.length === 1 && (_[P] = A[0]), _.removeListener !== void 0 && this.emit("removeListener", P, F || x);
    }
    return this;
  }, "removeListener"), o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = g(function(P) {
    var x, A, _;
    if (A = this._events, A === void 0)
      return this;
    if (A.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : A[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete A[P]), this;
    if (arguments.length === 0) {
      var O = Object.keys(A), k;
      for (_ = 0; _ < O.length; ++_)
        k = O[_], k !== "removeListener" && this.removeAllListeners(
          k
        );
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (x = A[P], typeof x == "function")
      this.removeListener(P, x);
    else if (x !== void 0)
      for (_ = x.length - 1; _ >= 0; _--)
        this.removeListener(P, x[_]);
    return this;
  }, "removeAllListeners");
  function c(P, x, A) {
    var _ = P._events;
    if (_ === void 0)
      return [];
    var O = _[x];
    return O === void 0 ? [] : typeof O == "function" ? A ? [O.listener || O] : [O] : A ? E(O) : w(O, O.length);
  }
  g(c, "_listeners"), o.prototype.listeners = g(function(P) {
    return c(this, P, !0);
  }, "listeners"), o.prototype.rawListeners = g(function(P) {
    return c(this, P, !1);
  }, "rawListeners"), o.listenerCount = function(P, x) {
    return typeof P.listenerCount == "function" ? P.listenerCount(x) : f.call(P, x);
  }, o.prototype.listenerCount = f;
  function f(P) {
    var x = this._events;
    if (x !== void 0) {
      var A = x[P];
      if (typeof A == "function")
        return 1;
      if (A !== void 0)
        return A.length;
    }
    return 0;
  }
  g(f, "listenerCount"), o.prototype.eventNames = g(function() {
    return this._eventsCount > 0 ? s(this._events) : [];
  }, "eventNames");
  function w(P, x) {
    for (var A = new Array(x), _ = 0; _ < x; ++_)
      A[_] = P[_];
    return A;
  }
  g(w, "arrayClone");
  function S(P, x) {
    for (; x + 1 < P.length; x++)
      P[x] = P[x + 1];
    P.pop();
  }
  g(S, "spliceOne");
  function E(P) {
    for (var x = new Array(P.length), A = 0; A < x.length; ++A)
      x[A] = P[A].listener || P[A];
    return x;
  }
  g(E, "unwrapListeners");
  function C(P, x) {
    return new Promise(function(A, _) {
      function O(F) {
        P.removeListener(x, k), _(F);
      }
      g(O, "errorListener");
      function k() {
        typeof P.removeListener == "function" && P.removeListener("error", O), A([].slice.call(arguments));
      }
      g(k, "resolver"), $(P, x, k, { once: !0 }), x !== "error" && B(P, O, { once: !0 });
    });
  }
  g(C, "once");
  function B(P, x, A) {
    typeof P.on == "function" && $(P, "error", x, A);
  }
  g(
    B,
    "addErrorHandlerIfEventEmitter"
  );
  function $(P, x, A, _) {
    if (typeof P.on == "function")
      _.once ? P.once(x, A) : P.on(x, A);
    else if (typeof P.addEventListener == "function")
      P.addEventListener(x, g(function O(k) {
        _.once && P.removeEventListener(x, O), A(k);
      }, "wrapListener"));
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof P);
  }
  g($, "eventTargetAgnosticAddListener");
}), ts = {};
xe(ts, { Socket: () => Vt, isIP: () => rs });
function rs(r) {
  return 0;
}
var yn, dr, ft, Vt, Wt = we(() => {
  V(), yn = He(Ke(), 1), g(rs, "isIP"), dr = /^[^.]+\./, ft = class K extends yn.EventEmitter {
    constructor() {
      super(...arguments), Y(this, "opts", {}), Y(this, "connecting", !1), Y(this, "pending", !0), Y(
        this,
        "writable",
        !0
      ), Y(this, "encrypted", !1), Y(this, "authorized", !1), Y(this, "destroyed", !1), Y(this, "ws", null), Y(this, "writeBuffer"), Y(this, "tlsState", 0), Y(this, "tlsRead"), Y(this, "tlsWrite");
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
      let n = this.wsProxy;
      if (n === void 0)
        throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
      return typeof n == "function" ? n(e, t) : `${n}?address=${e}:${t}`;
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
    connect(e, t, n) {
      this.connecting = !0, n && this.once("connect", n);
      let s = g(() => {
        this.connecting = !1, this.pending = !1, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), i = g((o, h = !1) => {
        o.binaryType = "arraybuffer", o.addEventListener("error", (m) => {
          this.emit("error", m), this.emit("close");
        }), o.addEventListener("message", (m) => {
          if (this.tlsState === 0) {
            let d = J.from(m.data);
            this.emit("data", d);
          }
        }), o.addEventListener("close", () => {
          this.emit("close");
        }), h ? s() : o.addEventListener(
          "open",
          s
        );
      }, "configureWebSocket"), u;
      try {
        u = this.wsProxyAddrForHost(t, typeof e == "string" ? parseInt(e, 10) : e);
      } catch (o) {
        this.emit("error", o), this.emit("close");
        return;
      }
      try {
        let o = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u;
        if (this.webSocketConstructor !== void 0)
          this.ws = new this.webSocketConstructor(o), i(this.ws);
        else
          try {
            this.ws = new WebSocket(o), i(this.ws);
          } catch {
            this.ws = new __unstable_WebSocket(o), i(this.ws);
          }
      } catch (o) {
        let h = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
        fetch(h, { headers: { Upgrade: "websocket" } }).then(
          (m) => {
            if (this.ws = m.webSocket, this.ws == null)
              throw o;
            this.ws.accept(), i(this.ws, !0);
          }
        ).catch((m) => {
          this.emit(
            "error",
            new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${m}`)
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
      let t = await this.subtls.TrustedCert.databaseFromPEM(this.rootCerts), n = new this.subtls.WebSocketReadQueue(this.ws), s = n.read.bind(n), i = this.rawWrite.bind(this), { read: u, write: o } = await this.subtls.startTls(e, t, s, i, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u, this.tlsWrite = o, this.tlsState = 2, this.encrypted = !0, this.authorized = !0, this.emit("secureConnection", this), this.tlsReadLoop();
    }
    async tlsReadLoop() {
      for (; ; ) {
        let e = await this.tlsRead();
        if (e === void 0)
          break;
        {
          let t = J.from(e);
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
    write(e, t = "utf8", n = (s) => {
    }) {
      return e.length === 0 ? (n(), !0) : (typeof e == "string" && (e = J.from(e, t)), this.tlsState === 0 ? (this.rawWrite(e), n()) : this.tlsState === 1 ? this.once("secureConnection", () => {
        this.write(e, t, n);
      }) : (this.tlsWrite(
        e
      ), n()), !0);
    }
    end(e = J.alloc(0), t = "utf8", n = () => {
    }) {
      return this.write(e, t, () => {
        this.ws.close(), n();
      }), this;
    }
    destroy() {
      return this.destroyed = !0, this.end();
    }
  }, g(ft, "Socket"), Y(ft, "defaults", { poolQueryViaFetch: !1, fetchEndpoint: g(
    (r, e, t) => {
      let n;
      return t?.jwtAuth ? n = r.replace(dr, "apiauth.") : n = r.replace(dr, "api."), "https://" + n + "/sql";
    },
    "fetchEndpoint"
  ), fetchConnectionCache: !0, fetchFunction: void 0, webSocketConstructor: void 0, wsProxy: g(
    (r) => r + "/v2",
    "wsProxy"
  ), useSecureWebSocket: !0, forceDisablePgSSL: !0, coalesceWrites: !0, pipelineConnect: "password", subtls: void 0, rootCerts: "", pipelineTLS: !1, disableSNI: !1 }), Y(ft, "opts", {}), Vt = ft;
}), ns = {};
xe(ns, { parse: () => $r });
function $r(r, e = !1) {
  let { protocol: t } = new URL(r), n = "http:" + r.substring(
    t.length
  ), { username: s, password: i, host: u, hostname: o, port: h, pathname: m, search: d, searchParams: b, hash: y } = new URL(
    n
  );
  i = decodeURIComponent(i), s = decodeURIComponent(s), m = decodeURIComponent(m);
  let v = s + ":" + i, c = e ? Object.fromEntries(b.entries()) : d;
  return {
    href: r,
    protocol: t,
    auth: v,
    username: s,
    password: i,
    host: u,
    hostname: o,
    port: h,
    pathname: m,
    search: d,
    query: c,
    hash: y
  };
}
var ss = we(() => {
  V(), g($r, "parse");
}), is = ee((r) => {
  V(), r.parse = function(s, i) {
    return new t(s, i).parse();
  };
  var e = class os {
    constructor(i, u) {
      this.source = i, this.transform = u || n, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
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
      var u, o, h;
      for (this.consumeDimensions(); !this.isEof(); )
        if (u = this.nextCharacter(), u.value === "{" && !h)
          this.dimension++, this.dimension > 1 && (o = new os(this.source.substr(this.position - 1), this.transform), this.entries.push(o.parse(
            !0
          )), this.position += o.position - 2);
        else if (u.value === "}" && !h) {
          if (this.dimension--, !this.dimension && (this.newEntry(), i))
            return this.entries;
        } else
          u.value === '"' && !u.escaped ? (h && this.newEntry(!0), h = !h) : u.value === "," && !h ? this.newEntry() : this.record(u.value);
      if (this.dimension !== 0)
        throw new Error("array dimension not balanced");
      return this.entries;
    }
  };
  g(e, "ArrayParser");
  var t = e;
  function n(s) {
    return s;
  }
  g(n, "identity");
}), as = ee((r, e) => {
  V();
  var t = is();
  e.exports = { create: g(function(n, s) {
    return { parse: g(function() {
      return t.parse(n, s);
    }, "parse") };
  }, "create") };
}), fl = ee((r, e) => {
  V();
  var t = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, n = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, s = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, i = /^-?infinity$/;
  e.exports = g(function(d) {
    if (i.test(d))
      return Number(d.replace("i", "I"));
    var b = t.exec(d);
    if (!b)
      return u(
        d
      ) || null;
    var y = !!b[8], v = parseInt(b[1], 10);
    y && (v = h(v));
    var c = parseInt(b[2], 10) - 1, f = b[3], w = parseInt(
      b[4],
      10
    ), S = parseInt(b[5], 10), E = parseInt(b[6], 10), C = b[7];
    C = C ? 1e3 * parseFloat(C) : 0;
    var B, $ = o(d);
    return $ != null ? (B = new Date(Date.UTC(v, c, f, w, S, E, C)), m(v) && B.setUTCFullYear(v), $ !== 0 && B.setTime(B.getTime() - $)) : (B = new Date(v, c, f, w, S, E, C), m(v) && B.setFullYear(v)), B;
  }, "parseDate");
  function u(d) {
    var b = n.exec(d);
    if (b) {
      var y = parseInt(b[1], 10), v = !!b[4];
      v && (y = h(y));
      var c = parseInt(b[2], 10) - 1, f = b[3], w = new Date(y, c, f);
      return m(
        y
      ) && w.setFullYear(y), w;
    }
  }
  g(u, "getDate");
  function o(d) {
    if (d.endsWith("+00"))
      return 0;
    var b = s.exec(d.split(" ")[1]);
    if (b) {
      var y = b[1];
      if (y === "Z")
        return 0;
      var v = y === "-" ? -1 : 1, c = parseInt(b[2], 10) * 3600 + parseInt(
        b[3] || 0,
        10
      ) * 60 + parseInt(b[4] || 0, 10);
      return c * v * 1e3;
    }
  }
  g(o, "timeZoneOffset");
  function h(d) {
    return -(d - 1);
  }
  g(h, "bcYearToNegativeYear");
  function m(d) {
    return d >= 0 && d < 100;
  }
  g(m, "is0To99");
}), dl = ee((r, e) => {
  V(), e.exports = n;
  var t = Object.prototype.hasOwnProperty;
  function n(s) {
    for (var i = 1; i < arguments.length; i++) {
      var u = arguments[i];
      for (var o in u)
        t.call(u, o) && (s[o] = u[o]);
    }
    return s;
  }
  g(n, "extend");
}), pl = ee((r, e) => {
  V();
  var t = dl();
  e.exports = n;
  function n(E) {
    if (!(this instanceof n))
      return new n(E);
    t(this, S(E));
  }
  g(n, "PostgresInterval");
  var s = [
    "seconds",
    "minutes",
    "hours",
    "days",
    "months",
    "years"
  ];
  n.prototype.toPostgres = function() {
    var E = s.filter(this.hasOwnProperty, this);
    return this.milliseconds && E.indexOf("seconds") < 0 && E.push("seconds"), E.length === 0 ? "0" : E.map(function(C) {
      var B = this[C] || 0;
      return C === "seconds" && this.milliseconds && (B = (B + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), B + " " + C;
    }, this).join(" ");
  };
  var i = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, u = ["years", "months", "days"], o = ["hours", "minutes", "seconds"];
  n.prototype.toISOString = n.prototype.toISO = function() {
    var E = u.map(B, this).join(""), C = o.map(B, this).join("");
    return "P" + E + "T" + C;
    function B($) {
      var P = this[$] || 0;
      return $ === "seconds" && this.milliseconds && (P = (P + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), P + i[$];
    }
  };
  var h = "([+-]?\\d+)", m = h + "\\s+years?", d = h + "\\s+mons?", b = h + "\\s+days?", y = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", v = new RegExp([m, d, b, y].map(function(E) {
    return "(" + E + ")?";
  }).join("\\s*")), c = { years: 2, months: 4, days: 6, hours: 9, minutes: 10, seconds: 11, milliseconds: 12 }, f = ["hours", "minutes", "seconds", "milliseconds"];
  function w(E) {
    var C = E + "000000".slice(E.length);
    return parseInt(
      C,
      10
    ) / 1e3;
  }
  g(w, "parseMilliseconds");
  function S(E) {
    if (!E)
      return {};
    var C = v.exec(E), B = C[8] === "-";
    return Object.keys(c).reduce(function($, P) {
      var x = c[P], A = C[x];
      return !A || (A = P === "milliseconds" ? w(A) : parseInt(A, 10), !A) || (B && ~f.indexOf(P) && (A *= -1), $[P] = A), $;
    }, {});
  }
  g(S, "parse");
}), gl = ee((r, e) => {
  V(), e.exports = g(function(t) {
    if (/^\\x/.test(t))
      return new J(t.substr(
        2
      ), "hex");
    for (var n = "", s = 0; s < t.length; )
      if (t[s] !== "\\")
        n += t[s], ++s;
      else if (/[0-7]{3}/.test(t.substr(s + 1, 3)))
        n += String.fromCharCode(parseInt(t.substr(s + 1, 3), 8)), s += 4;
      else {
        for (var i = 1; s + i < t.length && t[s + i] === "\\"; )
          i++;
        for (var u = 0; u < Math.floor(i / 2); ++u)
          n += "\\";
        s += Math.floor(i / 2) * 2;
      }
    return new J(n, "binary");
  }, "parseBytea");
}), ml = ee((r, e) => {
  V();
  var t = is(), n = as(), s = fl(), i = pl(), u = gl();
  function o(_) {
    return g(function(O) {
      return O === null ? O : _(O);
    }, "nullAllowed");
  }
  g(o, "allowNull");
  function h(_) {
    return _ === null ? _ : _ === "TRUE" || _ === "t" || _ === "true" || _ === "y" || _ === "yes" || _ === "on" || _ === "1";
  }
  g(h, "parseBool");
  function m(_) {
    return _ ? t.parse(_, h) : null;
  }
  g(m, "parseBoolArray");
  function d(_) {
    return parseInt(_, 10);
  }
  g(d, "parseBaseTenInt");
  function b(_) {
    return _ ? t.parse(_, o(d)) : null;
  }
  g(b, "parseIntegerArray");
  function y(_) {
    return _ ? t.parse(_, o(function(O) {
      return B(O).trim();
    })) : null;
  }
  g(y, "parseBigIntegerArray");
  var v = g(function(_) {
    if (!_)
      return null;
    var O = n.create(_, function(k) {
      return k !== null && (k = P(k)), k;
    });
    return O.parse();
  }, "parsePointArray"), c = g(function(_) {
    if (!_)
      return null;
    var O = n.create(_, function(k) {
      return k !== null && (k = parseFloat(k)), k;
    });
    return O.parse();
  }, "parseFloatArray"), f = g(function(_) {
    if (!_)
      return null;
    var O = n.create(_);
    return O.parse();
  }, "parseStringArray"), w = g(function(_) {
    if (!_)
      return null;
    var O = n.create(
      _,
      function(k) {
        return k !== null && (k = s(k)), k;
      }
    );
    return O.parse();
  }, "parseDateArray"), S = g(function(_) {
    if (!_)
      return null;
    var O = n.create(_, function(k) {
      return k !== null && (k = i(k)), k;
    });
    return O.parse();
  }, "parseIntervalArray"), E = g(function(_) {
    return _ ? t.parse(_, o(u)) : null;
  }, "parseByteAArray"), C = g(function(_) {
    return parseInt(_, 10);
  }, "parseInteger"), B = g(function(_) {
    var O = String(_);
    return /^\d+$/.test(O) ? O : _;
  }, "parseBigInteger"), $ = g(function(_) {
    return _ ? t.parse(_, o(JSON.parse)) : null;
  }, "parseJsonArray"), P = g(
    function(_) {
      return _[0] !== "(" ? null : (_ = _.substring(1, _.length - 1).split(","), { x: parseFloat(_[0]), y: parseFloat(
        _[1]
      ) });
    },
    "parsePoint"
  ), x = g(function(_) {
    if (_[0] !== "<" && _[1] !== "(")
      return null;
    for (var O = "(", k = "", F = !1, U = 2; U < _.length - 1; U++) {
      if (F || (O += _[U]), _[U] === ")") {
        F = !0;
        continue;
      } else if (!F)
        continue;
      _[U] !== "," && (k += _[U]);
    }
    var R = P(O);
    return R.radius = parseFloat(k), R;
  }, "parseCircle"), A = g(function(_) {
    _(20, B), _(21, C), _(23, C), _(26, C), _(700, parseFloat), _(701, parseFloat), _(16, h), _(1082, s), _(1114, s), _(1184, s), _(
      600,
      P
    ), _(651, f), _(718, x), _(1e3, m), _(1001, E), _(1005, b), _(1007, b), _(1028, b), _(1016, y), _(1017, v), _(1021, c), _(1022, c), _(1231, c), _(1014, f), _(1015, f), _(1008, f), _(1009, f), _(1040, f), _(1041, f), _(
      1115,
      w
    ), _(1182, w), _(1185, w), _(1186, i), _(1187, S), _(17, u), _(114, JSON.parse.bind(JSON)), _(3802, JSON.parse.bind(JSON)), _(199, $), _(3807, $), _(3907, f), _(2951, f), _(791, f), _(1183, f), _(1270, f);
  }, "init");
  e.exports = { init: A };
}), yl = ee((r, e) => {
  V();
  var t = 1e6;
  function n(s) {
    var i = s.readInt32BE(0), u = s.readUInt32BE(
      4
    ), o = "";
    i < 0 && (i = ~i + (u === 0), u = ~u + 1 >>> 0, o = "-");
    var h = "", m, d, b, y, v, c;
    {
      if (m = i % t, i = i / t >>> 0, d = 4294967296 * m + u, u = d / t >>> 0, b = "" + (d - t * u), u === 0 && i === 0)
        return o + b + h;
      for (y = "", v = 6 - b.length, c = 0; c < v; c++)
        y += "0";
      h = y + b + h;
    }
    {
      if (m = i % t, i = i / t >>> 0, d = 4294967296 * m + u, u = d / t >>> 0, b = "" + (d - t * u), u === 0 && i === 0)
        return o + b + h;
      for (y = "", v = 6 - b.length, c = 0; c < v; c++)
        y += "0";
      h = y + b + h;
    }
    {
      if (m = i % t, i = i / t >>> 0, d = 4294967296 * m + u, u = d / t >>> 0, b = "" + (d - t * u), u === 0 && i === 0)
        return o + b + h;
      for (y = "", v = 6 - b.length, c = 0; c < v; c++)
        y += "0";
      h = y + b + h;
    }
    return m = i % t, d = 4294967296 * m + u, b = "" + d % t, o + b + h;
  }
  g(n, "readInt8"), e.exports = n;
}), wl = ee((r, e) => {
  V();
  var t = yl(), n = g(function(f, w, S, E, C) {
    S = S || 0, E = E || !1, C = C || function(F, U, R) {
      return F * Math.pow(2, R) + U;
    };
    var B = S >> 3, $ = g(function(F) {
      return E ? ~F & 255 : F;
    }, "inv"), P = 255, x = 8 - S % 8;
    w < x && (P = 255 << 8 - w & 255, x = w), S && (P = P >> S % 8);
    var A = 0;
    S % 8 + w >= 8 && (A = C(0, $(f[B]) & P, x));
    for (var _ = w + S >> 3, O = B + 1; O < _; O++)
      A = C(A, $(
        f[O]
      ), 8);
    var k = (w + S) % 8;
    return k > 0 && (A = C(A, $(f[_]) >> 8 - k, k)), A;
  }, "parseBits"), s = g(function(f, w, S) {
    var E = Math.pow(2, S - 1) - 1, C = n(f, 1), B = n(f, S, 1);
    if (B === 0)
      return 0;
    var $ = 1, P = g(function(A, _, O) {
      A === 0 && (A = 1);
      for (var k = 1; k <= O; k++)
        $ /= 2, (_ & 1 << O - k) > 0 && (A += $);
      return A;
    }, "parsePrecisionBits"), x = n(f, w, S + 1, !1, P);
    return B == Math.pow(
      2,
      S + 1
    ) - 1 ? x === 0 ? C === 0 ? 1 / 0 : -1 / 0 : NaN : (C === 0 ? 1 : -1) * Math.pow(2, B - E) * x;
  }, "parseFloatFromBits"), i = g(function(f) {
    return n(f, 1) == 1 ? -1 * (n(f, 15, 1, !0) + 1) : n(f, 15, 1);
  }, "parseInt16"), u = g(function(f) {
    return n(f, 1) == 1 ? -1 * (n(
      f,
      31,
      1,
      !0
    ) + 1) : n(f, 31, 1);
  }, "parseInt32"), o = g(function(f) {
    return s(f, 23, 8);
  }, "parseFloat32"), h = g(function(f) {
    return s(f, 52, 11);
  }, "parseFloat64"), m = g(function(f) {
    var w = n(f, 16, 32);
    if (w == 49152)
      return NaN;
    for (var S = Math.pow(1e4, n(f, 16, 16)), E = 0, C = [], B = n(f, 16), $ = 0; $ < B; $++)
      E += n(f, 16, 64 + 16 * $) * S, S /= 1e4;
    var P = Math.pow(10, n(
      f,
      16,
      48
    ));
    return (w === 0 ? 1 : -1) * Math.round(E * P) / P;
  }, "parseNumeric"), d = g(function(f, w) {
    var S = n(w, 1), E = n(
      w,
      63,
      1
    ), C = new Date((S === 0 ? 1 : -1) * E / 1e3 + 9466848e5);
    return f || C.setTime(C.getTime() + C.getTimezoneOffset() * 6e4), C.usec = E % 1e3, C.getMicroSeconds = function() {
      return this.usec;
    }, C.setMicroSeconds = function(B) {
      this.usec = B;
    }, C.getUTCMicroSeconds = function() {
      return this.usec;
    }, C;
  }, "parseDate"), b = g(
    function(f) {
      for (var w = n(
        f,
        32
      ), S = n(f, 32, 32), E = n(f, 32, 64), C = 96, B = [], $ = 0; $ < w; $++)
        B[$] = n(f, 32, C), C += 32, C += 32;
      var P = g(function(A) {
        var _ = n(f, 32, C);
        if (C += 32, _ == 4294967295)
          return null;
        var O;
        if (A == 23 || A == 20)
          return O = n(f, _ * 8, C), C += _ * 8, O;
        if (A == 25)
          return O = f.toString(this.encoding, C >> 3, (C += _ << 3) >> 3), O;
        console.log("ERROR: ElementType not implemented: " + A);
      }, "parseElement"), x = g(function(A, _) {
        var O = [], k;
        if (A.length > 1) {
          var F = A.shift();
          for (k = 0; k < F; k++)
            O[k] = x(A, _);
          A.unshift(F);
        } else
          for (k = 0; k < A[0]; k++)
            O[k] = P(_);
        return O;
      }, "parse");
      return x(B, E);
    },
    "parseArray"
  ), y = g(function(f) {
    return f.toString("utf8");
  }, "parseText"), v = g(function(f) {
    return f === null ? null : n(f, 8) > 0;
  }, "parseBool"), c = g(function(f) {
    f(20, t), f(21, i), f(23, u), f(26, u), f(1700, m), f(700, o), f(701, h), f(16, v), f(1114, d.bind(null, !1)), f(1184, d.bind(null, !0)), f(1e3, b), f(1007, b), f(1016, b), f(1008, b), f(1009, b), f(25, y);
  }, "init");
  e.exports = { init: c };
}), bl = ee((r, e) => {
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
}), Ht = ee((r) => {
  V();
  var e = ml(), t = wl(), n = as(), s = bl();
  r.getTypeParser = o, r.setTypeParser = h, r.arrayParser = n, r.builtins = s;
  var i = { text: {}, binary: {} };
  function u(m) {
    return String(m);
  }
  g(u, "noParse");
  function o(m, d) {
    return d = d || "text", i[d] && i[d][m] || u;
  }
  g(o, "getTypeParser");
  function h(m, d, b) {
    typeof d == "function" && (b = d, d = "text"), i[d][m] = b;
  }
  g(h, "setTypeParser"), e.init(function(m, d) {
    i.text[m] = d;
  }), t.init(function(m, d) {
    i.binary[m] = d;
  });
}), kr = ee((r, e) => {
  V();
  var t = Ht();
  function n(s) {
    this._types = s || t, this.text = {}, this.binary = {};
  }
  g(n, "TypeOverrides"), n.prototype.getOverrides = function(s) {
    switch (s) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  }, n.prototype.setTypeParser = function(s, i, u) {
    typeof i == "function" && (u = i, i = "text"), this.getOverrides(i)[s] = u;
  }, n.prototype.getTypeParser = function(s, i) {
    return i = i || "text", this.getOverrides(i)[s] || this._types.getTypeParser(s, i);
  }, e.exports = n;
});
function mt(r) {
  let e = 1779033703, t = 3144134277, n = 1013904242, s = 2773480762, i = 1359893119, u = 2600822924, o = 528734635, h = 1541459225, m = 0, d = 0, b = [
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
  ], y = g((E, C) => E >>> C | E << 32 - C, "rrot"), v = new Uint32Array(64), c = new Uint8Array(64), f = g(() => {
    for (let O = 0, k = 0; O < 16; O++, k += 4)
      v[O] = c[k] << 24 | c[k + 1] << 16 | c[k + 2] << 8 | c[k + 3];
    for (let O = 16; O < 64; O++) {
      let k = y(v[O - 15], 7) ^ y(v[O - 15], 18) ^ v[O - 15] >>> 3, F = y(
        v[O - 2],
        17
      ) ^ y(v[O - 2], 19) ^ v[O - 2] >>> 10;
      v[O] = v[O - 16] + k + v[O - 7] + F | 0;
    }
    let E = e, C = t, B = n, $ = s, P = i, x = u, A = o, _ = h;
    for (let O = 0; O < 64; O++) {
      let k = y(P, 6) ^ y(P, 11) ^ y(P, 25), F = P & x ^ ~P & A, U = _ + k + F + b[O] + v[O] | 0, R = y(E, 2) ^ y(
        E,
        13
      ) ^ y(E, 22), q = E & C ^ E & B ^ C & B, W = R + q | 0;
      _ = A, A = x, x = P, P = $ + U | 0, $ = B, B = C, C = E, E = U + W | 0;
    }
    e = e + E | 0, t = t + C | 0, n = n + B | 0, s = s + $ | 0, i = i + P | 0, u = u + x | 0, o = o + A | 0, h = h + _ | 0, d = 0;
  }, "process"), w = g((E) => {
    typeof E == "string" && (E = new TextEncoder().encode(E));
    for (let C = 0; C < E.length; C++)
      c[d++] = E[C], d === 64 && f();
    m += E.length;
  }, "add"), S = g(() => {
    if (c[d++] = 128, d == 64 && f(), d + 8 > 64) {
      for (; d < 64; )
        c[d++] = 0;
      f();
    }
    for (; d < 58; )
      c[d++] = 0;
    let E = m * 8;
    c[d++] = E / 1099511627776 & 255, c[d++] = E / 4294967296 & 255, c[d++] = E >>> 24, c[d++] = E >>> 16 & 255, c[d++] = E >>> 8 & 255, c[d++] = E & 255, f();
    let C = new Uint8Array(32);
    return C[0] = e >>> 24, C[1] = e >>> 16 & 255, C[2] = e >>> 8 & 255, C[3] = e & 255, C[4] = t >>> 24, C[5] = t >>> 16 & 255, C[6] = t >>> 8 & 255, C[7] = t & 255, C[8] = n >>> 24, C[9] = n >>> 16 & 255, C[10] = n >>> 8 & 255, C[11] = n & 255, C[12] = s >>> 24, C[13] = s >>> 16 & 255, C[14] = s >>> 8 & 255, C[15] = s & 255, C[16] = i >>> 24, C[17] = i >>> 16 & 255, C[18] = i >>> 8 & 255, C[19] = i & 255, C[20] = u >>> 24, C[21] = u >>> 16 & 255, C[22] = u >>> 8 & 255, C[23] = u & 255, C[24] = o >>> 24, C[25] = o >>> 16 & 255, C[26] = o >>> 8 & 255, C[27] = o & 255, C[28] = h >>> 24, C[29] = h >>> 16 & 255, C[30] = h >>> 8 & 255, C[31] = h & 255, C;
  }, "digest");
  return r === void 0 ? { add: w, digest: S } : (w(r), S());
}
var vl = we(() => {
  V(), g(mt, "sha256");
}), Le, Er, Sl = we(() => {
  V(), Le = class _e {
    constructor() {
      Y(this, "_dataLength", 0), Y(this, "_bufferLength", 0), Y(this, "_state", new Int32Array(4)), Y(this, "_buffer", new ArrayBuffer(68)), Y(this, "_buffer8"), Y(this, "_buffer32"), this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
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
      let t = _e.hexChars, n = _e.hexOut, s, i, u, o;
      for (o = 0; o < 4; o += 1)
        for (i = o * 8, s = e[o], u = 0; u < 8; u += 2)
          n[i + 1 + u] = t.charAt(s & 15), s >>>= 4, n[i + 0 + u] = t.charAt(
            s & 15
          ), s >>>= 4;
      return n.join("");
    }
    static _md5cycle(e, t) {
      let n = e[0], s = e[1], i = e[2], u = e[3];
      n += (s & i | ~s & u) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + s | 0, u += (n & s | ~n & i) + t[1] - 389564586 | 0, u = (u << 12 | u >>> 20) + n | 0, i += (u & n | ~u & s) + t[2] + 606105819 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & n) + t[3] - 1044525330 | 0, s = (s << 22 | s >>> 10) + i | 0, n += (s & i | ~s & u) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + s | 0, u += (n & s | ~n & i) + t[5] + 1200080426 | 0, u = (u << 12 | u >>> 20) + n | 0, i += (u & n | ~u & s) + t[6] - 1473231341 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & n) + t[7] - 45705983 | 0, s = (s << 22 | s >>> 10) + i | 0, n += (s & i | ~s & u) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + s | 0, u += (n & s | ~n & i) + t[9] - 1958414417 | 0, u = (u << 12 | u >>> 20) + n | 0, i += (u & n | ~u & s) + t[10] - 42063 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & n) + t[11] - 1990404162 | 0, s = (s << 22 | s >>> 10) + i | 0, n += (s & i | ~s & u) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + s | 0, u += (n & s | ~n & i) + t[13] - 40341101 | 0, u = (u << 12 | u >>> 20) + n | 0, i += (u & n | ~u & s) + t[14] - 1502002290 | 0, i = (i << 17 | i >>> 15) + u | 0, s += (i & u | ~i & n) + t[15] + 1236535329 | 0, s = (s << 22 | s >>> 10) + i | 0, n += (s & u | i & ~u) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + s | 0, u += (n & i | s & ~i) + t[6] - 1069501632 | 0, u = (u << 9 | u >>> 23) + n | 0, i += (u & s | n & ~s) + t[11] + 643717713 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & n | u & ~n) + t[0] - 373897302 | 0, s = (s << 20 | s >>> 12) + i | 0, n += (s & u | i & ~u) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + s | 0, u += (n & i | s & ~i) + t[10] + 38016083 | 0, u = (u << 9 | u >>> 23) + n | 0, i += (u & s | n & ~s) + t[15] - 660478335 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & n | u & ~n) + t[4] - 405537848 | 0, s = (s << 20 | s >>> 12) + i | 0, n += (s & u | i & ~u) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + s | 0, u += (n & i | s & ~i) + t[14] - 1019803690 | 0, u = (u << 9 | u >>> 23) + n | 0, i += (u & s | n & ~s) + t[3] - 187363961 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & n | u & ~n) + t[8] + 1163531501 | 0, s = (s << 20 | s >>> 12) + i | 0, n += (s & u | i & ~u) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + s | 0, u += (n & i | s & ~i) + t[2] - 51403784 | 0, u = (u << 9 | u >>> 23) + n | 0, i += (u & s | n & ~s) + t[7] + 1735328473 | 0, i = (i << 14 | i >>> 18) + u | 0, s += (i & n | u & ~n) + t[12] - 1926607734 | 0, s = (s << 20 | s >>> 12) + i | 0, n += (s ^ i ^ u) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + s | 0, u += (n ^ s ^ i) + t[8] - 2022574463 | 0, u = (u << 11 | u >>> 21) + n | 0, i += (u ^ n ^ s) + t[11] + 1839030562 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ n) + t[14] - 35309556 | 0, s = (s << 23 | s >>> 9) + i | 0, n += (s ^ i ^ u) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + s | 0, u += (n ^ s ^ i) + t[4] + 1272893353 | 0, u = (u << 11 | u >>> 21) + n | 0, i += (u ^ n ^ s) + t[7] - 155497632 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ n) + t[10] - 1094730640 | 0, s = (s << 23 | s >>> 9) + i | 0, n += (s ^ i ^ u) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + s | 0, u += (n ^ s ^ i) + t[0] - 358537222 | 0, u = (u << 11 | u >>> 21) + n | 0, i += (u ^ n ^ s) + t[3] - 722521979 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ n) + t[6] + 76029189 | 0, s = (s << 23 | s >>> 9) + i | 0, n += (s ^ i ^ u) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + s | 0, u += (n ^ s ^ i) + t[12] - 421815835 | 0, u = (u << 11 | u >>> 21) + n | 0, i += (u ^ n ^ s) + t[15] + 530742520 | 0, i = (i << 16 | i >>> 16) + u | 0, s += (i ^ u ^ n) + t[2] - 995338651 | 0, s = (s << 23 | s >>> 9) + i | 0, n += (i ^ (s | ~u)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + s | 0, u += (s ^ (n | ~i)) + t[7] + 1126891415 | 0, u = (u << 10 | u >>> 22) + n | 0, i += (n ^ (u | ~s)) + t[14] - 1416354905 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~n)) + t[5] - 57434055 | 0, s = (s << 21 | s >>> 11) + i | 0, n += (i ^ (s | ~u)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + s | 0, u += (s ^ (n | ~i)) + t[3] - 1894986606 | 0, u = (u << 10 | u >>> 22) + n | 0, i += (n ^ (u | ~s)) + t[10] - 1051523 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~n)) + t[1] - 2054922799 | 0, s = (s << 21 | s >>> 11) + i | 0, n += (i ^ (s | ~u)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + s | 0, u += (s ^ (n | ~i)) + t[15] - 30611744 | 0, u = (u << 10 | u >>> 22) + n | 0, i += (n ^ (u | ~s)) + t[6] - 1560198380 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~n)) + t[13] + 1309151649 | 0, s = (s << 21 | s >>> 11) + i | 0, n += (i ^ (s | ~u)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + s | 0, u += (s ^ (n | ~i)) + t[11] - 1120210379 | 0, u = (u << 10 | u >>> 22) + n | 0, i += (n ^ (u | ~s)) + t[2] + 718787259 | 0, i = (i << 15 | i >>> 17) + u | 0, s += (u ^ (i | ~n)) + t[9] - 343485551 | 0, s = (s << 21 | s >>> 11) + i | 0, e[0] = n + e[0] | 0, e[1] = s + e[1] | 0, e[2] = i + e[2] | 0, e[3] = u + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(_e.stateIdentity), this;
    }
    appendStr(e) {
      let t = this._buffer8, n = this._buffer32, s = this._bufferLength, i, u;
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
        s >= 64 && (this._dataLength += 64, _e._md5cycle(this._state, n), s -= 64, n[0] = n[16]);
      }
      return this._bufferLength = s, this;
    }
    appendAsciiStr(e) {
      let t = this._buffer8, n = this._buffer32, s = this._bufferLength, i, u = 0;
      for (; ; ) {
        for (i = Math.min(e.length - u, 64 - s); i--; )
          t[s++] = e.charCodeAt(u++);
        if (s < 64)
          break;
        this._dataLength += 64, _e._md5cycle(this._state, n), s = 0;
      }
      return this._bufferLength = s, this;
    }
    appendByteArray(e) {
      let t = this._buffer8, n = this._buffer32, s = this._bufferLength, i, u = 0;
      for (; ; ) {
        for (i = Math.min(e.length - u, 64 - s); i--; )
          t[s++] = e[u++];
        if (s < 64)
          break;
        this._dataLength += 64, _e._md5cycle(this._state, n), s = 0;
      }
      return this._bufferLength = s, this;
    }
    getState() {
      let e = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
    }
    setState(e) {
      let t = e.buffer, n = e.state, s = this._state, i;
      for (this._dataLength = e.length, this._bufferLength = e.buflen, s[0] = n[0], s[1] = n[1], s[2] = n[2], s[3] = n[3], i = 0; i < t.length; i += 1)
        this._buffer8[i] = t.charCodeAt(i);
    }
    end(e = !1) {
      let t = this._bufferLength, n = this._buffer8, s = this._buffer32, i = (t >> 2) + 1;
      this._dataLength += t;
      let u = this._dataLength * 8;
      if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, s.set(_e.buffer32Identity.subarray(i), i), t > 55 && (_e._md5cycle(this._state, s), s.set(_e.buffer32Identity)), u <= 4294967295)
        s[14] = u;
      else {
        let o = u.toString(16).match(/(.*?)(.{0,8})$/);
        if (o === null)
          return;
        let h = parseInt(
          o[2],
          16
        ), m = parseInt(o[1], 16) || 0;
        s[14] = h, s[15] = m;
      }
      return _e._md5cycle(this._state, s), e ? this._state : _e._hex(
        this._state
      );
    }
  }, g(Le, "Md5"), Y(Le, "stateIdentity", new Int32Array([1732584193, -271733879, -1732584194, 271733878])), Y(Le, "buffer32Identity", new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), Y(Le, "hexChars", "0123456789abcdef"), Y(Le, "hexOut", []), Y(Le, "onePassHasher", new Le()), Er = Le;
}), Dr = {};
xe(Dr, { createHash: () => ls, createHmac: () => cs, randomBytes: () => us });
function us(r) {
  return crypto.getRandomValues(J.alloc(r));
}
function ls(r) {
  if (r === "sha256")
    return { update: g(function(e) {
      return { digest: g(
        function() {
          return J.from(mt(e));
        },
        "digest"
      ) };
    }, "update") };
  if (r === "md5")
    return { update: g(function(e) {
      return {
        digest: g(function() {
          return typeof e == "string" ? Er.hashStr(e) : Er.hashByteArray(e);
        }, "digest")
      };
    }, "update") };
  throw new Error(`Hash type '${r}' not supported`);
}
function cs(r, e) {
  if (r !== "sha256")
    throw new Error(`Only sha256 is supported (requested: '${r}')`);
  return { update: g(function(t) {
    return { digest: g(
      function() {
        typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(
          t
        ));
        let n = e.length;
        if (n > 64)
          e = mt(e);
        else if (n < 64) {
          let h = new Uint8Array(64);
          h.set(e), e = h;
        }
        let s = new Uint8Array(
          64
        ), i = new Uint8Array(64);
        for (let h = 0; h < 64; h++)
          s[h] = 54 ^ e[h], i[h] = 92 ^ e[h];
        let u = new Uint8Array(t.length + 64);
        u.set(s, 0), u.set(t, 64);
        let o = new Uint8Array(96);
        return o.set(i, 0), o.set(mt(u), 64), J.from(mt(o));
      },
      "digest"
    ) };
  }, "update") };
}
var hs = we(() => {
  V(), vl(), Sl(), g(us, "randomBytes"), g(ls, "createHash"), g(cs, "createHmac");
}), Kt = ee((r, e) => {
  V(), e.exports = {
    host: "localhost",
    user: Z.platform === "win32" ? Z.env.USERNAME : Z.env.USER,
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
  var t = Ht(), n = t.getTypeParser(20, "text"), s = t.getTypeParser(
    1016,
    "text"
  );
  e.exports.__defineSetter__("parseInt8", function(i) {
    t.setTypeParser(20, "text", i ? t.getTypeParser(
      23,
      "text"
    ) : n), t.setTypeParser(1016, "text", i ? t.getTypeParser(1007, "text") : s);
  });
}), Gt = ee((r, e) => {
  V();
  var t = (hs(), fe(Dr)), n = Kt();
  function s(c) {
    var f = c.replace(
      /\\/g,
      "\\\\"
    ).replace(/"/g, '\\"');
    return '"' + f + '"';
  }
  g(s, "escapeElement");
  function i(c) {
    for (var f = "{", w = 0; w < c.length; w++)
      w > 0 && (f = f + ","), c[w] === null || typeof c[w] > "u" ? f = f + "NULL" : Array.isArray(c[w]) ? f = f + i(c[w]) : c[w] instanceof J ? f += "\\\\x" + c[w].toString("hex") : f += s(u(c[w]));
    return f = f + "}", f;
  }
  g(i, "arrayString");
  var u = g(function(c, f) {
    if (c == null)
      return null;
    if (c instanceof J)
      return c;
    if (ArrayBuffer.isView(c)) {
      var w = J.from(c.buffer, c.byteOffset, c.byteLength);
      return w.length === c.byteLength ? w : w.slice(c.byteOffset, c.byteOffset + c.byteLength);
    }
    return c instanceof Date ? n.parseInputDatesAsUTC ? d(c) : m(c) : Array.isArray(c) ? i(c) : typeof c == "object" ? o(c, f) : c.toString();
  }, "prepareValue");
  function o(c, f) {
    if (c && typeof c.toPostgres == "function") {
      if (f = f || [], f.indexOf(c) !== -1)
        throw new Error('circular reference detected while preparing "' + c + '" for query');
      return f.push(c), u(c.toPostgres(u), f);
    }
    return JSON.stringify(c);
  }
  g(o, "prepareObject");
  function h(c, f) {
    for (c = "" + c; c.length < f; )
      c = "0" + c;
    return c;
  }
  g(h, "pad");
  function m(c) {
    var f = -c.getTimezoneOffset(), w = c.getFullYear(), S = w < 1;
    S && (w = Math.abs(w) + 1);
    var E = h(w, 4) + "-" + h(c.getMonth() + 1, 2) + "-" + h(c.getDate(), 2) + "T" + h(
      c.getHours(),
      2
    ) + ":" + h(c.getMinutes(), 2) + ":" + h(c.getSeconds(), 2) + "." + h(c.getMilliseconds(), 3);
    return f < 0 ? (E += "-", f *= -1) : E += "+", E += h(Math.floor(f / 60), 2) + ":" + h(f % 60, 2), S && (E += " BC"), E;
  }
  g(m, "dateToString");
  function d(c) {
    var f = c.getUTCFullYear(), w = f < 1;
    w && (f = Math.abs(f) + 1);
    var S = h(f, 4) + "-" + h(c.getUTCMonth() + 1, 2) + "-" + h(c.getUTCDate(), 2) + "T" + h(c.getUTCHours(), 2) + ":" + h(c.getUTCMinutes(), 2) + ":" + h(c.getUTCSeconds(), 2) + "." + h(
      c.getUTCMilliseconds(),
      3
    );
    return S += "+00:00", w && (S += " BC"), S;
  }
  g(d, "dateToStringUTC");
  function b(c, f, w) {
    return c = typeof c == "string" ? { text: c } : c, f && (typeof f == "function" ? c.callback = f : c.values = f), w && (c.callback = w), c;
  }
  g(b, "normalizeQueryConfig");
  var y = g(function(c) {
    return t.createHash("md5").update(c, "utf-8").digest("hex");
  }, "md5"), v = g(
    function(c, f, w) {
      var S = y(f + c), E = y(J.concat([J.from(S), w]));
      return "md5" + E;
    },
    "postgresMd5PasswordHash"
  );
  e.exports = {
    prepareValue: g(function(c) {
      return u(c);
    }, "prepareValueWrapper"),
    normalizeQueryConfig: b,
    postgresMd5PasswordHash: v,
    md5: y
  };
}), Pt = {};
xe(Pt, { default: () => fs });
var fs, Jt = we(() => {
  V(), fs = {};
}), Pl = ee((r, e) => {
  V();
  var t = (hs(), fe(Dr));
  function n(f) {
    if (f.indexOf("SCRAM-SHA-256") === -1)
      throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let w = t.randomBytes(
      18
    ).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: w, response: "n,,n=*,r=" + w, message: "SASLInitialResponse" };
  }
  g(n, "startSession");
  function s(f, w, S) {
    if (f.message !== "SASLInitialResponse")
      throw new Error(
        "SASL: Last message was not SASLInitialResponse"
      );
    if (typeof w != "string")
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
    if (typeof S != "string")
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let E = m(S);
    if (E.nonce.startsWith(f.clientNonce)) {
      if (E.nonce.length === f.clientNonce.length)
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var C = J.from(E.salt, "base64"), B = c(w, C, E.iteration), $ = v(B, "Client Key"), P = y(
      $
    ), x = "n=*,r=" + f.clientNonce, A = "r=" + E.nonce + ",s=" + E.salt + ",i=" + E.iteration, _ = "c=biws,r=" + E.nonce, O = x + "," + A + "," + _, k = v(P, O), F = b($, k), U = F.toString("base64"), R = v(B, "Server Key"), q = v(R, O);
    f.message = "SASLResponse", f.serverSignature = q.toString("base64"), f.response = _ + ",p=" + U;
  }
  g(s, "continueSession");
  function i(f, w) {
    if (f.message !== "SASLResponse")
      throw new Error("SASL: Last message was not SASLResponse");
    if (typeof w != "string")
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: S } = d(
      w
    );
    if (S !== f.serverSignature)
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  g(i, "finalizeSession");
  function u(f) {
    if (typeof f != "string")
      throw new TypeError("SASL: text must be a string");
    return f.split("").map((w, S) => f.charCodeAt(S)).every((w) => w >= 33 && w <= 43 || w >= 45 && w <= 126);
  }
  g(u, "isPrintableChars");
  function o(f) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(f);
  }
  g(o, "isBase64");
  function h(f) {
    if (typeof f != "string")
      throw new TypeError("SASL: attribute pairs text must be a string");
    return new Map(f.split(",").map((w) => {
      if (!/^.=/.test(w))
        throw new Error("SASL: Invalid attribute pair entry");
      let S = w[0], E = w.substring(2);
      return [S, E];
    }));
  }
  g(h, "parseAttributePairs");
  function m(f) {
    let w = h(f), S = w.get("r");
    if (S) {
      if (!u(S))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let E = w.get("s");
    if (E) {
      if (!o(E))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let C = w.get("i");
    if (C) {
      if (!/^[1-9][0-9]*$/.test(C))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let B = parseInt(C, 10);
    return { nonce: S, salt: E, iteration: B };
  }
  g(m, "parseServerFirstMessage");
  function d(f) {
    let w = h(f).get("v");
    if (w) {
      if (!o(w))
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
    return { serverSignature: w };
  }
  g(d, "parseServerFinalMessage");
  function b(f, w) {
    if (!J.isBuffer(f))
      throw new TypeError("first argument must be a Buffer");
    if (!J.isBuffer(w))
      throw new TypeError(
        "second argument must be a Buffer"
      );
    if (f.length !== w.length)
      throw new Error("Buffer lengths must match");
    if (f.length === 0)
      throw new Error("Buffers cannot be empty");
    return J.from(f.map((S, E) => f[E] ^ w[E]));
  }
  g(b, "xorBuffers");
  function y(f) {
    return t.createHash("sha256").update(f).digest();
  }
  g(y, "sha256");
  function v(f, w) {
    return t.createHmac("sha256", f).update(w).digest();
  }
  g(v, "hmacSha256");
  function c(f, w, S) {
    for (var E = v(
      f,
      J.concat([w, J.from([0, 0, 0, 1])])
    ), C = E, B = 0; B < S - 1; B++)
      E = v(f, E), C = b(C, E);
    return C;
  }
  g(c, "Hi"), e.exports = { startSession: n, continueSession: s, finalizeSession: i };
}), Mr = {};
xe(Mr, { join: () => ds });
function ds(...r) {
  return r.join("/");
}
var ps = we(() => {
  V(), g(
    ds,
    "join"
  );
}), Qr = {};
xe(Qr, { stat: () => gs });
function gs(r, e) {
  e(new Error("No filesystem"));
}
var ms = we(() => {
  V(), g(gs, "stat");
}), qr = {};
xe(qr, { default: () => ys });
var ys, ws = we(() => {
  V(), ys = {};
}), bs = {};
xe(bs, { StringDecoder: () => vs });
var pr, vs, El = we(() => {
  V(), pr = class {
    constructor(e) {
      Y(this, "td"), this.td = new TextDecoder(e);
    }
    write(e) {
      return this.td.decode(e, { stream: !0 });
    }
    end(e) {
      return this.td.decode(e);
    }
  }, g(pr, "StringDecoder"), vs = pr;
}), _l = ee((r, e) => {
  V();
  var { Transform: t } = (ws(), fe(qr)), { StringDecoder: n } = (El(), fe(bs)), s = Symbol(
    "last"
  ), i = Symbol("decoder");
  function u(b, y, v) {
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
    for (let f = 0; f < c.length; f++)
      try {
        h(this, this.mapper(c[f]));
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
  function o(b) {
    if (this[s] += this[i].end(), this[s])
      try {
        h(this, this.mapper(this[s]));
      } catch (y) {
        return b(y);
      }
    b();
  }
  g(o, "flush");
  function h(b, y) {
    y !== void 0 && b.push(y);
  }
  g(h, "push");
  function m(b) {
    return b;
  }
  g(m, "noop");
  function d(b, y, v) {
    switch (b = b || /\r?\n/, y = y || m, v = v || {}, arguments.length) {
      case 1:
        typeof b == "function" ? (y = b, b = /\r?\n/) : typeof b == "object" && !(b instanceof RegExp) && !b[Symbol.split] && (v = b, b = /\r?\n/);
        break;
      case 2:
        typeof b == "function" ? (v = y, y = b, b = /\r?\n/) : typeof y == "object" && (v = y, y = m);
    }
    v = Object.assign({}, v), v.autoDestroy = !0, v.transform = u, v.flush = o, v.readableObjectMode = !0;
    let c = new t(v);
    return c[s] = "", c[i] = new n("utf8"), c.matcher = b, c.mapper = y, c.maxLength = v.maxLength, c.skipOverflow = v.skipOverflow || !1, c.overflow = !1, c._destroy = function(f, w) {
      this._writableState.errorEmitted = !1, w(f);
    }, c;
  }
  g(d, "split"), e.exports = d;
}), Cl = ee((r, e) => {
  V();
  var t = (ps(), fe(Mr)), n = (ws(), fe(qr)).Stream, s = _l(), i = (Jt(), fe(Pt)), u = 5432, o = Z.platform === "win32", h = Z.stderr, m = 56, d = 7, b = 61440, y = 32768;
  function v($) {
    return ($ & b) == y;
  }
  g(v, "isRegFile");
  var c = ["host", "port", "database", "user", "password"], f = c.length, w = c[f - 1];
  function S() {
    var $ = h instanceof n && h.writable === !0;
    if ($) {
      var P = Array.prototype.slice.call(arguments).concat(`
`);
      h.write(i.format.apply(i, P));
    }
  }
  g(S, "warn"), Object.defineProperty(e.exports, "isWin", { get: g(function() {
    return o;
  }, "get"), set: g(function($) {
    o = $;
  }, "set") }), e.exports.warnTo = function($) {
    var P = h;
    return h = $, P;
  }, e.exports.getFileName = function($) {
    var P = $ || Z.env, x = P.PGPASSFILE || (o ? t.join(P.APPDATA || "./", "postgresql", "pgpass.conf") : t.join(P.HOME || "./", ".pgpass"));
    return x;
  }, e.exports.usePgPass = function($, P) {
    return Object.prototype.hasOwnProperty.call(Z.env, "PGPASSWORD") ? !1 : o ? !0 : (P = P || "<unkn>", v($.mode) ? $.mode & (m | d) ? (S('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', P), !1) : !0 : (S('WARNING: password file "%s" is not a plain file', P), !1));
  };
  var E = e.exports.match = function($, P) {
    return c.slice(0, -1).reduce(function(x, A, _) {
      return _ == 1 && Number($[A] || u) === Number(
        P[A]
      ) ? x && !0 : x && (P[A] === "*" || P[A] === $[A]);
    }, !0);
  };
  e.exports.getPassword = function($, P, x) {
    var A, _ = P.pipe(
      s()
    );
    function O(U) {
      var R = C(U);
      R && B(R) && E($, R) && (A = R[w], _.end());
    }
    g(O, "onLine");
    var k = g(function() {
      P.destroy(), x(A);
    }, "onEnd"), F = g(function(U) {
      P.destroy(), S("WARNING: error on reading file: %s", U), x(
        void 0
      );
    }, "onErr");
    P.on("error", F), _.on("data", O).on("end", k).on("error", F);
  };
  var C = e.exports.parseLine = function($) {
    if ($.length < 11 || $.match(/^\s+#/))
      return null;
    for (var P = "", x = "", A = 0, _ = 0, O = 0, k = {}, F = !1, U = g(
      function(q, W, G) {
        var te = $.substring(W, G);
        Object.hasOwnProperty.call(Z.env, "PGPASS_NO_DEESCAPE") || (te = te.replace(/\\([:\\])/g, "$1")), k[c[q]] = te;
      },
      "addToObj"
    ), R = 0; R < $.length - 1; R += 1) {
      if (P = $.charAt(R + 1), x = $.charAt(
        R
      ), F = A == f - 1, F) {
        U(A, _);
        break;
      }
      R >= 0 && P == ":" && x !== "\\" && (U(A, _, R + 1), _ = R + 2, A += 1);
    }
    return k = Object.keys(k).length === f ? k : null, k;
  }, B = e.exports.isValidEntry = function($) {
    for (var P = { 0: function(k) {
      return k.length > 0;
    }, 1: function(k) {
      return k === "*" ? !0 : (k = Number(k), isFinite(k) && k > 0 && k < 9007199254740992 && Math.floor(k) === k);
    }, 2: function(k) {
      return k.length > 0;
    }, 3: function(k) {
      return k.length > 0;
    }, 4: function(k) {
      return k.length > 0;
    } }, x = 0; x < c.length; x += 1) {
      var A = P[x], _ = $[c[x]] || "", O = A(_);
      if (!O)
        return !1;
    }
    return !0;
  };
}), Tl = ee((r, e) => {
  V(), ps(), fe(Mr);
  var t = (ms(), fe(Qr)), n = Cl();
  e.exports = function(s, i) {
    var u = n.getFileName();
    t.stat(u, function(o, h) {
      if (o || !n.usePgPass(h, u))
        return i(void 0);
      var m = t.createReadStream(
        u
      );
      n.getPassword(s, m, i);
    });
  }, e.exports.warnTo = n.warnTo;
}), Ss = {};
xe(Ss, { default: () => Ps });
var Ps, Al = we(() => {
  V(), Ps = {};
}), xl = ee((r, e) => {
  V();
  var t = (ss(), fe(ns)), n = (ms(), fe(Qr));
  function s(i) {
    if (i.charAt(0) === "/") {
      var o = i.split(" ");
      return { host: o[0], database: o[1] };
    }
    var u = t.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(i) ? encodeURI(i).replace(/\%25(\d\d)/g, "%$1") : i, !0), o = u.query;
    for (var h in o)
      Array.isArray(o[h]) && (o[h] = o[h][o[h].length - 1]);
    var m = (u.auth || ":").split(":");
    if (o.user = m[0], o.password = m.splice(1).join(
      ":"
    ), o.port = u.port, u.protocol == "socket:")
      return o.host = decodeURI(u.pathname), o.database = u.query.db, o.client_encoding = u.query.encoding, o;
    o.host || (o.host = u.hostname);
    var d = u.pathname;
    if (!o.host && d && /^%2f/i.test(d)) {
      var b = d.split("/");
      o.host = decodeURIComponent(b[0]), d = b.splice(1).join("/");
    }
    switch (d && d.charAt(
      0
    ) === "/" && (d = d.slice(1) || null), o.database = d && decodeURI(d), (o.ssl === "true" || o.ssl === "1") && (o.ssl = !0), o.ssl === "0" && (o.ssl = !1), (o.sslcert || o.sslkey || o.sslrootcert || o.sslmode) && (o.ssl = {}), o.sslcert && (o.ssl.cert = n.readFileSync(o.sslcert).toString()), o.sslkey && (o.ssl.key = n.readFileSync(o.sslkey).toString()), o.sslrootcert && (o.ssl.ca = n.readFileSync(o.sslrootcert).toString()), o.sslmode) {
      case "disable": {
        o.ssl = !1;
        break;
      }
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        break;
      case "no-verify": {
        o.ssl.rejectUnauthorized = !1;
        break;
      }
    }
    return o;
  }
  g(s, "parse"), e.exports = s, s.parse = s;
}), Fr = ee((r, e) => {
  V();
  var t = (Al(), fe(Ss)), n = Kt(), s = xl().parse, i = g(function(b, y, v) {
    return v === void 0 ? v = Z.env["PG" + b.toUpperCase()] : v === !1 || (v = Z.env[v]), y[b] || v || n[b];
  }, "val"), u = g(function() {
    switch (Z.env.PGSSLMODE) {
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
    return n.ssl;
  }, "readSSLConfigFromEnvironment"), o = g(function(b) {
    return "'" + ("" + b).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  }, "quoteParamValue"), h = g(function(b, y, v) {
    var c = y[v];
    c != null && b.push(v + "=" + o(c));
  }, "add"), m = class {
    constructor(y) {
      y = typeof y == "string" ? s(y) : y || {}, y.connectionString && (y = Object.assign({}, y, s(y.connectionString))), this.user = i("user", y), this.database = i("database", y), this.database === void 0 && (this.database = this.user), this.port = parseInt(i("port", y), 10), this.host = i("host", y), Object.defineProperty(this, "password", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: i("password", y)
      }), this.binary = i("binary", y), this.options = i("options", y), this.ssl = typeof y.ssl > "u" ? u() : y.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = !0), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: !1 }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: !1 }), this.client_encoding = i("client_encoding", y), this.replication = i("replication", y), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = i("application_name", y, "PGAPPNAME"), this.fallback_application_name = i("fallback_application_name", y, !1), this.statement_timeout = i("statement_timeout", y, !1), this.lock_timeout = i("lock_timeout", y, !1), this.idle_in_transaction_session_timeout = i("idle_in_transaction_session_timeout", y, !1), this.query_timeout = i("query_timeout", y, !1), y.connectionTimeoutMillis === void 0 ? this.connect_timeout = Z.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(y.connectionTimeoutMillis / 1e3), y.keepAlive === !1 ? this.keepalives = 0 : y.keepAlive === !0 && (this.keepalives = 1), typeof y.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(y.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(y) {
      var v = [];
      h(v, this, "user"), h(v, this, "password"), h(v, this, "port"), h(v, this, "application_name"), h(
        v,
        this,
        "fallback_application_name"
      ), h(v, this, "connect_timeout"), h(v, this, "options");
      var c = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (h(v, c, "sslmode"), h(v, c, "sslca"), h(v, c, "sslkey"), h(v, c, "sslcert"), h(v, c, "sslrootcert"), this.database && v.push("dbname=" + o(this.database)), this.replication && v.push("replication=" + o(this.replication)), this.host && v.push("host=" + o(this.host)), this.isDomainSocket)
        return y(null, v.join(" "));
      this.client_encoding && v.push("client_encoding=" + o(this.client_encoding)), t.lookup(this.host, function(f, w) {
        return f ? y(f, null) : (v.push("hostaddr=" + o(w)), y(null, v.join(" ")));
      });
    }
  };
  g(m, "ConnectionParameters");
  var d = m;
  e.exports = d;
}), Il = ee((r, e) => {
  V();
  var t = Ht(), n = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, s = class {
    constructor(o, h) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = h, this.RowCtor = null, this.rowAsArray = o === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(o) {
      var h;
      o.text ? h = n.exec(o.text) : h = n.exec(o.command), h && (this.command = h[1], h[3] ? (this.oid = parseInt(
        h[2],
        10
      ), this.rowCount = parseInt(h[3], 10)) : h[2] && (this.rowCount = parseInt(h[2], 10)));
    }
    _parseRowAsArray(o) {
      for (var h = new Array(
        o.length
      ), m = 0, d = o.length; m < d; m++) {
        var b = o[m];
        b !== null ? h[m] = this._parsers[m](b) : h[m] = null;
      }
      return h;
    }
    parseRow(o) {
      for (var h = {}, m = 0, d = o.length; m < d; m++) {
        var b = o[m], y = this.fields[m].name;
        b !== null ? h[y] = this._parsers[m](
          b
        ) : h[y] = null;
      }
      return h;
    }
    addRow(o) {
      this.rows.push(o);
    }
    addFields(o) {
      this.fields = o, this.fields.length && (this._parsers = new Array(o.length));
      for (var h = 0; h < o.length; h++) {
        var m = o[h];
        this._types ? this._parsers[h] = this._types.getTypeParser(m.dataTypeID, m.format || "text") : this._parsers[h] = t.getTypeParser(m.dataTypeID, m.format || "text");
      }
    }
  };
  g(s, "Result");
  var i = s;
  e.exports = i;
}), Nl = ee((r, e) => {
  V();
  var { EventEmitter: t } = Ke(), n = Il(), s = Gt(), i = class extends t {
    constructor(h, m, d) {
      super(), h = s.normalizeQueryConfig(h, m, d), this.text = h.text, this.values = h.values, this.rows = h.rows, this.types = h.types, this.name = h.name, this.binary = h.binary, this.portal = h.portal || "", this.callback = h.callback, this._rowMode = h.rowMode, Z.domain && h.callback && (this.callback = Z.domain.bind(h.callback)), this._result = new n(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = !1, this._canceledDueToError = !1, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? !0 : !this.text || !this.values ? !1 : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new n(this._rowMode, this.types), this._results.push(this._result));
    }
    handleRowDescription(h) {
      this._checkForMultirow(), this._result.addFields(h.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(h) {
      let m;
      if (!this._canceledDueToError) {
        try {
          m = this._result.parseRow(
            h.fields
          );
        } catch (d) {
          this._canceledDueToError = d;
          return;
        }
        this.emit("row", m, this._result), this._accumulateRows && this._result.addRow(m);
      }
    }
    handleCommandComplete(h, m) {
      this._checkForMultirow(), this._result.addCommandComplete(
        h
      ), this.rows && m.sync();
    }
    handleEmptyQuery(h) {
      this.rows && h.sync();
    }
    handleError(h, m) {
      if (this._canceledDueToError && (h = this._canceledDueToError, this._canceledDueToError = !1), this.callback)
        return this.callback(h);
      this.emit("error", h);
    }
    handleReadyForQuery(h) {
      if (this._canceledDueToError)
        return this.handleError(
          this._canceledDueToError,
          h
        );
      if (this.callback)
        try {
          this.callback(null, this._results);
        } catch (m) {
          Z.nextTick(() => {
            throw m;
          });
        }
      this.emit(
        "end",
        this._results
      );
    }
    submit(h) {
      if (typeof this.text != "string" && typeof this.name != "string")
        return new Error(
          "A query must have either text or a name. Supplying neither is unsupported."
        );
      let m = h.parsedStatements[this.name];
      return this.text && m && this.text !== m ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(h) : h.query(this.text), null);
    }
    hasBeenParsed(h) {
      return this.name && h.parsedStatements[this.name];
    }
    handlePortalSuspended(h) {
      this._getRows(h, this.rows);
    }
    _getRows(h, m) {
      h.execute({ portal: this.portal, rows: m }), m ? h.flush() : h.sync();
    }
    prepare(h) {
      this.isPreparedStatement = !0, this.hasBeenParsed(h) || h.parse({ text: this.text, name: this.name, types: this.types });
      try {
        h.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: s.prepareValue });
      } catch (m) {
        this.handleError(m, h);
        return;
      }
      h.describe({ type: "P", name: this.portal || "" }), this._getRows(h, this.rows);
    }
    handleCopyInResponse(h) {
      h.sendCopyFail("No source stream defined");
    }
    handleCopyData(h, m) {
    }
  };
  g(i, "Query");
  var u = i;
  e.exports = u;
}), Es = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.NoticeMessage = r.DataRowMessage = r.CommandCompleteMessage = r.ReadyForQueryMessage = r.NotificationResponseMessage = r.BackendKeyDataMessage = r.AuthenticationMD5Password = r.ParameterStatusMessage = r.ParameterDescriptionMessage = r.RowDescriptionMessage = r.Field = r.CopyResponse = r.CopyDataMessage = r.DatabaseError = r.copyDone = r.emptyQuery = r.replicationStart = r.portalSuspended = r.noData = r.closeComplete = r.bindComplete = r.parseComplete = void 0, r.parseComplete = { name: "parseComplete", length: 5 }, r.bindComplete = { name: "bindComplete", length: 5 }, r.closeComplete = { name: "closeComplete", length: 5 }, r.noData = { name: "noData", length: 5 }, r.portalSuspended = { name: "portalSuspended", length: 5 }, r.replicationStart = { name: "replicationStart", length: 4 }, r.emptyQuery = { name: "emptyQuery", length: 4 }, r.copyDone = { name: "copyDone", length: 4 };
  var e = class extends Error {
    constructor(R, q, W) {
      super(R), this.length = q, this.name = W;
    }
  };
  g(e, "DatabaseError");
  var t = e;
  r.DatabaseError = t;
  var n = class {
    constructor(R, q) {
      this.length = R, this.chunk = q, this.name = "copyData";
    }
  };
  g(n, "CopyDataMessage");
  var s = n;
  r.CopyDataMessage = s;
  var i = class {
    constructor(R, q, W, G) {
      this.length = R, this.name = q, this.binary = W, this.columnTypes = new Array(G);
    }
  };
  g(i, "CopyResponse");
  var u = i;
  r.CopyResponse = u;
  var o = class {
    constructor(R, q, W, G, te, ne, be) {
      this.name = R, this.tableID = q, this.columnID = W, this.dataTypeID = G, this.dataTypeSize = te, this.dataTypeModifier = ne, this.format = be;
    }
  };
  g(o, "Field");
  var h = o;
  r.Field = h;
  var m = class {
    constructor(R, q) {
      this.length = R, this.fieldCount = q, this.name = "rowDescription", this.fields = new Array(this.fieldCount);
    }
  };
  g(m, "RowDescriptionMessage");
  var d = m;
  r.RowDescriptionMessage = d;
  var b = class {
    constructor(R, q) {
      this.length = R, this.parameterCount = q, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  };
  g(b, "ParameterDescriptionMessage");
  var y = b;
  r.ParameterDescriptionMessage = y;
  var v = class {
    constructor(R, q, W) {
      this.length = R, this.parameterName = q, this.parameterValue = W, this.name = "parameterStatus";
    }
  };
  g(v, "ParameterStatusMessage");
  var c = v;
  r.ParameterStatusMessage = c;
  var f = class {
    constructor(R, q) {
      this.length = R, this.salt = q, this.name = "authenticationMD5Password";
    }
  };
  g(f, "AuthenticationMD5Password");
  var w = f;
  r.AuthenticationMD5Password = w;
  var S = class {
    constructor(R, q, W) {
      this.length = R, this.processID = q, this.secretKey = W, this.name = "backendKeyData";
    }
  };
  g(S, "BackendKeyDataMessage");
  var E = S;
  r.BackendKeyDataMessage = E;
  var C = class {
    constructor(R, q, W, G) {
      this.length = R, this.processId = q, this.channel = W, this.payload = G, this.name = "notification";
    }
  };
  g(C, "NotificationResponseMessage");
  var B = C;
  r.NotificationResponseMessage = B;
  var $ = class {
    constructor(R, q) {
      this.length = R, this.status = q, this.name = "readyForQuery";
    }
  };
  g($, "ReadyForQueryMessage");
  var P = $;
  r.ReadyForQueryMessage = P;
  var x = class {
    constructor(R, q) {
      this.length = R, this.text = q, this.name = "commandComplete";
    }
  };
  g(x, "CommandCompleteMessage");
  var A = x;
  r.CommandCompleteMessage = A;
  var _ = class {
    constructor(R, q) {
      this.length = R, this.fields = q, this.name = "dataRow", this.fieldCount = q.length;
    }
  };
  g(_, "DataRowMessage");
  var O = _;
  r.DataRowMessage = O;
  var k = class {
    constructor(R, q) {
      this.length = R, this.message = q, this.name = "notice";
    }
  };
  g(k, "NoticeMessage");
  var F = k;
  r.NoticeMessage = F;
}), Ll = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.Writer = void 0;
  var e = class {
    constructor(s = 256) {
      this.size = s, this.offset = 5, this.headerPosition = 0, this.buffer = J.allocUnsafe(s);
    }
    ensure(s) {
      var i = this.buffer.length - this.offset;
      if (i < s) {
        var u = this.buffer, o = u.length + (u.length >> 1) + s;
        this.buffer = J.allocUnsafe(o), u.copy(this.buffer);
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
        var i = J.byteLength(s);
        this.ensure(i + 1), this.buffer.write(s, this.offset, "utf-8"), this.offset += i;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(s = "") {
      var i = J.byteLength(s);
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
      return this.offset = 5, this.headerPosition = 0, this.buffer = J.allocUnsafe(this.size), i;
    }
  };
  g(e, "Writer");
  var t = e;
  r.Writer = t;
}), Bl = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.serialize = void 0;
  var e = Ll(), t = new e.Writer(), n = g((R) => {
    t.addInt16(3).addInt16(0);
    for (let G of Object.keys(R))
      t.addCString(
        G
      ).addCString(R[G]);
    t.addCString("client_encoding").addCString("UTF8");
    var q = t.addCString("").flush(), W = q.length + 4;
    return new e.Writer().addInt32(W).add(q).flush();
  }, "startup"), s = g(() => {
    let R = J.allocUnsafe(
      8
    );
    return R.writeInt32BE(8, 0), R.writeInt32BE(80877103, 4), R;
  }, "requestSsl"), i = g((R) => t.addCString(R).flush(
    112
  ), "password"), u = g(function(R, q) {
    return t.addCString(R).addInt32(J.byteLength(q)).addString(q), t.flush(112);
  }, "sendSASLInitialResponseMessage"), o = g(function(R) {
    return t.addString(R).flush(112);
  }, "sendSCRAMClientFinalMessage"), h = g((R) => t.addCString(R).flush(81), "query"), m = [], d = g((R) => {
    let q = R.name || "";
    q.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", q, q.length), console.error("This can cause conflicts and silent errors executing queries"));
    let W = R.types || m;
    for (var G = W.length, te = t.addCString(q).addCString(R.text).addInt16(
      G
    ), ne = 0; ne < G; ne++)
      te.addInt32(W[ne]);
    return t.flush(80);
  }, "parse"), b = new e.Writer(), y = g(function(R, q) {
    for (let W = 0; W < R.length; W++) {
      let G = q ? q(R[W], W) : R[W];
      G == null ? (t.addInt16(0), b.addInt32(-1)) : G instanceof J ? (t.addInt16(
        1
      ), b.addInt32(G.length), b.add(G)) : (t.addInt16(0), b.addInt32(J.byteLength(G)), b.addString(G));
    }
  }, "writeValues"), v = g((R = {}) => {
    let q = R.portal || "", W = R.statement || "", G = R.binary || !1, te = R.values || m, ne = te.length;
    return t.addCString(q).addCString(W), t.addInt16(ne), y(te, R.valueMapper), t.addInt16(ne), t.add(b.flush()), t.addInt16(G ? 1 : 0), t.flush(66);
  }, "bind"), c = J.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), f = g((R) => {
    if (!R || !R.portal && !R.rows)
      return c;
    let q = R.portal || "", W = R.rows || 0, G = J.byteLength(q), te = 4 + G + 1 + 4, ne = J.allocUnsafe(1 + te);
    return ne[0] = 69, ne.writeInt32BE(te, 1), ne.write(q, 5, "utf-8"), ne[G + 5] = 0, ne.writeUInt32BE(W, ne.length - 4), ne;
  }, "execute"), w = g(
    (R, q) => {
      let W = J.allocUnsafe(16);
      return W.writeInt32BE(16, 0), W.writeInt16BE(1234, 4), W.writeInt16BE(
        5678,
        6
      ), W.writeInt32BE(R, 8), W.writeInt32BE(q, 12), W;
    },
    "cancel"
  ), S = g((R, q) => {
    let W = 4 + J.byteLength(q) + 1, G = J.allocUnsafe(1 + W);
    return G[0] = R, G.writeInt32BE(W, 1), G.write(q, 5, "utf-8"), G[W] = 0, G;
  }, "cstringMessage"), E = t.addCString("P").flush(68), C = t.addCString("S").flush(68), B = g((R) => R.name ? S(68, `${R.type}${R.name || ""}`) : R.type === "P" ? E : C, "describe"), $ = g((R) => {
    let q = `${R.type}${R.name || ""}`;
    return S(67, q);
  }, "close"), P = g((R) => t.add(R).flush(100), "copyData"), x = g((R) => S(102, R), "copyFail"), A = g((R) => J.from([R, 0, 0, 0, 4]), "codeOnlyBuffer"), _ = A(72), O = A(83), k = A(88), F = A(99), U = {
    startup: n,
    password: i,
    requestSsl: s,
    sendSASLInitialResponseMessage: u,
    sendSCRAMClientFinalMessage: o,
    query: h,
    parse: d,
    bind: v,
    execute: f,
    describe: B,
    close: $,
    flush: g(
      () => _,
      "flush"
    ),
    sync: g(() => O, "sync"),
    end: g(() => k, "end"),
    copyData: P,
    copyDone: g(() => F, "copyDone"),
    copyFail: x,
    cancel: w
  };
  r.serialize = U;
}), Rl = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.BufferReader = void 0;
  var e = J.allocUnsafe(0), t = class {
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
  var n = t;
  r.BufferReader = n;
}), Ol = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.Parser = void 0;
  var e = Es(), t = Rl(), n = 1, s = 4, i = n + s, u = J.allocUnsafe(0), o = class {
    constructor(d) {
      if (this.buffer = u, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new t.BufferReader(), d?.mode === "binary")
        throw new Error("Binary mode not supported yet");
      this.mode = d?.mode || "text";
    }
    parse(d, b) {
      this.mergeBuffer(d);
      let y = this.bufferOffset + this.bufferLength, v = this.bufferOffset;
      for (; v + i <= y; ) {
        let c = this.buffer[v], f = this.buffer.readUInt32BE(
          v + n
        ), w = n + f;
        if (w + v <= y) {
          let S = this.handlePacket(v + i, c, f, this.buffer);
          b(S), v += w;
        } else
          break;
      }
      v === y ? (this.buffer = u, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = y - v, this.bufferOffset = v);
    }
    mergeBuffer(d) {
      if (this.bufferLength > 0) {
        let b = this.bufferLength + d.byteLength;
        if (b + this.bufferOffset > this.buffer.byteLength) {
          let y;
          if (b <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength)
            y = this.buffer;
          else {
            let v = this.buffer.byteLength * 2;
            for (; b >= v; )
              v *= 2;
            y = J.allocUnsafe(v);
          }
          this.buffer.copy(y, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = y, this.bufferOffset = 0;
        }
        d.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = b;
      } else
        this.buffer = d, this.bufferOffset = 0, this.bufferLength = d.byteLength;
    }
    handlePacket(d, b, y, v) {
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
          return this.parseDataRowMessage(d, y, v);
        case 67:
          return this.parseCommandCompleteMessage(
            d,
            y,
            v
          );
        case 90:
          return this.parseReadyForQueryMessage(d, y, v);
        case 65:
          return this.parseNotificationMessage(
            d,
            y,
            v
          );
        case 82:
          return this.parseAuthenticationResponse(d, y, v);
        case 83:
          return this.parseParameterStatusMessage(
            d,
            y,
            v
          );
        case 75:
          return this.parseBackendKeyData(d, y, v);
        case 69:
          return this.parseErrorMessage(d, y, v, "error");
        case 78:
          return this.parseErrorMessage(d, y, v, "notice");
        case 84:
          return this.parseRowDescriptionMessage(
            d,
            y,
            v
          );
        case 116:
          return this.parseParameterDescriptionMessage(d, y, v);
        case 71:
          return this.parseCopyInMessage(
            d,
            y,
            v
          );
        case 72:
          return this.parseCopyOutMessage(d, y, v);
        case 100:
          return this.parseCopyData(d, y, v);
        default:
          return new e.DatabaseError("received invalid response: " + b.toString(16), y, "error");
      }
    }
    parseReadyForQueryMessage(d, b, y) {
      this.reader.setBuffer(d, y);
      let v = this.reader.string(1);
      return new e.ReadyForQueryMessage(b, v);
    }
    parseCommandCompleteMessage(d, b, y) {
      this.reader.setBuffer(d, y);
      let v = this.reader.cstring();
      return new e.CommandCompleteMessage(b, v);
    }
    parseCopyData(d, b, y) {
      let v = y.slice(d, d + (b - 4));
      return new e.CopyDataMessage(b, v);
    }
    parseCopyInMessage(d, b, y) {
      return this.parseCopyMessage(
        d,
        b,
        y,
        "copyInResponse"
      );
    }
    parseCopyOutMessage(d, b, y) {
      return this.parseCopyMessage(d, b, y, "copyOutResponse");
    }
    parseCopyMessage(d, b, y, v) {
      this.reader.setBuffer(d, y);
      let c = this.reader.byte() !== 0, f = this.reader.int16(), w = new e.CopyResponse(b, v, c, f);
      for (let S = 0; S < f; S++)
        w.columnTypes[S] = this.reader.int16();
      return w;
    }
    parseNotificationMessage(d, b, y) {
      this.reader.setBuffer(d, y);
      let v = this.reader.int32(), c = this.reader.cstring(), f = this.reader.cstring();
      return new e.NotificationResponseMessage(b, v, c, f);
    }
    parseRowDescriptionMessage(d, b, y) {
      this.reader.setBuffer(
        d,
        y
      );
      let v = this.reader.int16(), c = new e.RowDescriptionMessage(b, v);
      for (let f = 0; f < v; f++)
        c.fields[f] = this.parseField();
      return c;
    }
    parseField() {
      let d = this.reader.cstring(), b = this.reader.uint32(), y = this.reader.int16(), v = this.reader.uint32(), c = this.reader.int16(), f = this.reader.int32(), w = this.reader.int16() === 0 ? "text" : "binary";
      return new e.Field(d, b, y, v, c, f, w);
    }
    parseParameterDescriptionMessage(d, b, y) {
      this.reader.setBuffer(d, y);
      let v = this.reader.int16(), c = new e.ParameterDescriptionMessage(b, v);
      for (let f = 0; f < v; f++)
        c.dataTypeIDs[f] = this.reader.int32();
      return c;
    }
    parseDataRowMessage(d, b, y) {
      this.reader.setBuffer(d, y);
      let v = this.reader.int16(), c = new Array(v);
      for (let f = 0; f < v; f++) {
        let w = this.reader.int32();
        c[f] = w === -1 ? null : this.reader.string(w);
      }
      return new e.DataRowMessage(b, c);
    }
    parseParameterStatusMessage(d, b, y) {
      this.reader.setBuffer(d, y);
      let v = this.reader.cstring(), c = this.reader.cstring();
      return new e.ParameterStatusMessage(
        b,
        v,
        c
      );
    }
    parseBackendKeyData(d, b, y) {
      this.reader.setBuffer(d, y);
      let v = this.reader.int32(), c = this.reader.int32();
      return new e.BackendKeyDataMessage(b, v, c);
    }
    parseAuthenticationResponse(d, b, y) {
      this.reader.setBuffer(
        d,
        y
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
          let f;
          do
            f = this.reader.cstring(), f && c.mechanisms.push(f);
          while (f);
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
    parseErrorMessage(d, b, y, v) {
      this.reader.setBuffer(d, y);
      let c = {}, f = this.reader.string(1);
      for (; f !== "\0"; )
        c[f] = this.reader.cstring(), f = this.reader.string(1);
      let w = c.M, S = v === "notice" ? new e.NoticeMessage(b, w) : new e.DatabaseError(w, b, v);
      return S.severity = c.S, S.code = c.C, S.detail = c.D, S.hint = c.H, S.position = c.P, S.internalPosition = c.p, S.internalQuery = c.q, S.where = c.W, S.schema = c.s, S.table = c.t, S.column = c.c, S.dataType = c.d, S.constraint = c.n, S.file = c.F, S.line = c.L, S.routine = c.R, S;
    }
  };
  g(o, "Parser");
  var h = o;
  r.Parser = h;
}), _s = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.DatabaseError = r.serialize = r.parse = void 0;
  var e = Es();
  Object.defineProperty(r, "DatabaseError", { enumerable: !0, get: g(
    function() {
      return e.DatabaseError;
    },
    "get"
  ) });
  var t = Bl();
  Object.defineProperty(r, "serialize", {
    enumerable: !0,
    get: g(function() {
      return t.serialize;
    }, "get")
  });
  var n = Ol();
  function s(i, u) {
    let o = new n.Parser();
    return i.on("data", (h) => o.parse(h, u)), new Promise((h) => i.on("end", () => h()));
  }
  g(s, "parse"), r.parse = s;
}), Cs = {};
xe(Cs, { connect: () => Ts });
function Ts({ socket: r, servername: e }) {
  return r.startTls(e), r;
}
var $l = we(
  () => {
    V(), g(Ts, "connect");
  }
), As = ee((r, e) => {
  V();
  var t = (Wt(), fe(ts)), n = Ke().EventEmitter, { parse: s, serialize: i } = _s(), u = i.flush(), o = i.sync(), h = i.end(), m = class extends n {
    constructor(y) {
      super(), y = y || {}, this.stream = y.stream || new t.Socket(), this._keepAlive = y.keepAlive, this._keepAliveInitialDelayMillis = y.keepAliveInitialDelayMillis, this.lastBuffer = !1, this.parsedStatements = {}, this.ssl = y.ssl || !1, this._ending = !1, this._emitMessage = !1;
      var v = this;
      this.on("newListener", function(c) {
        c === "message" && (v._emitMessage = !0);
      });
    }
    connect(y, v) {
      var c = this;
      this._connecting = !0, this.stream.setNoDelay(!0), this.stream.connect(y, v), this.stream.once("connect", function() {
        c._keepAlive && c.stream.setKeepAlive(!0, c._keepAliveInitialDelayMillis), c.emit("connect");
      });
      let f = g(function(w) {
        c._ending && (w.code === "ECONNRESET" || w.code === "EPIPE") || c.emit("error", w);
      }, "reportStreamError");
      if (this.stream.on("error", f), this.stream.on("close", function() {
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
        var E = ($l(), fe(Cs));
        let C = { socket: c.stream };
        c.ssl !== !0 && (Object.assign(C, c.ssl), "key" in c.ssl && (C.key = c.ssl.key)), t.isIP(v) === 0 && (C.servername = v);
        try {
          c.stream = E.connect(C);
        } catch (B) {
          return c.emit(
            "error",
            B
          );
        }
        c.attachListeners(c.stream), c.stream.on("error", f), c.emit("sslconnect");
      });
    }
    attachListeners(y) {
      y.on(
        "end",
        () => {
          this.emit("end");
        }
      ), s(y, (v) => {
        var c = v.name === "error" ? "errorMessage" : v.name;
        this._emitMessage && this.emit("message", v), this.emit(c, v);
      });
    }
    requestSsl() {
      this.stream.write(i.requestSsl());
    }
    startup(y) {
      this.stream.write(i.startup(y));
    }
    cancel(y, v) {
      this._send(i.cancel(y, v));
    }
    password(y) {
      this._send(i.password(y));
    }
    sendSASLInitialResponseMessage(y, v) {
      this._send(i.sendSASLInitialResponseMessage(y, v));
    }
    sendSCRAMClientFinalMessage(y) {
      this._send(i.sendSCRAMClientFinalMessage(
        y
      ));
    }
    _send(y) {
      return this.stream.writable ? this.stream.write(y) : !1;
    }
    query(y) {
      this._send(i.query(y));
    }
    parse(y) {
      this._send(i.parse(y));
    }
    bind(y) {
      this._send(i.bind(y));
    }
    execute(y) {
      this._send(i.execute(y));
    }
    flush() {
      this.stream.writable && this.stream.write(u);
    }
    sync() {
      this._ending = !0, this._send(u), this._send(o);
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
      return this.stream.write(h, () => {
        this.stream.end();
      });
    }
    close(y) {
      this._send(i.close(y));
    }
    describe(y) {
      this._send(i.describe(y));
    }
    sendCopyFromChunk(y) {
      this._send(i.copyData(y));
    }
    endCopyFrom() {
      this._send(i.copyDone());
    }
    sendCopyFail(y) {
      this._send(i.copyFail(y));
    }
  };
  g(m, "Connection");
  var d = m;
  e.exports = d;
}), kl = ee((r, e) => {
  V();
  var t = Ke().EventEmitter;
  Jt(), fe(Pt);
  var n = Gt(), s = Pl(), i = Tl(), u = kr(), o = Fr(), h = Nl(), m = Kt(), d = As(), b = class extends t {
    constructor(c) {
      super(), this.connectionParameters = new o(c), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(
        this,
        "password",
        { configurable: !0, enumerable: !1, writable: !0, value: this.connectionParameters.password }
      ), this.replication = this.connectionParameters.replication;
      var f = c || {};
      this._Promise = f.Promise || zt.Promise, this._types = new u(f.types), this._ending = !1, this._connecting = !1, this._connected = !1, this._connectionError = !1, this._queryable = !0, this.connection = f.connection || new d({ stream: f.stream, ssl: this.connectionParameters.ssl, keepAlive: f.keepAlive || !1, keepAliveInitialDelayMillis: f.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = f.binary || m.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || !1, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: !1 }), this._connectionTimeoutMillis = f.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(c) {
      let f = g((w) => {
        Z.nextTick(() => {
          w.handleError(c, this.connection);
        });
      }, "enqueueError");
      this.activeQuery && (f(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(f), this.queryQueue.length = 0;
    }
    _connect(c) {
      var f = this, w = this.connection;
      if (this._connectionCallback = c, this._connecting || this._connected) {
        let S = new Error("Client has already been connected. You cannot reuse a client.");
        Z.nextTick(
          () => {
            c(S);
          }
        );
        return;
      }
      this._connecting = !0, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        w._ending = !0, w.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? w.connect(this.host + "/.s.PGSQL." + this.port) : w.connect(this.port, this.host), w.on("connect", function() {
        f.ssl ? w.requestSsl() : w.startup(f.getStartupConf());
      }), w.on("sslconnect", function() {
        w.startup(f.getStartupConf());
      }), this._attachListeners(
        w
      ), w.once("end", () => {
        let S = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(S), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(S) : this._handleErrorEvent(S) : this._connectionError || this._handleErrorEvent(S)), Z.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(c) {
      if (c) {
        this._connect(c);
        return;
      }
      return new this._Promise((f, w) => {
        this._connect((S) => {
          S ? w(S) : f();
        });
      });
    }
    _attachListeners(c) {
      c.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), c.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), c.on("authenticationSASL", this._handleAuthSASL.bind(this)), c.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), c.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), c.on("backendKeyData", this._handleBackendKeyData.bind(this)), c.on("error", this._handleErrorEvent.bind(this)), c.on("errorMessage", this._handleErrorMessage.bind(this)), c.on("readyForQuery", this._handleReadyForQuery.bind(this)), c.on("notice", this._handleNotice.bind(this)), c.on("rowDescription", this._handleRowDescription.bind(this)), c.on("dataRow", this._handleDataRow.bind(this)), c.on("portalSuspended", this._handlePortalSuspended.bind(
        this
      )), c.on("emptyQuery", this._handleEmptyQuery.bind(this)), c.on("commandComplete", this._handleCommandComplete.bind(this)), c.on("parseComplete", this._handleParseComplete.bind(this)), c.on("copyInResponse", this._handleCopyInResponse.bind(this)), c.on("copyData", this._handleCopyData.bind(this)), c.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(c) {
      let f = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(() => this.password()).then((w) => {
        if (w !== void 0) {
          if (typeof w != "string") {
            f.emit("error", new TypeError(
              "Password must be a string"
            ));
            return;
          }
          this.connectionParameters.password = this.password = w;
        } else
          this.connectionParameters.password = this.password = null;
        c();
      }).catch((w) => {
        f.emit("error", w);
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
          let f = n.postgresMd5PasswordHash(this.user, this.password, c.salt);
          this.connection.password(f);
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
      let { activeQuery: f } = this;
      this.activeQuery = null, this.readyForQuery = !0, f && f.handleReadyForQuery(this.connection), this._pulseQueryQueue();
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
      let f = this.activeQuery;
      if (!f) {
        this._handleErrorEvent(c);
        return;
      }
      this.activeQuery = null, f.handleError(
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
      var c = this.connectionParameters, f = { user: c.user, database: c.database }, w = c.application_name || c.fallback_application_name;
      return w && (f.application_name = w), c.replication && (f.replication = "" + c.replication), c.statement_timeout && (f.statement_timeout = String(parseInt(c.statement_timeout, 10))), c.lock_timeout && (f.lock_timeout = String(parseInt(c.lock_timeout, 10))), c.idle_in_transaction_session_timeout && (f.idle_in_transaction_session_timeout = String(parseInt(c.idle_in_transaction_session_timeout, 10))), c.options && (f.options = c.options), f;
    }
    cancel(c, f) {
      if (c.activeQuery === f) {
        var w = this.connection;
        this.host && this.host.indexOf("/") === 0 ? w.connect(this.host + "/.s.PGSQL." + this.port) : w.connect(this.port, this.host), w.on("connect", function() {
          w.cancel(
            c.processID,
            c.secretKey
          );
        });
      } else
        c.queryQueue.indexOf(f) !== -1 && c.queryQueue.splice(c.queryQueue.indexOf(f), 1);
    }
    setTypeParser(c, f, w) {
      return this._types.setTypeParser(c, f, w);
    }
    getTypeParser(c, f) {
      return this._types.getTypeParser(c, f);
    }
    escapeIdentifier(c) {
      return '"' + c.replace(/"/g, '""') + '"';
    }
    escapeLiteral(c) {
      for (var f = !1, w = "'", S = 0; S < c.length; S++) {
        var E = c[S];
        E === "'" ? w += E + E : E === "\\" ? (w += E + E, f = !0) : w += E;
      }
      return w += "'", f === !0 && (w = " E" + w), w;
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === !0)
        if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
          this.readyForQuery = !1, this.hasExecuted = !0;
          let c = this.activeQuery.submit(this.connection);
          c && Z.nextTick(() => {
            this.activeQuery.handleError(c, this.connection), this.readyForQuery = !0, this._pulseQueryQueue();
          });
        } else
          this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
    }
    query(c, f, w) {
      var S, E, C, B, $;
      if (c == null)
        throw new TypeError(
          "Client was passed a null or undefined query"
        );
      return typeof c.submit == "function" ? (C = c.query_timeout || this.connectionParameters.query_timeout, E = S = c, typeof f == "function" && (S.callback = S.callback || f)) : (C = this.connectionParameters.query_timeout, S = new h(c, f, w), S.callback || (E = new this._Promise((P, x) => {
        S.callback = (A, _) => A ? x(A) : P(_);
      }))), C && ($ = S.callback, B = setTimeout(() => {
        var P = new Error("Query read timeout");
        Z.nextTick(
          () => {
            S.handleError(P, this.connection);
          }
        ), $(P), S.callback = () => {
        };
        var x = this.queryQueue.indexOf(S);
        x > -1 && this.queryQueue.splice(x, 1), this._pulseQueryQueue();
      }, C), S.callback = (P, x) => {
        clearTimeout(B), $(P, x);
      }), this.binary && !S.binary && (S.binary = !0), S._result && !S._result._types && (S._result._types = this._types), this._queryable ? this._ending ? (Z.nextTick(() => {
        S.handleError(new Error("Client was closed and is not queryable"), this.connection);
      }), E) : (this.queryQueue.push(S), this._pulseQueryQueue(), E) : (Z.nextTick(() => {
        S.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
      }), E);
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
        return new this._Promise((f) => {
          this.connection.once("end", f);
        });
    }
  };
  g(b, "Client");
  var y = b;
  y.Query = h, e.exports = y;
}), Dl = ee((r, e) => {
  V();
  var t = Ke().EventEmitter, n = g(function() {
  }, "NOOP"), s = g((c, f) => {
    let w = c.findIndex(f);
    return w === -1 ? void 0 : c.splice(w, 1)[0];
  }, "removeWhere"), i = class {
    constructor(f, w, S) {
      this.client = f, this.idleListener = w, this.timeoutId = S;
    }
  };
  g(i, "IdleItem");
  var u = i, o = class {
    constructor(f) {
      this.callback = f;
    }
  };
  g(o, "PendingItem");
  var h = o;
  function m() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  g(m, "throwOnDoubleRelease");
  function d(c, f) {
    if (f)
      return { callback: f, result: void 0 };
    let w, S, E = g(function(B, $) {
      B ? w(B) : S($);
    }, "cb"), C = new c(function(B, $) {
      S = B, w = $;
    }).catch((B) => {
      throw Error.captureStackTrace(B), B;
    });
    return { callback: E, result: C };
  }
  g(d, "promisify");
  function b(c, f) {
    return g(function w(S) {
      S.client = f, f.removeListener("error", w), f.on("error", () => {
        c.log(
          "additional client error after disconnection due to error",
          S
        );
      }), c._remove(f), c.emit("error", S, f);
    }, "idleListener");
  }
  g(b, "makeIdleListener");
  var y = class extends t {
    constructor(f, w) {
      super(), this.options = Object.assign({}, f), f != null && "password" in f && Object.defineProperty(this.options, "password", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: f.password
      }), f != null && f.ssl && f.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: !1 }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || !1, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
      }, this.Client = this.options.Client || w || Yt().Client, this.Promise = this.options.Promise || zt.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = !1, this.ended = !1;
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
      let f = this._pendingQueue.shift();
      if (this._idle.length) {
        let w = this._idle.pop();
        clearTimeout(
          w.timeoutId
        );
        let S = w.client;
        S.ref && S.ref();
        let E = w.idleListener;
        return this._acquireClient(S, f, E, !1);
      }
      if (!this._isFull())
        return this.newClient(f);
      throw new Error("unexpected condition");
    }
    _remove(f) {
      let w = s(
        this._idle,
        (S) => S.client === f
      );
      w !== void 0 && clearTimeout(w.timeoutId), this._clients = this._clients.filter(
        (S) => S !== f
      ), f.end(), this.emit("remove", f);
    }
    connect(f) {
      if (this.ending) {
        let E = new Error("Cannot use a pool after calling end on the pool");
        return f ? f(E) : this.Promise.reject(E);
      }
      let w = d(this.Promise, f), S = w.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && Z.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
          return this._pendingQueue.push(new h(w.callback)), S;
        let E = g(($, P, x) => {
          clearTimeout(B), w.callback($, P, x);
        }, "queueCallback"), C = new h(E), B = setTimeout(() => {
          s(
            this._pendingQueue,
            ($) => $.callback === E
          ), C.timedOut = !0, w.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return B.unref && B.unref(), this._pendingQueue.push(C), S;
      }
      return this.newClient(new h(w.callback)), S;
    }
    newClient(f) {
      let w = new this.Client(this.options);
      this._clients.push(
        w
      );
      let S = b(this, w);
      this.log("checking client timeout");
      let E, C = !1;
      this.options.connectionTimeoutMillis && (E = setTimeout(() => {
        this.log("ending client due to timeout"), C = !0, w.connection ? w.connection.stream.destroy() : w.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), w.connect((B) => {
        if (E && clearTimeout(E), w.on("error", S), B)
          this.log("client failed to connect", B), this._clients = this._clients.filter(($) => $ !== w), C && (B = new Error("Connection terminated due to connection timeout", { cause: B })), this._pulseQueue(), f.timedOut || f.callback(B, void 0, n);
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let $ = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(w), this._idle.findIndex((P) => P.client === w) !== -1 && this._acquireClient(
                w,
                new h((P, x, A) => A()),
                S,
                !1
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            $.unref(), w.once("end", () => clearTimeout($));
          }
          return this._acquireClient(w, f, S, !0);
        }
      });
    }
    _acquireClient(f, w, S, E) {
      E && this.emit("connect", f), this.emit("acquire", f), f.release = this._releaseOnce(f, S), f.removeListener("error", S), w.timedOut ? E && this.options.verify ? this.options.verify(f, f.release) : f.release() : E && this.options.verify ? this.options.verify(f, (C) => {
        if (C)
          return f.release(C), w.callback(C, void 0, n);
        w.callback(void 0, f, f.release);
      }) : w.callback(void 0, f, f.release);
    }
    _releaseOnce(f, w) {
      let S = !1;
      return (E) => {
        S && m(), S = !0, this._release(f, w, E);
      };
    }
    _release(f, w, S) {
      if (f.on("error", w), f._poolUseCount = (f._poolUseCount || 0) + 1, this.emit("release", S, f), S || this.ending || !f._queryable || f._ending || f._poolUseCount >= this.options.maxUses) {
        f._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(f), this._pulseQueue();
        return;
      }
      if (this._expired.has(f)) {
        this.log("remove expired client"), this._expired.delete(f), this._remove(f), this._pulseQueue();
        return;
      }
      let E;
      this.options.idleTimeoutMillis && (E = setTimeout(() => {
        this.log("remove idle client"), this._remove(f);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && E.unref()), this.options.allowExitOnIdle && f.unref(), this._idle.push(new u(
        f,
        w,
        E
      )), this._pulseQueue();
    }
    query(f, w, S) {
      if (typeof f == "function") {
        let C = d(this.Promise, f);
        return Or(function() {
          return C.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), C.result;
      }
      typeof w == "function" && (S = w, w = void 0);
      let E = d(this.Promise, S);
      return S = E.callback, this.connect((C, B) => {
        if (C)
          return S(C);
        let $ = !1, P = g((x) => {
          $ || ($ = !0, B.release(x), S(x));
        }, "onError");
        B.once("error", P), this.log("dispatching query");
        try {
          B.query(f, w, (x, A) => {
            if (this.log("query dispatched"), B.removeListener(
              "error",
              P
            ), !$)
              return $ = !0, B.release(x), x ? S(x) : S(void 0, A);
          });
        } catch (x) {
          return B.release(x), S(x);
        }
      }), E.result;
    }
    end(f) {
      if (this.log("ending"), this.ending) {
        let S = new Error("Called end on pool more than once");
        return f ? f(S) : this.Promise.reject(S);
      }
      this.ending = !0;
      let w = d(this.Promise, f);
      return this._endCallback = w.callback, this._pulseQueue(), w.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((f, w) => f + (this._expired.has(w) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  };
  g(y, "Pool");
  var v = y;
  e.exports = v;
}), xs = {};
xe(xs, { default: () => Is });
var Is, Ml = we(() => {
  V(), Is = {};
}), Ql = ee((r, e) => {
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
}), ql = ee((r, e) => {
  V();
  var t = Ke().EventEmitter, n = (Jt(), fe(Pt)), s = Gt(), i = e.exports = function(o, h, m) {
    t.call(this), o = s.normalizeQueryConfig(o, h, m), this.text = o.text, this.values = o.values, this.name = o.name, this.callback = o.callback, this.state = "new", this._arrayMode = o.rowMode === "array", this._emitRowEvents = !1, this.on("newListener", function(d) {
      d === "row" && (this._emitRowEvents = !0);
    }.bind(this));
  };
  n.inherits(i, t);
  var u = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  i.prototype.handleError = function(o) {
    var h = this.native.pq.resultErrorFields();
    if (h)
      for (var m in h) {
        var d = u[m] || m;
        o[d] = h[m];
      }
    this.callback ? this.callback(o) : this.emit("error", o), this.state = "error";
  }, i.prototype.then = function(o, h) {
    return this._getPromise().then(
      o,
      h
    );
  }, i.prototype.catch = function(o) {
    return this._getPromise().catch(o);
  }, i.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(o, h) {
      this._once("end", o), this._once("error", h);
    }.bind(this)), this._promise);
  }, i.prototype.submit = function(o) {
    this.state = "running";
    var h = this;
    this.native = o.native, o.native.arrayMode = this._arrayMode;
    var m = g(function(y, v, c) {
      if (o.native.arrayMode = !1, Or(function() {
        h.emit("_done");
      }), y)
        return h.handleError(y);
      h._emitRowEvents && (c.length > 1 ? v.forEach(
        (f, w) => {
          f.forEach((S) => {
            h.emit("row", S, c[w]);
          });
        }
      ) : v.forEach(function(f) {
        h.emit("row", f, c);
      })), h.state = "end", h.emit("end", c), h.callback && h.callback(null, c);
    }, "after");
    if (Z.domain && (m = Z.domain.bind(m)), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", this.name, this.name.length), console.error("This can cause conflicts and silent errors executing queries"));
      var d = (this.values || []).map(s.prepareValue);
      if (o.namedQueries[this.name]) {
        if (this.text && o.namedQueries[this.name] !== this.text) {
          let y = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return m(y);
        }
        return o.native.execute(this.name, d, m);
      }
      return o.native.prepare(this.name, this.text, d.length, function(y) {
        return y ? m(y) : (o.namedQueries[h.name] = h.text, h.native.execute(h.name, d, m));
      });
    } else if (this.values) {
      if (!Array.isArray(
        this.values
      )) {
        let y = new Error("Query values must be an array");
        return m(y);
      }
      var b = this.values.map(s.prepareValue);
      o.native.query(this.text, b, m);
    } else
      o.native.query(this.text, m);
  };
}), Fl = ee((r, e) => {
  V();
  var t = (Ml(), fe(xs)), n = kr();
  Ql();
  var s = Ke().EventEmitter, i = (Jt(), fe(Pt)), u = Fr(), o = ql(), h = e.exports = function(m) {
    s.call(this), m = m || {}, this._Promise = m.Promise || zt.Promise, this._types = new n(m.types), this.native = new t({ types: this._types }), this._queryQueue = [], this._ending = !1, this._connecting = !1, this._connected = !1, this._queryable = !0;
    var d = this.connectionParameters = new u(m);
    this.user = d.user, Object.defineProperty(this, "password", { configurable: !0, enumerable: !1, writable: !0, value: d.password }), this.database = d.database, this.host = d.host, this.port = d.port, this.namedQueries = {};
  };
  h.Query = o, i.inherits(h, s), h.prototype._errorAllQueries = function(m) {
    let d = g((b) => {
      Z.nextTick(() => {
        b.native = this.native, b.handleError(m);
      });
    }, "enqueueError");
    this._hasActiveQuery() && (d(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(d), this._queryQueue.length = 0;
  }, h.prototype._connect = function(m) {
    var d = this;
    if (this._connecting) {
      Z.nextTick(() => m(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = !0, this.connectionParameters.getLibpqConnectionString(function(b, y) {
      if (b)
        return m(b);
      d.native.connect(y, function(v) {
        if (v)
          return d.native.end(), m(v);
        d._connected = !0, d.native.on("error", function(c) {
          d._queryable = !1, d._errorAllQueries(c), d.emit("error", c);
        }), d.native.on("notification", function(c) {
          d.emit("notification", { channel: c.relname, payload: c.extra });
        }), d.emit("connect"), d._pulseQueryQueue(!0), m();
      });
    });
  }, h.prototype.connect = function(m) {
    if (m) {
      this._connect(m);
      return;
    }
    return new this._Promise((d, b) => {
      this._connect((y) => {
        y ? b(y) : d();
      });
    });
  }, h.prototype.query = function(m, d, b) {
    var y, v, c, f, w;
    if (m == null)
      throw new TypeError("Client was passed a null or undefined query");
    if (typeof m.submit == "function")
      c = m.query_timeout || this.connectionParameters.query_timeout, v = y = m, typeof d == "function" && (m.callback = d);
    else if (c = this.connectionParameters.query_timeout, y = new o(m, d, b), !y.callback) {
      let S, E;
      v = new this._Promise((C, B) => {
        S = C, E = B;
      }), y.callback = (C, B) => C ? E(C) : S(B);
    }
    return c && (w = y.callback, f = setTimeout(() => {
      var S = new Error(
        "Query read timeout"
      );
      Z.nextTick(() => {
        y.handleError(S, this.connection);
      }), w(S), y.callback = () => {
      };
      var E = this._queryQueue.indexOf(y);
      E > -1 && this._queryQueue.splice(E, 1), this._pulseQueryQueue();
    }, c), y.callback = (S, E) => {
      clearTimeout(f), w(S, E);
    }), this._queryable ? this._ending ? (y.native = this.native, Z.nextTick(() => {
      y.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), v) : (this._queryQueue.push(y), this._pulseQueryQueue(), v) : (y.native = this.native, Z.nextTick(() => {
      y.handleError(new Error("Client has encountered a connection error and is not queryable"));
    }), v);
  }, h.prototype.end = function(m) {
    var d = this;
    this._ending = !0, this._connected || this.once("connect", this.end.bind(this, m));
    var b;
    return m || (b = new this._Promise(function(y, v) {
      m = g((c) => c ? v(c) : y(), "cb");
    })), this.native.end(function() {
      d._errorAllQueries(new Error("Connection terminated")), Z.nextTick(() => {
        d.emit("end"), m && m();
      });
    }), b;
  }, h.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  }, h.prototype._pulseQueryQueue = function(m) {
    if (this._connected && !this._hasActiveQuery()) {
      var d = this._queryQueue.shift();
      if (!d) {
        m || this.emit("drain");
        return;
      }
      this._activeQuery = d, d.submit(this);
      var b = this;
      d.once("_done", function() {
        b._pulseQueryQueue();
      });
    }
  }, h.prototype.cancel = function(m) {
    this._activeQuery === m ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(m) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(m), 1);
  }, h.prototype.ref = function() {
  }, h.prototype.unref = function() {
  }, h.prototype.setTypeParser = function(m, d, b) {
    return this._types.setTypeParser(
      m,
      d,
      b
    );
  }, h.prototype.getTypeParser = function(m, d) {
    return this._types.getTypeParser(m, d);
  };
}), wn = ee((r, e) => {
  V(), e.exports = Fl();
}), Yt = ee((r, e) => {
  V();
  var t = kl(), n = Kt(), s = As(), i = Dl(), { DatabaseError: u } = _s(), o = g(
    (m) => {
      var d;
      return d = class extends i {
        constructor(b) {
          super(b, m);
        }
      }, g(d, "BoundPool"), d;
    },
    "poolFactory"
  ), h = g(
    function(m) {
      this.defaults = n, this.Client = m, this.Query = this.Client.Query, this.Pool = o(this.Client), this._pools = [], this.Connection = s, this.types = Ht(), this.DatabaseError = u;
    },
    "PG"
  );
  typeof Z.env.NODE_PG_FORCE_NATIVE < "u" ? e.exports = new h(wn()) : (e.exports = new h(t), Object.defineProperty(e.exports, "native", {
    configurable: !0,
    enumerable: !1,
    get() {
      var m = null;
      try {
        m = new h(wn());
      } catch (d) {
        if (d.code !== "MODULE_NOT_FOUND")
          throw d;
      }
      return Object.defineProperty(e.exports, "native", { value: m }), m;
    }
  }));
});
V();
V();
Wt();
ss();
V();
var Ul = Object.defineProperty, jl = Object.defineProperties, zl = Object.getOwnPropertyDescriptors, bn = Object.getOwnPropertySymbols, Vl = Object.prototype.hasOwnProperty, Wl = Object.prototype.propertyIsEnumerable, vn = g(
  (r, e, t) => e in r ? Ul(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t,
  "__defNormalProp"
), Hl = g((r, e) => {
  for (var t in e || (e = {}))
    Vl.call(e, t) && vn(r, t, e[t]);
  if (bn)
    for (var t of bn(e))
      Wl.call(e, t) && vn(r, t, e[t]);
  return r;
}, "__spreadValues"), Kl = g((r, e) => jl(r, zl(e)), "__spreadProps"), Gl = 1008e3, Sn = new Uint8Array(
  new Uint16Array([258]).buffer
)[0] === 2, Jl = new TextDecoder(), Ur = new TextEncoder(), Tt = Ur.encode("0123456789abcdef"), At = Ur.encode("0123456789ABCDEF"), Yl = Ur.encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), Ns = Yl.slice();
Ns[62] = 45;
Ns[63] = 95;
var dt, xt;
function Ls(r, { alphabet: e, scratchArr: t } = {}) {
  if (!dt)
    if (dt = new Uint16Array(256), xt = new Uint16Array(256), Sn)
      for (let v = 0; v < 256; v++)
        dt[v] = Tt[v & 15] << 8 | Tt[v >>> 4], xt[v] = At[v & 15] << 8 | At[v >>> 4];
    else
      for (let v = 0; v < 256; v++)
        dt[v] = Tt[v & 15] | Tt[v >>> 4] << 8, xt[v] = At[v & 15] | At[v >>> 4] << 8;
  r.byteOffset % 4 !== 0 && (r = new Uint8Array(r));
  let n = r.length, s = n >>> 1, i = n >>> 2, u = t || new Uint16Array(n), o = new Uint32Array(
    r.buffer,
    r.byteOffset,
    i
  ), h = new Uint32Array(u.buffer, u.byteOffset, s), m = e === "upper" ? xt : dt, d = 0, b = 0, y;
  if (Sn)
    for (; d < i; )
      y = o[d++], h[b++] = m[y >>> 8 & 255] << 16 | m[y & 255], h[b++] = m[y >>> 24] << 16 | m[y >>> 16 & 255];
  else
    for (; d < i; )
      y = o[d++], h[b++] = m[y >>> 24] << 16 | m[y >>> 16 & 255], h[b++] = m[y >>> 8 & 255] << 16 | m[y & 255];
  for (d <<= 2; d < n; )
    u[d] = m[r[d++]];
  return Jl.decode(u.subarray(0, n));
}
g(Ls, "_toHex");
function Bs(r, e = {}) {
  let t = "", n = r.length, s = Gl >>> 1, i = Math.ceil(n / s), u = new Uint16Array(i > 1 ? s : n);
  for (let o = 0; o < i; o++) {
    let h = o * s, m = h + s;
    t += Ls(r.subarray(h, m), Kl(Hl(
      {},
      e
    ), { scratchArr: u }));
  }
  return t;
}
g(Bs, "_toHexChunked");
function Rs(r, e = {}) {
  return e.alphabet !== "upper" && typeof r.toHex == "function" ? r.toHex() : Bs(r, e);
}
g(Rs, "toHex");
V();
var Os = class $s {
  constructor(e, t) {
    this.strings = e, this.values = t;
  }
  toParameterizedQuery(e = { query: "", params: [] }) {
    let { strings: t, values: n } = this;
    for (let s = 0, i = t.length; s < i; s++)
      if (e.query += t[s], s < n.length) {
        let u = n[s];
        if (u instanceof Ms)
          e.query += u.sql;
        else if (u instanceof $t)
          if (u.queryData instanceof $s)
            u.queryData.toParameterizedQuery(
              e
            );
          else {
            if (u.queryData.params?.length)
              throw new Error("This query is not composable");
            e.query += u.queryData.query;
          }
        else {
          let { params: o } = e;
          o.push(u), e.query += "$" + o.length, (u instanceof J || ArrayBuffer.isView(u)) && (e.query += "::bytea");
        }
      }
    return e;
  }
};
g(Os, "SqlTemplate");
var ks = Os, Ds = class {
  constructor(e) {
    this.sql = e;
  }
};
g(Ds, "UnsafeRawSql");
var Ms = Ds, Xl = He(kr()), Zl = He(Gt()), Qs = class qs extends Error {
  constructor(e) {
    super(e), Y(this, "name", "NeonDbError"), Y(this, "severity"), Y(this, "code"), Y(this, "detail"), Y(this, "hint"), Y(this, "position"), Y(this, "internalPosition"), Y(
      this,
      "internalQuery"
    ), Y(this, "where"), Y(this, "schema"), Y(this, "table"), Y(this, "column"), Y(this, "dataType"), Y(this, "constraint"), Y(this, "file"), Y(this, "line"), Y(this, "routine"), Y(this, "sourceError"), "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, qs);
  }
};
g(
  Qs,
  "NeonDbError"
);
var Ze = Qs, Pn = "transaction() expects an array of queries, or a function returning an array of queries", ec = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Fs(r) {
  return r instanceof J ? "\\x" + Rs(r) : r;
}
g(Fs, "encodeBuffersAsBytea");
function _r(r) {
  let { query: e, params: t } = r instanceof ks ? r.toParameterizedQuery() : r;
  return { query: e, params: t.map((n) => Fs((0, Zl.prepareValue)(n))) };
}
g(_r, "prepareQuery");
function tt(r, {
  arrayMode: e,
  fullResults: t,
  fetchOptions: n,
  isolationLevel: s,
  readOnly: i,
  deferrable: u,
  authToken: o
} = {}) {
  if (!r)
    throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
  let h;
  try {
    h = $r(r);
  } catch {
    throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(r));
  }
  let {
    protocol: m,
    username: d,
    hostname: b,
    port: y,
    pathname: v
  } = h;
  if (m !== "postgres:" && m !== "postgresql:" || !d || !b || !v)
    throw new Error(
      "Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value"
    );
  function c(w, ...S) {
    if (!(Array.isArray(w) && Array.isArray(w.raw) && Array.isArray(S)))
      throw new Error(
        'This function can now be called only as a tagged-template function: sql`SELECT ${value}`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).'
      );
    return new $t(f, new ks(w, S));
  }
  g(c, "templateFn"), c.query = (w, S, E) => new $t(f, { query: w, params: S ?? [] }, E), c.unsafe = (w) => new Ms(w), c.transaction = async (w, S) => {
    if (typeof w == "function" && (w = w(c)), !Array.isArray(w))
      throw new Error(Pn);
    w.forEach((B) => {
      if (!(B instanceof $t))
        throw new Error(
          Pn
        );
    });
    let E = w.map((B) => B.queryData), C = w.map((B) => B.opts ?? {});
    return f(E, C, S);
  };
  async function f(w, S, E) {
    let {
      fetchEndpoint: C,
      fetchFunction: B
    } = Vt, $ = Array.isArray(w) ? { queries: w.map((G) => _r(G)) } : _r(w), P = n ?? {}, x = e ?? !1, A = t ?? !1, _ = s, O = i, k = u;
    E !== void 0 && (E.fetchOptions !== void 0 && (P = { ...P, ...E.fetchOptions }), E.arrayMode !== void 0 && (x = E.arrayMode), E.fullResults !== void 0 && (A = E.fullResults), E.isolationLevel !== void 0 && (_ = E.isolationLevel), E.readOnly !== void 0 && (O = E.readOnly), E.deferrable !== void 0 && (k = E.deferrable)), S !== void 0 && !Array.isArray(S) && S.fetchOptions !== void 0 && (P = { ...P, ...S.fetchOptions });
    let F = o;
    !Array.isArray(S) && S?.authToken !== void 0 && (F = S.authToken);
    let U = typeof C == "function" ? C(b, y, { jwtAuth: F !== void 0 }) : C, R = {
      "Neon-Connection-String": r,
      "Neon-Raw-Text-Output": "true",
      "Neon-Array-Mode": "true"
    }, q = await js(F);
    q && (R.Authorization = `Bearer ${q}`), Array.isArray(w) && (_ !== void 0 && (R["Neon-Batch-Isolation-Level"] = _), O !== void 0 && (R["Neon-Batch-Read-Only"] = String(O)), k !== void 0 && (R["Neon-Batch-Deferrable"] = String(
      k
    )));
    let W;
    try {
      W = await (B ?? fetch)(U, { method: "POST", body: JSON.stringify($), headers: R, ...P });
    } catch (G) {
      let te = new Ze(`Error connecting to database: ${G}`);
      throw te.sourceError = G, te;
    }
    if (W.ok) {
      let G = await W.json();
      if (Array.isArray(w)) {
        let te = G.results;
        if (!Array.isArray(te))
          throw new Ze("Neon internal error: unexpected result format");
        return te.map((ne, be) => {
          let ae = S[be] ?? {}, pe = ae.arrayMode ?? x, ct = ae.fullResults ?? A;
          return Cr(ne, { arrayMode: pe, fullResults: ct, types: ae.types });
        });
      } else {
        let te = S ?? {}, ne = te.arrayMode ?? x, be = te.fullResults ?? A;
        return Cr(G, { arrayMode: ne, fullResults: be, types: te.types });
      }
    } else {
      let { status: G } = W;
      if (G === 400) {
        let te = await W.json(), ne = new Ze(te.message);
        for (let be of ec)
          ne[be] = te[be] ?? void 0;
        throw ne;
      } else {
        let te = await W.text();
        throw new Ze(`Server error (HTTP status ${G}): ${te}`);
      }
    }
  }
  return g(f, "execute"), c;
}
g(tt, "neon");
var Us = class {
  constructor(e, t, n) {
    this.execute = e, this.queryData = t, this.opts = n;
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
g(Us, "NeonQueryPromise");
var $t = Us;
function Cr(r, { arrayMode: e, fullResults: t, types: n }) {
  let s = new Xl.default(n), i = r.fields.map((h) => h.name), u = r.fields.map((h) => s.getTypeParser(h.dataTypeID)), o = e === !0 ? r.rows.map((h) => h.map((m, d) => m === null ? null : u[d](
    m
  ))) : r.rows.map((h) => Object.fromEntries(h.map((m, d) => [i[d], m === null ? null : u[d](m)])));
  return t ? (r.viaNeonFetch = !0, r.rowAsArray = e, r.rows = o, r._parsers = u, r._types = s, r) : o;
}
g(Cr, "processQueryResult");
async function js(r) {
  if (typeof r == "string")
    return r;
  if (typeof r == "function")
    try {
      return await Promise.resolve(r());
    } catch (e) {
      let t = new Ze("Error getting auth token.");
      throw e instanceof Error && (t = new Ze(`Error getting auth token: ${e.message}`)), t;
    }
}
g(js, "getAuthToken");
V();
var tc = He(Yt());
V();
var rc = He(Yt()), zs = class extends rc.Client {
  constructor(e) {
    super(e), this.config = e;
  }
  get neonConfig() {
    return this.connection.stream;
  }
  connect(e) {
    let { neonConfig: t } = this;
    t.forceDisablePgSSL && (this.ssl = this.connection.ssl = !1), this.ssl && t.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let n = typeof this.config != "string" && this.config?.host !== void 0 || typeof this.config != "string" && this.config?.connectionString !== void 0 || Z.env.PGHOST !== void 0, s = Z.env.USER ?? Z.env.USERNAME;
    if (!n && this.host === "localhost" && this.user === s && this.database === s && this.password === null)
      throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let i = super.connect(e), u = t.pipelineTLS && this.ssl, o = t.pipelineConnect === "password";
    if (!u && !t.pipelineConnect)
      return i;
    let h = this.connection;
    if (u && h.on(
      "connect",
      () => h.stream.emit("data", "S")
    ), o) {
      h.removeAllListeners("authenticationCleartextPassword"), h.removeAllListeners("readyForQuery"), h.once("readyForQuery", () => h.on("readyForQuery", this._handleReadyForQuery.bind(this)));
      let m = this.ssl ? "sslconnect" : "connect";
      h.on(m, () => {
        this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return i;
  }
  async _handleAuthSASLContinue(e) {
    if (typeof crypto > "u" || crypto.subtle === void 0 || crypto.subtle.importKey === void 0)
      throw new Error("Cannot use SASL auth when `crypto.subtle` is not defined");
    let t = crypto.subtle, n = this.saslSession, s = this.password, i = e.data;
    if (n.message !== "SASLInitialResponse" || typeof s != "string" || typeof i != "string")
      throw new Error("SASL: protocol error");
    let u = Object.fromEntries(i.split(",").map((te) => {
      if (!/^.=/.test(te))
        throw new Error("SASL: Invalid attribute pair entry");
      let ne = te[0], be = te.substring(2);
      return [ne, be];
    })), o = u.r, h = u.s, m = u.i;
    if (!o || !/^[!-+--~]+$/.test(o))
      throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable"
      );
    if (!h || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(h))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
    if (!m || !/^[1-9][0-9]*$/.test(m))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
    if (!o.startsWith(
      n.clientNonce
    ))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    if (o.length === n.clientNonce.length)
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let d = parseInt(m, 10), b = J.from(h, "base64"), y = new TextEncoder(), v = y.encode(s), c = await t.importKey("raw", v, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]), f = new Uint8Array(await t.sign("HMAC", c, J.concat([b, J.from([0, 0, 0, 1])]))), w = f;
    for (var S = 0; S < d - 1; S++)
      f = new Uint8Array(await t.sign(
        "HMAC",
        c,
        f
      )), w = J.from(w.map((te, ne) => w[ne] ^ f[ne]));
    let E = w, C = await t.importKey("raw", E, { name: "HMAC", hash: {
      name: "SHA-256"
    } }, !1, ["sign"]), B = new Uint8Array(await t.sign("HMAC", C, y.encode("Client Key"))), $ = await t.digest("SHA-256", B), P = "n=*,r=" + n.clientNonce, x = "r=" + o + ",s=" + h + ",i=" + d, A = "c=biws,r=" + o, _ = P + "," + x + "," + A, O = await t.importKey("raw", $, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]);
    var k = new Uint8Array(
      await t.sign("HMAC", O, y.encode(_))
    ), F = J.from(B.map((te, ne) => B[ne] ^ k[ne])), U = F.toString("base64");
    let R = await t.importKey("raw", E, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]), q = await t.sign("HMAC", R, y.encode(
      "Server Key"
    )), W = await t.importKey("raw", q, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]);
    var G = J.from(await t.sign("HMAC", W, y.encode(_)));
    n.message = "SASLResponse", n.serverSignature = G.toString("base64"), n.response = A + ",p=" + U, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
g(zs, "NeonClient");
var nc = zs;
Wt();
var sc = He(Fr());
function Vs(r, e) {
  if (e)
    return { callback: e, result: void 0 };
  let t, n, s = g(function(u, o) {
    u ? t(u) : n(o);
  }, "cb"), i = new r(function(u, o) {
    n = u, t = o;
  });
  return { callback: s, result: i };
}
g(Vs, "promisify");
var ic = class extends tc.Pool {
  constructor() {
    super(...arguments), Y(this, "Client", nc), Y(this, "hasFetchUnsupportedListeners", !1), Y(this, "addListener", this.on);
  }
  on(e, t) {
    return e !== "error" && (this.hasFetchUnsupportedListeners = !0), super.on(e, t);
  }
  query(e, t, n) {
    if (!Vt.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof e == "function")
      return super.query(
        e,
        t,
        n
      );
    typeof t == "function" && (n = t, t = void 0);
    let s = Vs(this.Promise, n);
    n = s.callback;
    try {
      let i = new sc.default(
        this.options
      ), u = encodeURIComponent, o = encodeURI, h = `postgresql://${u(i.user)}:${u(i.password)}@${u(i.host)}/${o(i.database)}`, m = typeof e == "string" ? e : e.text, d = t ?? e.values ?? [];
      tt(h, { fullResults: !0, arrayMode: e.rowMode === "array" }).query(m, d, { types: e.types ?? this.options?.types }).then((b) => n(void 0, b)).catch((b) => n(
        b
      ));
    } catch (i) {
      n(i);
    }
    return s.result;
  }
};
g(ic, "NeonPool");
Wt();
var jr = He(Yt());
jr.DatabaseError;
jr.defaults;
var ve = jr.types;
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
const It = {
  arrayMode: !1,
  fullResults: !0
}, Tr = {
  arrayMode: !0,
  fullResults: !0
};
class oc extends Ru {
  constructor(e, t, n, s, i, u) {
    super(t), this.client = e, this.logger = n, this.fields = s, this._isResponseInArrayMode = i, this.customResultMapper = u, this.clientQuery = e.query ?? e;
  }
  static [L] = "NeonHttpPreparedQuery";
  clientQuery;
  /** @internal */
  async execute(e = {}, t = this.authToken) {
    const n = lr(this.query.params, e);
    this.logger.logQuery(this.query.sql, n);
    const { fields: s, clientQuery: i, query: u, customResultMapper: o } = this;
    if (!s && !o)
      return i(
        u.sql,
        n,
        t === void 0 ? It : {
          ...It,
          authToken: t
        }
      );
    const h = await i(
      u.sql,
      n,
      t === void 0 ? Tr : {
        ...Tr,
        authToken: t
      }
    );
    return this.mapResult(h);
  }
  mapResult(e) {
    if (!this.fields && !this.customResultMapper)
      return e;
    const t = e.rows;
    return this.customResultMapper ? this.customResultMapper(t) : t.map((n) => Di(this.fields, n, this.joinsNotNullableMap));
  }
  all(e = {}) {
    const t = lr(this.query.params, e);
    return this.logger.logQuery(this.query.sql, t), this.clientQuery(
      this.query.sql,
      t,
      this.authToken === void 0 ? It : {
        ...It,
        authToken: this.authToken
      }
    ).then((n) => n.rows);
  }
  /** @internal */
  values(e = {}, t) {
    const n = lr(this.query.params, e);
    return this.logger.logQuery(this.query.sql, n), this.clientQuery(this.query.sql, n, { arrayMode: !0, fullResults: !0, authToken: t }).then((s) => s.rows);
  }
  /** @internal */
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}
class ac extends Ou {
  constructor(e, t, n, s = {}) {
    super(t), this.client = e, this.schema = n, this.options = s, this.clientQuery = e.query ?? e, this.logger = s.logger ?? new ki();
  }
  static [L] = "NeonHttpSession";
  clientQuery;
  logger;
  prepareQuery(e, t, n, s, i) {
    return new oc(
      this.client,
      e,
      this.logger,
      t,
      s,
      i
    );
  }
  async batch(e) {
    const t = [], n = [];
    for (const i of e) {
      const u = i._prepare(), o = u.getQuery();
      t.push(u), n.push(
        this.clientQuery(o.sql, o.params, {
          fullResults: !0,
          arrayMode: u.isResponseInArrayMode()
        })
      );
    }
    return (await this.client.transaction(n, Tr)).map((i, u) => t[u].mapResult(i, !0));
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
    const n = await this.execute(e, t);
    return Number(
      n.rows[0].count
    );
  }
  async transaction(e, t = {}) {
    throw new Error("No transactions support in neon-http driver");
  }
}
class uc {
  constructor(e, t, n = {}) {
    this.client = e, this.dialect = t, this.options = n, this.initMappers();
  }
  static [L] = "NeonHttpDriver";
  createSession(e) {
    return new ac(this.client, this.dialect, e, { logger: this.options.logger });
  }
  initMappers() {
    ve.setTypeParser(ve.builtins.TIMESTAMPTZ, (e) => e), ve.setTypeParser(ve.builtins.TIMESTAMP, (e) => e), ve.setTypeParser(ve.builtins.DATE, (e) => e), ve.setTypeParser(ve.builtins.INTERVAL, (e) => e), ve.setTypeParser(1231, (e) => e), ve.setTypeParser(1115, (e) => e), ve.setTypeParser(1185, (e) => e), ve.setTypeParser(1187, (e) => e), ve.setTypeParser(1182, (e) => e);
  }
}
function Ft(r, e, t, n) {
  return new Proxy(r, {
    get(s, i) {
      const u = s[i];
      return typeof u != "function" && (typeof u != "object" || u === null) ? u : n ? Ft(u, e, t) : i === "query" ? Ft(u, e, t, !0) : new Proxy(u, {
        apply(o, h, m) {
          const d = o.call(h, ...m);
          return typeof d == "object" && d !== null && "setToken" in d && typeof d.setToken == "function" && d.setToken(e), t(o, i, d);
        }
      });
    }
  });
}
class lc extends Lu {
  static [L] = "NeonHttpDatabase";
  $withAuth(e) {
    return this.authToken = e, Ft(this, e, (t, n, s) => n === "with" ? Ft(s, e, (i, u, o) => o) : s);
  }
  async batch(e) {
    return this.session.batch(e);
  }
}
function Ye(r, e = {}) {
  const t = new Bt({ casing: e.casing });
  let n;
  e.logger === !0 ? n = new $i() : e.logger !== !1 && (n = e.logger);
  let s;
  if (e.schema) {
    const h = au(
      e.schema,
      hu
    );
    s = {
      fullSchema: e.schema,
      schema: h.tables,
      tableNamesMap: h.tableNamesMap
    };
  }
  const u = new uc(r, t, { logger: n }).createSession(s), o = new lc(
    t,
    u,
    s
  );
  return o.$client = r, o;
}
function Ar(...r) {
  if (typeof r[0] == "string") {
    const e = tt(r[0]);
    return Ye(e, r[1]);
  }
  if (qi(r[0])) {
    const { connection: e, client: t, ...n } = r[0];
    if (t)
      return Ye(t, n);
    if (typeof e == "object") {
      const { connectionString: i, ...u } = e, o = tt(i, u);
      return Ye(o, n);
    }
    const s = tt(e);
    return Ye(s, n);
  }
  return Ye(r[0], r[1]);
}
((r) => {
  function e(t) {
    return Ye({}, t);
  }
  r.mock = e;
})(Ar || (Ar = {}));
function cc(r) {
  const e = tt(r.connectionString);
  return Ar({ client: e });
}
function hc() {
  const r = Netlify.env.get("VITE_APP_URL"), e = Netlify.env.get("DATABASE_URL");
  if (!r)
    throw Error("[getEnv] missing VITE_APP_URL");
  if (!e)
    throw Error("[getEnv] missing DATABASE_URL");
  return { allowedOrigins: r, connectionString: e };
}
const Ws = (r) => ({
  "Access-Control-Allow-Origin": r.allowedOrigins,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}), fc = (r) => ({
  ...Ws(r),
  "Content-Type": "application/json"
});
function gr(r, e) {
  if (!e)
    return new Response(null, {
      status: 500
    });
  const { data: t, env: n } = e, s = Ws(n), i = fc(n);
  return r === "options" ? new Response(null, {
    status: 204,
    headers: s
  }) : r === "data" && t !== void 0 ? new Response(JSON.stringify(t), {
    status: 200,
    headers: i
  }) : (r === "data" && t === void 0 && console.error("data is missing"), r !== "error" && console.error(`invalid key '${r}'`), new Response("Internal Server Error", {
    status: 500,
    headers: i
  }));
}
var dc = Object.defineProperty, H = (r, e) => dc(r, "name", { value: e, configurable: !0 }), rt = class {
  type = 3;
  name = "";
  prefix = "";
  value = "";
  suffix = "";
  modifier = 3;
  constructor(r, e, t, n, s, i) {
    this.type = r, this.name = e, this.prefix = t, this.value = n, this.suffix = s, this.modifier = i;
  }
  hasCustomName() {
    return this.name !== "" && typeof this.name != "number";
  }
};
H(rt, "Part");
var pc = /[$_\p{ID_Start}]/u, gc = /[$_\u200C\u200D\p{ID_Continue}]/u, xr = ".*";
function Hs(r, e) {
  return (e ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(r);
}
H(Hs, "isASCII");
function zr(r, e = !1) {
  let t = [], n = 0;
  for (; n < r.length; ) {
    let s = r[n], i = H(function(u) {
      if (!e)
        throw new TypeError(u);
      t.push({ type: "INVALID_CHAR", index: n, value: r[n++] });
    }, "ErrorOrInvalid");
    if (s === "*") {
      t.push({ type: "ASTERISK", index: n, value: r[n++] });
      continue;
    }
    if (s === "+" || s === "?") {
      t.push({ type: "OTHER_MODIFIER", index: n, value: r[n++] });
      continue;
    }
    if (s === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: n++, value: r[n++] });
      continue;
    }
    if (s === "{") {
      t.push({ type: "OPEN", index: n, value: r[n++] });
      continue;
    }
    if (s === "}") {
      t.push({ type: "CLOSE", index: n, value: r[n++] });
      continue;
    }
    if (s === ":") {
      let u = "", o = n + 1;
      for (; o < r.length; ) {
        let h = r.substr(o, 1);
        if (o === n + 1 && pc.test(h) || o !== n + 1 && gc.test(h)) {
          u += r[o++];
          continue;
        }
        break;
      }
      if (!u) {
        i(`Missing parameter name at ${n}`);
        continue;
      }
      t.push({ type: "NAME", index: n, value: u }), n = o;
      continue;
    }
    if (s === "(") {
      let u = 1, o = "", h = n + 1, m = !1;
      if (r[h] === "?") {
        i(`Pattern cannot start with "?" at ${h}`);
        continue;
      }
      for (; h < r.length; ) {
        if (!Hs(r[h], !1)) {
          i(`Invalid character '${r[h]}' at ${h}.`), m = !0;
          break;
        }
        if (r[h] === "\\") {
          o += r[h++] + r[h++];
          continue;
        }
        if (r[h] === ")") {
          if (u--, u === 0) {
            h++;
            break;
          }
        } else if (r[h] === "(" && (u++, r[h + 1] !== "?")) {
          i(`Capturing groups are not allowed at ${h}`), m = !0;
          break;
        }
        o += r[h++];
      }
      if (m)
        continue;
      if (u) {
        i(`Unbalanced pattern at ${n}`);
        continue;
      }
      if (!o) {
        i(`Missing pattern at ${n}`);
        continue;
      }
      t.push({ type: "REGEX", index: n, value: o }), n = h;
      continue;
    }
    t.push({ type: "CHAR", index: n, value: r[n++] });
  }
  return t.push({ type: "END", index: n, value: "" }), t;
}
H(zr, "lexer");
function Vr(r, e = {}) {
  let t = zr(r);
  e.delimiter ??= "/#?", e.prefixes ??= "./";
  let n = `[^${Se(e.delimiter)}]+?`, s = [], i = 0, u = 0, o = /* @__PURE__ */ new Set(), h = H((E) => {
    if (u < t.length && t[u].type === E)
      return t[u++].value;
  }, "tryConsume"), m = H(() => h("OTHER_MODIFIER") ?? h("ASTERISK"), "tryConsumeModifier"), d = H((E) => {
    let C = h(E);
    if (C !== void 0)
      return C;
    let { type: B, index: $ } = t[u];
    throw new TypeError(`Unexpected ${B} at ${$}, expected ${E}`);
  }, "mustConsume"), b = H(() => {
    let E = "", C;
    for (; C = h("CHAR") ?? h("ESCAPED_CHAR"); )
      E += C;
    return E;
  }, "consumeText"), y = H((E) => E, "DefaultEncodePart"), v = e.encodePart || y, c = "", f = H((E) => {
    c += E;
  }, "appendToPendingFixedValue"), w = H(() => {
    c.length && (s.push(new rt(3, "", "", v(c), "", 3)), c = "");
  }, "maybeAddPartFromPendingFixedValue"), S = H((E, C, B, $, P) => {
    let x = 3;
    switch (P) {
      case "?":
        x = 1;
        break;
      case "*":
        x = 0;
        break;
      case "+":
        x = 2;
        break;
    }
    if (!C && !B && x === 3) {
      f(E);
      return;
    }
    if (w(), !C && !B) {
      if (!E)
        return;
      s.push(new rt(3, "", "", v(E), "", x));
      return;
    }
    let A;
    B ? B === "*" ? A = xr : A = B : A = n;
    let _ = 2;
    A === n ? (_ = 1, A = "") : A === xr && (_ = 0, A = "");
    let O;
    if (C ? O = C : B && (O = i++), o.has(O))
      throw new TypeError(`Duplicate name '${O}'.`);
    o.add(O), s.push(new rt(_, O, v(E), A, v($), x));
  }, "addPart");
  for (; u < t.length; ) {
    let E = h("CHAR"), C = h("NAME"), B = h("REGEX");
    if (!C && !B && (B = h("ASTERISK")), C || B) {
      let P = E ?? "";
      e.prefixes.indexOf(P) === -1 && (f(P), P = ""), w();
      let x = m();
      S(P, C, B, "", x);
      continue;
    }
    let $ = E ?? h("ESCAPED_CHAR");
    if ($) {
      f($);
      continue;
    }
    if (h("OPEN")) {
      let P = b(), x = h("NAME"), A = h("REGEX");
      !x && !A && (A = h("ASTERISK"));
      let _ = b();
      d("CLOSE");
      let O = m();
      S(P, x, A, _, O);
      continue;
    }
    w(), d("END");
  }
  return s;
}
H(Vr, "parse");
function Se(r) {
  return r.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
H(Se, "escapeString");
function Ir(r) {
  return r && r.ignoreCase ? "ui" : "u";
}
H(Ir, "flags");
function Ks(r, e, t) {
  return Wr(Vr(r, t), e, t);
}
H(Ks, "stringToRegexp");
function Ue(r) {
  switch (r) {
    case 0:
      return "*";
    case 1:
      return "?";
    case 2:
      return "+";
    case 3:
      return "";
  }
}
H(Ue, "modifierToString");
function Wr(r, e, t = {}) {
  t.delimiter ??= "/#?", t.prefixes ??= "./", t.sensitive ??= !1, t.strict ??= !1, t.end ??= !0, t.start ??= !0, t.endsWith = "";
  let n = t.start ? "^" : "";
  for (let o of r) {
    if (o.type === 3) {
      o.modifier === 3 ? n += Se(o.value) : n += `(?:${Se(o.value)})${Ue(o.modifier)}`;
      continue;
    }
    e && e.push(o.name);
    let h = `[^${Se(t.delimiter)}]+?`, m = o.value;
    if (o.type === 1 ? m = h : o.type === 0 && (m = xr), !o.prefix.length && !o.suffix.length) {
      o.modifier === 3 || o.modifier === 1 ? n += `(${m})${Ue(o.modifier)}` : n += `((?:${m})${Ue(o.modifier)})`;
      continue;
    }
    if (o.modifier === 3 || o.modifier === 1) {
      n += `(?:${Se(o.prefix)}(${m})${Se(o.suffix)})`, n += Ue(o.modifier);
      continue;
    }
    n += `(?:${Se(o.prefix)}`, n += `((?:${m})(?:`, n += Se(o.suffix), n += Se(o.prefix), n += `(?:${m}))*)${Se(o.suffix)})`, o.modifier === 0 && (n += "?");
  }
  let s = `[${Se(t.endsWith)}]|$`, i = `[${Se(t.delimiter)}]`;
  if (t.end)
    return t.strict || (n += `${i}?`), t.endsWith.length ? n += `(?=${s})` : n += "$", new RegExp(n, Ir(t));
  t.strict || (n += `(?:${i}(?=${s}))?`);
  let u = !1;
  if (r.length) {
    let o = r[r.length - 1];
    o.type === 3 && o.modifier === 3 && (u = t.delimiter.indexOf(o) > -1);
  }
  return u || (n += `(?=${i}|${s})`), new RegExp(n, Ir(t));
}
H(Wr, "partsToRegexp");
var ke = { delimiter: "", prefixes: "", sensitive: !0, strict: !0 }, mc = { delimiter: ".", prefixes: "", sensitive: !0, strict: !0 }, yc = { delimiter: "/", prefixes: "/", sensitive: !0, strict: !0 };
function Gs(r, e) {
  return r.length ? r[0] === "/" ? !0 : !e || r.length < 2 ? !1 : (r[0] == "\\" || r[0] == "{") && r[1] == "/" : !1;
}
H(Gs, "isAbsolutePathname");
function Hr(r, e) {
  return r.startsWith(e) ? r.substring(e.length, r.length) : r;
}
H(Hr, "maybeStripPrefix");
function Js(r, e) {
  return r.endsWith(e) ? r.substr(0, r.length - e.length) : r;
}
H(Js, "maybeStripSuffix");
function Kr(r) {
  return !r || r.length < 2 ? !1 : r[0] === "[" || (r[0] === "\\" || r[0] === "{") && r[1] === "[";
}
H(Kr, "treatAsIPv6Hostname");
var Ys = ["ftp", "file", "http", "https", "ws", "wss"];
function Gr(r) {
  if (!r)
    return !0;
  for (let e of Ys)
    if (r.test(e))
      return !0;
  return !1;
}
H(Gr, "isSpecialScheme");
function Xs(r, e) {
  if (r = Hr(r, "#"), e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.hash = r, t.hash ? t.hash.substring(1, t.hash.length) : "";
}
H(Xs, "canonicalizeHash");
function Zs(r, e) {
  if (r = Hr(r, "?"), e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.search = r, t.search ? t.search.substring(1, t.search.length) : "";
}
H(Zs, "canonicalizeSearch");
function ei(r, e) {
  return e || r === "" ? r : Kr(r) ? Xr(r) : Yr(r);
}
H(ei, "canonicalizeHostname");
function ti(r, e) {
  if (e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.password = r, t.password;
}
H(ti, "canonicalizePassword");
function ri(r, e) {
  if (e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.username = r, t.username;
}
H(ri, "canonicalizeUsername");
function ni(r, e, t) {
  if (t || r === "")
    return r;
  if (e && !Ys.includes(e))
    return new URL(`${e}:${r}`).pathname;
  let n = r[0] == "/";
  return r = new URL(n ? r : "/-" + r, "https://example.com").pathname, n || (r = r.substring(2, r.length)), r;
}
H(ni, "canonicalizePathname");
function si(r, e, t) {
  return Jr(e) === r && (r = ""), t || r === "" ? r : Zr(r);
}
H(si, "canonicalizePort");
function ii(r, e) {
  return r = Js(r, ":"), e || r === "" ? r : Xt(r);
}
H(ii, "canonicalizeProtocol");
function Jr(r) {
  switch (r) {
    case "ws":
    case "http":
      return "80";
    case "wws":
    case "https":
      return "443";
    case "ftp":
      return "21";
    default:
      return "";
  }
}
H(Jr, "defaultPortForProtocol");
function Xt(r) {
  if (r === "")
    return r;
  if (/^[-+.A-Za-z0-9]*$/.test(r))
    return r.toLowerCase();
  throw new TypeError(`Invalid protocol '${r}'.`);
}
H(Xt, "protocolEncodeCallback");
function oi(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.username = r, e.username;
}
H(oi, "usernameEncodeCallback");
function ai(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.password = r, e.password;
}
H(ai, "passwordEncodeCallback");
function Yr(r) {
  if (r === "")
    return r;
  if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(r))
    throw new TypeError(`Invalid hostname '${r}'`);
  let e = new URL("https://example.com");
  return e.hostname = r, e.hostname;
}
H(Yr, "hostnameEncodeCallback");
function Xr(r) {
  if (r === "")
    return r;
  if (/[^0-9a-fA-F[\]:]/g.test(r))
    throw new TypeError(`Invalid IPv6 hostname '${r}'`);
  return r.toLowerCase();
}
H(Xr, "ipv6HostnameEncodeCallback");
function Zr(r) {
  if (r === "" || /^[0-9]*$/.test(r) && parseInt(r) <= 65535)
    return r;
  throw new TypeError(`Invalid port '${r}'.`);
}
H(Zr, "portEncodeCallback");
function ui(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.pathname = r[0] !== "/" ? "/-" + r : r, r[0] !== "/" ? e.pathname.substring(2, e.pathname.length) : e.pathname;
}
H(ui, "standardURLPathnameEncodeCallback");
function li(r) {
  return r === "" ? r : new URL(`data:${r}`).pathname;
}
H(li, "pathURLPathnameEncodeCallback");
function ci(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.search = r, e.search.substring(1, e.search.length);
}
H(ci, "searchEncodeCallback");
function hi(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.hash = r, e.hash.substring(1, e.hash.length);
}
H(hi, "hashEncodeCallback");
var fi = class {
  #i;
  #n = [];
  #t = {};
  #e = 0;
  #s = 1;
  #l = 0;
  #a = 0;
  #d = 0;
  #p = 0;
  #g = !1;
  constructor(r) {
    this.#i = r;
  }
  get result() {
    return this.#t;
  }
  parse() {
    for (this.#n = zr(this.#i, !0); this.#e < this.#n.length; this.#e += this.#s) {
      if (this.#s = 1, this.#n[this.#e].type === "END") {
        if (this.#a === 0) {
          this.#b(), this.#c() ? this.#r(9, 1) : this.#h() ? this.#r(8, 1) : this.#r(7, 0);
          continue;
        } else if (this.#a === 2) {
          this.#f(5);
          continue;
        }
        this.#r(10, 0);
        break;
      }
      if (this.#d > 0)
        if (this.#T())
          this.#d -= 1;
        else
          continue;
      if (this.#C()) {
        this.#d += 1;
        continue;
      }
      switch (this.#a) {
        case 0:
          this.#v() && this.#f(1);
          break;
        case 1:
          if (this.#v()) {
            this.#I();
            let r = 7, e = 1;
            this.#P() ? (r = 2, e = 3) : this.#g && (r = 2), this.#r(r, e);
          }
          break;
        case 2:
          this.#y() ? this.#f(3) : (this.#w() || this.#h() || this.#c()) && this.#f(5);
          break;
        case 3:
          this.#E() ? this.#r(4, 1) : this.#y() && this.#r(5, 1);
          break;
        case 4:
          this.#y() && this.#r(5, 1);
          break;
        case 5:
          this.#A() ? this.#p += 1 : this.#x() && (this.#p -= 1), this.#_() && !this.#p ? this.#r(6, 1) : this.#w() ? this.#r(7, 0) : this.#h() ? this.#r(8, 1) : this.#c() && this.#r(9, 1);
          break;
        case 6:
          this.#w() ? this.#r(7, 0) : this.#h() ? this.#r(8, 1) : this.#c() && this.#r(9, 1);
          break;
        case 7:
          this.#h() ? this.#r(8, 1) : this.#c() && this.#r(9, 1);
          break;
        case 8:
          this.#c() && this.#r(9, 1);
          break;
      }
    }
    this.#t.hostname !== void 0 && this.#t.port === void 0 && (this.#t.port = "");
  }
  #r(r, e) {
    switch (this.#a) {
      case 0:
        break;
      case 1:
        this.#t.protocol = this.#u();
        break;
      case 2:
        break;
      case 3:
        this.#t.username = this.#u();
        break;
      case 4:
        this.#t.password = this.#u();
        break;
      case 5:
        this.#t.hostname = this.#u();
        break;
      case 6:
        this.#t.port = this.#u();
        break;
      case 7:
        this.#t.pathname = this.#u();
        break;
      case 8:
        this.#t.search = this.#u();
        break;
      case 9:
        this.#t.hash = this.#u();
        break;
    }
    this.#a !== 0 && r !== 10 && ([1, 2, 3, 4].includes(this.#a) && [6, 7, 8, 9].includes(r) && (this.#t.hostname ??= ""), [1, 2, 3, 4, 5, 6].includes(this.#a) && [8, 9].includes(r) && (this.#t.pathname ??= this.#g ? "/" : ""), [1, 2, 3, 4, 5, 6, 7].includes(this.#a) && r === 9 && (this.#t.search ??= "")), this.#S(r, e);
  }
  #S(r, e) {
    this.#a = r, this.#l = this.#e + e, this.#e += e, this.#s = 0;
  }
  #b() {
    this.#e = this.#l, this.#s = 0;
  }
  #f(r) {
    this.#b(), this.#a = r;
  }
  #m(r) {
    return r < 0 && (r = this.#n.length - r), r < this.#n.length ? this.#n[r] : this.#n[this.#n.length - 1];
  }
  #o(r, e) {
    let t = this.#m(r);
    return t.value === e && (t.type === "CHAR" || t.type === "ESCAPED_CHAR" || t.type === "INVALID_CHAR");
  }
  #v() {
    return this.#o(this.#e, ":");
  }
  #P() {
    return this.#o(this.#e + 1, "/") && this.#o(this.#e + 2, "/");
  }
  #y() {
    return this.#o(this.#e, "@");
  }
  #E() {
    return this.#o(this.#e, ":");
  }
  #_() {
    return this.#o(this.#e, ":");
  }
  #w() {
    return this.#o(this.#e, "/");
  }
  #h() {
    if (this.#o(this.#e, "?"))
      return !0;
    if (this.#n[this.#e].value !== "?")
      return !1;
    let r = this.#m(this.#e - 1);
    return r.type !== "NAME" && r.type !== "REGEX" && r.type !== "CLOSE" && r.type !== "ASTERISK";
  }
  #c() {
    return this.#o(this.#e, "#");
  }
  #C() {
    return this.#n[this.#e].type == "OPEN";
  }
  #T() {
    return this.#n[this.#e].type == "CLOSE";
  }
  #A() {
    return this.#o(this.#e, "[");
  }
  #x() {
    return this.#o(this.#e, "]");
  }
  #u() {
    let r = this.#n[this.#e], e = this.#m(this.#l).index;
    return this.#i.substring(e, r.index);
  }
  #I() {
    let r = {};
    Object.assign(r, ke), r.encodePart = Xt;
    let e = Ks(this.#u(), void 0, r);
    this.#g = Gr(e);
  }
};
H(fi, "Parser");
var mr = ["protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"], $e = "*";
function Nr(r, e) {
  if (typeof r != "string")
    throw new TypeError("parameter 1 is not of type 'string'.");
  let t = new URL(r, e);
  return { protocol: t.protocol.substring(0, t.protocol.length - 1), username: t.username, password: t.password, hostname: t.hostname, port: t.port, pathname: t.pathname, search: t.search !== "" ? t.search.substring(1, t.search.length) : void 0, hash: t.hash !== "" ? t.hash.substring(1, t.hash.length) : void 0 };
}
H(Nr, "extractValues");
function Ie(r, e) {
  return e ? et(r) : r;
}
H(Ie, "processBaseURLString");
function Xe(r, e, t) {
  let n;
  if (typeof e.baseURL == "string")
    try {
      n = new URL(e.baseURL), e.protocol === void 0 && (r.protocol = Ie(n.protocol.substring(0, n.protocol.length - 1), t)), !t && e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.username === void 0 && (r.username = Ie(n.username, t)), !t && e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.username === void 0 && e.password === void 0 && (r.password = Ie(n.password, t)), e.protocol === void 0 && e.hostname === void 0 && (r.hostname = Ie(n.hostname, t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && (r.port = Ie(n.port, t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.pathname === void 0 && (r.pathname = Ie(n.pathname, t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.pathname === void 0 && e.search === void 0 && (r.search = Ie(n.search.substring(1, n.search.length), t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.pathname === void 0 && e.search === void 0 && e.hash === void 0 && (r.hash = Ie(n.hash.substring(1, n.hash.length), t));
    } catch {
      throw new TypeError(`invalid baseURL '${e.baseURL}'.`);
    }
  if (typeof e.protocol == "string" && (r.protocol = ii(e.protocol, t)), typeof e.username == "string" && (r.username = ri(e.username, t)), typeof e.password == "string" && (r.password = ti(e.password, t)), typeof e.hostname == "string" && (r.hostname = ei(e.hostname, t)), typeof e.port == "string" && (r.port = si(e.port, r.protocol, t)), typeof e.pathname == "string") {
    if (r.pathname = e.pathname, n && !Gs(r.pathname, t)) {
      let s = n.pathname.lastIndexOf("/");
      s >= 0 && (r.pathname = Ie(n.pathname.substring(0, s + 1), t) + r.pathname);
    }
    r.pathname = ni(r.pathname, r.protocol, t);
  }
  return typeof e.search == "string" && (r.search = Zs(e.search, t)), typeof e.hash == "string" && (r.hash = Xs(e.hash, t)), r;
}
H(Xe, "applyInit");
function et(r) {
  return r.replace(/([+*?:{}()\\])/g, "\\$1");
}
H(et, "escapePatternString");
function di(r) {
  return r.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
H(di, "escapeRegexpString");
function pi(r, e) {
  e.delimiter ??= "/#?", e.prefixes ??= "./", e.sensitive ??= !1, e.strict ??= !1, e.end ??= !0, e.start ??= !0, e.endsWith = "";
  let t = ".*", n = `[^${di(e.delimiter)}]+?`, s = /[$_\u200C\u200D\p{ID_Continue}]/u, i = "";
  for (let u = 0; u < r.length; ++u) {
    let o = r[u];
    if (o.type === 3) {
      if (o.modifier === 3) {
        i += et(o.value);
        continue;
      }
      i += `{${et(o.value)}}${Ue(o.modifier)}`;
      continue;
    }
    let h = o.hasCustomName(), m = !!o.suffix.length || !!o.prefix.length && (o.prefix.length !== 1 || !e.prefixes.includes(o.prefix)), d = u > 0 ? r[u - 1] : null, b = u < r.length - 1 ? r[u + 1] : null;
    if (!m && h && o.type === 1 && o.modifier === 3 && b && !b.prefix.length && !b.suffix.length)
      if (b.type === 3) {
        let y = b.value.length > 0 ? b.value[0] : "";
        m = s.test(y);
      } else
        m = !b.hasCustomName();
    if (!m && !o.prefix.length && d && d.type === 3) {
      let y = d.value[d.value.length - 1];
      m = e.prefixes.includes(y);
    }
    m && (i += "{"), i += et(o.prefix), h && (i += `:${o.name}`), o.type === 2 ? i += `(${o.value})` : o.type === 1 ? h || (i += `(${n})`) : o.type === 0 && (!h && (!d || d.type === 3 || d.modifier !== 3 || m || o.prefix !== "") ? i += "*" : i += `(${t})`), o.type === 1 && h && o.suffix.length && s.test(o.suffix[0]) && (i += "\\"), i += et(o.suffix), m && (i += "}"), o.modifier !== 3 && (i += Ue(o.modifier));
  }
  return i;
}
H(pi, "partsToPattern");
var gi = class {
  #i;
  #n = {};
  #t = {};
  #e = {};
  #s = {};
  #l = !1;
  constructor(r = {}, e, t) {
    try {
      let n;
      if (typeof e == "string" ? n = e : t = e, typeof r == "string") {
        let o = new fi(r);
        if (o.parse(), r = o.result, n === void 0 && typeof r.protocol != "string")
          throw new TypeError("A base URL must be provided for a relative constructor string.");
        r.baseURL = n;
      } else {
        if (!r || typeof r != "object")
          throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");
        if (n)
          throw new TypeError("parameter 1 is not of type 'string'.");
      }
      typeof t > "u" && (t = { ignoreCase: !1 });
      let s = { ignoreCase: t.ignoreCase === !0 }, i = { pathname: $e, protocol: $e, username: $e, password: $e, hostname: $e, port: $e, search: $e, hash: $e };
      this.#i = Xe(i, r, !0), Jr(this.#i.protocol) === this.#i.port && (this.#i.port = "");
      let u;
      for (u of mr) {
        if (!(u in this.#i))
          continue;
        let o = {}, h = this.#i[u];
        switch (this.#t[u] = [], u) {
          case "protocol":
            Object.assign(o, ke), o.encodePart = Xt;
            break;
          case "username":
            Object.assign(o, ke), o.encodePart = oi;
            break;
          case "password":
            Object.assign(o, ke), o.encodePart = ai;
            break;
          case "hostname":
            Object.assign(o, mc), Kr(h) ? o.encodePart = Xr : o.encodePart = Yr;
            break;
          case "port":
            Object.assign(o, ke), o.encodePart = Zr;
            break;
          case "pathname":
            Gr(this.#n.protocol) ? (Object.assign(o, yc, s), o.encodePart = ui) : (Object.assign(o, ke, s), o.encodePart = li);
            break;
          case "search":
            Object.assign(o, ke, s), o.encodePart = ci;
            break;
          case "hash":
            Object.assign(o, ke, s), o.encodePart = hi;
            break;
        }
        try {
          this.#s[u] = Vr(h, o), this.#n[u] = Wr(this.#s[u], this.#t[u], o), this.#e[u] = pi(this.#s[u], o), this.#l = this.#l || this.#s[u].some((m) => m.type === 2);
        } catch {
          throw new TypeError(`invalid ${u} pattern '${this.#i[u]}'.`);
        }
      }
    } catch (n) {
      throw new TypeError(`Failed to construct 'URLPattern': ${n.message}`);
    }
  }
  get [Symbol.toStringTag]() {
    return "URLPattern";
  }
  test(r = {}, e) {
    let t = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof r != "string" && e)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof r > "u")
      return !1;
    try {
      typeof r == "object" ? t = Xe(t, r, !1) : t = Xe(t, Nr(r, e), !1);
    } catch {
      return !1;
    }
    let n;
    for (n of mr)
      if (!this.#n[n].exec(t[n]))
        return !1;
    return !0;
  }
  exec(r = {}, e) {
    let t = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof r != "string" && e)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof r > "u")
      return;
    try {
      typeof r == "object" ? t = Xe(t, r, !1) : t = Xe(t, Nr(r, e), !1);
    } catch {
      return null;
    }
    let n = {};
    e ? n.inputs = [r, e] : n.inputs = [r];
    let s;
    for (s of mr) {
      let i = this.#n[s].exec(t[s]);
      if (!i)
        return null;
      let u = {};
      for (let [o, h] of this.#t[s].entries())
        if (typeof h == "string" || typeof h == "number") {
          let m = i[o + 1];
          u[h] = m;
        }
      n[s] = { input: t[s] ?? "", groups: u };
    }
    return n;
  }
  static compareComponent(r, e, t) {
    let n = H((o, h) => {
      for (let m of ["type", "modifier", "prefix", "value", "suffix"]) {
        if (o[m] < h[m])
          return -1;
        if (o[m] !== h[m])
          return 1;
      }
      return 0;
    }, "comparePart"), s = new rt(3, "", "", "", "", 3), i = new rt(0, "", "", "", "", 3), u = H((o, h) => {
      let m = 0;
      for (; m < Math.min(o.length, h.length); ++m) {
        let d = n(o[m], h[m]);
        if (d)
          return d;
      }
      return o.length === h.length ? 0 : n(o[m] ?? s, h[m] ?? s);
    }, "comparePartList");
    return !e.#e[r] && !t.#e[r] ? 0 : e.#e[r] && !t.#e[r] ? u(e.#s[r], [i]) : !e.#e[r] && t.#e[r] ? u([i], t.#s[r]) : u(e.#s[r], t.#s[r]);
  }
  get protocol() {
    return this.#e.protocol;
  }
  get username() {
    return this.#e.username;
  }
  get password() {
    return this.#e.password;
  }
  get hostname() {
    return this.#e.hostname;
  }
  get port() {
    return this.#e.port;
  }
  get pathname() {
    return this.#e.pathname;
  }
  get search() {
    return this.#e.search;
  }
  get hash() {
    return this.#e.hash;
  }
  get hasRegExpGroups() {
    return this.#l;
  }
};
H(gi, "URLPattern");
globalThis.URLPattern || (globalThis.URLPattern = gi);
async function Kc(r) {
  try {
    const e = hc();
    if (r.method === "OPTIONS")
      return gr("options", { env: e });
    const t = cc(e), s = new URLPattern({ pathname: "/game/:id/turn/:order/try/:code" }).exec(r.url), i = s?.pathname.groups?.id, u = s?.pathname.groups?.order, o = s?.pathname.groups?.code;
    if (!i || !u || !o)
      throw Error("missing required params");
    const h = await rl({ db: t, id: i, attempt: o, order: u });
    return gr("data", { env: e, data: h });
  } catch (e) {
    return console.error("Unexpected error in /game/:id/turn/:order/try/:code", e), gr("error");
  }
}
export {
  Kc as default
};
