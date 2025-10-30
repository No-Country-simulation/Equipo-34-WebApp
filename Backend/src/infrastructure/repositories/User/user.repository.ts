import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { User } from "../../../domain/entities/User/user.entity";
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
    });
    return {
      data: users as User[],
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

  async find_users_unverified(
    page: number,
    limit: number,
    before: Date
  ): Promise<{ data: User[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.user.count();
    const total_pages = Math.ceil(total / limit);
    const users = await Prisma.user.findMany({
      where: {
        is_verified: false,
        verification_token_expires: {
          lt: before,
        },
      },
      skip,
      take: limit,
    });
    return {
      data: users as User[],
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
    const user = await Prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return user as User;
  }

  async search_user_by_email(email: string): Promise<User | null> {
    const user = await Prisma.user.findUnique({
      where: { email: email },
    });
    return user ? (user as User) : null;
  }
}
