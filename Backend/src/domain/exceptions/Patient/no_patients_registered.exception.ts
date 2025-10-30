export class no_patients_registered_exception extends Error {
  constructor() {
    super("Theres no patients registered");
  }
}
