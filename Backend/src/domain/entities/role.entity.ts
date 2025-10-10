import type { User } from "./user.entity";
import type { Permission } from "./permission.entity";

export interface Role {
  id: number;
  role_name: string;
  description: string;
  permissions_id: number;
  permission?: Permission; // Relación directa
  users?: User[]; // Relación inversa
  created_at: Date;
}
