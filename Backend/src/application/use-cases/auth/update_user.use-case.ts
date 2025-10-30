import { user_already_exist_exception } from "../../../domain/exceptions/auth/user_already_exist.exception";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import type { auth_repository } from "../../../domain/repositories/auth/auth.repository";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import type { update_user_dto } from "../../dto/User/auth.dto";
import { search_user } from "../../services/user/search_user_by_email.service";

export class update_user_use_case {
  private readonly repository: auth_repository;
  private readonly user_repository: user_repository;
  private readonly exist_user;

  constructor(
    repository_injection: auth_repository,
    user_repository_injection: user_repository
  ) {
    this.repository = repository_injection;
    this.user_repository = user_repository_injection;
    this.exist_user = new search_user(this.user_repository);
  }

  async run(email: string, user_data: update_user_dto) {
    const exist_user = await this.exist_user.run(email ?? "Null");
    if (!exist_user) {
      throw new user_not_found();
    }

    const not_disponsible_email = await this.exist_user.run(
      user_data.email ?? "Null"
    );
    if (not_disponsible_email) {
      throw new user_already_exist_exception();
    }

    const user = await this.repository.update_user(email, user_data);
    return user;
  }
}
