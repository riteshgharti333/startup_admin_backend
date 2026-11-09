import { prisma } from "../../database/client";
import {
  CreateWhatsAppHistoryDto,
  UpdateWhatsAppHistoryDto,
} from "./whatsapp-history.types";

export class WhatsAppHistoryRepository {
  async findMany() {
    return prisma.whatsAppHistory.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.whatsAppHistory.findUnique({
      where: { id },
      include: {
        business: {
          select: { id: true, businessName: true, phoneNumber: true },
        },
      },
    });
  }

  async findByBusinessId(businessId: string) {
    return prisma.whatsAppHistory.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: CreateWhatsAppHistoryDto) {
    return prisma.whatsAppHistory.create({
      data,
    });
  }

  async update(id: string, data: UpdateWhatsAppHistoryDto) {
    return prisma.whatsAppHistory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.whatsAppHistory.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.whatsAppHistory.count();
  }

  async search(args: any) {
    return prisma.whatsAppHistory.findMany(args);
  }

  async filter(args: any) {
    return prisma.whatsAppHistory.findMany(args);
  }
}

export const whatsappHistoryRepository = new WhatsAppHistoryRepository();