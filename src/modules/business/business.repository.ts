import { prisma } from "../../database/client";
import {
  CreateBusinessDto,
  UpdateBusinessDto,
  ScrapedBusinessDto,
} from "./business.types";

export class BusinessRepository {
  async findMany() {
    return prisma.business.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.business.findUnique({
      where: { id },
      include: {
        businessList: { select: { id: true, title: true } },
      },
    });
  }

  async findByPlaceId(placeId: string) {
    return prisma.business.findUnique({
      where: { placeId },
    });
  }

  async create(data: CreateBusinessDto) {
    return prisma.business.create({
      data,
    });
  }

  async update(id: string, data: UpdateBusinessDto) {
    return prisma.business.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.business.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.business.count();
  }

  async search(args: any) {
    return prisma.business.findMany(args);
  }

  async filter(args: any) {
    return prisma.business.findMany(args);
  }

  // ── Bulk helpers ─────────────────────────────

  // Upsert a scraped business by placeId.
  // If exists: update ONLY the scraped (Google) fields; preserve CRM fields.
  async upsertByPlaceId(
    businessListId: string,
    item: ScrapedBusinessDto,
  ): Promise<"inserted" | "updated"> {
    const existing = item.placeId
      ? await prisma.business.findUnique({ where: { placeId: item.placeId } })
      : null;

    if (existing) {
      await prisma.business.update({
        where: { id: existing.id },
        data: {
          businessName: item.businessName,
          category: item.category ?? existing.category,
          phoneNumber: item.phoneNumber ?? existing.phoneNumber,
          email: item.email ?? existing.email,
          website: item.website ?? existing.website,
          fullAddress: item.fullAddress ?? existing.fullAddress,
          city: item.city ?? existing.city,
          googleMapsUrl: item.googleMapsUrl ?? existing.googleMapsUrl,
          rating: item.rating ?? existing.rating,
          reviewCount: item.reviewCount ?? existing.reviewCount,
        },
      });
      return "updated";
    }

    await prisma.business.create({
      data: {
        businessListId,
        ...item,
      },
    });
    return "inserted";
  }
}

export const businessRepository = new BusinessRepository();