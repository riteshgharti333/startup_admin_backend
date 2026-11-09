import { Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { CreateActivityLogDto } from "./activity-log.types";

export class ActivityLogRepository {
  async findMany() {
    return prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        business: {
          select: { id: true, businessName: true },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.activityLog.findUnique({
      where: { id },
      include: {
        business: {
          select: { id: true, businessName: true },
        },
      },
    });
  }

  async findByBusinessId(businessId: string) {
    return prisma.activityLog.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: CreateActivityLogDto) {
    const payload: Prisma.ActivityLogUncheckedCreateInput = {
      channel: data.channel,
      level: data.level ?? "INFO",
      action: data.action,
      message: data.message ?? null,
      status: data.status ?? null,
      details: data.details
        ? (data.details as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    };

    if (data.businessId) {
      payload.businessId = data.businessId;
    }

    return prisma.activityLog.create({
      data: payload,
      include: {
        business: {
          select: { id: true, businessName: true },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.activityLog.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.activityLog.count();
  }

  async search(args: any) {
    return prisma.activityLog.findMany(args);
  }

  async filter(args: any) {
    return prisma.activityLog.findMany(args);
  }
}

export const activityLogRepository = new ActivityLogRepository();
