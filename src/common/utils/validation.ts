import { z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100),
    email: z.string().email("Invalid email address").toLowerCase(),
    phoneNumber: z.string().min(10, "Invalid phone number").max(15),
    position: z.string().min(1, "Position is required"),
    yearsOfExperience: z.string().min(1, "Years of experience is required"),
    portfolioUrl: z.string().optional().nullable(),
    linkedInProfile: z.string().optional().nullable(),
    githubProfile: z.string().optional().nullable(),
    coverLetter: z.string().optional().nullable(),
    resumeUrl: z.string().min(1, "Resume URL is required"),
  }),
});

export const updateApplicationSchema = z.object({
  body: createApplicationSchema.shape.body.partial(),
});

//////////////

export const createLeadSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),

    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .regex(/^[0-9+\-\s()]{0,15}$/, "Please enter a valid phone number")
      .optional()
      .or(z.literal("")),

    company: z
      .string()
      .max(100, "Company name must be less than 100 characters")
      .optional()
      .or(z.literal("")),

    service: z.string().min(1, "Please select a service"),

    budget: z.string().optional().or(z.literal("")),

    details: z
      .string()
      .max(2000, "Project details must be less than 2000 characters")
      .optional()
      .or(z.literal("")),
  }),
});

export const updateLeadSchema = z.object({
  body: createLeadSchema.shape.body.partial(),
});

export const subscribeEmailSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .toLowerCase()
      .trim(),
  }),
});

export interface CreateSubscriberDto {
  email: string;
}

// ==========================================
// ENUM VALIDATORS
// ==========================================

export const LeadStatusEnum = z.enum([
  "NEW",
  "CONTACTED",
  "INTERESTED",
  "FOLLOW_UP",
  "NOT_INTERESTED",
  "CONVERTED",
  "LOST",
]);

export const EmailStatusEnum = z.enum(["NOT_SENT", "SENT", "FAILED"]);

export const WhatsAppStatusEnum = z.enum([
  "NOT_SENT",
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
]);

export const MessageChannelEnum = z.enum(["EMAIL", "WHATSAPP", "SYSTEM"]);

export const MessageLogStatusEnum = z.enum([
  "PENDING",
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
]);

export const LogLevelEnum = z.enum(["INFO", "WARNING", "ERROR"]);

// ==========================================
// REUSABLE FIELD VALIDATORS (no body wrapper — used inside schemas)
// ==========================================

const phoneRegex = /^\+?[1-9]\d{9,14}$/;

const phoneField = z
  .string()
  .trim()
  .refine((v) => v === "" || phoneRegex.test(v.replace(/[\s\-().]/g, "")), {
    message: "Invalid phone number format",
  })
  .optional()
  .nullable();

const emailField = z
  .string()
  .trim()
  .email("Invalid email address")
  .optional()
  .nullable()
  .or(z.literal("").transform(() => null));

const urlField = z
  .string()
  .trim()
  .url("Invalid URL")
  .optional()
  .nullable()
  .or(z.literal("").transform(() => null));

const ratingField = z
  .number()
  .min(0, "Rating cannot be below 0")
  .max(5, "Rating cannot exceed 5")
  .optional()
  .nullable();

const reviewCountField = z
  .number()
  .int("Review count must be an integer")
  .min(0, "Review count cannot be negative")
  .optional()
  .nullable();

// ==========================================
// BUSINESS LIST
// ==========================================

export const createBusinessListSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    category: z.string().trim().min(1, "Category is required").max(100),
    location: z.string().trim().max(200).optional().nullable(),
    keyword: z.string().trim().max(200).optional().nullable(),
    description: z.string().trim().max(5000).optional().nullable(),
  }),
});

export const updateBusinessListSchema = z.object({
  body: createBusinessListSchema.shape.body.partial(),
});

export const businessListIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid list id"),
  }),
});

// ==========================================
// BUSINESS — SINGLE
// ==========================================

export const createBusinessSchema = z.object({
  body: z.object({
    businessListId: z.string().uuid("Invalid business list id"),

    placeId: z.string().trim().max(255).optional().nullable(),
    businessName: z
      .string()
      .trim()
      .min(1, "Business name is required")
      .max(300),
    category: z.string().trim().max(200).optional().nullable(),
    phoneNumber: phoneField,
    email: emailField,
    website: urlField,
    fullAddress: z.string().trim().max(500).optional().nullable(),
    city: z.string().trim().max(200).optional().nullable(),
    googleMapsUrl: urlField,

    rating: ratingField,
    reviewCount: reviewCountField,

    contactPerson: z.string().trim().max(200).optional().nullable(),

    leadStatus: LeadStatusEnum.optional(),
    notes: z.string().trim().max(10000).optional().nullable(),
    lastContactedAt: z.coerce.date().optional().nullable(),
    nextFollowUpAt: z.coerce.date().optional().nullable(),

    emailStatus: EmailStatusEnum.optional(),
    lastEmailSentAt: z.coerce.date().optional().nullable(),
    emailCount: z.number().int().min(0).optional(),

    whatsappStatus: WhatsAppStatusEnum.optional(),
    lastWhatsAppSentAt: z.coerce.date().optional().nullable(),
    whatsappCount: z.number().int().min(0).optional(),

    whatsappOptIn: z.boolean().optional(),
    whatsappOptInAt: z.coerce.date().optional().nullable(),
  }),
});

export const updateBusinessSchema = z.object({
  body: createBusinessSchema.shape.body
    .omit({ businessListId: true })
    .partial(),
});

export const businessIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid business id"),
  }),
});

// ==========================================
// BUSINESS — BULK IMPORT (from scraper extension)
// ==========================================

// NOTE: this item schema has NO body wrapper — it's a nested array item.
export const scrapedBusinessItemSchema = z.object({
  placeId: z.string().trim().max(255).optional().nullable(),
  businessName: z.string().trim().min(1, "Business name is required").max(300),
  category: z.string().trim().max(200).optional().nullable(),
  phoneNumber: phoneField,
  email: emailField,
  website: urlField,
  fullAddress: z.string().trim().max(500).optional().nullable(),
  city: z.string().trim().max(200).optional().nullable(),
  googleMapsUrl: urlField,
  rating: ratingField,
  reviewCount: reviewCountField,
});

export const bulkImportBusinessSchema = z.object({
  body: z.object({
    businessListId: z.string().uuid("Invalid business list id"),
    businesses: z
      .array(scrapedBusinessItemSchema)
      .min(1, "At least one business is required")
      .max(500, "Max 500 businesses per batch"),
  }),
});

// ==========================================
// BUSINESS — QUERY / FILTER
// ==========================================

export const listBusinessQuerySchema = z.object({
  query: z.object({
    businessListId: z.string().uuid().optional(),
    city: z.string().trim().max(200).optional(),
    category: z.string().trim().max(200).optional(),
    leadStatus: LeadStatusEnum.optional(),
    emailStatus: EmailStatusEnum.optional(),
    whatsappStatus: WhatsAppStatusEnum.optional(),
    minRating: z.coerce.number().min(0).max(5).optional(),
    minReviewCount: z.coerce.number().int().min(0).optional(),
    search: z.string().trim().max(200).optional(),

    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sortBy: z
      .enum([
        "createdAt",
        "rating",
        "reviewCount",
        "businessName",
        "nextFollowUpAt",
      ])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});

// ==========================================
// EMAIL HISTORY
// ==========================================

export const createEmailHistorySchema = z.object({
  body: z.object({
    businessId: z.string().uuid("Invalid business id"),
    recipient: z.string().trim().email("Invalid recipient email"),
    subject: z.string().trim().min(1, "Subject is required").max(500),
    body: z.string().trim().min(1, "Body is required").max(50000),
    status: MessageLogStatusEnum.optional(),
    providerMessageId: z.string().trim().max(255).optional().nullable(),
    errorMessage: z.string().trim().max(5000).optional().nullable(),
    sentAt: z.coerce.date().optional().nullable(),
  }),
});

// ==========================================
// WHATSAPP HISTORY
// ==========================================

export const createWhatsAppHistorySchema = z.object({
  body: z.object({
    businessId: z.string().uuid("Invalid business id"),
    recipient: z.string().trim().min(5, "Recipient is required").max(30),
    message: z.string().trim().min(1, "Message is required").max(10000),
    templateName: z.string().trim().max(200).optional().nullable(),
    status: MessageLogStatusEnum.optional(),
    providerMessageId: z.string().trim().max(255).optional().nullable(),
    errorMessage: z.string().trim().max(5000).optional().nullable(),
    sentAt: z.coerce.date().optional().nullable(),
    deliveredAt: z.coerce.date().optional().nullable(),
    readAt: z.coerce.date().optional().nullable(),
  }),
});

// ==========================================
// ACTIVITY LOG
// ==========================================

export const createActivityLogSchema = z.object({
  body: z.object({
    businessId: z.string().uuid().optional().nullable(),
    channel: MessageChannelEnum,
    level: LogLevelEnum.optional(),
    action: z.string().trim().min(1, "Action is required").max(200),
    status: MessageLogStatusEnum.optional().nullable(),
    message: z.string().trim().max(5000).optional().nullable(),
    details: z.record(z.string(), z.any()).optional().nullable(),
  }),
});

export const updateWhatsAppHistorySchema = z.object({
  body: z.object({
    status: MessageLogStatusEnum.optional(),
    providerMessageId: z.string().trim().max(255).optional().nullable(),
    errorMessage: z.string().trim().max(5000).optional().nullable(),
    sentAt: z.coerce.date().optional().nullable(),
    deliveredAt: z.coerce.date().optional().nullable(),
    readAt: z.coerce.date().optional().nullable(),
  }),
});

// ==========================================
// TYPE EXPORTS — extract .body so DTOs stay flat
// ==========================================

export type CreateBusinessListInput = z.infer<
  typeof createBusinessListSchema
>["body"];
export type UpdateBusinessListInput = z.infer<
  typeof updateBusinessListSchema
>["body"];

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>["body"];
export type UpdateBusinessInput = z.infer<typeof updateBusinessSchema>["body"];
export type ScrapedBusinessItem = z.infer<typeof scrapedBusinessItemSchema>;
export type BulkImportBusinessInput = z.infer<
  typeof bulkImportBusinessSchema
>["body"];
export type ListBusinessQuery = z.infer<
  typeof listBusinessQuerySchema
>["query"];

export type CreateEmailHistoryInput = z.infer<
  typeof createEmailHistorySchema
>["body"];
export type CreateWhatsAppHistoryInput = z.infer<
  typeof createWhatsAppHistorySchema
>["body"];
export type CreateActivityLogInput = z.infer<
  typeof createActivityLogSchema
>["body"];
