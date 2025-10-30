import type { Appointment } from "../Appointment/appointment.entity";
import type { DoctorMedicalCenter } from "../Relations/doctor-medicalcenter.entity";
import type { doctor_schedule } from "../Doctor/doctor-schedule.entity";

export interface medical_center {
  id: string;
  name: string;
  description?: string;

  // Address
  address_street: string;
  address_city: string;
  address_state: string;
  address_country: string;
  address_postal_code: string;

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Coordinates
  latitude?: number;
  longitude?: number;

  // Operating hours
  opening_time?: string;
  closing_time?: string;

  // Status
  is_active: boolean;

  created_at: Date;
  updated_at: Date;

  // Relations
  appointments?: Appointment[];
  doctors?: DoctorMedicalCenter[];
  doctor_schedules?: doctor_schedule[];
}
