import { user_already_exist_exception } from "../../../domain/exceptions/auth/user_already_exist.exception";
import type { user_repository } from "../../../domain/repositories/user";
import type { register_user_dto } from "../../dto/auth.dto";
import { search_user } from "../../services/user/search_user_by_email.service";

export class register_user_use_case {
  private readonly repository: user_repository;
  private readonly exist_user;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
    this.exist_user = new search_user(this.repository);
  }

  async run(user_data: register_user_dto) {
    const exist_user = await this.exist_user.run(user_data.email);

    if (exist_user) {
      throw new user_already_exist_exception();
    }

    const new_user = await this.repository.create_user(user_data);

    return new_user;
  }
}
