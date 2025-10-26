import type { Doctor } from "./doctor.entity";
import { BlockType } from "../enums/Doctor/Block-type.enum";

export interface ScheduleBlock {
  id: string;
  doctor_id: string;
  title: string;
  block_type: BlockType;
  start_time: Date;
  end_time: Date;
  reason?: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
  recurrence_end?: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;

  doctor?: Doctor;
}
