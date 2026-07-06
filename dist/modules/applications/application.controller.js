"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationController = void 0;
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const apiResponse_1 = require("../../common/utils/apiResponse");
const application_service_1 = require("./application.service");
const httpStatus_1 = require("../../common/constants/httpStatus");
const AppError_1 = require("../../common/errors/AppError");
class ApplicationController {
    constructor() {
        this.getAllApplications = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
            const applications = await application_service_1.applicationService.getAllApplications();
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Applications fetched successfully",
                data: applications,
            });
        });
        this.getApplicationById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const applicationId = req.params.id;
            const application = await application_service_1.applicationService.getApplicationById(applicationId);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Application fetched successfully",
                data: application,
            });
        });
        this.createApplication = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            console.log("✅ Controller reached"); // Does this log?
            console.log("req.body:", req.body); // What does this show?
            const applicationData = req.body;
            if (!applicationData.resumeUrl) {
                throw new AppError_1.AppError({
                    statusCode: httpStatus_1.HTTP_STATUS.BAD_REQUEST,
                    message: "Resume/CV is required",
                });
            }
            const application = await application_service_1.applicationService.createApplication(applicationData);
            return (0, apiResponse_1.apiResponse)({
                res,
                statusCode: 201,
                message: "Application submitted successfully",
                data: application,
            });
        });
        this.deleteApplication = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const applicationId = req.params.id;
            await application_service_1.applicationService.deleteApplication(applicationId);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Application deleted successfully",
                data: null,
            });
        });
    }
}
exports.applicationController = new ApplicationController();
