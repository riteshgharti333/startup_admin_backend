import { prisma } from "../../database/client";
import { CreateSubscriberDto } from "./subscriber.types";

export class SubscriberRepository {
  async findByEmail(email: string) {
    return prisma.emailSubscriber.findUnique({
      where: { email },
    });
  }

  async create(data: CreateSubscriberDto) {
    return prisma.emailSubscriber.create({
      data,
    });
  }

  async findMany() {
    return prisma.emailSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async count() {
    return prisma.emailSubscriber.count();
  }

  async search(args: any) {
    return prisma.emailSubscriber.findMany(args);
  }
}

export const subscriberRepository = new SubscriberRepository();
