import type { User } from "../User/user.entity";
import type { MedicalHistory } from "./medical-history.entity";
import type { MedicalDocument } from "./medical-documents.entity";
import type { Appointment } from "../Appointment/appointment.entity";
import type { PatientFollowUp } from "./follow-up.entity";
import type { Consultation } from "../Consults/consultation.entity";

export interface Patient {
  id: string;
  user_id: string;

  // Insurance information
  insurance_provider?: string;
  insurance_number?: string;
  insurance_expiry?: Date;

  // Emergency contact details
  emergency_name?: string;
  emergency_phone?: string;
  emergency_relation?: string;

  // Timestamps
  created_at: Date;
  updated_at: Date;

  // Relations
  user?: User;
  medical_history?: MedicalHistory;
  medical_documents?: MedicalDocument[];
  appointments?: Appointment[];
  follow_ups?: PatientFollowUp[];
  consultations?: Consultation[];
}
