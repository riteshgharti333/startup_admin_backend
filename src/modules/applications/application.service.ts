import { AppError } from "../../common/errors/AppError";
import { applicationRepository } from "./application.repository";
import type {
  CreateApplicationDto,
  UpdateApplicationDto,
} from "./application.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { Filter } from "../../common/utils/filter";
import { Application } from "@prisma/client";

export class ApplicationService {
  async getAllApplications(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate((args) => applicationRepository.findMany(), {
      cursor: query.cursor,
      limit: query.limit ? parseInt(query.limit) : undefined,
    });
  }

  async getApplicationById(id: string) {
    const application = await applicationRepository.findById(id);

    if (!application) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Application not found",
      });
    }

    return application;
  }

  async createApplication(data: CreateApplicationDto) {
    return applicationRepository.create(data);
  }

  async updateApplication(id: string, data: UpdateApplicationDto) {
    await this.getApplicationById(id);
    return applicationRepository.update(id, data);
  }

  async deleteApplication(id: string) {
    await this.getApplicationById(id);
    await applicationRepository.delete(id);
  }

  async searchApplications(query: {
    q?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Search.search<Application>(
      (args) => applicationRepository.search(args),
      {
        searchTerm: query.q || "",
        exactFields: ["email", "phoneNumber"],
        containsFields: ["fullName", "position"],
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }

  async filterApplications(query: {
    position?: string;
    yearsOfExperience?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Filter.filter<Application>(
      (args) => applicationRepository.filter(args),
      {
        filters: {
          position: query.position,
          yearsOfExperience: query.yearsOfExperience,
          createdAtFrom: query.createdAtFrom,
          createdAtTo: query.createdAtTo,
        },
        cursor: query.cursor,
        limit: query.limit,
      },
    );
  }
}

export const applicationService = new ApplicationService();
