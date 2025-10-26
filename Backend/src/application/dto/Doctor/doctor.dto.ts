import type { EducationItem } from "../../../domain/entities/Doctor/education.entity";

export interface CreateDoctorDto {
  user_id: string;
  medical_license: string;
  specialty_id?: string;
  bio?: string;
  experience_years?: number;
  education?: EducationItem[];
  languages?: string[];
  consultation_fee?: number;
  accepts_insurance?: boolean;
  is_accepting_patients?: boolean;
}

export interface UpdateDoctorDto {
  medical_license?: string;
  specialty_id?: string;
  bio?: string;
  experience_years?: number;
  education?: EducationItem[];
  languages?: string[];
  consultation_fee?: number;
  accepts_insurance?: boolean;
  is_accepting_patients?: boolean;
  verified_at?: Date;
}
