import type { Role } from "./role.entity";
export interface User {
  id: string;
  email: string;
  name: string;
  last_name: string;
  password: string;
  phone: string;
  emergency_contact: string | null;
  two_factor_auth: Date | null;
  role_id: number;
  role?: Role; // Relación directa
  created_at: Date;
  updated_at: Date;
}
