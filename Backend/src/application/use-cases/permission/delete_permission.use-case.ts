import { permission_not_found_exception } from "../../../domain/exceptions/permission/permission_not_found.exception";
import type { permission_repository } from "../../../domain/repositories/permission/permission.repository";
import { search_permission_service } from "../../services/permission/search_permission.service";

export class delete_permission_use_case {
  private readonly repository: permission_repository;
  private readonly exist_permission;

  constructor(repository_injection: permission_repository) {
    this.repository = repository_injection;
    this.exist_permission = new search_permission_service(this.repository);
  }

  async run(permission_id: number): Promise<null> {
    const exist = await this.exist_permission.run(permission_id);
    if (!exist) {
      throw new permission_not_found_exception();
    }

    await this.repository.delete_permission(permission_id);
    return null;
  }
}
