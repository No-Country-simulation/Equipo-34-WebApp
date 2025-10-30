import type { Patient } from "./patient.entity";
import type { Consultation } from "../Consults/consultation.entity";
import { FollowUpType } from "../enums/Follow-up/type.enum";
import { FollowUpPriority } from "../enums/Follow-up/priority.enum";
import { FollowUpStatus } from "../enums/Follow-up/status.enum";

export interface PatientFollowUp {
  id: string;
  patient_id: string;
  type: FollowUpType;
  title: string;
  description?: string;
  due_date: Date;
  completed_date?: Date;
  notes?: string;
  priority: FollowUpPriority;
  consultation_id?: string;
  assigned_to?: string;
  status: FollowUpStatus;
  created_at: Date;
  updated_at: Date;

  patient?: Patient;
  consultation?: Consultation;
}
