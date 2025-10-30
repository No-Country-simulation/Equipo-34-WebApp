export class no_doctors_registered_exception extends Error {
  constructor() {
    super("There's no doctors registered yet");
  }
}
