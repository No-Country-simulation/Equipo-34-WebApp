import type {
  create_doctor_schedule_dto,
  update_doctor_schedule_dto,
} from "../../../application/dto/Doctor/doctor-schedule.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { doctor_schedule } from "../../entities/Doctor/doctor-schedule.entity";

export interface doctor_schedule_repository {
  find_all(
    page: number,
    limit: number
  ): Promise<{ data: doctor_schedule[]; pagination: Pagination }>;
  find_one(id: string): Promise<doctor_schedule>;
  find_a_doctor_schedule(doctor_id: string): Promise<doctor_schedule[]>;
  create(schedule_data: create_doctor_schedule_dto): Promise<doctor_schedule>;
  update(schedule_data: update_doctor_schedule_dto): Promise<doctor_schedule>;
}
