import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import { decoding_token_exception } from "../../../domain/exceptions/verification/decoding_token.exception";
import { token_expired_exception } from "../../../domain/exceptions/verification/token_expired.exception";
import { user_already_verified_exception } from "../../../domain/exceptions/verification/user-already-verified.exception";
import type { auth_repository } from "../../../domain/repositories/auth/auth.repository";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import { verify_token } from "../../../infrastructure/external/Utils/jwt.util";

export class mark_as_verified_use_case {
  private readonly user_repo;
  private readonly auth_repo;
  constructor(
    user_repo_injection: user_repository,
    auth_repo_injection_aut: auth_repository
  ) {
    this.user_repo = user_repo_injection;
    this.auth_repo = auth_repo_injection_aut;
  }
  async run(token: string) {
    if (!token) {
      throw new decoding_token_exception();
    }
    const data = verify_token(token);

    if (!data) {
      throw new token_expired_exception();
    }

    const user = await this.user_repo.search_user_by_email(data.email);

    if (!user) {
      throw new user_not_found();
    }

    if (user.is_verified == true) {
      throw new user_already_verified_exception();
    }

    return await this.auth_repo.mark_as_verified(data.user_id);
  }
}
