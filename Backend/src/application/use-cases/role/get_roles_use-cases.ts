import type { Role } from "../../../domain/entities/role.entity";
import { no_roles_registered_exception } from "../../../domain/exceptions/role/no_roles_registered.exception";
import type { role_repository } from "../../../domain/repositories/role/role.repository";

export class get_roles_use_case {
  private readonly repository: role_repository;

  constructor(repository_injection: role_repository) {
    this.repository = repository_injection;
  }

  async run(): Promise<Role[] | null> {
    const users = await this.repository.get_roles();

    if (users.length == 0) {
      throw new no_roles_registered_exception();
    }

    return users;
  }
}
