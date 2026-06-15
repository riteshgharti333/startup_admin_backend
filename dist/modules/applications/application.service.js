"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationService = exports.ApplicationService = void 0;
const AppError_1 = require("../../common/errors/AppError");
const application_repository_1 = require("./application.repository");
const httpStatus_1 = require("../../common/constants/httpStatus");
class ApplicationService {
    async getAllApplications() {
        return application_repository_1.applicationRepository.findMany();
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
    async deleteApplication(id) {
        await this.getApplicationById(id);
        await application_repository_1.applicationRepository.delete(id);
    }
}
exports.ApplicationService = ApplicationService;
exports.applicationService = new ApplicationService();
