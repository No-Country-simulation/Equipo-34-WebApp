import { user_not_found } from "../../../../domain/exceptions/user/not-found.exception";
import type { doctor_repository } from "../../../../domain/repositories/doctor/doctor.repository";

export class find_doctor_by_email_use_case {
  private readonly doctor_repo;

  constructor(doctor_repo_injection: doctor_repository) {
    this.doctor_repo = doctor_repo_injection;
  }

  async run(email: string) {
    const doctor = await this.doctor_repo.find_by_email(email);

    if (!doctor) {
      throw new user_not_found();
    }

    return doctor;
  }
}
