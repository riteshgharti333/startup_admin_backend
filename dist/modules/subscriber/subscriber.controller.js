"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberController = void 0;
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const apiResponse_1 = require("../../common/utils/apiResponse");
const subscriber_service_1 = require("./subscriber.service");
const httpStatus_1 = require("../../common/constants/httpStatus");
class SubscriberController {
    constructor() {
        this.subscribe = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const { email } = req.body;
            const subscriber = await subscriber_service_1.subscriberService.subscribe({ email });
            return (0, apiResponse_1.apiResponse)({
                res,
                statusCode: httpStatus_1.HTTP_STATUS.CREATED,
                message: "Successfully subscribed to newsletter!",
                data: subscriber,
            });
        });
        this.getAllSubscribers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const subscribers = await subscriber_service_1.subscriberService.getAllSubscribers(req.query);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Subscribers fetched successfully",
                data: subscribers,
            });
        });
        this.searchSubscribers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const subscribers = await subscriber_service_1.subscriberService.searchSubscribers(req.query);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Subscribers found successfully",
                data: subscribers,
            });
        });
    }
}
exports.subscriberController = new SubscriberController();
