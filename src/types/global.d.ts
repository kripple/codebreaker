/* eslint-disable @typescript-eslint/consistent-type-imports */

declare type ReactNode = import('@/types/imported').ReactNode;

// declare type SetValue = import('@/types/imported').ControlProps['onChange'];

// declare type Form = import('@/types/form').Form;

declare type FormEvent =
  import('@/types/imported').ReactFormEvent<HTMLFormElement>;

declare type ChangeEvent =
  import('@/types/imported').ReactChangeEvent<HTMLInputElement>;

declare type ClickEvent = import('@/types/imported').ReactMouseEvent<
  HTMLInputElement,
  MouseEvent
>;
