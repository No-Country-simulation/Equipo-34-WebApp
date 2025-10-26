import type { Patient } from "./patient.entity";
import { SmokingStatus } from "../enums/Patient/smoking-status.enum";
import { BloodType } from "../enums/Patient/blood-type.enum";
import { AlcoholConsumption } from "../enums/Patient/alcohol-consumption.enum";
import { ExerciseFrequency } from "../enums/Patient/exercise-frecuency";
import type { Immunization } from "./inmunization.entity";

export interface MedicalHistory {
  id: string;
  patient_id: string;
  blood_type?: BloodType;
  height?: number;
  weight?: number;
  allergies?: string;
  chronic_conditions?: string;
  current_medications?: string;
  family_history?: string;
  surgical_history?: string;
  trauma_history?: string;
  immunizations?: Immunization[];
  habits?: string;
  smoking_status?: SmokingStatus;
  alcohol_consumption?: AlcoholConsumption;
  exercise_frequency?: ExerciseFrequency;
  notes?: string;

  created_at: Date;
  updated_at: Date;

  patient?: Patient;
}
