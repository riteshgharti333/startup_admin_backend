import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { emailHistoryService } from "./email-history.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

class EmailHistoryController {
  getAllEmailHistory = asyncHandler(async (req: Request, res: Response) => {
    const records = await emailHistoryService.getAllEmailHistory(req.query);

    return apiResponse({
      res,
      message: "Email history fetched successfully",
      data: records,
    });
  });

  getEmailHistoryById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const record = await emailHistoryService.getEmailHistoryById(id);

    return apiResponse({
      res,
      message: "Email history fetched successfully",
      data: record,
    });
  });

  getEmailHistoryByBusinessId = asyncHandler(
    async (req: Request, res: Response) => {
      const businessId = req.params.businessId as string;
      const records =
        await emailHistoryService.getEmailHistoryByBusinessId(businessId);

      return apiResponse({
        res,
        message: "Email history fetched successfully",
        data: records,
      });
    },
  );

  createEmailHistory = asyncHandler(async (req: Request, res: Response) => {
    const record = await emailHistoryService.createEmailHistory(req.body);

    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Email history created successfully",
      data: record,
    });
  });

  updateEmailHistory = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const record = await emailHistoryService.updateEmailHistory(id, req.body);

    return apiResponse({
      res,
      message: "Email history updated successfully",
      data: record,
    });
  });

  deleteEmailHistory = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await emailHistoryService.deleteEmailHistory(id);

    return apiResponse({
      res,
      message: "Email history deleted successfully",
      data: null,
    });
  });

  searchEmailHistory = asyncHandler(async (req: Request, res: Response) => {
    const records = await emailHistoryService.searchEmailHistory(req.query);

    return apiResponse({
      res,
      message: "Email history found successfully",
      data: records,
    });
  });

  filterEmailHistory = asyncHandler(async (req: Request, res: Response) => {
    const records = await emailHistoryService.filterEmailHistory(req.query);

    return apiResponse({
      res,
      message: "Email history filtered successfully",
      data: records,
    });
  });
}

export const emailHistoryController = new EmailHistoryController();