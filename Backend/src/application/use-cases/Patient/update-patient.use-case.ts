import { patient_not_found_exception } from "../../../domain/exceptions/Patient/patient-not-found.exception";
import type { patient_repository } from "../../../domain/repositories/patient/patient.repository";
import type { update_patient_dto } from "../../dto/Patient/patient.dto";
import { decode_token_service } from "../../services/verification/decode-token.service";

export class update_patient_use_case {
  private readonly repository;
  private readonly decode_token;

  constructor(patient_repo_injection: patient_repository) {
    this.repository = patient_repo_injection;
    this.decode_token = new decode_token_service();
  }

  async run(token: string, patient_data: update_patient_dto) {
    const decoded = await this.decode_token.run(token);
    const patient = this.repository.find_patient(decoded.user_id);

    if (!patient) {
      throw new patient_not_found_exception();
    }
    const patient_updated = await this.repository.update_patient(
      decoded.user_id,
      patient_data
    );

    return patient_updated;
  }
}
