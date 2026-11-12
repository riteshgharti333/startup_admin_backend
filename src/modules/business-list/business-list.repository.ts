import { prisma } from "../../database/client";
import {
  CreateBusinessListDto,
  UpdateBusinessListDto,
} from "./business-list.types";

export class BusinessListRepository {
  async findMany() {
    return prisma.businessList.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { businesses: true } },
      },
    });
  }

  async findById(id: string) {
    return prisma.businessList.findUnique({
      where: { id },
      include: {
        _count: { select: { businesses: true } },
        businesses: {
          select: {
            id: true,
            businessName: true,
            city: true,
            phoneNumber: true,
            rating: true,
            reviewCount: true,
            website: true,
            leadStatus: true,
          },
          orderBy: { businessName: "asc" },
        },
      },
    });
  }

  async create(data: CreateBusinessListDto) {
    return prisma.businessList.create({
      data,
      include: {
        _count: { select: { businesses: true } },
      },
    });
  }

  async update(id: string, data: UpdateBusinessListDto) {
    return prisma.businessList.update({
      where: { id },
      data,
      include: {
        _count: { select: { businesses: true } },
      },
    });
  }

  async delete(id: string) {
    return prisma.businessList.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.businessList.count();
  }

  async search(args: any) {
    return prisma.businessList.findMany(args);
  }

  async filter(args: any) {
    return prisma.businessList.findMany(args);
  }
}

export const businessListRepository = new BusinessListRepository();
