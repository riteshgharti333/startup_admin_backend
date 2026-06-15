"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationController = void 0;
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const apiResponse_1 = require("../../common/utils/apiResponse");
const application_service_1 = require("./application.service");
class ApplicationController {
    getAllApplications = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
        const applications = await application_service_1.applicationService.getAllApplications();
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "Applications fetched successfully",
            data: applications,
        });
    });
    getApplicationById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const applicationId = req.params.id;
        const application = await application_service_1.applicationService.getApplicationById(applicationId);
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "Application fetched successfully",
            data: application,
        });
    });
    createApplication = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        // Parse JSON data from form-data
        const applicationData = JSON.parse(req.body.data);
        // Get uploaded resume URL from Cloudinary
        const resumeUrl = req.file?.path;
        if (!resumeUrl) {
            throw new Error("Resume/CV is required");
        }
        const application = await application_service_1.applicationService.createApplication({
            ...applicationData,
            resumeUrl,
        });
        return (0, apiResponse_1.apiResponse)({
            res,
            statusCode: 201,
            message: "Application submitted successfully",
            data: application,
        });
    });
    deleteApplication = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const applicationId = req.params.id;
        await application_service_1.applicationService.deleteApplication(applicationId);
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "Application deleted successfully",
            data: null,
        });
    });
}
exports.applicationController = new ApplicationController();
