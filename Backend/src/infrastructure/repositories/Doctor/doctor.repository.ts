import type {
  internal_create_doctor_dto,
  update_doctor_dto,
} from "../../../application/dto/Doctor/doctor.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { Doctor } from "../../../domain/entities/Doctor/doctor.entity";
import type { doctor_repository } from "../../../domain/repositories/doctor/doctor.repository";
import Prisma from "../../config/DataBases/prisma.config";

export class doctor_repository_implemented implements doctor_repository {
  async find_all(
    page: number,
    limit: number
  ): Promise<{ data: Doctor[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.doctor.count();
    const total_pages = Math.ceil(total / limit);

    const doctors = await Prisma.doctor.findMany({
      include: {
        user: true,
        specialty: true,
      },
      skip,
      take: limit,
    });

    return {
      data: doctors as unknown as Doctor[],
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

  async find_by_id(user_id: string): Promise<Doctor> {
    const doctor = await Prisma.doctor.findUnique({
      where: { user_id },
      include: {
        user: true,
        specialty: true,
      },
    });

    return doctor as unknown as Doctor;
  }

  async find_by_email(email: string): Promise<Doctor> {
    const doctor = await Prisma.doctor.findFirst({
      where: { user: { email } },
      include: { user: true, specialty: true },
    });

    return doctor as unknown as Doctor;
  }

  async create_doctor(
    doctor_data: internal_create_doctor_dto
  ): Promise<Doctor> {
    const sanitized_doctor = {
      ...doctor_data,
      education: doctor_data.education
        ? JSON.parse(JSON.stringify(doctor_data.education))
        : null,
      languages: doctor_data.languages || [],

      accepts_insurance: doctor_data.accepts_insurance ?? false,
      is_accepting_patients: doctor_data.is_accepting_patients ?? true,
      rating_count: 0,
    };

    const doctor = await Prisma.doctor.create({
      data: sanitized_doctor,
    });

    return doctor as unknown as Doctor;
  }

  async update_doctor(
    user_id: string,
    doctor_data: update_doctor_dto
  ): Promise<Doctor> {
    const updated_at = new Date();
    const sanitized_data = {
      ...doctor_data,
      education: doctor_data.education
        ? JSON.parse(JSON.stringify(doctor_data.education))
        : null,
      languages: doctor_data.languages || [],
      accepts_insurance: doctor_data.accepts_insurance ?? false,
      is_accepting_patients: doctor_data.is_accepting_patients ?? true,
      updated_at,
    };

    const doctor_updated = await Prisma.doctor.update({
      where: { user_id },
      data: sanitized_data,
    });

    return doctor_updated as unknown as Doctor;
  }
}
