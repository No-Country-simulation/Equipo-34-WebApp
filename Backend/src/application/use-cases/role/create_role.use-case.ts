//import { role_already_exist_exception } from "../../../domain/exceptions/role/role_already_exist.exception";
import type { role_repository } from "../../../domain/repositories/role/role.repository";
import type { create_role_dto } from "../../dto/role.dto";
//import { search_role_service } from "../../services/role/search_role.service";

export class create_role_use_case {
  private readonly repository: role_repository;
  // private readonly exist_role;

  constructor(repository_injection: role_repository) {
    this.repository = repository_injection;
    //this.exist_role = new search_role_service(this.repository);
  }

  async run(role_data: create_role_dto) {
    // const existing_role = await this.exist_role.run(role_id);
    // if (existing_role) {
    //   throw new role_already_exist_exception();
    // }

    const new_role = await this.repository.create_role(role_data);
    return new_role;
  }
}
