import type { Doctor } from "./doctor.entity";

export interface Specialty {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  is_active: boolean;
  display_order: number;

  created_at: Date;
  updated_at: Date;

  doctors?: Doctor[];
}
