import { prisma } from "../../database/client";
export class ApplicationRepository {
    async findMany() {
        return prisma.application.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    async findById(id) {
        return prisma.application.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return prisma.application.create({
            data,
        });
    }
    async delete(id) {
        return prisma.application.delete({
            where: { id },
        });
    }
}
export const applicationRepository = new ApplicationRepository();
