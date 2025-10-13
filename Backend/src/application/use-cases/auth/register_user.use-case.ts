import { user_already_exist_exception } from "../../../domain/exceptions/auth/user_already_exist.exception";
import type { auth_repository } from "../../../domain/repositories/auth/auth.repository";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import type { register_user_dto } from "../../dto/auth.dto";
import { hash_password_service } from "../../services/auth/hash_password.service";
import { search_user } from "../../services/user/search_user_by_email.service";

export class register_user_use_case {
  private readonly repository: auth_repository;
  private readonly user_repo: user_repository;
  private readonly exist_user;

  constructor(
    repository_injection: auth_repository,
    user_repository: user_repository
  ) {
    this.repository = repository_injection;
    this.user_repo = user_repository;
    this.exist_user = new search_user(this.user_repo);
  }

  async run(user_data: register_user_dto) {
    const exist_user = await this.exist_user.run(user_data.email);

    if (exist_user) {
      throw new user_already_exist_exception();
    }

    const hasher = new hash_password_service(user_data.password);
    const hashed_password = await hasher.run();

    const new_user = await this.repository.register({
      ...user_data,
      password: hashed_password,
    });

    return new_user;
  }
}
