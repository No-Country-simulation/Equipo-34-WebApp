export class user_already_verified_exception extends Error {
  constructor() {
    super("User already been verified");
  }
}
