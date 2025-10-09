export class wrong_password_exception extends Error {
  constructor() {
    super("Wrong password");
  }
}
