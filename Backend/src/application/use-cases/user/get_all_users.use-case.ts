import type { User } from "../../../domain/entities/user.entity";
import { no_users_registered } from "../../../domain/exceptions/user/no_users_registered.exception";
import type { user_repository } from "../../../domain/repositories/user/user.repository";

export class get_users_use_case {
  private readonly repository: user_repository;

  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
  }

  async run(): Promise<User[] | null> {
    const users = await this.repository.get_users();

    if (users.length == 0) {
      throw new no_users_registered();
    }

    return users;
  }
}
