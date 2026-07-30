"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadService = exports.LeadService = void 0;
const AppError_1 = require("../../common/errors/AppError");
const lead_repository_1 = require("./lead.repository");
const httpStatus_1 = require("../../common/constants/httpStatus");
const pagination_1 = require("../../common/utils/pagination");
const search_1 = require("../../common/utils/search");
const filter_1 = require("../../common/utils/filter");
class LeadService {
    async getAllLeads(query) {
        return pagination_1.Pagination.paginate((args) => lead_repository_1.leadRepository.filter(args), {
            cursor: query.cursor,
            limit: query.limit ? parseInt(query.limit) : undefined,
        });
    }
    async getLeadById(id) {
        const lead = await lead_repository_1.leadRepository.findById(id);
        if (!lead) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.NOT_FOUND,
                message: "Lead not found",
            });
        }
        return lead;
    }
    async createLead(data) {
        await lead_repository_1.leadRepository.findByEmail(data.email);
        return lead_repository_1.leadRepository.create(data);
    }
    async updateLead(id, data) {
        await this.getLeadById(id);
        if (data.email) {
            const existingLead = await lead_repository_1.leadRepository.findByEmail(data.email);
            if (existingLead && existingLead.id !== id) {
                throw new AppError_1.AppError({
                    statusCode: httpStatus_1.HTTP_STATUS.CONFLICT,
                    message: "Lead with this email already exists",
                });
            }
        }
        return lead_repository_1.leadRepository.update(id, data);
    }
    async deleteLead(id) {
        await this.getLeadById(id);
        await lead_repository_1.leadRepository.delete(id);
    }
    async searchLeads(query) {
        return search_1.Search.search((args) => lead_repository_1.leadRepository.search(args), {
            searchTerm: query.q || "",
            exactFields: ["email", "phone"],
            containsFields: ["fullName", "company", "service"],
            cursor: query.cursor,
            limit: query.limit,
        });
    }
    async filterLeads(query) {
        return filter_1.Filter.filter((args) => lead_repository_1.leadRepository.filter(args), {
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
exports.LeadService = LeadService;
exports.leadService = new LeadService();
