import type { user_repository } from "../../../domain/repositories/user/user.repository";

export class search_user_by_id_service {
  private readonly repository: user_repository;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
  }

  async run(id: string): Promise<boolean> {
    const user = await this.repository.search_user_by_ID(id);

    if (!user) {
      return false;
    }

    return true;
  }
}
