import type { Pagination } from "../../../application/dto/pagination.dto";
import type {
  create_role_dto,
  update_role_dto,
} from "../../../application/dto/role.dto";
import type { Role } from "../../entities/role.entity";

export interface role_repository {
  get_roles(
    page: number,
    limit: number
  ): Promise<{ data: Role[]; pagination: Pagination }>;
  create_role(role_data: create_role_dto): Promise<Role>;
  search_role(role_id: number): Promise<Role | null>;
  update_role(role_id: number, role_data: update_role_dto): Promise<Role>;
  delete_role(role_id: number): Promise<null>;
}
