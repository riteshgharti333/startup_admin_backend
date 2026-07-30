"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberService = exports.SubscriberService = void 0;
const AppError_1 = require("../../common/errors/AppError");
const subscriber_repository_1 = require("./subscriber.repository");
const httpStatus_1 = require("../../common/constants/httpStatus");
const pagination_1 = require("../../common/utils/pagination");
const search_1 = require("../../common/utils/search");
class SubscriberService {
    async subscribe(data) {
        const existingSubscriber = await subscriber_repository_1.subscriberRepository.findByEmail(data.email);
        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                throw new AppError_1.AppError({
                    statusCode: httpStatus_1.HTTP_STATUS.CONFLICT,
                    message: "You're already subscribed!",
                });
            }
        }
        return subscriber_repository_1.subscriberRepository.create(data);
    }
    async getAllSubscribers(query) {
        return pagination_1.Pagination.paginate((args) => subscriber_repository_1.subscriberRepository.findMany(), {
            cursor: query.cursor,
            limit: query.limit ? parseInt(query.limit) : undefined,
        });
    }
    async searchSubscribers(query) {
        return search_1.Search.search((args) => subscriber_repository_1.subscriberRepository.search(args), {
            searchTerm: query.q || "",
            exactFields: ["email"],
            cursor: query.cursor,
            limit: query.limit,
        });
    }
}
exports.SubscriberService = SubscriberService;
exports.subscriberService = new SubscriberService();
