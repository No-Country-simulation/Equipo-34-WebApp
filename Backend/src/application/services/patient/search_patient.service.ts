import type { Patient } from "../../../domain/entities/patient.entity";
import type { patient_repository } from "../../../domain/repositories/patient";

export class search_patient {
  private readonly repository: patient_repository;

  constructor(repository_injection: patient_repository) {
    this.repository = repository_injection;
  }

  async run(id: string) {
    const patient: Patient = await this.repository.search_patient(id);
    return patient;
  }
}
