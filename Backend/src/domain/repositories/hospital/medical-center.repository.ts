import type {
  create_medical_center_dto,
  update_medical_center_dto,
} from "../../../application/dto/Hospital/medical-center.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { medical_center } from "../../entities/Hospital/medical-center.entity";

export interface medical_center_repository {
  find_all(
    page: number,
    limit: number
  ): Promise<{ data: medical_center[]; pagination: Pagination }>;
  find_by_id(id: string): Promise<medical_center>;
  find_by_name(
    name: string,
    page: number,
    limit: number
  ): Promise<{ data: medical_center[]; pagination: Pagination }>;
  create_medical_center(
    center_data: create_medical_center_dto
  ): Promise<medical_center>;
  update_medical_center(
    id: string,
    center_data: update_medical_center_dto
  ): Promise<medical_center>;
}
