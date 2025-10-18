import type { role_repository } from "../../../domain/repositories/role/role.repository";

export class search_role_service {
  private readonly repository: role_repository;

  constructor(repository_injection: role_repository) {
    this.repository = repository_injection;
  }

  async run(role_id: number) {
    const role = await this.repository.search_role(role_id);

    if (!role) {
      return false;
    }

    return true;
  }
}
