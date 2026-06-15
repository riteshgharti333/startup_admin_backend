import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { applicationService } from "./application.service";
class ApplicationController {
    getAllApplications = asyncHandler(async (_req, res) => {
        const applications = await applicationService.getAllApplications();
        return apiResponse({
            res,
            message: "Applications fetched successfully",
            data: applications,
        });
    });
    getApplicationById = asyncHandler(async (req, res) => {
        const applicationId = req.params.id;
        const application = await applicationService.getApplicationById(applicationId);
        return apiResponse({
            res,
            message: "Application fetched successfully",
            data: application,
        });
    });
    createApplication = asyncHandler(async (req, res) => {
        // Parse JSON data from form-data
        const applicationData = JSON.parse(req.body.data);
        // Get uploaded resume URL from Cloudinary
        const resumeUrl = req.file?.path;
        if (!resumeUrl) {
            throw new Error("Resume/CV is required");
        }
        const application = await applicationService.createApplication({
            ...applicationData,
            resumeUrl,
        });
        return apiResponse({
            res,
            statusCode: 201,
            message: "Application submitted successfully",
            data: application,
        });
    });
    deleteApplication = asyncHandler(async (req, res) => {
        const applicationId = req.params.id;
        await applicationService.deleteApplication(applicationId);
        return apiResponse({
            res,
            message: "Application deleted successfully",
            data: null,
        });
    });
}
export const applicationController = new ApplicationController();
