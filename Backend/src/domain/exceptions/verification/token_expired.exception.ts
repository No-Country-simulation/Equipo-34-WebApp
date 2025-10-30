export class token_expired_exception extends Error {
  constructor() {
    super("Token Expired");
  }
}
