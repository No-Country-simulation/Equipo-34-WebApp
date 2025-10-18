export class role_not_found_exception extends Error {
  constructor() {
    super("Role Doesn't exist");
  }
}
