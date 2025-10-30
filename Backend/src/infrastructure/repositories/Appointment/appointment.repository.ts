import type {
  create_appointment_dto,
  update_appointment_dto,
} from "../../../application/dto/Appointment/appointment.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { Appointment } from "../../../domain/entities/Appointment/appointment.entity";
import type { appointment_repository } from "../../../domain/repositories/appointment/appointment.repository";
import Prisma from "../../config/DataBases/prisma.config";

export class appointment_repository_implemented
  implements appointment_repository
{
  async find_all(
    page: number,
    limit: number
  ): Promise<{ data: Appointment[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.appointment.count();
    const total_pages = Math.ceil(total / limit);

    const appointments = Prisma.appointment.findMany({
      skip,
      take: limit,
    });

    return {
      data: appointments as unknown as Appointment[],
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

  async find_one(id: string): Promise<Appointment> {
    const appointment = Prisma.appointment.findUnique({
      where: { id: id },
      include: { doctor_profile: true, patient_profile: true },
    });

    return appointment as unknown as Appointment;
  }

  async find_doctors_appointment(
    doctor_id: string,
    page: number,
    limit: number
  ): Promise<{ data: Appointment[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.appointment.count();
    const total_pages = Math.ceil(total / limit);

    const appointments = Prisma.appointment.findMany({
      where: { doctor_id },
      include: { doctor_profile: true },
      skip,
      take: limit,
    });

    return {
      data: appointments as unknown as Appointment[],
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

  async create_appointment(data: create_appointment_dto): Promise<Appointment> {
    const appointment = await Prisma.appointment.create({
      data,
    });

    return appointment as Appointment;
  }

  async update_appointment(
    id: string,
    data: update_appointment_dto
  ): Promise<Appointment> {
    const appointment = await Prisma.appointment.update({
      where: { id },
      data,
    });

    return appointment as Appointment;
  }
}
