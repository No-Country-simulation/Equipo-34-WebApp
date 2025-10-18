export class no_roles_registered_exception extends Error {
  constructor() {
    super("There's no roles registered");
  }
}
