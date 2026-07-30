"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRepository = exports.ApplicationRepository = void 0;
const client_1 = require("../../database/client");
class ApplicationRepository {
    async findMany() {
        return client_1.prisma.application.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    async findById(id) {
        return client_1.prisma.application.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return client_1.prisma.application.create({
            data,
        });
    }
    async update(id, data) {
        return client_1.prisma.application.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return client_1.prisma.application.delete({
            where: { id },
        });
    }
    // Add count method for pagination
    async count() {
        return client_1.prisma.application.count();
    }
    // Add search method
    async search(args) {
        return client_1.prisma.application.findMany(args);
    }
    // Add filter method
    async filter(args) {
        return client_1.prisma.application.findMany(args);
    }
}
exports.ApplicationRepository = ApplicationRepository;
exports.applicationRepository = new ApplicationRepository();
