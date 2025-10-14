import type { User } from "../../../domain/entities/user.entity";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import Prisma from "../../config/DataBases/prisma.config";

export class user_repository_implemented implements user_repository {
  async get_users(): Promise<User[]> {
    const users = await Prisma.user.findMany({
      include: {
        role: true,
      },
    });
    return users;
  }

  async search_user_by_ID(id: string): Promise<User | null> {
    const user: User | null = await Prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });

    return user;
  }

  async search_user_by_email(email: string): Promise<User | null> {
    const user = await Prisma.user.findFirst({
      where: { email: email },
      include: { role: true },
    });
    return user;
  }
}
