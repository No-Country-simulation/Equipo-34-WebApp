import type { User } from "../../entities/user.entity";

export interface user_repository {
  get_users(): Promise<User[] | null>;
  search_user_by_ID(id: string): Promise<User>;
  search_user_by_email(email: string): Promise<User>;
  create_user(user_data: User): Promise<User>;
  update_user(id: string, user_data: User): Promise<User>;
  delete_user(id: string): Promise<null>;
}
