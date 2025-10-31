export class no_medical_centers_exception extends Error {
  constructor() {
    super("There's no medical center registered");
  }
}
