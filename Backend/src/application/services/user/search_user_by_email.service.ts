import type { user_repository } from "../../../domain/repositories/user/user.repository";

export class search_user {
  private readonly repository: user_repository;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
  }

  async run(email: string) {
    const user = await this.repository.search_user_by_email(email);

    if (!user) {
      return false;
    }

    return true;
  }
}
