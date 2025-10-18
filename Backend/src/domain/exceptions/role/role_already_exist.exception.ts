export class role_already_exist_exception extends Error {
  constructor() {
    super("Role Already exist");
  }
}
