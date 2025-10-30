import { incompatible_role_exception } from "../../../../domain/exceptions/verification/incompatible-role-exception";
import { user_not_found } from "../../../../domain/exceptions/user/not-found.exception";
import type { doctor_repository } from "../../../../domain/repositories/doctor/doctor.repository";
import type { create_doctor_dto } from "../../../dto/Doctor/doctor.dto";
import { decode_token_service } from "../../../services/verification/decode-token.service";
import { decoding_token_exception } from "../../../../domain/exceptions/verification/decoding_token.exception";

export class create_doctor_use_case {
  private readonly doctor_repo;
  private readonly token_service;

  constructor(doctor_repo_injection: doctor_repository) {
    this.doctor_repo = doctor_repo_injection;
    this.token_service = new decode_token_service();
  }

  async run(token: string, doctor_data: create_doctor_dto) {
    const decode = await this.token_service.run(token);

    if (!decode) {
      throw new decoding_token_exception();
    }

    if (decode.role != "DOCTOR") {
      throw new incompatible_role_exception();
    }
    const user = await this.doctor_repo.find_by_id(decode.user_id);

    if (!user) {
      throw new user_not_found();
    }

    const sanitized_data = {
      ...doctor_data,
      user_id: decode.user_id,
    };
    const doctor = await this.doctor_repo.create_doctor(sanitized_data);

    return doctor;
  }
}
