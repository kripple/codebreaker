import type { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export function Label({
  className,
  locked,
  tabIndex,
  disabled,
  ...props
}: LabelProps & { disabled?: boolean; locked?: boolean }) {
  const classes = [
    className,
    locked && `locked`,
    disabled && 'disabled',
  ].filter(Boolean);
  const buttonClass = classes.length > 0 ? classes.join(' ') : undefined;
  const buttonTabIndex = disabled || locked ? undefined : 0;
  return (
    <label
      data-style="button"
      {...props}
      className={buttonClass}
      tabIndex={buttonTabIndex}
    />
  );
}
