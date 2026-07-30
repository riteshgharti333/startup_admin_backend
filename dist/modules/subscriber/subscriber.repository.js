"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberRepository = exports.SubscriberRepository = void 0;
const client_1 = require("../../database/client");
class SubscriberRepository {
    async findByEmail(email) {
        return client_1.prisma.emailSubscriber.findUnique({
            where: { email },
        });
    }
    async create(data) {
        return client_1.prisma.emailSubscriber.create({
            data,
        });
    }
    async findMany() {
        return client_1.prisma.emailSubscriber.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    async count() {
        return client_1.prisma.emailSubscriber.count();
    }
    async search(args) {
        return client_1.prisma.emailSubscriber.findMany(args);
    }
}
exports.SubscriberRepository = SubscriberRepository;
exports.subscriberRepository = new SubscriberRepository();
