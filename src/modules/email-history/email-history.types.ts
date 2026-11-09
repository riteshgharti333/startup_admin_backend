import type { MessageLogStatus } from "@prisma/client";

export interface CreateEmailHistoryDto {
  businessId: string;
  recipient: string;
  subject: string;
  body: string;
  status?: MessageLogStatus;
  providerMessageId?: string | null;
  errorMessage?: string | null;
  sentAt?: Date | null;
}

export interface UpdateEmailHistoryDto {
  status?: MessageLogStatus;
  providerMessageId?: string | null;
  errorMessage?: string | null;
  sentAt?: Date | null;
}