import { prisma } from "../../database/client";
import { AppError } from "../../common/errors/AppError";
import { activityLogRepository } from "./activity-log.repository";
import type { CreateActivityLogDto } from "./activity-log.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { Filter } from "../../common/utils/filter";
import { ActivityLog } from "@prisma/client";

export class ActivityLogService {
  async getAllActivityLogs(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate((args) => activityLogRepository.findMany(), {
      cursor: query.cursor,
      limit: query.limit ? parseInt(query.limit) : undefined,
    });
  }

  async getActivityLogById(id: string) {
    const log = await activityLogRepository.findById(id);

    if (!log) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Activity log not found",
      });
    }

    return log;
  }

  async getActivityLogsByBusinessId(businessId: string) {
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

    return activityLogRepository.findByBusinessId(businessId);
  }

  async createActivityLog(data: CreateActivityLogDto) {
    // If businessId provided, verify it exists
    if (data.businessId) {
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
    }

    return activityLogRepository.create(data);
  }

  async deleteActivityLog(id: string) {
    await this.getActivityLogById(id);
    await activityLogRepository.delete(id);
  }

  async searchActivityLogs(query: {
    q?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Search.search<ActivityLog>(
      (args) => activityLogRepository.search(args),
      {
        searchTerm: query.q || "",
        exactFields: ["action", "channel"],
        containsFields: ["message"],
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }

  async filterActivityLogs(query: {
    businessId?: string;
    channel?: string;
    level?: string;
    status?: string;
    action?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Filter.filter<ActivityLog>(
      (args) => activityLogRepository.filter(args),
      {
        filters: {
          businessId: query.businessId,
          channel: query.channel,
          level: query.level,
          status: query.status,
          action: query.action,
          createdAtFrom: query.createdAtFrom,
          createdAtTo: query.createdAtTo,
        },
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }
}

export const activityLogService = new ActivityLogService();