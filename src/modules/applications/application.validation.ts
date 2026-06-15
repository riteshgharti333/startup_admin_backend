import { z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    data: z
      .string()
      .transform((str) => JSON.parse(str))
      .pipe(
        z.object({
          fullName: z
            .string()
            .min(2, "Full name must be at least 2 characters")
            .max(100),
          email: z.string().email("Invalid email address").toLowerCase(),
          phoneNumber: z.string().min(10, "Invalid phone number").max(15),
          position: z.string().min(1, "Position is required"),

          yearsOfExperience: z
            .string()
            .min(1, "Years of experience is required"),
          portfolioUrl: z
            .string()
            .url("Invalid portfolio URL")
            .nullable()
            .optional(),
          linkedInProfile: z
            .string()
            .url("Invalid LinkedIn URL")
            .nullable()
            .optional(),
          githubProfile: z
            .string()
            .url("Invalid GitHub URL")
            .nullable()
            .optional(),
          coverLetter: z.string().optional(),
        }),
      ),
  }),
});
