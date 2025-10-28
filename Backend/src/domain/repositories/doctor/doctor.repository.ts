import type {
  create_doctor_dto,
  update_doctor_dto,
} from "../../../application/dto/Doctor/doctor.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { Doctor } from "../../entities/Doctor/doctor.entity";

export interface doctor_repository {
  find_all(
    page: number,
    limit: number
  ): Promise<{ data: Doctor[]; pagination: Pagination }>;
  find_one(user_id: string): Promise<Doctor>;
  create_doctor(doctor_data: create_doctor_dto): Promise<Doctor>;
  update_doctor(doctor_data: update_doctor_dto): Promise<Doctor>;
}
