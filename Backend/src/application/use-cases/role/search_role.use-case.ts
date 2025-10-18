import { role_not_found_exception } from "../../../domain/exceptions/role/role_not_found.exception";
import type { role_repository } from "../../../domain/repositories/role/role.repository";

export class search_role_use_case {
  private readonly repository: role_repository;

  constructor(repository_injection: role_repository) {
    this.repository = repository_injection;
  }

  async run(role_id: number) {
    const role = await this.repository.search_role(role_id);
    if (!role) {
      throw new role_not_found_exception();
    }
    return role;
  }
}
