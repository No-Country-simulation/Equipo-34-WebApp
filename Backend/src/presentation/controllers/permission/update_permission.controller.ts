import type { NextFunction, Request, Response } from "express";
import { permission_repository_implemented } from "../../../infrastructure/repositories/permission/permission.repository";
import { update_permission_use_case } from "../../../application/use-cases/permission/update_permission.use-case";
import type { create_permission_dto } from "../../../application/dto/permissions.dto";
import { permission_not_found_exception } from "../../../domain/exceptions/permission/permission_not_found.exception";

export const update_permission_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new permission_repository_implemented();
  const update = new update_permission_use_case(repository);

  try {
    const { id } = req.params;
    const permission_data: create_permission_dto = req.body;
    const permission_id = Number(id);

    const permission_updated = await update.run(permission_id, permission_data);

    res.status(200).json({
      status: 200,
      message: "Permission updated successfully",
      data: permission_updated,
    });
  } catch (error) {
    if (error instanceof permission_not_found_exception) {
      res.status(404).json({
        status: 404,
        message: "Permission not found",
        error: "Not Found",
      });
      return;
    }

    next(error);
  }
};
