export interface create_physical_appointment_dto {
  patient_id: string;
  doctor_id: string;

  // Timing
  start_time: Date;
  end_time: Date;
  duration_minutes: number;
  medical_center_id?: string;
  consultation_room?: string;
}
