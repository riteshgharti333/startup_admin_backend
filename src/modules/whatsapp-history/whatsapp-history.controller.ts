import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { whatsappHistoryService } from "./whatsapp-history.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

class WhatsAppHistoryController {
  getAllWhatsAppHistory = asyncHandler(
    async (req: Request, res: Response) => {
      const records = await whatsappHistoryService.getAllWhatsAppHistory(
        req.query,
      );

      return apiResponse({
        res,
        message: "WhatsApp history fetched successfully",
        data: records,
      });
    },
  );

  getWhatsAppHistoryById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const record = await whatsappHistoryService.getWhatsAppHistoryById(id);

      return apiResponse({
        res,
        message: "WhatsApp history fetched successfully",
        data: record,
      });
    },
  );

  getWhatsAppHistoryByBusinessId = asyncHandler(
    async (req: Request, res: Response) => {
      const businessId = req.params.businessId as string;
      const records =
        await whatsappHistoryService.getWhatsAppHistoryByBusinessId(
          businessId,
        );

      return apiResponse({
        res,
        message: "WhatsApp history fetched successfully",
        data: records,
      });
    },
  );

  createWhatsAppHistory = asyncHandler(
    async (req: Request, res: Response) => {
      const record = await whatsappHistoryService.createWhatsAppHistory(
        req.body,
      );

      return apiResponse({
        res,
        statusCode: HTTP_STATUS.CREATED,
        message: "WhatsApp history created successfully",
        data: record,
      });
    },
  );

  updateWhatsAppHistory = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const record = await whatsappHistoryService.updateWhatsAppHistory(
        id,
        req.body,
      );

      return apiResponse({
        res,
        message: "WhatsApp history updated successfully",
        data: record,
      });
    },
  );

  deleteWhatsAppHistory = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await whatsappHistoryService.deleteWhatsAppHistory(id);

      return apiResponse({
        res,
        message: "WhatsApp history deleted successfully",
        data: null,
      });
    },
  );

  searchWhatsAppHistory = asyncHandler(
    async (req: Request, res: Response) => {
      const records = await whatsappHistoryService.searchWhatsAppHistory(
        req.query,
      );

      return apiResponse({
        res,
        message: "WhatsApp history found successfully",
        data: records,
      });
    },
  );

  filterWhatsAppHistory = asyncHandler(
    async (req: Request, res: Response) => {
      const records = await whatsappHistoryService.filterWhatsAppHistory(
        req.query,
      );

      return apiResponse({
        res,
        message: "WhatsApp history filtered successfully",
        data: records,
      });
    },
  );
}

export const whatsappHistoryController = new WhatsAppHistoryController();