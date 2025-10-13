export class permission_already_exist_exception extends Error {
  constructor() {
    super("Permission already exist");
  }
}
