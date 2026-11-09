import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { businessService } from "./business.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

class BusinessController {
  getAllBusinesses = asyncHandler(async (req: Request, res: Response) => {
    const businesses = await businessService.getAllBusinesses(req.query);

    return apiResponse({
      res,
      message: "Businesses fetched successfully",
      data: businesses,
    });
  });

  getBusinessById = asyncHandler(async (req: Request, res: Response) => {
    const businessId = req.params.id as string;
    const business = await businessService.getBusinessById(businessId);

    return apiResponse({
      res,
      message: "Business fetched successfully",
      data: business,
    });
  });

  createBusiness = asyncHandler(async (req: Request, res: Response) => {
    const business = await businessService.createBusiness(req.body);

    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Business created successfully",
      data: business,
    });
  });

  updateBusiness = asyncHandler(async (req: Request, res: Response) => {
    const businessId = req.params.id as string;
    const business = await businessService.updateBusiness(businessId, req.body);

    return apiResponse({
      res,
      message: "Business updated successfully",
      data: business,
    });
  });

  deleteBusiness = asyncHandler(async (req: Request, res: Response) => {
    const businessId = req.params.id as string;
    await businessService.deleteBusiness(businessId);

    return apiResponse({
      res,
      message: "Business deleted successfully",
      data: null,
    });
  });

  searchBusinesses = asyncHandler(async (req: Request, res: Response) => {
    const businesses = await businessService.searchBusinesses(req.query);

    return apiResponse({
      res,
      message: "Businesses found successfully",
      data: businesses,
    });
  });

  filterBusinesses = asyncHandler(async (req: Request, res: Response) => {
    const businesses = await businessService.filterBusinesses(req.query);

    return apiResponse({
      res,
      message: "Businesses filtered successfully",
      data: businesses,
    });
  });

  bulkImport = asyncHandler(async (req: Request, res: Response) => {
    const result = await businessService.bulkImport(req.body);

    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: `Bulk import complete: ${result.inserted} inserted, ${result.updated} updated, ${result.skipped} skipped, ${result.failed} failed`,
      data: result,
    });
  });
}

export const businessController = new BusinessController();