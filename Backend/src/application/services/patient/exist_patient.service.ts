import type { patient_repository } from "../../../domain/repositories/patient";

export class exist_patient {
  private readonly repository: patient_repository;

  constructor(repository_injection: patient_repository) {
    this.repository = repository_injection;
  }

  async run(id: string): Promise<boolean> {
    const patient = await this.repository.search_patient(id);

    if (!patient) {
      return false;
    }

    return true;
  }
}
