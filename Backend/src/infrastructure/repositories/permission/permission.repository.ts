import type { create_permission_dto } from "../../../application/dto/permissions.dto";
import type { permission_repository } from "../../../domain/repositories/permission/permission.repository";
import Prisma from "../../config/DataBases/prisma.config";
import type { Permission } from "../../external/DataBases/generated/prisma";

export class permission_repository_implemented
  implements permission_repository
{
  async get_permissions(): Promise<Permission[]> {
    const permissions = await Prisma.permission.findMany({
      include: { roles: true },
    });
    return permissions;
  }

  async create_permission(
    permission_data: create_permission_dto
  ): Promise<Permission> {
    const new_permission = await Prisma.permission.create({
      data: permission_data,
      include: { roles: true },
    });
    return new_permission;
  }

  async search_permission(permission_id: number): Promise<Permission | null> {
    const permission = await Prisma.permission.findUnique({
      where: {
        id: permission_id,
      },
    });

    return permission ? permission : null;
  }

  async update_permission(
    permission_id: number,
    permission_data: create_permission_dto
  ): Promise<Permission> {
    const permission_updated = await Prisma.permission.update({
      where: { id: permission_id },
      data: permission_data,
    });

    return permission_updated;
  }

  async delete_permission(permission_id: number): Promise<null> {
    await Prisma.permission.delete({
      where: { id: permission_id },
    });

    return null;
  }
}
