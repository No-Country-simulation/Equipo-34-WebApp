import { permission_already_exist_exception } from "../../../domain/exceptions/permission/permission_already_exist.exception";
import type { permission_repository } from "../../../domain/repositories/permission/permission.repository";
import type { create_permission_dto } from "../../dto/permissions.dto";
import { search_permission_service } from "../../services/permission/search_permission.service";

export class create_permission_use_case {
  private readonly repository: permission_repository;
  private readonly exist_permission;

  constructor(repository_injection: permission_repository) {
    this.repository = repository_injection;
    this.exist_permission = new search_permission_service(this.repository);
  }

  async run(permission_data: create_permission_dto) {
    const existing_permission = await this.exist_permission.run(
      permission_data.id
    );
    if (existing_permission) {
      throw new permission_already_exist_exception();
    }

    const new_permission = await this.repository.create_permission(
      permission_data
    );
    return new_permission;
  }
}
