import type { User } from "../../../domain/entities/user.entity";
import { wrong_password_exception } from "../../../domain/exceptions/auth/wrong_password.exception";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import type { user_repository } from "../../../domain/repositories/user";
import { compare_password } from "../../../infrastructure/external/Utils/hash.utils";
import type { log_user_dto } from "../../dto/auth.dto";
import { search_user } from "../../services/user/search_user_by_email.service";

export class login_use_case {
  private readonly repository: user_repository;
  private readonly exist_user;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
    this.exist_user = new search_user(this.repository);
  }

  async login(user_data: log_user_dto) {
    const user: User = await this.exist_user.run(user_data.email);

    if (!user) {
      throw new user_not_found();
    }

    const pass = await compare_password(user_data.password, user.password);

    if (!pass) {
      throw new wrong_password_exception();
    }

    return user;
  }
}
