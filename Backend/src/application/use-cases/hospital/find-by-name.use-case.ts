import { no_medical_centers_exception } from "../../../domain/exceptions/hospital/no-centers.exception";
import type { medical_center_repository } from "../../../domain/repositories/hospital/medical-center.repository";

export class find_center_by_name_use_case {
  private readonly center_repo;

  constructor(center_repo_injection: medical_center_repository) {
    this.center_repo = center_repo_injection;
  }

  async run(name: string, page: number, limit: number) {
    const center = await this.center_repo.find_by_name(name, page, limit);

    if (center.data.length == 0) {
      throw new no_medical_centers_exception();
    }

    return center;
  }
}
