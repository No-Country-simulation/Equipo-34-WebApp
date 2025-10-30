import { Controller } from "tsoa";
import { doctor_repository_implemented } from "../../../../infrastructure/repositories/Doctor/doctor.repository";
import { find_all_doctors_use_case } from "../../../../application/use-cases/doctor/profile/find_all.use-case";
import { no_doctors_registered_exception } from "../../../../domain/exceptions/doctor/no-doctors-registered.exception";
import { find_doctor_by_id_use_case } from "../../../../application/use-cases/doctor/profile/find-by-id.use-case";
import { user_not_found } from "../../../../domain/exceptions/user/not-found.exception";
import { find_doctor_by_email_use_case } from "../../../../application/use-cases/doctor/profile/find-by-email.use-case";
import {
  update_doctor_profile_validation,
  type create_doctor_profile_validation,
} from "../../../../infrastructure/external/Validation/doctor/profile.validation";
import { create_doctor_use_case } from "../../../../application/use-cases/doctor/profile/create-doctor.use-case";
import { decoding_token_exception } from "../../../../domain/exceptions/verification/decoding_token.exception";
import { incompatible_role_exception } from "../../../../domain/exceptions/verification/incompatible-role-exception";
import { update_doctor_use_case } from "../../../../application/use-cases/doctor/profile/update-doctor.use-case";

export class doctor_controller extends Controller {
  private readonly doctor_repo = new doctor_repository_implemented();

  async find_all(page: number, limit: number) {
    const get = new find_all_doctors_use_case(this.doctor_repo);
    try {
      const doctors = await get.run(page, limit);

      return {
        status: 200,
        message: "Doctors retrieve",
        data: doctors.data,
        pagination: doctors.pagination,
      };
    } catch (error) {
      if (error instanceof no_doctors_registered_exception) {
        return {
          status: 404,
          message: "No doctors registered",
          error: "Not found",
        };
      }
      throw error;
    }
  }

  async find_by_id(token: string) {
    const use_case = new find_doctor_by_id_use_case(this.doctor_repo);
    try {
      const doctor = use_case.run(token);

      return {
        status: 200,
        message: "Doctor Found",
        data: doctor,
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "Doctor not found",
          error: "Not found",
        };
      }

      throw error;
    }
  }

  async find_by_email(email: string) {
    const use_case = new find_doctor_by_email_use_case(this.doctor_repo);

    try {
      const doctor = await use_case.run(email);
      return {
        status: 200,
        message: "Doctor Found",
        data: doctor,
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "Doctor not found",
          error: "Not found",
        };
      }

      throw error;
    }
  }

  async create_doctor(
    token: string,
    doctor_data: create_doctor_profile_validation
  ) {
    const use_case = new create_doctor_use_case(this.doctor_repo);

    try {
      const new_doctor = await use_case.run(token, doctor_data);
      return {
        status: 201,
        message: "Doctor profile created",
        data: new_doctor,
      };
    } catch (error) {
      if (error instanceof decoding_token_exception) {
        return {
          status: 403,
          message: "Error getting user",
          error: "Forbidden",
        };
      }

      if (error instanceof incompatible_role_exception) {
        return {
          status: 403,
          message: "The user role is incompatible",
          error: "Forbidden",
        };
      }

      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "Doctor not found",
          error: "Not found",
        };
      }

      throw error;
    }
  }

  async update_doctor(
    token: string,
    doctor_data: update_doctor_profile_validation
  ) {
    const use_case = new update_doctor_use_case(this.doctor_repo);

    try {
      const updated_doctor = await use_case.run(token, doctor_data);
      return {
        status: 201,
        message: "Doctor profile updated",
        data: updated_doctor,
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "Doctor not found",
          error: "Not found",
        };
      }

      throw error;
    }
  }
}
