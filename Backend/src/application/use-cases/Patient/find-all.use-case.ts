import { no_patients_registered_exception } from "../../../domain/exceptions/Patient/no_patients_registered.exception";
import type { patient_repository } from "../../../domain/repositories/patient/patient.repository";

export class find_all_patients_use_case {
  private readonly patient_repository;

  constructor(patient_repo_injection: patient_repository) {
    this.patient_repository = patient_repo_injection;
  }

  async run(page: number, limit: number) {
    const patients = await this.patient_repository.get_all(page, limit);

    if (patients.data.length == 0) {
      throw new no_patients_registered_exception();
    }

    return patients;
  }
}
