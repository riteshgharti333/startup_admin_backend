import { AppError } from "../../common/errors/AppError";
import { subscriberRepository } from "./subscriber.repository";
import type { CreateSubscriberDto } from "./subscriber.types";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { Pagination } from "../../common/utils/pagination";
import { Search } from "../../common/utils/search";
import { EmailSubscriber } from "@prisma/client";

export class SubscriberService {
  async subscribe(data: CreateSubscriberDto) {
    const existingSubscriber = await subscriberRepository.findByEmail(data.email);
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        throw new AppError({
          statusCode: HTTP_STATUS.CONFLICT,
          message: "You're already subscribed!",
        });
      }
    }

    return subscriberRepository.create(data);
  }

  async getAllSubscribers(query: { cursor?: string; limit?: string }) {
    return Pagination.paginate(
      (args) => subscriberRepository.findMany(),
      {
        cursor: query.cursor,
        limit: query.limit ? parseInt(query.limit) : undefined,
      }
    );
  }

  async searchSubscribers(query: { q?: string; cursor?: string; limit?: string }) {
    return Search.search<EmailSubscriber>(
      (args) => subscriberRepository.search(args),
      {
        searchTerm: query.q || "",
        exactFields: ["email"],
        cursor: query.cursor,
        limit: query.limit,
      }
    );
  }
}

export const subscriberService = new SubscriberService();