import type { User } from "../../../domain/entities/user.entity";
import type { user_repository } from "../../../domain/repositories/user";

export class search_user {
  private readonly repository: user_repository;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
  }

  async run(email: string) {
    const user: User = await this.repository.search_user_by_email(email);
    return user;
  }
}
