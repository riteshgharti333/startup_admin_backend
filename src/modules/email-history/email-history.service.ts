import { prisma } from "../../database/client";
import { AppError } from "../../common/errors/AppError";
import { emailHistoryRepository } from "./email-history.repository";
import type {
  CreateEmailHistoryDto,
  UpdateEmailHistoryDto,
} from "./email-history.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { Filter } from "../../common/utils/filter";
import { EmailHistory } from "@prisma/client";

export class EmailHistoryService {
  async getAllEmailHistory(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate((args) => emailHistoryRepository.findMany(), {
      cursor: query.cursor,
      limit: query.limit ? parseInt(query.limit) : undefined,
    });
  }

  async getEmailHistoryById(id: string) {
    const record = await emailHistoryRepository.findById(id);

    if (!record) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Email history record not found",
      });
    }

    return record;
  }

  async getEmailHistoryByBusinessId(businessId: string) {
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

    return emailHistoryRepository.findByBusinessId(businessId);
  }

  async createEmailHistory(data: CreateEmailHistoryDto) {
    // Verify business exists
    const business = await prisma.business.findUnique({
      where: { id: data.businessId },
      select: { id: true },
    });

    if (!business) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Business not found",
      });
    }

    return emailHistoryRepository.create(data);
  }

  async updateEmailHistory(id: string, data: UpdateEmailHistoryDto) {
    await this.getEmailHistoryById(id);
    return emailHistoryRepository.update(id, data);
  }

  async deleteEmailHistory(id: string) {
    await this.getEmailHistoryById(id);
    await emailHistoryRepository.delete(id);
  }

  async searchEmailHistory(query: {
    q?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Search.search<EmailHistory>(
      (args) => emailHistoryRepository.search(args),
      {
        searchTerm: query.q || "",
        exactFields: ["recipient", "providerMessageId"],
        containsFields: ["subject"],
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }

  async filterEmailHistory(query: {
    businessId?: string;
    status?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Filter.filter<EmailHistory>(
      (args) => emailHistoryRepository.filter(args),
      {
        filters: {
          businessId: query.businessId,
          status: query.status,
          createdAtFrom: query.createdAtFrom,
          createdAtTo: query.createdAtTo,
        },
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }
}

export const emailHistoryService = new EmailHistoryService();