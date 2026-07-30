import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { leadService } from "./lead.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

class LeadController {
  getAllLeads = asyncHandler(async (req: Request, res: Response) => {
    const leads = await leadService.getAllLeads(req.query);
    return apiResponse({
      res,
      message: "Leads fetched successfully",
      data: leads,
    });
  });

  getLeadById = asyncHandler(async (req: Request, res: Response) => {
    const leadId = req.params.id as string;
    const lead = await leadService.getLeadById(leadId);
    return apiResponse({
      res,
      message: "Lead fetched successfully",
      data: lead,
    });
  });

  createLead = asyncHandler(async (req: Request, res: Response) => {
    const leadData = req.body;
    const lead = await leadService.createLead(leadData);
    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Lead created successfully",
      data: lead,
    });
  });

  updateLead = asyncHandler(async (req: Request, res: Response) => {
    const leadId = req.params.id as string;
    const updateData = req.body;
    const lead = await leadService.updateLead(leadId, updateData);
    return apiResponse({
      res,
      message: "Lead updated successfully",
      data: lead,
    });
  });

  deleteLead = asyncHandler(async (req: Request, res: Response) => {
    const leadId = req.params.id as string;
    await leadService.deleteLead(leadId);
    return apiResponse({
      res,
      message: "Lead deleted successfully",
      data: null,
    });
  });

  searchLeads = asyncHandler(async (req: Request, res: Response) => {
    const leads = await leadService.searchLeads(req.query);
    return apiResponse({
      res,
      message: "Leads found successfully",
      data: leads,
    });
  });

  filterLeads = asyncHandler(async (req: Request, res: Response) => {
    const leads = await leadService.filterLeads(req.query);
    return apiResponse({
      res,
      message: "Leads filtered successfully",
      data: leads,
    });
  });
}

export const leadController = new LeadController();
