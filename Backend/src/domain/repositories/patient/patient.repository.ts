import type { update_patient_dto } from "../../../application/dto/Patient/patient.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { Patient } from "../../entities/Patient/patient.entity";

export interface patient_repository {
  get_all(
    page: number,
    limit: number
  ): Promise<{ data: Patient[]; pagination: Pagination }>;
  find_patient(user_id: string): Promise<Patient>;
  create_patient(user_id: string): Promise<Patient>;
  update_patient(
    user_id: string,
    update_patient_dto: update_patient_dto
  ): Promise<Patient>;
}
