import { verify_token } from "../../../infrastructure/external/Utils/jwt.util";

export class decode_token_service {
  async run(token: string) {
    const decoded_token = verify_token(token);
    return decoded_token;
  }
}
