import type { MessageChannel, MessageLogStatus, LogLevel } from "@prisma/client";

export interface CreateActivityLogDto {
  businessId?: string | null;
  channel: MessageChannel;
  level?: LogLevel;
  action: string;
  status?: MessageLogStatus | null;
  message?: string | null;
  details?: Record<string, unknown> | null;
}