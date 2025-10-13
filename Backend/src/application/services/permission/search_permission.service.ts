import type { permission_repository } from "../../../domain/repositories/permission/permission.repository";

export class search_permission_service {
  private readonly repository: permission_repository;

  constructor(repository_injection: permission_repository) {
    this.repository = repository_injection;
  }

  async run(permission_id: number) {
    const permission = await this.repository.search_permission(permission_id);

    if (!permission) {
      return false;
    }

    return true;
  }
}
