import type { AppointmentPriority } from "../../../domain/entities/enums/Appointment/appointment-priority.enum";
import type { AppointmentStatus } from "../../../domain/entities/enums/Appointment/appointment-statu.enum";
import type { AppointmentType } from "../../../domain/entities/enums/Appointment/appointment-type.enum";

export interface create_appointment_dto {
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
}

export interface update_appointment_dto {
  patient_id?: string;
  doctor_id?: string;

  // Timing
  start_time?: Date;
  end_time?: Date;
  duration_minutes?: number;

  // Status & Type
  status?: AppointmentStatus;
  appointment_type?: AppointmentType;
  is_virtual?: boolean;
  priority?: AppointmentPriority;

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
  reminder_sent?: boolean;
  reminder_sent_at?: Date;
}
