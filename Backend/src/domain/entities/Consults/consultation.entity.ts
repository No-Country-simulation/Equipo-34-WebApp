import type { Doctor } from "../Doctor/doctor.entity";
import type { Patient } from "../Patient/patient.entity";
import type { Appointment } from "../Appointment/appointment.entity";
import type { VitalSigns } from "./vital-signs.entity";
import type { PrescriptionItem } from "./prescription-item.entity";
import type { LabOrder } from "../Doctor/lab-order.entity";
import type { ImagingOrder } from "../Doctor/imaging-order.entity";
import type { MedicalDocument } from "../Patient/medical-documents.entity";
import type { PatientFollowUp } from "../Patient/follow-up.entity";

export interface Consultation {
  id: string;
  appointment_id: string;
  doctor_id: string;
  patient_id: string;

  // Consultation details
  chief_complaint: string;
  history_present_illness?: string;
  symptoms?: string;
  duration_minutes?: number;

  // Physical examination
  vital_signs?: VitalSigns;
  physical_exam?: string;
  observations?: string;

  // Diagnosis & Treatment
  diagnosis?: string;
  diagnosis_codes: string[];
  treatment_plan?: string;
  prescriptions?: PrescriptionItem[];
  lab_orders?: LabOrder[];
  imaging_orders?: ImagingOrder[];
  recommendations?: string;

  // Follow-up
  follow_up_required: boolean;
  follow_up_date?: Date;
  follow_up_notes?: string;

  // Status
  is_completed: boolean;

  // Relations
  appointment?: Appointment;
  doctor?: Doctor;
  patient?: Patient;
  medical_documents?: MedicalDocument[];
  follow_ups?: PatientFollowUp[];

  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}
