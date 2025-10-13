import type {
  log_user_dto,
  register_user_dto,
  update_user_dto,
} from "../../../application/dto/auth.dto";
import type { User } from "../../../domain/entities/user.entity";
import type { auth_repository } from "../../../domain/repositories/auth/auth.repository";
//import { v4 as uuid } from "uuid";
import Prisma from "../../config/DataBases/prisma.config";

export class auth_repository_implemented implements auth_repository {
  async register(user_data: register_user_dto): Promise<User> {
    const now = new Date();
    const new_user = await Prisma.user.create({
      data: {
        //id: uuid(),
        ...user_data,
        created_at: now,
        updated_at: now,
      },
    });

    return new_user;
  }

  async login(user_data: log_user_dto): Promise<User | null> {
    const user: User | null = await Prisma.user.findUnique({
      where: { email: user_data.email },
      include: { role: true },
    });
    return user;
  }

  async update_user(email: string, user_data: update_user_dto): Promise<User> {
    const user = await Prisma.user.update({
      where: { email: email },
      data: user_data,
    });
    return user;
  }
}
