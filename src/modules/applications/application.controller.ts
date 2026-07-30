import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { applicationService } from "./application.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { AppError } from "../../common/errors/AppError";

class ApplicationController {
  getAllApplications = asyncHandler(async (req: Request, res: Response) => {
    const applications = await applicationService.getAllApplications(req.query);

    return apiResponse({
      res,
      message: "Applications fetched successfully",
      data: applications,
    });
  });

  getApplicationById = asyncHandler(async (req: Request, res: Response) => {
    const applicationId = req.params.id as string;
    const application =
      await applicationService.getApplicationById(applicationId);

    return apiResponse({
      res,
      message: "Application fetched successfully",
      data: application,
    });
  });

  createApplication = asyncHandler(async (req: Request, res: Response) => {
    const applicationData = req.body;

    if (!applicationData.resumeUrl) {
      throw new AppError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Resume/CV is required",
      });
    }

    const application =
      await applicationService.createApplication(applicationData);

    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Application submitted successfully",
      data: application,
    });
  });

  updateApplication = asyncHandler(async (req: Request, res: Response) => {
    const applicationId = req.params.id as string;
    const updateData = req.body;
    const application = await applicationService.updateApplication(
      applicationId,
      updateData,
    );

    return apiResponse({
      res,
      message: "Application updated successfully",
      data: application,
    });
  });

  deleteApplication = asyncHandler(async (req: Request, res: Response) => {
    const applicationId = req.params.id as string;
    await applicationService.deleteApplication(applicationId);

    return apiResponse({
      res,
      message: "Application deleted successfully",
      data: null,
    });
  });

  searchApplications = asyncHandler(async (req: Request, res: Response) => {
    const applications = await applicationService.searchApplications(req.query);

    return apiResponse({
      res,
      message: "Applications found successfully",
      data: applications,
    });
  });

  filterApplications = asyncHandler(async (req: Request, res: Response) => {
    const applications = await applicationService.filterApplications(req.query);

    return apiResponse({
      res,
      message: "Applications filtered successfully",
      data: applications,
    });
  });
}

export const applicationController = new ApplicationController();
