export function HiddenInput({
  name,
  value,
}: {
  name: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <input
      aria-hidden
      hidden
      name={name}
      readOnly
      style={{ display: 'none' }}
      value={value}
    ></input>
  );
}
