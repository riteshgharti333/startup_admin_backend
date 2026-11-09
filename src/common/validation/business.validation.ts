import { z } from "zod";

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
// REUSABLE FIELD VALIDATORS
// ==========================================

// E.164-ish phone: +12125550100 or plain 10-15 digits
const phoneRegex = /^\+?[1-9]\d{9,14}$/;

const phoneField = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || phoneRegex.test(v.replace(/[\s\-().]/g, "")),
    { message: "Invalid phone number format" }
  )
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
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).trim().min(1, "Title is required").max(200),

  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string",
  }).trim().min(1, "Category is required").max(100),

  location: z.string().trim().max(200).optional(),
  keyword: z.string().trim().max(200).optional(),
  description: z.string().trim().max(5000).optional(),
});

export const updateBusinessListSchema = createBusinessListSchema.partial();

export const businessListIdParamSchema = z.object({
  id: z.string().uuid("Invalid list id"),
});

// ==========================================
// BUSINESS — SINGLE
// ==========================================

export const createBusinessSchema = z.object({
  businessListId: z.string().uuid("Invalid business list id"),

  // Google Maps
  placeId: z.string().trim().max(255).optional().nullable(),
  businessName: z.string().trim().min(1, "Business name is required").max(300),
  category: z.string().trim().max(200).optional().nullable(),
  phoneNumber: phoneField,
  email: emailField,
  website: urlField,
  fullAddress: z.string().trim().max(500).optional().nullable(),
  city: z.string().trim().max(200).optional().nullable(),
  googleMapsUrl: urlField,

  // Quality signals
  rating: ratingField,
  reviewCount: reviewCountField,

  // Contact
  contactPerson: z.string().trim().max(200).optional().nullable(),

  // Lead management
  leadStatus: LeadStatusEnum.optional(),
  notes: z.string().trim().max(10000).optional().nullable(),
  lastContactedAt: z.coerce.date().optional().nullable(),
  nextFollowUpAt: z.coerce.date().optional().nullable(),

  // Email tracking
  emailStatus: EmailStatusEnum.optional(),
  lastEmailSentAt: z.coerce.date().optional().nullable(),
  emailCount: z.number().int().min(0).optional(),

  // WhatsApp tracking
  whatsappStatus: WhatsAppStatusEnum.optional(),
  lastWhatsAppSentAt: z.coerce.date().optional().nullable(),
  whatsappCount: z.number().int().min(0).optional(),

  // WhatsApp permission
  whatsappOptIn: z.boolean().optional(),
  whatsappOptInAt: z.coerce.date().optional().nullable(),
});

export const updateBusinessSchema = createBusinessSchema
  .omit({ businessListId: true })
  .partial();

export const businessIdParamSchema = z.object({
  id: z.string().uuid("Invalid business id"),
});

// ==========================================
// BUSINESS — BULK IMPORT (from scraper extension)
// ==========================================

// Lighter than createBusinessSchema — only the fields the extension sends.
// Server fills defaults for the rest (leadStatus, counters, etc.)

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
  businessListId: z.string().uuid("Invalid business list id"),
  businesses: z
    .array(scrapedBusinessItemSchema)
    .min(1, "At least one business is required")
    .max(500, "Max 500 businesses per batch"),
});

// ==========================================
// BUSINESS — QUERY / FILTER
// ==========================================

export const listBusinessQuerySchema = z.object({
  businessListId: z.string().uuid().optional(),
  city: z.string().trim().max(200).optional(),
  category: z.string().trim().max(200).optional(),
  leadStatus: LeadStatusEnum.optional(),
  emailStatus: EmailStatusEnum.optional(),
  whatsappStatus: WhatsAppStatusEnum.optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  minReviewCount: z.coerce.number().int().min(0).optional(),
  search: z.string().trim().max(200).optional(), // matches businessName / phoneNumber / email

  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z
    .enum(["createdAt", "rating", "reviewCount", "businessName", "nextFollowUpAt"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// ==========================================
// EMAIL HISTORY
// ==========================================

export const createEmailHistorySchema = z.object({
  businessId: z.string().uuid("Invalid business id"),
  recipient: z.string().trim().email("Invalid recipient email"),
  subject: z.string().trim().min(1, "Subject is required").max(500),
  body: z.string().trim().min(1, "Body is required").max(50000),
  status: MessageLogStatusEnum.optional(),
  providerMessageId: z.string().trim().max(255).optional().nullable(),
  errorMessage: z.string().trim().max(5000).optional().nullable(),
  sentAt: z.coerce.date().optional().nullable(),
});

// ==========================================
// WHATSAPP HISTORY
// ==========================================

export const createWhatsAppHistorySchema = z.object({
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
});

// ==========================================
// ACTIVITY LOG
// ==========================================

export const createActivityLogSchema = z.object({
  businessId: z.string().uuid().optional().nullable(),
  channel: MessageChannelEnum,
  level: LogLevelEnum.optional(),
  action: z.string().trim().min(1, "Action is required").max(200),
  status: MessageLogStatusEnum.optional().nullable(),
  message: z.string().trim().max(5000).optional().nullable(),
  details: z.record(z.string(), z.any()).optional().nullable(),
});

// ==========================================
// TYPE EXPORTS (for use with prisma / services)
// ==========================================

export type CreateBusinessListInput = z.infer<typeof createBusinessListSchema>;
export type UpdateBusinessListInput = z.infer<typeof updateBusinessListSchema>;

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>;
export type UpdateBusinessInput = z.infer<typeof updateBusinessSchema>;
export type ScrapedBusinessItem = z.infer<typeof scrapedBusinessItemSchema>;
export type BulkImportBusinessInput = z.infer<typeof bulkImportBusinessSchema>;
export type ListBusinessQuery = z.infer<typeof listBusinessQuerySchema>;

export type CreateEmailHistoryInput = z.infer<typeof createEmailHistorySchema>;
export type CreateWhatsAppHistoryInput = z.infer<typeof createWhatsAppHistorySchema>;
export type CreateActivityLogInput = z.infer<typeof createActivityLogSchema>;