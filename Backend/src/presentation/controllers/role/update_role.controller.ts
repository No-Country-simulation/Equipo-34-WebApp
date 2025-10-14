import type { NextFunction, Request, Response } from "express";
import { role_repository_implemented } from "../../../infrastructure/repositories/role/role.repository";
import { update_role_use_case } from "../../../application/use-cases/role/update_role.use-case";
import type { create_role_dto } from "../../../application/dto/role.dto";
import { role_not_found_exception } from "../../../domain/exceptions/role/role_not_found.exception";

export const update_role_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new role_repository_implemented();
  const update = new update_role_use_case(repository);

  try {
    const { id } = req.params;
    const role_id = Number(id);
    const role: create_role_dto = req.body;

    const role_updated = await update.run(role_id, role);

    res.status(200).json({
      status: 200,
      message: "Role updated",
      data: role_updated,
    });
  } catch (error) {
    if (error instanceof role_not_found_exception) {
      res.status(404).json({
        status: 404,
        message: "Role Not Found",
        error: "Not found",
      });
      return;
    }

    next(error);
  }
};
