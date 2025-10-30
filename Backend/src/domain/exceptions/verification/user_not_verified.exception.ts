export class user_not_verified_exception extends Error {
  constructor() {
    super("User not verified");
    this.name = "user_not_verified_exception";
  }
}
