import { AppError } from "../../common/errors/AppError";
import { leadRepository } from "./lead.repository";
import type { CreateLeadDto, UpdateLeadDto } from "./lead.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { Filter } from "../../common/utils/filter";
import { Lead } from "@prisma/client";
import emailService from "./email.service";

export class LeadService {
  async getAllLeads(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate((args) => leadRepository.filter(args), {
      cursor: query.cursor,
      limit: query.limit ? parseInt(query.limit) : undefined,
    });
  }

  async getLeadById(id: string) {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Lead not found",
      });
    }
    return lead;
  }

  async createLead(data: CreateLeadDto) {
    await leadRepository.findByEmail(data.email);

    const lead = await leadRepository.create(data);

    await emailService.sendLeadNotification({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      budget: data.budget,
      details: data.details,
    });

    await emailService.sendAutoReply(data.email, data.fullName);

    return lead;
  }

  async updateLead(id: string, data: UpdateLeadDto) {
    await this.getLeadById(id);

    if (data.email) {
      const existingLead = await leadRepository.findByEmail(data.email);
      if (existingLead && existingLead.id !== id) {
        throw new AppError({
          statusCode: HTTP_STATUS.CONFLICT,
          message: "Lead with this email already exists",
        });
      }
    }

    return leadRepository.update(id, data);
  }

  async deleteLead(id: string) {
    await this.getLeadById(id);
    await leadRepository.delete(id);
  }

  async searchLeads(query: { q?: string; cursor?: string; limit?: string }) {
    return Search.search<Lead>((args) => leadRepository.search(args), {
      searchTerm: query.q || "",
      exactFields: ["email", "phone"],
      containsFields: ["fullName", "company", "service"],
      cursor: query.cursor,
      limit: query.limit,
    });
  }

  async filterLeads(query: {
    service?: string;
    budget?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    cursor?: string;
    limit?: string;
  }) {
    return Filter.filter<Lead>((args) => leadRepository.filter(args), {
      filters: {
        service: query.service,
        budget: query.budget,
        createdAtFrom: query.createdAtFrom,
        createdAtTo: query.createdAtTo,
      },
      cursor: query.cursor,
      limit: query.limit,
    });
  }
}

export const leadService = new LeadService();
