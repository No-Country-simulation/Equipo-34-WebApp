import { verify_account_template } from "../Template/verify-account.template";
import { mailer } from "./resend";

export const send_confirmation_mail = async (email: string, token: string) => {
  const PORT = process.env.PORT || 3001;
  const company_email = process.env.COMPANY_EMAIL || "emailmuyreal@gmail.com";
  const html = verify_account_template(email, company_email, PORT, token);

  const { data, error } = await mailer.emails.send({
    from: "No-Reply <onboarding@resend.dev>",
    to: `${email}`,
    subject: "Confirm it's you",
    html,
  });

  if (data) {
    return {
      message: `email sent to ${email}`,
      data,
    };
  }

  return {
    message: "Error sending the email",
    error,
  };
};
