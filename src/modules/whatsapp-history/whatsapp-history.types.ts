import type { MessageLogStatus } from "@prisma/client";

export interface CreateWhatsAppHistoryDto {
  businessId: string;
  recipient: string;
  message: string;
  templateName?: string | null;
  status?: MessageLogStatus;
  providerMessageId?: string | null;
  errorMessage?: string | null;
  sentAt?: Date | null;
  deliveredAt?: Date | null;
  readAt?: Date | null;
}

export interface UpdateWhatsAppHistoryDto {
  status?: MessageLogStatus;
  providerMessageId?: string | null;
  errorMessage?: string | null;
  sentAt?: Date | null;
  deliveredAt?: Date | null;
  readAt?: Date | null;
}