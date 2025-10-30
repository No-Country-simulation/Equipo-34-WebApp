import { no_doctors_registered_exception } from "../../../../domain/exceptions/doctor/no-doctors-registered.exception";
import type { doctor_repository } from "../../../../domain/repositories/doctor/doctor.repository";

export class find_all_doctors_use_case {
  private readonly doctor_repo;

  constructor(doctor_repo_injection: doctor_repository) {
    this.doctor_repo = doctor_repo_injection;
  }

  async run(page: number, limit: number) {
    const doctors = await this.doctor_repo.find_all(page, limit);

    if (doctors.data.length == 0) {
      throw new no_doctors_registered_exception();
    }

    return doctors;
  }
}
