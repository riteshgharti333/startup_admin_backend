import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { subscriberService } from "./subscriber.service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

class SubscriberController {
  subscribe = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const subscriber = await subscriberService.subscribe({ email });

    return apiResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Successfully subscribed to newsletter!",
      data: subscriber,
    });
  });

  getAllSubscribers = asyncHandler(async (req: Request, res: Response) => {
    const subscribers = await subscriberService.getAllSubscribers(req.query);

    return apiResponse({
      res,
      message: "Subscribers fetched successfully",
      data: subscribers,
    });
  });

  searchSubscribers = asyncHandler(async (req: Request, res: Response) => {
    const subscribers = await subscriberService.searchSubscribers(req.query);

    return apiResponse({
      res,
      message: "Subscribers found successfully",
      data: subscribers,
    });
  });
}

export const subscriberController = new SubscriberController();