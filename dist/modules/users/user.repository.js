import { prisma } from "../../database/client";
export class UserRepository {
    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
        });
    }
    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
    async findMany() {
        return prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async create(data) {
        return prisma.user.create({
            data,
        });
    }
    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma.user.delete({
            where: { id },
        });
    }
}
export const userRepository = new UserRepository();
