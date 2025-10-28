import { Controller } from "tsoa";
import { patient_repository_implemented } from "../../../infrastructure/repositories/Patient/patient.repository";
import type { Patient } from "../../../domain/entities/Patient/patient.entity";
import { find_all_patients_use_case } from "../../../application/use-cases/Patient/find-all.use-case";
import { no_patients_registered_exception } from "../../../domain/exceptions/Patient/no_patients_registered.exception";
import type { update_patient_validation } from "../../../infrastructure/external/Validation/patient/patient.validation";
import { update_patient_use_case } from "../../../application/use-cases/Patient/update-patient.use-case";
import { patient_not_found_exception } from "../../../domain/exceptions/Patient/patient-not-found.exception";

export class patient_controller extends Controller {
  private readonly repository = new patient_repository_implemented();
  async find_all(page: number, limit: number) {
    const get = new find_all_patients_use_case(this.repository);

    try {
      const patients = await get.run(page, limit);

      return {
        status: 200,
        message: "Patients retrieve",
        data: patients.data as Patient[],
        pagination: patients.pagination,
      };
    } catch (error) {
      if (error instanceof no_patients_registered_exception) {
        return {
          status: 404,
          message: "No Patients registered yet",
          error: "Not found",
        };
      }

      throw error;
    }
  }

  async update_patient(token: string, patient_data: update_patient_validation) {
    const update = new update_patient_use_case(this.repository);

    try {
      const patient = await update.run(token, patient_data);

      return {
        status: 201,
        message: "Patient updated",
        data: patient,
      };
    } catch (error) {
      if (error instanceof patient_not_found_exception) {
        return {
          status: 404,
          message: "Patient couldn't be found",
          error: "Not found",
        };
      }
      throw error;
    }
  }
}
