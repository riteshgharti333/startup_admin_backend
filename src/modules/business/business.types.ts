export interface CreateBusinessDto {
  businessListId: string;

  placeId?: string | null;
  businessName: string;
  category?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  fullAddress?: string | null;
  city?: string | null;
  googleMapsUrl?: string | null;

  rating?: number | null;
  reviewCount?: number | null;

  contactPerson?: string | null;

  leadStatus?: "NEW" | "CONTACTED" | "INTERESTED" | "FOLLOW_UP" | "NOT_INTERESTED" | "CONVERTED" | "LOST";
  notes?: string | null;
  lastContactedAt?: Date | null;
  nextFollowUpAt?: Date | null;

  emailStatus?: "NOT_SENT" | "SENT" | "FAILED";
  lastEmailSentAt?: Date | null;
  emailCount?: number;

  whatsappStatus?: "NOT_SENT" | "SENT" | "DELIVERED" | "READ" | "FAILED";
  lastWhatsAppSentAt?: Date | null;
  whatsappCount?: number;

  whatsappOptIn?: boolean;
  whatsappOptInAt?: Date | null;
}

export interface UpdateBusinessDto {
  placeId?: string | null;
  businessName?: string;
  category?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  fullAddress?: string | null;
  city?: string | null;
  googleMapsUrl?: string | null;

  rating?: number | null;
  reviewCount?: number | null;

  contactPerson?: string | null;

  leadStatus?: "NEW" | "CONTACTED" | "INTERESTED" | "FOLLOW_UP" | "NOT_INTERESTED" | "CONVERTED" | "LOST";
  notes?: string | null;
  lastContactedAt?: Date | null;
  nextFollowUpAt?: Date | null;

  emailStatus?: "NOT_SENT" | "SENT" | "FAILED";
  lastEmailSentAt?: Date | null;
  emailCount?: number;

  whatsappStatus?: "NOT_SENT" | "SENT" | "DELIVERED" | "READ" | "FAILED";
  lastWhatsAppSentAt?: Date | null;
  whatsappCount?: number;

  whatsappOptIn?: boolean;
  whatsappOptInAt?: Date | null;
}

// What the extension sends per business
export interface ScrapedBusinessDto {
  placeId?: string | null;
  businessName: string;
  category?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  fullAddress?: string | null;
  city?: string | null;
  googleMapsUrl?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
}

export interface BulkImportBusinessDto {
  businessListId: string;
  businesses: ScrapedBusinessDto[];
}

export interface BulkImportResult {
  inserted: number;
  updated: number;
  skipped: number;
  failed: number;
  errors: { index: number; businessName: string; reason: string }[];
}