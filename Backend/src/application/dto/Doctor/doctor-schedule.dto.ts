export interface create_doctor_schedule_dto {
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
}

export interface update_doctor_schedule_dto {
  doctor_id?: string;
  day_of_week?: number;
  start_time?: string;
  end_time?: string;
  slot_duration?: number;
  break_time?: number;
  medical_center_id?: string;
  is_active?: boolean;
  valid_from?: Date;
  valid_until?: Date;
}
