import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import type { user_repository } from "../../../domain/repositories/user/user.repository";

export class search_user_by_email_use_case {
  private readonly repository: user_repository;

  constructor(injected_repository: user_repository) {
    this.repository = injected_repository;
  }

  async run(email: string) {
    const user = await this.repository.search_user_by_email(email);

    if (!user) {
      throw new user_not_found();
    }

    return user;
  }
}
