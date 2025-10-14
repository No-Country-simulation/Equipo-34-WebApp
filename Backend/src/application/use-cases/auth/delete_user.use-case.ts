import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import type { auth_repository } from "../../../domain/repositories/auth/auth.repository";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import { search_user } from "../../services/user/search_user_by_email.service";

export class delete_user_use_case {
  private readonly repository: auth_repository;
  private readonly user_repository: user_repository;
  private readonly exist;

  constructor(
    repository_injection: auth_repository,
    user_repository_injection: user_repository
  ) {
    this.repository = repository_injection;
    this.user_repository = user_repository_injection;
    this.exist = new search_user(this.user_repository);
  }

  async run(user_email: string) {
    const existing_user = await this.exist.run(user_email);

    if (!existing_user) {
      throw new user_not_found();
    }

    await this.repository.delete_user(user_email);
    return null;
  }
}
