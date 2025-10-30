export class incompatible_role_exception extends Error {
  constructor() {
    super("This role is incompatible");
  }
}
