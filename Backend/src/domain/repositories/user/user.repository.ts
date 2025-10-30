import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { User } from "../../entities/User/user.entity";

export interface user_repository {
  get_users(
    page: number,
    limit: number
  ): Promise<{ data: User[]; pagination: Pagination }>;
  find_users_unverified(
    page: number,
    limit: number,
    before: Date
  ): Promise<{ data: User[]; pagination: Pagination }>;
  search_user_by_ID(id: string): Promise<User | null>;
  search_user_by_email(email: string): Promise<User | null>;
}
