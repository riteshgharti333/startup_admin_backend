"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRepository = exports.LeadRepository = void 0;
const client_1 = require("../../database/client");
class LeadRepository {
    async findById(id) {
        return client_1.prisma.lead.findUnique({ where: { id } });
    }
    async findByEmail(email) {
        return client_1.prisma.lead.findFirst({ where: { email } });
    }
    async create(data) {
        return client_1.prisma.lead.create({ data });
    }
    async update(id, data) {
        return client_1.prisma.lead.update({ where: { id }, data });
    }
    async delete(id) {
        return client_1.prisma.lead.delete({ where: { id } });
    }
    async count() {
        return client_1.prisma.lead.count();
    }
    async search(args) {
        return client_1.prisma.lead.findMany(args);
    }
    async filter(args) {
        return client_1.prisma.lead.findMany(args);
    }
}
exports.LeadRepository = LeadRepository;
exports.leadRepository = new LeadRepository();
