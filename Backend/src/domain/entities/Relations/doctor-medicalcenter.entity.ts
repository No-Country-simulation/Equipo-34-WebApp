import type { Doctor } from "../Doctor/doctor.entity";
import type { MedicalCenter } from "../Hospital/medical-center.entity";

export interface DoctorMedicalCenter {
  id: string;
  doctor_id: string;
  medical_center_id: string;
  is_primary: boolean;
  joined_at: Date;

  doctor?: Doctor;
  medical_center?: MedicalCenter;
}
