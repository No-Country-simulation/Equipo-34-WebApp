import type {
  log_user_dto,
  register_user_dto,
  update_user_dto,
} from "../../../application/dto/User/auth.dto";
import type { User } from "../../entities/User/user.entity";

export interface auth_repository {
  register(user_data: register_user_dto): Promise<User>;
  login(user_data: log_user_dto): Promise<User | null>;
  mark_as_verified(user_id: string): Promise<User>;
  update_user(email: string, user_data: update_user_dto): Promise<User>;
  delete_user(email: string): Promise<null>;
}
