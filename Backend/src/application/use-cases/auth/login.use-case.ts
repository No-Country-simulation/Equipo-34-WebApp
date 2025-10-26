import { wrong_password_exception } from "../../../domain/exceptions/auth/wrong_password.exception";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import { user_not_verified_exception } from "../../../domain/exceptions/verification/user_not_verified.exception";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
// import { send_confirmation_mail } from "../../../infrastructure/external/Email/resend/send-confirm-email";
import { compare_password } from "../../../infrastructure/external/Utils/hash.utils";
import type { log_user_dto } from "../../dto/User/auth.dto";
import { create_token } from "../../services/verification/create-token.service";

export class login_use_case {
  private readonly repository: user_repository;
  private readonly create_token_service;
  constructor(repository_injection: user_repository) {
    this.repository = repository_injection;
    this.create_token_service = new create_token();
  }

  async login(user_data: log_user_dto) {
    const user = await this.repository.search_user_by_email(user_data.email);

    if (!user) {
      throw new user_not_found();
    }

    if (!user.is_verified) {
      throw new user_not_verified_exception();
    }
    // if (!user.is_verified) {
    //   const verification_token = await this.create_token_service.run(user);

    //   await send_confirmation_mail(user.email, verification_token);

    //   return {
    //     needs_verification: true,
    //     message: "New verification email has been sent",
    //     email: user.email,
    //   };
    // }

    const pass = await compare_password(user_data.password, user.password);

    if (!pass) {
      throw new wrong_password_exception();
    }

    const token = await this.create_token_service.run(user);
    return { user, token };
  }
}
