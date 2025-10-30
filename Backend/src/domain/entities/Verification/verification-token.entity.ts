export interface VerificationToken {
  token: string;
  user_id: string;
  expires_at: Date;
  type: "email_verification" | "password_reset";
}
