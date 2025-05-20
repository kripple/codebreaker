-- Custom SQL migration file, put your code below! --
CREATE FUNCTION immutable_year(t timestamptz)
  RETURNS int
  IMMUTABLE
  LANGUAGE SQL
  AS $$
    SELECT EXTRACT(YEAR FROM t)::int;
  $$;
