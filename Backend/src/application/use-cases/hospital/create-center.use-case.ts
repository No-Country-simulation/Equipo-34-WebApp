import type { medical_center_repository } from "../../../domain/repositories/hospital/medical-center.repository";
import type { create_medical_center_dto } from "../../dto/Hospital/medical-center.dto";

export class create_center_use_case {
  private readonly center_repo;

  constructor(center_repo_injection: medical_center_repository) {
    this.center_repo = center_repo_injection;
  }

  async run(center_data: create_medical_center_dto) {
    const center = await this.center_repo.create_medical_center(center_data);

    return center;
  }
}
