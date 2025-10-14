import type {
  create_role_dto,
  update_role_dto,
} from "../../../application/dto/role.dto";
import type { Role } from "../../../domain/entities/role.entity";
import type { role_repository } from "../../../domain/repositories/role/role.repository";
import Prisma from "../../config/DataBases/prisma.config";

export class role_repository_implemented implements role_repository {
  async get_roles(): Promise<Role[]> {
    const roles = await Prisma.role.findMany({
      include: { users: true },
    });
    return roles;
  }

  async create_role(role_data: create_role_dto): Promise<Role> {
    const now = new Date();
    const new_role = await Prisma.role.create({
      data: {
        ...role_data,
        created_at: now,
      },
      include: { users: true },
    });
    return new_role;
  }

  async search_role(role_id: number): Promise<Role | null> {
    const role = await Prisma.role.findUnique({
      where: { id: role_id },
      include: { users: true },
    });

    return role ? role : null;
  }

  async update_role(
    role_id: number,
    role_data: update_role_dto
  ): Promise<Role> {
    const role_updated = await Prisma.role.update({
      where: { id: role_id },
      data: role_data,
    });

    return role_updated;
  }

  async delete_role(role_id: number): Promise<null> {
    await Prisma.role.delete({
      where: { id: role_id },
    });

    return null;
  }
}
