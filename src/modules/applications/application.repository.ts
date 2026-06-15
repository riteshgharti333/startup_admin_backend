import { prisma } from "../../database/client";

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

  async delete(id: string) {
    return prisma.application.delete({
      where: { id },
    });
  }
}

export const applicationRepository = new ApplicationRepository();
