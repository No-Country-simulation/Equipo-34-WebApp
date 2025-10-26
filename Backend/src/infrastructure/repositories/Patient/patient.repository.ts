import type { update_patient_dto } from "../../../application/dto/Patient/patient.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { Patient } from "../../../domain/entities/Patient/patient.entity";
import type { patient_repository } from "../../../domain/repositories/patient/patient.repository";
import Prisma from "../../config/DataBases/prisma.config";

export class patient_repository_implemented implements patient_repository {
  async get_all(
    page: number,
    limit: number
  ): Promise<{ data: Patient[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.patient.count();
    const total_pages = Math.ceil(total / limit);

    const patients = await Prisma.patient.findMany({
      skip,
      take: limit,
      include: { user: true },
    });

    return {
      data: patients as Patient[],
      pagination: {
        total,
        page,
        limit,
        total_pages,
        hasNextPage: page < total_pages,
        hasPrevPage: page > 1,
      },
    };
  }

  async create_patient(user_id: string): Promise<Patient> {
    const patient = await Prisma.patient.create({
      data: { user_id: user_id },
    });

    return patient as Patient;
  }

  async update_patient(
    user_id: string,
    update_patient_dto: update_patient_dto
  ): Promise<Patient> {
    const patient_updated = await Prisma.patient.update({
      where: { user_id: user_id },
      data: update_patient_dto,
    });

    return patient_updated as Patient;
  }
}
