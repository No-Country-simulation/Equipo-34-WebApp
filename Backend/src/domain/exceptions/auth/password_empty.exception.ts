export class empty_password_exception extends Error {
  constructor() {
    super("Password cannot be empty");
  }
}
