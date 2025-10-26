import type { Patient } from "../Patient/patient.entity";
import type { Doctor } from "../Doctor/doctor.entity";
import type { Notification } from "./notify.entity";
import type { MedicalDocument } from "../Patient/medical-documents.entity";
import type { AuditLog } from "../Reports/Auditlog.entity";
import { Gender } from "../enums/User/gender.enum";
import { Role } from "../enums/User/role.enum";

export interface User {
  id: string;
  email: string;
  password: string;

  // Personal data
  name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: Date;
  dni?: string;
  emergency_contact?: string;
  gender?: Gender;
  avatar_url?: string;

  // Auth & Security
  role?: Role;
  is_verified: boolean;
  is_active: boolean;
  verification_token?: string;
  verification_token_expires?: Date;
  password_reset_token?: string;
  password_reset_expires?: Date;
  two_factor_enabled: boolean;
  two_factor_secret?: string;
  last_login_at?: Date;

  // Timestamps
  created_at: Date;
  updated_at: Date;

  // Relations (optional - for populated objects)
  patient_profile?: Patient;
  doctor_profile?: Doctor;
  notifications?: Notification[];
  audit_logs?: AuditLog[];
  uploaded_documents?: MedicalDocument[];
}
