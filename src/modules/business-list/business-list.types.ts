export interface CreateBusinessListDto {
  title: string;
  category: string;
  location?: string | null;
  keyword?: string | null;
  description?: string | null;
}

export interface UpdateBusinessListDto {
  title?: string;
  category?: string;
  location?: string | null;
  keyword?: string | null;
  description?: string | null;
}