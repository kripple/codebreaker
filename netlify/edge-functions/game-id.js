const bi = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
function vi(r) {
  return typeof r == "string" && bi.test(r);
}
const L = Symbol.for("drizzle:entityKind");
function k(r, e) {
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
class Si {
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
const Me = Symbol.for("drizzle:Name");
class Pi {
  static [L] = "PgForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate = "no action";
  /** @internal */
  _onDelete = "no action";
  constructor(e, t) {
    this.reference = () => {
      const { name: n, columns: i, foreignColumns: s } = e();
      return { name: n, columns: i, foreignTable: s[0].table, foreignColumns: s };
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
    return new Ei(e, this);
  }
}
class Ei {
  constructor(e, t) {
    this.table = e, this.reference = t.reference, this.onUpdate = t._onUpdate, this.onDelete = t._onDelete;
  }
  static [L] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name: e, columns: t, foreignColumns: n } = this.reference(), i = t.map((o) => o.name), s = n.map((o) => o.name), u = [
      this.table[Me],
      ...i,
      n[0].table[Me],
      ...s
    ];
    return e ?? `${u.join("_")}_fk`;
  }
}
function Ci(r, ...e) {
  return r(...e);
}
function _i(r, e) {
  return `${r[Me]}_${e.join("_")}_unique`;
}
function on(r, e, t) {
  for (let n = e; n < r.length; n++) {
    const i = r[n];
    if (i === "\\") {
      n++;
      continue;
    }
    if (i === '"')
      return [r.slice(e, n).replace(/\\/g, ""), n + 1];
    if (!t && (i === "," || i === "}"))
      return [r.slice(e, n).replace(/\\/g, ""), n];
  }
  return [r.slice(e).replace(/\\/g, ""), r.length];
}
function Cn(r, e = 0) {
  const t = [];
  let n = e, i = !1;
  for (; n < r.length; ) {
    const s = r[n];
    if (s === ",") {
      (i || n === e) && t.push(""), i = !0, n++;
      continue;
    }
    if (i = !1, s === "\\") {
      n += 2;
      continue;
    }
    if (s === '"') {
      const [h, m] = on(r, n + 1, !0);
      t.push(h), n = m;
      continue;
    }
    if (s === "}")
      return [t, n + 1];
    if (s === "{") {
      const [h, m] = Cn(r, n + 1);
      t.push(h), n = m;
      continue;
    }
    const [u, o] = on(r, n, !1);
    t.push(u), n = o;
  }
  return [t, n];
}
function Ti(r) {
  const [e] = Cn(r, 1);
  return e;
}
function _n(r) {
  return `{${r.map((e) => Array.isArray(e) ? _n(e) : typeof e == "string" ? `"${e.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${e}`).join(",")}}`;
}
class re extends Si {
  foreignKeyConfigs = [];
  static [L] = "PgColumnBuilder";
  array(e) {
    return new xi(this.config.name, this, e);
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
    return this.foreignKeyConfigs.map(({ ref: n, actions: i }) => Ci(
      (s, u) => {
        const o = new Pi(() => {
          const h = s();
          return { columns: [e], foreignColumns: [h] };
        });
        return u.onUpdate && o.onUpdate(u.onUpdate), u.onDelete && o.onDelete(u.onDelete), o.build(t);
      },
      n,
      i
    ));
  }
  /** @internal */
  buildExtraConfigColumn(e) {
    return new Ai(e, this.config);
  }
}
class X extends he {
  constructor(e, t) {
    t.uniqueName || (t.uniqueName = _i(e, [t.name])), super(e, t), this.table = e;
  }
  static [L] = "PgColumn";
}
class Ai extends X {
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
class ir {
  static [L] = "IndexedColumn";
  constructor(e, t, n, i) {
    this.name = e, this.keyAsName = t, this.type = n, this.indexConfig = i;
  }
  name;
  keyAsName;
  type;
  indexConfig;
}
class xi extends re {
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
  constructor(e, t, n, i) {
    super(e, t), this.baseColumn = n, this.range = i, this.size = t.size;
  }
  size;
  static [L] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${typeof this.size == "number" ? this.size : ""}]`;
  }
  mapFromDriverValue(e) {
    return typeof e == "string" && (e = Ti(e)), e.map((t) => this.baseColumn.mapFromDriverValue(t));
  }
  mapToDriverValue(e, t = !1) {
    const n = e.map(
      (i) => i === null ? null : k(this.baseColumn, Lr) ? this.baseColumn.mapToDriverValue(i, !0) : this.baseColumn.mapToDriverValue(i)
    );
    return t ? n : _n(n);
  }
}
const an = Symbol.for("drizzle:isPgEnum");
function Ii(r) {
  return !!r && typeof r == "function" && an in r && r[an] === !0;
}
class Te {
  static [L] = "Subquery";
  constructor(e, t, n, i = !1) {
    this._ = {
      brand: "Subquery",
      sql: e,
      selectedFields: t,
      alias: n,
      isWith: i
    };
  }
  // getSQL(): SQL<unknown> {
  // 	return new SQL([this]);
  // }
}
class Tn extends Te {
  static [L] = "WithSubquery";
}
const Ee = {
  startActiveSpan(r, e) {
    return e();
  }
}, le = Symbol.for("drizzle:ViewBaseConfig"), It = Symbol.for("drizzle:Schema"), yr = Symbol.for("drizzle:Columns"), un = Symbol.for("drizzle:ExtraConfigColumns"), or = Symbol.for("drizzle:OriginalName"), ar = Symbol.for("drizzle:BaseName"), Rt = Symbol.for("drizzle:IsAlias"), ln = Symbol.for("drizzle:ExtraConfigBuilder"), Ni = Symbol.for("drizzle:IsDrizzleTable");
class j {
  static [L] = "Table";
  /** @internal */
  static Symbol = {
    Name: Me,
    Schema: It,
    OriginalName: or,
    Columns: yr,
    ExtraConfigColumns: un,
    BaseName: ar,
    IsAlias: Rt,
    ExtraConfigBuilder: ln
  };
  /**
   * @internal
   * Can be changed if the table is aliased.
   */
  [Me];
  /**
   * @internal
   * Used to store the original name of the table, before any aliasing.
   */
  [or];
  /** @internal */
  [It];
  /** @internal */
  [yr];
  /** @internal */
  [un];
  /**
   *  @internal
   * Used to store the table name before the transformation via the `tableCreator` functions.
   */
  [ar];
  /** @internal */
  [Rt] = !1;
  /** @internal */
  [Ni] = !0;
  /** @internal */
  [ln] = void 0;
  constructor(e, t, n) {
    this[Me] = this[or] = e, this[It] = t, this[ar] = n;
  }
}
function Re(r) {
  return r[Me];
}
function yt(r) {
  return `${r[It] ?? "public"}.${r[Me]}`;
}
function An(r) {
  return r != null && typeof r.getSQL == "function";
}
function Li(r) {
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
  decoder = xn;
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
      casing: i,
      escapeName: s,
      escapeParam: u,
      prepareTyping: o,
      inlineParams: h,
      paramStartIndex: m
    } = n;
    return Li(e.map((d) => {
      if (k(d, ge))
        return { sql: d.value.join(""), params: [] };
      if (k(d, wr))
        return { sql: s(d.value), params: [] };
      if (d === void 0)
        return { sql: "", params: [] };
      if (Array.isArray(d)) {
        const b = [new ge("(")];
        for (const [y, v] of d.entries())
          b.push(v), y < d.length - 1 && b.push(new ge(", "));
        return b.push(new ge(")")), this.buildQueryFromSourceParams(b, n);
      }
      if (k(d, z))
        return this.buildQueryFromSourceParams(d.queryChunks, {
          ...n,
          inlineParams: h || d.shouldInlineParams
        });
      if (k(d, j)) {
        const b = d[j.Symbol.Schema], y = d[j.Symbol.Name];
        return {
          sql: b === void 0 || d[Rt] ? s(y) : s(b) + "." + s(y),
          params: []
        };
      }
      if (k(d, he)) {
        const b = i.getColumnCasing(d);
        if (t.invokeSource === "indexes")
          return { sql: s(b), params: [] };
        const y = d.table[j.Symbol.Schema];
        return {
          sql: d.table[Rt] || y === void 0 ? s(d.table[j.Symbol.Name]) + "." + s(b) : s(y) + "." + s(d.table[j.Symbol.Name]) + "." + s(b),
          params: []
        };
      }
      if (k(d, Ve)) {
        const b = d[le].schema, y = d[le].name;
        return {
          sql: b === void 0 || d[le].isAlias ? s(y) : s(b) + "." + s(y),
          params: []
        };
      }
      if (k(d, ke)) {
        if (k(d.value, st))
          return { sql: u(m.value++, d), params: [d], typings: ["none"] };
        const b = d.value === null ? null : d.encoder.mapToDriverValue(d.value);
        if (k(b, z))
          return this.buildQueryFromSourceParams([b], n);
        if (h)
          return { sql: this.mapInlineParam(b, n), params: [] };
        let y = ["none"];
        return o && (y = [o(d.encoder)]), { sql: u(m.value++, b), params: [b], typings: y };
      }
      return k(d, st) ? { sql: u(m.value++, d), params: [d], typings: ["none"] } : k(d, z.Aliased) && d.fieldAlias !== void 0 ? { sql: s(d.fieldAlias), params: [] } : k(d, Te) ? d._.isWith ? { sql: s(d._.alias), params: [] } : this.buildQueryFromSourceParams([
        new ge("("),
        d._.sql,
        new ge(") "),
        new wr(d._.alias)
      ], n) : Ii(d) ? d.schema ? { sql: s(d.schema) + "." + s(d.enumName), params: [] } : { sql: s(d.enumName), params: [] } : An(d) ? d.shouldOmitSQLParens?.() ? this.buildQueryFromSourceParams([d.getSQL()], n) : this.buildQueryFromSourceParams([
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
function Bi(r) {
  return typeof r == "object" && r !== null && "mapToDriverValue" in r && typeof r.mapToDriverValue == "function";
}
const xn = {
  mapFromDriverValue: (r) => r
}, In = {
  mapToDriverValue: (r) => r
};
({
  ...xn,
  ...In
});
class ke {
  /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */
  constructor(e, t = In) {
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
  for (const [n, i] of e.entries())
    t.push(i, new ge(r[n + 1]));
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
  function i(h, m) {
    const d = [];
    for (const [b, y] of h.entries())
      b > 0 && m !== void 0 && d.push(m), d.push(y);
    return new z(d);
  }
  r.join = i;
  function s(h) {
    return new wr(h);
  }
  r.identifier = s;
  function u(h) {
    return new st(h);
  }
  r.placeholder = u;
  function o(h, m) {
    return new ke(h, m);
  }
  r.param = o;
})(I || (I = {}));
((r) => {
  class e {
    constructor(n, i) {
      this.sql = n, this.fieldAlias = i;
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
class st {
  constructor(e) {
    this.name = e;
  }
  static [L] = "Placeholder";
  getSQL() {
    return new z([this]);
  }
}
function ur(r, e) {
  return r.map((t) => {
    if (k(t, st)) {
      if (!(t.name in e))
        throw new Error(`No value for placeholder "${t.name}" was provided`);
      return e[t.name];
    }
    if (k(t, ke) && k(t.value, st)) {
      if (!(t.value.name in e))
        throw new Error(`No value for placeholder "${t.value.name}" was provided`);
      return t.encoder.mapToDriverValue(e[t.value.name]);
    }
    return t;
  });
}
const Ri = Symbol.for("drizzle:IsDrizzleView");
class Ve {
  static [L] = "View";
  /** @internal */
  [le];
  /** @internal */
  [Ri] = !0;
  constructor({ name: e, schema: t, selectedFields: n, query: i }) {
    this[le] = {
      name: e,
      originalName: e,
      schema: t,
      selectedFields: n,
      query: i,
      isExisting: !i,
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
class Ot {
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
      const i = e[j.Symbol.Columns];
      if (!i)
        return i;
      const s = {};
      return Object.keys(i).map((u) => {
        s[u] = new Proxy(
          i[u],
          new Ot(new Proxy(e, this))
        );
      }), s;
    }
    const n = e[t];
    return k(n, he) ? new Proxy(n, new Ot(new Proxy(e, this))) : n;
  }
}
function lr(r, e) {
  return new Proxy(r, new Br(e, !1));
}
function Be(r, e) {
  return new Proxy(
    r,
    new Ot(new Proxy(r.table, new Br(e, !1)))
  );
}
function Nn(r, e) {
  return new z.Aliased($t(r.sql, e), r.fieldAlias);
}
function $t(r, e) {
  return I.join(r.queryChunks.map((t) => k(t, he) ? Be(t, e) : k(t, z) ? $t(t, e) : k(t, z.Aliased) ? Nn(t, e) : t));
}
class Oi extends Error {
  static [L] = "DrizzleError";
  constructor({ message: e, cause: t }) {
    super(e), this.name = "DrizzleError", this.cause = t;
  }
}
class $i {
  static [L] = "ConsoleLogWriter";
  write(e) {
    console.log(e);
  }
}
class Di {
  static [L] = "DefaultLogger";
  writer;
  constructor(e) {
    this.writer = e?.writer ?? new $i();
  }
  logQuery(e, t) {
    const n = t.map((s) => {
      try {
        return JSON.stringify(s);
      } catch {
        return String(s);
      }
    }), i = n.length ? ` -- params: [${n.join(", ")}]` : "";
    this.writer.write(`Query: ${e}${i}`);
  }
}
class Mi {
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
function ki(r, e, t) {
  const n = {}, i = r.reduce(
    (s, { path: u, field: o }, h) => {
      let m;
      k(o, he) ? m = o : k(o, z) ? m = o.decoder : m = o.sql.decoder;
      let d = s;
      for (const [b, y] of u.entries())
        if (b < u.length - 1)
          y in d || (d[y] = {}), d = d[y];
        else {
          const v = e[h], c = d[y] = v === null ? null : m.mapFromDriverValue(v);
          if (t && k(o, he) && u.length === 2) {
            const f = u[0];
            f in n ? typeof n[f] == "string" && n[f] !== Re(o.table) && (n[f] = !1) : n[f] = c === null ? Re(o.table) : !1;
          }
        }
      return s;
    },
    {}
  );
  if (t && Object.keys(n).length > 0)
    for (const [s, u] of Object.entries(n))
      typeof u == "string" && !t[u] && (i[s] = null);
  return i;
}
function Ue(r, e) {
  return Object.entries(r).reduce((t, [n, i]) => {
    if (typeof n != "string")
      return t;
    const s = e ? [...e, n] : [n];
    return k(i, he) || k(i, z) || k(i, z.Aliased) ? t.push({ path: s, field: i }) : k(i, j) ? t.push(...Ue(i[j.Symbol.Columns], s)) : t.push(...Ue(i, s)), t;
  }, []);
}
function Rr(r, e) {
  const t = Object.keys(r), n = Object.keys(e);
  if (t.length !== n.length)
    return !1;
  for (const [i, s] of t.entries())
    if (s !== n[i])
      return !1;
  return !0;
}
function Ln(r, e) {
  const t = Object.entries(e).filter(([, n]) => n !== void 0).map(([n, i]) => k(i, z) || k(i, he) ? [n, i] : [n, new ke(i, r[j.Symbol.Columns][n])]);
  if (t.length === 0)
    throw new Error("No values to set");
  return Object.fromEntries(t);
}
function Qi(r, e) {
  for (const t of e)
    for (const n of Object.getOwnPropertyNames(t.prototype))
      n !== "constructor" && Object.defineProperty(
        r.prototype,
        n,
        Object.getOwnPropertyDescriptor(t.prototype, n) || /* @__PURE__ */ Object.create(null)
      );
}
function qi(r) {
  return r[j.Symbol.Columns];
}
function qe(r) {
  return k(r, Te) ? r._.alias : k(r, Ve) ? r[le].name : k(r, z) ? void 0 : r[j.Symbol.IsAlias] ? r[j.Symbol.Name] : r[j.Symbol.BaseName];
}
function de(r, e) {
  return {
    name: typeof r == "string" && r.length > 0 ? r : "",
    config: typeof r == "object" ? r : e
  };
}
function Fi(r) {
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
class qt extends re {
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
class Ui extends qt {
  static [L] = "PgBigInt53Builder";
  constructor(e) {
    super(e, "number", "PgBigInt53");
  }
  /** @internal */
  build(e) {
    return new ji(e, this.config);
  }
}
class ji extends X {
  static [L] = "PgBigInt53";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(e) {
    return typeof e == "number" ? e : Number(e);
  }
}
class zi extends qt {
  static [L] = "PgBigInt64Builder";
  constructor(e) {
    super(e, "bigint", "PgBigInt64");
  }
  /** @internal */
  build(e) {
    return new Vi(
      e,
      this.config
    );
  }
}
class Vi extends X {
  static [L] = "PgBigInt64";
  getSQLType() {
    return "bigint";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function Wi(r, e) {
  const { name: t, config: n } = de(r, e);
  return n.mode === "number" ? new Ui(t) : new zi(t);
}
class Gi extends re {
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
    return new Ji(
      e,
      this.config
    );
  }
}
class Ji extends X {
  static [L] = "PgBigSerial64";
  getSQLType() {
    return "bigserial";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function Yi(r, e) {
  const { name: t, config: n } = de(r, e);
  return n.mode === "number" ? new Gi(t) : new Ki(t);
}
class Xi extends re {
  static [L] = "PgBooleanBuilder";
  constructor(e) {
    super(e, "boolean", "PgBoolean");
  }
  /** @internal */
  build(e) {
    return new Zi(e, this.config);
  }
}
class Zi extends X {
  static [L] = "PgBoolean";
  getSQLType() {
    return "boolean";
  }
}
function eo(r) {
  return new Xi(r ?? "");
}
class to extends re {
  static [L] = "PgCharBuilder";
  constructor(e, t) {
    super(e, "string", "PgChar"), this.config.length = t.length, this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new ro(
      e,
      this.config
    );
  }
}
class ro extends X {
  static [L] = "PgChar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? "char" : `char(${this.length})`;
  }
}
function no(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new to(t, n);
}
class so extends re {
  static [L] = "PgCidrBuilder";
  constructor(e) {
    super(e, "string", "PgCidr");
  }
  /** @internal */
  build(e) {
    return new io(e, this.config);
  }
}
class io extends X {
  static [L] = "PgCidr";
  getSQLType() {
    return "cidr";
  }
}
function oo(r) {
  return new so(r ?? "");
}
class ao extends re {
  static [L] = "PgCustomColumnBuilder";
  constructor(e, t, n) {
    super(e, "custom", "PgCustomColumn"), this.config.fieldConfig = t, this.config.customTypeParams = n;
  }
  /** @internal */
  build(e) {
    return new uo(
      e,
      this.config
    );
  }
}
class uo extends X {
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
function lo(r) {
  return (e, t) => {
    const { name: n, config: i } = de(e, t);
    return new ao(n, i, r);
  };
}
class bt extends re {
  static [L] = "PgDateColumnBaseBuilder";
  defaultNow() {
    return this.default(I`now()`);
  }
}
class co extends bt {
  static [L] = "PgDateBuilder";
  constructor(e) {
    super(e, "date", "PgDate");
  }
  /** @internal */
  build(e) {
    return new Bn(e, this.config);
  }
}
class Bn extends X {
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
class ho extends bt {
  static [L] = "PgDateStringBuilder";
  constructor(e) {
    super(e, "string", "PgDateString");
  }
  /** @internal */
  build(e) {
    return new Rn(
      e,
      this.config
    );
  }
}
class Rn extends X {
  static [L] = "PgDateString";
  getSQLType() {
    return "date";
  }
}
function On(r, e) {
  const { name: t, config: n } = de(r, e);
  return n?.mode === "date" ? new co(t) : new ho(t);
}
class fo extends re {
  static [L] = "PgDoublePrecisionBuilder";
  constructor(e) {
    super(e, "number", "PgDoublePrecision");
  }
  /** @internal */
  build(e) {
    return new po(
      e,
      this.config
    );
  }
}
class po extends X {
  static [L] = "PgDoublePrecision";
  getSQLType() {
    return "double precision";
  }
  mapFromDriverValue(e) {
    return typeof e == "string" ? Number.parseFloat(e) : e;
  }
}
function go(r) {
  return new fo(r ?? "");
}
class mo extends re {
  static [L] = "PgInetBuilder";
  constructor(e) {
    super(e, "string", "PgInet");
  }
  /** @internal */
  build(e) {
    return new yo(e, this.config);
  }
}
class yo extends X {
  static [L] = "PgInet";
  getSQLType() {
    return "inet";
  }
}
function wo(r) {
  return new mo(r ?? "");
}
class bo extends qt {
  static [L] = "PgIntegerBuilder";
  constructor(e) {
    super(e, "number", "PgInteger");
  }
  /** @internal */
  build(e) {
    return new vo(e, this.config);
  }
}
class vo extends X {
  static [L] = "PgInteger";
  getSQLType() {
    return "integer";
  }
  mapFromDriverValue(e) {
    return typeof e == "string" ? Number.parseInt(e) : e;
  }
}
function Oe(r) {
  return new bo(r ?? "");
}
class So extends re {
  static [L] = "PgIntervalBuilder";
  constructor(e, t) {
    super(e, "string", "PgInterval"), this.config.intervalConfig = t;
  }
  /** @internal */
  build(e) {
    return new Po(e, this.config);
  }
}
class Po extends X {
  static [L] = "PgInterval";
  fields = this.config.intervalConfig.fields;
  precision = this.config.intervalConfig.precision;
  getSQLType() {
    const e = this.fields ? ` ${this.fields}` : "", t = this.precision ? `(${this.precision})` : "";
    return `interval${e}${t}`;
  }
}
function Eo(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new So(t, n);
}
class Co extends re {
  static [L] = "PgJsonBuilder";
  constructor(e) {
    super(e, "json", "PgJson");
  }
  /** @internal */
  build(e) {
    return new $n(e, this.config);
  }
}
class $n extends X {
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
  return new Co(r ?? "");
}
class To extends re {
  static [L] = "PgJsonbBuilder";
  constructor(e) {
    super(e, "json", "PgJsonb");
  }
  /** @internal */
  build(e) {
    return new Dn(e, this.config);
  }
}
class Dn extends X {
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
function Ao(r) {
  return new To(r ?? "");
}
class xo extends re {
  static [L] = "PgLineBuilder";
  constructor(e) {
    super(e, "array", "PgLine");
  }
  /** @internal */
  build(e) {
    return new Io(
      e,
      this.config
    );
  }
}
class Io extends X {
  static [L] = "PgLine";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(e) {
    const [t, n, i] = e.slice(1, -1).split(",");
    return [Number.parseFloat(t), Number.parseFloat(n), Number.parseFloat(i)];
  }
  mapToDriverValue(e) {
    return `{${e[0]},${e[1]},${e[2]}}`;
  }
}
class No extends re {
  static [L] = "PgLineABCBuilder";
  constructor(e) {
    super(e, "json", "PgLineABC");
  }
  /** @internal */
  build(e) {
    return new Lo(
      e,
      this.config
    );
  }
}
class Lo extends X {
  static [L] = "PgLineABC";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(e) {
    const [t, n, i] = e.slice(1, -1).split(",");
    return { a: Number.parseFloat(t), b: Number.parseFloat(n), c: Number.parseFloat(i) };
  }
  mapToDriverValue(e) {
    return `{${e.a},${e.b},${e.c}}`;
  }
}
function Bo(r, e) {
  const { name: t, config: n } = de(r, e);
  return !n?.mode || n.mode === "tuple" ? new xo(t) : new No(t);
}
class Ro extends re {
  static [L] = "PgMacaddrBuilder";
  constructor(e) {
    super(e, "string", "PgMacaddr");
  }
  /** @internal */
  build(e) {
    return new Oo(e, this.config);
  }
}
class Oo extends X {
  static [L] = "PgMacaddr";
  getSQLType() {
    return "macaddr";
  }
}
function $o(r) {
  return new Ro(r ?? "");
}
class Do extends re {
  static [L] = "PgMacaddr8Builder";
  constructor(e) {
    super(e, "string", "PgMacaddr8");
  }
  /** @internal */
  build(e) {
    return new Mo(e, this.config);
  }
}
class Mo extends X {
  static [L] = "PgMacaddr8";
  getSQLType() {
    return "macaddr8";
  }
}
function ko(r) {
  return new Do(r ?? "");
}
class Qo extends re {
  static [L] = "PgNumericBuilder";
  constructor(e, t, n) {
    super(e, "string", "PgNumeric"), this.config.precision = t, this.config.scale = n;
  }
  /** @internal */
  build(e) {
    return new Mn(e, this.config);
  }
}
class Mn extends X {
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
class qo extends re {
  static [L] = "PgNumericNumberBuilder";
  constructor(e, t, n) {
    super(e, "number", "PgNumericNumber"), this.config.precision = t, this.config.scale = n;
  }
  /** @internal */
  build(e) {
    return new Fo(
      e,
      this.config
    );
  }
}
class Fo extends X {
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
class Uo extends re {
  static [L] = "PgNumericBigIntBuilder";
  constructor(e, t, n) {
    super(e, "bigint", "PgNumericBigInt"), this.config.precision = t, this.config.scale = n;
  }
  /** @internal */
  build(e) {
    return new jo(
      e,
      this.config
    );
  }
}
class jo extends X {
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
function zo(r, e) {
  const { name: t, config: n } = de(r, e), i = n?.mode;
  return i === "number" ? new qo(t, n?.precision, n?.scale) : i === "bigint" ? new Uo(t, n?.precision, n?.scale) : new Qo(t, n?.precision, n?.scale);
}
class Vo extends re {
  static [L] = "PgPointTupleBuilder";
  constructor(e) {
    super(e, "array", "PgPointTuple");
  }
  /** @internal */
  build(e) {
    return new Wo(
      e,
      this.config
    );
  }
}
class Wo extends X {
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
class Go extends re {
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
  return !n?.mode || n.mode === "tuple" ? new Vo(t) : new Go(t);
}
function Jo(r) {
  const e = [];
  for (let t = 0; t < r.length; t += 2)
    e.push(Number.parseInt(r.slice(t, t + 2), 16));
  return new Uint8Array(e);
}
function cn(r, e) {
  const t = new ArrayBuffer(8), n = new DataView(t);
  for (let i = 0; i < 8; i++)
    n.setUint8(i, r[e + i]);
  return n.getFloat64(0, !0);
}
function kn(r) {
  const e = Jo(r);
  let t = 0;
  const n = e[t];
  t += 1;
  const i = new DataView(e.buffer), s = i.getUint32(t, n === 1);
  if (t += 4, s & 536870912 && (i.getUint32(t, n === 1), t += 4), (s & 65535) === 1) {
    const u = cn(e, t);
    t += 8;
    const o = cn(e, t);
    return t += 8, [u, o];
  }
  throw new Error("Unsupported geometry type");
}
class Yo extends re {
  static [L] = "PgGeometryBuilder";
  constructor(e) {
    super(e, "array", "PgGeometry");
  }
  /** @internal */
  build(e) {
    return new Xo(
      e,
      this.config
    );
  }
}
class Xo extends X {
  static [L] = "PgGeometry";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(e) {
    return kn(e);
  }
  mapToDriverValue(e) {
    return `point(${e[0]} ${e[1]})`;
  }
}
class Zo extends re {
  static [L] = "PgGeometryObjectBuilder";
  constructor(e) {
    super(e, "json", "PgGeometryObject");
  }
  /** @internal */
  build(e) {
    return new ea(
      e,
      this.config
    );
  }
}
class ea extends X {
  static [L] = "PgGeometryObject";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(e) {
    const t = kn(e);
    return { x: t[0], y: t[1] };
  }
  mapToDriverValue(e) {
    return `point(${e.x} ${e.y})`;
  }
}
function ta(r, e) {
  const { name: t, config: n } = de(r, e);
  return !n?.mode || n.mode === "tuple" ? new Yo(t) : new Zo(t);
}
class ra extends re {
  static [L] = "PgRealBuilder";
  constructor(e, t) {
    super(e, "number", "PgReal"), this.config.length = t;
  }
  /** @internal */
  build(e) {
    return new na(e, this.config);
  }
}
class na extends X {
  static [L] = "PgReal";
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return "real";
  }
  mapFromDriverValue = (e) => typeof e == "string" ? Number.parseFloat(e) : e;
}
function sa(r) {
  return new ra(r ?? "");
}
class ia extends re {
  static [L] = "PgSerialBuilder";
  constructor(e) {
    super(e, "number", "PgSerial"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new oa(e, this.config);
  }
}
class oa extends X {
  static [L] = "PgSerial";
  getSQLType() {
    return "serial";
  }
}
function aa(r) {
  return new ia(r ?? "");
}
class ua extends qt {
  static [L] = "PgSmallIntBuilder";
  constructor(e) {
    super(e, "number", "PgSmallInt");
  }
  /** @internal */
  build(e) {
    return new la(e, this.config);
  }
}
class la extends X {
  static [L] = "PgSmallInt";
  getSQLType() {
    return "smallint";
  }
  mapFromDriverValue = (e) => typeof e == "string" ? Number(e) : e;
}
function ca(r) {
  return new ua(r ?? "");
}
class ha extends re {
  static [L] = "PgSmallSerialBuilder";
  constructor(e) {
    super(e, "number", "PgSmallSerial"), this.config.hasDefault = !0, this.config.notNull = !0;
  }
  /** @internal */
  build(e) {
    return new fa(
      e,
      this.config
    );
  }
}
class fa extends X {
  static [L] = "PgSmallSerial";
  getSQLType() {
    return "smallserial";
  }
}
function da(r) {
  return new ha(r ?? "");
}
class pa extends re {
  static [L] = "PgTextBuilder";
  constructor(e, t) {
    super(e, "string", "PgText"), this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new ga(e, this.config);
  }
}
class ga extends X {
  static [L] = "PgText";
  enumValues = this.config.enumValues;
  getSQLType() {
    return "text";
  }
}
function ma(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new pa(t, n);
}
class ya extends bt {
  constructor(e, t, n) {
    super(e, "string", "PgTime"), this.withTimezone = t, this.precision = n, this.config.withTimezone = t, this.config.precision = n;
  }
  static [L] = "PgTimeBuilder";
  /** @internal */
  build(e) {
    return new Qn(e, this.config);
  }
}
class Qn extends X {
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
function wa(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new ya(t, n.withTimezone ?? !1, n.precision);
}
class ba extends bt {
  static [L] = "PgTimestampBuilder";
  constructor(e, t, n) {
    super(e, "date", "PgTimestamp"), this.config.withTimezone = t, this.config.precision = n;
  }
  /** @internal */
  build(e) {
    return new qn(e, this.config);
  }
}
class qn extends X {
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
class va extends bt {
  static [L] = "PgTimestampStringBuilder";
  constructor(e, t, n) {
    super(e, "string", "PgTimestampString"), this.config.withTimezone = t, this.config.precision = n;
  }
  /** @internal */
  build(e) {
    return new Fn(
      e,
      this.config
    );
  }
}
class Fn extends X {
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
function Nt(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return n?.mode === "string" ? new va(t, n.withTimezone ?? !1, n.precision) : new ba(t, n?.withTimezone ?? !1, n?.precision);
}
class Sa extends re {
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
    return new Un(e, this.config);
  }
}
class Un extends X {
  static [L] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
}
function jn(r) {
  return new Sa(r ?? "");
}
class Pa extends re {
  static [L] = "PgVarcharBuilder";
  constructor(e, t) {
    super(e, "string", "PgVarchar"), this.config.length = t.length, this.config.enumValues = t.enum;
  }
  /** @internal */
  build(e) {
    return new Ea(
      e,
      this.config
    );
  }
}
class Ea extends X {
  static [L] = "PgVarchar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? "varchar" : `varchar(${this.length})`;
  }
}
function wt(r, e = {}) {
  const { name: t, config: n } = de(r, e);
  return new Pa(t, n);
}
class Ca extends re {
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
function Ta(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Ca(t, n);
}
class Aa extends re {
  static [L] = "PgHalfVectorBuilder";
  constructor(e, t) {
    super(e, "array", "PgHalfVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new xa(
      e,
      this.config
    );
  }
}
class xa extends X {
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
function Ia(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Aa(t, n);
}
class Na extends re {
  static [L] = "PgSparseVectorBuilder";
  constructor(e, t) {
    super(e, "string", "PgSparseVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new La(
      e,
      this.config
    );
  }
}
class La extends X {
  static [L] = "PgSparseVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `sparsevec(${this.dimensions})`;
  }
}
function Ba(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Na(t, n);
}
class Ra extends re {
  static [L] = "PgVectorBuilder";
  constructor(e, t) {
    super(e, "array", "PgVector"), this.config.dimensions = t.dimensions;
  }
  /** @internal */
  build(e) {
    return new Oa(
      e,
      this.config
    );
  }
}
class Oa extends X {
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
function $a(r, e) {
  const { name: t, config: n } = de(r, e);
  return new Ra(t, n);
}
function Da() {
  return {
    bigint: Wi,
    bigserial: Yi,
    boolean: eo,
    char: no,
    cidr: oo,
    customType: lo,
    date: On,
    doublePrecision: go,
    inet: wo,
    integer: Oe,
    interval: Eo,
    json: _o,
    jsonb: Ao,
    line: Bo,
    macaddr: $o,
    macaddr8: ko,
    numeric: zo,
    point: Ko,
    geometry: ta,
    real: sa,
    serial: aa,
    smallint: ca,
    smallserial: da,
    text: ma,
    time: wa,
    timestamp: Nt,
    uuid: jn,
    varchar: wt,
    bit: Ta,
    halfvec: Ia,
    sparsevec: Ba,
    vector: $a
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
function Ma(r, e, t, n, i = r) {
  const s = new Pe(r, n, i), u = typeof e == "function" ? e(Da()) : e, o = Object.fromEntries(
    Object.entries(u).map(([d, b]) => {
      const y = b;
      y.setName(d);
      const v = y.build(s);
      return s[br].push(...y.buildForeignKeys(v, s)), [d, v];
    })
  ), h = Object.fromEntries(
    Object.entries(u).map(([d, b]) => {
      const y = b;
      y.setName(d);
      const v = y.buildExtraConfigColumn(s);
      return [d, v];
    })
  ), m = Object.assign(s, o);
  return m[j.Symbol.Columns] = o, m[j.Symbol.ExtraConfigColumns] = h, t && (m[Pe.Symbol.ExtraConfigBuilder] = t), Object.assign(m, {
    enableRLS: () => (m[Pe.Symbol.EnableRLS] = !0, m)
  });
}
const ot = (r, e, t) => Ma(r, e, t, void 0);
function ka(...r) {
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
    return new Qa(e, this.columns, this.name);
  }
}
class Qa {
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
  return Bi(e) && !An(r) && !k(r, ke) && !k(r, st) && !k(r, he) && !k(r, j) && !k(r, Ve) ? new ke(r, e) : r;
}
const je = (r, e) => I`${r} = ${ye(e, r)}`, qa = (r, e) => I`${r} <> ${ye(e, r)}`;
function Dt(...r) {
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
function Fa(...r) {
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
function Ua(r) {
  return I`not ${r}`;
}
const ja = (r, e) => I`${r} > ${ye(e, r)}`, za = (r, e) => I`${r} >= ${ye(e, r)}`, Va = (r, e) => I`${r} < ${ye(e, r)}`, Wa = (r, e) => I`${r} <= ${ye(e, r)}`;
function Ga(r, e) {
  return Array.isArray(e) ? e.length === 0 ? I`false` : I`${r} in ${e.map((t) => ye(t, r))}` : I`${r} in ${ye(e, r)}`;
}
function Ha(r, e) {
  return Array.isArray(e) ? e.length === 0 ? I`true` : I`${r} not in ${e.map((t) => ye(t, r))}` : I`${r} not in ${ye(e, r)}`;
}
function Ka(r) {
  return I`${r} is null`;
}
function Ja(r) {
  return I`${r} is not null`;
}
function Ya(r) {
  return I`exists ${r}`;
}
function Xa(r) {
  return I`not exists ${r}`;
}
function Za(r, e, t) {
  return I`${r} between ${ye(e, r)} and ${ye(
    t,
    r
  )}`;
}
function eu(r, e, t) {
  return I`${r} not between ${ye(
    e,
    r
  )} and ${ye(t, r)}`;
}
function tu(r, e) {
  return I`${r} like ${e}`;
}
function ru(r, e) {
  return I`${r} not like ${e}`;
}
function nu(r, e) {
  return I`${r} ilike ${e}`;
}
function su(r, e) {
  return I`${r} not ilike ${e}`;
}
function zn(r) {
  return I`${r} asc`;
}
function Vn(r) {
  return I`${r} desc`;
}
class Wn {
  constructor(e, t, n) {
    this.sourceTable = e, this.referencedTable = t, this.relationName = n, this.referencedTableName = t[j.Symbol.Name];
  }
  static [L] = "Relation";
  referencedTableName;
  fieldName;
}
class iu {
  constructor(e, t) {
    this.table = e, this.config = t;
  }
  static [L] = "Relations";
}
class ze extends Wn {
  constructor(e, t, n, i) {
    super(e, t, n?.relationName), this.config = n, this.isNullable = i;
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
class Ft extends Wn {
  constructor(e, t, n) {
    super(e, t, n?.relationName), this.config = n;
  }
  static [L] = "Many";
  withFieldName(e) {
    const t = new Ft(
      this.sourceTable,
      this.referencedTable,
      this.config
    );
    return t.fieldName = e, t;
  }
}
function ou() {
  return {
    and: Dt,
    between: Za,
    eq: je,
    exists: Ya,
    gt: ja,
    gte: za,
    ilike: nu,
    inArray: Ga,
    isNull: Ka,
    isNotNull: Ja,
    like: tu,
    lt: Va,
    lte: Wa,
    ne: qa,
    not: Ua,
    notBetween: eu,
    notExists: Xa,
    notLike: ru,
    notIlike: su,
    notInArray: Ha,
    or: Fa,
    sql: I
  };
}
function au() {
  return {
    sql: I,
    asc: zn,
    desc: Vn
  };
}
function uu(r, e) {
  Object.keys(r).length === 1 && "default" in r && !k(r.default, j) && (r = r.default);
  const t = {}, n = {}, i = {};
  for (const [s, u] of Object.entries(r))
    if (k(u, j)) {
      const o = yt(u), h = n[o];
      t[o] = s, i[s] = {
        tsName: s,
        dbName: u[j.Symbol.Name],
        schema: u[j.Symbol.Schema],
        columns: u[j.Symbol.Columns],
        relations: h?.relations ?? {},
        primaryKey: h?.primaryKey ?? []
      };
      for (const d of Object.values(
        u[j.Symbol.Columns]
      ))
        d.primary && i[s].primaryKey.push(d);
      const m = u[j.Symbol.ExtraConfigBuilder]?.(u[j.Symbol.ExtraConfigColumns]);
      if (m)
        for (const d of Object.values(m))
          k(d, vr) && i[s].primaryKey.push(...d.columns);
    } else if (k(u, iu)) {
      const o = yt(u.table), h = t[o], m = u.config(
        e(u.table)
      );
      let d;
      for (const [b, y] of Object.entries(m))
        if (h) {
          const v = i[h];
          v.relations[b] = y;
        } else
          o in n || (n[o] = {
            relations: {},
            primaryKey: d
          }), n[o].relations[b] = y;
    }
  return { tables: i, tableNamesMap: t };
}
function lu(r) {
  return function(t, n) {
    return new ze(
      r,
      t,
      n,
      n?.fields.reduce((i, s) => i && s.notNull, !0) ?? !1
    );
  };
}
function cu(r) {
  return function(t, n) {
    return new Ft(r, t, n);
  };
}
function hu(r, e, t) {
  if (k(t, ze) && t.config)
    return {
      fields: t.config.fields,
      references: t.config.references
    };
  const n = e[yt(t.referencedTable)];
  if (!n)
    throw new Error(
      `Table "${t.referencedTable[j.Symbol.Name]}" not found in schema`
    );
  const i = r[n];
  if (!i)
    throw new Error(`Table "${n}" not found in schema`);
  const s = t.sourceTable, u = e[yt(s)];
  if (!u)
    throw new Error(
      `Table "${s[j.Symbol.Name]}" not found in schema`
    );
  const o = [];
  for (const h of Object.values(
    i.relations
  ))
    (t.relationName && t !== h && h.relationName === t.relationName || !t.relationName && h.referencedTable === t.sourceTable) && o.push(h);
  if (o.length > 1)
    throw t.relationName ? new Error(
      `There are multiple relations with name "${t.relationName}" in table "${n}"`
    ) : new Error(
      `There are multiple relations between "${n}" and "${t.sourceTable[j.Symbol.Name]}". Please specify relation name`
    );
  if (o[0] && k(o[0], ze) && o[0].config)
    return {
      fields: o[0].config.references,
      references: o[0].config.fields
    };
  throw new Error(
    `There is not enough information to infer relation "${u}.${t.fieldName}"`
  );
}
function fu(r) {
  return {
    one: lu(r),
    many: cu(r)
  };
}
function Sr(r, e, t, n, i = (s) => s) {
  const s = {};
  for (const [
    u,
    o
  ] of n.entries())
    if (o.isJson) {
      const h = e.relations[o.tsKey], m = t[u], d = typeof m == "string" ? JSON.parse(m) : m;
      s[o.tsKey] = k(h, ze) ? d && Sr(
        r,
        r[o.relationTableTsKey],
        d,
        o.selection,
        i
      ) : d.map(
        (b) => Sr(
          r,
          r[o.relationTableTsKey],
          b,
          o.selection,
          i
        )
      );
    } else {
      const h = i(t[u]), m = o.field;
      let d;
      k(m, he) ? d = m : k(m, z) ? d = m.decoder : d = m.sql.decoder, s[o.tsKey] = h === null ? null : d.mapFromDriverValue(h);
    }
  return s;
}
class du {
  constructor(e, t) {
    this.name = e, this.value = t;
  }
  static [L] = "PgCheckBuilder";
  brand;
  /** @internal */
  build(e) {
    return new pu(e, this);
  }
}
class pu {
  constructor(e, t) {
    this.table = e, this.name = t.name, this.value = t.value;
  }
  static [L] = "PgCheck";
  name;
  value;
}
function Gn(r, e) {
  return new du(r, e);
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
    const i = (k(e, Te) ? e._.selectedFields : k(e, Ve) ? e[le].selectedFields : e)[t];
    if (k(i, z.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !i.isSelectionField)
        return i.sql;
      const s = i.clone();
      return s.isSelectionField = !0, s;
    }
    if (k(i, z)) {
      if (this.config.sqlBehavior === "sql")
        return i;
      throw new Error(
        `You tried to reference "${t}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
      );
    }
    return k(i, he) ? this.config.alias ? new Proxy(
      i,
      new Ot(
        new Proxy(
          i.table,
          new Br(this.config.alias, this.config.replaceOriginalName ?? !1)
        )
      )
    ) : i : typeof i != "object" || i === null ? i : new Proxy(i, new me(this.config));
  }
}
class fn extends We {
  constructor(e, t, n, i) {
    super(), this.session = t, this.dialect = n, this.config = { table: e, withList: i };
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
    return this.config.returningFields = e, this.config.returning = Ue(e), this;
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
function gu(r) {
  return (r.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).map((t) => t.toLowerCase()).join("_");
}
function mu(r) {
  return (r.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).reduce((t, n, i) => {
    const s = i === 0 ? n.toLowerCase() : `${n[0].toUpperCase()}${n.slice(1)}`;
    return t + s;
  }, "");
}
function yu(r) {
  return r;
}
class wu {
  static [L] = "CasingCache";
  /** @internal */
  cache = {};
  cachedTables = {};
  convert;
  constructor(e) {
    this.convert = e === "snake_case" ? gu : e === "camelCase" ? mu : yu;
  }
  getColumnCasing(e) {
    if (!e.keyAsName)
      return e.name;
    const t = e.table[j.Symbol.Schema] ?? "public", n = e.table[j.Symbol.OriginalName], i = `${t}.${n}.${e.name}`;
    return this.cache[i] || this.cacheTable(e.table), this.cache[i];
  }
  cacheTable(e) {
    const t = e[j.Symbol.Schema] ?? "public", n = e[j.Symbol.OriginalName], i = `${t}.${n}`;
    if (!this.cachedTables[i]) {
      for (const s of Object.values(e[j.Symbol.Columns])) {
        const u = `${i}.${s.name}`;
        this.cache[u] = this.convert(s.name);
      }
      this.cachedTables[i] = !0;
    }
  }
  clearCache() {
    this.cache = {}, this.cachedTables = {};
  }
}
class Hn extends Ve {
  static [L] = "PgViewBase";
}
class Lt {
  static [L] = "PgDialect";
  /** @internal */
  casing;
  constructor(e) {
    this.casing = new wu(e?.casing);
  }
  async migrate(e, t, n) {
    const i = typeof n == "string" ? "__drizzle_migrations" : n.migrationsTable ?? "__drizzle_migrations", s = typeof n == "string" ? "drizzle" : n.migrationsSchema ?? "drizzle", u = I`
			CREATE TABLE IF NOT EXISTS ${I.identifier(s)}.${I.identifier(i)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
    await t.execute(I`CREATE SCHEMA IF NOT EXISTS ${I.identifier(s)}`), await t.execute(u);
    const h = (await t.all(
      I`select id, hash, created_at from ${I.identifier(s)}.${I.identifier(i)} order by created_at desc limit 1`
    ))[0];
    await t.transaction(async (m) => {
      for await (const d of e)
        if (!h || Number(h.created_at) < d.folderMillis) {
          for (const b of d.sql)
            await m.execute(I.raw(b));
          await m.execute(
            I`insert into ${I.identifier(s)}.${I.identifier(i)} ("hash", "created_at") values(${d.hash}, ${d.folderMillis})`
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
    for (const [n, i] of e.entries())
      t.push(I`${I.identifier(i._.alias)} as (${i._.sql})`), n < e.length - 1 && t.push(I`, `);
    return t.push(I` `), I.join(t);
  }
  buildDeleteQuery({ table: e, where: t, returning: n, withList: i }) {
    const s = this.buildWithCTE(i), u = n ? I` returning ${this.buildSelection(n, { isSingleTable: !0 })}` : void 0, o = t ? I` where ${t}` : void 0;
    return I`${s}delete from ${e}${o}${u}`;
  }
  buildUpdateSet(e, t) {
    const n = e[j.Symbol.Columns], i = Object.keys(n).filter(
      (u) => t[u] !== void 0 || n[u]?.onUpdateFn !== void 0
    ), s = i.length;
    return I.join(i.flatMap((u, o) => {
      const h = n[u], m = t[u] ?? I.param(h.onUpdateFn(), h), d = I`${I.identifier(this.casing.getColumnCasing(h))} = ${m}`;
      return o < s - 1 ? [d, I.raw(", ")] : [d];
    }));
  }
  buildUpdateQuery({ table: e, set: t, where: n, returning: i, withList: s, from: u, joins: o }) {
    const h = this.buildWithCTE(s), m = e[Pe.Symbol.Name], d = e[Pe.Symbol.Schema], b = e[Pe.Symbol.OriginalName], y = m === b ? void 0 : m, v = I`${d ? I`${I.identifier(d)}.` : void 0}${I.identifier(b)}${y && I` ${I.identifier(y)}`}`, c = this.buildUpdateSet(e, t), f = u && I.join([I.raw(" from "), this.buildFromTable(u)]), w = this.buildJoins(o), S = i ? I` returning ${this.buildSelection(i, { isSingleTable: !u })}` : void 0, E = n ? I` where ${n}` : void 0;
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
    const n = e.length, i = e.flatMap(({ field: s }, u) => {
      const o = [];
      if (k(s, z.Aliased) && s.isSelectionField)
        o.push(I.identifier(s.fieldAlias));
      else if (k(s, z.Aliased) || k(s, z)) {
        const h = k(s, z.Aliased) ? s.sql : s;
        t ? o.push(
          new z(
            h.queryChunks.map((m) => k(m, X) ? I.identifier(this.casing.getColumnCasing(m)) : m)
          )
        ) : o.push(h), k(s, z.Aliased) && o.push(I` as ${I.identifier(s.fieldAlias)}`);
      } else
        k(s, he) && (t ? o.push(I.identifier(this.casing.getColumnCasing(s))) : o.push(s));
      return u < n - 1 && o.push(I`, `), o;
    });
    return I.join(i);
  }
  buildJoins(e) {
    if (!e || e.length === 0)
      return;
    const t = [];
    for (const [n, i] of e.entries()) {
      n === 0 && t.push(I` `);
      const s = i.table, u = i.lateral ? I` lateral` : void 0, o = i.on ? I` on ${i.on}` : void 0;
      if (k(s, Pe)) {
        const h = s[Pe.Symbol.Name], m = s[Pe.Symbol.Schema], d = s[Pe.Symbol.OriginalName], b = h === d ? void 0 : i.alias;
        t.push(
          I`${I.raw(i.joinType)} join${u} ${m ? I`${I.identifier(m)}.` : void 0}${I.identifier(d)}${b && I` ${I.identifier(b)}`}${o}`
        );
      } else if (k(s, Ve)) {
        const h = s[le].name, m = s[le].schema, d = s[le].originalName, b = h === d ? void 0 : i.alias;
        t.push(
          I`${I.raw(i.joinType)} join${u} ${m ? I`${I.identifier(m)}.` : void 0}${I.identifier(d)}${b && I` ${I.identifier(b)}`}${o}`
        );
      } else
        t.push(
          I`${I.raw(i.joinType)} join${u} ${s}${o}`
        );
      n < e.length - 1 && t.push(I` `);
    }
    return I.join(t);
  }
  buildFromTable(e) {
    if (k(e, j) && e[j.Symbol.IsAlias]) {
      let t = I`${I.identifier(e[j.Symbol.OriginalName])}`;
      return e[j.Symbol.Schema] && (t = I`${I.identifier(e[j.Symbol.Schema])}.${t}`), I`${t} ${I.identifier(e[j.Symbol.Name])}`;
    }
    return e;
  }
  buildSelectQuery({
    withList: e,
    fields: t,
    fieldsFlat: n,
    where: i,
    having: s,
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
    const f = n ?? Ue(t);
    for (const R of f)
      if (k(R.field, he) && Re(R.field.table) !== (k(u, Te) ? u._.alias : k(u, Hn) ? u[le].name : k(u, z) ? void 0 : Re(u)) && !((q) => o?.some(
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
    const _ = this.buildSelection(f, { isSingleTable: w }), B = this.buildFromTable(u), $ = this.buildJoins(o), P = i ? I` where ${i}` : void 0, x = s ? I` having ${s}` : void 0;
    let A;
    h && h.length > 0 && (A = I` order by ${I.join(h, I`, `)}`);
    let C;
    m && m.length > 0 && (C = I` group by ${I.join(m, I`, `)}`);
    const O = typeof d == "object" || typeof d == "number" && d >= 0 ? I` limit ${d}` : void 0, D = b ? I` offset ${b}` : void 0, F = I.empty();
    if (y) {
      const R = I` for ${I.raw(y.strength)}`;
      y.config.of && R.append(
        I` of ${I.join(
          Array.isArray(y.config.of) ? y.config.of : [y.config.of],
          I`, `
        )}`
      ), y.config.noWait ? R.append(I` nowait`) : y.config.skipLocked && R.append(I` skip locked`), F.append(R);
    }
    const U = I`${S}select${E} ${_} from ${B}${$}${P}${C}${x}${A}${O}${D}${F}`;
    return c.length > 0 ? this.buildSetOperations(U, c) : U;
  }
  buildSetOperations(e, t) {
    const [n, ...i] = t;
    if (!n)
      throw new Error("Cannot pass undefined values to any set operator");
    return i.length === 0 ? this.buildSetOperationQuery({ leftSelect: e, setOperator: n }) : this.buildSetOperations(
      this.buildSetOperationQuery({ leftSelect: e, setOperator: n }),
      i
    );
  }
  buildSetOperationQuery({
    leftSelect: e,
    setOperator: { type: t, isAll: n, rightSelect: i, limit: s, orderBy: u, offset: o }
  }) {
    const h = I`(${e.getSQL()}) `, m = I`(${i.getSQL()})`;
    let d;
    if (u && u.length > 0) {
      const c = [];
      for (const f of u)
        if (k(f, X))
          c.push(I.identifier(f.name));
        else if (k(f, z)) {
          for (let w = 0; w < f.queryChunks.length; w++) {
            const S = f.queryChunks[w];
            k(S, X) && (f.queryChunks[w] = I.identifier(S.name));
          }
          c.push(I`${f}`);
        } else
          c.push(I`${f}`);
      d = I` order by ${I.join(c, I`, `)} `;
    }
    const b = typeof s == "object" || typeof s == "number" && s >= 0 ? I` limit ${s}` : void 0, y = I.raw(`${t} ${n ? "all " : ""}`), v = o ? I` offset ${o}` : void 0;
    return I`${h}${y}${m}${d}${b}${v}`;
  }
  buildInsertQuery({ table: e, values: t, onConflict: n, returning: i, withList: s, select: u, overridingSystemValue_: o }) {
    const h = [], m = e[j.Symbol.Columns], d = Object.entries(m).filter(([S, E]) => !E.shouldDisableInsert()), b = d.map(
      ([, S]) => I.identifier(this.casing.getColumnCasing(S))
    );
    if (u) {
      const S = t;
      k(S, z) ? h.push(S) : h.push(S.getSQL());
    } else {
      const S = t;
      h.push(I.raw("values "));
      for (const [E, _] of S.entries()) {
        const B = [];
        for (const [$, P] of d) {
          const x = _[$];
          if (x === void 0 || k(x, ke) && x.value === void 0)
            if (P.defaultFn !== void 0) {
              const A = P.defaultFn(), C = k(A, z) ? A : I.param(A, P);
              B.push(C);
            } else if (!P.default && P.onUpdateFn !== void 0) {
              const A = P.onUpdateFn(), C = k(A, z) ? A : I.param(A, P);
              B.push(C);
            } else
              B.push(I`default`);
          else
            B.push(x);
        }
        h.push(B), E < S.length - 1 && h.push(I`, `);
      }
    }
    const y = this.buildWithCTE(s), v = I.join(h), c = i ? I` returning ${this.buildSelection(i, { isSingleTable: !0 })}` : void 0, f = n ? I` on conflict ${n}` : void 0, w = o === !0 ? I`overriding system value ` : void 0;
    return I`${y}insert into ${e} ${b} ${w}${v}${f}${c}`;
  }
  buildRefreshMaterializedViewQuery({ view: e, concurrently: t, withNoData: n }) {
    const i = t ? I` concurrently` : void 0, s = n ? I` with no data` : void 0;
    return I`refresh materialized view${i} ${e}${s}`;
  }
  prepareTyping(e) {
    return k(e, Dn) || k(e, $n) ? "json" : k(e, Mn) ? "decimal" : k(e, Qn) ? "time" : k(e, qn) || k(e, Fn) ? "timestamp" : k(e, Bn) || k(e, Rn) ? "date" : k(e, Un) ? "uuid" : "none";
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
    table: i,
    tableConfig: s,
    queryConfig: u,
    tableAlias: o,
    nestedQueryRelation: h,
    joinOn: m
  }) {
    let d = [], b, y, v = [], c;
    const f = [];
    if (u === !0)
      d = Object.entries(s.columns).map(([E, _]) => ({
        dbKey: _.name,
        tsKey: E,
        field: Be(_, o),
        relationTableTsKey: void 0,
        isJson: !1,
        selection: []
      }));
    else {
      const S = Object.fromEntries(
        Object.entries(s.columns).map(([x, A]) => [x, Be(A, o)])
      );
      if (u.where) {
        const x = typeof u.where == "function" ? u.where(S, ou()) : u.where;
        c = x && $t(x, o);
      }
      const E = [];
      let _ = [];
      if (u.columns) {
        let x = !1;
        for (const [A, C] of Object.entries(u.columns))
          C !== void 0 && A in s.columns && (!x && C === !0 && (x = !0), _.push(A));
        _.length > 0 && (_ = x ? _.filter((A) => u.columns?.[A] === !0) : Object.keys(s.columns).filter((A) => !_.includes(A)));
      } else
        _ = Object.keys(s.columns);
      for (const x of _) {
        const A = s.columns[x];
        E.push({ tsKey: x, value: A });
      }
      let B = [];
      u.with && (B = Object.entries(u.with).filter((x) => !!x[1]).map(([x, A]) => ({ tsKey: x, queryConfig: A, relation: s.relations[x] })));
      let $;
      if (u.extras) {
        $ = typeof u.extras == "function" ? u.extras(S, { sql: I }) : u.extras;
        for (const [x, A] of Object.entries($))
          E.push({
            tsKey: x,
            value: Nn(A, o)
          });
      }
      for (const { tsKey: x, value: A } of E)
        d.push({
          dbKey: k(A, z.Aliased) ? A.fieldAlias : s.columns[x].name,
          tsKey: x,
          field: k(A, he) ? Be(A, o) : A,
          relationTableTsKey: void 0,
          isJson: !1,
          selection: []
        });
      let P = typeof u.orderBy == "function" ? u.orderBy(S, au()) : u.orderBy ?? [];
      Array.isArray(P) || (P = [P]), v = P.map((x) => k(x, he) ? Be(x, o) : $t(x, o)), b = u.limit, y = u.offset;
      for (const {
        tsKey: x,
        queryConfig: A,
        relation: C
      } of B) {
        const O = hu(t, n, C), D = yt(C.referencedTable), F = n[D], U = `${o}_${x}`, R = Dt(
          ...O.fields.map(
            (K, te) => je(
              Be(O.references[te], U),
              Be(K, o)
            )
          )
        ), q = this.buildRelationalQueryWithoutPK({
          fullSchema: e,
          schema: t,
          tableNamesMap: n,
          table: e[F],
          tableConfig: t[F],
          queryConfig: k(C, ze) ? A === !0 ? { limit: 1 } : { ...A, limit: 1 } : A,
          tableAlias: U,
          joinOn: R,
          nestedQueryRelation: C
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
      throw new Oi({ message: `No fields selected for table "${s.tsName}" ("${o}")` });
    let w;
    if (c = Dt(m, c), h) {
      let S = I`json_build_array(${I.join(
        d.map(
          ({ field: B, tsKey: $, isJson: P }) => P ? I`${I.identifier(`${o}_${$}`)}.${I.identifier("data")}` : k(B, z.Aliased) ? B.sql : B
        ),
        I`, `
      )})`;
      k(h, Ft) && (S = I`coalesce(json_agg(${S}${v.length > 0 ? I` order by ${I.join(v, I`, `)}` : void 0}), '[]'::json)`);
      const E = [{
        dbKey: "data",
        tsKey: "data",
        field: S.as("data"),
        isJson: !0,
        relationTableTsKey: s.tsName,
        selection: d
      }];
      b !== void 0 || y !== void 0 || v.length > 0 ? (w = this.buildSelectQuery({
        table: lr(i, o),
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
      }), c = void 0, b = void 0, y = void 0, v = []) : w = lr(i, o), w = this.buildSelectQuery({
        table: k(w, Pe) ? w : new Te(w, {}, o),
        fields: {},
        fieldsFlat: E.map(({ field: B }) => ({
          path: [],
          field: k(B, he) ? Be(B, o) : B
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
        table: lr(i, o),
        fields: {},
        fieldsFlat: d.map(({ field: S }) => ({
          path: [],
          field: k(S, he) ? Be(S, o) : S
        })),
        joins: f,
        where: c,
        limit: b,
        offset: y,
        orderBy: v,
        setOperators: []
      });
    return {
      tableTsKey: s.tsName,
      sql: w,
      selection: d
    };
  }
}
class bu {
  static [L] = "TypedQueryBuilder";
  /** @internal */
  getSelectedFields() {
    return this._.selectedFields;
  }
}
class _e {
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
    let i;
    return this.fields ? i = this.fields : k(n, Te) ? i = Object.fromEntries(
      Object.keys(n._.selectedFields).map((s) => [s, n[s]])
    ) : k(n, Hn) ? i = n[le].selectedFields : k(n, z) ? i = {} : i = qi(n), new Kn({
      table: n,
      fields: i,
      isPartialSelect: t,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    }).setToken(this.authToken);
  }
}
class vu extends bu {
  static [L] = "PgSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({ table: e, fields: t, isPartialSelect: n, session: i, dialect: s, withList: u, distinct: o }) {
    super(), this.config = {
      withList: u,
      table: e,
      fields: { ...t },
      distinct: o,
      setOperators: []
    }, this.isPartialSelect = n, this.session = i, this.dialect = s, this._ = {
      selectedFields: t
    }, this.tableName = qe(e), this.joinsNotNullableMap = typeof this.tableName == "string" ? { [this.tableName]: !0 } : {};
  }
  createJoin(e, t) {
    return (n, i) => {
      const s = this.tableName, u = qe(n);
      if (typeof u == "string" && this.config.joins?.some((o) => o.alias === u))
        throw new Error(`Alias "${u}" is already used in this query`);
      if (!this.isPartialSelect && (Object.keys(this.joinsNotNullableMap).length === 1 && typeof s == "string" && (this.config.fields = {
        [s]: this.config.fields
      }), typeof u == "string" && !k(n, z))) {
        const o = k(n, Te) ? n._.selectedFields : k(n, Ve) ? n[le].selectedFields : n[j.Symbol.Columns];
        this.config.fields[u] = o;
      }
      if (typeof i == "function" && (i = i(
        new Proxy(
          this.config.fields,
          new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
        )
      )), this.config.joins || (this.config.joins = []), this.config.joins.push({ on: i, table: n, joinType: e, alias: u, lateral: t }), typeof u == "string")
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
      const i = typeof n == "function" ? n(Su()) : n;
      if (!Rr(this.getSelectedFields(), i.getSelectedFields()))
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      return this.config.setOperators.push({ type: e, isAll: t, rightSelect: i }), this;
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
class Kn extends vu {
  static [L] = "PgSelect";
  /** @internal */
  _prepare(e) {
    const { session: t, config: n, dialect: i, joinsNotNullableMap: s, authToken: u } = this;
    if (!t)
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    return Ee.startActiveSpan("drizzle.prepareQuery", () => {
      const o = Ue(n.fields), h = t.prepareQuery(i.sqlToQuery(this.getSQL()), o, e, !0);
      return h.joinsNotNullableMap = s, h.setToken(u);
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
Qi(Kn, [We]);
function at(r, e) {
  return (t, n, ...i) => {
    const s = [n, ...i].map((u) => ({
      type: r,
      isAll: e,
      rightSelect: u
    }));
    for (const u of s)
      if (!Rr(t.getSelectedFields(), u.rightSelect.getSelectedFields()))
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
    return t.addSetOperators(s);
  };
}
const Su = () => ({
  union: Pu,
  unionAll: Eu,
  intersect: Cu,
  intersectAll: _u,
  except: Tu,
  exceptAll: Au
}), Pu = at("union", !1), Eu = at("union", !0), Cu = at("intersect", !1), _u = at("intersect", !0), Tu = at("except", !1), Au = at("except", !0);
class Jn {
  static [L] = "PgQueryBuilder";
  dialect;
  dialectConfig;
  constructor(e) {
    this.dialect = k(e, Lt) ? e : void 0, this.dialectConfig = k(e, Lt) ? void 0 : e;
  }
  $with = (e, t) => {
    const n = this;
    return { as: (s) => (typeof s == "function" && (s = s(n)), new Proxy(
      new Tn(
        s.getSQL(),
        t ?? ("getSelectedFields" in s ? s.getSelectedFields() ?? {} : {}),
        e,
        !0
      ),
      new me({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    )) };
  };
  with(...e) {
    const t = this;
    function n(u) {
      return new _e({
        fields: u ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        withList: e
      });
    }
    function i(u) {
      return new _e({
        fields: u ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        distinct: !0
      });
    }
    function s(u, o) {
      return new _e({
        fields: o ?? void 0,
        session: void 0,
        dialect: t.getDialect(),
        distinct: { on: u }
      });
    }
    return { select: n, selectDistinct: i, selectDistinctOn: s };
  }
  select(e) {
    return new _e({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect()
    });
  }
  selectDistinct(e) {
    return new _e({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new _e({
      fields: t ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: { on: e }
    });
  }
  // Lazy load dialect to avoid circular dependency
  getDialect() {
    return this.dialect || (this.dialect = new Lt(this.dialectConfig)), this.dialect;
  }
}
class dn {
  constructor(e, t, n, i, s) {
    this.table = e, this.session = t, this.dialect = n, this.withList = i, this.overridingSystemValue_ = s;
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
      const i = {}, s = this.table[j.Symbol.Columns];
      for (const u of Object.keys(n)) {
        const o = n[u];
        i[u] = k(o, z) ? o : new ke(o, s[u]);
      }
      return i;
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
    const t = typeof e == "function" ? e(new Jn()) : e;
    if (!k(t, z) && !Rr(this.table[yr], t._.selectedFields))
      throw new Error(
        "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
      );
    return new pn(this.table, t, this.session, this.dialect, this.withList, !0);
  }
}
class pn extends We {
  constructor(e, t, n, i, s, u, o) {
    super(), this.session = n, this.dialect = i, this.config = { table: e, values: t, withList: s, select: u, overridingSystemValue_: o };
  }
  static [L] = "PgInsert";
  config;
  returning(e = this.config.table[j.Symbol.Columns]) {
    return this.config.returningFields = e, this.config.returning = Ue(e), this;
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
      t = Array.isArray(e.target) ? e.target.map((i) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(i))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(e.target));
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
    const t = e.where ? I` where ${e.where}` : void 0, n = e.targetWhere ? I` where ${e.targetWhere}` : void 0, i = e.setWhere ? I` where ${e.setWhere}` : void 0, s = this.dialect.buildUpdateSet(this.config.table, Ln(this.config.table, e.set));
    let u = "";
    return u = Array.isArray(e.target) ? e.target.map((o) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(o))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(e.target)), this.config.onConflict = I`(${I.raw(u)})${n} do update set ${s}${t}${i}`, this;
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
class xu extends We {
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
  constructor(e, t, n, i) {
    this.table = e, this.session = t, this.dialect = n, this.withList = i;
  }
  static [L] = "PgUpdateBuilder";
  authToken;
  setToken(e) {
    return this.authToken = e, this;
  }
  set(e) {
    return new Iu(
      this.table,
      Ln(this.table, e),
      this.session,
      this.dialect,
      this.withList
    ).setToken(this.authToken);
  }
}
class Iu extends We {
  constructor(e, t, n, i, s) {
    super(), this.session = n, this.dialect = i, this.config = { set: t, table: e, withList: s, joins: [] }, this.tableName = qe(e), this.joinsNotNullableMap = typeof this.tableName == "string" ? { [this.tableName]: !0 } : {};
  }
  static [L] = "PgUpdate";
  config;
  tableName;
  joinsNotNullableMap;
  from(e) {
    const t = e, n = qe(t);
    return typeof n == "string" && (this.joinsNotNullableMap[n] = !0), this.config.from = t, this;
  }
  getTableLikeFields(e) {
    return k(e, Pe) ? e[j.Symbol.Columns] : k(e, Te) ? e._.selectedFields : e[le].selectedFields;
  }
  createJoin(e) {
    return (t, n) => {
      const i = qe(t);
      if (typeof i == "string" && this.config.joins.some((s) => s.alias === i))
        throw new Error(`Alias "${i}" is already used in this query`);
      if (typeof n == "function") {
        const s = this.config.from && !k(this.config.from, z) ? this.getTableLikeFields(this.config.from) : void 0;
        n = n(
          new Proxy(
            this.config.table[j.Symbol.Columns],
            new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          ),
          s && new Proxy(
            s,
            new me({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          )
        );
      }
      if (this.config.joins.push({ on: n, table: t, joinType: e, alias: i }), typeof i == "string")
        switch (e) {
          case "left": {
            this.joinsNotNullableMap[i] = !1;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([s]) => [s, !1])
            ), this.joinsNotNullableMap[i] = !0;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[i] = !0;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([s]) => [s, !1])
            ), this.joinsNotNullableMap[i] = !1;
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
      const t = qe(this.config.from);
      if (typeof t == "string" && this.config.from && !k(this.config.from, z)) {
        const n = this.getTableLikeFields(this.config.from);
        e[t] = n;
      }
      for (const n of this.config.joins) {
        const i = qe(n.table);
        if (typeof i == "string" && !k(n.table, z)) {
          const s = this.getTableLikeFields(n.table);
          e[i] = s;
        }
      }
    }
    return this.config.returningFields = e, this.config.returning = Ue(e), this;
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
class Mt extends z {
  constructor(e) {
    super(Mt.buildEmbeddedCount(e.source, e.filters).queryChunks), this.params = e, this.mapWith(Number), this.session = e.session, this.sql = Mt.buildCount(
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
class Nu {
  constructor(e, t, n, i, s, u, o) {
    this.fullSchema = e, this.schema = t, this.tableNamesMap = n, this.table = i, this.tableConfig = s, this.dialect = u, this.session = o;
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
  constructor(e, t, n, i, s, u, o, h, m) {
    super(), this.fullSchema = e, this.schema = t, this.tableNamesMap = n, this.table = i, this.tableConfig = s, this.dialect = u, this.session = o, this.config = h, this.mode = m;
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
        (i, s) => {
          const u = i.map(
            (o) => Sr(this.schema, this.tableConfig, o, t.selection, s)
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
class Lu extends We {
  constructor(e, t, n, i) {
    super(), this.execute = e, this.sql = t, this.query = n, this.mapBatchResult = i;
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
class Bu {
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
      for (const [i, s] of Object.entries(this._.schema))
        this.query[i] = new Nu(
          n.fullSchema,
          this._.schema,
          this._.tableNamesMap,
          n.fullSchema[i],
          s,
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
    return { as: (s) => (typeof s == "function" && (s = s(new Jn(n.dialect))), new Proxy(
      new Tn(
        s.getSQL(),
        t ?? ("getSelectedFields" in s ? s.getSelectedFields() ?? {} : {}),
        e,
        !0
      ),
      new me({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    )) };
  };
  $count(e, t) {
    return new Mt({ source: e, filters: t, session: this.session });
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
      return new _e({
        fields: m ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e
      });
    }
    function i(m) {
      return new _e({
        fields: m ?? void 0,
        session: t.session,
        dialect: t.dialect,
        withList: e,
        distinct: !0
      });
    }
    function s(m, d) {
      return new _e({
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
    return { select: n, selectDistinct: i, selectDistinctOn: s, update: u, insert: o, delete: h };
  }
  select(e) {
    return new _e({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(e) {
    return new _e({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new _e({
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
    return new xu(e, this.session, this.dialect);
  }
  authToken;
  execute(e) {
    const t = typeof e == "string" ? I.raw(e) : e.getSQL(), n = this.dialect.sqlToQuery(t), i = this.session.prepareQuery(
      n,
      void 0,
      void 0,
      !1
    );
    return new Lu(
      () => i.execute(void 0, this.authToken),
      t,
      n,
      (s) => i.mapResult(s, !0)
    );
  }
  transaction(e, t) {
    return this.session.transaction(e, t);
  }
}
class Yn {
  constructor(e, t) {
    this.unique = e, this.name = t;
  }
  static [L] = "PgIndexBuilderOn";
  on(...e) {
    return new cr(
      e.map((t) => {
        if (k(t, z))
          return t;
        t = t;
        const n = new ir(t.name, !!t.keyAsName, t.columnType, t.indexConfig);
        return t.indexConfig = JSON.parse(JSON.stringify(t.defaultConfig)), n;
      }),
      this.unique,
      !1,
      this.name
    );
  }
  onOnly(...e) {
    return new cr(
      e.map((t) => {
        if (k(t, z))
          return t;
        t = t;
        const n = new ir(t.name, !!t.keyAsName, t.columnType, t.indexConfig);
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
    return new cr(
      t.map((n) => {
        if (k(n, z))
          return n;
        n = n;
        const i = new ir(n.name, !!n.keyAsName, n.columnType, n.indexConfig);
        return n.indexConfig = JSON.parse(JSON.stringify(n.defaultConfig)), i;
      }),
      this.unique,
      !0,
      this.name,
      e
    );
  }
}
class cr {
  static [L] = "PgIndexBuilder";
  /** @internal */
  config;
  constructor(e, t, n, i, s = "btree") {
    this.config = {
      name: i,
      columns: e,
      unique: t,
      only: n,
      method: s
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
    return new Ru(this.config, e);
  }
}
class Ru {
  static [L] = "PgIndex";
  config;
  constructor(e, t) {
    this.config = { ...e, table: t };
  }
}
function it(r) {
  return new Yn(!1, r);
}
function Xn(r) {
  return new Yn(!0, r);
}
class Ou {
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
class $u {
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
const hr = { withTimezone: !0 }, ut = {
  created_at: Nt(hr).defaultNow().notNull(),
  updated_at: Nt(hr),
  deleted_at: Nt(hr)
}, vt = Oe().primaryKey().generatedAlwaysAsIdentity(), tt = ot(
  "users",
  {
    id: vt,
    uuid: jn().defaultRandom().unique().notNull(),
    ...ut
  },
  (r) => [Xn("uuid_idx").on(r.uuid)]
), Du = ot(
  "adhoc_games",
  {
    id: vt,
    solution: wt().notNull(),
    user_id: Oe().notNull().references(() => tt.id),
    ...ut
  },
  (r) => [it("adhoc_game_user_idx").on(r.user_id)]
), kt = ot(
  "solutions",
  {
    id: vt,
    value: wt().notNull().unique(),
    date: On().defaultNow().notNull().unique(),
    ...ut
  },
  (r) => [Xn("daily_game_solution_date_idx").on(r.date)]
), pt = ot(
  "daily_games",
  {
    id: vt,
    user_id: Oe().notNull().references(() => tt.id),
    solution_id: Oe().notNull().references(() => kt.id),
    ...ut
  },
  (r) => [
    it("daily_game_user_idx").on(r.user_id),
    it("daily_game_solution_idx").on(r.solution_id)
  ]
), gt = ot(
  "generic_games",
  {
    id: vt,
    daily_game_id: Oe().references(() => pt.id),
    adhoc_game_id: Oe().references(() => Du.id),
    ...ut
  },
  (r) => [
    Gn(
      "game_type",
      I`
      (${r.daily_game_id} IS NOT NULL AND ${r.adhoc_game_id} IS NULL)
      OR
      (${r.daily_game_id} IS NULL AND ${r.adhoc_game_id} IS NOT NULL)
    `
    ),
    it("daily_game_idx").on(r.daily_game_id),
    it("adhoc_game_idx").on(r.adhoc_game_id)
  ]
), fr = ot(
  "attempts",
  {
    game_id: Oe().references(() => gt.id).notNull(),
    game_attempts_order: Oe().notNull(),
    value: wt().notNull(),
    feedback: wt().notNull(),
    ...ut
  },
  (r) => [
    Gn(
      "game_attempts_order_check",
      I`
      (${r.game_attempts_order} > 0 AND ${r.game_attempts_order} < 17)
    `
    ),
    ka({
      name: "id",
      columns: [r.game_id, r.game_attempts_order]
    }),
    it("game_attempts_idx").on(r.game_id)
  ]
);
async function Mu({
  db: r,
  game: e
}) {
  return console.info("get attempts"), await r.select().from(fr).where(je(fr.game_id, e.id)).orderBy(zn(fr.game_attempts_order));
}
const ku = 8, Ut = 4;
function Qu(r, e) {
  const t = {};
  for (let n = 0; n < r.length; n++) {
    const i = r[n], s = i[e];
    t[s] = i;
  }
  return t;
}
const Pr = "var(--token-default)";
new Array(Ut).fill(Pr);
new Array(ku).fill(Pr).map(() => new Array(Ut).fill(Pr));
const qu = [
  "fairy",
  "fire",
  "lightning",
  "grass",
  "ice",
  "water",
  "rock"
], Fu = qu.map((r, e) => {
  const t = e + 1;
  return {
    icon: r,
    color: `var(--token-${t})`,
    id: t
  };
}), Zn = "X", Uu = [
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
    value: Zn,
    label: "correct color, correct position",
    key: "correct"
  }
], ju = Uu.map((r, e) => ({
  ...r,
  id: e,
  color: `var(--feedback-token-${r.key})`
}));
Qu(ju, "value");
new Array(Ut).fill(Zn).join("");
function zu(r) {
  const e = new Uint32Array(1);
  return crypto.getRandomValues(e), Math.floor(e[0] / (Math.pow(2, 32) - 1) * r);
}
function Vu(r) {
  const e = zu(r.length);
  return r[e];
}
function Wu() {
  const r = Fu.map((t) => t.id);
  return new Array(Ut).fill(0).map(() => Vu(r)).join("");
}
async function Gu({
  db: r
}) {
  console.info("create new solution");
  const e = Wu(), n = (await r.insert(kt).values({
    value: e
  }).returning()).pop();
  if (!n)
    throw Error("failed to create new solution");
  return n;
}
async function Hu({
  db: r
}) {
  return console.info("get daily solution"), (await r.select().from(kt).where(I`${kt.date} = CURRENT_DATE`)).pop();
}
async function es({
  db: r
}) {
  const e = await Hu({ db: r });
  e && console.info(`get solution '${e.id}'`);
  const t = e || await Gu({ db: r });
  return e || console.info(`create new solution '${t.id}'`), t;
}
async function Ku({
  db: r,
  user: e
}) {
  console.info("create new daily game");
  const t = await es({ db: r }), i = (await r.insert(pt).values({
    user_id: e.id,
    solution_id: t.id
  }).returning()).pop();
  if (!i)
    throw Error("failed to create new daily game");
  return { game: i, date: t.date };
}
async function Ju({
  db: r,
  user: e
}) {
  console.info("get daily game");
  const t = await es({ db: r });
  return { game: (await r.select().from(pt).where(
    Dt(
      je(pt.user_id, e.id),
      je(pt.solution_id, t.id)
    )
  )).pop(), date: t.date };
}
async function Yu({
  db: r,
  user: e
}) {
  console.info("get or create daily game");
  const { game: t, date: n } = await Ju({ db: r, user: e });
  t && console.info(`get daily game '${t.id}'`);
  const i = t || (await Ku({ db: r, user: e })).game;
  return t || console.info(`create new daily game '${i.id}'`), { game: i, date: n };
}
async function Xu({
  db: r,
  game: e
}) {
  console.info("create new generic game");
  const n = "solution_id" in e ? "daily_game_id" : "adhoc_game_id", s = (await r.insert(gt).values({
    [n]: e.id
  }).returning()).pop();
  if (!s)
    throw Error("failed to create new generic game");
  return s;
}
async function Zu({
  db: r,
  game: e
}) {
  console.info("get generic game");
  const n = "solution_id" in e ? gt.daily_game_id : gt.adhoc_game_id;
  return (await r.select().from(gt).where(je(n, e.id))).pop();
}
async function el({
  db: r,
  game: e
}) {
  console.info("get or create generic game");
  const t = await Zu({ db: r, game: e });
  t && console.info(`get generic game '${t.id}'`);
  const n = t || await Xu({ db: r, game: e });
  return t || console.info(`create new generic game '${e.id}'`), n;
}
async function tl({
  db: r
}) {
  const t = (await r.insert(tt).values({}).returning()).pop();
  if (!t)
    throw Error("failed to create new user");
  return t;
}
async function rl({
  db: r,
  uuid: e
}) {
  return (await r.select().from(tt).where(je(tt.uuid, e)).orderBy(Vn(tt.created_at)).limit(1)).pop();
}
async function nl({ db: r, id: e }) {
  const n = (vi(e) ? await rl({ db: r, uuid: e }) : void 0) || await tl({ db: r }), { game: i, date: s } = await Yu({ db: r, user: n }), u = await el({ db: r, game: i }), o = await Mu({ db: r, game: u });
  return { user: n, attempts: o, date: s };
}
var sl = Object.create, lt = Object.defineProperty, il = Object.getOwnPropertyDescriptor, ol = Object.getOwnPropertyNames, al = Object.getPrototypeOf, ul = Object.prototype.hasOwnProperty, ll = (r, e, t) => e in r ? lt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, g = (r, e) => lt(r, "name", { value: e, configurable: !0 }), we = (r, e) => () => (r && (e = r(r = 0)), e), ee = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), xe = (r, e) => {
  for (var t in e)
    lt(r, t, {
      get: e[t],
      enumerable: !0
    });
}, ts = (r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of ol(e))
      !ul.call(r, i) && i !== t && lt(r, i, { get: () => e[i], enumerable: !(n = il(e, i)) || n.enumerable });
  return r;
}, Ge = (r, e, t) => (t = r != null ? sl(al(r)) : {}, ts(e || !r || !r.__esModule ? lt(t, "default", { value: r, enumerable: !0 }) : t, r)), fe = (r) => ts(lt({}, "__esModule", { value: !0 }), r), Y = (r, e, t) => ll(r, typeof e != "symbol" ? e + "" : e, t), cl = ee((r) => {
  V(), r.byteLength = h, r.toByteArray = d, r.fromByteArray = v;
  var e = [], t = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (s = 0, u = i.length; s < u; ++s)
    e[s] = i[s], t[i.charCodeAt(s)] = s;
  var s, u;
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
    var f, w = o(c), S = w[0], E = w[1], _ = new n(m(c, S, E)), B = 0, $ = E > 0 ? S - 4 : S, P;
    for (P = 0; P < $; P += 4)
      f = t[c.charCodeAt(P)] << 18 | t[c.charCodeAt(P + 1)] << 12 | t[c.charCodeAt(P + 2)] << 6 | t[c.charCodeAt(P + 3)], _[B++] = f >> 16 & 255, _[B++] = f >> 8 & 255, _[B++] = f & 255;
    return E === 2 && (f = t[c.charCodeAt(
      P
    )] << 2 | t[c.charCodeAt(P + 1)] >> 4, _[B++] = f & 255), E === 1 && (f = t[c.charCodeAt(P)] << 10 | t[c.charCodeAt(P + 1)] << 4 | t[c.charCodeAt(P + 2)] >> 2, _[B++] = f >> 8 & 255, _[B++] = f & 255), _;
  }
  g(d, "toByteArray");
  function b(c) {
    return e[c >> 18 & 63] + e[c >> 12 & 63] + e[c >> 6 & 63] + e[c & 63];
  }
  g(b, "tripletToBase64");
  function y(c, f, w) {
    for (var S, E = [], _ = f; _ < w; _ += 3)
      S = (c[_] << 16 & 16711680) + (c[_ + 1] << 8 & 65280) + (c[_ + 2] & 255), E.push(b(S));
    return E.join("");
  }
  g(y, "encodeChunk");
  function v(c) {
    for (var f, w = c.length, S = w % 3, E = [], _ = 16383, B = 0, $ = w - S; B < $; B += _)
      E.push(y(
        c,
        B,
        B + _ > $ ? $ : B + _
      ));
    return S === 1 ? (f = c[w - 1], E.push(e[f >> 2] + e[f << 4 & 63] + "==")) : S === 2 && (f = (c[w - 2] << 8) + c[w - 1], E.push(e[f >> 10] + e[f >> 4 & 63] + e[f << 2 & 63] + "=")), E.join("");
  }
  g(v, "fromByteArray");
}), hl = ee((r) => {
  V(), r.read = function(e, t, n, i, s) {
    var u, o, h = s * 8 - i - 1, m = (1 << h) - 1, d = m >> 1, b = -7, y = n ? s - 1 : 0, v = n ? -1 : 1, c = e[t + y];
    for (y += v, u = c & (1 << -b) - 1, c >>= -b, b += h; b > 0; u = u * 256 + e[t + y], y += v, b -= 8)
      ;
    for (o = u & (1 << -b) - 1, u >>= -b, b += i; b > 0; o = o * 256 + e[t + y], y += v, b -= 8)
      ;
    if (u === 0)
      u = 1 - d;
    else {
      if (u === m)
        return o ? NaN : (c ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, i), u = u - d;
    }
    return (c ? -1 : 1) * o * Math.pow(2, u - i);
  }, r.write = function(e, t, n, i, s, u) {
    var o, h, m, d = u * 8 - s - 1, b = (1 << d) - 1, y = b >> 1, v = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, c = i ? 0 : u - 1, f = i ? 1 : -1, w = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (h = isNaN(t) ? 1 : 0, o = b) : (o = Math.floor(Math.log(t) / Math.LN2), t * (m = Math.pow(2, -o)) < 1 && (o--, m *= 2), o + y >= 1 ? t += v / m : t += v * Math.pow(2, 1 - y), t * m >= 2 && (o++, m /= 2), o + y >= b ? (h = 0, o = b) : o + y >= 1 ? (h = (t * m - 1) * Math.pow(2, s), o = o + y) : (h = t * Math.pow(2, y - 1) * Math.pow(2, s), o = 0)); s >= 8; e[n + c] = h & 255, c += f, h /= 256, s -= 8)
      ;
    for (o = o << s | h, d += s; d > 0; e[n + c] = o & 255, c += f, o /= 256, d -= 8)
      ;
    e[n + c - f] |= w * 128;
  };
}), fl = ee((r) => {
  V();
  var e = cl(), t = hl(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = o, r.SlowBuffer = E, r.INSPECT_MAX_BYTES = 50;
  var i = 2147483647;
  r.kMaxLength = i, o.TYPED_ARRAY_SUPPORT = s(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function s() {
    try {
      let a = new Uint8Array(1), l = { foo: g(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(l, Uint8Array.prototype), Object.setPrototypeOf(a, l), a.foo() === 42;
    } catch {
      return !1;
    }
  }
  g(s, "typedArraySupport"), Object.defineProperty(o.prototype, "parent", { enumerable: !0, get: g(function() {
    if (o.isBuffer(this))
      return this.buffer;
  }, "get") }), Object.defineProperty(o.prototype, "offset", { enumerable: !0, get: g(function() {
    if (o.isBuffer(
      this
    ))
      return this.byteOffset;
  }, "get") });
  function u(a) {
    if (a > i)
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
    let p = _(a, l) | 0, T = u(p), N = T.write(
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
    if (a >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
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
    for (let N = 0, M = Math.min(p, T); N < M; ++N)
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
      let M = a[p];
      if (Ae(M, Uint8Array))
        N + M.length > T.length ? (o.isBuffer(M) || (M = o.from(M)), M.copy(T, N)) : Uint8Array.prototype.set.call(T, M, N);
      else if (o.isBuffer(M))
        M.copy(T, N);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      N += M.length;
    }
    return T;
  }, "concat");
  function _(a, l) {
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
          return Et(a).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return p * 2;
        case "hex":
          return p >>> 1;
        case "base64":
          return sr(a).length;
        default:
          if (N)
            return T ? -1 : Et(a).length;
          l = ("" + l).toLowerCase(), N = !0;
      }
  }
  g(_, "byteLength"), o.byteLength = _;
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
          return K(this, l, p);
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
    let M = N - T, Q = p - l, se = Math.min(M, Q), ce = this.slice(
      T,
      N
    ), oe = a.slice(l, p);
    for (let ie = 0; ie < se; ++ie)
      if (ce[ie] !== oe[ie]) {
        M = ce[ie], Q = oe[ie];
        break;
      }
    return M < Q ? -1 : Q < M ? 1 : 0;
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
    let M = 1, Q = a.length, se = l.length;
    if (T !== void 0 && (T = String(T).toLowerCase(), T === "ucs2" || T === "ucs-2" || T === "utf16le" || T === "utf-16le")) {
      if (a.length < 2 || l.length < 2)
        return -1;
      M = 2, Q /= 2, se /= 2, p /= 2;
    }
    function ce(ie, ue) {
      return M === 1 ? ie[ue] : ie.readUInt16BE(ue * M);
    }
    g(ce, "read");
    let oe;
    if (N) {
      let ie = -1;
      for (oe = p; oe < Q; oe++)
        if (ce(a, oe) === ce(l, ie === -1 ? 0 : oe - ie)) {
          if (ie === -1 && (ie = oe), oe - ie + 1 === se)
            return ie * M;
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
    let M = l.length;
    T > M / 2 && (T = M / 2);
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
  function C(a, l, p, T) {
    return ht(Et(l, a.length - p), a, p, T);
  }
  g(C, "utf8Write");
  function O(a, l, p, T) {
    return ht(rn(l), a, p, T);
  }
  g(
    O,
    "asciiWrite"
  );
  function D(a, l, p, T) {
    return ht(sr(l), a, p, T);
  }
  g(D, "base64Write");
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
    let M = !1;
    for (; ; )
      switch (T) {
        case "hex":
          return A(this, a, l, p);
        case "utf8":
        case "utf-8":
          return C(this, a, l, p);
        case "ascii":
        case "latin1":
        case "binary":
          return O(this, a, l, p);
        case "base64":
          return D(this, a, l, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return F(this, a, l, p);
        default:
          if (M)
            throw new TypeError("Unknown encoding: " + T);
          T = ("" + T).toLowerCase(), M = !0;
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
      let M = a[N], Q = null, se = M > 239 ? 4 : M > 223 ? 3 : M > 191 ? 2 : 1;
      if (N + se <= p) {
        let ce, oe, ie, ue;
        switch (se) {
          case 1:
            M < 128 && (Q = M);
            break;
          case 2:
            ce = a[N + 1], (ce & 192) === 128 && (ue = (M & 31) << 6 | ce & 63, ue > 127 && (Q = ue));
            break;
          case 3:
            ce = a[N + 1], oe = a[N + 2], (ce & 192) === 128 && (oe & 192) === 128 && (ue = (M & 15) << 12 | (ce & 63) << 6 | oe & 63, ue > 2047 && (ue < 55296 || ue > 57343) && (Q = ue));
            break;
          case 4:
            ce = a[N + 1], oe = a[N + 2], ie = a[N + 3], (ce & 192) === 128 && (oe & 192) === 128 && (ie & 192) === 128 && (ue = (M & 15) << 18 | (ce & 63) << 12 | (oe & 63) << 6 | ie & 63, ue > 65535 && ue < 1114112 && (Q = ue));
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
  function K(a, l, p) {
    let T = "";
    p = Math.min(a.length, p);
    for (let N = l; N < p; ++N)
      T += String.fromCharCode(a[N] & 127);
    return T;
  }
  g(K, "asciiSlice");
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
    for (let M = l; M < p; ++M)
      N += wi[a[M]];
    return N;
  }
  g(ne, "hexSlice");
  function be(a, l, p) {
    let T = a.slice(l, p), N = "";
    for (let M = 0; M < T.length - 1; M += 2)
      N += String.fromCharCode(T[M] + T[M + 1] * 256);
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
      let T = this[a], N = 1, M = 0;
      for (; ++M < l && (N *= 256); )
        T += this[a + M] * N;
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
    a = a >>> 0, Qe(a, "offset");
    let l = this[a], p = this[a + 7];
    (l === void 0 || p === void 0) && Je(a, this.length - 8);
    let T = l + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24, N = this[++a] + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + p * 2 ** 24;
    return BigInt(T) + (BigInt(N) << BigInt(32));
  }, "readBigUInt64LE")), o.prototype.readBigUInt64BE = Ne(g(function(a) {
    a = a >>> 0, Qe(a, "offset");
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
    let T = this[a], N = 1, M = 0;
    for (; ++M < l && (N *= 256); )
      T += this[a + M] * N;
    return N *= 128, T >= N && (T -= Math.pow(2, 8 * l)), T;
  }, "readIntLE"), o.prototype.readIntBE = g(function(a, l, p) {
    a = a >>> 0, l = l >>> 0, p || ae(a, l, this.length);
    let T = l, N = 1, M = this[a + --T];
    for (; T > 0 && (N *= 256); )
      M += this[a + --T] * N;
    return N *= 128, M >= N && (M -= Math.pow(2, 8 * l)), M;
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
    a = a >>> 0, Qe(a, "offset");
    let l = this[a], p = this[a + 7];
    (l === void 0 || p === void 0) && Je(a, this.length - 8);
    let T = this[a + 4] + this[a + 5] * 2 ** 8 + this[a + 6] * 2 ** 16 + (p << 24);
    return (BigInt(T) << BigInt(
      32
    )) + BigInt(l + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24);
  }, "readBigInt64LE")), o.prototype.readBigInt64BE = Ne(g(function(a) {
    a = a >>> 0, Qe(a, "offset");
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
  function pe(a, l, p, T, N, M) {
    if (!o.isBuffer(a))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (l > N || l < M)
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
    let N = 1, M = 0;
    for (this[l] = a & 255; ++M < p && (N *= 256); )
      this[l + M] = a / N & 255;
    return l + p;
  }, "writeUIntLE"), o.prototype.writeUintBE = o.prototype.writeUIntBE = g(function(a, l, p, T) {
    if (a = +a, l = l >>> 0, p = p >>> 0, !T) {
      let Q = Math.pow(2, 8 * p) - 1;
      pe(this, a, l, p, Q, 0);
    }
    let N = p - 1, M = 1;
    for (this[l + N] = a & 255; --N >= 0 && (M *= 256); )
      this[l + N] = a / M & 255;
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
    nr(l, T, N, a, p, 7);
    let M = Number(l & BigInt(4294967295));
    a[p++] = M, M = M >> 8, a[p++] = M, M = M >> 8, a[p++] = M, M = M >> 8, a[p++] = M;
    let Q = Number(l >> BigInt(32) & BigInt(4294967295));
    return a[p++] = Q, Q = Q >> 8, a[p++] = Q, Q = Q >> 8, a[p++] = Q, Q = Q >> 8, a[p++] = Q, p;
  }
  g(ct, "wrtBigUInt64LE");
  function Xt(a, l, p, T, N) {
    nr(l, T, N, a, p, 7);
    let M = Number(l & BigInt(4294967295));
    a[p + 7] = M, M = M >> 8, a[p + 6] = M, M = M >> 8, a[p + 5] = M, M = M >> 8, a[p + 4] = M;
    let Q = Number(l >> BigInt(32) & BigInt(4294967295));
    return a[p + 3] = Q, Q = Q >> 8, a[p + 2] = Q, Q = Q >> 8, a[p + 1] = Q, Q = Q >> 8, a[p] = Q, p + 8;
  }
  g(Xt, "wrtBigUInt64BE"), o.prototype.writeBigUInt64LE = Ne(g(function(a, l = 0) {
    return ct(this, a, l, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64LE")), o.prototype.writeBigUInt64BE = Ne(g(function(a, l = 0) {
    return Xt(this, a, l, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64BE")), o.prototype.writeIntLE = g(function(a, l, p, T) {
    if (a = +a, l = l >>> 0, !T) {
      let se = Math.pow(2, 8 * p - 1);
      pe(this, a, l, p, se - 1, -se);
    }
    let N = 0, M = 1, Q = 0;
    for (this[l] = a & 255; ++N < p && (M *= 256); )
      a < 0 && Q === 0 && this[l + N - 1] !== 0 && (Q = 1), this[l + N] = (a / M >> 0) - Q & 255;
    return l + p;
  }, "writeIntLE"), o.prototype.writeIntBE = g(function(a, l, p, T) {
    if (a = +a, l = l >>> 0, !T) {
      let se = Math.pow(2, 8 * p - 1);
      pe(this, a, l, p, se - 1, -se);
    }
    let N = p - 1, M = 1, Q = 0;
    for (this[l + N] = a & 255; --N >= 0 && (M *= 256); )
      a < 0 && Q === 0 && this[l + N + 1] !== 0 && (Q = 1), this[l + N] = (a / M >> 0) - Q & 255;
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
      return Xt(this, a, l, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE")
  );
  function Zt(a, l, p, T, N, M) {
    if (p + T > a.length)
      throw new RangeError("Index out of range");
    if (p < 0)
      throw new RangeError("Index out of range");
  }
  g(Zt, "checkIEEE754");
  function er(a, l, p, T, N) {
    return l = +l, p = p >>> 0, N || Zt(a, l, p, 4), t.write(a, l, p, T, 23, 4), p + 4;
  }
  g(
    er,
    "writeFloat"
  ), o.prototype.writeFloatLE = g(function(a, l, p) {
    return er(this, a, l, !0, p);
  }, "writeFloatLE"), o.prototype.writeFloatBE = g(function(a, l, p) {
    return er(this, a, l, !1, p);
  }, "writeFloatBE");
  function tr(a, l, p, T, N) {
    return l = +l, p = p >>> 0, N || Zt(a, l, p, 8), t.write(
      a,
      l,
      p,
      T,
      52,
      8
    ), p + 8;
  }
  g(tr, "writeDouble"), o.prototype.writeDoubleLE = g(function(a, l, p) {
    return tr(this, a, l, !0, p);
  }, "writeDoubleLE"), o.prototype.writeDoubleBE = g(function(a, l, p) {
    return tr(this, a, l, !1, p);
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
        let M = a.charCodeAt(0);
        (T === "utf8" && M < 128 || T === "latin1") && (a = M);
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
      let M = o.isBuffer(a) ? a : o.from(
        a,
        T
      ), Q = M.length;
      if (Q === 0)
        throw new TypeError('The value "' + a + '" is invalid for argument "value"');
      for (N = 0; N < p - l; ++N)
        this[N + l] = M[N % Q];
    }
    return this;
  }, "fill");
  var Ke = {};
  function Pt(a, l, p) {
    var T;
    Ke[a] = (T = class extends p {
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
  g(Pt, "E"), Pt("ERR_BUFFER_OUT_OF_BOUNDS", function(a) {
    return a ? `${a} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError), Pt(
    "ERR_INVALID_ARG_TYPE",
    function(a, l) {
      return `The "${a}" argument must be of type number. Received type ${typeof l}`;
    },
    TypeError
  ), Pt("ERR_OUT_OF_RANGE", function(a, l, p) {
    let T = `The value of "${a}" is out of range.`, N = p;
    return Number.isInteger(p) && Math.abs(p) > 2 ** 32 ? N = rr(String(p)) : typeof p == "bigint" && (N = String(
      p
    ), (p > BigInt(2) ** BigInt(32) || p < -(BigInt(2) ** BigInt(32))) && (N = rr(N)), N += "n"), T += ` It must be ${l}. Received ${N}`, T;
  }, RangeError);
  function rr(a) {
    let l = "", p = a.length, T = a[0] === "-" ? 1 : 0;
    for (; p >= T + 4; p -= 3)
      l = `_${a.slice(p - 3, p)}${l}`;
    return `${a.slice(0, p)}${l}`;
  }
  g(rr, "addNumericalSeparator");
  function en(a, l, p) {
    Qe(l, "offset"), (a[l] === void 0 || a[l + p] === void 0) && Je(l, a.length - (p + 1));
  }
  g(en, "checkBounds");
  function nr(a, l, p, T, N, M) {
    if (a > p || a < l) {
      let Q = typeof l == "bigint" ? "n" : "", se;
      throw M > 3 ? l === 0 || l === BigInt(0) ? se = `>= 0${Q} and < 2${Q} ** ${(M + 1) * 8}${Q}` : se = `>= -(2${Q} ** ${(M + 1) * 8 - 1}${Q}) and < 2 ** ${(M + 1) * 8 - 1}${Q}` : se = `>= ${l}${Q} and <= ${p}${Q}`, new Ke.ERR_OUT_OF_RANGE("value", se, a);
    }
    en(T, N, M);
  }
  g(nr, "checkIntBI");
  function Qe(a, l) {
    if (typeof a != "number")
      throw new Ke.ERR_INVALID_ARG_TYPE(l, "number", a);
  }
  g(Qe, "validateNumber");
  function Je(a, l, p) {
    throw Math.floor(a) !== a ? (Qe(a, p), new Ke.ERR_OUT_OF_RANGE(p || "offset", "an integer", a)) : l < 0 ? new Ke.ERR_BUFFER_OUT_OF_BOUNDS() : new Ke.ERR_OUT_OF_RANGE(p || "offset", `>= ${p ? 1 : 0} and <= ${l}`, a);
  }
  g(Je, "boundsError");
  var yi = /[^+/0-9A-Za-z-_]/g;
  function tn(a) {
    if (a = a.split("=")[0], a = a.trim().replace(yi, ""), a.length < 2)
      return "";
    for (; a.length % 4 !== 0; )
      a = a + "=";
    return a;
  }
  g(tn, "base64clean");
  function Et(a, l) {
    l = l || 1 / 0;
    let p, T = a.length, N = null, M = [];
    for (let Q = 0; Q < T; ++Q) {
      if (p = a.charCodeAt(Q), p > 55295 && p < 57344) {
        if (!N) {
          if (p > 56319) {
            (l -= 3) > -1 && M.push(239, 191, 189);
            continue;
          } else if (Q + 1 === T) {
            (l -= 3) > -1 && M.push(239, 191, 189);
            continue;
          }
          N = p;
          continue;
        }
        if (p < 56320) {
          (l -= 3) > -1 && M.push(239, 191, 189), N = p;
          continue;
        }
        p = (N - 55296 << 10 | p - 56320) + 65536;
      } else
        N && (l -= 3) > -1 && M.push(239, 191, 189);
      if (N = null, p < 128) {
        if ((l -= 1) < 0)
          break;
        M.push(p);
      } else if (p < 2048) {
        if ((l -= 2) < 0)
          break;
        M.push(p >> 6 | 192, p & 63 | 128);
      } else if (p < 65536) {
        if ((l -= 3) < 0)
          break;
        M.push(p >> 12 | 224, p >> 6 & 63 | 128, p & 63 | 128);
      } else if (p < 1114112) {
        if ((l -= 4) < 0)
          break;
        M.push(p >> 18 | 240, p >> 12 & 63 | 128, p >> 6 & 63 | 128, p & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return M;
  }
  g(Et, "utf8ToBytes");
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
    let p, T, N, M = [];
    for (let Q = 0; Q < a.length && !((l -= 2) < 0); ++Q)
      p = a.charCodeAt(
        Q
      ), T = p >> 8, N = p % 256, M.push(N), M.push(T);
    return M;
  }
  g(nn, "utf16leToBytes");
  function sr(a) {
    return e.toByteArray(
      tn(a)
    );
  }
  g(sr, "base64ToBytes");
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
  var wi = function() {
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
}), jt, Or, J, Z, V = we(() => {
  jt = globalThis, Or = globalThis.setImmediate ?? ((r) => setTimeout(r, 0)), J = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : fl().Buffer, Z = globalThis.process ?? {}, Z.env ?? (Z.env = {});
  try {
    Z.nextTick(() => {
    });
  } catch {
    let r = Promise.resolve();
    Z.nextTick = r.then.bind(r);
  }
}), He = ee((r, e) => {
  V();
  var t = typeof Reflect == "object" ? Reflect : null, n = t && typeof t.apply == "function" ? t.apply : g(function(P, x, A) {
    return Function.prototype.apply.call(P, x, A);
  }, "ReflectApply"), i;
  t && typeof t.ownKeys == "function" ? i = t.ownKeys : Object.getOwnPropertySymbols ? i = g(function(P) {
    return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
  }, "ReflectOwnKeys") : i = g(function(P) {
    return Object.getOwnPropertyNames(P);
  }, "ReflectOwnKeys");
  function s(P) {
    console && console.warn && console.warn(P);
  }
  g(
    s,
    "ProcessEmitWarning"
  );
  var u = Number.isNaN || g(function(P) {
    return P !== P;
  }, "NumberIsNaN");
  function o() {
    o.init.call(this);
  }
  g(o, "EventEmitter"), e.exports = o, e.exports.once = _, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
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
    var C = P === "error", O = this._events;
    if (O !== void 0)
      C = C && O.error === void 0;
    else if (!C)
      return !1;
    if (C) {
      var D;
      if (x.length > 0 && (D = x[0]), D instanceof Error)
        throw D;
      var F = new Error("Unhandled error." + (D ? " (" + D.message + ")" : ""));
      throw F.context = D, F;
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
  function b(P, x, A, C) {
    var O, D, F;
    if (m(
      A
    ), D = P._events, D === void 0 ? (D = P._events = /* @__PURE__ */ Object.create(null), P._eventsCount = 0) : (D.newListener !== void 0 && (P.emit("newListener", x, A.listener ? A.listener : A), D = P._events), F = D[x]), F === void 0)
      F = D[x] = A, ++P._eventsCount;
    else if (typeof F == "function" ? F = D[x] = C ? [A, F] : [F, A] : C ? F.unshift(A) : F.push(A), O = d(P), O > 0 && F.length > O && !F.warned) {
      F.warned = !0;
      var U = new Error("Possible EventEmitter memory leak detected. " + F.length + " " + String(x) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      U.name = "MaxListenersExceededWarning", U.emitter = P, U.type = x, U.count = F.length, s(U);
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
    var C = {
      fired: !1,
      wrapFn: void 0,
      target: P,
      type: x,
      listener: A
    }, O = y.bind(C);
    return O.listener = A, C.wrapFn = O, O;
  }
  g(v, "_onceWrap"), o.prototype.once = g(function(P, x) {
    return m(x), this.on(P, v(this, P, x)), this;
  }, "once"), o.prototype.prependOnceListener = g(function(P, x) {
    return m(x), this.prependListener(P, v(this, P, x)), this;
  }, "prependOnceListener"), o.prototype.removeListener = g(function(P, x) {
    var A, C, O, D, F;
    if (m(x), C = this._events, C === void 0)
      return this;
    if (A = C[P], A === void 0)
      return this;
    if (A === x || A.listener === x)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete C[P], C.removeListener && this.emit("removeListener", P, A.listener || x));
    else if (typeof A != "function") {
      for (O = -1, D = A.length - 1; D >= 0; D--)
        if (A[D] === x || A[D].listener === x) {
          F = A[D].listener, O = D;
          break;
        }
      if (O < 0)
        return this;
      O === 0 ? A.shift() : S(A, O), A.length === 1 && (C[P] = A[0]), C.removeListener !== void 0 && this.emit("removeListener", P, F || x);
    }
    return this;
  }, "removeListener"), o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = g(function(P) {
    var x, A, C;
    if (A = this._events, A === void 0)
      return this;
    if (A.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : A[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete A[P]), this;
    if (arguments.length === 0) {
      var O = Object.keys(A), D;
      for (C = 0; C < O.length; ++C)
        D = O[C], D !== "removeListener" && this.removeAllListeners(
          D
        );
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (x = A[P], typeof x == "function")
      this.removeListener(P, x);
    else if (x !== void 0)
      for (C = x.length - 1; C >= 0; C--)
        this.removeListener(P, x[C]);
    return this;
  }, "removeAllListeners");
  function c(P, x, A) {
    var C = P._events;
    if (C === void 0)
      return [];
    var O = C[x];
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
    return this._eventsCount > 0 ? i(this._events) : [];
  }, "eventNames");
  function w(P, x) {
    for (var A = new Array(x), C = 0; C < x; ++C)
      A[C] = P[C];
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
  function _(P, x) {
    return new Promise(function(A, C) {
      function O(F) {
        P.removeListener(x, D), C(F);
      }
      g(O, "errorListener");
      function D() {
        typeof P.removeListener == "function" && P.removeListener("error", O), A([].slice.call(arguments));
      }
      g(D, "resolver"), $(P, x, D, { once: !0 }), x !== "error" && B(P, O, { once: !0 });
    });
  }
  g(_, "once");
  function B(P, x, A) {
    typeof P.on == "function" && $(P, "error", x, A);
  }
  g(
    B,
    "addErrorHandlerIfEventEmitter"
  );
  function $(P, x, A, C) {
    if (typeof P.on == "function")
      C.once ? P.once(x, A) : P.on(x, A);
    else if (typeof P.addEventListener == "function")
      P.addEventListener(x, g(function O(D) {
        C.once && P.removeEventListener(x, O), A(D);
      }, "wrapListener"));
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof P);
  }
  g($, "eventTargetAgnosticAddListener");
}), rs = {};
xe(rs, { Socket: () => zt, isIP: () => ns });
function ns(r) {
  return 0;
}
var yn, dr, ft, zt, Vt = we(() => {
  V(), yn = Ge(He(), 1), g(ns, "isIP"), dr = /^[^.]+\./, ft = class H extends yn.EventEmitter {
    constructor() {
      super(...arguments), Y(this, "opts", {}), Y(this, "connecting", !1), Y(this, "pending", !0), Y(
        this,
        "writable",
        !0
      ), Y(this, "encrypted", !1), Y(this, "authorized", !1), Y(this, "destroyed", !1), Y(this, "ws", null), Y(this, "writeBuffer"), Y(this, "tlsState", 0), Y(this, "tlsRead"), Y(this, "tlsWrite");
    }
    static get poolQueryViaFetch() {
      return H.opts.poolQueryViaFetch ?? H.defaults.poolQueryViaFetch;
    }
    static set poolQueryViaFetch(e) {
      H.opts.poolQueryViaFetch = e;
    }
    static get fetchEndpoint() {
      return H.opts.fetchEndpoint ?? H.defaults.fetchEndpoint;
    }
    static set fetchEndpoint(e) {
      H.opts.fetchEndpoint = e;
    }
    static get fetchConnectionCache() {
      return !0;
    }
    static set fetchConnectionCache(e) {
      console.warn("The `fetchConnectionCache` option is deprecated (now always `true`)");
    }
    static get fetchFunction() {
      return H.opts.fetchFunction ?? H.defaults.fetchFunction;
    }
    static set fetchFunction(e) {
      H.opts.fetchFunction = e;
    }
    static get webSocketConstructor() {
      return H.opts.webSocketConstructor ?? H.defaults.webSocketConstructor;
    }
    static set webSocketConstructor(e) {
      H.opts.webSocketConstructor = e;
    }
    get webSocketConstructor() {
      return this.opts.webSocketConstructor ?? H.webSocketConstructor;
    }
    set webSocketConstructor(e) {
      this.opts.webSocketConstructor = e;
    }
    static get wsProxy() {
      return H.opts.wsProxy ?? H.defaults.wsProxy;
    }
    static set wsProxy(e) {
      H.opts.wsProxy = e;
    }
    get wsProxy() {
      return this.opts.wsProxy ?? H.wsProxy;
    }
    set wsProxy(e) {
      this.opts.wsProxy = e;
    }
    static get coalesceWrites() {
      return H.opts.coalesceWrites ?? H.defaults.coalesceWrites;
    }
    static set coalesceWrites(e) {
      H.opts.coalesceWrites = e;
    }
    get coalesceWrites() {
      return this.opts.coalesceWrites ?? H.coalesceWrites;
    }
    set coalesceWrites(e) {
      this.opts.coalesceWrites = e;
    }
    static get useSecureWebSocket() {
      return H.opts.useSecureWebSocket ?? H.defaults.useSecureWebSocket;
    }
    static set useSecureWebSocket(e) {
      H.opts.useSecureWebSocket = e;
    }
    get useSecureWebSocket() {
      return this.opts.useSecureWebSocket ?? H.useSecureWebSocket;
    }
    set useSecureWebSocket(e) {
      this.opts.useSecureWebSocket = e;
    }
    static get forceDisablePgSSL() {
      return H.opts.forceDisablePgSSL ?? H.defaults.forceDisablePgSSL;
    }
    static set forceDisablePgSSL(e) {
      H.opts.forceDisablePgSSL = e;
    }
    get forceDisablePgSSL() {
      return this.opts.forceDisablePgSSL ?? H.forceDisablePgSSL;
    }
    set forceDisablePgSSL(e) {
      this.opts.forceDisablePgSSL = e;
    }
    static get disableSNI() {
      return H.opts.disableSNI ?? H.defaults.disableSNI;
    }
    static set disableSNI(e) {
      H.opts.disableSNI = e;
    }
    get disableSNI() {
      return this.opts.disableSNI ?? H.disableSNI;
    }
    set disableSNI(e) {
      this.opts.disableSNI = e;
    }
    static get pipelineConnect() {
      return H.opts.pipelineConnect ?? H.defaults.pipelineConnect;
    }
    static set pipelineConnect(e) {
      H.opts.pipelineConnect = e;
    }
    get pipelineConnect() {
      return this.opts.pipelineConnect ?? H.pipelineConnect;
    }
    set pipelineConnect(e) {
      this.opts.pipelineConnect = e;
    }
    static get subtls() {
      return H.opts.subtls ?? H.defaults.subtls;
    }
    static set subtls(e) {
      H.opts.subtls = e;
    }
    get subtls() {
      return this.opts.subtls ?? H.subtls;
    }
    set subtls(e) {
      this.opts.subtls = e;
    }
    static get pipelineTLS() {
      return H.opts.pipelineTLS ?? H.defaults.pipelineTLS;
    }
    static set pipelineTLS(e) {
      H.opts.pipelineTLS = e;
    }
    get pipelineTLS() {
      return this.opts.pipelineTLS ?? H.pipelineTLS;
    }
    set pipelineTLS(e) {
      this.opts.pipelineTLS = e;
    }
    static get rootCerts() {
      return H.opts.rootCerts ?? H.defaults.rootCerts;
    }
    static set rootCerts(e) {
      H.opts.rootCerts = e;
    }
    get rootCerts() {
      return this.opts.rootCerts ?? H.rootCerts;
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
      let i = g(() => {
        this.connecting = !1, this.pending = !1, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), s = g((o, h = !1) => {
        o.binaryType = "arraybuffer", o.addEventListener("error", (m) => {
          this.emit("error", m), this.emit("close");
        }), o.addEventListener("message", (m) => {
          if (this.tlsState === 0) {
            let d = J.from(m.data);
            this.emit("data", d);
          }
        }), o.addEventListener("close", () => {
          this.emit("close");
        }), h ? i() : o.addEventListener(
          "open",
          i
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
          this.ws = new this.webSocketConstructor(o), s(this.ws);
        else
          try {
            this.ws = new WebSocket(o), s(this.ws);
          } catch {
            this.ws = new __unstable_WebSocket(o), s(this.ws);
          }
      } catch (o) {
        let h = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
        fetch(h, { headers: { Upgrade: "websocket" } }).then(
          (m) => {
            if (this.ws = m.webSocket, this.ws == null)
              throw o;
            this.ws.accept(), s(this.ws, !0);
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
      let t = await this.subtls.TrustedCert.databaseFromPEM(this.rootCerts), n = new this.subtls.WebSocketReadQueue(this.ws), i = n.read.bind(n), s = this.rawWrite.bind(this), { read: u, write: o } = await this.subtls.startTls(e, t, i, s, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
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
    write(e, t = "utf8", n = (i) => {
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
  ), useSecureWebSocket: !0, forceDisablePgSSL: !0, coalesceWrites: !0, pipelineConnect: "password", subtls: void 0, rootCerts: "", pipelineTLS: !1, disableSNI: !1 }), Y(ft, "opts", {}), zt = ft;
}), ss = {};
xe(ss, { parse: () => $r });
function $r(r, e = !1) {
  let { protocol: t } = new URL(r), n = "http:" + r.substring(
    t.length
  ), { username: i, password: s, host: u, hostname: o, port: h, pathname: m, search: d, searchParams: b, hash: y } = new URL(
    n
  );
  s = decodeURIComponent(s), i = decodeURIComponent(i), m = decodeURIComponent(m);
  let v = i + ":" + s, c = e ? Object.fromEntries(b.entries()) : d;
  return {
    href: r,
    protocol: t,
    auth: v,
    username: i,
    password: s,
    host: u,
    hostname: o,
    port: h,
    pathname: m,
    search: d,
    query: c,
    hash: y
  };
}
var is = we(() => {
  V(), g($r, "parse");
}), os = ee((r) => {
  V(), r.parse = function(i, s) {
    return new t(i, s).parse();
  };
  var e = class as {
    constructor(s, u) {
      this.source = s, this.transform = u || n, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var s = this.source[this.position++];
      return s === "\\" ? { value: this.source[this.position++], escaped: !0 } : { value: s, escaped: !1 };
    }
    record(s) {
      this.recorded.push(
        s
      );
    }
    newEntry(s) {
      var u;
      (this.recorded.length > 0 || s) && (u = this.recorded.join(""), u === "NULL" && !s && (u = null), u !== null && (u = this.transform(u)), this.entries.push(u), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[")
        for (; !this.isEof(); ) {
          var s = this.nextCharacter();
          if (s.value === "=")
            break;
        }
    }
    parse(s) {
      var u, o, h;
      for (this.consumeDimensions(); !this.isEof(); )
        if (u = this.nextCharacter(), u.value === "{" && !h)
          this.dimension++, this.dimension > 1 && (o = new as(this.source.substr(this.position - 1), this.transform), this.entries.push(o.parse(
            !0
          )), this.position += o.position - 2);
        else if (u.value === "}" && !h) {
          if (this.dimension--, !this.dimension && (this.newEntry(), s))
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
  function n(i) {
    return i;
  }
  g(n, "identity");
}), us = ee((r, e) => {
  V();
  var t = os();
  e.exports = { create: g(function(n, i) {
    return { parse: g(function() {
      return t.parse(n, i);
    }, "parse") };
  }, "create") };
}), dl = ee((r, e) => {
  V();
  var t = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, n = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, i = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, s = /^-?infinity$/;
  e.exports = g(function(d) {
    if (s.test(d))
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
    ), S = parseInt(b[5], 10), E = parseInt(b[6], 10), _ = b[7];
    _ = _ ? 1e3 * parseFloat(_) : 0;
    var B, $ = o(d);
    return $ != null ? (B = new Date(Date.UTC(v, c, f, w, S, E, _)), m(v) && B.setUTCFullYear(v), $ !== 0 && B.setTime(B.getTime() - $)) : (B = new Date(v, c, f, w, S, E, _), m(v) && B.setFullYear(v)), B;
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
    var b = i.exec(d.split(" ")[1]);
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
}), pl = ee((r, e) => {
  V(), e.exports = n;
  var t = Object.prototype.hasOwnProperty;
  function n(i) {
    for (var s = 1; s < arguments.length; s++) {
      var u = arguments[s];
      for (var o in u)
        t.call(u, o) && (i[o] = u[o]);
    }
    return i;
  }
  g(n, "extend");
}), gl = ee((r, e) => {
  V();
  var t = pl();
  e.exports = n;
  function n(E) {
    if (!(this instanceof n))
      return new n(E);
    t(this, S(E));
  }
  g(n, "PostgresInterval");
  var i = [
    "seconds",
    "minutes",
    "hours",
    "days",
    "months",
    "years"
  ];
  n.prototype.toPostgres = function() {
    var E = i.filter(this.hasOwnProperty, this);
    return this.milliseconds && E.indexOf("seconds") < 0 && E.push("seconds"), E.length === 0 ? "0" : E.map(function(_) {
      var B = this[_] || 0;
      return _ === "seconds" && this.milliseconds && (B = (B + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), B + " " + _;
    }, this).join(" ");
  };
  var s = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, u = ["years", "months", "days"], o = ["hours", "minutes", "seconds"];
  n.prototype.toISOString = n.prototype.toISO = function() {
    var E = u.map(B, this).join(""), _ = o.map(B, this).join("");
    return "P" + E + "T" + _;
    function B($) {
      var P = this[$] || 0;
      return $ === "seconds" && this.milliseconds && (P = (P + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), P + s[$];
    }
  };
  var h = "([+-]?\\d+)", m = h + "\\s+years?", d = h + "\\s+mons?", b = h + "\\s+days?", y = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", v = new RegExp([m, d, b, y].map(function(E) {
    return "(" + E + ")?";
  }).join("\\s*")), c = { years: 2, months: 4, days: 6, hours: 9, minutes: 10, seconds: 11, milliseconds: 12 }, f = ["hours", "minutes", "seconds", "milliseconds"];
  function w(E) {
    var _ = E + "000000".slice(E.length);
    return parseInt(
      _,
      10
    ) / 1e3;
  }
  g(w, "parseMilliseconds");
  function S(E) {
    if (!E)
      return {};
    var _ = v.exec(E), B = _[8] === "-";
    return Object.keys(c).reduce(function($, P) {
      var x = c[P], A = _[x];
      return !A || (A = P === "milliseconds" ? w(A) : parseInt(A, 10), !A) || (B && ~f.indexOf(P) && (A *= -1), $[P] = A), $;
    }, {});
  }
  g(S, "parse");
}), ml = ee((r, e) => {
  V(), e.exports = g(function(t) {
    if (/^\\x/.test(t))
      return new J(t.substr(
        2
      ), "hex");
    for (var n = "", i = 0; i < t.length; )
      if (t[i] !== "\\")
        n += t[i], ++i;
      else if (/[0-7]{3}/.test(t.substr(i + 1, 3)))
        n += String.fromCharCode(parseInt(t.substr(i + 1, 3), 8)), i += 4;
      else {
        for (var s = 1; i + s < t.length && t[i + s] === "\\"; )
          s++;
        for (var u = 0; u < Math.floor(s / 2); ++u)
          n += "\\";
        i += Math.floor(s / 2) * 2;
      }
    return new J(n, "binary");
  }, "parseBytea");
}), yl = ee((r, e) => {
  V();
  var t = os(), n = us(), i = dl(), s = gl(), u = ml();
  function o(C) {
    return g(function(O) {
      return O === null ? O : C(O);
    }, "nullAllowed");
  }
  g(o, "allowNull");
  function h(C) {
    return C === null ? C : C === "TRUE" || C === "t" || C === "true" || C === "y" || C === "yes" || C === "on" || C === "1";
  }
  g(h, "parseBool");
  function m(C) {
    return C ? t.parse(C, h) : null;
  }
  g(m, "parseBoolArray");
  function d(C) {
    return parseInt(C, 10);
  }
  g(d, "parseBaseTenInt");
  function b(C) {
    return C ? t.parse(C, o(d)) : null;
  }
  g(b, "parseIntegerArray");
  function y(C) {
    return C ? t.parse(C, o(function(O) {
      return B(O).trim();
    })) : null;
  }
  g(y, "parseBigIntegerArray");
  var v = g(function(C) {
    if (!C)
      return null;
    var O = n.create(C, function(D) {
      return D !== null && (D = P(D)), D;
    });
    return O.parse();
  }, "parsePointArray"), c = g(function(C) {
    if (!C)
      return null;
    var O = n.create(C, function(D) {
      return D !== null && (D = parseFloat(D)), D;
    });
    return O.parse();
  }, "parseFloatArray"), f = g(function(C) {
    if (!C)
      return null;
    var O = n.create(C);
    return O.parse();
  }, "parseStringArray"), w = g(function(C) {
    if (!C)
      return null;
    var O = n.create(
      C,
      function(D) {
        return D !== null && (D = i(D)), D;
      }
    );
    return O.parse();
  }, "parseDateArray"), S = g(function(C) {
    if (!C)
      return null;
    var O = n.create(C, function(D) {
      return D !== null && (D = s(D)), D;
    });
    return O.parse();
  }, "parseIntervalArray"), E = g(function(C) {
    return C ? t.parse(C, o(u)) : null;
  }, "parseByteAArray"), _ = g(function(C) {
    return parseInt(C, 10);
  }, "parseInteger"), B = g(function(C) {
    var O = String(C);
    return /^\d+$/.test(O) ? O : C;
  }, "parseBigInteger"), $ = g(function(C) {
    return C ? t.parse(C, o(JSON.parse)) : null;
  }, "parseJsonArray"), P = g(
    function(C) {
      return C[0] !== "(" ? null : (C = C.substring(1, C.length - 1).split(","), { x: parseFloat(C[0]), y: parseFloat(
        C[1]
      ) });
    },
    "parsePoint"
  ), x = g(function(C) {
    if (C[0] !== "<" && C[1] !== "(")
      return null;
    for (var O = "(", D = "", F = !1, U = 2; U < C.length - 1; U++) {
      if (F || (O += C[U]), C[U] === ")") {
        F = !0;
        continue;
      } else if (!F)
        continue;
      C[U] !== "," && (D += C[U]);
    }
    var R = P(O);
    return R.radius = parseFloat(D), R;
  }, "parseCircle"), A = g(function(C) {
    C(20, B), C(21, _), C(23, _), C(26, _), C(700, parseFloat), C(701, parseFloat), C(16, h), C(1082, i), C(1114, i), C(1184, i), C(
      600,
      P
    ), C(651, f), C(718, x), C(1e3, m), C(1001, E), C(1005, b), C(1007, b), C(1028, b), C(1016, y), C(1017, v), C(1021, c), C(1022, c), C(1231, c), C(1014, f), C(1015, f), C(1008, f), C(1009, f), C(1040, f), C(1041, f), C(
      1115,
      w
    ), C(1182, w), C(1185, w), C(1186, s), C(1187, S), C(17, u), C(114, JSON.parse.bind(JSON)), C(3802, JSON.parse.bind(JSON)), C(199, $), C(3807, $), C(3907, f), C(2951, f), C(791, f), C(1183, f), C(1270, f);
  }, "init");
  e.exports = { init: A };
}), wl = ee((r, e) => {
  V();
  var t = 1e6;
  function n(i) {
    var s = i.readInt32BE(0), u = i.readUInt32BE(
      4
    ), o = "";
    s < 0 && (s = ~s + (u === 0), u = ~u + 1 >>> 0, o = "-");
    var h = "", m, d, b, y, v, c;
    {
      if (m = s % t, s = s / t >>> 0, d = 4294967296 * m + u, u = d / t >>> 0, b = "" + (d - t * u), u === 0 && s === 0)
        return o + b + h;
      for (y = "", v = 6 - b.length, c = 0; c < v; c++)
        y += "0";
      h = y + b + h;
    }
    {
      if (m = s % t, s = s / t >>> 0, d = 4294967296 * m + u, u = d / t >>> 0, b = "" + (d - t * u), u === 0 && s === 0)
        return o + b + h;
      for (y = "", v = 6 - b.length, c = 0; c < v; c++)
        y += "0";
      h = y + b + h;
    }
    {
      if (m = s % t, s = s / t >>> 0, d = 4294967296 * m + u, u = d / t >>> 0, b = "" + (d - t * u), u === 0 && s === 0)
        return o + b + h;
      for (y = "", v = 6 - b.length, c = 0; c < v; c++)
        y += "0";
      h = y + b + h;
    }
    return m = s % t, d = 4294967296 * m + u, b = "" + d % t, o + b + h;
  }
  g(n, "readInt8"), e.exports = n;
}), bl = ee((r, e) => {
  V();
  var t = wl(), n = g(function(f, w, S, E, _) {
    S = S || 0, E = E || !1, _ = _ || function(F, U, R) {
      return F * Math.pow(2, R) + U;
    };
    var B = S >> 3, $ = g(function(F) {
      return E ? ~F & 255 : F;
    }, "inv"), P = 255, x = 8 - S % 8;
    w < x && (P = 255 << 8 - w & 255, x = w), S && (P = P >> S % 8);
    var A = 0;
    S % 8 + w >= 8 && (A = _(0, $(f[B]) & P, x));
    for (var C = w + S >> 3, O = B + 1; O < C; O++)
      A = _(A, $(
        f[O]
      ), 8);
    var D = (w + S) % 8;
    return D > 0 && (A = _(A, $(f[C]) >> 8 - D, D)), A;
  }, "parseBits"), i = g(function(f, w, S) {
    var E = Math.pow(2, S - 1) - 1, _ = n(f, 1), B = n(f, S, 1);
    if (B === 0)
      return 0;
    var $ = 1, P = g(function(A, C, O) {
      A === 0 && (A = 1);
      for (var D = 1; D <= O; D++)
        $ /= 2, (C & 1 << O - D) > 0 && (A += $);
      return A;
    }, "parsePrecisionBits"), x = n(f, w, S + 1, !1, P);
    return B == Math.pow(
      2,
      S + 1
    ) - 1 ? x === 0 ? _ === 0 ? 1 / 0 : -1 / 0 : NaN : (_ === 0 ? 1 : -1) * Math.pow(2, B - E) * x;
  }, "parseFloatFromBits"), s = g(function(f) {
    return n(f, 1) == 1 ? -1 * (n(f, 15, 1, !0) + 1) : n(f, 15, 1);
  }, "parseInt16"), u = g(function(f) {
    return n(f, 1) == 1 ? -1 * (n(
      f,
      31,
      1,
      !0
    ) + 1) : n(f, 31, 1);
  }, "parseInt32"), o = g(function(f) {
    return i(f, 23, 8);
  }, "parseFloat32"), h = g(function(f) {
    return i(f, 52, 11);
  }, "parseFloat64"), m = g(function(f) {
    var w = n(f, 16, 32);
    if (w == 49152)
      return NaN;
    for (var S = Math.pow(1e4, n(f, 16, 16)), E = 0, _ = [], B = n(f, 16), $ = 0; $ < B; $++)
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
    ), _ = new Date((S === 0 ? 1 : -1) * E / 1e3 + 9466848e5);
    return f || _.setTime(_.getTime() + _.getTimezoneOffset() * 6e4), _.usec = E % 1e3, _.getMicroSeconds = function() {
      return this.usec;
    }, _.setMicroSeconds = function(B) {
      this.usec = B;
    }, _.getUTCMicroSeconds = function() {
      return this.usec;
    }, _;
  }, "parseDate"), b = g(
    function(f) {
      for (var w = n(
        f,
        32
      ), S = n(f, 32, 32), E = n(f, 32, 64), _ = 96, B = [], $ = 0; $ < w; $++)
        B[$] = n(f, 32, _), _ += 32, _ += 32;
      var P = g(function(A) {
        var C = n(f, 32, _);
        if (_ += 32, C == 4294967295)
          return null;
        var O;
        if (A == 23 || A == 20)
          return O = n(f, C * 8, _), _ += C * 8, O;
        if (A == 25)
          return O = f.toString(this.encoding, _ >> 3, (_ += C << 3) >> 3), O;
        console.log("ERROR: ElementType not implemented: " + A);
      }, "parseElement"), x = g(function(A, C) {
        var O = [], D;
        if (A.length > 1) {
          var F = A.shift();
          for (D = 0; D < F; D++)
            O[D] = x(A, C);
          A.unshift(F);
        } else
          for (D = 0; D < A[0]; D++)
            O[D] = P(C);
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
    f(20, t), f(21, s), f(23, u), f(26, u), f(1700, m), f(700, o), f(701, h), f(16, v), f(1114, d.bind(null, !1)), f(1184, d.bind(null, !0)), f(1e3, b), f(1007, b), f(1016, b), f(1008, b), f(1009, b), f(25, y);
  }, "init");
  e.exports = { init: c };
}), vl = ee((r, e) => {
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
}), Wt = ee((r) => {
  V();
  var e = yl(), t = bl(), n = us(), i = vl();
  r.getTypeParser = o, r.setTypeParser = h, r.arrayParser = n, r.builtins = i;
  var s = { text: {}, binary: {} };
  function u(m) {
    return String(m);
  }
  g(u, "noParse");
  function o(m, d) {
    return d = d || "text", s[d] && s[d][m] || u;
  }
  g(o, "getTypeParser");
  function h(m, d, b) {
    typeof d == "function" && (b = d, d = "text"), s[d][m] = b;
  }
  g(h, "setTypeParser"), e.init(function(m, d) {
    s.text[m] = d;
  }), t.init(function(m, d) {
    s.binary[m] = d;
  });
}), Dr = ee((r, e) => {
  V();
  var t = Wt();
  function n(i) {
    this._types = i || t, this.text = {}, this.binary = {};
  }
  g(n, "TypeOverrides"), n.prototype.getOverrides = function(i) {
    switch (i) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  }, n.prototype.setTypeParser = function(i, s, u) {
    typeof s == "function" && (u = s, s = "text"), this.getOverrides(s)[i] = u;
  }, n.prototype.getTypeParser = function(i, s) {
    return s = s || "text", this.getOverrides(s)[i] || this._types.getTypeParser(i, s);
  }, e.exports = n;
});
function mt(r) {
  let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, u = 2600822924, o = 528734635, h = 1541459225, m = 0, d = 0, b = [
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
  ], y = g((E, _) => E >>> _ | E << 32 - _, "rrot"), v = new Uint32Array(64), c = new Uint8Array(64), f = g(() => {
    for (let O = 0, D = 0; O < 16; O++, D += 4)
      v[O] = c[D] << 24 | c[D + 1] << 16 | c[D + 2] << 8 | c[D + 3];
    for (let O = 16; O < 64; O++) {
      let D = y(v[O - 15], 7) ^ y(v[O - 15], 18) ^ v[O - 15] >>> 3, F = y(
        v[O - 2],
        17
      ) ^ y(v[O - 2], 19) ^ v[O - 2] >>> 10;
      v[O] = v[O - 16] + D + v[O - 7] + F | 0;
    }
    let E = e, _ = t, B = n, $ = i, P = s, x = u, A = o, C = h;
    for (let O = 0; O < 64; O++) {
      let D = y(P, 6) ^ y(P, 11) ^ y(P, 25), F = P & x ^ ~P & A, U = C + D + F + b[O] + v[O] | 0, R = y(E, 2) ^ y(
        E,
        13
      ) ^ y(E, 22), q = E & _ ^ E & B ^ _ & B, W = R + q | 0;
      C = A, A = x, x = P, P = $ + U | 0, $ = B, B = _, _ = E, E = U + W | 0;
    }
    e = e + E | 0, t = t + _ | 0, n = n + B | 0, i = i + $ | 0, s = s + P | 0, u = u + x | 0, o = o + A | 0, h = h + C | 0, d = 0;
  }, "process"), w = g((E) => {
    typeof E == "string" && (E = new TextEncoder().encode(E));
    for (let _ = 0; _ < E.length; _++)
      c[d++] = E[_], d === 64 && f();
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
    let _ = new Uint8Array(32);
    return _[0] = e >>> 24, _[1] = e >>> 16 & 255, _[2] = e >>> 8 & 255, _[3] = e & 255, _[4] = t >>> 24, _[5] = t >>> 16 & 255, _[6] = t >>> 8 & 255, _[7] = t & 255, _[8] = n >>> 24, _[9] = n >>> 16 & 255, _[10] = n >>> 8 & 255, _[11] = n & 255, _[12] = i >>> 24, _[13] = i >>> 16 & 255, _[14] = i >>> 8 & 255, _[15] = i & 255, _[16] = s >>> 24, _[17] = s >>> 16 & 255, _[18] = s >>> 8 & 255, _[19] = s & 255, _[20] = u >>> 24, _[21] = u >>> 16 & 255, _[22] = u >>> 8 & 255, _[23] = u & 255, _[24] = o >>> 24, _[25] = o >>> 16 & 255, _[26] = o >>> 8 & 255, _[27] = o & 255, _[28] = h >>> 24, _[29] = h >>> 16 & 255, _[30] = h >>> 8 & 255, _[31] = h & 255, _;
  }, "digest");
  return r === void 0 ? { add: w, digest: S } : (w(r), S());
}
var Sl = we(() => {
  V(), g(mt, "sha256");
}), Le, Er, Pl = we(() => {
  V(), Le = class Ce {
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
      let t = Ce.hexChars, n = Ce.hexOut, i, s, u, o;
      for (o = 0; o < 4; o += 1)
        for (s = o * 8, i = e[o], u = 0; u < 8; u += 2)
          n[s + 1 + u] = t.charAt(i & 15), i >>>= 4, n[s + 0 + u] = t.charAt(
            i & 15
          ), i >>>= 4;
      return n.join("");
    }
    static _md5cycle(e, t) {
      let n = e[0], i = e[1], s = e[2], u = e[3];
      n += (i & s | ~i & u) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, u += (n & i | ~n & s) + t[1] - 389564586 | 0, u = (u << 12 | u >>> 20) + n | 0, s += (u & n | ~u & i) + t[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + u | 0, i += (s & u | ~s & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & u) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, u += (n & i | ~n & s) + t[5] + 1200080426 | 0, u = (u << 12 | u >>> 20) + n | 0, s += (u & n | ~u & i) + t[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + u | 0, i += (s & u | ~s & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & u) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, u += (n & i | ~n & s) + t[9] - 1958414417 | 0, u = (u << 12 | u >>> 20) + n | 0, s += (u & n | ~u & i) + t[10] - 42063 | 0, s = (s << 17 | s >>> 15) + u | 0, i += (s & u | ~s & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & u) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, u += (n & i | ~n & s) + t[13] - 40341101 | 0, u = (u << 12 | u >>> 20) + n | 0, s += (u & n | ~u & i) + t[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + u | 0, i += (s & u | ~s & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & u | s & ~u) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, u += (n & s | i & ~s) + t[6] - 1069501632 | 0, u = (u << 9 | u >>> 23) + n | 0, s += (u & i | n & ~i) + t[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + u | 0, i += (s & n | u & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & u | s & ~u) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, u += (n & s | i & ~s) + t[10] + 38016083 | 0, u = (u << 9 | u >>> 23) + n | 0, s += (u & i | n & ~i) + t[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + u | 0, i += (s & n | u & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & u | s & ~u) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, u += (n & s | i & ~s) + t[14] - 1019803690 | 0, u = (u << 9 | u >>> 23) + n | 0, s += (u & i | n & ~i) + t[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + u | 0, i += (s & n | u & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & u | s & ~u) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, u += (n & s | i & ~s) + t[2] - 51403784 | 0, u = (u << 9 | u >>> 23) + n | 0, s += (u & i | n & ~i) + t[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + u | 0, i += (s & n | u & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ u) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, u += (n ^ i ^ s) + t[8] - 2022574463 | 0, u = (u << 11 | u >>> 21) + n | 0, s += (u ^ n ^ i) + t[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + u | 0, i += (s ^ u ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ u) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, u += (n ^ i ^ s) + t[4] + 1272893353 | 0, u = (u << 11 | u >>> 21) + n | 0, s += (u ^ n ^ i) + t[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + u | 0, i += (s ^ u ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ u) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, u += (n ^ i ^ s) + t[0] - 358537222 | 0, u = (u << 11 | u >>> 21) + n | 0, s += (u ^ n ^ i) + t[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + u | 0, i += (s ^ u ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ u) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, u += (n ^ i ^ s) + t[12] - 421815835 | 0, u = (u << 11 | u >>> 21) + n | 0, s += (u ^ n ^ i) + t[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + u | 0, i += (s ^ u ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~u)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, u += (i ^ (n | ~s)) + t[7] + 1126891415 | 0, u = (u << 10 | u >>> 22) + n | 0, s += (n ^ (u | ~i)) + t[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + u | 0, i += (u ^ (s | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~u)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, u += (i ^ (n | ~s)) + t[3] - 1894986606 | 0, u = (u << 10 | u >>> 22) + n | 0, s += (n ^ (u | ~i)) + t[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + u | 0, i += (u ^ (s | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~u)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, u += (i ^ (n | ~s)) + t[15] - 30611744 | 0, u = (u << 10 | u >>> 22) + n | 0, s += (n ^ (u | ~i)) + t[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + u | 0, i += (u ^ (s | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~u)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, u += (i ^ (n | ~s)) + t[11] - 1120210379 | 0, u = (u << 10 | u >>> 22) + n | 0, s += (n ^ (u | ~i)) + t[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + u | 0, i += (u ^ (s | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = u + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(Ce.stateIdentity), this;
    }
    appendStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, u;
      for (u = 0; u < e.length; u += 1) {
        if (s = e.charCodeAt(u), s < 128)
          t[i++] = s;
        else if (s < 2048)
          t[i++] = (s >>> 6) + 192, t[i++] = s & 63 | 128;
        else if (s < 55296 || s > 56319)
          t[i++] = (s >>> 12) + 224, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        else {
          if (s = (s - 55296) * 1024 + (e.charCodeAt(++u) - 56320) + 65536, s > 1114111)
            throw new Error(
              "Unicode standard supports code points up to U+10FFFF"
            );
          t[i++] = (s >>> 18) + 240, t[i++] = s >>> 12 & 63 | 128, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        }
        i >= 64 && (this._dataLength += 64, Ce._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
      }
      return this._bufferLength = i, this;
    }
    appendAsciiStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, u = 0;
      for (; ; ) {
        for (s = Math.min(e.length - u, 64 - i); s--; )
          t[i++] = e.charCodeAt(u++);
        if (i < 64)
          break;
        this._dataLength += 64, Ce._md5cycle(this._state, n), i = 0;
      }
      return this._bufferLength = i, this;
    }
    appendByteArray(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, u = 0;
      for (; ; ) {
        for (s = Math.min(e.length - u, 64 - i); s--; )
          t[i++] = e[u++];
        if (i < 64)
          break;
        this._dataLength += 64, Ce._md5cycle(this._state, n), i = 0;
      }
      return this._bufferLength = i, this;
    }
    getState() {
      let e = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
    }
    setState(e) {
      let t = e.buffer, n = e.state, i = this._state, s;
      for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s = 0; s < t.length; s += 1)
        this._buffer8[s] = t.charCodeAt(s);
    }
    end(e = !1) {
      let t = this._bufferLength, n = this._buffer8, i = this._buffer32, s = (t >> 2) + 1;
      this._dataLength += t;
      let u = this._dataLength * 8;
      if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(Ce.buffer32Identity.subarray(s), s), t > 55 && (Ce._md5cycle(this._state, i), i.set(Ce.buffer32Identity)), u <= 4294967295)
        i[14] = u;
      else {
        let o = u.toString(16).match(/(.*?)(.{0,8})$/);
        if (o === null)
          return;
        let h = parseInt(
          o[2],
          16
        ), m = parseInt(o[1], 16) || 0;
        i[14] = h, i[15] = m;
      }
      return Ce._md5cycle(this._state, i), e ? this._state : Ce._hex(
        this._state
      );
    }
  }, g(Le, "Md5"), Y(Le, "stateIdentity", new Int32Array([1732584193, -271733879, -1732584194, 271733878])), Y(Le, "buffer32Identity", new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), Y(Le, "hexChars", "0123456789abcdef"), Y(Le, "hexOut", []), Y(Le, "onePassHasher", new Le()), Er = Le;
}), Mr = {};
xe(Mr, { createHash: () => cs, createHmac: () => hs, randomBytes: () => ls });
function ls(r) {
  return crypto.getRandomValues(J.alloc(r));
}
function cs(r) {
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
function hs(r, e) {
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
        let i = new Uint8Array(
          64
        ), s = new Uint8Array(64);
        for (let h = 0; h < 64; h++)
          i[h] = 54 ^ e[h], s[h] = 92 ^ e[h];
        let u = new Uint8Array(t.length + 64);
        u.set(i, 0), u.set(t, 64);
        let o = new Uint8Array(96);
        return o.set(s, 0), o.set(mt(u), 64), J.from(mt(o));
      },
      "digest"
    ) };
  }, "update") };
}
var fs = we(() => {
  V(), Sl(), Pl(), g(ls, "randomBytes"), g(cs, "createHash"), g(hs, "createHmac");
}), Gt = ee((r, e) => {
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
  var t = Wt(), n = t.getTypeParser(20, "text"), i = t.getTypeParser(
    1016,
    "text"
  );
  e.exports.__defineSetter__("parseInt8", function(s) {
    t.setTypeParser(20, "text", s ? t.getTypeParser(
      23,
      "text"
    ) : n), t.setTypeParser(1016, "text", s ? t.getTypeParser(1007, "text") : i);
  });
}), Ht = ee((r, e) => {
  V();
  var t = (fs(), fe(Mr)), n = Gt();
  function i(c) {
    var f = c.replace(
      /\\/g,
      "\\\\"
    ).replace(/"/g, '\\"');
    return '"' + f + '"';
  }
  g(i, "escapeElement");
  function s(c) {
    for (var f = "{", w = 0; w < c.length; w++)
      w > 0 && (f = f + ","), c[w] === null || typeof c[w] > "u" ? f = f + "NULL" : Array.isArray(c[w]) ? f = f + s(c[w]) : c[w] instanceof J ? f += "\\\\x" + c[w].toString("hex") : f += i(u(c[w]));
    return f = f + "}", f;
  }
  g(s, "arrayString");
  var u = g(function(c, f) {
    if (c == null)
      return null;
    if (c instanceof J)
      return c;
    if (ArrayBuffer.isView(c)) {
      var w = J.from(c.buffer, c.byteOffset, c.byteLength);
      return w.length === c.byteLength ? w : w.slice(c.byteOffset, c.byteOffset + c.byteLength);
    }
    return c instanceof Date ? n.parseInputDatesAsUTC ? d(c) : m(c) : Array.isArray(c) ? s(c) : typeof c == "object" ? o(c, f) : c.toString();
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
}), St = {};
xe(St, { default: () => ds });
var ds, Kt = we(() => {
  V(), ds = {};
}), El = ee((r, e) => {
  V();
  var t = (fs(), fe(Mr));
  function n(f) {
    if (f.indexOf("SCRAM-SHA-256") === -1)
      throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let w = t.randomBytes(
      18
    ).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: w, response: "n,,n=*,r=" + w, message: "SASLInitialResponse" };
  }
  g(n, "startSession");
  function i(f, w, S) {
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
    var _ = J.from(E.salt, "base64"), B = c(w, _, E.iteration), $ = v(B, "Client Key"), P = y(
      $
    ), x = "n=*,r=" + f.clientNonce, A = "r=" + E.nonce + ",s=" + E.salt + ",i=" + E.iteration, C = "c=biws,r=" + E.nonce, O = x + "," + A + "," + C, D = v(P, O), F = b($, D), U = F.toString("base64"), R = v(B, "Server Key"), q = v(R, O);
    f.message = "SASLResponse", f.serverSignature = q.toString("base64"), f.response = C + ",p=" + U;
  }
  g(i, "continueSession");
  function s(f, w) {
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
  g(s, "finalizeSession");
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
    let _ = w.get("i");
    if (_) {
      if (!/^[1-9][0-9]*$/.test(_))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let B = parseInt(_, 10);
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
    ), _ = E, B = 0; B < S - 1; B++)
      E = v(f, E), _ = b(_, E);
    return _;
  }
  g(c, "Hi"), e.exports = { startSession: n, continueSession: i, finalizeSession: s };
}), kr = {};
xe(kr, { join: () => ps });
function ps(...r) {
  return r.join("/");
}
var gs = we(() => {
  V(), g(
    ps,
    "join"
  );
}), Qr = {};
xe(Qr, { stat: () => ms });
function ms(r, e) {
  e(new Error("No filesystem"));
}
var ys = we(() => {
  V(), g(ms, "stat");
}), qr = {};
xe(qr, { default: () => ws });
var ws, bs = we(() => {
  V(), ws = {};
}), vs = {};
xe(vs, { StringDecoder: () => Ss });
var pr, Ss, Cl = we(() => {
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
  }, g(pr, "StringDecoder"), Ss = pr;
}), _l = ee((r, e) => {
  V();
  var { Transform: t } = (bs(), fe(qr)), { StringDecoder: n } = (Cl(), fe(vs)), i = Symbol(
    "last"
  ), s = Symbol("decoder");
  function u(b, y, v) {
    let c;
    if (this.overflow) {
      if (c = this[s].write(b).split(
        this.matcher
      ), c.length === 1)
        return v();
      c.shift(), this.overflow = !1;
    } else
      this[i] += this[s].write(b), c = this[i].split(this.matcher);
    this[i] = c.pop();
    for (let f = 0; f < c.length; f++)
      try {
        h(this, this.mapper(c[f]));
      } catch (w) {
        return v(w);
      }
    if (this.overflow = this[i].length > this.maxLength, this.overflow && !this.skipOverflow) {
      v(new Error(
        "maximum buffer reached"
      ));
      return;
    }
    v();
  }
  g(u, "transform");
  function o(b) {
    if (this[i] += this[s].end(), this[i])
      try {
        h(this, this.mapper(this[i]));
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
    return c[i] = "", c[s] = new n("utf8"), c.matcher = b, c.mapper = y, c.maxLength = v.maxLength, c.skipOverflow = v.skipOverflow || !1, c.overflow = !1, c._destroy = function(f, w) {
      this._writableState.errorEmitted = !1, w(f);
    }, c;
  }
  g(d, "split"), e.exports = d;
}), Tl = ee((r, e) => {
  V();
  var t = (gs(), fe(kr)), n = (bs(), fe(qr)).Stream, i = _l(), s = (Kt(), fe(St)), u = 5432, o = Z.platform === "win32", h = Z.stderr, m = 56, d = 7, b = 61440, y = 32768;
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
      h.write(s.format.apply(s, P));
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
    return c.slice(0, -1).reduce(function(x, A, C) {
      return C == 1 && Number($[A] || u) === Number(
        P[A]
      ) ? x && !0 : x && (P[A] === "*" || P[A] === $[A]);
    }, !0);
  };
  e.exports.getPassword = function($, P, x) {
    var A, C = P.pipe(
      i()
    );
    function O(U) {
      var R = _(U);
      R && B(R) && E($, R) && (A = R[w], C.end());
    }
    g(O, "onLine");
    var D = g(function() {
      P.destroy(), x(A);
    }, "onEnd"), F = g(function(U) {
      P.destroy(), S("WARNING: error on reading file: %s", U), x(
        void 0
      );
    }, "onErr");
    P.on("error", F), C.on("data", O).on("end", D).on("error", F);
  };
  var _ = e.exports.parseLine = function($) {
    if ($.length < 11 || $.match(/^\s+#/))
      return null;
    for (var P = "", x = "", A = 0, C = 0, O = 0, D = {}, F = !1, U = g(
      function(q, W, K) {
        var te = $.substring(W, K);
        Object.hasOwnProperty.call(Z.env, "PGPASS_NO_DEESCAPE") || (te = te.replace(/\\([:\\])/g, "$1")), D[c[q]] = te;
      },
      "addToObj"
    ), R = 0; R < $.length - 1; R += 1) {
      if (P = $.charAt(R + 1), x = $.charAt(
        R
      ), F = A == f - 1, F) {
        U(A, C);
        break;
      }
      R >= 0 && P == ":" && x !== "\\" && (U(A, C, R + 1), C = R + 2, A += 1);
    }
    return D = Object.keys(D).length === f ? D : null, D;
  }, B = e.exports.isValidEntry = function($) {
    for (var P = { 0: function(D) {
      return D.length > 0;
    }, 1: function(D) {
      return D === "*" ? !0 : (D = Number(D), isFinite(D) && D > 0 && D < 9007199254740992 && Math.floor(D) === D);
    }, 2: function(D) {
      return D.length > 0;
    }, 3: function(D) {
      return D.length > 0;
    }, 4: function(D) {
      return D.length > 0;
    } }, x = 0; x < c.length; x += 1) {
      var A = P[x], C = $[c[x]] || "", O = A(C);
      if (!O)
        return !1;
    }
    return !0;
  };
}), Al = ee((r, e) => {
  V(), gs(), fe(kr);
  var t = (ys(), fe(Qr)), n = Tl();
  e.exports = function(i, s) {
    var u = n.getFileName();
    t.stat(u, function(o, h) {
      if (o || !n.usePgPass(h, u))
        return s(void 0);
      var m = t.createReadStream(
        u
      );
      n.getPassword(i, m, s);
    });
  }, e.exports.warnTo = n.warnTo;
}), Ps = {};
xe(Ps, { default: () => Es });
var Es, xl = we(() => {
  V(), Es = {};
}), Il = ee((r, e) => {
  V();
  var t = (is(), fe(ss)), n = (ys(), fe(Qr));
  function i(s) {
    if (s.charAt(0) === "/") {
      var o = s.split(" ");
      return { host: o[0], database: o[1] };
    }
    var u = t.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(s) ? encodeURI(s).replace(/\%25(\d\d)/g, "%$1") : s, !0), o = u.query;
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
  g(i, "parse"), e.exports = i, i.parse = i;
}), Fr = ee((r, e) => {
  V();
  var t = (xl(), fe(Ps)), n = Gt(), i = Il().parse, s = g(function(b, y, v) {
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
      y = typeof y == "string" ? i(y) : y || {}, y.connectionString && (y = Object.assign({}, y, i(y.connectionString))), this.user = s("user", y), this.database = s("database", y), this.database === void 0 && (this.database = this.user), this.port = parseInt(s("port", y), 10), this.host = s("host", y), Object.defineProperty(this, "password", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: s("password", y)
      }), this.binary = s("binary", y), this.options = s("options", y), this.ssl = typeof y.ssl > "u" ? u() : y.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = !0), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: !1 }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: !1 }), this.client_encoding = s("client_encoding", y), this.replication = s("replication", y), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = s("application_name", y, "PGAPPNAME"), this.fallback_application_name = s("fallback_application_name", y, !1), this.statement_timeout = s("statement_timeout", y, !1), this.lock_timeout = s("lock_timeout", y, !1), this.idle_in_transaction_session_timeout = s("idle_in_transaction_session_timeout", y, !1), this.query_timeout = s("query_timeout", y, !1), y.connectionTimeoutMillis === void 0 ? this.connect_timeout = Z.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(y.connectionTimeoutMillis / 1e3), y.keepAlive === !1 ? this.keepalives = 0 : y.keepAlive === !0 && (this.keepalives = 1), typeof y.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(y.keepAliveInitialDelayMillis / 1e3));
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
}), Nl = ee((r, e) => {
  V();
  var t = Wt(), n = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, i = class {
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
  g(i, "Result");
  var s = i;
  e.exports = s;
}), Ll = ee((r, e) => {
  V();
  var { EventEmitter: t } = He(), n = Nl(), i = Ht(), s = class extends t {
    constructor(h, m, d) {
      super(), h = i.normalizeQueryConfig(h, m, d), this.text = h.text, this.values = h.values, this.rows = h.rows, this.types = h.types, this.name = h.name, this.binary = h.binary, this.portal = h.portal || "", this.callback = h.callback, this._rowMode = h.rowMode, Z.domain && h.callback && (this.callback = Z.domain.bind(h.callback)), this._result = new n(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = !1, this._canceledDueToError = !1, this._promise = null;
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
        h.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: i.prepareValue });
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
  g(s, "Query");
  var u = s;
  e.exports = u;
}), Cs = ee((r) => {
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
  var i = n;
  r.CopyDataMessage = i;
  var s = class {
    constructor(R, q, W, K) {
      this.length = R, this.name = q, this.binary = W, this.columnTypes = new Array(K);
    }
  };
  g(s, "CopyResponse");
  var u = s;
  r.CopyResponse = u;
  var o = class {
    constructor(R, q, W, K, te, ne, be) {
      this.name = R, this.tableID = q, this.columnID = W, this.dataTypeID = K, this.dataTypeSize = te, this.dataTypeModifier = ne, this.format = be;
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
  var _ = class {
    constructor(R, q, W, K) {
      this.length = R, this.processId = q, this.channel = W, this.payload = K, this.name = "notification";
    }
  };
  g(_, "NotificationResponseMessage");
  var B = _;
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
  var C = class {
    constructor(R, q) {
      this.length = R, this.fields = q, this.name = "dataRow", this.fieldCount = q.length;
    }
  };
  g(C, "DataRowMessage");
  var O = C;
  r.DataRowMessage = O;
  var D = class {
    constructor(R, q) {
      this.length = R, this.message = q, this.name = "notice";
    }
  };
  g(D, "NoticeMessage");
  var F = D;
  r.NoticeMessage = F;
}), Bl = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.Writer = void 0;
  var e = class {
    constructor(i = 256) {
      this.size = i, this.offset = 5, this.headerPosition = 0, this.buffer = J.allocUnsafe(i);
    }
    ensure(i) {
      var s = this.buffer.length - this.offset;
      if (s < i) {
        var u = this.buffer, o = u.length + (u.length >> 1) + i;
        this.buffer = J.allocUnsafe(o), u.copy(this.buffer);
      }
    }
    addInt32(i) {
      return this.ensure(4), this.buffer[this.offset++] = i >>> 24 & 255, this.buffer[this.offset++] = i >>> 16 & 255, this.buffer[this.offset++] = i >>> 8 & 255, this.buffer[this.offset++] = i >>> 0 & 255, this;
    }
    addInt16(i) {
      return this.ensure(2), this.buffer[this.offset++] = i >>> 8 & 255, this.buffer[this.offset++] = i >>> 0 & 255, this;
    }
    addCString(i) {
      if (!i)
        this.ensure(1);
      else {
        var s = J.byteLength(i);
        this.ensure(s + 1), this.buffer.write(i, this.offset, "utf-8"), this.offset += s;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(i = "") {
      var s = J.byteLength(i);
      return this.ensure(s), this.buffer.write(i, this.offset), this.offset += s, this;
    }
    add(i) {
      return this.ensure(
        i.length
      ), i.copy(this.buffer, this.offset), this.offset += i.length, this;
    }
    join(i) {
      if (i) {
        this.buffer[this.headerPosition] = i;
        let s = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(s, this.headerPosition + 1);
      }
      return this.buffer.slice(i ? 0 : 5, this.offset);
    }
    flush(i) {
      var s = this.join(i);
      return this.offset = 5, this.headerPosition = 0, this.buffer = J.allocUnsafe(this.size), s;
    }
  };
  g(e, "Writer");
  var t = e;
  r.Writer = t;
}), Rl = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.serialize = void 0;
  var e = Bl(), t = new e.Writer(), n = g((R) => {
    t.addInt16(3).addInt16(0);
    for (let K of Object.keys(R))
      t.addCString(
        K
      ).addCString(R[K]);
    t.addCString("client_encoding").addCString("UTF8");
    var q = t.addCString("").flush(), W = q.length + 4;
    return new e.Writer().addInt32(W).add(q).flush();
  }, "startup"), i = g(() => {
    let R = J.allocUnsafe(
      8
    );
    return R.writeInt32BE(8, 0), R.writeInt32BE(80877103, 4), R;
  }, "requestSsl"), s = g((R) => t.addCString(R).flush(
    112
  ), "password"), u = g(function(R, q) {
    return t.addCString(R).addInt32(J.byteLength(q)).addString(q), t.flush(112);
  }, "sendSASLInitialResponseMessage"), o = g(function(R) {
    return t.addString(R).flush(112);
  }, "sendSCRAMClientFinalMessage"), h = g((R) => t.addCString(R).flush(81), "query"), m = [], d = g((R) => {
    let q = R.name || "";
    q.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", q, q.length), console.error("This can cause conflicts and silent errors executing queries"));
    let W = R.types || m;
    for (var K = W.length, te = t.addCString(q).addCString(R.text).addInt16(
      K
    ), ne = 0; ne < K; ne++)
      te.addInt32(W[ne]);
    return t.flush(80);
  }, "parse"), b = new e.Writer(), y = g(function(R, q) {
    for (let W = 0; W < R.length; W++) {
      let K = q ? q(R[W], W) : R[W];
      K == null ? (t.addInt16(0), b.addInt32(-1)) : K instanceof J ? (t.addInt16(
        1
      ), b.addInt32(K.length), b.add(K)) : (t.addInt16(0), b.addInt32(J.byteLength(K)), b.addString(K));
    }
  }, "writeValues"), v = g((R = {}) => {
    let q = R.portal || "", W = R.statement || "", K = R.binary || !1, te = R.values || m, ne = te.length;
    return t.addCString(q).addCString(W), t.addInt16(ne), y(te, R.valueMapper), t.addInt16(ne), t.add(b.flush()), t.addInt16(K ? 1 : 0), t.flush(66);
  }, "bind"), c = J.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), f = g((R) => {
    if (!R || !R.portal && !R.rows)
      return c;
    let q = R.portal || "", W = R.rows || 0, K = J.byteLength(q), te = 4 + K + 1 + 4, ne = J.allocUnsafe(1 + te);
    return ne[0] = 69, ne.writeInt32BE(te, 1), ne.write(q, 5, "utf-8"), ne[K + 5] = 0, ne.writeUInt32BE(W, ne.length - 4), ne;
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
    let W = 4 + J.byteLength(q) + 1, K = J.allocUnsafe(1 + W);
    return K[0] = R, K.writeInt32BE(W, 1), K.write(q, 5, "utf-8"), K[W] = 0, K;
  }, "cstringMessage"), E = t.addCString("P").flush(68), _ = t.addCString("S").flush(68), B = g((R) => R.name ? S(68, `${R.type}${R.name || ""}`) : R.type === "P" ? E : _, "describe"), $ = g((R) => {
    let q = `${R.type}${R.name || ""}`;
    return S(67, q);
  }, "close"), P = g((R) => t.add(R).flush(100), "copyData"), x = g((R) => S(102, R), "copyFail"), A = g((R) => J.from([R, 0, 0, 0, 4]), "codeOnlyBuffer"), C = A(72), O = A(83), D = A(88), F = A(99), U = {
    startup: n,
    password: s,
    requestSsl: i,
    sendSASLInitialResponseMessage: u,
    sendSCRAMClientFinalMessage: o,
    query: h,
    parse: d,
    bind: v,
    execute: f,
    describe: B,
    close: $,
    flush: g(
      () => C,
      "flush"
    ),
    sync: g(() => O, "sync"),
    end: g(() => D, "end"),
    copyData: P,
    copyDone: g(() => F, "copyDone"),
    copyFail: x,
    cancel: w
  };
  r.serialize = U;
}), Ol = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.BufferReader = void 0;
  var e = J.allocUnsafe(0), t = class {
    constructor(s = 0) {
      this.offset = s, this.buffer = e, this.encoding = "utf-8";
    }
    setBuffer(s, u) {
      this.offset = s, this.buffer = u;
    }
    int16() {
      let s = this.buffer.readInt16BE(this.offset);
      return this.offset += 2, s;
    }
    byte() {
      let s = this.buffer[this.offset];
      return this.offset++, s;
    }
    int32() {
      let s = this.buffer.readInt32BE(
        this.offset
      );
      return this.offset += 4, s;
    }
    uint32() {
      let s = this.buffer.readUInt32BE(this.offset);
      return this.offset += 4, s;
    }
    string(s) {
      let u = this.buffer.toString(this.encoding, this.offset, this.offset + s);
      return this.offset += s, u;
    }
    cstring() {
      let s = this.offset, u = s;
      for (; this.buffer[u++] !== 0; )
        ;
      return this.offset = u, this.buffer.toString(this.encoding, s, u - 1);
    }
    bytes(s) {
      let u = this.buffer.slice(this.offset, this.offset + s);
      return this.offset += s, u;
    }
  };
  g(t, "BufferReader");
  var n = t;
  r.BufferReader = n;
}), $l = ee((r) => {
  V(), Object.defineProperty(r, "__esModule", { value: !0 }), r.Parser = void 0;
  var e = Cs(), t = Ol(), n = 1, i = 4, s = n + i, u = J.allocUnsafe(0), o = class {
    constructor(d) {
      if (this.buffer = u, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new t.BufferReader(), d?.mode === "binary")
        throw new Error("Binary mode not supported yet");
      this.mode = d?.mode || "text";
    }
    parse(d, b) {
      this.mergeBuffer(d);
      let y = this.bufferOffset + this.bufferLength, v = this.bufferOffset;
      for (; v + s <= y; ) {
        let c = this.buffer[v], f = this.buffer.readUInt32BE(
          v + n
        ), w = n + f;
        if (w + v <= y) {
          let S = this.handlePacket(v + s, c, f, this.buffer);
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
  var e = Cs();
  Object.defineProperty(r, "DatabaseError", { enumerable: !0, get: g(
    function() {
      return e.DatabaseError;
    },
    "get"
  ) });
  var t = Rl();
  Object.defineProperty(r, "serialize", {
    enumerable: !0,
    get: g(function() {
      return t.serialize;
    }, "get")
  });
  var n = $l();
  function i(s, u) {
    let o = new n.Parser();
    return s.on("data", (h) => o.parse(h, u)), new Promise((h) => s.on("end", () => h()));
  }
  g(i, "parse"), r.parse = i;
}), Ts = {};
xe(Ts, { connect: () => As });
function As({ socket: r, servername: e }) {
  return r.startTls(e), r;
}
var Dl = we(
  () => {
    V(), g(As, "connect");
  }
), xs = ee((r, e) => {
  V();
  var t = (Vt(), fe(rs)), n = He().EventEmitter, { parse: i, serialize: s } = _s(), u = s.flush(), o = s.sync(), h = s.end(), m = class extends n {
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
        var E = (Dl(), fe(Ts));
        let _ = { socket: c.stream };
        c.ssl !== !0 && (Object.assign(_, c.ssl), "key" in c.ssl && (_.key = c.ssl.key)), t.isIP(v) === 0 && (_.servername = v);
        try {
          c.stream = E.connect(_);
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
      ), i(y, (v) => {
        var c = v.name === "error" ? "errorMessage" : v.name;
        this._emitMessage && this.emit("message", v), this.emit(c, v);
      });
    }
    requestSsl() {
      this.stream.write(s.requestSsl());
    }
    startup(y) {
      this.stream.write(s.startup(y));
    }
    cancel(y, v) {
      this._send(s.cancel(y, v));
    }
    password(y) {
      this._send(s.password(y));
    }
    sendSASLInitialResponseMessage(y, v) {
      this._send(s.sendSASLInitialResponseMessage(y, v));
    }
    sendSCRAMClientFinalMessage(y) {
      this._send(s.sendSCRAMClientFinalMessage(
        y
      ));
    }
    _send(y) {
      return this.stream.writable ? this.stream.write(y) : !1;
    }
    query(y) {
      this._send(s.query(y));
    }
    parse(y) {
      this._send(s.parse(y));
    }
    bind(y) {
      this._send(s.bind(y));
    }
    execute(y) {
      this._send(s.execute(y));
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
      this._send(s.close(y));
    }
    describe(y) {
      this._send(s.describe(y));
    }
    sendCopyFromChunk(y) {
      this._send(s.copyData(y));
    }
    endCopyFrom() {
      this._send(s.copyDone());
    }
    sendCopyFail(y) {
      this._send(s.copyFail(y));
    }
  };
  g(m, "Connection");
  var d = m;
  e.exports = d;
}), Ml = ee((r, e) => {
  V();
  var t = He().EventEmitter;
  Kt(), fe(St);
  var n = Ht(), i = El(), s = Al(), u = Dr(), o = Fr(), h = Ll(), m = Gt(), d = xs(), b = class extends t {
    constructor(c) {
      super(), this.connectionParameters = new o(c), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(
        this,
        "password",
        { configurable: !0, enumerable: !1, writable: !0, value: this.connectionParameters.password }
      ), this.replication = this.connectionParameters.replication;
      var f = c || {};
      this._Promise = f.Promise || jt.Promise, this._types = new u(f.types), this._ending = !1, this._connecting = !1, this._connected = !1, this._connectionError = !1, this._queryable = !0, this.connection = f.connection || new d({ stream: f.stream, ssl: this.connectionParameters.ssl, keepAlive: f.keepAlive || !1, keepAliveInitialDelayMillis: f.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = f.binary || m.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || !1, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: !1 }), this._connectionTimeoutMillis = f.connectionTimeoutMillis || 0;
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
      }) : this.password !== null ? c() : s(
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
        this.saslSession = i.startSession(c.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(c) {
      i.continueSession(
        this.saslSession,
        this.password,
        c.data
      ), this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
    }
    _handleAuthSASLFinal(c) {
      i.finalizeSession(this.saslSession, c.data), this.saslSession = null;
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
      var S, E, _, B, $;
      if (c == null)
        throw new TypeError(
          "Client was passed a null or undefined query"
        );
      return typeof c.submit == "function" ? (_ = c.query_timeout || this.connectionParameters.query_timeout, E = S = c, typeof f == "function" && (S.callback = S.callback || f)) : (_ = this.connectionParameters.query_timeout, S = new h(c, f, w), S.callback || (E = new this._Promise((P, x) => {
        S.callback = (A, C) => A ? x(A) : P(C);
      }))), _ && ($ = S.callback, B = setTimeout(() => {
        var P = new Error("Query read timeout");
        Z.nextTick(
          () => {
            S.handleError(P, this.connection);
          }
        ), $(P), S.callback = () => {
        };
        var x = this.queryQueue.indexOf(S);
        x > -1 && this.queryQueue.splice(x, 1), this._pulseQueryQueue();
      }, _), S.callback = (P, x) => {
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
}), kl = ee((r, e) => {
  V();
  var t = He().EventEmitter, n = g(function() {
  }, "NOOP"), i = g((c, f) => {
    let w = c.findIndex(f);
    return w === -1 ? void 0 : c.splice(w, 1)[0];
  }, "removeWhere"), s = class {
    constructor(f, w, S) {
      this.client = f, this.idleListener = w, this.timeoutId = S;
    }
  };
  g(s, "IdleItem");
  var u = s, o = class {
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
    }, "cb"), _ = new c(function(B, $) {
      S = B, w = $;
    }).catch((B) => {
      throw Error.captureStackTrace(B), B;
    });
    return { callback: E, result: _ };
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
      }, this.Client = this.options.Client || w || Jt().Client, this.Promise = this.options.Promise || jt.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = !1, this.ended = !1;
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
      let w = i(
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
        }, "queueCallback"), _ = new h(E), B = setTimeout(() => {
          i(
            this._pendingQueue,
            ($) => $.callback === E
          ), _.timedOut = !0, w.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return B.unref && B.unref(), this._pendingQueue.push(_), S;
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
      let E, _ = !1;
      this.options.connectionTimeoutMillis && (E = setTimeout(() => {
        this.log("ending client due to timeout"), _ = !0, w.connection ? w.connection.stream.destroy() : w.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), w.connect((B) => {
        if (E && clearTimeout(E), w.on("error", S), B)
          this.log("client failed to connect", B), this._clients = this._clients.filter(($) => $ !== w), _ && (B = new Error("Connection terminated due to connection timeout", { cause: B })), this._pulseQueue(), f.timedOut || f.callback(B, void 0, n);
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
      E && this.emit("connect", f), this.emit("acquire", f), f.release = this._releaseOnce(f, S), f.removeListener("error", S), w.timedOut ? E && this.options.verify ? this.options.verify(f, f.release) : f.release() : E && this.options.verify ? this.options.verify(f, (_) => {
        if (_)
          return f.release(_), w.callback(_, void 0, n);
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
        let _ = d(this.Promise, f);
        return Or(function() {
          return _.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), _.result;
      }
      typeof w == "function" && (S = w, w = void 0);
      let E = d(this.Promise, S);
      return S = E.callback, this.connect((_, B) => {
        if (_)
          return S(_);
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
}), Is = {};
xe(Is, { default: () => Ns });
var Ns, Ql = we(() => {
  V(), Ns = {};
}), ql = ee((r, e) => {
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
}), Fl = ee((r, e) => {
  V();
  var t = He().EventEmitter, n = (Kt(), fe(St)), i = Ht(), s = e.exports = function(o, h, m) {
    t.call(this), o = i.normalizeQueryConfig(o, h, m), this.text = o.text, this.values = o.values, this.name = o.name, this.callback = o.callback, this.state = "new", this._arrayMode = o.rowMode === "array", this._emitRowEvents = !1, this.on("newListener", function(d) {
      d === "row" && (this._emitRowEvents = !0);
    }.bind(this));
  };
  n.inherits(s, t);
  var u = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  s.prototype.handleError = function(o) {
    var h = this.native.pq.resultErrorFields();
    if (h)
      for (var m in h) {
        var d = u[m] || m;
        o[d] = h[m];
      }
    this.callback ? this.callback(o) : this.emit("error", o), this.state = "error";
  }, s.prototype.then = function(o, h) {
    return this._getPromise().then(
      o,
      h
    );
  }, s.prototype.catch = function(o) {
    return this._getPromise().catch(o);
  }, s.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(o, h) {
      this._once("end", o), this._once("error", h);
    }.bind(this)), this._promise);
  }, s.prototype.submit = function(o) {
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
      var d = (this.values || []).map(i.prepareValue);
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
      var b = this.values.map(i.prepareValue);
      o.native.query(this.text, b, m);
    } else
      o.native.query(this.text, m);
  };
}), Ul = ee((r, e) => {
  V();
  var t = (Ql(), fe(Is)), n = Dr();
  ql();
  var i = He().EventEmitter, s = (Kt(), fe(St)), u = Fr(), o = Fl(), h = e.exports = function(m) {
    i.call(this), m = m || {}, this._Promise = m.Promise || jt.Promise, this._types = new n(m.types), this.native = new t({ types: this._types }), this._queryQueue = [], this._ending = !1, this._connecting = !1, this._connected = !1, this._queryable = !0;
    var d = this.connectionParameters = new u(m);
    this.user = d.user, Object.defineProperty(this, "password", { configurable: !0, enumerable: !1, writable: !0, value: d.password }), this.database = d.database, this.host = d.host, this.port = d.port, this.namedQueries = {};
  };
  h.Query = o, s.inherits(h, i), h.prototype._errorAllQueries = function(m) {
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
      v = new this._Promise((_, B) => {
        S = _, E = B;
      }), y.callback = (_, B) => _ ? E(_) : S(B);
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
  V(), e.exports = Ul();
}), Jt = ee((r, e) => {
  V();
  var t = Ml(), n = Gt(), i = xs(), s = kl(), { DatabaseError: u } = _s(), o = g(
    (m) => {
      var d;
      return d = class extends s {
        constructor(b) {
          super(b, m);
        }
      }, g(d, "BoundPool"), d;
    },
    "poolFactory"
  ), h = g(
    function(m) {
      this.defaults = n, this.Client = m, this.Query = this.Client.Query, this.Pool = o(this.Client), this._pools = [], this.Connection = i, this.types = Wt(), this.DatabaseError = u;
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
Vt();
is();
V();
var jl = Object.defineProperty, zl = Object.defineProperties, Vl = Object.getOwnPropertyDescriptors, bn = Object.getOwnPropertySymbols, Wl = Object.prototype.hasOwnProperty, Gl = Object.prototype.propertyIsEnumerable, vn = g(
  (r, e, t) => e in r ? jl(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t,
  "__defNormalProp"
), Hl = g((r, e) => {
  for (var t in e || (e = {}))
    Wl.call(e, t) && vn(r, t, e[t]);
  if (bn)
    for (var t of bn(e))
      Gl.call(e, t) && vn(r, t, e[t]);
  return r;
}, "__spreadValues"), Kl = g((r, e) => zl(r, Vl(e)), "__spreadProps"), Jl = 1008e3, Sn = new Uint8Array(
  new Uint16Array([258]).buffer
)[0] === 2, Yl = new TextDecoder(), Ur = new TextEncoder(), _t = Ur.encode("0123456789abcdef"), Tt = Ur.encode("0123456789ABCDEF"), Xl = Ur.encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), Ls = Xl.slice();
Ls[62] = 45;
Ls[63] = 95;
var dt, At;
function Bs(r, { alphabet: e, scratchArr: t } = {}) {
  if (!dt)
    if (dt = new Uint16Array(256), At = new Uint16Array(256), Sn)
      for (let v = 0; v < 256; v++)
        dt[v] = _t[v & 15] << 8 | _t[v >>> 4], At[v] = Tt[v & 15] << 8 | Tt[v >>> 4];
    else
      for (let v = 0; v < 256; v++)
        dt[v] = _t[v & 15] | _t[v >>> 4] << 8, At[v] = Tt[v & 15] | Tt[v >>> 4] << 8;
  r.byteOffset % 4 !== 0 && (r = new Uint8Array(r));
  let n = r.length, i = n >>> 1, s = n >>> 2, u = t || new Uint16Array(n), o = new Uint32Array(
    r.buffer,
    r.byteOffset,
    s
  ), h = new Uint32Array(u.buffer, u.byteOffset, i), m = e === "upper" ? At : dt, d = 0, b = 0, y;
  if (Sn)
    for (; d < s; )
      y = o[d++], h[b++] = m[y >>> 8 & 255] << 16 | m[y & 255], h[b++] = m[y >>> 24] << 16 | m[y >>> 16 & 255];
  else
    for (; d < s; )
      y = o[d++], h[b++] = m[y >>> 24] << 16 | m[y >>> 16 & 255], h[b++] = m[y >>> 8 & 255] << 16 | m[y & 255];
  for (d <<= 2; d < n; )
    u[d] = m[r[d++]];
  return Yl.decode(u.subarray(0, n));
}
g(Bs, "_toHex");
function Rs(r, e = {}) {
  let t = "", n = r.length, i = Jl >>> 1, s = Math.ceil(n / i), u = new Uint16Array(s > 1 ? i : n);
  for (let o = 0; o < s; o++) {
    let h = o * i, m = h + i;
    t += Bs(r.subarray(h, m), Kl(Hl(
      {},
      e
    ), { scratchArr: u }));
  }
  return t;
}
g(Rs, "_toHexChunked");
function Os(r, e = {}) {
  return e.alphabet !== "upper" && typeof r.toHex == "function" ? r.toHex() : Rs(r, e);
}
g(Os, "toHex");
V();
var $s = class Ds {
  constructor(e, t) {
    this.strings = e, this.values = t;
  }
  toParameterizedQuery(e = { query: "", params: [] }) {
    let { strings: t, values: n } = this;
    for (let i = 0, s = t.length; i < s; i++)
      if (e.query += t[i], i < n.length) {
        let u = n[i];
        if (u instanceof Qs)
          e.query += u.sql;
        else if (u instanceof Bt)
          if (u.queryData instanceof Ds)
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
g($s, "SqlTemplate");
var Ms = $s, ks = class {
  constructor(e) {
    this.sql = e;
  }
};
g(ks, "UnsafeRawSql");
var Qs = ks, Zl = Ge(Dr()), ec = Ge(Ht()), qs = class Fs extends Error {
  constructor(e) {
    super(e), Y(this, "name", "NeonDbError"), Y(this, "severity"), Y(this, "code"), Y(this, "detail"), Y(this, "hint"), Y(this, "position"), Y(this, "internalPosition"), Y(
      this,
      "internalQuery"
    ), Y(this, "where"), Y(this, "schema"), Y(this, "table"), Y(this, "column"), Y(this, "dataType"), Y(this, "constraint"), Y(this, "file"), Y(this, "line"), Y(this, "routine"), Y(this, "sourceError"), "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Fs);
  }
};
g(
  qs,
  "NeonDbError"
);
var Ze = qs, Pn = "transaction() expects an array of queries, or a function returning an array of queries", tc = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Us(r) {
  return r instanceof J ? "\\x" + Os(r) : r;
}
g(Us, "encodeBuffersAsBytea");
function Cr(r) {
  let { query: e, params: t } = r instanceof Ms ? r.toParameterizedQuery() : r;
  return { query: e, params: t.map((n) => Us((0, ec.prepareValue)(n))) };
}
g(Cr, "prepareQuery");
function rt(r, {
  arrayMode: e,
  fullResults: t,
  fetchOptions: n,
  isolationLevel: i,
  readOnly: s,
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
    return new Bt(f, new Ms(w, S));
  }
  g(c, "templateFn"), c.query = (w, S, E) => new Bt(f, { query: w, params: S ?? [] }, E), c.unsafe = (w) => new Qs(w), c.transaction = async (w, S) => {
    if (typeof w == "function" && (w = w(c)), !Array.isArray(w))
      throw new Error(Pn);
    w.forEach((B) => {
      if (!(B instanceof Bt))
        throw new Error(
          Pn
        );
    });
    let E = w.map((B) => B.queryData), _ = w.map((B) => B.opts ?? {});
    return f(E, _, S);
  };
  async function f(w, S, E) {
    let {
      fetchEndpoint: _,
      fetchFunction: B
    } = zt, $ = Array.isArray(w) ? { queries: w.map((K) => Cr(K)) } : Cr(w), P = n ?? {}, x = e ?? !1, A = t ?? !1, C = i, O = s, D = u;
    E !== void 0 && (E.fetchOptions !== void 0 && (P = { ...P, ...E.fetchOptions }), E.arrayMode !== void 0 && (x = E.arrayMode), E.fullResults !== void 0 && (A = E.fullResults), E.isolationLevel !== void 0 && (C = E.isolationLevel), E.readOnly !== void 0 && (O = E.readOnly), E.deferrable !== void 0 && (D = E.deferrable)), S !== void 0 && !Array.isArray(S) && S.fetchOptions !== void 0 && (P = { ...P, ...S.fetchOptions });
    let F = o;
    !Array.isArray(S) && S?.authToken !== void 0 && (F = S.authToken);
    let U = typeof _ == "function" ? _(b, y, { jwtAuth: F !== void 0 }) : _, R = {
      "Neon-Connection-String": r,
      "Neon-Raw-Text-Output": "true",
      "Neon-Array-Mode": "true"
    }, q = await zs(F);
    q && (R.Authorization = `Bearer ${q}`), Array.isArray(w) && (C !== void 0 && (R["Neon-Batch-Isolation-Level"] = C), O !== void 0 && (R["Neon-Batch-Read-Only"] = String(O)), D !== void 0 && (R["Neon-Batch-Deferrable"] = String(
      D
    )));
    let W;
    try {
      W = await (B ?? fetch)(U, { method: "POST", body: JSON.stringify($), headers: R, ...P });
    } catch (K) {
      let te = new Ze(`Error connecting to database: ${K}`);
      throw te.sourceError = K, te;
    }
    if (W.ok) {
      let K = await W.json();
      if (Array.isArray(w)) {
        let te = K.results;
        if (!Array.isArray(te))
          throw new Ze("Neon internal error: unexpected result format");
        return te.map((ne, be) => {
          let ae = S[be] ?? {}, pe = ae.arrayMode ?? x, ct = ae.fullResults ?? A;
          return _r(ne, { arrayMode: pe, fullResults: ct, types: ae.types });
        });
      } else {
        let te = S ?? {}, ne = te.arrayMode ?? x, be = te.fullResults ?? A;
        return _r(K, { arrayMode: ne, fullResults: be, types: te.types });
      }
    } else {
      let { status: K } = W;
      if (K === 400) {
        let te = await W.json(), ne = new Ze(te.message);
        for (let be of tc)
          ne[be] = te[be] ?? void 0;
        throw ne;
      } else {
        let te = await W.text();
        throw new Ze(`Server error (HTTP status ${K}): ${te}`);
      }
    }
  }
  return g(f, "execute"), c;
}
g(rt, "neon");
var js = class {
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
g(js, "NeonQueryPromise");
var Bt = js;
function _r(r, { arrayMode: e, fullResults: t, types: n }) {
  let i = new Zl.default(n), s = r.fields.map((h) => h.name), u = r.fields.map((h) => i.getTypeParser(h.dataTypeID)), o = e === !0 ? r.rows.map((h) => h.map((m, d) => m === null ? null : u[d](
    m
  ))) : r.rows.map((h) => Object.fromEntries(h.map((m, d) => [s[d], m === null ? null : u[d](m)])));
  return t ? (r.viaNeonFetch = !0, r.rowAsArray = e, r.rows = o, r._parsers = u, r._types = i, r) : o;
}
g(_r, "processQueryResult");
async function zs(r) {
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
g(zs, "getAuthToken");
V();
var rc = Ge(Jt());
V();
var nc = Ge(Jt()), Vs = class extends nc.Client {
  constructor(e) {
    super(e), this.config = e;
  }
  get neonConfig() {
    return this.connection.stream;
  }
  connect(e) {
    let { neonConfig: t } = this;
    t.forceDisablePgSSL && (this.ssl = this.connection.ssl = !1), this.ssl && t.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let n = typeof this.config != "string" && this.config?.host !== void 0 || typeof this.config != "string" && this.config?.connectionString !== void 0 || Z.env.PGHOST !== void 0, i = Z.env.USER ?? Z.env.USERNAME;
    if (!n && this.host === "localhost" && this.user === i && this.database === i && this.password === null)
      throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${i}, db: ${i}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let s = super.connect(e), u = t.pipelineTLS && this.ssl, o = t.pipelineConnect === "password";
    if (!u && !t.pipelineConnect)
      return s;
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
    return s;
  }
  async _handleAuthSASLContinue(e) {
    if (typeof crypto > "u" || crypto.subtle === void 0 || crypto.subtle.importKey === void 0)
      throw new Error("Cannot use SASL auth when `crypto.subtle` is not defined");
    let t = crypto.subtle, n = this.saslSession, i = this.password, s = e.data;
    if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s != "string")
      throw new Error("SASL: protocol error");
    let u = Object.fromEntries(s.split(",").map((te) => {
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
    let d = parseInt(m, 10), b = J.from(h, "base64"), y = new TextEncoder(), v = y.encode(i), c = await t.importKey("raw", v, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]), f = new Uint8Array(await t.sign("HMAC", c, J.concat([b, J.from([0, 0, 0, 1])]))), w = f;
    for (var S = 0; S < d - 1; S++)
      f = new Uint8Array(await t.sign(
        "HMAC",
        c,
        f
      )), w = J.from(w.map((te, ne) => w[ne] ^ f[ne]));
    let E = w, _ = await t.importKey("raw", E, { name: "HMAC", hash: {
      name: "SHA-256"
    } }, !1, ["sign"]), B = new Uint8Array(await t.sign("HMAC", _, y.encode("Client Key"))), $ = await t.digest("SHA-256", B), P = "n=*,r=" + n.clientNonce, x = "r=" + o + ",s=" + h + ",i=" + d, A = "c=biws,r=" + o, C = P + "," + x + "," + A, O = await t.importKey("raw", $, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]);
    var D = new Uint8Array(
      await t.sign("HMAC", O, y.encode(C))
    ), F = J.from(B.map((te, ne) => B[ne] ^ D[ne])), U = F.toString("base64");
    let R = await t.importKey("raw", E, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]), q = await t.sign("HMAC", R, y.encode(
      "Server Key"
    )), W = await t.importKey("raw", q, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]);
    var K = J.from(await t.sign("HMAC", W, y.encode(C)));
    n.message = "SASLResponse", n.serverSignature = K.toString("base64"), n.response = A + ",p=" + U, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
g(Vs, "NeonClient");
var sc = Vs;
Vt();
var ic = Ge(Fr());
function Ws(r, e) {
  if (e)
    return { callback: e, result: void 0 };
  let t, n, i = g(function(u, o) {
    u ? t(u) : n(o);
  }, "cb"), s = new r(function(u, o) {
    n = u, t = o;
  });
  return { callback: i, result: s };
}
g(Ws, "promisify");
var oc = class extends rc.Pool {
  constructor() {
    super(...arguments), Y(this, "Client", sc), Y(this, "hasFetchUnsupportedListeners", !1), Y(this, "addListener", this.on);
  }
  on(e, t) {
    return e !== "error" && (this.hasFetchUnsupportedListeners = !0), super.on(e, t);
  }
  query(e, t, n) {
    if (!zt.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof e == "function")
      return super.query(
        e,
        t,
        n
      );
    typeof t == "function" && (n = t, t = void 0);
    let i = Ws(this.Promise, n);
    n = i.callback;
    try {
      let s = new ic.default(
        this.options
      ), u = encodeURIComponent, o = encodeURI, h = `postgresql://${u(s.user)}:${u(s.password)}@${u(s.host)}/${o(s.database)}`, m = typeof e == "string" ? e : e.text, d = t ?? e.values ?? [];
      rt(h, { fullResults: !0, arrayMode: e.rowMode === "array" }).query(m, d, { types: e.types ?? this.options?.types }).then((b) => n(void 0, b)).catch((b) => n(
        b
      ));
    } catch (s) {
      n(s);
    }
    return i.result;
  }
};
g(oc, "NeonPool");
Vt();
var jr = Ge(Jt());
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
const xt = {
  arrayMode: !1,
  fullResults: !0
}, Tr = {
  arrayMode: !0,
  fullResults: !0
};
class ac extends Ou {
  constructor(e, t, n, i, s, u) {
    super(t), this.client = e, this.logger = n, this.fields = i, this._isResponseInArrayMode = s, this.customResultMapper = u, this.clientQuery = e.query ?? e;
  }
  static [L] = "NeonHttpPreparedQuery";
  clientQuery;
  /** @internal */
  async execute(e = {}, t = this.authToken) {
    const n = ur(this.query.params, e);
    this.logger.logQuery(this.query.sql, n);
    const { fields: i, clientQuery: s, query: u, customResultMapper: o } = this;
    if (!i && !o)
      return s(
        u.sql,
        n,
        t === void 0 ? xt : {
          ...xt,
          authToken: t
        }
      );
    const h = await s(
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
    return this.customResultMapper ? this.customResultMapper(t) : t.map((n) => ki(this.fields, n, this.joinsNotNullableMap));
  }
  all(e = {}) {
    const t = ur(this.query.params, e);
    return this.logger.logQuery(this.query.sql, t), this.clientQuery(
      this.query.sql,
      t,
      this.authToken === void 0 ? xt : {
        ...xt,
        authToken: this.authToken
      }
    ).then((n) => n.rows);
  }
  /** @internal */
  values(e = {}, t) {
    const n = ur(this.query.params, e);
    return this.logger.logQuery(this.query.sql, n), this.clientQuery(this.query.sql, n, { arrayMode: !0, fullResults: !0, authToken: t }).then((i) => i.rows);
  }
  /** @internal */
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}
class uc extends $u {
  constructor(e, t, n, i = {}) {
    super(t), this.client = e, this.schema = n, this.options = i, this.clientQuery = e.query ?? e, this.logger = i.logger ?? new Mi();
  }
  static [L] = "NeonHttpSession";
  clientQuery;
  logger;
  prepareQuery(e, t, n, i, s) {
    return new ac(
      this.client,
      e,
      this.logger,
      t,
      i,
      s
    );
  }
  async batch(e) {
    const t = [], n = [];
    for (const s of e) {
      const u = s._prepare(), o = u.getQuery();
      t.push(u), n.push(
        this.clientQuery(o.sql, o.params, {
          fullResults: !0,
          arrayMode: u.isResponseInArrayMode()
        })
      );
    }
    return (await this.client.transaction(n, Tr)).map((s, u) => t[u].mapResult(s, !0));
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
class lc {
  constructor(e, t, n = {}) {
    this.client = e, this.dialect = t, this.options = n, this.initMappers();
  }
  static [L] = "NeonHttpDriver";
  createSession(e) {
    return new uc(this.client, this.dialect, e, { logger: this.options.logger });
  }
  initMappers() {
    ve.setTypeParser(ve.builtins.TIMESTAMPTZ, (e) => e), ve.setTypeParser(ve.builtins.TIMESTAMP, (e) => e), ve.setTypeParser(ve.builtins.DATE, (e) => e), ve.setTypeParser(ve.builtins.INTERVAL, (e) => e), ve.setTypeParser(1231, (e) => e), ve.setTypeParser(1115, (e) => e), ve.setTypeParser(1185, (e) => e), ve.setTypeParser(1187, (e) => e), ve.setTypeParser(1182, (e) => e);
  }
}
function Qt(r, e, t, n) {
  return new Proxy(r, {
    get(i, s) {
      const u = i[s];
      return typeof u != "function" && (typeof u != "object" || u === null) ? u : n ? Qt(u, e, t) : s === "query" ? Qt(u, e, t, !0) : new Proxy(u, {
        apply(o, h, m) {
          const d = o.call(h, ...m);
          return typeof d == "object" && d !== null && "setToken" in d && typeof d.setToken == "function" && d.setToken(e), t(o, s, d);
        }
      });
    }
  });
}
class cc extends Bu {
  static [L] = "NeonHttpDatabase";
  $withAuth(e) {
    return this.authToken = e, Qt(this, e, (t, n, i) => n === "with" ? Qt(i, e, (s, u, o) => o) : i);
  }
  async batch(e) {
    return this.session.batch(e);
  }
}
function Ye(r, e = {}) {
  const t = new Lt({ casing: e.casing });
  let n;
  e.logger === !0 ? n = new Di() : e.logger !== !1 && (n = e.logger);
  let i;
  if (e.schema) {
    const h = uu(
      e.schema,
      fu
    );
    i = {
      fullSchema: e.schema,
      schema: h.tables,
      tableNamesMap: h.tableNamesMap
    };
  }
  const u = new lc(r, t, { logger: n }).createSession(i), o = new cc(
    t,
    u,
    i
  );
  return o.$client = r, o;
}
function Ar(...r) {
  if (typeof r[0] == "string") {
    const e = rt(r[0]);
    return Ye(e, r[1]);
  }
  if (Fi(r[0])) {
    const { connection: e, client: t, ...n } = r[0];
    if (t)
      return Ye(t, n);
    if (typeof e == "object") {
      const { connectionString: s, ...u } = e, o = rt(s, u);
      return Ye(o, n);
    }
    const i = rt(e);
    return Ye(i, n);
  }
  return Ye(r[0], r[1]);
}
((r) => {
  function e(t) {
    return Ye({}, t);
  }
  r.mock = e;
})(Ar || (Ar = {}));
function hc(r) {
  const e = rt(r.connectionString);
  return Ar({ client: e });
}
function En(r) {
  const e = Netlify.env.get("VITE_APP_URL"), t = Netlify.env.get("DATABASE_URL");
  if (r?.allowUndefined)
    return e || console.warn("[getEnv] missing VITE_APP_URL"), t || console.warn("[getEnv] missing DATABASE_URL"), {
      allowedOrigins: e || "",
      connectionString: t || ""
    };
  if (!e)
    throw Error("[getEnv] missing VITE_APP_URL");
  if (!t)
    throw Error("[getEnv] missing DATABASE_URL");
  return { allowedOrigins: e, connectionString: t };
}
const fc = (r) => `${r}T00:00:00.000Z`;
function dc({
  user: r,
  attempts: e,
  date: t
}) {
  return {
    id: r.uuid,
    attempts: (e || []).map((n) => ({
      value: n.value,
      feedback: n.feedback
    })),
    date: fc(t)
  };
}
const Gs = (r) => ({
  "Access-Control-Allow-Origin": r.allowedOrigins,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}), pc = (r) => ({
  ...Gs(r),
  "Content-Type": "application/json"
});
function gr(r, e) {
  const { data: t, env: n } = e, i = Gs(n), s = pc(n);
  return r === "options" ? new Response(null, {
    status: 204,
    headers: i
  }) : r === "data" && t !== void 0 ? new Response(JSON.stringify(t), {
    status: 200,
    headers: s
  }) : (r === "data" && t === void 0 && console.error("data is missing"), r === "conflict" ? new Response("Conflict", {
    status: 409,
    headers: s
  }) : (r !== "error" && console.error(`invalid key '${r}'`), new Response("Internal Server Error", {
    status: 500,
    headers: s
  })));
}
var gc = Object.defineProperty, G = (r, e) => gc(r, "name", { value: e, configurable: !0 }), nt = class {
  type = 3;
  name = "";
  prefix = "";
  value = "";
  suffix = "";
  modifier = 3;
  constructor(r, e, t, n, i, s) {
    this.type = r, this.name = e, this.prefix = t, this.value = n, this.suffix = i, this.modifier = s;
  }
  hasCustomName() {
    return this.name !== "" && typeof this.name != "number";
  }
};
G(nt, "Part");
var mc = /[$_\p{ID_Start}]/u, yc = /[$_\u200C\u200D\p{ID_Continue}]/u, xr = ".*";
function Hs(r, e) {
  return (e ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(r);
}
G(Hs, "isASCII");
function zr(r, e = !1) {
  let t = [], n = 0;
  for (; n < r.length; ) {
    let i = r[n], s = G(function(u) {
      if (!e)
        throw new TypeError(u);
      t.push({ type: "INVALID_CHAR", index: n, value: r[n++] });
    }, "ErrorOrInvalid");
    if (i === "*") {
      t.push({ type: "ASTERISK", index: n, value: r[n++] });
      continue;
    }
    if (i === "+" || i === "?") {
      t.push({ type: "OTHER_MODIFIER", index: n, value: r[n++] });
      continue;
    }
    if (i === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: n++, value: r[n++] });
      continue;
    }
    if (i === "{") {
      t.push({ type: "OPEN", index: n, value: r[n++] });
      continue;
    }
    if (i === "}") {
      t.push({ type: "CLOSE", index: n, value: r[n++] });
      continue;
    }
    if (i === ":") {
      let u = "", o = n + 1;
      for (; o < r.length; ) {
        let h = r.substr(o, 1);
        if (o === n + 1 && mc.test(h) || o !== n + 1 && yc.test(h)) {
          u += r[o++];
          continue;
        }
        break;
      }
      if (!u) {
        s(`Missing parameter name at ${n}`);
        continue;
      }
      t.push({ type: "NAME", index: n, value: u }), n = o;
      continue;
    }
    if (i === "(") {
      let u = 1, o = "", h = n + 1, m = !1;
      if (r[h] === "?") {
        s(`Pattern cannot start with "?" at ${h}`);
        continue;
      }
      for (; h < r.length; ) {
        if (!Hs(r[h], !1)) {
          s(`Invalid character '${r[h]}' at ${h}.`), m = !0;
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
          s(`Capturing groups are not allowed at ${h}`), m = !0;
          break;
        }
        o += r[h++];
      }
      if (m)
        continue;
      if (u) {
        s(`Unbalanced pattern at ${n}`);
        continue;
      }
      if (!o) {
        s(`Missing pattern at ${n}`);
        continue;
      }
      t.push({ type: "REGEX", index: n, value: o }), n = h;
      continue;
    }
    t.push({ type: "CHAR", index: n, value: r[n++] });
  }
  return t.push({ type: "END", index: n, value: "" }), t;
}
G(zr, "lexer");
function Vr(r, e = {}) {
  let t = zr(r);
  e.delimiter ??= "/#?", e.prefixes ??= "./";
  let n = `[^${Se(e.delimiter)}]+?`, i = [], s = 0, u = 0, o = /* @__PURE__ */ new Set(), h = G((E) => {
    if (u < t.length && t[u].type === E)
      return t[u++].value;
  }, "tryConsume"), m = G(() => h("OTHER_MODIFIER") ?? h("ASTERISK"), "tryConsumeModifier"), d = G((E) => {
    let _ = h(E);
    if (_ !== void 0)
      return _;
    let { type: B, index: $ } = t[u];
    throw new TypeError(`Unexpected ${B} at ${$}, expected ${E}`);
  }, "mustConsume"), b = G(() => {
    let E = "", _;
    for (; _ = h("CHAR") ?? h("ESCAPED_CHAR"); )
      E += _;
    return E;
  }, "consumeText"), y = G((E) => E, "DefaultEncodePart"), v = e.encodePart || y, c = "", f = G((E) => {
    c += E;
  }, "appendToPendingFixedValue"), w = G(() => {
    c.length && (i.push(new nt(3, "", "", v(c), "", 3)), c = "");
  }, "maybeAddPartFromPendingFixedValue"), S = G((E, _, B, $, P) => {
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
    if (!_ && !B && x === 3) {
      f(E);
      return;
    }
    if (w(), !_ && !B) {
      if (!E)
        return;
      i.push(new nt(3, "", "", v(E), "", x));
      return;
    }
    let A;
    B ? B === "*" ? A = xr : A = B : A = n;
    let C = 2;
    A === n ? (C = 1, A = "") : A === xr && (C = 0, A = "");
    let O;
    if (_ ? O = _ : B && (O = s++), o.has(O))
      throw new TypeError(`Duplicate name '${O}'.`);
    o.add(O), i.push(new nt(C, O, v(E), A, v($), x));
  }, "addPart");
  for (; u < t.length; ) {
    let E = h("CHAR"), _ = h("NAME"), B = h("REGEX");
    if (!_ && !B && (B = h("ASTERISK")), _ || B) {
      let P = E ?? "";
      e.prefixes.indexOf(P) === -1 && (f(P), P = ""), w();
      let x = m();
      S(P, _, B, "", x);
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
      let C = b();
      d("CLOSE");
      let O = m();
      S(P, x, A, C, O);
      continue;
    }
    w(), d("END");
  }
  return i;
}
G(Vr, "parse");
function Se(r) {
  return r.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
G(Se, "escapeString");
function Ir(r) {
  return r && r.ignoreCase ? "ui" : "u";
}
G(Ir, "flags");
function Ks(r, e, t) {
  return Wr(Vr(r, t), e, t);
}
G(Ks, "stringToRegexp");
function Fe(r) {
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
G(Fe, "modifierToString");
function Wr(r, e, t = {}) {
  t.delimiter ??= "/#?", t.prefixes ??= "./", t.sensitive ??= !1, t.strict ??= !1, t.end ??= !0, t.start ??= !0, t.endsWith = "";
  let n = t.start ? "^" : "";
  for (let o of r) {
    if (o.type === 3) {
      o.modifier === 3 ? n += Se(o.value) : n += `(?:${Se(o.value)})${Fe(o.modifier)}`;
      continue;
    }
    e && e.push(o.name);
    let h = `[^${Se(t.delimiter)}]+?`, m = o.value;
    if (o.type === 1 ? m = h : o.type === 0 && (m = xr), !o.prefix.length && !o.suffix.length) {
      o.modifier === 3 || o.modifier === 1 ? n += `(${m})${Fe(o.modifier)}` : n += `((?:${m})${Fe(o.modifier)})`;
      continue;
    }
    if (o.modifier === 3 || o.modifier === 1) {
      n += `(?:${Se(o.prefix)}(${m})${Se(o.suffix)})`, n += Fe(o.modifier);
      continue;
    }
    n += `(?:${Se(o.prefix)}`, n += `((?:${m})(?:`, n += Se(o.suffix), n += Se(o.prefix), n += `(?:${m}))*)${Se(o.suffix)})`, o.modifier === 0 && (n += "?");
  }
  let i = `[${Se(t.endsWith)}]|$`, s = `[${Se(t.delimiter)}]`;
  if (t.end)
    return t.strict || (n += `${s}?`), t.endsWith.length ? n += `(?=${i})` : n += "$", new RegExp(n, Ir(t));
  t.strict || (n += `(?:${s}(?=${i}))?`);
  let u = !1;
  if (r.length) {
    let o = r[r.length - 1];
    o.type === 3 && o.modifier === 3 && (u = t.delimiter.indexOf(o) > -1);
  }
  return u || (n += `(?=${s}|${i})`), new RegExp(n, Ir(t));
}
G(Wr, "partsToRegexp");
var De = { delimiter: "", prefixes: "", sensitive: !0, strict: !0 }, wc = { delimiter: ".", prefixes: "", sensitive: !0, strict: !0 }, bc = { delimiter: "/", prefixes: "/", sensitive: !0, strict: !0 };
function Js(r, e) {
  return r.length ? r[0] === "/" ? !0 : !e || r.length < 2 ? !1 : (r[0] == "\\" || r[0] == "{") && r[1] == "/" : !1;
}
G(Js, "isAbsolutePathname");
function Gr(r, e) {
  return r.startsWith(e) ? r.substring(e.length, r.length) : r;
}
G(Gr, "maybeStripPrefix");
function Ys(r, e) {
  return r.endsWith(e) ? r.substr(0, r.length - e.length) : r;
}
G(Ys, "maybeStripSuffix");
function Hr(r) {
  return !r || r.length < 2 ? !1 : r[0] === "[" || (r[0] === "\\" || r[0] === "{") && r[1] === "[";
}
G(Hr, "treatAsIPv6Hostname");
var Xs = ["ftp", "file", "http", "https", "ws", "wss"];
function Kr(r) {
  if (!r)
    return !0;
  for (let e of Xs)
    if (r.test(e))
      return !0;
  return !1;
}
G(Kr, "isSpecialScheme");
function Zs(r, e) {
  if (r = Gr(r, "#"), e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.hash = r, t.hash ? t.hash.substring(1, t.hash.length) : "";
}
G(Zs, "canonicalizeHash");
function ei(r, e) {
  if (r = Gr(r, "?"), e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.search = r, t.search ? t.search.substring(1, t.search.length) : "";
}
G(ei, "canonicalizeSearch");
function ti(r, e) {
  return e || r === "" ? r : Hr(r) ? Xr(r) : Yr(r);
}
G(ti, "canonicalizeHostname");
function ri(r, e) {
  if (e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.password = r, t.password;
}
G(ri, "canonicalizePassword");
function ni(r, e) {
  if (e || r === "")
    return r;
  let t = new URL("https://example.com");
  return t.username = r, t.username;
}
G(ni, "canonicalizeUsername");
function si(r, e, t) {
  if (t || r === "")
    return r;
  if (e && !Xs.includes(e))
    return new URL(`${e}:${r}`).pathname;
  let n = r[0] == "/";
  return r = new URL(n ? r : "/-" + r, "https://example.com").pathname, n || (r = r.substring(2, r.length)), r;
}
G(si, "canonicalizePathname");
function ii(r, e, t) {
  return Jr(e) === r && (r = ""), t || r === "" ? r : Zr(r);
}
G(ii, "canonicalizePort");
function oi(r, e) {
  return r = Ys(r, ":"), e || r === "" ? r : Yt(r);
}
G(oi, "canonicalizeProtocol");
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
G(Jr, "defaultPortForProtocol");
function Yt(r) {
  if (r === "")
    return r;
  if (/^[-+.A-Za-z0-9]*$/.test(r))
    return r.toLowerCase();
  throw new TypeError(`Invalid protocol '${r}'.`);
}
G(Yt, "protocolEncodeCallback");
function ai(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.username = r, e.username;
}
G(ai, "usernameEncodeCallback");
function ui(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.password = r, e.password;
}
G(ui, "passwordEncodeCallback");
function Yr(r) {
  if (r === "")
    return r;
  if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(r))
    throw new TypeError(`Invalid hostname '${r}'`);
  let e = new URL("https://example.com");
  return e.hostname = r, e.hostname;
}
G(Yr, "hostnameEncodeCallback");
function Xr(r) {
  if (r === "")
    return r;
  if (/[^0-9a-fA-F[\]:]/g.test(r))
    throw new TypeError(`Invalid IPv6 hostname '${r}'`);
  return r.toLowerCase();
}
G(Xr, "ipv6HostnameEncodeCallback");
function Zr(r) {
  if (r === "" || /^[0-9]*$/.test(r) && parseInt(r) <= 65535)
    return r;
  throw new TypeError(`Invalid port '${r}'.`);
}
G(Zr, "portEncodeCallback");
function li(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.pathname = r[0] !== "/" ? "/-" + r : r, r[0] !== "/" ? e.pathname.substring(2, e.pathname.length) : e.pathname;
}
G(li, "standardURLPathnameEncodeCallback");
function ci(r) {
  return r === "" ? r : new URL(`data:${r}`).pathname;
}
G(ci, "pathURLPathnameEncodeCallback");
function hi(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.search = r, e.search.substring(1, e.search.length);
}
G(hi, "searchEncodeCallback");
function fi(r) {
  if (r === "")
    return r;
  let e = new URL("https://example.com");
  return e.hash = r, e.hash.substring(1, e.hash.length);
}
G(fi, "hashEncodeCallback");
var di = class {
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
      if (this.#_()) {
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
          this.#A() ? this.#p += 1 : this.#x() && (this.#p -= 1), this.#C() && !this.#p ? this.#r(6, 1) : this.#w() ? this.#r(7, 0) : this.#h() ? this.#r(8, 1) : this.#c() && this.#r(9, 1);
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
  #C() {
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
  #_() {
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
    Object.assign(r, De), r.encodePart = Yt;
    let e = Ks(this.#u(), void 0, r);
    this.#g = Kr(e);
  }
};
G(di, "Parser");
var mr = ["protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"], $e = "*";
function Nr(r, e) {
  if (typeof r != "string")
    throw new TypeError("parameter 1 is not of type 'string'.");
  let t = new URL(r, e);
  return { protocol: t.protocol.substring(0, t.protocol.length - 1), username: t.username, password: t.password, hostname: t.hostname, port: t.port, pathname: t.pathname, search: t.search !== "" ? t.search.substring(1, t.search.length) : void 0, hash: t.hash !== "" ? t.hash.substring(1, t.hash.length) : void 0 };
}
G(Nr, "extractValues");
function Ie(r, e) {
  return e ? et(r) : r;
}
G(Ie, "processBaseURLString");
function Xe(r, e, t) {
  let n;
  if (typeof e.baseURL == "string")
    try {
      n = new URL(e.baseURL), e.protocol === void 0 && (r.protocol = Ie(n.protocol.substring(0, n.protocol.length - 1), t)), !t && e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.username === void 0 && (r.username = Ie(n.username, t)), !t && e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.username === void 0 && e.password === void 0 && (r.password = Ie(n.password, t)), e.protocol === void 0 && e.hostname === void 0 && (r.hostname = Ie(n.hostname, t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && (r.port = Ie(n.port, t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.pathname === void 0 && (r.pathname = Ie(n.pathname, t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.pathname === void 0 && e.search === void 0 && (r.search = Ie(n.search.substring(1, n.search.length), t)), e.protocol === void 0 && e.hostname === void 0 && e.port === void 0 && e.pathname === void 0 && e.search === void 0 && e.hash === void 0 && (r.hash = Ie(n.hash.substring(1, n.hash.length), t));
    } catch {
      throw new TypeError(`invalid baseURL '${e.baseURL}'.`);
    }
  if (typeof e.protocol == "string" && (r.protocol = oi(e.protocol, t)), typeof e.username == "string" && (r.username = ni(e.username, t)), typeof e.password == "string" && (r.password = ri(e.password, t)), typeof e.hostname == "string" && (r.hostname = ti(e.hostname, t)), typeof e.port == "string" && (r.port = ii(e.port, r.protocol, t)), typeof e.pathname == "string") {
    if (r.pathname = e.pathname, n && !Js(r.pathname, t)) {
      let i = n.pathname.lastIndexOf("/");
      i >= 0 && (r.pathname = Ie(n.pathname.substring(0, i + 1), t) + r.pathname);
    }
    r.pathname = si(r.pathname, r.protocol, t);
  }
  return typeof e.search == "string" && (r.search = ei(e.search, t)), typeof e.hash == "string" && (r.hash = Zs(e.hash, t)), r;
}
G(Xe, "applyInit");
function et(r) {
  return r.replace(/([+*?:{}()\\])/g, "\\$1");
}
G(et, "escapePatternString");
function pi(r) {
  return r.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
G(pi, "escapeRegexpString");
function gi(r, e) {
  e.delimiter ??= "/#?", e.prefixes ??= "./", e.sensitive ??= !1, e.strict ??= !1, e.end ??= !0, e.start ??= !0, e.endsWith = "";
  let t = ".*", n = `[^${pi(e.delimiter)}]+?`, i = /[$_\u200C\u200D\p{ID_Continue}]/u, s = "";
  for (let u = 0; u < r.length; ++u) {
    let o = r[u];
    if (o.type === 3) {
      if (o.modifier === 3) {
        s += et(o.value);
        continue;
      }
      s += `{${et(o.value)}}${Fe(o.modifier)}`;
      continue;
    }
    let h = o.hasCustomName(), m = !!o.suffix.length || !!o.prefix.length && (o.prefix.length !== 1 || !e.prefixes.includes(o.prefix)), d = u > 0 ? r[u - 1] : null, b = u < r.length - 1 ? r[u + 1] : null;
    if (!m && h && o.type === 1 && o.modifier === 3 && b && !b.prefix.length && !b.suffix.length)
      if (b.type === 3) {
        let y = b.value.length > 0 ? b.value[0] : "";
        m = i.test(y);
      } else
        m = !b.hasCustomName();
    if (!m && !o.prefix.length && d && d.type === 3) {
      let y = d.value[d.value.length - 1];
      m = e.prefixes.includes(y);
    }
    m && (s += "{"), s += et(o.prefix), h && (s += `:${o.name}`), o.type === 2 ? s += `(${o.value})` : o.type === 1 ? h || (s += `(${n})`) : o.type === 0 && (!h && (!d || d.type === 3 || d.modifier !== 3 || m || o.prefix !== "") ? s += "*" : s += `(${t})`), o.type === 1 && h && o.suffix.length && i.test(o.suffix[0]) && (s += "\\"), s += et(o.suffix), m && (s += "}"), o.modifier !== 3 && (s += Fe(o.modifier));
  }
  return s;
}
G(gi, "partsToPattern");
var mi = class {
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
        let o = new di(r);
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
      let i = { ignoreCase: t.ignoreCase === !0 }, s = { pathname: $e, protocol: $e, username: $e, password: $e, hostname: $e, port: $e, search: $e, hash: $e };
      this.#i = Xe(s, r, !0), Jr(this.#i.protocol) === this.#i.port && (this.#i.port = "");
      let u;
      for (u of mr) {
        if (!(u in this.#i))
          continue;
        let o = {}, h = this.#i[u];
        switch (this.#t[u] = [], u) {
          case "protocol":
            Object.assign(o, De), o.encodePart = Yt;
            break;
          case "username":
            Object.assign(o, De), o.encodePart = ai;
            break;
          case "password":
            Object.assign(o, De), o.encodePart = ui;
            break;
          case "hostname":
            Object.assign(o, wc), Hr(h) ? o.encodePart = Xr : o.encodePart = Yr;
            break;
          case "port":
            Object.assign(o, De), o.encodePart = Zr;
            break;
          case "pathname":
            Kr(this.#n.protocol) ? (Object.assign(o, bc, i), o.encodePart = li) : (Object.assign(o, De, i), o.encodePart = ci);
            break;
          case "search":
            Object.assign(o, De, i), o.encodePart = hi;
            break;
          case "hash":
            Object.assign(o, De, i), o.encodePart = fi;
            break;
        }
        try {
          this.#s[u] = Vr(h, o), this.#n[u] = Wr(this.#s[u], this.#t[u], o), this.#e[u] = gi(this.#s[u], o), this.#l = this.#l || this.#s[u].some((m) => m.type === 2);
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
    let i;
    for (i of mr) {
      let s = this.#n[i].exec(t[i]);
      if (!s)
        return null;
      let u = {};
      for (let [o, h] of this.#t[i].entries())
        if (typeof h == "string" || typeof h == "number") {
          let m = s[o + 1];
          u[h] = m;
        }
      n[i] = { input: t[i] ?? "", groups: u };
    }
    return n;
  }
  static compareComponent(r, e, t) {
    let n = G((o, h) => {
      for (let m of ["type", "modifier", "prefix", "value", "suffix"]) {
        if (o[m] < h[m])
          return -1;
        if (o[m] !== h[m])
          return 1;
      }
      return 0;
    }, "comparePart"), i = new nt(3, "", "", "", "", 3), s = new nt(0, "", "", "", "", 3), u = G((o, h) => {
      let m = 0;
      for (; m < Math.min(o.length, h.length); ++m) {
        let d = n(o[m], h[m]);
        if (d)
          return d;
      }
      return o.length === h.length ? 0 : n(o[m] ?? i, h[m] ?? i);
    }, "comparePartList");
    return !e.#e[r] && !t.#e[r] ? 0 : e.#e[r] && !t.#e[r] ? u(e.#s[r], [s]) : !e.#e[r] && t.#e[r] ? u([s], t.#s[r]) : u(e.#s[r], t.#s[r]);
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
G(mi, "URLPattern");
globalThis.URLPattern || (globalThis.URLPattern = mi);
async function Jc(r) {
  try {
    const e = En();
    if (r.method === "OPTIONS")
      return gr("options", { env: e });
    const t = hc(e), s = new URLPattern({ pathname: "/game/:id" }).exec(r.url)?.pathname.groups?.id;
    if (!s)
      throw Error("missing id");
    const u = await nl({ db: t, id: s }), o = dc(u);
    return gr("data", {
      env: e,
      data: o
    });
  } catch (e) {
    console.error("Unexpected error in /game/:id", e);
    const t = En({ allowUndefined: !0 });
    return gr("error", { env: t });
  }
}
export {
  Jc as default
};
