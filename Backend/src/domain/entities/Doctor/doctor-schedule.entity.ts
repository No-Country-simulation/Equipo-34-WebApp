import type { Doctor } from "./doctor.entity";
import type { MedicalCenter } from "../Hospital/medical-center.entity";

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration: number;
  break_time: number;
  medical_center_id?: string;
  is_active: boolean;
  valid_from: Date;
  valid_until?: Date;
  created_at: Date;
  updated_at: Date;

  doctor?: Doctor;
  medical_center?: MedicalCenter;
}
