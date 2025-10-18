import { role_not_found_exception } from "../../../domain/exceptions/role/role_not_found.exception";
import type { role_repository } from "../../../domain/repositories/role/role.repository";
import type { create_role_dto } from "../../dto/role.dto";
import { search_role_service } from "../../services/role/search_role.service";

export class update_role_use_case {
  private readonly repository: role_repository;
  private readonly exist;

  constructor(repository_injection: role_repository) {
    this.repository = repository_injection;
    this.exist = new search_role_service(this.repository);
  }

  async run(role_id: number, role_data: create_role_dto) {
    const existing_role = await this.exist.run(role_id);

    if (!existing_role) {
      throw new role_not_found_exception();
    }

    const updated_role = await this.repository.update_role(role_id, role_data);
    return updated_role;
  }
}
