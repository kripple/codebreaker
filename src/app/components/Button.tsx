import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  className,
  locked,
  tabIndex,
  disabled,
  ...props
}: ButtonProps & { locked?: boolean }) {
  const classes = [
    className,
    locked && `locked`,
    disabled && `disabled`,
  ].filter(Boolean);
  const buttonClass = classes.length > 0 ? classes.join(' ') : undefined;
  const buttonTabIndex = disabled || locked ? undefined : 0;
  return (
    <button
      data-style="button"
      {...props}
      className={buttonClass}
      disabled={disabled}
      tabIndex={buttonTabIndex}
    />
  );
}
