import { prisma } from "../../database/client";
import { AppError } from "../../common/errors/AppError";
import { whatsappHistoryRepository } from "./whatsapp-history.repository";
import type {
  CreateWhatsAppHistoryDto,
  UpdateWhatsAppHistoryDto,
} from "./whatsapp-history.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { Filter } from "../../common/utils/filter";
import { WhatsAppHistory } from "@prisma/client";

export class WhatsAppHistoryService {
  async getAllWhatsAppHistory(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate(
      (args) => whatsappHistoryRepository.findMany(),
      {
        cursor: query.cursor,
        limit: query.limit ? parseInt(query.limit) : undefined,
      },
    );
  }

  async getWhatsAppHistoryById(id: string) {
    const record = await whatsappHistoryRepository.findById(id);

    if (!record) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "WhatsApp history record not found",
      });
    }

    return record;
  }

  async getWhatsAppHistoryByBusinessId(businessId: string) {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { id: true },
    });

    if (!business) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Business not found",
      });
    }

    return whatsappHistoryRepository.findByBusinessId(businessId);
  }

  async createWhatsAppHistory(data: CreateWhatsAppHistoryDto) {
    // Verify business exists
    const business = await prisma.business.findUnique({
      where: { id: data.businessId },
      select: { id: true, whatsappOptIn: true },
    });

    if (!business) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Business not found",
      });
    }

    // Warn if not opted in
    if (!business.whatsappOptIn) {
      throw new AppError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message:
          "Business has not opted in to WhatsApp messages — cannot log send",
      });
    }

    return whatsappHistoryRepository.create(data);
  }

  async updateWhatsAppHistory(id: string, data: UpdateWhatsAppHistoryDto) {
    await this.getWhatsAppHistoryById(id);
    return whatsappHistoryRepository.update(id, data);
  }

  async deleteWhatsAppHistory(id: string) {
    await this.getWhatsAppHistoryById(id);
    await whatsappHistoryRepository.delete(id);
  }

  async searchWhatsAppHistory(query: {
    q?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Search.search<WhatsAppHistory>(
      (args) => whatsappHistoryRepository.search(args),
      {
        searchTerm: query.q || "",
        exactFields: ["recipient", "providerMessageId", "templateName"],
        containsFields: ["message"],
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }

  async filterWhatsAppHistory(query: {
    businessId?: string;
    status?: string;
    templateName?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Filter.filter<WhatsAppHistory>(
      (args) => whatsappHistoryRepository.filter(args),
      {
        filters: {
          businessId: query.businessId,
          status: query.status,
          templateName: query.templateName,
          createdAtFrom: query.createdAtFrom,
          createdAtTo: query.createdAtTo,
        },
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }
}

export const whatsappHistoryService = new WhatsAppHistoryService();