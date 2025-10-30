import type { education_item } from "../../../domain/entities/Doctor/education.entity";

export interface create_doctor_dto {
  user_id?: string;
  medical_license: string;
  specialty_id?: string;
  bio?: string;
  experience_years?: number;
  education?: education_item[];
  languages?: string[];
  consultation_fee?: number;
  accepts_insurance?: boolean;
  is_accepting_patients?: boolean;
}

export interface internal_create_doctor_dto {
  user_id: string;
  medical_license: string;
  specialty_id?: string;
  bio?: string;
  experience_years?: number;
  education?: education_item[];
  languages?: string[];
  consultation_fee?: number;
  accepts_insurance?: boolean;
  is_accepting_patients?: boolean;
}

export interface update_doctor_dto {
  medical_license?: string;
  specialty_id?: string | null; // Permitir null explícitamente
  bio?: string | null;
  experience_years?: number | null;
  education?: education_item[] | null; // Permitir null para limpiar el campo
  languages?: string[];
  consultation_fee?: number | null;
  accepts_insurance?: boolean;
  is_accepting_patients?: boolean;
  verified_at?: Date | null;
}
