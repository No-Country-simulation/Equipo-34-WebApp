import type { Pagination } from "../../../application/dto/pagination.dto";
import type { create_permission_dto } from "../../../application/dto/permissions.dto";
import type { Permission } from "../../../infrastructure/external/DataBases/generated/prisma";

export interface permission_repository {
  get_permissions(
    page: number,
    limit: number
  ): Promise<{ data: Permission[]; pagination: Pagination }>;
  create_permission(
    permission_data: create_permission_dto
  ): Promise<Permission>;
  search_permission(permission_id: number): Promise<Permission | null>;
  update_permission(
    permission_id: number,
    permission_data: create_permission_dto
  ): Promise<Permission>;
  delete_permission(permission_id: number): Promise<null>;
}
