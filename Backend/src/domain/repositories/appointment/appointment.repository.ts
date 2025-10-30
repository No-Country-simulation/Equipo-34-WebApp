import type {
  create_appointment_dto,
  update_appointment_dto,
} from "../../../application/dto/Appointment/appointment.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { Appointment } from "../../entities/Appointment/appointment.entity";

export interface appointment_repository {
  find_all(
    page: number,
    limit: number
  ): Promise<{ data: Appointment[]; pagination: Pagination }>;
  find_one(id: string): Promise<Appointment>;
  find_doctors_appointment(
    doctor_id: string,
    page: number,
    limit: number
  ): Promise<{ data: Appointment[]; pagination: Pagination }>;
  create_appointment(data: create_appointment_dto): Promise<Appointment>;
  update_appointment(data: update_appointment_dto): Promise<Appointment>;
}
