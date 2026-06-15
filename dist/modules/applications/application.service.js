import { AppError } from "../../common/errors/AppError";
import { applicationRepository } from "./application.repository";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
export class ApplicationService {
    async getAllApplications() {
        return applicationRepository.findMany();
    }
    async getApplicationById(id) {
        const application = await applicationRepository.findById(id);
        if (!application) {
            throw new AppError({
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: "Application not found",
            });
        }
        return application;
    }
    async createApplication(data) {
        return applicationRepository.create(data);
    }
    async deleteApplication(id) {
        await this.getApplicationById(id);
        await applicationRepository.delete(id);
    }
}
export const applicationService = new ApplicationService();
