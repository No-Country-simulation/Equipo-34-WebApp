import { no_permissions_registered_exception } from "../../../domain/exceptions/permission/no_permissions_registered.exception";
import type { permission_repository } from "../../../domain/repositories/permission/permission.repository";

export class get_permissions_use_case {
  private readonly repository: permission_repository;
  constructor(repository_injection: permission_repository) {
    this.repository = repository_injection;
  }

  async run() {
    const permissions = await this.repository.get_permissions();

    if (permissions.length == 0) {
      throw new no_permissions_registered_exception();
    }

    return permissions;
  }
}
