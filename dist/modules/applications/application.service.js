"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationService = exports.ApplicationService = void 0;
const AppError_1 = require("../../common/errors/AppError");
const application_repository_1 = require("./application.repository");
const httpStatus_1 = require("../../common/constants/httpStatus");
const pagination_1 = require("../../common/utils/pagination");
const search_1 = require("../../common/utils/search");
const filter_1 = require("../../common/utils/filter");
class ApplicationService {
    async getAllApplications(query) {
        return pagination_1.Pagination.paginate((args) => application_repository_1.applicationRepository.findMany(), {
            cursor: query.cursor,
            limit: query.limit ? parseInt(query.limit) : undefined,
        });
    }
    async getApplicationById(id) {
        const application = await application_repository_1.applicationRepository.findById(id);
        if (!application) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.NOT_FOUND,
                message: "Application not found",
            });
        }
        return application;
    }
    async createApplication(data) {
        return application_repository_1.applicationRepository.create(data);
    }
    async updateApplication(id, data) {
        await this.getApplicationById(id);
        return application_repository_1.applicationRepository.update(id, data);
    }
    async deleteApplication(id) {
        await this.getApplicationById(id);
        await application_repository_1.applicationRepository.delete(id);
    }
    async searchApplications(query) {
        return search_1.Search.search((args) => application_repository_1.applicationRepository.search(args), {
            searchTerm: query.q || "",
            exactFields: ["email", "phoneNumber"],
            containsFields: ["fullName", "position"],
            cursor: query.cursor,
            limit: query.limit,
        });
    }
    async filterApplications(query) {
        return filter_1.Filter.filter((args) => application_repository_1.applicationRepository.filter(args), {
            filters: {
                position: query.position,
                yearsOfExperience: query.yearsOfExperience,
                createdAtFrom: query.createdAtFrom,
                createdAtTo: query.createdAtTo,
            },
            cursor: query.cursor,
            limit: query.limit,
        });
    }
}
exports.ApplicationService = ApplicationService;
exports.applicationService = new ApplicationService();
