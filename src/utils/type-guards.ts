export const isString = (value?: unknown): value is string => {
  if (!value) return false;
  if (typeof value !== 'string') return false;
  return true;
};

export const isObject = (
  value?: unknown,
): value is { [key: PropertyKey]: unknown } => {
  if (!value) return false;
  if (typeof value !== 'object') return false;
  return true;
};
