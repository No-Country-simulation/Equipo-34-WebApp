export class no_permissions_registered_exception extends Error {
  constructor() {
    super("There's no permissions registered");
  }
}
