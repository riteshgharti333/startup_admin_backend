import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { activityLogService } from "./activity-log.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

class ActivityLogController {
  getAllActivityLogs = asyncHandler(async (req: Request, res: Response) => {
    const logs = await activityLogService.getAllActivityLogs(req.query);

    return apiResponse({
      res,
      message: "Activity logs fetched successfully",
      data: logs,
    });
  });

  getActivityLogById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const log = await activityLogService.getActivityLogById(id);

    return apiResponse({
      res,
      message: "Activity log fetched successfully",
      data: log,
    });
  });

  getActivityLogsByBusinessId = asyncHandler(
    async (req: Request, res: Response) => {
      const businessId = req.params.businessId as string;
      const logs =
        await activityLogService.getActivityLogsByBusinessId(businessId);

      return apiResponse({
        res,
        message: "Activity logs fetched successfully",
        data: logs,
      });
    },
  );

  createActivityLog = asyncHandler(async (req: Request, res: Response) => {
    const log = await activityLogService.createActivityLog(req.body);

    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Activity log created successfully",
      data: log,
    });
  });

  deleteActivityLog = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await activityLogService.deleteActivityLog(id);

    return apiResponse({
      res,
      message: "Activity log deleted successfully",
      data: null,
    });
  });

  searchActivityLogs = asyncHandler(async (req: Request, res: Response) => {
    const logs = await activityLogService.searchActivityLogs(req.query);

    return apiResponse({
      res,
      message: "Activity logs found successfully",
      data: logs,
    });
  });

  filterActivityLogs = asyncHandler(async (req: Request, res: Response) => {
    const logs = await activityLogService.filterActivityLogs(req.query);

    return apiResponse({
      res,
      message: "Activity logs filtered successfully",
      data: logs,
    });
  });
}

export const activityLogController = new ActivityLogController();