CREATE FUNCTION immutable_date(t timestamptz)
  RETURNS date
  IMMUTABLE
  LANGUAGE SQL
  AS $$
    SELECT t::date;
  $$;
--> statement-breakpoint
CREATE FUNCTION immutable_year(t timestamptz)
  RETURNS int
  IMMUTABLE
  LANGUAGE SQL
  AS $$
    SELECT EXTRACT(YEAR FROM t)::int;
  $$;
