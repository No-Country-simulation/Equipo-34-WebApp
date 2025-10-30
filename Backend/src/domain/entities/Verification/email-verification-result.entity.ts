import type { User } from "../User/user.entity";

export interface EmailVerificationResult {
  success: boolean;
  message: string;
  user?: User;
}
