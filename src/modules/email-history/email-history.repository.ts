import { prisma } from "../../database/client";
import {
  CreateEmailHistoryDto,
  UpdateEmailHistoryDto,
} from "./email-history.types";

export class EmailHistoryRepository {
  async findMany() {
    return prisma.emailHistory.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.emailHistory.findUnique({
      where: { id },
      include: {
        business: {
          select: { id: true, businessName: true, email: true },
        },
      },
    });
  }

  async findByBusinessId(businessId: string) {
    return prisma.emailHistory.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: CreateEmailHistoryDto) {
    return prisma.emailHistory.create({
      data,
    });
  }

  async update(id: string, data: UpdateEmailHistoryDto) {
    return prisma.emailHistory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.emailHistory.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.emailHistory.count();
  }

  async search(args: any) {
    return prisma.emailHistory.findMany(args);
  }

  async filter(args: any) {
    return prisma.emailHistory.findMany(args);
  }
}

export const emailHistoryRepository = new EmailHistoryRepository();