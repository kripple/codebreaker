/* eslint-disable @typescript-eslint/consistent-type-imports */

declare type ReactNode = import('@/types/external').ReactNode;

// declare type SetValue = import('@/types/imported').ControlProps['onChange'];

// declare type Form = import('@/types/form').Form;

declare type FormEvent =
  import('@/types/external').ReactFormEvent<HTMLFormElement>;

declare type ChangeEvent =
  import('@/types/external').ReactChangeEvent<HTMLInputElement>;

declare type ClickEvent = import('@/types/external').ReactMouseEvent<
  HTMLInputElement,
  MouseEvent
>;
