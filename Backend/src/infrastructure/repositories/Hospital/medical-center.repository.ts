import type {
  create_medical_center_dto,
  update_medical_center_dto,
} from "../../../application/dto/Hospital/medical-center.dto";
import type { Pagination } from "../../../application/dto/Response/pagination.dto";
import type { medical_center } from "../../../domain/entities/Hospital/medical-center.entity";
import type { medical_center_repository } from "../../../domain/repositories/hospital/medical-center.repository";
import Prisma from "../../config/DataBases/prisma.config";

export class medical_center_repository_implemented
  implements medical_center_repository
{
  async find_all(
    page: number,
    limit: number
  ): Promise<{ data: medical_center[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.medicalCenter.count();
    const total_pages = Math.ceil(total / limit);

    const medical_centers = await Prisma.medicalCenter.findMany({
      skip,
      take: limit,
    });

    return {
      data: medical_centers as unknown as medical_center[],
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

  async find_by_id(id: string): Promise<medical_center> {
    const medical_center = await Prisma.medicalCenter.findUnique({
      where: { id },
    });

    return medical_center as unknown as medical_center;
  }

  async find_by_name(
    name: string,
    page: number,
    limit: number
  ): Promise<{ data: medical_center[]; pagination: Pagination }> {
    const skip = (page - 1) * limit;
    const total = await Prisma.medicalCenter.count();
    const total_pages = Math.ceil(total / limit);

    const medical_center = await Prisma.medicalCenter.findMany({
      where: { name },
      skip,
      take: limit,
    });

    return {
      data: medical_center as unknown as medical_center[],
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

  async create_medical_center(
    center_data: create_medical_center_dto
  ): Promise<medical_center> {
    const new_center = await Prisma.medicalCenter.create({
      data: center_data,
    });

    return new_center as unknown as medical_center;
  }

  async update_medical_center(
    id: string,
    center_data: update_medical_center_dto
  ): Promise<medical_center> {
    const updated_center = await Prisma.medicalCenter.update({
      where: { id },
      data: center_data,
    });

    return updated_center as unknown as medical_center;
  }
}
