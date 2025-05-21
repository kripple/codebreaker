import type { ResponseData } from '@/api/helpers/replyWith';

export type Reply =
  | { data: ResponseData; error?: never }
  | { data?: never; error: unknown };

export type AttemptReply =
  | { id: string; error?: never }
  | { id?: never; error: unknown };
