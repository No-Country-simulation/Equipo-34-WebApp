import type { User } from "../../../domain/entities/user.entity";
import type { user_repository } from "../../../domain/repositories/user";

export class search_user_by_id_service {
  private readonly repository: user_repository;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
  }

  async run(id: string): Promise<User | null> {
    const user = await this.repository.search_user_by_ID(id);

    return user;
  }
}
