import { AppError } from "../../common/errors/AppError";
import { businessListRepository } from "./business-list.repository";
import type {
  CreateBusinessListDto,
  UpdateBusinessListDto,
} from "./business-list.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { Filter } from "../../common/utils/filter";
import { BusinessList } from "@prisma/client";

export class BusinessListService {
  async getAllBusinessLists(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate((args) => businessListRepository.findMany(), {
      cursor: query.cursor,
      limit: query.limit ? parseInt(query.limit) : undefined,
    });
  }

  async getBusinessListById(id: string) {
    const list = await businessListRepository.findById(id);

    if (!list) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Business list not found",
      });
    }

    return list;
  }

  async createBusinessList(data: CreateBusinessListDto) {
    return businessListRepository.create(data);
  }

  async updateBusinessList(id: string, data: UpdateBusinessListDto) {
    await this.getBusinessListById(id);
    return businessListRepository.update(id, data);
  }

  async deleteBusinessList(id: string) {
    await this.getBusinessListById(id);
    await businessListRepository.delete(id);
  }

  async searchBusinessLists(query: {
    q?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Search.search<BusinessList>(
      (args) => businessListRepository.search(args),
      {
        searchTerm: query.q || "",
        exactFields: ["category"],
        containsFields: ["title", "location", "keyword"],
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }

  async filterBusinessLists(query: {
    category?: string;
    location?: string;
    keyword?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Filter.filter<BusinessList>(
      (args) => businessListRepository.filter(args),
      {
        filters: {
          category: query.category,
          location: query.location,
          keyword: query.keyword,
          createdAtFrom: query.createdAtFrom,
          createdAtTo: query.createdAtTo,
        },
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }
}

export const businessListService = new BusinessListService();