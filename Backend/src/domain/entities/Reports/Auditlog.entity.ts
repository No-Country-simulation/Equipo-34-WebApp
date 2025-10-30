import type { User } from "../User/user.entity";
import { AuditAction } from "../enums/Report/audit-actions.enum";

export interface AuditLog {
  id: string;
  user_id?: string;
  action: AuditAction;
  entity_type: string;
  entity_id: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  description?: string;
  ip_address?: string;
  user_agent?: string;
  request_id?: string;
  success: boolean;
  error_message?: string;
  timestamp: Date;

  user?: User;
}
