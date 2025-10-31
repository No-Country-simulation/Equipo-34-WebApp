import { no_medical_centers_exception } from "../../../domain/exceptions/hospital/no-centers.exception";
import type { medical_center_repository } from "../../../domain/repositories/hospital/medical-center.repository";

export class find_all_medical_centers_use_case {
  private readonly medical_center_repo;

  constructor(center_repo_injection: medical_center_repository) {
    this.medical_center_repo = center_repo_injection;
  }

  async run(page: number, limit: number) {
    const centers = await this.medical_center_repo.find_all(page, limit);

    if (centers.data.length == 0) {
      throw new no_medical_centers_exception();
    }

    return centers;
  }
}
