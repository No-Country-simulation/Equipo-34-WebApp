import type { User } from "../../entities/user.entity";

export interface user_repository {
  get_users(): Promise<User[]>;
  search_user_by_ID(id: string): Promise<User | null>;
  search_user_by_email(email: string): Promise<User | null>;
  delete_user(id: string): Promise<null>;
}
