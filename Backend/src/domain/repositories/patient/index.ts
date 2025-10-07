import type { Patient } from "../../entities/patient.entity";

export interface patient_repository {
  get_all_patients(): Promise<Patient[]>;
  search_patient(id: string): Promise<Patient>;
  create_patient(new_patient: Patient): Promise<Patient>;
  update_patient(data: Patient): Promise<Patient>;
  delete_patient(id: string): Promise<void>;
}
