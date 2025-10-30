import type { update_doctor_dto } from "../../../dto/Doctor/doctor.dto";
import { decode_token_service } from "../../../services/verification/decode-token.service";
import { user_not_found } from "../../../../domain/exceptions/user/not-found.exception";
import type { doctor_repository } from "../../../../domain/repositories/doctor/doctor.repository";

export class update_doctor_use_case {
  private readonly doctor_repo;
  private readonly decode_token;

  constructor(doctor_repo_injection: doctor_repository) {
    this.doctor_repo = doctor_repo_injection;
    this.decode_token = new decode_token_service();
  }

  async run(token: string, doctor_data: update_doctor_dto) {
    const decoded = await this.decode_token.run(token);
    const user = await this.doctor_repo.find_by_id(decoded.user_id);

    if (!user) {
      throw new user_not_found();
    }

    const doctor_updated = await this.doctor_repo.update_doctor(
      decoded.user_id,
      doctor_data
    );
    return doctor_updated;
  }
}
