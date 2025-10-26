import type { MedicalCenter } from "../Hospital/medical-center.entity";
import { AppointmentType } from "../enums/Appointment/appointment-type.enum";
import { AppointmentPriority } from "../enums/Appointment/appointment-priority.enum";
import { AppointmentStatus } from "../enums/Appointment/appointment-statu.enum";
import type { Patient } from "../Patient/patient.entity";
import type { Consultation } from "../Consults/consultation.entity";
import type { Doctor } from "../Doctor/doctor.entity";
import type { Notification } from "../User/notify.entity";

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;

  // Timing
  start_time: Date;
  end_time: Date;
  duration_minutes: number;

  // Status & Type
  status: AppointmentStatus;
  appointment_type: AppointmentType;
  is_virtual: boolean;
  priority: AppointmentPriority;

  // Location
  medical_center_id?: string;
  consultation_room?: string;

  // Virtual meeting
  teleconsult_url?: string;
  teleconsult_id?: string;

  // Details
  reason?: string;
  notes?: string;
  patient_notes?: string;
  cancellation_reason?: string;
  cancelled_by?: string;

  // Reminders
  reminder_sent: boolean;
  reminder_sent_at?: Date;

  // Timestamps
  created_at: Date;
  updated_at: Date;
  confirmed_at?: Date;
  started_at?: Date;
  completed_at?: Date;
  cancelled_at?: Date;

  // Relations
  patient_profile?: Patient;
  doctor_profile?: Doctor;
  medical_center?: MedicalCenter;
  consultation?: Consultation;
  notifications?: Notification[];
}
