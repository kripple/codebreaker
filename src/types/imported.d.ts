declare type ReactNode = import('@/types/react').ReactNode;

declare type FormEvent =
  import('@/types/react').ReactFormEvent<HTMLFormElement>;

declare type ChangeEvent =
  import('@/types/react').ReactChangeEvent<HTMLInputElement>;

declare type ClickEvent = import('@/types/react').ReactMouseEvent<
  HTMLInputElement,
  MouseEvent
>;

declare type SetState<T> = import('@/types/react').SetState<T>;
