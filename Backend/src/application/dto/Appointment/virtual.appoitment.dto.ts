export interface create_virtual_appointment {
  patient_id: string;
  doctor_id: string;
  start_time: string; // ISO
  duration_minutes: number;
  reason?: string;
}
