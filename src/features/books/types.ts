export type Book = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  link: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type BookLead = {
  id: string;
  email: string;
  phone: string;
  book_id: string;
  created_at: string;
};
