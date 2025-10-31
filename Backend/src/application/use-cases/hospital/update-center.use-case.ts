import type { medical_center_repository } from "../../../domain/repositories/hospital/medical-center.repository";
import type { update_medical_center_dto } from "../../dto/Hospital/medical-center.dto";

export class update_medical_center_use_case {
  private readonly center_repo;

  constructor(center_repo_injection: medical_center_repository) {
    this.center_repo = center_repo_injection;
  }

  async run(id: string, center_data: update_medical_center_dto) {
    const center = await this.center_repo.update_medical_center(
      id,
      center_data
    );

    return center;
  }
}
