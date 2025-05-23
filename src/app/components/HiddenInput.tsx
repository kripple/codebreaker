export function HiddenInput({
  name,
  value,
}: {
  name: string;
  value?: string | null;
}) {
  return (
    <input
      aria-hidden
      hidden
      name={name}
      readOnly
      style={{ display: 'none' }}
      value={value ? value : undefined}
    ></input>
  );
}
