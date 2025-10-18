import type { Pagination } from "../../../application/dto/pagination.dto";
import type { User } from "../../../domain/entities/user.entity";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import Prisma from "../../config/DataBases/prisma.config";

export class user_repository_implemented implements user_repository {
  async get_users(
    page: number,
    limit: number
  ): Promise<{ data: User[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.user.count();
    const total_pages = Math.ceil(total / limit);
    const users = await Prisma.user.findMany({
      skip,
      take: limit,
      include: {
        role: true,
      },
    });
    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        total_pages,
        hasNextPage: page < total_pages,
        hasPrevPage: page > 1,
      },
    };
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
    const user = await Prisma.user.findUnique({
      where: { email: email },
      include: { role: true },
    });
    return user ? user : null;
  }
}
