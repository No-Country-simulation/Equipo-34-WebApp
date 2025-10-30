export class patient_not_found_exception extends Error {
  constructor() {
    super("Patient couldn't be found");
  }
}
