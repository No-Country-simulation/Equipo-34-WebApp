import { send_mail } from "../../../infrastructure/external/Email/resend/send-confirm-email";

export class confirm_register {
  private readonly email: string;

  constructor(email_injection: string) {
    this.email = email_injection;
  }

  async run() {
    const response = await send_mail(this.email);
    return response;
  }
}
