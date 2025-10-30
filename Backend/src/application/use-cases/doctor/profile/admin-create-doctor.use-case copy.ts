// import { incompatible_role_exception } from "../../../../domain/exceptions/verification/incompatible-role-exception";
import { user_not_found } from "../../../../domain/exceptions/user/not-found.exception";
import type { doctor_repository } from "../../../../domain/repositories/doctor/doctor.repository";
import type { create_doctor_dto } from "../../../dto/Doctor/doctor.dto";

export class admin_create_doctor_use_case {
  private readonly doctor_repo;

  constructor(doctor_repo_injection: doctor_repository) {
    this.doctor_repo = doctor_repo_injection;
  }

  async run(email: string, doctor_data: create_doctor_dto) {
    const user = await this.doctor_repo.find_by_email(email);

    if (!user) {
      throw new user_not_found();
    }

    const sanitized_data = {
      ...doctor_data,
      user_id: user.user?.id,
    };

    const doctor = await this.doctor_repo.create_doctor(sanitized_data);

    return doctor;
  }
}
