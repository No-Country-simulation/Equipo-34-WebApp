import { wrong_password_exception } from "../../../domain/exceptions/auth/wrong_password.exception";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import { compare_password } from "../../../infrastructure/external/Utils/hash.utils";
import type { log_user_dto } from "../../dto/auth.dto";

export class login_use_case {
  private readonly repository: user_repository;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
  }

  async login(user_data: log_user_dto) {
    const user = await this.repository.search_user_by_email(user_data.email);

    if (!user) {
      throw new user_not_found();
    }
    const pass = await compare_password(user_data.password, user!.password);

    if (!pass) {
      throw new wrong_password_exception();
    }

    return user;
  }
}
