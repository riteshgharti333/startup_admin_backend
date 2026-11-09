import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { businessListService } from "./business-list.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

class BusinessListController {
  getAllBusinessLists = asyncHandler(async (req: Request, res: Response) => {
    const lists = await businessListService.getAllBusinessLists(req.query);

    return apiResponse({
      res,
      message: "Business lists fetched successfully",
      data: lists,
    });
  });

  getBusinessListById = asyncHandler(async (req: Request, res: Response) => {
    const listId = req.params.id as string;
    const list = await businessListService.getBusinessListById(listId);

    return apiResponse({
      res,
      message: "Business list fetched successfully",
      data: list,
    });
  });

  createBusinessList = asyncHandler(async (req: Request, res: Response) => {
    const list = await businessListService.createBusinessList(req.body);

    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Business list created successfully",
      data: list,
    });
  });

  updateBusinessList = asyncHandler(async (req: Request, res: Response) => {
    const listId = req.params.id as string;
    const list = await businessListService.updateBusinessList(
      listId,
      req.body,
    );

    return apiResponse({
      res,
      message: "Business list updated successfully",
      data: list,
    });
  });

  deleteBusinessList = asyncHandler(async (req: Request, res: Response) => {
    const listId = req.params.id as string;
    await businessListService.deleteBusinessList(listId);

    return apiResponse({
      res,
      message: "Business list deleted successfully",
      data: null,
    });
  });

  searchBusinessLists = asyncHandler(async (req: Request, res: Response) => {
    const lists = await businessListService.searchBusinessLists(req.query);

    return apiResponse({
      res,
      message: "Business lists found successfully",
      data: lists,
    });
  });

  filterBusinessLists = asyncHandler(async (req: Request, res: Response) => {
    const lists = await businessListService.filterBusinessLists(req.query);

    return apiResponse({
      res,
      message: "Business lists filtered successfully",
      data: lists,
    });
  });
}

export const businessListController = new BusinessListController();