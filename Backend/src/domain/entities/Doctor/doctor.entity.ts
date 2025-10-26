import type { User } from "../User/user.entity";
import type { DoctorMedicalCenter } from "../Relations/doctor-medicalcenter.entity";
import type { DoctorSchedule } from "../../../infrastructure/external/DataBases/generated/prisma";
import type { Specialty } from "./specialty.entity";
import type { ScheduleBlock } from "./schedule-block.entity";
import type { Appointment } from "../Appointment/appointment.entity";
import type { Consultation } from "../Consults/consultation.entity";
import type { EducationItem } from "./education.entity";

export interface Doctor {
  id: string;
  user_id: string;
  medical_license: string;
  specialty_id?: string;
  bio?: string;
  experience_years?: number;
  education?: EducationItem[];
  languages: string[];

  // Professional details
  consultation_fee?: number;
  accepts_insurance: boolean;
  rating_average?: number;
  rating_count: number;

  // Status
  is_accepting_patients: boolean;
  verified_at?: Date;

  // Timestamps
  created_at: Date;
  updated_at: Date;

  // Relations
  user?: User;
  specialty?: Specialty;
  affiliated_centers?: DoctorMedicalCenter[];
  schedules?: DoctorSchedule[];
  schedule_blocks?: ScheduleBlock[];
  appointments?: Appointment[];
  consultations?: Consultation[];
}
