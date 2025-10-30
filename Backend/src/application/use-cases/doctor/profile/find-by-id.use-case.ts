import { user_not_found } from "../../../../domain/exceptions/user/not-found.exception";
import type { doctor_repository } from "../../../../domain/repositories/doctor/doctor.repository";
import { decode_token_service } from "../../../services/verification/decode-token.service";

export class find_doctor_by_id_use_case {
  private readonly doctor_repo;
  private readonly decode_token;

  constructor(doctor_repo_injection: doctor_repository) {
    this.doctor_repo = doctor_repo_injection;
    this.decode_token = new decode_token_service();
  }

  async run(token: string) {
    const decoded = await this.decode_token.run(token);

    const doctor = await this.doctor_repo.find_by_id(decoded.user_id);

    if (!doctor) {
      throw new user_not_found();
    }

    return doctor;
  }
}
