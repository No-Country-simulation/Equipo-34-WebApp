import { mailer } from "./resend";
export const send_mail = async (email: string) => {
  const { data, error } = await mailer.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: `${email}`,
    subject: "hello world",
    html: "<strong>it works!</strong>",
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
