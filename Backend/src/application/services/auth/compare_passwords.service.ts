import { wrong_password_exception } from "../../../domain/exceptions/auth/wrong_password.exception";
import { compare_password } from "../../../infrastructure/external/Utils/hash.utils";

export class compare_password_service {
  private readonly plain_password: string;
  private readonly hashed_password: string;

  constructor(
    plain_password_injection: string,
    hashed_password_injection: string
  ) {
    this.plain_password = plain_password_injection;
    this.hashed_password = hashed_password_injection;
  }

  async run(): Promise<boolean> {
    const pass = await compare_password(
      this.plain_password,
      this.hashed_password
    );

    if (!pass) {
      throw new wrong_password_exception();
    }

    return pass;
  }
}
