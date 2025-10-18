import type { Role } from "./role.entity";

export interface Permission {
  id: number;
  name: string;
  description: string;
  roles?: Role[]; // Relación inversa
}
