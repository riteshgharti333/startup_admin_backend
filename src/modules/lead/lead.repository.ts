import { prisma } from "../../database/client";
import { CreateLeadDto, UpdateLeadDto } from "./lead.types";

export class LeadRepository {
  async findById(id: string) {
    return prisma.lead.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return prisma.lead.findFirst({ where: { email } });
  }

  async create(data: CreateLeadDto) {
    return prisma.lead.create({ data });
  }

  async update(id: string, data: UpdateLeadDto) {
    return prisma.lead.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.lead.delete({ where: { id } });
  }

  async count() {
    return prisma.lead.count();
  }

  async search(args: any) {
    return prisma.lead.findMany(args);
  }

  async filter(args: any) {
    return prisma.lead.findMany(args);
  }
}

export const leadRepository = new LeadRepository();