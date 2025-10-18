import { empty_password_exception } from "../../../domain/exceptions/auth/password_empty.exception";
import { hash_password } from "../../../infrastructure/external/Utils/hash.utils";

export class hash_password_service {
  private readonly plain_password: string;

  constructor(plain_password_injection: string) {
    this.plain_password = plain_password_injection;
  }

  async run(): Promise<string> {
    if (!this.plain_password) {
      throw new empty_password_exception();
    }
    const hashed_password = await hash_password(this.plain_password);
    return hashed_password;
  }
}
