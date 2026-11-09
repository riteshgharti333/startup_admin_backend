import { prisma } from "../../database/client";
import { AppError } from "../../common/errors/AppError";
import { businessRepository } from "./business.repository";
import type {
  CreateBusinessDto,
  UpdateBusinessDto,
  BulkImportBusinessDto,
  BulkImportResult,
} from "./business.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { Filter } from "../../common/utils/filter";
import { Business, Prisma } from "@prisma/client";

const CHUNK_SIZE = 100;

export class BusinessService {
  async getAllBusinesses(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate((args) => businessRepository.findMany(), {
      cursor: query.cursor,
      limit: query.limit ? parseInt(query.limit) : undefined,
    });
  }

  async getBusinessById(id: string) {
    const business = await businessRepository.findById(id);

    if (!business) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Business not found",
      });
    }

    return business;
  }

  async createBusiness(data: CreateBusinessDto) {
    // Verify list exists
    const listExists = await prisma.businessList.findUnique({
      where: { id: data.businessListId },
      select: { id: true },
    });

    if (!listExists) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Business list not found",
      });
    }

    try {
      return await businessRepository.create(data);
    } catch (error) {
      this.handleUniqueError(error);
      throw error;
    }
  }

  async updateBusiness(id: string, data: UpdateBusinessDto) {
    await this.getBusinessById(id);

    try {
      return await businessRepository.update(id, data);
    } catch (error) {
      this.handleUniqueError(error);
      throw error;
    }
  }

  async deleteBusiness(id: string) {
    await this.getBusinessById(id);
    await businessRepository.delete(id);
  }

  async searchBusinesses(query: {
    q?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Search.search<Business>(
      (args) => businessRepository.search(args),
      {
        searchTerm: query.q || "",
        exactFields: ["email", "phoneNumber"],
        containsFields: ["businessName", "city", "category"],
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }

  async filterBusinesses(query: {
    businessListId?: string;
    category?: string;
    city?: string;
    leadStatus?: string;
    emailStatus?: string;
    whatsappStatus?: string;
    minRating?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Filter.filter<Business>(
      (args) => businessRepository.filter(args),
      {
        filters: {
          businessListId: query.businessListId,
          category: query.category,
          city: query.city,
          leadStatus: query.leadStatus,
          emailStatus: query.emailStatus,
          whatsappStatus: query.whatsappStatus,
          minRating: query.minRating,
          createdAtFrom: query.createdAtFrom,
          createdAtTo: query.createdAtTo,
        },
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }

  // ─── BULK IMPORT ─────────────────────────────────────────
  async bulkImport(payload: BulkImportBusinessDto): Promise<BulkImportResult> {
    const { businessListId, businesses } = payload;

    // 1. Verify target list exists
    const listExists = await prisma.businessList.findUnique({
      where: { id: businessListId },
      select: { id: true },
    });

    if (!listExists) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Business list not found",
      });
    }

    // 2. Dedupe within batch by placeId (keep first)
    const seenPlaceIds = new Set<string>();
    const deduped = businesses.filter((item) => {
      if (!item.placeId) return true;
      if (seenPlaceIds.has(item.placeId)) return false;
      seenPlaceIds.add(item.placeId);
      return true;
    });

    // 3. Upsert in chunks
    const result: BulkImportResult = {
      inserted: 0,
      updated: 0,
      skipped: businesses.length - deduped.length,
      failed: 0,
      errors: [],
    };

    for (let i = 0; i < deduped.length; i += CHUNK_SIZE) {
      const chunk = deduped.slice(i, i + CHUNK_SIZE);

      for (let j = 0; j < chunk.length; j++) {
        const item = chunk[j];
        try {
          const outcome = await businessRepository.upsertByPlaceId(
            businessListId,
            item,
          );
          result[outcome] += 1;
        } catch (error) {
          result.failed += 1;
          result.errors.push({
            index: i + j,
            businessName: item.businessName,
            reason: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }
    }

    return result;
  }

  // ─── PRIVATE HELPERS ─────────────────────────────────────
  private handleUniqueError(error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError({
        statusCode: HTTP_STATUS.CONFLICT,
        message: "A business with this placeId already exists",
      });
    }
  }
}

export const businessService = new BusinessService();