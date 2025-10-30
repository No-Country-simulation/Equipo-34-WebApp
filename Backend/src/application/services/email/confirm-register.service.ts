import { send_confirmation_mail } from "../../../infrastructure/external/Email/resend/send-confirm-email";

export class confirm_register {
  private readonly email: string;
  private readonly token: string;

  constructor(email_injection: string, token_injection: string) {
    this.email = email_injection;
    this.token = token_injection;
  }

  async run() {
    const response = await send_confirmation_mail(this.email, this.token);
    return response;
  }
}
