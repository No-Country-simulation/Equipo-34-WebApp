import { confirm_register } from "../../services/email/confirm-register.service";

export class confirm_register_use_case {
  async run(email: string, token: string) {
    const use_case = new confirm_register(email, token);
    const response = use_case.run();
    return response;
  }
}
