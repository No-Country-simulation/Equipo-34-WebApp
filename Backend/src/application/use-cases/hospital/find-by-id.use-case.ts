import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import type { medical_center_repository } from "../../../domain/repositories/hospital/medical-center.repository";

export class find_center_by_id_use_case {
  private readonly medical_center_repo;

  constructor(center_repo_injection: medical_center_repository) {
    this.medical_center_repo = center_repo_injection;
  }

  async run(id: string) {
    const center = await this.medical_center_repo.find_by_id(id);

    if (!center) {
      throw new user_not_found();
    }

    return center;
  }
}
