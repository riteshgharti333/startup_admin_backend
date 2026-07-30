export interface CreateLeadDto {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  details?: string;
}

export interface UpdateLeadDto {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  details?: string;
}