import type { User } from "../../../domain/entities/User/user.entity";
import { Token } from "../../../infrastructure/external/Utils/jwt.util";

export class create_token {
  async run(user_data: User) {
    const token = Token({
      user_id: user_data.id,
      name: user_data.name,
      email: user_data.email,
      role: user_data.role!,
    });

    return token;
  }
}
