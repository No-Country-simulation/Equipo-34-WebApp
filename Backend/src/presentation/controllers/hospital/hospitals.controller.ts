import { Controller } from "tsoa";
import { medical_center_repository_implemented } from "../../../infrastructure/repositories/Hospital/medical-center.repository";
import { find_all_medical_centers_use_case } from "../../../application/use-cases/hospital/find-all.use-case";
import { no_medical_centers_exception } from "../../../domain/exceptions/hospital/no-centers.exception";
import { find_center_by_id_use_case } from "../../../application/use-cases/hospital/find-by-id.use-case";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import { find_center_by_name_use_case } from "../../../application/use-cases/hospital/find-by-name.use-case";
import type {
  create_medical_center_dto,
  update_medical_center_dto,
} from "../../../application/dto/Hospital/medical-center.dto";
import { create_center_use_case } from "../../../application/use-cases/hospital/create-center.use-case";
import { update_medical_center_use_case } from "../../../application/use-cases/hospital/update-center.use-case";

export class medical_center_controller extends Controller {
  private readonly center_repo = new medical_center_repository_implemented();

  async find_all(page: number, limit: number) {
    const use_case = new find_all_medical_centers_use_case(this.center_repo);

    try {
      const centers = await use_case.run(page, limit);

      return {
        status: 200,
        message: "Centers retrieve",
        data: centers.data,
        pagination: centers.pagination,
      };
    } catch (error) {
      if (error instanceof no_medical_centers_exception) {
        return {
          status: 404,
          message: "No medical centers found",
          error: "Not Found",
        };
      }

      throw error;
    }
  }

  async find_by_id(id: string) {
    const use_case = new find_center_by_id_use_case(this.center_repo);

    try {
      const center = await use_case.run(id);
      return {
        status: 200,
        message: "Center Found",
        data: center,
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "Center not found",
          error: "Not Found",
        };
      }
      throw error;
    }
  }

  async find_by_name(name: string, page: number, limit: number) {
    const use_case = new find_center_by_name_use_case(this.center_repo);

    try {
      const centers = await use_case.run(name, page, limit);

      return {
        status: 200,
        message: "Centers retrieve",
        data: centers.data,
        pagination: centers.pagination,
      };
    } catch (error) {
      if (error instanceof no_medical_centers_exception) {
        return {
          status: 404,
          message: "No medical centers found with that name",
          error: "Not Found",
        };
      }
      throw error;
    }
  }

  async create_center(center_data: create_medical_center_dto) {
    const use_case = new create_center_use_case(this.center_repo);

    try {
      const new_center = await use_case.run(center_data);

      return {
        status: 201,
        message: "Center created",
        data: new_center,
      };
    } catch (error) {
      console.log("error creating center");
      throw error;
    }
  }

  async update_center(id: string, center_data: update_medical_center_dto) {
    const use_case = new update_medical_center_use_case(this.center_repo);

    try {
      const updated_center = await use_case.run(id, center_data);
      return {
        status: 201,
        message: "Center updated",
        data: updated_center,
      };
    } catch (error) {
      console.log("error updating center");
      throw error;
    }
  }
}
