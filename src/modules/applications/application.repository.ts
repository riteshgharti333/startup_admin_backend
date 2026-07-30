import { prisma } from "../../database/client";
import { UpdateApplicationDto } from "./application.types";

export class ApplicationRepository {
  async findMany() {
    return prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.application.findUnique({
      where: { id },
    });
  }

  async create(data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    position: string;
    yearsOfExperience: string;
    portfolioUrl?: string;
    linkedInProfile?: string;
    githubProfile?: string;
    resumeUrl: string;
    coverLetter?: string;
  }) {
    return prisma.application.create({
      data,
    });
  }

  async update(id: string, data: UpdateApplicationDto) {
    return prisma.application.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.application.delete({
      where: { id },
    });
  }

  // Add count method for pagination
  async count() {
    return prisma.application.count();
  }

  // Add search method
  async search(args: any) {
    return prisma.application.findMany(args);
  }

  // Add filter method
  async filter(args: any) {
    return prisma.application.findMany(args);
  }
}

export const applicationRepository = new ApplicationRepository();
