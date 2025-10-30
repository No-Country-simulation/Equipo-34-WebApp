import type { update_user_dto } from "../../../application/dto/User/auth.dto";
import type { User } from "../../../domain/entities/User/user.entity";
import type { auth_repository } from "../../../domain/repositories/auth/auth.repository";
import Prisma from "../../config/DataBases/prisma.config";
import type { User as Prisma_user } from "../../external/DataBases/generated/prisma";
import type {
  log_user_validation,
  register_user_validation,
} from "../../external/Validation/auth.validation";
export class auth_repository_implemented implements auth_repository {
  async register(user_data: register_user_validation): Promise<User> {
    const now = new Date();
    const new_user = await Prisma.user.create({
      data: {
        ...user_data,
        created_at: now,
      },
    });

    return new_user as unknown as User;
  }

  async login(user_data: log_user_validation): Promise<User> {
    const user = await Prisma.user.findUnique({
      where: { email: user_data.email },
    });
    return user as unknown as User;
  }

  async mark_as_verified(user_id: string): Promise<User> {
    const user = await Prisma.user.update({
      where: { id: user_id },
      data: {
        is_verified: true,
      },
    });

    return user as unknown as User;
  }

  async update_user(email: string, user_data: update_user_dto): Promise<User> {
    const user: Prisma_user = await Prisma.user.update({
      where: { email: email },
      data: user_data,
    });
    return user as unknown as User;
  }

  async delete_user(email: string): Promise<null> {
    await Prisma.user.delete({
      where: { email: email },
    });

    return null;
  }
}
