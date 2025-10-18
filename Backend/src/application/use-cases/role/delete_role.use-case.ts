import { role_not_found_exception } from "../../../domain/exceptions/role/role_not_found.exception";
import type { role_repository } from "../../../domain/repositories/role/role.repository";
import { search_role_service } from "../../services/role/search_role.service";

export class delete_role_use_case {
  private readonly repository: role_repository;
  private readonly exist;

  constructor(repository_injection: role_repository) {
    this.repository = repository_injection;
    this.exist = new search_role_service(this.repository);
  }

  async run(role_id: number) {
    const existing_role = await this.exist.run(role_id);
    if (!existing_role) {
      throw new role_not_found_exception();
    }

    await this.repository.delete_role(role_id);
    return null;
  }
}
